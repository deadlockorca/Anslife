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
  createInternalCapaItem,
  getCurrentUser,
  getInternalCapaItemById,
  listInternalCapaItems,
  listInternalOrders,
  logoutInternal,
  updateInternalCapaItem,
  type AppRole,
  type AuthUser,
  type InternalCapaItem,
  type InternalOrder,
  type InternalOrderStatus,
} from '../lib/internalAuth';

interface CapaFilters {
  orderNo: string;
  state: string;
}

interface CapaCreateFormState {
  orderId: string;
  title: string;
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  ownerUserId: string;
  dueDate: string;
  metadataInput: string;
}

interface CapaEditFormState {
  itemId: number;
  title: string;
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  ownerUserId: string;
  dueDate: string;
  metadataInput: string;
  state: InternalOrderStatus;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFilters: CapaFilters = {
  orderNo: '',
  state: '',
};

const defaultCreateForm: CapaCreateFormState = {
  orderId: '',
  title: '',
  rootCause: '',
  correctiveAction: '',
  preventiveAction: '',
  ownerUserId: '',
  dueDate: '',
  metadataInput: '',
};

const idleState: FormState = { status: 'idle', message: '' };

const CAPA_VIEW_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'qc',
  'qc',
  'qc',
  'factory_partner',
  'sale_trading',
  'sale_trading',
];
const CAPA_WRITE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'qc',
  'qc',
  'qc',
  'factory_partner',
];
const CAPA_REVIEW_ROLES: AppRole[] = ['super_admin', 'system_admin', 'data_controller'];

function canViewCapaPortal(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => CAPA_VIEW_ROLES.includes(role));
}

function canCreateCapa(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => CAPA_WRITE_ROLES.includes(role));
}

function canReviewCapa(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => CAPA_REVIEW_ROLES.includes(role));
}

function getStateLabel(state: string): string {
  return (
    INTERNAL_ORDER_STATUS_OPTIONS.find((option) => option.code === state)?.label ?? state
  );
}

