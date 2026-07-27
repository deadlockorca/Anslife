import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { can } from '../../../../lib/auth/authorization';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import {
  getAttendanceLogByUserAndDate,
  listAttendanceLogs,
} from '../../../../lib/repositories/attendanceRepository';
import {
  listAttendanceWorkPhotos,
  type AttendanceWorkPhotoRecord,
} from '../../../../lib/repositories/attendanceWorkPhotoRepository';

export const dynamic = 'force-dynamic';

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }
  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function parseUserId(value: string | null): number | undefined {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return undefined;
  }
  return parsed;
}

function parseDate(value: string | null): string | undefined {
  const normalized = String(value ?? '').trim();
  if (!normalized) {
    return undefined;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return undefined;
  }
  return normalized;
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

function getPhotoLookupKey(userId: number, attendanceDate: string): string {
  return `${userId}:${attendanceDate}`;
}

function attachWorkPhotos<T extends { userId: number; attendanceDate: string }>(
  logs: T[],
  photos: AttendanceWorkPhotoRecord[],
): Array<T & { workPhotos: AttendanceWorkPhotoRecord[] }> {
  const photoMap = new Map<string, AttendanceWorkPhotoRecord[]>();
  for (const photo of photos) {
    const key = getPhotoLookupKey(photo.userId, photo.attendanceDate);
    const current = photoMap.get(key) ?? [];
    current.push(photo);
    photoMap.set(key, current);
  }

  return logs.map((log) => ({
    ...log,
    workPhotos: photoMap.get(getPhotoLookupKey(log.userId, log.attendanceDate)) ?? [],
  }));
}

function getLogDateRange(logs: Array<{ attendanceDate: string }>): {
  fromDate?: string;
  toDate?: string;
} {
  const dates = logs
    .map((log) => log.attendanceDate)
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort();
  if (dates.length === 0) {
    return {};
  }
  return {
    fromDate: dates[0],
    toDate: dates[dates.length - 1],
  };
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

    const viewDecision = can({
      roles: actor.roles,
      resource: 'attendance',
      action: 'view',
      actorScopes: actor.scopes,
    });
    if (!viewDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem báo cáo công việc.' },
        { status: 403 },
      );
    }

    const manageDecision = can({
      roles: actor.roles,
      resource: 'attendance',
      action: 'manage',
      actorScopes: actor.scopes,
    });

    const url = new URL(request.url);
    const perPage = parsePerPage(url.searchParams.get('per_page'));
    const userIdFilter = parseUserId(url.searchParams.get('user_id'));
    const fromDate = parseDate(url.searchParams.get('from_date'));
    const toDate = parseDate(url.searchParams.get('to_date'));

    const logs = await listAttendanceLogs({
      limit: perPage,
      userId: manageDecision.allowed ? userIdFilter : actor.userId,
      fromDate,
      toDate,
    });

    const todayDate = getTodayDateInVietnam();
    const todayLog = await getAttendanceLogByUserAndDate(actor.userId, todayDate);
    const logDateRange = getLogDateRange(logs);
    const scopedUserId = manageDecision.allowed ? userIdFilter : actor.userId;
    const photos = await listAttendanceWorkPhotos({
      limit: Math.min(1000, perPage * 12),
      userId: scopedUserId,
      fromDate: fromDate ?? logDateRange.fromDate,
      toDate: toDate ?? logDateRange.toDate,
    });
    const todayWorkPhotos = await listAttendanceWorkPhotos({
      limit: 100,
      userId: actor.userId,
      fromDate: todayDate,
      toDate: todayDate,
    });
    const logsWithPhotos = attachWorkPhotos(logs, photos);
    const todayLogWithPhotos = todayLog
      ? {
          ...todayLog,
          workPhotos: todayWorkPhotos,
        }
      : null;

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'view',
      resource: 'attendance',
      resourceId: manageDecision.allowed
        ? userIdFilter
          ? String(userIdFilter)
          : '*'
        : String(actor.userId),
      after: {
        total: logs.length,
        canManage: manageDecision.allowed,
        fromDate: fromDate ?? null,
        toDate: toDate ?? null,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({
      ok: true,
      logs: logsWithPhotos,
      todayDate,
      todayLog: todayLogWithPhotos,
      todayWorkPhotos,
      canManage: manageDecision.allowed,
    });
  } catch (error) {
    console.error('[API][internal][attendance][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu báo cáo công việc.' },
      { status: 500 },
    );
  }
}
