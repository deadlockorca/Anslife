import { NextRequest, NextResponse } from 'next/server';
import type { AppRole } from '../../../../../lib/auth/authorization';
import { can } from '../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { buildOrderScopeTarget } from '../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import {
  getOrderWorkLogById,
  updateOrderWorkLog,
  type WorkLogVisibility,
} from '../../../../../lib/repositories/workLogRepository';

export const dynamic = 'force-dynamic';

interface UpdateWorkLogBody {
  visibility?: WorkLogVisibility;
  noteType?: string;
  message?: string;
}

function parseId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function isVisibility(value: string): value is WorkLogVisibility {
  return value === 'internal' || value === 'trader' || value === 'buyer';
}

function hasAnyRole(roles: AppRole[], expected: AppRole[]): boolean {
  return expected.some((role) => roles.includes(role));
}

function isAdminLikeRole(roles: AppRole[]): boolean {
  return hasAnyRole(roles, ['super_admin', 'system_admin', 'data_controller', 'sale_trading']);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateWorkLogBody;
  try {
    body = (await request.json()) as UpdateWorkLogBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const params = await context.params;
  const logId = parseId(params.id);
  if (!logId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_worklog_id', message: 'Worklog ID không hợp lệ.' },
      { status: 400 },
    );
  }

  if (body.visibility !== undefined && !isVisibility(String(body.visibility))) {
    return NextResponse.json(
      { ok: false, code: 'invalid_visibility', message: 'Visibility không hợp lệ.' },
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

    const current = await getOrderWorkLogById(logId);
    if (!current) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy nhật ký.' },
        { status: 404 },
      );
    }

    const scopeTarget = buildOrderScopeTarget({
      orderNo: current.orderNo,
      customerCode: current.customer.code,
      factoryCode: current.factory?.code ?? null,
      marketCode: current.customer.countryCode,
    });
    const canViewOrder = can({
      roles: actor.roles,
      resource: 'order',
      action: 'view',
      actorScopes: actor.scopes,
      scopeTarget,
    }).allowed;
    if (!canViewOrder && current.saleOwnerUserId !== actor.userId) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền truy cập nhật ký này.' },
        { status: 403 },
      );
    }

    const adminLike = isAdminLikeRole(actor.roles);
    const isOwner = current.createdBy != null && current.createdBy === actor.userId;
    if (!adminLike && !isOwner) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền sửa nhật ký này.' },
        { status: 403 },
      );
    }

    if (!adminLike && body.visibility !== undefined && body.visibility !== current.visibility) {
      return NextResponse.json(
        { ok: false, code: 'forbidden_visibility', message: 'Bạn không có quyền đổi visibility.' },
        { status: 403 },
      );
    }

    const updated = await updateOrderWorkLog(logId, {
      visibility: body.visibility,
      noteType: body.noteType,
      message: body.message,
      updatedBy: actor.userId,
    });
    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy nhật ký.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'update',
      resource: 'order_work_log',
      resourceId: String(updated.id),
      before: {
        visibility: current.visibility,
        noteType: current.noteType,
        message: current.message,
      },
      after: {
        visibility: updated.visibility,
        noteType: updated.noteType,
        message: updated.message,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (error) {
    console.error('[API][internal][order-work-logs/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể cập nhật nhật ký.' },
      { status: 500 },
    );
  }
}
