import { NavLink } from 'react-router-dom';
import useSiteI18n from '../../hooks/useSiteI18n';

const ADMIN_MODULES = [
  { path: '/admin/dashboard', label: 'Tổng quan' },
  { path: '/admin/products', label: 'Sản phẩm' },
  { path: '/admin/users', label: 'Người dùng' },
  { path: '/admin/customers', label: 'Khách hàng' },
  { path: '/admin/factories', label: 'Nhà máy' },
  { path: '/admin/orders', label: 'Đơn hàng' },
  { path: '/admin/logistics', label: 'Vận chuyển' },
  { path: '/admin/work-logs', label: 'Nhật ký làm việc' },
  { path: '/admin/data-upload', label: 'Tải dữ liệu QC/Nhà máy' },
  { path: '/admin/data-review', label: 'Duyệt dữ liệu' },
  { path: '/admin/qc-portal', label: 'Cổng QC' },
  { path: '/admin/capa-portal', label: 'Cổng CAPA' },
  { path: '/admin/factory-surveys', label: 'Khảo sát nhà máy' },
  { path: '/admin/sales-data', label: 'Dữ liệu sale' },
  { path: '/admin/buyer-portal', label: 'Cổng khách hàng' },
  { path: '/admin/attendance', label: 'Chấm công' },
  { path: '/admin/audit-logs', label: 'Nhật ký kiểm toán' },
] as const;

export default function AdminModuleTabs() {
  const { t, toLocalizedPath } = useSiteI18n();

  return (
    <nav className="admin-module-tabs" aria-label={t('Điều hướng quản trị')}>
      {ADMIN_MODULES.map((module) => (
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
