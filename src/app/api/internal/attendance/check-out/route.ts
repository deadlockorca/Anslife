import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { can } from '../../../../../lib/auth/authorization';
import { sendAttendanceNotificationEmail } from '../../../../../lib/email/attendanceNotification';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { checkOutAttendance } from '../../../../../lib/repositories/attendanceRepository';
import { listAttendanceWorkPhotos } from '../../../../../lib/repositories/attendanceWorkPhotoRepository';
import { saveAttendancePhoto } from '../../../../../lib/storage/attendancePhoto';

export const dynamic = 'force-dynamic';

interface AttendanceCheckOutBody {
  latitude?: number | null;
  longitude?: number | null;
  photoDataUrl?: string | null;
  note?: string | null;
}

interface LocationValidationResult {
  ok: boolean;
  code?: 'location_required' | 'invalid_location';
  latitude?: number;
  longitude?: number;
}

function normalizeCoordinate(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function validateLocation(body: AttendanceCheckOutBody): LocationValidationResult {
  const latitude = normalizeCoordinate(body.latitude);
  const longitude = normalizeCoordinate(body.longitude);

  if (latitude == null || longitude == null) {
    return {
      ok: false,
      code: 'location_required',
    };
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return {
      ok: false,
      code: 'invalid_location',
    };
  }

  return {
    ok: true,
    latitude,
    longitude,
  };
}

function normalizePhotoDataUrl(body: AttendanceCheckOutBody): string | null {
  if (typeof body.photoDataUrl !== 'string') {
    return null;
  }
  const normalized = body.photoDataUrl.trim();
  return normalized ? normalized : null;
}

function getTodayDateInVietnam(): string {
  const now = new Date();
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export async function POST(request: NextRequest) {
  let body: AttendanceCheckOutBody = {};
  try {
    body = (await request.json()) as AttendanceCheckOutBody;
  } catch {
    body = {};
  }

  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }

    const checkOutDecision = can({
      roles: actor.roles,
      resource: 'attendance',
      action: 'update',
      actorScopes: actor.scopes,
    });
    if (!checkOutDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền check-out.' },
        { status: 403 },
      );
    }

    const locationValidation = validateLocation(body);
    if (!locationValidation.ok) {
      if (locationValidation.code === 'invalid_location') {
        return NextResponse.json(
          {
            ok: false,
            code: 'invalid_location',
            message: 'Tọa độ GPS không hợp lệ. Vui lòng bật GPS rồi thử lại.',
          },
          { status: 400 },
        );
      }
      return NextResponse.json(
        {
          ok: false,
          code: 'location_required',
          message: 'Bạn cần bật GPS và cho phép quyền vị trí để check-out.',
        },
        { status: 400 },
      );
    }

    const photoDataUrl = normalizePhotoDataUrl(body);
    if (!photoDataUrl) {
      return NextResponse.json(
        {
          ok: false,
          code: 'photo_required',
          message: 'Bạn cần chụp ảnh để check-out.',
        },
        { status: 400 },
      );
    }

    const todayDate = getTodayDateInVietnam();
    const workPhotos = await listAttendanceWorkPhotos({
      userId: actor.userId,
      fromDate: todayDate,
      toDate: todayDate,
      limit: 1,
    });
    if (workPhotos.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          code: 'work_photos_required',
          message: 'Bạn cần tải ảnh công việc trong ngày lên Drive trước khi check-out.',
        },
        { status: 400 },
      );
    }

    let photoUrl: string;
    try {
      photoUrl = await saveAttendancePhoto({
        userId: actor.userId,
        attendanceDate: todayDate,
        mode: 'check-out',
        photoDataUrl,
      });
    } catch (photoError) {
      console.error('[API][internal][attendance/check-out][PHOTO] Failed:', photoError);
      if (photoError instanceof Error && photoError.message === 'INVALID_ATTENDANCE_PHOTO') {
        return NextResponse.json(
          {
            ok: false,
            code: 'invalid_photo',
            message: 'Ảnh check-out không hợp lệ hoặc quá lớn.',
          },
          { status: 400 },
        );
      }
      return NextResponse.json(
        {
          ok: false,
          code: 'photo_storage_failed',
          message: 'Không thể lưu ảnh check-out lúc này. Vui lòng thử lại.',
        },
        { status: 500 },
      );
    }

    const log = await checkOutAttendance({
      userId: actor.userId,
      attendanceDate: todayDate,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
      latitude: locationValidation.latitude ?? null,
      longitude: locationValidation.longitude ?? null,
      photoUrl,
      note: body.note ?? null,
    });

    try {
      await sendAttendanceNotificationEmail({
        actor,
        action: 'check_out',
        attendanceDate: todayDate,
        log,
        ipAddress: getRequestIp(request),
        userAgent: request.headers.get('user-agent'),
        origin: request.nextUrl.origin,
      });
    } catch (emailError) {
      console.error('[API][internal][attendance/check-out][EMAIL] Failed:', emailError);
    }

    try {
      await writeAuditLog({
        actorUserId: actor.userId,
        action: 'check_out',
        resource: 'attendance',
        resourceId: String(log.id),
        after: {
          attendanceDate: log.attendanceDate,
          checkOutAt: log.checkOutAt,
        },
        ipAddress: getRequestIp(request),
        userAgent: request.headers.get('user-agent'),
      });
    } catch (auditError) {
      console.error('[API][internal][attendance/check-out][AUDIT] Failed:', auditError);
    }

    return NextResponse.json({ ok: true, log });
  } catch (error) {
    if (error instanceof Error && error.message === 'ATTENDANCE_CHECKIN_REQUIRED') {
      return NextResponse.json(
        {
          ok: false,
          code: 'checkin_required',
          message: 'Bạn cần check-in trước khi check-out.',
        },
        { status: 409 },
      );
    }

    if (error instanceof Error && error.message === 'ATTENDANCE_ALREADY_CHECKED_OUT') {
      return NextResponse.json(
        { ok: false, code: 'already_checked_out', message: 'Bạn đã check-out hôm nay.' },
        { status: 409 },
      );
    }

    console.error('[API][internal][attendance/check-out][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể check-out lúc này.' },
      { status: 500 },
    );
  }
}
