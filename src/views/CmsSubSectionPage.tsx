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
  const isQualityControlOverviewPage =
    config.slug === 'quality-control' && section.id === 'overview' && !detailSlug;
  const isQualityControlQcProcessPage =
    config.slug === 'quality-control' && section.id === 'qc-process' && !detailSlug;
  const isQualityControlMaterialInspectionPage =
    config.slug === 'quality-control' && section.id === 'material-inspection' && !detailSlug;
  const shouldRenderBlankScholarshipPage =
    config.slug === 'about-anslife' && section.id === 'scholarship-community';
  const shouldRenderBlankQualityInProcessPage =
    config.slug === 'quality-control' && section.id === 'in-process-inspection';
  const isQualityControlFinalInspectionPage =
    config.slug === 'quality-control' && section.id === 'final-inspection' && !detailSlug;
  const isQualityControlApprovedSampleControlPage =
    config.slug === 'quality-control' && section.id === 'approved-sample-control' && !detailSlug;
  const isQualityControlMoistureControlPage =
    config.slug === 'quality-control' && section.id === 'moisture-control' && !detailSlug;
  const isQualityControlPackingStandardPage =
    config.slug === 'quality-control' && section.id === 'packing-standard' && !detailSlug;
  const isQualityControlInspectionReportPage =
    config.slug === 'quality-control' && section.id === 'inspection-report' && !detailSlug;
  const isResourcesManufacturingNotesPage =
    config.slug === 'resources' && section.id === 'manufacturing-notes' && !detailSlug;
  const isResourcesExportKnowledgePage =
    config.slug === 'resources' && section.id === 'export-knowledge' && !detailSlug;
  const isResourcesCaseStudiesPage =
    config.slug === 'resources' && section.id === 'case-studies' && !detailSlug;
  const isResourcesCompanyUpdatesPage =
    config.slug === 'resources' && section.id === 'company-updates' && !detailSlug;
  const shouldRenderBlankSubSectionPage =
    shouldRenderBlankScholarshipPage ||
    shouldRenderBlankQualityInProcessPage ||
    isQualityControlFinalInspectionPage ||
    isQualityControlApprovedSampleControlPage ||
    isQualityControlMoistureControlPage ||
    isQualityControlPackingStandardPage ||
    isQualityControlInspectionReportPage ||
    isResourcesManufacturingNotesPage ||
    isResourcesExportKnowledgePage ||
    isResourcesCaseStudiesPage ||
    isResourcesCompanyUpdatesPage ||
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
    isQualityControlOverviewPage ||
    isQualityControlQcProcessPage ||
    isQualityControlMaterialInspectionPage;
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
    isResourcesManufacturingNotesPage ||
    isResourcesExportKnowledgePage ||
    isResourcesCaseStudiesPage ||
    isResourcesCompanyUpdatesPage ||
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
  const shouldShowQualityControlOverviewBanner = isQualityControlOverviewPage;
  const shouldShowQualityControlQcProcessBanner = isQualityControlQcProcessPage;
  const shouldShowQualityControlMaterialInspectionBanner = isQualityControlMaterialInspectionPage;
  const shouldShowQualityControlInProcessInspectionBanner = shouldRenderBlankQualityInProcessPage;
  const shouldShowQualityControlFinalInspectionBanner = isQualityControlFinalInspectionPage;
  const shouldShowQualityControlApprovedSampleControlBanner = isQualityControlApprovedSampleControlPage;
  const shouldShowQualityControlMoistureControlBanner = isQualityControlMoistureControlPage;
  const shouldShowQualityControlPackingStandardBanner = isQualityControlPackingStandardPage;
  const shouldShowQualityControlInspectionReportBanner = isQualityControlInspectionReportPage;
  const shouldShowResourcesManufacturingNotesBanner = isResourcesManufacturingNotesPage;
  const shouldShowResourcesExportKnowledgeBanner = isResourcesExportKnowledgePage;
  const shouldShowResourcesCaseStudiesBanner = isResourcesCaseStudiesPage;
  const shouldShowResourcesCompanyUpdatesBanner = isResourcesCompanyUpdatesPage;
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
      {shouldShowResourcesManufacturingNotesBanner && (
        <figure className="resources-manufacturing-notes-banner">
          <img
            src="/assets/resources-manufacturing-notes-banner.png"
            alt={t('Banner ghi chú sản xuất')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="resources-manufacturing-notes-banner-copy">
            <h1>{t('Ghi chú sản xuất')}</h1>
            <p>
              {t(
                'Kinh nghiệm thực tế từ vật liệu, sản xuất, hoàn thiện và kiểm soát chất lượng trong ngành nội thất xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'Ghi chú sản xuất là thư viện tổng hợp các quan sát, kinh nghiệm và bài học thực tế từ quá trình phát triển sản phẩm, sản xuất, hoàn thiện bề mặt, kiểm soát chất lượng và xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'Nội dung được xây dựng nhằm hỗ trợ buyer, đối tác và đội ngũ sản xuất hiểu rõ hơn về các yếu tố ảnh hưởng đến chất lượng, tiến độ và tính ổn định của sản phẩm nội thất.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowResourcesExportKnowledgeBanner && (
        <figure className="resources-export-knowledge-banner">
          <img
            src="/assets/resources-export-knowledge-banner.png"
            alt={t('Banner kiến thức xuất khẩu')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="resources-export-knowledge-banner-copy">
            <h1>{t('Kiến thức xuất khẩu')}</h1>
            <p>
              {t(
                'Thông tin và kinh nghiệm thực tế về sản xuất, logistics và xuất khẩu nội thất từ Việt Nam.',
              )}
            </p>
            <p>
              {t(
                'Thư viện Kiến thức xuất khẩu được xây dựng nhằm chia sẻ các thông tin hữu ích liên quan đến sản xuất, chuỗi cung ứng, logistics, kiểm soát chất lượng và hoạt động xuất khẩu nội thất từ Việt Nam.',
              )}
            </p>
            <p>
              {t(
                'Nội dung được tổng hợp từ kinh nghiệm thực tế của ANSLIFE trong quá trình làm việc với buyer, nhà máy và các dự án xuất khẩu quốc tế.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowResourcesCaseStudiesBanner && (
        <figure className="resources-case-studies-banner">
          <img
            src="/assets/resources-case-studies-banner.png"
            alt={t('Banner case study')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="resources-case-studies-banner-copy">
            <h1>{t('Case Study')}</h1>
            <p>
              {t(
                'Những dự án, sản phẩm và giải pháp đã được triển khai trong thực tế.',
              )}
            </p>
            <p>
              {t(
                'Case Study là thư viện tổng hợp các dự án, sản phẩm và hoạt động vận hành thực tế mà ANSLIFE đã tham gia hoặc hỗ trợ triển khai.',
              )}
            </p>
            <p>
              {t(
                'Mỗi Case Study tập trung vào bài toán của khách hàng, cách tiếp cận, giải pháp thực hiện và kết quả đạt được nhằm giúp buyer và đối tác hiểu rõ hơn về năng lực triển khai của ANSLIFE.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowResourcesCompanyUpdatesBanner && (
        <figure className="resources-company-updates-banner">
          <img
            src="/assets/resources-company-updates-banner.png"
            alt={t('Banner cập nhật công ty')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="resources-company-updates-banner-copy">
            <h1>{t('Cập nhật công ty')}</h1>
            <p>{t('Những hoạt động, dự án và cột mốc mới nhất của ANSLIFE.')}</p>
            <p>
              {t(
                'Trang Cập nhật công ty chia sẻ những thông tin mới nhất về hoạt động của ANSLIFE, bao gồm phát triển năng lực sản xuất, hợp tác đối tác, triển khai dự án, tham gia triển lãm, hoạt động cộng đồng và các cột mốc quan trọng trong quá trình phát triển.',
              )}
            </p>
            <p>
              {t(
                'Đây là nơi giúp buyer, đối tác và cộng đồng theo dõi hành trình phát triển của ANSLIFE tại Việt Nam và trên thị trường quốc tế.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isResourcesCompanyUpdatesPage && (
        <section className="resources-company-updates-content">
          <section className="resources-company-updates-categories">
            <div className="resources-company-updates-category-grid">
              {[
                {
                  number: '01',
                  title: 'Tin tức công ty',
                  imageSrc: '/assets/resources/company-updates/categories/company-news.webp',
                },
                {
                  number: '02',
                  title: 'Dự án & hợp tác',
                  imageSrc:
                    '/assets/resources/company-updates/categories/projects-partnerships.webp',
                },
                {
                  number: '03',
                  title: 'Nhà máy & sản xuất',
                  imageSrc: '/assets/resources/company-updates/categories/factory-production.webp',
                },
                {
                  number: '04',
                  title: 'Triển lãm & sự kiện',
                  imageSrc: '/assets/resources/company-updates/categories/exhibitions-events.webp',
                },
                {
                  number: '05',
                  title: 'Chất lượng & chứng nhận',
                  imageSrc:
                    '/assets/resources/company-updates/categories/quality-certifications.webp',
                },
                {
                  number: '06',
                  title: 'Hoạt động cộng đồng',
                  imageSrc: '/assets/resources/company-updates/categories/community.webp',
                },
              ].map((item) => (
                <article key={item.number}>
                  <div className="resources-company-updates-category-icon" aria-hidden="true">
                    <img src={item.imageSrc} alt="" loading="lazy" decoding="async" />
                  </div>
                  <h2>
                    <span>{item.number}</span>
                    {t(item.title)}
                  </h2>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-company-updates-featured">
            <h2>{t('Các cập nhật nổi bật')}</h2>
            <div className="resources-company-updates-featured-grid">
              {[
                {
                  tag: 'Năng lực',
                  title: 'ANSLIFE mở rộng mạng lưới nhà máy đối tác',
                  body: 'Tăng cường năng lực sản xuất và khả năng đáp ứng cho các dự án nội thất xuất khẩu quy mô lớn.',
                  date: '20/05/2025',
                  imageSrc: '/assets/resources/company-updates/featured/capability.webp',
                },
                {
                  tag: 'Supply Hub',
                  title: 'Khởi động chương trình Supply Hub Việt Nam',
                  body: 'Mô hình hỗ trợ lưu kho, tồn kho đệm và điều phối xuất hàng linh hoạt cho buyer quốc tế.',
                  date: '10/05/2025',
                  imageSrc: '/assets/resources/company-updates/featured/supply-hub.webp',
                },
                {
                  tag: 'Chất lượng',
                  title: 'Phát triển hệ thống quản lý mẫu duyệt',
                  body: 'Tối ưu hóa việc lưu trữ, đối chiếu và quản lý mẫu duyệt nhằm nâng cao khả năng kiểm soát chất lượng.',
                  date: '02/05/2025',
                  imageSrc: '/assets/resources/company-updates/featured/quality.webp',
                },
                {
                  tag: 'Sự kiện',
                  title: 'Tham gia VIFA Expo 2025',
                  body: 'Giới thiệu năng lực sản xuất, giải pháp cung ứng và mô hình Supply Hub Việt Nam đến khách hàng quốc tế.',
                  date: '08/03/2025',
                  imageSrc: '/assets/resources/company-updates/featured/event.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="resources-company-updates-featured-image-slot">
                    <img src={item.imageSrc} alt="" loading="lazy" decoding="async" />
                    <span>{t(item.tag)}</span>
                  </div>
                  <div className="resources-company-updates-featured-copy">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                    <time dateTime={item.date.split('/').reverse().join('-')}>{item.date}</time>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-company-updates-timeline">
            <h2>{t('Dòng thời gian phát triển')}</h2>
            <div className="resources-company-updates-timeline-track">
              {[
                {
                  year: '2024',
                  items: [
                    {
                      text: 'Mở rộng mạng lưới nhà máy hợp tác',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2024-factory-network.webp',
                    },
                    {
                      text: 'Hoàn thiện vai trò vận hành dự án xuất khẩu',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2024-export-operations.webp',
                    },
                    {
                      text: 'Củng cố chuỗi cung ứng vật liệu nội thất',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2024-material-supply-chain.webp',
                    },
                  ],
                },
                {
                  year: '2025',
                  items: [
                    {
                      text: 'Chuyển trụ sở chính về Thành phố Hồ Chí Minh',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2025-hcm-head-office.webp',
                    },
                    {
                      text: 'Mở thêm chi nhánh hoạt động tại Đồng Nai',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2025-dong-nai-branch.webp',
                    },
                    {
                      text: 'Khởi động Supply Hub Việt Nam',
                      imageSrc: '/assets/resources/company-updates/timeline/2025-supply-hub.webp',
                    },
                    {
                      text: 'Mở rộng hệ thống nhà máy vệ tinh',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2025-satellite-factories.webp',
                    },
                  ],
                },
                {
                  year: '2026',
                  items: [
                    {
                      text: 'Xây dựng khu vực kiểm định chất lượng độc lập',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2026-independent-quality-testing.webp',
                    },
                    {
                      text: 'Nâng cấp hệ thống QC & truy xuất',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2026-qc-traceability.webp',
                    },
                    {
                      text: 'Mở rộng năng lực lưu kho và kho đệm',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2026-warehousing-buffer-stock.webp',
                    },
                    {
                      text: 'Kiểm định tiêu chuẩn cơ học cho nội thất',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2026-mechanical-standards.webp',
                    },
                  ],
                },
                {
                  year: '2027',
                  items: [
                    {
                      text: 'Triển khai hệ thống quản lý số',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2027-digital-management.webp',
                    },
                    {
                      text: 'Tăng gấp đôi năng lực sản xuất',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2027-production-capacity.webp',
                    },
                    {
                      text: 'Mở rộng hợp tác toàn cầu',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2027-global-partnerships.webp',
                    },
                    {
                      text: 'Phát triển chương trình bền vững',
                      imageSrc:
                        '/assets/resources/company-updates/timeline/2027-sustainability.webp',
                    },
                  ],
                },
              ].map((group) => (
                <article className="resources-company-updates-timeline-year" key={group.year}>
                  <h3>{group.year}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.text}>
                        <span className="resources-company-updates-timeline-icon" aria-hidden="true">
                          <img src={item.imageSrc} alt="" loading="lazy" decoding="async" />
                        </span>
                        <span>{t(item.text)}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-company-updates-follow">
            <h2>{t('Theo dõi ANSLIFE')}</h2>
            <div className="resources-company-updates-follow-grid">
              {[
                {
                  title: 'Buyer & đối tác',
                  body: 'Cập nhật năng lực mới nhất, dự án và các giải pháp cung ứng từ ANSLIFE.',
                  imageSrc: '/assets/resources/company-updates/follow/buyers-partners.webp',
                },
                {
                  title: 'Nhà máy đối tác',
                  body: 'Theo dõi các chương trình hợp tác, kế hoạch sản xuất và phát triển chuỗi cung ứng.',
                  imageSrc: '/assets/resources/company-updates/follow/partner-factories.webp',
                },
                {
                  title: 'Cộng đồng',
                  body: 'Theo dõi các hoạt động xã hội, đào tạo nghề và chương trình phát triển nguồn nhân lực.',
                  imageSrc: '/assets/resources/company-updates/follow/community.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="resources-company-updates-follow-image-slot">
                    <img src={item.imageSrc} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="resources-company-updates-follow-copy">
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                    <span aria-hidden="true">→</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-company-updates-cta">
            <div className="resources-company-updates-cta-image-slot">
              <img
                src="/assets/resources/company-updates/cta/latest-updates.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="resources-company-updates-cta-copy">
              <h2>{t('Theo dõi những cập nhật mới nhất từ ANSLIFE')}</h2>
              <p>
                {t(
                  'Khám phá các hoạt động, dự án, sự kiện và cột mốc phát triển mới nhất của ANSLIFE.',
                )}
              </p>
              <div className="resources-company-updates-cta-actions">
                <a href="/vn/resources/company-updates">{t('Xem tất cả cập nhật')} →</a>
                <a href="/vn/contact">{t('Đăng ký nhận tin')} →</a>
                <a href="/vn/contact">{t('Liên hệ ANSLIFE')} →</a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isResourcesCaseStudiesPage && (
        <section className="resources-case-studies-content">
          <section className="resources-case-studies-groups">
            <h2>{t('Các nhóm Case Study')}</h2>
            <div className="resources-case-studies-group-grid">
              {[
                {
                  number: '01',
                  title: 'Phát triển sản phẩm OEM / ODM',
                  imageSrc: '/assets/resources/case-studies/group-oem-odm.webp',
                  body: 'Các dự án phát triển sản phẩm từ ý tưởng, bản vẽ hoặc mẫu tham chiếu đến sản xuất hàng loạt.',
                  items: [
                    'Phát triển bộ sưu tập ghế cho thị trường Nhật Bản',
                    'Chuyển đổi thiết kế từ concept sang sản xuất',
                    'Tối ưu cấu kiện để giảm chi phí sản xuất',
                  ],
                },
                {
                  number: '02',
                  title: 'Dự án nội thất hoàn thiện',
                  imageSrc: '/assets/resources/case-studies/group-finished-furniture.webp',
                  body: 'Các dự án sản xuất và cung ứng nội thất hoàn thiện cho buyer quốc tế.',
                  items: [
                    'Ghế xuất khẩu cho thị trường Mỹ',
                    'Bộ bàn ăn cho thị trường EU',
                    'Nội thất phòng ngủ cho chuỗi bán lẻ',
                  ],
                },
                {
                  number: '03',
                  title: 'Dự án khách sạn, resort và nhà hàng',
                  imageSrc: '/assets/resources/case-studies/group-hospitality.webp',
                  body: 'Các dự án nội thất tùy chỉnh theo yêu cầu riêng của công trình.',
                  items: [
                    'Resort ven biển',
                    'Khách sạn boutique',
                    'Chuỗi nhà hàng quốc tế',
                    'Văn phòng và không gian làm việc',
                  ],
                },
                {
                  number: '04',
                  title: 'Giải pháp chuỗi cung ứng',
                  imageSrc: '/assets/resources/case-studies/group-supply-chain.webp',
                  body: 'Các dự án liên quan đến điều phối nhà máy, vật liệu, logistics và xuất khẩu.',
                  items: [
                    'Quản lý nhiều nhà máy cho một dự án',
                    'Gom hàng từ nhiều nguồn cung',
                    'Tổ chức xuất hàng định kỳ',
                  ],
                },
                {
                  number: '05',
                  title: 'Supply Hub Việt Nam',
                  imageSrc: '/assets/resources/case-studies/group-supply-hub.webp',
                  body: 'Các mô hình lưu kho, tồn kho đệm và điều phối cung ứng tại Việt Nam.',
                  items: [
                    'Kho đệm cho buyer Nhật Bản',
                    'Gom hàng LCL từ nhiều nhà máy',
                    'Quản lý vật liệu cho dự án dài hạn',
                  ],
                },
                {
                  number: '06',
                  title: 'Chất lượng & QC',
                  imageSrc: '/assets/resources/case-studies/group-quality-qc.webp',
                  body: 'Các tình huống kiểm soát chất lượng và giải quyết rủi ro trong dự án.',
                  items: [
                    'Khắc phục sai lệch màu sắc',
                    'Kiểm soát chất lượng đa nhà máy',
                    'QC độc lập trước xuất hàng',
                    'Chuẩn hóa mẫu duyệt cho đơn hàng lặp lại',
                  ],
                },
              ].map((item) => (
                <article key={item.number}>
                  <div className="resources-case-studies-group-image-slot">
                    <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                  </div>
                  <h3>
                    <span>{item.number}</span>
                    {t(item.title)}
                  </h3>
                  <p>{t(item.body)}</p>
                  <ul>
                    {item.items.map((note) => (
                      <li key={note}>{t(note)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-case-studies-structure">
            <h2>{t('Cấu trúc một Case Study')}</h2>
            <div className="resources-case-studies-structure-flow">
              {[
                {
                  number: '01',
                  title: 'Bối cảnh',
                  imageSrc: '/assets/resources/case-studies/structure-context.webp',
                  body: 'Khách hàng đang gặp vấn đề gì?',
                },
                {
                  number: '02',
                  title: 'Mục tiêu',
                  imageSrc: '/assets/resources/case-studies/structure-objective.webp',
                  body: 'Kết quả mong muốn là gì?',
                },
                {
                  number: '03',
                  title: 'Thách thức',
                  imageSrc: '/assets/resources/case-studies/structure-challenge.webp',
                  body: 'Những khó khăn hoặc rủi ro chính.',
                },
                {
                  number: '04',
                  title: 'Giải pháp',
                  imageSrc: '/assets/resources/case-studies/structure-solution.webp',
                  body: 'ANSLIFE đã triển khai những gì.',
                },
                {
                  number: '05',
                  title: 'Kết quả',
                  imageSrc: '/assets/resources/case-studies/structure-result.webp',
                  body: 'Những thay đổi hoặc kết quả đạt được.',
                },
                {
                  number: '06',
                  title: 'Bài học kinh nghiệm',
                  imageSrc: '/assets/resources/case-studies/structure-lessons.webp',
                  body: 'Những ghi nhận có giá trị cho các dự án tương tự.',
                },
              ].map((item, index) => (
                <div className="resources-case-studies-structure-step-wrap" key={item.number}>
                  <article>
                    <div className="resources-case-studies-structure-head">
                      <div className="resources-case-studies-structure-icon">
                        <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                      </div>
                      <h3>
                        <span>{item.number}</span>
                        {t(item.title)}
                      </h3>
                    </div>
                    <p>{t(item.body)}</p>
                  </article>
                  {index < 5 && (
                    <span className="resources-case-studies-structure-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="resources-case-studies-featured">
            <h2>{t('Case Study nổi bật')}</h2>
            <div className="resources-case-studies-featured-grid">
              {[
                {
                  label: 'OEM / ODM',
                  title: 'Phát triển bộ sưu tập ghế cho thị trường Nhật Bản',
                  imageSrc: '/assets/resources/case-studies/featured-chair-japan.webp',
                  body: 'Từ bản vẽ đến sản xuất hàng loạt với tiêu chuẩn hoàn thiện và QC riêng.',
                },
                {
                  label: 'Supply Chain',
                  title: 'Tối ưu chuỗi cung ứng cho dự án đa nhà máy',
                  imageSrc: '/assets/resources/case-studies/featured-multi-factory-supply-chain.webp',
                  body: 'Điều phối vật liệu, cấu kiện và giao hàng từ nhiều nguồn cung.',
                },
                {
                  label: 'Supply Hub',
                  title: 'Xây dựng tồn kho đệm tại Việt Nam',
                  imageSrc: '/assets/resources/case-studies/featured-buffer-inventory-vietnam.webp',
                  body: 'Giảm thời gian giao hàng và tăng khả năng đáp ứng cho buyer.',
                },
                {
                  label: 'Quality Control',
                  title: 'Chuẩn hóa mẫu duyệt cho đơn hàng dài hạn',
                  imageSrc: '/assets/resources/case-studies/featured-approved-sample-long-term.webp',
                  body: 'Duy trì tính nhất quán giữa các lô hàng trong nhiều năm.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="resources-case-studies-featured-image-slot">
                    <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                    <span>{t(item.label)}</span>
                  </div>
                  <div className="resources-case-studies-featured-copy">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-case-studies-value">
            <h2>{t('Giá trị từ Case Study')}</h2>
            <div className="resources-case-studies-value-grid">
              {[
                {
                  title: 'Thực tế',
                  imageSrc: '/assets/resources/case-studies/value-practical.webp',
                  body: 'Dựa trên các dự án đã triển khai.',
                },
                {
                  title: 'Minh bạch',
                  imageSrc: '/assets/resources/case-studies/value-transparent.webp',
                  body: 'Cho thấy cách ANSLIFE xử lý vấn đề.',
                },
                {
                  title: 'Kinh nghiệm',
                  imageSrc: '/assets/resources/case-studies/value-experience.webp',
                  body: 'Chia sẻ bài học từ thực tiễn.',
                },
                {
                  title: 'Tham khảo',
                  imageSrc: '/assets/resources/case-studies/value-reference.webp',
                  body: 'Giúp buyer hình dung phương án triển khai cho dự án của mình.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="resources-case-studies-value-icon">
                    <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-case-studies-cta">
            <div className="resources-case-studies-cta-image-slot">
              <img
                src="/assets/resources/case-studies/cta-real-projects.webp"
                alt={t('Tìm hiểu các dự án thực tế cùng ANSLIFE')}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="resources-case-studies-cta-copy">
              <h2>{t('Tìm hiểu các dự án thực tế cùng ANSLIFE')}</h2>
              <p>
                {t(
                  'Khám phá các dự án, giải pháp và bài học thực tiễn từ hoạt động sản xuất, chuỗi cung ứng và xuất khẩu nội thất tại Việt Nam.',
                )}
              </p>
              <div className="resources-case-studies-cta-actions">
                <a className="is-primary" href="/vn/resources/case-studies">
                  {t('Xem Case Study mới nhất')} →
                </a>
                <a href="/vn/contact">{t('Gửi yêu cầu dự án')} →</a>
                <a href="/vn/contact">{t('Liên hệ ANSLIFE')} →</a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isResourcesExportKnowledgePage && (
        <section className="resources-export-knowledge-content">
          <section className="resources-export-knowledge-categories">
            <h2>{t('Các chuyên mục chính')}</h2>
            <div className="resources-export-knowledge-category-grid">
              {[
                {
                  number: '01',
                  title: 'Bắt đầu sản xuất tại Việt Nam',
                  imageSrc: '/assets/resources/export-knowledge/category-start-production.webp',
                  body: 'Những thông tin cơ bản dành cho buyer hoặc doanh nghiệp đang tìm hiểu khả năng sản xuất tại Việt Nam.',
                  items: [
                    'Làm thế nào để bắt đầu tìm nhà máy tại Việt Nam',
                    'OEM và ODM khác nhau như thế nào',
                    'Những thông tin cần chuẩn bị trước khi gửi RFQ',
                    'Các yếu tố ảnh hưởng đến giá thành sản phẩm',
                  ],
                },
                {
                  number: '02',
                  title: 'Chuỗi cung ứng & sản xuất',
                  imageSrc: '/assets/resources/export-knowledge/category-supply-chain.webp',
                  body: 'Các chủ đề liên quan đến năng lực sản xuất, vật liệu, nhà máy và tổ chức chuỗi cung ứng.',
                  items: [
                    'Đánh giá năng lực nhà máy như thế nào',
                    'Khi nào nên sử dụng nhiều nhà máy cho một dự án',
                    'Các rủi ro phổ biến trong chuỗi cung ứng nội thất',
                    'Tối ưu hóa sản lượng và kế hoạch giao hàng',
                  ],
                },
                {
                  number: '03',
                  title: 'Chất lượng & QC',
                  imageSrc: '/assets/resources/export-knowledge/category-quality-qc.webp',
                  body: 'Kiến thức liên quan đến kiểm soát chất lượng trong sản xuất và xuất khẩu.',
                  items: [
                    'Kiểm tra trong sản xuất là gì',
                    'Kiểm tra cuối là gì',
                    'Vai trò của mẫu duyệt',
                    'Những lỗi phổ biến trong sản xuất nội thất',
                  ],
                },
                {
                  number: '04',
                  title: 'Logistics & xuất khẩu',
                  imageSrc: '/assets/resources/export-knowledge/category-logistics-export.webp',
                  body: 'Thông tin về vận chuyển, container, chứng từ và điều phối xuất khẩu.',
                  items: [
                    'LCL và FCL khác nhau như thế nào',
                    'Những lưu ý khi xuất khẩu nội thất',
                    'Chuẩn bị chứng từ xuất khẩu',
                    'Cách tối ưu chi phí logistics',
                  ],
                },
                {
                  number: '05',
                  title: 'Vật liệu & hoàn thiện',
                  imageSrc: '/assets/resources/export-knowledge/category-materials-finishing.webp',
                  body: 'Kiến thức về vật liệu, hoàn thiện bề mặt và các yếu tố ảnh hưởng đến chất lượng sản phẩm.',
                  items: [
                    'Các loại gỗ phổ biến trong nội thất xuất khẩu',
                    'Stain và sơn màu khác nhau như thế nào',
                    'Kiểm soát độ ẩm vật liệu',
                    'Hoàn thiện bề mặt cho từng thị trường',
                  ],
                },
                {
                  number: '06',
                  title: 'Buyer Guides',
                  imageSrc: '/assets/resources/export-knowledge/category-buyer-guides.webp',
                  body: 'Các hướng dẫn dành cho buyer đang tìm kiếm đối tác sản xuất tại Việt Nam.',
                  items: [
                    'Checklist làm việc với nhà máy',
                    'Cách đánh giá nhà cung cấp',
                    'Những câu hỏi cần làm rõ trước khi đặt hàng',
                    'Quản lý dự án sản xuất từ xa',
                  ],
                },
              ].map((item) => (
                <article key={item.number}>
                  <div className="resources-export-knowledge-category-head">
                    <div className="resources-export-knowledge-category-icon">
                      <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                    </div>
                    <h3>
                      <span>{item.number}</span>
                      {t(item.title)}
                    </h3>
                  </div>
                  <p>{t(item.body)}</p>
                  <ul>
                    {item.items.map((note) => (
                      <li key={note}>{t(note)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-export-knowledge-featured">
            <h2>{t('Chủ đề nổi bật')}</h2>
            <div className="resources-export-knowledge-featured-grid">
              {[
                {
                  title: 'OEM vs ODM: Lựa chọn nào phù hợp?',
                  imageSrc: '/assets/resources/export-knowledge/featured-oem-odm.webp',
                  body: 'So sánh chi tiết giữa OEM và ODM để giúp bạn chọn mô hình phù hợp cho dự án của mình.',
                },
                {
                  title: 'Những lỗi thường gặp khi phát triển sản phẩm mới',
                  imageSrc: '/assets/resources/export-knowledge/featured-product-development-mistakes.webp',
                  body: 'Các lỗi phổ biến có thể gây sai lệch khi phát triển sản phẩm nội thất và cách hạn chế.',
                },
                {
                  title: 'Đánh giá năng lực nhà máy trước khi đặt hàng',
                  imageSrc: '/assets/resources/export-knowledge/featured-factory-capability.webp',
                  body: 'Các yếu tố quan trọng cần xem xét để lựa chọn nhà máy phù hợp và đảm bảo chất lượng.',
                },
                {
                  title: 'Vai trò của QC độc lập trong dự án xuất khẩu',
                  imageSrc: '/assets/resources/export-knowledge/featured-independent-qc.webp',
                  body: 'Tại sao QC độc lập giúp giảm rủi ro và nâng cao chất lượng sản phẩm trước khi giao hàng.',
                },
                {
                  title: 'Lưu kho và tồn kho đệm tại Việt Nam',
                  imageSrc: '/assets/resources/export-knowledge/featured-buffer-inventory.webp',
                  body: 'Lợi ích của việc lưu kho, gom hàng và tồn kho đệm trong chuỗi cung ứng quốc tế.',
                },
                {
                  title: 'Cách xây dựng chuỗi cung ứng ổn định tại Việt Nam',
                  imageSrc: '/assets/resources/export-knowledge/featured-stable-supply-chain.webp',
                  body: 'Chiến lược giúp duy trì chuỗi cung ứng ổn định, linh hoạt và hiệu quả cho dự án dài hạn.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="resources-export-knowledge-featured-image-slot">
                    <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                  </div>
                  <div className="resources-export-knowledge-featured-copy">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-export-knowledge-audience">
            <h2>{t('Đối tượng phù hợp')}</h2>
            <div className="resources-export-knowledge-audience-grid">
              {[
                {
                  title: 'Buyer quốc tế',
                  imageSrc: '/assets/resources/export-knowledge/audience-international-buyers.webp',
                  body: 'Tìm hiểu thị trường sản xuất tại Việt Nam, quy trình, chi phí và các lưu ý quan trọng khi triển khai dự án.',
                },
                {
                  title: 'Nhà nhập khẩu',
                  imageSrc: '/assets/resources/export-knowledge/audience-importers.webp',
                  body: 'Nâng cao hiểu biết về chuỗi cung ứng, logistics, chất lượng và các quy định xuất khẩu.',
                },
                {
                  title: 'Nhà máy',
                  imageSrc: '/assets/resources/export-knowledge/audience-factories.webp',
                  body: 'Tiếp cận các yêu cầu phổ biến của buyer quốc tế và nâng cao năng lực sản xuất, quản trị và chất lượng.',
                },
                {
                  title: 'Đội ngũ mua hàng',
                  imageSrc: '/assets/resources/export-knowledge/audience-purchasing-teams.webp',
                  body: 'Hỗ trợ đánh giá nhà cung cấp, quản lý dự án, kiểm soát chất lượng và tối ưu hiệu quả mua hàng.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="resources-export-knowledge-audience-icon">
                    <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-export-knowledge-cta">
            <div className="resources-export-knowledge-cta-image-slot">
              <img
                src="/assets/resources/export-knowledge/cta-library.webp"
                alt={t('Khám phá thư viện kiến thức xuất khẩu của ANSLIFE')}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="resources-export-knowledge-cta-copy">
              <h2>{t('Khám phá thư viện kiến thức xuất khẩu của ANSLIFE')}</h2>
              <p>
                {t(
                  'Tìm hiểu thêm về sản xuất, chuỗi cung ứng, chất lượng, logistics và các hoạt động xuất khẩu nội thất từ Việt Nam.',
                )}
              </p>
            </div>
            <div className="resources-export-knowledge-cta-actions">
              <a className="is-primary" href="/vn/resources/export-knowledge">
                <span className="resources-export-knowledge-cta-icon resources-export-knowledge-cta-icon--book" aria-hidden="true" />
                {t('Xem bài viết mới nhất')}
              </a>
              <a href="/vn/search">
                <span className="resources-export-knowledge-cta-icon resources-export-knowledge-cta-icon--search" aria-hidden="true" />
                {t('Tìm kiếm chủ đề')}
              </a>
              <a href="/vn/contact">
                <span className="resources-export-knowledge-cta-icon resources-export-knowledge-cta-icon--headset" aria-hidden="true" />
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {isResourcesManufacturingNotesPage && (
        <section className="resources-manufacturing-notes-content">
          <section className="resources-manufacturing-notes-categories">
            <h2>{t('Các chuyên mục ghi chú')}</h2>
            <div className="resources-manufacturing-notes-category-grid">
              {[
                {
                  number: '01',
                  title: 'Vật liệu & nguyên liệu',
                  imageSrc: '/assets/resources/manufacturing-notes/category-materials.webp',
                  body: 'Các ghi chú liên quan đến gỗ tự nhiên, gỗ kỹ thuật, veneer, vật liệu bọc nệm, mây tre và các vật liệu sử dụng trong sản xuất nội thất.',
                  items: [
                    'Sự khác biệt giữa Oak và Ash trong sản xuất ghế',
                    'Những lưu ý khi sử dụng veneer tự nhiên',
                    'Độ ẩm vật liệu ảnh hưởng như thế nào đến sản phẩm',
                    'Khi nào nên sử dụng plywood thay cho gỗ tự nhiên',
                  ],
                },
                {
                  number: '02',
                  title: 'Cấu kiện & kết cấu sản phẩm',
                  imageSrc: '/assets/resources/manufacturing-notes/category-components.webp',
                  body: 'Các ghi chú liên quan đến cấu kiện, mộng gỗ, liên kết và kết cấu sản phẩm.',
                  items: [
                    'Các loại mộng gỗ phổ biến trong nội thất xuất khẩu',
                    'Khung ghế chịu lực được thiết kế như thế nào',
                    'Những lỗi thường gặp trong lắp ráp cấu kiện',
                    'Vai trò của dung sai trong sản xuất hàng loạt',
                  ],
                },
                {
                  number: '03',
                  title: 'Sơn & hoàn thiện bề mặt',
                  imageSrc: '/assets/resources/manufacturing-notes/category-finishing.webp',
                  body: 'Kinh nghiệm về stain, màu sắc, hoàn thiện bề mặt và kiểm soát chất lượng hoàn thiện.',
                  items: [
                    'Stain và sơn màu khác nhau như thế nào',
                    'Tại sao cùng một màu nhưng hai lô hàng có thể khác nhau',
                    'Các yếu tố ảnh hưởng đến độ bóng của sản phẩm',
                    'Kiểm soát màu sắc trong sản xuất hàng loạt',
                  ],
                },
                {
                  number: '04',
                  title: 'Kiểm soát chất lượng',
                  imageSrc: '/assets/resources/manufacturing-notes/category-quality.webp',
                  body: 'Các ghi chú liên quan đến hoạt động QC và hệ thống chất lượng.',
                  items: [
                    'Các lỗi thường gặp khi kiểm tra cuối',
                    'Tại sao cần kiểm tra trong sản xuất',
                    'Vai trò của mẫu duyệt trong dự án nội thất',
                    'Những điểm buyer thường quan tâm khi đánh giá chất lượng',
                  ],
                },
                {
                  number: '05',
                  title: 'Đóng gói & logistics',
                  imageSrc: '/assets/resources/manufacturing-notes/category-packing-logistics.webp',
                  body: 'Những kinh nghiệm liên quan đến đóng gói, lưu kho và vận chuyển quốc tế.',
                  items: [
                    'Knock-down và Fully Assembled nên chọn phương án nào',
                    'Những nguyên nhân phổ biến gây hư hỏng trong vận chuyển',
                    'Lựa chọn vật liệu đóng gói phù hợp cho nội thất xuất khẩu',
                    'Lưu ý khi xếp container sản phẩm nội thất',
                  ],
                },
                {
                  number: '06',
                  title: 'Phát triển sản phẩm OEM / ODM',
                  imageSrc: '/assets/resources/manufacturing-notes/category-oem-odm.webp',
                  body: 'Những kinh nghiệm từ quá trình phát triển sản phẩm và triển khai dự án mới.',
                  items: [
                    'Từ bản vẽ đến sản xuất hàng loạt',
                    'Những câu hỏi cần làm rõ trước khi phát triển mẫu',
                    'Các yếu tố ảnh hưởng đến chi phí sản xuất',
                    'Khi nào nên lựa chọn OEM và khi nào nên lựa chọn ODM',
                  ],
                },
              ].map((item) => (
                <article key={item.number}>
                  <div className="resources-manufacturing-notes-category-image-slot">
                    <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                  </div>
                  <h3>
                    <span>{item.number}</span>
                    {t(item.title)}
                  </h3>
                  <p>{t(item.body)}</p>
                  <ul>
                    {item.items.map((note) => (
                      <li key={note}>{t(note)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-manufacturing-notes-featured">
            <h2>{t('Các chủ đề nổi bật')}</h2>
            <div className="resources-manufacturing-notes-featured-grid">
              {[
                {
                  title: 'Độ ẩm vật liệu và rủi ro cong vênh',
                  category: 'Vật liệu & nguyên liệu',
                  imageSrc: '/assets/resources/manufacturing-notes/featured-moisture-warping.webp',
                  body: 'Hiểu rõ độ ẩm vật liệu và cách kiểm soát giúp giảm thiểu cong vênh, nứt và biến dạng trong sản xuất.',
                },
                {
                  title: 'Các hệ hoàn thiện bề mặt phổ biến trong nội thất xuất khẩu',
                  category: 'Sơn & hoàn thiện bề mặt',
                  imageSrc: '/assets/resources/manufacturing-notes/featured-surface-finishing.webp',
                  body: 'Tổng hợp các hệ hoàn thiện phổ biến, ưu điểm, ứng dụng và lưu ý khi sản xuất hàng loạt.',
                },
                {
                  title: 'Những lỗi thường gặp trong đóng gói nội thất',
                  category: 'Đóng gói & logistics',
                  imageSrc: '/assets/resources/manufacturing-notes/featured-packing-issues.webp',
                  body: 'Những điểm cần được kiểm soát trong đóng gói và vận chuyển để cải thiện trạng thái giao hàng.',
                },
                {
                  title: 'Kiểm soát màu sắc giữa các lô hàng',
                  category: 'Sơn & hoàn thiện bề mặt',
                  imageSrc: '/assets/resources/manufacturing-notes/featured-color-control.webp',
                  body: 'Vì sao màu sắc giữa các lô hàng có thể khác nhau và cách kiểm soát hiệu quả.',
                },
                {
                  title: 'Vai trò của mẫu duyệt trong sản xuất hàng loạt',
                  category: 'Kiểm soát chất lượng',
                  imageSrc: '/assets/resources/manufacturing-notes/featured-approved-sample.webp',
                  body: 'Mẫu duyệt là cơ sở quan trọng để duy trì tính đồng nhất và hạn chế rủi ro.',
                },
                {
                  title: 'Tối ưu hóa cấu kiện cho sản xuất và vận chuyển',
                  category: 'Cấu kiện & kết cấu sản phẩm',
                  imageSrc: '/assets/resources/manufacturing-notes/featured-component-optimization.webp',
                  body: 'Thiết kế cấu kiện hợp lý giúp tối ưu chi phí, thời gian sản xuất và vận chuyển.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="resources-manufacturing-notes-featured-image-slot">
                    <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                  </div>
                  <div className="resources-manufacturing-notes-featured-copy">
                    <h3>{t(item.title)}</h3>
                    <span>{t(item.category)}</span>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="resources-manufacturing-notes-info-row">
            <section className="resources-manufacturing-notes-audience">
              <h2>{t('Đối tượng phù hợp')}</h2>
              <div className="resources-manufacturing-notes-audience-grid">
                {[
                {
                  title: 'Buyer',
                  imageSrc: '/assets/resources/manufacturing-notes/audience-buyer.webp',
                  body: 'Hiểu rõ hơn về vật liệu, sản xuất và kiểm soát chất lượng.',
                },
                {
                  title: 'Nhà thiết kế',
                  imageSrc: '/assets/resources/manufacturing-notes/audience-designer.webp',
                  body: 'Hiểu các yếu tố ảnh hưởng đến khả năng sản xuất.',
                },
                {
                  title: 'Nhà máy',
                  imageSrc: '/assets/resources/manufacturing-notes/audience-factory.webp',
                  body: 'Chia sẻ kinh nghiệm và bài học thực tế.',
                },
                {
                  title: 'Đội ngũ phát triển sản phẩm',
                  imageSrc: '/assets/resources/manufacturing-notes/audience-product-team.webp',
                  body: 'Hỗ trợ quá trình phát triển và tối ưu sản phẩm.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="resources-manufacturing-notes-audience-icon">
                    <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section className="resources-manufacturing-notes-importance">
              <h2>{t('Vì sao ghi chú sản xuất quan trọng?')}</h2>
              <div className="resources-manufacturing-notes-importance-flow">
                {[
                  {
                    title: 'Chia sẻ kinh nghiệm thực tế',
                    imageSrc: '/assets/resources/manufacturing-notes/importance-experience.webp',
                  },
                  {
                    title: 'Giảm rủi ro trong sản xuất và xuất khẩu',
                    imageSrc: '/assets/resources/manufacturing-notes/importance-risk.webp',
                  },
                  {
                    title: 'Nâng cao hiểu biết về vật liệu và quy trình',
                    imageSrc: '/assets/resources/manufacturing-notes/importance-material-process.webp',
                  },
                  {
                    title: 'Tối ưu chất lượng, tiến độ và chi phí',
                    imageSrc: '/assets/resources/manufacturing-notes/importance-quality-cost.webp',
                  },
                  {
                    title: 'Hỗ trợ quyết định và phát triển sản phẩm',
                    imageSrc: '/assets/resources/manufacturing-notes/importance-decision-product.webp',
                  },
                ].map((item, index) => (
                  <div className="resources-manufacturing-notes-importance-step-wrap" key={item.title}>
                    <article>
                      <div className="resources-manufacturing-notes-importance-icon">
                        <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                      </div>
                      <h3>{t(item.title)}</h3>
                    </article>
                    {index < 4 && (
                      <span className="resources-manufacturing-notes-importance-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </section>
          <section className="resources-manufacturing-notes-knowledge-row">
            <section className="resources-manufacturing-notes-library">
              <h2>{t('Thư viện kiến thức liên tục cập nhật')}</h2>
              <p>
                {t(
                  'Các ghi chú được cập nhật thường xuyên từ thực tế sản xuất tại các nhà máy và dự án của ANSLIFE.',
                )}
              </p>
              <div className="resources-manufacturing-notes-library-layout">
                <ul>
                  {[
                    'Quan sát thực tế từ sản xuất',
                    'Bài học từ lỗi và cải tiến',
                    'Kinh nghiệm từ nhiều thị trường',
                    'Giải pháp tối ưu trong thực tế',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
                <div className="resources-manufacturing-notes-library-image-slot">
                  <img
                    src="/assets/resources/manufacturing-notes/library-updated.webp"
                    alt={t('Thư viện kiến thức liên tục cập nhật')}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </section>
            <section className="resources-manufacturing-notes-supply-quality">
              <h2>{t('Góp phần xây dựng chuỗi cung ứng chất lượng')}</h2>
              <p>
                {t(
                  'Chia sẻ kiến thức giúp nâng cao năng lực của toàn bộ chuỗi cung ứng, đối tác và cộng đồng sản xuất nội thất tại Việt Nam.',
                )}
              </p>
              <div className="resources-manufacturing-notes-supply-flow">
                {[
                  {
                    title: 'Chia sẻ kiến thức',
                    imageSrc: '/assets/resources/manufacturing-notes/supply-sharing.webp',
                  },
                  {
                    title: 'Nâng cao năng lực',
                    imageSrc: '/assets/resources/manufacturing-notes/supply-capability.webp',
                  },
                  {
                    title: 'Chuỗi cung ứng ổn định',
                    imageSrc: '/assets/resources/manufacturing-notes/supply-stable.webp',
                  },
                  {
                    title: 'Sản phẩm chất lượng',
                    imageSrc: '/assets/resources/manufacturing-notes/supply-quality-product.webp',
                  },
                  {
                    title: 'Khách hàng hài lòng',
                    imageSrc: '/assets/resources/manufacturing-notes/supply-happy-customer.webp',
                  },
                ].map((item, index) => (
                  <div className="resources-manufacturing-notes-supply-step-wrap" key={item.title}>
                    <article>
                      <div className="resources-manufacturing-notes-supply-icon">
                        <img src={item.imageSrc} alt={t(item.title)} loading="lazy" decoding="async" />
                      </div>
                      <h3>{t(item.title)}</h3>
                    </article>
                    {index < 4 && (
                      <span className="resources-manufacturing-notes-supply-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <section className="resources-manufacturing-notes-standard-room">
              <h2>{t('Liên kết với Phòng mẫu chuẩn đối tác')}</h2>
              <p>
                {t(
                  'Các ghi chú giúp duy trì và đối chiếu tiêu chuẩn với mẫu duyệt, bản vẽ, bảng màu và checklist QC của từng buyer.',
                )}
              </p>
              <div className="resources-manufacturing-notes-standard-room-layout">
                <ul>
                  {[
                    'Mẫu duyệt',
                    'Bản vẽ kỹ thuật',
                    'Bảng màu & hoàn thiện',
                    'Checklist QC',
                    'Tiêu chuẩn đóng gói',
                    'Báo cáo kiểm tra',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
                <div className="resources-manufacturing-notes-standard-room-image-slot">
                  <img
                    src="/assets/resources/manufacturing-notes/standard-room.webp"
                    alt={t('Liên kết với Phòng mẫu chuẩn đối tác')}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </section>
          </section>
          <section className="resources-manufacturing-notes-cta">
            <div className="resources-manufacturing-notes-cta-image-slot">
              <img
                src="/assets/resources/manufacturing-notes/cta-library.webp"
                alt={t('Khám phá thư viện ghi chú sản xuất của ANSLIFE')}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="resources-manufacturing-notes-cta-copy">
              <h2>{t('Khám phá thư viện ghi chú sản xuất của ANSLIFE')}</h2>
              <p>
                {t(
                  'Các ghi chú được cập nhật từ thực tế sản xuất, phát triển sản phẩm, kiểm soát chất lượng và xuất khẩu nhằm hỗ trợ buyer và đối tác hiểu rõ hơn về ngành nội thất tại Việt Nam.',
                )}
              </p>
            </div>
            <div className="resources-manufacturing-notes-cta-actions">
              <a className="is-primary" href="/vn/resources/manufacturing-notes">
                <span className="resources-manufacturing-notes-cta-icon resources-manufacturing-notes-cta-icon--book" aria-hidden="true" />
                {t('Xem ghi chú mới nhất')}
              </a>
              <a href="/vn/search">
                <span className="resources-manufacturing-notes-cta-icon resources-manufacturing-notes-cta-icon--search" aria-hidden="true" />
                {t('Tìm kiếm chủ đề')}
              </a>
              <a href="/vn/contact">
                <span className="resources-manufacturing-notes-cta-icon resources-manufacturing-notes-cta-icon--phone" aria-hidden="true" />
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
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
      {shouldShowQualityControlOverviewBanner && (
        <figure className="quality-control-overview-banner">
          <img
            src="/assets/quality-control-overview-banner.png"
            alt={t('Banner tổng quan hệ thống chất lượng')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-overview-banner-copy">
            <h1>{t('Tổng quan hệ thống chất lượng')}</h1>
            <span>
              {t(
                'Kiểm soát chất lượng xuyên suốt từ vật liệu, sản xuất, hoàn thiện đến đóng gói và xuất khẩu.',
              )}
            </span>
            <p>
              {t(
                'ANSLIFE xây dựng hệ thống kiểm soát chất lượng nhằm đảm bảo sản phẩm được sản xuất đúng yêu cầu kỹ thuật, đúng màu sắc, đúng tiêu chuẩn của buyer và phù hợp với yêu cầu của từng thị trường xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'Hệ thống chất lượng được triển khai xuyên suốt từ giai đoạn đánh giá vật liệu, kiểm soát sản xuất, kiểm tra hoàn thiện, đóng gói và giao hàng, giúp giảm thiểu rủi ro và duy trì tính đồng nhất giữa các lô hàng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isQualityControlOverviewPage && (
        <section
          className="quality-control-overview-content"
          aria-labelledby="quality-control-overview-flow-title"
        >
          <section className="quality-control-overview-panel quality-control-overview-flow">
            <h2 id="quality-control-overview-flow-title">
              {t('CHẤT LƯỢNG ĐƯỢC KIỂM SOÁT Ở ĐÂU?')}
            </h2>
            <div className="quality-control-overview-flow-grid">
              {[
                {
                  title: 'Vật liệu đầu vào',
                  text: 'Kiểm tra vật liệu trước khi đưa vào sản xuất nhằm đảm bảo phù hợp với yêu cầu kỹ thuật, tiêu chuẩn chất lượng và mẫu đã được phê duyệt.',
                  image: '/assets/quality-control/overview/flow-input-material.webp',
                },
                {
                  title: 'Trong sản xuất',
                  text: 'Theo dõi và kiểm tra các công đoạn gia công, lắp ráp và bán thành phẩm nhằm phát hiện sớm các sai lệch trong quá trình sản xuất.',
                  image: '/assets/quality-control/overview/flow-production.webp',
                },
                {
                  title: 'Hoàn thiện bề mặt',
                  text: 'Kiểm soát màu sắc, độ bóng, độ đồng đều và chất lượng bề mặt theo tiêu chuẩn của từng buyer.',
                  image: '/assets/quality-control/overview/flow-surface-finish.webp',
                },
                {
                  title: 'Thành phẩm',
                  text: 'Kiểm tra kích thước, kết cấu, chức năng sử dụng và ngoại quan trước khi đóng gói.',
                  image: '/assets/quality-control/overview/flow-finished-product.webp',
                },
                {
                  title: 'Đóng gói',
                  text: 'Kiểm tra quy cách đóng gói, vật liệu bảo vệ, nhãn mác và yêu cầu vận chuyển.',
                  image: '/assets/quality-control/overview/flow-packing.webp',
                },
                {
                  title: 'Xuất khẩu',
                  text: 'Đối chiếu với yêu cầu đơn hàng, chứng từ và tiêu chuẩn giao hàng trước khi xuất xưởng.',
                  image: '/assets/quality-control/overview/flow-export.webp',
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <div className="quality-control-overview-flow-step">
                    <span>{index + 1}</span>
                  </div>
                  <img
                    className="quality-control-overview-flow-image"
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="quality-control-overview-panel quality-control-overview-pillars">
            <h2>{t('CÁC TRỤ CỘT CỦA HỆ THỐNG CHẤT LƯỢNG ANSLIFE')}</h2>
            <div className="quality-control-overview-pillar-grid">
              {[
                {
                  title: 'Kiểm soát vật liệu',
                  text: 'Kiểm soát nguồn vật liệu, độ ổn định và tính phù hợp với yêu cầu sản phẩm.',
                  image: '/assets/quality-control/overview/pillar-material-control.webp',
                },
                {
                  title: 'Kiểm soát quy trình',
                  text: 'Kiểm soát các công đoạn sản xuất nhằm đảm bảo độ chính xác và tính đồng nhất.',
                  image: '/assets/quality-control/overview/pillar-process-control.webp',
                },
                {
                  title: 'Kiểm soát hoàn thiện',
                  text: 'Kiểm soát màu sắc, bề mặt và các yêu cầu thẩm mỹ theo mẫu duyệt.',
                  image: '/assets/quality-control/overview/pillar-finish-control.webp',
                },
                {
                  title: 'Kiểm soát giao hàng',
                  text: 'Kiểm tra đóng gói, ghi nhãn và điều kiện xuất khẩu trước khi giao hàng.',
                  image: '/assets/quality-control/overview/pillar-delivery-control.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <img
                    className="quality-control-overview-pillar-image"
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

          <section className="quality-control-overview-panel quality-control-overview-buyer-qc">
            <article className="quality-control-overview-buyer-card">
              <h2>{t('HỆ THỐNG CHẤT LƯỢNG GẮN VỚI TỪNG BUYER')}</h2>
              <p>
                {t(
                  'Mỗi buyer có thể có tiêu chuẩn kỹ thuật, tiêu chuẩn chất lượng và phương pháp đánh giá riêng.',
                )}
              </p>
              <p>{t('ANSLIFE hỗ trợ lưu trữ và quản lý các tài liệu liên quan như:')}</p>
              <div className="quality-control-overview-buyer-layout">
                <ul className="quality-control-overview-check-list">
                  {[
                    'Mẫu sản phẩm đã duyệt',
                    'Bản vẽ kỹ thuật',
                    'Bảng màu và hoàn thiện',
                    'Checklist QC',
                    'Tiêu chuẩn đóng gói',
                    'Báo cáo kiểm tra',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
                <img
                  className="quality-control-overview-buyer-image"
                  src="/assets/quality-control/overview/buyer-quality-system.webp"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </article>

            <article className="quality-control-overview-independent-card">
              <h2>{t('QC ĐỘC LẬP TRONG DỰ ÁN')}</h2>
              <p>
                {t(
                  'Đối với các dự án yêu cầu mức độ kiểm soát cao, ANSLIFE có thể triển khai hoạt động QC độc lập nhằm đánh giá chất lượng sản phẩm khách quan trước khi giao hàng.',
                )}
              </p>
              <p>
                {t(
                  'QC độc lập có thể được thực hiện theo từng giai đoạn hoặc theo yêu cầu riêng của buyer.',
                )}
              </p>
              <img
                className="quality-control-overview-independent-image"
                src="/assets/quality-control/overview/independent-qc.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </article>

            <article className="quality-control-overview-inspector-card" aria-label={t('Minh họa QC độc lập trong dự án')}>
              <img
                className="quality-control-overview-inspector-image"
                src="/assets/quality-control/overview/independent-qc-inspector.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </article>
          </section>

          <section className="quality-control-overview-panel quality-control-overview-goals">
            <h2>{t('MỤC TIÊU CỦA HỆ THỐNG CHẤT LƯỢNG')}</h2>
            <div className="quality-control-overview-goal-grid">
              {[
                {
                  title: 'Đúng sản phẩm',
                  text: 'Sản xuất đúng theo bản vẽ, mẫu duyệt và yêu cầu kỹ thuật.',
                  image: '/assets/quality-control/overview/goal-right-product.webp',
                },
                {
                  title: 'Đúng chất lượng',
                  text: 'Đảm bảo chất lượng ổn giữa các lô hàng và giữa các nhà máy tham gia dự án.',
                  image: '/assets/quality-control/overview/goal-right-quality.webp',
                },
                {
                  title: 'Đúng tiến độ',
                  text: 'Phát hiện và xử lý sớm các rủi ro ảnh hưởng đến kế hoạch giao hàng.',
                  image: '/assets/quality-control/overview/goal-right-schedule.webp',
                },
                {
                  title: 'Đúng cam kết',
                  text: 'Đảm bảo sản phẩm phù hợp với tiêu chuẩn đã thống nhất với buyer.',
                  image: '/assets/quality-control/overview/goal-right-commitment.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <img
                    className="quality-control-overview-goal-image"
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

          <section className="quality-control-overview-panel quality-control-overview-cta">
            <img
              className="quality-control-overview-cta-image"
              src="/assets/quality-control/overview/cta-quality-requirements.webp"
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="quality-control-overview-cta-copy">
              <h2>{t('Trao đổi về yêu cầu chất lượng của dự án')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi tiêu chuẩn kỹ thuật, mẫu sản phẩm, checklist QC hoặc yêu cầu kiểm tra để ANSLIFE đánh giá và đề xuất phương án kiểm soát phù hợp.',
                )}
              </p>
            </div>
            <div className="quality-control-overview-cta-actions">
              <a className="is-primary" href="/vn/contact/upload-drawing">
                <span className="quality-control-overview-action-icon quality-control-overview-action-icon--upload" aria-hidden="true" />
                {t('Gửi yêu cầu chất lượng')}
              </a>
              <a href="/vn/contact/upload-drawing">
                <span className="quality-control-overview-action-icon quality-control-overview-action-icon--document" aria-hidden="true" />
                {t('Tải tài liệu kỹ thuật')}
              </a>
              <a href="/vn/contact">
                <span className="quality-control-overview-action-icon quality-control-overview-action-icon--phone" aria-hidden="true" />
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {shouldShowQualityControlQcProcessBanner && (
        <figure className="quality-control-qc-process-banner">
          <img
            src="/assets/quality-control-qc-process-banner.png"
            alt={t('Banner quy trình kiểm soát chất lượng')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-qc-process-banner-copy">
            <h1>{t('Quy trình kiểm soát chất lượng')}</h1>
            <span>
              {t(
                'Kiểm soát chất lượng xuyên suốt từ vật liệu đầu vào đến khi sản phẩm được đóng gói và sẵn sàng xuất khẩu.',
              )}
            </span>
            <p>
              {t(
                'ANSLIFE áp dụng kiểm soát chất lượng qua mọi giai đoạn của dự án để phát hiện sai lệch sớm, giảm thiểu rủi ro và đảm bảo sản phẩm đáp ứng đúng yêu cầu kỹ thuật, mẫu duyệt và tiêu chuẩn thị trường của buyer. Hoạt động kiểm tra được triển khai xuyên suốt trong quá trình sản xuất, không chỉ dừng lại ở khâu cuối cùng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isQualityControlQcProcessPage && (
        <section
          className="quality-control-qc-process-content"
          aria-labelledby="quality-control-qc-process-flow-title"
        >
          <section className="quality-control-qc-process-panel quality-control-qc-process-flow">
            <h2 id="quality-control-qc-process-flow-title">
              {t('Quy trình kiểm soát chất lượng của ANSLIFE')}
            </h2>
            <div className="quality-control-qc-process-flow-grid">
              {[
                {
                  title: 'Xác nhận tiêu chuẩn dự án',
                  image: '/assets/quality-control/qc-process/project-standards.webp',
                  text: 'Trước khi sản xuất, ANSLIFE rà soát yêu cầu dự án và tiêu chuẩn đã được xác nhận.',
                  checks: [
                    'Bản vẽ kỹ thuật',
                    'Mẫu duyệt',
                    'Tiêu chuẩn chất lượng',
                    'Tiêu chuẩn đóng gói',
                    'Tiêu chuẩn thị trường',
                  ],
                },
                {
                  title: 'Kiểm tra vật liệu đầu vào',
                  image: '/assets/quality-control/qc-process/input-material.webp',
                  text: 'Vật liệu được kiểm tra trước khi đưa vào sản xuất.',
                  checks: [
                    'Chủng loại vật liệu',
                    'Kích thước',
                    'Độ ẩm',
                    'Màu sắc',
                    'Bề mặt',
                    'Chứng từ vật liệu (nếu có)',
                  ],
                },
                {
                  title: 'Kiểm tra trong sản xuất',
                  image: '/assets/quality-control/qc-process/production-check.webp',
                  text: 'Các công đoạn gia công và lắp ráp được kiểm tra định kỳ.',
                  checks: [
                    'Kích thước chi tiết',
                    'Mộng và liên kết',
                    'Độ chính xác gia công',
                    'Kết cấu lắp ráp',
                    'Bán thành phẩm',
                  ],
                },
                {
                  title: 'Kiểm tra hoàn thiện bề mặt',
                  image: '/assets/quality-control/qc-process/surface-finish.webp',
                  text: 'Hoàn thiện bề mặt được kiểm tra theo tiêu chuẩn đã duyệt.',
                  checks: ['Màu sắc', 'Stain', 'Độ bóng', 'Độ mờ', 'Bề mặt hoàn thiện', 'Khuyết tật bề mặt'],
                },
                {
                  title: 'Kiểm tra thành phẩm',
                  image: '/assets/quality-control/qc-process/finished-product.webp',
                  text: 'Thành phẩm được kiểm tra đầy đủ trước khi đóng gói.',
                  checks: [
                    'Kích thước hoàn thiện',
                    'Độ ổn định',
                    'Kết cấu',
                    'Chức năng sử dụng',
                    'Ngoại quan sản phẩm',
                  ],
                },
                {
                  title: 'Kiểm tra đóng gói',
                  image: '/assets/quality-control/qc-process/packing-check.webp',
                  text: 'Đóng gói được kiểm tra để đảm bảo bảo vệ khi xuất khẩu.',
                  checks: ['Carton', 'Foam bảo vệ', 'Nhãn sản phẩm', 'Mã hàng', 'Quy cách pallet'],
                },
                {
                  title: 'Kiểm tra trước xuất hàng',
                  image: '/assets/quality-control/qc-process/pre-shipment.webp',
                  text: 'Xác minh cuối cùng trước xuất hàng theo kế hoạch giao hàng và yêu cầu dự án.',
                  checks: [
                    'Số lượng',
                    'Mã hàng',
                    'Tình trạng đóng gói',
                    'Danh mục xuất hàng',
                    'Container (nếu có)',
                  ],
                },
                {
                  title: 'Báo cáo & lưu hồ sơ chất lượng',
                  image: '/assets/quality-control/qc-process/qc-records.webp',
                  text: 'Kết quả kiểm soát chất lượng được tổng hợp và lưu trữ đầy đủ.',
                  checks: [
                    'Báo cáo QC',
                    'Hình ảnh kiểm tra',
                    'Checklist QC',
                    'Mẫu duyệt',
                    'Tiêu chuẩn đóng gói',
                    'Hồ sơ chất lượng dự án',
                  ],
                },
              ].map((step, index) => (
                <article key={step.title}>
                  <div className="quality-control-qc-process-step">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <img
                    className="quality-control-qc-process-image"
                    src={step.image}
                    alt={t(step.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(step.title)}</h3>
                  <p>{t(step.text)}</p>
                  <ul>
                    {step.checks.map((check) => (
                      <li key={check}>{t(check)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-qc-process-panel quality-control-qc-process-principles">
            <h2>{t('Nguyên tắc kiểm soát của ANSLIFE')}</h2>
            <div className="quality-control-qc-process-principle-grid">
              {[
                {
                  title: 'Phát hiện sớm',
                  image: '/assets/quality-control/qc-process/early-detection.webp',
                  text: 'Kiểm tra theo từng công đoạn nhằm giảm thiểu rủi ro ở giai đoạn cuối.',
                },
                {
                  title: 'Kiểm soát theo mẫu duyệt',
                  image: '/assets/quality-control/qc-process/approved-sample-control.webp',
                  text: 'Mọi hoạt động kiểm tra đều đối chiếu với tiêu chuẩn đã được xác nhận.',
                },
                {
                  title: 'Lưu hồ sơ chất lượng',
                  image: '/assets/quality-control/qc-process/quality-records.webp',
                  text: 'Duy trì khả năng truy xuất và đối chiếu giữa các lô hàng.',
                },
                {
                  title: 'Hỗ trợ QC độc lập',
                  image: '/assets/quality-control/qc-process/independent-qc.webp',
                  text: 'Có thể triển khai hoạt động kiểm tra độc lập theo yêu cầu của buyer hoặc dự án.',
                },
              ].map((principle) => (
                <article key={principle.title}>
                  <img
                    className="quality-control-qc-process-principle-image"
                    src={principle.image}
                    alt={t(principle.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>{t(principle.title)}</h3>
                    <p>{t(principle.text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-qc-process-panel quality-control-qc-process-cta">
            <img
              className="quality-control-qc-process-cta-image"
              src="/assets/quality-control/qc-process/qc-process-consultation.webp"
              alt={t('Trao đổi về quy trình kiểm soát chất lượng của dự án')}
              loading="lazy"
              decoding="async"
            />
            <div className="quality-control-qc-process-cta-copy">
              <h2>{t('Trao đổi về quy trình kiểm soát chất lượng của dự án')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, tiêu chuẩn chất lượng, checklist QC hoặc yêu cầu kiểm tra để ANSLIFE đánh giá và đề xuất quy trình kiểm soát phù hợp.',
                )}
              </p>
            </div>
            <div className="quality-control-qc-process-cta-actions">
              <a className="is-primary" href="/vn/contact/upload-drawing">
                <span className="quality-control-qc-process-action-icon quality-control-qc-process-action-icon--upload" aria-hidden="true" />
                {t('Gửi yêu cầu QC')}
              </a>
              <a href="/vn/contact/upload-drawing">
                <span className="quality-control-qc-process-action-icon quality-control-qc-process-action-icon--document" aria-hidden="true" />
                {t('Tải tài liệu kỹ thuật')}
              </a>
              <a href="/vn/contact">
                <span className="quality-control-qc-process-action-icon quality-control-qc-process-action-icon--phone" aria-hidden="true" />
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {shouldShowQualityControlMaterialInspectionBanner && (
        <figure className="quality-control-material-inspection-banner">
          <img
            src="/assets/quality-control-material-inspection-banner.png"
            alt={t('Banner kiểm tra vật liệu')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-material-inspection-banner-copy">
            <h1>{t('Kiểm tra vật liệu')}</h1>
            <span>{t('Đánh giá và kiểm soát vật liệu trước khi đưa vào sản xuất.')}</span>
            <p>
              {t(
                'ANSLIFE thực hiện hoạt động kiểm tra vật liệu nhằm xác nhận tính phù hợp của vật liệu với yêu cầu kỹ thuật, mẫu duyệt và tiêu chuẩn của dự án trước khi đưa vào sản xuất.',
              )}
            </p>
            <p>
              {t(
                'Việc kiểm tra sớm giúp giảm thiểu rủi ro về chất lượng, hạn chế sai lệch trong quá trình sản xuất và nâng cao tính đồng nhất giữa các lô hàng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isQualityControlMaterialInspectionPage && (
        <section
          className="quality-control-material-inspection-content"
          aria-labelledby="quality-control-material-inspection-materials-title"
        >
          <section className="quality-control-material-inspection-panel quality-control-material-inspection-materials">
            <h2 id="quality-control-material-inspection-materials-title">{t('VẬT LIỆU NÀO ĐƯỢC KIỂM TRA?')}</h2>
            <div className="quality-control-material-inspection-material-grid">
              {[
                {
                  title: 'GỖ TỰ NHIÊN',
                  image: '/assets/quality-control/material-inspection/material-solid-wood.webp',
                  text: 'Kiểm tra chủng loại, độ ẩm, màu sắc, vân gỗ, mắt gỗ, nứt, cong vênh và các đặc điểm tự nhiên của vật liệu.',
                },
                {
                  title: 'GỖ KỸ THUẬT',
                  image: '/assets/quality-control/material-inspection/material-engineered-wood.webp',
                  text: 'Kiểm tra kích thước, độ dày, cấu trúc lớp, bề mặt và tính ổn định của vật liệu.',
                },
                {
                  title: 'VENEER',
                  image: '/assets/quality-control/material-inspection/material-veneer.webp',
                  text: 'Kiểm tra màu sắc, vân gỗ, độ đồng đều, độ dày và khả năng ghép nối theo yêu cầu sản phẩm.',
                },
                {
                  title: 'VẬT LIỆU BỌC NỆM',
                  image: '/assets/quality-control/material-inspection/material-upholstery.webp',
                  text: 'Kiểm tra màu sắc, chất liệu, độ dày, mật độ, mẫu duyệt và tính phù hợp với yêu cầu sản phẩm.',
                },
                {
                  title: 'MÂY TRE & VẬT LIỆU TỰ NHIÊN',
                  image: '/assets/quality-control/material-inspection/material-rattan-natural.webp',
                  text: 'Kiểm tra màu sắc, độ đồng đều, kích thước, tình trạng bề mặt và khả năng sử dụng trong sản xuất.',
                },
                {
                  title: 'VẬT LIỆU ĐÓNG GÓI',
                  image: '/assets/quality-control/material-inspection/material-packing.webp',
                  text: 'Kiểm tra quy cách, kích thước, độ bền và khả năng bảo vệ sản phẩm trong vận chuyển quốc tế.',
                },
              ].map((material) => (
                <article key={material.title}>
                  <img
                    className="quality-control-material-inspection-material-image"
                    src={material.image}
                    alt={t(material.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(material.title)}</h3>
                  <p>{t(material.text)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-material-inspection-panel quality-control-material-inspection-main">
            <h2 id="quality-control-material-inspection-main-title">{t('NỘI DUNG KIỂM TRA CHÍNH')}</h2>
            <div className="quality-control-material-inspection-main-grid">
              {[
                {
                  title: 'XÁC NHẬN ĐÚNG VẬT LIỆU',
                  image: '/assets/quality-control/material-inspection/main-confirm-material.webp',
                  text: 'Đối chiếu vật liệu thực tế với yêu cầu của bản vẽ, BOM, mẫu duyệt hoặc yêu cầu của buyer.',
                  label: 'Kiểm tra:',
                  checks: ['Chủng loại', 'Quy cách', 'Nguồn vật liệu', 'Mã vật liệu'],
                },
                {
                  title: 'KIỂM TRA NGOẠI QUAN',
                  image: '/assets/quality-control/material-inspection/main-visual-check.webp',
                  text: 'Đánh giá tình trạng vật liệu trước khi đưa vào sản xuất.',
                  label: 'Kiểm tra:',
                  checks: ['Nứt', 'Cong vênh', 'Biến dạng', 'Mắt chết', 'Trầy xước', 'Lỗi bề mặt'],
                },
                {
                  title: 'KIỂM TRA KÍCH THƯỚC',
                  image: '/assets/quality-control/material-inspection/main-dimension-check.webp',
                  text: 'Đảm bảo vật liệu đáp ứng yêu cầu kỹ thuật của sản phẩm.',
                  label: 'Kiểm tra:',
                  checks: ['Chiều dài', 'Chiều rộng', 'Chiều dày', 'Dung sai cho phép'],
                },
                {
                  title: 'KIỂM TRA ĐỘ ẨM',
                  image: '/assets/quality-control/material-inspection/main-moisture-check.webp',
                  text: 'Kiểm soát độ ẩm nhằm giảm nguy cơ cong vênh, nứt hoặc biến dạng sau sản xuất.',
                  label: 'Kiểm tra:',
                  checks: ['Độ ẩm vật liệu', 'Độ đồng đều giữa các lô', 'Điều kiện lưu kho'],
                },
                {
                  title: 'XÁC NHẬN KHẢ NĂNG ĐƯA VÀO SẢN XUẤT',
                  text: 'Chỉ những vật liệu đạt yêu cầu mới được đưa vào các công đoạn tiếp theo.',
                  label: 'Phân loại:',
                  checks: ['Đạt', 'Cần xử lý', 'Không đạt'],
                  status: ['PASS', 'REWORK', 'REJECT'],
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <div className="quality-control-material-inspection-step">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{t(item.title)}</h3>
                  </div>
                  <p>{t(item.text)}</p>
                  <strong>{t(item.label)}</strong>
                  <ul>
                    {item.checks.map((check) => (
                      <li key={check}>{t(check)}</li>
                    ))}
                  </ul>
                  {item.status ? (
                    <div className="quality-control-material-inspection-status" aria-label={t('Phân loại vật liệu')}>
                      {item.status.map((status) => (
                        <span key={status}>{status}</span>
                      ))}
                    </div>
                  ) : (
                    <img
                      className="quality-control-material-inspection-image"
                      src={item.image}
                      alt={t(item.title)}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-material-inspection-followup">
            <section className="quality-control-material-inspection-panel quality-control-material-inspection-groups">
              <h2>{t('KIỂM TRA THEO TỪNG NHÓM VẬT LIỆU')}</h2>
              <div className="quality-control-material-inspection-table" role="table">
                <div className="quality-control-material-inspection-table-head" role="row">
                  <span role="columnheader">{t('Nhóm vật liệu')}</span>
                  <span role="columnheader">{t('Nội dung kiểm tra chính')}</span>
                </div>
                {[
                  [
                    'Gỗ tự nhiên',
                    'Loại gỗ, độ ẩm, vân gỗ, mắt gỗ',
                    '/assets/quality-control/material-inspection/group-solid-wood.webp',
                  ],
                  [
                    'Plywood',
                    'Cấu trúc lớp, độ dày, bề mặt',
                    '/assets/quality-control/material-inspection/group-plywood.webp',
                  ],
                  ['MDF', 'Kích thước, mật độ, bề mặt', '/assets/quality-control/material-inspection/group-mdf.webp'],
                  [
                    'Veneer',
                    'Màu sắc, vân gỗ, độ đồng đều',
                    '/assets/quality-control/material-inspection/group-veneer.webp',
                  ],
                  ['Foam', 'Mật độ, độ đàn hồi', '/assets/quality-control/material-inspection/group-foam.webp'],
                  [
                    'Vải / Da',
                    'Màu sắc, chất liệu, mẫu duyệt',
                    '/assets/quality-control/material-inspection/group-fabric-leather.webp',
                  ],
                  [
                    'Mây tre',
                    'Kích thước, màu sắc, chất lượng đan',
                    '/assets/quality-control/material-inspection/group-rattan.webp',
                  ],
                ].map(([material, checks, image]) => (
                  <div className="quality-control-material-inspection-table-row" role="row" key={material}>
                    <span role="cell">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                      {t(material)}
                    </span>
                    <span role="cell">{t(checks)}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="quality-control-material-inspection-panel quality-control-material-inspection-system">
              <h2>{t('LIÊN KẾT VỚI HỆ THỐNG CHẤT LƯỢNG')}</h2>
              <div className="quality-control-material-inspection-system-grid">
                {[
                  {
                    title: 'Kiểm soát độ ẩm',
                    image: '/assets/quality-control/material-inspection/system-moisture.webp',
                    text: 'Liên kết trực tiếp với chương trình kiểm soát độ ẩm vật liệu của ANSLIFE.',
                  },
                  {
                    title: 'Kiểm soát mẫu duyệt',
                    image: '/assets/quality-control/material-inspection/system-approved-sample.webp',
                    text: 'Đối chiếu với vật liệu đã được buyer phê duyệt.',
                  },
                  {
                    title: 'Kiểm tra trong sản xuất',
                    image: '/assets/quality-control/material-inspection/system-production-check.webp',
                    text: 'Là cơ sở để triển khai các hoạt động kiểm tra tiếp theo.',
                  },
                  {
                    title: 'Báo cáo chất lượng',
                    image: '/assets/quality-control/material-inspection/system-quality-report.webp',
                    text: 'Kết quả kiểm tra vật liệu được lưu trong hồ sơ chất lượng của dự án.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <img
                      className="quality-control-material-inspection-system-icon"
                      src={item.image}
                      alt={t(item.title)}
                      loading="lazy"
                      decoding="async"
                    />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.text)}</p>
                  </article>
                ))}
              </div>
              <div className="quality-control-material-inspection-why">
                <h2>{t('TẠI SAO KIỂM TRA VẬT LIỆU QUAN TRỌNG?')}</h2>
                <div className="quality-control-material-inspection-why-flow">
                  {[
                    {
                      title: 'Vật liệu đúng',
                      image: '/assets/quality-control/material-inspection/why-correct-material.webp',
                    },
                    {
                      title: 'Sản xuất ổn định',
                      image: '/assets/quality-control/material-inspection/why-stable-production.webp',
                    },
                    {
                      title: 'Hoàn thiện đồng đều',
                      image: '/assets/quality-control/material-inspection/why-consistent-finish.webp',
                    },
                    {
                      title: 'Đóng gói đúng chuẩn',
                      image: '/assets/quality-control/material-inspection/why-standard-packing.webp',
                    },
                    {
                      title: 'Giao hàng đúng cam kết',
                      image: '/assets/quality-control/material-inspection/why-committed-delivery.webp',
                    },
                  ].map((step) => (
                    <div key={step.title}>
                      <img
                        className="quality-control-material-inspection-why-image"
                        src={step.image}
                        alt={t(step.title)}
                        loading="lazy"
                        decoding="async"
                      />
                      <p>{t(step.title)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </section>
          <section className="quality-control-material-inspection-panel quality-control-material-inspection-cta">
            <img
              className="quality-control-material-inspection-cta-image"
              src="/assets/quality-control/material-inspection/cta-material-requirements.webp"
              alt={t('Trao đổi về yêu cầu vật liệu của dự án')}
              loading="lazy"
              decoding="async"
            />
            <div className="quality-control-material-inspection-cta-copy">
              <h2>{t('TRAO ĐỔI VỀ YÊU CẦU VẬT LIỆU CỦA DỰ ÁN')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi danh mục vật liệu, bản vẽ, mẫu vật liệu hoặc tiêu chuẩn kỹ thuật để ANSLIFE đánh giá và đề xuất phương án kiểm tra phù hợp.',
                )}
              </p>
            </div>
            <div className="quality-control-material-inspection-cta-actions">
              <a className="is-primary" href="/vn/contact/upload-drawing">
                {t('Gửi yêu cầu')}
              </a>
              <a href="/vn/contact/upload-drawing">
                {t('Tải tài liệu kỹ thuật')}
              </a>
              <a href="/vn/contact">
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {shouldShowQualityControlInProcessInspectionBanner && (
        <figure className="quality-control-in-process-inspection-banner">
          <img
            src="/assets/quality-control-in-process-inspection-banner.png"
            alt={t('Banner kiểm tra trong sản xuất')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-in-process-inspection-banner-copy">
            <h1>{t('Kiểm tra trong sản xuất')}</h1>
            <span>
              {t(
                'Kiểm soát chất lượng tại từng công đoạn nhằm phát hiện sớm sai lệch trước khi chuyển sang bước tiếp theo.',
              )}
            </span>
            <p>
              {t(
                'ANSLIFE triển khai hoạt động kiểm tra trong quá trình sản xuất nhằm đảm bảo các công đoạn gia công, lắp ráp và hoàn thiện được thực hiện đúng theo bản vẽ, mẫu duyệt và tiêu chuẩn chất lượng của dự án.',
              )}
            </p>
            <p>
              {t(
                'Việc kiểm tra được thực hiện xuyên suốt quá trình sản xuất để giảm thiểu lỗi, hạn chế sửa chữa và nâng cao tính đồng nhất của sản phẩm.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldRenderBlankQualityInProcessPage && (
        <section
          className="quality-control-in-process-inspection-content"
          aria-labelledby="quality-control-in-process-location-title"
        >
          <section className="quality-control-in-process-inspection-panel quality-control-in-process-inspection-location">
            <h2 id="quality-control-in-process-location-title">{t('KIỂM TRA ĐƯỢC THỰC HIỆN Ở ĐÂU?')}</h2>
            <div className="quality-control-in-process-inspection-location-flow">
              {[
                ['Vật liệu', '/assets/quality-control/in-process-inspection/flow-material.webp'],
                ['Cắt & chuẩn bị phôi', '/assets/quality-control/in-process-inspection/flow-cut-prep.webp'],
                ['Gia công chi tiết', '/assets/quality-control/in-process-inspection/flow-detail-machining.webp'],
                ['Lắp ráp', '/assets/quality-control/in-process-inspection/flow-assembly.webp'],
                ['Chà nhám', '/assets/quality-control/in-process-inspection/flow-sanding.webp'],
                ['Hoàn thiện bề mặt', '/assets/quality-control/in-process-inspection/flow-surface-finish.webp'],
                ['Thành phẩm', '/assets/quality-control/in-process-inspection/flow-finished-product.webp'],
              ].map(([step, image]) => (
                <div key={step}>
                  <img
                    className="quality-control-in-process-inspection-flow-image"
                    src={image}
                    alt={t(step)}
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{t(step)}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="quality-control-in-process-inspection-panel quality-control-in-process-inspection-stages">
            <h2>{t('CÁC CÔNG ĐOẠN KIỂM TRA CHÍNH')}</h2>
            <div className="quality-control-in-process-inspection-stage-grid">
              {[
                {
                  title: 'Kiểm tra cắt & chuẩn bị phôi',
                  image: '/assets/quality-control/in-process-inspection/stage-cut-prep.webp',
                  text: 'Xác nhận vật liệu được cắt đúng kích thước và đúng quy cách trước khi chuyển sang gia công.',
                  checks: ['Kích thước phôi', 'Chủng loại vật liệu', 'Hướng vân gỗ', 'Mã chi tiết', 'Dung sai gia công'],
                },
                {
                  title: 'Kiểm tra gia công chi tiết',
                  image: '/assets/quality-control/in-process-inspection/stage-detail-machining.webp',
                  text: 'Kiểm tra độ chính xác của các chi tiết sau khi gia công nhằm đảm bảo khả năng lắp ráp và độ ổn định của sản phẩm.',
                  checks: ['Kích thước chi tiết', 'Mộng gỗ', 'Lỗ khoan', 'Rãnh', 'Góc gia công', 'Bề mặt gia công'],
                },
                {
                  title: 'Kiểm tra cấu kiện',
                  image: '/assets/quality-control/in-process-inspection/stage-component-check.webp',
                  text: 'Kiểm tra các bộ phận trước khi chuyển sang công đoạn lắp ráp hoặc hoàn thiện.',
                  examples: ['Khung ghế', 'Chân bàn', 'Tay ghế', 'Lưng ghế', 'Bộ phận tủ', 'Cấu kiện bọc nệm'],
                  checks: ['Kích thước', 'Độ vuông góc', 'Độ cân bằng', 'Độ chắc chắn của liên kết'],
                },
                {
                  title: 'Kiểm tra lắp ráp',
                  image: '/assets/quality-control/in-process-inspection/stage-assembly.webp',
                  text: 'Đánh giá khả năng lắp ráp và độ ổn định của sản phẩm trước khi hoàn thiện bề mặt.',
                  checks: ['Khớp nối', 'Độ cân bằng', 'Độ ổn định kết cấu', 'Khe hở', 'Sai lệch lắp ráp'],
                },
                {
                  title: 'Kiểm tra chà nhám & xử lý bề mặt',
                  image: '/assets/quality-control/in-process-inspection/stage-sanding.webp',
                  text: 'Đảm bảo bề mặt đáp ứng yêu cầu trước khi chuyển sang công đoạn sơn hoặc hoàn thiện.',
                  checks: ['Độ nhẵn', 'Vết xước', 'Cạnh sắc', 'Keo thừa', 'Lỗi bề mặt'],
                },
                {
                  title: 'Kiểm tra hoàn thiện bề mặt',
                  image: '/assets/quality-control/in-process-inspection/stage-surface-finish.webp',
                  text: 'Kiểm tra màu sắc, độ bóng, độ đồng đều và chất lượng bề mặt trong quá trình hoàn thiện.',
                  checks: ['Stain', 'Màu sắc', 'Độ bóng', 'Độ mờ', 'Bề mặt sơn', 'Lỗi hoàn thiện'],
                },
              ].map((stage, index) => (
                <article key={stage.title}>
                  <div className="quality-control-in-process-inspection-stage-head">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{t(stage.title)}</h3>
                  </div>
                  <img
                    className="quality-control-in-process-inspection-stage-image"
                    src={stage.image}
                    alt={t(stage.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{t(stage.text)}</p>
                  {stage.examples ? (
                    <div className="quality-control-in-process-inspection-stage-examples">
                      <strong>{t('Ví dụ:')}</strong>
                      <ul>
                        {stage.examples.map((example) => (
                          <li key={example}>{t(example)}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  <ul className="quality-control-in-process-inspection-checks">
                    {stage.checks.map((check) => (
                      <li key={check}>{t(check)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-in-process-inspection-lower">
            <section className="quality-control-in-process-inspection-panel quality-control-in-process-inspection-controlled">
              <h2>{t('NHỮNG NỘI DUNG ĐƯỢC KIỂM SOÁT XUYÊN SUỐT')}</h2>
              <div className="quality-control-in-process-inspection-controlled-grid">
                {[
                  [
                    'Kích thước',
                    'Đúng theo bản vẽ kỹ thuật và dung sai cho phép.',
                    '/assets/quality-control/in-process-inspection/controlled-dimension.webp',
                  ],
                  [
                    'Kết cấu',
                    'Đảm bảo khả năng chịu lực và độ ổn định.',
                    '/assets/quality-control/in-process-inspection/controlled-structure.webp',
                  ],
                  [
                    'Liên kết',
                    'Kiểm soát mộng, chốt, vít và các điểm kết nối.',
                    '/assets/quality-control/in-process-inspection/controlled-connection.webp',
                  ],
                  [
                    'Ngoại quan',
                    'Kiểm soát bề mặt và tính đồng nhất.',
                    '/assets/quality-control/in-process-inspection/controlled-appearance.webp',
                  ],
                  [
                    'Mẫu duyệt',
                    'Đối chiếu liên tục với mẫu đã được phê duyệt.',
                    '/assets/quality-control/in-process-inspection/controlled-approved-sample.webp',
                  ],
                  [
                    'Truy xuất',
                    'Lưu thông tin kiểm tra phục vụ quản lý chất lượng.',
                    '/assets/quality-control/in-process-inspection/controlled-traceability.webp',
                  ],
                ].map(([title, text, image]) => (
                  <article key={title}>
                    <img
                      className="quality-control-in-process-inspection-small-image"
                      src={image}
                      alt={t(title)}
                      loading="lazy"
                      decoding="async"
                    />
                    <h3>{t(title)}</h3>
                    <p>{t(text)}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="quality-control-in-process-inspection-panel quality-control-in-process-inspection-methods">
              <h2>{t('PHƯƠNG PHÁP KIỂM TRA')}</h2>
              <div className="quality-control-in-process-inspection-method-grid">
                {[
                  [
                    'Kiểm tra theo công đoạn',
                    'Thực hiện kiểm tra tại các điểm kiểm soát quan trọng trong quy trình sản xuất.',
                    '/assets/quality-control/in-process-inspection/method-by-stage.webp',
                  ],
                  [
                    'Kiểm tra theo mẫu',
                    'Đối chiếu trực tiếp với mẫu sản phẩm đã được phê duyệt.',
                    '/assets/quality-control/in-process-inspection/method-by-sample.webp',
                  ],
                  [
                    'Kiểm tra theo lô',
                    'Thực hiện đánh giá theo từng lô sản xuất hoặc từng giai đoạn của dự án.',
                    '/assets/quality-control/in-process-inspection/method-by-lot.webp',
                  ],
                  [
                    'Kiểm tra theo yêu cầu buyer',
                    'Áp dụng các tiêu chuẩn và checklist riêng theo từng khách hàng hoặc thị trường.',
                    '/assets/quality-control/in-process-inspection/method-by-buyer.webp',
                  ],
                ].map(([title, text, image]) => (
                  <article key={title}>
                    <img
                      className="quality-control-in-process-inspection-small-image"
                      src={image}
                      alt={t(title)}
                      loading="lazy"
                      decoding="async"
                    />
                    <h3>{t(title)}</h3>
                    <p>{t(text)}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="quality-control-in-process-inspection-panel quality-control-in-process-inspection-benefits">
              <h2>{t('LỢI ÍCH CỦA KIỂM TRA TRONG SẢN XUẤT')}</h2>
              <div className="quality-control-in-process-inspection-benefit-flow">
                {[
                  ['Phát hiện sớm lỗi', '/assets/quality-control/in-process-inspection/benefit-detect-early.webp'],
                  ['Giảm sửa chữa', '/assets/quality-control/in-process-inspection/benefit-reduce-rework.webp'],
                  ['Ổn định chất lượng', '/assets/quality-control/in-process-inspection/benefit-stable-quality.webp'],
                  ['Giảm rủi ro giao hàng', '/assets/quality-control/in-process-inspection/benefit-delivery-risk.webp'],
                  [
                    'Nâng cao tính đồng nhất giữa các lô hàng',
                    '/assets/quality-control/in-process-inspection/benefit-consistency.webp',
                  ],
                ].map(([item, image]) => (
                  <div key={item}>
                    <img
                      className="quality-control-in-process-inspection-small-image"
                      src={image}
                      alt={t(item)}
                      loading="lazy"
                      decoding="async"
                    />
                    <p>{t(item)}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="quality-control-in-process-inspection-panel quality-control-in-process-inspection-system">
              <h2>{t('LIÊN KẾT VỚI HỆ THỐNG CHẤT LƯỢNG')}</h2>
              <div className="quality-control-in-process-inspection-system-flow">
                {[
                  ['Kiểm tra vật liệu', '/assets/quality-control/in-process-inspection/system-material-inspection.webp'],
                  ['Kiểm tra trong sản xuất', '/assets/quality-control/in-process-inspection/system-in-process.webp'],
                  ['Kiểm tra cuối', '/assets/quality-control/in-process-inspection/system-final-inspection.webp'],
                  ['Báo cáo chất lượng', '/assets/quality-control/in-process-inspection/system-quality-report.webp'],
                ].map(([item, image]) => (
                  <div key={item}>
                    <img
                      className="quality-control-in-process-inspection-small-image"
                      src={image}
                      alt={t(item)}
                      loading="lazy"
                      decoding="async"
                    />
                    <p>{t(item)}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="quality-control-in-process-inspection-panel quality-control-in-process-inspection-cta">
              <img
                className="quality-control-in-process-inspection-cta-image"
                src="/assets/quality-control/in-process-inspection/cta-in-process-qc.webp"
                alt={t('Trao đổi về yêu cầu kiểm tra trong sản xuất')}
                loading="lazy"
                decoding="async"
              />
              <div className="quality-control-in-process-inspection-cta-copy">
                <h2>{t('TRAO ĐỔI VỀ YÊU CẦU KIỂM TRA TRONG SẢN XUẤT')}</h2>
                <p>
                  {t(
                    'Buyer có thể gửi bản vẽ kỹ thuật, checklist QC hoặc tiêu chuẩn sản xuất để ANSLIFE đánh giá và đề xuất phương án kiểm tra phù hợp.',
                  )}
                </p>
              </div>
              <div className="quality-control-in-process-inspection-cta-actions">
                <a className="is-primary" href="/vn/contact/upload-drawing">
                  {t('Gửi yêu cầu QC')}
                </a>
                <a href="/vn/contact/upload-drawing">{t('Tải tài liệu kỹ thuật')}</a>
                <a href="/vn/contact">{t('Liên hệ ANSLIFE')}</a>
              </div>
            </section>
          </section>
        </section>
      )}
      {shouldShowQualityControlFinalInspectionBanner && (
        <figure className="quality-control-final-inspection-banner">
          <img
            src="/assets/quality-control-final-inspection-banner.png"
            alt={t('Banner kiểm tra cuối')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-final-inspection-banner-copy">
            <h1>{t('Kiểm tra cuối')}</h1>
            <span>
              {t(
                'Xác nhận sản phẩm đáp ứng yêu cầu kỹ thuật, mẫu duyệt và tiêu chuẩn chất lượng trước khi giao hàng.',
              )}
            </span>
            <p>
              {t(
                'Kiểm tra cuối là bước đánh giá tổng thể sản phẩm sau khi hoàn thành sản xuất và hoàn thiện bề mặt. Hoạt động này giúp xác nhận sản phẩm phù hợp với yêu cầu của dự án trước khi đóng gói hoặc xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE thực hiện kiểm tra cuối dựa trên bản vẽ, mẫu duyệt, tiêu chuẩn chất lượng và các yêu cầu riêng của buyer.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowQualityControlApprovedSampleControlBanner && (
        <figure className="quality-control-approved-sample-control-banner">
          <img
            src="/assets/quality-control-approved-sample-control-banner.png"
            alt={t('Banner kiểm soát mẫu duyệt')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-approved-sample-control-banner-copy">
            <h1>{t('Kiểm soát mẫu duyệt')}</h1>
            <span>{t('Đảm bảo sản xuất luôn bám sát mẫu đã được phê duyệt.')}</span>
            <p>
              {t(
                'ANSLIFE triển khai hệ thống kiểm soát mẫu duyệt nhằm đảm bảo mọi hoạt động sản xuất, hoàn thiện, kiểm tra và giao hàng đều được đối chiếu với tiêu chuẩn đã được buyer xác nhận. Mẫu duyệt đóng vai trò là cơ sở tham chiếu quan trọng để duy trì tính đồng nhất giữa mẫu phát triển, sản xuất hàng loạt và các đơn hàng lặp lại.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowQualityControlMoistureControlBanner && (
        <figure className="quality-control-moisture-control-banner">
          <img
            src="/assets/quality-control-moisture-control-banner.png"
            alt={t('Banner kiểm soát độ ẩm')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-moisture-control-banner-copy">
            <h1>{t('Kiểm soát độ ẩm')}</h1>
            <span>
              {t(
                'Kiểm soát độ ẩm vật liệu nhằm nâng cao độ ổn định của sản phẩm trong quá trình sản xuất, lưu kho và sử dụng.',
              )}
            </span>
            <p>
              {t(
                'Độ ẩm vật liệu là một trong những yếu tố ảnh hưởng trực tiếp đến độ ổn định, khả năng lắp ráp, chất lượng hoàn thiện và tuổi thọ của sản phẩm nội thất.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE triển khai hoạt động kiểm soát độ ẩm nhằm giảm thiểu các rủi ro như cong vênh, nứt, co ngót, biến dạng và sai lệch kích thước trong quá trình sản xuất và xuất khẩu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowQualityControlPackingStandardBanner && (
        <figure className="quality-control-packing-standard-banner">
          <img
            src="/assets/quality-control-packing-standard-banner.png"
            alt={t('Banner chuẩn đóng gói')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-packing-standard-banner-copy">
            <h1>{t('Chuẩn đóng gói')}</h1>
            <p>
              {t(
                'ANSLIFE triển khai các tiêu chuẩn đóng gói nhằm giảm thiểu rủi ro trong quá trình lưu kho, bốc xếp, vận chuyển nội địa và vận chuyển quốc tế. Quy cách đóng gói được xây dựng dựa trên đặc tính sản phẩm, yêu cầu của buyer, điều kiện vận chuyển và tiêu chuẩn của từng thị trường.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isQualityControlPackingStandardPage && (
        <section
          className="quality-control-packing-standard-content"
          aria-labelledby="quality-control-packing-standard-goals-title"
        >
          <section className="quality-control-packing-standard-panel quality-control-packing-standard-goals">
            <h2 id="quality-control-packing-standard-goals-title">
              {`1. ${t('Mục tiêu của đóng gói')}`}
            </h2>
            <div className="quality-control-packing-standard-goal-grid">
              {[
                {
                  number: '1',
                  title: 'Bảo vệ sản phẩm',
                  body: 'Giảm thiểu trầy xước, va đập, biến dạng và hư hỏng trong quá trình vận chuyển.',
                  image: '/assets/quality-control/packing-standard/goals/product-protection.webp',
                },
                {
                  number: '2',
                  title: 'Duy trì chất lượng',
                  body: 'Giữ nguyên trạng thái sản phẩm từ khi xuất xưởng đến khi nhận hàng.',
                  image: '/assets/quality-control/packing-standard/goals/quality-maintenance.webp',
                },
                {
                  number: '3',
                  title: 'Tối ưu vận chuyển',
                  body: 'Hỗ trợ lưu kho, xếp dỡ và vận chuyển hiệu quả.',
                  image: '/assets/quality-control/packing-standard/goals/transport-optimization.webp',
                },
                {
                  number: '4',
                  title: 'Hỗ trợ truy xuất',
                  body: 'Đảm bảo nhận diện và quản lý sản phẩm theo từng đơn hàng.',
                  image: '/assets/quality-control/packing-standard/goals/traceability-support.webp',
                },
              ].map((item) => (
                <article key={item.number}>
                  <div className="quality-control-packing-standard-goal-image-slot" aria-hidden="true">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <h3>
                    <span>{item.number}.</span>
                    {t(item.title)}
                  </h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-packing-standard-panel quality-control-packing-standard-controls">
            <h2>{`2. ${t('Những gì được kiểm soát trong đóng gói?')}`}</h2>
            <div className="quality-control-packing-standard-control-grid">
              {[
                {
                  number: '01',
                  title: 'Bảo vệ bề mặt',
                  body: 'Bảo vệ các khu vực dễ trầy xước hoặc hư hỏng trong quá trình vận chuyển.',
                  items: ['Mặt bàn', 'Tay ghế', 'Cạnh sản phẩm', 'Bề mặt hoàn thiện'],
                  image: '/assets/quality-control/packing-standard/controls/surface-protection.webp',
                },
                {
                  number: '02',
                  title: 'Bảo vệ kết cấu',
                  body: 'Giảm thiểu tác động từ rung lắc, va đập hoặc chồng xếp.',
                  items: ['Khung ghế', 'Chân bàn', 'Bộ phận tủ', 'Chi tiết lắp ráp'],
                  image: '/assets/quality-control/packing-standard/controls/structural-protection.webp',
                },
                {
                  number: '03',
                  title: 'Kiểm soát phụ kiện',
                  body: 'Đảm bảo đầy đủ phụ kiện và linh kiện đi kèm.',
                  items: ['Bộ vít', 'Khóa', 'Tay nắm', 'Chân tăng chỉnh', 'Hướng dẫn lắp ráp'],
                  image: '/assets/quality-control/packing-standard/controls/accessories.webp',
                },
                {
                  number: '04',
                  title: 'Kiểm soát nhãn mác',
                  body: 'Đảm bảo nhận diện chính xác sản phẩm và đơn hàng.',
                  items: ['Mã hàng', 'Mã carton', 'Nhãn buyer', 'Nhãn vận chuyển'],
                  image: '/assets/quality-control/packing-standard/controls/labels.webp',
                },
                {
                  number: '05',
                  title: 'Kiểm soát pallet',
                  body: '',
                  items: [],
                  image: '/assets/quality-control/packing-standard/controls/pallet.webp',
                },
                {
                  number: '06',
                  title: 'Kiểm soát container',
                  body: 'Đảm bảo hàng hóa được xếp phù hợp và điều kiện vận chuyển quốc tế.',
                  items: [],
                  image: '/assets/quality-control/packing-standard/controls/container.webp',
                },
              ].map((item) => (
                <article key={item.number}>
                  <h3>
                    <span>{item.number}.</span>
                    {t(item.title)}
                  </h3>
                  <div className="quality-control-packing-standard-control-layout">
                    <div className="quality-control-packing-standard-control-image-slot" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <div className="quality-control-packing-standard-control-copy">
                      {item.body && <p>{t(item.body)}</p>}
                      {item.items.length > 0 && (
                        <ul>
                          {item.items.map((child) => (
                            <li key={child}>{t(child)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-packing-standard-panel quality-control-packing-standard-materials">
            <h2>{`3. ${t('Các vật liệu đóng gói được sử dụng')}`}</h2>
            <div className="quality-control-packing-standard-material-grid">
              {[
                {
                  title: 'Carton',
                  body: 'Bảo vệ sản phẩm trong quá trình lưu kho và vận chuyển.',
                  image: '/assets/quality-control/packing-standard/materials/carton.webp',
                },
                {
                  title: 'Foam bảo vệ',
                  body: 'Giảm thiểu va đập và rung động.',
                  image: '/assets/quality-control/packing-standard/materials/foam.webp',
                },
                {
                  title: 'Corner Protection',
                  body: 'Bảo vệ cạnh và góc sản phẩm.',
                  image: '/assets/quality-control/packing-standard/materials/corner-protection.webp',
                },
                {
                  title: 'Túi bảo vệ',
                  body: 'Giảm trầy xước và bụi bẩn.',
                  image: '/assets/quality-control/packing-standard/materials/protective-bag.webp',
                },
                {
                  title: 'Pallet',
                  body: 'Hỗ trợ lưu kho và bốc xếp.',
                  image: '/assets/quality-control/packing-standard/materials/pallet.webp',
                },
                {
                  title: 'Vật liệu chống ẩm',
                  body: 'Hỗ trợ bảo vệ sản phẩm trong quá trình vận chuyển quốc tế.',
                  image: '/assets/quality-control/packing-standard/materials/moisture-protection.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="quality-control-packing-standard-material-image-slot" aria-hidden="true">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="quality-control-packing-standard-material-copy">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-packing-standard-panel quality-control-packing-standard-types">
            <h2>{`4. ${t('Các hình thức đóng gói')}`}</h2>
            <div className="quality-control-packing-standard-type-grid">
              {[
                {
                  title: 'Knock-down (KD)',
                  body: 'Sản phẩm được tháo rời để tối ưu vận chuyển và lưu kho.',
                  image: '/assets/quality-control/packing-standard/types/knock-down.webp',
                },
                {
                  title: 'Semi Knock-down (SKD)',
                  body: 'Một phần sản phẩm được tháo rời, các phần được lắp ráp sẵn.',
                  image: '/assets/quality-control/packing-standard/types/semi-knock-down.webp',
                },
                {
                  title: 'Fully Assembled',
                  body: 'Sản phẩm hoàn thiện và được giao ở trạng thái lắp ráp hoàn chỉnh.',
                  image: '/assets/quality-control/packing-standard/types/fully-assembled.webp',
                },
                {
                  title: 'Component Packaging',
                  body: 'Đóng gói cấu kiện hoặc bán thành phẩm theo bộ.',
                  image: '/assets/quality-control/packing-standard/types/component-packaging.webp',
                },
                {
                  title: 'Project Packaging',
                  body: 'Đóng gói theo yêu cầu riêng của dự án hoặc buyer.',
                  image: '/assets/quality-control/packing-standard/types/project-packaging.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <h3>{t(item.title)}</h3>
                  <div className="quality-control-packing-standard-type-layout">
                    <div className="quality-control-packing-standard-type-image-slot" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-packing-standard-panel quality-control-packing-standard-process">
            <h2>{`5. ${t('Quy trình kiểm tra đóng gói')}`}</h2>
            <div className="quality-control-packing-standard-process-flow">
              {[
                {
                  title: 'Hoàn thiện sản phẩm',
                  image: '/assets/quality-control/packing-standard/process/finished-product.webp',
                },
                {
                  title: 'Kiểm tra thành phẩm',
                  image: '/assets/quality-control/packing-standard/process/finished-inspection.webp',
                },
                {
                  title: 'Đóng gói',
                  image: '/assets/quality-control/packing-standard/process/packing.webp',
                },
                {
                  title: 'Kiểm tra carton & nhãn',
                  image: '/assets/quality-control/packing-standard/process/carton-label-inspection.webp',
                },
                {
                  title: 'Kiểm tra pallet',
                  image: '/assets/quality-control/packing-standard/process/pallet-inspection.webp',
                },
                {
                  title: 'Kiểm tra container',
                  image: '/assets/quality-control/packing-standard/process/container-inspection.webp',
                },
                {
                  title: 'Xuất hàng',
                  image: '/assets/quality-control/packing-standard/process/shipment.webp',
                },
              ].map((item, index) => (
                <div className="quality-control-packing-standard-process-step-wrap" key={item.title}>
                  <article>
                    <h3>
                      <span>{index + 1}.</span>
                      {t(item.title)}
                    </h3>
                    <div className="quality-control-packing-standard-process-image-slot" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                  </article>
                  {index < 6 && (
                    <span className="quality-control-packing-standard-process-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="quality-control-packing-standard-bottom-row">
            <section className="quality-control-packing-standard-panel quality-control-packing-standard-buyer">
              <h2>{`6. ${t('Tiêu chuẩn đóng gói theo buyer')}`}</h2>
              <div className="quality-control-packing-standard-buyer-layout">
                <div>
                  <p>{t('Mỗi buyer có thể có tiêu chuẩn đóng gói riêng về:')}</p>
                  <ul>
                    {[
                      'Quy cách carton',
                      'Vị trí nhãn',
                      'Cấu trúc pallet',
                      'Bộ phụ kiện',
                      'Hướng dẫn lắp ráp',
                      'Yêu cầu bảo vệ bề mặt',
                      'Tiêu chuẩn vận chuyển',
                    ].map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                  <p>
                    {t(
                      'ANSLIFE hỗ trợ lưu trữ và quản lý các tiêu chuẩn này trong hệ thống hồ sơ dự án và Phòng mẫu chuẩn đối tác.',
                    )}
                  </p>
                </div>
              </div>
            </section>
            <section className="quality-control-packing-standard-panel quality-control-packing-standard-role">
              <h2>{`7. ${t('Vai trò trong hệ thống chất lượng')}`}</h2>
              <div className="quality-control-packing-standard-role-flow">
                {[
                  {
                    title: 'Kiểm tra vật liệu',
                    image: '/assets/quality-control/packing-standard/role/material-inspection.webp',
                  },
                  {
                    title: 'Kiểm tra trong sản xuất',
                    image: '/assets/quality-control/packing-standard/role/production-inspection.webp',
                  },
                  {
                    title: 'Kiểm tra cuối',
                    image: '/assets/quality-control/packing-standard/role/final-inspection.webp',
                  },
                  {
                    title: 'Chuẩn đóng gói',
                    image: '/assets/quality-control/packing-standard/role/packing-standard.webp',
                  },
                  {
                    title: 'Xuất hàng',
                    image: '/assets/quality-control/packing-standard/role/shipment.webp',
                  },
                  {
                    title: 'Giao nhận',
                    image: '/assets/quality-control/packing-standard/role/handover.webp',
                  },
                ].map((item, index) => (
                  <div className="quality-control-packing-standard-role-step-wrap" key={item.title}>
                    <article className={item.title === 'Chuẩn đóng gói' ? 'is-active' : undefined}>
                      <div className="quality-control-packing-standard-role-image-slot" aria-hidden="true">
                        <img src={item.image} alt="" loading="lazy" decoding="async" />
                      </div>
                      <h3>{t(item.title)}</h3>
                    </article>
                    {index < 5 && (
                      <span className="quality-control-packing-standard-role-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </section>
          <section className="quality-control-packing-standard-final-row">
            <section className="quality-control-packing-standard-panel quality-control-packing-standard-risks">
              <h2>{`8. ${t('Các rủi ro cần hạn chế')}`}</h2>
              <div className="quality-control-packing-standard-risk-flow">
                {[
                  {
                    title: 'Trầy xước',
                    image: '/assets/quality-control/packing-standard/risks/scratches.webp',
                  },
                  {
                    title: 'Va đập',
                    image: '/assets/quality-control/packing-standard/risks/impact.webp',
                  },
                  {
                    title: 'Thiếu phụ kiện',
                    image: '/assets/quality-control/packing-standard/risks/missing-accessories.webp',
                  },
                  {
                    title: 'Sai nhãn',
                    image: '/assets/quality-control/packing-standard/risks/wrong-label.webp',
                  },
                  {
                    title: 'Hư hỏng trong vận chuyển',
                    image: '/assets/quality-control/packing-standard/risks/transport-damage.webp',
                  },
                  {
                    title: 'Khiếu nại khách hàng',
                    image: '/assets/quality-control/packing-standard/risks/customer-complaint.webp',
                  },
                ].map((item, index) => (
                  <div className="quality-control-packing-standard-risk-step-wrap" key={item.title}>
                    <article>
                      <div className="quality-control-packing-standard-risk-image-slot" aria-hidden="true">
                        <img src={item.image} alt="" loading="lazy" decoding="async" />
                      </div>
                      <h3>{t(item.title)}</h3>
                    </article>
                    {index < 5 && (
                      <span className="quality-control-packing-standard-risk-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <section className="quality-control-packing-standard-panel quality-control-packing-standard-supply-hub">
              <h2>{`9. ${t('Liên kết với Supply Hub Việt Nam')}`}</h2>
              <div className="quality-control-packing-standard-supply-hub-copy">
                <p>
                  {t(
                    'Chuẩn đóng gói không chỉ phục vụ xuất khẩu trực tiếp mà còn hỗ trợ hoạt động lưu kho, gom hàng, tồn kho đệm và điều phối xuất hàng trong mô hình Supply Hub Việt Nam của ANSLIFE.',
                  )}
                </p>
              </div>
            </section>
          </section>
          <section className="quality-control-packing-standard-panel quality-control-packing-standard-cta">
            <div className="quality-control-packing-standard-cta-image-slot" aria-hidden="true">
              <img
                src="/assets/quality-control/packing-standard/cta/project-packing-standard.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="quality-control-packing-standard-cta-copy">
              <h2>{t('Trao đổi về tiêu chuẩn đóng gói của dự án')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi tiêu chuẩn đóng gói, quy cách carton, yêu cầu pallet hoặc hướng dẫn vận chuyển để ANSLIFE đánh giá và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="quality-control-packing-standard-cta-actions">
                <a className="is-primary" href="/vn/contact/upload-drawing">
                  <span className="quality-control-packing-standard-cta-icon quality-control-packing-standard-cta-icon--upload" aria-hidden="true" />
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact/upload-drawing">
                  <span className="quality-control-packing-standard-cta-icon quality-control-packing-standard-cta-icon--document" aria-hidden="true" />
                  {t('Tải tiêu chuẩn đóng gói')}
                </a>
                <a href="/vn/contact">
                  <span className="quality-control-packing-standard-cta-icon quality-control-packing-standard-cta-icon--phone" aria-hidden="true" />
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {shouldShowQualityControlInspectionReportBanner && (
        <figure className="quality-control-inspection-report-banner">
          <img
            src="/assets/quality-control-inspection-report-banner.png"
            alt={t('Banner báo cáo kiểm tra')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-inspection-report-banner-copy">
            <h1>{t('Báo cáo kiểm tra')}</h1>
            <p>
              {t(
                'ANSLIFE ghi nhận kết quả kiểm tra bằng hồ sơ rõ ràng, hình ảnh thực tế và nhận xét kiểm soát chất lượng để buyer theo dõi tình trạng sản phẩm trước khi xuất hàng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isQualityControlInspectionReportPage && (
        <section
          className="quality-control-inspection-report-content"
          aria-labelledby="quality-control-inspection-report-stages-title"
        >
          <section className="quality-control-inspection-report-panel quality-control-inspection-report-stages">
            <h2 id="quality-control-inspection-report-stages-title">
              {`1. ${t('Báo cáo được thực hiện ở những giai đoạn nào?')}`}
            </h2>
            <div className="quality-control-inspection-report-stage-flow">
              {[
                {
                  title: 'Kiểm tra vật liệu',
                  image: '/assets/quality-control/inspection-report/stages/material-inspection.webp',
                },
                {
                  title: 'Kiểm tra trong sản xuất',
                  image: '/assets/quality-control/inspection-report/stages/production-inspection.webp',
                },
                {
                  title: 'Kiểm tra hoàn thiện bề mặt',
                  image: '/assets/quality-control/inspection-report/stages/surface-finish-inspection.webp',
                },
                {
                  title: 'Kiểm tra cuối',
                  image: '/assets/quality-control/inspection-report/stages/final-inspection.webp',
                },
                {
                  title: 'Kiểm tra đóng gói',
                  image: '/assets/quality-control/inspection-report/stages/packing-inspection.webp',
                },
                {
                  title: 'Xuất hàng',
                  image: '/assets/quality-control/inspection-report/stages/shipment.webp',
                },
                {
                  title: 'Báo cáo chất lượng',
                  image: '/assets/quality-control/inspection-report/stages/quality-report.webp',
                },
              ].map((item, index) => (
                <div className="quality-control-inspection-report-stage-step-wrap" key={item.title}>
                  <article>
                    <div className="quality-control-inspection-report-stage-image-slot" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(item.title)}</h3>
                  </article>
                  {index < 6 && (
                    <span className="quality-control-inspection-report-stage-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="quality-control-inspection-report-panel quality-control-inspection-report-contents">
            <h2>{`2. ${t('Nội dung của một báo cáo kiểm tra')}`}</h2>
            <div className="quality-control-inspection-report-content-grid">
              {[
                {
                  number: '01',
                  title: 'Thông tin dự án',
                  image: '/assets/quality-control/inspection-report/contents/project-information.webp',
                  bullets: [
                    'Ghi nhận các thông tin cơ bản của dự án và lô hàng được kiểm tra.',
                    'Bao gồm: Tên dự án, Buyer, Nhà máy, Mã sản phẩm, Ngày kiểm tra, Người thực hiện.',
                  ],
                },
                {
                  number: '02',
                  title: 'Kết quả kiểm tra',
                  image: '/assets/quality-control/inspection-report/contents/inspection-results.webp',
                  bullets: [
                    'Tổng hợp các nội dung đã được đánh giá trong quá trình kiểm tra.',
                    'Bao gồm: Kích thước, Kết cấu, Hoàn thiện, Chức năng, Đóng gói, Số lượng.',
                  ],
                },
                {
                  number: '03',
                  title: 'Hình ảnh kiểm tra',
                  image: '/assets/quality-control/inspection-report/contents/inspection-photos.webp',
                  bullets: [
                    'Lưu trữ hình ảnh thực tế tại thời điểm kiểm tra nhằm hỗ trợ đối chiếu và truy xuất.',
                    'Bao gồm: Hình sản phẩm, Hình lỗi nếu có, Hình đóng gói, Hình container, Hình kiểm tra thực tế.',
                  ],
                },
                {
                  number: '04',
                  title: 'Sai lệch và ghi chú',
                  image: '/assets/quality-control/inspection-report/contents/deviations-notes.webp',
                  bullets: [
                    'Ghi nhận các điểm chưa phù hợp hoặc các nội dung cần theo dõi.',
                    'Bao gồm: Mô tả sai lệch, Mức độ ảnh hưởng, Đề xuất xử lý, Tình trạng khắc phục.',
                  ],
                },
                {
                  number: '05',
                  title: 'Kết luận kiểm tra',
                  image: '/assets/quality-control/inspection-report/contents/inspection-conclusion.webp',
                  bullets: [
                    'Đưa ra đánh giá tổng thể về tình trạng của lô hàng hoặc sản phẩm được kiểm tra.',
                    'Ví dụ: Đạt yêu cầu, Đạt có điều kiện, Cần khắc phục, Không đạt.',
                  ],
                },
                {
                  number: '06',
                  title: 'Hồ sơ lưu trữ',
                  image: '/assets/quality-control/inspection-report/contents/archived-records.webp',
                  bullets: [
                    'Lưu trữ kết quả kiểm tra nhằm phục vụ truy xuất và các đơn hàng lặp lại.',
                  ],
                },
              ].map((item) => (
                <article key={item.number}>
                  <h3>
                    <span>{item.number}.</span>
                    {t(item.title)}
                  </h3>
                  <div className="quality-control-inspection-report-content-image-slot" aria-hidden="true">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{t(bullet)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-inspection-report-panel quality-control-inspection-report-types">
            <h2>{`3. ${t('Các loại báo cáo ANSLIFE có thể cung cấp')}`}</h2>
            <div className="quality-control-inspection-report-type-grid">
              {[
                {
                  title: 'Báo cáo kiểm tra vật liệu',
                  body: 'Ghi nhận kết quả đánh giá vật liệu trước sản xuất.',
                  image: '/assets/quality-control/inspection-report/types/material-inspection-report.webp',
                },
                {
                  title: 'Báo cáo kiểm tra trong sản xuất',
                  body: 'Ghi nhận kết quả kiểm tra tại các công đoạn sản xuất.',
                  image: '/assets/quality-control/inspection-report/types/in-process-inspection-report.webp',
                },
                {
                  title: 'Báo cáo hoàn thiện bề mặt',
                  body: 'Đánh giá màu sắc, độ bóng, độ đồng đều và chất lượng bề mặt.',
                  image: '/assets/quality-control/inspection-report/types/surface-finish-report.webp',
                },
                {
                  title: 'Báo cáo kiểm tra cuối',
                  body: 'Đánh giá thành phẩm trước khi đóng gói hoặc xuất hàng.',
                  image: '/assets/quality-control/inspection-report/types/final-inspection-report.webp',
                },
                {
                  title: 'Báo cáo đóng gói',
                  body: 'Xác nhận tình trạng đóng gói, nhãn mác và chuẩn bị xuất hàng.',
                  image: '/assets/quality-control/inspection-report/types/packing-report.webp',
                },
                {
                  title: 'Báo cáo QC độc lập',
                  body: 'Báo cáo được thực hiện bởi hoạt động kiểm tra độc lập theo yêu cầu của dự án hoặc buyer.',
                  image: '/assets/quality-control/inspection-report/types/independent-qc-report.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <h3>{t(item.title)}</h3>
                  <div className="quality-control-inspection-report-type-image-slot" aria-hidden="true">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-inspection-report-panel quality-control-inspection-report-structure">
            <h2>{`4. ${t('Cấu trúc một báo cáo điển hình')}`}</h2>
            <div className="quality-control-inspection-report-structure-flow">
              {[
                {
                  title: 'Thông tin dự án',
                  image: '/assets/quality-control/inspection-report/structure/project-information.webp',
                },
                {
                  title: 'Phạm vi kiểm tra',
                  image: '/assets/quality-control/inspection-report/structure/inspection-scope.webp',
                },
                {
                  title: 'Kết quả kiểm tra',
                  image: '/assets/quality-control/inspection-report/structure/inspection-results.webp',
                },
                {
                  title: 'Hình ảnh minh chứng',
                  image: '/assets/quality-control/inspection-report/structure/evidence-photos.webp',
                },
                {
                  title: 'Sai lệch & hành động khắc phục',
                  image: '/assets/quality-control/inspection-report/structure/deviation-corrective-action.webp',
                },
                {
                  title: 'Kết luận',
                  image: '/assets/quality-control/inspection-report/structure/conclusion.webp',
                },
                {
                  title: 'Lưu hồ sơ',
                  image: '/assets/quality-control/inspection-report/structure/record-archive.webp',
                },
              ].map((item, index) => (
                <div className="quality-control-inspection-report-structure-step-wrap" key={item.title}>
                  <article>
                    <div className="quality-control-inspection-report-structure-image-slot" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(item.title)}</h3>
                  </article>
                  {index < 6 && (
                    <span className="quality-control-inspection-report-structure-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="quality-control-inspection-report-panel quality-control-inspection-report-support">
            <h2>{`5. ${t('Báo cáo hỗ trợ điều gì?')}`}</h2>
            <div className="quality-control-inspection-report-support-grid">
              {[
                {
                  title: 'Minh bạch',
                  body: 'Buyer có thể theo dõi kết quả kiểm tra một cách rõ ràng.',
                  image: '/assets/quality-control/inspection-report/support/transparency.webp',
                },
                {
                  title: 'Truy xuất',
                  body: 'Dễ dàng đối chiếu giữa các lô hàng và các đợt sản xuất.',
                  image: '/assets/quality-control/inspection-report/support/traceability.webp',
                },
                {
                  title: 'Kiểm soát rủi ro',
                  body: 'Phát hiện và xử lý các sai lệch trước khi giao hàng.',
                  image: '/assets/quality-control/inspection-report/support/risk-control.webp',
                },
                {
                  title: 'Duy trì tiêu chuẩn',
                  body: 'Hỗ trợ quản lý chất lượng cho các đơn hàng lặp lại.',
                  image: '/assets/quality-control/inspection-report/support/maintain-standards.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="quality-control-inspection-report-support-image-slot" aria-hidden="true">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="quality-control-inspection-report-support-copy">
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-inspection-report-panel quality-control-inspection-report-system">
            <h2>{`6. ${t('Liên kết với hệ thống chất lượng')}`}</h2>
            <div className="quality-control-inspection-report-system-flow">
              {[
                {
                  title: 'Kiểm tra vật liệu',
                  image: '/assets/quality-control/inspection-report/system/material-inspection.webp',
                },
                {
                  title: 'Kiểm tra trong sản xuất',
                  image: '/assets/quality-control/inspection-report/system/production-inspection.webp',
                },
                {
                  title: 'Kiểm tra cuối',
                  image: '/assets/quality-control/inspection-report/system/final-inspection.webp',
                },
                {
                  title: 'Chuẩn đóng gói',
                  image: '/assets/quality-control/inspection-report/system/packing-standard.webp',
                },
                {
                  title: 'Báo cáo kiểm tra',
                  image: '/assets/quality-control/inspection-report/system/inspection-report.webp',
                },
                {
                  title: 'Lưu hồ sơ chất lượng',
                  image: '/assets/quality-control/inspection-report/system/quality-record-archive.webp',
                },
              ].map((item, index) => (
                <div className="quality-control-inspection-report-system-step-wrap" key={item.title}>
                  <article>
                    <div className="quality-control-inspection-report-system-image-slot" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(item.title)}</h3>
                  </article>
                  {index < 5 && (
                    <span className="quality-control-inspection-report-system-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="quality-control-inspection-report-panel quality-control-inspection-report-standard-room">
            <div className="quality-control-inspection-report-standard-room-copy">
              <h2>{`7. ${t('Liên kết với Phòng mẫu chuẩn đối tác')}`}</h2>
              <p>
                {t(
                  'Các báo cáo kiểm tra được lưu cùng với mẫu duyệt, bản vẽ kỹ thuật, bảng màu, tiêu chuẩn đóng gói và checklist QC nhằm hỗ trợ truy xuất và duy trì tính nhất quán cho các dự án dài hạn.',
                )}
              </p>
            </div>
            <div className="quality-control-inspection-report-standard-room-image-slot" aria-hidden="true">
              <img
                src="/assets/quality-control/inspection-report/standard-room/partner-standard-room.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>
          <section className="quality-control-inspection-report-panel quality-control-inspection-report-cta">
            <div className="quality-control-inspection-report-cta-image-slot quality-control-inspection-report-cta-image-slot--left" aria-hidden="true">
              <img
                src="/assets/quality-control/inspection-report/cta/report-requirements-left.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="quality-control-inspection-report-cta-copy">
              <h2>{t('Trao đổi về yêu cầu báo cáo chất lượng của dự án')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi yêu cầu về biểu mẫu báo cáo, checklist QC hoặc tiêu chuẩn đánh giá để ANSLIFE xây dựng hệ thống báo cáo phù hợp với từng dự án.',
                )}
              </p>
              <div className="quality-control-inspection-report-cta-actions">
                <a className="is-primary" href="/vn/contact/upload-drawing">
                  <span className="quality-control-inspection-report-cta-icon quality-control-inspection-report-cta-icon--upload" aria-hidden="true" />
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact/upload-drawing">
                  <span className="quality-control-inspection-report-cta-icon quality-control-inspection-report-cta-icon--document" aria-hidden="true" />
                  {t('Tải tài liệu kỹ thuật')}
                </a>
                <a href="/vn/contact">
                  <span className="quality-control-inspection-report-cta-icon quality-control-inspection-report-cta-icon--phone" aria-hidden="true" />
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
            <div className="quality-control-inspection-report-cta-image-slot quality-control-inspection-report-cta-image-slot--right" aria-hidden="true">
              <img
                src="/assets/quality-control/inspection-report/cta/report-requirements-right.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>
        </section>
      )}
      {isQualityControlMoistureControlPage && (
        <section
          className="quality-control-moisture-control-content"
          aria-labelledby="quality-control-moisture-control-importance-title"
        >
          <section className="quality-control-moisture-control-panel quality-control-moisture-control-importance">
            <h2 id="quality-control-moisture-control-importance-title">
              <span>1</span>
              {t('VÌ SAO ĐỘ ẨM QUAN TRỌNG?')}
            </h2>
            <div className="quality-control-moisture-control-importance-flow">
              {[
                ['Độ ẩm không ổn định', '/assets/quality-control/moisture-control/importance-unstable-moisture.webp'],
                ['Co ngót hoặc giãn nở', '/assets/quality-control/moisture-control/importance-shrink-expand.webp'],
                ['Sai lệch kích thước', '/assets/quality-control/moisture-control/importance-size-deviation.webp'],
                ['Cong vênh / nứt', '/assets/quality-control/moisture-control/importance-warp-crack.webp'],
                ['Ảnh hưởng lắp ráp', '/assets/quality-control/moisture-control/importance-assembly.webp'],
                [
                  'Ảnh hưởng hoàn thiện bề mặt',
                  '/assets/quality-control/moisture-control/importance-surface-finish.webp',
                ],
                [
                  'Khiếu nại chất lượng',
                  '/assets/quality-control/moisture-control/importance-quality-complaint.webp',
                ],
              ].map(([item, image]) => (
                <article key={item}>
                  <img
                    className="quality-control-moisture-control-importance-image"
                    src={image}
                    alt={t(item)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(item)}</h3>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-moisture-control-panel quality-control-moisture-control-effects">
            <h2>
              <span>2</span>
              {t('ĐỘ ẨM ẢNH HƯỞNG TỚI NHỮNG GÌ?')}
            </h2>
            <div className="quality-control-moisture-control-effect-grid">
              {[
                {
                  title: 'Kích thước',
                  text: 'Ảnh hưởng đến độ chính xác của chi tiết và sản phẩm hoàn thiện.',
                  image: '/assets/quality-control/moisture-control/effect-dimensions.webp',
                },
                {
                  title: 'Kết cấu',
                  text: 'Ảnh hưởng đến độ ổn định và khả năng chịu lực của sản phẩm.',
                  image: '/assets/quality-control/moisture-control/effect-structure.webp',
                },
                {
                  title: 'Mộng & liên kết',
                  text: 'Có thể làm lỏng hoặc siết các điểm liên kết.',
                  image: '/assets/quality-control/moisture-control/effect-joints.webp',
                },
                {
                  title: 'Hoàn thiện bề mặt',
                  text: 'Có thể ảnh hưởng đến độ bám, độ ổn định và tính bóng đều của lớp hoàn thiện.',
                  image: '/assets/quality-control/moisture-control/effect-surface-finish.webp',
                },
                {
                  title: 'Đóng gói',
                  text: 'Độ ẩm cao có thể ảnh hưởng đến tình trạng sản phẩm trong quá trình lưu kho và vận chuyển.',
                  image: '/assets/quality-control/moisture-control/effect-packing.webp',
                },
                {
                  title: 'Trải nghiệm sử dụng',
                  text: 'Ảnh hưởng đến độ ổn định của sản phẩm sau khi giao đến khách hàng cuối cùng.',
                  image: '/assets/quality-control/moisture-control/effect-user-experience.webp',
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <img
                    className="quality-control-moisture-control-effect-image"
                    src={item.image}
                    alt={t(item.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>
                    <span>{index + 1}.</span>
                    {t(item.title)}
                  </h3>
                  <p>{t(item.text)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-moisture-control-panel quality-control-moisture-control-points">
            <h2>
              <span>3</span>
              {t('ĐỘ ẨM ĐƯỢC KIỂM SOÁT Ở ĐÂU?')}
            </h2>
            <div className="quality-control-moisture-control-point-flow">
              {[
                {
                  title: 'Vật liệu đầu vào',
                  text: 'Kiểm tra tình trạng vật liệu trước khi đưa vào sản xuất.',
                  checks: ['Độ ẩm vật liệu', 'Điều kiện lưu kho', 'Sự đồng đều giữa các lô'],
                  image: '/assets/quality-control/moisture-control/point-input-material.webp',
                },
                {
                  title: 'Lưu kho vật liệu',
                  text: 'Theo dõi và quản lý điều kiện lưu kho nhằm hạn chế biến động độ ẩm.',
                  checks: ['Điều kiện kho', 'Thời gian lưu kho', 'Tình trạng vật liệu'],
                  image: '/assets/quality-control/moisture-control/point-material-storage.webp',
                },
                {
                  title: 'Gia công',
                  text: 'Đảm bảo vật liệu phù hợp với yêu cầu của từng công đoạn gia công và lắp ráp.',
                  checks: ['Chi tiết gia công', 'Cấu kiện', 'Khung sản phẩm'],
                  image: '/assets/quality-control/moisture-control/point-machining.webp',
                },
                {
                  title: 'Lắp ráp',
                  text: 'Đảm bảo vật liệu ở trạng thái phù hợp trước khi thực hiện stain, sơn hoặc hoàn thiện.',
                  checks: ['Bề mặt vật liệu', 'Độ ổn định vật liệu', 'Điều kiện trước hoàn thiện'],
                  image: '/assets/quality-control/moisture-control/point-assembly.webp',
                },
                {
                  title: 'Hoàn thiện bề mặt',
                  text: 'Xác nhận sản phẩm ổn định trước khi lưu kho hoặc vận chuyển.',
                  checks: [],
                  image: '/assets/quality-control/moisture-control/point-surface-finish.webp',
                },
                {
                  title: 'Đóng gói',
                  text: '',
                  checks: [],
                  image: '/assets/quality-control/moisture-control/point-packing.webp',
                },
                {
                  title: 'Xuất hàng',
                  text: '',
                  checks: [],
                  image: '/assets/quality-control/moisture-control/point-export.webp',
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <span className="quality-control-moisture-control-point-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <img
                    className="quality-control-moisture-control-point-image"
                    src={item.image}
                    alt={t(item.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(item.title)}</h3>
                  {item.text && <p>{t(item.text)}</p>}
                  {item.checks.length > 0 && (
                    <ul>
                      {item.checks.map((check) => (
                        <li key={check}>{t(check)}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-moisture-control-panel quality-control-moisture-control-materials">
            <h2>
              <span>4</span>
              {t('CÁC NHÓM VẬT LIỆU ĐƯỢC KIỂM SOÁT')}
            </h2>
            <div className="quality-control-moisture-control-material-grid">
              {[
                [
                  'Gỗ tự nhiên',
                  'Theo dõi và kiểm soát độ ẩm nhằm duy trì độ ổn định của vật liệu.',
                  '/assets/quality-control/moisture-control/material-solid-wood.webp',
                ],
                [
                  'Veneer',
                  'Kiểm soát tình trạng vật liệu trước khi ghép và hoàn thiện.',
                  '/assets/quality-control/moisture-control/material-veneer.webp',
                ],
                [
                  'Plywood',
                  'Theo dõi tính ổn định và khả năng sử dụng trong sản xuất.',
                  '/assets/quality-control/moisture-control/material-plywood.webp',
                ],
                [
                  'MDF',
                  'Đánh giá tình trạng vật liệu trước khi gia công và hoàn thiện.',
                  '/assets/quality-control/moisture-control/material-mdf.webp',
                ],
                [
                  'Mây tre & vật liệu tự nhiên',
                  'Kiểm soát điều kiện lưu kho và khả năng sử dụng trong sản xuất.',
                  '/assets/quality-control/moisture-control/material-rattan-natural.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title}>
                  <img
                    className="quality-control-moisture-control-material-image"
                    src={image}
                    alt={t(title)}
                    loading="lazy"
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
          <section className="quality-control-moisture-control-panel quality-control-moisture-control-methods">
            <h2>
              <span>5</span>
              {t('CÔNG CỤ VÀ PHƯƠNG PHÁP KIỂM SOÁT')}
            </h2>
            <div className="quality-control-moisture-control-method-grid">
              {[
                [
                  'Đo kiểm định kỳ',
                  'Theo dõi độ ẩm tại các giai đoạn quan trọng của sản xuất.',
                  '/assets/quality-control/moisture-control/method-periodic-measurement.webp',
                ],
                [
                  'Theo dõi lưu kho',
                  'Quản lý điều kiện lưu kho vật liệu và sản phẩm.',
                  '/assets/quality-control/moisture-control/method-storage-monitoring.webp',
                ],
                [
                  'Đối chiếu hồ sơ',
                  'Lưu thông tin phục vụ truy xuất và đánh giá chất lượng.',
                  '/assets/quality-control/moisture-control/method-record-comparison.webp',
                ],
                [
                  'Kết hợp với QC',
                  'Kết quả kiểm tra độ ẩm được tích hợp vào hệ thống kiểm soát chất lượng tổng thể.',
                  '/assets/quality-control/moisture-control/method-qc-integration.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title}>
                  <img
                    className="quality-control-moisture-control-method-image"
                    src={image}
                    alt={t(title)}
                    loading="lazy"
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
          <section className="quality-control-moisture-control-panel quality-control-moisture-control-system">
            <h2>
              <span>6</span>
              {t('LIÊN KẾT VỚI HỆ THỐNG CHẤT LƯỢNG')}
            </h2>
            <div className="quality-control-moisture-control-system-flow">
              {[
                ['Kiểm tra vật liệu', '/assets/quality-control/moisture-control/system-material-inspection.webp'],
                ['Kiểm soát độ ẩm', '/assets/quality-control/moisture-control/system-moisture-control.webp'],
                ['Kiểm tra trong sản xuất', '/assets/quality-control/moisture-control/system-in-process.webp'],
                ['Hoàn thiện bề mặt', '/assets/quality-control/moisture-control/system-surface-finish.webp'],
                ['Kiểm tra cuối', '/assets/quality-control/moisture-control/system-final-inspection.webp'],
                ['Đóng gói & xuất hàng', '/assets/quality-control/moisture-control/system-packing-export.webp'],
              ].map(([item, image]) => (
                <article key={item}>
                  <img
                    className="quality-control-moisture-control-system-image"
                    src={image}
                    alt={t(item)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(item)}</h3>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-moisture-control-panel quality-control-moisture-control-risks">
            <h2>
              <span>7</span>
              {t('NHỮNG RỦI RO CẦN HẠN CHẾ')}
            </h2>
            <div className="quality-control-moisture-control-risk-grid">
              {[
                ['Cong vênh', '/assets/quality-control/moisture-control/risk-warping.webp'],
                ['Nứt', '/assets/quality-control/moisture-control/risk-cracking.webp'],
                ['Co ngót', '/assets/quality-control/moisture-control/risk-shrinkage.webp'],
                ['Biến dạng', '/assets/quality-control/moisture-control/risk-deformation.webp'],
                ['Lệch kích thước', '/assets/quality-control/moisture-control/risk-size-deviation.webp'],
                ['Ảnh hưởng hoàn thiện', '/assets/quality-control/moisture-control/risk-finish-impact.webp'],
                ['Ảnh hưởng lắp ráp', '/assets/quality-control/moisture-control/risk-assembly-impact.webp'],
                ['Khiếu nại chất lượng', '/assets/quality-control/moisture-control/risk-quality-complaint.webp'],
              ].map(([item, image]) => (
                <article key={item}>
                  <img
                    className="quality-control-moisture-control-risk-image"
                    src={image}
                    alt={t(item)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(item)}</h3>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-moisture-control-panel quality-control-moisture-control-cta">
            <img
              className="quality-control-moisture-control-cta-image"
              src="/assets/quality-control/moisture-control/cta-moisture-control.webp"
              alt={t('Trao đổi về yêu cầu kiểm soát độ ẩm của dự án')}
              loading="lazy"
              decoding="async"
            />
            <div className="quality-control-moisture-control-cta-copy">
              <h2>{t('Trao đổi về yêu cầu kiểm soát độ ẩm của dự án')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi yêu cầu kỹ thuật, tiêu chuẩn chất lượng hoặc điều kiện sử dụng của sản phẩm để ANSLIFE đánh giá và đề xuất phương án kiểm soát phù hợp.',
                )}
              </p>
            </div>
            <div className="quality-control-moisture-control-cta-actions">
              <a className="is-primary" href="/vn/contact">
                {t('Gửi yêu cầu')}
              </a>
              <a href="/vn/contact">{t('Tải tài liệu kỹ thuật')}</a>
              <a href="/vn/contact">{t('Liên hệ ANSLIFE')}</a>
            </div>
          </section>
        </section>
      )}
      {isQualityControlApprovedSampleControlPage && (
        <section
          className="quality-control-approved-sample-control-content"
          aria-labelledby="quality-control-approved-sample-control-definition-title"
        >
          <section className="quality-control-approved-sample-control-panel quality-control-approved-sample-control-definition">
            <h2 id="quality-control-approved-sample-control-definition-title">
              <span>1</span>
              {t('Mẫu duyệt là gì?')}
            </h2>
            <div className="quality-control-approved-sample-control-equation">
              {[
                [
                  'Bản vẽ kỹ thuật',
                  '/assets/quality-control/approved-sample-control/definition-technical-drawing.webp',
                ],
                [
                  'Mẫu sản phẩm',
                  '/assets/quality-control/approved-sample-control/definition-product-sample.webp',
                ],
                [
                  'Mẫu vật liệu',
                  '/assets/quality-control/approved-sample-control/definition-material-sample.webp',
                ],
                ['Mẫu màu', '/assets/quality-control/approved-sample-control/definition-color-sample.webp'],
                [
                  'Tiêu chuẩn đóng gói',
                  '/assets/quality-control/approved-sample-control/definition-packing-standard.webp',
                ],
              ].map(([item, image]) => (
                <div className="quality-control-approved-sample-control-equation-item" key={item}>
                  <img
                    className="quality-control-approved-sample-control-image"
                    src={image}
                    alt={t(item)}
                    loading="lazy"
                    decoding="async"
                  />
                  <p>{t(item)}</p>
                </div>
              ))}
              <span className="quality-control-approved-sample-control-equation-sign">=</span>
              <div className="quality-control-approved-sample-control-equation-result">
                <img
                  className="quality-control-approved-sample-control-image"
                  src="/assets/quality-control/approved-sample-control/definition-approved-project.webp"
                  alt={t('Mẫu duyệt dự án')}
                  loading="lazy"
                  decoding="async"
                />
                <p>{t('Mẫu duyệt dự án')}</p>
              </div>
            </div>
          </section>
          <section className="quality-control-approved-sample-control-panel quality-control-approved-sample-control-types">
            <h2>
              <span>2</span>
              {t('Những loại mẫu nào được kiểm soát?')}
            </h2>
            <div className="quality-control-approved-sample-control-type-grid">
              {[
                {
                  title: 'Mẫu sản phẩm',
                  text: 'Mẫu hoàn chỉnh đã được buyer phê duyệt trước khi triển khai sản xuất.',
                  example: 'Ghế, Bàn, Tủ, Giường, Nội thất dự án',
                  image: '/assets/quality-control/approved-sample-control/type-product-sample.webp',
                },
                {
                  title: 'Mẫu vật liệu',
                  text: 'Các vật liệu được sử dụng trong sản phẩm đã được xác nhận bởi buyer.',
                  example: 'Gỗ, Veneer, Foam, Vải, Da, Mây tre',
                  image: '/assets/quality-control/approved-sample-control/type-material-sample.webp',
                },
                {
                  title: 'Mẫu màu & hoàn thiện',
                  text: 'Các tiêu chuẩn màu sắc và hoàn thiện bề mặt đã được duyệt.',
                  example: 'Stain, Lacquer, Oil finish, Matte finish, Gloss finish',
                  image: '/assets/quality-control/approved-sample-control/type-color-finish.webp',
                },
                {
                  title: 'Mẫu cấu kiện',
                  text: 'Các bộ phận và cấu kiện được xác nhận trước khi sản xuất hàng loạt.',
                  example: 'Khung ghế, Chân bàn, Tay ghế, Bộ phận tủ, Bộ phận giường',
                  image: '/assets/quality-control/approved-sample-control/type-component-sample.webp',
                },
                {
                  title: 'Mẫu đóng gói',
                  text: 'Tiêu chuẩn đóng gói được sử dụng cho từng sản phẩm hoặc dự án.',
                  example: 'Carton, Foam bảo vệ, Pallet, Nhãn mác',
                  image: '/assets/quality-control/approved-sample-control/type-packing-sample.webp',
                },
                {
                  title: 'Tài liệu kỹ thuật',
                  text: 'Các tài liệu được sử dụng làm cơ sở đối chiếu trong toàn bộ dự án.',
                  example: 'Bản vẽ kỹ thuật, BOM, Checklist QC, Tiêu chuẩn buyer',
                  image: '/assets/quality-control/approved-sample-control/type-technical-document.webp',
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <img
                    className="quality-control-approved-sample-control-card-image"
                    src={item.image}
                    alt={t(item.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>
                      <span>{String(index + 1).padStart(2, '0')}.</span>
                      {t(item.title)}
                    </h3>
                    <p>{t(item.text)}</p>
                    <b>{t('Ví dụ:')}</b>
                    <small>{t(item.example)}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-approved-sample-control-panel quality-control-approved-sample-control-process">
            <h2>
              <span>3</span>
              {t('Quy trình kiểm soát mẫu duyệt')}
            </h2>
            <div className="quality-control-approved-sample-control-process-grid">
              {[
                {
                  title: 'Xác nhận mẫu',
                  text: 'Mẫu được xác nhận giữa buyer, ANSLIFE và các bên liên quan trước khi triển khai sản xuất.',
                  image: '/assets/quality-control/approved-sample-control/process-confirm-sample.webp',
                },
                {
                  title: 'Lưu mẫu chuẩn',
                  text: 'Mẫu được lưu giữ và quản lý như tiêu chuẩn tham chiếu của dự án.',
                  image: '/assets/quality-control/approved-sample-control/process-store-standard.webp',
                },
                {
                  title: 'Triển khai sản xuất',
                  text: 'Sản xuất được triển khai theo kế hoạch đã thống nhất và mẫu đã được phê duyệt.',
                  image: '/assets/quality-control/approved-sample-control/process-production.webp',
                },
                {
                  title: 'Đối chiếu trong sản xuất',
                  text: 'Các công đoạn sản xuất được đối chiếu liên tục với mẫu chuẩn nhằm giảm thiểu sai lệch.',
                  image: '/assets/quality-control/approved-sample-control/process-production-comparison.webp',
                },
                {
                  title: 'Đối chiếu khi kiểm tra cuối',
                  text: 'Thành phẩm được so sánh với mẫu đã duyệt trước khi giao hàng.',
                  image: '/assets/quality-control/approved-sample-control/process-final-inspection.webp',
                },
                {
                  title: 'Lưu trữ cho đơn hàng lặp lại',
                  text: 'Mẫu chuẩn được duy trì để phục vụ các đợt sản xuất tiếp theo.',
                  image: '/assets/quality-control/approved-sample-control/process-repeat-order-storage.webp',
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <span className="quality-control-approved-sample-control-process-number">
                    {index + 1}
                  </span>
                  <img
                    className="quality-control-approved-sample-control-process-image"
                    src={item.image}
                    alt={t(item.title)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.text)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-approved-sample-control-panel quality-control-approved-sample-control-storage">
            <h2>
              <span>4</span>
              {t('Hệ thống lưu trữ mẫu của ANSLIFE')}
            </h2>
            <div className="quality-control-approved-sample-control-storage-grid">
              {[
                [
                  'Mẫu vật lý',
                  'Lưu giữ sản phẩm hoặc chi tiết mẫu thực tế.',
                  '/assets/quality-control/approved-sample-control/storage-physical-sample.webp',
                ],
                [
                  'Hồ sơ kỹ thuật',
                  'Lưu bản vẽ, BOM và tài liệu liên quan.',
                  '/assets/quality-control/approved-sample-control/storage-technical-record.webp',
                ],
                [
                  'Bảng màu & hoàn thiện',
                  'Lưu tiêu chuẩn màu sắc và hoàn thiện đã được phê duyệt.',
                  '/assets/quality-control/approved-sample-control/storage-color-finish.webp',
                ],
                [
                  'Hồ sơ chất lượng',
                  'Lưu checklist QC và tiêu chuẩn kiểm tra của dự án.',
                  '/assets/quality-control/approved-sample-control/storage-quality-record.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title}>
                  <img
                    className="quality-control-approved-sample-control-storage-image"
                    src={image}
                    alt={t(title)}
                    loading="lazy"
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
          <section className="quality-control-approved-sample-control-panel quality-control-approved-sample-control-risks">
            <h2>
              <span>5</span>
              {t('Rủi ro khi không kiểm soát mẫu duyệt')}
            </h2>
            <div className="quality-control-approved-sample-control-risk-flow">
              {[
                ['Sai vật liệu', '/assets/quality-control/approved-sample-control/risk-wrong-material.webp'],
                ['Sai màu sắc', '/assets/quality-control/approved-sample-control/risk-wrong-color.webp'],
                ['Sai kết cấu', '/assets/quality-control/approved-sample-control/risk-wrong-structure.webp'],
                ['Sai đóng gói', '/assets/quality-control/approved-sample-control/risk-wrong-packing.webp'],
                [
                  'Khiếu nại chất lượng',
                  '/assets/quality-control/approved-sample-control/risk-quality-complaint.webp',
                ],
                ['Chậm giao hàng', '/assets/quality-control/approved-sample-control/risk-late-delivery.webp'],
              ].map(([item, image]) => (
                <article key={item}>
                  <h3>{t(item)}</h3>
                  <img
                    className="quality-control-approved-sample-control-risk-image"
                    src={image}
                    alt={t(item)}
                    loading="lazy"
                    decoding="async"
                  />
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-approved-sample-control-panel quality-control-approved-sample-control-role">
            <h2>
              <span>6</span>
              {t('Vai trò trong hệ thống chất lượng')}
            </h2>
            <div className="quality-control-approved-sample-control-role-flow">
              {[
                ['Mẫu duyệt', '/assets/quality-control/approved-sample-control/role-approved-sample.webp'],
                [
                  'Kiểm tra vật liệu',
                  '/assets/quality-control/approved-sample-control/role-material-inspection.webp',
                ],
                [
                  'Kiểm tra trong sản xuất',
                  '/assets/quality-control/approved-sample-control/role-in-process.webp',
                ],
                ['Kiểm tra cuối', '/assets/quality-control/approved-sample-control/role-final-inspection.webp'],
                ['Đóng gói', '/assets/quality-control/approved-sample-control/role-packing.webp'],
                ['Xuất hàng', '/assets/quality-control/approved-sample-control/role-export.webp'],
              ].map(([item, image]) => (
                <article key={item}>
                  <h3>{t(item)}</h3>
                  <img
                    className="quality-control-approved-sample-control-role-image"
                    src={image}
                    alt={t(item)}
                    loading="lazy"
                    decoding="async"
                  />
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-approved-sample-control-panel quality-control-approved-sample-control-standard-room">
            <div className="quality-control-approved-sample-control-standard-room-copy">
              <h2>
                <span>7</span>
                {t('Liên kết với Phòng mẫu chuẩn đối tác')}
              </h2>
              <p>
                {t(
                  'ANSLIFE có thể lưu trữ và quản lý mẫu chuẩn của từng buyer trong hệ thống Phòng mẫu chuẩn đối tác, bao gồm mẫu sản phẩm, mẫu vật liệu, bảng màu, bản vẽ kỹ thuật, tiêu chuẩn đóng gói và checklist QC. Điều này giúp duy trì tính nhất quán giữa các dự án, các nhà máy và các đợt sản xuất kéo dài nhiều năm.',
                )}
              </p>
            </div>
            <img
              className="quality-control-approved-sample-control-standard-room-image"
              src="/assets/quality-control/approved-sample-control/standard-room.webp"
              alt={t('Liên kết với Phòng mẫu chuẩn đối tác')}
              loading="lazy"
              decoding="async"
            />
          </section>
          <section className="quality-control-approved-sample-control-panel quality-control-approved-sample-control-cta">
            <img
              className="quality-control-approved-sample-control-cta-image"
              src="/assets/quality-control/approved-sample-control/cta-approved-sample.webp"
              alt={t('Trao đổi về mẫu duyệt của dự án')}
              loading="lazy"
              decoding="async"
            />
            <div className="quality-control-approved-sample-control-cta-copy">
              <h2>
                <span>8</span>
                {t('Trao đổi về mẫu duyệt của dự án')}
              </h2>
              <p>
                {t(
                  'Buyer có thể gửi mẫu sản phẩm, mẫu vật liệu, bảng màu, bản vẽ kỹ thuật hoặc tiêu chuẩn đóng gói để ANSLIFE xây dựng phương án quản lý và kiểm soát phù hợp.',
                )}
              </p>
            </div>
            <div className="quality-control-approved-sample-control-cta-actions">
              <a className="is-primary" href="/vn/contact">
                {t('Gửi mẫu duyệt')}
              </a>
              <a href="/vn/contact">{t('Tải tài liệu kỹ thuật')}</a>
              <a href="/vn/contact">{t('Liên hệ ANSLIFE')}</a>
            </div>
          </section>
        </section>
      )}
      {isQualityControlFinalInspectionPage && (
        <section
          className="quality-control-final-inspection-content"
          aria-labelledby="quality-control-final-inspection-goals-title"
        >
          <section className="quality-control-final-inspection-panel quality-control-final-inspection-goals">
            <h2 id="quality-control-final-inspection-goals-title">
              <span>1</span>
              {t('Mục tiêu của kiểm tra cuối')}
            </h2>
            <div className="quality-control-final-inspection-goal-grid">
              {[
                [
                  'Đúng sản phẩm',
                  'Đúng mẫu duyệt và đúng yêu cầu kỹ thuật.',
                  '/assets/quality-control/final-inspection/goal-correct-product.webp',
                ],
                [
                  'Đúng chất lượng',
                  'Đảm bảo sản phẩm đạt tiêu chuẩn trước khi giao hàng.',
                  '/assets/quality-control/final-inspection/goal-correct-quality.webp',
                ],
                [
                  'Đúng số lượng',
                  'Xác nhận số lượng sản phẩm theo kế hoạch giao hàng.',
                  '/assets/quality-control/final-inspection/goal-correct-quantity.webp',
                ],
                [
                  'Đúng trạng thái giao hàng',
                  'Đảm bảo sản phẩm sẵn sàng cho đóng gói và xuất khẩu.',
                  '/assets/quality-control/final-inspection/goal-shipping-ready.webp',
                ],
              ].map(([title, text, image]) => (
                <article key={title}>
                  <img
                    className="quality-control-final-inspection-goal-image"
                    src={image}
                    alt={t(title)}
                    loading="lazy"
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
          <section className="quality-control-final-inspection-panel quality-control-final-inspection-checks">
            <h2>
              <span>2</span>
              {t('Những gì được kiểm tra?')}
            </h2>
            <div className="quality-control-final-inspection-check-grid">
              {[
                {
                  title: 'Kích thước sản phẩm',
                  text: 'Đối chiếu với bản vẽ kỹ thuật và dung sai cho phép.',
                  image: '/assets/quality-control/final-inspection/check-dimensions.webp',
                  checks: ['Chiều dài', 'Chiều rộng', 'Chiều cao', 'Khoảng cách lắp ráp', 'Dung sai kích thước'],
                },
                {
                  title: 'Kết cấu & độ ổn định',
                  text: 'Đánh giá khả năng sử dụng và độ ổn định của sản phẩm.',
                  image: '/assets/quality-control/final-inspection/check-structure.webp',
                  checks: ['Độ cân bằng', 'Độ vững chắc', 'Liên kết', 'Khả năng chịu tải cơ bản', 'Hiện tượng rung lắc'],
                },
                {
                  title: 'Ngoại quan sản phẩm',
                  text: 'Đánh giá tổng thể về hình thức và độ hoàn thiện.',
                  image: '/assets/quality-control/final-inspection/check-appearance.webp',
                  checks: ['Trầy xước', 'Nứt', 'Móp méo', 'Lỗi bề mặt', 'Sai lệch ngoại quan'],
                },
                {
                  title: 'Sơn & hoàn thiện bề mặt',
                  text: 'Đối chiếu với mẫu màu và tiêu chuẩn hoàn thiện đã được phê duyệt.',
                  image: '/assets/quality-control/final-inspection/check-finish.webp',
                  checks: ['Màu sắc', 'Độ bóng', 'Độ mờ', 'Độ đồng đều màu', 'Bề mặt hoàn thiện'],
                },
                {
                  title: 'Chức năng sử dụng',
                  text: 'Đảm bảo sản phẩm hoạt động đúng mục đích thiết kế.',
                  image: '/assets/quality-control/final-inspection/check-function.webp',
                  checks: ['Ngăn kéo đóng mở', 'Cửa tủ', 'Bản lề', 'Ray trượt', 'Cơ cấu chuyển động', 'Các bộ phận điều chỉnh'],
                },
                {
                  title: 'Phụ kiện & linh kiện',
                  text: 'Xác nhận đầy đủ các bộ phận theo BOM hoặc yêu cầu đơn hàng.',
                  image: '/assets/quality-control/final-inspection/check-accessories.webp',
                  checks: ['Phụ kiện đi kèm', 'Bộ vít', 'Chân tăng chỉnh', 'Khóa', 'Tay nắm', 'Hướng dẫn lắp ráp (nếu có)'],
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <div className="quality-control-final-inspection-check-copy">
                    <h3>
                      <span>{String(index + 1).padStart(2, '0')}.</span>
                      {t(item.title)}
                    </h3>
                    <p>{t(item.text)}</p>
                    <ul>
                      {item.checks.map((check) => (
                        <li key={check}>{t(check)}</li>
                      ))}
                    </ul>
                  </div>
                  <img
                    className="quality-control-final-inspection-check-image"
                    src={item.image}
                    alt={t(item.title)}
                    loading="lazy"
                    decoding="async"
                  />
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-final-inspection-pair">
            <section className="quality-control-final-inspection-panel quality-control-final-inspection-approved">
              <h2>
                <span>3</span>
                {t('Kiểm tra theo mẫu duyệt')}
              </h2>
              <div className="quality-control-final-inspection-approved-layout">
                <div className="quality-control-final-inspection-approved-copy">
                  <h3>{t('Đối chiếu với mẫu chuẩn')}</h3>
                  <p>
                    {t(
                      'Sản phẩm được so sánh với mẫu đã được buyer phê duyệt nhằm đảm bảo tính đồng nhất giữa sản phẩm sản xuất hàng loạt và mẫu tham chiếu.',
                    )}
                  </p>
                </div>
                <div className="quality-control-final-inspection-approved-flow">
                  {[
                    ['Mẫu sản phẩm', '/assets/quality-control/final-inspection/approved-product-sample.webp'],
                    ['Bản vẽ kỹ thuật', '/assets/quality-control/final-inspection/approved-technical-drawing.webp'],
                    ['Bảng màu', '/assets/quality-control/final-inspection/approved-color-board.webp'],
                    ['Mẫu vật liệu', '/assets/quality-control/final-inspection/approved-material-sample.webp'],
                    ['Tiêu chuẩn đóng gói', '/assets/quality-control/final-inspection/approved-packing-standard.webp'],
                  ].map(([item, image]) => (
                    <div key={item}>
                      <img
                        className="quality-control-final-inspection-small-image"
                        src={image}
                        alt={t(item)}
                        loading="lazy"
                        decoding="async"
                      />
                      <p>{t(item)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="quality-control-final-inspection-panel quality-control-final-inspection-methods">
              <h2>
                <span>4</span>
                {t('Phương pháp kiểm tra')}
              </h2>
              <div className="quality-control-final-inspection-method-grid">
                {[
                  [
                    'Kiểm tra 100%',
                    'Áp dụng cho các hạng mục quan trọng hoặc theo yêu cầu dự án.',
                    '/assets/quality-control/final-inspection/method-100-percent.webp',
                  ],
                  [
                    'Kiểm tra theo lô',
                    'Đánh giá theo từng lô sản xuất trước khi đóng gói.',
                    '/assets/quality-control/final-inspection/method-by-lot.webp',
                  ],
                  [
                    'Kiểm tra theo tiêu chuẩn buyer',
                    'Áp dụng checklist và phương pháp đánh giá riêng của từng khách hàng.',
                    '/assets/quality-control/final-inspection/method-buyer-standard.webp',
                  ],
                ].map(([title, text, image]) => (
                  <article key={title}>
                    <img
                      className="quality-control-final-inspection-small-image"
                      src={image}
                      alt={t(title)}
                      loading="lazy"
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
          </section>
          <section className="quality-control-final-inspection-panel quality-control-final-inspection-results">
            <h2>
              <span>5</span>
              {t('Kết quả kiểm tra')}
            </h2>
            <div className="quality-control-final-inspection-result-flow">
              {[
                {
                  label: 'A',
                  steps: [
                    ['Kiểm tra cuối', '/assets/quality-control/final-inspection/result-final-check-pass.webp'],
                    ['Đạt yêu cầu', '/assets/quality-control/final-inspection/result-pass.webp'],
                    ['Đóng gói', '/assets/quality-control/final-inspection/result-packing-pass.webp'],
                    ['Xuất hàng', '/assets/quality-control/final-inspection/result-export-pass.webp'],
                  ],
                },
                {
                  label: 'B',
                  steps: [
                    ['Kiểm tra cuối', '/assets/quality-control/final-inspection/result-final-check-issue.webp'],
                    ['Phát hiện sai lệch', '/assets/quality-control/final-inspection/result-issue.webp'],
                    ['Khắc phục', '/assets/quality-control/final-inspection/result-fix.webp'],
                    ['Kiểm tra lại', '/assets/quality-control/final-inspection/result-recheck.webp'],
                    ['Đóng gói', '/assets/quality-control/final-inspection/result-packing-recheck.webp'],
                  ],
                },
              ].map((row) => (
                <article key={row.label}>
                  <span className="quality-control-final-inspection-result-label">{row.label}</span>
                  <ol>
                    {row.steps.map(([step, image]) => (
                      <li key={step}>
                        <img
                          className="quality-control-final-inspection-result-image"
                          src={image}
                          alt={t(step)}
                          loading="lazy"
                          decoding="async"
                        />
                        <span>{t(step)}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-final-inspection-panel quality-control-final-inspection-records">
            <h2>
              <span>6</span>
              {t('Hồ sơ kiểm tra cuối')}
            </h2>
            <div className="quality-control-final-inspection-record-grid">
              {[
                ['Báo cáo kiểm tra', '/assets/quality-control/final-inspection/record-report.webp'],
                ['Hình ảnh kiểm tra', '/assets/quality-control/final-inspection/record-photos.webp'],
                ['Checklist QC', '/assets/quality-control/final-inspection/record-qc-checklist.webp'],
                ['Kết quả đối chiếu mẫu duyệt', '/assets/quality-control/final-inspection/record-approved-comparison.webp'],
                ['Biên bản xử lý sai lệch (nếu có)', '/assets/quality-control/final-inspection/record-deviation.webp'],
              ].map(([item, image]) => (
                <article key={item}>
                  <img
                    className="quality-control-final-inspection-record-image"
                    src={image}
                    alt={t(item)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(item)}</h3>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-final-inspection-panel quality-control-final-inspection-role">
            <h2>
              <span>7</span>
              {t('Vai trò trong hệ thống chất lượng')}
            </h2>
            <div className="quality-control-final-inspection-role-flow">
              {[
                ['Kiểm tra vật liệu', '/assets/quality-control/final-inspection/role-material-inspection.webp'],
                ['Kiểm tra trong sản xuất', '/assets/quality-control/final-inspection/role-in-process.webp'],
                ['Kiểm tra cuối', '/assets/quality-control/final-inspection/role-final-inspection.webp'],
                ['Đóng gói', '/assets/quality-control/final-inspection/role-packing.webp'],
                ['Xuất hàng', '/assets/quality-control/final-inspection/role-export.webp'],
              ].map(([item, image]) => (
                <article
                  className={item === 'Kiểm tra cuối' ? 'is-active' : undefined}
                  key={item}
                >
                  <img
                    className="quality-control-final-inspection-role-image"
                    src={image}
                    alt={t(item)}
                    loading="lazy"
                    decoding="async"
                  />
                  <h3>{t(item)}</h3>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-final-inspection-panel quality-control-final-inspection-cta">
            <img
              className="quality-control-final-inspection-cta-image"
              src="/assets/quality-control/final-inspection/cta-final-inspection.webp"
              alt={t('Trao đổi về yêu cầu kiểm tra cuối của dự án')}
              loading="lazy"
              decoding="async"
            />
            <div className="quality-control-final-inspection-cta-copy">
              <h2>{t('Trao đổi về yêu cầu kiểm tra cuối của dự án')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi checklist QC, tiêu chuẩn kiểm tra hoặc yêu cầu đánh giá riêng để ANSLIFE xây dựng phương án kiểm tra phù hợp trước khi giao hàng.',
                )}
              </p>
            </div>
            <div className="quality-control-final-inspection-cta-actions">
              <a className="is-primary" href="/vn/contact">
                {t('Gửi yêu cầu QC')}
              </a>
              <a href="/vn/contact">
                {t('Tải checklist QC')}
              </a>
              <a href="/vn/contact">
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
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
