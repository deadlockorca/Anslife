export const APP_ROLE_OPTIONS = [
  { code: 'super_admin', label: 'Quản trị tối cao' },
  { code: 'system_admin', label: 'Quản trị hệ thống' },
  { code: 'data_controller', label: 'Kiểm soát dữ liệu' },
  { code: 'qc', label: 'QC' },
  { code: 'factory_collector', label: 'Bộ phận thu thập dữ liệu nhà máy' },
  { code: 'sale_trading', label: 'Sale / Thương mại' },
  { code: 'factory_partner', label: 'Nhà máy / Đối tác sản xuất' },
  { code: 'buyer', label: 'Khách hàng' },
] as const;

export type AppRole = (typeof APP_ROLE_OPTIONS)[number]['code'];

const LEGACY_ROLE_ALIASES: Record<string, AppRole> = {
  qc_anslife: 'qc',
  qc_factory_partner: 'qc',
  factory_survey: 'factory_collector',
  trading_director: 'sale_trading',
  factory_owner: 'factory_partner',
  material_supplier: 'factory_partner',
  special_partner: 'sale_trading',
};

export const SCOPE_TYPE_OPTIONS = [
  'global',
  'customer',
  'factory',
  'order',
  'market',
  'project',
  'supplier',
  'material',
  'buyer_company',
  'explicit',
] as const;

export type ScopeType = (typeof SCOPE_TYPE_OPTIONS)[number];

export interface ActorScope {
  type: ScopeType;
  value: string;
}

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  roles: AppRole[];
  scopes: ActorScope[];
}

