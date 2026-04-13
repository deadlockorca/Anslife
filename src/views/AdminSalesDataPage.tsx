import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  createInternalDataShareLink,
  getInternalOrderDataDownloadUrl,
  getInternalOrderDataExportUrl,
  INTERNAL_ORDER_STATUS_OPTIONS,
  listInternalDataShareLinks,
  revokeInternalDataShareLink,
  getCurrentUser,
  getInternalOrderDataItemById,
  listInternalOrderDataItems,
  logoutInternal,
  type AppRole,
  type AuthUser,
  type InternalDataShareLink,
  type InternalOrderDataItem,
} from '../lib/internalAuth';

interface SalesDataFilters {
  orderNo: string;
  state: string;
  dataType: string;
}

const defaultFilters: SalesDataFilters = {
  orderNo: '',
  state: '',
  dataType: '',
};

const SALES_VIEW_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'sale_trading',
  'sale_trading',
  'sale_trading',
];
const SHARE_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'sale_trading',
  'sale_trading',
];
const EXPORT_ROLES: AppRole[] = [
  'super_admin',
  'system_admin',
  'data_controller',
  'sale_trading',
  'sale_trading',
];

function canEnterSalesDataModule(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => SALES_VIEW_ROLES.includes(role));
}

function canManageShareLinks(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => SHARE_ROLES.includes(role));
}

function canExportData(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => EXPORT_ROLES.includes(role));
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

function renderMetadata(metadata: Record<string, unknown> | null): string {
  if (!metadata) {
    return '-';
  }

  try {
    return JSON.stringify(metadata, null, 2);
  } catch {
    return '-';
  }
}

