import { NextRequest, NextResponse } from 'next/server';
import { can } from '../../../../../lib/auth/authorization';
import { getAuthActor } from '../../../../../lib/auth/actor';
import { listDrivePortalFolder } from '../../../../../lib/googleDrivePortal';
import { getDriveProjectAccessForUser } from '../../../../../lib/repositories/driveProjectRepository';

export const dynamic = 'force-dynamic';

function getErrorResponse(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'DRIVE_FILE_OUTSIDE_ROOT') {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Thư mục không nằm trong vùng dữ liệu được cấp quyền.' },
        { status: 403 },
      );
    }
    if (error.message === 'DRIVE_NOT_FOLDER') {
      return NextResponse.json(
        { ok: false, code: 'not_folder', message: 'Đối tượng Drive không phải thư mục.' },
        { status: 400 },
      );
    }
  }

  console.error('[API][internal][drive][folder][GET] Failed:', error);
  return NextResponse.json(
    { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu Google Drive.' },
    { status: 500 },
  );
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

    const decision = can({
      roles: actor.roles,
      resource: 'project',
      action: 'view',
      actorScopes: actor.scopes,
    });
    if (!decision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem dữ liệu dự án.' },
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const projectId = Number(url.searchParams.get('project_id'));
    if (!Number.isInteger(projectId) || projectId <= 0) {
      return NextResponse.json(
        { ok: false, code: 'invalid_project_id', message: 'ID dự án không hợp lệ.' },
        { status: 400 },
      );
    }

    const project = await getDriveProjectAccessForUser(actor.userId, projectId);
    if (!project) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem dự án này.' },
        { status: 403 },
      );
    }

    const folderId = url.searchParams.get('folder_id')?.trim() || project.driveFolderId;
    const listing = await listDrivePortalFolder(folderId, project.driveFolderId);
    return NextResponse.json({ ok: true, project, ...listing });
  } catch (error) {
    return getErrorResponse(error);
  }
}
