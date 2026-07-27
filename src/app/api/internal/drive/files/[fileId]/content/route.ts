import { Readable } from 'node:stream';
import { NextRequest, NextResponse } from 'next/server';
import { can } from '../../../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../../../lib/repositories/auditRepository';
import { getDrivePortalContent } from '../../../../../../../lib/googleDrivePortal';
import { getDriveProjectAccessForUser } from '../../../../../../../lib/repositories/driveProjectRepository';

export const dynamic = 'force-dynamic';

function sanitizeContentDispositionFilename(filename: string): string {
  return filename.replace(/[\\r\\n\"]/g, '').trim() || 'anslife-drive-file';
}

function getDisposition(request: NextRequest): 'inline' | 'attachment' {
  const url = new URL(request.url);
  return url.searchParams.get('download') === '1' ? 'attachment' : 'inline';
}

function getErrorResponse(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'DRIVE_FILE_OUTSIDE_ROOT') {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'File không nằm trong vùng dữ liệu được cấp quyền.' },
        { status: 403 },
      );
    }
    if (error.message === 'DRIVE_NOT_FILE') {
      return NextResponse.json(
        { ok: false, code: 'not_file', message: 'Đối tượng Drive không phải file.' },
        { status: 400 },
      );
    }
  }

  console.error('[API][internal][drive][file][content][GET] Failed:', error);
  return NextResponse.json(
    { ok: false, code: 'internal_error', message: 'Không thể mở file Google Drive.' },
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
      action: getDisposition(request) === 'attachment' ? 'download' : 'view',
      actorScopes: actor.scopes,
    });
    if (!decision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền mở file này.' },
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

    const disposition = getDisposition(request);
    if (disposition === 'attachment' && !project.canDownload) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tải file trong dự án này.' },
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

    const content = await getDrivePortalContent(fileId, project.driveFolderId);
    const filename = sanitizeContentDispositionFilename(content.filename);

    await writeAuditLog({
      actorUserId: actor.userId,
      action: disposition === 'attachment' ? 'download_drive_file' : 'view_drive_file',
      resource: 'drive_file',
      resourceId: fileId,
      after: {
        projectId: project.id,
        projectName: project.name,
        filename,
        mimeType: content.mimeType,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return new NextResponse(Readable.toWeb(content.stream) as ReadableStream, {
      status: 200,
      headers: {
        'Cache-Control': 'private, no-store',
        'Content-Type': content.mimeType,
        'Content-Disposition': `${disposition}; filename="${filename}"`,
      },
    });
  } catch (error) {
    return getErrorResponse(error);
  }
}
