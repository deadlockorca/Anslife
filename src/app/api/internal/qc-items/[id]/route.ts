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
  getQcItemById,
  updateQcItem,
} from '../../../../../lib/repositories/workflowRepository';

export const dynamic = 'force-dynamic';

interface UpdateQcItemBody {
  title?: string;
  findingType?: string;
  severity?: string;
  reportNo?: string | null;
  observedAt?: string | null;
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

function isValidTypeValue(value: string): boolean {
  return /^[a-z0-9._-]{2,64}$/i.test(value);
}

function buildScopeTargetFromItem(
  item: NonNullable<Awaited<ReturnType<typeof getQcItemById>>>,
) {
  return buildOrderScopeTarget({
    orderNo: item.orderNo,
    customerCode: item.customer.code,
    factoryCode: item.factory?.code ?? null,
    marketCode: item.customer.countryCode,
  });
}

function canActorViewQcItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: NonNullable<Awaited<ReturnType<typeof getQcItemById>>>,
): boolean {
  if (!isDataState(item.state)) {
    return false;
  }

  const decision = can({
    roles: actor.roles,
    resource: 'qc_item',
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

    const item = await getQcItemById(itemId);
    if (!item) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu QC.' },
        { status: 404 },
      );
    }

    if (!canActorViewQcItem(actor, item)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem dữ liệu này.' },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error('[API][internal][qc-items/:id][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải chi tiết dữ liệu QC.' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateQcItemBody = {};
  try {
    body = (await request.json()) as UpdateQcItemBody;
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

  const title = body.title == null ? undefined : String(body.title).trim();
  const findingType =
    body.findingType == null
      ? undefined
      : String(body.findingType).trim().toLowerCase();
  const severity =
    body.severity == null ? undefined : String(body.severity).trim().toLowerCase();
  const reportNo = body.reportNo == null ? body.reportNo : String(body.reportNo).trim();
  const observedAt =
    body.observedAt == null ? body.observedAt : String(body.observedAt).trim();
  const metadata =
    body.metadata === undefined
      ? undefined
      : body.metadata === null
        ? null
        : body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
          ? body.metadata
          : undefined;
  const state = body.state == null ? undefined : String(body.state).trim().toLowerCase();

  if (title !== undefined && (title.length < 2 || title.length > 255)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_title', message: 'Tiêu đề QC không hợp lệ.' },
      { status: 400 },
    );
  }
  if (findingType !== undefined && !isValidTypeValue(findingType)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_finding_type', message: 'Finding type không hợp lệ.' },
      { status: 400 },
    );
  }
  if (severity !== undefined && !isValidTypeValue(severity)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_severity', message: 'Mức độ lỗi không hợp lệ.' },
      { status: 400 },
    );
  }
  if (reportNo !== undefined && reportNo !== null && reportNo.length > 128) {
    return NextResponse.json(
      { ok: false, code: 'invalid_report_no', message: 'Mã báo cáo quá dài.' },
      { status: 400 },
    );
  }
  if (observedAt !== undefined && observedAt !== null) {
    const parsed = new Date(observedAt);
    if (Number.isNaN(parsed.getTime())) {
      return NextResponse.json(
        { ok: false, code: 'invalid_observed_at', message: 'Thời gian ghi nhận không hợp lệ.' },
        { status: 400 },
      );
    }
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
    title !== undefined ||
    findingType !== undefined ||
    severity !== undefined ||
    reportNo !== undefined ||
    observedAt !== undefined ||
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

    const currentItem = await getQcItemById(itemId);
    if (!currentItem) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu QC.' },
        { status: 404 },
      );
    }
    if (!isDataState(currentItem.state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái hiện tại của dữ liệu QC không hợp lệ.' },
        { status: 500 },
      );
    }
    const currentState: DataState = currentItem.state;

    if (!canActorViewQcItem(actor, currentItem)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền sửa dữ liệu này.' },
        { status: 403 },
      );
    }

    const scopeTarget = buildScopeTargetFromItem(currentItem);
    const hasContentUpdate =
      title !== undefined ||
      findingType !== undefined ||
      severity !== undefined ||
      reportNo !== undefined ||
      observedAt !== undefined ||
      metadata !== undefined;
    if (hasContentUpdate) {
      const updateDecision = can({
        roles: actor.roles,
        resource: 'qc_item',
        action: 'update',
        state: currentState,
        actorScopes: actor.scopes,
        scopeTarget,
      });
      if (!updateDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật dữ liệu QC.' },
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

    const updated = await updateQcItem(itemId, {
      title,
      findingType,
      severity,
      reportNo,
      observedAt,
      metadata,
      state,
      approvedBy,
      approvedAt,
    });
    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu QC.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: state !== undefined && state !== currentItem.state ? 'change_state' : 'update',
      resource: 'qc_item',
      resourceId: String(updated.id),
      before: {
        state: currentItem.state,
        title: currentItem.title,
        severity: currentItem.severity,
      },
      after: {
        state: updated.state,
        title: updated.title,
        severity: updated.severity,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Không thể cập nhật dữ liệu QC.';
    const statusCode =
      message.includes('Invalid datetime format') || message.includes('Invalid date')
        ? 400
        : 500;
    console.error('[API][internal][qc-items/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: statusCode === 400 ? 'invalid_input' : 'internal_error', message },
      { status: statusCode },
    );
  }
}
