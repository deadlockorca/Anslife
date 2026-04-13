import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  INTERNAL_ORDER_STATUS_OPTIONS,
  createInternalOrder,
  getCurrentUser,
  getInternalOrderById,
  isAdminManager,
  listInternalCustomers,
  listInternalFactories,
  listInternalOrders,
  listInternalUsers,
  logoutInternal,
  updateInternalOrder,
  type AppRole,
  type AuthUser,
  type InternalCustomer,
  type InternalFactory,
  type InternalOrder,
  type InternalOrderAssignment,
  type InternalOrderStatus,
  type UserProfile,
} from '../lib/internalAuth';

interface OrderFilters {
  orderNo: string;
  status: string;
  customerCode: string;
  factoryCode: string;
}

interface AssignmentRowState {
  userId: string;
  assignmentRole: string;
}

interface OrderFormState {
  orderId: number | null;
  orderNo: string;
  customerId: string;
  factoryId: string;
  dueDate: string;
  status: InternalOrderStatus;
  saleOwnerUserId: string;
  metadataInput: string;
  assignments: AssignmentRowState[];
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFilters: OrderFilters = {
  orderNo: '',
  status: '',
  customerCode: '',
  factoryCode: '',
};

const defaultOrderFormState: OrderFormState = {
  orderId: null,
  orderNo: '',
  customerId: '',
  factoryId: '',
  dueDate: '',
  status: 'draft',
  saleOwnerUserId: '',
  metadataInput: '',
  assignments: [],
};

const idleState: FormState = { status: 'idle', message: '' };

const ORDER_STATUS_MANAGE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'sale_trading',
];

const ORDER_STATUS_TRANSITION_RULES: Array<{
  from: InternalOrderStatus;
  to: InternalOrderStatus;
  allowedRoles: AppRole[];
}> = [
  {
    from: 'draft',
    to: 'pending_review',
    allowedRoles: ['data_controller', 'sale_trading', 'system_admin', 'super_admin'],
  },
  {
    from: 'pending_review',
    to: 'draft',
    allowedRoles: ['data_controller', 'sale_trading', 'system_admin', 'super_admin'],
  },
  {
    from: 'pending_review',
    to: 'approved_internal',
    allowedRoles: ['data_controller', 'sale_trading', 'system_admin', 'super_admin'],
  },
  {
    from: 'approved_internal',
    to: 'approved_sales',
    allowedRoles: ['data_controller', 'sale_trading', 'system_admin', 'super_admin'],
  },
  {
    from: 'approved_sales',
    to: 'approved_buyer',
    allowedRoles: ['system_admin', 'super_admin'],
  },
  {
    from: 'draft',
    to: 'archived',
    allowedRoles: ['system_admin', 'super_admin'],
  },
  {
    from: 'pending_review',
    to: 'archived',
    allowedRoles: ['system_admin', 'super_admin'],
  },
  {
    from: 'approved_internal',
    to: 'archived',
    allowedRoles: ['system_admin', 'super_admin'],
  },
  {
    from: 'approved_sales',
    to: 'archived',
    allowedRoles: ['system_admin', 'super_admin'],
  },
  {
    from: 'approved_buyer',
    to: 'archived',
    allowedRoles: ['system_admin', 'super_admin'],
  },
];

function canRoleTransitionOrderStatus(
  roles: AppRole[],
  from: InternalOrderStatus,
  to: InternalOrderStatus,
): boolean {
  if (from === to) {
    return true;
  }

  if (roles.includes('super_admin')) {
    return true;
  }

  return ORDER_STATUS_TRANSITION_RULES.some(
    (rule) =>
      rule.from === from &&
      rule.to === to &&
      rule.allowedRoles.some((role) => roles.includes(role)),
  );
}

function getAllowedOrderStatusOptions(
  roles: AppRole[],
  from: InternalOrderStatus,
): ReadonlyArray<(typeof INTERNAL_ORDER_STATUS_OPTIONS)[number]> {
  if (roles.includes('super_admin')) {
    return INTERNAL_ORDER_STATUS_OPTIONS;
  }

  const allowedStatuses = new Set<InternalOrderStatus>([from]);
  for (const rule of ORDER_STATUS_TRANSITION_RULES) {
    if (rule.from !== from) {
      continue;
    }

    if (rule.allowedRoles.some((role) => roles.includes(role))) {
      allowedStatuses.add(rule.to);
    }
  }

  return INTERNAL_ORDER_STATUS_OPTIONS.filter((option) =>
    allowedStatuses.has(option.code),
  );
}

