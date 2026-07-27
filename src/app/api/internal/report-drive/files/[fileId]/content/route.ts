import { Readable } from 'node:stream';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../../../lib/auth/actor';
import { getDrivePortalContent } from '../../../../../../../lib/googleDrivePortal';
import { getWorkReportRootFolderId } from '../../../../../../../lib/googleDriveWorkReports';
import { writeAuditLog } from '../../../../../../../lib/repositories/auditRepository';

export const dynamic = 'force-dynamic';

function isReportDriveAdmin(roles: string[]): boolean {
  return roles.includes('super_admin') || roles.includes('system_admin');
}

function sanitizeContentDispositionFilename(filename: string): string {
  return filename.replace(/[\\r\\n\"]/g, '').trim() || 'anslife-report-file';
}

function getDisposition(request: NextRequest): 'inline' | 'attachment' {
  const url = new URL(request.url);
  return url.searchParams.get('download') === '1' ? 'attachment' : 'inline';
}

function getErrorResponse(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'DRIVE_FILE_OUTSIDE_ROOT') {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'File không nằm trong vùng dữ liệu báo cáo.' },
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

  console.error('[API][internal][report-drive][file][content][GET] Failed:', error);
  return NextResponse.json(
    { ok: false, code: 'internal_error', message: 'Không thể mở file báo cáo.' },
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
    if (!isReportDriveAdmin(actor.roles)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền mở dữ liệu báo cáo.' },
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

    const disposition = getDisposition(request);
    const content = await getDrivePortalContent(fileId, getWorkReportRootFolderId());
    const filename = sanitizeContentDispositionFilename(content.filename);

    await writeAuditLog({
      actorUserId: actor.userId,
      action: disposition === 'attachment' ? 'download_report_drive_file' : 'view_report_drive_file',
      resource: 'drive_file',
      resourceId: fileId,
      after: {
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
