import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import {
  createRecruitmentJob,
  listRecruitmentJobs,
  type CreateRecruitmentJobInput,
  type RecruitmentStatus,
} from '../../../../../lib/repositories/recruitmentRepository';

export const dynamic = 'force-dynamic';

interface SaveRecruitmentJobBody {
  groupCode?: string;
  groupTitle?: string;
  groupBody?: string | null;
  marketName?: string;
  marketStatus?: string;
  title?: string;
  summary?: string;
  description?: string | null;
  requirements?: string[];
  benefits?: string[];
  location?: string | null;
  workType?: string | null;
  status?: string;
  sortOrder?: number;
  isPublic?: boolean;
}

const RECRUITMENT_MANAGE_ROLES = new Set(['super_admin', 'system_admin', 'data_controller']);
const RECRUITMENT_STATUS_VALUES = new Set(['open', 'receiving', 'paused', 'closed']);

function canManageRecruitment(actor: Awaited<ReturnType<typeof getAuthActor>>): boolean {
  return Boolean(actor?.roles.some((role) => RECRUITMENT_MANAGE_ROLES.has(role)));
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 200);
  if (!Number.isFinite(parsed)) {
    return 200;
  }

  return Math.min(500, Math.max(1, Math.floor(parsed)));
}

function normalizeStatus(value: string | undefined, fallback: RecruitmentStatus): RecruitmentStatus {
  const normalized = String(value ?? '').trim().toLowerCase();
  return RECRUITMENT_STATUS_VALUES.has(normalized)
    ? (normalized as RecruitmentStatus)
    : fallback;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item ?? '').trim()).filter(Boolean);
}

function parseJobInput(body: SaveRecruitmentJobBody): CreateRecruitmentJobInput {
  return {
    groupCode: String(body.groupCode ?? '').trim(),
    groupTitle: String(body.groupTitle ?? '').trim(),
    groupBody: body.groupBody == null ? null : String(body.groupBody).trim(),
    marketName: String(body.marketName ?? '').trim(),
    marketStatus: normalizeStatus(body.marketStatus, 'receiving'),
    title: String(body.title ?? '').trim(),
    summary: String(body.summary ?? '').trim(),
    description: body.description == null ? null : String(body.description).trim(),
    requirements: normalizeStringArray(body.requirements),
    benefits: normalizeStringArray(body.benefits),
    location: body.location == null ? null : String(body.location).trim(),
    workType: body.workType == null ? null : String(body.workType).trim(),
    status: normalizeStatus(body.status, 'receiving'),
    sortOrder: Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0,
    isPublic: body.isPublic !== false,
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

    if (!canManageRecruitment(actor)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem tuyển dụng.' },
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const jobs = await listRecruitmentJobs({
      includeHidden: true,
      status: 'all',
      limit: parsePerPage(url.searchParams.get('per_page')),
    });

    return NextResponse.json({ ok: true, jobs });
  } catch (error) {
    console.error('[API][internal][recruitment][jobs][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải danh sách tuyển dụng.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: SaveRecruitmentJobBody;
  try {
    body = (await request.json()) as SaveRecruitmentJobBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

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
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo vị trí tuyển dụng.' },
        { status: 403 },
      );
    }

    const job = await createRecruitmentJob(parseJobInput(body));

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'recruitment_job',
      resourceId: String(job.id),
      after: job,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, job }, { status: 201 });
  } catch (error) {
    console.error('[API][internal][recruitment][jobs][POST] Failed:', error);
    return NextResponse.json(
      {
        ok: false,
        code: 'internal_error',
        message: error instanceof Error ? error.message : 'Không thể tạo vị trí tuyển dụng.',
      },
      { status: 500 },
    );
  }
}
