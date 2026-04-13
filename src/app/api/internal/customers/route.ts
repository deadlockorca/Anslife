import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { can } from '../../../../lib/auth/authorization';
import { canActorViewCustomer } from '../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { createCustomer, listCustomers } from '../../../../lib/repositories/masterDataRepository';

export const dynamic = 'force-dynamic';

interface CreateCustomerBody {
  code?: string;
  name?: string;
  countryCode?: string | null;
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }

  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function isValidCode(value: string): boolean {
  return /^[A-Za-z0-9._-]{2,64}$/.test(value);
}

function canViewCustomers(actor: Awaited<ReturnType<typeof getAuthActor>>): boolean {
  if (!actor) {
    return false;
  }

  return can({
    roles: actor.roles,
    resource: 'customer',
    action: 'view',
    actorScopes: actor.scopes,
  }).allowed;
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

    if (!canViewCustomers(actor)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem danh sách khách hàng.' },
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const perPage = parsePerPage(url.searchParams.get('per_page'));
    const customers = await listCustomers(perPage);
    const visibleCustomers = customers.filter((customer) =>
      canActorViewCustomer(actor, customer),
    );
    return NextResponse.json({ ok: true, customers: visibleCustomers });
  } catch (error) {
    console.error('[API][internal][customers][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải danh sách khách hàng.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateCustomerBody;
  try {
    body = (await request.json()) as CreateCustomerBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const code = String(body.code ?? '').trim();
  const name = String(body.name ?? '').trim();
  const countryCode = body.countryCode == null ? null : String(body.countryCode).trim().toUpperCase();

  if (!isValidCode(code)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_code', message: 'Mã khách hàng không hợp lệ.' },
      { status: 400 },
    );
  }
  if (name.length < 2 || name.length > 191) {
    return NextResponse.json(
      { ok: false, code: 'invalid_name', message: 'Tên khách hàng không hợp lệ.' },
      { status: 400 },
    );
  }
  if (countryCode && !/^[A-Z]{2,8}$/.test(countryCode)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_country_code', message: 'Mã quốc gia không hợp lệ.' },
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

    const createDecision = can({
      roles: actor.roles,
      resource: 'customer',
      action: 'create',
      actorScopes: actor.scopes,
    });
    if (!createDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: createDecision.reason },
        { status: 403 },
      );
    }

    const customer = await createCustomer({ code, name, countryCode });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'customer',
      resourceId: String(customer.id),
      after: customer,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, customer }, { status: 201 });
  } catch (error) {
    const duplicateCode =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'ER_DUP_ENTRY';
    if (duplicateCode) {
      return NextResponse.json(
        { ok: false, code: 'code_exists', message: 'Mã khách hàng đã tồn tại.' },
        { status: 409 },
      );
    }

    console.error('[API][internal][customers][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo khách hàng.' },
      { status: 500 },
    );
  }
}
