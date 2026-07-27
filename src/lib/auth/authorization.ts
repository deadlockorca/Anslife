export const APP_ROLES = [
  'super_admin',
  'system_admin',
  'data_controller',
  'qc',
  'factory_collector',
  'sale_trading',
  'factory_partner',
  'buyer',
] as const;

export const LEGACY_ROLE_ALIASES = {
  qc_anslife: 'qc',
  qc_factory_partner: 'qc',
  factory_survey: 'factory_collector',
  trading_director: 'sale_trading',
  factory_owner: 'factory_partner',
  material_supplier: 'factory_partner',
  special_partner: 'sale_trading',
} as const;

export const DATA_STATES = [
  'draft',
  'pending_review',
  'approved_internal',
  'approved_sales',
  'approved_buyer',
  'archived',
] as const;
export const ORDER_STATUSES = DATA_STATES;

export type AppRole = (typeof APP_ROLES)[number];
export type DataState = (typeof DATA_STATES)[number];
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type LegacyAppRole = keyof typeof LEGACY_ROLE_ALIASES;
export type AnyAppRole = AppRole | LegacyAppRole;

export type AppResource =
  | 'data_item'
  | 'qc_item'
  | 'capa_item'
  | 'factory_survey'
  | 'supplier_material'
  | 'order'
  | 'customer'
  | 'factory'
  | 'attendance'
  | 'project'
  | 'user'
  | 'role'
  | 'scope'
  | 'system'
  | 'audit_log';

export type AppAction =
  | 'view'
  | 'create'
  | 'update'
  | 'approve'
  | 'publish_sales'
  | 'publish_buyer'
  | 'download'
  | 'share'
  | 'export'
  | 'assign'
  | 'change_status'
  | 'manage';

export type ScopeType =
  | 'global'
  | 'customer'
  | 'factory'
  | 'order'
  | 'market'
  | 'project'
  | 'supplier'
  | 'material'
  | 'buyer_company'
  | 'explicit';

export interface ActorScope {
  type: ScopeType;
  value: string;
}

export interface ScopeTarget {
  customerId?: string | null;
  factoryId?: string | null;
  orderId?: string | null;
  marketCode?: string | null;
  projectId?: string | null;
  supplierId?: string | null;
  materialCode?: string | null;
  buyerCompanyId?: string | null;
  explicitKey?: string | null;
}

export interface AuthorizationInput {
  roles: AppRole[];
  resource: AppResource;
  action: AppAction;
  state?: DataState | null;
  actorScopes?: ActorScope[];
  scopeTarget?: ScopeTarget;
  allowSaleOrderWrite?: boolean;
}

export interface AuthorizationResult {
  allowed: boolean;
  reason: string;
}

export function isCanonicalAppRole(value: string): value is AppRole {
  return APP_ROLES.includes(value as AppRole);
}

export function resolveRoleAlias(value: string): AppRole | null {
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  if (isCanonicalAppRole(normalized)) {
    return normalized;
  }

  const alias = normalized as LegacyAppRole;
  return LEGACY_ROLE_ALIASES[alias] ?? null;
}

export function normalizeRoleList(values: string[]): AppRole[] {
  const unique = new Set<AppRole>();
  for (const value of values) {
    const resolved = resolveRoleAlias(value);
    if (resolved) {
      unique.add(resolved);
    }
  }
  return Array.from(unique.values());
}

export function isOrderStatus(value: string): value is OrderStatus {
  return ORDER_STATUSES.includes(value as OrderStatus);
}

function hasAuthenticatedRole(roles: AppRole[]): boolean {
  return roles.length > 0;
}

function hasAnyRole(roles: AppRole[], expectedRoles: AppRole[]): boolean {
  return expectedRoles.some((role) => roles.includes(role));
}

function isQcAttendanceOnlyRoleSet(roles: AppRole[]): boolean {
  return roles.length === 1 && roles[0] === 'qc';
}

export function can(input: AuthorizationInput): AuthorizationResult {
  if (!hasAuthenticatedRole(input.roles)) {
    return { allowed: false, reason: 'Bạn chưa đăng nhập.' };
  }

  if (isQcAttendanceOnlyRoleSet(input.roles)) {
    if (
      input.resource === 'attendance' &&
      ['view', 'create', 'update'].includes(input.action)
    ) {
      return { allowed: true, reason: 'QC được phép báo cáo công việc cá nhân.' };
    }

    return {
      allowed: false,
      reason: 'Tài khoản QC chỉ được phép check-in, check-out và gửi báo cáo công việc.',
    };
  }

  if (hasAnyRole(input.roles, ['super_admin', 'system_admin', 'data_controller'])) {
    return { allowed: true, reason: 'Vai trò quản trị được phép truy cập.' };
  }

  // Other non-QC role behavior is kept open while detailed RBAC is rolled out.
  return { allowed: true, reason: 'Chế độ admin đơn: cho phép truy cập.' };
}

export interface StateTransitionInput {
  roles: AppRole[];
  from: DataState;
  to: DataState;
}

export interface OrderStatusTransitionInput {
  roles: AppRole[];
  from: OrderStatus;
  to: OrderStatus;
}

export function canTransitionDataState(
  input: StateTransitionInput,
): AuthorizationResult {
  if (!hasAuthenticatedRole(input.roles)) {
    return { allowed: false, reason: 'Bạn chưa đăng nhập.' };
  }

  if (input.from === input.to) {
    return { allowed: true, reason: 'Không có thay đổi trạng thái.' };
  }

  if (isQcAttendanceOnlyRoleSet(input.roles)) {
    return {
      allowed: false,
      reason: 'Tài khoản QC chỉ được phép check-in, check-out và gửi báo cáo công việc.',
    };
  }

  return { allowed: true, reason: 'Chế độ admin đơn: cho phép chuyển trạng thái.' };
}

export function canTransitionOrderStatus(
  input: OrderStatusTransitionInput,
): AuthorizationResult {
  return canTransitionDataState({
    roles: input.roles,
    from: input.from,
    to: input.to,
  });
}
