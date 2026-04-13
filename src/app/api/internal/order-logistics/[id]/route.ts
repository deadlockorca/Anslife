import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { buildOrderScopeTarget, canActorMutateOrder } from '../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import {
  getOrderLogisticsById,
  updateOrderLogisticsById,
} from '../../../../../lib/repositories/logisticsRepository';

export const dynamic = 'force-dynamic';

interface UpdateLogisticsBody {
  etd?: string | null;
  eta?: string | null;
  containerNo?: string | null;
  departurePort?: string | null;
  arrivalPort?: string | null;
  shippingLine?: string | null;
  vesselName?: string | null;
  note?: string | null;
}

function parseId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
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

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateLogisticsBody;
  try {
    body = (await request.json()) as UpdateLogisticsBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const params = await context.params;
  const logisticsId = parseId(params.id);
  if (!logisticsId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_logistics_id', message: 'Logistics ID không hợp lệ.' },
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

    const current = await getOrderLogisticsById(logisticsId);
    if (!current) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy logistics.' },
        { status: 404 },
      );
    }

    const scopeTarget = buildOrderScopeTarget({
      orderNo: current.orderNo,
      customerCode: current.customer.code,
      factoryCode: current.factory?.code ?? null,
      marketCode: current.customer.countryCode,
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

    const updated = await updateOrderLogisticsById(logisticsId, {
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

    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy logistics.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'update',
      resource: 'order_logistics',
      resourceId: String(updated.id),
      before: {
        etd: current.etd,
        eta: current.eta,
        containerNo: current.containerNo,
      },
      after: {
        etd: updated.etd,
        eta: updated.eta,
        containerNo: updated.containerNo,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item: updated });
  } catch (error) {
    console.error('[API][internal][order-logistics/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể cập nhật logistics.' },
      { status: 500 },
    );
  }
}
