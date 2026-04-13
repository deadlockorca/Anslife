import { NextRequest, NextResponse } from 'next/server';
import {
  type ActorScope,
  type AppRole,
  type ScopeType,
  can,
  resolveRoleAlias,
} from '../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp, isSuperAdmin } from '../../../../../lib/auth/actor';
import { hashPassword } from '../../../../../lib/auth/password';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import {
  deleteUser,
  getUserAuthContextById,
  updateUser,
} from '../../../../../lib/repositories/userRepository';

export const dynamic = 'force-dynamic';

interface UpdateUserBody {
  fullName?: string;
  password?: string;
  isActive?: boolean;
  roles?: unknown;
  scopes?: unknown;
}

interface ParsedField<T> {
  provided: boolean;
  value: T | null;
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

function parseId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function parseRoles(value: unknown): ParsedField<AppRole[]> {
  if (value === undefined) {
    return { provided: false, value: null };
  }
  if (!Array.isArray(value)) {
    return { provided: true, value: null };
  }

  const roles = new Set<AppRole>();
  for (const item of value) {
    const rawRole = String(item).trim();
    if (!rawRole) {
      return { provided: true, value: null };
    }
    const normalizedRole = resolveRoleAlias(rawRole);
    if (!normalizedRole) {
      return { provided: true, value: null };
    }
    roles.add(normalizedRole);
  }

  return { provided: true, value: Array.from(roles.values()) };
}

function parseScopes(value: unknown): ParsedField<ActorScope[]> {
  if (value === undefined) {
    return { provided: false, value: null };
  }
  if (!Array.isArray(value)) {
    return { provided: true, value: null };
  }

  const scopes: ActorScope[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { provided: true, value: null };
    }

    const rawType = String((item as Record<string, unknown>).type ?? '').trim();
    const rawValue = String((item as Record<string, unknown>).value ?? '').trim();
    if (!rawType || !rawValue) {
      return { provided: true, value: null };
    }
    if (!SCOPE_TYPES.includes(rawType as ScopeType)) {
      return { provided: true, value: null };
    }

    scopes.push({ type: rawType as ScopeType, value: rawValue });
  }

  const unique = new Map<string, ActorScope>();
  for (const scope of scopes) {
    unique.set(`${scope.type}:${scope.value}`, scope);
  }
  return { provided: true, value: Array.from(unique.values()) };
}

function hasPrivilegedRole(roles: AppRole[]): boolean {
  return roles.includes('super_admin') || roles.includes('system_admin');
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateUserBody;
  try {
    body = (await request.json()) as UpdateUserBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const params = await context.params;
  const targetUserId = parseId(params.id);
  if (!targetUserId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_user_id', message: 'ID tài khoản không hợp lệ.' },
      { status: 400 },
    );
  }

  const fullName = body.fullName?.trim();
  const password = typeof body.password === 'string' ? body.password : undefined;
  const parsedRoles = parseRoles(body.roles);
  const parsedScopes = parseScopes(body.scopes);
  const isActive = typeof body.isActive === 'boolean' ? body.isActive : undefined;

  if (fullName !== undefined && fullName.length < 2) {
    return NextResponse.json(
      { ok: false, code: 'invalid_full_name', message: 'Họ tên không hợp lệ.' },
      { status: 400 },
    );
  }
  if (password !== undefined && password.length < 8) {
    return NextResponse.json(
      { ok: false, code: 'invalid_password', message: 'Mật khẩu phải có ít nhất 8 ký tự.' },
      { status: 400 },
    );
  }
  if (parsedRoles.provided && parsedRoles.value === null) {
    return NextResponse.json(
      { ok: false, code: 'invalid_roles', message: 'Danh sách vai trò không hợp lệ.' },
      { status: 400 },
    );
  }
  if (parsedScopes.provided && parsedScopes.value === null) {
    return NextResponse.json(
      { ok: false, code: 'invalid_scopes', message: 'Danh sách phạm vi không hợp lệ.' },
      { status: 400 },
    );
  }

  const hasAnyField =
    fullName !== undefined ||
    password !== undefined ||
    isActive !== undefined ||
    parsedRoles.provided ||
    parsedScopes.provided;
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

    const target = await getUserAuthContextById(targetUserId);
    if (!target) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy tài khoản.' },
        { status: 404 },
      );
    }

    if (!isSuperAdmin(actor) && hasPrivilegedRole(target.roles)) {
      return NextResponse.json(
        {
          ok: false,
          code: 'forbidden_target',
          message: 'Chỉ super admin mới được sửa tài khoản admin cấp cao.',
        },
        { status: 403 },
      );
    }

    if (
      !isSuperAdmin(actor) &&
      parsedRoles.provided &&
      parsedRoles.value &&
      hasPrivilegedRole(parsedRoles.value)
    ) {
      return NextResponse.json(
        {
          ok: false,
          code: 'forbidden_role',
          message: 'Chỉ super admin mới được gán vai trò super_admin/system_admin.',
        },
        { status: 403 },
      );
    }

    if (actor.userId === targetUserId && isActive === false) {
      return NextResponse.json(
        {
          ok: false,
          code: 'forbidden_self_disable',
          message: 'Bạn không thể tự khóa tài khoản của mình.',
        },
        { status: 400 },
      );
    }

    const updated = await updateUser(targetUserId, {
      ...(fullName !== undefined ? { fullName } : {}),
      ...(password !== undefined ? { passwordHash: await hashPassword(password) } : {}),
      ...(isActive !== undefined ? { isActive } : {}),
      ...(parsedRoles.provided && parsedRoles.value
        ? { roles: parsedRoles.value }
        : {}),
      ...(parsedScopes.provided && parsedScopes.value
        ? { scopes: parsedScopes.value }
        : {}),
    });

    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy tài khoản.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'update',
      resource: 'user',
      resourceId: String(updated.id),
      before: {
        fullName: target.fullName,
        isActive: target.isActive,
        roles: target.roles,
        scopes: target.scopes,
      },
      after: {
        fullName: updated.fullName,
        isActive: updated.isActive,
        roles: updated.roles,
        scopes: updated.scopes,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, user: updated });
  } catch (error) {
    console.error('[API][internal][users][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể cập nhật tài khoản.' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const targetUserId = parseId(params.id);
  if (!targetUserId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_user_id', message: 'ID tài khoản không hợp lệ.' },
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

    const target = await getUserAuthContextById(targetUserId);
    if (!target) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy tài khoản.' },
        { status: 404 },
      );
    }

    if (actor.userId === targetUserId) {
      return NextResponse.json(
        {
          ok: false,
          code: 'forbidden_self_delete',
          message: 'Bạn không thể tự xóa tài khoản của mình.',
        },
        { status: 400 },
      );
    }

    if (!isSuperAdmin(actor) && hasPrivilegedRole(target.roles)) {
      return NextResponse.json(
        {
          ok: false,
          code: 'forbidden_target',
          message: 'Chỉ super admin mới được xóa tài khoản admin cấp cao.',
        },
        { status: 403 },
      );
    }

    const deleted = await deleteUser(targetUserId);
    if (!deleted) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy tài khoản.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'delete',
      resource: 'user',
      resourceId: String(targetUserId),
      before: {
        email: target.email,
        fullName: target.fullName,
        isActive: target.isActive,
        roles: target.roles,
        scopes: target.scopes,
      },
      after: { deleted: true },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[API][internal][users][DELETE] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể xóa tài khoản.' },
      { status: 500 },
    );
  }
}
