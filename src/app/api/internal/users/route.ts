import { NextRequest, NextResponse } from 'next/server';
import {
  type ActorScope,
  type AppRole,
  type ScopeType,
  can,
  resolveRoleAlias,
} from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp, isSuperAdmin } from '../../../../lib/auth/actor';
import { hashPassword } from '../../../../lib/auth/password';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { createUser, listUsers } from '../../../../lib/repositories/userRepository';

export const dynamic = 'force-dynamic';

interface CreateUserBody {
  email?: string;
  fullName?: string;
  password?: string;
  isActive?: boolean;
  roles?: unknown;
  scopes?: unknown;
}

const SCOPE_TYPES: ScopeType[] = [
  'global',
  'customer',
  'factory',
  'order',
  'market',
  'project',
  'supplier',
  'material',
  'buyer_company',
  'explicit',
];

function normalizeRoles(value: unknown): AppRole[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const roles = new Set<AppRole>();
  for (const item of value) {
    const rawRole = String(item).trim();
    if (!rawRole) {
      return null;
    }
    const normalizedRole = resolveRoleAlias(rawRole);
    if (!normalizedRole) {
      return null;
    }
    roles.add(normalizedRole);
  }

  return Array.from(roles.values());
}

function normalizeScopes(value: unknown): ActorScope[] | null {
  if (value == null) {
    return [];
  }

  if (!Array.isArray(value)) {
    return null;
  }

  const scopes: ActorScope[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return null;
    }

    const rawType = String((item as Record<string, unknown>).type ?? '').trim();
    const rawValue = String((item as Record<string, unknown>).value ?? '').trim();
    if (!rawType || !rawValue) {
      return null;
    }

    if (!SCOPE_TYPES.includes(rawType as ScopeType)) {
      return null;
    }

    scopes.push({ type: rawType as ScopeType, value: rawValue });
  }

  const unique = new Map<string, ActorScope>();
  for (const scope of scopes) {
    unique.set(`${scope.type}:${scope.value}`, scope);
  }

  return Array.from(unique.values());
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasPrivilegedRole(roles: AppRole[]): boolean {
  return roles.includes('super_admin') || roles.includes('system_admin');
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
      resource: 'user',
      action: 'view',
      actorScopes: actor.scopes,
    });
    if (!viewDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: viewDecision.reason },
        { status: 403 },
      );
    }

    const users = await listUsers();
    return NextResponse.json({ ok: true, users });
  } catch (error) {
    console.error('[API][internal][users][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể lấy danh sách tài khoản.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateUserBody;
  try {
    body = (await request.json()) as CreateUserBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const email = String(body.email ?? '').trim().toLowerCase();
  const fullName = String(body.fullName ?? '').trim();
  const password = String(body.password ?? '');
  const roles = normalizeRoles(body.roles);
  const scopes = normalizeScopes(body.scopes);
  const isActive = typeof body.isActive === 'boolean' ? body.isActive : true;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_email', message: 'Email không hợp lệ.' },
      { status: 400 },
    );
  }
  if (!fullName || fullName.length < 2) {
    return NextResponse.json(
      { ok: false, code: 'invalid_full_name', message: 'Họ tên không hợp lệ.' },
      { status: 400 },
    );
  }
  if (!password || password.length < 8) {
    return NextResponse.json(
      { ok: false, code: 'invalid_password', message: 'Mật khẩu phải có ít nhất 8 ký tự.' },
      { status: 400 },
    );
  }
  if (!roles || roles.length === 0) {
    return NextResponse.json(
      { ok: false, code: 'invalid_roles', message: 'Danh sách vai trò không hợp lệ.' },
      { status: 400 },
    );
  }
  if (!scopes) {
    return NextResponse.json(
      { ok: false, code: 'invalid_scopes', message: 'Danh sách phạm vi không hợp lệ.' },
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

    const manageDecision = can({
      roles: actor.roles,
      resource: 'user',
      action: 'manage',
      actorScopes: actor.scopes,
    });
    if (!manageDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: manageDecision.reason },
        { status: 403 },
      );
    }

    if (!isSuperAdmin(actor) && hasPrivilegedRole(roles)) {
      return NextResponse.json(
        {
          ok: false,
          code: 'forbidden_role',
          message: 'Chỉ super admin mới được gán vai trò super_admin/system_admin.',
        },
        { status: 403 },
      );
    }

    const passwordHash = await hashPassword(password);
    const createdUser = await createUser({
      email,
      fullName,
      passwordHash,
      isActive,
      roles,
      scopes,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'user',
      resourceId: String(createdUser.id),
      after: {
        email: createdUser.email,
        fullName: createdUser.fullName,
        isActive: createdUser.isActive,
        roles: createdUser.roles,
        scopes: createdUser.scopes,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, user: createdUser }, { status: 201 });
  } catch (error) {
    const duplicateEmail =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'ER_DUP_ENTRY';

    if (duplicateEmail) {
      return NextResponse.json(
        { ok: false, code: 'email_exists', message: 'Email đã tồn tại.' },
        { status: 409 },
      );
    }

    console.error('[API][internal][users][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo tài khoản.' },
      { status: 500 },
    );
  }
}
