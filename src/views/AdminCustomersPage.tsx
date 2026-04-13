import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  createInternalCustomer,
  getCurrentUser,
  listInternalCustomers,
  logoutInternal,
  updateInternalCustomer,
  type AppRole,
  type AuthUser,
  type InternalCustomer,
} from '../lib/internalAuth';

interface CustomerFormState {
  code: string;
  name: string;
  countryCode: string;
}

interface EditCustomerState extends CustomerFormState {
  customerId: number;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultCustomerForm: CustomerFormState = {
  code: '',
  name: '',
  countryCode: '',
};

const idleState: FormState = { status: 'idle', message: '' };

const MASTER_DATA_MANAGE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'sale_trading',
];

function canManageMasterData(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => MASTER_DATA_MANAGE_ROLES.includes(role));
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function normalizeCode(value: string): string {
  return value.trim().toUpperCase();
}

function normalizeCountryCode(value: string): string {
  return value.trim().toUpperCase();
}

export default function AdminCustomersPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/customers')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [items, setItems] = useState<InternalCustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createForm, setCreateForm] = useState<CustomerFormState>(defaultCustomerForm);
  const [createState, setCreateState] = useState<FormState>(idleState);
  const [editForm, setEditForm] = useState<EditCustomerState | null>(null);
  const [editState, setEditState] = useState<FormState>(idleState);

  const actorCanManageMasterData = useMemo(() => canManageMasterData(actor), [actor]);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const customers = await listInternalCustomers(200);
      setItems(customers);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : t('Không thể tải danh sách khách hàng.');
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
        await loadCustomers();
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
  }, [loadCustomers, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleCreateCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateState({ status: 'loading', message: t('Đang tạo khách hàng...') });

    const code = normalizeCode(createForm.code);
    const name = createForm.name.trim();
    const countryCode = normalizeCountryCode(createForm.countryCode);

    if (!/^[A-Z0-9._-]{2,64}$/.test(code)) {
      setCreateState({
        status: 'error',
        message: t('Mã khách hàng không hợp lệ.'),
      });
      return;
    }

    if (name.length < 2 || name.length > 191) {
      setCreateState({
        status: 'error',
        message: t('Tên khách hàng không hợp lệ.'),
      });
      return;
    }

    if (countryCode && !/^[A-Z]{2,8}$/.test(countryCode)) {
      setCreateState({
        status: 'error',
        message: t('Mã quốc gia không hợp lệ.'),
      });
      return;
    }

    try {
      const customer = await createInternalCustomer({
        code,
        name,
        countryCode: countryCode || null,
      });
      setItems((previous) => [customer, ...previous]);
      setCreateForm(defaultCustomerForm);
      setCreateState({
        status: 'success',
        message: t('Tạo khách hàng thành công.'),
      });
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : t('Không thể tạo khách hàng.');
      setCreateState({ status: 'error', message });
    }
  }

  function openEditForm(item: InternalCustomer) {
    if (!actorCanManageMasterData) {
      return;
    }

    setEditState(idleState);
    setEditForm({
      customerId: item.id,
      code: item.code,
      name: item.name,
      countryCode: item.countryCode ?? '',
    });
  }

  async function handleEditCustomer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editForm) {
      return;
    }

    setEditState({ status: 'loading', message: t('Đang cập nhật khách hàng...') });

    const code = normalizeCode(editForm.code);
    const name = editForm.name.trim();
    const countryCode = normalizeCountryCode(editForm.countryCode);

    if (!/^[A-Z0-9._-]{2,64}$/.test(code)) {
      setEditState({
        status: 'error',
        message: t('Mã khách hàng không hợp lệ.'),
      });
      return;
    }
    if (name.length < 2 || name.length > 191) {
      setEditState({
        status: 'error',
        message: t('Tên khách hàng không hợp lệ.'),
      });
      return;
    }
    if (countryCode && !/^[A-Z]{2,8}$/.test(countryCode)) {
      setEditState({
        status: 'error',
        message: t('Mã quốc gia không hợp lệ.'),
      });
      return;
    }

    try {
      const updated = await updateInternalCustomer(editForm.customerId, {
        code,
        name,
        countryCode: countryCode || null,
      });
      setItems((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item)),
      );
      setEditForm(null);
      setEditState({
        status: 'success',
        message: t('Cập nhật khách hàng thành công.'),
      });
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : t('Không thể cập nhật khách hàng.');
      setEditState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Quản trị khách hàng')}
          description={t('Quản trị danh sách khách hàng nội bộ.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Quản trị khách hàng')}
        description={t('Quản trị danh sách khách hàng nội bộ.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Quản trị khách hàng')}</h1>
        <p>{t('Danh sách, tạo mới và chỉnh sửa khách hàng phục vụ quản trị đơn hàng.')}</p>
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
            onClick={() => void loadCustomers()}
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

      {!actorCanManageMasterData && (
        <ErrorBlock message={t('Tài khoản hiện tại chỉ có quyền xem danh sách khách hàng.')} />
      )}

      {error && <ErrorBlock message={error} />}
      {createState.status === 'success' && (
        <div className="state-block success-text">{createState.message}</div>
      )}
      {editState.status === 'success' && (
        <div className="state-block success-text">{editState.message}</div>
      )}

      <section className="admin-layout-grid">
        {actorCanManageMasterData ? (
          <article className="form-card">
            <h2>{t('Tạo khách hàng mới')}</h2>
            <form onSubmit={handleCreateCustomer}>
              <label>
                {t('Mã khách hàng')}
                <input
                  value={createForm.code}
                  onChange={(event) =>
                    setCreateForm((previous) => ({
                      ...previous,
                      code: event.target.value,
                    }))
                  }
                  placeholder="MARUKATSU"
                  required
                  disabled={createState.status === 'loading'}
                />
              </label>

              <label>
                {t('Tên khách hàng')}
                <input
                  value={createForm.name}
                  onChange={(event) =>
                    setCreateForm((previous) => ({
                      ...previous,
                      name: event.target.value,
                    }))
                  }
                  required
                  disabled={createState.status === 'loading'}
                />
              </label>

              <label>
                {t('Mã quốc gia')}
                <input
                  value={createForm.countryCode}
                  onChange={(event) =>
                    setCreateForm((previous) => ({
                      ...previous,
                      countryCode: event.target.value,
                    }))
                  }
                  placeholder="JP"
                  disabled={createState.status === 'loading'}
                />
              </label>

              <button
                type="submit"
                className="button-solid"
                disabled={createState.status === 'loading'}
              >
                {createState.status === 'loading' ? t('Đang xử lý...') : t('Tạo khách hàng')}
              </button>

              {createState.status === 'error' && <ErrorBlock message={createState.message} />}
            </form>
          </article>
        ) : (
          <article className="form-card">
            <h2>{t('Tạo khách hàng mới')}</h2>
            <p className="admin-empty">
              {t('Tài khoản hiện tại không có quyền tạo hoặc chỉnh sửa khách hàng.')}
            </p>
          </article>
        )}

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách khách hàng')}</h2>
          {loading && <LoadingBlock />}
          {!loading && items.length === 0 && (
            <p className="admin-empty">{t('Chưa có khách hàng nào trong hệ thống.')}</p>
          )}

          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Mã khách hàng')}</th>
                    <th>{t('Tên khách hàng')}</th>
                    <th>{t('Mã quốc gia')}</th>
                    <th>{t('Cập nhật')}</th>
                    {actorCanManageMasterData && <th>{t('Thao tác')}</th>}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.countryCode ?? '-'}</td>
                      <td>{formatDate(item.updatedAt)}</td>
                      {actorCanManageMasterData && (
                        <td>
                          <button
                            type="button"
                            className="button-ghost admin-row-action"
                            onClick={() => openEditForm(item)}
                          >
                            {t('Sửa')}
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      </section>

      {editForm && actorCanManageMasterData && (
        <section className="admin-edit-overlay" role="dialog" aria-modal="true">
          <button
            type="button"
            className="admin-edit-backdrop"
            onClick={() => setEditForm(null)}
            aria-label={t('Đóng')}
          />
          <article className="admin-edit-panel">
            <div className="admin-edit-head">
              <h2>
                {t('Chỉnh sửa khách hàng')} #{editForm.customerId}
              </h2>
              <button type="button" className="admin-edit-close" onClick={() => setEditForm(null)}>
                ×
              </button>
            </div>

            <form onSubmit={handleEditCustomer} className="admin-edit-form">
              <label>
                {t('Mã khách hàng')}
                <input
                  value={editForm.code}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            code: event.target.value,
                          }
                        : previous,
                    )
                  }
                  required
                  disabled={editState.status === 'loading'}
                />
              </label>

              <label>
                {t('Tên khách hàng')}
                <input
                  value={editForm.name}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            name: event.target.value,
                          }
                        : previous,
                    )
                  }
                  required
                  disabled={editState.status === 'loading'}
                />
              </label>

              <label>
                {t('Mã quốc gia')}
                <input
                  value={editForm.countryCode}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            countryCode: event.target.value,
                          }
                        : previous,
                    )
                  }
                  placeholder="JP"
                  disabled={editState.status === 'loading'}
                />
              </label>

              <div className="admin-edit-actions">
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => setEditForm(null)}
                  disabled={editState.status === 'loading'}
                >
                  {t('Hủy')}
                </button>
                <button
                  type="submit"
                  className="button-solid"
                  disabled={editState.status === 'loading'}
                >
                  {editState.status === 'loading' ? t('Đang xử lý...') : t('Lưu thay đổi')}
                </button>
              </div>

              {editState.status === 'error' && <ErrorBlock message={editState.message} />}
            </form>
          </article>
        </section>
      )}
    </>
  );
}
