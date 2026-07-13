import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor } from '../../../../../lib/auth/actor';
import { listRecruitmentApplications } from '../../../../../lib/repositories/recruitmentRepository';

export const dynamic = 'force-dynamic';

const RECRUITMENT_MANAGE_ROLES = new Set(['super_admin', 'system_admin', 'data_controller']);

function canManageRecruitment(actor: Awaited<ReturnType<typeof getAuthActor>>): boolean {
  return Boolean(actor?.roles.some((role) => RECRUITMENT_MANAGE_ROLES.has(role)));
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }

  return Math.min(500, Math.max(1, Math.floor(parsed)));
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

    if (!canManageRecruitment(actor)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem hồ sơ ứng tuyển.' },
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const applications = await listRecruitmentApplications(
      parsePerPage(url.searchParams.get('per_page')),
    );

    return NextResponse.json({ ok: true, applications });
  } catch (error) {
    console.error('[API][internal][recruitment][applications][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải hồ sơ ứng tuyển.' },
      { status: 500 },
    );
  }
}