function formatDate(value: string | null): string {
  if (!value) {
    return '-';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function parseMetadataInput(rawValue: string): {
  ok: boolean;
  value: Record<string, unknown> | null;
  message?: string;
} {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return { ok: true, value: null };
  }

  try {
    const parsed = JSON.parse(trimmed);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {
        ok: false,
        value: null,
        message: 'Metadata phải là JSON object.',
      };
    }

    return {
      ok: true,
      value: parsed as Record<string, unknown>,
    };
  } catch {
    return {
      ok: false,
      value: null,
      message: 'Metadata (JSON) không hợp lệ.',
    };
  }
}

function parseAssignmentRows(rows: AssignmentRowState[]): {
  ok: boolean;
  assignments: InternalOrderAssignment[];
  message?: string;
} {
  const assignments: InternalOrderAssignment[] = [];
  for (const row of rows) {
    const userIdRaw = row.userId.trim();
    const assignmentRole = row.assignmentRole.trim();
    if (!userIdRaw && !assignmentRole) {
      continue;
    }

    if (!userIdRaw || !assignmentRole) {
      return {
        ok: false,
        assignments: [],
        message: 'Mỗi phân công cần đủ userId và vai trò.',
      };
    }

    const userId = Number(userIdRaw);
    if (!Number.isInteger(userId) || userId <= 0) {
      return {
        ok: false,
        assignments: [],
        message: 'userId trong phân công không hợp lệ.',
      };
    }

    assignments.push({
      userId,
      assignmentRole,
    });
  }

  return {
    ok: true,
    assignments,
  };
}

function mapOrderToForm(order: InternalOrder): OrderFormState {
  return {
    orderId: order.id,
    orderNo: order.orderNo,
    customerId: String(order.customer.id),
    factoryId: order.factory ? String(order.factory.id) : '',
    dueDate: order.dueDate ?? '',
    status: order.status,
    saleOwnerUserId: order.saleOwnerUserId ? String(order.saleOwnerUserId) : '',
    metadataInput: order.metadata ? JSON.stringify(order.metadata, null, 2) : '',
    assignments: order.assignments.map((assignment) => ({
      userId: String(assignment.userId),
      assignmentRole: assignment.assignmentRole,
    })),
  };
}

function getOrderStatusLabel(status: string): string {
  const matched = INTERNAL_ORDER_STATUS_OPTIONS.find((item) => item.code === status);
  return matched?.label ?? status;
}

function getOrderStatusClass(status: string): string {
  return `is-order-${status.replace(/[^a-z0-9_-]/gi, '-')}`;
}

