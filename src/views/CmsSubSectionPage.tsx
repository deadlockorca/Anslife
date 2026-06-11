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
  const isFinishingNaturalDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finishing' &&
    detailSlug === 'natural-finish';
  const isFinishingStainDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finishing' &&
    detailSlug === 'stain';
  const isFinishingLacquerDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finishing' &&
    detailSlug === 'lacquer';
  const isFinishingOilFinishDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finishing' &&
    detailSlug === 'oil-finish';
  const isFinishingPaintedDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finishing' &&
    detailSlug === 'painted-finish';
  const isFinishingMatteDetail =
    config.slug === 'products-solutions' &&
    section.id === 'finishing' &&
    detailSlug === 'matte-finish';
  const isProductsFinishingLanding =
    config.slug === 'products-solutions' && section.id === 'finishing' && !detailSlug;
  const isProductsFinishingDetail =
    config.slug === 'products-solutions' && section.id === 'finishing' && Boolean(detailSlug);
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
  const naturalFinishSeoTitle = language === 'vn' ? 'Hoàn thiện tự nhiên' : 'Natural Finish';
  const naturalFinishSeoDescription =
    language === 'vn'
      ? 'Giải pháp hoàn thiện tự nhiên giữ lại vân gỗ, màu gỗ và cảm giác bề mặt thật theo mẫu duyệt của buyer.'
      : 'Natural finish solution that preserves wood grain, natural color, and touch-and-feel according to buyer-approved samples.';
  const stainSeoTitle = language === 'vn' ? 'Stain' : 'Stain';
  const stainSeoDescription =
    language === 'vn'
      ? 'Giải pháp stain kiểm soát tone màu, độ thấm màu, chiều sâu vân gỗ và độ ổn định giữa các lô sản xuất.'
      : 'Stain solution controlling color tone, absorption, wood grain depth, and batch-to-batch stability.';
  const paintedFinishSeoTitle = language === 'vn' ? 'Hoàn thiện sơn màu' : 'Painted Finish';
  const paintedFinishSeoDescription =
    language === 'vn'
      ? 'Khung giải pháp hoàn thiện sơn màu kiểm soát màu sắc, độ phủ, độ đồng đều và độ bền bề mặt.'
      : 'Painted finish framework controlling color, coverage, consistency, and surface durability.';
  const matteFinishSeoTitle = language === 'vn' ? 'Hoàn thiện mờ' : 'Matte Finish';
  const matteFinishSeoDescription =
    language === 'vn'
      ? 'Khung giải pháp hoàn thiện mờ kiểm soát độ mờ, độ mịn, phản xạ ánh sáng và cảm giác chạm.'
      : 'Matte finish framework controlling sheen level, smoothness, light reflection, and touch feel.';
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
  const isSupplyHubOverviewPage =
    config.slug === 'vietnam-supply-hub' && section.id === 'overview' && !detailSlug;
  const isSupplyHubStorageSolutionPage =
    config.slug === 'vietnam-supply-hub' && section.id === 'storage-solution' && !detailSlug;
  const shouldRenderBlankScholarshipPage =
    config.slug === 'about-anslife' && section.id === 'scholarship-community';
  const shouldRenderBlankQualityInProcessPage =
    config.slug === 'quality-control' && section.id === 'in-process-inspection';
  const shouldRenderBlankSubSectionPage =
    shouldRenderBlankScholarshipPage ||
    shouldRenderBlankQualityInProcessPage ||
    isSupplyHubOverviewPage ||
    isSupplyHubStorageSolutionPage;
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
        section.id === 'furniture-components' ||
        section.id === 'finishing')) ||
    isProductsFinishingDetail ||
    (config.slug === 'resources' && section.id === 'faq') ||
    isSupplyHubOverviewPage ||
    isSupplyHubStorageSolutionPage ||
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
    isFinishingNaturalDetail ||
    isFinishingStainDetail ||
    isFinishingLacquerDetail ||
    isFinishingOilFinishDetail ||
    isFinishingPaintedDetail ||
    isFinishingMatteDetail ||
    isProductsFinishingLanding ||
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
  const shouldShowSupplyHubOverviewBanner = isSupplyHubOverviewPage;
  const shouldShowSupplyHubStorageSolutionBanner = isSupplyHubStorageSolutionPage;
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
                        : isFinishingNaturalDetail
                          ? `${naturalFinishSeoTitle} | ${t(config.title)}`
                          : isFinishingStainDetail
                            ? `${stainSeoTitle} | ${t(config.title)}`
                          : isFinishingPaintedDetail
                            ? `${paintedFinishSeoTitle} | ${t(config.title)}`
                          : isFinishingMatteDetail
                            ? `${matteFinishSeoTitle} | ${t(config.title)}`
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
                    : isFinishingNaturalDetail
                      ? naturalFinishSeoDescription
                      : isFinishingStainDetail
                        ? stainSeoDescription
                      : isFinishingPaintedDetail
                        ? paintedFinishSeoDescription
                    : isFinishingMatteDetail
                      ? matteFinishSeoDescription
                    : t(section.description);
  const supplyHubStorageSupportCards = [
    {
      number: '1',
      title: 'Lưu kho thành phẩm',
      image: '/assets/supply-hub/storage-support/finished-goods.webp',
      body: 'Lưu trữ hàng hóa đã hoàn thiện và sẵn sàng xuất khẩu theo kế hoạch giao hàng của buyer.',
      listTitle: 'Phù hợp với:',
      items: [
        'Đơn hàng xuất định kỳ',
        'Chương trình tồn kho đệm',
        'Dự án nhiều đợt giao hàng',
        'Hàng chờ gom container',
      ],
    },
    {
      number: '2',
      title: 'Lưu kho cấu kiện & bán thành phẩm',
      image: '/assets/supply-hub/storage-support/components-semi-finished.webp',
      body: 'Lưu trữ các cấu kiện nội thất, linh kiện hoặc bán thành phẩm phục vụ lắp ráp và sản xuất theo từng giai đoạn.',
      listTitle: 'Bao gồm:',
      items: [
        'Khung ghế',
        'Mặt bàn',
        'Chân gỗ',
        'Bộ phận tủ',
        'Bộ phận bọc nệm',
        'Cấu kiện theo bản vẽ riêng',
      ],
    },
    {
      number: '3',
      title: 'Lưu kho vật liệu',
      image: '/assets/supply-hub/storage-support/materials.webp',
      body: 'Hỗ trợ lưu trữ vật liệu phục vụ sản xuất hoặc dự án dài hạn.',
      listTitle: 'Bao gồm:',
      items: ['Gỗ tự nhiên', 'Plywood', 'MDF', 'Veneer', 'Foam', 'Vải', 'Da', 'Vật liệu đóng gói'],
    },
    {
      number: '4',
      title: 'Tồn kho đệm (Buffer Inventory)',
      image: '/assets/supply-hub/storage-support/buffer-inventory.webp',
      body: 'Duy trì lượng tồn kho dự phòng tại Việt Nam để đáp ứng nhanh các nhu cầu phát sinh hoặc đơn hàng bổ sung.',
      listTitle: 'Lợi ích:',
      items: [
        'Rút ngắn thời gian giao hàng',
        'Giảm rủi ro đứt gãy chuỗi cung ứng',
        'Hạn chế thiếu hàng trong mùa cao điểm',
        'Tăng khả năng phản ứng với nhu cầu thị trường',
      ],
    },
  ];
  const supplyHubStorageModelCards = [
    {
      number: '1.',
      title: 'Tồn kho theo đơn hàng',
      image: '/assets/supply-hub/storage-models/order-inventory.webp',
      body: 'Hàng hóa được lưu kho phục vụ cho các đơn hàng đã xác nhận hoặc kế hoạch giao hàng cụ thể.',
    },
    {
      number: '2.',
      title: 'Tồn kho đệm theo chương trình',
      image: '/assets/supply-hub/storage-models/program-buffer.webp',
      body: 'Buyer duy trì lượng hàng dự phòng tại Việt Nam để xuất theo nhu cầu thực tế.',
    },
    {
      number: '3.',
      title: 'Tồn kho vật liệu',
      image: '/assets/supply-hub/storage-models/material-inventory.webp',
      body: 'Vật liệu được lưu trữ tập trung để cấp phát cho nhiều nhà máy hoặc nhiều dự án khác nhau.',
    },
    {
      number: '4.',
      title: 'Tồn kho dự án',
      image: '/assets/supply-hub/storage-models/project-inventory.webp',
      body: 'Lưu kho hàng hóa, vật liệu hoặc cấu kiện phục vụ các dự án khách sạn, resort, nhà hàng hoặc chuỗi bán lẻ.',
    },
  ];
  const supplyHubStorageOperationCards = [
    {
      title: 'Quản lý tồn kho',
      image: '/assets/supply-hub/storage-operations/inventory-management.webp',
      body: 'ANSLIFE hỗ trợ theo dõi và quản lý tồn kho theo từng buyer, từng dự án hoặc từng mã sản phẩm.',
      listTitle: 'Có thể quản lý:',
      items: [
        'Mã sản phẩm',
        'Số lượng tồn kho',
        'Lô sản xuất',
        'Ngày nhập kho',
        'Ngày xuất kho',
        'Trạng thái hàng hóa',
        'Kế hoạch xuất hàng',
      ],
    },
    {
      title: 'Kết nối với chuỗi cung ứng',
      image: '/assets/supply-hub/storage-operations/supply-chain-connection.webp',
      body: 'Giải pháp lưu kho của ANSLIFE có thể kết nối trực tiếp với các dịch vụ khác trong hệ sinh thái cung ứng:',
      items: [
        'Gom hàng LCL / FCL',
        'Điều phối xuất hàng định kỳ',
        'Hỗ trợ chứng từ xuất khẩu',
        'Quản lý vật liệu và cấu kiện',
        'QC độc lập',
        'Vận hành dự án xuất khẩu',
      ],
    },
  ];
  const supplyHubStorageBuyerBenefits = [
    {
      number: '1.',
      title: 'Giảm áp lực tồn kho tại thị trường đích',
      image: '/assets/supply-hub/storage-buyer-benefits/reduce-destination-inventory.webp',
      body: 'Không cần duy trì lượng lớn hàng hóa tại Nhật Bản, Singapore, Mỹ hoặc Châu Âu.',
    },
    {
      number: '2.',
      title: 'Tăng tính linh hoạt',
      image: '/assets/supply-hub/storage-buyer-benefits/flexibility.webp',
      body: 'Có thể xuất hàng theo nhu cầu thực tế thay vì nhập toàn bộ một lần.',
    },
    {
      number: '3.',
      title: 'Rút ngắn thời gian phản hồi',
      image: '/assets/supply-hub/storage-buyer-benefits/response-time.webp',
      body: 'Hàng hóa luôn sẵn sàng tại Việt Nam để điều phối và xuất khẩu.',
    },
    {
      number: '4.',
      title: 'Giảm rủi ro chuỗi cung ứng',
      image: '/assets/supply-hub/storage-buyer-benefits/supply-risk.webp',
      body: 'Duy trì nguồn cung ổn định trong các giai đoạn cao điểm hoặc biến động thị trường.',
    },
    {
      number: '5.',
      title: 'Tối ưu chi phí vận hành',
      image: '/assets/supply-hub/storage-buyer-benefits/operating-cost.webp',
      body: 'Giảm chi phí lưu kho tại thị trường tiêu thụ và tăng hiệu quả sử dụng vốn.',
    },
  ];
  const supplyHubStorageProcessSteps = [
    'Đánh giá nhu cầu tồn kho',
    'Xây dựng kế hoạch lưu kho',
    'Nhập kho & phân loại',
    'Theo dõi tồn kho',
    'Nhận yêu cầu xuất hàng',
    'Điều phối logistics',
    'Xuất khẩu & giao hàng',
  ];

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
      {shouldShowSupplyHubOverviewBanner && (
        <figure className="supply-hub-overview-banner">
          <img
            src="/assets/supply-hub/overview-banner.png"
            alt={t('Sơ đồ Vietnam Supply Hub')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-overview-banner-copy">
            <span>{t('Tổng quan mô hình')}</span>
            <strong>{t('Supply Hub')}</strong>
            <p>
              {t(
                'ANSLIFE hỗ trợ buyer quốc tế quản lý nguồn cung tại Việt Nam thông qua một đầu mối điều phối tập trung, bao gồm lưu kho, tồn kho đệm, gom hàng, điều phối xuất hàng, chứng từ và phòng mẫu chuẩn đối tác.',
              )}
            </p>
            <div className="supply-hub-overview-feature-strip" aria-label={t('Các năng lực chính')}>
              <article>
                <img
                  src="/assets/supply-hub/banner-icons/coordination.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                />
                <span>{t('Một đầu mối điều phối')}</span>
              </article>
              <article>
                <img
                  src="/assets/supply-hub/banner-icons/buffer-storage.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                />
                <span>{t('Lưu kho & tồn kho đệm')}</span>
              </article>
              <article>
                <img
                  src="/assets/supply-hub/banner-icons/consolidation.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                />
                <span>{t('Gom hàng LCL / FCL')}</span>
              </article>
              <article>
                <img
                  src="/assets/supply-hub/banner-icons/scheduled-shipment.webp"
                  alt=""
                  loading="eager"
                  decoding="async"
                />
                <span>{t('Xuất hàng định kỳ')}</span>
              </article>
            </div>
          </figcaption>
        </figure>
      )}
      {shouldShowSupplyHubStorageSolutionBanner && (
        <figure className="supply-hub-storage-solution-banner">
          <img
            src="/assets/supply-hub/storage-solution-banner.png"
            alt={t('Sơ đồ giải pháp lưu kho và tồn kho đệm của ANSLIFE')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-storage-solution-banner-copy">
            <h1>{t('Lưu kho & Tồn kho tại Việt Nam')}</h1>
            <p>
              {t(
                'ANSLIFE cung cấp giải pháp lưu kho và quản lý tồn kho tại Việt Nam nhằm hỗ trợ buyer quốc tế duy trì nguồn cung ổn định, rút ngắn thời gian giao hàng và giảm áp lực tồn kho tại thị trường đích.',
              )}
            </p>
            <p>
              {t(
                'Hàng hóa có thể được lưu trữ dưới dạng thành phẩm, cấu kiện, linh kiện, vật liệu hoặc hàng dự án theo kế hoạch cung ứng của từng đối tác. Giải pháp này đặc biệt phù hợp với các buyer cần xuất hàng định kỳ, duy trì tồn kho đệm hoặc vận hành nhiều nhà cung cấp tại Việt Nam.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isSupplyHubStorageSolutionPage && (
        <section className="supply-hub-storage-content" aria-labelledby="storage-support-title">
          <section className="supply-hub-storage-support">
            <h2 id="storage-support-title">{t('ANSLIFE hỗ trợ những gì?')}</h2>
            <div className="supply-hub-storage-support-grid">
              {supplyHubStorageSupportCards.map((card) => (
                <article key={card.number} className="supply-hub-storage-support-card">
                  <span className="supply-hub-storage-support-number">{card.number}</span>
                  <img
                    className="supply-hub-storage-support-image"
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="supply-hub-storage-support-copy">
                    <h3>{t(card.title)}</h3>
                    <p>{t(card.body)}</p>
                    <strong>{t(card.listTitle)}</strong>
                    <ul className={card.items.length > 6 ? 'is-split' : undefined}>
                      {card.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-storage-models" aria-labelledby="storage-models-title">
            <h2 id="storage-models-title">{t('Các mô hình lưu kho')}</h2>
            <div className="supply-hub-storage-model-grid">
              {supplyHubStorageModelCards.map((card) => (
                <article key={card.title} className="supply-hub-storage-model-card">
                  <img
                    className="supply-hub-storage-model-image"
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="supply-hub-storage-model-copy">
                    <h3>
                      <span>{card.number}</span> {t(card.title)}
                    </h3>
                    <p>{t(card.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-storage-operations" aria-label={t('Quản lý tồn kho và kết nối chuỗi cung ứng')}>
            {supplyHubStorageOperationCards.map((card) => (
              <article key={card.title} className="supply-hub-storage-operation-card">
                <img
                  className="supply-hub-storage-operation-image"
                  src={card.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className="supply-hub-storage-operation-copy">
                  <h2>{t(card.title)}</h2>
                  <p>{t(card.body)}</p>
                  {card.listTitle && <strong>{t(card.listTitle)}</strong>}
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </section>
          <section className="supply-hub-storage-buyer-benefits" aria-labelledby="storage-buyer-benefits-title">
            <h2 id="storage-buyer-benefits-title">{t('Lợi ích đối với Buyer')}</h2>
            <div className="supply-hub-storage-buyer-benefit-grid">
              {supplyHubStorageBuyerBenefits.map((benefit) => (
                <article key={benefit.title} className="supply-hub-storage-buyer-benefit-card">
                  <img
                    className="supply-hub-storage-buyer-benefit-image"
                    src={benefit.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="supply-hub-storage-buyer-benefit-copy">
                    <h3>
                      <span>{benefit.number}</span> {t(benefit.title)}
                    </h3>
                    <p>{t(benefit.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-storage-process" aria-labelledby="storage-process-title">
            <h2 id="storage-process-title">{t('Quy trình triển khai')}</h2>
            <ol className="supply-hub-storage-process-list">
              {supplyHubStorageProcessSteps.map((step, index) => (
                <li key={step} className="supply-hub-storage-process-step">
                  <span>{index + 1}</span>
                  <strong>{t(step)}</strong>
                </li>
              ))}
            </ol>
          </section>
          <section className="supply-hub-storage-cta" aria-labelledby="storage-cta-title">
            <div className="supply-hub-storage-cta-copy">
              <h2 id="storage-cta-title">{t('Cần thiết lập mô hình lưu kho tại Việt Nam?')}</h2>
              <p>
                {t(
                  'Gửi kế hoạch tồn kho, nhóm hàng, tần suất xuất hàng hoặc yêu cầu vận hành để ANSLIFE đề xuất phương án lưu kho phù hợp với chuỗi cung ứng của bạn.',
                )}
              </p>
            </div>
            <div className="supply-hub-storage-cta-actions">
              <a href="/contact/supply-hub-inquiry">
                <span>{t('Gửi yêu cầu Supply Hub')}</span>
                <b aria-hidden="true">→</b>
              </a>
              <a href="/contact/upload-drawing">
                <span>{t('Tải tài liệu lên')}</span>
                <b aria-hidden="true">↥</b>
              </a>
            </div>
          </section>
        </section>
      )}
      {isSupplyHubOverviewPage && (
        <section className="supply-hub-overview-content">
          <div className="supply-hub-overview-main-grid">
            <div className="supply-hub-overview-left">
              <section className="supply-hub-overview-block">
                <h2>{t('Vietnam Supply Hub là gì?')}</h2>
                <div className="supply-hub-overview-definition">
                  <article>
                    <img
                      src="/assets/supply-hub/definition-icons/coordination.webp"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h3>{t('Một đầu mối điều phối tại Việt Nam')}</h3>
                      <p>
                        {t(
                          'ANSLIFE là đầu mối phối hợp giữa buyer, nhà cung cấp, kho, đơn vị vận chuyển và các bên liên quan.',
                        )}
                      </p>
                    </div>
                  </article>
                  <article>
                    <img
                      src="/assets/supply-hub/definition-icons/storage-export.webp"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h3>{t('Hỗ trợ lưu kho, gom hàng và điều phối xuất hàng')}</h3>
                      <p>
                        {t(
                          'Giúp buyer chủ động hơn về tồn kho, kế hoạch giao hàng và lịch xuất hàng linh hoạt.',
                        )}
                      </p>
                    </div>
                  </article>
                  <article>
                    <img
                      src="/assets/supply-hub/definition-icons/supply-control.webp"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h3>{t('Giúp buyer dễ kiểm soát chuỗi cung ứng')}</h3>
                      <p>
                        {t(
                          'Tối ưu lợi ích quản lý, giảm rủi ro và đảm bảo tiến độ chất lượng hàng hóa từ Việt Nam.',
                        )}
                      </p>
                    </div>
                  </article>
                </div>
              </section>

              <section className="supply-hub-overview-block">
                <h2>{t('Lợi ích cho buyer')}</h2>
                <div className="supply-hub-overview-benefits">
                  {[
                    ['Một đầu mối làm việc', '/assets/supply-hub/benefit-icons/single-contact.webp'],
                    ['Tối ưu tồn kho', '/assets/supply-hub/benefit-icons/inventory-optimization.webp'],
                    ['Gom hàng linh hoạt', '/assets/supply-hub/benefit-icons/flexible-consolidation.webp'],
                    [
                      'Kiểm soát tiến độ và chất lượng',
                      '/assets/supply-hub/benefit-icons/progress-quality.webp',
                    ],
                    [
                      'Hỗ trợ chứng từ xuất khẩu',
                      '/assets/supply-hub/benefit-icons/export-documents.webp',
                    ],
                    [
                      'Phù hợp với lịch xuất hàng định kỳ',
                      '/assets/supply-hub/benefit-icons/scheduled-shipment.webp',
                    ],
                  ].map(([item, image], index) => (
                    <article key={item}>
                      <img
                        className="supply-hub-overview-benefit-image"
                        src={image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <p>{t(item)}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <div className="supply-hub-overview-right">
              <section className="supply-hub-overview-block">
                <h2>{t('Vai trò của ANSLIFE trong Supply Hub')}</h2>
                <div className="supply-hub-overview-role-grid">
                  {[
                    [
                      '01',
                      'Central Coordination',
                      'Đầu mối điều phối tập trung giữa buyer, nhà cung cấp, kho, đơn vị vận chuyển và logistics.',
                      '/assets/supply-hub/role-icons/central-coordination.webp',
                    ],
                    [
                      '02',
                      'Inventory Buffer Support',
                      'Hỗ trợ lưu giữ hàng hóa, vật liệu hoặc các mặt hàng có khối lượng giao hàng nhất định theo kế hoạch buyer.',
                      '/assets/supply-hub/role-icons/inventory-buffer.webp',
                    ],
                    [
                      '03',
                      'Consolidation Management',
                      'Gom hàng từ nhiều nguồn cung hoặc nhiều nhóm sản phẩm để tối ưu container và chi phí vận hành.',
                      '/assets/supply-hub/role-icons/consolidation-management.webp',
                    ],
                    [
                      '04',
                      'Export Coordination',
                      'Theo dõi kế hoạch xuất hàng, phối hợp đóng gói, lịch giao và các bước liên quan đến vận chuyển.',
                      '/assets/supply-hub/role-icons/export-coordination.webp',
                    ],
                    [
                      '05',
                      'Documentation Support',
                      'Hỗ trợ chuẩn bị và kiểm tra chứng từ xuất khẩu theo yêu cầu buyer hoặc đơn vị logistics.',
                      '/assets/supply-hub/role-icons/documentation-support.webp',
                    ],
                    [
                      '06',
                      'Partner Sample Room',
                      'Lưu giữ, đối chiếu và quản lý mẫu chuẩn phục vụ phát triển sản phẩm và kiểm tra chất lượng.',
                      '/assets/supply-hub/role-icons/partner-sample-room.webp',
                    ],
                  ].map(([number, title, description, image]) => (
                    <article key={number}>
                      <img
                        className="supply-hub-overview-card-image"
                        src={image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span>{number}</span>
                      <h3>{t(title)}</h3>
                      <p>{t(description)}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="supply-hub-overview-block">
                <h2>{t('Phù hợp với ai?')}</h2>
                <div className="supply-hub-overview-audience-grid">
                  {[
                    [
                      'International Buyers',
                      'Buyer quốc tế cần nguồn cung ổn định và có đầu mối điều phối tại Việt Nam.',
                      '/assets/supply-hub/audience-icons/international-buyers.webp',
                    ],
                    [
                      'Importers & Distributors',
                      'Nhà nhập khẩu, phân phối cần gom nhiều nhóm hàng và xuất hàng định kỳ.',
                      '/assets/supply-hub/audience-icons/importers-distributors.webp',
                    ],
                    [
                      'Furniture Brands',
                      'Thương hiệu nội thất cần lưu mẫu, lưu hàng, quản lý vật liệu và phát triển sản phẩm.',
                      '/assets/supply-hub/audience-icons/furniture-brands.webp',
                    ],
                    [
                      'OEM / ODM Customers',
                      'Khách hàng cần sản xuất, lưu kho, gom hàng và xuất hàng theo kế hoạch riêng.',
                      '/assets/supply-hub/audience-icons/oem-odm-customers.webp',
                    ],
                  ].map(([title, description, image]) => (
                    <article key={title}>
                      <img
                        className="supply-hub-overview-card-image"
                        src={image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <h3>{t(title)}</h3>
                      <p>{t(description)}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <section className="supply-hub-overview-cta">
            <figure className="supply-hub-overview-cta-image">
              <img
                src="/assets/supply-hub/cta-loading.png"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="supply-hub-overview-cta-copy">
              <h2>{t('Gửi yêu cầu Supply Hub cho ANSLIFE')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi thông tin về sản phẩm, lịch xuất hàng, nhu cầu lưu kho, nhóm vật liệu, các kho, chứng từ hoặc yêu cầu vận hành để ANSLIFE đánh giá và đề xuất mô hình Supply Hub phù hợp tại Việt Nam.',
                )}
              </p>
            </div>
            <div className="supply-hub-overview-cta-actions">
              <a href="/contact/supply-hub-inquiry">
                <span>{t('Gửi yêu cầu')}</span>
                <b aria-hidden="true">→</b>
              </a>
              <a href="/contact/supply-hub-inquiry">
                <span>{t('Tải tài liệu lên')}</span>
                <b aria-hidden="true">⇧</b>
              </a>
            </div>
          </section>
        </section>
      )}
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
