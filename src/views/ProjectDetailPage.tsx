import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import HtmlContent from '../components/common/HtmlContent';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { stripHtmlTags } from '../lib/content';
import { getProjectBySlug } from '../lib/wp';

export default function ProjectDetailPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const { slug = '' } = useParams();
  const loadProject = useCallback(() => getProjectBySlug(slug), [slug]);
  const { data, loading, error } = useAsyncResource(loadProject);

  return (
    <>
      <Seo
        title={data?.title.rendered ?? t('Chi tiết dự án')}
        description={
          data
            ? stripHtmlTags(data.excerpt.rendered)
            : t('Thông tin chi tiết dự án và nghiên cứu điển hình ANSLIFE')
        }
      />

      <section className="page-hero">
        <p className="kicker">{t('CHI TIẾT DỰ ÁN')}</p>
        <h1>{data?.title.rendered ?? t('Chi tiết dự án')}</h1>
      </section>

      {loading && <LoadingBlock />}
      {error && <ErrorBlock message={error} />}
      {!loading && !error && !data && (
        <ErrorBlock message={t('Không tìm thấy dự án trong hệ thống dữ liệu.')} />
      )}
      {data && (
        <HtmlContent html={data.content.rendered} className="html-content html-panel" />
      )}

      <Link to={toLocalizedPath('/projects')} className="inline-link back-link">
        {t('Quay lại danh sách dự án')}
      </Link>
    </>
  );
}
