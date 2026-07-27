import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor } from '../../../../../lib/auth/actor';
import { listDriveProjectsForUser } from '../../../../../lib/repositories/driveProjectRepository';

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

    const projects = await listDriveProjectsForUser(actor.userId);
    return NextResponse.json({ ok: true, projects });
  } catch (error) {
    console.error('[API][internal][drive][projects][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải danh sách dự án.' },
      { status: 500 },
    );
  }
}
