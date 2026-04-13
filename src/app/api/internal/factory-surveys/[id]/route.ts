import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../../lib/auth/authorization';
import {
  DATA_STATES,
  can,
  canTransitionDataState,
} from '../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import {
  getFactorySurveyById,
  updateFactorySurvey,
} from '../../../../../lib/repositories/workflowRepository';

export const dynamic = 'force-dynamic';

interface UpdateFactorySurveyBody {
  surveyCode?: string;
  title?: string;
  surveyDate?: string | null;
  score?: number | null;
  summary?: string | null;
  metadata?: Record<string, unknown> | null;
  state?: string;
}

function parseId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function isDataState(value: string): value is DataState {
  return DATA_STATES.includes(value as DataState);
}

function isValidCode(value: string): boolean {
  return /^[A-Za-z0-9._-]{2,64}$/.test(value);
}

function buildScopeTargetFromItem(
  item: NonNullable<Awaited<ReturnType<typeof getFactorySurveyById>>>,
) {
  return {
    factoryId: item.factory.code,
  };
}

function canActorViewFactorySurvey(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: NonNullable<Awaited<ReturnType<typeof getFactorySurveyById>>>,
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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }

    const params = await context.params;
    const itemId = parseId(params.id);
    if (!itemId) {
      return NextResponse.json(
        { ok: false, code: 'invalid_item_id', message: 'ID khảo sát không hợp lệ.' },
        { status: 400 },
      );
    }

    const item = await getFactorySurveyById(itemId);
    if (!item) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy khảo sát nhà máy.' },
        { status: 404 },
      );
    }

    if (!canActorViewFactorySurvey(actor, item)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem khảo sát này.' },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error('[API][internal][factory-surveys/:id][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải chi tiết khảo sát.' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateFactorySurveyBody = {};
  try {
    body = (await request.json()) as UpdateFactorySurveyBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const params = await context.params;
  const itemId = parseId(params.id);
  if (!itemId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_item_id', message: 'ID khảo sát không hợp lệ.' },
      { status: 400 },
    );
  }

  const surveyCode = body.surveyCode == null ? undefined : String(body.surveyCode).trim().toUpperCase();
  const title = body.title == null ? undefined : String(body.title).trim();
  const surveyDate = body.surveyDate == null ? body.surveyDate : String(body.surveyDate).trim();
  const score =
    body.score === undefined
      ? undefined
      : body.score === null
        ? null
        : Number(body.score);
  const summary = body.summary == null ? body.summary : String(body.summary).trim();
  const metadata =
    body.metadata === undefined
      ? undefined
      : body.metadata === null
        ? null
        : body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
          ? body.metadata
          : undefined;
  const state = body.state == null ? undefined : String(body.state).trim().toLowerCase();

  if (surveyCode !== undefined && !isValidCode(surveyCode)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_survey_code', message: 'Mã khảo sát không hợp lệ.' },
      { status: 400 },
    );
  }
  if (title !== undefined && (title.length < 2 || title.length > 255)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_title', message: 'Tiêu đề khảo sát không hợp lệ.' },
      { status: 400 },
    );
  }
  if (surveyDate !== undefined && surveyDate !== null && !/^\d{4}-\d{2}-\d{2}$/.test(surveyDate)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_survey_date', message: 'Survey date phải theo định dạng YYYY-MM-DD.' },
      { status: 400 },
    );
  }
  if (score !== undefined && score !== null && (!Number.isFinite(score) || score < 0 || score > 100)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_score', message: 'Điểm khảo sát phải trong khoảng 0-100.' },
      { status: 400 },
    );
  }
  if (summary !== undefined && summary !== null && summary.length > 4000) {
    return NextResponse.json(
      { ok: false, code: 'invalid_summary', message: 'Tóm tắt khảo sát quá dài (tối đa 4000 ký tự).' },
      { status: 400 },
    );
  }
  if (metadata === undefined && body.metadata !== undefined) {
    return NextResponse.json(
      { ok: false, code: 'invalid_metadata', message: 'Metadata phải là JSON object hoặc null.' },
      { status: 400 },
    );
  }
  if (state !== undefined && !isDataState(state)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_state', message: 'Trạng thái dữ liệu không hợp lệ.' },
      { status: 400 },
    );
  }

  const hasAnyField =
    surveyCode !== undefined ||
    title !== undefined ||
    surveyDate !== undefined ||
    score !== undefined ||
    summary !== undefined ||
    metadata !== undefined ||
    state !== undefined;
  if (!hasAnyField) {
    return NextResponse.json(
      { ok: false, code: 'no_changes', message: 'Không có dữ liệu cần cập nhật.' },
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

    const currentItem = await getFactorySurveyById(itemId);
    if (!currentItem) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy khảo sát nhà máy.' },
        { status: 404 },
      );
    }
    if (!isDataState(currentItem.state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái hiện tại của khảo sát không hợp lệ.' },
        { status: 500 },
      );
    }
    const currentState: DataState = currentItem.state;

    if (!canActorViewFactorySurvey(actor, currentItem)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền sửa khảo sát này.' },
        { status: 403 },
      );
    }

    const scopeTarget = buildScopeTargetFromItem(currentItem);
    const hasContentUpdate =
      surveyCode !== undefined ||
      title !== undefined ||
      surveyDate !== undefined ||
      score !== undefined ||
      summary !== undefined ||
      metadata !== undefined;
    if (hasContentUpdate) {
      const updateDecision = can({
        roles: actor.roles,
        resource: 'factory_survey',
        action: 'update',
        state: currentState,
        actorScopes: actor.scopes,
        scopeTarget,
      });
      if (!updateDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật khảo sát.' },
          { status: 403 },
        );
      }
    }

    let approvedBy: number | null | undefined;
    let approvedAt: string | null | undefined;
    if (state !== undefined && state !== currentState) {
      const transitionDecision = canTransitionDataState({
        roles: actor.roles,
        from: currentState,
        to: state,
      });
      if (!transitionDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: transitionDecision.reason },
          { status: 403 },
        );
      }
      if (['approved_internal', 'approved_sales', 'approved_buyer'].includes(state)) {
        approvedBy = actor.userId;
        approvedAt = new Date().toISOString();
      } else {
        approvedBy = null;
        approvedAt = null;
      }
    }

    const updated = await updateFactorySurvey(itemId, {
      surveyCode,
      title,
      surveyDate,
      score,
      summary,
      metadata,
      state,
      approvedBy,
      approvedAt,
    });
    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy khảo sát nhà máy.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: state !== undefined && state !== currentItem.state ? 'change_state' : 'update',
      resource: 'factory_survey',
      resourceId: String(updated.id),
      before: { state: currentItem.state, title: currentItem.title },
      after: { state: updated.state, title: updated.title },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item: updated });
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

    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Không thể cập nhật khảo sát nhà máy.';
    const statusCode = message.includes('Invalid date') ? 400 : 500;
    console.error('[API][internal][factory-surveys/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: statusCode === 400 ? 'invalid_input' : 'internal_error', message },
      { status: statusCode },
    );
  }
}
