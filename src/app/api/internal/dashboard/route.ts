import { NextRequest, NextResponse } from 'next/server';
import { can } from '../../../../lib/auth/authorization';
import { getAuthActor } from '../../../../lib/auth/actor';
import { getDashboardSummary } from '../../../../lib/repositories/dashboardRepository';

export const dynamic = 'force-dynamic';

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
      resource: 'order',
      action: 'view',
      actorScopes: actor.scopes,
    });
    if (!viewDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem dashboard.' },
        { status: 403 },
      );
    }

    const summary = await getDashboardSummary(actor);
    return NextResponse.json({ ok: true, summary });
  } catch (error) {
    console.error('[API][internal][dashboard][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải dashboard.' },
      { status: 500 },
    );
  }
}
