import { useCallback, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import HtmlContent from '../components/common/HtmlContent';
import LoadingBlock from '../components/common/LoadingBlock';
import ErrorBlock from '../components/common/ErrorBlock';
import Seo from '../components/seo/Seo';
import { getAIFallbackSectionHtml } from '../content/aiGeneratedContent';
import type { StaticPageConfig } from '../config/site';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { getPageBySlug } from '../lib/wp';

interface CmsSubSectionPageProps {
  config: StaticPageConfig;
}

export default function CmsSubSectionPage({ config }: CmsSubSectionPageProps) {
  const { t, toLocalizedPath } = useSiteI18n();
  const { sectionId = '' } = useParams();

  const section = useMemo(
    () => config.sections.find((item) => item.id === sectionId) ?? null,
    [config.sections, sectionId],
  );

  const cmsSlug = section ? `${config.slug}-${section.id}` : '';
  const loadSectionPage = useCallback(() => {
    if (!cmsSlug) {
      return Promise.resolve(null);
    }

    return getPageBySlug(cmsSlug);
  }, [cmsSlug]);
  const { data, loading, error } = useAsyncResource(loadSectionPage);

  if (!section) {
    return (
      <>
        <Seo
          title={t('Không tìm thấy trang')}
          description={t('Đường dẫn không tồn tại trên hệ thống frontend hiện tại.')}
        />
        <ErrorBlock message={t('Đường dẫn không tồn tại trên hệ thống frontend hiện tại.')} />
        <Link to={toLocalizedPath(config.path)} className="inline-link back-link">
          {t('Xem toàn bộ')} {t(config.title)}
        </Link>
      </>
    );
  }

  const fallbackHtml = getAIFallbackSectionHtml(config.slug, section.id);
  const shouldForceTemplateHtml =
    config.slug === 'manufacturing-ecosystem' && section.id === 'production-system';
  const resolvedHtml = shouldForceTemplateHtml
    ? fallbackHtml ?? data?.content.rendered
    : data?.content.rendered ?? fallbackHtml;
  const shouldShowLoading = loading && !resolvedHtml;
  const shouldShowError = Boolean(error) && !resolvedHtml;

  return (
    <>
      <Seo title={`${t(section.title)} | ${t(config.title)}`} description={t(section.description)} />
      <section className="page-hero compact">
        <p className="kicker">{t(config.title)}</p>
        <h1>{t(section.title)}</h1>
        <p>{t(section.description)}</p>
      </section>

      {shouldShowLoading && <LoadingBlock />}
      {shouldShowError && <ErrorBlock message={error as string} />}
      {resolvedHtml && <HtmlContent className="html-content html-panel" html={resolvedHtml} />}
      {!loading && !shouldShowError && !resolvedHtml && (
        <article className="html-content html-panel">
          <p>{t(section.description)}</p>
        </article>
      )}

      <Link to={toLocalizedPath(config.path)} className="inline-link back-link">
        {t('Xem toàn bộ')} {t(config.title)}
      </Link>
    </>
  );
}