function getStateClass(state: string): string {
  return `is-order-${state.replace(/[^a-z0-9_-]/gi, '-')}`;
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

function mapItemToEditForm(item: InternalCapaItem): CapaEditFormState {
  return {
    itemId: item.id,
    title: item.title,
    rootCause: item.rootCause ?? '',
    correctiveAction: item.correctiveAction ?? '',
    preventiveAction: item.preventiveAction ?? '',
    ownerUserId: item.ownerUserId ? String(item.ownerUserId) : '',
    dueDate: item.dueDate ?? '',
    metadataInput: item.metadata ? JSON.stringify(item.metadata, null, 2) : '',
    state: item.state,
  };
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

export default function AdminCapaPortalPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/capa-portal')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<InternalOrder[]>([]);
  const [filters, setFilters] = useState<CapaFilters>(defaultFilters);
  const [items, setItems] = useState<InternalCapaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [createForm, setCreateForm] = useState<CapaCreateFormState>(defaultCreateForm);
  const [createState, setCreateState] = useState<FormState>(idleState);
  const [editState, setEditState] = useState<FormState>(idleState);
  const [selectedItem, setSelectedItem] = useState<InternalCapaItem | null>(null);
  const [editForm, setEditForm] = useState<CapaEditFormState | null>(null);

  const actorCanView = useMemo(() => canViewCapaPortal(actor), [actor]);
  const actorCanCreate = useMemo(() => canCreateCapa(actor), [actor]);
  const actorCanReview = useMemo(() => canReviewCapa(actor), [actor]);

  const loadItems = useCallback(
    async (nextFilters: CapaFilters) => {
      setLoading(true);
      setError('');
      try {
        const data = await listInternalCapaItems({
          perPage: 200,
          orderNo: nextFilters.orderNo.trim() || undefined,
          state: nextFilters.state.trim() || undefined,
        });
        setItems(data);
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : t('Không thể tải danh sách CAPA.');
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
      // no-op
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
      setCreateState({ status: 'error', message: t('Bạn không có quyền tạo mục CAPA.') });
      return;
    }

    const orderId = Number(createForm.orderId);
    const title = createForm.title.trim();
    const ownerUserId =
      createForm.ownerUserId.trim().length > 0
        ? Number(createForm.ownerUserId.trim())
        : null;
    const dueDate = createForm.dueDate.trim();
    const metadataResult = parseMetadataInput(createForm.metadataInput);

    if (!Number.isInteger(orderId) || orderId <= 0) {
      setCreateState({ status: 'error', message: t('Vui lòng chọn đơn hàng hợp lệ.') });
      return;
    }
    if (title.length < 2 || title.length > 255) {
      setCreateState({ status: 'error', message: t('Tiêu đề CAPA không hợp lệ.') });
      return;
    }
    if (ownerUserId !== null && (!Number.isInteger(ownerUserId) || ownerUserId <= 0)) {
      setCreateState({ status: 'error', message: t('ID người phụ trách không hợp lệ.') });
      return;
    }
    if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      setCreateState({ status: 'error', message: t('Hạn xử lý phải theo định dạng YYYY-MM-DD.') });
      return;
    }
    if (!metadataResult.ok) {
      setCreateState({
        status: 'error',
        message: t(metadataResult.message ?? 'Metadata (JSON) không hợp lệ.'),
      });
      return;
    }

      setCreateState({ status: 'loading', message: t('Đang tạo mục CAPA...') });
    try {
      const item = await createInternalCapaItem({
        orderId,
        title,
        rootCause: createForm.rootCause.trim() || null,
        correctiveAction: createForm.correctiveAction.trim() || null,
        preventiveAction: createForm.preventiveAction.trim() || null,
        ownerUserId,
        dueDate: dueDate || null,
        metadata: metadataResult.value,
      });
      setItems((previous) => [item, ...previous]);
      setCreateForm({
        ...defaultCreateForm,
        orderId: createForm.orderId,
      });
      setCreateState({ status: 'success', message: t('Tạo mục CAPA thành công.') });
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : t('Không thể tạo mục CAPA.');
      setCreateState({ status: 'error', message });
    }
  }

  async function openItemDetail(itemId: number) {
    setDetailLoading(true);
    setEditState(idleState);
    try {
      const item = await getInternalCapaItemById(itemId);
      setSelectedItem(item);
      setEditForm(mapItemToEditForm(item));
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : t('Không thể tải chi tiết mục CAPA.');
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
    const ownerUserId =
      editForm.ownerUserId.trim().length > 0 ? Number(editForm.ownerUserId.trim()) : null;
    const dueDate = editForm.dueDate.trim();
    const metadataResult = parseMetadataInput(editForm.metadataInput);

    if (title.length < 2 || title.length > 255) {
      setEditState({ status: 'error', message: t('Tiêu đề CAPA không hợp lệ.') });
      return;
    }
    if (ownerUserId !== null && (!Number.isInteger(ownerUserId) || ownerUserId <= 0)) {
      setEditState({ status: 'error', message: t('ID người phụ trách không hợp lệ.') });
      return;
    }
    if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      setEditState({ status: 'error', message: t('Hạn xử lý phải theo định dạng YYYY-MM-DD.') });
      return;
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
        message: t('Bạn không có quyền cập nhật mục CAPA.'),
      });
      return;
    }

    setEditState({ status: 'loading', message: t('Đang lưu mục CAPA...') });
    try {
      const updated = await updateInternalCapaItem(editForm.itemId, {
        title,
        rootCause: editForm.rootCause.trim() || null,
        correctiveAction: editForm.correctiveAction.trim() || null,
        preventiveAction: editForm.preventiveAction.trim() || null,
        ownerUserId,
        dueDate: dueDate || null,
        metadata: metadataResult.value,
        state: editForm.state,
      });
      setItems((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item)),
      );
      setSelectedItem(updated);
      setEditForm(mapItemToEditForm(updated));
      setEditState({ status: 'success', message: t('Cập nhật mục CAPA thành công.') });
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : t('Không thể cập nhật mục CAPA.');
      setEditState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo title={t('Cổng CAPA')} description={t('Theo dõi CAPA theo đơn hàng và phạm vi.')} />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo title={t('Cổng CAPA')} description={t('Theo dõi CAPA theo đơn hàng và phạm vi.')} />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Cổng CAPA')}</h1>
        <p>{t('Quản lý nguyên nhân gốc, hành động khắc phục/phòng ngừa và trạng thái phê duyệt CAPA.')}</p>
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

      {!actorCanView && <ErrorBlock message={t('Tài khoản hiện tại không có quyền truy cập cổng CAPA.')} />}
      {error && <ErrorBlock message={error} />}

      <section className="filter-bar admin-order-filter">
        <form onSubmit={handleApplyFilters} className="admin-filter-form admin-filter-form-compact">
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
          <h2>{t('Tạo mục CAPA')}</h2>
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
              {t('Tiêu đề CAPA')}
              <input
                value={createForm.title}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, title: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              />
            </label>
            <label className="admin-order-metadata">
              {t('Nguyên nhân gốc')}
              <textarea
                rows={3}
                value={createForm.rootCause}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, rootCause: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label className="admin-order-metadata">
              {t('Hành động khắc phục')}
              <textarea
                rows={3}
                value={createForm.correctiveAction}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, correctiveAction: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label className="admin-order-metadata">
              {t('Hành động phòng ngừa')}
              <textarea
                rows={3}
                value={createForm.preventiveAction}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, preventiveAction: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label>
              {t('ID người phụ trách')}
              <input
                value={createForm.ownerUserId}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, ownerUserId: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label>
              {t('Hạn xử lý')}
              <input
                type="date"
                value={createForm.dueDate}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, dueDate: event.target.value }))
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
                {createState.status === 'loading' ? t('Đang tạo...') : t('Tạo mục CAPA')}
              </button>
            </div>
            {createState.status === 'error' && <ErrorBlock message={createState.message} />}
            {createState.status === 'success' && (
              <div className="state-block success-text">{createState.message}</div>
            )}
          </form>
        </article>

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách mục CAPA')}</h2>
          {(loading || detailLoading) && <LoadingBlock />}
          {!loading && items.length === 0 && <p className="admin-empty">{t('Chưa có mục CAPA phù hợp.')}</p>}
          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Đơn hàng')}</th>
                    <th>{t('Tiêu đề')}</th>
                    <th>{t('Hạn xử lý')}</th>
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
                      <td>{item.dueDate ?? '-'}</td>
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
          <h2>{t('Chi tiết mục CAPA')}</h2>
          {!selectedItem || !editForm ? (
            <p className="admin-empty">{t('Chọn một mục CAPA để chỉnh sửa.')}</p>
          ) : (
            <form onSubmit={handleSaveDetail} className="admin-order-form">
              <label>
                {t('Đơn hàng')}
                <input value={selectedItem.orderNo} readOnly />
              </label>
              <label>
                {t('Tiêu đề CAPA')}
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
              <label className="admin-order-metadata">
                {t('Nguyên nhân gốc')}
                <textarea
                  rows={3}
                  value={editForm.rootCause}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, rootCause: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label className="admin-order-metadata">
                {t('Hành động khắc phục')}
                <textarea
                  rows={3}
                  value={editForm.correctiveAction}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, correctiveAction: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label className="admin-order-metadata">
                {t('Hành động phòng ngừa')}
                <textarea
                  rows={3}
                  value={editForm.preventiveAction}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, preventiveAction: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('ID người phụ trách')}
                <input
                  value={editForm.ownerUserId}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, ownerUserId: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Hạn xử lý')}
                <input
                  type="date"
                  value={editForm.dueDate}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, dueDate: event.target.value } : previous,
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
