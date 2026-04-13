import { NextRequest, NextResponse } from 'next/server';
import {
  can,
  canTransitionDataState,
  type AppAction,
  type AppResource,
  type DataState,
} from '../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';

export const dynamic = 'force-dynamic';

interface AuthorizationCheckBody {
  resource?: AppResource;
  action?: AppAction;
  state?: DataState | null;
  scopeTarget?: {
    customerId?: string | null;
    factoryId?: string | null;
    orderId?: string | null;
    marketCode?: string | null;
    projectId?: string | null;
    supplierId?: string | null;
    materialCode?: string | null;
    buyerCompanyId?: string | null;
    explicitKey?: string | null;
  };
  transition?: {
    from: DataState;
    to: DataState;
  } | null;
}

export async function POST(request: NextRequest) {
  let body: AuthorizationCheckBody;
  try {
    body = (await request.json()) as AuthorizationCheckBody;
  } catch {
    return NextResponse.json(
      { code: 'invalid_payload', message: 'Invalid JSON payload.' },
      { status: 400 },
    );
  }

  if (!body.resource || !body.action) {
    return NextResponse.json(
      { code: 'missing_fields', message: 'resource and action are required.' },
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

    const decision = can({
      roles: actor.roles,
      resource: body.resource,
      action: body.action,
      state: body.state ?? undefined,
      actorScopes: actor.scopes,
      scopeTarget: body.scopeTarget,
    });

    const transitionDecision = body.transition
      ? canTransitionDataState({
          roles: actor.roles,
          from: body.transition.from,
          to: body.transition.to,
        })
      : null;

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'authorization_check',
      resource: 'system',
      resourceId: body.resource,
      before: {
        action: body.action,
        state: body.state ?? null,
        scopeTarget: body.scopeTarget ?? null,
        transition: body.transition ?? null,
      },
      after: {
        decisionAllowed: decision.allowed,
        transitionAllowed: transitionDecision?.allowed ?? null,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({
      ok: true,
      actor: {
        userId: actor.userId,
        roles: actor.roles,
        scopes: actor.scopes,
      },
      decision,
      transitionDecision,
    });
  } catch (error) {
    console.error('[API][internal][authorization][check] Failed:', error);
    return NextResponse.json(
      { ok: false, message: 'Không thể kiểm tra phân quyền.' },
      { status: 500 },
    );
  }
}
