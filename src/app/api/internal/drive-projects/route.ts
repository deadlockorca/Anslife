import { NextRequest, NextResponse } from 'next/server';
import { can } from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import {
  listDriveProjectsForAdmin,
  upsertDriveProject,
} from '../../../../lib/repositories/driveProjectRepository';

export const dynamic = 'force-dynamic';

interface SaveDriveProjectBody {
  name?: string;
  driveFolderId?: string;
  driveFolderUrl?: string;
  description?: string | null;
  isActive?: boolean;
}

function extractDriveFolderId(value: string): string {
  const rawValue = value.trim();
  if (!rawValue) {
    return '';
  }

  const folderMatch = rawValue.match(/\/folders\/([A-Za-z0-9_-]+)/);
  if (folderMatch?.[1]) {
    return folderMatch[1];
  }

  const queryMatch = rawValue.match(/[?&]id=([A-Za-z0-9_-]+)/);
  if (queryMatch?.[1]) {
    return queryMatch[1];
  }

  return rawValue;
}

function isValidDriveFolderId(value: string): boolean {
  return /^[A-Za-z0-9_-]{10,191}$/.test(value);
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

export async function GET(request: NextRequest) {
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

    const projects = await listDriveProjectsForAdmin();
    return NextResponse.json({ ok: true, projects });
  } catch (error) {
    console.error('[API][internal][drive-projects][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải danh sách dự án Drive.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: SaveDriveProjectBody;
  try {
    body = (await request.json()) as SaveDriveProjectBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const name = String(body.name ?? '').trim();
  const driveFolderId = extractDriveFolderId(
    String(body.driveFolderId ?? body.driveFolderUrl ?? ''),
  );
  const description =
    body.description == null ? null : String(body.description).trim().slice(0, 512);
  const isActive = typeof body.isActive === 'boolean' ? body.isActive : true;

  if (name.length < 2 || name.length > 191) {
    return NextResponse.json(
      { ok: false, code: 'invalid_name', message: 'Tên dự án không hợp lệ.' },
      { status: 400 },
    );
  }
  if (!isValidDriveFolderId(driveFolderId)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_drive_folder_id', message: 'Google Drive folder ID không hợp lệ.' },
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

    const project = await upsertDriveProject({
      name,
      driveFolderId,
      description,
      isActive,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'upsert_drive_project',
      resource: 'project',
      resourceId: String(project.id),
      after: project,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, project }, { status: 201 });
  } catch (error) {
    console.error('[API][internal][drive-projects][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể lưu dự án Drive.' },
      { status: 500 },
    );
  }
}
