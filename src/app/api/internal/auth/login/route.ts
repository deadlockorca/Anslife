import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword } from '../../../../../lib/auth/password';
import { attachSessionCookie, issueSessionToken } from '../../../../../lib/auth/session';
import {
  getUserAuthContextByEmail,
  touchUserLastLogin,
} from '../../../../../lib/repositories/userRepository';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { getRequestIp } from '../../../../../lib/auth/actor';
import { ensureAuthBootstrap } from '../../../../../lib/auth/bootstrap';
import {
  applyRateLimitHeaders,
  consumeRateLimit,
  createRateLimitResponse,
  readRateLimitEnv,
} from '../../../../../lib/http/rateLimit';

export const dynamic = 'force-dynamic';

interface LoginBody {
  email?: string;
  password?: string;
}

export async function POST(request: NextRequest) {
  let body: LoginBody;
  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const email = String(body.email ?? '').trim().toLowerCase();
  const password = String(body.password ?? '');
  if (!email || !password) {
    return NextResponse.json(
      { ok: false, message: 'Email và mật khẩu là bắt buộc.' },
      { status: 400 },
    );
  }

  const clientIp = getRequestIp(request) ?? 'unknown';
  const rateLimit = consumeRateLimit({
    namespace: 'auth_login',
    key: `${clientIp}:${email}`,
    max: readRateLimitEnv('APP_RATE_LIMIT_LOGIN_MAX', 10),
    windowMs: readRateLimitEnv('APP_RATE_LIMIT_LOGIN_WINDOW_SECONDS', 600) * 1000,
  });
  if (!rateLimit.allowed) {
    try {
      await writeAuditLog({
        actorUserId: null,
        action: 'login_rate_limited',
        resource: 'user',
        resourceId: email || 'unknown',
        after: { email },
        ipAddress: clientIp,
        userAgent: request.headers.get('user-agent'),
      });
    } catch {
      // no-op
    }
    return createRateLimitResponse(
      'Bạn đang thử đăng nhập quá nhanh. Vui lòng thử lại sau.',
      rateLimit,
    );
  }

  try {
    await ensureAuthBootstrap();

    const user = await getUserAuthContextByEmail(email);
    if (!user || !user.isActive) {
      try {
        await writeAuditLog({
          actorUserId: user?.id ?? null,
          action: 'login_failed',
          resource: 'user',
          resourceId: email,
          after: { email, reason: 'user_not_found_or_inactive' },
          ipAddress: clientIp,
          userAgent: request.headers.get('user-agent'),
        });
      } catch {
        // no-op
      }
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, message: 'Thông tin đăng nhập không đúng.' },
        { status: 401 },
      ), rateLimit);
    }

    const passwordMatched = await verifyPassword(password, user.passwordHash);
    if (!passwordMatched) {
      try {
        await writeAuditLog({
          actorUserId: user.id,
          action: 'login_failed',
          resource: 'user',
          resourceId: String(user.id),
          after: { email: user.email, reason: 'invalid_password' },
          ipAddress: clientIp,
          userAgent: request.headers.get('user-agent'),
        });
      } catch {
        // no-op
      }
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, message: 'Thông tin đăng nhập không đúng.' },
        { status: 401 },
      ), rateLimit);
    }

    await touchUserLastLogin(user.id);

    const token = await issueSessionToken({
      userId: user.id,
    });

    const response = NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        roles: user.roles,
        scopes: user.scopes,
      },
    });
    attachSessionCookie(response, token);

    await writeAuditLog({
      actorUserId: user.id,
      action: 'login',
      resource: 'user',
      resourceId: String(user.id),
      after: { email: user.email, roles: user.roles },
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent'),
    });

    return applyRateLimitHeaders(response, rateLimit);
  } catch (error) {
    console.error('[API][internal][auth][login] Failed to login:', error);
    return applyRateLimitHeaders(NextResponse.json(
      { ok: false, message: 'Hệ thống đang bận. Vui lòng thử lại sau.' },
      { status: 500 },
    ), rateLimit);
  }
}
