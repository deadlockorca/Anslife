import { NextRequest, NextResponse } from 'next/server';
import { getRequestIp } from '../../../../../lib/auth/actor';
import {
  applyRateLimitHeaders,
  consumeRateLimit,
  createRateLimitResponse,
  readRateLimitEnv,
} from '../../../../../lib/http/rateLimit';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import { getDataShareLinkByToken } from '../../../../../lib/repositories/dataShareLinkRepository';
import { getOrderDataItemById } from '../../../../../lib/repositories/orderDataItemRepository';

export const dynamic = 'force-dynamic';

function isValidToken(token: string): boolean {
  return /^[A-Za-z0-9_-]{16,191}$/.test(token);
}

function isLinkExpired(expiresAt: string | null): boolean {
  if (!expiresAt) {
    return false;
  }

  const expires = new Date(expiresAt).getTime();
  if (Number.isNaN(expires)) {
    return true;
  }
  return expires < Date.now();
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  try {
    const clientIp = getRequestIp(request) ?? 'unknown';
    const rateLimit = consumeRateLimit({
      namespace: 'public_share_access',
      key: clientIp,
      max: readRateLimitEnv('APP_RATE_LIMIT_PUBLIC_SHARE_MAX', 180),
      windowMs: readRateLimitEnv('APP_RATE_LIMIT_PUBLIC_SHARE_WINDOW_SECONDS', 600) * 1000,
    });
    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        'Bạn truy cập link chia sẻ quá nhanh. Vui lòng thử lại sau.',
        rateLimit,
      );
    }

    const params = await context.params;
    const token = params.token?.trim() ?? '';
    if (!isValidToken(token)) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'invalid_token', message: 'Link chia sẻ không hợp lệ.' },
        { status: 400 },
      ), rateLimit);
    }

    const link = await getDataShareLinkByToken(token);
    if (!link) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'not_found', message: 'Link chia sẻ không tồn tại.' },
        { status: 404 },
      ), rateLimit);
    }

    if (isLinkExpired(link.expiresAt)) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'link_expired', message: 'Link chia sẻ đã hết hạn.' },
        { status: 410 },
      ), rateLimit);
    }

    const item = await getOrderDataItemById(link.dataItemId);
    if (!item) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'not_found', message: 'Dữ liệu chia sẻ không tồn tại.' },
        { status: 404 },
      ), rateLimit);
    }

    if (!['approved_sales', 'approved_buyer'].includes(item.state)) {
      return applyRateLimitHeaders(NextResponse.json(
        { ok: false, code: 'not_ready', message: 'Dữ liệu chưa được phép chia sẻ.' },
        { status: 409 },
      ), rateLimit);
    }

    await writeAuditLog({
      action: 'access_share_link',
      resource: 'order_data_item',
      resourceId: String(item.id),
      after: {
        shareLinkId: link.id,
      },
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent'),
    });

    return applyRateLimitHeaders(NextResponse.json({
      ok: true,
      item,
      link: {
        id: link.id,
        expiresAt: link.expiresAt,
      },
    }), rateLimit);
  } catch (error) {
    console.error('[API][public][share/:token][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu chia sẻ.' },
      { status: 500 },
    );
  }
}
