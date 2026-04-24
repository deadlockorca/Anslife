import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import HtmlContent from '../components/common/HtmlContent';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { formatDate, stripHtmlTags } from '../lib/content';
import { getNewsBySlug } from '../lib/wp';

export default function NewsDetailPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const { slug = '' } = useParams();
  const loadNewsDetail = useCallback(async () => {
    if (!slug) {
      return null;
    }
    return getNewsBySlug(slug);
  }, [slug]);
  const { data, loading, error } = useAsyncResource(loadNewsDetail);

  return (
    <>
      <Seo
        title={data?.title.rendered ?? t('Chi tiết tin tức')}
        description={
          data
            ? stripHtmlTags(data.excerpt.rendered)
            : t('Thông tin chi tiết bài viết ANSLIFE')
        }
      />

      <section className="page-hero">
        <p className="kicker">{t('CHI TIẾT TIN TỨC')}</p>
        <h1>{data?.title.rendered ?? t('Chi tiết bài viết')}</h1>
        {data && <p className="meta-line">{t('Ngày đăng')}: {formatDate(data.date)}</p>}
      </section>

      {loading && <LoadingBlock />}
      {error && <ErrorBlock message={error} />}
      {!loading && !error && !data && (
        <ErrorBlock message={t('Không tìm thấy bài viết trong hệ thống dữ liệu.')} />
      )}
      {data && (
        <HtmlContent html={data.content.rendered} className="html-content html-panel" />
      )}

      <Link to={toLocalizedPath('/news')} className="inline-link back-link">
        {t('Quay lại danh sách tin tức')}
      </Link>
    </>
  );
}
