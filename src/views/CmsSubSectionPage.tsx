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
  const isFinishedFurnitureChairsDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    detailSlug === 'chairs';
  const isFinishedFurnitureTablesDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    detailSlug === 'tables';
  const isFinishedFurnitureStorageCabinetsDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    (detailSlug === 'storage-cabinets' || detailSlug === 'cabinets-storage');
  const isFinishedFurnitureShelvesDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    detailSlug === 'shelves';
  const isFinishedFurnitureBedsDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    detailSlug === 'beds';
  const isFinishedFurnitureRattanBambooDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    detailSlug === 'rattan-bamboo-furniture';
  const isFinishedFurnitureUpholsteredDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    (detailSlug === 'upholstered-furniture' || detailSlug === 'upholstery');
  const isFinishedFurnitureOutdoorDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    detailSlug === 'outdoor-furniture';
  const isFinishedFurnitureCustomProjectDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finished-furniture' &&
    (detailSlug === 'custom-project-furniture' ||
      detailSlug === 'hotel-resort-office-custom-furniture');
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
  const isOperationsIndependentQcDetail =
    config.slug === 'products-solutions' &&
    section.id === 'operations-supply-solutions' &&
    detailSlug === 'independent-project-qc-service';
  const isOperationsLogisticsCoordinationDetail =
    config.slug === 'products-solutions' &&
    section.id === 'operations-supply-solutions' &&
    detailSlug === 'project-logistics-import-export-coordination';
  const isOperationsVietnamStorageDetail =
    config.slug === 'products-solutions' &&
    section.id === 'operations-supply-solutions' &&
    detailSlug === 'vietnam-storage-solution';
  const isOperationsTradeFinancingDetail =
    config.slug === 'products-solutions' &&
    section.id === 'operations-supply-solutions' &&
    detailSlug === 'trade-financing';
  const isFurnitureComponentsTableTopsLegsDetail =
    config.slug === 'products-solutions' &&
    section.id === 'furniture-components' &&
    (detailSlug === 'table-tops-legs' || detailSlug === 'component-table-tops');
  const isFurnitureComponentsBedPartsDetail =
    config.slug === 'products-solutions' &&
    section.id === 'furniture-components' &&
    (detailSlug === 'bed-parts' || detailSlug === 'component-bed-parts');
  const isFurnitureComponentsUpholsteryPartsDetail =
    config.slug === 'products-solutions' &&
    section.id === 'furniture-components' &&
    (detailSlug === 'component-upholstery-parts' || detailSlug === 'upholstery-parts');
  const isFurnitureComponentsCustomPartsDetail =
    config.slug === 'products-solutions' &&
    section.id === 'furniture-components' &&
    (detailSlug === 'component-custom-parts' || detailSlug === 'custom-drawing-components');
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
  const independentQcSeoTitle = t('QC độc lập trong dự án');
  const independentQcSeoDescription = t(
    'Kiểm soát chất lượng độc lập theo tiêu chuẩn buyer, sản phẩm, vật liệu, đóng gói và từng thị trường xuất khẩu.',
  );
  const logisticsCoordinationSeoTitle = t('Điều phối logistics & xuất nhập khẩu dự án');
  const logisticsCoordinationSeoDescription = t(
    'Điều phối nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế cho các dự án tại Việt Nam.',
  );
  const vietnamStorageSeoTitle = t('Lưu kho tại Việt Nam');
  const vietnamStorageSeoDescription = t(
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn và hàng tồn dự phòng tại Việt Nam để hỗ trợ sản xuất, kiểm soát chất lượng và xuất hàng định kỳ.',
  );
  const tradeFinancingSeoTitle = t('Tài trợ thương mại');
  const tradeFinancingSeoDescription = t(
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC, chứng từ và xuất hàng.',
  );
  const tableTopsLegsSeoTitle = language === 'vn' ? 'Mặt bàn & chân bàn' : 'Table Tops & Table Legs';
  const tableTopsLegsSeoDescription =
    language === 'vn'
      ? 'Sơ đồ cấu kiện mặt bàn, chân bàn, chi tiết liên kết và các kiểu mộng phổ biến.'
      : 'Diagram of table top, table leg, connection details, and common joints.';
  const bedPartsSeoTitle = language === 'vn' ? 'Bộ phận giường' : 'Bed Parts';
  const bedPartsSeoDescription =
    language === 'vn'
      ? 'Sơ đồ cấu kiện giường, đầu giường, ray bên, nan giường, chân giường và các chi tiết liên kết tiêu biểu.'
      : 'Diagram of bed components, headboard, side rails, slats, legs, and typical connection details.';
  const upholsteryPartsSeoTitle = language === 'vn' ? 'Bộ phận bọc nệm' : 'Upholstery Parts';
  const upholsteryPartsSeoDescription =
    language === 'vn'
      ? 'Sơ đồ cấu tạo bộ phận bọc nệm sofa, khung, foam, cushion, tay ghế, chân và chi tiết liên kết tiêu biểu.'
      : 'Diagram of upholstery parts, sofa frame, foam, cushions, arms, legs, and typical connection details.';
  const customPartsSeoTitle =
    language === 'vn' ? 'Cấu kiện tùy chỉnh theo bản vẽ' : 'Custom Drawing Components';
  const customPartsSeoDescription =
    language === 'vn'
      ? 'Cấu kiện nội thất tùy chỉnh theo bản vẽ kỹ thuật, mẫu thật, mã chi tiết, yêu cầu gia công và tiêu chuẩn riêng của buyer.'
      : 'Custom furniture components based on technical drawings, physical samples, part codes, machining requirements, and buyer-specific standards.';
  const chairsSeoTitle = language === 'vn' ? 'Ghế' : 'Chairs';
  const chairsSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu các dòng ghế tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for chair programs in Vietnam.';
  const tablesSeoTitle = language === 'vn' ? 'Bàn' : 'Tables';
  const tablesSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu các dòng bàn tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for table programs in Vietnam.';
  const storageCabinetsSeoTitle = language === 'vn' ? 'Tủ & lưu trữ' : 'Cabinets & Storage';
  const storageCabinetsSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu các dòng tủ và hệ lưu trữ tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for cabinet and storage programs in Vietnam.';
  const shelvesSeoTitle = language === 'vn' ? 'Kệ' : 'Shelves';
  const shelvesSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu các dòng kệ tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for shelf programs in Vietnam.';
  const bedsSeoTitle = language === 'vn' ? 'Giường' : 'Beds';
  const bedsSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu các dòng giường tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for bed programs in Vietnam.';
  const rattanBambooSeoTitle =
    language === 'vn' ? 'Nội thất mây tre' : 'Rattan & Bamboo Furniture';
  const rattanBambooSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu các sản phẩm nội thất mây tre tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for rattan and bamboo furniture products in Vietnam.';
  const upholsteredSeoTitle =
    language === 'vn' ? 'Nội thất bọc nệm' : 'Upholstered Furniture';
  const upholsteredSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu các sản phẩm nội thất bọc nệm tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for upholstered furniture products in Vietnam.';
  const outdoorSeoTitle = language === 'vn' ? 'Nội thất ngoài trời' : 'Outdoor Furniture';
  const outdoorSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu các sản phẩm nội thất ngoài trời tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for outdoor furniture products in Vietnam.';
  const customProjectSeoTitle =
    language === 'vn'
      ? 'Nội thất tùy chỉnh cho dự án khách sạn, nhà hàng, văn phòng và resort'
      : 'Custom Furniture for Hotel, Restaurant, Office and Resort Projects';
  const customProjectSeoDescription =
    language === 'vn'
      ? 'Năng lực phát triển, sản xuất, kiểm soát chất lượng, đóng gói và xuất khẩu nội thất tùy chỉnh cho các dự án khách sạn, nhà hàng, văn phòng và resort tại Việt Nam.'
      : 'Development, manufacturing, quality control, packing, and export capability for custom furniture projects in hotels, restaurants, offices, and resorts in Vietnam.';
  const fallbackHtml = getAIFallbackSectionHtml(
    config.slug,
    section.id,
    language,
    detailSlug,
  );
  const shouldRenderBlankScholarshipPage =
    config.slug === 'about-anslife' && section.id === 'scholarship-community';
  const shouldRenderBlankQualityInProcessPage =
    config.slug === 'quality-control' && section.id === 'in-process-inspection';
  const shouldRenderBlankSubSectionPage =
    shouldRenderBlankScholarshipPage || shouldRenderBlankQualityInProcessPage;
  const isCustomAboutSection =
    config.slug === 'about-anslife' &&
    (section.id === 'philosophy' ||
      section.id === 'company-intro' ||
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
      (section.id === 'operations-supply-solutions' ||
        section.id === 'finished-furniture' ||
        section.id === 'furniture-components')) ||
    (config.slug === 'resources' && section.id === 'faq') ||
    isCustomAboutSection ||
    (config.slug === 'about-anslife' &&
      (section.id === 'philosophy' ||
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
      (section.id === 'operations-supply-solutions' ||
        section.id === 'finished-furniture' ||
        section.id === 'furniture-components')) ||
    (config.slug === 'resources' && section.id === 'faq') ||
    (config.slug === 'about-anslife' &&
      (section.id === 'philosophy' ||
        section.id === 'company-intro' ||
        section.id === 'company-info' ||
        section.id === 'vision-mission' ||
        section.id === 'core-values' ||
        section.id === 'development-history' ||
        section.id === 'working-standards' ||
        section.id === 'organization' ||
        section.id === 'team' ||
        section.id === 'anslife-ecosystem'));
  const resolvedHtml = shouldRenderBlankSubSectionPage
    ? ''
    : shouldForceTemplateHtml
      ? fallbackHtml ?? data?.content.rendered
      : data?.content.rendered ?? fallbackHtml;
  const shouldShowLoading = !shouldRenderBlankSubSectionPage && loading && !resolvedHtml;
  const shouldShowError =
    !shouldRenderBlankSubSectionPage && Boolean(error) && !resolvedHtml;
  const seoTitle = isFinishedFurnitureChairsDetail
    ? `${chairsSeoTitle} | ${t(config.title)}`
    : isFinishedFurnitureTablesDetail
      ? `${tablesSeoTitle} | ${t(config.title)}`
      : isFinishedFurnitureStorageCabinetsDetail
        ? `${storageCabinetsSeoTitle} | ${t(config.title)}`
        : isFinishedFurnitureShelvesDetail
          ? `${shelvesSeoTitle} | ${t(config.title)}`
          : isFinishedFurnitureBedsDetail
            ? `${bedsSeoTitle} | ${t(config.title)}`
            : isFinishedFurnitureRattanBambooDetail
              ? `${rattanBambooSeoTitle} | ${t(config.title)}`
              : isFinishedFurnitureUpholsteredDetail
                ? `${upholsteredSeoTitle} | ${t(config.title)}`
                : isFinishedFurnitureOutdoorDetail
                  ? `${outdoorSeoTitle} | ${t(config.title)}`
                : isFinishedFurnitureCustomProjectDetail
                  ? `${customProjectSeoTitle} | ${t(config.title)}`
    : isOperationsOemOdmDetail
      ? `${oemOdmSeoTitle} | ${t(config.title)}`
      : isOperationsFeasibilityDetail
      ? `${feasibilitySeoTitle} | ${t(config.title)}`
      : isOperationsFactoryAssessmentDetail
        ? `${factoryAssessmentSeoTitle} | ${t(config.title)}`
        : isOperationsExportOperationDetail
          ? `${exportOperationSeoTitle} | ${t(config.title)}`
          : isOperationsIndependentQcDetail
            ? `${independentQcSeoTitle} | ${t(config.title)}`
            : isOperationsLogisticsCoordinationDetail
              ? `${logisticsCoordinationSeoTitle} | ${t(config.title)}`
              : isOperationsVietnamStorageDetail
                ? `${vietnamStorageSeoTitle} | ${t(config.title)}`
                : isOperationsTradeFinancingDetail
                  ? `${tradeFinancingSeoTitle} | ${t(config.title)}`
                  : isFurnitureComponentsTableTopsLegsDetail
                    ? `${tableTopsLegsSeoTitle} | ${t(config.title)}`
                    : isFurnitureComponentsBedPartsDetail
                      ? `${bedPartsSeoTitle} | ${t(config.title)}`
                      : isFurnitureComponentsUpholsteryPartsDetail
                        ? `${upholsteryPartsSeoTitle} | ${t(config.title)}`
                        : isFurnitureComponentsCustomPartsDetail
                          ? `${customPartsSeoTitle} | ${t(config.title)}`
      : `${t(section.title)} | ${t(config.title)}`;
  const seoDescription = isFinishedFurnitureChairsDetail
    ? chairsSeoDescription
    : isFinishedFurnitureTablesDetail
      ? tablesSeoDescription
      : isFinishedFurnitureStorageCabinetsDetail
        ? storageCabinetsSeoDescription
        : isFinishedFurnitureShelvesDetail
          ? shelvesSeoDescription
          : isFinishedFurnitureBedsDetail
            ? bedsSeoDescription
            : isFinishedFurnitureRattanBambooDetail
              ? rattanBambooSeoDescription
              : isFinishedFurnitureUpholsteredDetail
                ? upholsteredSeoDescription
                : isFinishedFurnitureOutdoorDetail
                  ? outdoorSeoDescription
                : isFinishedFurnitureCustomProjectDetail
                  ? customProjectSeoDescription
    : isOperationsOemOdmDetail
      ? oemOdmSeoDescription
      : isOperationsFeasibilityDetail
      ? feasibilitySeoDescription
      : isOperationsFactoryAssessmentDetail
        ? factoryAssessmentSeoDescription
        : isOperationsExportOperationDetail
          ? exportOperationSeoDescription
          : isOperationsIndependentQcDetail
            ? independentQcSeoDescription
            : isOperationsLogisticsCoordinationDetail
              ? logisticsCoordinationSeoDescription
              : isOperationsVietnamStorageDetail
                ? vietnamStorageSeoDescription
              : isOperationsTradeFinancingDetail
                  ? tradeFinancingSeoDescription
                  : isFurnitureComponentsTableTopsLegsDetail
                    ? tableTopsLegsSeoDescription
                    : isFurnitureComponentsBedPartsDetail
                      ? bedPartsSeoDescription
                    : isFurnitureComponentsUpholsteryPartsDetail
                      ? upholsteryPartsSeoDescription
                    : isFurnitureComponentsCustomPartsDetail
                      ? customPartsSeoDescription
                    : t(section.description);

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} />
      {!shouldHideSectionHero && (
        <section className="page-hero">
          <p className="kicker">{t(config.title)}</p>
          <h1>{t(section.title)}</h1>
          {section.description && <p>{t(section.description)}</p>}
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
      {!shouldRenderBlankSubSectionPage && !loading && !shouldShowError && !resolvedHtml && (
        <article className="html-content html-panel">
          <p>{t(section.description)}</p>
        </article>
      )}
    </>
  );
}
