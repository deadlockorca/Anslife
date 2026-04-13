import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  createInternalFactory,
  getCurrentUser,
  listInternalFactories,
  logoutInternal,
  updateInternalFactory,
  type AppRole,
  type AuthUser,
  type InternalFactory,
} from '../lib/internalAuth';

interface FactoryFormState {
  code: string;
  name: string;
  location: string;
}

interface EditFactoryState extends FactoryFormState {
  factoryId: number;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFactoryForm: FactoryFormState = {
  code: '',
  name: '',
  location: '',
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

export default function AdminFactoriesPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/factories')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [items, setItems] = useState<InternalFactory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createForm, setCreateForm] = useState<FactoryFormState>(defaultFactoryForm);
  const [createState, setCreateState] = useState<FormState>(idleState);
  const [editForm, setEditForm] = useState<EditFactoryState | null>(null);
  const [editState, setEditState] = useState<FormState>(idleState);

  const actorCanManageMasterData = useMemo(() => canManageMasterData(actor), [actor]);

  const loadFactories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const factories = await listInternalFactories(200);
      setItems(factories);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : t('Không thể tải danh sách nhà máy.');
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
        await loadFactories();
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
  }, [loadFactories, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleCreateFactory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateState({ status: 'loading', message: t('Đang tạo nhà máy...') });

    const code = normalizeCode(createForm.code);
    const name = createForm.name.trim();
    const location = createForm.location.trim();

    if (!/^[A-Z0-9._-]{2,64}$/.test(code)) {
      setCreateState({
        status: 'error',
        message: t('Mã nhà máy không hợp lệ.'),
      });
      return;
    }

    if (name.length < 2 || name.length > 191) {
      setCreateState({
        status: 'error',
        message: t('Tên nhà máy không hợp lệ.'),
      });
      return;
    }

    if (location.length > 255) {
      setCreateState({
        status: 'error',
        message: t('Địa điểm nhà máy quá dài.'),
      });
      return;
    }

    try {
      const factory = await createInternalFactory({
        code,
        name,
        location: location || null,
      });
      setItems((previous) => [factory, ...previous]);
      setCreateForm(defaultFactoryForm);
      setCreateState({
        status: 'success',
        message: t('Tạo nhà máy thành công.'),
      });
    } catch (saveError) {
      const message =
        saveError instanceof Error ? saveError.message : t('Không thể tạo nhà máy.');
      setCreateState({ status: 'error', message });
    }
  }

  function openEditForm(item: InternalFactory) {
    if (!actorCanManageMasterData) {
      return;
    }

    setEditState(idleState);
    setEditForm({
      factoryId: item.id,
      code: item.code,
      name: item.name,
      location: item.location ?? '',
    });
  }

  async function handleEditFactory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editForm) {
      return;
    }

    setEditState({ status: 'loading', message: t('Đang cập nhật nhà máy...') });

    const code = normalizeCode(editForm.code);
    const name = editForm.name.trim();
    const location = editForm.location.trim();

    if (!/^[A-Z0-9._-]{2,64}$/.test(code)) {
      setEditState({
        status: 'error',
        message: t('Mã nhà máy không hợp lệ.'),
      });
      return;
    }
    if (name.length < 2 || name.length > 191) {
      setEditState({
        status: 'error',
        message: t('Tên nhà máy không hợp lệ.'),
      });
      return;
    }
    if (location.length > 255) {
      setEditState({
        status: 'error',
        message: t('Địa điểm nhà máy quá dài.'),
      });
      return;
    }

    try {
      const updated = await updateInternalFactory(editForm.factoryId, {
        code,
        name,
        location: location || null,
      });
      setItems((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item)),
      );
      setEditForm(null);
      setEditState({
        status: 'success',
        message: t('Cập nhật nhà máy thành công.'),
      });
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : t('Không thể cập nhật nhà máy.');
      setEditState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Quản trị nhà máy')}
          description={t('Quản trị danh sách nhà máy sản xuất.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Quản trị nhà máy')}
        description={t('Quản trị danh sách nhà máy sản xuất.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Quản trị nhà máy')}</h1>
        <p>{t('Danh sách, tạo mới và chỉnh sửa nhà máy trong hệ sinh thái sản xuất.')}</p>
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
            onClick={() => void loadFactories()}
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
        <ErrorBlock message={t('Tài khoản hiện tại chỉ có quyền xem danh sách nhà máy.')} />
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
            <h2>{t('Tạo nhà máy mới')}</h2>
            <form onSubmit={handleCreateFactory}>
              <label>
                {t('Mã nhà máy')}
                <input
                  value={createForm.code}
                  onChange={(event) =>
                    setCreateForm((previous) => ({
                      ...previous,
                      code: event.target.value,
                    }))
                  }
                  placeholder="F1"
                  required
                  disabled={createState.status === 'loading'}
                />
              </label>

              <label>
                {t('Tên nhà máy')}
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
                {t('Địa điểm')}
                <input
                  value={createForm.location}
                  onChange={(event) =>
                    setCreateForm((previous) => ({
                      ...previous,
                      location: event.target.value,
                    }))
                  }
                  placeholder={t('Đồng Nai, Việt Nam')}
                  disabled={createState.status === 'loading'}
                />
              </label>

              <button
                type="submit"
                className="button-solid"
                disabled={createState.status === 'loading'}
              >
                {createState.status === 'loading' ? t('Đang xử lý...') : t('Tạo nhà máy')}
              </button>

              {createState.status === 'error' && <ErrorBlock message={createState.message} />}
            </form>
          </article>
        ) : (
          <article className="form-card">
            <h2>{t('Tạo nhà máy mới')}</h2>
            <p className="admin-empty">
              {t('Tài khoản hiện tại không có quyền tạo hoặc chỉnh sửa nhà máy.')}
            </p>
          </article>
        )}

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách nhà máy')}</h2>
          {loading && <LoadingBlock />}
          {!loading && items.length === 0 && (
            <p className="admin-empty">{t('Chưa có nhà máy nào trong hệ thống.')}</p>
          )}

          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Mã nhà máy')}</th>
                    <th>{t('Tên nhà máy')}</th>
                    <th>{t('Địa điểm')}</th>
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
                      <td>{item.location ?? '-'}</td>
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
                {t('Chỉnh sửa nhà máy')} #{editForm.factoryId}
              </h2>
              <button type="button" className="admin-edit-close" onClick={() => setEditForm(null)}>
                ×
              </button>
            </div>

            <form onSubmit={handleEditFactory} className="admin-edit-form">
              <label>
                {t('Mã nhà máy')}
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
                {t('Tên nhà máy')}
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
                {t('Địa điểm')}
                <input
                  value={editForm.location}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            location: event.target.value,
                          }
                        : previous,
                    )
                  }
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
