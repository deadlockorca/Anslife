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
  const hiddenAboutSectionIds = useMemo(
    () => new Set(['vision-mission', 'core-values']),
    [],
  );
  const loadPage = useCallback(() => getPageBySlug(config.slug), [config.slug]);
  const { data, loading, error } = useAsyncResource(loadPage);
  const fallbackHtml = getAIFallbackPageHtml(config.slug, language);
  const shouldForceTemplatePage = config.slug === 'scholarship-community';
  const resolvedHtml = shouldForceTemplatePage
    ? fallbackHtml
    : data?.content.rendered ?? fallbackHtml;
  const sectionListForNavigation = useMemo(
    () =>
      config.slug === 'about-anslife'
        ? config.sections.filter((section) => !hiddenAboutSectionIds.has(section.id))
        : config.sections,
    [config.sections, config.slug, hiddenAboutSectionIds],
  );
  const shouldHideHeroKicker =
    config.slug === 'about-anslife' || config.slug === 'global-network';
  const shouldHideAboutHeroSummary = config.slug === 'about-anslife';
  const displayHtml = useMemo(() => {
    if (!resolvedHtml) {
      return resolvedHtml;
    }

    const htmlWithoutBanner =
      config.slug === 'about-anslife' || config.slug === 'global-network'
        ? resolvedHtml.replace(/<figure class="ai-banner">[\s\S]*?<\/figure>/i, '')
        : resolvedHtml;

    if (config.slug !== 'manufacturing-ecosystem') {
      return htmlWithoutBanner;
    }

    return config.sections.reduce((html, section) => {
      const escapedId = section.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const sectionPattern = new RegExp(
        `<section\\s+id="${escapedId}"[^>]*>[\\s\\S]*?<\\/section>`,
        'gi',
      );
      return html.replace(sectionPattern, '');
    }, htmlWithoutBanner);
  }, [config.sections, config.slug, resolvedHtml]);
  const shouldShowLoading = !shouldForceTemplatePage && loading && !resolvedHtml;
  const shouldShowError = !shouldForceTemplatePage && Boolean(error) && !resolvedHtml;

  return (
    <>
      <Seo title={t(config.title)} description={t(config.summary)} />
      <section className="page-hero">
        {!shouldHideHeroKicker && <p className="kicker">{t('TRANG WEB ANSLIFE V1')}</p>}
        <h1>{t(config.title)}</h1>
        {!shouldHideAboutHeroSummary && config.summary && <p>{t(config.summary)}</p>}
      </section>

      {shouldShowLoading && <LoadingBlock />}
      {shouldShowError && <ErrorBlock message={error as string} />}
      {displayHtml && (
        <HtmlContent
          className="html-content html-panel"
          html={displayHtml}
        />
      )}

      <PageSections sections={sectionListForNavigation} basePath={config.path} />
    </>
  );
}
