import { NextRequest, NextResponse } from 'next/server';
import { can, type AppRole } from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { buildOrderScopeTarget, canActorMutateOrder } from '../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { getTradeOrderById } from '../../../../lib/repositories/orderRepository';
import {
  createOrderWorkLog,
  listOrderWorkLogs,
  type OrderWorkLogRecord,
  type WorkLogVisibility,
} from '../../../../lib/repositories/workLogRepository';

export const dynamic = 'force-dynamic';

interface CreateWorkLogBody {
  orderId?: number;
  visibility?: WorkLogVisibility;
  noteType?: string;
  message?: string;
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }
  return Math.min(400, Math.max(1, Math.floor(parsed)));
}

function isVisibility(value: string): value is WorkLogVisibility {
  return value === 'internal' || value === 'trader' || value === 'buyer';
}

function hasAnyRole(roles: AppRole[], expected: AppRole[]): boolean {
  return expected.some((role) => roles.includes(role));
}

function canRoleViewVisibility(roles: AppRole[], visibility: WorkLogVisibility): boolean {
  if (hasAnyRole(roles, ['super_admin', 'system_admin', 'data_controller', 'sale_trading'])) {
    return true;
  }

  if (roles.includes('buyer')) {
    return visibility === 'buyer';
  }

  if (roles.includes('factory_partner')) {
    return visibility === 'internal';
  }

  if (roles.includes('qc') || roles.includes('factory_collector')) {
    return visibility === 'internal';
  }

  return false;
}

function getAllowedCreateVisibilities(roles: AppRole[]): WorkLogVisibility[] {
  if (hasAnyRole(roles, ['super_admin', 'system_admin', 'data_controller', 'sale_trading'])) {
    return ['internal', 'trader', 'buyer'];
  }
  if (roles.includes('factory_partner') || roles.includes('qc') || roles.includes('factory_collector')) {
    return ['internal'];
  }
  return [];
}

function canActorViewWorkLog(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: OrderWorkLogRecord,
): boolean {
  const decision = can({
    roles: actor.roles,
    resource: 'order',
    action: 'view',
    actorScopes: actor.scopes,
    scopeTarget: buildOrderScopeTarget({
      orderNo: item.orderNo,
      customerCode: item.customer.code,
      factoryCode: item.factory?.code ?? null,
      marketCode: item.customer.countryCode,
    }),
  });

  if (!decision.allowed && item.saleOwnerUserId !== actor.userId) {
    return false;
  }

  return canRoleViewVisibility(actor.roles, item.visibility);
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

    const orderViewDecision = can({
      roles: actor.roles,
      resource: 'order',
      action: 'view',
      actorScopes: actor.scopes,
    });
    if (!orderViewDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem nhật ký làm việc.' },
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const rawVisibility = url.searchParams.get('visibility')?.trim().toLowerCase() ?? '';
    if (rawVisibility && !isVisibility(rawVisibility)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_visibility', message: 'Visibility không hợp lệ.' },
        { status: 400 },
      );
    }

    const visibilityFilter: WorkLogVisibility | undefined = rawVisibility
      ? (rawVisibility as WorkLogVisibility)
      : undefined;

    const items = await listOrderWorkLogs({
      limit: parsePerPage(url.searchParams.get('per_page')),
      orderNo: url.searchParams.get('order_no')?.trim() || undefined,
      visibility: visibilityFilter,
    });
    const visibleItems = items.filter((item) => canActorViewWorkLog(actor, item));
    return NextResponse.json({ ok: true, items: visibleItems });
  } catch (error) {
    console.error('[API][internal][order-work-logs][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải nhật ký làm việc.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateWorkLogBody;
  try {
    body = (await request.json()) as CreateWorkLogBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const orderId = Number(body.orderId);
  const visibility = String(body.visibility ?? '').trim().toLowerCase();
  const noteType = String(body.noteType ?? '');
  const message = String(body.message ?? '');

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return NextResponse.json(
      { ok: false, code: 'invalid_order_id', message: 'Đơn hàng không hợp lệ.' },
      { status: 400 },
    );
  }
  if (!isVisibility(visibility)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_visibility', message: 'Visibility không hợp lệ.' },
      { status: 400 },
    );
  }
  if (message.trim().length < 2) {
    return NextResponse.json(
      { ok: false, code: 'invalid_message', message: 'Nội dung ghi chú không hợp lệ.' },
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

    const order = await getTradeOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        { ok: false, code: 'order_not_found', message: 'Không tìm thấy đơn hàng.' },
        { status: 404 },
      );
    }

    const scopeTarget = buildOrderScopeTarget({
      orderNo: order.orderNo,
      customerCode: order.customer.code,
      factoryCode: order.factory?.code ?? null,
      marketCode: order.customer.countryCode,
    });

    const canViewOrder = can({
      roles: actor.roles,
      resource: 'order',
      action: 'view',
      actorScopes: actor.scopes,
      scopeTarget,
    }).allowed;
    if (!canViewOrder && order.saleOwnerUserId !== actor.userId) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền ghi nhật ký cho đơn này.' },
        { status: 403 },
      );
    }

    const canWrite = canActorMutateOrder(
      actor,
      'update',
      scopeTarget,
      process.env.APP_ALLOW_SALE_ORDER_WRITE === '1',
    );
    const fallbackWriteRoles: AppRole[] = ['qc', 'factory_collector', 'factory_partner'];
    const canFallbackWrite = hasAnyRole(actor.roles, fallbackWriteRoles);
    if (!canWrite && !canFallbackWrite) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo nhật ký làm việc.' },
        { status: 403 },
      );
    }

    const allowedVisibilities = getAllowedCreateVisibilities(actor.roles);
    if (!allowedVisibilities.includes(visibility)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden_visibility', message: 'Bạn không có quyền tạo loại ghi chú này.' },
        { status: 403 },
      );
    }

    const item = await createOrderWorkLog({
      orderId,
      visibility,
      noteType,
      message,
      createdBy: actor.userId,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'order_work_log',
      resourceId: String(item.id),
      after: {
        orderNo: item.orderNo,
        visibility: item.visibility,
        noteType: item.noteType,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    console.error('[API][internal][order-work-logs][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo nhật ký làm việc.' },
      { status: 500 },
    );
  }
}
