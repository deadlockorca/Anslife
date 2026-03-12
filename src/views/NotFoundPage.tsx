import { Link } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';

export default function NotFoundPage() {
  const { t, toLocalizedPath } = useSiteI18n();

  return (
    <>
      <Seo
        title={`404 - ${t('Không tìm thấy trang')}`}
        description={t('Đường dẫn không tồn tại trên hệ thống frontend hiện tại.')}
        noIndex
      />
      <section className="coming-soon">
        <p className="kicker">404</p>
        <h1>{t('Không tìm thấy trang')}</h1>
        <p>{t('Vui lòng quay lại trang chủ hoặc sử dụng menu điều hướng.')}</p>
        <Link to={toLocalizedPath('/')} className="button-solid">
          {t('Quay lại trang chủ')}
        </Link>
      </section>
    </>
  );
}