export interface UserProfile extends AuthUser {
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InternalCustomer {
  id: number;
  code: string;
  name: string;
  countryCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InternalFactory {
  id: number;
  code: string;
  name: string;
  location: string | null;
  createdAt: string;
  updatedAt: string;
}

export type InternalRecruitmentStatus = 'open' | 'paused';

export interface InternalRecruitmentJob {
  id: number;
  groupCode: string;
  groupTitle: string;
  groupBody: string | null;
  marketName: string;
  marketStatus: InternalRecruitmentStatus;
  title: string;
  summary: string;
  description: string | null;
  requirements: string[];
  benefits: string[];
  location: string | null;
  workType: string | null;
  status: InternalRecruitmentStatus;
  sortOrder: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InternalRecruitmentApplication {
  id: number;
  jobId: number | null;
  jobTitle: string | null;
  careerGroup: string | null;
  careerMarket: string | null;
  careerStatus: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  countryRegion: string | null;
  cvLink: string | null;
  latestExperience: string | null;
  message: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface InternalOrderAssignment {
  userId: number;
  assignmentRole: string;
}

export interface InternalOrderCustomerRef {
  id: number;
  code: string;
  name: string;
  countryCode: string | null;
}

export interface InternalOrderFactoryRef {
  id: number;
  code: string;
  name: string;
  location: string | null;
}

export const INTERNAL_ORDER_STATUS_OPTIONS = [
  { code: 'draft', label: 'Nháp' },
  { code: 'pending_review', label: 'Chờ duyệt' },
  { code: 'approved_internal', label: 'Duyệt nội bộ' },
  { code: 'approved_sales', label: 'Duyệt cho sale' },
  { code: 'approved_buyer', label: 'Duyệt cho khách hàng' },
  { code: 'archived', label: 'Lưu trữ' },
] as const;

export type InternalOrderStatus = (typeof INTERNAL_ORDER_STATUS_OPTIONS)[number]['code'];

export interface InternalOrder {
  id: number;
  orderNo: string;
  customer: InternalOrderCustomerRef;
  factory: InternalOrderFactoryRef | null;
  saleOwnerUserId: number | null;
  status: InternalOrderStatus;
  dueDate: string | null;
  metadata: Record<string, unknown> | null;
  assignments: InternalOrderAssignment[];
  createdAt: string;
  updatedAt: string;
}

export interface InternalOrderDataItem {
  id: number;
  orderId: number;
  orderNo: string;
  orderStatus: InternalOrderStatus;
  saleOwnerUserId: number | null;
  customer: InternalOrderCustomerRef;
  factory: InternalOrderFactoryRef | null;
  dataType: string;
  title: string;
  state: InternalOrderStatus;
  storageKey: string | null;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InternalQcItem {
  id: number;
  orderId: number;
  orderNo: string;
  saleOwnerUserId: number | null;
  customer: InternalOrderCustomerRef;
  factory: InternalOrderFactoryRef | null;
  title: string;
  findingType: string;
  severity: string;
  state: InternalOrderStatus;
  reportNo: string | null;
  observedAt: string | null;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InternalCapaItem {
  id: number;
  orderId: number;
  orderNo: string;
  saleOwnerUserId: number | null;
  customer: InternalOrderCustomerRef;
  factory: InternalOrderFactoryRef | null;
  qcItemId: number | null;
  title: string;
  rootCause: string | null;
  correctiveAction: string | null;
  preventiveAction: string | null;
  ownerUserId: number | null;
  dueDate: string | null;
  state: InternalOrderStatus;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InternalFactorySurvey {
  id: number;
  factory: InternalOrderFactoryRef;
  surveyCode: string;
  title: string;
  surveyDate: string | null;
  score: number | null;
  state: InternalOrderStatus;
  summary: string | null;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InternalSupplierMaterial {
  id: number;
  supplierCode: string;
  supplierName: string;
  materialCode: string;
  materialName: string;
  certificateUrl: string | null;
  quoteUrl: string | null;
  state: InternalOrderStatus;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InternalDataShareLink {
  id: number;
  dataItemId: number;
  token: string;
  url: string;
  expiresAt: string | null;
  createdBy: number | null;
  createdByName: string | null;
  createdAt: string;
}

export interface InternalAuditLog {
  id: number;
  actorUserId: number | null;
  actorName: string | null;
  action: string;
  resource: string;
  resourceId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface InternalAttendanceLog {
  id: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  attendanceDate: string;
  checkInAt: string | null;
  checkOutAt: string | null;
  checkInIp: string | null;
  checkOutIp: string | null;
  checkInUserAgent: string | null;
  checkOutUserAgent: string | null;
  checkInLat: number | null;
  checkInLng: number | null;
  checkInPhotoUrl: string | null;
  checkOutLat: number | null;
  checkOutLng: number | null;
  checkOutPhotoUrl: string | null;
  note: string | null;
  workMinutes: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface InternalDashboardStatusCount {
  status: string;
  count: number;
}

export interface InternalDashboardQcReport {
  id: number;
  orderNo: string;
  title: string;
  severity: string;
  state: string;
  observedAt: string | null;
  factoryName: string | null;
  customerName: string;
}

export interface InternalDashboardDeliveryItem {
  orderId: number;
  orderNo: string;
  dueDate: string;
  status: string;
  customerName: string;
  factoryName: string | null;
}

export interface InternalDashboardNotification {
  level: 'info' | 'warning' | 'success';
  message: string;
}

export interface InternalDashboardSummary {
  runningOrders: number;
  productionProgress: InternalDashboardStatusCount[];
  latestQcReports: InternalDashboardQcReport[];
  deliverySchedule: InternalDashboardDeliveryItem[];
  notifications: InternalDashboardNotification[];
}

export interface InternalOrderLogistics {
  id: number;
  orderId: number;
  orderNo: string;
  saleOwnerUserId: number | null;
  customer: InternalOrderCustomerRef;
  factory: InternalOrderFactoryRef | null;
  etd: string | null;
  eta: string | null;
  containerNo: string | null;
  departurePort: string | null;
  arrivalPort: string | null;
  shippingLine: string | null;
  vesselName: string | null;
  note: string | null;
  updatedBy: number | null;
  updatedByName: string | null;
  createdAt: string;
  updatedAt: string;
}

export type InternalWorkLogVisibility = 'internal' | 'trader' | 'buyer';

export interface InternalOrderWorkLog {
  id: number;
  orderId: number;
  orderNo: string;
  saleOwnerUserId: number | null;
  customer: InternalOrderCustomerRef;
  factory: InternalOrderFactoryRef | null;
  visibility: InternalWorkLogVisibility;
  noteType: string;
  message: string;
  createdBy: number | null;
  updatedBy: number | null;
  createdByName: string | null;
  updatedByName: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiErrorPayload {
  ok?: boolean;
  code?: string;
  message?: string;
}

const INTERNAL_API_BASE = '/api/internal';

function isAppRole(value: string): value is AppRole {
  return APP_ROLE_OPTIONS.some((role) => role.code === value);
}

function normalizeAppRole(value: string): AppRole | null {
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  if (isAppRole(normalized)) {
    return normalized;
  }

  return LEGACY_ROLE_ALIASES[normalized] ?? null;
}

function isScopeType(value: string): value is ScopeType {
  return SCOPE_TYPE_OPTIONS.includes(value as ScopeType);
}

function isInternalOrderStatus(value: string): value is InternalOrderStatus {
  return INTERNAL_ORDER_STATUS_OPTIONS.some((option) => option.code === value);
}

function isInternalRecruitmentStatus(value: string): value is InternalRecruitmentStatus {
  return ['open', 'paused'].includes(value);
}

function normalizeInternalRecruitmentStatus(value: string): InternalRecruitmentStatus | null {
  if (value === 'receiving') {
    return 'open';
  }
  if (value === 'closed') {
    return 'paused';
  }
  return isInternalRecruitmentStatus(value) ? value : null;
}

async function parseApiError(response: Response): Promise<string> {
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    try {
      const payload = (await response.json()) as ApiErrorPayload;
      return (
        payload.message ??
        payload.code ??
        `Yêu cầu thất bại (HTTP ${response.status}).`
      );
    } catch {
      return `Yêu cầu thất bại (HTTP ${response.status}).`;
    }
  }

  const text = await response.text();
  if (text.includes('<!DOCTYPE html') || text.includes('<html')) {
    return 'API internal chưa sẵn sàng trên môi trường hiện tại.';
  }

  return `Yêu cầu thất bại (HTTP ${response.status}).`;
}

function normalizeScopes(scopes: unknown): ActorScope[] {
  if (!Array.isArray(scopes)) {
    return [];
  }

  return scopes
    .map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return null;
      }

      const rawType = String((item as Record<string, unknown>).type ?? '').trim();
      const rawValue = String((item as Record<string, unknown>).value ?? '').trim();
      if (!isScopeType(rawType) || !rawValue) {
        return null;
      }

      return {
        type: rawType,
        value: rawValue,
      } satisfies ActorScope;
    })
    .filter((item): item is ActorScope => Boolean(item));
}

function normalizeRoles(roles: unknown): AppRole[] {
  if (!Array.isArray(roles)) {
    return [];
  }

  const unique = new Set<AppRole>();
  for (const item of roles) {
    const normalized = normalizeAppRole(String(item));
    if (normalized) {
      unique.add(normalized);
    }
  }
  return Array.from(unique.values());
}

function normalizeAuthUser(user: unknown): AuthUser | null {
  if (!user || typeof user !== 'object' || Array.isArray(user)) {
    return null;
  }

  const raw = user as Record<string, unknown>;
  const id = Number(raw.id);
  const email = String(raw.email ?? '').trim();
  const fullName = String(raw.fullName ?? '').trim();
  if (!Number.isFinite(id) || id <= 0 || !email || !fullName) {
    return null;
  }

  return {
    id,
    email,
    fullName,
    roles: normalizeRoles(raw.roles),
    scopes: normalizeScopes(raw.scopes),
  };
}

function normalizeUserProfile(user: unknown): UserProfile | null {
  if (!user || typeof user !== 'object' || Array.isArray(user)) {
    return null;
  }

  const raw = user as Record<string, unknown>;
  const authUser = normalizeAuthUser(raw);
  if (!authUser) {
    return null;
  }

  const isActive = Boolean(raw.isActive);
  const createdAt = String(raw.createdAt ?? '');
  const updatedAt = String(raw.updatedAt ?? '');

  return {
    ...authUser,
    isActive,
    createdAt,
    updatedAt,
  };
}

function normalizeString(rawValue: unknown): string {
  return String(rawValue ?? '').trim();
}

function normalizeOptionalString(rawValue: unknown): string | null {
  const value = normalizeString(rawValue);
  return value.length > 0 ? value : null;
}

function normalizeInternalCustomer(value: unknown): InternalCustomer | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const code = normalizeString(raw.code).toUpperCase();
  const name = normalizeString(raw.name);
  if (!Number.isInteger(id) || id <= 0 || !code || !name) {
    return null;
  }

  return {
    id,
    code,
    name,
    countryCode: normalizeOptionalString(raw.countryCode)?.toUpperCase() ?? null,
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeInternalFactory(value: unknown): InternalFactory | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const code = normalizeString(raw.code).toUpperCase();
  const name = normalizeString(raw.name);
  if (!Number.isInteger(id) || id <= 0 || !code || !name) {
    return null;
  }

  return {
    id,
    code,
    name,
    location: normalizeOptionalString(raw.location),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => normalizeString(item)).filter(Boolean);
}

function normalizeInternalRecruitmentJob(value: unknown): InternalRecruitmentJob | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const groupCode = normalizeString(raw.groupCode);
  const groupTitle = normalizeString(raw.groupTitle);
  const marketName = normalizeString(raw.marketName);
  const marketStatus = normalizeInternalRecruitmentStatus(
    normalizeString(raw.marketStatus).toLowerCase(),
  );
  const title = normalizeString(raw.title);
  const summary = normalizeString(raw.summary);
  const status = normalizeInternalRecruitmentStatus(
    normalizeString(raw.status).toLowerCase(),
  );
  const sortOrder = Number(raw.sortOrder ?? 0);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !groupCode ||
    !groupTitle ||
    !marketName ||
    !marketStatus ||
    !title ||
    !summary ||
    !status ||
    !Number.isFinite(sortOrder)
  ) {
    return null;
  }

  return {
    id,
    groupCode,
    groupTitle,
    groupBody: normalizeOptionalString(raw.groupBody),
    marketName,
    marketStatus,
    title,
    summary,
    description: normalizeOptionalString(raw.description),
    requirements: normalizeStringArray(raw.requirements),
    benefits: normalizeStringArray(raw.benefits),
    location: normalizeOptionalString(raw.location),
    workType: normalizeOptionalString(raw.workType),
    status,
    sortOrder,
    isPublic: Boolean(raw.isPublic),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeInternalRecruitmentApplication(value: unknown): InternalRecruitmentApplication | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const jobId = raw.jobId == null ? null : Number(raw.jobId);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    (jobId !== null && (!Number.isInteger(jobId) || jobId <= 0))
  ) {
    return null;
  }

  return {
    id,
    jobId,
    jobTitle: normalizeOptionalString(raw.jobTitle),
    careerGroup: normalizeOptionalString(raw.careerGroup),
    careerMarket: normalizeOptionalString(raw.careerMarket),
    careerStatus: normalizeOptionalString(raw.careerStatus),
    name: normalizeOptionalString(raw.name),
    email: normalizeOptionalString(raw.email),
    phone: normalizeOptionalString(raw.phone),
    countryRegion: normalizeOptionalString(raw.countryRegion),
    cvLink: normalizeOptionalString(raw.cvLink),
    latestExperience: normalizeOptionalString(raw.latestExperience),
    message: normalizeOptionalString(raw.message),
    status: normalizeString(raw.status) || 'new',
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeOrderCustomerRef(value: unknown): InternalOrderCustomerRef | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const code = normalizeString(raw.code).toUpperCase();
  const name = normalizeString(raw.name);
  if (!Number.isInteger(id) || id <= 0 || !code || !name) {
    return null;
  }

  return {
    id,
    code,
    name,
    countryCode: normalizeOptionalString(raw.countryCode)?.toUpperCase() ?? null,
  };
}

function normalizeOrderFactoryRef(value: unknown): InternalOrderFactoryRef | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const code = normalizeString(raw.code).toUpperCase();
  const name = normalizeString(raw.name);
  if (!Number.isInteger(id) || id <= 0 || !code || !name) {
    return null;
  }

  return {
    id,
    code,
    name,
    location: normalizeOptionalString(raw.location),
  };
}

function normalizeOrderAssignments(value: unknown): InternalOrderAssignment[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((assignment) => {
      if (!assignment || typeof assignment !== 'object' || Array.isArray(assignment)) {
        return null;
      }

      const raw = assignment as Record<string, unknown>;
      const userId = Number(raw.userId);
      const assignmentRole = normalizeString(raw.assignmentRole);
      if (!Number.isInteger(userId) || userId <= 0 || !assignmentRole) {
        return null;
      }

      return {
        userId,
        assignmentRole,
      } satisfies InternalOrderAssignment;
    })
    .filter((item): item is InternalOrderAssignment => Boolean(item));
}

function normalizeOrderMetadata(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function normalizeInternalOrder(value: unknown): InternalOrder | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const orderNo = normalizeString(raw.orderNo).toUpperCase();
  const customer = normalizeOrderCustomerRef(raw.customer);
  const factory = raw.factory == null ? null : normalizeOrderFactoryRef(raw.factory);
  const status = normalizeString(raw.status).toLowerCase();
  const saleOwnerUserId =
    raw.saleOwnerUserId == null ? null : Number(raw.saleOwnerUserId);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !orderNo ||
    !customer ||
    (raw.factory != null && !factory) ||
    !isInternalOrderStatus(status) ||
    (saleOwnerUserId !== null &&
      (!Number.isInteger(saleOwnerUserId) || saleOwnerUserId <= 0))
  ) {
    return null;
  }

  return {
    id,
    orderNo,
    customer,
    factory,
    saleOwnerUserId,
    status,
    dueDate: normalizeOptionalString(raw.dueDate),
    metadata: normalizeOrderMetadata(raw.metadata),
    assignments: normalizeOrderAssignments(raw.assignments),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeInternalOrderDataItem(value: unknown): InternalOrderDataItem | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const orderId = Number(raw.orderId);
  const orderNo = normalizeString(raw.orderNo).toUpperCase();
  const orderStatus = normalizeString(raw.orderStatus).toLowerCase();
  const saleOwnerUserId =
    raw.saleOwnerUserId == null ? null : Number(raw.saleOwnerUserId);
  const customer = normalizeOrderCustomerRef(raw.customer);
  const factory = raw.factory == null ? null : normalizeOrderFactoryRef(raw.factory);
  const state = normalizeString(raw.state).toLowerCase();
  const dataType = normalizeString(raw.dataType).toLowerCase();
  const title = normalizeString(raw.title);
  const createdBy = raw.createdBy == null ? null : Number(raw.createdBy);
  const approvedBy = raw.approvedBy == null ? null : Number(raw.approvedBy);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !Number.isInteger(orderId) ||
    orderId <= 0 ||
    !orderNo ||
    !isInternalOrderStatus(orderStatus) ||
    !customer ||
    (raw.factory != null && !factory) ||
    !isInternalOrderStatus(state) ||
    !dataType ||
    !title ||
    (saleOwnerUserId !== null &&
      (!Number.isInteger(saleOwnerUserId) || saleOwnerUserId <= 0)) ||
    (createdBy !== null && (!Number.isInteger(createdBy) || createdBy <= 0)) ||
    (approvedBy !== null && (!Number.isInteger(approvedBy) || approvedBy <= 0))
  ) {
    return null;
  }

  return {
    id,
    orderId,
    orderNo,
    orderStatus,
    saleOwnerUserId,
    customer,
    factory,
    dataType,
    title,
    state,
    storageKey: normalizeOptionalString(raw.storageKey),
    metadata: normalizeOrderMetadata(raw.metadata),
    createdBy,
    createdByName: normalizeOptionalString(raw.createdByName),
    approvedBy,
    approvedByName: normalizeOptionalString(raw.approvedByName),
    approvedAt: normalizeOptionalString(raw.approvedAt),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeInternalQcItem(value: unknown): InternalQcItem | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const orderId = Number(raw.orderId);
  const orderNo = normalizeString(raw.orderNo).toUpperCase();
  const saleOwnerUserId =
    raw.saleOwnerUserId == null ? null : Number(raw.saleOwnerUserId);
  const customer = normalizeOrderCustomerRef(raw.customer);
  const factory = raw.factory == null ? null : normalizeOrderFactoryRef(raw.factory);
  const title = normalizeString(raw.title);
  const findingType = normalizeString(raw.findingType).toLowerCase();
  const severity = normalizeString(raw.severity).toLowerCase();
  const state = normalizeString(raw.state).toLowerCase();
  const createdBy = raw.createdBy == null ? null : Number(raw.createdBy);
  const approvedBy = raw.approvedBy == null ? null : Number(raw.approvedBy);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !Number.isInteger(orderId) ||
    orderId <= 0 ||
    !orderNo ||
    !customer ||
    (raw.factory != null && !factory) ||
    !title ||
    !findingType ||
    !severity ||
    !isInternalOrderStatus(state) ||
    (saleOwnerUserId !== null &&
      (!Number.isInteger(saleOwnerUserId) || saleOwnerUserId <= 0)) ||
    (createdBy !== null && (!Number.isInteger(createdBy) || createdBy <= 0)) ||
    (approvedBy !== null && (!Number.isInteger(approvedBy) || approvedBy <= 0))
  ) {
    return null;
  }

  return {
    id,
    orderId,
    orderNo,
    saleOwnerUserId,
    customer,
    factory,
    title,
    findingType,
    severity,
    state,
    reportNo: normalizeOptionalString(raw.reportNo),
    observedAt: normalizeOptionalString(raw.observedAt),
    metadata: normalizeOrderMetadata(raw.metadata),
    createdBy,
    createdByName: normalizeOptionalString(raw.createdByName),
    approvedBy,
    approvedByName: normalizeOptionalString(raw.approvedByName),
    approvedAt: normalizeOptionalString(raw.approvedAt),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeInternalCapaItem(value: unknown): InternalCapaItem | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const orderId = Number(raw.orderId);
  const orderNo = normalizeString(raw.orderNo).toUpperCase();
  const saleOwnerUserId =
    raw.saleOwnerUserId == null ? null : Number(raw.saleOwnerUserId);
  const customer = normalizeOrderCustomerRef(raw.customer);
  const factory = raw.factory == null ? null : normalizeOrderFactoryRef(raw.factory);
  const qcItemId = raw.qcItemId == null ? null : Number(raw.qcItemId);
  const title = normalizeString(raw.title);
  const ownerUserId = raw.ownerUserId == null ? null : Number(raw.ownerUserId);
  const state = normalizeString(raw.state).toLowerCase();
  const createdBy = raw.createdBy == null ? null : Number(raw.createdBy);
  const approvedBy = raw.approvedBy == null ? null : Number(raw.approvedBy);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !Number.isInteger(orderId) ||
    orderId <= 0 ||
    !orderNo ||
    !customer ||
    (raw.factory != null && !factory) ||
    (qcItemId !== null && (!Number.isInteger(qcItemId) || qcItemId <= 0)) ||
    !title ||
    (ownerUserId !== null && (!Number.isInteger(ownerUserId) || ownerUserId <= 0)) ||
    !isInternalOrderStatus(state) ||
    (saleOwnerUserId !== null &&
      (!Number.isInteger(saleOwnerUserId) || saleOwnerUserId <= 0)) ||
    (createdBy !== null && (!Number.isInteger(createdBy) || createdBy <= 0)) ||
    (approvedBy !== null && (!Number.isInteger(approvedBy) || approvedBy <= 0))
  ) {
    return null;
  }

  return {
    id,
    orderId,
    orderNo,
    saleOwnerUserId,
    customer,
    factory,
    qcItemId,
    title,
    rootCause: normalizeOptionalString(raw.rootCause),
    correctiveAction: normalizeOptionalString(raw.correctiveAction),
    preventiveAction: normalizeOptionalString(raw.preventiveAction),
    ownerUserId,
    dueDate: normalizeOptionalString(raw.dueDate),
    state,
    metadata: normalizeOrderMetadata(raw.metadata),
    createdBy,
    createdByName: normalizeOptionalString(raw.createdByName),
    approvedBy,
    approvedByName: normalizeOptionalString(raw.approvedByName),
    approvedAt: normalizeOptionalString(raw.approvedAt),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeInternalFactorySurvey(value: unknown): InternalFactorySurvey | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const factory = normalizeOrderFactoryRef(raw.factory);
  const surveyCode = normalizeString(raw.surveyCode).toUpperCase();
  const title = normalizeString(raw.title);
  const score = raw.score == null ? null : Number(raw.score);
  const state = normalizeString(raw.state).toLowerCase();
  const createdBy = raw.createdBy == null ? null : Number(raw.createdBy);
  const approvedBy = raw.approvedBy == null ? null : Number(raw.approvedBy);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !factory ||
    !surveyCode ||
    !title ||
    (score !== null && !Number.isFinite(score)) ||
    !isInternalOrderStatus(state) ||
    (createdBy !== null && (!Number.isInteger(createdBy) || createdBy <= 0)) ||
    (approvedBy !== null && (!Number.isInteger(approvedBy) || approvedBy <= 0))
  ) {
    return null;
  }

  return {
    id,
    factory,
    surveyCode,
    title,
    surveyDate: normalizeOptionalString(raw.surveyDate),
    score,
    state,
    summary: normalizeOptionalString(raw.summary),
    metadata: normalizeOrderMetadata(raw.metadata),
    createdBy,
    createdByName: normalizeOptionalString(raw.createdByName),
    approvedBy,
    approvedByName: normalizeOptionalString(raw.approvedByName),
    approvedAt: normalizeOptionalString(raw.approvedAt),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeInternalSupplierMaterial(value: unknown): InternalSupplierMaterial | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const supplierCode = normalizeString(raw.supplierCode).toUpperCase();
  const supplierName = normalizeString(raw.supplierName);
  const materialCode = normalizeString(raw.materialCode).toUpperCase();
  const materialName = normalizeString(raw.materialName);
  const state = normalizeString(raw.state).toLowerCase();
  const createdBy = raw.createdBy == null ? null : Number(raw.createdBy);
  const approvedBy = raw.approvedBy == null ? null : Number(raw.approvedBy);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !supplierCode ||
    !supplierName ||
    !materialCode ||
    !materialName ||
    !isInternalOrderStatus(state) ||
    (createdBy !== null && (!Number.isInteger(createdBy) || createdBy <= 0)) ||
    (approvedBy !== null && (!Number.isInteger(approvedBy) || approvedBy <= 0))
  ) {
    return null;
  }

  return {
    id,
    supplierCode,
    supplierName,
    materialCode,
    materialName,
    certificateUrl: normalizeOptionalString(raw.certificateUrl),
    quoteUrl: normalizeOptionalString(raw.quoteUrl),
    state,
    metadata: normalizeOrderMetadata(raw.metadata),
    createdBy,
    createdByName: normalizeOptionalString(raw.createdByName),
    approvedBy,
    approvedByName: normalizeOptionalString(raw.approvedByName),
    approvedAt: normalizeOptionalString(raw.approvedAt),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeInternalDataShareLink(value: unknown): InternalDataShareLink | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const dataItemId = Number(raw.dataItemId);
  const token = normalizeString(raw.token);
  const url = normalizeString(raw.url);
  const createdBy = raw.createdBy == null ? null : Number(raw.createdBy);
  if (!Number.isInteger(id) || id <= 0 || !Number.isInteger(dataItemId) || dataItemId <= 0 || !token || !url) {
    return null;
  }
  if (createdBy !== null && (!Number.isInteger(createdBy) || createdBy <= 0)) {
    return null;
  }

  return {
    id,
    dataItemId,
    token,
    url,
    expiresAt: normalizeOptionalString(raw.expiresAt),
    createdBy,
    createdByName: normalizeOptionalString(raw.createdByName),
    createdAt: normalizeString(raw.createdAt),
  };
}

function normalizeInternalAuditLog(value: unknown): InternalAuditLog | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const actorUserId = raw.actorUserId == null ? null : Number(raw.actorUserId);
  const action = normalizeString(raw.action).toLowerCase();
  const resource = normalizeString(raw.resource).toLowerCase();
  const resourceId = normalizeString(raw.resourceId);
  const before = normalizeOrderMetadata(raw.before);
  const after = normalizeOrderMetadata(raw.after);
  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !action ||
    !resource ||
    !resourceId ||
    (actorUserId !== null && (!Number.isInteger(actorUserId) || actorUserId <= 0))
  ) {
    return null;
  }

  return {
    id,
    actorUserId,
    actorName: normalizeOptionalString(raw.actorName),
    action,
    resource,
    resourceId,
    before,
    after,
    ipAddress: normalizeOptionalString(raw.ipAddress),
    userAgent: normalizeOptionalString(raw.userAgent),
    createdAt: normalizeString(raw.createdAt),
  };
}

function normalizeInternalAttendanceLog(value: unknown): InternalAttendanceLog | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const userId = Number(raw.userId);
  const userEmail = normalizeString(raw.userEmail).toLowerCase();
  const userFullName = normalizeString(raw.userFullName);
  const attendanceDate = normalizeString(raw.attendanceDate);
  const checkInLat = raw.checkInLat == null ? null : Number(raw.checkInLat);
  const checkInLng = raw.checkInLng == null ? null : Number(raw.checkInLng);
  const checkOutLat = raw.checkOutLat == null ? null : Number(raw.checkOutLat);
  const checkOutLng = raw.checkOutLng == null ? null : Number(raw.checkOutLng);
  const workMinutes = raw.workMinutes == null ? null : Number(raw.workMinutes);

  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !Number.isInteger(userId) ||
    userId <= 0 ||
    !userEmail ||
    !userFullName ||
    !attendanceDate
  ) {
    return null;
  }

  return {
    id,
    userId,
    userEmail,
    userFullName,
    attendanceDate,
    checkInAt: normalizeOptionalString(raw.checkInAt),
    checkOutAt: normalizeOptionalString(raw.checkOutAt),
    checkInIp: normalizeOptionalString(raw.checkInIp),
    checkOutIp: normalizeOptionalString(raw.checkOutIp),
    checkInUserAgent: normalizeOptionalString(raw.checkInUserAgent),
    checkOutUserAgent: normalizeOptionalString(raw.checkOutUserAgent),
    checkInLat: checkInLat != null && Number.isFinite(checkInLat) ? checkInLat : null,
    checkInLng: checkInLng != null && Number.isFinite(checkInLng) ? checkInLng : null,
    checkInPhotoUrl: normalizeOptionalString(raw.checkInPhotoUrl),
    checkOutLat: checkOutLat != null && Number.isFinite(checkOutLat) ? checkOutLat : null,
    checkOutLng: checkOutLng != null && Number.isFinite(checkOutLng) ? checkOutLng : null,
    checkOutPhotoUrl: normalizeOptionalString(raw.checkOutPhotoUrl),
    note: normalizeOptionalString(raw.note),
    workMinutes:
      workMinutes != null && Number.isFinite(workMinutes) && workMinutes >= 0
        ? Math.floor(workMinutes)
        : null,
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function normalizeDashboardStatusCount(value: unknown): InternalDashboardStatusCount | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const raw = value as Record<string, unknown>;
  const status = normalizeString(raw.status).toLowerCase();
  const count = Number(raw.count);
  if (!status || !Number.isFinite(count) || count < 0) {
    return null;
  }
  return {
    status,
    count: Math.floor(count),
  };
}

function normalizeDashboardQcReport(value: unknown): InternalDashboardQcReport | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const orderNo = normalizeString(raw.orderNo).toUpperCase();
  const title = normalizeString(raw.title);
  const severity = normalizeString(raw.severity).toLowerCase();
  const state = normalizeString(raw.state).toLowerCase();
  if (!Number.isInteger(id) || id <= 0 || !orderNo || !title || !severity || !state) {
    return null;
  }
  return {
    id,
    orderNo,
    title,
    severity,
    state,
    observedAt: normalizeOptionalString(raw.observedAt),
    factoryName: normalizeOptionalString(raw.factoryName),
    customerName: normalizeString(raw.customerName),
  };
}

function normalizeDashboardDeliveryItem(value: unknown): InternalDashboardDeliveryItem | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const raw = value as Record<string, unknown>;
  const orderId = Number(raw.orderId);
  const orderNo = normalizeString(raw.orderNo).toUpperCase();
  const dueDate = normalizeString(raw.dueDate);
  const status = normalizeString(raw.status).toLowerCase();
  const customerName = normalizeString(raw.customerName);
  if (
    !Number.isInteger(orderId) ||
    orderId <= 0 ||
    !orderNo ||
    !dueDate ||
    !status ||
    !customerName
  ) {
    return null;
  }
  return {
    orderId,
    orderNo,
    dueDate,
    status,
    customerName,
    factoryName: normalizeOptionalString(raw.factoryName),
  };
}

function normalizeDashboardNotification(
  value: unknown,
): InternalDashboardNotification | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const raw = value as Record<string, unknown>;
  const level = normalizeString(raw.level).toLowerCase();
  const message = normalizeString(raw.message);
  if (!['info', 'warning', 'success'].includes(level) || !message) {
    return null;
  }
  return {
    level: level as InternalDashboardNotification['level'],
    message,
  };
}

