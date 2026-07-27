import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor } from '../../../../../lib/auth/actor';
import { listDrivePortalFolder } from '../../../../../lib/googleDrivePortal';
import { getWorkReportRootFolderId } from '../../../../../lib/googleDriveWorkReports';

export const dynamic = 'force-dynamic';

function isReportDriveAdmin(roles: string[]): boolean {
  return roles.includes('super_admin') || roles.includes('system_admin');
}

function getErrorResponse(error: unknown) {
  if (error instanceof Error) {
    if (error.message === 'DRIVE_FILE_OUTSIDE_ROOT') {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Thư mục không nằm trong vùng dữ liệu báo cáo.' },
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

  console.error('[API][internal][report-drive][folder][GET] Failed:', error);
  return NextResponse.json(
    { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu báo cáo.' },
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
    if (!isReportDriveAdmin(actor.roles)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem dữ liệu báo cáo.' },
        { status: 403 },
      );
    }

    const rootFolderId = getWorkReportRootFolderId();
    const url = new URL(request.url);
    const folderId = url.searchParams.get('folder_id')?.trim() || rootFolderId;
    const listing = await listDrivePortalFolder(folderId, rootFolderId);

    return NextResponse.json({ ok: true, ...listing });
  } catch (error) {
    return getErrorResponse(error);
  }
}