export default function AdminSalesDataPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/sales-data')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [filters, setFilters] = useState<SalesDataFilters>(defaultFilters);
  const [items, setItems] = useState<InternalOrderDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<InternalOrderDataItem | null>(null);
  const [shareLinks, setShareLinks] = useState<InternalDataShareLink[]>([]);
  const [shareDays, setShareDays] = useState('7');
  const [copyStatus, setCopyStatus] = useState('');

  const actorCanView = useMemo(() => canEnterSalesDataModule(actor), [actor]);
  const actorCanShare = useMemo(() => canManageShareLinks(actor), [actor]);
  const actorCanExport = useMemo(() => canExportData(actor), [actor]);

  const loadItems = useCallback(
    async (nextFilters: SalesDataFilters) => {
      setLoading(true);
      setError('');
      setCopyStatus('');
      try {
        const dataItems = await listInternalOrderDataItems({
          perPage: 200,
          orderNo: nextFilters.orderNo.trim() || undefined,
          state: nextFilters.state.trim() || undefined,
          dataType: nextFilters.dataType.trim() || undefined,
        });
        setItems(dataItems);
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : t('Không thể tải dữ liệu cho bộ phận sale.');
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

  async function handleOpenItem(itemId: number) {
    setDetailLoading(true);
    setCopyStatus('');
    try {
      const [item, links] = await Promise.all([
        getInternalOrderDataItemById(itemId),
        listInternalDataShareLinks(itemId),
      ]);
      setSelectedItem(item);
      setShareLinks(links);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : t('Không thể tải chi tiết dữ liệu đã duyệt.');
      setError(message);
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleCopyLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopyStatus(t('Đã copy link tài liệu.'));
    } catch {
      setCopyStatus(t('Không copy được link. Vui lòng copy thủ công.'));
    }
  }

  function handleOpenLink(link: string) {
    window.open(link, '_blank', 'noopener,noreferrer');
  }

  function handleOpenSecureDownload(itemId: number) {
    const url = getInternalOrderDataDownloadUrl(itemId);
    handleOpenLink(url);
  }

  function handleOpenSecureExport(itemId: number) {
    const url = getInternalOrderDataExportUrl(itemId);
    handleOpenLink(url);
  }

  async function handleCreateShareLink() {
    if (!selectedItem) {
      return;
    }
    if (!actorCanShare) {
      setError(t('Bạn không có quyền tạo link chia sẻ.'));
      return;
    }

    const days = Math.floor(Number(shareDays));
    if (!Number.isFinite(days) || days < 1 || days > 365) {
      setError(t('Số ngày hết hạn không hợp lệ (1-365).'));
      return;
    }

    setDetailLoading(true);
    setError('');
    setCopyStatus('');
    try {
      const link = await createInternalDataShareLink(selectedItem.id, days);
      setShareLinks((previous) => [link, ...previous]);
      setCopyStatus(t('Đã tạo link chia sẻ mới.'));
    } catch (createError) {
      const message =
        createError instanceof Error ? createError.message : t('Không thể tạo link chia sẻ.');
      setError(message);
    } finally {
      setDetailLoading(false);
    }
  }

  async function handleRevokeShareLink(linkId: number) {
    if (!selectedItem) {
      return;
    }
    if (!actorCanShare) {
      setError(t('Bạn không có quyền thu hồi link chia sẻ.'));
      return;
    }

    setDetailLoading(true);
    setError('');
    setCopyStatus('');
    try {
      await revokeInternalDataShareLink(selectedItem.id, linkId);
      setShareLinks((previous) => previous.filter((link) => link.id !== linkId));
      setCopyStatus(t('Đã thu hồi link chia sẻ.'));
    } catch (revokeError) {
      const message =
        revokeError instanceof Error ? revokeError.message : t('Không thể thu hồi link chia sẻ.');
      setError(message);
    } finally {
      setDetailLoading(false);
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Dữ liệu sale đã duyệt')}
          description={t('Sale/Trading chỉ xem dữ liệu đã được duyệt để gửi khách hàng.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Dữ liệu sale đã duyệt')}
        description={t('Sale/Trading chỉ xem dữ liệu đã được duyệt để gửi khách hàng.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Dữ liệu sale đã duyệt')}</h1>
        <p>{t('Module dành cho Sale/Trading theo dõi dữ liệu đã được duyệt cho Sale hoặc Khách hàng.')}</p>
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
        <ErrorBlock message={t('Tài khoản hiện tại không có quyền truy cập module dữ liệu sale.')} />
      )}
      {error && <ErrorBlock message={error} />}
      {copyStatus && <div className="state-block success-text">{copyStatus}</div>}

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
              <option value="approved_sales">{t('Duyệt cho sale')}</option>
              <option value="approved_buyer">{t('Duyệt cho khách hàng')}</option>
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
          <h2>{t('Danh sách dữ liệu đã duyệt')}</h2>
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
                    <th>{t('Duyệt lúc')}</th>
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
                      <td>{formatDate(item.approvedAt)}</td>
                      <td>
                        <button
                          type="button"
                          className="button-ghost admin-row-action"
                          onClick={() => void handleOpenItem(item.id)}
                          disabled={detailLoading}
                        >
                          {t('Xem chi tiết')}
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
          <h2>{t('Chi tiết dữ liệu')}</h2>
          {!selectedItem ? (
            <p className="admin-empty">{t('Chọn một dữ liệu từ danh sách để xem chi tiết.')}</p>
          ) : (
            <div className="admin-sales-detail">
              <p>
                <strong>{t('Đơn hàng')}:</strong> {selectedItem.orderNo}
              </p>
              <p>
                <strong>{t('Khách hàng')}:</strong> {selectedItem.customer.code} - {selectedItem.customer.name}
              </p>
              <p>
                <strong>{t('Nhà máy')}:</strong> {selectedItem.factory?.name ?? '-'}
              </p>
              <p>
                <strong>{t('Tiêu đề')}:</strong> {selectedItem.title}
              </p>
              <p>
                <strong>{t('Loại dữ liệu')}:</strong> {selectedItem.dataType}
              </p>
              <p>
                <strong>{t('Trạng thái')}:</strong> {t(getStateLabel(selectedItem.state))}
              </p>
              <p>
                <strong>{t('Người duyệt')}:</strong> {selectedItem.approvedByName ?? '-'} |{' '}
                <strong>{t('Thời điểm duyệt')}:</strong> {formatDate(selectedItem.approvedAt)}
              </p>
              <label className="admin-order-metadata">
                {t('Metadata (JSON)')}
                <textarea rows={8} value={renderMetadata(selectedItem.metadata)} readOnly />
              </label>
              <div className="admin-order-form-actions">
                <button
                  type="button"
                  className="button-solid"
                  disabled={!selectedItem.storageKey}
                  onClick={() => handleOpenSecureDownload(selectedItem.id)}
                >
                  {t('Mở tài liệu')}
                </button>
                <button
                  type="button"
                  className="button-ghost"
                  disabled={!selectedItem.storageKey || !actorCanExport}
                  onClick={() => handleOpenSecureExport(selectedItem.id)}
                >
                  {t('Xuất JSON')}
                </button>
                <button
                  type="button"
                  className="button-ghost"
                  disabled={!selectedItem.storageKey}
                  onClick={() =>
                    void handleCopyLink(
                      `${window.location.origin}${getInternalOrderDataDownloadUrl(selectedItem.id)}`,
                    )
                  }
                >
                  {t('Sao chép liên kết')}
                </button>
              </div>

              <div className="admin-share-panel">
                <h3>{t('Liên kết chia sẻ')}</h3>
                {actorCanShare && (
                  <div className="admin-order-form-actions">
                    <select
                      value={shareDays}
                      onChange={(event) => setShareDays(event.target.value)}
                      disabled={detailLoading}
                    >
                      <option value="7">{t('7 ngày')}</option>
                      <option value="14">{t('14 ngày')}</option>
                      <option value="30">{t('30 ngày')}</option>
                      <option value="90">{t('90 ngày')}</option>
                    </select>
                    <button
                      type="button"
                      className="button-solid"
                      onClick={() => void handleCreateShareLink()}
                      disabled={detailLoading}
                    >
                      {t('Tạo link chia sẻ')}
                    </button>
                  </div>
                )}
                {shareLinks.length === 0 ? (
                  <p className="admin-empty">{t('Chưa có link chia sẻ cho dữ liệu này.')}</p>
                ) : (
                  <ul className="admin-share-list">
                    {shareLinks.map((link) => (
                      <li key={link.id} className="admin-share-item">
                        <p>
                          <strong>ID #{link.id}</strong> • {t('Hết hạn')}: {formatDate(link.expiresAt)}
                        </p>
                        <p className="admin-share-url">{link.url}</p>
                        <div className="admin-order-form-actions">
                          <button
                            type="button"
                            className="button-ghost"
                            onClick={() => handleOpenLink(link.url)}
                          >
                            {t('Mở link')}
                          </button>
                          <button
                            type="button"
                            className="button-ghost"
                            onClick={() => void handleCopyLink(link.url)}
                          >
                            {t('Sao chép liên kết')}
                          </button>
                          {actorCanShare && (
                            <button
                              type="button"
                              className="button-ghost"
                              onClick={() => void handleRevokeShareLink(link.id)}
                            >
                              {t('Thu hồi')}
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </article>
      </section>
    </>
  );
}
