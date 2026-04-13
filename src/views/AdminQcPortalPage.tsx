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
  createInternalQcItem,
  getCurrentUser,
  getInternalQcItemById,
  listInternalOrders,
  listInternalQcItems,
  logoutInternal,
  updateInternalQcItem,
  type AppRole,
  type AuthUser,
  type InternalOrder,
  type InternalOrderStatus,
  type InternalQcItem,
} from '../lib/internalAuth';

interface QcFilters {
  orderNo: string;
  state: string;
  severity: string;
}

interface QcCreateFormState {
  orderId: string;
  title: string;
  findingType: string;
  severity: string;
  reportNo: string;
  observedAt: string;
  metadataInput: string;
}

interface QcEditFormState {
  itemId: number;
  title: string;
  findingType: string;
  severity: string;
  reportNo: string;
  observedAt: string;
  metadataInput: string;
  state: InternalOrderStatus;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFilters: QcFilters = {
  orderNo: '',
  state: '',
  severity: '',
};

const defaultCreateForm: QcCreateFormState = {
  orderId: '',
  title: '',
  findingType: 'general',
  severity: 'major',
  reportNo: '',
  observedAt: '',
  metadataInput: '',
};

const idleState: FormState = { status: 'idle', message: '' };

const QC_VIEW_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'qc',
  'qc',
  'qc',
  'factory_collector',
  'factory_partner',
  'sale_trading',
  'sale_trading',
];
const QC_WRITE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'qc',
  'qc',
  'qc',
  'factory_collector',
  'factory_partner',
];
const QC_REVIEW_ROLES: AppRole[] = ['super_admin', 'system_admin', 'data_controller'];

function canViewQcPortal(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => QC_VIEW_ROLES.includes(role));
}

function canCreateQc(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => QC_WRITE_ROLES.includes(role));
}

function canReviewQc(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => QC_REVIEW_ROLES.includes(role));
}

function getStateLabel(state: string): string {
  return (
    INTERNAL_ORDER_STATUS_OPTIONS.find((option) => option.code === state)?.label ?? state
  );
}

function getStateClass(state: string): string {
  return `is-order-${state.replace(/[^a-z0-9_-]/gi, '-')}`;
}

