import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  createInternalUser,
  deleteInternalUser,
  getCurrentUser,
  listInternalUsers,
  logoutInternal,
  updateInternalUser,
  type ActorScope,
  type AppRole,
  type AuthUser,
  type UserProfile,
} from '../lib/internalAuth';

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

interface QcAccountFormState {
  email: string;
  fullName: string;
  password: string;
  isActive: boolean;
}

interface AccountEditState {
  userId: number;
  fullName: string;
  password: string;
  isActive: boolean;
  roles: AppRole[];
  scopes: ActorScope[];
}

const idleFormState: FormState = { status: 'idle', message: '' };

const emptyCreateForm: QcAccountFormState = {
  email: '',
  fullName: '',
  password: '',
  isActive: true,
};

const qcReportScope: ActorScope = {
  type: 'explicit',
  value: 'attendance:self',
};

const accessPresets = [
  {
    key: 'super_admin_global',
    label: 'Quản trị tối cao',
    roles: ['super_admin'],
    scopes: [{ type: 'global', value: '*' }],
  },
  {
    key: 'system_admin_global',
    label: 'Quản trị hệ thống',
    roles: ['system_admin'],
    scopes: [{ type: 'global', value: '*' }],
  },
  {
    key: 'qc_report',
    label: 'QC báo cáo',
    roles: ['qc'],
    scopes: [qcReportScope],
  },
] satisfies Array<{
  key: string;
  label: string;
  roles: AppRole[];
  scopes: ActorScope[];
}>;

function getAccessPresetKey(roles: AppRole[], scopes: ActorScope[]): string {
  if (roles.length === 1 && roles[0] === 'qc') {
    return 'qc_report';
  }
  if (roles.includes('system_admin')) {
    return 'system_admin_global';
  }
  if (roles.includes('super_admin')) {
    return 'super_admin_global';
  }

  return 'custom';
}

function isPrivilegedRoles(roles: AppRole[]): boolean {
  return roles.includes('super_admin') || roles.includes('system_admin');
}

function isAdminManager(actor: AuthUser | null): boolean {
  return Boolean(
    actor?.roles.includes('super_admin') || actor?.roles.includes('system_admin'),
  );
}

