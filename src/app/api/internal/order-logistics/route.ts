import { NextRequest, NextResponse } from 'next/server';
import { can } from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { buildOrderScopeTarget, canActorMutateOrder } from '../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { getTradeOrderById } from '../../../../lib/repositories/orderRepository';
import {
  listOrderLogistics,
  upsertOrderLogistics,
  type OrderLogisticsRecord,
} from '../../../../lib/repositories/logisticsRepository';

export const dynamic = 'force-dynamic';

interface UpsertLogisticsBody {
  orderId?: number;
  etd?: string | null;
  eta?: string | null;
  containerNo?: string | null;
  departurePort?: string | null;
  arrivalPort?: string | null;
  shippingLine?: string | null;
  vesselName?: string | null;
  note?: string | null;
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }
  return Math.min(300, Math.max(1, Math.floor(parsed)));
}

function getOptionalString(value: unknown): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (value == null) {
    return null;
  }
  return String(value);
}

function canActorViewLogistics(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: OrderLogisticsRecord,
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

  if (decision.allowed) {
    return true;
  }

  return item.saleOwnerUserId === actor.userId;
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

    const viewDecision = can({
      roles: actor.roles,
      resource: 'order',
      action: 'view',
      actorScopes: actor.scopes,
    });
    if (!viewDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem logistics.' },
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const items = await listOrderLogistics({
      limit: parsePerPage(url.searchParams.get('per_page')),
      orderNo: url.searchParams.get('order_no')?.trim() || undefined,
      customerCode: url.searchParams.get('customer_code')?.trim() || undefined,
      factoryCode: url.searchParams.get('factory_code')?.trim() || undefined,
    });

    const visibleItems = items.filter((item) => canActorViewLogistics(actor, item));
    return NextResponse.json({ ok: true, items: visibleItems });
  } catch (error) {
    console.error('[API][internal][order-logistics][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải logistics.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: UpsertLogisticsBody;
  try {
    body = (await request.json()) as UpsertLogisticsBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const orderId = Number(body.orderId);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    return NextResponse.json(
      { ok: false, code: 'invalid_order_id', message: 'Đơn hàng không hợp lệ.' },
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

    const canWrite = canActorMutateOrder(
      actor,
      'update',
      scopeTarget,
      process.env.APP_ALLOW_SALE_ORDER_WRITE === '1',
    );
    if (!canWrite) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật logistics.' },
        { status: 403 },
      );
    }

    const item = await upsertOrderLogistics({
      orderId,
      etd: getOptionalString(body.etd),
      eta: getOptionalString(body.eta),
      containerNo: getOptionalString(body.containerNo),
      departurePort: getOptionalString(body.departurePort),
      arrivalPort: getOptionalString(body.arrivalPort),
      shippingLine: getOptionalString(body.shippingLine),
      vesselName: getOptionalString(body.vesselName),
      note: getOptionalString(body.note),
      updatedBy: actor.userId,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'update',
      resource: 'order_logistics',
      resourceId: String(item.id),
      after: {
        orderNo: item.orderNo,
        etd: item.etd,
        eta: item.eta,
        containerNo: item.containerNo,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error('[API][internal][order-logistics][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể cập nhật logistics.' },
      { status: 500 },
    );
  }
}
