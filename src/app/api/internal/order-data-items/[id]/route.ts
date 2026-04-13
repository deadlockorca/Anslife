import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../../lib/auth/authorization';
import { DATA_STATES, can, canTransitionDataState } from '../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { buildOrderScopeTarget } from '../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { getOrderDataItemById, updateOrderDataItem } from '../../../../../lib/repositories/orderDataItemRepository';

export const dynamic = 'force-dynamic';

interface UpdateDataItemBody {
  dataType?: string;
  title?: string;
  storageKey?: string | null;
  metadata?: Record<string, unknown> | null;
  state?: string;
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

function buildScopeTargetFromItem(
  item: NonNullable<Awaited<ReturnType<typeof getOrderDataItemById>>>,
) {
  return buildOrderScopeTarget({
    orderNo: item.orderNo,
    customerCode: item.customer.code,
    factoryCode: item.factory?.code ?? null,
    marketCode: item.customer.countryCode,
  });
}

function canActorViewDataItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: NonNullable<Awaited<ReturnType<typeof getOrderDataItemById>>>,
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

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error('[API][internal][order-data-items/:id][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải chi tiết dữ liệu.' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateDataItemBody;
  try {
    body = (await request.json()) as UpdateDataItemBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
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

  const dataType = body.dataType == null ? undefined : String(body.dataType).trim().toLowerCase();
  const title = body.title == null ? undefined : String(body.title).trim();
  const storageKey = body.storageKey == null ? body.storageKey : String(body.storageKey).trim();
  const metadata =
    body.metadata === undefined
      ? undefined
      : body.metadata === null
        ? null
        : body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
          ? body.metadata
          : undefined;
  const state = body.state == null ? undefined : String(body.state).trim().toLowerCase();

  if (dataType !== undefined && !/^[a-z0-9._-]{2,64}$/.test(dataType)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_data_type', message: 'Loại dữ liệu không hợp lệ.' },
      { status: 400 },
    );
  }
  if (title !== undefined && (title.length < 2 || title.length > 255)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_title', message: 'Tiêu đề dữ liệu không hợp lệ.' },
      { status: 400 },
    );
  }
  if (storageKey !== undefined && storageKey !== null && storageKey.length > 1024) {
    return NextResponse.json(
      { ok: false, code: 'invalid_storage_key', message: 'Storage key quá dài.' },
      { status: 400 },
    );
  }
  if (metadata === undefined && body.metadata !== undefined) {
    return NextResponse.json(
      { ok: false, code: 'invalid_metadata', message: 'Metadata phải là JSON object hoặc null.' },
      { status: 400 },
    );
  }
  if (state !== undefined && !isDataState(state)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_state', message: 'Trạng thái dữ liệu không hợp lệ.' },
      { status: 400 },
    );
  }

  const hasAnyField =
    dataType !== undefined ||
    title !== undefined ||
    storageKey !== undefined ||
    metadata !== undefined ||
    state !== undefined;
  if (!hasAnyField) {
    return NextResponse.json(
      { ok: false, code: 'no_changes', message: 'Không có dữ liệu cần cập nhật.' },
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

    const currentItem = await getOrderDataItemById(itemId);
    if (!currentItem) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu.' },
        { status: 404 },
      );
    }

    if (!canActorViewDataItem(actor, currentItem)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền sửa dữ liệu này.' },
        { status: 403 },
      );
    }

    const scopeTarget = buildScopeTargetFromItem(currentItem);

    const hasContentUpdate =
      dataType !== undefined ||
      title !== undefined ||
      storageKey !== undefined ||
      metadata !== undefined;
    if (hasContentUpdate) {
      if (!isDataState(currentItem.state)) {
        return NextResponse.json(
          { ok: false, code: 'invalid_current_state', message: 'Trạng thái dữ liệu hiện tại không hợp lệ.' },
          { status: 400 },
        );
      }

      const updateDecision = can({
        roles: actor.roles,
        resource: 'data_item',
        action: 'update',
        state: currentItem.state,
        actorScopes: actor.scopes,
        scopeTarget,
      });
      if (!updateDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật dữ liệu.' },
          { status: 403 },
        );
      }
    }

    let approvedBy: number | null | undefined;
    let approvedAt: string | null | undefined;
    if (state !== undefined && state !== currentItem.state) {
      if (!isDataState(currentItem.state)) {
        return NextResponse.json(
          { ok: false, code: 'invalid_current_state', message: 'Trạng thái dữ liệu hiện tại không hợp lệ.' },
          { status: 400 },
        );
      }

      const transitionDecision = canTransitionDataState({
        roles: actor.roles,
        from: currentItem.state,
        to: state,
      });
      if (!transitionDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: transitionDecision.reason },
          { status: 403 },
        );
      }

      if (['approved_internal', 'approved_sales', 'approved_buyer'].includes(state)) {
        approvedBy = actor.userId;
        approvedAt = new Date().toISOString();
      } else {
        approvedBy = null;
        approvedAt = null;
      }
    }

    const updated = await updateOrderDataItem(itemId, {
      dataType,
      title,
      storageKey,
      metadata,
      state,
      approvedBy,
      approvedAt,
    });
    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: state !== undefined && state !== currentItem.state ? 'change_state' : 'update',
      resource: 'order_data_item',
      resourceId: String(updated.id),
      before: {
        state: currentItem.state,
        title: currentItem.title,
        dataType: currentItem.dataType,
      },
      after: {
        state: updated.state,
        title: updated.title,
        dataType: updated.dataType,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Không thể cập nhật dữ liệu.';
    const statusCode = message.includes('Invalid approved_at datetime') ? 400 : 500;
    console.error('[API][internal][order-data-items/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: statusCode === 400 ? 'invalid_input' : 'internal_error', message },
      { status: statusCode },
    );
  }
}
