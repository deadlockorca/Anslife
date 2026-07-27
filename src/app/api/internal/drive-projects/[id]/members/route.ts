import { NextRequest, NextResponse } from 'next/server';
import { can } from '../../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../../lib/repositories/auditRepository';
import { getUserAuthContextById } from '../../../../../../lib/repositories/userRepository';
import {
  getDriveProjectById,
  upsertDriveProjectMember,
} from '../../../../../../lib/repositories/driveProjectRepository';

export const dynamic = 'force-dynamic';

interface SaveDriveProjectMemberBody {
  userId?: number;
  canView?: boolean;
  canDownload?: boolean;
}

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

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const projectId = parseId(params.id);
  if (!projectId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_project_id', message: 'ID dự án không hợp lệ.' },
      { status: 400 },
    );
  }

  let body: SaveDriveProjectMemberBody;
  try {
    body = (await request.json()) as SaveDriveProjectMemberBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const userId = Number(body.userId);
  if (!Number.isInteger(userId) || userId <= 0) {
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

    const decision = getManageProjectDecision(actor);
    if (!decision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: decision.reason },
        { status: 403 },
      );
    }

    const [project, user] = await Promise.all([
      getDriveProjectById(projectId),
      getUserAuthContextById(userId),
    ]);
    if (!project) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dự án Drive.' },
        { status: 404 },
      );
    }
    if (!user) {
      return NextResponse.json(
        { ok: false, code: 'user_not_found', message: 'Không tìm thấy tài khoản.' },
        { status: 404 },
      );
    }

    const member = await upsertDriveProjectMember({
      projectId,
      userId,
      canView: body.canView !== false,
      canDownload: body.canDownload !== false,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'grant_drive_project_access',
      resource: 'project',
      resourceId: String(projectId),
      after: member,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, member });
  } catch (error) {
    console.error('[API][internal][drive-projects][members][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể cấp quyền dự án Drive.' },
      { status: 500 },
    );
  }
}
