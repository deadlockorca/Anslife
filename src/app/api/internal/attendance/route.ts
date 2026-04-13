import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { can } from '../../../../lib/auth/authorization';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import {
  getAttendanceLogByUserAndDate,
  listAttendanceLogs,
} from '../../../../lib/repositories/attendanceRepository';

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
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem chấm công.' },
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
      logs,
      todayDate,
      todayLog,
      canManage: manageDecision.allowed,
    });
  } catch (error) {
    console.error('[API][internal][attendance][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu chấm công.' },
      { status: 500 },
    );
  }
}
