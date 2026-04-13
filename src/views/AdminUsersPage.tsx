import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  APP_ROLE_OPTIONS,
  type AppRole,
  type ActorScope,
  formatScopes,
  getCurrentUser,
  type AuthUser,
  listInternalCustomers,
  listInternalFactories,
  listInternalOrders,
  listInternalUsers,
  logoutInternal,
  SCOPE_TYPE_OPTIONS,
  type ScopeType,
  createInternalUser,
  deleteInternalUser,
  updateInternalUser,
  type UserProfile,
} from '../lib/internalAuth';

interface CreateFormState {
  email: string;
  fullName: string;
  password: string;
  isActive: boolean;
  roles: AppRole[];
  scopes: ActorScope[];
}

interface EditFormState {
  userId: number;
  fullName: string;
  password: string;
  isActive: boolean;
  roles: AppRole[];
  scopes: ActorScope[];
}

interface ScopeDraftState {
  type: ScopeType;
  value: string;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const idleFormState: FormState = { status: 'idle', message: '' };

const defaultCreateFormState: CreateFormState = {
  email: '',
  fullName: '',
  password: '',
  isActive: true,
  roles: ['sale_trading'],
  scopes: [{ type: 'global', value: '*' }],
};

const defaultScopeDraftState: ScopeDraftState = {
  type: 'global',
  value: '*',
};

const defaultScopeReferences: Record<ScopeType, string[]> = {
  global: ['*'],
  customer: [],
  factory: [],
  order: [],
  market: ['VN', 'JP', 'KR', 'US', 'EU'],
  project: [],
  supplier: [],
  material: ['wood', 'plywood', 'mdf', 'hardware', 'paint', 'fabric', 'foam'],
  buyer_company: [],
  explicit: [],
};

const scopeTypeLabelMap: Record<ScopeType, string> = {
  global: 'Toàn hệ thống',
  customer: 'Khách hàng',
  factory: 'Nhà máy',
  order: 'Đơn hàng',
  market: 'Thị trường',
  project: 'Dự án',
  supplier: 'Nhà cung cấp',
  material: 'Vật liệu',
  buyer_company: 'Công ty buyer',
  explicit: 'Phạm vi đặc biệt',
};

function toggleRoleInList(currentRoles: AppRole[], role: AppRole): AppRole[] {
  if (currentRoles.includes(role)) {
    return currentRoles.filter((item) => item !== role);
  }

  return [...currentRoles, role];
}

function parseRoleLabel(role: AppRole): string {
  return APP_ROLE_OPTIONS.find((item) => item.code === role)?.label ?? role;
}

function isPrivilegedRole(role: AppRole): boolean {
  return role === 'super_admin' || role === 'system_admin';
}

function hasPrivilegedRole(roles: AppRole[]): boolean {
  return roles.some((role) => isPrivilegedRole(role));
}

function dedupeScopeList(scopes: ActorScope[]): ActorScope[] {
  const unique = new Map<string, ActorScope>();
  for (const scope of scopes) {
    const type = scope.type;
    const value = scope.value.trim();
    if (!value) {
      continue;
    }

    unique.set(`${type}:${value}`, { type, value });
  }

  return Array.from(unique.values());
}

function getScopeTypeLabel(type: ScopeType): string {
  return scopeTypeLabelMap[type] ?? type;
}

function getScopeDraftDefaultValue(type: ScopeType): string {
  return type === 'global' ? '*' : '';
}

function appendScopeToList(currentScopes: ActorScope[], draft: ScopeDraftState): ActorScope[] {
  const value = draft.type === 'global' ? '*' : draft.value.trim();
  if (!value) {
    return currentScopes;
  }

  return dedupeScopeList([...currentScopes, { type: draft.type, value }]);
}

function collectScopeValues(scopes: ActorScope[], type: ScopeType): string[] {
  const values = scopes
    .filter((scope) => scope.type === type)
    .map((scope) => scope.value.trim())
    .filter(Boolean);

  return Array.from(new Set(values));
}

function mergeScopeValues(...valueGroups: readonly string[][]): string[] {
  const unique = new Set<string>();
  for (const values of valueGroups) {
    for (const value of values) {
      const normalized = value.trim();
      if (normalized) {
        unique.add(normalized);
      }
    }
  }

  return Array.from(unique.values());
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
  const [createForm, setCreateForm] = useState<CreateFormState>(defaultCreateFormState);
  const [createState, setCreateState] = useState<FormState>(idleFormState);
  const [createScopeDraft, setCreateScopeDraft] = useState<ScopeDraftState>(
    defaultScopeDraftState,
  );
  const [editForm, setEditForm] = useState<EditFormState | null>(null);
  const [editState, setEditState] = useState<FormState>(idleFormState);
  const [editScopeDraft, setEditScopeDraft] = useState<ScopeDraftState>(defaultScopeDraftState);
  const [deleteState, setDeleteState] = useState<FormState>(idleFormState);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [scopeReferenceLoading, setScopeReferenceLoading] = useState(false);
  const [scopeReferenceMap, setScopeReferenceMap] = useState<Record<ScopeType, string[]>>(
    defaultScopeReferences,
  );

  const isAdminManager = useMemo(() => {
    if (!actor) {
      return false;
    }

    return (
      actor.roles.includes('super_admin') || actor.roles.includes('system_admin')
    );
  }, [actor]);
  const actorIsSuperAdmin = useMemo(
    () => Boolean(actor?.roles.includes('super_admin')),
    [actor],
  );
  const editableRoleOptions = useMemo(
    () =>
      actorIsSuperAdmin
        ? APP_ROLE_OPTIONS
        : APP_ROLE_OPTIONS.filter((role) => !isPrivilegedRole(role.code)),
    [actorIsSuperAdmin],
  );
  const editingUser = useMemo(
    () => (editForm ? users.find((user) => user.id === editForm.userId) ?? null : null),
    [editForm, users],
  );
  const canEditUser = useCallback(
    (user: UserProfile) => {
      if (!isAdminManager) {
        return false;
      }

      if (actorIsSuperAdmin) {
        return true;
      }

      return !hasPrivilegedRole(user.roles);
    },
    [actorIsSuperAdmin, isAdminManager],
  );

  const canDeleteUser = useCallback(
    (user: UserProfile) => {
      if (!canEditUser(user)) {
        return false;
      }

      if (!actor) {
        return false;
      }

      return user.id !== actor.id;
    },
    [actor, canEditUser],
  );
  const createScopeValueOptions = useMemo(
    () =>
      mergeScopeValues(
        scopeReferenceMap[createScopeDraft.type],
        collectScopeValues(createForm.scopes, createScopeDraft.type),
        createScopeDraft.type === 'global' ? ['*'] : [],
      ),
    [createForm.scopes, createScopeDraft.type, scopeReferenceMap],
  );
  const editScopeValueOptions = useMemo(
    () =>
      mergeScopeValues(
        scopeReferenceMap[editScopeDraft.type],
        collectScopeValues(editForm?.scopes ?? [], editScopeDraft.type),
        editScopeDraft.type === 'global' ? ['*'] : [],
      ),
    [editForm?.scopes, editScopeDraft.type, scopeReferenceMap],
  );

  const loadScopeReferences = useCallback(async () => {
    setScopeReferenceLoading(true);
    try {
      const [customersResult, factoriesResult, ordersResult] = await Promise.allSettled([
        listInternalCustomers(200),
        listInternalFactories(200),
        listInternalOrders({ perPage: 200 }),
      ]);

      const customerCodes =
        customersResult.status === 'fulfilled'
          ? customersResult.value.map((item) => item.code.trim()).filter(Boolean)
          : [];
      const factoryCodes =
        factoriesResult.status === 'fulfilled'
          ? factoriesResult.value.map((item) => item.code.trim()).filter(Boolean)
          : [];
      const orderCodes =
        ordersResult.status === 'fulfilled'
          ? ordersResult.value.map((item) => item.orderNo.trim()).filter(Boolean)
          : [];

      setScopeReferenceMap((previous) => ({
        ...previous,
        customer: mergeScopeValues(previous.customer, customerCodes),
        buyer_company: mergeScopeValues(previous.buyer_company, customerCodes),
        factory: mergeScopeValues(previous.factory, factoryCodes),
        order: mergeScopeValues(previous.order, orderCodes),
      }));
    } finally {
      setScopeReferenceLoading(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    setUsersError('');
    try {
      const items = await listInternalUsers();
      setUsers(items);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : t('Không thể tải danh sách tài khoản.');
      setUsersError(message);
    } finally {
      setUsersLoading(false);
    }
  }, [t]);

  useEffect(() => {
    if (!isAdminManager) {
      return;
    }

    void loadScopeReferences();
  }, [isAdminManager, loadScopeReferences]);

  useEffect(() => {
    const scopedValues = {
      global: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'global',
      ),
      customer: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'customer',
      ),
      factory: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'factory',
      ),
      order: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'order',
      ),
      market: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'market',
      ),
      project: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'project',
      ),
      supplier: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'supplier',
      ),
      material: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'material',
      ),
      buyer_company: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'buyer_company',
      ),
      explicit: collectScopeValues(
        users.flatMap((user) => user.scopes),
        'explicit',
      ),
    } satisfies Record<ScopeType, string[]>;

    setScopeReferenceMap((previous) => ({
      global: mergeScopeValues(previous.global, scopedValues.global, ['*']),
      customer: mergeScopeValues(previous.customer, scopedValues.customer),
      factory: mergeScopeValues(previous.factory, scopedValues.factory),
      order: mergeScopeValues(previous.order, scopedValues.order),
      market: mergeScopeValues(previous.market, scopedValues.market, ['VN', 'JP', 'KR', 'US', 'EU']),
      project: mergeScopeValues(previous.project, scopedValues.project),
      supplier: mergeScopeValues(previous.supplier, scopedValues.supplier),
      material: mergeScopeValues(
        previous.material,
        scopedValues.material,
        ['wood', 'plywood', 'mdf', 'hardware', 'paint', 'fabric', 'foam'],
      ),
      buyer_company: mergeScopeValues(previous.buyer_company, scopedValues.buyer_company),
      explicit: mergeScopeValues(previous.explicit, scopedValues.explicit),
    }));
  }, [users]);

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
        await loadUsers();
      } catch (error) {
        if (!isMounted) {
          return;
        }

        const message =
          error instanceof Error
            ? error.message
            : t('Không thể kiểm tra quyền truy cập.');
        setUsersError(message);
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
  }, [loadUsers, loginPath, navigate, t]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } catch {
      // no-op
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  function handleAddCreateScope() {
    const nextScopes = appendScopeToList(createForm.scopes, createScopeDraft);
    if (nextScopes.length === createForm.scopes.length) {
      setCreateState({
        status: 'error',
        message: t('Vui lòng nhập giá trị scope hợp lệ trước khi thêm.'),
      });
      return;
    }

    setCreateState(idleFormState);
    setCreateForm((previous) => ({ ...previous, scopes: nextScopes }));
    setCreateScopeDraft((previous) => ({
      ...previous,
      value: getScopeDraftDefaultValue(previous.type),
    }));
  }

  function handleRemoveCreateScope(type: ScopeType, value: string) {
    setCreateState(idleFormState);
    setCreateForm((previous) => ({
      ...previous,
      scopes: previous.scopes.filter(
        (scope) => !(scope.type === type && scope.value === value),
      ),
    }));
  }

  function handleAddEditScope() {
    if (!editForm) {
      return;
    }

    const nextScopes = appendScopeToList(editForm.scopes, editScopeDraft);
    if (nextScopes.length === editForm.scopes.length) {
      setEditState({
        status: 'error',
        message: t('Vui lòng nhập giá trị scope hợp lệ trước khi thêm.'),
      });
      return;
    }

    setEditState(idleFormState);
    setEditForm((previous) =>
      previous
        ? {
            ...previous,
            scopes: nextScopes,
          }
        : previous,
    );
    setEditScopeDraft((previous) => ({
      ...previous,
      value: getScopeDraftDefaultValue(previous.type),
    }));
  }

  function handleRemoveEditScope(type: ScopeType, value: string) {
    setEditState(idleFormState);
    setEditForm((previous) =>
      previous
        ? {
            ...previous,
            scopes: previous.scopes.filter(
              (scope) => !(scope.type === type && scope.value === value),
            ),
          }
        : previous,
    );
  }

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateState({ status: 'loading', message: t('Đang tạo tài khoản...') });

    if (createForm.roles.length === 0) {
      setCreateState({
        status: 'error',
        message: t('Vui lòng chọn ít nhất một vai trò.'),
      });
      return;
    }

    const scopes = dedupeScopeList(createForm.scopes);

    try {
      const createdUser = await createInternalUser({
        email: createForm.email.trim().toLowerCase(),
        fullName: createForm.fullName.trim(),
        password: createForm.password,
        isActive: createForm.isActive,
        roles: createForm.roles,
        scopes,
      });

      setUsers((previous) => [createdUser, ...previous]);
      setCreateForm(defaultCreateFormState);
      setCreateScopeDraft(defaultScopeDraftState);
      setCreateState({
        status: 'success',
        message: t('Tạo tài khoản thành công.'),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t('Không thể tạo tài khoản.');
      setCreateState({ status: 'error', message });
    }
  }

  function openEditForm(user: UserProfile) {
    if (!canEditUser(user)) {
      return;
    }

    setEditState(idleFormState);
    setEditForm({
      userId: user.id,
      fullName: user.fullName,
      password: '',
      isActive: user.isActive,
      roles: user.roles,
      scopes: dedupeScopeList(user.scopes),
    });
    setEditScopeDraft(defaultScopeDraftState);
  }

  async function handleEditUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editForm) {
      return;
    }

    setEditState({ status: 'loading', message: t('Đang cập nhật tài khoản...') });

    if (editForm.roles.length === 0) {
      setEditState({
        status: 'error',
        message: t('Vui lòng chọn ít nhất một vai trò.'),
      });
      return;
    }

    const scopes = dedupeScopeList(editForm.scopes);

    try {
      const updatedUser = await updateInternalUser(editForm.userId, {
        fullName: editForm.fullName.trim(),
        ...(editForm.password.trim() ? { password: editForm.password.trim() } : {}),
        isActive: editForm.isActive,
        roles: editForm.roles,
        scopes,
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
      const message =
        error instanceof Error ? error.message : t('Không thể cập nhật tài khoản.');
      setEditState({ status: 'error', message });
    }
  }

  async function handleDeleteUser(user: UserProfile) {
    if (!canDeleteUser(user)) {
      return;
    }

    const confirmed = window.confirm(
      `${t('Bạn chắc chắn muốn xóa tài khoản này?')}\n${user.email}`,
    );
    if (!confirmed) {
      return;
    }

    setDeleteState({ status: 'loading', message: t('Đang xóa tài khoản...') });
    setDeletingUserId(user.id);

    try {
      await deleteInternalUser(user.id);
      setUsers((previous) => previous.filter((item) => item.id !== user.id));
      if (editForm?.userId === user.id) {
        setEditForm(null);
      }
      setDeleteState({
        status: 'success',
        message: t('Xóa tài khoản thành công.'),
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t('Không thể xóa tài khoản.');
      setDeleteState({ status: 'error', message });
    } finally {
      setDeletingUserId(null);
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Quản trị tài khoản người dùng')}
          description={t('Quản trị người dùng nội bộ ANSLIFE.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Quản trị tài khoản người dùng')}
        description={t('Quản trị người dùng nội bộ ANSLIFE.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Quản trị tài khoản người dùng')}</h1>
        <p>{t('Danh sách, tạo mới và chỉnh sửa tài khoản trong hệ thống nội bộ.')}</p>
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
            onClick={() => void loadUsers()}
            disabled={usersLoading}
          >
            {usersLoading ? t('Đang tải...') : t('Làm mới danh sách')}
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

      {!isAdminManager && (
        <ErrorBlock message={t('Tài khoản hiện tại không có quyền quản trị người dùng.')} />
      )}

      {usersError && <ErrorBlock message={usersError} />}
      {createState.status === 'success' && (
        <div className="state-block success-text">{createState.message}</div>
      )}
      {editState.status === 'success' && (
        <div className="state-block success-text">{editState.message}</div>
      )}
      {deleteState.status === 'error' && <ErrorBlock message={deleteState.message} />}
      {deleteState.status === 'success' && (
        <div className="state-block success-text">{deleteState.message}</div>
      )}

      <section className="admin-layout-grid">
        {isAdminManager ? (
          <article className="form-card">
            <h2>{t('Tạo tài khoản mới')}</h2>
            <form onSubmit={handleCreateUser}>
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

              <fieldset className="admin-role-fieldset">
                <legend>{t('Vai trò')}</legend>
                <div className="admin-role-grid">
                  {editableRoleOptions.map((role) => (
                    <label key={role.code} className="admin-role-option">
                      <input
                        type="checkbox"
                        checked={createForm.roles.includes(role.code)}
                        onChange={() =>
                          setCreateForm((previous) => ({
                            ...previous,
                            roles: toggleRoleInList(previous.roles, role.code),
                          }))
                        }
                        disabled={createState.status === 'loading'}
                      />
                      <span>{t(role.label)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="admin-role-fieldset admin-scope-fieldset">
                <legend>{t('Phạm vi quyền (scope)')}</legend>
                <div className="admin-scope-builder-row">
                  <select
                    value={createScopeDraft.type}
                    onChange={(event) => {
                      const type = event.target.value as ScopeType;
                      setCreateScopeDraft({
                        type,
                        value: getScopeDraftDefaultValue(type),
                      });
                      setCreateState(idleFormState);
                    }}
                    disabled={createState.status === 'loading'}
                  >
                    {SCOPE_TYPE_OPTIONS.map((type) => (
                      <option key={type} value={type}>
                        {t(getScopeTypeLabel(type))}
                      </option>
                    ))}
                  </select>
                  <input
                    value={createScopeDraft.value}
                    onChange={(event) =>
                      setCreateScopeDraft((previous) => ({
                        ...previous,
                        value: event.target.value,
                      }))
                    }
                    placeholder={
                      createScopeDraft.type === 'global'
                        ? '*'
                        : t('Nhập hoặc chọn giá trị scope')
                    }
                    list="create-scope-suggestions"
                    disabled={
                      createState.status === 'loading' || createScopeDraft.type === 'global'
                    }
                  />
                  <datalist id="create-scope-suggestions">
                    {createScopeValueOptions.map((value) => (
                      <option key={value} value={value} />
                    ))}
                  </datalist>
                  <button
                    type="button"
                    className="button-ghost"
                    onClick={handleAddCreateScope}
                    disabled={createState.status === 'loading'}
                  >
                    {t('Thêm')}
                  </button>
                </div>
                <div className="admin-scope-chip-list">
                  {createForm.scopes.length > 0 ? (
                    createForm.scopes.map((scope) => {
                      const scopeKey = `${scope.type}:${scope.value}`;
                      return (
                        <span key={scopeKey} className="admin-scope-chip">
                          <strong>{t(getScopeTypeLabel(scope.type))}</strong>
                          <span>{scope.value}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCreateScope(scope.type, scope.value)}
                            disabled={createState.status === 'loading'}
                            aria-label={t('Xóa scope')}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })
                  ) : (
                    <span className="admin-empty">{t('Chưa thêm scope nào.')}</span>
                  )}
                </div>
                <p className="admin-scope-hint">
                  {scopeReferenceLoading
                    ? t('Đang tải danh sách gợi ý scope...')
                    : t('Chọn loại scope, chọn giá trị và bấm Thêm.')}
                </p>
              </fieldset>

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
                <span>{t('Kích hoạt tài khoản')}</span>
              </label>

              <button
                type="submit"
                className="button-solid"
                disabled={createState.status === 'loading'}
              >
                {createState.status === 'loading' ? t('Đang xử lý...') : t('Tạo tài khoản')}
              </button>

              {createState.status === 'error' && <ErrorBlock message={createState.message} />}
            </form>
          </article>
        ) : (
          <article className="form-card">
            <h2>{t('Tạo tài khoản mới')}</h2>
            <p className="admin-empty">
              {t('Tài khoản hiện tại chỉ có quyền xem thông tin quản trị.')}
            </p>
          </article>
        )}

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách tài khoản')}</h2>
          {usersLoading && <LoadingBlock />}
          {!usersLoading && users.length === 0 && (
            <p className="admin-empty">{t('Chưa có tài khoản nào trong hệ thống.')}</p>
          )}

          {!usersLoading && users.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Họ tên')}</th>
                    <th>{t('Email')}</th>
                    <th>{t('Vai trò')}</th>
                    <th>{t('Phạm vi quyền')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Cập nhật')}</th>
                    {isAdminManager && <th>{t('Thao tác')}</th>}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>
                        <div className="admin-role-badge-list">
                          {user.roles.map((role) => (
                            <span key={role} className="admin-role-badge">
                              {t(parseRoleLabel(role))}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="admin-scope-cell">
                        {user.scopes.length > 0 ? formatScopes(user.scopes) : '-'}
                      </td>
                      <td>
                        <span
                          className={`admin-status-pill ${user.isActive ? 'is-active' : 'is-inactive'}`}
                        >
                          {user.isActive ? t('Hoạt động') : t('Đang khóa')}
                        </span>
                      </td>
                      <td>{formatDate(user.updatedAt)}</td>
                      {isAdminManager && (
                        <td>
                          <div className="admin-row-actions">
                            <button
                              type="button"
                              className="button-ghost admin-row-action"
                              onClick={() => openEditForm(user)}
                              disabled={!canEditUser(user) || deletingUserId === user.id}
                            >
                              {t('Sửa')}
                            </button>
                            <button
                              type="button"
                              className="button-ghost admin-row-action is-danger"
                              onClick={() => void handleDeleteUser(user)}
                              disabled={!canDeleteUser(user) || deletingUserId === user.id}
                            >
                              {deletingUserId === user.id ? t('Đang xóa...') : t('Xóa')}
                            </button>
                          </div>
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

      {editForm && isAdminManager && (
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
                {t('Chỉnh sửa tài khoản')} #{editForm.userId}
              </h2>
              <button type="button" className="admin-edit-close" onClick={() => setEditForm(null)}>
                ×
              </button>
            </div>

            <form onSubmit={handleEditUser} className="admin-edit-form">
              <label>
                {t('Họ tên')}
                <input
                  value={editForm.fullName}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            fullName: event.target.value,
                          }
                        : previous,
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
                      previous
                        ? {
                            ...previous,
                            password: event.target.value,
                          }
                        : previous,
                    )
                  }
                  minLength={8}
                  disabled={editState.status === 'loading'}
                />
              </label>

              <fieldset className="admin-role-fieldset">
                <legend>{t('Vai trò')}</legend>
                <div className="admin-role-grid">
                  {editableRoleOptions.map((role) => (
                    <label key={role.code} className="admin-role-option">
                      <input
                        type="checkbox"
                        checked={editForm.roles.includes(role.code)}
                        onChange={() =>
                          setEditForm((previous) =>
                            previous
                              ? {
                                  ...previous,
                                  roles: toggleRoleInList(previous.roles, role.code),
                                }
                              : previous,
                          )
                        }
                        disabled={editState.status === 'loading'}
                      />
                      <span>{t(role.label)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="admin-role-fieldset admin-scope-fieldset">
                <legend>{t('Phạm vi quyền (scope)')}</legend>
                <div className="admin-scope-builder-row">
                  <select
                    value={editScopeDraft.type}
                    onChange={(event) => {
                      const type = event.target.value as ScopeType;
                      setEditScopeDraft({
                        type,
                        value: getScopeDraftDefaultValue(type),
                      });
                      setEditState(idleFormState);
                    }}
                    disabled={editState.status === 'loading'}
                  >
                    {SCOPE_TYPE_OPTIONS.map((type) => (
                      <option key={type} value={type}>
                        {t(getScopeTypeLabel(type))}
                      </option>
                    ))}
                  </select>
                  <input
                    value={editScopeDraft.value}
                    onChange={(event) =>
                      setEditScopeDraft((previous) => ({
                        ...previous,
                        value: event.target.value,
                      }))
                    }
                    placeholder={
                      editScopeDraft.type === 'global'
                        ? '*'
                        : t('Nhập hoặc chọn giá trị scope')
                    }
                    list="edit-scope-suggestions"
                    disabled={editState.status === 'loading' || editScopeDraft.type === 'global'}
                  />
                  <datalist id="edit-scope-suggestions">
                    {editScopeValueOptions.map((value) => (
                      <option key={value} value={value} />
                    ))}
                  </datalist>
                  <button
                    type="button"
                    className="button-ghost"
                    onClick={handleAddEditScope}
                    disabled={editState.status === 'loading'}
                  >
                    {t('Thêm')}
                  </button>
                </div>
                <div className="admin-scope-chip-list">
                  {editForm.scopes.length > 0 ? (
                    editForm.scopes.map((scope) => {
                      const scopeKey = `${scope.type}:${scope.value}`;
                      return (
                        <span key={scopeKey} className="admin-scope-chip">
                          <strong>{t(getScopeTypeLabel(scope.type))}</strong>
                          <span>{scope.value}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveEditScope(scope.type, scope.value)}
                            disabled={editState.status === 'loading'}
                            aria-label={t('Xóa scope')}
                          >
                            ×
                          </button>
                        </span>
                      );
                    })
                  ) : (
                    <span className="admin-empty">{t('Chưa thêm scope nào.')}</span>
                  )}
                </div>
                <p className="admin-scope-hint">
                  {scopeReferenceLoading
                    ? t('Đang tải danh sách gợi ý scope...')
                    : t('Chọn loại scope, chọn giá trị và bấm Thêm.')}
                </p>
              </fieldset>

              <label className="admin-checkbox">
                <input
                  type="checkbox"
                  checked={editForm.isActive}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            isActive: event.target.checked,
                          }
                        : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
                <span>{t('Kích hoạt tài khoản')}</span>
              </label>

              <div className="admin-edit-actions">
                <button
                  type="button"
                  className="button-ghost admin-row-action is-danger"
                  onClick={() => {
                    if (editingUser) {
                      void handleDeleteUser(editingUser);
                    }
                  }}
                  disabled={
                    editState.status === 'loading' ||
                    deletingUserId === editForm.userId ||
                    !editingUser ||
                    !canDeleteUser(editingUser)
                  }
                >
                  {deletingUserId === editForm.userId ? t('Đang xóa...') : t('Xóa tài khoản')}
                </button>
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
