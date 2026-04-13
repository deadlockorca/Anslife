import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { can } from '../../../../lib/auth/authorization';
import { canActorViewFactory } from '../../../../lib/auth/orderAccess';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { createFactory, listFactories } from '../../../../lib/repositories/masterDataRepository';

export const dynamic = 'force-dynamic';

interface CreateFactoryBody {
  code?: string;
  name?: string;
  location?: string | null;
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

function canViewFactories(actor: Awaited<ReturnType<typeof getAuthActor>>): boolean {
  if (!actor) {
    return false;
  }

  return can({
    roles: actor.roles,
    resource: 'factory',
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

    if (!canViewFactories(actor)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem danh sách nhà máy.' },
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const perPage = parsePerPage(url.searchParams.get('per_page'));
    const factories = await listFactories(perPage);
    const visibleFactories = factories.filter((factory) =>
      canActorViewFactory(actor, factory),
    );
    return NextResponse.json({ ok: true, factories: visibleFactories });
  } catch (error) {
    console.error('[API][internal][factories][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải danh sách nhà máy.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateFactoryBody;
  try {
    body = (await request.json()) as CreateFactoryBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const code = String(body.code ?? '').trim();
  const name = String(body.name ?? '').trim();
  const location = body.location == null ? null : String(body.location).trim();

  if (!isValidCode(code)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_code', message: 'Mã nhà máy không hợp lệ.' },
      { status: 400 },
    );
  }
  if (name.length < 2 || name.length > 191) {
    return NextResponse.json(
      { ok: false, code: 'invalid_name', message: 'Tên nhà máy không hợp lệ.' },
      { status: 400 },
    );
  }
  if (location && location.length > 255) {
    return NextResponse.json(
      { ok: false, code: 'invalid_location', message: 'Địa điểm nhà máy quá dài.' },
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
      resource: 'factory',
      action: 'create',
      actorScopes: actor.scopes,
    });
    if (!createDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: createDecision.reason },
        { status: 403 },
      );
    }

    const factory = await createFactory({ code, name, location });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'factory',
      resourceId: String(factory.id),
      after: factory,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, factory }, { status: 201 });
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

    console.error('[API][internal][factories][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo nhà máy.' },
      { status: 500 },
    );
  }
}
