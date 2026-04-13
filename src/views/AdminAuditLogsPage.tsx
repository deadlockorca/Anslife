import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  getCurrentUser,
  listInternalAuditLogs,
  logoutInternal,
  type AppRole,
  type AuthUser,
  type InternalAuditLog,
} from '../lib/internalAuth';

interface AuditFilters {
  action: string;
  resource: string;
  resourceId: string;
  actorUserId: string;
}

const defaultFilters: AuditFilters = {
  action: '',
  resource: '',
  resourceId: '',
  actorUserId: '',
};

const AUDIT_VIEW_ROLES: AppRole[] = ['super_admin', 'system_admin', 'data_controller'];

function canViewAudit(actor: AuthUser | null): boolean {
  if (!actor) {
    return false;
  }

  return actor.roles.some((role) => AUDIT_VIEW_ROLES.includes(role));
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

function stringifyPayload(payload: Record<string, unknown> | null): string {
  if (!payload) {
    return '-';
  }
  try {
    return JSON.stringify(payload, null, 2);
  } catch {
    return '-';
  }
}

export default function AdminAuditLogsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/audit-logs')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [filters, setFilters] = useState<AuditFilters>(defaultFilters);
  const [logs, setLogs] = useState<InternalAuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<InternalAuditLog | null>(null);

  const actorCanViewAudit = useMemo(() => canViewAudit(actor), [actor]);

  const loadLogs = useCallback(
    async (nextFilters: AuditFilters) => {
      setLoading(true);
      setError('');
      try {
        const actorUserId = nextFilters.actorUserId.trim();
        const items = await listInternalAuditLogs({
          perPage: 300,
          action: nextFilters.action.trim() || undefined,
          resource: nextFilters.resource.trim() || undefined,
          resourceId: nextFilters.resourceId.trim() || undefined,
          actorUserId:
            actorUserId && Number.isInteger(Number(actorUserId))
              ? Number(actorUserId)
              : undefined,
        });
        setLogs(items);
      } catch (loadError) {
        const message =
          loadError instanceof Error ? loadError.message : t('Không thể tải nhật ký kiểm toán.');
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
        await loadLogs(defaultFilters);
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
  }, [loadLogs, loginPath, navigate, t]);

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
    await loadLogs(filters);
  }

  async function handleResetFilters() {
    setFilters(defaultFilters);
    await loadLogs(defaultFilters);
  }

  if (authChecking) {
    return (
      <>
        <Seo
          title={t('Nhật ký kiểm toán')}
          description={t('Theo dõi lịch sử thao tác upload/duyệt/chia sẻ/tải dữ liệu.')}
        />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo
        title={t('Nhật ký kiểm toán')}
        description={t('Theo dõi lịch sử thao tác upload/duyệt/chia sẻ/tải dữ liệu.')}
      />

      <section className="page-hero">
        <p className="kicker">{t('QUẢN TRỊ')}</p>
        <h1>{t('Nhật ký kiểm toán')}</h1>
        <p>{t('Ghi nhận đầy đủ ai đã thao tác gì, trên dữ liệu nào và vào thời điểm nào.')}</p>
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
            onClick={() => void loadLogs(filters)}
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

      {!actorCanViewAudit && (
        <ErrorBlock message={t('Tài khoản hiện tại không có quyền xem nhật ký kiểm toán.')} />
      )}
      {error && <ErrorBlock message={error} />}

      <section className="filter-bar admin-order-filter">
        <form onSubmit={handleApplyFilters} className="admin-filter-form">
          <label>
            {t('Hành động')}
            <input
              value={filters.action}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  action: event.target.value,
                }))
              }
              placeholder="download"
            />
          </label>

          <label>
            {t('Tài nguyên')}
            <input
              value={filters.resource}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  resource: event.target.value,
                }))
              }
              placeholder="order_data_item"
            />
          </label>

          <label>
            {t('ID tài nguyên')}
            <input
              value={filters.resourceId}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  resourceId: event.target.value,
                }))
              }
              placeholder="123"
            />
          </label>

          <label>
            {t('ID người thao tác')}
            <input
              value={filters.actorUserId}
              onChange={(event) =>
                setFilters((previous) => ({
                  ...previous,
                  actorUserId: event.target.value,
                }))
              }
              placeholder="1"
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
          <h2>{t('Nhật ký thao tác')}</h2>
          {loading && <LoadingBlock />}
          {!loading && logs.length === 0 && (
            <p className="admin-empty">{t('Chưa có bản ghi phù hợp.')}</p>
          )}
          {!loading && logs.length > 0 && (
            <div className="admin-table-wrap">
              <table className="admin-users-table admin-orders-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('Thời điểm')}</th>
                    <th>{t('Người thao tác')}</th>
                    <th>{t('Hành động')}</th>
                    <th>{t('Tài nguyên')}</th>
                    <th>{t('ID tài nguyên')}</th>
                    <th>IP</th>
                    <th>{t('Thao tác')}</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{formatDate(log.createdAt)}</td>
                      <td>{log.actorName ?? `#${log.actorUserId ?? '-'}`}</td>
                      <td>{log.action}</td>
                      <td>{log.resource}</td>
                      <td>{log.resourceId}</td>
                      <td>{log.ipAddress ?? '-'}</td>
                      <td>
                        <button
                          type="button"
                          className="button-ghost admin-row-action"
                          onClick={() => setSelected(log)}
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
          <h2>{t('Chi tiết bản ghi')}</h2>
          {!selected ? (
            <p className="admin-empty">{t('Chọn một bản ghi để xem dữ liệu trước/sau thay đổi.')}</p>
          ) : (
            <div className="admin-sales-detail">
              <p>
                <strong>ID:</strong> {selected.id}
              </p>
              <p>
                <strong>{t('Thời điểm')}:</strong> {formatDate(selected.createdAt)}
              </p>
              <p>
                <strong>{t('Người thao tác')}:</strong> {selected.actorName ?? `#${selected.actorUserId ?? '-'}`}
              </p>
              <p>
                <strong>{t('Hành động')}:</strong> {selected.action}
              </p>
              <p>
                <strong>{t('Tài nguyên')}:</strong> {selected.resource} / {selected.resourceId}
              </p>
              <p>
                <strong>IP:</strong> {selected.ipAddress ?? '-'}
              </p>
              <label className="admin-order-metadata">
                {t('Dữ liệu trước (JSON)')}
                <textarea rows={8} readOnly value={stringifyPayload(selected.before)} />
              </label>
              <label className="admin-order-metadata">
                {t('Dữ liệu sau (JSON)')}
                <textarea rows={8} readOnly value={stringifyPayload(selected.after)} />
              </label>
            </div>
          )}
        </article>
      </section>
    </>
  );
}
