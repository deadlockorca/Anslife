import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../../../../lib/auth/authorization';
import { DATA_STATES, can } from '../../../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../../../lib/auth/actor';
import { buildOrderScopeTarget } from '../../../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../../../lib/repositories/auditRepository';
import {
  applyRateLimitHeaders,
  consumeRateLimit,
  createRateLimitResponse,
  readRateLimitEnv,
} from '../../../../../../../lib/http/rateLimit';
import {
  deleteDataShareLinkById,
  getDataShareLinkById,
} from '../../../../../../../lib/repositories/dataShareLinkRepository';
import {
  getOrderDataItemById,
  type OrderDataItemRecord,
} from '../../../../../../../lib/repositories/orderDataItemRepository';

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

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string; linkId: string }> },
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
      namespace: 'share_link_revoke',
      key: `${actor.userId}:${clientIp}`,
      max: readRateLimitEnv('APP_RATE_LIMIT_SHARE_REVOKE_MAX', 40),
      windowMs: readRateLimitEnv('APP_RATE_LIMIT_SHARE_REVOKE_WINDOW_SECONDS', 600) * 1000,
    });
    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        'Bạn đang thu hồi link quá nhanh. Vui lòng thử lại sau.',
        rateLimit,
      );
    }

    const params = await context.params;
    const itemId = parseId(params.id);
    const linkId = parseId(params.linkId);
    if (!itemId || !linkId) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'invalid_id', message: 'ID dữ liệu hoặc link không hợp lệ.' },
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
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền thu hồi link chia sẻ.' },
        { status: 403 },
      ), rateLimit);
    }

    const link = await getDataShareLinkById(linkId);
    if (!link || link.dataItemId !== itemId) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy link chia sẻ.' },
        { status: 404 },
      ), rateLimit);
    }

    const deleted = await deleteDataShareLinkById(linkId);
    if (!deleted) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'not_found', message: 'Link chia sẻ đã bị xóa trước đó.' },
        { status: 404 },
      ), rateLimit);
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'revoke_share_link',
      resource: 'order_data_item',
      resourceId: String(item.id),
      before: {
        shareLinkId: link.id,
        expiresAt: link.expiresAt,
      },
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent'),
    });

    return applyRateLimitHeaders(
      NextResponse.json({ ok: true, revokedLinkId: linkId }),
      rateLimit,
    );
  } catch (error) {
    console.error(
      '[API][internal][order-data-items/:id/share-links/:linkId][DELETE] Failed:',
      error,
    );
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể thu hồi link chia sẻ.' },
      { status: 500 },
    );
  }
}