function normalizeInternalDashboardSummary(value: unknown): InternalDashboardSummary | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const raw = value as Record<string, unknown>;
  const runningOrders = Number(raw.runningOrders);
  if (!Number.isFinite(runningOrders) || runningOrders < 0) {
    return null;
  }
  const productionProgress = Array.isArray(raw.productionProgress)
    ? raw.productionProgress
        .map((item) => normalizeDashboardStatusCount(item))
        .filter((item): item is InternalDashboardStatusCount => Boolean(item))
    : [];
  const latestQcReports = Array.isArray(raw.latestQcReports)
    ? raw.latestQcReports
        .map((item) => normalizeDashboardQcReport(item))
        .filter((item): item is InternalDashboardQcReport => Boolean(item))
    : [];
  const deliverySchedule = Array.isArray(raw.deliverySchedule)
    ? raw.deliverySchedule
        .map((item) => normalizeDashboardDeliveryItem(item))
        .filter((item): item is InternalDashboardDeliveryItem => Boolean(item))
    : [];
  const notifications = Array.isArray(raw.notifications)
    ? raw.notifications
        .map((item) => normalizeDashboardNotification(item))
        .filter((item): item is InternalDashboardNotification => Boolean(item))
    : [];

  return {
    runningOrders: Math.floor(runningOrders),
    productionProgress,
    latestQcReports,
    deliverySchedule,
    notifications,
  };
}

