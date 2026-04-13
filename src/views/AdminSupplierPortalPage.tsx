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
  createInternalSupplierMaterial,
  getCurrentUser,
  getInternalSupplierMaterialById,
  listInternalSupplierMaterials,
  logoutInternal,
  updateInternalSupplierMaterial,
  type AppRole,
  type AuthUser,
  type InternalOrderStatus,
  type InternalSupplierMaterial,
} from '../lib/internalAuth';

interface SupplierFilters {
  supplierCode: string;
  materialCode: string;
  state: string;
}

interface SupplierCreateFormState {
  supplierCode: string;
  supplierName: string;
  materialCode: string;
  materialName: string;
  certificateUrl: string;
  quoteUrl: string;
  metadataInput: string;
}

interface SupplierEditFormState {
  itemId: number;
  supplierCode: string;
  supplierName: string;
  materialCode: string;
  materialName: string;
  certificateUrl: string;
  quoteUrl: string;
  metadataInput: string;
  state: InternalOrderStatus;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFilters: SupplierFilters = {
  supplierCode: '',
  materialCode: '',
  state: '',
};

const defaultCreateForm: SupplierCreateFormState = {
  supplierCode: '',
  supplierName: '',
  materialCode: '',
  materialName: '',
  certificateUrl: '',
  quoteUrl: '',
  metadataInput: '',
};

const idleState: FormState = { status: 'idle', message: '' };

const SUPPLIER_VIEW_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
];
const SUPPLIER_WRITE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
];
const SUPPLIER_REVIEW_ROLES: AppRole[] = ['super_admin', 'system_admin'];

function canViewSupplierPortal(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => SUPPLIER_VIEW_ROLES.includes(role));
}

function canCreateSupplierData(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => SUPPLIER_WRITE_ROLES.includes(role));
}

function canReviewSupplierData(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => SUPPLIER_REVIEW_ROLES.includes(role));
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

function mapItemToEditForm(item: InternalSupplierMaterial): SupplierEditFormState {
  return {
    itemId: item.id,
    supplierCode: item.supplierCode,
    supplierName: item.supplierName,
    materialCode: item.materialCode,
    materialName: item.materialName,
    certificateUrl: item.certificateUrl ?? '',
    quoteUrl: item.quoteUrl ?? '',
    metadataInput: item.metadata ? JSON.stringify(item.metadata, null, 2) : '',
    state: item.state,
  };
}

function isValidCode(value: string): boolean {
  return /^[A-Z0-9._-]{2,64}$/.test(value);
}

function isValidName(value: string, maxLength = 191): boolean {
  return value.length >= 2 && value.length <= maxLength;
}