function isQcReportUser(user: Pick<UserProfile, 'roles'>): boolean {
  return user.roles.length === 1 && user.roles[0] === 'qc';
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

export default function AdminUsersPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/users')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [createForm, setCreateForm] = useState<QcAccountFormState>(emptyCreateForm);
  const [createState, setCreateState] = useState<FormState>(idleFormState);
  const [editForm, setEditForm] = useState<AccountEditState | null>(null);
  const [editState, setEditState] = useState<FormState>(idleFormState);
  const [deleteState, setDeleteState] = useState<FormState>(idleFormState);

  const qcUsers = useMemo(() => users.filter(isQcReportUser), [users]);
  const adminUsers = useMemo(() => users.filter((user) => !isQcReportUser(user)), [users]);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError('');
    try {
      const items = await listInternalUsers();
      setUsers(items);
    } catch (error) {
      setUsersError(
        error instanceof Error ? error.message : t('Không thể tải danh sách tài khoản.'),
      );
    } finally {
      setUsersLoading(false);
    }
  }, [t]);

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
        if (isAdminManager(currentUser)) {
          await loadUsers();
        }
      } catch (error) {
        if (mounted) {
          setUsersError(
            error instanceof Error ? error.message : t('Không thể kiểm tra quyền truy cập.'),
          );
        }
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
  }, [loadUsers, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateState({ status: 'loading', message: t('Đang tạo tài khoản QC...') });

    try {
      const createdUser = await createInternalUser({
        email: createForm.email.trim().toLowerCase(),
        fullName: createForm.fullName.trim(),
        password: createForm.password,
        isActive: createForm.isActive,
        roles: ['qc'],
        scopes: [qcReportScope],
      });

      setUsers((previous) => [createdUser, ...previous]);
      setCreateForm(emptyCreateForm);
      setCreateState({
        status: 'success',
        message: t('Tạo tài khoản QC thành công.'),
      });
    } catch (error) {
      setCreateState({
        status: 'error',
        message: error instanceof Error ? error.message : t('Không thể tạo tài khoản.'),
      });
    }
  }

  function openEditForm(user: UserProfile) {
    setEditState(idleFormState);
    setEditForm({
      userId: user.id,
      fullName: user.fullName,
      password: '',
      isActive: user.isActive,
      roles: [...user.roles],
      scopes: isQcReportUser(user) ? [qcReportScope] : [...user.scopes],
    });
  }

  async function handleEditUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editForm) {
      return;
    }

    const isEditingQcUser = editForm.roles.length === 1 && editForm.roles[0] === 'qc';
    if (editForm.userId === actor?.id && (!editForm.isActive || !isPrivilegedRoles(editForm.roles))) {
      setEditState({
        status: 'error',
        message: t('Bạn không thể tự khóa hoặc tự bỏ quyền quản trị của tài khoản đang đăng nhập.'),
      });
      return;
    }

    setEditState({ status: 'loading', message: t('Đang cập nhật tài khoản...') });
    try {
      const updatedUser = await updateInternalUser(editForm.userId, {
        fullName: editForm.fullName.trim(),
        ...(editForm.password.trim() ? { password: editForm.password.trim() } : {}),
        isActive: editForm.isActive,
        roles: editForm.roles,
        scopes: isEditingQcUser ? [qcReportScope] : editForm.scopes,
      });

      setUsers((previous) =>
        previous.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
      setEditForm(null);
      setEditState({
        status: 'success',
        message: t('Cập nhật tài khoản thành công.'),
      });
    } catch (error) {
      setEditState({
        status: 'error',
        message: error instanceof Error ? error.message : t('Không thể cập nhật tài khoản.'),
      });
    }
  }

  async function handleDeleteUser(user: UserProfile) {
    if (!isQcReportUser(user) || user.id === actor?.id) {
      return;
    }

    setDeleteState({ status: 'loading', message: t('Đang xóa tài khoản QC...') });
    try {
      await deleteInternalUser(user.id);
      setUsers((previous) => previous.filter((item) => item.id !== user.id));
      setDeleteState({
        status: 'success',
        message: t('Đã xóa tài khoản QC.'),
      });
    } catch (error) {
      setDeleteState({
        status: 'error',
        message: error instanceof Error ? error.message : t('Không thể xóa tài khoản.'),
      });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Tài khoản QC')}
          description={t('Tạo và quản lý tài khoản QC báo cáo công việc.')}
        />
        <LoadingBlock />
      </>
    );
  }

  if (!isAdminManager(actor)) {
    return (
      <>
        <Seo
          title={t('Tài khoản QC')}
          description={t('Tạo và quản lý tài khoản QC báo cáo công việc.')}
        />
        <section className="page-hero">
          <p className="kicker">{t('QUẢN TRỊ')}</p>
          <h1>{t('Tài khoản QC')}</h1>
          <p>{t('Bạn không có quyền quản lý tài khoản.')}</p>
        </section>
        <ErrorBlock message={t('Chỉ tài khoản quản trị mới được tạo tài khoản QC.')} />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Tài khoản QC')}
        description={t('Tạo và quản lý tài khoản QC báo cáo công việc.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Tài khoản QC')}</h1>
        <p>
          {t(
            'Tạo tài khoản QC chỉ dùng cho báo cáo công việc, check-in/check-out và upload ảnh.',
          )}
        </p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button type="button" className="button-ghost" onClick={() => void loadUsers()}>
            {t('Làm mới')}
          </button>
          <Link to={toLocalizedPath('/admin/dashboard')} className="button-ghost">
            {t('Tổng quan')}
          </Link>
          <button type="button" className="button-ghost" onClick={() => void handleLogout()}>
            {t('Đăng xuất')}
          </button>
        </div>
      </section>

      <AdminModuleTabs actor={actor} />

      {usersError && <ErrorBlock message={usersError} />}
      {createState.status === 'error' && <ErrorBlock message={createState.message} />}
      {editState.status === 'error' && <ErrorBlock message={editState.message} />}
      {deleteState.status === 'error' && <ErrorBlock message={deleteState.message} />}
      {createState.status === 'success' && (
        <div className="state-block success-text">{createState.message}</div>
      )}
      {editState.status === 'success' && (
        <div className="state-block success-text">{editState.message}</div>
      )}
      {deleteState.status === 'success' && (
        <div className="state-block success-text">{deleteState.message}</div>
      )}

      <section className="form-card">
        <h2>{t('Tạo tài khoản QC báo cáo')}</h2>
        <form className="admin-order-form" onSubmit={handleCreateUser}>
          <label>
            {t('Email')}
            <input
              type="email"
              value={createForm.email}
              onChange={(event) =>
                setCreateForm((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
              required
              disabled={createState.status === 'loading'}
            />
          </label>
          <label>
            {t('Họ tên')}
            <input
              value={createForm.fullName}
              onChange={(event) =>
                setCreateForm((previous) => ({
                  ...previous,
                  fullName: event.target.value,
                }))
              }
              required
              disabled={createState.status === 'loading'}
            />
          </label>
          <label>
            {t('Mật khẩu')}
            <input
              type="password"
              value={createForm.password}
              onChange={(event) =>
                setCreateForm((previous) => ({
                  ...previous,
                  password: event.target.value,
                }))
              }
              required
              minLength={8}
              disabled={createState.status === 'loading'}
            />
          </label>
          <label className="admin-checkbox">
            <input
              type="checkbox"
              checked={createForm.isActive}
              onChange={(event) =>
                setCreateForm((previous) => ({
                  ...previous,
                  isActive: event.target.checked,
                }))
              }
              disabled={createState.status === 'loading'}
            />
            {t('Kích hoạt tài khoản')}
          </label>
          <div className="admin-scope-chip-list">
            <span className="admin-role-badge">QC</span>
            <span className="admin-scope-chip">
              <strong>{t('QC báo cáo')}</strong>
              <span>{qcReportScope.value}</span>
            </span>
          </div>
          <div className="admin-order-form-actions">
            <button
              type="submit"
              className="button-solid"
              disabled={createState.status === 'loading'}
            >
              {t('Tạo tài khoản QC')}
            </button>
          </div>
        </form>
      </section>

      <section className="form-card admin-users-card">
        <h2>{t('Danh sách tài khoản QC báo cáo')}</h2>
        {usersLoading && <LoadingBlock />}
        {!usersLoading && qcUsers.length === 0 && (
          <p className="admin-empty">{t('Chưa có tài khoản QC báo cáo nào.')}</p>
        )}
        {!usersLoading && qcUsers.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>{t('Họ tên')}</th>
                  <th>{t('Email')}</th>
                  <th>{t('Vai trò')}</th>
                  <th>{t('Scope')}</th>
                  <th>{t('Trạng thái')}</th>
                  <th>{t('Cập nhật')}</th>
                  <th>{t('Thao tác')}</th>
                </tr>
              </thead>
              <tbody>
                {qcUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className="admin-role-badge">QC</span>
                    </td>
                    <td>
                      <span className="admin-scope-cell">{qcReportScope.value}</span>
                    </td>
                    <td>
                      <span
                        className={`admin-status-pill ${
                          user.isActive ? 'is-order-approved_internal' : 'is-order-archived'
                        }`}
                      >
                        {user.isActive ? t('Đang hoạt động') : t('Đã khóa')}
                      </span>
                    </td>
                    <td>{formatDate(user.updatedAt)}</td>
                    <td>
                      <div className="admin-edit-actions">
                        <button
                          type="button"
                          className="button-ghost"
                          onClick={() => openEditForm(user)}
                        >
                          {t('Sửa')}
                        </button>
                        <button
                          type="button"
                          className="button-ghost danger"
                          onClick={() => void handleDeleteUser(user)}
                          disabled={deleteState.status === 'loading'}
                        >
                          {t('Xóa')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {adminUsers.length > 0 && (
        <section className="form-card admin-users-card">
          <h2>{t('Tài khoản quản trị hiện có')}</h2>
          <p className="admin-empty">
            {t('Có thể sửa họ tên, mật khẩu, trạng thái và quyền tài khoản.')}
          </p>
          <div className="admin-table-wrap">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>{t('Họ tên')}</th>
                  <th>{t('Email')}</th>
                  <th>{t('Vai trò')}</th>
                  <th>{t('Trạng thái')}</th>
                  <th>{t('Thao tác')}</th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="admin-role-badge-list">
                        {user.roles.map((role) => (
                          <span key={role} className="admin-role-badge">
                            {role}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{user.isActive ? t('Đang hoạt động') : t('Đã khóa')}</td>
                    <td>
                      <button
                        type="button"
                        className="button-ghost"
                        onClick={() => openEditForm(user)}
                      >
                        {t('Sửa')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {editForm && (
        <div className="admin-edit-overlay" role="dialog" aria-modal="true">
          <button
            type="button"
            className="admin-edit-backdrop"
            aria-label={t('Đóng')}
            onClick={() => setEditForm(null)}
          />
          <form className="admin-edit-panel admin-edit-form" onSubmit={handleEditUser}>
            <div className="admin-edit-head">
              <h2>{t('Chỉnh sửa tài khoản')}</h2>
              <button type="button" className="admin-edit-close" onClick={() => setEditForm(null)}>
                ×
              </button>
            </div>
            <label>
              {t('Họ tên')}
              <input
                value={editForm.fullName}
                onChange={(event) =>
                  setEditForm((previous) =>
                    previous ? { ...previous, fullName: event.target.value } : previous,
                  )
                }
                required
                disabled={editState.status === 'loading'}
              />
            </label>
            <label>
              {t('Mật khẩu mới (để trống nếu không đổi)')}
              <input
                type="password"
                value={editForm.password}
                onChange={(event) =>
                  setEditForm((previous) =>
                    previous ? { ...previous, password: event.target.value } : previous,
                  )
                }
                minLength={8}
                disabled={editState.status === 'loading'}
              />
            </label>
            <label>
              {t('Quyền tài khoản')}
              <select
                value={getAccessPresetKey(editForm.roles, editForm.scopes)}
                onChange={(event) => {
                  const preset = accessPresets.find((item) => item.key === event.target.value);
                  if (!preset) {
                    return;
                  }
                  setEditForm((previous) =>
                    previous
                      ? {
                          ...previous,
                          roles: [...preset.roles],
                          scopes: preset.scopes.map((scope) => ({ ...scope })),
                        }
                      : previous,
                  );
                }}
                disabled={editState.status === 'loading'}
              >
                {getAccessPresetKey(editForm.roles, editForm.scopes) === 'custom' && (
                  <option value="custom">{t('Quyền tùy chỉnh hiện có')}</option>
                )}
                {accessPresets.map((preset) => (
                  <option key={preset.key} value={preset.key}>
                    {t(preset.label)}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-checkbox">
              <input
                type="checkbox"
                checked={editForm.isActive}
                onChange={(event) =>
                  setEditForm((previous) =>
                    previous ? { ...previous, isActive: event.target.checked } : previous,
                  )
                }
                disabled={editState.status === 'loading'}
              />
              {t('Kích hoạt tài khoản')}
            </label>
            <div className="admin-scope-chip-list">
              {editForm.roles.map((role) => (
                <span key={role} className="admin-role-badge">
                  {role === 'qc' ? 'QC' : role}
                </span>
              ))}
              {editForm.scopes.map((scope) => (
                <span key={`${scope.type}:${scope.value}`} className="admin-scope-chip">
                  <strong>{scope.type === 'explicit' ? t('QC báo cáo') : scope.type}</strong>
                  <span>{scope.value}</span>
                </span>
              ))}
            </div>
            <div className="admin-edit-actions">
              <button type="button" className="button-ghost" onClick={() => setEditForm(null)}>
                {t('Hủy')}
              </button>
              <button
                type="submit"
                className="button-solid"
                disabled={editState.status === 'loading'}
              >
                {t('Lưu thay đổi')}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