function normalizeInternalOrderLogistics(value: unknown): InternalOrderLogistics | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const orderId = Number(raw.orderId);
  const orderNo = normalizeString(raw.orderNo).toUpperCase();
  const saleOwnerUserId =
    raw.saleOwnerUserId == null ? null : Number(raw.saleOwnerUserId);
  const customer = normalizeOrderCustomerRef(raw.customer);
  const factory = raw.factory == null ? null : normalizeOrderFactoryRef(raw.factory);
  const updatedBy = raw.updatedBy == null ? null : Number(raw.updatedBy);
  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !Number.isInteger(orderId) ||
    orderId <= 0 ||
    !orderNo ||
    !customer ||
    (raw.factory != null && !factory) ||
    (saleOwnerUserId !== null &&
      (!Number.isInteger(saleOwnerUserId) || saleOwnerUserId <= 0)) ||
    (updatedBy !== null && (!Number.isInteger(updatedBy) || updatedBy <= 0))
  ) {
    return null;
  }

  return {
    id,
    orderId,
    orderNo,
    saleOwnerUserId,
    customer,
    factory,
    etd: normalizeOptionalString(raw.etd),
    eta: normalizeOptionalString(raw.eta),
    containerNo: normalizeOptionalString(raw.containerNo),
    departurePort: normalizeOptionalString(raw.departurePort),
    arrivalPort: normalizeOptionalString(raw.arrivalPort),
    shippingLine: normalizeOptionalString(raw.shippingLine),
    vesselName: normalizeOptionalString(raw.vesselName),
    note: normalizeOptionalString(raw.note),
    updatedBy,
    updatedByName: normalizeOptionalString(raw.updatedByName),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

function isWorkLogVisibility(value: string): value is InternalWorkLogVisibility {
  return value === 'internal' || value === 'trader' || value === 'buyer';
}

function normalizeInternalOrderWorkLog(value: unknown): InternalOrderWorkLog | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }
  const raw = value as Record<string, unknown>;
  const id = Number(raw.id);
  const orderId = Number(raw.orderId);
  const orderNo = normalizeString(raw.orderNo).toUpperCase();
  const saleOwnerUserId =
    raw.saleOwnerUserId == null ? null : Number(raw.saleOwnerUserId);
  const customer = normalizeOrderCustomerRef(raw.customer);
  const factory = raw.factory == null ? null : normalizeOrderFactoryRef(raw.factory);
  const visibility = normalizeString(raw.visibility).toLowerCase();
  const noteType = normalizeString(raw.noteType).toLowerCase();
  const message = normalizeString(raw.message);
  const createdBy = raw.createdBy == null ? null : Number(raw.createdBy);
  const updatedBy = raw.updatedBy == null ? null : Number(raw.updatedBy);
  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !Number.isInteger(orderId) ||
    orderId <= 0 ||
    !orderNo ||
    !customer ||
    (raw.factory != null && !factory) ||
    !isWorkLogVisibility(visibility) ||
    !noteType ||
    !message ||
    (saleOwnerUserId !== null &&
      (!Number.isInteger(saleOwnerUserId) || saleOwnerUserId <= 0)) ||
    (createdBy !== null && (!Number.isInteger(createdBy) || createdBy <= 0)) ||
    (updatedBy !== null && (!Number.isInteger(updatedBy) || updatedBy <= 0))
  ) {
    return null;
  }

  return {
    id,
    orderId,
    orderNo,
    saleOwnerUserId,
    customer,
    factory,
    visibility,
    noteType,
    message,
    createdBy,
    updatedBy,
    createdByName: normalizeOptionalString(raw.createdByName),
    updatedByName: normalizeOptionalString(raw.updatedByName),
    createdAt: normalizeString(raw.createdAt),
    updatedAt: normalizeString(raw.updatedAt),
  };
}

