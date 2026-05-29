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
  const { sectionId = '', '*': nestedPath = '' } = useParams();

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

  const detailSlug = nestedPath.split('/').filter(Boolean)[0] ?? '';
  const isOperationsOemOdmDetail =
    config.slug === 'products-solutions' &&
    section.id === 'operations-supply-solutions' &&
    detailSlug === 'oem-odm-product-development';
  const isOperationsFeasibilityDetail =
    config.slug === 'products-solutions' &&
    section.id === 'operations-supply-solutions' &&
    detailSlug === 'project-supply-chain-feasibility-assessment';
  const isOperationsFactoryAssessmentDetail =
    config.slug === 'products-solutions' &&
    section.id === 'operations-supply-solutions' &&
    detailSlug === 'factory-capability-assessment';
  const isOperationsExportOperationDetail =
    config.slug === 'products-solutions' &&
    section.id === 'operations-supply-solutions' &&
    detailSlug === 'export-project-operation-management';
  const oemOdmSeoTitle = t('Phát triển sản phẩm OEM / ODM');
  const oemOdmSeoDescription = t(
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.',
  );
  const feasibilitySeoTitle = t('Đánh giá khả thi dự án & chuỗi cung ứng');
  const feasibilitySeoDescription = t(
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng trước khi triển khai dự án tại Việt Nam.',
  );
  const factoryAssessmentSeoTitle = t('Thẩm định năng lực nhà máy');
  const factoryAssessmentSeoDescription = t(
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.',
  );
  const exportOperationSeoTitle = t('Vận hành & quản lý dự án xuất khẩu');
  const exportOperationSeoDescription = t(
    'Điều phối tiến độ, nhà máy, vật liệu, chất lượng, chứng từ và xuất hàng cho các dự án xuất khẩu tại Việt Nam.',
  );
  const fallbackHtml = getAIFallbackSectionHtml(
    config.slug,
    section.id,
    language,
    detailSlug,
  );
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
    (config.slug === 'products-solutions' &&
      section.id === 'operations-supply-solutions') ||
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
    (config.slug === 'products-solutions' &&
      section.id === 'operations-supply-solutions') ||
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
  const seoTitle = isOperationsOemOdmDetail
    ? `${oemOdmSeoTitle} | ${t(config.title)}`
    : isOperationsFeasibilityDetail
      ? `${feasibilitySeoTitle} | ${t(config.title)}`
      : isOperationsFactoryAssessmentDetail
        ? `${factoryAssessmentSeoTitle} | ${t(config.title)}`
        : isOperationsExportOperationDetail
          ? `${exportOperationSeoTitle} | ${t(config.title)}`
      : `${t(section.title)} | ${t(config.title)}`;
  const seoDescription = isOperationsOemOdmDetail
    ? oemOdmSeoDescription
    : isOperationsFeasibilityDetail
      ? feasibilitySeoDescription
      : isOperationsFactoryAssessmentDetail
        ? factoryAssessmentSeoDescription
        : isOperationsExportOperationDetail
          ? exportOperationSeoDescription
      : t(section.description);

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} />
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
