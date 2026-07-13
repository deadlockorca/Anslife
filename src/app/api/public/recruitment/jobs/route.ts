import { NextResponse } from 'next/server';
import { getCorsHeaders } from '../../../../../lib/http/cors';
import { listRecruitmentJobs } from '../../../../../lib/repositories/recruitmentRepository';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');

  try {
    const jobs = await listRecruitmentJobs({
      includeHidden: false,
      status: 'all',
      limit: 500,
    });

    return NextResponse.json({ ok: true, jobs }, { headers });
  } catch (error) {
    console.error('[API][public][recruitment][jobs][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'recruitment_jobs_unavailable', jobs: [] },
      { status: 503, headers },
    );
  }
}

export async function OPTIONS(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');
  return new NextResponse(null, { status: 204, headers });
}
