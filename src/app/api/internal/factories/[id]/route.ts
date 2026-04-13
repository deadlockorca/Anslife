import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { can } from '../../../../../lib/auth/authorization';
import { isAdminManager } from '../../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { getFactoryById, updateFactory } from '../../../../../lib/repositories/masterDataRepository';

export const dynamic = 'force-dynamic';

interface UpdateFactoryBody {
  code?: string;
  name?: string;
  location?: string | null;
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
  let body: UpdateFactoryBody;
  try {
    body = (await request.json()) as UpdateFactoryBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const params = await context.params;
  const factoryId = parseId(params.id);
  if (!factoryId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_factory_id', message: 'ID nhà máy không hợp lệ.' },
      { status: 400 },
    );
  }

  const code = body.code?.trim();
  const name = body.name?.trim();
  const location = body.location == null ? body.location : String(body.location).trim();

  if (code !== undefined && !isValidCode(code)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_code', message: 'Mã nhà máy không hợp lệ.' },
      { status: 400 },
    );
  }
  if (name !== undefined && (name.length < 2 || name.length > 191)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_name', message: 'Tên nhà máy không hợp lệ.' },
      { status: 400 },
    );
  }
  if (location !== undefined && location !== null && location.length > 255) {
    return NextResponse.json(
      { ok: false, code: 'invalid_location', message: 'Địa điểm nhà máy quá dài.' },
      { status: 400 },
    );
  }

  const hasAnyField = code !== undefined || name !== undefined || location !== undefined;
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

    const before = await getFactoryById(factoryId);
    if (!before) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy nhà máy.' },
        { status: 404 },
      );
    }

    if (!isAdminManager(actor)) {
      const updateDecision = can({
        roles: actor.roles,
        resource: 'factory',
        action: 'update',
        actorScopes: actor.scopes,
        scopeTarget: {
          factoryId: before.code,
        },
      });
      if (!updateDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: updateDecision.reason },
          { status: 403 },
        );
      }
    }

    const factory = await updateFactory(factoryId, {
      code,
      name,
      location,
    });
    if (!factory) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy nhà máy.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'update',
      resource: 'factory',
      resourceId: String(factory.id),
      before,
      after: factory,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, factory });
  } catch (error) {
    const duplicateCode =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'ER_DUP_ENTRY';
    if (duplicateCode) {
      return NextResponse.json(
        { ok: false, code: 'code_exists', message: 'Mã nhà máy đã tồn tại.' },
        { status: 409 },
      );
    }

    console.error('[API][internal][factories/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể cập nhật nhà máy.' },
      { status: 500 },
    );
  }
}