export default function AdminSupplierPortalPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/supplier-portal')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [filters, setFilters] = useState<SupplierFilters>(defaultFilters);
  const [items, setItems] = useState<InternalSupplierMaterial[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [createForm, setCreateForm] = useState<SupplierCreateFormState>(defaultCreateForm);
  const [createState, setCreateState] = useState<FormState>(idleState);
  const [editState, setEditState] = useState<FormState>(idleState);
  const [selectedItem, setSelectedItem] = useState<InternalSupplierMaterial | null>(null);
  const [editForm, setEditForm] = useState<SupplierEditFormState | null>(null);

  const actorCanView = useMemo(() => canViewSupplierPortal(actor), [actor]);
  const actorCanCreate = useMemo(() => canCreateSupplierData(actor), [actor]);
  const actorCanReview = useMemo(() => canReviewSupplierData(actor), [actor]);

  const loadItems = useCallback(
    async (nextFilters: SupplierFilters) => {
      setLoading(true);
      setError('');
      try {
        const data = await listInternalSupplierMaterials({
          perPage: 200,
          supplierCode: nextFilters.supplierCode.trim() || undefined,
          materialCode: nextFilters.materialCode.trim() || undefined,
          state: nextFilters.state.trim() || undefined,
        });
        setItems(data);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : t('Không thể tải dữ liệu nhà cung cấp.');
        setError(message);
      } finally {
        setLoading(false);
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
        await loadItems(defaultFilters);
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
  }, [loadItems, loginPath, navigate, t]);

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
        message: t('Bạn không có quyền tạo dữ liệu nhà cung cấp.'),
      });
      return;
    }

    const supplierCode = createForm.supplierCode.trim().toUpperCase();
    const supplierName = createForm.supplierName.trim();
    const materialCode = createForm.materialCode.trim().toUpperCase();
    const materialName = createForm.materialName.trim();
    const certificateUrl = createForm.certificateUrl.trim();
    const quoteUrl = createForm.quoteUrl.trim();
    const metadataResult = parseMetadataInput(createForm.metadataInput);

    if (!isValidCode(supplierCode)) {
      setCreateState({ status: 'error', message: t('Mã nhà cung cấp không hợp lệ.') });
      return;
    }
    if (!isValidName(supplierName)) {
      setCreateState({ status: 'error', message: t('Tên nhà cung cấp không hợp lệ.') });
      return;
    }
    if (!isValidCode(materialCode)) {
      setCreateState({ status: 'error', message: t('Mã vật liệu không hợp lệ.') });
      return;
    }
    if (!isValidName(materialName)) {
      setCreateState({ status: 'error', message: t('Tên vật liệu không hợp lệ.') });
      return;
    }
    if (certificateUrl.length > 1024) {
      setCreateState({ status: 'error', message: t('URL chứng chỉ quá dài.') });
      return;
    }
    if (quoteUrl.length > 1024) {
      setCreateState({ status: 'error', message: t('URL báo giá quá dài.') });
      return;
    }
    if (!metadataResult.ok) {
      setCreateState({
        status: 'error',
        message: t(metadataResult.message ?? 'Metadata (JSON) không hợp lệ.'),
      });
      return;
    }

    setCreateState({ status: 'loading', message: t('Đang tạo dữ liệu nhà cung cấp...') });
    try {
      const item = await createInternalSupplierMaterial({
        supplierCode,
        supplierName,
        materialCode,
        materialName,
        certificateUrl: certificateUrl || null,
        quoteUrl: quoteUrl || null,
        metadata: metadataResult.value,
      });
      setItems((previous) => [item, ...previous]);
      setCreateForm(defaultCreateForm);
      setCreateState({
        status: 'success',
        message: t('Tạo dữ liệu nhà cung cấp thành công.'),
      });
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : t('Không thể tạo dữ liệu nhà cung cấp.');
      setCreateState({ status: 'error', message });
    }
  }

  async function openItemDetail(itemId: number) {
    setDetailLoading(true);
    setEditState(idleState);
    try {
      const item = await getInternalSupplierMaterialById(itemId);
      setSelectedItem(item);
      setEditForm(mapItemToEditForm(item));
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : t('Không thể tải chi tiết dữ liệu nhà cung cấp.');
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

    const supplierCode = editForm.supplierCode.trim().toUpperCase();
    const supplierName = editForm.supplierName.trim();
    const materialCode = editForm.materialCode.trim().toUpperCase();
    const materialName = editForm.materialName.trim();
    const certificateUrl = editForm.certificateUrl.trim();
    const quoteUrl = editForm.quoteUrl.trim();
    const metadataResult = parseMetadataInput(editForm.metadataInput);

    if (!isValidCode(supplierCode)) {
      setEditState({ status: 'error', message: t('Mã nhà cung cấp không hợp lệ.') });
      return;
    }
    if (!isValidName(supplierName)) {
      setEditState({ status: 'error', message: t('Tên nhà cung cấp không hợp lệ.') });
      return;
    }
    if (!isValidCode(materialCode)) {
      setEditState({ status: 'error', message: t('Mã vật liệu không hợp lệ.') });
      return;
    }
    if (!isValidName(materialName)) {
      setEditState({ status: 'error', message: t('Tên vật liệu không hợp lệ.') });
      return;
    }
    if (certificateUrl.length > 1024) {
      setEditState({ status: 'error', message: t('URL chứng chỉ quá dài.') });
      return;
    }
    if (quoteUrl.length > 1024) {
      setEditState({ status: 'error', message: t('URL báo giá quá dài.') });
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
        message: t('Bạn không có quyền cập nhật dữ liệu nhà cung cấp.'),
      });
      return;
    }

    setEditState({ status: 'loading', message: t('Đang lưu dữ liệu nhà cung cấp...') });
    try {
      const updated = await updateInternalSupplierMaterial(editForm.itemId, {
        supplierCode,
        supplierName,
        materialCode,
        materialName,
        certificateUrl: certificateUrl || null,
        quoteUrl: quoteUrl || null,
        metadata: metadataResult.value,
        state: editForm.state,
      });
      setItems((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item)),
      );
      setSelectedItem(updated);
      setEditForm(mapItemToEditForm(updated));
      setEditState({
        status: 'success',
        message: t('Cập nhật dữ liệu nhà cung cấp thành công.'),
      });
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : t('Không thể cập nhật dữ liệu nhà cung cấp.');
      setEditState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Cổng nhà cung cấp')}
          description={t('Quản lý dữ liệu vật liệu, chứng chỉ và báo giá nhà cung cấp.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Cổng nhà cung cấp')}
        description={t('Quản lý dữ liệu vật liệu, chứng chỉ và báo giá nhà cung cấp.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Cổng nhà cung cấp')}</h1>
        <p>{t('Chuẩn hóa dữ liệu vật liệu, chứng chỉ và báo giá trước khi công bố.')}</p>
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
            onClick={() => void loadItems(filters)}
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

      {!actorCanView && (
        <ErrorBlock
          message={t(
            'Cổng nhà cung cấp là module legacy. Chỉ Quản trị tối cao/Quản trị hệ thống mới được truy cập.',
          )}
        />
      )}
      {error && <ErrorBlock message={error} />}

      <section className="filter-bar admin-order-filter">
        <form onSubmit={handleApplyFilters} className="admin-filter-form admin-filter-form-compact">
          <label>
            {t('Mã nhà cung cấp')}
            <input
              value={filters.supplierCode}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, supplierCode: event.target.value }))
              }
              placeholder="SUP-WOOD-01"
            />
          </label>
          <label>
            {t('Mã vật liệu')}
            <input
              value={filters.materialCode}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, materialCode: event.target.value }))
              }
              placeholder="PLY-AA"
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
            <button
              type="button"
              className="button-ghost"
              onClick={() => void handleResetFilters()}
              disabled={loading}
            >
              {t('Đặt lại')}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-layout-grid admin-layout-grid-wide">
        <article className="form-card">
          <h2>{t('Tạo dữ liệu nhà cung cấp')}</h2>
          <form onSubmit={handleCreateSubmit} className="admin-order-form">
            <label>
              {t('Mã nhà cung cấp')}
              <input
                value={createForm.supplierCode}
                onChange={(event) =>
                  setCreateForm((previous) => ({
                    ...previous,
                    supplierCode: event.target.value,
                  }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              />
            </label>
            <label>
              {t('Tên nhà cung cấp')}
              <input
                value={createForm.supplierName}
                onChange={(event) =>
                  setCreateForm((previous) => ({
                    ...previous,
                    supplierName: event.target.value,
                  }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              />
            </label>
            <label>
              {t('Mã vật liệu')}
              <input
                value={createForm.materialCode}
                onChange={(event) =>
                  setCreateForm((previous) => ({
                    ...previous,
                    materialCode: event.target.value,
                  }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              />
            </label>
            <label>
              {t('Tên vật liệu')}
              <input
                value={createForm.materialName}
                onChange={(event) =>
                  setCreateForm((previous) => ({
                    ...previous,
                    materialName: event.target.value,
                  }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              />
            </label>
            <label>
              {t('URL chứng chỉ')}
              <input
                value={createForm.certificateUrl}
                onChange={(event) =>
                  setCreateForm((previous) => ({
                    ...previous,
                    certificateUrl: event.target.value,
                  }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label>
              {t('URL báo giá')}
              <input
                value={createForm.quoteUrl}
                onChange={(event) =>
                  setCreateForm((previous) => ({
                    ...previous,
                    quoteUrl: event.target.value,
                  }))
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
                  setCreateForm((previous) => ({
                    ...previous,
                    metadataInput: event.target.value,
                  }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <div className="admin-order-form-actions">
              <button
                type="submit"
                className="button-solid"
                disabled={!actorCanCreate || createState.status === 'loading'}
              >
                {createState.status === 'loading'
                  ? t('Đang tạo...')
                  : t('Tạo dữ liệu')}
              </button>
            </div>
            {createState.status === 'error' && <ErrorBlock message={createState.message} />}
            {createState.status === 'success' && (
              <div className="state-block success-text">{createState.message}</div>
            )}
          </form>
        </article>

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách dữ liệu nhà cung cấp')}</h2>
          {(loading || detailLoading) && <LoadingBlock />}
          {!loading && items.length === 0 && (
            <p className="admin-empty">{t('Chưa có dữ liệu phù hợp bộ lọc.')}</p>
          )}
          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Nhà cung cấp')}</th>
                    <th>{t('Vật liệu')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Thao tác')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        {item.supplierCode} - {item.supplierName}
                      </td>
                      <td>
                        {item.materialCode} - {item.materialName}
                      </td>
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
          <h2>{t('Chi tiết dữ liệu nhà cung cấp')}</h2>
          {!selectedItem || !editForm ? (
            <p className="admin-empty">{t('Chọn một dòng dữ liệu để chỉnh sửa.')}</p>
          ) : (
            <form onSubmit={handleSaveDetail} className="admin-order-form">
              <label>
                {t('Mã nhà cung cấp')}
                <input
                  value={editForm.supplierCode}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, supplierCode: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Tên nhà cung cấp')}
                <input
                  value={editForm.supplierName}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, supplierName: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Mã vật liệu')}
                <input
                  value={editForm.materialCode}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, materialCode: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Tên vật liệu')}
                <input
                  value={editForm.materialName}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, materialName: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('URL chứng chỉ')}
                <input
                  value={editForm.certificateUrl}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, certificateUrl: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('URL báo giá')}
                <input
                  value={editForm.quoteUrl}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, quoteUrl: event.target.value } : previous,
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
                {t('Tạo lúc')}: {formatDate(selectedItem.createdAt)} | {t('Cập nhật')}:{' '}
                {formatDate(selectedItem.updatedAt)}
              </p>
              <div className="admin-order-form-actions">
                <button
                  type="submit"
                  className="button-solid"
                  disabled={
                    editState.status === 'loading' || (!actorCanCreate && !actorCanReview)
                  }
                >
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
