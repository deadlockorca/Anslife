import type { AuthActor } from './actor';
import { can, type ScopeTarget } from './authorization';
import type { TradeOrderRecord } from '../repositories/orderRepository';
import type { CustomerRecord, FactoryRecord } from '../repositories/masterDataRepository';

export function isAdminManager(actor: AuthActor): boolean {
  return actor.roles.includes('super_admin') || actor.roles.includes('system_admin');
}

export function canEnterOrderModule(actor: AuthActor): boolean {
  return can({
    roles: actor.roles,
    resource: 'order',
    action: 'view',
    actorScopes: actor.scopes,
  }).allowed;
}

export function buildOrderScopeTarget(input: {
  orderNo: string;
  customerCode: string;
  factoryCode?: string | null;
  marketCode?: string | null;
}): ScopeTarget {
  return {
    orderId: input.orderNo,
    customerId: input.customerCode,
    factoryId: input.factoryCode ?? null,
    marketCode: input.marketCode ?? null,
  };
}

export function canActorViewOrder(actor: AuthActor, order: TradeOrderRecord): boolean {
  if (isAdminManager(actor)) {
    return true;
  }

  const decision = can({
    roles: actor.roles,
    resource: 'order',
    action: 'view',
    actorScopes: actor.scopes,
    scopeTarget: buildOrderScopeTarget({
      orderNo: order.orderNo,
      customerCode: order.customer.code,
      factoryCode: order.factory?.code,
      marketCode: order.customer.countryCode,
    }),
  });
  if (decision.allowed) {
    return true;
  }

  if (order.saleOwnerUserId === actor.userId) {
    return true;
  }

  return order.assignments.some((assignment) => assignment.userId === actor.userId);
}

export function canActorMutateOrder(
  actor: AuthActor,
  action: 'create' | 'update',
  target: ScopeTarget,
  allowSaleOrderWrite: boolean,
): boolean {
  const decision = can({
    roles: actor.roles,
    resource: 'order',
    action,
    actorScopes: actor.scopes,
    scopeTarget: target,
    allowSaleOrderWrite,
  });

  return decision.allowed;
}

export function canActorViewCustomer(
  actor: AuthActor,
  customer: Pick<CustomerRecord, 'code' | 'countryCode'>,
): boolean {
  if (isAdminManager(actor)) {
    return true;
  }

  return can({
    roles: actor.roles,
    resource: 'customer',
    action: 'view',
    actorScopes: actor.scopes,
    scopeTarget: {
      customerId: customer.code,
      marketCode: customer.countryCode,
    },
  }).allowed;
}

export function canActorViewFactory(
  actor: AuthActor,
  factory: Pick<FactoryRecord, 'code'>,
): boolean {
  if (isAdminManager(actor)) {
    return true;
  }

  return can({
    roles: actor.roles,
    resource: 'factory',
    action: 'view',
    actorScopes: actor.scopes,
    scopeTarget: {
      factoryId: factory.code,
    },
  }).allowed;
}
