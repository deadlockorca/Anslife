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
  createInternalFactorySurvey,
  getCurrentUser,
  getInternalFactorySurveyById,
  listInternalFactories,
  listInternalFactorySurveys,
  logoutInternal,
  updateInternalFactorySurvey,
  type AppRole,
  type AuthUser,
  type InternalFactory,
  type InternalFactorySurvey,
  type InternalOrderStatus,
} from '../lib/internalAuth';

interface SurveyFilters {
  factoryCode: string;
  surveyCode: string;
  state: string;
}

interface SurveyCreateFormState {
  factoryId: string;
  surveyCode: string;
  title: string;
  surveyDate: string;
  score: string;
  summary: string;
  metadataInput: string;
}

interface SurveyEditFormState {
  itemId: number;
  surveyCode: string;
  title: string;
  surveyDate: string;
  score: string;
  summary: string;
  metadataInput: string;
  state: InternalOrderStatus;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const defaultFilters: SurveyFilters = {
  factoryCode: '',
  surveyCode: '',
  state: '',
};

const defaultCreateForm: SurveyCreateFormState = {
  factoryId: '',
  surveyCode: '',
  title: '',
  surveyDate: '',
  score: '',
  summary: '',
  metadataInput: '',
};

const idleState: FormState = { status: 'idle', message: '' };

const SURVEY_VIEW_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'factory_collector',
  'factory_collector',
  'factory_partner',
  'factory_partner',
  'sale_trading',
  'sale_trading',
];
const SURVEY_WRITE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'factory_collector',
  'factory_collector',
];
const SURVEY_REVIEW_ROLES: AppRole[] = ['super_admin', 'system_admin', 'data_controller'];

function canViewSurveyPortal(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => SURVEY_VIEW_ROLES.includes(role));
}

function canCreateSurvey(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => SURVEY_WRITE_ROLES.includes(role));
}

function canReviewSurvey(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }
  return actor.roles.some((role) => SURVEY_REVIEW_ROLES.includes(role));
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

function mapItemToEditForm(item: InternalFactorySurvey): SurveyEditFormState {
  return {
    itemId: item.id,
    surveyCode: item.surveyCode,
    title: item.title,
    surveyDate: item.surveyDate ?? '',
    score: item.score == null ? '' : String(item.score),
    summary: item.summary ?? '',
    metadataInput: item.metadata ? JSON.stringify(item.metadata, null, 2) : '',
    state: item.state,
  };
}

