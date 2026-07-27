import { NextRequest, NextResponse } from 'next/server';
import { can } from '../../../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../../../lib/auth/actor';
import { getDrivePortalTablePreview } from '../../../../../../../lib/googleDrivePortal';
import { writeAuditLog } from '../../../../../../../lib/repositories/auditRepository';
import { getDriveProjectAccessForUser } from '../../../../../../../lib/repositories/driveProjectRepository';

export const dynamic = 'force-dynamic';

function getErrorResponse(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'DRIVE_FILE_OUTSIDE_ROOT') {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'File không nằm trong vùng dữ liệu được cấp quyền.' },
        { status: 403 },
      );
    }
    if (error.message === 'DRIVE_NOT_SPREADSHEET') {
      return NextResponse.json(
        { ok: false, code: 'not_spreadsheet', message: 'File này không phải bảng tính.' },
        { status: 400 },
      );
    }
    if (error.message === 'DRIVE_SPREADSHEET_EMPTY') {
      return NextResponse.json(
        { ok: false, code: 'empty_spreadsheet', message: 'Bảng tính không có sheet để xem trước.' },
        { status: 404 },
      );
    }
  }

  console.error('[API][internal][drive][file][table-preview][GET] Failed:', error);
  return NextResponse.json(
    { ok: false, code: 'internal_error', message: 'Không thể xem trước bảng tính.' },
    { status: 500 },
  );
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ fileId: string }> },
) {
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
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem file này.' },
        { status: 403 },
      );
    }

    const params = await context.params;
    const fileId = params.fileId.trim();
    if (!fileId) {
      return NextResponse.json(
        { ok: false, code: 'invalid_file_id', message: 'ID file không hợp lệ.' },
        { status: 400 },
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

    const sheetName = url.searchParams.get('sheet')?.trim() ?? null;
    const preview = await getDrivePortalTablePreview(fileId, sheetName, project.driveFolderId);

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'preview_drive_spreadsheet',
      resource: 'drive_file',
      resourceId: fileId,
      after: {
        projectId: project.id,
        projectName: project.name,
        filename: preview.filename,
        sheetName: preview.sheetName,
        rows: preview.rows.length,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, preview });
  } catch (error) {
    return getErrorResponse(error);
  }
}
