import { NextRequest, NextResponse } from 'next/server';
import { can } from '../../../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../../../lib/repositories/auditRepository';
import {
  deleteDriveProjectMember,
  getDriveProjectMember,
} from '../../../../../../../lib/repositories/driveProjectRepository';

export const dynamic = 'force-dynamic';

function parseId(value: string): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function getManageProjectDecision(actor: Awaited<ReturnType<typeof getAuthActor>>) {
  if (!actor) {
    return { allowed: false, reason: 'Bạn chưa đăng nhập.' };
  }

  return can({
    roles: actor.roles,
    resource: 'project',
    action: 'manage',
    actorScopes: actor.scopes,
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string; userId: string }> },
) {
  const params = await context.params;
  const projectId = parseId(params.id);
  const userId = parseId(params.userId);
  if (!projectId || !userId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_id', message: 'ID dự án hoặc tài khoản không hợp lệ.' },
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

    const decision = getManageProjectDecision(actor);
    if (!decision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: decision.reason },
        { status: 403 },
      );
    }

    const before = await getDriveProjectMember(projectId, userId);
    if (!before) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Tài khoản chưa được cấp dự án này.' },
        { status: 404 },
      );
    }

    await deleteDriveProjectMember(projectId, userId);

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'revoke_drive_project_access',
      resource: 'project',
      resourceId: String(projectId),
      before,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[API][internal][drive-projects][members][DELETE] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể thu hồi quyền dự án Drive.' },
      { status: 500 },
    );
  }
}
