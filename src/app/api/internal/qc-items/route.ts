import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../lib/auth/authorization';
import { DATA_STATES, can } from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { buildOrderScopeTarget } from '../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { getTradeOrderById } from '../../../../lib/repositories/orderRepository';
import {
  createQcItem,
  listQcItems,
  type QcItemRecord,
} from '../../../../lib/repositories/workflowRepository';

export const dynamic = 'force-dynamic';

interface CreateQcItemBody {
  orderId?: number;
  title?: string;
  findingType?: string;
  severity?: string;
  reportNo?: string | null;
  observedAt?: string | null;
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

function isValidTypeValue(value: string): boolean {
  return /^[a-z0-9._-]{2,64}$/i.test(value);
}

function buildScopeTargetFromItem(item: QcItemRecord) {
  return buildOrderScopeTarget({
    orderNo: item.orderNo,
    customerCode: item.customer.code,
    factoryCode: item.factory?.code ?? null,
    marketCode: item.customer.countryCode,
  });
}

function canActorViewQcItem(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: QcItemRecord,
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
    const severity = url.searchParams.get('severity')?.trim().toLowerCase() ?? '';

    if (state && !isDataState(state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái dữ liệu không hợp lệ.' },
        { status: 400 },
      );
    }

    const items = await listQcItems({
      limit: perPage,
      orderNo: orderNo || undefined,
      state: state || undefined,
      severity: severity || undefined,
    });
    const filteredItems = items.filter((item) => canActorViewQcItem(actor, item));
    return NextResponse.json({ ok: true, items: filteredItems });
  } catch (error) {
    console.error('[API][internal][qc-items][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu QC.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateQcItemBody = {};
  try {
    body = (await request.json()) as CreateQcItemBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const orderId = Number(body.orderId);
  const title = String(body.title ?? '').trim();
  const findingType = String(body.findingType ?? '').trim().toLowerCase();
  const severity = String(body.severity ?? '').trim().toLowerCase();
  const reportNo = body.reportNo == null ? null : String(body.reportNo).trim();
  const observedAt = body.observedAt == null ? null : String(body.observedAt).trim();
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
  if (title.length < 2 || title.length > 255) {
    return NextResponse.json(
      { ok: false, code: 'invalid_title', message: 'Tiêu đề QC không hợp lệ.' },
      { status: 400 },
    );
  }
  if (findingType && !isValidTypeValue(findingType)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_finding_type', message: 'Finding type không hợp lệ.' },
      { status: 400 },
    );
  }
  if (severity && !isValidTypeValue(severity)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_severity', message: 'Mức độ lỗi không hợp lệ.' },
      { status: 400 },
    );
  }
  if (reportNo && reportNo.length > 128) {
    return NextResponse.json(
      { ok: false, code: 'invalid_report_no', message: 'Mã báo cáo quá dài.' },
      { status: 400 },
    );
  }
  if (observedAt) {
    const parsed = new Date(observedAt);
    if (Number.isNaN(parsed.getTime())) {
      return NextResponse.json(
        { ok: false, code: 'invalid_observed_at', message: 'Thời gian ghi nhận không hợp lệ.' },
        { status: 400 },
      );
    }
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
      resource: 'qc_item',
      action: 'create',
      state: 'pending_review',
      actorScopes: actor.scopes,
      scopeTarget,
    });
    if (!createDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo dữ liệu QC.' },
        { status: 403 },
      );
    }

    const item = await createQcItem({
      orderId,
      title,
      findingType: findingType || undefined,
      severity: severity || undefined,
      reportNo,
      observedAt,
      state: 'pending_review',
      metadata,
      createdBy: actor.userId,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'qc_item',
      resourceId: String(item.id),
      after: {
        orderNo: item.orderNo,
        state: item.state,
        findingType: item.findingType,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    console.error('[API][internal][qc-items][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo dữ liệu QC.' },
      { status: 500 },
    );
  }
}
