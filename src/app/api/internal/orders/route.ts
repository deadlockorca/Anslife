import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { isOrderStatus, type OrderStatus } from '../../../../lib/auth/authorization';
import {
  buildOrderScopeTarget,
  canActorMutateOrder,
  canActorViewOrder,
  canEnterOrderModule,
} from '../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { createTradeOrder, listTradeOrders, type CreateTradeOrderInput } from '../../../../lib/repositories/orderRepository';
import {
  getCustomerByCode,
  getCustomerById,
  getFactoryByCode,
  getFactoryById,
} from '../../../../lib/repositories/masterDataRepository';

export const dynamic = 'force-dynamic';

interface CreateOrderBody {
  orderNo?: string;
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

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }

  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function parseAssignments(input: CreateOrderBody['assignments']) {
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

function isOrderNoValid(value: string): boolean {
  return /^[A-Za-z0-9._/-]{4,64}$/.test(value);
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

export async function GET(request: NextRequest) {
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

    const url = new URL(request.url);
    const perPage = parsePerPage(url.searchParams.get('per_page'));
    const status = url.searchParams.get('status')?.trim().toLowerCase() ?? '';
    const customerCode = url.searchParams.get('customer_code')?.trim() ?? '';
    const factoryCode = url.searchParams.get('factory_code')?.trim() ?? '';
    const orderNo = url.searchParams.get('order_no')?.trim() ?? '';

    if (status && !isOrderStatus(status)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_status', message: 'Trạng thái đơn hàng không hợp lệ.' },
        { status: 400 },
      );
    }

    const orders = await listTradeOrders({
      limit: perPage,
      status: status || undefined,
      customerCode: customerCode || undefined,
      factoryCode: factoryCode || undefined,
      orderNo: orderNo || undefined,
    });

    const filteredOrders = orders.filter((order) => canActorViewOrder(actor, order));
    return NextResponse.json({ ok: true, orders: filteredOrders });
  } catch (error) {
    console.error('[API][internal][orders][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải danh sách đơn hàng.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateOrderBody;
  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const orderNo = String(body.orderNo ?? '').trim().toUpperCase();
  if (!isOrderNoValid(orderNo)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_order_no', message: 'Mã đơn hàng không hợp lệ.' },
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
      : null;
  const assignments = parseAssignments(body.assignments);

  if (!customerId && !customerCode) {
    return NextResponse.json(
      { ok: false, code: 'missing_customer', message: 'Cần truyền customerId hoặc customerCode.' },
      { status: 400 },
    );
  }
  if (status !== undefined && !isOrderStatus(status)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_status', message: 'Trạng thái đơn hàng không hợp lệ.' },
      { status: 400 },
    );
  }
  if (status !== undefined && status !== 'draft') {
    return NextResponse.json(
      {
        ok: false,
        code: 'invalid_initial_status',
        message: 'Đơn hàng mới chỉ được tạo ở trạng thái Draft.',
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

    const factoryRef = await resolveScopeFactoryRef({
      factoryId,
      factoryCode,
    });
    if ((factoryId !== undefined || factoryCode !== undefined) && factoryRef === undefined) {
      return NextResponse.json(
        { ok: false, code: 'factory_not_found', message: 'Không tìm thấy nhà máy.' },
        { status: 400 },
      );
    }

    const scopeTarget = buildOrderScopeTarget({
      orderNo,
      customerCode: customerRef.code,
      factoryCode: factoryRef?.code ?? null,
      marketCode: customerRef.countryCode,
    });
    const canCreate = canActorMutateOrder(
      actor,
      'create',
      scopeTarget,
      getAllowSaleOrderWrite(),
    );
    if (!canCreate) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo đơn hàng.' },
        { status: 403 },
      );
    }

    const input: CreateTradeOrderInput = {
      orderNo,
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
    const order = await createTradeOrder(input);

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'order',
      resourceId: String(order.id),
      after: {
        orderNo: order.orderNo,
        status: order.status,
        customerCode: order.customer.code,
        factoryCode: order.factory?.code ?? null,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, order }, { status: 201 });
  } catch (error) {
    const duplicateOrderNo =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'ER_DUP_ENTRY';
    if (duplicateOrderNo) {
      return NextResponse.json(
        { ok: false, code: 'order_no_exists', message: 'Mã đơn hàng đã tồn tại.' },
        { status: 409 },
      );
    }

    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Không thể tạo đơn hàng.';
    const statusCode =
      message.includes('not found') || message.includes('Invalid due date') ? 400 : 500;
    console.error('[API][internal][orders][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: statusCode === 400 ? 'invalid_input' : 'internal_error', message },
      { status: statusCode },
    );
  }
}
