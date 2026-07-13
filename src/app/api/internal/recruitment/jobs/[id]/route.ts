import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../../lib/repositories/auditRepository';
import {
  getRecruitmentJobById,
  updateRecruitmentJob,
  type RecruitmentStatus,
  type UpdateRecruitmentJobInput,
} from '../../../../../../lib/repositories/recruitmentRepository';

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

function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function normalizeStatus(value: string | undefined): RecruitmentStatus | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalized = String(value).trim().toLowerCase();
  return RECRUITMENT_STATUS_VALUES.has(normalized)
    ? (normalized as RecruitmentStatus)
    : undefined;
}

function normalizeStringArray(value: unknown): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item ?? '').trim()).filter(Boolean);
}

function parseJobInput(body: SaveRecruitmentJobBody): UpdateRecruitmentJobInput {
  return {
    groupCode: body.groupCode === undefined ? undefined : String(body.groupCode).trim(),
    groupTitle: body.groupTitle === undefined ? undefined : String(body.groupTitle).trim(),
    groupBody: body.groupBody === undefined ? undefined : body.groupBody == null ? null : String(body.groupBody).trim(),
    marketName: body.marketName === undefined ? undefined : String(body.marketName).trim(),
    marketStatus: normalizeStatus(body.marketStatus),
    title: body.title === undefined ? undefined : String(body.title).trim(),
    summary: body.summary === undefined ? undefined : String(body.summary).trim(),
    description:
      body.description === undefined
        ? undefined
        : body.description == null
          ? null
          : String(body.description).trim(),
    requirements: normalizeStringArray(body.requirements),
    benefits: normalizeStringArray(body.benefits),
    location: body.location === undefined ? undefined : body.location == null ? null : String(body.location).trim(),
    workType: body.workType === undefined ? undefined : body.workType == null ? null : String(body.workType).trim(),
    status: normalizeStatus(body.status),
    sortOrder: body.sortOrder === undefined ? undefined : Number(body.sortOrder),
    isPublic: body.isPublic,
  };
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const id = parseId(params.id);
  if (!id) {
    return NextResponse.json(
      { ok: false, code: 'invalid_id', message: 'ID không hợp lệ.' },
      { status: 400 },
    );
  }

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
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền sửa vị trí tuyển dụng.' },
        { status: 403 },
      );
    }

    const before = await getRecruitmentJobById(id);
    if (!before) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy vị trí tuyển dụng.' },
        { status: 404 },
      );
    }

    const job = await updateRecruitmentJob(id, parseJobInput(body));
    if (!job) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy vị trí tuyển dụng.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'update',
      resource: 'recruitment_job',
      resourceId: String(job.id),
      before,
      after: job,
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, job });
  } catch (error) {
    console.error('[API][internal][recruitment][jobs][PATCH] Failed:', error);
    return NextResponse.json(
      {
        ok: false,
        code: 'internal_error',
        message: error instanceof Error ? error.message : 'Không thể cập nhật vị trí tuyển dụng.',
      },
      { status: 500 },
    );
  }
}
