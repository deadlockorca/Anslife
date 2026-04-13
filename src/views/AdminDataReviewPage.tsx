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
  getCurrentUser,
  getInternalOrderDataItemById,
  listInternalOrderDataItems,
  logoutInternal,
  updateInternalOrderDataItem,
  type AppRole,
  type AuthUser,
  type InternalOrderDataItem,
  type InternalOrderStatus,
} from '../lib/internalAuth';

interface ReviewFilters {
  orderNo: string;
  state: string;
  dataType: string;
}

interface ReviewFormState {
  itemId: number;
  title: string;
  dataType: string;
  storageKey: string;
  metadataInput: string;
}

type FormState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const REVIEW_ROLES: AppRole[] = ['super_admin', 'system_admin', 'data_controller'];
const PUBLISH_SALES_ROLES: AppRole[] = ['super_admin', 'system_admin', 'data_controller'];
const PUBLISH_BUYER_ROLES: AppRole[] = ['super_admin', 'system_admin'];
const ARCHIVE_ROLES: AppRole[] = ['super_admin', 'system_admin'];

const defaultFilters: ReviewFilters = {
  orderNo: '',
  state: 'pending_review',
  dataType: '',
};

const idleState: FormState = { status: 'idle', message: '' };

function canReviewData(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => REVIEW_ROLES.includes(role));
}

function canPublishForSales(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => PUBLISH_SALES_ROLES.includes(role));
}

function canPublishForBuyer(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => PUBLISH_BUYER_ROLES.includes(role));
}

function canArchiveData(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => ARCHIVE_ROLES.includes(role));
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

function mapItemToReviewForm(item: InternalOrderDataItem): ReviewFormState {
  return {
    itemId: item.id,
    title: item.title,
    dataType: item.dataType,
    storageKey: item.storageKey ?? '',
    metadataInput: item.metadata ? JSON.stringify(item.metadata, null, 2) : '',
  };
}

