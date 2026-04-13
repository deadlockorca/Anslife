import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { can } from '../../../../../lib/auth/authorization';
import { isAdminManager } from '../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { getCustomerById, updateCustomer } from '../../../../../lib/repositories/masterDataRepository';

export const dynamic = 'force-dynamic';

interface UpdateCustomerBody {
  code?: string;
  name?: string;
  countryCode?: string | null;
}

function parseId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function isValidCode(value: string): boolean {
  return /^[A-Za-z0-9._-]{2,64}$/.test(value);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateCustomerBody;
  try {
    body = (await request.json()) as UpdateCustomerBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const params = await context.params;
  const customerId = parseId(params.id);
  if (!customerId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_customer_id', message: 'ID khách hàng không hợp lệ.' },
      { status: 400 },
    );
  }

  const code = body.code?.trim();
  const name = body.name?.trim();
  const countryCode = body.countryCode == null ? body.countryCode : String(body.countryCode).trim().toUpperCase();

  if (code !== undefined && !isValidCode(code)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_code', message: 'Mã khách hàng không hợp lệ.' },
      { status: 400 },
    );
  }
  if (name !== undefined && (name.length < 2 || name.length > 191)) {
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

  const hasAnyField = code !== undefined || name !== undefined || countryCode !== undefined;
  if (!hasAnyField) {
    return NextResponse.json(
      { ok: false, code: 'no_changes', message: 'Không có dữ liệu cần cập nhật.' },
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

    const before = await getCustomerById(customerId);
    if (!before) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy khách hàng.' },
        { status: 404 },
      );
    }

    if (!isAdminManager(actor)) {
      const updateDecision = can({
        roles: actor.roles,
        resource: 'customer',
        action: 'update',
        actorScopes: actor.scopes,
        scopeTarget: {
          customerId: before.code,
          marketCode: before.countryCode,
        },
      });
      if (!updateDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: updateDecision.reason },
          { status: 403 },
        );
      }
    }

    const customer = await updateCustomer(customerId, {
      code,
      name,
      countryCode,
    });
    if (!customer) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy khách hàng.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'update',
      resource: 'customer',
      resourceId: String(customer.id),
      before,
      after: customer,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, customer });
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

    console.error('[API][internal][customers/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể cập nhật khách hàng.' },
      { status: 500 },
    );
  }
}
