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
import { getOrderDataItemById, type OrderDataItemRecord } from '../../../../../../lib/repositories/orderDataItemRepository';

export const dynamic = 'force-dynamic';

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

function canActorDownloadDataItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: OrderDataItemRecord,
): boolean {
  if (!isDataState(item.state)) {
    return false;
  }

  const decision = can({
    roles: actor.roles,
    resource: 'data_item',
    action: 'download',
    state: item.state,
    actorScopes: actor.scopes,
    scopeTarget: buildScopeTargetFromItem(item),
  });

  if (decision.allowed) {
    return true;
  }

  return item.saleOwnerUserId === actor.userId;
}

function resolveTargetUrl(request: NextRequest, storageKey: string): string | null {
  if (/^https?:\/\//i.test(storageKey)) {
    return storageKey;
  }
  if (storageKey.startsWith('/')) {
    return new URL(storageKey, request.nextUrl.origin).toString();
  }
  return null;
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

    const clientIp = getRequestIp(request) ?? 'unknown';
    const rateLimit = consumeRateLimit({
      namespace: 'data_item_download',
      key: `${actor.userId}:${clientIp}`,
      max: readRateLimitEnv('APP_RATE_LIMIT_DOWNLOAD_MAX', 120),
      windowMs: readRateLimitEnv('APP_RATE_LIMIT_DOWNLOAD_WINDOW_SECONDS', 600) * 1000,
    });
    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        'Bạn đang tải dữ liệu quá nhanh. Vui lòng thử lại sau.',
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
    if (!item.storageKey) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'missing_storage_key', message: 'Dữ liệu chưa có file để tải.' },
        { status: 404 },
      ), rateLimit);
    }
    if (!canActorDownloadDataItem(actor, item)) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tải dữ liệu này.' },
        { status: 403 },
      ), rateLimit);
    }

    const targetUrl = resolveTargetUrl(request, item.storageKey);
    if (!targetUrl) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'invalid_storage_key', message: 'Đường dẫn file không hợp lệ.' },
        { status: 409 },
      ), rateLimit);
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'download',
      resource: 'order_data_item',
      resourceId: String(item.id),
      after: {
        storageKey: item.storageKey,
      },
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent'),
    });

    return applyRateLimitHeaders(
      NextResponse.redirect(targetUrl, { status: 302 }),
      rateLimit,
    );
  } catch (error) {
    console.error('[API][internal][order-data-items/:id/download][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải tài liệu.' },
      { status: 500 },
    );
  }
}
