import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  getCurrentUser,
  listInternalOrderLogistics,
  listInternalOrders,
  logoutInternal,
  updateInternalOrderLogistics,
  upsertInternalOrderLogistics,
  type AppRole,
  type AuthUser,
  type InternalOrder,
  type InternalOrderLogistics,
} from '../lib/internalAuth';

interface LogisticsFilters {
  orderNo: string;
  customerCode: string;
  factoryCode: string;
}

interface LogisticsForm {
  logisticsId: number | null;
  orderId: string;
  etd: string;
  eta: string;
  containerNo: string;
  departurePort: string;
  arrivalPort: string;
  shippingLine: string;
  vesselName: string;
  note: string;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const LOGISTICS_WRITE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'sale_trading',
  'factory_partner',
];

const defaultFilters: LogisticsFilters = {
  orderNo: '',
  customerCode: '',
  factoryCode: '',
};

const defaultForm: LogisticsForm = {
  logisticsId: null,
  orderId: '',
  etd: '',
  eta: '',
  containerNo: '',
  departurePort: '',
  arrivalPort: '',
  shippingLine: '',
  vesselName: '',
  note: '',
};

const idleState: FormState = { status: 'idle', message: '' };

function canWriteLogistics(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => LOGISTICS_WRITE_ROLES.includes(role));
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

