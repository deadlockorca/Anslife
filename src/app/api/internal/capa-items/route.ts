import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../lib/auth/authorization';
import { DATA_STATES, can } from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { buildOrderScopeTarget } from '../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { getTradeOrderById } from '../../../../lib/repositories/orderRepository';
import {
  createCapaItem,
  listCapaItems,
  type CapaItemRecord,
} from '../../../../lib/repositories/workflowRepository';

export const dynamic = 'force-dynamic';

interface CreateCapaItemBody {
  orderId?: number;
  qcItemId?: number | null;
  title?: string;
  rootCause?: string | null;
  correctiveAction?: string | null;
  preventiveAction?: string | null;
  ownerUserId?: number | null;
  dueDate?: string | null;
  metadata?: Record<string, unknown> | null;
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }
  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function parseUserId(value: string | null): number | undefined {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }
  return parsed;
}

function isDataState(value: string): value is DataState {
  return DATA_STATES.includes(value as DataState);
}

function buildScopeTargetFromItem(item: CapaItemRecord) {
  return buildOrderScopeTarget({
    orderNo: item.orderNo,
    customerCode: item.customer.code,
    factoryCode: item.factory?.code ?? null,
    marketCode: item.customer.countryCode,
  });
}

function canActorViewCapaItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: CapaItemRecord,
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

function parseText(value: string | null | undefined, maxLength: number): string | null {
  if (value == null) {
    return null;
  }
  const normalized = String(value).trim();
  if (!normalized) {
    return null;
  }
  if (normalized.length > maxLength) {
    return null;
  }
  return normalized;
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
    const ownerUserId = parseUserId(url.searchParams.get('owner_user_id'));

    if (state && !isDataState(state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái dữ liệu không hợp lệ.' },
        { status: 400 },
      );
    }

    const items = await listCapaItems({
      limit: perPage,
      orderNo: orderNo || undefined,
      state: state || undefined,
      ownerUserId,
    });
    const filteredItems = items.filter((item) => canActorViewCapaItem(actor, item));
    return NextResponse.json({ ok: true, items: filteredItems });
  } catch (error) {
    console.error('[API][internal][capa-items][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải danh sách CAPA.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateCapaItemBody = {};
  try {
    body = (await request.json()) as CreateCapaItemBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const orderId = Number(body.orderId);
  const qcItemId =
    body.qcItemId == null ? null : Number.isInteger(Number(body.qcItemId)) ? Number(body.qcItemId) : NaN;
  const ownerUserId =
    body.ownerUserId == null
      ? null
      : Number.isInteger(Number(body.ownerUserId))
        ? Number(body.ownerUserId)
        : NaN;
  const title = String(body.title ?? '').trim();
  const rootCause = parseText(body.rootCause, 4000);
  const correctiveAction = parseText(body.correctiveAction, 4000);
  const preventiveAction = parseText(body.preventiveAction, 4000);
  const dueDate = body.dueDate == null ? null : String(body.dueDate).trim();
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
  if (qcItemId !== null && (!Number.isInteger(qcItemId) || qcItemId <= 0)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_qc_item_id', message: 'QC Item không hợp lệ.' },
      { status: 400 },
    );
  }
  if (ownerUserId !== null && (!Number.isInteger(ownerUserId) || ownerUserId <= 0)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_owner_user_id', message: 'Owner user không hợp lệ.' },
      { status: 400 },
    );
  }
  if (title.length < 2 || title.length > 255) {
    return NextResponse.json(
      { ok: false, code: 'invalid_title', message: 'Tiêu đề CAPA không hợp lệ.' },
      { status: 400 },
    );
  }
  if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_due_date', message: 'Due date phải theo định dạng YYYY-MM-DD.' },
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
      resource: 'capa_item',
      action: 'create',
      state: 'draft',
      actorScopes: actor.scopes,
      scopeTarget,
    });
    if (!createDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo CAPA.' },
        { status: 403 },
      );
    }

    const item = await createCapaItem({
      orderId,
      qcItemId,
      title,
      rootCause,
      correctiveAction,
      preventiveAction,
      ownerUserId,
      dueDate,
      state: 'draft',
      metadata,
      createdBy: actor.userId,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'capa_item',
      resourceId: String(item.id),
      after: {
        orderNo: item.orderNo,
        state: item.state,
        title: item.title,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    console.error('[API][internal][capa-items][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo CAPA item.' },
      { status: 500 },
    );
  }
}
