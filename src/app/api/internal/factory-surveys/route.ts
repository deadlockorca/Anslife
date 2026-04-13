import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../lib/auth/authorization';
import { DATA_STATES, can } from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { getFactoryById } from '../../../../lib/repositories/masterDataRepository';
import {
  createFactorySurvey,
  listFactorySurveys,
  type FactorySurveyRecord,
} from '../../../../lib/repositories/workflowRepository';

export const dynamic = 'force-dynamic';

interface CreateFactorySurveyBody {
  factoryId?: number;
  surveyCode?: string;
  title?: string;
  surveyDate?: string | null;
  score?: number | null;
  summary?: string | null;
  metadata?: Record<string, unknown> | null;
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }
  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function isDataState(value: string): value is DataState {
  return DATA_STATES.includes(value as DataState);
}

function isValidCode(value: string): boolean {
  return /^[A-Za-z0-9._-]{2,64}$/.test(value);
}

function buildScopeTargetFromItem(item: FactorySurveyRecord) {
  return {
    factoryId: item.factory.code,
  };
}

function canActorViewFactorySurvey(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: FactorySurveyRecord,
): boolean {
  if (!isDataState(item.state)) {
    return false;
  }

  return can({
    roles: actor.roles,
    resource: 'factory_survey',
    action: 'view',
    state: item.state,
    actorScopes: actor.scopes,
    scopeTarget: buildScopeTargetFromItem(item),
  }).allowed;
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

    const url = new URL(request.url);
    const perPage = parsePerPage(url.searchParams.get('per_page'));
    const factoryCode = url.searchParams.get('factory_code')?.trim() ?? '';
    const state = url.searchParams.get('state')?.trim().toLowerCase() ?? '';
    const surveyCode = url.searchParams.get('survey_code')?.trim() ?? '';

    if (state && !isDataState(state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái dữ liệu không hợp lệ.' },
        { status: 400 },
      );
    }

    const items = await listFactorySurveys({
      limit: perPage,
      factoryCode: factoryCode || undefined,
      state: state || undefined,
      surveyCode: surveyCode || undefined,
    });
    const filteredItems = items.filter((item) => canActorViewFactorySurvey(actor, item));
    return NextResponse.json({ ok: true, items: filteredItems });
  } catch (error) {
    console.error('[API][internal][factory-surveys][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu khảo sát nhà máy.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateFactorySurveyBody = {};
  try {
    body = (await request.json()) as CreateFactorySurveyBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const factoryId = Number(body.factoryId);
  const surveyCode = String(body.surveyCode ?? '').trim().toUpperCase();
  const title = String(body.title ?? '').trim();
  const surveyDate = body.surveyDate == null ? null : String(body.surveyDate).trim();
  const score =
    body.score == null
      ? null
      : Number.isFinite(Number(body.score))
        ? Number(body.score)
        : NaN;
  const summary = body.summary == null ? null : String(body.summary).trim();
  const metadata =
    body.metadata === null
      ? null
      : body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
        ? body.metadata
        : undefined;

  if (!Number.isInteger(factoryId) || factoryId <= 0) {
    return NextResponse.json(
      { ok: false, code: 'invalid_factory_id', message: 'Factory không hợp lệ.' },
      { status: 400 },
    );
  }
  if (!isValidCode(surveyCode)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_survey_code', message: 'Mã khảo sát không hợp lệ.' },
      { status: 400 },
    );
  }
  if (title.length < 2 || title.length > 255) {
    return NextResponse.json(
      { ok: false, code: 'invalid_title', message: 'Tiêu đề khảo sát không hợp lệ.' },
      { status: 400 },
    );
  }
  if (surveyDate && !/^\d{4}-\d{2}-\d{2}$/.test(surveyDate)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_survey_date', message: 'Survey date phải theo định dạng YYYY-MM-DD.' },
      { status: 400 },
    );
  }
  if (score !== null && (!Number.isFinite(score) || score < 0 || score > 100)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_score', message: 'Điểm khảo sát phải trong khoảng 0-100.' },
      { status: 400 },
    );
  }
  if (summary && summary.length > 4000) {
    return NextResponse.json(
      { ok: false, code: 'invalid_summary', message: 'Tóm tắt khảo sát quá dài (tối đa 4000 ký tự).' },
      { status: 400 },
    );
  }
  if (metadata === undefined) {
    return NextResponse.json(
      { ok: false, code: 'invalid_metadata', message: 'Metadata phải là JSON object hoặc null.' },
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

    const factory = await getFactoryById(factoryId);
    if (!factory) {
      return NextResponse.json(
        { ok: false, code: 'factory_not_found', message: 'Không tìm thấy nhà máy.' },
        { status: 404 },
      );
    }

    const createDecision = can({
      roles: actor.roles,
      resource: 'factory_survey',
      action: 'create',
      state: 'pending_review',
      actorScopes: actor.scopes,
      scopeTarget: {
        factoryId: factory.code,
      },
    });
    if (!createDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo khảo sát nhà máy.' },
        { status: 403 },
      );
    }

    const item = await createFactorySurvey({
      factoryId,
      surveyCode,
      title,
      surveyDate,
      score,
      state: 'pending_review',
      summary,
      metadata,
      createdBy: actor.userId,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'factory_survey',
      resourceId: String(item.id),
      after: {
        surveyCode: item.surveyCode,
        factoryCode: item.factory.code,
        state: item.state,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    const duplicateCode =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'ER_DUP_ENTRY';
    if (duplicateCode) {
      return NextResponse.json(
        { ok: false, code: 'survey_code_exists', message: 'Mã khảo sát đã tồn tại.' },
        { status: 409 },
      );
    }

    console.error('[API][internal][factory-surveys][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo khảo sát nhà máy.' },
      { status: 500 },
    );
  }
}
