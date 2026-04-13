import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  createInternalOrderWorkLog,
  getCurrentUser,
  listInternalOrders,
  listInternalOrderWorkLogs,
  logoutInternal,
  updateInternalOrderWorkLog,
  type AppRole,
  type AuthUser,
  type InternalOrder,
  type InternalOrderWorkLog,
  type InternalWorkLogVisibility,
} from '../lib/internalAuth';

interface WorkLogFilters {
  orderNo: string;
  visibility: string;
}

interface WorkLogForm {
  logId: number | null;
  orderId: string;
  visibility: InternalWorkLogVisibility;
  noteType: string;
  message: string;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const WRITE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'qc',
  'factory_collector',
  'sale_trading',
  'factory_partner',
];

const defaultFilters: WorkLogFilters = {
  orderNo: '',
  visibility: '',
};

const defaultForm: WorkLogForm = {
  logId: null,
  orderId: '',
  visibility: 'internal',
  noteType: 'update',
  message: '',
};

const idleState: FormState = { status: 'idle', message: '' };

function isAdminLike(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) =>
    ['super_admin', 'system_admin', 'data_controller', 'sale_trading'].includes(role),
  );
}

function canWriteWorkLogs(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => WRITE_ROLES.includes(role));
}

function getAllowedVisibilities(actor: AuthUser | null): InternalWorkLogVisibility[] {
  if (!actor) {
    return ['internal'];
  }
  if (isAdminLike(actor)) {
    return ['internal', 'trader', 'buyer'];
  }
  return ['internal'];
}

function canEditLog(actor: AuthUser | null, item: InternalOrderWorkLog): boolean {
  if (!actor) {
    return false;
  }
  if (isAdminLike(actor)) {
    return true;
  }
  return item.createdBy != null && item.createdBy === actor.id;
}

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(parsed);
}

function getVisibilityLabel(value: InternalWorkLogVisibility): string {
  switch (value) {
    case 'internal':
      return 'Nội bộ';
    case 'trader':
      return 'Sale';
    case 'buyer':
      return 'Khách hàng';
    default:
      return value;
  }
}

