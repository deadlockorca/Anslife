import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE_NAME,
  clearSessionCookie,
  revokeSessionToken,
} from '../../../../../lib/auth/session';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const actor = await getAuthActor(request);
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value ?? '';
    if (token) {
      await revokeSessionToken(token);
    }

    const response = NextResponse.json({ ok: true });
    clearSessionCookie(response);

    if (actor) {
      await writeAuditLog({
        actorUserId: actor.userId,
        action: 'logout',
        resource: 'user',
        resourceId: String(actor.userId),
        after: { email: actor.email },
        ipAddress: getRequestIp(request),
        userAgent: request.headers.get('user-agent'),
      });
    }

    return response;
  } catch (error) {
    console.error('[API][internal][auth][logout] Failed to logout:', error);
    return NextResponse.json(
      { ok: false, message: 'Không thể kết thúc phiên đăng nhập.' },
      { status: 500 },
    );
  }
}
