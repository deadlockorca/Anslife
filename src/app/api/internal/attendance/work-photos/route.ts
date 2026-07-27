import { NextRequest, NextResponse } from 'next/server';
import { uploadWorkReportImageToDrive } from '../../../../../lib/googleDriveWorkReports';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { can } from '../../../../../lib/auth/authorization';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { createAttendanceWorkPhoto } from '../../../../../lib/repositories/attendanceWorkPhotoRepository';

export const dynamic = 'force-dynamic';

const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const MAX_PHOTOS_PER_REQUEST = 12;
const ALLOWED_IMAGE_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function getTodayDateInVietnam(): string {
  const now = new Date();
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

function isUploadFile(value: FormDataEntryValue): value is File {
  return typeof value === 'object' && value !== null && 'arrayBuffer' in value && 'name' in value;
}

export async function POST(request: NextRequest) {
  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }

    const uploadDecision = can({
      roles: actor.roles,
      resource: 'attendance',
      action: 'create',
      actorScopes: actor.scopes,
    });
    if (!uploadDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền gửi ảnh báo cáo công việc.' },
        { status: 403 },
      );
    }

    const formData = await request.formData();
    const files = formData.getAll('photos').filter(isUploadFile);
    if (files.length === 0) {
      return NextResponse.json(
        { ok: false, code: 'photo_required', message: 'Vui lòng chọn ít nhất một ảnh công việc.' },
        { status: 400 },
      );
    }
    if (files.length > MAX_PHOTOS_PER_REQUEST) {
      return NextResponse.json(
        {
          ok: false,
          code: 'too_many_photos',
          message: `Mỗi lần chỉ được tải tối đa ${MAX_PHOTOS_PER_REQUEST} ảnh.`,
        },
        { status: 400 },
      );
    }

    const todayDate = getTodayDateInVietnam();
    const savedPhotos = [];
    for (const file of files) {
      if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
        return NextResponse.json(
          {
            ok: false,
            code: 'invalid_photo_type',
            message: 'Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP.',
          },
          { status: 400 },
        );
      }
      if (file.size <= 0 || file.size > MAX_PHOTO_BYTES) {
        return NextResponse.json(
          {
            ok: false,
            code: 'invalid_photo_size',
            message: 'Mỗi ảnh công việc phải nhỏ hơn hoặc bằng 8MB.',
          },
          { status: 400 },
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const uploaded = await uploadWorkReportImageToDrive({
        buffer,
        mimeType: file.type,
        originalFilename: file.name,
        userId: actor.userId,
        userFullName: actor.fullName,
        reportDate: todayDate,
      });

      const record = await createAttendanceWorkPhoto({
        userId: actor.userId,
        attendanceDate: todayDate,
        driveFileId: uploaded.fileId,
        driveParentId: uploaded.parentId,
        driveWebViewLink: uploaded.webViewLink,
        fileName: uploaded.fileName,
        originalFileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
      });
      savedPhotos.push(record);
    }

    try {
      await writeAuditLog({
        actorUserId: actor.userId,
        action: 'upload_work_photos',
        resource: 'attendance',
        resourceId: todayDate,
        after: {
          attendanceDate: todayDate,
          total: savedPhotos.length,
          fileIds: savedPhotos.map((photo) => photo.driveFileId),
        },
        ipAddress: getRequestIp(request),
        userAgent: request.headers.get('user-agent'),
      });
    } catch (auditError) {
      console.error('[API][internal][attendance/work-photos][AUDIT] Failed:', auditError);
    }

    return NextResponse.json({ ok: true, photos: savedPhotos }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'GOOGLE_DRIVE_SERVICE_ACCOUNT_NO_QUOTA') {
      return NextResponse.json(
        {
          ok: false,
          code: 'google_drive_service_account_no_quota',
          message:
            'Google Drive cá nhân không cho service account upload trực tiếp. Cần cấu hình OAuth uploader cho tài khoản Google sở hữu thư mục.',
        },
        { status: 500 },
      );
    }

    console.error('[API][internal][attendance/work-photos][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải ảnh công việc lên lúc này.' },
      { status: 500 },
    );
  }
}
