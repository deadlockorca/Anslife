import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../../../lib/auth/authorization';
import { DATA_STATES, can } from '../../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../../lib/auth/actor';
import { buildOrderScopeTarget } from '../../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../../lib/repositories/auditRepository';
import {
  applyRateLimitHeaders,
  consumeRateLimit,
  createRateLimitResponse,
  readRateLimitEnv,
} from '../../../../../../lib/http/rateLimit';
import {
  createDataShareLink,
  listDataShareLinksByDataItemId,
  type DataShareLinkRecord,
} from '../../../../../../lib/repositories/dataShareLinkRepository';
import {
  getOrderDataItemById,
  type OrderDataItemRecord,
} from '../../../../../../lib/repositories/orderDataItemRepository';

export const dynamic = 'force-dynamic';

interface CreateShareLinkBody {
  expiresInDays?: number | null;
}

function parseId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function isDataState(value: string): value is DataState {
  return DATA_STATES.includes(value as DataState);
}

function buildScopeTargetFromItem(item: OrderDataItemRecord) {
  return buildOrderScopeTarget({
    orderNo: item.orderNo,
    customerCode: item.customer.code,
    factoryCode: item.factory?.code ?? null,
    marketCode: item.customer.countryCode,
  });
}

function canActorViewDataItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: OrderDataItemRecord,
): boolean {
  if (!isDataState(item.state)) {
    return false;
  }

  const decision = can({
    roles: actor.roles,
    resource: 'data_item',
    action: 'view',
    state: item.state,
    actorScopes: actor.scopes,
    scopeTarget: buildScopeTargetFromItem(item),
  });

  if (decision.allowed) {
    return true;
  }

  return item.saleOwnerUserId === actor.userId;
}

function canActorShareDataItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: OrderDataItemRecord,
): boolean {
  if (!isDataState(item.state)) {
    return false;
  }

  const decision = can({
    roles: actor.roles,
    resource: 'data_item',
    action: 'share',
    state: item.state,
    actorScopes: actor.scopes,
    scopeTarget: buildScopeTargetFromItem(item),
  });

  if (decision.allowed) {
    return true;
  }

  return item.saleOwnerUserId === actor.userId;
}

function toPublicShareUrl(request: NextRequest, token: string): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  const base = configuredSiteUrl || request.nextUrl.origin;
  return `${base}/api/public/share/${token}`;
}

function mapShareLink(link: DataShareLinkRecord, request: NextRequest) {
  return {
    ...link,
    url: toPublicShareUrl(request, link.token),
  };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }

    const params = await context.params;
    const itemId = parseId(params.id);
    if (!itemId) {
      return NextResponse.json(
        { ok: false, code: 'invalid_item_id', message: 'ID dữ liệu không hợp lệ.' },
        { status: 400 },
      );
    }

    const item = await getOrderDataItemById(itemId);
    if (!item) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu.' },
        { status: 404 },
      );
    }

    if (!canActorViewDataItem(actor, item)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem dữ liệu này.' },
        { status: 403 },
      );
    }

    const links = await listDataShareLinksByDataItemId(itemId, 100);
    return NextResponse.json({
      ok: true,
      links: links.map((link) => mapShareLink(link, request)),
    });
  } catch (error) {
    console.error('[API][internal][order-data-items/:id/share-links][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải danh sách link chia sẻ.' },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: CreateShareLinkBody;
  try {
    body = (await request.json()) as CreateShareLinkBody;
  } catch {
    body = {};
  }

  const expiresInDaysRaw = body.expiresInDays;
  const expiresInDays =
    expiresInDaysRaw == null ? 7 : Math.floor(Number(expiresInDaysRaw));
  if (!Number.isFinite(expiresInDays) || expiresInDays < 1 || expiresInDays > 365) {
    return NextResponse.json(
      {
        ok: false,
        code: 'invalid_expiry',
        message: 'Số ngày hết hạn phải từ 1 đến 365.',
      },
      { status: 400 },
    );
  }

  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }

    const clientIp = getRequestIp(request) ?? 'unknown';
    const rateLimit = consumeRateLimit({
      namespace: 'share_link_create',
      key: `${actor.userId}:${clientIp}`,
      max: readRateLimitEnv('APP_RATE_LIMIT_SHARE_CREATE_MAX', 30),
      windowMs: readRateLimitEnv('APP_RATE_LIMIT_SHARE_CREATE_WINDOW_SECONDS', 600) * 1000,
    });
    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        'Bạn đang tạo link chia sẻ quá nhanh. Vui lòng thử lại sau.',
        rateLimit,
      );
    }

    const params = await context.params;
    const itemId = parseId(params.id);
    if (!itemId) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'invalid_item_id', message: 'ID dữ liệu không hợp lệ.' },
        { status: 400 },
      ), rateLimit);
    }

    const item = await getOrderDataItemById(itemId);
    if (!item) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu.' },
        { status: 404 },
      ), rateLimit);
    }

    if (!canActorShareDataItem(actor, item)) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo link chia sẻ.' },
        { status: 403 },
      ), rateLimit);
    }

    const expiresAt = new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString();
    const token = randomBytes(24).toString('base64url');
    const link = await createDataShareLink({
      dataItemId: itemId,
      token,
      createdBy: actor.userId,
      expiresAt,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create_share_link',
      resource: 'order_data_item',
      resourceId: String(item.id),
      after: {
        shareLinkId: link.id,
        expiresAt: link.expiresAt,
      },
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent'),
    });

    return applyRateLimitHeaders(NextResponse.json(
      {
        ok: true,
        link: mapShareLink(link, request),
      },
      { status: 201 },
    ), rateLimit);
  } catch (error) {
    console.error('[API][internal][order-data-items/:id/share-links][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo link chia sẻ.' },
      { status: 500 },
    );
  }
}
