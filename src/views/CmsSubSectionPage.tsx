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
  const isSupplyHubLclFclConsolidationPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'lcl-fcl-consolidation' &&
    !detailSlug;
  const isSupplyHubWeeklyShipmentArrangementPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'weekly-shipment-arrangement' &&
    !detailSlug;
  const isSupplyHubMaterialComponentStoragePage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'material-component-storage' &&
    !detailSlug;
  const isSupplyHubExportDocumentationSupportPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'export-documentation-support' &&
    !detailSlug;
  const isSupplyHubApprovedProductSamplesPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'partner-standard-room' &&
    detailSlug === 'approved-product-samples';
  const isSupplyHubComponentSamplesPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'partner-standard-room' &&
    detailSlug === 'component-samples';
  const isSupplyHubTechnicalDrawingsPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'partner-standard-room' &&
    detailSlug === 'technical-drawings';
  const isSupplyHubMaterialReferencesPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'partner-standard-room' &&
    detailSlug === 'material-references';
  const isSupplyHubPackingStandardsPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'partner-standard-room' &&
    detailSlug === 'packing-standards';
  const isSupplyHubQcChecklistPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'partner-standard-room' &&
    (detailSlug === 'qc-checklists' || detailSlug === 'qc-checklist');
  const shouldRenderBlankScholarshipPage =
    config.slug === 'about-anslife' && section.id === 'scholarship-community';
  const shouldRenderBlankQualityInProcessPage =
    config.slug === 'quality-control' && section.id === 'in-process-inspection';
  const shouldRenderBlankSubSectionPage =
    shouldRenderBlankScholarshipPage ||
    shouldRenderBlankQualityInProcessPage ||
    isSupplyHubOverviewPage ||
    isSupplyHubStorageSolutionPage ||
    isSupplyHubLclFclConsolidationPage ||
    isSupplyHubWeeklyShipmentArrangementPage ||
    isSupplyHubMaterialComponentStoragePage ||
    isSupplyHubExportDocumentationSupportPage ||
    isSupplyHubApprovedProductSamplesPage ||
    isSupplyHubComponentSamplesPage ||
    isSupplyHubTechnicalDrawingsPage ||
    isSupplyHubMaterialReferencesPage ||
    isSupplyHubPackingStandardsPage ||
    isSupplyHubQcChecklistPage;
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
    isSupplyHubLclFclConsolidationPage ||
    isSupplyHubWeeklyShipmentArrangementPage ||
    isSupplyHubMaterialComponentStoragePage ||
    isSupplyHubExportDocumentationSupportPage ||
    isSupplyHubApprovedProductSamplesPage ||
    isSupplyHubComponentSamplesPage ||
    isSupplyHubTechnicalDrawingsPage ||
    isSupplyHubMaterialReferencesPage ||
    isSupplyHubPackingStandardsPage ||
    isSupplyHubQcChecklistPage ||
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
  const shouldShowSupplyHubLclFclConsolidationBanner = isSupplyHubLclFclConsolidationPage;
  const shouldShowSupplyHubWeeklyShipmentArrangementBanner = isSupplyHubWeeklyShipmentArrangementPage;
  const shouldShowSupplyHubMaterialComponentStorageBanner = isSupplyHubMaterialComponentStoragePage;
  const shouldShowSupplyHubExportDocumentationSupportBanner = isSupplyHubExportDocumentationSupportPage;
  const shouldShowSupplyHubApprovedProductSamplesBanner = isSupplyHubApprovedProductSamplesPage;
  const shouldShowSupplyHubComponentSamplesBanner = isSupplyHubComponentSamplesPage;
  const shouldShowSupplyHubTechnicalDrawingsBanner = isSupplyHubTechnicalDrawingsPage;
  const shouldShowSupplyHubMaterialReferencesBanner = isSupplyHubMaterialReferencesPage;
  const shouldShowSupplyHubPackingStandardsBanner = isSupplyHubPackingStandardsPage;
  const shouldShowSupplyHubQcChecklistBanner = isSupplyHubQcChecklistPage;
  const shouldRenderSectionHero = !shouldHideSectionHero && !isSupplyHubComponentSamplesPage;
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
  const supplyHubLclFclComparisonCards = [
    {
      title: 'Hàng LCL',
      subtitle: 'Less than Container Load',
      image: '/assets/supply-hub/lcl-fcl-consolidation/lcl-load.webp',
      columns: [
        {
          title: 'Khi nào phù hợp',
          items: [
            'Chưa đủ số lượng để đóng nguyên container',
            'Hàng từ nhiều nhà máy khác nhau',
            'Đơn hàng nhỏ hoặc nhiều SKU',
            'Cần giao hàng linh hoạt theo từng đợt',
          ],
        },
        {
          title: 'ANSLIFE hỗ trợ',
          items: [
            'Tiếp nhận hàng từ nhiều nhà cung cấp',
            'Kiểm tra số lượng và tình trạng đóng gói',
            'Gom hàng tại kho Việt Nam',
            'Điều phối lịch xuất hàng',
            'Chuẩn bị chứng từ liên quan',
            'Hỗ trợ phối hợp với đơn vị vận chuyển',
          ],
        },
        {
          title: 'Lợi ích',
          items: [
            'Không cần chờ đủ container',
            'Giảm áp lực tồn kho tại điểm đến',
            'Tối ưu dòng tiền',
            'Linh hoạt cho các đơn hàng nhỏ hoặc thử nghiệm thị trường',
          ],
        },
      ],
    },
    {
      title: 'Hàng FCL',
      subtitle: 'Full Container Load',
      image: '/assets/supply-hub/lcl-fcl-consolidation/fcl-load.webp',
      columns: [
        {
          title: 'Khi nào phù hợp',
          items: [
            'Đơn hàng đủ tải container',
            'Dự án có sản lượng lớn',
            'Yêu cầu tối ưu chi phí vận chuyển',
            'Cần kiểm soát tốt việc đóng hàng',
          ],
        },
        {
          title: 'ANSLIFE hỗ trợ',
          items: [
            'Lập kế hoạch đóng container',
            'Điều phối hàng từ nhiều nhà máy',
            'Kiểm tra đóng gói trước khi xuất hàng',
            'Giám sát quá trình đóng container',
            'Chuẩn bị chứng từ xuất khẩu',
            'Điều phối lịch tàu và lịch giao hàng',
          ],
        },
        {
          title: 'Lợi ích',
          items: [
            'Chi phí vận chuyển tối ưu hơn',
            'Giảm rủi ro hư hỏng trong quá trình vận chuyển',
            'Chủ động lịch giao hàng',
            'Kiểm soát tốt chất lượng và số lượng hàng hóa',
          ],
        },
      ],
    },
  ];
  const supplyHubLclFclOperationBlocks = [
    {
      number: '2.',
      title: 'Gom hàng từ nhiều nhà máy',
      description:
        'Một dự án xuất khẩu thường không được sản xuất bởi một nhà máy duy nhất. ANSLIFE có thể hỗ trợ gom hàng từ nhiều nguồn khác nhau như:',
      variant: 'multi-factory',
      image: '/assets/supply-hub/lcl-fcl-consolidation/multi-factory-flow.webp',
      categories: [
        ['Nội thất hoàn thiện', '/assets/supply-hub/lcl-fcl-consolidation/category-finished-furniture.webp'],
        ['Cấu kiện nội thất', '/assets/supply-hub/lcl-fcl-consolidation/category-furniture-components.webp'],
        ['Vật liệu sản xuất', '/assets/supply-hub/lcl-fcl-consolidation/category-production-materials.webp'],
        ['Sản phẩm OEM / ODM', '/assets/supply-hub/lcl-fcl-consolidation/category-oem-odm.webp'],
        ['Hàng mẫu', '/assets/supply-hub/lcl-fcl-consolidation/category-samples.webp'],
        ['Linh kiện và phụ kiện', '/assets/supply-hub/lcl-fcl-consolidation/category-hardware-accessories.webp'],
      ],
      footer:
        'Sau khi tập kết tại kho, hàng hóa sẽ được kiểm tra, phân loại và tổ chức xuất khẩu theo kế hoạch của buyer.',
    },
    {
      number: '3.',
      title: 'Kiểm soát trước khi xuất hàng',
      description: 'Trước khi hàng được xuất đi, ANSLIFE có thể hỗ trợ:',
      variant: 'pre-export',
      checklist: [
        'Kiểm tra số lượng',
        'Đối chiếu packing list',
        'Kiểm tra tình trạng đóng gói',
        'Kiểm tra nhãn mác',
        'Đối chiếu mẫu duyệt nếu cần',
        'Chụp ảnh và lập báo cáo trước khi xuất hàng',
      ],
    },
    {
      number: '4.',
      title: 'Tích hợp với Supply Hub Việt Nam',
      description:
        'Dịch vụ gom hàng LCL / FCL được tích hợp cùng mô hình Supply Hub của ANSLIFE, cho phép:',
      variant: 'supply-hub',
      features: [
        ['Lưu kho tạm thời', '/assets/supply-hub/lcl-fcl-consolidation/feature-temporary-storage.webp'],
        ['Tồn kho đệm tại Việt Nam', '/assets/supply-hub/lcl-fcl-consolidation/feature-buffer-inventory.webp'],
        ['Gom hàng từ nhiều nguồn', '/assets/supply-hub/lcl-fcl-consolidation/feature-multi-source.webp'],
        ['Điều phối xuất hàng định kỳ', '/assets/supply-hub/lcl-fcl-consolidation/feature-scheduled-export.webp'],
        ['Quản lý chứng từ xuất khẩu', '/assets/supply-hub/lcl-fcl-consolidation/feature-export-documents.webp'],
        [
          'Hỗ trợ buyer tại nhiều thị trường khác nhau',
          '/assets/supply-hub/lcl-fcl-consolidation/feature-multi-market.webp',
        ],
      ],
    },
    {
      number: '5.',
      title: 'Buyer cần cung cấp',
      variant: 'buyer-input',
      steps: [
        'Danh sách sản phẩm',
        'Danh sách nhà cung cấp hoặc nhà máy',
        'Số lượng dự kiến',
        'Kế hoạch giao hàng',
        'Thị trường xuất khẩu',
        'Yêu cầu đóng gói và ghi nhãn (nếu có)',
      ],
    },
  ];
  const supplyHubWeeklyShipmentGoals = [
    'Duy trì nguồn hàng ổn định',
    'Đồng bộ sản xuất và giao hàng',
    'Giảm tồn kho tại thị trường đích',
    'Giảm rủi ro thiếu hàng hoặc giao hàng gián đoạn',
    'Hỗ trợ lập kế hoạch bán hàng dài hạn',
    'Tối ưu chi phí logistics và vận hành',
  ];
  const supplyHubWeeklyShipmentModels = [
    {
      title: 'Xuất hàng hằng tuần',
      label: 'TUẦN',
      items: [
        'Chuỗi bán lẻ',
        'Nhà phân phối',
        'Dự án có nhu cầu bổ sung liên tục',
        'Thị trường yêu cầu tốc độ cung ứng cao',
      ],
    },
    {
      title: 'Xuất hàng hai tuần một lần',
      label: '2 TUẦN',
      items: [
        'Buyer có kế hoạch nhập hàng ổn định',
        'Đơn hàng trung bình',
        'Nhiều SKU nhưng sản lượng không quá lớn',
      ],
    },
    {
      title: 'Xuất hàng hằng tháng',
      label: 'THÁNG',
      items: [
        'Dự án quy mô lớn',
        'Hàng nguyên container',
        'Buyer có hệ thống kho riêng',
      ],
    },
    {
      title: 'Xuất hàng theo kế hoạch riêng',
      label: '',
      items: [
        'Mùa vụ kinh doanh',
        'Kế hoạch bán hàng',
        'Dự án khách sạn, resort hoặc chuỗi cửa hàng',
        'Tiến độ triển khai công trình',
      ],
    },
  ];
  const supplyHubWeeklyShipmentSupportBlocks = [
    {
      title: 'Lập kế hoạch cung ứng',
      items: [
        'Xây dựng lịch giao hàng',
        'Dự báo nhu cầu',
        'Điều phối sản lượng giữa các nhà máy',
        'Theo dõi tiến độ sản xuất',
      ],
    },
    {
      title: 'Điều phối hàng hóa',
      items: [
        'Gom hàng từ nhiều nhà máy',
        'Quản lý tồn kho đệm',
        'Kiểm soát số lượng xuất hàng',
        'Điều phối LCL hoặc FCL',
      ],
    },
    {
      title: 'Điều phối logistics',
      items: [
        'Đặt lịch xuất hàng',
        'Điều phối vận tải nội địa',
        'Phối hợp đơn vị logistics',
        'Theo dõi lịch tàu và lịch giao hàng',
      ],
    },
    {
      title: 'Quản lý chứng từ',
      items: [
        'Packing List',
        'Commercial Invoice',
        'Shipping Documents',
        'Chứng từ theo yêu cầu của buyer',
      ],
    },
  ];
  const supplyHubWeeklyShipmentBufferBenefits = [
    'Rút ngắn thời gian giao hàng',
    'Chủ động xử lý các đơn hàng phát sinh',
    'Giảm áp lực sản xuất gấp',
    'Hạn chế rủi ro gián đoạn chuỗi cung ứng',
  ];
  const supplyHubWeeklyShipmentPreExportChecks = [
    'Đối chiếu đơn hàng',
    'Kiểm tra số lượng',
    'Kiểm tra đóng gói',
    'Kiểm tra nhãn mác',
    'Đối chiếu mẫu duyệt',
    'Lập báo cáo kiểm tra',
  ];
  const supplyHubWeeklyShipmentAudiences = [
    {
      title: 'Nhà nhập khẩu nội thất',
      description: 'Duy trì nguồn hàng ổn định cho hệ thống phân phối.',
    },
    {
      title: 'Chuỗi bán lẻ',
      description: 'Bổ sung hàng hóa theo chu kỳ bán hàng.',
    },
    {
      title: 'Khách sạn, resort và dự án',
      description: 'Điều phối nhiều đợt giao hàng theo tiến độ triển khai.',
    },
    {
      title: 'Nhà phân phối vật liệu và cấu kiện',
      description: 'Duy trì tồn kho tối ưu và kế hoạch nhập hàng đều đặn.',
    },
  ];
  const supplyHubWeeklyShipmentProcessSteps = [
    'Kế hoạch nhu cầu',
    'Xây dựng lịch xuất hàng',
    'Điều phối sản xuất',
    'Lưu kho & tồn kho đệm',
    'Gom hàng',
    'QC & đối chiếu',
    'Xuất hàng định kỳ',
    'Theo dõi giao hàng',
  ];
  const supplyHubWeeklyShipmentBuyerInputs = [
    'Danh mục sản phẩm',
    'Sản lượng dự kiến',
    'Chu kỳ giao hàng mong muốn',
    'Thị trường xuất khẩu',
    'Kế hoạch bán hàng hoặc triển khai dự án',
    'Yêu cầu đặc biệt về đóng gói hoặc logistics',
  ];
  const weeklyShipmentAssetBase = '/assets/supply-hub/weekly-shipment-arrangement';
  const supplyHubWeeklyShipmentGoalImages = [
    'goal-01.webp',
    'goal-02.webp',
    'goal-03.webp',
    'goal-04.webp',
    'goal-05.webp',
    'goal-06.webp',
  ].map((file) => `${weeklyShipmentAssetBase}/${file}`);
  const supplyHubWeeklyShipmentModelImages = [
    'model-01.webp',
    'model-02.webp',
    'model-03.webp',
    'model-04.webp',
  ].map((file) => `${weeklyShipmentAssetBase}/${file}`);
  const supplyHubWeeklyShipmentSupportImages = [
    'support-01.webp',
    'support-02.webp',
    'support-03.webp',
    'support-04.webp',
  ].map((file) => `${weeklyShipmentAssetBase}/${file}`);
  const supplyHubWeeklyShipmentBufferImages = [
    'buffer-01.webp',
    'buffer-02.webp',
    'buffer-03.webp',
    'buffer-04.webp',
  ].map((file) => `${weeklyShipmentAssetBase}/${file}`);
  const supplyHubWeeklyShipmentCheckImages = [
    'check-01.webp',
    'check-02.webp',
    'check-03.webp',
    'check-04.webp',
    'check-05.webp',
    'check-06.webp',
  ].map((file) => `${weeklyShipmentAssetBase}/${file}`);
  const supplyHubWeeklyShipmentAudienceImages = [
    'audience-01.webp',
    'audience-02.webp',
    'audience-03.webp',
    'audience-04.webp',
  ].map((file) => `${weeklyShipmentAssetBase}/${file}`);
  const supplyHubWeeklyShipmentProcessImages = [
    'process-01.webp',
    'process-02.webp',
    'process-03.webp',
    'process-04.webp',
    'process-05.webp',
    'process-06.webp',
    'process-07.webp',
    'process-08.webp',
  ].map((file) => `${weeklyShipmentAssetBase}/${file}`);
  const supplyHubMaterialStorageGroups = [
    {
      title: 'Vật liệu sản xuất',
      items: [
        'Gỗ tự nhiên',
        'Gỗ kỹ thuật (Plywood, MDF, Particle Board)',
        'Veneer',
        'Mây, tre và vật liệu tự nhiên',
        'Foam, mút và vật liệu đệm',
        'Vải, da và vật liệu bọc',
        'Vật liệu hoàn thiện bề mặt',
        'Vật liệu đóng gói',
      ],
    },
    {
      title: 'Cấu kiện nội thất',
      items: [
        'Khung ghế',
        'Tay ghế',
        'Lưng ghế',
        'Chân ghế',
        'Mặt bàn',
        'Chân bàn',
        'Bộ phận tủ',
        'Bộ phận giường',
        'Cấu kiện bọc nệm',
        'Cấu kiện sản xuất theo bản vẽ',
      ],
    },
    {
      title: 'Bán thành phẩm',
      items: [
        'Chi tiết đã gia công',
        'Chi tiết đã hoàn thiện bề mặt',
        'Chi tiết chờ lắp ráp',
        'Bộ linh kiện đồng bộ sản phẩm',
        'Hàng dự phòng cho các đơn hàng lặp lại',
      ],
    },
  ];
  const supplyHubMaterialStorageGoals = [
    {
      title: 'Duy trì nguồn cung ổn định',
      body: 'Đảm bảo vật liệu, cấu kiện luôn sẵn sàng cho sản xuất và cung ứng dài hạn.',
    },
    {
      title: 'Hỗ trợ sản xuất theo kế hoạch',
      body: 'Cung cấp vật liệu, cấu kiện đúng thời điểm theo kế hoạch sản xuất.',
    },
    {
      title: 'Rút ngắn thời gian triển khai đơn hàng',
      body: 'Có sẵn vật liệu và cấu kiện để giảm thời gian chờ đợi, tăng tốc độ thực hiện đơn hàng.',
    },
    {
      title: 'Hỗ trợ nhiều nhà máy trong cùng một dự án',
      body: 'Điều phối linh hoạt giữa nhiều nhà máy để đảm bảo tiến độ chung.',
    },
  ];
  const supplyHubMaterialProjectInventoryGroups = [
    {
      label: 'Buyer',
      items: [
        'Tách riêng vật liệu và cấu kiện của từng buyer',
        'Theo dõi lịch sử nhập và xuất kho',
        'Hỗ trợ các chương trình cung ứng dài hạn',
      ],
    },
    {
      label: 'Dự án',
      items: [
        'Quản lý vật liệu theo từng dự án',
        'Theo dõi mục tiêu thực hiện',
        'Hỗ trợ triển khai theo nhiều giai đoạn',
      ],
    },
    {
      label: 'Mã sản phẩm',
      items: [
        'Theo dõi theo SKU',
        'Theo dõi theo mã cấu kiện',
        'Theo dõi theo mã vật liệu',
      ],
    },
  ];
  const supplyHubMaterialProductionDispatch = [
    'Cấp phát cho nhà máy sản xuất',
    'Cấp phát cho đơn vị lắp ráp',
    'Cấp phát cho đơn vị hoàn thiện bề mặt',
    'Điều phối giữa nhiều nhà máy trong cùng một dự án',
    'Chuẩn bị cho hoạt động xuất khẩu',
  ];
  const supplyHubMaterialSupplyHubIntegration = [
    'Quản lý tồn kho tập trung',
    'Điều phối sản xuất linh hoạt',
    'Gom hàng từ nhiều nguồn',
    'Hỗ trợ xuất hàng định kỳ',
    'Hỗ trợ triển khai các chương trình cung ứng dài hạn',
  ];
  const supplyHubMaterialTraceabilityControls = [
    'Quản lý mã vật liệu',
    'Quản lý mã cấu kiện',
    'Kiểm tra số lượng nhập xuất',
    'Đối chiếu chứng từ kho',
    'Truy xuất theo lô hàng',
    'Truy xuất theo dự án hoặc buyer',
  ];
  const supplyHubMaterialAudiences = [
    {
      title: 'Buyer quốc tế',
      body: 'Các thương hiệu, nhà bán lẻ, nhà nhập khẩu cần quản lý nguồn vật liệu và cấu kiện tại Việt Nam.',
    },
    {
      title: 'Nhà máy sản xuất',
      body: 'Nhà máy nội thất, đơn vị lắp ráp cần nguồn vật liệu và cấu kiện ổn định, linh hoạt theo kế hoạch.',
    },
    {
      title: 'Dự án khách sạn, resort và chuỗi bán lẻ',
      body: 'Các dự án cần nhiều cấu kiện, vật liệu cho nhiều hạng mục và giai đoạn khác nhau.',
    },
    {
      title: 'Chương trình OEM / ODM',
      body: 'Doanh nghiệp triển khai sản phẩm theo đơn hàng riêng, cần lưu kho và điều phối linh hoạt.',
    },
  ];
  const supplyHubMaterialOperationSteps = [
    'Tiếp nhận vật liệu / cấu kiện',
    'Kiểm tra & ghi nhận',
    'Lưu kho theo buyer hoặc dự án',
    'Theo dõi tồn kho',
    'Cấp phát theo kế hoạch sản xuất',
    'Gom hàng hoặc chuẩn bị xuất khẩu',
    'Báo cáo & truy xuất',
  ];
  const materialStorageAssetBase = '/assets/supply-hub/material-component-storage';
  const supplyHubMaterialStorageItemImages = [
    'item-01.webp',
    'item-02.webp',
    'item-03.webp',
  ].map((file) => `${materialStorageAssetBase}/${file}`);
  const supplyHubMaterialStorageGoalImages = [
    'goal-01.webp',
    'goal-02.webp',
    'goal-03.webp',
    'goal-04.webp',
  ].map((file) => `${materialStorageAssetBase}/${file}`);
  const supplyHubMaterialProjectImages = [
    'project-01.webp',
    'project-02.webp',
    'project-03.webp',
  ].map((file) => `${materialStorageAssetBase}/${file}`);
  const supplyHubMaterialDispatchImages = [
    'dispatch-01.webp',
    'dispatch-02.webp',
    'dispatch-03.webp',
    'dispatch-04.webp',
    'dispatch-05.webp',
  ].map((file) => `${materialStorageAssetBase}/${file}`);
  const supplyHubMaterialSupplyHubImages = [
    'supply-hub-01.webp',
    'supply-hub-02.webp',
    'supply-hub-03.webp',
    'supply-hub-04.webp',
    'supply-hub-05.webp',
  ].map((file) => `${materialStorageAssetBase}/${file}`);
  const supplyHubMaterialAudienceImages = [
    'audience-01.webp',
    'audience-02.webp',
    'audience-03.webp',
    'audience-04.webp',
  ].map((file) => `${materialStorageAssetBase}/${file}`);
  const supplyHubMaterialOperationImages = [
    'operation-01.webp',
    'operation-02.webp',
    'operation-03.webp',
    'operation-04.webp',
    'operation-05.webp',
    'operation-06.webp',
    'operation-07.webp',
  ].map((file) => `${materialStorageAssetBase}/${file}`);
  const supplyHubExportCommercialDocuments = [
    {
      title: 'COMMERCIAL INVOICE',
      lead: 'Hỗ trợ đối chiếu:',
      items: [
        'Thông tin buyer',
        'Thông tin nhà cung cấp',
        'Danh mục sản phẩm',
        'Số lượng',
        'Đơn giá',
        'Điều kiện thương mại',
      ],
    },
    {
      title: 'PACKING LIST',
      lead: 'Hỗ trợ kiểm tra:',
      items: [
        'Quy cách đóng gói',
        'Số kiện',
        'Trọng lượng',
        'Kích thước',
        'Mã sản phẩm',
        'Thông tin container nếu có',
      ],
    },
    {
      title: 'SHIPPING DOCUMENTS',
      lead: 'Hỗ trợ phối hợp và kiểm tra:',
      items: [
        'Thông tin lô hàng',
        'Kế hoạch giao hàng',
        'Thông tin người nhận',
        'Thông tin cảng đi và cảng đến',
        'Điều kiện giao nhận',
      ],
    },
  ];
  const supplyHubExportMultiFactorySupport = [
    'Tổng hợp dữ liệu từ nhiều nhà máy',
    'Chuẩn hóa thông tin sản phẩm',
    'Đồng bộ quy cách đóng gói',
    'Đối chiếu số lượng giữa các đơn vị',
    'Hỗ trợ chuẩn bị hồ sơ chung cho dự án',
  ];
  const supplyHubExportDocumentChecks = [
    'Đối chiếu thông tin sản phẩm',
    'Đối chiếu số lượng thực tế',
    'Kiểm tra mã sản phẩm',
    'Kiểm tra quy cách đóng gói',
    'Đối chiếu packing list với hàng hóa thực tế nếu cần',
    'Đối chiếu thông tin theo yêu cầu buyer',
  ];
  const supplyHubExportQcConnections = [
    {
      title: 'Hồ sơ sản phẩm',
      items: ['Mẫu duyệt', 'Bản vẽ kỹ thuật', 'Mã sản phẩm', 'Tiêu chuẩn đóng gói'],
    },
    {
      title: 'Hồ sơ QC',
      items: ['Báo cáo kiểm tra', 'Checklist QC', 'Hình ảnh kiểm tra', 'Biên bản xác nhận'],
    },
    {
      title: 'Hồ sơ Supply Hub',
      items: ['Thông tin lưu kho', 'Thông tin gom hàng', 'Thông tin xuất hàng định kỳ', 'Thông tin container & lô hàng'],
    },
  ];
  const supplyHubExportBuyerRequirements = [
    'Mẫu biểu riêng',
    'Quy cách trình bày riêng',
    'Mã hàng riêng',
    'Quy trình xác nhận nội bộ của buyer',
    'Hồ sơ cho các chương trình OEM / ODM',
    'Hồ sơ cho các dự án khách sạn, resort hoặc chuỗi bán lẻ',
  ];
  const supplyHubExportRepeatOrderRecords = [
    'Lưu trữ hồ sơ đơn hàng',
    'Lưu trữ packing standard',
    'Lưu trữ mẫu nhãn',
    'Lưu trữ mã sản phẩm',
    'Lưu trữ tài liệu QC',
    'Lưu trữ tiêu chuẩn buyer',
  ];
  const supplyHubExportAudiences = [
    {
      title: 'Buyer quốc tế',
      body: 'Muốn đơn giản hóa việc quản lý nhiều nhà máy và nhiều lô hàng tại Việt Nam.',
    },
    {
      title: 'Nhà máy sản xuất',
      body: 'Cần hỗ trợ chuẩn hóa thông tin và phối hợp hồ sơ xuất khẩu.',
    },
    {
      title: 'Dự án nhiều nhà cung cấp',
      body: 'Cần tổng hợp chứng từ và điều phối hồ sơ tập trung.',
    },
    {
      title: 'Chương trình OEM / ODM',
      body: 'Cần quản lý hồ sơ kỹ thuật, hồ sơ QC và chứng từ thương mại trong thời gian dài.',
    },
  ];
  const supplyHubExportSupportProcessSteps = [
    'Nhận kế hoạch xuất hàng',
    'Thu thập dữ liệu từ nhà máy',
    'Đối chiếu sản phẩm & số lượng',
    'Kiểm tra chứng từ',
    'Chuẩn hóa hồ sơ',
    'Phối hợp logistics',
    'Xuất hàng',
    'Lưu trữ & truy xuất hồ sơ',
  ];
  const supplyHubExportBuyerInputs = [
    'Danh mục sản phẩm',
    'Sản lượng dự kiến',
    'Chu kỳ giao hàng mong muốn',
    'Thị trường xuất khẩu',
    'Kế hoạch bán hàng hoặc triển khai dự án',
    'Yêu cầu đặc biệt về đóng gói hoặc logistics',
  ];
  const exportDocumentationAssetBase = '/assets/supply-hub/export-documentation-support';
  const supplyHubExportCommercialImages = [
    'commercial-01.webp',
    'commercial-02.webp',
    'commercial-03.webp',
  ].map((file) => `${exportDocumentationAssetBase}/${file}`);
  const supplyHubExportQcImages = [
    'qc-01.webp',
    'qc-02.webp',
    'qc-03.webp',
  ].map((file) => `${exportDocumentationAssetBase}/${file}`);
  const supplyHubExportAudienceImages = [
    'audience-01.webp',
    'audience-02.webp',
    'audience-03.webp',
    'audience-04.webp',
  ].map((file) => `${exportDocumentationAssetBase}/${file}`);
  const supplyHubExportProcessImages = [
    'process-01.webp',
    'process-02.webp',
    'process-03.webp',
    'process-04.webp',
    'process-05.webp',
    'process-06.webp',
    'process-07.webp',
    'process-08.webp',
  ].map((file) => `${exportDocumentationAssetBase}/${file}`);

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} />
      {shouldRenderSectionHero && (
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
      {shouldShowSupplyHubMaterialComponentStorageBanner && (
        <figure className="supply-hub-material-component-storage-banner">
          <img
            src="/assets/supply-hub/material-component-storage-banner.png"
            alt={t('Sơ đồ lưu kho vật liệu và linh kiện qua kho ANSLIFE')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-material-component-storage-banner-copy">
            <h1>{t('Lưu kho vật liệu & cấu kiện')}</h1>
            <span>{t('Tổng quan')}</span>
            <p>
              {t(
                'ANSLIFE hỗ trợ lưu kho và quản lý vật liệu, cấu kiện và bán thành phẩm tại Việt Nam nhằm phục vụ hoạt động sản xuất, lắp ráp, hoàn thiện và xuất khẩu theo kế hoạch của buyer.',
              )}
            </p>
            <p>
              {t(
                'Giải pháp này giúp doanh nghiệp duy trì nguồn cung ổn định, giảm áp lực tồn kho tại nhà máy, tăng khả năng đáp ứng đơn hàng và hỗ trợ triển khai các dự án dài hạn với nhiều nhà cung cấp khác nhau.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowSupplyHubApprovedProductSamplesBanner && (
        <figure className="supply-hub-partner-approved-product-samples-banner">
          <img
            src="/assets/supply-hub/partner-standard-room/approved-product-samples-banner.png"
            alt={t('Banner mẫu sản phẩm đã duyệt trong phòng mẫu chuẩn đối tác')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-partner-approved-product-samples-banner-copy">
            <h1>{t('Mẫu sản phẩm đã duyệt')}</h1>
            <span>{t('Tổng quan')}</span>
            <p>
              {t(
                'Mẫu sản phẩm đã duyệt được lưu trữ, quản lý và đối chiếu như tiêu chuẩn chính thức trong hệ thống Phòng mẫu chuẩn đối tác của ANSLIFE.',
              )}
            </p>
            <p>
              {t(
                'Nó đảm bảo tính nhất quán trong sản xuất, kiểm tra chất lượng, hoàn thiện bề mặt, đóng gói và xuất khẩu cho toàn bộ dự án.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowSupplyHubComponentSamplesBanner && (
        <figure className="supply-hub-partner-component-samples-banner">
          <img
            src="/assets/supply-hub/partner-standard-room/component-samples-banner.png"
            alt={t('Banner mẫu cấu kiện trong phòng mẫu chuẩn đối tác')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-partner-component-samples-banner-copy">
            <h1>{t('Mẫu cấu kiện')}</h1>
            <span>{t('Tổng quan')}</span>
            <p>
              {t(
                'Mẫu cấu kiện là các bộ phận tiêu chuẩn được lưu trữ, quản lý và đối chiếu để đảm bảo tính đồng nhất, khả năng lắp ráp và chất lượng ổn định xuyên suốt toàn bộ chuỗi cung ứng - từ vật liệu, gia công, lắp ráp, QC đến xuất hàng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowSupplyHubTechnicalDrawingsBanner && (
        <figure className="supply-hub-partner-technical-drawings-banner">
          <img
            src="/assets/supply-hub/partner-standard-room/technical-drawings-banner.png"
            alt={t('Banner bản vẽ kỹ thuật trong phòng mẫu chuẩn đối tác')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-partner-technical-drawings-banner-copy">
            <h1>{t('Bản vẽ kỹ thuật')}</h1>
            <p>
              {t(
                'ANSLIFE quản lý và lưu trữ bản vẽ kỹ thuật của sản phẩm, cấu kiện và vật liệu theo từng buyer, từng dự án và từng phiên bản được phê duyệt nhằm đảm bảo sự thống nhất trong sản xuất, kiểm soát chất lượng và triển khai đơn hàng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowSupplyHubMaterialReferencesBanner && (
        <figure className="supply-hub-partner-material-references-banner">
          <img
            src="/assets/supply-hub/partner-standard-room/material-references-banner.png"
            alt={t('Banner mẫu vật liệu tham chiếu trong phòng mẫu chuẩn đối tác')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-partner-material-references-banner-copy">
            <h1>{t('Tài liệu vật liệu')}</h1>
            <p>
              {t(
                'ANSLIFE quản lý và lưu trữ hồ sơ vật liệu của từng buyer, từng dự án và từng dòng sản phẩm nhằm đảm bảo sự thống nhất trong quá trình phát triển sản phẩm, sản xuất, kiểm soát chất lượng và xuất khẩu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowSupplyHubPackingStandardsBanner && (
        <figure className="supply-hub-partner-packing-standards-banner">
          <img
            src="/assets/supply-hub/partner-standard-room/packing-standards-banner.png"
            alt={t('Banner tiêu chuẩn đóng gói trong phòng mẫu chuẩn đối tác')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-partner-packing-standards-banner-copy">
            <h1>{t('Tiêu chuẩn đóng gói')}</h1>
            <p>
              {t(
                'ANSLIFE quản lý và lưu trữ các tiêu chuẩn đóng gói đã được phê duyệt nhằm đảm bảo sản phẩm được bảo vệ phù hợp trong quá trình lưu kho, vận chuyển nội địa, xuất khẩu và giao hàng quốc tế.',
              )}
            </p>
            <p>
              {t(
                'Tiêu chuẩn đóng gói là một phần quan trọng của hệ thống quản lý chất lượng, giúp giảm thiểu hư hỏng, duy trì chất lượng sản phẩm và đảm bảo tính nhất quán giữa các lô hàng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowSupplyHubQcChecklistBanner && (
        <figure className="supply-hub-partner-qc-checklist-banner">
          <img
            src="/assets/supply-hub/partner-standard-room/qc-checklist-banner.png"
            alt={t('Banner checklist QC trong phòng mẫu chuẩn đối tác')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-partner-qc-checklist-banner-copy">
            <h1>{t('Checklist QC')}</h1>
            <p>
              {t(
                'ANSLIFE quản lý và lưu trữ hệ thống Checklist QC theo từng buyer, từng dự án và từng nhóm sản phẩm nhằm đảm bảo hoạt động kiểm tra chất lượng được thực hiện nhất quán trong toàn bộ chuỗi cung ứng.',
              )}
            </p>
            <p>
              {t(
                'Checklist QC là tài liệu tham chiếu chính thức được sử dụng trong quá trình kiểm tra vật liệu, sản xuất, hoàn thiện, đóng gói và xuất hàng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isSupplyHubQcChecklistPage && (
        <section
          className="supply-hub-qc-checklist-content"
          aria-labelledby="qc-checklist-groups-title"
        >
          <section className="supply-hub-qc-checklist-panel supply-hub-qc-checklist-groups">
            <h2 id="qc-checklist-groups-title">{t('CÁC NHÓM CHECKLIST QC ĐƯỢC QUẢN LÝ')}</h2>
            <div className="supply-hub-qc-checklist-group-grid">
              {[
                {
                  title: 'CHECKLIST KIỂM TRA VẬT LIỆU',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/group-material-check.webp',
                  intro: 'Áp dụng cho:',
                  applies: [
                    'Gỗ tự nhiên',
                    'Gỗ kỹ thuật',
                    'Veneer',
                    'Foam',
                    'Vải',
                    'Da',
                    'Mây tre',
                    'Vật liệu đóng gói',
                  ],
                  checkTitle: 'Các nội dung kiểm tra:',
                  checks: [
                    'Chủng loại vật liệu',
                    'Quy cách kỹ thuật',
                    'Độ ẩm',
                    'Màu sắc',
                    'Bề mặt',
                    'Độ dày',
                    'Tiêu chuẩn kỹ thuật được phê duyệt',
                  ],
                },
                {
                  title: 'CHECKLIST KIỂM TRA TRONG SẢN XUẤT',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/group-production-check.webp',
                  intro: 'Áp dụng trong quá trình gia công và lắp ráp.',
                  checkTitle: 'Các nội dung kiểm tra:',
                  checks: [
                    'Kích thước chi tiết',
                    'Mộng và liên kết',
                    'Độ chính xác gia công',
                    'Độ vuông góc',
                    'Độ ổn định kết cấu',
                    'Lắp ráp thử',
                    'Sai lệch cho phép',
                  ],
                },
                {
                  title: 'CHECKLIST KIỂM TRA HOÀN THIỆN BỀ MẶT',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/group-surface-finish-check.webp',
                  intro:
                    'Áp dụng cho các công đoạn stain, sealer, base coat, top coat và hoàn thiện cuối.',
                  checkTitle: 'Các nội dung kiểm tra:',
                  checks: [
                    'Màu sắc',
                    'Độ đồng đều màu',
                    'Độ bóng / độ mờ',
                    'Bề mặt hoàn thiện',
                    'Vết trầy xước',
                    'Chảy sơn',
                    'Bụi sơn',
                    'Lỗi hoàn thiện khác',
                  ],
                },
                {
                  title: 'CHECKLIST KIỂM TRA SẢN PHẨM HOÀN THIỆN',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/group-finished-product-check.webp',
                  intro: 'Áp dụng trước khi đóng gói.',
                  checkTitle: 'Các nội dung kiểm tra:',
                  checks: [
                    'Kích thước tổng thể',
                    'Chức năng sử dụng',
                    'Độ ổn định',
                    'Kết cấu',
                    'Hoàn thiện bề mặt',
                    'Phụ kiện',
                    'Nhãn mác',
                    'Đối chiếu mẫu duyệt',
                  ],
                },
                {
                  title: 'CHECKLIST KIỂM TRA ĐÓNG GÓI',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/group-packing-check.webp',
                  intro: 'Áp dụng trước khi xuất hàng.',
                  checkTitle: 'Các nội dung kiểm tra:',
                  checks: [
                    'Quy cách đóng gói',
                    'Vật liệu bảo vệ',
                    'Carton mark',
                    'Barcode',
                    'Trọng lượng kiện',
                    'Chống ẩm',
                    'Chống va đập',
                    'Hình thức kiện hàng',
                  ],
                },
                {
                  title: 'CHECKLIST KIỂM TRA TRƯỚC XUẤT HÀNG',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/group-pre-shipment-check.webp',
                  intro: 'Áp dụng cho Final Inspection.',
                  checkTitle: 'Các nội dung kiểm tra:',
                  checks: [
                    'Số lượng',
                    'Chất lượng',
                    'Quy cách đóng gói',
                    'Nhãn mác',
                    'Tình trạng container',
                    'Chứng từ liên quan',
                    'Mức độ phù hợp với đơn hàng',
                  ],
                },
              ].map((group, index) => (
                <article key={group.title}>
                  <h3>
                    <span>{index + 1}</span>
                    {t(group.title)}
                  </h3>
                  <img
                    className="supply-hub-qc-checklist-image-slot"
                    src={group.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="supply-hub-qc-checklist-card-copy">
                    <p>{t(group.intro)}</p>
                    {group.applies && (
                      <ul>
                        {group.applies.map((item) => (
                          <li key={item}>{t(item)}</li>
                        ))}
                      </ul>
                    )}
                    <p className="supply-hub-qc-checklist-card-label">{t(group.checkTitle)}</p>
                    <ul>
                      {group.checks.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-qc-checklist-reference-grid">
            <article className="supply-hub-qc-checklist-panel supply-hub-qc-checklist-reference-card">
              <h2>{t('LIÊN KẾT VỚI BỘ TIÊU CHUẨN ĐỐI TÁC')}</h2>
              <p>{t('Mỗi checklist được xây dựng dựa trên:')}</p>
              <ul className="supply-hub-qc-checklist-icon-list">
                {[
                  'Bản vẽ kỹ thuật',
                  'Mẫu sản phẩm đã duyệt',
                  'Bảng màu / hoàn thiện',
                  'Tài liệu vật liệu',
                  'Tiêu chuẩn đóng gói',
                  'Yêu cầu riêng của buyer',
                ].map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
              <p>
                {t(
                  'Điều này giúp tất cả các hoạt động kiểm tra đều tham chiếu cùng một bộ tiêu chuẩn thống nhất.',
                )}
              </p>
            </article>

            <article className="supply-hub-qc-checklist-panel supply-hub-qc-checklist-reference-card supply-hub-qc-checklist-reference-card--with-image">
              <h2>{t('LIÊN KẾT VỚI HỆ THỐNG QC ĐỘC LẬP')}</h2>
              <p>{t('Checklist QC được sử dụng trong các hoạt động:')}</p>
              <div className="supply-hub-qc-checklist-reference-layout">
                <ul className="supply-hub-qc-checklist-icon-list">
                  {[
                    'Inline Inspection',
                    'Pre-Assembly Inspection',
                    'Pre-Finishing Inspection',
                    'Final Inspection',
                    'Container Loading Inspection',
                    'Independent QC Services',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
                <img
                  className="supply-hub-qc-checklist-reference-image"
                  src="/assets/supply-hub/partner-standard-room/qc-checklists/reference-independent-qc.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="supply-hub-qc-checklist-panel supply-hub-qc-checklist-reference-card supply-hub-qc-checklist-reference-card--with-image">
              <h2>{t('THÔNG TIN ĐƯỢC QUẢN LÝ')}</h2>
              <p>{t('Mỗi checklist có thể bao gồm:')}</p>
              <div className="supply-hub-qc-checklist-reference-layout">
                <ul>
                  {[
                    'Mã checklist',
                    'Buyer',
                    'Dự án',
                    'Sản phẩm áp dụng',
                    'Phiên bản',
                    'Ngày hiệu lực',
                    'Người phê duyệt',
                    'Tiêu chuẩn chấp nhận',
                    'Lịch sử cập nhật',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
                <img
                  className="supply-hub-qc-checklist-reference-image"
                  src="/assets/supply-hub/partner-standard-room/qc-checklists/reference-managed-info.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>
          </section>

          <section className="supply-hub-qc-checklist-panel supply-hub-qc-checklist-value">
            <h2>{t('GIÁ TRỊ MANG LẠI')}</h2>
            <div className="supply-hub-qc-checklist-value-grid">
              {[
                {
                  title: 'ĐỒNG NHẤT TIÊU CHUẨN CHẤT LƯỢNG',
                  text: 'Đảm bảo mọi nhà máy, QC và đối tác cùng sử dụng một tiêu chuẩn đánh giá.',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/value-quality-standard.webp',
                },
                {
                  title: 'GIẢM RỦI RO SẢN XUẤT',
                  text: 'Phát hiện lỗi sớm trước khi sản phẩm chuyển sang công đoạn tiếp theo.',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/value-production-risk.webp',
                },
                {
                  title: 'HỖ TRỢ TRUY XUẤT VÀ CẢI TIẾN',
                  text: 'Dễ dàng đối chiếu nguyên nhân lỗi và cải thiện quy trình trong các đơn hàng tiếp theo.',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/value-traceability-improvement.webp',
                },
                {
                  title: 'HỖ TRỢ BUYER KIỂM SOÁT CHẤT LƯỢNG TỪ XA',
                  text: 'Buyer có thể yên tâm rằng sản phẩm được kiểm tra theo đúng checklist đã được phê duyệt.',
                  image:
                    '/assets/supply-hub/partner-standard-room/qc-checklists/value-remote-quality-control.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <img
                    className="supply-hub-qc-checklist-value-image"
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-qc-checklist-panel supply-hub-qc-checklist-system">
            <img
              className="supply-hub-qc-checklist-system-art supply-hub-qc-checklist-system-art--left"
              src="/assets/supply-hub/partner-standard-room/qc-checklists/system-qc-checklist.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="supply-hub-qc-checklist-system-copy">
              <h2>{t('HỆ THỐNG CHECKLIST QC CỦA ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE duy trì hệ thống Checklist QC theo từng buyer, từng dự án và từng nhóm sản phẩm nhằm đảm bảo chất lượng được kiểm soát nhất quán từ vật liệu đầu vào đến khi sản phẩm được xuất hàng.',
                )}
              </p>
              <p>
                {t(
                  'Checklist không chỉ là tài liệu kiểm tra, mà còn là công cụ kết nối giữa bản vẽ kỹ thuật, vật liệu, hoàn thiện bề mặt, đóng gói và tiêu chuẩn chất lượng của từng đối tác.',
                )}
              </p>
            </div>
            <img
              className="supply-hub-qc-checklist-system-art supply-hub-qc-checklist-system-art--right"
              src="/assets/supply-hub/partner-standard-room/qc-checklists/system-qc-laptop.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </section>

          <section className="supply-hub-qc-checklist-panel supply-hub-qc-checklist-cta">
            <div className="supply-hub-qc-checklist-cta-copy">
              <h2>{t('GỬI TIÊU CHUẨN QC CHO ANSLIFE')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi checklist riêng, tiêu chuẩn kiểm tra hoặc yêu cầu chất lượng để ANSLIFE lưu trữ, đối chiếu và triển khai trong hệ thống quản lý chất lượng của dự án.',
                )}
              </p>
            </div>
            <div className="supply-hub-qc-checklist-cta-actions">
              <a href="/vn/contact/upload-drawing">
                <span className="supply-hub-qc-checklist-action-icon supply-hub-qc-checklist-action-icon--document" aria-hidden="true" />
                {t('Gửi tiêu chuẩn kiểm tra')}
              </a>
              <a href="/vn/contact">
                <span className="supply-hub-qc-checklist-action-icon supply-hub-qc-checklist-action-icon--phone" aria-hidden="true" />
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {isSupplyHubPackingStandardsPage && (
        <section
          className="supply-hub-packing-standards-content"
          aria-labelledby="packing-standards-managed-title"
        >
          <section className="supply-hub-packing-standards-panel supply-hub-packing-standards-managed">
            <h2 id="packing-standards-managed-title">{t('CÁC NỘI DUNG ĐƯỢC QUẢN LÝ')}</h2>
            <div className="supply-hub-packing-standards-managed-grid">
              {[
                {
                  title: 'QUY CÁCH ĐÓNG GÓI SẢN PHẨM',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/managed-packing-spec.webp',
                  items: [
                    'Kích thước thùng carton',
                    'Số lượng sản phẩm trên mỗi kiện',
                    'Trọng lượng mỗi kiện',
                    'Phương án đóng gói theo bộ hoặc theo chi tiết',
                    'Quy cách pallet nếu có',
                  ],
                },
                {
                  title: 'VẬT LIỆU BẢO VỆ SẢN PHẨM',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/managed-protective-materials.webp',
                  items: [
                    'Foam bảo vệ',
                    'Giấy tổ ong',
                    'Corner protector',
                    'Túi PE',
                    'Túi chống ẩm',
                    'Màng co',
                    'Vật liệu chống trầy xước',
                    'Pallet và vật liệu cố định hàng hóa',
                  ],
                },
                {
                  title: 'TIÊU CHUẨN ĐÓNG GÓI XUẤT KHẨU',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/managed-export-packing.webp',
                  items: [
                    'Container loading requirements',
                    'Chống ẩm',
                    'Chống va đập',
                    'Chống biến dạng',
                    'Tiêu chuẩn pallet',
                    'Tiêu chuẩn dán nhãn',
                    'Tiêu chuẩn thị trường nhập khẩu',
                  ],
                },
                {
                  title: 'TIÊU CHUẨN DÁN NHÃN',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/managed-labeling-standard.webp',
                  items: [
                    'Product Code',
                    'Buyer Item Number',
                    'Carton Mark',
                    'PO Number',
                    'Barcode',
                    'Country of Origin',
                    'Shipping Mark',
                    'Hướng dẫn xử lý hàng hóa',
                  ],
                },
                {
                  title: 'TIÊU CHUẨN LẮP RÁP ĐI KÈM',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/managed-assembly-standard.webp',
                  items: [
                    'Hướng dẫn lắp ráp',
                    'Danh mục linh kiện',
                    'Sơ đồ lắp ráp',
                    'Danh sách phụ kiện đi kèm',
                  ],
                },
              ].map((group, index) => (
                <article key={group.title}>
                  <h3>
                    <span>{index + 1}.</span> {t(group.title)}
                  </h3>
                  <img
                    className="supply-hub-packing-standards-image-slot"
                    src={group.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-packing-standards-reference-grid">
            <article className="supply-hub-packing-standards-panel supply-hub-packing-standards-reference-card">
              <h2>{t('LIÊN KẾT VỚI SẢN XUẤT')}</h2>
              <p>
                {t(
                  'Tiêu chuẩn đóng gói được áp dụng ngay từ giai đoạn phát triển sản phẩm nhằm đảm bảo sản phẩm phù hợp với yêu cầu vận chuyển và tối ưu hóa chi phí logistics.',
                )}
              </p>
              <p className="supply-hub-packing-standards-list-label">{t('Ứng dụng cho:')}</p>
              <ul className="supply-hub-packing-standards-check-list supply-hub-packing-standards-check-list--split">
                {[
                  'Nội thất hoàn thiện',
                  'Cấu kiện nội thất',
                  'Nội thất bọc nệm',
                  'Nội thất ngoài trời',
                  'Dự án khách sạn, nhà hàng và resort',
                  'Linh kiện và vật liệu',
                ].map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </article>

            <article className="supply-hub-packing-standards-panel supply-hub-packing-standards-reference-card">
              <h2>{t('LIÊN KẾT VỚI QC')}</h2>
              <p>
                {t(
                  'Tiêu chuẩn đóng gói là một phần của quy trình kiểm tra cuối trước khi xuất hàng.',
                )}
              </p>
              <p className="supply-hub-packing-standards-list-label">
                {t('Các hạng mục kiểm tra bao gồm:')}
              </p>
              <ul className="supply-hub-packing-standards-check-list supply-hub-packing-standards-check-list--split">
                {[
                  'Quy cách đóng gói',
                  'Vật liệu bảo vệ',
                  'Tình trạng thùng carton',
                  'Thông tin nhãn mác',
                  'Trọng lượng kiện hàng',
                  'Khả năng bảo vệ sản phẩm',
                  'Chống ẩm',
                  'Chống va đập',
                  'Độ ổn định khi xếp pallet hoặc container',
                ].map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </article>

            <article className="supply-hub-packing-standards-panel supply-hub-packing-standards-reference-card">
              <h2>{t('LƯU TRỮ MẪU ĐÓNG GÓI')}</h2>
              <p>
                {t(
                  'ANSLIFE duy trì hệ thống lưu trữ hồ sơ đóng gói theo từng buyer và từng dự án.',
                )}
              </p>
              <p className="supply-hub-packing-standards-list-label">{t('Bao gồm:')}</p>
              <ul className="supply-hub-packing-standards-check-list supply-hub-packing-standards-check-list--split">
                {[
                  'Bản vẽ đóng gói',
                  'Hình ảnh đóng gói đã duyệt',
                  'Carton Mark chuẩn',
                  'Mẫu nhãn',
                  'Tiêu chuẩn vật liệu đóng gói',
                  'Hướng dẫn đóng gói',
                  'Báo cáo kiểm tra đóng gói',
                ].map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="supply-hub-packing-standards-panel supply-hub-packing-standards-document-strip">
            <div className="supply-hub-packing-standards-document-grid">
              {[
                [
                  'BẢN VẼ ĐÓNG GÓI',
                  '/assets/supply-hub/partner-standard-room/packing-standards/document-packing-drawing.webp',
                ],
                [
                  'LOADING PLAN',
                  '/assets/supply-hub/partner-standard-room/packing-standards/document-loading-plan.webp',
                ],
                [
                  'CARTON MARK',
                  '/assets/supply-hub/partner-standard-room/packing-standards/document-carton-mark.webp',
                ],
                [
                  'PALLET STACKING',
                  '/assets/supply-hub/partner-standard-room/packing-standards/document-pallet-stacking.webp',
                ],
                [
                  'PROTECTIVE MATERIALS',
                  '/assets/supply-hub/partner-standard-room/packing-standards/document-protective-materials.webp',
                ],
                [
                  'ASSEMBLY GUIDE',
                  '/assets/supply-hub/partner-standard-room/packing-standards/document-assembly-guide.webp',
                ],
              ].map(([item, image]) => (
                <article key={item}>
                  <h2>{t(item)}</h2>
                  <img
                    className="supply-hub-packing-standards-document-image"
                    src={image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-packing-standards-panel supply-hub-packing-standards-value">
            <h2>{t('GIÁ TRỊ MANG LẠI')}</h2>
            <div className="supply-hub-packing-standards-value-grid">
              {[
                {
                  title: 'GIẢM HƯ HỎNG TRONG VẬN CHUYỂN',
                  text: 'Bảo vệ sản phẩm trong suốt quá trình lưu kho, vận chuyển và giao nhận quốc tế.',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/value-damage-reduction.webp',
                },
                {
                  title: 'ĐỒNG NHẤT GIỮA CÁC LÔ HÀNG',
                  text: 'Duy trì cùng một tiêu chuẩn đóng gói cho tất cả các đơn hàng đã được phê duyệt.',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/value-consistency.webp',
                },
                {
                  title: 'HỖ TRỢ LOGISTICS HIỆU QUẢ',
                  text: 'Tối ưu hóa việc xếp pallet, xếp container và vận chuyển quốc tế.',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/value-logistics-efficiency.webp',
                },
                {
                  title: 'HỖ TRỢ QC VÀ TRUY XUẤT',
                  text: 'Tạo cơ sở đối chiếu rõ ràng cho hoạt động kiểm tra và truy xuất thông tin khi cần thiết.',
                  image:
                    '/assets/supply-hub/partner-standard-room/packing-standards/value-qc-traceability.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <img
                    className="supply-hub-packing-standards-value-image"
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-packing-standards-panel supply-hub-packing-standards-cta">
            <img
              className="supply-hub-packing-standards-cta-art supply-hub-packing-standards-cta-art--left"
              src="/assets/supply-hub/partner-standard-room/packing-standards/cta-packed-pallet.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="supply-hub-packing-standards-cta-copy">
              <h2>{t('GỬI TIÊU CHUẨN ĐÓNG GÓI CHO ANSLIFE')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ đóng gói, carton mark, hướng dẫn đóng gói hoặc tiêu chuẩn logistics để ANSLIFE lưu trữ, đối chiếu và áp dụng trong quá trình sản xuất và xuất khẩu.',
                )}
              </p>
              <div className="supply-hub-packing-standards-cta-actions">
                <a className="is-primary" href="/vn/contact/upload-drawing">
                  <span className="supply-hub-packing-standards-action-icon supply-hub-packing-standards-action-icon--upload" aria-hidden="true" />
                  {t('Tải tiêu chuẩn đóng gói lên')}
                </a>
                <a href="/vn/contact/upload-drawing">
                  <span className="supply-hub-packing-standards-action-icon supply-hub-packing-standards-action-icon--request" aria-hidden="true" />
                  {t('Gửi yêu cầu kỹ thuật')}
                </a>
                <a href="/vn/contact">
                  <span className="supply-hub-packing-standards-action-icon supply-hub-packing-standards-action-icon--phone" aria-hidden="true" />
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
            <img
              className="supply-hub-packing-standards-cta-art supply-hub-packing-standards-cta-art--right"
              src="/assets/supply-hub/partner-standard-room/packing-standards/cta-open-carton.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </section>
        </section>
      )}
      {isSupplyHubMaterialReferencesPage && (
        <section
          className="supply-hub-material-references-content"
          aria-labelledby="material-references-role-title"
        >
          <section className="supply-hub-material-references-panel supply-hub-material-references-role">
            <h2 id="material-references-role-title">{t('VAI TRÒ CỦA TÀI LIỆU VẬT LIỆU')}</h2>
            <div className="supply-hub-material-references-role-layout">
              <img
                className="supply-hub-material-references-image-slot"
                src="/assets/supply-hub/partner-standard-room/material-references/role-material-record.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
              <p>
                {t(
                  'Tài liệu vật liệu là cơ sở tham chiếu chính thức giúp các bên liên quan sử dụng đúng loại vật liệu đã được phê duyệt, đồng thời duy trì tính nhất quán giữa mẫu phát triển, sản xuất hàng loạt và các lô hàng xuất khẩu.',
                )}
              </p>
            </div>
          </section>

          <section className="supply-hub-material-references-panel supply-hub-material-references-groups">
            <h2>{t('CÁC NHÓM TÀI LIỆU ĐƯỢC QUẢN LÝ')}</h2>
            <div className="supply-hub-material-references-group-grid">
              {[
                [
                  'GỖ TỰ NHIÊN',
                  'Lưu trữ thông tin về chủng loại gỗ, quy cách, nguồn gốc, độ ẩm, màu sắc tự nhiên và các yêu cầu kỹ thuật liên quan.',
                  '/assets/supply-hub/partner-standard-room/material-references/group-natural-wood.webp',
                ],
                [
                  'GỖ KỸ THUẬT',
                  'Bao gồm plywood, MDF, particle board, veneer panel và các vật liệu kỹ thuật khác được sử dụng trong sản xuất.',
                  '/assets/supply-hub/partner-standard-room/material-references/group-engineered-wood.webp',
                ],
                [
                  'VENEER',
                  'Thông tin về chủng loại veneer, màu sắc, vân gỗ, độ dày, phương pháp ghép và yêu cầu sử dụng.',
                  '/assets/supply-hub/partner-standard-room/material-references/group-veneer.webp',
                ],
                [
                  'VẬT LIỆU BỌC',
                  'Bao gồm vải, da, PU, foam, vật liệu đệm và các tài liệu kỹ thuật liên quan đến từng dự án.',
                  '/assets/supply-hub/partner-standard-room/material-references/group-upholstery.webp',
                ],
                [
                  'VẬT LIỆU TỰ NHIÊN',
                  'Mây, tre, mặt đan mây và các vật liệu tự nhiên khác được sử dụng trong sản phẩm nội thất.',
                  '/assets/supply-hub/partner-standard-room/material-references/group-natural-material.webp',
                ],
                [
                  'VẬT LIỆU ĐÓNG GÓI',
                  'Carton, foam bảo vệ, giấy tổ ong, pallet, vật liệu chống ẩm và các tiêu chuẩn đóng gói xuất khẩu.',
                  '/assets/supply-hub/partner-standard-room/material-references/group-packing-material.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title}>
                  <img
                    className="supply-hub-material-references-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-material-references-panel supply-hub-material-references-stored">
            <h2>{t('THÔNG TIN ĐƯỢC LƯU TRỮ CHO MỖI VẬT LIỆU')}</h2>
            <div className="supply-hub-material-references-stored-images">
              <img
                className="supply-hub-material-references-image-slot"
                src="/assets/supply-hub/partner-standard-room/material-references/stored-material-record.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
              <img
                className="supply-hub-material-references-image-slot"
                src="/assets/supply-hub/partner-standard-room/material-references/stored-material-swatches.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
            </div>
          </section>

          <section className="supply-hub-material-references-panel supply-hub-material-references-production">
            <h2>{t('LIÊN KẾT VỚI SẢN XUẤT')}</h2>
            <p>
              {t(
                'Tài liệu vật liệu được sử dụng trong quá trình lựa chọn nguồn cung, phát triển sản phẩm, sản xuất mẫu và sản xuất hàng loạt nhằm đảm bảo sử dụng đúng vật liệu đã được phê duyệt.',
              )}
            </p>
            <h3>{t('Ứng dụng cho:')}</h3>
            <ul>
              {[
                'Nội thất hoàn thiện',
                'Cấu kiện nội thất',
                'Nội thất bọc nệm',
                'Nội thất mây tre',
                'Nội thất ngoài trời',
                'Dự án khách sạn, nhà hàng và resort',
              ].map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          </section>

          <section className="supply-hub-material-references-panel supply-hub-material-references-qc">
            <h2>{t('LIÊN KẾT VỚI QC')}</h2>
            <p>
              {t(
                'Các tài liệu vật liệu được sử dụng làm cơ sở tham chiếu trong quá trình kiểm tra chất lượng.',
              )}
            </p>
            <p>{t('Nội dung kiểm tra có thể bao gồm:')}</p>
            <ul>
              {[
                'Chủng loại vật liệu',
                'Quy cách kỹ thuật',
                'Độ ẩm vật liệu',
                'Màu sắc và vân vật liệu',
                'Độ dày và kích thước',
                'Tiêu chuẩn an toàn và môi trường',
                'Sự phù hợp với mẫu đã duyệt',
              ].map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          </section>

          <section className="supply-hub-material-references-panel supply-hub-material-references-storage">
            <h2>{t('LƯU MẪU VẬT LIỆU TẠI VIỆT NAM')}</h2>
            <div className="supply-hub-material-references-storage-layout">
              <img
                className="supply-hub-material-references-image-slot"
                src="/assets/supply-hub/partner-standard-room/material-references/storage-material-shelf.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
              <div className="supply-hub-material-references-storage-copy">
                <p>
                  {t(
                    'ANSLIFE duy trì hệ thống lưu trữ mẫu vật liệu thực tế nhằm hỗ trợ đối chiếu trong sản xuất, kiểm tra chất lượng và triển khai các đơn hàng lặp lại.',
                  )}
                </p>
                <h3>{t('Bao gồm:')}</h3>
                <ul>
                  {[
                    'Mẫu gỗ tự nhiên',
                    'Mẫu veneer',
                    'Mẫu plywood',
                    'Mẫu MDF',
                    'Mẫu vải và da',
                    'Mẫu foam',
                    'Mẫu mây tre',
                    'Mẫu vật liệu đóng gói',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
              </div>
              <img
                className="supply-hub-material-references-image-slot"
                src="/assets/supply-hub/partner-standard-room/material-references/storage-approved-materials.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
            </div>
          </section>

          <section className="supply-hub-material-references-panel supply-hub-material-references-value">
            <h2>{t('GIÁ TRỊ MANG LẠI')}</h2>
            <div className="supply-hub-material-references-value-layout">
              <div className="supply-hub-material-references-value-grid">
                {[
                  [
                    'ĐỒNG NHẤT VẬT LIỆU GIỮA CÁC LÔ HÀNG',
                    'Duy trì sự nhất quán về vật liệu trong toàn bộ vòng đời sản phẩm.',
                    '/assets/supply-hub/partner-standard-room/material-references/value-consistency.webp',
                  ],
                  [
                    'GIẢM SAI LỆCH TRONG SẢN XUẤT',
                    'Đảm bảo các nhà máy và nhà cung cấp cùng sử dụng đúng tiêu chuẩn đã được phê duyệt.',
                    '/assets/supply-hub/partner-standard-room/material-references/value-reduce-error.webp',
                  ],
                  [
                    'HỖ TRỢ KIỂM SOÁT CHẤT LƯỢNG',
                    'Tạo cơ sở kỹ thuật rõ ràng cho hoạt động kiểm tra và đánh giá chất lượng vật liệu.',
                    '/assets/supply-hub/partner-standard-room/material-references/value-qc-control.webp',
                  ],
                  [
                    'HỖ TRỢ PHÁT TRIỂN SẢN PHẨM MỚI',
                    'Rút ngắn thời gian phát triển mẫu và lựa chọn vật liệu phù hợp cho các dự án mới.',
                    '/assets/supply-hub/partner-standard-room/material-references/value-new-development.webp',
                  ],
                ].map(([title, text, image]) => (
                  <article key={title}>
                    <img
                      className="supply-hub-material-references-image-slot"
                      src={image}
                      alt=""
                      loading="eager"
                      decoding="async"
                    />
                    <div>
                      <h3>{t(title)}</h3>
                      <p>{t(text)}</p>
                    </div>
                  </article>
                ))}
              </div>
              <img
                className="supply-hub-material-references-image-slot"
                src="/assets/supply-hub/partner-standard-room/material-references/value-material-records.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
            </div>
          </section>
        </section>
      )}
      {isSupplyHubTechnicalDrawingsPage && (
        <section
          className="supply-hub-technical-drawings-content"
          aria-labelledby="technical-drawings-role-title"
        >
          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-role">
            <h2 id="technical-drawings-role-title">
              <span>1.</span> {t('Vai trò của bản vẽ kỹ thuật')}
            </h2>
            <div className="supply-hub-technical-drawings-role-layout">
              <img
                className="supply-hub-technical-drawings-image-slot"
                src="/assets/supply-hub/partner-standard-room/technical-drawings/role-technical-drawing.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
              <p>
                {t(
                  'Bản vẽ kỹ thuật là tài liệu tham chiếu chính thức trong suốt quá trình phát triển sản phẩm, sản xuất, kiểm tra chất lượng, đóng gói và xuất khẩu.',
                )}
              </p>
              <p>
                {t(
                  'Việc quản lý đúng phiên bản giúp giảm sai lệch giữa các nhà máy, hạn chế lỗi sản xuất và đảm bảo tính đồng nhất trên mọi lô hàng.',
                )}
              </p>
            </div>
          </section>

          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-types">
            <h2>
              <span>2.</span> {t('Các loại bản vẽ được quản lý')}
            </h2>
            <div className="supply-hub-technical-drawings-type-grid">
              {[
                [
                  'Bản vẽ sản phẩm hoàn chỉnh',
                  'Thể hiện đầy đủ kích thước, vật liệu, hoàn thiện và ghi chú.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/type-product-drawing.webp',
                ],
                [
                  'Bản vẽ cấu kiện',
                  'Chi tiết từng cấu kiện, kích thước, lỗ khoan, bo cạnh, vật liệu.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/type-component-drawing.webp',
                ],
                [
                  'Bản vẽ lắp ráp',
                  'Hướng dẫn lắp ráp, vị trí liên kết, phụ kiện và thứ tự lắp.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/type-assembly-drawing.webp',
                ],
                [
                  'Bản vẽ đóng gói',
                  'Kích thước đóng gói, định hướng xếp, vật liệu đóng gói, nhãn.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/type-packing-drawing.webp',
                ],
                [
                  'Bản vẽ QC tham chiếu',
                  'Điểm kiểm tra, dung sai, tiêu chuẩn QC và phương pháp đo.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/type-qc-reference-drawing.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title} className="supply-hub-technical-drawings-type-card">
                  <h3>{t(title)}</h3>
                  <img
                    className="supply-hub-technical-drawings-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-version">
            <h2>
              <span>3.</span> {t('Quản lý phiên bản bản vẽ')}
            </h2>
            <div className="supply-hub-technical-drawings-version-layout">
              <ul>
                {[
                  'Mã sản phẩm',
                  'Mã bản vẽ',
                  'Phiên bản',
                  'Ngày cập nhật',
                  'Người phê duyệt',
                  'Tình trạng hiệu lực',
                  'Lịch sử thay đổi',
                ].map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
              <div className="supply-hub-technical-drawings-version-board" aria-hidden="true">
                <div className="supply-hub-technical-drawings-version-table">
                  <span>{t('VER.')}</span>
                  <span>{t('DATE')}</span>
                  <span>{t('DESCRIPTION')}</span>
                  <span>BY</span>
                  {[
                    ['V1.0', '05/02/2024', 'First issue', 'KT'],
                    ['V1.1', '20/03/2024', 'Update dimension', 'KT'],
                    ['V1.2', '18/04/2024', 'Material change', 'KT'],
                    ['V2.0', '02/05/2024', 'Structural update', 'KT'],
                    ['V2.1', '15/05/2024', 'Final approved', 'QC'],
                  ].flatMap((row) => row.map((cell, index) => <span key={`${row[0]}-${cell}-${index}`}>{cell}</span>))}
                </div>
                <div className="supply-hub-technical-drawings-revision">
                  <strong>{t('REVISION CLOUD')}</strong>
                  <span>{t('Cập nhật kích thước')}</span>
                </div>
                <div className="supply-hub-technical-drawings-approved">
                  <strong>APPROVED</strong>
                  <span>QC MANAGER</span>
                  <span>15 MAY 2024</span>
                </div>
              </div>
            </div>
          </section>

          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-production">
            <h2>
              <span>4.</span> {t('Liên kết với sản xuất và QC')}
            </h2>
            <ul>
              {[
                'Kiểm tra kích thước',
                'Kiểm tra kết cấu',
                'Kiểm tra lắp ráp',
                'Kiểm tra vật liệu',
                'Kiểm tra hoàn thiện bề mặt',
                'Kiểm tra đóng gói',
              ].map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          </section>

          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-standard-room">
            <h2>
              <span>5.</span> {t('Liên kết với phòng mẫu chuẩn')}
            </h2>
            <p>
              {t(
                'Bản vẽ kỹ thuật được lưu trữ cùng các tài liệu tham chiếu để hình thành hệ thống chuẩn thống nhất cho từng buyer.',
              )}
            </p>
            <div className="supply-hub-technical-drawings-reference-flow">
              {[
                [
                  'Mẫu sản phẩm đã duyệt',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/reference-approved-product.webp',
                ],
                [
                  'Mẫu cấu kiện',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/reference-component-sample.webp',
                ],
                [
                  'Bảng màu',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/reference-color-board.webp',
                ],
                [
                  'Tiêu chuẩn vật liệu',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/reference-material-standard.webp',
                ],
                [
                  'Checklist QC',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/reference-qc-checklist.webp',
                ],
              ].map(([item, image]) => (
                <article key={item}>
                  <img
                    className="supply-hub-technical-drawings-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <strong>{t(item)}</strong>
                </article>
              ))}
            </div>
            <div className="supply-hub-technical-drawings-reference-caption">
              {t('HỆ THỐNG THAM CHIẾU CHUẨN - MỖI BUYER')}
            </div>
          </section>

          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-documents">
            <h2>
              <span>6.</span> {t('Những tài liệu buyer có thể cung cấp')}
            </h2>
            <div className="supply-hub-technical-drawings-document-grid">
              {[
                ['Bản vẽ PDF', '/assets/supply-hub/partner-standard-room/technical-drawings/document-pdf.webp'],
                ['Bản vẽ CAD', '/assets/supply-hub/partner-standard-room/technical-drawings/document-cad.webp'],
                ['Bản vẽ 2D', '/assets/supply-hub/partner-standard-room/technical-drawings/document-2d.webp'],
                ['Bản vẽ 3D', '/assets/supply-hub/partner-standard-room/technical-drawings/document-3d.webp'],
                ['Bản vẽ lắp ráp', '/assets/supply-hub/partner-standard-room/technical-drawings/document-assembly.webp'],
                ['Bản vẽ đóng gói', '/assets/supply-hub/partner-standard-room/technical-drawings/document-packing.webp'],
                [
                  'Bảng thông số kỹ thuật',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/document-spec-sheet.webp',
                ],
                ['Danh mục vật liệu (BOM)', '/assets/supply-hub/partner-standard-room/technical-drawings/document-bom.webp'],
                [
                  'Tiêu chuẩn kiểm tra riêng',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/document-inspection-standard.webp',
                ],
              ].map(([item, image]) => (
                <article key={item}>
                  <img
                    className="supply-hub-technical-drawings-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <strong>{t(item)}</strong>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-value">
            <h2>
              <span>7.</span> {t('Giá trị mang lại')}
            </h2>
            <div className="supply-hub-technical-drawings-value-layout">
              <div className="supply-hub-technical-drawings-value-grid">
                {[
                  [
                    'Đồng nhất sản xuất',
                    'Đảm bảo mọi nhà máy sản xuất đúng tiêu chuẩn, giảm sai lệch giữa các nhà cung cấp.',
                    '/assets/supply-hub/partner-standard-room/technical-drawings/value-consistency.webp',
                  ],
                  [
                    'Giảm lỗi sản xuất',
                    'Quản lý đúng phiên bản, kiểm soát thay đổi, hạn chế lỗi và làm lại.',
                    '/assets/supply-hub/partner-standard-room/technical-drawings/value-error-reduction.webp',
                  ],
                  [
                    'Hỗ trợ kiểm soát chất lượng',
                    'Tài liệu rõ ràng giúp QC kiểm tra chính xác và đảm bảo chất lượng.',
                    '/assets/supply-hub/partner-standard-room/technical-drawings/value-quality-control.webp',
                  ],
                  [
                    'Hỗ trợ phát triển lâu dài',
                    'Dữ liệu kỹ thuật được lưu trữ khoa học, giúp cải tiến sản phẩm và phát triển bền vững.',
                    '/assets/supply-hub/partner-standard-room/technical-drawings/value-long-term-development.webp',
                  ],
                ].map(([title, text, image]) => (
                  <article key={title}>
                    <h3>{t(title)}</h3>
                    <img
                      className="supply-hub-technical-drawings-image-slot"
                      src={image}
                      alt=""
                      loading="eager"
                      decoding="async"
                    />
                    <p>{t(text)}</p>
                  </article>
                ))}
              </div>
              <img
                className="supply-hub-technical-drawings-value-visual supply-hub-technical-drawings-image-slot"
                src="/assets/supply-hub/partner-standard-room/technical-drawings/value-technical-documents.webp"
                alt=""
                loading="eager"
                decoding="async"
                aria-hidden="true"
              />
            </div>
          </section>

          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-process">
            <h2>
              <span>8.</span> {t('Quy trình quản lý tài liệu kỹ thuật')}
            </h2>
            <div className="supply-hub-technical-drawings-process-flow">
              {[
                [
                  'Buyer cung cấp bản vẽ',
                  'Buyer gửi bản vẽ, tài liệu kỹ thuật và yêu cầu.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/process-buyer-submit.webp',
                ],
                [
                  'Tiếp nhận & ghi nhận',
                  'Tiếp nhận tài liệu, kiểm tra sơ bộ và ghi nhận thông tin.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/process-receive-record.webp',
                ],
                [
                  'Lưu trữ theo buyer / dự án',
                  'Lưu trữ theo cấu trúc buyer - dự án - sản phẩm trong hệ thống.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/process-store-project.webp',
                ],
                [
                  'Kiểm soát phiên bản',
                  'Quản lý phiên bản, phê duyệt và lịch sử thay đổi.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/process-version-control.webp',
                ],
                [
                  'Liên kết với sản xuất & QC',
                  'Chia sẻ cho nhà máy, phòng QC để sản xuất và kiểm tra.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/process-production-qc.webp',
                ],
                [
                  'Đối chiếu trong triển khai đơn hàng',
                  'Đối chiếu tài liệu trong từng đơn hàng, đảm bảo đúng bản vẽ phê duyệt.',
                  '/assets/supply-hub/partner-standard-room/technical-drawings/process-order-check.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title}>
                  <h3>{t(title)}</h3>
                  <img
                    className="supply-hub-technical-drawings-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-technical-drawings-panel supply-hub-technical-drawings-cta">
            <div>
              <h2>{t('Gửi tài liệu kỹ thuật cho ANSLIFE')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ kỹ thuật, tài liệu sản phẩm, mẫu tham chiếu hoặc yêu cầu kỹ thuật để ANSLIFE lưu trữ, đối chiếu và triển khai trong hệ thống quản lý dự án và chuỗi cung ứng.',
                )}
              </p>
            </div>
            <div className="supply-hub-technical-drawings-cta-actions">
              <a href="/contact/upload-drawing">
                <b aria-hidden="true">↥</b>
                <span>{t('Tải bản vẽ lên')}</span>
              </a>
              <a href="/contact/supply-hub-inquiry">
                <b aria-hidden="true">✈</b>
                <span>{t('Gửi yêu cầu kỹ thuật')}</span>
              </a>
              <a href="/contact">
                <b aria-hidden="true">☎</b>
                <span>{t('Liên hệ ANSLIFE')}</span>
              </a>
            </div>
          </section>
        </section>
      )}
      {isSupplyHubComponentSamplesPage && (
        <section className="supply-hub-component-samples-content" aria-labelledby="component-samples-role-title">
          <section className="supply-hub-component-samples-panel supply-hub-component-samples-role">
            <h2 id="component-samples-role-title">
              <span>1.</span> {t('Vai trò của mẫu cấu kiện')}
            </h2>
            <ul className="supply-hub-component-samples-role-list">
              {[
                'Tính đồng nhất giữa các nhà máy',
                'Tính chính xác của từng bộ phận sản phẩm',
                'Khả năng lắp ráp và liên kết đúng thiết kế',
                'Tính ổn định giữa các lô hàng',
                'Khả năng kiểm soát chất lượng từ giai đoạn đầu của sản xuất',
              ].map((item) => (
                <li key={item}>
                  <span className="supply-hub-component-samples-small-slot" aria-hidden="true" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-types">
            <h2>
              <span>2.</span> {t('Các loại mẫu cấu kiện được lưu trữ')}
            </h2>
            <div className="supply-hub-component-samples-type-grid">
              {[
                {
                  title: 'Cấu kiện gỗ',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/type-wood-components.webp',
                  items: [
                    'Chân ghế',
                    'Tay ghế',
                    'Lưng ghế',
                    'Mặt ghế',
                    'Thanh giằng',
                    'Chân bàn',
                    'Mặt bàn',
                    'Bộ phận tủ',
                    'Bộ phận giường',
                    'Chi tiết CNC',
                    'Chi tiết tiện',
                  ],
                },
                {
                  title: 'Cấu kiện bọc nệm',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/type-upholstery-components.webp',
                  items: [
                    'Khung ghế',
                    'Khung sofa',
                    'Seat cushion',
                    'Back cushion',
                    'Tay ghế bọc',
                    'Bộ phận foam theo khuôn',
                  ],
                },
                {
                  title: 'Cấu kiện mây tre',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/type-rattan-components.webp',
                  items: [
                    'Mặt đan mây',
                    'Lưng ghế mây',
                    'Cánh tủ mây',
                    'Panel mây',
                    'Chi tiết mây tre theo thiết kế',
                  ],
                },
                {
                  title: 'Cấu kiện kim loại và vật liệu kết hợp',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/type-metal-mixed-components.webp',
                  items: [
                    'Khung kim loại',
                    'Chân kim loại',
                    'Chi tiết liên kết',
                    'Bộ phận kết hợp gỗ và kim loại',
                  ],
                },
              ].map((group) => (
                <article key={group.title} className="supply-hub-component-samples-type-card">
                  <img
                    className="supply-hub-component-samples-image-slot"
                    src={group.image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(group.title)}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-records">
            <h2>
              <span>3.</span> {t('Những gì được lưu giữ cùng mẫu')}
            </h2>
            <div className="supply-hub-component-samples-record-grid">
              {[
                {
                  title: 'Hồ sơ kỹ thuật',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/record-technical.webp',
                  items: [
                    'Bản vẽ kỹ thuật',
                    'Thông số kích thước',
                    'Tolerances',
                    'Mã cấu kiện',
                    'Quy cách gia công',
                  ],
                },
                {
                  title: 'Hồ sơ vật liệu',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/record-material.webp',
                  items: [
                    'Chủng loại vật liệu',
                    'Tiêu chuẩn vật liệu',
                    'Yêu cầu độ ẩm',
                    'Yêu cầu hoàn thiện',
                  ],
                },
                {
                  title: 'Hồ sơ QC',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/record-qc.webp',
                  items: [
                    'Checklist QC',
                    'Điểm kiểm tra quan trọng',
                    'Tiêu chuẩn chấp nhận',
                    'Hình ảnh tham chiếu',
                  ],
                },
              ].map((group) => (
                <article key={group.title} className="supply-hub-component-samples-record-card">
                  <img
                    className="supply-hub-component-samples-image-slot"
                    src={group.image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(group.title)}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-usage">
            <h2>
              <span>4.</span> {t('Mẫu cấu kiện được sử dụng như thế nào?')}
            </h2>
            <div className="supply-hub-component-samples-usage-grid">
              {[
                [
                  'Trong phát triển sản phẩm',
                  'Đối chiếu khả năng gia công và lắp ráp trước khi sản xuất hàng loạt.',
                  '/assets/supply-hub/partner-standard-room/component-samples/usage-product-development.webp',
                ],
                [
                  'Trong sản xuất',
                  'Đối chiếu kích thước, kết cấu, mộng và liên kết, hình dáng, gia công bề mặt.',
                  '/assets/supply-hub/partner-standard-room/component-samples/usage-production.webp',
                ],
                [
                  'Trong lắp ráp',
                  'Đối chiếu khả năng lắp ghép, độ chính xác liên kết, độ ổn định kết cấu.',
                  '/assets/supply-hub/partner-standard-room/component-samples/usage-assembly.webp',
                ],
                [
                  'Trong QC',
                  'Đối chiếu ngoại quan, kích thước, chất lượng gia công, chất lượng hoàn thiện bề mặt.',
                  '/assets/supply-hub/partner-standard-room/component-samples/usage-qc.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title} className="supply-hub-component-samples-usage-card">
                  <img
                    className="supply-hub-component-samples-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-key-groups">
            <h2>
              <span>5.</span> {t('Các nhóm cấu kiện quan trọng cần lưu mẫu')}
            </h2>
            <div className="supply-hub-component-samples-key-grid">
              {[
                {
                  title: 'Liên kết và mộng gỗ',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/key-joints.webp',
                  items: [
                    'Mortise & Tenon',
                    'Dowel Joint',
                    'Corner Block',
                    'Finger Joint',
                    'Chi tiết liên kết đặc biệt',
                  ],
                  note: 'Ảnh hưởng trực tiếp đến độ bền và khả năng lắp ráp.',
                },
                {
                  title: 'Cấu kiện hoàn thiện bề mặt',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/key-finish-components.webp',
                  items: [
                    'Đối chiếu màu sắc',
                    'Vân gỗ',
                    'Độ bóng',
                    'Độ mờ',
                    'Chất lượng bề mặt',
                  ],
                },
                {
                  title: 'Cấu kiện đã gia công CNC',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/key-cnc-components.webp',
                  items: [
                    'Đảm bảo độ chính xác hình học',
                    'Tính đồng nhất giữa các lô sản xuất',
                    'Tính tương thích khi lắp ráp',
                  ],
                },
              ].map((group) => (
                <article key={group.title} className="supply-hub-component-samples-key-card">
                  <img
                    className="supply-hub-component-samples-image-slot"
                    src={group.image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <div>
                    <h3>{t(group.title)}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                    {group.note && <p>{t(group.note)}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-management">
            <h2>
              <span>6.</span> {t('Quản lý theo buyer và dự án')}
            </h2>
            <div className="supply-hub-component-samples-management-grid">
              {[
                {
                  title: 'Theo buyer',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/management-buyer.webp',
                  items: ['Bộ mẫu cấu kiện riêng', 'Quy cách riêng', 'Tiêu chuẩn riêng'],
                },
                {
                  title: 'Theo dự án',
                  image: '/assets/supply-hub/partner-standard-room/component-samples/management-project.webp',
                  items: [
                    'Cấu kiện riêng của từng chương trình sản xuất',
                    'Bộ linh kiện riêng cho từng sản phẩm',
                    'Hồ sơ kỹ thuật riêng',
                  ],
                },
              ].map((group) => (
                <article key={group.title} className="supply-hub-component-samples-management-card">
                  <img
                    className="supply-hub-component-samples-image-slot"
                    src={group.image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(group.title)}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-supply-hub">
            <h2>
              <span>7.</span> {t('Kết nối với hệ thống Supply Hub')}
            </h2>
            <div className="supply-hub-component-samples-flow">
              {[
                [
                  'Kho vật liệu',
                  'Đối chiếu vật liệu đầu vào.',
                  '/assets/supply-hub/partner-standard-room/component-samples/flow-material-warehouse.webp',
                ],
                [
                  'Kho cấu kiện',
                  'Đối chiếu hàng sản xuất thực tế.',
                  '/assets/supply-hub/partner-standard-room/component-samples/flow-component-warehouse.webp',
                ],
                [
                  'Hồ sơ sản phẩm',
                  'Đối chiếu với mẫu thành phẩm đã duyệt.',
                  '/assets/supply-hub/partner-standard-room/component-samples/flow-product-records.webp',
                ],
                [
                  'Hồ sơ QC',
                  'Đối chiếu tiêu chuẩn kiểm tra.',
                  '/assets/supply-hub/partner-standard-room/component-samples/flow-qc-records.webp',
                ],
                [
                  'Hồ sơ sản xuất',
                  'Đối chiếu bản vẽ và quy trình gia công.',
                  '/assets/supply-hub/partner-standard-room/component-samples/flow-production-records.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title}>
                  <img
                    className="supply-hub-component-samples-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-benefits">
            <h2>
              <span>8.</span> {t('Lợi ích đối với buyer')}
            </h2>
            <div className="supply-hub-component-samples-benefit-grid">
              {[
                [
                  'Kiểm soát chất lượng từ gốc',
                  'Chuẩn hóa từ cấu kiện, giảm rủi ro sai lệch ở các công đoạn sau.',
                  '/assets/supply-hub/partner-standard-room/component-samples/benefit-source-quality.webp',
                ],
                [
                  'Duy trì tính đồng nhất',
                  'Đảm bảo chất lượng ổn định trong nhiều nhà máy và nhiều lô hàng.',
                  '/assets/supply-hub/partner-standard-room/component-samples/benefit-consistency.webp',
                ],
                [
                  'Giảm thời gian xử lý lỗi',
                  'Dễ dàng xác định nguyên nhân và đưa ra giải pháp nhanh chóng, chính xác.',
                  '/assets/supply-hub/partner-standard-room/component-samples/benefit-faster-fixes.webp',
                ],
                [
                  'Hỗ trợ chương trình cung ứng dài hạn',
                  'Tạo nền tảng tin cậy và hiệu quả cho hợp tác lâu dài.',
                  '/assets/supply-hub/partner-standard-room/component-samples/benefit-long-term-supply.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title} className="supply-hub-component-samples-benefit-card">
                  <img
                    className="supply-hub-component-samples-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-process">
            <h2>
              <span>9.</span> {t('Quy trình quản lý mẫu cấu kiện')}
            </h2>
            <ol className="supply-hub-component-samples-process-list">
              {[
                [
                  'Buyer phê duyệt cấu kiện',
                  '/assets/supply-hub/partner-standard-room/component-samples/process-approval.webp',
                ],
                [
                  'Tiếp nhận & ghi nhận mẫu',
                  '/assets/supply-hub/partner-standard-room/component-samples/process-receive-record.webp',
                ],
                [
                  'Lưu trữ tại Phòng mẫu chuẩn đối tác',
                  '/assets/supply-hub/partner-standard-room/component-samples/process-standard-room.webp',
                ],
                [
                  'Liên kết với bản vẽ kỹ thuật',
                  '/assets/supply-hub/partner-standard-room/component-samples/process-technical-drawing.webp',
                ],
                [
                  'Liên kết với tiêu chuẩn QC',
                  '/assets/supply-hub/partner-standard-room/component-samples/process-qc-standard.webp',
                ],
                [
                  'Đối chiếu trong sản xuất',
                  '/assets/supply-hub/partner-standard-room/component-samples/process-production-check.webp',
                ],
                [
                  'Đối chiếu trong lắp ráp',
                  '/assets/supply-hub/partner-standard-room/component-samples/process-assembly-check.webp',
                ],
                [
                  'Đối chiếu trước khi xuất hàng',
                  '/assets/supply-hub/partner-standard-room/component-samples/process-pre-export-check.webp',
                ],
              ].map(([label, image]) => (
                <li key={label}>
                  <img
                    className="supply-hub-component-samples-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <span>{t(label)}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="supply-hub-component-samples-panel supply-hub-component-samples-cta">
            <div className="supply-hub-component-samples-cta-media" aria-hidden="true">
              <img
                className="supply-hub-component-samples-image-slot"
                src="/assets/supply-hub/partner-standard-room/component-samples/cta-standard-components.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="supply-hub-component-samples-cta-copy">
              <h2>{t('Duy trì tiêu chuẩn cấu kiện xuyên suốt toàn bộ dự án')}</h2>
            </div>
            <div className="supply-hub-component-samples-cta-media" aria-hidden="true">
              <img
                className="supply-hub-component-samples-image-slot"
                src="/assets/supply-hub/partner-standard-room/component-samples/cta-component-records.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="supply-hub-component-samples-cta-note">
              <p>
                {t(
                  'ANSLIFE hỗ trợ lưu trữ, quản lý và đối chiếu mẫu cấu kiện nhằm đảm bảo tính nhất quán giữa vật liệu, gia công, lắp ráp, QC và sản xuất hàng loạt.',
                )}
              </p>
            </div>
            <div className="supply-hub-component-samples-cta-actions">
              <a href="/contact/supply-hub-inquiry">
                <span>{t('Gửi yêu cầu')}</span>
                <b aria-hidden="true">→</b>
              </a>
              <a href="/contact">
                <span>{t('Trao đổi với ANSLIFE')}</span>
                <b aria-hidden="true">☰</b>
              </a>
            </div>
          </section>
        </section>
      )}
      {isSupplyHubApprovedProductSamplesPage && (
        <section className="supply-hub-approved-samples-content" aria-labelledby="approved-samples-role-title">
          <section className="supply-hub-approved-samples-panel supply-hub-approved-samples-role">
            <h2 id="approved-samples-role-title">
              <span>1.</span> {t('Vai trò của mẫu sản phẩm đã duyệt')}
            </h2>
            <p>{t('Mẫu đã duyệt là tiêu chuẩn tham chiếu chính thức cho toàn bộ dự án.')}</p>
            <ul className="supply-hub-approved-samples-check-list">
              {[
                'Đối chiếu trong sản xuất',
                'Đối chiếu trong kiểm tra chất lượng',
                'Đối chiếu trong đánh giá nhà máy',
                'Đối chiếu trong hoàn thiện bề mặt',
                'Đối chiếu trong đóng gói',
                'Đối chiếu trong các đơn hàng lặp lại',
              ].map((item) => (
                <li key={item}>
                  <span className="supply-hub-approved-samples-small-slot" aria-hidden="true" />
                  <span>{t(item)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="supply-hub-approved-samples-panel supply-hub-approved-samples-stored">
            <h2>
              <span>2.</span> {t('Những gì được lưu giữ cùng mẫu')}
            </h2>
            <div className="supply-hub-approved-samples-stored-grid">
              {[
                {
                  title: 'Sản phẩm mẫu',
                  image: '/assets/supply-hub/partner-standard-room/approved-product-samples/stored-product-sample.webp',
                  items: [
                    'Mẫu hoàn chỉnh',
                    'Mẫu prototype',
                    'Mẫu PP (Pre-Production Sample)',
                    'Mẫu Golden Sample',
                    'Mẫu chuẩn đang áp dụng cho dự án',
                  ],
                },
                {
                  title: 'Hồ sơ kỹ thuật liên quan',
                  image:
                    '/assets/supply-hub/partner-standard-room/approved-product-samples/stored-technical-records.webp',
                  items: [
                    'Bản vẽ kỹ thuật',
                    'Thông số kích thước',
                    'Mã sản phẩm',
                    'Danh mục vật liệu',
                    'Danh mục cấu kiện',
                    'Quy cách lắp ráp',
                  ],
                },
                {
                  title: 'Hồ sơ hoàn thiện bề mặt',
                  image:
                    '/assets/supply-hub/partner-standard-room/approved-product-samples/stored-finish-records.webp',
                  items: [
                    'Mẫu màu đã duyệt',
                    'Bảng màu tham chiếu',
                    'Tiêu chuẩn độ bóng',
                    'Tiêu chuẩn hoàn thiện bề mặt',
                    'Hồ sơ stain và top coat',
                  ],
                },
                {
                  title: 'Hồ sơ QC',
                  image: '/assets/supply-hub/partner-standard-room/approved-product-samples/stored-qc-records.webp',
                  items: [
                    'Checklist QC',
                    'Tiêu chuẩn chấp nhận',
                    'Tiêu chuẩn ngoại quan',
                    'Tiêu chuẩn đóng gói',
                    'Hình ảnh tham chiếu',
                  ],
                },
              ].map((group) => (
                <article key={group.title} className="supply-hub-approved-samples-stored-card">
                  <img
                    className="supply-hub-approved-samples-image-slot"
                    src={group.image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(group.title)}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-approved-samples-panel supply-hub-approved-samples-usage">
            <h2>
              <span>3.</span> {t('Mẫu được sử dụng như thế nào?')}
            </h2>
            <div className="supply-hub-approved-samples-usage-list">
              {[
                [
                  'Trước khi sản xuất',
                  'Nhà máy đối chiếu kích thước, kết cấu, vật liệu, hoàn thiện và quy cách lắp ráp trước khi triển khai sản xuất hàng loạt.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/usage-before-production.webp',
                ],
                [
                  'Trong quá trình sản xuất',
                  'Đối chiếu kích thước, màu sắc, hoàn thiện bề mặt, kết cấu sản phẩm và các chi tiết quan trọng.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/usage-during-production.webp',
                ],
                [
                  'Trong quá trình QC',
                  'So sánh ngoại quan, đánh giá sai lệch, kiểm tra độ đồng đều giữa các lô hàng và xác nhận chất lượng trước khi xuất hàng.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/usage-qc.webp',
                ],
                [
                  'Trong các đơn hàng lặp lại',
                  'Duy trì tính nhất quán giữa các năm, giảm thời gian phát triển lại sản phẩm và hạn chế sai khác giữa các đợt sản xuất.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/usage-repeat-orders.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title} className="supply-hub-approved-samples-usage-row">
                  <img
                    className="supply-hub-approved-samples-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-approved-samples-panel supply-hub-approved-samples-buyer">
            <h2>
              <span>4.</span> {t('Quản lý theo buyer')}
            </h2>
            <div className="supply-hub-approved-samples-buyer-body">
              <img
                className="supply-hub-approved-samples-image-slot"
                src="/assets/supply-hub/partner-standard-room/approved-product-samples/buyer-management.webp"
                alt=""
                loading="eager"
                decoding="async"
              />
              <div>
                <p>{t('Mỗi buyer sẽ có:')}</p>
                <ul>
                  {[
                    'Bộ mẫu riêng',
                    'Tiêu chuẩn riêng',
                    'Hệ vật liệu riêng',
                    'Bảng màu riêng',
                    'Tiêu chuẩn đóng gói riêng',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="supply-hub-approved-samples-panel supply-hub-approved-samples-supply-hub">
            <h2>
              <span>5.</span> {t('Kết nối với Supply Hub Việt Nam')}
            </h2>
            <div className="supply-hub-approved-samples-flow">
              {[
                [
                  'Kho vật liệu',
                  'Đối chiếu vật liệu sử dụng trong sản xuất.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/supply-hub-material-warehouse.webp',
                ],
                [
                  'Kho cấu kiện',
                  'Đối chiếu các bộ phận và bán thành phẩm.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/supply-hub-component-warehouse.webp',
                ],
                [
                  'Hồ sơ QC',
                  'Đối chiếu tiêu chuẩn chất lượng.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/supply-hub-qc-records.webp',
                ],
                [
                  'Hồ sơ xuất khẩu',
                  'Đối chiếu quy cách đóng gói và ghi nhãn.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/supply-hub-export-records.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title}>
                  <img
                    className="supply-hub-approved-samples-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-approved-samples-panel supply-hub-approved-samples-benefits">
            <h2>
              <span>6.</span> {t('Lợi ích đối với buyer')}
            </h2>
            <div className="supply-hub-approved-samples-benefit-grid">
              {[
                [
                  'Duy trì tính nhất quán',
                  'Giữ tiêu chuẩn ổn định cho tất cả các lô hàng và nhiều năm.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/benefit-consistency.webp',
                ],
                [
                  'Giảm rủi ro sai lệch',
                  'Hạn chế sai khác về chất lượng, màu sắc, hoàn thiện và đóng gói.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/benefit-risk-reduction.webp',
                ],
                [
                  'Tăng tốc triển khai đơn hàng',
                  'Rút ngắn thời gian phê duyệt và chuẩn bị sản xuất.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/benefit-order-speed.webp',
                ],
                [
                  'Hỗ trợ nhiều nhà máy',
                  'Dễ dàng nhân rộng sản xuất tại nhiều nhà máy khác nhau.',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/benefit-multi-factory.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title} className="supply-hub-approved-samples-benefit-card">
                  <img
                    className="supply-hub-approved-samples-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <h3>{t(title)}</h3>
                  <p>{t(text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="supply-hub-approved-samples-panel supply-hub-approved-samples-process">
            <h2>
              <span>7.</span> {t('Quy trình quản lý mẫu')}
            </h2>
            <ol className="supply-hub-approved-samples-process-list">
              {[
                [
                  'Buyer phê duyệt mẫu',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/process-approval.webp',
                ],
                [
                  'Tiếp nhận & ghi nhận mẫu',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/process-receive-record.webp',
                ],
                [
                  'Lưu trữ tại Phòng mẫu chuẩn đối tác',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/process-standard-room.webp',
                ],
                [
                  'Liên kết với hồ sơ kỹ thuật',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/process-technical-link.webp',
                ],
                [
                  'Liên kết với hồ sơ QC',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/process-qc-link.webp',
                ],
                [
                  'Đối chiếu trong sản xuất',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/process-production-check.webp',
                ],
                [
                  'Đối chiếu trước khi xuất hàng',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/process-pre-export-check.webp',
                ],
                [
                  'Duy trì cho các đơn hàng tiếp theo',
                  '/assets/supply-hub/partner-standard-room/approved-product-samples/process-repeat-orders.webp',
                ],
              ].map(([label, image], index) => (
                <li key={label}>
                  <img
                    className="supply-hub-approved-samples-image-slot"
                    src={image}
                    alt=""
                    loading="eager"
                    decoding="async"
                  />
                  <span>
                    {index + 1}. {t(label)}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="supply-hub-approved-samples-panel supply-hub-approved-samples-cta">
            <div className="supply-hub-approved-samples-cta-copy">
              <h2>{t('Duy trì tiêu chuẩn sản phẩm xuyên suốt nhiều đơn hàng')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lưu trữ, quản lý và đối chiếu mẫu sản phẩm đã duyệt nhằm đảm bảo tính nhất quán giữa sản xuất, QC, đóng gói và xuất khẩu.',
                )}
              </p>
              <div className="supply-hub-approved-samples-cta-actions">
                <a href="/contact/supply-hub-inquiry">
                  <span>{t('Gửi yêu cầu')}</span>
                  <b aria-hidden="true">→</b>
                </a>
                <a href="/contact">
                  <span>{t('Trao đổi với ANSLIFE')}</span>
                  <b aria-hidden="true">☰</b>
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isSupplyHubMaterialComponentStoragePage && (
        <section className="supply-hub-material-storage-content" aria-labelledby="material-storage-items-title">
          <section className="supply-hub-material-storage-panel supply-hub-material-storage-items">
            <h2 id="material-storage-items-title">
              <span>1.</span> {t('Những gì có thể được lưu kho')}
            </h2>
            <div className="supply-hub-material-storage-item-grid">
              {supplyHubMaterialStorageGroups.map((group, index) => (
                <article key={group.title} className="supply-hub-material-storage-item-card">
                  <img
                    className="supply-hub-material-storage-image-placeholder"
                    src={supplyHubMaterialStorageItemImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="supply-hub-material-storage-item-copy">
                    <h3>{t(group.title)}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-material-storage-panel supply-hub-material-storage-goals" aria-labelledby="material-storage-goals-title">
            <h2 id="material-storage-goals-title">
              <span>2.</span> {t('Mục tiêu của giải pháp')}
            </h2>
            <div className="supply-hub-material-storage-goal-grid">
              {supplyHubMaterialStorageGoals.map((goal, index) => (
                <article key={goal.title} className="supply-hub-material-storage-goal-card">
                  <img
                    className="supply-hub-material-storage-goal-image-placeholder"
                    src={supplyHubMaterialStorageGoalImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(goal.title)}</h3>
                  <p>{t(goal.body)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-material-storage-panel supply-hub-material-storage-projects" aria-labelledby="material-storage-projects-title">
            <h2 id="material-storage-projects-title">
              <span>3.</span> {t('Quản lý tồn kho theo dự án')}
            </h2>
            <div className="supply-hub-material-storage-project-list">
              {supplyHubMaterialProjectInventoryGroups.map((group, index) => (
                <article key={group.label} className="supply-hub-material-storage-project-row">
                  <img
                    className="supply-hub-material-storage-small-image-placeholder"
                    src={supplyHubMaterialProjectImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <strong>{t(group.label)}</strong>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-material-storage-panel supply-hub-material-storage-dispatch" aria-labelledby="material-storage-dispatch-title">
            <h2 id="material-storage-dispatch-title">
              <span>4.</span> {t('Điều phối cấp phát cho sản xuất')}
            </h2>
            <div className="supply-hub-material-storage-icon-list">
              {supplyHubMaterialProductionDispatch.map((item, index) => (
                <article key={item} className="supply-hub-material-storage-icon-row">
                  <img
                    className="supply-hub-material-storage-small-image-placeholder"
                    src={supplyHubMaterialDispatchImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{t(item)}</span>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-material-storage-panel supply-hub-material-storage-supply-hub" aria-labelledby="material-storage-supply-hub-title">
            <h2 id="material-storage-supply-hub-title">
              <span>5.</span> {t('Kết hợp với Supply Hub Việt Nam')}
            </h2>
            <div className="supply-hub-material-storage-icon-list">
              {supplyHubMaterialSupplyHubIntegration.map((item, index) => (
                <article key={item} className="supply-hub-material-storage-icon-row">
                  <img
                    className="supply-hub-material-storage-small-image-placeholder"
                    src={supplyHubMaterialSupplyHubImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{t(item)}</span>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-material-storage-panel supply-hub-material-storage-traceability" aria-labelledby="material-storage-traceability-title">
            <div className="supply-hub-material-storage-traceability-copy">
              <h2 id="material-storage-traceability-title">
                <span>6.</span> {t('Kiểm soát và truy xuất')}
              </h2>
              <ul>
                {supplyHubMaterialTraceabilityControls.map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </div>
            <img
              className="supply-hub-material-storage-traceability-image-placeholder"
              src={`${materialStorageAssetBase}/traceability-01.webp`}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </section>
          <section className="supply-hub-material-storage-panel supply-hub-material-storage-audiences" aria-labelledby="material-storage-audiences-title">
            <h2 id="material-storage-audiences-title">
              <span>7.</span> {t('Đối tượng phù hợp')}
            </h2>
            <div className="supply-hub-material-storage-audience-grid">
              {supplyHubMaterialAudiences.map((audience, index) => (
                <article key={audience.title} className="supply-hub-material-storage-audience-card">
                  <img
                    className="supply-hub-material-storage-audience-image-placeholder"
                    src={supplyHubMaterialAudienceImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(audience.title)}</h3>
                  <p>{t(audience.body)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-material-storage-panel supply-hub-material-storage-operation" aria-labelledby="material-storage-operation-title">
            <h2 id="material-storage-operation-title">
              <span>8.</span> {t('Quy trình vận hành')}
            </h2>
            <div className="supply-hub-material-storage-operation-steps">
              {supplyHubMaterialOperationSteps.map((step, index) => (
                <article key={step} className="supply-hub-material-storage-operation-step">
                  <span className="supply-hub-material-storage-operation-number">{index + 1}</span>
                  <p>{t(step)}</p>
                  <img
                    className="supply-hub-material-storage-operation-image-placeholder"
                    src={supplyHubMaterialOperationImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-material-storage-cta" aria-labelledby="material-storage-cta-title">
            <img
              className="supply-hub-material-storage-cta-image-placeholder"
              src={`${materialStorageAssetBase}/cta-01.webp`}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="supply-hub-material-storage-cta-copy">
              <h2 id="material-storage-cta-title">{t('Cần lưu kho vật liệu hoặc cấu kiện tại Việt Nam?')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ tiếp nhận, quản lý, lưu kho và điều phối vật liệu, cấu kiện và bán thành phẩm nhằm phục vụ sản xuất, lắp ráp và xuất khẩu theo kế hoạch của từng buyer hoặc dự án.',
                )}
              </p>
            </div>
            <div className="supply-hub-material-storage-cta-actions">
              <a className="supply-hub-material-storage-cta-primary" href="/contact/supply-hub-inquiry">
                {t('Gửi yêu cầu')}
              </a>
              <a className="supply-hub-material-storage-cta-secondary" href="/contact">
                {t('Trao đổi với ANSLIFE')}
              </a>
            </div>
            <img
              className="supply-hub-material-storage-cta-image-placeholder"
              src={`${materialStorageAssetBase}/cta-02.webp`}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </section>
        </section>
      )}
      {shouldShowSupplyHubExportDocumentationSupportBanner && (
        <figure className="supply-hub-export-documentation-support-banner">
          <img
            src="/assets/supply-hub/export-documentation-support-banner.png"
            alt={t('Sơ đồ hỗ trợ chứng từ xuất khẩu của ANSLIFE')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-export-documentation-support-banner-copy">
            <h1>{t('Hỗ trợ chứng từ xuất khẩu')}</h1>
            <span>{t('Tổng quan')}</span>
            <p>
              {t(
                'ANSLIFE hỗ trợ phối hợp, chuẩn bị, kiểm tra và quản lý các chứng từ liên quan đến hoạt động xuất khẩu nhằm giúp quá trình giao nhận hàng hóa diễn ra thuận lợi, đúng kế hoạch và phù hợp với yêu cầu của buyer, đơn vị logistics và cơ quan liên quan.',
              )}
            </p>
            <p>
              {t(
                'Giải pháp này đặc biệt hữu ích đối với các dự án có nhiều nhà máy tham gia sản xuất, nhiều đợt giao hàng hoặc yêu cầu tiêu chuẩn chứng từ riêng theo từng thị trường.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isSupplyHubExportDocumentationSupportPage && (
        <section className="supply-hub-export-doc-content" aria-labelledby="export-doc-role-title">
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-role">
            <img
              className="supply-hub-export-doc-role-image-placeholder"
              src={`${exportDocumentationAssetBase}/role-01.webp`}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="supply-hub-export-doc-role-copy">
              <h2 id="export-doc-role-title">{t('Vai trò của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE không thay thế vai trò của đơn vị khai báo hải quan hoặc hãng vận chuyển, mà đóng vai trò điều phối và hỗ trợ quản lý chứng từ trong toàn bộ chuỗi cung ứng.',
                )}
              </p>
              <p>
                {t(
                  'Chúng tôi giúp buyer và nhà máy giảm rủi ro sai sót, thiếu hụt thông tin hoặc chậm trễ trong quá trình chuẩn bị hồ sơ xuất khẩu.',
                )}
              </p>
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-commercial" aria-labelledby="export-doc-commercial-title">
            <h2 id="export-doc-commercial-title">{t('Hỗ trợ chuẩn bị chứng từ thương mại')}</h2>
            <div className="supply-hub-export-doc-commercial-grid">
              {supplyHubExportCommercialDocuments.map((document, index) => (
                <article key={document.title} className="supply-hub-export-doc-commercial-card">
                  <img
                    className="supply-hub-export-doc-commercial-image-placeholder"
                    src={supplyHubExportCommercialImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="supply-hub-export-doc-commercial-copy">
                    <h3>{t(document.title)}</h3>
                    <p>{t(document.lead)}</p>
                    <ul>
                      {document.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-multi-factory" aria-labelledby="export-doc-multi-factory-title">
            <h2 id="export-doc-multi-factory-title">{t('Hỗ trợ dự án có nhiều nhà máy')}</h2>
            <div className="supply-hub-export-doc-multi-factory-body">
              <img
                className="supply-hub-export-doc-multi-factory-image-placeholder"
                src={`${exportDocumentationAssetBase}/multi-factory-01.webp`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <ul>
                {supplyHubExportMultiFactorySupport.map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-checks" aria-labelledby="export-doc-checks-title">
            <h2 id="export-doc-checks-title">{t('Kiểm tra chứng từ trước khi xuất hàng')}</h2>
            <div className="supply-hub-export-doc-checks-body">
              <img
                className="supply-hub-export-doc-checks-image-placeholder"
                src={`${exportDocumentationAssetBase}/checks-01.webp`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <ul>
                {supplyHubExportDocumentChecks.map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-qc" aria-labelledby="export-doc-qc-title">
            <h2 id="export-doc-qc-title">{t('Kết nối với QC và Supply Hub')}</h2>
            <div className="supply-hub-export-doc-qc-grid">
              {supplyHubExportQcConnections.map((group, index) => (
                <article key={group.title} className="supply-hub-export-doc-qc-card">
                  <img
                    className="supply-hub-export-doc-qc-image-placeholder"
                    src={supplyHubExportQcImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(group.title)}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-buyer-requirements" aria-labelledby="export-doc-buyer-requirements-title">
            <h2 id="export-doc-buyer-requirements-title">{t('Hỗ trợ theo yêu cầu riêng của buyer')}</h2>
            <div className="supply-hub-export-doc-buyer-body">
              <img
                className="supply-hub-export-doc-buyer-image-placeholder"
                src={`${exportDocumentationAssetBase}/buyer-requirements-01.webp`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <ul>
                {supplyHubExportBuyerRequirements.map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-repeat-orders" aria-labelledby="export-doc-repeat-orders-title">
            <h2 id="export-doc-repeat-orders-title">{t('Quản lý hồ sơ cho đơn hàng lặp lại')}</h2>
            <div className="supply-hub-export-doc-repeat-body">
              <img
                className="supply-hub-export-doc-repeat-image-placeholder"
                src={`${exportDocumentationAssetBase}/repeat-01.webp`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <ul>
                {supplyHubExportRepeatOrderRecords.map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-audiences" aria-labelledby="export-doc-audiences-title">
            <h2 id="export-doc-audiences-title">{t('Đối tượng phù hợp')}</h2>
            <div className="supply-hub-export-doc-audience-list">
              {supplyHubExportAudiences.map((audience, index) => (
                <article key={audience.title} className="supply-hub-export-doc-audience-row">
                  <img
                    className="supply-hub-export-doc-audience-image-placeholder"
                    src={supplyHubExportAudienceImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>{t(audience.title)}</h3>
                    <p>{t(audience.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-process" aria-labelledby="export-doc-process-title">
            <h2 id="export-doc-process-title">{t('Quy trình hỗ trợ')}</h2>
            <div className="supply-hub-export-doc-process-steps">
              {supplyHubExportSupportProcessSteps.map((step, index) => (
                <article key={step} className="supply-hub-export-doc-process-step">
                  <span className="supply-hub-export-doc-process-number">{index + 1}</span>
                  <img
                    className="supply-hub-export-doc-process-image-placeholder"
                    src={supplyHubExportProcessImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{t(step)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-export-doc-panel supply-hub-export-doc-buyer-inputs" aria-labelledby="export-doc-buyer-inputs-title">
            <h2 id="export-doc-buyer-inputs-title">{t('Buyer cần cung cấp')}</h2>
            <div className="supply-hub-export-doc-buyer-inputs-body">
              <img
                className="supply-hub-export-doc-buyer-inputs-image-placeholder"
                src={`${exportDocumentationAssetBase}/buyer-inputs-01.webp`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <ul>
                {supplyHubExportBuyerInputs.map((input) => (
                  <li key={input}>{t(input)}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="supply-hub-export-doc-cta" aria-labelledby="export-doc-cta-title">
            <div className="supply-hub-export-doc-cta-copy">
              <h2 id="export-doc-cta-title">{t('Cần hỗ trợ quản lý chứng từ xuất khẩu?')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ phối hợp, kiểm tra và quản lý hồ sơ xuất khẩu nhằm giúp buyer và nhà máy giảm rủi ro sai sót, đồng thời nâng cao khả năng kiểm soát chuỗi cung ứng tại Việt Nam.',
                )}
              </p>
              <div className="supply-hub-export-doc-cta-actions">
                <a className="supply-hub-export-doc-cta-primary" href="/contact/supply-hub-inquiry">
                  {t('Gửi yêu cầu')}
                  <span aria-hidden="true">→</span>
                </a>
                <a className="supply-hub-export-doc-cta-secondary" href="/contact">
                  {t('Trao đổi với ANSLIFE')}
                  <span aria-hidden="true">☏</span>
                </a>
              </div>
            </div>
            <img
              className="supply-hub-export-doc-cta-image-placeholder"
              src={`${exportDocumentationAssetBase}/cta-01.webp`}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </section>
        </section>
      )}
      {shouldShowSupplyHubLclFclConsolidationBanner && (
        <figure className="supply-hub-lcl-fcl-consolidation-banner">
          <img
            src="/assets/supply-hub/lcl-fcl-consolidation-banner.png"
            alt={t('Sơ đồ gom hàng LCL / FCL từ nhà máy qua kho ANSLIFE đến xuất khẩu')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-lcl-fcl-consolidation-banner-copy">
            <h1>{t('Gom hàng LCL / FCL')}</h1>
            <span>{t('Tổng quan')}</span>
            <p>
              {t(
                'ANSLIFE hỗ trợ gom hàng từ nhiều nhà máy, nhiều nhà cung cấp hoặc nhiều nhóm sản phẩm khác nhau tại Việt Nam trước khi xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'Giải pháp này giúp buyer giảm chi phí logistics, tối ưu kế hoạch giao hàng, đơn giản hóa quản lý chứng từ và hạn chế việc phải làm việc với nhiều đơn vị vận chuyển khác nhau.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE có thể tiếp nhận hàng từ các nhà máy đối tác, kiểm tra tình trạng hàng hóa, tổ chức lưu kho tạm thời, gom hàng theo kế hoạch và điều phối xuất khẩu theo hình thức LCL hoặc FCL.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowSupplyHubWeeklyShipmentArrangementBanner && (
        <figure className="supply-hub-weekly-shipment-arrangement-banner">
          <img
            src="/assets/supply-hub/weekly-shipment-arrangement-banner.png"
            alt={t('Sơ đồ điều phối xuất hàng định kỳ từ nhiều nhà máy qua kho ANSLIFE')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="supply-hub-weekly-shipment-arrangement-banner-copy">
            <h1>{t('Điều phối xuất hàng định kỳ')}</h1>
            <span>{t('Tổng quan')}</span>
            <ul>
              <li>
                {t(
                  'ANSLIFE hỗ trợ xây dựng và vận hành kế hoạch xuất hàng định kỳ cho buyer quốc tế thông qua mạng lưới nhà máy, kho trung chuyển và Supply Hub tại Việt Nam.',
                )}
              </li>
              <li>
                {t(
                  'Thay vì tổ chức từng lô hàng riêng lẻ, ANSLIFE giúp buyer thiết lập lịch xuất hàng ổn định theo tuần, hai tuần, tháng hoặc theo kế hoạch cung ứng riêng của từng dự án.',
                )}
              </li>
              <li>
                {t(
                  'Giải pháp này giúp duy trì nguồn cung liên tục, giảm áp lực tồn kho tại điểm đến và tăng khả năng kiểm soát toàn bộ chuỗi cung ứng.',
                )}
              </li>
            </ul>
          </figcaption>
        </figure>
      )}
      {isSupplyHubWeeklyShipmentArrangementPage && (
        <section className="supply-hub-weekly-shipment-content">
          <section className="supply-hub-weekly-goals" aria-labelledby="weekly-goals-title">
            <h2 id="weekly-goals-title">
              <span>1.</span> {t('Mục tiêu của điều phối xuất hàng định kỳ')}
            </h2>
            <div className="supply-hub-weekly-goal-grid">
              {supplyHubWeeklyShipmentGoals.map((goal, index) => (
                <article key={goal} className="supply-hub-weekly-goal-item">
                  <img
                    className="supply-hub-weekly-image-placeholder"
                    src={supplyHubWeeklyShipmentGoalImages[index]}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{t(goal)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="supply-hub-weekly-models" aria-labelledby="weekly-models-title">
            <h2 id="weekly-models-title">
              <span>2.</span> {t('Các mô hình xuất hàng định kỳ')}
            </h2>
            <div className="supply-hub-weekly-model-grid">
              {supplyHubWeeklyShipmentModels.map((model, index) => (
                <article key={model.title} className="supply-hub-weekly-model-card">
                  <div className="supply-hub-weekly-model-image-placeholder" aria-hidden="true">
                    <img
                      src={supplyHubWeeklyShipmentModelImages[index]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="supply-hub-weekly-model-copy">
                    <h3>{t(model.title)}</h3>
                    <p>{t('Phù hợp với:')}</p>
                    <ul>
                      {model.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <div className="supply-hub-weekly-detail-grid">
            <section className="supply-hub-weekly-support" aria-labelledby="weekly-support-title">
              <h2 id="weekly-support-title">
                <span>3.</span> {t('ANSLIFE hỗ trợ những gì')}
              </h2>
              <div className="supply-hub-weekly-support-grid">
                {supplyHubWeeklyShipmentSupportBlocks.map((block, index) => (
                  <article key={block.title} className="supply-hub-weekly-support-card">
                    <img
                      className="supply-hub-weekly-support-image-placeholder"
                      src={supplyHubWeeklyShipmentSupportImages[index]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <h3>{t(block.title)}</h3>
                    <ul>
                      {block.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>
            <div className="supply-hub-weekly-middle-stack">
              <section className="supply-hub-weekly-buffer" aria-labelledby="weekly-buffer-title">
                <h2 id="weekly-buffer-title">
                  <span>4.</span> {t('Kết hợp với tồn kho đệm tại Việt Nam')}
                </h2>
                <p>
                  {t(
                    'Tồn kho đệm giúp duy trì lượng hàng sẵn có tại Việt Nam, sẵn sàng đáp ứng các lô xuất hàng theo lịch. ANSLIFE quản lý tồn kho hiệu quả để đảm bảo nguồn hàng luôn sẵn sàng theo kế hoạch.',
                  )}
                </p>
                <div className="supply-hub-weekly-buffer-grid">
                  {supplyHubWeeklyShipmentBufferBenefits.map((benefit, index) => (
                    <article key={benefit} className="supply-hub-weekly-buffer-item">
                      <img
                        className="supply-hub-weekly-small-image-placeholder"
                        src={supplyHubWeeklyShipmentBufferImages[index]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span>{t(benefit)}</span>
                    </article>
                  ))}
                </div>
              </section>
              <section className="supply-hub-weekly-pre-export" aria-labelledby="weekly-pre-export-title">
                <h2 id="weekly-pre-export-title">
                  <span>5.</span> {t('Kiểm soát trước khi xuất hàng')}
                </h2>
                <div className="supply-hub-weekly-check-grid">
                  {supplyHubWeeklyShipmentPreExportChecks.map((check, index) => (
                    <article key={check} className="supply-hub-weekly-check-item">
                      <img
                        className="supply-hub-weekly-check-image-placeholder"
                        src={supplyHubWeeklyShipmentCheckImages[index]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span>{t(check)}</span>
                    </article>
                  ))}
                </div>
              </section>
            </div>
            <section className="supply-hub-weekly-audiences" aria-labelledby="weekly-audiences-title">
              <h2 id="weekly-audiences-title">
                <span>6.</span> {t('Các đối tượng phù hợp')}
              </h2>
              <div className="supply-hub-weekly-audience-grid">
                {supplyHubWeeklyShipmentAudiences.map((audience, index) => (
                  <article key={audience.title} className="supply-hub-weekly-audience-card">
                    <img
                      className="supply-hub-weekly-audience-image-placeholder"
                      src={supplyHubWeeklyShipmentAudienceImages[index]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h3>{t(audience.title)}</h3>
                      <p>{t(audience.description)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <div className="supply-hub-weekly-closing-grid">
            <section className="supply-hub-weekly-process" aria-labelledby="weekly-process-title">
              <h2 id="weekly-process-title">
                <span>7.</span> {t('Quy trình triển khai')}
              </h2>
              <div className="supply-hub-weekly-process-steps">
                {supplyHubWeeklyShipmentProcessSteps.map((step, index) => (
                  <article key={step} className="supply-hub-weekly-process-step">
                    <img
                      className="supply-hub-weekly-process-image-placeholder"
                      src={supplyHubWeeklyShipmentProcessImages[index]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{t(step)}</span>
                  </article>
                ))}
              </div>
            </section>
            <section className="supply-hub-weekly-buyer-inputs" aria-labelledby="weekly-buyer-inputs-title">
              <h2 id="weekly-buyer-inputs-title">
                <span>8.</span> {t('Buyer cần cung cấp')}
              </h2>
              <ul>
                {supplyHubWeeklyShipmentBuyerInputs.map((input) => (
                  <li key={input}>{t(input)}</li>
                ))}
              </ul>
            </section>
            <section className="supply-hub-weekly-cta" aria-labelledby="weekly-cta-title">
              <div className="supply-hub-weekly-cta-copy">
                <h2 id="weekly-cta-title">{t('Thiết lập kế hoạch xuất hàng định kỳ tại Việt Nam')}</h2>
                <p>
                  {t(
                    'ANSLIFE hỗ trợ xây dựng mô hình cung ứng ổn định thông qua tồn kho đệm, gom hàng, điều phối logistics và xuất hàng theo lịch trình phù hợp với từng buyer.',
                  )}
                </p>
              </div>
              <img
                className="supply-hub-weekly-cta-image-placeholder"
                src={`${weeklyShipmentAssetBase}/cta.webp`}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="supply-hub-weekly-cta-actions">
                <a className="supply-hub-weekly-cta-primary" href="/contact/supply-hub-inquiry">
                  <span aria-hidden="true">↗</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a className="supply-hub-weekly-cta-secondary" href="/contact">
                  <span aria-hidden="true">☏</span>
                  {t('Trao đổi với ANSLIFE')}
                </a>
              </div>
            </section>
          </div>
        </section>
      )}
      {isSupplyHubLclFclConsolidationPage && (
        <section className="supply-hub-lcl-fcl-content" aria-label={t('So sánh LCL và FCL')}>
          <div className="supply-hub-lcl-fcl-grid">
            {supplyHubLclFclComparisonCards.map((card) => (
              <article key={card.title} className="supply-hub-lcl-fcl-card">
                <h2>
                  {t(card.title)} <span>({t(card.subtitle)})</span>
                </h2>
                <div className="supply-hub-lcl-fcl-card-body">
                  <img
                    className="supply-hub-lcl-fcl-image"
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="supply-hub-lcl-fcl-columns">
                    {card.columns.map((column) => (
                      <section key={column.title} className="supply-hub-lcl-fcl-column">
                        <h3>{t(column.title)}</h3>
                        <ul>
                          {column.items.map((item) => (
                            <li key={item}>{t(item)}</li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="supply-hub-lcl-fcl-operation-grid">
            {supplyHubLclFclOperationBlocks.map((block) => (
              <article
                key={block.title}
                className={`supply-hub-lcl-fcl-operation-card supply-hub-lcl-fcl-operation-card--${block.variant}`}
              >
                <h2>
                  <span>{block.number}</span> {t(block.title)}
                </h2>
                {block.description && <p className="supply-hub-lcl-fcl-operation-lead">{t(block.description)}</p>}
                {block.categories && (
                  <div className="supply-hub-lcl-fcl-category-grid">
                    {block.categories.map(([category, image]) => (
                      <div key={category} className="supply-hub-lcl-fcl-category-item">
                        <img
                          className="supply-hub-lcl-fcl-small-image"
                          src={image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                        <span>{t(category)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {block.checklist && (
                  <ul className="supply-hub-lcl-fcl-checklist">
                    {block.checklist.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✓</span>
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                )}
                {block.features && (
                  <div className="supply-hub-lcl-fcl-feature-grid">
                    {block.features.map(([feature, image]) => (
                      <div key={feature} className="supply-hub-lcl-fcl-feature-item">
                        <img
                          className="supply-hub-lcl-fcl-feature-image"
                          src={image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                        <span>{t(feature)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {block.steps && (
                  <ol className="supply-hub-lcl-fcl-buyer-list">
                    {block.steps.map((step, index) => (
                      <li key={step}>
                        <span>{index + 1}</span>
                        <p>{t(step)}</p>
                      </li>
                    ))}
                  </ol>
                )}
                {block.image && block.variant !== 'supply-hub' && block.variant !== 'buyer-input' && (
                  <img
                    className="supply-hub-lcl-fcl-large-image"
                    src={block.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {block.footer && <p className="supply-hub-lcl-fcl-operation-footer">{t(block.footer)}</p>}
              </article>
            ))}
          </div>
          <section className="supply-hub-lcl-fcl-cta" aria-labelledby="lcl-fcl-cta-title">
            <img
              className="supply-hub-lcl-fcl-cta-image"
              src="/assets/supply-hub/lcl-fcl-consolidation/cta-handshake.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="supply-hub-lcl-fcl-cta-copy">
              <h2 id="lcl-fcl-cta-title">{t('Cần gom hàng từ nhiều nhà máy tại Việt Nam?')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ tiếp nhận, lưu kho, kiểm tra, gom hàng và điều phối xuất khẩu theo hình thức LCL hoặc FCL phù hợp với kế hoạch cung ứng của từng buyer.',
                )}
              </p>
            </div>
            <div className="supply-hub-lcl-fcl-cta-actions">
              <a className="supply-hub-lcl-fcl-cta-primary" href="/contact/supply-hub-inquiry">
                {t('Gửi yêu cầu')}
              </a>
              <a className="supply-hub-lcl-fcl-cta-secondary" href="/contact">
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
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
