import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json({ ok: false, user: null }, { status: 401 });
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'me',
      resource: 'user',
      resourceId: String(actor.userId),
      after: {
        roles: actor.roles,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({
      ok: true,
      user: {
        id: actor.userId,
        email: actor.email,
        fullName: actor.fullName,
        roles: actor.roles,
        scopes: actor.scopes,
      },
    });
  } catch (error) {
    console.error('[API][internal][auth][me] Failed to load user:', error);
    return NextResponse.json(
      { ok: false, message: 'Không thể xác thực phiên đăng nhập.' },
      { status: 500 },
    );
  }
}
