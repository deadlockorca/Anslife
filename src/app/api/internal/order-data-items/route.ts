import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../lib/auth/authorization';
import { DATA_STATES, can } from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { buildOrderScopeTarget } from '../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { getTradeOrderById } from '../../../../lib/repositories/orderRepository';
import { createOrderDataItem, listOrderDataItems, type OrderDataItemRecord } from '../../../../lib/repositories/orderDataItemRepository';

export const dynamic = 'force-dynamic';

interface CreateDataItemBody {
  orderId?: number;
  dataType?: string;
  title?: string;
  storageKey?: string | null;
  metadata?: Record<string, unknown> | null;
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }

  return Math.min(200, Math.max(1, Math.floor(parsed)));
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

function canActorViewDataItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: OrderDataItemRecord,
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

export async function GET(request: NextRequest) {
  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }

    const url = new URL(request.url);
    const perPage = parsePerPage(url.searchParams.get('per_page'));
    const orderNo = url.searchParams.get('order_no')?.trim() ?? '';
    const state = url.searchParams.get('state')?.trim().toLowerCase() ?? '';
    const dataType = url.searchParams.get('data_type')?.trim().toLowerCase() ?? '';

    if (state && !isDataState(state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái dữ liệu không hợp lệ.' },
        { status: 400 },
      );
    }

    const items = await listOrderDataItems({
      limit: perPage,
      orderNo: orderNo || undefined,
      state: state || undefined,
      dataType: dataType || undefined,
    });

    const filteredItems = items.filter((item) => canActorViewDataItem(actor, item));
    return NextResponse.json({ ok: true, items: filteredItems });
  } catch (error) {
    console.error('[API][internal][order-data-items][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu QC/Factory.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateDataItemBody;
  try {
    body = (await request.json()) as CreateDataItemBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const orderId = Number(body.orderId);
  const dataType = String(body.dataType ?? '').trim().toLowerCase();
  const title = String(body.title ?? '').trim();
  const storageKey = body.storageKey == null ? null : String(body.storageKey).trim();
  const metadata =
    body.metadata === null
      ? null
      : body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
        ? body.metadata
        : undefined;

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return NextResponse.json(
      { ok: false, code: 'invalid_order_id', message: 'Đơn hàng không hợp lệ.' },
      { status: 400 },
    );
  }
  if (!/^[a-z0-9._-]{2,64}$/.test(dataType)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_data_type', message: 'Loại dữ liệu không hợp lệ.' },
      { status: 400 },
    );
  }
  if (title.length < 2 || title.length > 255) {
    return NextResponse.json(
      { ok: false, code: 'invalid_title', message: 'Tiêu đề dữ liệu không hợp lệ.' },
      { status: 400 },
    );
  }
  if (storageKey && storageKey.length > 1024) {
    return NextResponse.json(
      { ok: false, code: 'invalid_storage_key', message: 'Storage key quá dài.' },
      { status: 400 },
    );
  }
  if (metadata === undefined) {
    return NextResponse.json(
      { ok: false, code: 'invalid_metadata', message: 'Metadata phải là JSON object hoặc null.' },
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
    const createDecision = can({
      roles: actor.roles,
      resource: 'data_item',
      action: 'create',
      state: 'pending_review',
      actorScopes: actor.scopes,
      scopeTarget,
    });

    if (!createDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền upload dữ liệu.' },
        { status: 403 },
      );
    }

    const item = await createOrderDataItem({
      orderId,
      dataType,
      title,
      state: 'pending_review',
      storageKey,
      metadata,
      createdBy: actor.userId,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'order_data_item',
      resourceId: String(item.id),
      after: {
        orderNo: item.orderNo,
        state: item.state,
        dataType: item.dataType,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    console.error('[API][internal][order-data-items][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo dữ liệu upload.' },
      { status: 500 },
    );
  }
}