async function requestInternal<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${INTERNAL_API_BASE}${path}`, {
    ...init,
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return (await response.json()) as T;
}

interface LoginResponse {
  ok: boolean;
  user: unknown;
}

export async function loginInternal(input: {
  email: string;
  password: string;
}): Promise<AuthUser> {
  const payload = await requestInternal<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const user = normalizeAuthUser(payload.user);
  if (!payload.ok || !user) {
    throw new Error('Không thể xác thực tài khoản.');
  }
  return user;
}

export async function logoutInternal(): Promise<void> {
  await requestInternal<{ ok: boolean }>('/auth/logout', {
    method: 'POST',
  });
}

interface MeResponse {
  ok: boolean;
  user: unknown | null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const response = await fetch(`${INTERNAL_API_BASE}/auth/me`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  const payload = (await response.json()) as MeResponse;
  if (!payload.ok || !payload.user) {
    return null;
  }

  return normalizeAuthUser(payload.user);
}

interface ListUsersResponse {
  ok: boolean;
  users: unknown[];
}

export async function listInternalUsers(): Promise<UserProfile[]> {
  const payload = await requestInternal<ListUsersResponse>('/users');
  if (!payload.ok || !Array.isArray(payload.users)) {
    return [];
  }

  return payload.users
    .map((user) => normalizeUserProfile(user))
    .filter((item): item is UserProfile => Boolean(item));
}

interface SaveUserPayload {
  email?: string;
  fullName?: string;
  password?: string;
  isActive?: boolean;
  roles?: AppRole[];
  scopes?: ActorScope[];
}

interface SaveUserResponse {
  ok: boolean;
  user: unknown;
}

export async function createInternalUser(payload: SaveUserPayload): Promise<UserProfile> {
  const data = await requestInternal<SaveUserResponse>('/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const user = normalizeUserProfile(data.user);
  if (!data.ok || !user) {
    throw new Error('Không thể tạo tài khoản.');
  }

  return user;
}

export async function updateInternalUser(
  userId: number,
  payload: SaveUserPayload,
): Promise<UserProfile> {
  const data = await requestInternal<SaveUserResponse>(`/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const user = normalizeUserProfile(data.user);
  if (!data.ok || !user) {
    throw new Error('Không thể cập nhật tài khoản.');
  }

  return user;
}

interface DeleteUserResponse {
  ok: boolean;
}

export async function deleteInternalUser(userId: number): Promise<void> {
  const payload = await requestInternal<DeleteUserResponse>(`/users/${userId}`, {
    method: 'DELETE',
  });

  if (!payload.ok) {
    throw new Error('Không thể xóa tài khoản.');
  }
}

interface ListCustomersResponse {
  ok: boolean;
  customers: unknown[];
}

interface SaveCustomerPayload {
  code?: string;
  name?: string;
  countryCode?: string | null;
}

interface SaveCustomerResponse {
  ok: boolean;
  customer: unknown;
}

export async function listInternalCustomers(perPage = 100): Promise<InternalCustomer[]> {
  const payload = await requestInternal<ListCustomersResponse>(
    `/customers?per_page=${encodeURIComponent(String(perPage))}`,
  );
  if (!payload.ok || !Array.isArray(payload.customers)) {
    return [];
  }

  return payload.customers
    .map((item) => normalizeInternalCustomer(item))
    .filter((item): item is InternalCustomer => Boolean(item));
}

