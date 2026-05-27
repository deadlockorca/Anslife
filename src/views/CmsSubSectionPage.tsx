import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
  const { language, t } = useSiteI18n();
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
      </>
    );
  }

  const fallbackHtml = getAIFallbackSectionHtml(config.slug, section.id, language);
  const isCustomAboutSection =
    config.slug === 'about-anslife' &&
    (section.id === 'company-intro' ||
      section.id === 'company-info' ||
      section.id === 'vision-mission' ||
      section.id === 'core-values');
  const shouldHideSectionHero =
    config.slug === 'manufacturing-ecosystem' ||
    config.slug === 'quality-control' ||
    config.slug === 'commercial-process' ||
    config.slug === 'global-network' ||
    config.slug === 'scholarship-community' ||
    (config.slug === 'resources' && section.id === 'faq') ||
    isCustomAboutSection ||
    (config.slug === 'about-anslife' &&
      (section.id === 'production-philosophy' ||
        section.id === 'development-history' ||
        section.id === 'working-standards' ||
        section.id === 'organization' ||
        section.id === 'team' ||
        section.id === 'anslife-ecosystem'));
  const shouldForceTemplateHtml =
    config.slug === 'manufacturing-ecosystem' ||
    config.slug === 'quality-control' ||
    config.slug === 'commercial-process' ||
    config.slug === 'global-network' ||
    config.slug === 'scholarship-community' ||
    (config.slug === 'resources' && section.id === 'faq') ||
    (config.slug === 'about-anslife' &&
      (section.id === 'company-intro' ||
        section.id === 'company-info' ||
        section.id === 'vision-mission' ||
        section.id === 'core-values' ||
        section.id === 'development-history' ||
        section.id === 'working-standards' ||
        section.id === 'production-philosophy' ||
        section.id === 'organization' ||
        section.id === 'team' ||
        section.id === 'anslife-ecosystem'));
  const resolvedHtml = shouldForceTemplateHtml
    ? fallbackHtml ?? data?.content.rendered
    : data?.content.rendered ?? fallbackHtml;
  const shouldShowLoading = loading && !resolvedHtml;
  const shouldShowError = Boolean(error) && !resolvedHtml;

  return (
    <>
      <Seo title={`${t(section.title)} | ${t(config.title)}`} description={t(section.description)} />
      {!shouldHideSectionHero && (
        <section className="page-hero">
          <p className="kicker">{t(config.title)}</p>
          <h1>{t(section.title)}</h1>
          <p>{t(section.description)}</p>
        </section>
      )}

      {shouldShowLoading && <LoadingBlock />}
      {shouldShowError && <ErrorBlock message={error as string} />}
      {resolvedHtml && (
        <HtmlContent
          className={`html-content html-panel ${isCustomAboutSection ? 'company-intro-page-panel' : ''}`}
          html={resolvedHtml}
        />
      )}
      {!loading && !shouldShowError && !resolvedHtml && (
        <article className="html-content html-panel">
          <p>{t(section.description)}</p>
        </article>
      )}
    </>
  );
}