export default function AdminWorkLogsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/work-logs')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<InternalOrder[]>([]);
  const [items, setItems] = useState<InternalOrderWorkLog[]>([]);
  const [filters, setFilters] = useState<WorkLogFilters>(defaultFilters);
  const [form, setForm] = useState<WorkLogForm>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState<FormState>(idleState);

  const actorCanWrite = useMemo(() => canWriteWorkLogs(actor), [actor]);
  const allowedVisibilities = useMemo(() => getAllowedVisibilities(actor), [actor]);

  const loadPageData = useCallback(
    async (nextFilters: WorkLogFilters = filters) => {
      setLoading(true);
      setError('');
      try {
        const [orderList, workLogs] = await Promise.all([
          listInternalOrders({ perPage: 200 }),
          listInternalOrderWorkLogs({
            perPage: 200,
            orderNo: nextFilters.orderNo.trim() || undefined,
            visibility:
              (nextFilters.visibility.trim() as InternalWorkLogVisibility) || undefined,
          }),
        ]);
        setOrders(orderList);
        setItems(workLogs);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : t('Không thể tải nhật ký làm việc.');
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [filters, t],
  );

  useEffect(() => {
    let mounted = true;
    async function bootstrapPage() {
      try {
        const currentUser = await getCurrentUser();
        if (!mounted) {
          return;
        }
        if (!currentUser) {
          navigate(loginPath, { replace: true });
          return;
        }
        setActor(currentUser);
        await loadPageData(defaultFilters);
      } finally {
        if (mounted) {
          setAuthChecking(false);
        }
      }
    }
    void bootstrapPage();
    return () => {
      mounted = false;
    };
  }, [loadPageData, loginPath, navigate]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  function resetForm() {
    setForm(defaultForm);
    setFormState(idleState);
  }

  function startEdit(item: InternalOrderWorkLog) {
    if (!canEditLog(actor, item)) {
      return;
    }
    setFormState(idleState);
    setForm({
      logId: item.id,
      orderId: String(item.orderId),
      visibility: item.visibility,
      noteType: item.noteType,
      message: item.message,
    });
  }

  async function submitFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadPageData(filters);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!actorCanWrite) {
      return;
    }

    const orderId = Number(form.orderId);
    if (!Number.isInteger(orderId) || orderId <= 0) {
      setFormState({ status: 'error', message: t('Vui lòng chọn đơn hàng hợp lệ.') });
      return;
    }
    if (form.message.trim().length < 2) {
      setFormState({ status: 'error', message: t('Nội dung ghi chú không hợp lệ.') });
      return;
    }

    if (!allowedVisibilities.includes(form.visibility)) {
      setFormState({
        status: 'error',
        message: t('Bạn không có quyền tạo/sửa ghi chú với visibility này.'),
      });
      return;
    }

    setFormState({ status: 'loading', message: t('Đang lưu nhật ký...') });
    try {
      const payload = {
        visibility: form.visibility,
        noteType: form.noteType.trim() || 'update',
        message: form.message,
      };

      const saved =
        form.logId == null
          ? await createInternalOrderWorkLog({ orderId, ...payload })
          : await updateInternalOrderWorkLog(form.logId, payload);

      setItems((previous) => {
        const exists = previous.some((item) => item.id === saved.id);
        if (exists) {
          return previous.map((item) => (item.id === saved.id ? saved : item));
        }
        return [saved, ...previous];
      });
      setFormState({ status: 'success', message: t('Lưu nhật ký thành công.') });
      resetForm();
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : t('Không thể lưu nhật ký.');
      setFormState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo title={t('Nhật ký làm việc')} description={t('Quản lý nhật ký theo đơn hàng.')} />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo title={t('Nhật ký làm việc')} description={t('Quản lý nhật ký theo đơn hàng.')} />

      <section className="page-hero">
        <p className="kicker">{t('PORTAL LÀM VIỆC')}</p>
        <h1>{t('Nhật ký làm việc')}</h1>
        <p>{t('Lưu vết ghi chú nội bộ, ghi chú cho sale và ghi chú cho khách hàng theo từng đơn hàng.')}</p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button type="button" className="button-ghost" onClick={() => void loadPageData()}>
            {t('Làm mới')}
          </button>
          <button type="button" className="button-ghost" onClick={() => void handleLogout()}>
            {t('Đăng xuất')}
          </button>
        </div>
      </section>

      <AdminModuleTabs />

      {error && <ErrorBlock message={error} />}

      <section className="admin-order-filter">
        <form className="admin-filter-form admin-filter-form-compact" onSubmit={submitFilters}>
          <label>
            {t('Mã đơn hàng')}
            <input
              value={filters.orderNo}
              onChange={(event) => setFilters((p) => ({ ...p, orderNo: event.target.value }))}
              placeholder="ORD-..."
            />
          </label>
          <label>
            {t('Phạm vi hiển thị')}
            <select
              value={filters.visibility}
              onChange={(event) => setFilters((p) => ({ ...p, visibility: event.target.value }))}
            >
              <option value="">{t('Tất cả')}</option>
              <option value="internal">{t('Nội bộ')}</option>
              <option value="trader">{t('Sale')}</option>
              <option value="buyer">{t('Khách hàng')}</option>
            </select>
          </label>
          <div className="admin-filter-actions">
            <button type="submit" className="button-solid">
              {t('Lọc')}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-layout-grid-wide">
        <article className="form-card">
          <h2>{form.logId ? t('Cập nhật nhật ký') : t('Tạo nhật ký mới')}</h2>
          {!actorCanWrite && (
            <p className="admin-empty">{t('Bạn chỉ có quyền xem nhật ký trong phạm vi được cấp.')}</p>
          )}
          {actorCanWrite && (
            <form className="admin-order-form" onSubmit={handleSubmit}>
              <label>
                {t('Đơn hàng')}
                <select
                  value={form.orderId}
                  onChange={(event) => setForm((p) => ({ ...p, orderId: event.target.value }))}
                  required
                >
                  <option value="">{t('Chọn đơn hàng')}</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      {order.orderNo} - {order.customer.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t('Phạm vi hiển thị')}
                <select
                  value={form.visibility}
                  onChange={(event) =>
                    setForm((p) => ({
                      ...p,
                      visibility: event.target.value as InternalWorkLogVisibility,
                    }))
                  }
                >
                  {allowedVisibilities.map((value) => (
                    <option key={value} value={value}>
                      {t(getVisibilityLabel(value))}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                {t('Loại ghi chú')}
                <input
                  value={form.noteType}
                  onChange={(event) => setForm((p) => ({ ...p, noteType: event.target.value }))}
                  placeholder="cap_nhat"
                />
              </label>
              <label className="admin-order-metadata">
                {t('Nội dung')}
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={(event) => setForm((p) => ({ ...p, message: event.target.value }))}
                  required
                />
              </label>
              <div className="admin-order-form-actions">
                <button type="button" className="button-ghost" onClick={resetForm}>
                  {t('Đặt lại')}
                </button>
                <button type="submit" className="button-solid">
                  {form.logId ? t('Cập nhật') : t('Lưu nhật ký')}
                </button>
              </div>
            </form>
          )}
          {formState.status === 'error' && <ErrorBlock message={formState.message} />}
          {formState.status === 'success' && (
            <div className="state-block success-text">{formState.message}</div>
          )}
        </article>

        <article className="admin-table-wrap">
          <h2>{t('Danh sách nhật ký')}</h2>
          {loading ? (
            <LoadingBlock />
          ) : items.length === 0 ? (
            <p className="admin-empty">{t('Chưa có nhật ký làm việc.')}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>{t('Đơn hàng')}</th>
                  <th>{t('Phạm vi hiển thị')}</th>
                  <th>{t('Loại')}</th>
                  <th>{t('Nội dung')}</th>
                  <th>{t('Người tạo')}</th>
                  <th>{t('Thời gian')}</th>
                  {actorCanWrite && <th>{t('Hành động')}</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.orderNo}</td>
                    <td>{t(getVisibilityLabel(item.visibility))}</td>
                    <td>{item.noteType}</td>
                    <td>{item.message}</td>
                    <td>{item.createdByName ?? '-'}</td>
                    <td>{formatDate(item.updatedAt)}</td>
                    {actorCanWrite && (
                      <td>
                        {canEditLog(actor, item) ? (
                          <button
                            type="button"
                            className="button-ghost admin-row-action"
                            onClick={() => startEdit(item)}
                          >
                            {t('Sửa')}
                          </button>
                        ) : (
                          '-'
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </article>
      </section>
    </>
  );
}
