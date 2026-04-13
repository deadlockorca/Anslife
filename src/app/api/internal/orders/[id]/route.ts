import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import {
  can,
  canTransitionOrderStatus,
  isOrderStatus,
  type OrderStatus,
} from '../../../../../lib/auth/authorization';
import {
  buildOrderScopeTarget,
  canActorMutateOrder,
  canActorViewOrder,
  canEnterOrderModule,
} from '../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { getTradeOrderById, updateTradeOrder, type UpdateTradeOrderInput } from '../../../../../lib/repositories/orderRepository';
import {
  getCustomerByCode,
  getCustomerById,
  getFactoryByCode,
  getFactoryById,
} from '../../../../../lib/repositories/masterDataRepository';

export const dynamic = 'force-dynamic';

interface UpdateOrderBody {
  customerId?: number;
  customerCode?: string;
  factoryId?: number | null;
  factoryCode?: string | null;
  saleOwnerUserId?: number | null;
  status?: string;
  dueDate?: string | null;
  metadata?: Record<string, unknown> | null;
  assignments?: Array<{ userId?: number; assignmentRole?: string }>;
}

function parseId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function parseAssignments(input: UpdateOrderBody['assignments']) {
  if (!Array.isArray(input)) {
    return undefined;
  }

  return input
    .map((assignment) => ({
      userId: Number(assignment.userId),
      assignmentRole: String(assignment.assignmentRole ?? '').trim(),
    }))
    .filter(
      (assignment) =>
        Number.isInteger(assignment.userId) &&
        assignment.userId > 0 &&
        assignment.assignmentRole.length > 0 &&
        assignment.assignmentRole.length <= 64,
    );
}

function getAllowSaleOrderWrite(): boolean {
  return process.env.APP_ALLOW_SALE_ORDER_WRITE === '1';
}

function normalizeCode(value: string | null | undefined): string | null {
  const normalized = String(value ?? '').trim().toUpperCase();
  return normalized.length > 0 ? normalized : null;
}

async function resolveScopeCustomerRef(input: {
  customerId?: number;
  customerCode?: string;
}) {
  if (Number.isInteger(input.customerId) && Number(input.customerId) > 0) {
    return getCustomerById(Number(input.customerId));
  }

  const normalizedCode = normalizeCode(input.customerCode);
  if (normalizedCode) {
    return getCustomerByCode(normalizedCode);
  }

  return null;
}