export async function createInternalCustomer(
  payload: SaveCustomerPayload,
): Promise<InternalCustomer> {
  const data = await requestInternal<SaveCustomerResponse>('/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const customer = normalizeInternalCustomer(data.customer);
  if (!data.ok || !customer) {
    throw new Error('Không thể tạo khách hàng.');
  }

  return customer;
}

export async function updateInternalCustomer(
  customerId: number,
  payload: SaveCustomerPayload,
): Promise<InternalCustomer> {
  const data = await requestInternal<SaveCustomerResponse>(`/customers/${customerId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const customer = normalizeInternalCustomer(data.customer);
  if (!data.ok || !customer) {
    throw new Error('Không thể cập nhật khách hàng.');
  }

  return customer;
}

interface ListFactoriesResponse {
  ok: boolean;
  factories: unknown[];
}

interface SaveFactoryPayload {
  code?: string;
  name?: string;
  location?: string | null;
}

interface SaveFactoryResponse {
  ok: boolean;
  factory: unknown;
}

export async function listInternalFactories(perPage = 100): Promise<InternalFactory[]> {
  const payload = await requestInternal<ListFactoriesResponse>(
    `/factories?per_page=${encodeURIComponent(String(perPage))}`,
  );
  if (!payload.ok || !Array.isArray(payload.factories)) {
    return [];
  }

  return payload.factories
    .map((item) => normalizeInternalFactory(item))
    .filter((item): item is InternalFactory => Boolean(item));
}

export async function createInternalFactory(
  payload: SaveFactoryPayload,
): Promise<InternalFactory> {
  const data = await requestInternal<SaveFactoryResponse>('/factories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const factory = normalizeInternalFactory(data.factory);
  if (!data.ok || !factory) {
    throw new Error('Không thể tạo nhà máy.');
  }

  return factory;
}

export async function updateInternalFactory(
  factoryId: number,
  payload: SaveFactoryPayload,
): Promise<InternalFactory> {
  const data = await requestInternal<SaveFactoryResponse>(`/factories/${factoryId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const factory = normalizeInternalFactory(data.factory);
  if (!data.ok || !factory) {
    throw new Error('Không thể cập nhật nhà máy.');
  }

  return factory;
}

interface ListRecruitmentJobsResponse {
  ok: boolean;
  jobs: unknown[];
}

interface ListRecruitmentApplicationsResponse {
  ok: boolean;
  applications: unknown[];
}

export interface SaveRecruitmentJobPayload {
  groupCode?: string;
  groupTitle?: string;
  groupBody?: string | null;
  marketName?: string;
  marketStatus?: InternalRecruitmentStatus;
  title?: string;
  summary?: string;
  description?: string | null;
  requirements?: string[];
  benefits?: string[];
  location?: string | null;
  workType?: string | null;
  status?: InternalRecruitmentStatus;
  sortOrder?: number;
  isPublic?: boolean;
}

interface SaveRecruitmentJobResponse {
  ok: boolean;
  job: unknown;
}

export async function listInternalRecruitmentJobs(perPage = 200): Promise<InternalRecruitmentJob[]> {
  const payload = await requestInternal<ListRecruitmentJobsResponse>(
    `/recruitment/jobs?per_page=${encodeURIComponent(String(perPage))}`,
  );
  if (!payload.ok || !Array.isArray(payload.jobs)) {
    return [];
  }

  return payload.jobs
    .map((item) => normalizeInternalRecruitmentJob(item))
    .filter((item): item is InternalRecruitmentJob => Boolean(item));
}

export async function createInternalRecruitmentJob(
  payload: SaveRecruitmentJobPayload,
): Promise<InternalRecruitmentJob> {
  const data = await requestInternal<SaveRecruitmentJobResponse>('/recruitment/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const job = normalizeInternalRecruitmentJob(data.job);
  if (!data.ok || !job) {
    throw new Error('Không thể tạo vị trí tuyển dụng.');
  }

  return job;
}

export async function updateInternalRecruitmentJob(
  jobId: number,
  payload: SaveRecruitmentJobPayload,
): Promise<InternalRecruitmentJob> {
  const data = await requestInternal<SaveRecruitmentJobResponse>(`/recruitment/jobs/${jobId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const job = normalizeInternalRecruitmentJob(data.job);
  if (!data.ok || !job) {
    throw new Error('Không thể cập nhật vị trí tuyển dụng.');
  }

  return job;
}

export async function listInternalRecruitmentApplications(
  perPage = 100,
): Promise<InternalRecruitmentApplication[]> {
  const payload = await requestInternal<ListRecruitmentApplicationsResponse>(
    `/recruitment/applications?per_page=${encodeURIComponent(String(perPage))}`,
  );
  if (!payload.ok || !Array.isArray(payload.applications)) {
    return [];
  }

  return payload.applications
    .map((item) => normalizeInternalRecruitmentApplication(item))
    .filter((item): item is InternalRecruitmentApplication => Boolean(item));
}

interface ListOrdersResponse {
  ok: boolean;
  orders: unknown[];
}

interface SaveOrderPayload {
  orderNo?: string;
  customerId?: number;
  customerCode?: string;
  factoryId?: number | null;
  factoryCode?: string | null;
  saleOwnerUserId?: number | null;
  status?: InternalOrderStatus;
  dueDate?: string | null;
  metadata?: Record<string, unknown> | null;
  assignments?: InternalOrderAssignment[];
}

interface SaveOrderResponse {
  ok: boolean;
  order: unknown;
}

interface GetOrderResponse {
  ok: boolean;
  order: unknown;
}

interface ListOrdersParams {
  perPage?: number;
  status?: string;
  customerCode?: string;
  factoryCode?: string;
  orderNo?: string;
}

function encodeOrderParams(params: ListOrdersParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.status?.trim()) {
    searchParams.set('status', params.status.trim());
  }
  if (params.customerCode?.trim()) {
    searchParams.set('customer_code', params.customerCode.trim());
  }
  if (params.factoryCode?.trim()) {
    searchParams.set('factory_code', params.factoryCode.trim());
  }
  if (params.orderNo?.trim()) {
    searchParams.set('order_no', params.orderNo.trim());
  }

  return searchParams.toString();
}

export async function listInternalOrders(params: ListOrdersParams = {}): Promise<InternalOrder[]> {
  const query = encodeOrderParams(params);
  const payload = await requestInternal<ListOrdersResponse>(`/orders?${query}`);
  if (!payload.ok || !Array.isArray(payload.orders)) {
    return [];
  }

  return payload.orders
    .map((item) => normalizeInternalOrder(item))
    .filter((item): item is InternalOrder => Boolean(item));
}

export async function createInternalOrder(payload: SaveOrderPayload): Promise<InternalOrder> {
  const data = await requestInternal<SaveOrderResponse>('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const order = normalizeInternalOrder(data.order);
  if (!data.ok || !order) {
    throw new Error('Không thể tạo đơn hàng.');
  }

  return order;
}

export async function getInternalOrderById(orderId: number): Promise<InternalOrder> {
  const payload = await requestInternal<GetOrderResponse>(`/orders/${orderId}`);
  const order = normalizeInternalOrder(payload.order);
  if (!payload.ok || !order) {
    throw new Error('Không thể tải chi tiết đơn hàng.');
  }

  return order;
}

export async function updateInternalOrder(
  orderId: number,
  payload: SaveOrderPayload,
): Promise<InternalOrder> {
  const data = await requestInternal<SaveOrderResponse>(`/orders/${orderId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const order = normalizeInternalOrder(data.order);
  if (!data.ok || !order) {
    throw new Error('Không thể cập nhật đơn hàng.');
  }

  return order;
}

function encodeOrderLogisticsParams(params: ListOrderLogisticsParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.orderNo?.trim()) {
    searchParams.set('order_no', params.orderNo.trim());
  }
  if (params.customerCode?.trim()) {
    searchParams.set('customer_code', params.customerCode.trim());
  }
  if (params.factoryCode?.trim()) {
    searchParams.set('factory_code', params.factoryCode.trim());
  }
  return searchParams.toString();
}

function encodeOrderWorkLogParams(params: ListOrderWorkLogsParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.orderNo?.trim()) {
    searchParams.set('order_no', params.orderNo.trim());
  }
  if (params.visibility?.trim()) {
    searchParams.set('visibility', params.visibility.trim());
  }
  return searchParams.toString();
}

export async function getInternalDashboardSummary(): Promise<InternalDashboardSummary> {
  const payload = await requestInternal<GetDashboardSummaryResponse>('/dashboard');
  const summary = normalizeInternalDashboardSummary(payload.summary);
  if (!payload.ok || !summary) {
    throw new Error('Không thể tải dashboard.');
  }
  return summary;
}

export async function listInternalOrderLogistics(
  params: ListOrderLogisticsParams = {},
): Promise<InternalOrderLogistics[]> {
  const query = encodeOrderLogisticsParams(params);
  const payload = await requestInternal<ListOrderLogisticsResponse>(
    `/order-logistics?${query}`,
  );
  if (!payload.ok || !Array.isArray(payload.items)) {
    return [];
  }
  return payload.items
    .map((item) => normalizeInternalOrderLogistics(item))
    .filter((item): item is InternalOrderLogistics => Boolean(item));
}

export async function upsertInternalOrderLogistics(
  payload: SaveOrderLogisticsPayload,
): Promise<InternalOrderLogistics> {
  const data = await requestInternal<SaveOrderLogisticsResponse>('/order-logistics', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const item = normalizeInternalOrderLogistics(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể cập nhật logistics.');
  }
  return item;
}

export async function updateInternalOrderLogistics(
  logisticsId: number,
  payload: Omit<SaveOrderLogisticsPayload, 'orderId'>,
): Promise<InternalOrderLogistics> {
  const data = await requestInternal<SaveOrderLogisticsResponse>(
    `/order-logistics/${logisticsId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
  const item = normalizeInternalOrderLogistics(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể cập nhật logistics.');
  }
  return item;
}

export async function listInternalOrderWorkLogs(
  params: ListOrderWorkLogsParams = {},
): Promise<InternalOrderWorkLog[]> {
  const query = encodeOrderWorkLogParams(params);
  const payload = await requestInternal<ListOrderWorkLogsResponse>(
    `/order-work-logs?${query}`,
  );
  if (!payload.ok || !Array.isArray(payload.items)) {
    return [];
  }
  return payload.items
    .map((item) => normalizeInternalOrderWorkLog(item))
    .filter((item): item is InternalOrderWorkLog => Boolean(item));
}

export async function createInternalOrderWorkLog(
  payload: SaveOrderWorkLogPayload,
): Promise<InternalOrderWorkLog> {
  const data = await requestInternal<SaveOrderWorkLogResponse>('/order-work-logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const item = normalizeInternalOrderWorkLog(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể tạo nhật ký làm việc.');
  }
  return item;
}

export async function updateInternalOrderWorkLog(
  logId: number,
  payload: Omit<SaveOrderWorkLogPayload, 'orderId'>,
): Promise<InternalOrderWorkLog> {
  const data = await requestInternal<SaveOrderWorkLogResponse>(
    `/order-work-logs/${logId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
  const item = normalizeInternalOrderWorkLog(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể cập nhật nhật ký làm việc.');
  }
  return item;
}

interface ListOrderDataItemsResponse {
  ok: boolean;
  items: unknown[];
}

interface SaveOrderDataItemPayload {
  orderId?: number;
  dataType?: string;
  title?: string;
  storageKey?: string | null;
  metadata?: Record<string, unknown> | null;
  state?: InternalOrderStatus;
}

interface SaveOrderDataItemResponse {
  ok: boolean;
  item: unknown;
}

interface ListQcItemsResponse {
  ok: boolean;
  items: unknown[];
}

interface SaveQcItemPayload {
  orderId?: number;
  title?: string;
  findingType?: string;
  severity?: string;
  reportNo?: string | null;
  observedAt?: string | null;
  metadata?: Record<string, unknown> | null;
  state?: InternalOrderStatus;
}

interface SaveQcItemResponse {
  ok: boolean;
  item: unknown;
}

interface ListQcItemsParams {
  perPage?: number;
  orderNo?: string;
  state?: string;
  severity?: string;
}

interface ListCapaItemsResponse {
  ok: boolean;
  items: unknown[];
}

interface SaveCapaItemPayload {
  orderId?: number;
  qcItemId?: number | null;
  title?: string;
  rootCause?: string | null;
  correctiveAction?: string | null;
  preventiveAction?: string | null;
  ownerUserId?: number | null;
  dueDate?: string | null;
  metadata?: Record<string, unknown> | null;
  state?: InternalOrderStatus;
}

interface SaveCapaItemResponse {
  ok: boolean;
  item: unknown;
}

interface ListCapaItemsParams {
  perPage?: number;
  orderNo?: string;
  state?: string;
  ownerUserId?: number;
}

interface ListFactorySurveysResponse {
  ok: boolean;
  items: unknown[];
}

interface SaveFactorySurveyPayload {
  factoryId?: number;
  surveyCode?: string;
  title?: string;
  surveyDate?: string | null;
  score?: number | null;
  summary?: string | null;
  metadata?: Record<string, unknown> | null;
  state?: InternalOrderStatus;
}

interface SaveFactorySurveyResponse {
  ok: boolean;
  item: unknown;
}

interface ListFactorySurveysParams {
  perPage?: number;
  factoryCode?: string;
  surveyCode?: string;
  state?: string;
}

interface ListSupplierMaterialsResponse {
  ok: boolean;
  items: unknown[];
}

interface SaveSupplierMaterialPayload {
  supplierCode?: string;
  supplierName?: string;
  materialCode?: string;
  materialName?: string;
  certificateUrl?: string | null;
  quoteUrl?: string | null;
  metadata?: Record<string, unknown> | null;
  state?: InternalOrderStatus;
}

interface SaveSupplierMaterialResponse {
  ok: boolean;
  item: unknown;
}

interface ListSupplierMaterialsParams {
  perPage?: number;
  supplierCode?: string;
  materialCode?: string;
  state?: string;
}

interface ListDataShareLinksResponse {
  ok: boolean;
  links: unknown[];
}

interface SaveDataShareLinkResponse {
  ok: boolean;
  link: unknown;
}

interface RevokeDataShareLinkResponse {
  ok: boolean;
  revokedLinkId?: number;
}

interface ListAuditLogsResponse {
  ok: boolean;
  logs: unknown[];
}

interface ListAttendanceResponse {
  ok: boolean;
  logs: unknown[];
  todayDate?: string;
  todayLog?: unknown | null;
  canManage?: boolean;
}

interface SaveAttendanceResponse {
  ok: boolean;
  log: unknown;
}

interface GetDashboardSummaryResponse {
  ok: boolean;
  summary: unknown;
}

interface ListOrderLogisticsResponse {
  ok: boolean;
  items: unknown[];
}

interface SaveOrderLogisticsPayload {
  orderId?: number;
  etd?: string | null;
  eta?: string | null;
  containerNo?: string | null;
  departurePort?: string | null;
  arrivalPort?: string | null;
  shippingLine?: string | null;
  vesselName?: string | null;
  note?: string | null;
}

interface SaveOrderLogisticsResponse {
  ok: boolean;
  item: unknown;
}

interface ListOrderLogisticsParams {
  perPage?: number;
  orderNo?: string;
  customerCode?: string;
  factoryCode?: string;
}

interface ListOrderWorkLogsResponse {
  ok: boolean;
  items: unknown[];
}

interface SaveOrderWorkLogPayload {
  orderId?: number;
  visibility?: InternalWorkLogVisibility;
  noteType?: string;
  message?: string;
}

interface SaveOrderWorkLogResponse {
  ok: boolean;
  item: unknown;
}

interface ListOrderWorkLogsParams {
  perPage?: number;
  orderNo?: string;
  visibility?: InternalWorkLogVisibility;
}

interface ListOrderDataItemsParams {
  perPage?: number;
  orderNo?: string;
  state?: string;
  dataType?: string;
}

export interface ListAttendanceParams {
  perPage?: number;
  userId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface InternalAttendanceListResult {
  logs: InternalAttendanceLog[];
  todayDate: string;
  todayLog: InternalAttendanceLog | null;
  canManage: boolean;
}

function encodeOrderDataItemParams(params: ListOrderDataItemsParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.orderNo?.trim()) {
    searchParams.set('order_no', params.orderNo.trim());
  }
  if (params.state?.trim()) {
    searchParams.set('state', params.state.trim());
  }
  if (params.dataType?.trim()) {
    searchParams.set('data_type', params.dataType.trim());
  }

  return searchParams.toString();
}

function encodeQcItemParams(params: ListQcItemsParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.orderNo?.trim()) {
    searchParams.set('order_no', params.orderNo.trim());
  }
  if (params.state?.trim()) {
    searchParams.set('state', params.state.trim());
  }
  if (params.severity?.trim()) {
    searchParams.set('severity', params.severity.trim());
  }
  return searchParams.toString();
}

function encodeCapaItemParams(params: ListCapaItemsParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.orderNo?.trim()) {
    searchParams.set('order_no', params.orderNo.trim());
  }
  if (params.state?.trim()) {
    searchParams.set('state', params.state.trim());
  }
  if (Number.isInteger(params.ownerUserId) && Number(params.ownerUserId) > 0) {
    searchParams.set('owner_user_id', String(params.ownerUserId));
  }
  return searchParams.toString();
}

function encodeFactorySurveyParams(params: ListFactorySurveysParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.factoryCode?.trim()) {
    searchParams.set('factory_code', params.factoryCode.trim());
  }
  if (params.surveyCode?.trim()) {
    searchParams.set('survey_code', params.surveyCode.trim());
  }
  if (params.state?.trim()) {
    searchParams.set('state', params.state.trim());
  }
  return searchParams.toString();
}

function encodeSupplierMaterialParams(params: ListSupplierMaterialsParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.supplierCode?.trim()) {
    searchParams.set('supplier_code', params.supplierCode.trim());
  }
  if (params.materialCode?.trim()) {
    searchParams.set('material_code', params.materialCode.trim());
  }
  if (params.state?.trim()) {
    searchParams.set('state', params.state.trim());
  }
  return searchParams.toString();
}

export async function listInternalOrderDataItems(
  params: ListOrderDataItemsParams = {},
): Promise<InternalOrderDataItem[]> {
  const query = encodeOrderDataItemParams(params);
  const payload = await requestInternal<ListOrderDataItemsResponse>(`/order-data-items?${query}`);
  if (!payload.ok || !Array.isArray(payload.items)) {
    return [];
  }

  return payload.items
    .map((item) => normalizeInternalOrderDataItem(item))
    .filter((item): item is InternalOrderDataItem => Boolean(item));
}

export async function createInternalOrderDataItem(
  payload: SaveOrderDataItemPayload,
): Promise<InternalOrderDataItem> {
  const data = await requestInternal<SaveOrderDataItemResponse>('/order-data-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const item = normalizeInternalOrderDataItem(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể tạo dữ liệu upload.');
  }

  return item;
}

export async function getInternalOrderDataItemById(itemId: number): Promise<InternalOrderDataItem> {
  const payload = await requestInternal<SaveOrderDataItemResponse>(`/order-data-items/${itemId}`);
  const item = normalizeInternalOrderDataItem(payload.item);
  if (!payload.ok || !item) {
    throw new Error('Không thể tải dữ liệu.');
  }

  return item;
}

export async function updateInternalOrderDataItem(
  itemId: number,
  payload: SaveOrderDataItemPayload,
): Promise<InternalOrderDataItem> {
  const data = await requestInternal<SaveOrderDataItemResponse>(`/order-data-items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const item = normalizeInternalOrderDataItem(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể cập nhật dữ liệu.');
  }

  return item;
}

export async function listInternalQcItems(
  params: ListQcItemsParams = {},
): Promise<InternalQcItem[]> {
  const query = encodeQcItemParams(params);
  const payload = await requestInternal<ListQcItemsResponse>(`/qc-items?${query}`);
  if (!payload.ok || !Array.isArray(payload.items)) {
    return [];
  }

  return payload.items
    .map((item) => normalizeInternalQcItem(item))
    .filter((item): item is InternalQcItem => Boolean(item));
}

export async function createInternalQcItem(
  payload: SaveQcItemPayload,
): Promise<InternalQcItem> {
  const data = await requestInternal<SaveQcItemResponse>('/qc-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const item = normalizeInternalQcItem(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể tạo QC item.');
  }

  return item;
}

export async function getInternalQcItemById(itemId: number): Promise<InternalQcItem> {
  const payload = await requestInternal<SaveQcItemResponse>(`/qc-items/${itemId}`);
  const item = normalizeInternalQcItem(payload.item);
  if (!payload.ok || !item) {
    throw new Error('Không thể tải QC item.');
  }

  return item;
}

export async function updateInternalQcItem(
  itemId: number,
  payload: SaveQcItemPayload,
): Promise<InternalQcItem> {
  const data = await requestInternal<SaveQcItemResponse>(`/qc-items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const item = normalizeInternalQcItem(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể cập nhật QC item.');
  }

  return item;
}

export async function listInternalCapaItems(
  params: ListCapaItemsParams = {},
): Promise<InternalCapaItem[]> {
  const query = encodeCapaItemParams(params);
  const payload = await requestInternal<ListCapaItemsResponse>(`/capa-items?${query}`);
  if (!payload.ok || !Array.isArray(payload.items)) {
    return [];
  }

  return payload.items
    .map((item) => normalizeInternalCapaItem(item))
    .filter((item): item is InternalCapaItem => Boolean(item));
}

export async function createInternalCapaItem(
  payload: SaveCapaItemPayload,
): Promise<InternalCapaItem> {
  const data = await requestInternal<SaveCapaItemResponse>('/capa-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const item = normalizeInternalCapaItem(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể tạo CAPA item.');
  }

  return item;
}

export async function getInternalCapaItemById(itemId: number): Promise<InternalCapaItem> {
  const payload = await requestInternal<SaveCapaItemResponse>(`/capa-items/${itemId}`);
  const item = normalizeInternalCapaItem(payload.item);
  if (!payload.ok || !item) {
    throw new Error('Không thể tải CAPA item.');
  }

  return item;
}

export async function updateInternalCapaItem(
  itemId: number,
  payload: SaveCapaItemPayload,
): Promise<InternalCapaItem> {
  const data = await requestInternal<SaveCapaItemResponse>(`/capa-items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const item = normalizeInternalCapaItem(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể cập nhật CAPA item.');
  }

  return item;
}

export async function listInternalFactorySurveys(
  params: ListFactorySurveysParams = {},
): Promise<InternalFactorySurvey[]> {
  const query = encodeFactorySurveyParams(params);
  const payload = await requestInternal<ListFactorySurveysResponse>(
    `/factory-surveys?${query}`,
  );
  if (!payload.ok || !Array.isArray(payload.items)) {
    return [];
  }

  return payload.items
    .map((item) => normalizeInternalFactorySurvey(item))
    .filter((item): item is InternalFactorySurvey => Boolean(item));
}

export async function createInternalFactorySurvey(
  payload: SaveFactorySurveyPayload,
): Promise<InternalFactorySurvey> {
  const data = await requestInternal<SaveFactorySurveyResponse>('/factory-surveys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const item = normalizeInternalFactorySurvey(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể tạo khảo sát nhà máy.');
  }

  return item;
}

export async function getInternalFactorySurveyById(
  itemId: number,
): Promise<InternalFactorySurvey> {
  const payload = await requestInternal<SaveFactorySurveyResponse>(
    `/factory-surveys/${itemId}`,
  );
  const item = normalizeInternalFactorySurvey(payload.item);
  if (!payload.ok || !item) {
    throw new Error('Không thể tải khảo sát nhà máy.');
  }

  return item;
}

export async function updateInternalFactorySurvey(
  itemId: number,
  payload: SaveFactorySurveyPayload,
): Promise<InternalFactorySurvey> {
  const data = await requestInternal<SaveFactorySurveyResponse>(
    `/factory-surveys/${itemId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  const item = normalizeInternalFactorySurvey(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể cập nhật khảo sát nhà máy.');
  }

  return item;
}

export async function listInternalSupplierMaterials(
  params: ListSupplierMaterialsParams = {},
): Promise<InternalSupplierMaterial[]> {
  const query = encodeSupplierMaterialParams(params);
  const payload = await requestInternal<ListSupplierMaterialsResponse>(
    `/supplier-materials?${query}`,
  );
  if (!payload.ok || !Array.isArray(payload.items)) {
    return [];
  }

  return payload.items
    .map((item) => normalizeInternalSupplierMaterial(item))
    .filter((item): item is InternalSupplierMaterial => Boolean(item));
}

export async function createInternalSupplierMaterial(
  payload: SaveSupplierMaterialPayload,
): Promise<InternalSupplierMaterial> {
  const data = await requestInternal<SaveSupplierMaterialResponse>('/supplier-materials', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const item = normalizeInternalSupplierMaterial(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể tạo dữ liệu nhà cung cấp.');
  }

  return item;
}

export async function getInternalSupplierMaterialById(
  itemId: number,
): Promise<InternalSupplierMaterial> {
  const payload = await requestInternal<SaveSupplierMaterialResponse>(
    `/supplier-materials/${itemId}`,
  );
  const item = normalizeInternalSupplierMaterial(payload.item);
  if (!payload.ok || !item) {
    throw new Error('Không thể tải dữ liệu nhà cung cấp.');
  }

  return item;
}

export async function updateInternalSupplierMaterial(
  itemId: number,
  payload: SaveSupplierMaterialPayload,
): Promise<InternalSupplierMaterial> {
  const data = await requestInternal<SaveSupplierMaterialResponse>(
    `/supplier-materials/${itemId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  const item = normalizeInternalSupplierMaterial(data.item);
  if (!data.ok || !item) {
    throw new Error('Không thể cập nhật dữ liệu nhà cung cấp.');
  }

  return item;
}

export async function listInternalDataShareLinks(
  itemId: number,
): Promise<InternalDataShareLink[]> {
  const payload = await requestInternal<ListDataShareLinksResponse>(
    `/order-data-items/${itemId}/share-links`,
  );
  if (!payload.ok || !Array.isArray(payload.links)) {
    return [];
  }

  return payload.links
    .map((item) => normalizeInternalDataShareLink(item))
    .filter((item): item is InternalDataShareLink => Boolean(item));
}

export async function createInternalDataShareLink(
  itemId: number,
  expiresInDays = 7,
): Promise<InternalDataShareLink> {
  const data = await requestInternal<SaveDataShareLinkResponse>(
    `/order-data-items/${itemId}/share-links`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expiresInDays }),
    },
  );

  const link = normalizeInternalDataShareLink(data.link);
  if (!data.ok || !link) {
    throw new Error('Không thể tạo link chia sẻ.');
  }

  return link;
}

export async function revokeInternalDataShareLink(
  itemId: number,
  linkId: number,
): Promise<void> {
  const payload = await requestInternal<RevokeDataShareLinkResponse>(
    `/order-data-items/${itemId}/share-links/${linkId}`,
    {
      method: 'DELETE',
    },
  );

  if (!payload.ok) {
    throw new Error('Không thể thu hồi link chia sẻ.');
  }
}

function encodeAttendanceParams(params: ListAttendanceParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (Number.isInteger(params.userId) && Number(params.userId) > 0) {
    searchParams.set('user_id', String(params.userId));
  }
  if (params.fromDate?.trim()) {
    searchParams.set('from_date', params.fromDate.trim());
  }
  if (params.toDate?.trim()) {
    searchParams.set('to_date', params.toDate.trim());
  }

  return searchParams.toString();
}

export async function listInternalAttendanceLogs(
  params: ListAttendanceParams = {},
): Promise<InternalAttendanceListResult> {
  const query = encodeAttendanceParams(params);
  const payload = await requestInternal<ListAttendanceResponse>(`/attendance?${query}`);

  const logs = Array.isArray(payload.logs)
    ? payload.logs
        .map((item) => normalizeInternalAttendanceLog(item))
        .filter((item): item is InternalAttendanceLog => Boolean(item))
    : [];
  const todayLog = normalizeInternalAttendanceLog(payload.todayLog ?? null);

  return {
    logs,
    todayDate: normalizeString(payload.todayDate),
    todayLog,
    canManage: Boolean(payload.canManage),
  };
}

interface AttendanceActionPayload {
  latitude?: number | null;
  longitude?: number | null;
  photoDataUrl?: string | null;
  note?: string | null;
}

export async function checkInInternalAttendance(
  payload: AttendanceActionPayload = {},
): Promise<InternalAttendanceLog> {
  const data = await requestInternal<SaveAttendanceResponse>('/attendance/check-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const log = normalizeInternalAttendanceLog(data.log);
  if (!data.ok || !log) {
    throw new Error('Không thể check-in.');
  }

  return log;
}

export async function checkOutInternalAttendance(
  payload: AttendanceActionPayload = {},
): Promise<InternalAttendanceLog> {
  const data = await requestInternal<SaveAttendanceResponse>('/attendance/check-out', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const log = normalizeInternalAttendanceLog(data.log);
  if (!data.ok || !log) {
    throw new Error('Không thể check-out.');
  }

  return log;
}

interface ListAuditLogsParams {
  perPage?: number;
  action?: string;
  resource?: string;
  resourceId?: string;
  actorUserId?: number;
}

function encodeAuditLogParams(params: ListAuditLogsParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set('per_page', String(params.perPage ?? 100));
  if (params.action?.trim()) {
    searchParams.set('action', params.action.trim());
  }
  if (params.resource?.trim()) {
    searchParams.set('resource', params.resource.trim());
  }
  if (params.resourceId?.trim()) {
    searchParams.set('resource_id', params.resourceId.trim());
  }
  if (Number.isInteger(params.actorUserId) && Number(params.actorUserId) > 0) {
    searchParams.set('actor_user_id', String(params.actorUserId));
  }

  return searchParams.toString();
}

export async function listInternalAuditLogs(
  params: ListAuditLogsParams = {},
): Promise<InternalAuditLog[]> {
  const query = encodeAuditLogParams(params);
  const payload = await requestInternal<ListAuditLogsResponse>(`/audit-logs?${query}`);
  if (!payload.ok || !Array.isArray(payload.logs)) {
    return [];
  }

  return payload.logs
    .map((log) => normalizeInternalAuditLog(log))
    .filter((log): log is InternalAuditLog => Boolean(log));
}

export function getInternalOrderDataDownloadUrl(itemId: number): string {
  return `${INTERNAL_API_BASE}/order-data-items/${itemId}/download`;
}

export function getInternalOrderDataExportUrl(itemId: number): string {
  return `${INTERNAL_API_BASE}/order-data-items/${itemId}/export`;
}

export function isAdminManager(user: AuthUser | null): boolean {
  if (!user) {
    return false;
  }

  return user.roles.includes('super_admin') || user.roles.includes('system_admin');
}

export function parseScopeInput(rawValue: string): ActorScope[] {
  const scopes = rawValue
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const separatorIndex = item.indexOf(':');
      if (separatorIndex <= 0 || separatorIndex >= item.length - 1) {
        return null;
      }

      const type = item.slice(0, separatorIndex).trim();
      const value = item.slice(separatorIndex + 1).trim();
      if (!isScopeType(type) || !value) {
        return null;
      }

      return { type, value } satisfies ActorScope;
    })
    .filter((item): item is ActorScope => Boolean(item));

  const unique = new Map<string, ActorScope>();
  for (const scope of scopes) {
    unique.set(`${scope.type}:${scope.value}`, scope);
  }

  return Array.from(unique.values());
}

export function formatScopes(scopes: ActorScope[]): string {
  return scopes.map((scope) => `${scope.type}:${scope.value}`).join(', ');
}