export default function AdminOrdersPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/orders')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [customers, setCustomers] = useState<InternalCustomer[]>([]);
  const [factories, setFactories] = useState<InternalFactory[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [orders, setOrders] = useState<InternalOrder[]>([]);
  const [filters, setFilters] = useState<OrderFilters>(defaultFilters);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [lookupsLoading, setLookupsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<OrderFormState>(defaultOrderFormState);
  const [formState, setFormState] = useState<FormState>(idleState);
  const [detailLoading, setDetailLoading] = useState(false);
  const [editingStatusFrom, setEditingStatusFrom] =
    useState<InternalOrderStatus | null>(null);

  const actorIsAdmin = useMemo(() => isAdminManager(actor), [actor]);
  const actorRoles = useMemo<AppRole[]>(() => actor?.roles ?? [], [actor]);
  const actorCanManageStatus = useMemo(
    () => actorRoles.some((role) => ORDER_STATUS_MANAGE_ROLES.includes(role)),
    [actorRoles],
  );
  const isEditing = form.orderId !== null;
  const canEditOrderStatus = actorCanManageStatus && isEditing;
  const availableOrderStatusOptions = useMemo(() => {
    if (!editingStatusFrom) {
      return INTERNAL_ORDER_STATUS_OPTIONS.filter((option) => option.code === 'draft');
    }

    return getAllowedOrderStatusOptions(actorRoles, editingStatusFrom);
  }, [actorRoles, editingStatusFrom]);

  const loadLookups = useCallback(
    async (includeUsers: boolean) => {
      setLookupsLoading(true);
      try {
        const [customerList, factoryList, userList] = await Promise.all([
          listInternalCustomers(200),
          listInternalFactories(200),
          includeUsers ? listInternalUsers() : Promise.resolve([] as UserProfile[]),
        ]);
        setCustomers(customerList);
        setFactories(factoryList);
        setUsers(userList);
      } finally {
        setLookupsLoading(false);
      }
    },
    [],
  );

  const loadOrders = useCallback(
    async (nextFilters: OrderFilters) => {
      setOrdersLoading(true);
      setError('');
      try {
        const orderList = await listInternalOrders({
          perPage: 200,
          orderNo: nextFilters.orderNo.trim() || undefined,
          status: nextFilters.status.trim() || undefined,
          customerCode: nextFilters.customerCode.trim() || undefined,
          factoryCode: nextFilters.factoryCode.trim() || undefined,
        });
        setOrders(orderList);
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : t('Không thể tải danh sách đơn hàng.');
        setError(message);
      } finally {
        setOrdersLoading(false);
      }
    },
    [t],
  );

  useEffect(() => {
    let isMounted = true;

    async function bootstrapPage() {
      try {
        const currentUser = await getCurrentUser();
        if (!isMounted) {
          return;
        }

        if (!currentUser) {
          navigate(loginPath, { replace: true });
          return;
        }

        setActor(currentUser);
        const includeUsers = isAdminManager(currentUser);
        await Promise.all([loadLookups(includeUsers), loadOrders(defaultFilters)]);
      } catch (bootstrapError) {
        if (!isMounted) {
          return;
        }

        const message =
          bootstrapError instanceof Error
            ? bootstrapError.message
            : t('Không thể kiểm tra quyền truy cập.');
        setError(message);
      } finally {
        if (isMounted) {
          setAuthChecking(false);
        }
      }
    }

    void bootstrapPage();
    return () => {
      isMounted = false;
    };
  }, [loadLookups, loadOrders, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function refreshPageData() {
    setFormState(idleState);
    setError('');
    try {
      await Promise.all([
        loadLookups(actorIsAdmin),
        loadOrders(filters),
      ]);
    } catch {
      // Errors already handled in called methods.
    }
  }

  async function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadOrders(filters);
  }

  async function handleResetFilters() {
    setFilters(defaultFilters);
    await loadOrders(defaultFilters);
  }

  async function startEditOrder(orderId: number) {
    setDetailLoading(true);
    setFormState(idleState);
    setEditingStatusFrom(null);
    try {
      const order = await getInternalOrderById(orderId);
      setEditingStatusFrom(order.status);
      setForm(mapOrderToForm(order));
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : t('Không thể tải chi tiết đơn hàng.');
      setFormState({ status: 'error', message });
    } finally {
      setDetailLoading(false);
    }
  }

  function startCreateOrder() {
    setForm(defaultOrderFormState);
    setFormState(idleState);
    setEditingStatusFrom(null);
  }

  function updateAssignmentRow(index: number, key: keyof AssignmentRowState, value: string) {
    setForm((previous) => {
      const nextAssignments = previous.assignments.map((row, rowIndex) =>
        rowIndex === index
          ? {
              ...row,
              [key]: value,
            }
          : row,
      );

      return {
        ...previous,
        assignments: nextAssignments,
      };
    });
  }

  function addAssignmentRow() {
    setForm((previous) => ({
      ...previous,
      assignments: [...previous.assignments, { userId: '', assignmentRole: '' }],
    }));
  }

  function removeAssignmentRow(index: number) {
    setForm((previous) => ({
      ...previous,
      assignments: previous.assignments.filter((_, rowIndex) => rowIndex !== index),
    }));
  }

  async function handleSubmitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const orderNo = form.orderNo.trim().toUpperCase();
    const customerId = Number(form.customerId);
    const factoryId = form.factoryId ? Number(form.factoryId) : null;
    const dueDate = form.dueDate.trim();
    const saleOwnerUserId = form.saleOwnerUserId ? Number(form.saleOwnerUserId) : null;

    if (!form.orderId && !/^[A-Z0-9._/-]{4,64}$/.test(orderNo)) {
      setFormState({
        status: 'error',
        message: t('Mã đơn hàng không hợp lệ.'),
      });
      return;
    }

    if (!Number.isInteger(customerId) || customerId <= 0) {
      setFormState({
        status: 'error',
        message: t('Vui lòng chọn khách hàng hợp lệ.'),
      });
      return;
    }

    if (factoryId !== null && (!Number.isInteger(factoryId) || factoryId <= 0)) {
      setFormState({
        status: 'error',
        message: t('Nhà máy không hợp lệ.'),
      });
      return;
    }

    if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      setFormState({
        status: 'error',
        message: t('Ngày giao phải theo định dạng YYYY-MM-DD.'),
      });
      return;
    }

    if (
      actorIsAdmin &&
      saleOwnerUserId !== null &&
      (!Number.isInteger(saleOwnerUserId) || saleOwnerUserId <= 0)
    ) {
      setFormState({
        status: 'error',
        message: t('ID phụ trách sale không hợp lệ.'),
      });
      return;
    }

    const metadataResult = parseMetadataInput(form.metadataInput);
    if (!metadataResult.ok) {
      setFormState({
        status: 'error',
        message: t(metadataResult.message ?? 'Metadata (JSON) không hợp lệ.'),
      });
      return;
    }

    const assignmentResult = parseAssignmentRows(form.assignments);
    if (!assignmentResult.ok) {
      setFormState({
        status: 'error',
        message: t(assignmentResult.message ?? 'Dữ liệu phân công không hợp lệ.'),
      });
      return;
    }

    if (isEditing && actorCanManageStatus && editingStatusFrom) {
      if (!canRoleTransitionOrderStatus(actorRoles, editingStatusFrom, form.status)) {
        setFormState({
          status: 'error',
          message: t('Bạn không có quyền chuyển trạng thái đơn hàng theo luồng này.'),
        });
        return;
      }
    }

    setFormState({
      status: 'loading',
      message: isEditing ? t('Đang cập nhật đơn hàng...') : t('Đang tạo đơn hàng...'),
    });

    try {
      if (!isEditing) {
        const payload = {
          orderNo,
          customerId,
          factoryId,
          dueDate: dueDate || null,
          metadata: metadataResult.value,
          ...(actorIsAdmin
            ? {
                saleOwnerUserId,
                assignments: assignmentResult.assignments,
              }
            : {}),
        };
        const created = await createInternalOrder(payload);
        setOrders((previous) => [created, ...previous]);
        setForm(defaultOrderFormState);
        setEditingStatusFrom(null);
        setFormState({
          status: 'success',
          message: t('Tạo đơn hàng thành công.'),
        });
      } else {
        const editingOrderId = form.orderId;
        if (editingOrderId === null) {
          setFormState({
            status: 'error',
            message: t('Không xác định được đơn hàng cần cập nhật.'),
          });
          return;
        }

        const payload = {
          customerId,
          factoryId,
          dueDate: dueDate || null,
          metadata: metadataResult.value,
          ...(actorCanManageStatus
            ? {
                status: form.status,
              }
            : {}),
          ...(actorIsAdmin
            ? {
                saleOwnerUserId,
                assignments: assignmentResult.assignments,
              }
            : {}),
        };
        const updated = await updateInternalOrder(editingOrderId, payload);
        setOrders((previous) =>
          previous.map((order) => (order.id === updated.id ? updated : order)),
        );
        setForm(defaultOrderFormState);
        setEditingStatusFrom(null);
        setFormState({
          status: 'success',
          message: t('Cập nhật đơn hàng thành công.'),
        });
      }
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : t('Không thể lưu đơn hàng.');
      setFormState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Quản trị đơn hàng')}
          description={t('Quản trị đơn hàng nội bộ ANSLIFE.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Quản trị đơn hàng')}
        description={t('Quản trị đơn hàng nội bộ ANSLIFE.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Quản trị đơn hàng')}</h1>
        <p>{t('Lọc, tạo và cập nhật đơn hàng theo phạm vi phân quyền.')}</p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button
            type="button"
            className="button-ghost"
            onClick={() => void refreshPageData()}
            disabled={ordersLoading || lookupsLoading}
          >
            {ordersLoading || lookupsLoading ? t('Đang tải...') : t('Làm mới danh sách')}
          </button>
          <button type="button" className="button-ghost" onClick={handleLogout}>
            {t('Đăng xuất')}
          </button>
          <Link to={toLocalizedPath('/')} className="button-ghost">
            {t('Về trang chủ')}
          </Link>
        </div>
      </section>

      <AdminModuleTabs />

      {!actorIsAdmin && (
        <div className="state-block state-loading">
          {t('Tài khoản không phải admin: một số trường nhạy cảm sẽ được ẩn trong form đơn hàng.')}
        </div>
      )}

      {error && <ErrorBlock message={error} />}
      {formState.status === 'success' && (
        <div className="state-block success-text">{formState.message}</div>
      )}

      <section className="filter-bar admin-order-filter">
        <form onSubmit={handleApplyFilters} className="admin-filter-form">
          <label>
            {t('Mã đơn hàng')}
            <input
              value={filters.orderNo}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, orderNo: event.target.value }))
              }
              placeholder="ORD-0001"
            />
          </label>

          <label>
            {t('Trạng thái')}
            <select
              value={filters.status}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, status: event.target.value }))
              }
            >
              <option value="">{t('Tất cả')}</option>
              {INTERNAL_ORDER_STATUS_OPTIONS.map((option) => (
                <option key={option.code} value={option.code}>
                  {t(option.label)}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t('Mã khách hàng')}
            <input
              value={filters.customerCode}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, customerCode: event.target.value }))
              }
              placeholder="MARUKATSU"
            />
          </label>

          <label>
            {t('Mã nhà máy')}
            <input
              value={filters.factoryCode}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, factoryCode: event.target.value }))
              }
              placeholder="F1"
            />
          </label>

          <div className="admin-filter-actions">
            <button type="submit" className="button-solid" disabled={ordersLoading}>
              {ordersLoading ? t('Đang tải...') : t('Lọc dữ liệu')}
            </button>
            <button
              type="button"
              className="button-ghost"
              onClick={() => void handleResetFilters()}
              disabled={ordersLoading}
            >
              {t('Đặt lại')}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-layout-grid admin-layout-grid-wide">
        <article className="form-card">
          <h2>
            {form.orderId
              ? `${t('Chỉnh sửa đơn hàng')} #${form.orderId}`
              : t('Tạo đơn hàng mới')}
          </h2>
          <form onSubmit={handleSubmitOrder} className="admin-order-form">
            <label>
              {t('Mã đơn hàng')}
              <input
                value={form.orderNo}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    orderNo: event.target.value,
                  }))
                }
                disabled={Boolean(form.orderId)}
                required
                placeholder="ORD-0001"
              />
            </label>

            <label>
              {t('Khách hàng')}
              <select
                value={form.customerId}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    customerId: event.target.value,
                  }))
                }
                required
                disabled={lookupsLoading}
              >
                <option value="">{t('Chọn khách hàng')}</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.code} - {customer.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t('Nhà máy')}
              <select
                value={form.factoryId}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    factoryId: event.target.value,
                  }))
                }
                disabled={lookupsLoading}
              >
                <option value="">{t('Không gán nhà máy')}</option>
                {factories.map((factory) => (
                  <option key={factory.id} value={factory.id}>
                    {factory.code} - {factory.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t('Ngày giao dự kiến')}
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    dueDate: event.target.value,
                  }))
                }
              />
            </label>

            {canEditOrderStatus && (
              <label>
                {t('Trạng thái')}
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      status: event.target.value as InternalOrderStatus,
                    }))
                  }
                >
                  {availableOrderStatusOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {t(option.label)}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {actorIsAdmin && !isEditing && (
              <label>
                {t('Trạng thái')}
                <input value={t(getOrderStatusLabel('draft'))} disabled readOnly />
              </label>
            )}

            {actorIsAdmin && (
              <label>
                {t('Phụ trách sale')}
                <select
                  value={form.saleOwnerUserId}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      saleOwnerUserId: event.target.value,
                    }))
                  }
                  disabled={lookupsLoading}
                >
                  <option value="">{t('Không gán phụ trách sale')}</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      #{user.id} - {user.fullName} ({user.email})
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label className="admin-order-metadata">
              {t('Metadata (JSON)')}
              <textarea
                rows={5}
                value={form.metadataInput}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    metadataInput: event.target.value,
                  }))
                }
                placeholder='{"priority":"high","remark":"sample"}'
              />
            </label>

            {actorIsAdmin && (
              <fieldset className="admin-role-fieldset">
                <legend>{t('Phân công')}</legend>
                <div className="admin-assignment-list">
                  {form.assignments.length === 0 && (
                    <p className="admin-empty">{t('Chưa có dòng phân công.')}</p>
                  )}

                  {form.assignments.map((assignment, index) => (
                    <div key={`assignment-${index}`} className="admin-assignment-row">
                      {users.length > 0 ? (
                        <select
                          value={assignment.userId}
                          onChange={(event) =>
                            updateAssignmentRow(index, 'userId', event.target.value)
                          }
                        >
                          <option value="">{t('Chọn người dùng')}</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              #{user.id} - {user.fullName}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          value={assignment.userId}
                          onChange={(event) =>
                            updateAssignmentRow(index, 'userId', event.target.value)
                          }
                          placeholder="userId"
                        />
                      )}
                      <input
                        value={assignment.assignmentRole}
                        onChange={(event) =>
                          updateAssignmentRow(index, 'assignmentRole', event.target.value)
                        }
                        list="admin-assignment-role-options"
                        placeholder={t('Vai trò phân công')}
                      />
                      <button
                        type="button"
                        className="button-ghost admin-row-action"
                        onClick={() => removeAssignmentRow(index)}
                      >
                        {t('Xóa')}
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="button-ghost"
                    onClick={addAssignmentRow}
                  >
                    {t('Thêm phân công')}
                  </button>
                </div>
                <datalist id="admin-assignment-role-options">
                  <option value="super_admin" />
                  <option value="system_admin" />
                  <option value="data_controller" />
                  <option value="qc" />
                  <option value="factory_collector" />
                  <option value="sale_trading" />
                  <option value="factory_partner" />
                  <option value="buyer" />
                </datalist>
              </fieldset>
            )}

            <div className="admin-order-form-actions">
              <button
                type="button"
                className="button-ghost"
                onClick={startCreateOrder}
                disabled={formState.status === 'loading'}
              >
                {t('Tạo đơn mới')}
              </button>
              <button
                type="submit"
                className="button-solid"
                disabled={formState.status === 'loading' || detailLoading}
              >
                {formState.status === 'loading'
                  ? t('Đang xử lý...')
                  : form.orderId
                    ? t('Lưu cập nhật')
                    : t('Tạo đơn hàng')}
              </button>
            </div>

            {formState.status === 'error' && <ErrorBlock message={formState.message} />}
          </form>
        </article>

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách đơn hàng')}</h2>
          {(ordersLoading || detailLoading) && <LoadingBlock />}
          {!ordersLoading && orders.length === 0 && (
            <p className="admin-empty">{t('Chưa có đơn hàng nào phù hợp bộ lọc.')}</p>
          )}

          {!ordersLoading && orders.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Mã đơn')}</th>
                    <th>{t('Khách hàng')}</th>
                    <th>{t('Nhà máy')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Ngày giao')}</th>
                    <th>{t('Cập nhật')}</th>
                    <th>{t('Thao tác')}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.orderNo}</td>
                      <td>
                        {order.customer.code} - {order.customer.name}
                      </td>
                      <td>{order.factory ? `${order.factory.code} - ${order.factory.name}` : '-'}</td>
                      <td>
                        <span
                          className={`admin-status-pill ${getOrderStatusClass(order.status)}`}
                        >
                          {t(getOrderStatusLabel(order.status))}
                        </span>
                      </td>
                      <td>{order.dueDate ?? '-'}</td>
                      <td>{formatDate(order.updatedAt)}</td>
                      <td>
                        <button
                          type="button"
                          className="button-ghost admin-row-action"
                          onClick={() => void startEditOrder(order.id)}
                          disabled={detailLoading}
                        >
                          {t('Sửa')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </section>
    </>
  );
}