async function resolveScopeFactoryRef(input: {
  factoryId?: number | null;
  factoryCode?: string | null;
}) {
  if (input.factoryId === null || input.factoryCode === null) {
    return null;
  }

  if (Number.isInteger(input.factoryId) && Number(input.factoryId) > 0) {
    return getFactoryById(Number(input.factoryId));
  }

  const normalizedCode = normalizeCode(input.factoryCode);
  if (normalizedCode) {
    return getFactoryByCode(normalizedCode);
  }

  return undefined;
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

    if (!canEnterOrderModule(actor)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền truy cập module đơn hàng.' },
        { status: 403 },
      );
    }

    const params = await context.params;
    const orderId = parseId(params.id);
    if (!orderId) {
      return NextResponse.json(
        { ok: false, code: 'invalid_order_id', message: 'ID đơn hàng không hợp lệ.' },
        { status: 400 },
      );
    }

    const order = await getTradeOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy đơn hàng.' },
        { status: 404 },
      );
    }

    if (!canActorViewOrder(actor, order)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem đơn hàng này.' },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true, order });
  } catch (error) {
    console.error('[API][internal][orders/:id][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải chi tiết đơn hàng.' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateOrderBody;
  try {
    body = (await request.json()) as UpdateOrderBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const params = await context.params;
  const orderId = parseId(params.id);
  if (!orderId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_order_id', message: 'ID đơn hàng không hợp lệ.' },
      { status: 400 },
    );
  }

  const customerId =
    body.customerId !== undefined && Number.isInteger(Number(body.customerId))
      ? Number(body.customerId)
      : undefined;
  const factoryId =
    body.factoryId !== undefined && body.factoryId !== null && Number.isInteger(Number(body.factoryId))
      ? Number(body.factoryId)
      : body.factoryId === null
        ? null
        : undefined;
  const saleOwnerUserId =
    body.saleOwnerUserId !== undefined &&
    body.saleOwnerUserId !== null &&
    Number.isInteger(Number(body.saleOwnerUserId))
      ? Number(body.saleOwnerUserId)
      : body.saleOwnerUserId === null
        ? null
        : undefined;
  const customerCode = body.customerCode?.trim();
  const factoryCode = body.factoryCode == null ? body.factoryCode : body.factoryCode.trim();
  const status = body.status == null ? undefined : String(body.status).trim().toLowerCase();
  const dueDate = body.dueDate == null ? body.dueDate : body.dueDate.trim();
  const metadata =
    body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
      ? body.metadata
      : body.metadata === null
        ? null
        : undefined;
  const assignments = parseAssignments(body.assignments);

  const hasAnyField =
    customerId !== undefined ||
    customerCode !== undefined ||
    factoryId !== undefined ||
    factoryCode !== undefined ||
    saleOwnerUserId !== undefined ||
    status !== undefined ||
    dueDate !== undefined ||
    metadata !== undefined ||
    assignments !== undefined;
  if (!hasAnyField) {
    return NextResponse.json(
      { ok: false, code: 'no_changes', message: 'Không có dữ liệu cần cập nhật.' },
      { status: 400 },
    );
  }

  if (status !== undefined && !isOrderStatus(status)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_status', message: 'Trạng thái đơn hàng không hợp lệ.' },
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

    const currentOrder = await getTradeOrderById(orderId);
    if (!currentOrder) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy đơn hàng.' },
        { status: 404 },
      );
    }

    if (!canActorViewOrder(actor, currentOrder)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật đơn hàng này.' },
        { status: 403 },
      );
    }

    let targetCustomerCode = currentOrder.customer.code;
    let targetMarketCode = currentOrder.customer.countryCode;
    if (customerId !== undefined || customerCode !== undefined) {
      const customerRef = await resolveScopeCustomerRef({
        customerId,
        customerCode,
      });
      if (!customerRef) {
        return NextResponse.json(
          { ok: false, code: 'customer_not_found', message: 'Không tìm thấy khách hàng.' },
          { status: 400 },
        );
      }

      targetCustomerCode = customerRef.code;
      targetMarketCode = customerRef.countryCode;
    }

    let targetFactoryCode = currentOrder.factory?.code ?? null;
    if (factoryId !== undefined || factoryCode !== undefined) {
      const factoryRef = await resolveScopeFactoryRef({
        factoryId,
        factoryCode,
      });
      if (factoryRef === undefined) {
        return NextResponse.json(
          { ok: false, code: 'factory_not_found', message: 'Không tìm thấy nhà máy.' },
          { status: 400 },
        );
      }
      targetFactoryCode = factoryRef?.code ?? null;
    }

    const scopeTarget = buildOrderScopeTarget({
      orderNo: currentOrder.orderNo,
      customerCode: targetCustomerCode,
      factoryCode: targetFactoryCode,
      marketCode: targetMarketCode,
    });
    const canUpdate = canActorMutateOrder(
      actor,
      'update',
      scopeTarget,
      getAllowSaleOrderWrite(),
    );
    if (!canUpdate) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật đơn hàng.' },
        { status: 403 },
      );
    }

    if (status !== undefined && status !== currentOrder.status) {
      if (!isOrderStatus(currentOrder.status)) {
        return NextResponse.json(
          {
            ok: false,
            code: 'invalid_current_status',
            message: 'Trạng thái đơn hàng hiện tại không hợp lệ.',
          },
          { status: 400 },
        );
      }

      const changeStatusDecision = can({
        roles: actor.roles,
        resource: 'order',
        action: 'change_status',
        actorScopes: actor.scopes,
        scopeTarget,
      });
      if (!changeStatusDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: changeStatusDecision.reason },
          { status: 403 },
        );
      }

      const transitionDecision = canTransitionOrderStatus({
        roles: actor.roles,
        from: currentOrder.status as OrderStatus,
        to: status,
      });
      if (!transitionDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'invalid_status_transition', message: transitionDecision.reason },
          { status: 403 },
        );
      }
    }

    const input: UpdateTradeOrderInput = {
      customerId,
      customerCode,
      factoryId,
      factoryCode: factoryCode ?? undefined,
      saleOwnerUserId,
      status: (status as OrderStatus | undefined) ?? undefined,
      dueDate,
      metadata,
      assignments,
    };
    const updated = await updateTradeOrder(orderId, input);
    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy đơn hàng.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'update',
      resource: 'order',
      resourceId: String(updated.id),
      before: {
        status: currentOrder.status,
        dueDate: currentOrder.dueDate,
        customerCode: currentOrder.customer.code,
        factoryCode: currentOrder.factory?.code ?? null,
      },
      after: {
        status: updated.status,
        dueDate: updated.dueDate,
        customerCode: updated.customer.code,
        factoryCode: updated.factory?.code ?? null,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, order: updated });
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Không thể cập nhật đơn hàng.';
    const statusCode =
      message.includes('not found') || message.includes('Invalid due date') ? 400 : 500;
    console.error('[API][internal][orders/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: statusCode === 400 ? 'invalid_input' : 'internal_error', message },
      { status: statusCode },
    );
  }
}
