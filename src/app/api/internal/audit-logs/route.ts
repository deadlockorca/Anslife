import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import type { AuthActor } from '../../../../lib/auth/actor';
import {
  applyRateLimitHeaders,
  consumeRateLimit,
  createRateLimitResponse,
  readRateLimitEnv,
} from '../../../../lib/http/rateLimit';
import { listAuditLogs, writeAuditLog } from '../../../../lib/repositories/auditRepository';
import { getOrderDataItemById } from '../../../../lib/repositories/orderDataItemRepository';
import { getTradeOrderById } from '../../../../lib/repositories/orderRepository';

export const dynamic = 'force-dynamic';

function canViewAuditLogs(actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>): boolean {
  return actor.roles.some((role) =>
    ['super_admin', 'system_admin', 'data_controller'].includes(role),
  );
}

function parseLimit(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }
  return Math.min(500, Math.max(1, Math.floor(parsed)));
}

function isAdminManager(actor: AuthActor): boolean {
  return actor.roles.includes('super_admin') || actor.roles.includes('system_admin');
}

function isDataController(actor: AuthActor): boolean {
  return actor.roles.includes('data_controller');
}

function parseResourceId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

function hasGlobalScope(actor: AuthActor): boolean {
  return actor.scopes.some((scope) => scope.type === 'global');
}

function hasScopeValue(
  actor: AuthActor,
  scopeType: 'order' | 'customer' | 'factory' | 'market',
  scopeValue: string | null | undefined,
): boolean {
  if (!scopeValue) {
    return false;
  }

  return actor.scopes.some(
    (scope) => scope.type === scopeType && scope.value === scopeValue,
  );
}

function isOrderInActorScope(
  actor: AuthActor,
  order: {
    orderNo: string;
    customerCode: string;
    factoryCode: string | null;
    marketCode: string | null;
  },
): boolean {
  if (isAdminManager(actor) || hasGlobalScope(actor)) {
    return true;
  }

  const hasDomainScope = actor.scopes.some((scope) =>
    ['order', 'customer', 'factory', 'market'].includes(scope.type),
  );
  if (!hasDomainScope) {
    return false;
  }

  return (
    hasScopeValue(actor, 'order', order.orderNo) ||
    hasScopeValue(actor, 'customer', order.customerCode) ||
    hasScopeValue(actor, 'factory', order.factoryCode) ||
    hasScopeValue(actor, 'market', order.marketCode)
  );
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

    if (!canViewAuditLogs(actor)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem nhật ký hệ thống.' },
        { status: 403 },
      );
    }

    const clientIp = getRequestIp(request) ?? 'unknown';
    const rateLimit = consumeRateLimit({
      namespace: 'audit_logs_list',
      key: `${actor.userId}:${clientIp}`,
      max: readRateLimitEnv('APP_RATE_LIMIT_AUDIT_MAX', 120),
      windowMs: readRateLimitEnv('APP_RATE_LIMIT_AUDIT_WINDOW_SECONDS', 600) * 1000,
    });
    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        'Bạn đang truy vấn audit logs quá nhanh. Vui lòng thử lại sau.',
        rateLimit,
      );
    }

    const url = new URL(request.url);
    const limit = parseLimit(url.searchParams.get('per_page'));
    const action = url.searchParams.get('action')?.trim() ?? '';
    const resource = url.searchParams.get('resource')?.trim() ?? '';
    const resourceId = url.searchParams.get('resource_id')?.trim() ?? '';
    const actorUserIdRaw = url.searchParams.get('actor_user_id')?.trim() ?? '';
    const actorUserId =
      actorUserIdRaw && Number.isInteger(Number(actorUserIdRaw))
        ? Number(actorUserIdRaw)
        : undefined;

    const logs = await listAuditLogs({
      limit,
      action: action || undefined,
      resource: resource || undefined,
      resourceId: resourceId || undefined,
      actorUserId,
    });

    if (isAdminManager(actor)) {
      await writeAuditLog({
        actorUserId: actor.userId,
        action: 'view',
        resource: 'audit_log',
        resourceId: '*',
        after: {
          count: logs.length,
          mode: 'admin_manager',
          filters: {
            action: action || null,
            resource: resource || null,
            resourceId: resourceId || null,
            actorUserId: actorUserId ?? null,
          },
        },
        ipAddress: clientIp,
        userAgent: request.headers.get('user-agent'),
      });
      return applyRateLimitHeaders(NextResponse.json({ ok: true, logs }), rateLimit);
    }

    if (!isDataController(actor)) {
      await writeAuditLog({
        actorUserId: actor.userId,
        action: 'view',
        resource: 'audit_log',
        resourceId: 'restricted',
        after: { count: 0, mode: 'restricted' },
        ipAddress: clientIp,
        userAgent: request.headers.get('user-agent'),
      });
      return applyRateLimitHeaders(NextResponse.json({ ok: true, logs: [] }), rateLimit);
    }

    const orderCache = new Map<number, Awaited<ReturnType<typeof getTradeOrderById>>>();
    const dataItemCache = new Map<number, Awaited<ReturnType<typeof getOrderDataItemById>>>();
    const filteredLogs = (
      await Promise.all(
        logs.map(async (log) => {
          if (log.resource !== 'order' && log.resource !== 'order_data_item') {
            return null;
          }

          const targetId = parseResourceId(log.resourceId);
          if (!targetId) {
            return null;
          }

          if (log.resource === 'order') {
            if (!orderCache.has(targetId)) {
              orderCache.set(targetId, await getTradeOrderById(targetId));
            }
            const order = orderCache.get(targetId);
            if (!order) {
              return null;
            }

            return isOrderInActorScope(actor, {
              orderNo: order.orderNo,
              customerCode: order.customer.code,
              factoryCode: order.factory?.code ?? null,
              marketCode: order.customer.countryCode,
            })
              ? log
              : null;
          }

          if (!dataItemCache.has(targetId)) {
            dataItemCache.set(targetId, await getOrderDataItemById(targetId));
          }
          const dataItem = dataItemCache.get(targetId);
          if (!dataItem) {
            return null;
          }

          return isOrderInActorScope(actor, {
            orderNo: dataItem.orderNo,
            customerCode: dataItem.customer.code,
            factoryCode: dataItem.factory?.code ?? null,
            marketCode: dataItem.customer.countryCode,
          })
            ? log
            : null;
        }),
      )
    ).filter((log): log is (typeof logs)[number] => Boolean(log));

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'view',
      resource: 'audit_log',
      resourceId: '*',
      after: {
        count: filteredLogs.length,
        mode: 'data_controller_scope_filtered',
        filters: {
          action: action || null,
          resource: resource || null,
          resourceId: resourceId || null,
          actorUserId: actorUserId ?? null,
        },
      },
      ipAddress: clientIp,
      userAgent: request.headers.get('user-agent'),
    });

    return applyRateLimitHeaders(
      NextResponse.json({ ok: true, logs: filteredLogs }),
      rateLimit,
    );
  } catch (error) {
    console.error('[API][internal][audit-logs][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải audit logs.' },
      { status: 500 },
    );
  }
}