export default function AdminDataReviewPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/data-review')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [items, setItems] = useState<InternalOrderDataItem[]>([]);
  const [filters, setFilters] = useState<ReviewFilters>(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<InternalOrderDataItem | null>(null);
  const [reviewForm, setReviewForm] = useState<ReviewFormState | null>(null);
  const [formState, setFormState] = useState<FormState>(idleState);

  const actorCanReview = useMemo(() => canReviewData(actor), [actor]);
  const actorCanPublishSales = useMemo(() => canPublishForSales(actor), [actor]);
  const actorCanPublishBuyer = useMemo(() => canPublishForBuyer(actor), [actor]);
  const actorCanArchive = useMemo(() => canArchiveData(actor), [actor]);

  const loadItems = useCallback(
    async (nextFilters: ReviewFilters) => {
      setLoading(true);
      setError('');
      try {
        const dataItems = await listInternalOrderDataItems({
          perPage: 150,
          orderNo: nextFilters.orderNo.trim() || undefined,
          state: nextFilters.state.trim() || undefined,
          dataType: nextFilters.dataType.trim() || undefined,
        });
        setItems(dataItems);
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : t('Không thể tải dữ liệu duyệt.');
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

  async function openItemForReview(itemId: number) {
    setDetailLoading(true);
    setFormState(idleState);
    try {
      const item = await getInternalOrderDataItemById(itemId);
      setSelectedItem(item);
      setReviewForm(mapItemToReviewForm(item));
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : t('Không thể tải chi tiết dữ liệu.');
      setFormState({ status: 'error', message });
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleSaveReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reviewForm || !selectedItem) {
      return;
    }
    if (!actorCanReview) {
      setFormState({
        status: 'error',
        message: t('Bạn không có quyền chỉnh sửa dữ liệu ở màn duyệt.'),
      });
      return;
    }

    const dataType = reviewForm.dataType.trim().toLowerCase();
    const title = reviewForm.title.trim();
    const storageKey = reviewForm.storageKey.trim();
    const metadataResult = parseMetadataInput(reviewForm.metadataInput);

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
    if (!metadataResult.ok) {
      setFormState({
        status: 'error',
        message: t(metadataResult.message ?? 'Metadata (JSON) không hợp lệ.'),
      });
      return;
    }

    setFormState({ status: 'loading', message: t('Đang lưu dữ liệu duyệt...') });

    try {
      const updated = await updateInternalOrderDataItem(reviewForm.itemId, {
        dataType,
        title,
        storageKey: storageKey || null,
        metadata: metadataResult.value,
      });
      setItems((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item)),
      );
      setSelectedItem(updated);
      setReviewForm(mapItemToReviewForm(updated));
      setFormState({ status: 'success', message: t('Cập nhật dữ liệu thành công.') });
    } catch (updateError) {
      const message =
        updateError instanceof Error ? updateError.message : t('Không thể cập nhật dữ liệu.');
      setFormState({ status: 'error', message });
    }
  }

  async function handleTransition(targetState: InternalOrderStatus) {
    if (!selectedItem || !reviewForm) {
      return;
    }

    if (!actorCanReview) {
      setFormState({
        status: 'error',
        message: t('Bạn không có quyền đổi trạng thái dữ liệu.'),
      });
      return;
    }

    setFormState({ status: 'loading', message: t('Đang cập nhật trạng thái...') });
    try {
      const updated = await updateInternalOrderDataItem(reviewForm.itemId, {
        state: targetState,
      });
      setItems((previous) =>
        previous.map((item) => (item.id === updated.id ? updated : item)),
      );
      setSelectedItem(updated);
      setReviewForm(mapItemToReviewForm(updated));
      setFormState({
        status: 'success',
        message: t('Đổi trạng thái dữ liệu thành công.'),
      });
    } catch (transitionError) {
      const message =
        transitionError instanceof Error
          ? transitionError.message
          : t('Không thể đổi trạng thái dữ liệu.');
      setFormState({ status: 'error', message });
    }
  }

  function canTransitionTo(
    currentState: InternalOrderStatus,
    targetState: InternalOrderStatus,
  ): boolean {
    if (targetState === 'draft') {
      return actorCanReview && currentState === 'pending_review';
    }

    if (targetState === 'approved_internal') {
      return actorCanReview && currentState === 'pending_review';
    }

    if (targetState === 'approved_sales') {
      return actorCanPublishSales && currentState === 'approved_internal';
    }

    if (targetState === 'approved_buyer') {
      return actorCanPublishBuyer && currentState === 'approved_sales';
    }

    if (targetState === 'archived') {
      return actorCanArchive && currentState !== 'archived';
    }

    return false;
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Duyệt dữ liệu QC/Nhà máy')}
          description={t('Bộ phận Kiểm soát dữ liệu duyệt hoặc trả lại dữ liệu tải lên.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Duyệt dữ liệu QC/Nhà máy')}
        description={t('Bộ phận Kiểm soát dữ liệu duyệt hoặc trả lại dữ liệu tải lên.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Duyệt dữ liệu QC/Nhà máy')}</h1>
        <p>{t('Bộ phận Kiểm soát dữ liệu/Admin duyệt theo các mức nội bộ -> Sale -> Khách hàng và lưu trữ khi cần.')}</p>
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

      {!actorCanReview && (
        <ErrorBlock message={t('Tài khoản hiện tại chỉ có quyền xem, không có quyền duyệt dữ liệu.')} />
      )}

      {error && <ErrorBlock message={error} />}
      {formState.status === 'success' && (
        <div className="state-block success-text">{formState.message}</div>
      )}

      <section className="filter-bar admin-order-filter">
        <form onSubmit={handleApplyFilters} className="admin-filter-form">
          <label>
            {t('Mã đơn hàng')}
            <input
              value={filters.orderNo}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  orderNo: event.target.value,
                }))
              }
              placeholder="ORD-0001"
            />
          </label>

          <label>
            {t('Trạng thái')}
            <select
              value={filters.state}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  state: event.target.value,
                }))
              }
            >
              <option value="">{t('Tất cả')}</option>
              {INTERNAL_ORDER_STATUS_OPTIONS.map((option) => (
                <option key={option.code} value={option.code}>
                  {t(option.label)}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t('Loại dữ liệu')}
            <input
              value={filters.dataType}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  dataType: event.target.value,
                }))
              }
              placeholder="qc_report"
            />
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
        <article className="form-card admin-users-card">
          <h2>{t('Danh sách dữ liệu')}</h2>
          {(loading || detailLoading) && <LoadingBlock />}
          {!loading && items.length === 0 && (
            <p className="admin-empty">{t('Không có dữ liệu phù hợp bộ lọc.')}</p>
          )}
          {!loading && items.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Mã đơn')}</th>
                    <th>{t('Loại')}</th>
                    <th>{t('Tiêu đề')}</th>
                    <th>{t('Trạng thái')}</th>
                    <th>{t('Người tạo')}</th>
                    <th>{t('Thao tác')}</th>
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
                      <td>
                        <button
                          type="button"
                          className="button-ghost admin-row-action"
                          onClick={() => void openItemForReview(item.id)}
                          disabled={detailLoading}
                        >
                          {t('Xử lý')}
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
          <h2>{t('Chi tiết duyệt')}</h2>
          {!selectedItem || !reviewForm ? (
            <p className="admin-empty">{t('Chọn một dữ liệu từ danh sách để xử lý.')}</p>
          ) : (
            <form onSubmit={handleSaveReview} className="admin-order-form">
              <label>
                {t('Đơn hàng')}
                <input value={selectedItem.orderNo} readOnly />
              </label>

              <label>
                {t('Trạng thái hiện tại')}
                <input value={t(getStateLabel(selectedItem.state))} readOnly />
              </label>

              <label>
                {t('Loại dữ liệu')}
                <input
                  value={reviewForm.dataType}
                  onChange={(event) =>
                    setReviewForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            dataType: event.target.value,
                          }
                        : previous,
                    )
                  }
                  disabled={!actorCanReview || formState.status === 'loading'}
                />
              </label>

              <label>
                {t('Tiêu đề')}
                <input
                  value={reviewForm.title}
                  onChange={(event) =>
                    setReviewForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            title: event.target.value,
                          }
                        : previous,
                    )
                  }
                  disabled={!actorCanReview || formState.status === 'loading'}
                />
              </label>

              <label>
                {t('URL ảnh/tài liệu')}
                <input
                  value={reviewForm.storageKey}
                  onChange={(event) =>
                    setReviewForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            storageKey: event.target.value,
                          }
                        : previous,
                    )
                  }
                  disabled={!actorCanReview || formState.status === 'loading'}
                />
              </label>

              <label>
                {t('Người tạo')}
                <input value={selectedItem.createdByName ?? '-'} readOnly />
              </label>

              <label className="admin-order-metadata">
                {t('Metadata (JSON)')}
                <textarea
                  rows={7}
                  value={reviewForm.metadataInput}
                  onChange={(event) =>
                    setReviewForm((previous) =>
                      previous
                        ? {
                            ...previous,
                            metadataInput: event.target.value,
                          }
                        : previous,
                    )
                  }
                  disabled={!actorCanReview || formState.status === 'loading'}
                />
              </label>

              <div className="admin-order-form-actions">
                <button
                  type="submit"
                  className="button-solid"
                  disabled={!actorCanReview || formState.status === 'loading'}
                >
                  {formState.status === 'loading' ? t('Đang xử lý...') : t('Lưu chỉnh sửa')}
                </button>
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => void handleTransition('draft')}
                  disabled={
                    !canTransitionTo(selectedItem.state, 'draft') ||
                    formState.status === 'loading'
                  }
                >
                  {t('Trả về bản nháp')}
                </button>
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => void handleTransition('approved_internal')}
                  disabled={
                    !canTransitionTo(selectedItem.state, 'approved_internal') ||
                    formState.status === 'loading'
                  }
                >
                  {t('Duyệt nội bộ')}
                </button>
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => void handleTransition('approved_sales')}
                  disabled={
                    !canTransitionTo(selectedItem.state, 'approved_sales') ||
                    formState.status === 'loading'
                  }
                >
                  {t('Duyệt cho sale')}
                </button>
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => void handleTransition('approved_buyer')}
                  disabled={
                    !canTransitionTo(selectedItem.state, 'approved_buyer') ||
                    formState.status === 'loading'
                  }
                >
                  {t('Duyệt cho khách hàng')}
                </button>
                <button
                  type="button"
                  className="button-ghost"
                  onClick={() => void handleTransition('archived')}
                  disabled={
                    !canTransitionTo(selectedItem.state, 'archived') ||
                    formState.status === 'loading'
                  }
                >
                  {t('Lưu trữ')}
                </button>
              </div>

              <p className="admin-empty">
                {t('Người duyệt')}: {selectedItem.approvedByName ?? '-'} | {t('Thời điểm duyệt')}:{' '}
                {formatDate(selectedItem.approvedAt)}
              </p>

              {formState.status === 'error' && <ErrorBlock message={formState.message} />}
            </form>
          )}
        </article>
      </section>
    </>
  );
}
