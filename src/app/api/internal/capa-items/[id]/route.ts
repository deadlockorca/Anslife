import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../../lib/auth/authorization';
import {
  DATA_STATES,
  can,
  canTransitionDataState,
} from '../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { buildOrderScopeTarget } from '../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import {
  getCapaItemById,
  updateCapaItem,
} from '../../../../../lib/repositories/workflowRepository';

export const dynamic = 'force-dynamic';

interface UpdateCapaBody {
  qcItemId?: number | null;
  title?: string;
  rootCause?: string | null;
  correctiveAction?: string | null;
  preventiveAction?: string | null;
  ownerUserId?: number | null;
  dueDate?: string | null;
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

function parseOptionalLongText(value: string | null | undefined): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  const normalized = String(value).trim();
  if (!normalized) {
    return null;
  }
  if (normalized.length > 4000) {
    return undefined;
  }
  return normalized;
}

function buildScopeTargetFromItem(
  item: NonNullable<Awaited<ReturnType<typeof getCapaItemById>>>,
) {
  return buildOrderScopeTarget({
    orderNo: item.orderNo,
    customerCode: item.customer.code,
    factoryCode: item.factory?.code ?? null,
    marketCode: item.customer.countryCode,
  });
}

function canActorViewCapaItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: NonNullable<Awaited<ReturnType<typeof getCapaItemById>>>,
): boolean {
  if (!isDataState(item.state)) {
    return false;
  }
  const decision = can({
    roles: actor.roles,
    resource: 'capa_item',
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
        { ok: false, code: 'invalid_item_id', message: 'ID CAPA không hợp lệ.' },
        { status: 400 },
      );
    }

    const item = await getCapaItemById(itemId);
    if (!item) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy CAPA item.' },
        { status: 404 },
      );
    }
    if (!canActorViewCapaItem(actor, item)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem CAPA item này.' },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error('[API][internal][capa-items/:id][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải chi tiết CAPA.' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateCapaBody = {};
  try {
    body = (await request.json()) as UpdateCapaBody;
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
      { ok: false, code: 'invalid_item_id', message: 'ID CAPA không hợp lệ.' },
      { status: 400 },
    );
  }

  const qcItemId =
    body.qcItemId === undefined
      ? undefined
      : body.qcItemId === null
        ? null
        : Number(body.qcItemId);
  const title = body.title == null ? undefined : String(body.title).trim();
  const rootCause = parseOptionalLongText(body.rootCause);
  const correctiveAction = parseOptionalLongText(body.correctiveAction);
  const preventiveAction = parseOptionalLongText(body.preventiveAction);
  const ownerUserId =
    body.ownerUserId === undefined
      ? undefined
      : body.ownerUserId === null
        ? null
        : Number(body.ownerUserId);
  const dueDate = body.dueDate == null ? body.dueDate : String(body.dueDate).trim();
  const metadata =
    body.metadata === undefined
      ? undefined
      : body.metadata === null
        ? null
        : body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
          ? body.metadata
          : undefined;
  const state = body.state == null ? undefined : String(body.state).trim().toLowerCase();

  if (qcItemId !== undefined && qcItemId !== null && (!Number.isInteger(qcItemId) || qcItemId <= 0)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_qc_item_id', message: 'QC Item không hợp lệ.' },
      { status: 400 },
    );
  }
  if (title !== undefined && (title.length < 2 || title.length > 255)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_title', message: 'Tiêu đề CAPA không hợp lệ.' },
      { status: 400 },
    );
  }
  if (
    ownerUserId !== undefined &&
    ownerUserId !== null &&
    (!Number.isInteger(ownerUserId) || ownerUserId <= 0)
  ) {
    return NextResponse.json(
      { ok: false, code: 'invalid_owner_user_id', message: 'Owner user không hợp lệ.' },
      { status: 400 },
    );
  }
  if (dueDate !== undefined && dueDate !== null && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_due_date', message: 'Due date phải theo định dạng YYYY-MM-DD.' },
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
  if (
    (body.rootCause !== undefined && rootCause === undefined) ||
    (body.correctiveAction !== undefined && correctiveAction === undefined) ||
    (body.preventiveAction !== undefined && preventiveAction === undefined)
  ) {
    return NextResponse.json(
      { ok: false, code: 'invalid_text_length', message: 'Nội dung CAPA quá dài (tối đa 4000 ký tự mỗi trường).' },
      { status: 400 },
    );
  }

  const hasAnyField =
    qcItemId !== undefined ||
    title !== undefined ||
    rootCause !== undefined ||
    correctiveAction !== undefined ||
    preventiveAction !== undefined ||
    ownerUserId !== undefined ||
    dueDate !== undefined ||
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

    const currentItem = await getCapaItemById(itemId);
    if (!currentItem) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy CAPA item.' },
        { status: 404 },
      );
    }
    if (!isDataState(currentItem.state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái hiện tại của CAPA item không hợp lệ.' },
        { status: 500 },
      );
    }
    const currentState: DataState = currentItem.state;
    if (!canActorViewCapaItem(actor, currentItem)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền sửa CAPA item này.' },
        { status: 403 },
      );
    }

    const scopeTarget = buildScopeTargetFromItem(currentItem);
    const hasContentUpdate =
      qcItemId !== undefined ||
      title !== undefined ||
      rootCause !== undefined ||
      correctiveAction !== undefined ||
      preventiveAction !== undefined ||
      ownerUserId !== undefined ||
      dueDate !== undefined ||
      metadata !== undefined;
    if (hasContentUpdate) {
      const updateDecision = can({
        roles: actor.roles,
        resource: 'capa_item',
        action: 'update',
        state: currentState,
        actorScopes: actor.scopes,
        scopeTarget,
      });
      if (!updateDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật CAPA item.' },
          { status: 403 },
        );
      }
    }

    let approvedBy: number | null | undefined;
    let approvedAt: string | null | undefined;
    if (state !== undefined && state !== currentState) {
      const transitionDecision = canTransitionDataState({
        roles: actor.roles,
        from: currentState,
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

    const updated = await updateCapaItem(itemId, {
      qcItemId,
      title,
      rootCause,
      correctiveAction,
      preventiveAction,
      ownerUserId,
      dueDate,
      metadata,
      state,
      approvedBy,
      approvedAt,
    });
    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy CAPA item.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: state !== undefined && state !== currentItem.state ? 'change_state' : 'update',
      resource: 'capa_item',
      resourceId: String(updated.id),
      before: { state: currentItem.state, title: currentItem.title },
      after: { state: updated.state, title: updated.title },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Không thể cập nhật CAPA item.';
    const statusCode = message.includes('Invalid date') ? 400 : 500;
    console.error('[API][internal][capa-items/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: statusCode === 400 ? 'invalid_input' : 'internal_error', message },
      { status: statusCode },
    );
  }
}
