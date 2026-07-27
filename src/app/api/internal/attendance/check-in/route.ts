import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { can } from '../../../../../lib/auth/authorization';
import { sendAttendanceNotificationEmail } from '../../../../../lib/email/attendanceNotification';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { checkInAttendance } from '../../../../../lib/repositories/attendanceRepository';

export const dynamic = 'force-dynamic';

interface AttendanceCheckInBody {
  latitude?: number | null;
  longitude?: number | null;
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

function validateLocation(body: AttendanceCheckInBody): LocationValidationResult {
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
  let body: AttendanceCheckInBody = {};
  try {
    body = (await request.json()) as AttendanceCheckInBody;
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

    const checkInDecision = can({
      roles: actor.roles,
      resource: 'attendance',
      action: 'create',
      actorScopes: actor.scopes,
    });
    if (!checkInDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền check-in.' },
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
          message: 'Bạn cần bật GPS và cho phép quyền vị trí để check-in.',
        },
        { status: 400 },
      );
    }

    const todayDate = getTodayDateInVietnam();
    const log = await checkInAttendance({
      userId: actor.userId,
      attendanceDate: todayDate,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
      latitude: locationValidation.latitude ?? null,
      longitude: locationValidation.longitude ?? null,
      photoUrl: null,
      note: body.note ?? null,
    });

    try {
      await sendAttendanceNotificationEmail({
        actor,
        action: 'check_in',
        attendanceDate: todayDate,
        log,
        ipAddress: getRequestIp(request),
        userAgent: request.headers.get('user-agent'),
        origin: request.nextUrl.origin,
      });
    } catch (emailError) {
      console.error('[API][internal][attendance/check-in][EMAIL] Failed:', emailError);
    }

    try {
      await writeAuditLog({
        actorUserId: actor.userId,
        action: 'check_in',
        resource: 'attendance',
        resourceId: String(log.id),
        after: {
          attendanceDate: log.attendanceDate,
          checkInAt: log.checkInAt,
        },
        ipAddress: getRequestIp(request),
        userAgent: request.headers.get('user-agent'),
      });
    } catch (auditError) {
      console.error('[API][internal][attendance/check-in][AUDIT] Failed:', auditError);
    }

    return NextResponse.json({ ok: true, log }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'ATTENDANCE_ALREADY_CHECKED_IN') {
      return NextResponse.json(
        { ok: false, code: 'already_checked_in', message: 'Bạn đã check-in hôm nay.' },
        { status: 409 },
      );
    }

    console.error('[API][internal][attendance/check-in][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể check-in lúc này.' },
      { status: 500 },
    );
  }
}
