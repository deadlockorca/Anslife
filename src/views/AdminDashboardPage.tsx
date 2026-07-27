import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminModuleTabs from '../components/admin/AdminModuleTabs';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  getCurrentUser,
  isQcAttendanceOnlyUser,
  logoutInternal,
  type AuthUser,
} from '../lib/internalAuth';

const ADMIN_OVERVIEW_MODULES = [
  {
    path: '/admin/drive-projects',
    title: 'Quản lý Drive',
    body: 'Tạo dự án Drive, gắn thư mục Google Drive và cấp quyền xem dữ liệu dự án.',
  },
  {
    path: '/portal/drive',
    title: 'Dữ liệu dự án',
    body: 'Xem dữ liệu dự án được cấp quyền theo tài khoản đăng nhập.',
  },
  {
    path: '/admin/attendance',
    title: 'Báo cáo công việc',
    body: 'Check-in, check-out, upload ảnh công việc và xem lịch sử báo cáo.',
  },
  {
    path: '/admin/report-data',
    title: 'Dữ liệu báo cáo',
    body: 'Xem trực tiếp thư mục Google Drive chứa ảnh và tài liệu báo cáo công việc.',
  },
  {
    path: '/admin/recruitment',
    title: 'Tuyển dụng',
    body: 'Quản lý vị trí tuyển dụng và hồ sơ ứng tuyển.',
  },
  {
    path: '/admin/audit-logs',
    title: 'Nhật ký kiểm toán',
    body: 'Theo dõi các hành động quan trọng trong hệ thống.',
  },
] as const;

export default function AdminDashboardPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const loginPath = useMemo(
    () => toLocalizedPath(`/admin/login?next=${encodeURIComponent('/admin/dashboard')}`),
    [toLocalizedPath],
  );

  const [authChecking, setAuthChecking] = useState(true);
  const [actor, setActor] = useState<AuthUser | null>(null);

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
        if (isQcAttendanceOnlyUser(currentUser)) {
          navigate(toLocalizedPath('/admin/attendance'), { replace: true });
          return;
        }
        setActor(currentUser);
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
  }, [loginPath, navigate, toLocalizedPath]);

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
        <Seo title={t('Tổng quan')} description={t('Bảng điều khiển vận hành ANSLIFE.')} />
        <LoadingBlock />
      </>
    );
  }

  return (
    <>
      <Seo title={t('Tổng quan')} description={t('Bảng điều khiển vận hành ANSLIFE.')} />

      <section className="page-hero">
        <p className="kicker">{t('PORTAL LÀM VIỆC')}</p>
        <h1>{t('Tổng quan')}</h1>
        <p>{t('Truy cập nhanh các module đang vận hành trong hệ thống ANSLIFE.')}</p>
      </section>

      <section className="admin-toolbar">
        <div>
          <strong>{actor?.fullName ?? '-'}</strong>
          <p>{actor?.email ?? ''}</p>
        </div>
        <div className="admin-toolbar-actions">
          <button type="button" className="button-ghost" onClick={() => window.location.reload()}>
            {t('Làm mới')}
          </button>
          <button type="button" className="button-ghost" onClick={() => void handleLogout()}>
            {t('Đăng xuất')}
          </button>
        </div>
      </section>

      <AdminModuleTabs actor={actor} />

      <section className="admin-dashboard-grid">
        {ADMIN_OVERVIEW_MODULES.map((module) => (
          <article key={module.path} className="form-card">
            <h2>{t(module.title)}</h2>
            <p className="admin-empty">{t(module.body)}</p>
            <Link to={toLocalizedPath(module.path)} className="button-ghost">
              {t('Mở module')}
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