export default function AdminLogisticsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/logistics')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [orders, setOrders] = useState<InternalOrder[]>([]);
  const [items, setItems] = useState<InternalOrderLogistics[]>([]);
  const [filters, setFilters] = useState<LogisticsFilters>(defaultFilters);
  const [form, setForm] = useState<LogisticsForm>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState<FormState>(idleState);

  const actorCanWrite = useMemo(() => canWriteLogistics(actor), [actor]);

  const loadPageData = useCallback(
    async (nextFilters: LogisticsFilters = filters) => {
      setLoading(true);
      setError('');
      try {
        const [orderList, logisticsList] = await Promise.all([
          listInternalOrders({ perPage: 200 }),
          listInternalOrderLogistics({
            perPage: 200,
            orderNo: nextFilters.orderNo.trim() || undefined,
            customerCode: nextFilters.customerCode.trim() || undefined,
            factoryCode: nextFilters.factoryCode.trim() || undefined,
          }),
        ]);
        setOrders(orderList);
        setItems(logisticsList);
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : t('Không thể tải dữ liệu vận chuyển.');
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

  function startEdit(item: InternalOrderLogistics) {
    if (!actorCanWrite) {
      return;
    }
    setFormState(idleState);
    setForm({
      logisticsId: item.id,
      orderId: String(item.orderId),
      etd: item.etd ?? '',
      eta: item.eta ?? '',
      containerNo: item.containerNo ?? '',
      departurePort: item.departurePort ?? '',
      arrivalPort: item.arrivalPort ?? '',
      shippingLine: item.shippingLine ?? '',
      vesselName: item.vesselName ?? '',
      note: item.note ?? '',
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

    setFormState({ status: 'loading', message: t('Đang lưu dữ liệu vận chuyển...') });
    try {
      const payload = {
        orderId,
        etd: form.etd || null,
        eta: form.eta || null,
        containerNo: form.containerNo || null,
        departurePort: form.departurePort || null,
        arrivalPort: form.arrivalPort || null,
        shippingLine: form.shippingLine || null,
        vesselName: form.vesselName || null,
        note: form.note || null,
      };

      const saved =
        form.logisticsId == null
          ? await upsertInternalOrderLogistics(payload)
          : await updateInternalOrderLogistics(form.logisticsId, {
              etd: payload.etd,
              eta: payload.eta,
              containerNo: payload.containerNo,
              departurePort: payload.departurePort,
              arrivalPort: payload.arrivalPort,
              shippingLine: payload.shippingLine,
              vesselName: payload.vesselName,
              note: payload.note,
            });

      setItems((previous) => {
        const exists = previous.some((item) => item.id === saved.id);
        if (exists) {
          return previous.map((item) => (item.id === saved.id ? saved : item));
        }
        return [saved, ...previous];
      });
      setFormState({ status: 'success', message: t('Lưu dữ liệu vận chuyển thành công.') });
      resetForm();
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : t('Không thể lưu dữ liệu vận chuyển.');
      setFormState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo title={t('Vận chuyển')} description={t('Quản lý ETD/ETA và thông tin vận chuyển.')} />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo title={t('Vận chuyển')} description={t('Quản lý ETD/ETA và thông tin vận chuyển.')} />

      <section className="page-hero">
        <p className="kicker">{t('PORTAL LÀM VIỆC')}</p>
        <h1>{t('Lịch giao hàng & Vận chuyển')}</h1>
        <p>{t('Quản lý ETD, ETA, container, cảng đi/đến và hãng tàu theo từng đơn hàng.')}</p>
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
            {t('Mã khách hàng')}
            <input
              value={filters.customerCode}
              onChange={(event) =>
                setFilters((p) => ({ ...p, customerCode: event.target.value }))
              }
              placeholder="CUS..."
            />
          </label>
          <label>
            {t('Mã nhà máy')}
            <input
              value={filters.factoryCode}
              onChange={(event) =>
                setFilters((p) => ({ ...p, factoryCode: event.target.value }))
              }
              placeholder="FAC..."
            />
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
          <h2>{form.logisticsId ? t('Cập nhật vận chuyển') : t('Tạo/Cập nhật vận chuyển')}</h2>
          {!actorCanWrite && (
            <p className="admin-empty">
              {t('Bạn chỉ có quyền xem dữ liệu vận chuyển trong phạm vi được cấp.')}
            </p>
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
                ETD
                <input
                  type="date"
                  value={form.etd}
                  onChange={(event) => setForm((p) => ({ ...p, etd: event.target.value }))}
                />
              </label>
              <label>
                ETA
                <input
                  type="date"
                  value={form.eta}
                  onChange={(event) => setForm((p) => ({ ...p, eta: event.target.value }))}
                />
              </label>
              <label>
                Container No.
                <input
                  value={form.containerNo}
                  onChange={(event) =>
                    setForm((p) => ({ ...p, containerNo: event.target.value }))
                  }
                />
              </label>
              <label>
                {t('Cảng đi')}
                <input
                  value={form.departurePort}
                  onChange={(event) =>
                    setForm((p) => ({ ...p, departurePort: event.target.value }))
                  }
                />
              </label>
              <label>
                {t('Cảng đến')}
                <input
                  value={form.arrivalPort}
                  onChange={(event) =>
                    setForm((p) => ({ ...p, arrivalPort: event.target.value }))
                  }
                />
              </label>
              <label>
                {t('Hãng tàu')}
                <input
                  value={form.shippingLine}
                  onChange={(event) =>
                    setForm((p) => ({ ...p, shippingLine: event.target.value }))
                  }
                />
              </label>
              <label>
                {t('Tàu / chuyến')}
                <input
                  value={form.vesselName}
                  onChange={(event) =>
                    setForm((p) => ({ ...p, vesselName: event.target.value }))
                  }
                />
              </label>
              <label className="admin-order-metadata">
                {t('Ghi chú vận chuyển')}
                <textarea
                  rows={4}
                  value={form.note}
                  onChange={(event) => setForm((p) => ({ ...p, note: event.target.value }))}
                />
              </label>
              <div className="admin-order-form-actions">
                <button type="button" className="button-ghost" onClick={resetForm}>
                  {t('Đặt lại')}
                </button>
                <button type="submit" className="button-solid">
                  {form.logisticsId ? t('Cập nhật') : t('Lưu vận chuyển')}
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
          <h2>{t('Danh sách vận chuyển')}</h2>
          {loading ? (
            <LoadingBlock />
          ) : items.length === 0 ? (
            <p className="admin-empty">{t('Chưa có dữ liệu vận chuyển.')}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>{t('Đơn hàng')}</th>
                  <th>ETD</th>
                  <th>ETA</th>
                  <th>Container</th>
                  <th>{t('Cảng đi')}</th>
                  <th>{t('Cảng đến')}</th>
                  <th>{t('Vận chuyển')}</th>
                  <th>{t('Cập nhật')}</th>
                  {actorCanWrite && <th>{t('Hành động')}</th>}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.orderNo}</td>
                    <td>{item.etd ?? '-'}</td>
                    <td>{item.eta ?? '-'}</td>
                    <td>{item.containerNo ?? '-'}</td>
                    <td>{item.departurePort ?? '-'}</td>
                    <td>{item.arrivalPort ?? '-'}</td>
                    <td>{item.shippingLine ?? '-'}</td>
                    <td>{formatDate(item.updatedAt)}</td>
                    {actorCanWrite && (
                      <td>
                        <button
                          type="button"
                          className="button-ghost admin-row-action"
                          onClick={() => startEdit(item)}
                        >
                          {t('Sửa')}
                        </button>
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
