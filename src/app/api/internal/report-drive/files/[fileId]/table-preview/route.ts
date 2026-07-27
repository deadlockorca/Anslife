import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../../../lib/auth/actor';
import { getDrivePortalTablePreview } from '../../../../../../../lib/googleDrivePortal';
import { getWorkReportRootFolderId } from '../../../../../../../lib/googleDriveWorkReports';
import { writeAuditLog } from '../../../../../../../lib/repositories/auditRepository';

export const dynamic = 'force-dynamic';

function isReportDriveAdmin(roles: string[]): boolean {
  return roles.includes('super_admin') || roles.includes('system_admin');
}

function getErrorResponse(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'DRIVE_FILE_OUTSIDE_ROOT') {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'File không nằm trong vùng dữ liệu báo cáo.' },
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

  console.error('[API][internal][report-drive][file][table-preview][GET] Failed:', error);
  return NextResponse.json(
    { ok: false, code: 'internal_error', message: 'Không thể xem trước bảng tính báo cáo.' },
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
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem dữ liệu báo cáo.' },
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
    const sheetName = url.searchParams.get('sheet')?.trim() ?? null;
    const preview = await getDrivePortalTablePreview(fileId, sheetName, getWorkReportRootFolderId());

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'preview_report_drive_spreadsheet',
      resource: 'drive_file',
      resourceId: fileId,
      after: {
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
