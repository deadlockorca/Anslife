import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useSiteI18n from '../../hooks/useSiteI18n';
import {
  getCurrentUser,
  isQcAttendanceOnlyUser,
  type AuthUser,
} from '../../lib/internalAuth';

const ADMIN_MODULES = [
  { path: '/admin/dashboard', label: 'Tổng quan' },
  { path: '/admin/users', label: 'Tài khoản' },
  { path: '/admin/drive-projects', label: 'Quản lý Drive' },
  { path: '/portal/drive', label: 'Dữ liệu dự án' },
  { path: '/admin/attendance', label: 'Báo cáo công việc' },
  { path: '/admin/report-data', label: 'Dữ liệu báo cáo' },
  { path: '/admin/recruitment', label: 'Tuyển dụng' },
  { path: '/admin/audit-logs', label: 'Nhật ký kiểm toán' },
] as const;

interface AdminModuleTabsProps {
  actor?: AuthUser | null;
}

export default function AdminModuleTabs({ actor }: AdminModuleTabsProps = {}) {
  const { t, toLocalizedPath } = useSiteI18n();
  const [currentUser, setCurrentUser] = useState<AuthUser | null | undefined>(
    actor === undefined ? undefined : actor,
  );

  useEffect(() => {
    if (actor !== undefined) {
      return;
    }

    let isMounted = true;
    async function loadCurrentUser() {
      try {
        const user = await getCurrentUser();
        if (isMounted) {
          setCurrentUser(user);
        }
      } catch {
        if (isMounted) {
          setCurrentUser(null);
        }
      }
    }

    void loadCurrentUser();
    return () => {
      isMounted = false;
    };
  }, [actor]);

  const visibleModules = useMemo(() => {
    const effectiveActor = actor !== undefined ? actor : currentUser;
    if (effectiveActor === undefined) {
      return [];
    }
    if (isQcAttendanceOnlyUser(effectiveActor)) {
      return ADMIN_MODULES.filter((module) => module.path === '/admin/attendance');
    }
    return ADMIN_MODULES;
  }, [actor, currentUser]);

  return (
    <nav className="admin-module-tabs" aria-label={t('Điều hướng quản trị')}>
      {visibleModules.map((module) => (
        <NavLink
          key={module.path}
          to={toLocalizedPath(module.path)}
          className={({ isActive }) =>
            `admin-module-tab${isActive ? ' is-active' : ''}`
          }
        >
          {t(module.label)}
        </NavLink>
      ))}
    </nav>
  );
}
