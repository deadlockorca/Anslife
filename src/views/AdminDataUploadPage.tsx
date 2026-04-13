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
  createInternalOrderDataItem,
  getCurrentUser,
  listInternalOrderDataItems,
  listInternalOrders,
  logoutInternal,
  type AppRole,
  type AuthUser,
  type InternalOrder,
  type InternalOrderDataItem,
} from '../lib/internalAuth';

interface UploadFormState {
  orderId: string;
  dataType: string;
  title: string;
  storageKey: string;
  note: string;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFormState: UploadFormState = {
  orderId: '',
  dataType: 'qc_report',
  title: '',
  storageKey: '',
  note: '',
};

const idleState: FormState = { status: 'idle', message: '' };

const DATA_UPLOAD_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'qc',
  'qc',
  'qc',
  'factory_collector',
  'factory_collector',
  'factory_partner',
  'factory_partner',
];

function canUploadData(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => DATA_UPLOAD_ROLES.includes(role));
}

function getStateLabel(state: string): string {
  return (
    INTERNAL_ORDER_STATUS_OPTIONS.find((option) => option.code === state)?.label ?? state
  );
}

function getStateClass(state: string): string {
  return `is-order-${state.replace(/[^a-z0-9_-]/gi, '-')}`;
}

function formatDate(dateString: string | null): string {
  if (!dateString) {
    return '-';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export default function AdminDataUploadPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/data-upload')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<InternalOrder[]>([]);
  const [items, setItems] = useState<InternalOrderDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<UploadFormState>(defaultFormState);
  const [formState, setFormState] = useState<FormState>(idleState);

  const actorCanUpload = useMemo(() => canUploadData(actor), [actor]);

  const loadPageData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [orderList, dataItems] = await Promise.all([
        listInternalOrders({ perPage: 200 }),
        listInternalOrderDataItems({ perPage: 100 }),
      ]);
      setOrders(orderList);
      setItems(dataItems);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : t('Không thể tải dữ liệu module tải lên.');
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [t]);

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
        await loadPageData();
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
  }, [loadPageData, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!actorCanUpload) {
      setFormState({
        status: 'error',
        message: t('Bạn không có quyền tải dữ liệu QC/Nhà máy.'),
      });
      return;
    }

    const orderId = Number(form.orderId);
    const dataType = form.dataType.trim().toLowerCase();
    const title = form.title.trim();
    const storageKey = form.storageKey.trim();
    const note = form.note.trim();

    if (!Number.isInteger(orderId) || orderId <= 0) {
      setFormState({
        status: 'error',
        message: t('Vui lòng chọn đơn hàng hợp lệ.'),
      });
      return;
    }
    if (!/^[a-z0-9._-]{2,64}$/.test(dataType)) {
      setFormState({
        status: 'error',
        message: t('Loại dữ liệu không hợp lệ.'),
      });
      return;
    }
    if (title.length < 2 || title.length > 255) {
      setFormState({
        status: 'error',
        message: t('Tiêu đề dữ liệu không hợp lệ.'),
      });
      return;
    }
    if (storageKey.length > 1024) {
      setFormState({
        status: 'error',
        message: t('Đường dẫn ảnh/tài liệu quá dài.'),
      });
      return;
    }

    setFormState({ status: 'loading', message: t('Đang tải dữ liệu lên...') });

    try {
      const item = await createInternalOrderDataItem({
        orderId,
        dataType,
        title,
        storageKey: storageKey || null,
        metadata: {
          note,
          source: 'qc_factory_upload',
        },
      });
      setItems((previous) => [item, ...previous]);
      setForm({
        ...defaultFormState,
        orderId: form.orderId,
      });
      setFormState({
        status: 'success',
        message: t('Tải dữ liệu thành công. Trạng thái mặc định là Chờ duyệt.'),
      });
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : t('Không thể tải dữ liệu lên.');
      setFormState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Tải dữ liệu QC/Nhà máy')}
          description={t('QC/Nhà máy tải dữ liệu tiến độ theo đơn hàng.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Tải dữ liệu QC/Nhà máy')}
        description={t('QC/Nhà máy tải dữ liệu tiến độ theo đơn hàng.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Tải dữ liệu QC/Nhà máy')}</h1>
        <p>{t('Tải ảnh, ghi chú và dữ liệu công đoạn. Dữ liệu mới sẽ ở trạng thái Chờ duyệt.')}</p>
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
            onClick={() => void loadPageData()}
            disabled={loading}
          >
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

      {!actorCanUpload && (
        <ErrorBlock message={t('Tài khoản hiện tại không có quyền tải dữ liệu mới.')} />
      )}
      {error && <ErrorBlock message={error} />}
      {formState.status === 'success' && (
        <div className="state-block success-text">{formState.message}</div>
      )}

      <section className="admin-layout-grid admin-layout-grid-wide">
        <article className="form-card">
          <h2>{t('Tạo dữ liệu tải lên')}</h2>
          <form onSubmit={handleSubmit} className="admin-order-form">
            <label>
              {t('Đơn hàng')}
              <select
                value={form.orderId}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    orderId: event.target.value,
                  }))
                }
                required
                disabled={loading}
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
              {t('Loại dữ liệu')}
              <input
                value={form.dataType}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    dataType: event.target.value,
                  }))
                }
                placeholder="qc_report"
                required
                disabled={!actorCanUpload || formState.status === 'loading'}
              />
            </label>

            <label>
              {t('Tiêu đề')}
              <input
                value={form.title}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    title: event.target.value,
                  }))
                }
                placeholder={t('Ví dụ: Kiểm tra lô sơn ngày 2026-03-13')}
                required
                disabled={!actorCanUpload || formState.status === 'loading'}
              />
            </label>

            <label>
              {t('URL ảnh/tài liệu (tuỳ chọn)')}
              <input
                value={form.storageKey}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    storageKey: event.target.value,
                  }))
                }
                placeholder="https://..."
                disabled={!actorCanUpload || formState.status === 'loading'}
              />
            </label>

            <label className="admin-order-metadata">
              {t('Ghi chú')}
              <textarea
                rows={5}
                value={form.note}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    note: event.target.value,
                  }))
                }
                disabled={!actorCanUpload || formState.status === 'loading'}
              />
            </label>

            <div className="admin-order-form-actions">
              <button
                type="submit"
                className="button-solid"
                disabled={!actorCanUpload || formState.status === 'loading'}
              >
                {formState.status === 'loading' ? t('Đang xử lý...') : t('Tải dữ liệu lên')}
              </button>
            </div>

            {formState.status === 'error' && <ErrorBlock message={formState.message} />}
          </form>
        </article>

        <article className="form-card admin-users-card">
          <h2>{t('Dữ liệu mới nhất')}</h2>
          {loading && <LoadingBlock />}
          {!loading && items.length === 0 && (
            <p className="admin-empty">{t('Chưa có dữ liệu upload nào.')}</p>
          )}
          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Mã đơn')}</th>
                    <th>{t('Loại dữ liệu')}</th>
                    <th>{t('Tiêu đề')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Người tạo')}</th>
                    <th>{t('Cập nhật')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.orderNo}</td>
                      <td>{item.dataType}</td>
                      <td>{item.title}</td>
                      <td>
                        <span className={`admin-status-pill ${getStateClass(item.state)}`}>
                          {t(getStateLabel(item.state))}
                        </span>
                      </td>
                      <td>{item.createdByName ?? '-'}</td>
                      <td>{formatDate(item.updatedAt)}</td>
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
