import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  getCurrentUser,
  getInternalDashboardSummary,
  INTERNAL_ORDER_STATUS_OPTIONS,
  logoutInternal,
  type AuthUser,
  type InternalDashboardSummary,
} from '../lib/internalAuth';

const emptySummary: InternalDashboardSummary = {
  runningOrders: 0,
  productionProgress: [],
  latestQcReports: [],
  deliverySchedule: [],
  notifications: [],
};

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

function getStatusClass(status: string): string {
  return `admin-status-pill is-order-${status.replace(/[^a-z0-9_-]/gi, '-')}`;
}

function getOrderStatusLabel(status: string): string {
  return (
    INTERNAL_ORDER_STATUS_OPTIONS.find((item) => item.code === status)?.label ?? status
  );
}

function getNotificationLevelLabel(level: string): string {
  switch (level) {
    case 'info':
      return 'Thông tin';
    case 'warning':
      return 'Cảnh báo';
    case 'error':
      return 'Lỗi';
    case 'success':
      return 'Thành công';
    default:
      return level;
  }
}

function getSeverityLabel(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'Nghiêm trọng';
    case 'major':
      return 'Mức cao';
    case 'minor':
      return 'Mức trung bình';
    case 'low':
      return 'Mức thấp';
    default:
      return severity;
  }
}

export default function AdminDashboardPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/dashboard')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);
  const [summary, setSummary] = useState<InternalDashboardSummary>(emptySummary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const payload = await getInternalDashboardSummary();
      setSummary(payload);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : t('Không thể tải trang tổng quan.');
      setError(message);
    } finally {
      setLoading(false);
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
        await loadSummary();
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
  }, [loadSummary, loginPath, navigate]);

  async function handleLogout() {
    try {
      await logoutInternal();
    } finally {
      navigate(loginPath, { replace: true });
    }
  }

  if (authChecking) {
    return (
      <>
        <Seo title={t('Cổng tổng quan')} description={t('Bảng điều khiển vận hành ANSLIFE.')} />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo title={t('Cổng tổng quan')} description={t('Bảng điều khiển vận hành ANSLIFE.')} />

      <section className="page-hero">
        <p className="kicker">{t('PORTAL LÀM VIỆC')}</p>
        <h1>{t('Tổng quan điều hành')}</h1>
        <p>{t('Theo dõi đơn hàng đang chạy, QC mới nhất, lịch giao hàng và thông báo hệ thống.')}</p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button type="button" className="button-ghost" onClick={() => void loadSummary()}>
            {t('Làm mới')}
          </button>
          <button type="button" className="button-ghost" onClick={() => void handleLogout()}>
            {t('Đăng xuất')}
          </button>
        </div>
      </section>

      <AdminModuleTabs />

      {error && <ErrorBlock message={error} />}

      {loading ? (
        <LoadingBlock />
      ) : (
        <>
          <section className="admin-dashboard-grid">
            <article className="form-card">
              <h2>{t('Đơn hàng đang chạy')}</h2>
              <p className="admin-dashboard-metric">{summary.runningOrders}</p>
            </article>

            <article className="form-card">
              <h2>{t('Tiến độ sản xuất')}</h2>
              {summary.productionProgress.length === 0 ? (
                <p className="admin-empty">{t('Chưa có dữ liệu.')}</p>
              ) : (
                <ul className="admin-dashboard-list">
                  {summary.productionProgress.map((item) => (
                    <li key={item.status}>
                      <span className={getStatusClass(item.status)}>{t(getOrderStatusLabel(item.status))}</span>
                      <strong>{item.count}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="form-card">
              <h2>{t('Thông báo hệ thống')}</h2>
              {summary.notifications.length === 0 ? (
                <p className="admin-empty">{t('Không có thông báo.')}</p>
              ) : (
                <ul className="admin-dashboard-list admin-dashboard-notifications">
                  {summary.notifications.map((item, index) => (
                    <li key={`${item.level}-${index}`}>
                      <span className={`admin-status-pill is-${item.level}`}>
                        {t(getNotificationLevelLabel(item.level))}
                      </span>
                      <p>{item.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </section>

          <section className="admin-layout-grid">
            <article className="admin-table-wrap">
              <h2>{t('Báo cáo QC mới nhất')}</h2>
              {summary.latestQcReports.length === 0 ? (
                <p className="admin-empty">{t('Chưa có dữ liệu QC.')}</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>{t('Đơn hàng')}</th>
                      <th>{t('Tiêu đề')}</th>
                      <th>{t('Mức độ')}</th>
                      <th>{t('Trạng thái')}</th>
                      <th>{t('Thời gian')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.latestQcReports.map((item) => (
                      <tr key={item.id}>
                        <td>{item.orderNo}</td>
                        <td>{item.title}</td>
                        <td>{t(getSeverityLabel(item.severity))}</td>
                        <td>
                          <span className={getStatusClass(item.state)}>{t(getOrderStatusLabel(item.state))}</span>
                        </td>
                        <td>{item.observedAt ? formatDate(item.observedAt) : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </article>

            <article className="admin-table-wrap">
              <h2>{t('Lịch giao hàng')}</h2>
              {summary.deliverySchedule.length === 0 ? (
                <p className="admin-empty">{t('Chưa có lịch giao hàng.')}</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>{t('Đơn hàng')}</th>
                      <th>{t('Khách hàng')}</th>
                      <th>{t('Nhà máy')}</th>
                      <th>{t('Trạng thái')}</th>
                      <th>{t('Hạn xử lý')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.deliverySchedule.map((item) => (
                      <tr key={`${item.orderId}-${item.orderNo}`}>
                        <td>
                          <Link to={toLocalizedPath(`/admin/orders`)}>{item.orderNo}</Link>
                        </td>
                        <td>{item.customerName}</td>
                        <td>{item.factoryName ?? '-'}</td>
                        <td>
                          <span className={getStatusClass(item.status)}>{t(getOrderStatusLabel(item.status))}</span>
                        </td>
                        <td>{formatDate(item.dueDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </article>
          </section>
        </>
      )}
    </>
  );
}