export default function AdminFactorySurveysPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/factory-surveys')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [factories, setFactories] = useState<InternalFactory[]>([]);
  const [filters, setFilters] = useState<SurveyFilters>(defaultFilters);
  const [items, setItems] = useState<InternalFactorySurvey[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [createForm, setCreateForm] = useState<SurveyCreateFormState>(defaultCreateForm);
  const [createState, setCreateState] = useState<FormState>(idleState);
  const [editState, setEditState] = useState<FormState>(idleState);
  const [selectedItem, setSelectedItem] = useState<InternalFactorySurvey | null>(null);
  const [editForm, setEditForm] = useState<SurveyEditFormState | null>(null);

  const actorCanView = useMemo(() => canViewSurveyPortal(actor), [actor]);
  const actorCanCreate = useMemo(() => canCreateSurvey(actor), [actor]);
  const actorCanReview = useMemo(() => canReviewSurvey(actor), [actor]);

  const loadItems = useCallback(
    async (nextFilters: SurveyFilters) => {
      setLoading(true);
      setError('');
      try {
        const data = await listInternalFactorySurveys({
          perPage: 200,
          factoryCode: nextFilters.factoryCode.trim() || undefined,
          surveyCode: nextFilters.surveyCode.trim() || undefined,
          state: nextFilters.state.trim() || undefined,
        });
        setItems(data);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : t('Không thể tải dữ liệu khảo sát nhà máy.');
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [t],
  );

  const loadFactories = useCallback(async () => {
    try {
      const data = await listInternalFactories(200);
      setFactories(data);
    } catch {
      // keep old list
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
        await Promise.all([loadItems(defaultFilters), loadFactories()]);
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
  }, [loadFactories, loadItems, loginPath, navigate, t]);

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
        message: t('Bạn không có quyền tạo khảo sát nhà máy.'),
      });
      return;
    }

    const factoryId = Number(createForm.factoryId);
    const surveyCode = createForm.surveyCode.trim().toUpperCase();
    const title = createForm.title.trim();
    const surveyDate = createForm.surveyDate.trim();
    const score = createForm.score.trim().length ? Number(createForm.score.trim()) : null;
    const summary = createForm.summary.trim();
    const metadataResult = parseMetadataInput(createForm.metadataInput);

    if (!Number.isInteger(factoryId) || factoryId <= 0) {
      setCreateState({ status: 'error', message: t('Vui lòng chọn nhà máy hợp lệ.') });
      return;
    }
    if (!/^[A-Z0-9._-]{2,64}$/.test(surveyCode)) {
      setCreateState({ status: 'error', message: t('Mã khảo sát không hợp lệ.') });
      return;
    }
    if (title.length < 2 || title.length > 255) {
      setCreateState({ status: 'error', message: t('Tiêu đề khảo sát không hợp lệ.') });
      return;
    }
    if (surveyDate && !/^\d{4}-\d{2}-\d{2}$/.test(surveyDate)) {
      setCreateState({
        status: 'error',
        message: t('Survey date phải theo định dạng YYYY-MM-DD.'),
      });
      return;
    }
    if (score !== null && (!Number.isFinite(score) || score < 0 || score > 100)) {
      setCreateState({
        status: 'error',
        message: t('Điểm khảo sát phải trong khoảng 0-100.'),
      });
      return;
    }
    if (summary.length > 4000) {
      setCreateState({
        status: 'error',
        message: t('Tóm tắt khảo sát quá dài (tối đa 4000 ký tự).'),
      });
      return;
    }
    if (!metadataResult.ok) {
      setCreateState({
        status: 'error',
        message: t(metadataResult.message ?? 'Metadata (JSON) không hợp lệ.'),
      });
      return;
    }

    setCreateState({
      status: 'loading',
      message: t('Đang tạo khảo sát nhà máy...'),
    });
    try {
      const item = await createInternalFactorySurvey({
        factoryId,
        surveyCode,
        title,
        surveyDate: surveyDate || null,
        score,
        summary: summary || null,
        metadata: metadataResult.value,
      });
      setItems((previous) => [item, ...previous]);
      setCreateForm({
        ...defaultCreateForm,
        factoryId: createForm.factoryId,
      });
      setCreateState({
        status: 'success',
        message: t('Tạo khảo sát nhà máy thành công.'),
      });
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : t('Không thể tạo khảo sát nhà máy.');
      setCreateState({ status: 'error', message });
    }
  }

  async function openItemDetail(itemId: number) {
    setDetailLoading(true);
    setEditState(idleState);
    try {
      const item = await getInternalFactorySurveyById(itemId);
      setSelectedItem(item);
      setEditForm(mapItemToEditForm(item));
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : t('Không thể tải chi tiết khảo sát nhà máy.');
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

    const surveyCode = editForm.surveyCode.trim().toUpperCase();
    const title = editForm.title.trim();
    const surveyDate = editForm.surveyDate.trim();
    const score = editForm.score.trim().length ? Number(editForm.score.trim()) : null;
    const summary = editForm.summary.trim();
    const metadataResult = parseMetadataInput(editForm.metadataInput);

    if (!/^[A-Z0-9._-]{2,64}$/.test(surveyCode)) {
      setEditState({ status: 'error', message: t('Mã khảo sát không hợp lệ.') });
      return;
    }
    if (title.length < 2 || title.length > 255) {
      setEditState({ status: 'error', message: t('Tiêu đề khảo sát không hợp lệ.') });
      return;
    }
    if (surveyDate && !/^\d{4}-\d{2}-\d{2}$/.test(surveyDate)) {
      setEditState({
        status: 'error',
        message: t('Survey date phải theo định dạng YYYY-MM-DD.'),
      });
      return;
    }
    if (score !== null && (!Number.isFinite(score) || score < 0 || score > 100)) {
      setEditState({
        status: 'error',
        message: t('Điểm khảo sát phải trong khoảng 0-100.'),
      });
      return;
    }
    if (summary.length > 4000) {
      setEditState({
        status: 'error',
        message: t('Tóm tắt khảo sát quá dài (tối đa 4000 ký tự).'),
      });
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
        message: t('Bạn không có quyền cập nhật khảo sát nhà máy.'),
      });
      return;
    }

    setEditState({
      status: 'loading',
      message: t('Đang lưu khảo sát nhà máy...'),
    });
    try {
      const updated = await updateInternalFactorySurvey(editForm.itemId, {
        surveyCode,
        title,
        surveyDate: surveyDate || null,
        score,
        summary: summary || null,
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
        message: t('Cập nhật khảo sát nhà máy thành công.'),
      });
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : t('Không thể cập nhật khảo sát nhà máy.');
      setEditState({ status: 'error', message });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Khảo sát nhà máy')}
          description={t('Khảo sát và đánh giá năng lực nhà máy theo scope.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Khảo sát nhà máy')}
        description={t('Khảo sát và đánh giá năng lực nhà máy theo scope.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Khảo sát nhà máy')}</h1>
        <p>{t('Quản lý khảo sát nhà máy: ghi nhận, duyệt và theo dõi trạng thái dữ liệu.')}</p>
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
        <ErrorBlock message={t('Tài khoản hiện tại không có quyền truy cập khảo sát nhà máy.')} />
      )}
      {error && <ErrorBlock message={error} />}

      <section className="filter-bar admin-order-filter">
        <form onSubmit={handleApplyFilters} className="admin-filter-form admin-filter-form-compact">
          <label>
            {t('Mã nhà máy')}
            <input
              value={filters.factoryCode}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, factoryCode: event.target.value }))
              }
              placeholder="FCT-HN-01"
            />
          </label>
          <label>
            {t('Mã khảo sát')}
            <input
              value={filters.surveyCode}
              onChange={(event) =>
                setFilters((previous) => ({ ...previous, surveyCode: event.target.value }))
              }
              placeholder="FS-2026-001"
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
          <h2>{t('Tạo khảo sát nhà máy')}</h2>
          <form onSubmit={handleCreateSubmit} className="admin-order-form">
            <label>
              {t('Nhà máy')}
              <select
                value={createForm.factoryId}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, factoryId: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              >
                <option value="">{t('Chọn nhà máy')}</option>
                {factories.map((factory) => (
                  <option key={factory.id} value={factory.id}>
                    {factory.code} - {factory.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t('Mã khảo sát')}
              <input
                value={createForm.surveyCode}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, surveyCode: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
                required
              />
            </label>
            <label>
              {t('Tiêu đề khảo sát')}
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
              {t('Ngày khảo sát')}
              <input
                type="date"
                value={createForm.surveyDate}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, surveyDate: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label>
              {t('Điểm khảo sát (0-100)')}
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={createForm.score}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, score: event.target.value }))
                }
                disabled={!actorCanCreate || createState.status === 'loading'}
              />
            </label>
            <label className="admin-order-metadata">
              {t('Tóm tắt khảo sát')}
              <textarea
                rows={4}
                value={createForm.summary}
                onChange={(event) =>
                  setCreateForm((previous) => ({ ...previous, summary: event.target.value }))
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
                {createState.status === 'loading' ? t('Đang tạo...') : t('Tạo khảo sát')}
              </button>
            </div>
            {createState.status === 'error' && <ErrorBlock message={createState.message} />}
            {createState.status === 'success' && (
              <div className="state-block success-text">{createState.message}</div>
            )}
          </form>
        </article>

        <article className="form-card admin-users-card">
          <h2>{t('Danh sách khảo sát')}</h2>
          {(loading || detailLoading) && <LoadingBlock />}
          {!loading && items.length === 0 && (
            <p className="admin-empty">{t('Chưa có khảo sát phù hợp bộ lọc.')}</p>
          )}
          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Nhà máy')}</th>
                    <th>{t('Mã khảo sát')}</th>
                    <th>{t('Tiêu đề')}</th>
                    <th>{t('Điểm')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Thao tác')}</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.factory.code}</td>
                      <td>{item.surveyCode}</td>
                      <td>{item.title}</td>
                      <td>{item.score ?? '-'}</td>
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
          <h2>{t('Chi tiết khảo sát')}</h2>
          {!selectedItem || !editForm ? (
            <p className="admin-empty">{t('Chọn một khảo sát để chỉnh sửa.')}</p>
          ) : (
            <form onSubmit={handleSaveDetail} className="admin-order-form">
              <label>
                {t('Nhà máy')}
                <input value={`${selectedItem.factory.code} - ${selectedItem.factory.name}`} readOnly />
              </label>
              <label>
                {t('Mã khảo sát')}
                <input
                  value={editForm.surveyCode}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, surveyCode: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Tiêu đề khảo sát')}
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
                {t('Ngày khảo sát')}
                <input
                  type="date"
                  value={editForm.surveyDate}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, surveyDate: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
              </label>
              <label>
                {t('Điểm khảo sát (0-100)')}
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={0.1}
                  value={editForm.score}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, score: event.target.value } : previous,
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
                {t('Tóm tắt khảo sát')}
                <textarea
                  rows={4}
                  value={editForm.summary}
                  onChange={(event) =>
                    setEditForm((previous) =>
                      previous ? { ...previous, summary: event.target.value } : previous,
                    )
                  }
                  disabled={editState.status === 'loading'}
                />
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
