import type { AuthActor } from '../auth/actor';
import { can, isOrderStatus } from '../auth/authorization';
import { buildOrderScopeTarget, canActorViewOrder } from '../auth/orderAccess';
import { listTradeOrders, type TradeOrderRecord } from './orderRepository';
import { listQcItems, type QcItemRecord } from './workflowRepository';

const STATUS_ORDER = [
  'draft',
  'pending_review',
  'approved_internal',
  'approved_sales',
  'approved_buyer',
  'archived',
] as const;

type DashboardLevel = 'info' | 'warning' | 'success';

export interface DashboardStatusCount {
  status: string;
  count: number;
}

export interface DashboardQcPreview {
  id: number;
  orderNo: string;
  title: string;
  severity: string;
  state: string;
  observedAt: string | null;
  factoryName: string | null;
  customerName: string;
}

export interface DashboardDeliveryPreview {
  orderId: number;
  orderNo: string;
  dueDate: string;
  status: string;
  customerName: string;
  factoryName: string | null;
}

export interface DashboardNotification {
  level: DashboardLevel;
  message: string;
}

export interface DashboardSummary {
  runningOrders: number;
  productionProgress: DashboardStatusCount[];
  latestQcReports: DashboardQcPreview[];
  deliverySchedule: DashboardDeliveryPreview[];
  notifications: DashboardNotification[];
}

function sortStatuses(statuses: DashboardStatusCount[]): DashboardStatusCount[] {
  return [...statuses].sort((a, b) => {
    const indexA = STATUS_ORDER.indexOf(a.status as (typeof STATUS_ORDER)[number]);
    const indexB = STATUS_ORDER.indexOf(b.status as (typeof STATUS_ORDER)[number]);
    if (indexA === -1 && indexB === -1) {
      return a.status.localeCompare(b.status);
    }
    if (indexA === -1) {
      return 1;
    }
    if (indexB === -1) {
      return -1;
    }
    return indexA - indexB;
  });
}

function countByStatus(orders: TradeOrderRecord[]): DashboardStatusCount[] {
  const map = new Map<string, number>();
  for (const order of orders) {
    const status = isOrderStatus(order.status) ? order.status : 'draft';
    map.set(status, (map.get(status) ?? 0) + 1);
  }
  return sortStatuses(
    Array.from(map.entries()).map(([status, count]) => ({ status, count })),
  );
}

function toDateValue(date: string): number {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? Number.MAX_SAFE_INTEGER : parsed.getTime();
}

function canActorViewQcItem(actor: AuthActor, item: QcItemRecord): boolean {
  const decision = can({
    roles: actor.roles,
    resource: 'qc_item',
    action: 'view',
    state: isOrderStatus(item.state) ? item.state : 'pending_review',
    actorScopes: actor.scopes,
    scopeTarget: buildOrderScopeTarget({
      orderNo: item.orderNo,
      customerCode: item.customer.code,
      factoryCode: item.factory?.code ?? null,
      marketCode: item.customer.countryCode,
    }),
  });
  if (decision.allowed) {
    return true;
  }

  return item.saleOwnerUserId === actor.userId;
}

function buildNotifications(
  runningOrders: number,
  progress: DashboardStatusCount[],
  deliveries: DashboardDeliveryPreview[],
): DashboardNotification[] {
  const notifications: DashboardNotification[] = [];

  const pendingReview =
    progress.find((item) => item.status === 'pending_review')?.count ?? 0;
  if (pendingReview > 0) {
    notifications.push({
      level: 'warning',
      message: `Có ${pendingReview} dữ liệu/đơn hàng đang chờ duyệt.`,
    });
  }

  if (runningOrders > 0) {
    notifications.push({
      level: 'info',
      message: `Tổng cộng ${runningOrders} đơn hàng đang hoạt động.`,
    });
  }

  const now = Date.now();
  const dueSoonCount = deliveries.filter((item) => {
    const dueAt = toDateValue(item.dueDate);
    return dueAt >= now && dueAt - now <= 7 * 24 * 60 * 60 * 1000;
  }).length;
  if (dueSoonCount > 0) {
    notifications.push({
      level: 'info',
      message: `${dueSoonCount} đơn hàng có lịch giao trong 7 ngày tới.`,
    });
  }

  if (notifications.length === 0) {
    notifications.push({
      level: 'success',
      message: 'Hệ thống ổn định, chưa có cảnh báo vận hành.',
    });
  }

  return notifications;
}

export async function getDashboardSummary(actor: AuthActor): Promise<DashboardSummary> {
  const allOrders = await listTradeOrders({ limit: 500 });
  const visibleOrders = allOrders.filter((order) => canActorViewOrder(actor, order));

  const runningOrders = visibleOrders.filter((order) => order.status !== 'archived').length;
  const productionProgress = countByStatus(visibleOrders);

  const latestQcItems = await listQcItems({ limit: 80 });
  const latestQcReports = latestQcItems
    .filter((item) => canActorViewQcItem(actor, item))
    .slice(0, 8)
    .map((item) => ({
      id: item.id,
      orderNo: item.orderNo,
      title: item.title,
      severity: item.severity,
      state: item.state,
      observedAt: item.observedAt,
      factoryName: item.factory?.name ?? null,
      customerName: item.customer.name,
    }));

  const deliverySchedule = visibleOrders
    .filter((item) => Boolean(item.dueDate))
    .sort((a, b) => toDateValue(a.dueDate ?? '') - toDateValue(b.dueDate ?? ''))
    .slice(0, 12)
    .map((item) => ({
      orderId: item.id,
      orderNo: item.orderNo,
      dueDate: item.dueDate as string,
      status: item.status,
      customerName: item.customer.name,
      factoryName: item.factory?.name ?? null,
    }));

  const notifications = buildNotifications(
    runningOrders,
    productionProgress,
    deliverySchedule,
  );

  return {
    runningOrders,
    productionProgress,
    latestQcReports,
    deliverySchedule,
    notifications,
  };
}