function formatDate(value: string | null): string {
  if (!value) {
    return '-';
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(parsed);
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

function mapItemToEditForm(item: InternalQcItem): QcEditFormState {
  return {
    itemId: item.id,
    title: item.title,
    findingType: item.findingType,
    severity: item.severity,
    reportNo: item.reportNo ?? '',
    observedAt: item.observedAt ? item.observedAt.slice(0, 16) : '',
    metadataInput: item.metadata ? JSON.stringify(item.metadata, null, 2) : '',
    state: item.state,
  };
}

export default function AdminQcPortalPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/qc-portal')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<InternalOrder[]>([]);
  const [filters, setFilters] = useState<QcFilters>(defaultFilters);
  const [items, setItems] = useState<InternalQcItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [createForm, setCreateForm] = useState<QcCreateFormState>(defaultCreateForm);
  const [createState, setCreateState] = useState<FormState>(idleState);
  const [editState, setEditState] = useState<FormState>(idleState);
  const [selectedItem, setSelectedItem] = useState<InternalQcItem | null>(null);
  const [editForm, setEditForm] = useState<QcEditFormState | null>(null);

  const actorCanView = useMemo(() => canViewQcPortal(actor), [actor]);
  const actorCanCreate = useMemo(() => canCreateQc(actor), [actor]);
  const actorCanReview = useMemo(() => canReviewQc(actor), [actor]);

  const loadItems = useCallback(
    async (nextFilters: QcFilters) => {
      setLoading(true);
      setError('');
      try {
        const data = await listInternalQcItems({
          perPage: 200,
          orderNo: nextFilters.orderNo.trim() || undefined,
          state: nextFilters.state.trim() || undefined,
          severity: nextFilters.severity.trim() || undefined,
        });
        setItems(data);
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : t('Không thể tải dữ liệu QC.');
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [t],
  );

  const loadOrders = useCallback(async () => {
    try {
      const data = await listInternalOrders({ perPage: 200 });
      setOrders(data);
    } catch {
      // keep current list
    }
  }, []);

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
        await Promise.all([loadItems(defaultFilters), loadOrders()]);
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
  }, [loadItems, loadOrders, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadItems(filters);
  }

  async function handleResetFilters() {
    setFilters(defaultFilters);
    await loadItems(defaultFilters);
  }

  async function handleCreateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!actorCanCreate) {
      setCreateState({
        status: 'error',
        message: t('Bạn không có quyền tạo dữ liệu QC.'),
      });
      return;
    }

    const orderId = Number(createForm.orderId);
    const title = createForm.title.trim();
    const findingType = createForm.findingType.trim().toLowerCase();
    const severity = createForm.severity.trim().toLowerCase();
    const reportNo = createForm.reportNo.trim();
    const observedAt = createForm.observedAt.trim();
    const metadataResult = parseMetadataInput(createForm.metadataInput);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      setCreateState({
        status: 'error',
        message: t('Vui lòng chọn đơn hàng hợp lệ.'),
      });
      return;
    }
    if (title.length < 2 || title.length > 255) {
      setCreateState({
        status: 'error',
        message: t('Tiêu đề QC không hợp lệ.'),
      });
      return;
    }
    if (!/^[a-z0-9._-]{2,64}$/i.test(findingType)) {
      setCreateState({
        status: 'error',
        message: t('Finding type không hợp lệ.'),
      });
      return;
    }
    if (!/^[a-z0-9._-]{2,64}$/i.test(severity)) {
      setCreateState({
        status: 'error',
        message: t('Mức độ lỗi không hợp lệ.'),
      });
      return;
    }
    if (reportNo.length > 128) {
      setCreateState({
        status: 'error',
        message: t('Mã báo cáo quá dài.'),
      });
      return;
    }
    if (observedAt) {
      const parsed = new Date(observedAt);
      if (Number.isNaN(parsed.getTime())) {
        setCreateState({
          status: 'error',
          message: t('Thời gian ghi nhận không hợp lệ.'),
        });
        return;
      }
    }
    if (!metadataResult.ok) {
      setCreateState({
        status: 'error',
        message: t(metadataResult.message ?? 'Metadata (JSON) không hợp lệ.'),
      });
      return;
    }

    setCreateState({ status: 'loading', message: t('Đang tạo dữ liệu QC...') });
    try {
      const item = await createInternalQcItem({
        orderId,
        title,
        findingType,
        severity,
        reportNo: reportNo || null,
        observedAt: observedAt || null,
        metadata: metadataResult.value,
      });
      setItems((previous) => [item, ...previous]);
      setCreateForm({
        ...defaultCreateForm,
        orderId: createForm.orderId,
      });
      setCreateState({
        status: 'success',
        message: t('Tạo dữ liệu QC thành công.'),
      });
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : t('Không thể tạo dữ liệu QC.');
      setCreateState({ status: 'error', message });
    }
  }

  async function openItemDetail(itemId: number) {
    setDetailLoading(true);
    setEditState(idleState);
    try {
      const item = await getInternalQcItemById(itemId);
      setSelectedItem(item);
      setEditForm(mapItemToEditForm(item));
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : t('Không thể tải chi tiết dữ liệu QC.');
      setEditState({ status: 'error', message });
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleSaveDetail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedItem || !editForm) {
      return;
    }

    const title = editForm.title.trim();
    const findingType = editForm.findingType.trim().toLowerCase();
    const severity = editForm.severity.trim().toLowerCase();
    const reportNo = editForm.reportNo.trim();
    const observedAt = editForm.observedAt.trim();
    const metadataResult = parseMetadataInput(editForm.metadataInput);

    if (title.length < 2 || title.length > 255) {
      setEditState({ status: 'error', message: t('Tiêu đề QC không hợp lệ.') });
      return;
    }
    if (!/^[a-z0-9._-]{2,64}$/i.test(findingType)) {
      setEditState({ status: 'error', message: t('Finding type không hợp lệ.') });
      return;
    }
    if (!/^[a-z0-9._-]{2,64}$/i.test(severity)) {
      setEditState({ status: 'error', message: t('Mức độ lỗi không hợp lệ.') });
      return;
    }
    if (reportNo.length > 128) {
      setEditState({ status: 'error', message: t('Mã báo cáo quá dài.') });
      return;
    }
    if (observedAt) {
      const parsed = new Date(observedAt);
      if (Number.isNaN(parsed.getTime())) {
        setEditState({ status: 'error', message: t('Thời gian ghi nhận không hợp lệ.') });
        return;
      }
    }
    if (!metadataResult.ok) {
      setEditState({
        status: 'error',
        message: t(metadataResult.message ?? 'Metadata (JSON) không hợp lệ.'),
      });
      return;
    }

    if (!actorCanCreate && !actorCanReview) {
      setEditState({
        status: 'error',
        message: t('Bạn không có quyền cập nhật dữ liệu QC.'),
      });
      return;
    }

    setEditState({ status: 'loading', message: t('Đang lưu dữ liệu QC...') });
    try {
      const updated = await updateInternalQcItem(editForm.itemId, {
        title,
        findingType,
        severity,
        reportNo: reportNo || null,
        observedAt: observedAt || null,
        metadata: metadataResult.value,
        state: editForm.state,
      });
      setItems((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item)),
      );
      setSelectedItem(updated);
      setEditForm(mapItemToEditForm(updated));
      setEditState({ status: 'success', message: t('Cập nhật dữ liệu QC thành công.') });
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : t('Không thể cập nhật dữ liệu QC.');
      setEditState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo title={t('Cổng QC')} description={t('Quản lý dữ liệu QC theo đơn hàng và phạm vi.')} />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo title={t('Cổng QC')} description={t('Quản lý dữ liệu QC theo đơn hàng và phạm vi.')} />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Cổng QC')}</h1>
        <p>{t('QC tải dữ liệu, bộ phận Kiểm soát dữ liệu duyệt và công bố theo luồng chuẩn.')}</p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button type="button" className="button-ghost" onClick={() => void loadItems(filters)} disabled={loading}>
            {loading ? t('Đang tải...') : t('Làm mới danh sách')}
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

      {!actorCanView && <ErrorBlock message={t('Tài khoản hiện tại không có quyền truy cập cổng QC.')} />}
      {error && <ErrorBlock message={error} />}

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
              value={filters.state}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, state: event.target.value }))
              }
            >
              <option value="">{t('Tất cả')}</option>
              {INTERNAL_ORDER_STATUS_OPTIONS.map((status) => (
                <option key={status.code} value={status.code}>
                  {t(status.label)}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t('Mức độ lỗi')}
            <input
              value={filters.severity}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, severity: event.target.value }))
              }
              placeholder="major"
            />
          </label>
          <div className="admin-filter-actions">
            <button type="submit" className="button-solid" disabled={loading}>
              {loading ? t('Đang tải...') : t('Lọc dữ liệu')}
            </button>
            <button type="button" className="button-ghost" onClick={() => void handleResetFilters()} disabled={loading}>
              {t('Đặt lại')}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-layout-grid admin-layout-grid-wide">
        <article className="form-card">
          <h2>{t('Tạo mục QC')}</h2>
          <form onSubmit={handleCreateSubmit} className="admin-order-form">
            <label>
              {t('Đơn hàng')}
              <select
                value={createForm.orderId}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, orderId: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              >
                <option value="">{t('Chọn đơn hàng')}</option>
                {orders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {order.orderNo} - {order.customer.code} - {order.customer.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t('Tiêu đề QC')}
              <input
                value={createForm.title}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, title: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              />
            </label>
            <label>
              {t('Loại phát hiện')}
              <input
                value={createForm.findingType}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, findingType: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label>
              {t('Mức độ lỗi')}
              <input
                value={createForm.severity}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, severity: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label>
              {t('Mã báo cáo')}
              <input
                value={createForm.reportNo}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, reportNo: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label>
              {t('Thời gian ghi nhận')}
              <input
                type="datetime-local"
                value={createForm.observedAt}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, observedAt: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label className="admin-order-metadata">
              {t('Metadata (JSON)')}
              <textarea
                rows={5}
                value={createForm.metadataInput}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, metadataInput: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <div className="admin-order-form-actions">
              <button type="submit" className="button-solid" disabled={!actorCanCreate || createState.status === 'loading'}>
                {createState.status === 'loading' ? t('Đang tạo...') : t('Tạo mục QC')}
              </button>
            </div>
            {createState.status === 'error' && <ErrorBlock message={createState.message} />}
            {createState.status === 'success' && (
              <div className="state-block success-text">{createState.message}</div>
            )}
          </form>
        </article>

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách mục QC')}</h2>
          {(loading || detailLoading) && <LoadingBlock />}
          {!loading && items.length === 0 && <p className="admin-empty">{t('Chưa có dữ liệu QC phù hợp.')}</p>}
          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Đơn hàng')}</th>
                    <th>{t('Tiêu đề')}</th>
                    <th>{t('Mức độ')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Thao tác')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.orderNo}</td>
                      <td>{item.title}</td>
                      <td>{item.severity}</td>
                      <td>
                        <span className={`admin-status-pill ${getStateClass(item.state)}`}>
                          {t(getStateLabel(item.state))}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="button-ghost admin-row-action"
                          onClick={() => void openItemDetail(item.id)}
                          disabled={detailLoading}
                        >
                          {t('Chi tiết')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="form-card">
          <h2>{t('Chi tiết mục QC')}</h2>
          {!selectedItem || !editForm ? (
            <p className="admin-empty">{t('Chọn một mục QC để chỉnh sửa.')}</p>
          ) : (
            <form onSubmit={handleSaveDetail} className="admin-order-form">
              <label>
                {t('Đơn hàng')}
                <input value={selectedItem.orderNo} readOnly />
              </label>
              <label>
                {t('Tiêu đề QC')}
                <input
                  value={editForm.title}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, title: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Loại phát hiện')}
                <input
                  value={editForm.findingType}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, findingType: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Mức độ lỗi')}
                <input
                  value={editForm.severity}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, severity: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Mã báo cáo')}
                <input
                  value={editForm.reportNo}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, reportNo: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Thời gian ghi nhận')}
                <input
                  type="datetime-local"
                  value={editForm.observedAt}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, observedAt: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Trạng thái')}
                <select
                  value={editForm.state}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous
                        ? { ...previous, state: event.target.value as InternalOrderStatus }
                        : previous,
                    )
                  }
                  disabled={!actorCanReview || editState.status === 'loading'}
                >
                  {INTERNAL_ORDER_STATUS_OPTIONS.map((status) => (
                    <option key={status.code} value={status.code}>
                      {t(status.label)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="admin-order-metadata">
                {t('Metadata (JSON)')}
                <textarea
                  rows={7}
                  value={editForm.metadataInput}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, metadataInput: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <p className="admin-inline-hint">
                {t('Tạo lúc')}: {formatDate(selectedItem.createdAt)} | {t('Cập nhật')}: {formatDate(selectedItem.updatedAt)}
              </p>
              <div className="admin-order-form-actions">
                <button type="submit" className="button-solid" disabled={editState.status === 'loading' || (!actorCanCreate && !actorCanReview)}>
                  {editState.status === 'loading' ? t('Đang lưu...') : t('Lưu thay đổi')}
                </button>
              </div>
              {editState.status === 'error' && <ErrorBlock message={editState.message} />}
              {editState.status === 'success' && (
                <div className="state-block success-text">{editState.message}</div>
              )}
            </form>
          )}
        </article>
      </section>
    </>
  );
}
