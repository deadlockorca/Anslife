import { useCallback, useMemo } from 'react';
import HtmlContent from '../components/common/HtmlContent';
import LoadingBlock from '../components/common/LoadingBlock';
import ErrorBlock from '../components/common/ErrorBlock';
import PageSections from '../components/common/PageSections';
import Seo from '../components/seo/Seo';
import type { StaticPageConfig } from '../config/site';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { getAIFallbackPageHtml } from '../content/aiGeneratedContent';
import { getPageBySlug } from '../lib/wp';

interface CmsSectionPageProps {
  config: StaticPageConfig;
}

export default function CmsSectionPage({ config }: CmsSectionPageProps) {
  const { language, t } = useSiteI18n();
  const loadPage = useCallback(() => getPageBySlug(config.slug), [config.slug]);
  const { data, loading, error } = useAsyncResource(loadPage);
  const fallbackHtml = getAIFallbackPageHtml(config.slug, language);
  const resolvedHtml = data?.content.rendered ?? fallbackHtml;
  const displayHtml = useMemo(() => {
    if (!resolvedHtml || config.slug !== 'manufacturing-ecosystem') {
      return resolvedHtml;
    }

    return config.sections.reduce((html, section) => {
      const escapedId = section.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const sectionPattern = new RegExp(
        `<section\\s+id="${escapedId}"[^>]*>[\\s\\S]*?<\\/section>`,
        'gi',
      );
      return html.replace(sectionPattern, '');
    }, resolvedHtml);
  }, [config.sections, config.slug, resolvedHtml]);
  const shouldShowLoading = loading && !resolvedHtml;
  const shouldShowError = Boolean(error) && !resolvedHtml;

  return (
    <>
      <Seo title={t(config.title)} description={t(config.summary)} />
      <section className="page-hero">
        <p className="kicker">{t('TRANG WEB ANSLIFE V1')}</p>
        <h1>{t(config.title)}</h1>
        <p>{t(config.summary)}</p>
      </section>

      {shouldShowLoading && <LoadingBlock />}
      {shouldShowError && <ErrorBlock message={error as string} />}
      {displayHtml && (
        <HtmlContent
          className="html-content html-panel"
          html={displayHtml}
        />
      )}

      <PageSections sections={config.sections} basePath={config.path} />
    </>
  );
}
