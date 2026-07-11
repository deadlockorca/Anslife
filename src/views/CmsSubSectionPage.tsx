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
  const { language, t, toLocalizedPath } = useSiteI18n();
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
  const isMaterialsRubberWoodPage =
    config.slug === 'materials' && section.id === 'solid-wood' && detailSlug === 'rubber-wood';
  const isMaterialsAshPage =
    config.slug === 'materials' && section.id === 'solid-wood' && detailSlug === 'ash';
  const isMaterialsOakPage =
    config.slug === 'materials' && section.id === 'solid-wood' && detailSlug === 'oak';
  const isMaterialsBeechPage =
    config.slug === 'materials' && section.id === 'solid-wood' && detailSlug === 'beech';
  const isMaterialsAcaciaPage =
    config.slug === 'materials' && section.id === 'solid-wood' && detailSlug === 'acacia';
  const isMaterialsPinePage =
    config.slug === 'materials' && section.id === 'solid-wood' && detailSlug === 'pine';
  const isMaterialsPlywoodPage =
    config.slug === 'materials' && section.id === 'engineered-wood' && detailSlug === 'plywood';
  const isMaterialsMdfPage =
    config.slug === 'materials' && section.id === 'engineered-wood' && detailSlug === 'mdf';
  const isMaterialsParticleBoardPage =
    config.slug === 'materials' && section.id === 'engineered-wood' && detailSlug === 'particle-board';
  const isMaterialsLaminatedBoardPage =
    config.slug === 'materials' && section.id === 'engineered-wood' && detailSlug === 'laminated-board';
  const isMaterialsRattanPage =
    config.slug === 'materials' && section.id === 'natural-materials' && detailSlug === 'rattan';
  const isMaterialsBambooPage =
    config.slug === 'materials' && section.id === 'natural-materials' && detailSlug === 'bamboo';
  const isMaterialsCaneWebbingPage =
    config.slug === 'materials' && section.id === 'natural-materials' && detailSlug === 'cane-webbing';
  const isMaterialsFoamPage =
    config.slug === 'materials' && section.id === 'upholstery-materials' && detailSlug === 'foam';
  const isMaterialsFabricPage =
    config.slug === 'materials' && section.id === 'upholstery-materials' && detailSlug === 'fabric';
  const isMaterialsLeatherPuPage =
    config.slug === 'materials' && section.id === 'upholstery-materials' && detailSlug === 'leather-pu';
  const isMaterialsCushionMaterialsPage =
    config.slug === 'materials' && section.id === 'upholstery-materials' && detailSlug === 'cushion-materials';
  const isMaterialsCartonPage =
    config.slug === 'materials' && section.id === 'packing-materials' && detailSlug === 'carton';
  const isMaterialsFoamProtectionPage =
    config.slug === 'materials' && section.id === 'packing-materials' && detailSlug === 'foam-protection';
  const isMaterialsEdgeProtectionPage =
    config.slug === 'materials' && section.id === 'packing-materials' && detailSlug === 'edge-protection';
  const isMaterialsPalletPage =
    config.slug === 'materials' && section.id === 'packing-materials' && detailSlug === 'pallet';
  const isMaterialsExportPackingPage =
    config.slug === 'materials' && section.id === 'packing-materials' && detailSlug === 'export-packing';
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
  const isSupplyHubPartnerStandardRoomPage =
    config.slug === 'vietnam-supply-hub' &&
    section.id === 'partner-standard-room' &&
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
  const isQualityControlBuyerSpecificStandardsPage =
    config.slug === 'quality-control' && section.id === 'buyer-specific-standards' && !detailSlug;
  const isResourcesManufacturingNotesPage =
    config.slug === 'resources' && section.id === 'manufacturing-notes' && !detailSlug;
  const isResourcesExportKnowledgePage =
    config.slug === 'resources' && section.id === 'export-knowledge' && !detailSlug;
  const isResourcesCaseStudiesPage =
    config.slug === 'resources' && section.id === 'case-studies' && !detailSlug;
  const isResourcesCompanyUpdatesPage =
    config.slug === 'resources' && section.id === 'company-updates' && !detailSlug;
  const isManufacturingFactoryOverviewPage =
    config.slug === 'manufacturing' && section.id === 'factory-overview' && !detailSlug;
  const isManufacturingMachineryEquipmentPage =
    config.slug === 'manufacturing' && section.id === 'machinery-equipment' && !detailSlug;
  const isManufacturingFinishingCapabilityPage =
    config.slug === 'manufacturing' && section.id === 'finishing-capability' && !detailSlug;
  const isManufacturingAssemblyLinePage =
    config.slug === 'manufacturing' && section.id === 'assembly-line' && !detailSlug;
  const isManufacturingPackingAreaPage =
    config.slug === 'manufacturing' && section.id === 'packing-area' && !detailSlug;
  const isManufacturingContainerLoadingPage =
    config.slug === 'manufacturing' && section.id === 'container-loading' && !detailSlug;
  const isManufacturingMaterialPreparationPage =
    config.slug === 'manufacturing' &&
    section.id === 'production-process' &&
    detailSlug === 'material-preparation';
  const isManufacturingCuttingPage =
    config.slug === 'manufacturing' &&
    section.id === 'production-process' &&
    detailSlug === 'cutting';
  const isManufacturingWoodworkingPage =
    config.slug === 'manufacturing' &&
    section.id === 'production-process' &&
    detailSlug === 'woodworking';
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
    isManufacturingFactoryOverviewPage ||
    isManufacturingMachineryEquipmentPage ||
    isManufacturingFinishingCapabilityPage ||
    isManufacturingAssemblyLinePage ||
    isManufacturingPackingAreaPage ||
    isManufacturingContainerLoadingPage ||
    isManufacturingMaterialPreparationPage ||
    isManufacturingCuttingPage ||
    isManufacturingWoodworkingPage ||
    isMaterialsRubberWoodPage ||
    isMaterialsAshPage ||
    isMaterialsOakPage ||
    isMaterialsBeechPage ||
    isMaterialsAcaciaPage ||
    isMaterialsPinePage ||
    isMaterialsPlywoodPage ||
    isMaterialsMdfPage ||
    isMaterialsParticleBoardPage ||
    isMaterialsLaminatedBoardPage ||
    isMaterialsRattanPage ||
    isMaterialsBambooPage ||
    isMaterialsCaneWebbingPage ||
    isMaterialsFoamPage ||
    isMaterialsFabricPage ||
    isMaterialsLeatherPuPage ||
    isMaterialsCushionMaterialsPage ||
    isMaterialsCartonPage ||
    isMaterialsFoamProtectionPage ||
    isMaterialsEdgeProtectionPage ||
    isMaterialsPalletPage ||
    isMaterialsExportPackingPage ||
    isSupplyHubOverviewPage ||
    isSupplyHubStorageSolutionPage ||
    isSupplyHubLclFclConsolidationPage ||
    isSupplyHubWeeklyShipmentArrangementPage ||
    isSupplyHubMaterialComponentStoragePage ||
    isSupplyHubExportDocumentationSupportPage ||
    isSupplyHubPartnerStandardRoomPage ||
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
    isManufacturingFactoryOverviewPage ||
    isManufacturingMachineryEquipmentPage ||
    isManufacturingFinishingCapabilityPage ||
    isManufacturingAssemblyLinePage ||
    isManufacturingPackingAreaPage ||
    isManufacturingContainerLoadingPage ||
    isManufacturingMaterialPreparationPage ||
    isManufacturingCuttingPage ||
    isManufacturingWoodworkingPage ||
    isMaterialsRubberWoodPage ||
    isMaterialsAshPage ||
    isMaterialsOakPage ||
    isMaterialsBeechPage ||
    isMaterialsAcaciaPage ||
    isMaterialsPinePage ||
    isMaterialsPlywoodPage ||
    isMaterialsMdfPage ||
    isMaterialsParticleBoardPage ||
    isMaterialsLaminatedBoardPage ||
    isMaterialsRattanPage ||
    isMaterialsBambooPage ||
    isMaterialsCaneWebbingPage ||
    isMaterialsFoamPage ||
    isMaterialsFabricPage ||
    isMaterialsLeatherPuPage ||
    isMaterialsCushionMaterialsPage ||
    isMaterialsCartonPage ||
    isMaterialsFoamProtectionPage ||
    isMaterialsEdgeProtectionPage ||
    isMaterialsPalletPage ||
    isMaterialsExportPackingPage ||
    isSupplyHubOverviewPage ||
    isSupplyHubStorageSolutionPage ||
    isSupplyHubLclFclConsolidationPage ||
    isSupplyHubWeeklyShipmentArrangementPage ||
    isSupplyHubMaterialComponentStoragePage ||
    isSupplyHubExportDocumentationSupportPage ||
    isSupplyHubPartnerStandardRoomPage ||
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
  const shouldShowQualityControlBuyerSpecificStandardsBanner =
    isQualityControlBuyerSpecificStandardsPage;
  const shouldShowResourcesManufacturingNotesBanner = isResourcesManufacturingNotesPage;
  const shouldShowResourcesExportKnowledgeBanner = isResourcesExportKnowledgePage;
  const shouldShowResourcesCaseStudiesBanner = isResourcesCaseStudiesPage;
  const shouldShowResourcesCompanyUpdatesBanner = isResourcesCompanyUpdatesPage;
  const shouldShowManufacturingFactoryOverviewBanner = isManufacturingFactoryOverviewPage;
  const shouldShowManufacturingMachineryEquipmentBanner = isManufacturingMachineryEquipmentPage;
  const shouldShowManufacturingFinishingCapabilityBanner = isManufacturingFinishingCapabilityPage;
  const shouldShowManufacturingAssemblyLineBanner = isManufacturingAssemblyLinePage;
  const shouldShowManufacturingPackingAreaBanner = isManufacturingPackingAreaPage;
  const shouldShowManufacturingContainerLoadingBanner = isManufacturingContainerLoadingPage;
  const shouldShowManufacturingMaterialPreparationBanner = isManufacturingMaterialPreparationPage;
  const shouldShowManufacturingCuttingBanner = isManufacturingCuttingPage;
  const shouldShowManufacturingWoodworkingBanner = isManufacturingWoodworkingPage;
  const shouldShowMaterialsRubberWoodBanner = isMaterialsRubberWoodPage;
  const shouldShowMaterialsAshBanner = isMaterialsAshPage;
  const shouldShowMaterialsOakBanner = isMaterialsOakPage;
  const shouldShowMaterialsBeechBanner = isMaterialsBeechPage;
  const shouldShowMaterialsAcaciaBanner = isMaterialsAcaciaPage;
  const shouldShowMaterialsPineBanner = isMaterialsPinePage;
  const shouldShowMaterialsPlywoodBanner = isMaterialsPlywoodPage;
  const shouldShowMaterialsMdfBanner = isMaterialsMdfPage;
  const shouldShowMaterialsParticleBoardBanner = isMaterialsParticleBoardPage;
  const shouldShowMaterialsLaminatedBoardBanner = isMaterialsLaminatedBoardPage;
  const shouldShowMaterialsRattanBanner = isMaterialsRattanPage;
  const shouldShowMaterialsBambooBanner = isMaterialsBambooPage;
  const shouldShowMaterialsCaneWebbingBanner = isMaterialsCaneWebbingPage;
  const shouldShowMaterialsFoamBanner = isMaterialsFoamPage;
  const shouldShowMaterialsFabricBanner = isMaterialsFabricPage;
  const shouldShowMaterialsLeatherPuBanner = isMaterialsLeatherPuPage;
  const shouldShowMaterialsCushionMaterialsBanner = isMaterialsCushionMaterialsPage;
  const shouldShowMaterialsCartonBanner = isMaterialsCartonPage;
  const shouldShowMaterialsFoamProtectionBanner = isMaterialsFoamProtectionPage;
  const shouldShowMaterialsEdgeProtectionBanner = isMaterialsEdgeProtectionPage;
  const shouldShowMaterialsPalletBanner = isMaterialsPalletPage;
  const shouldShowMaterialsExportPackingBanner = isMaterialsExportPackingPage;
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
  const supplyHubPartnerStandardRoomLinks = [
    {
      title: 'Mẫu sản phẩm đã duyệt',
      description: 'Lưu mẫu duyệt làm chuẩn đối chiếu cho sản xuất, QC và các đơn hàng lặp lại.',
      href: '/vietnam-supply-hub/partner-standard-room/approved-product-samples',
    },
    {
      title: 'Mẫu cấu kiện',
      description: 'Quản lý mẫu chi tiết, cấu kiện và bán thành phẩm theo từng dự án hoặc buyer.',
      href: '/vietnam-supply-hub/partner-standard-room/component-samples',
    },
    {
      title: 'Bản vẽ kỹ thuật',
      description: 'Lưu trữ bản vẽ, thông số kỹ thuật, BOM và tài liệu tham chiếu cho sản xuất.',
      href: '/vietnam-supply-hub/partner-standard-room/technical-drawings',
    },
    {
      title: 'Tài liệu vật liệu',
      description: 'Quản lý mẫu vật liệu, mã vật liệu và tài liệu tham chiếu trong chuỗi cung ứng.',
      href: '/vietnam-supply-hub/partner-standard-room/material-references',
    },
    {
      title: 'Tiêu chuẩn đóng gói',
      description: 'Chuẩn hóa quy cách đóng gói, nhãn, pallet và tài liệu đóng gói xuất khẩu.',
      href: '/vietnam-supply-hub/partner-standard-room/packing-standards',
    },
    {
      title: 'Checklist QC',
      description: 'Lưu checklist kiểm tra để kết nối tiêu chuẩn mẫu, sản xuất và trước khi xuất hàng.',
      href: '/vietnam-supply-hub/partner-standard-room/qc-checklists',
    },
  ];
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
      {shouldShowManufacturingFactoryOverviewBanner && (
        <figure className="manufacturing-factory-overview-banner">
          <img
            src="/assets/manufacturing/factory-overview-banner.webp"
            alt={t('Banner tổng quan nhà máy')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-factory-overview-banner-copy">
            <h1>{t('Tổng quan nhà máy')}</h1>
            <p>
              {t(
                'Hệ thống sản xuất được tổ chức nhằm đáp ứng các yêu cầu về chất lượng, năng lực và tiến độ cho các dự án nội thất xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE vận hành hệ thống sản xuất gồm nhà máy trực tiếp và các đối tác sản xuất được quản lý theo quy trình thống nhất. Mỗi dự án được kiểm soát từ lựa chọn vật liệu, tổ chức sản xuất, kiểm tra chất lượng đến đóng gói và xuất khẩu nhằm đảm bảo tính đồng nhất giữa mẫu duyệt và sản xuất hàng loạt.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowManufacturingMachineryEquipmentBanner && (
        <figure className="manufacturing-machinery-equipment-banner">
          <img
            src="/assets/manufacturing/machinery-equipment-banner.webp"
            alt={t('Banner máy móc và thiết bị')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-machinery-equipment-banner-copy">
            <h1>{t('Máy móc & Thiết bị')}</h1>
            <p>
              {t(
                'Hệ thống thiết bị được đầu tư nhằm đáp ứng yêu cầu về độ chính xác, năng suất và chất lượng trong sản xuất nội thất xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE vận hành hệ thống máy móc và thiết bị phục vụ toàn bộ quá trình sản xuất, từ gia công vật liệu, hoàn thiện bề mặt, lắp ráp đến đóng gói. Việc đầu tư công nghệ phù hợp giúp đảm bảo độ chính xác của sản phẩm, ổn định chất lượng và đáp ứng tiến độ của các dự án xuất khẩu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowManufacturingFinishingCapabilityBanner && (
        <figure className="manufacturing-finishing-capability-banner">
          <img
            src="/assets/manufacturing/finishing-capability-banner.webp"
            alt={t('Banner năng lực hoàn thiện')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-finishing-capability-banner-copy">
            <h1>{t('Năng lực hoàn thiện')}</h1>
            <p>
              {t(
                'Hệ thống hoàn thiện bề mặt được kiểm soát nhằm đảm bảo tính thẩm mỹ, độ bền và sự đồng nhất của sản phẩm trước khi xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'Hoàn thiện là công đoạn tạo nên giá trị cuối cùng của sản phẩm nội thất. Từ xử lý bề mặt, phối màu, sơn hoàn thiện đến lắp ráp và kiểm tra ngoại quan, mọi quy trình đều được thực hiện theo tiêu chuẩn kỹ thuật và mẫu đã được buyer phê duyệt.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE cung cấp nhiều giải pháp hoàn thiện phù hợp với từng loại vật liệu, phong cách thiết kế và yêu cầu của từng thị trường xuất khẩu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowManufacturingAssemblyLineBanner && (
        <figure className="manufacturing-assembly-line-banner">
          <img
            src="/assets/manufacturing/assembly-line-banner.webp"
            alt={t('Banner dây chuyền lắp ráp')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-assembly-line-banner-copy">
            <h1>{t('Dây chuyền lắp ráp')}</h1>
            <p>
              {t(
                'Quy trình lắp ráp được tổ chức nhằm đảm bảo độ chính xác, tính đồng nhất và chất lượng của sản phẩm trước khi kiểm tra cuối và đóng gói.',
              )}
            </p>
            <p>
              {t(
                'Dây chuyền lắp ráp là công đoạn kết nối toàn bộ linh kiện và bán thành phẩm thành sản phẩm hoàn chỉnh. Mọi chi tiết được kiểm tra về kích thước, kết cấu, khả năng vận hành và ngoại quan trước khi chuyển sang kiểm tra chất lượng cuối cùng.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE xây dựng quy trình lắp ráp theo từng nhóm sản phẩm nhằm đảm bảo hiệu quả sản xuất, tính ổn định và khả năng đáp ứng các yêu cầu kỹ thuật của buyer.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowManufacturingPackingAreaBanner && (
        <figure className="manufacturing-packing-area-banner">
          <img
            src="/assets/manufacturing/packing-area-banner.webp"
            alt={t('Banner khu vực đóng gói')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-packing-area-banner-copy">
            <h1>{t('Khu vực đóng gói')}</h1>
            <p>
              {t(
                'Khu vực hoàn thiện cuối cùng trước khi sản phẩm được lưu kho, xếp pallet và xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'Khu vực đóng gói là công đoạn cuối trong quy trình sản xuất, nơi sản phẩm được kiểm tra ngoại quan, bảo vệ bằng các vật liệu đóng gói phù hợp và chuẩn bị cho quá trình lưu kho hoặc vận chuyển quốc tế.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE tổ chức khu vực đóng gói theo quy trình tiêu chuẩn nhằm đảm bảo mỗi sản phẩm được bảo vệ đúng quy cách, đúng tiêu chuẩn của buyer trước khi xuất xưởng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowManufacturingContainerLoadingBanner && (
        <figure className="manufacturing-container-loading-banner">
          <img
            src="/assets/manufacturing/container-loading-banner.webp"
            alt={t('Banner xếp container')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-container-loading-banner-copy">
            <h1>{t('Xếp container')}</h1>
            <p>
              {t(
                'Quy trình lập kế hoạch và xếp hàng nhằm đảm bảo an toàn sản phẩm, tối ưu không gian container và nâng cao hiệu quả vận chuyển quốc tế.',
              )}
            </p>
            <p>{t('Xếp container là bước cuối cùng trước khi hàng hóa được vận chuyển đến khách hàng.')}</p>
            <p>
              {t(
                'Mỗi lô hàng được lập phương án xếp phù hợp với kích thước sản phẩm, quy cách đóng gói và phương thức vận chuyển nhằm đảm bảo an toàn, tối ưu thể tích và hạn chế rủi ro trong suốt hành trình quốc tế.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE kiểm soát toàn bộ quá trình từ chuẩn bị pallet, sắp xếp kiện hàng, cố định container đến kiểm tra trước khi niêm phong và xuất xưởng.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowManufacturingMaterialPreparationBanner && (
        <figure className="manufacturing-material-preparation-banner">
          <img
            src="/assets/manufacturing/production-process/material-preparation-banner.webp"
            alt={t('Banner chuẩn bị vật liệu')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-material-preparation-banner-copy">
            <h1>{t('Chuẩn bị vật liệu')}</h1>
            <p>
              {t(
                'Kiểm tra, phân loại và chuẩn bị nguyên vật liệu trước khi đưa vào sản xuất nhàm đảm bảo chất lượng, tinh ổn định và hiệu quả của toàn bộ quy trình.',
              )}
            </p>
            <p>
              {t(
                'Chuẩn bị vặt liệu là bước đầu tiên trong quy trình sản xuất, quyết định chất lượng của các công đoạn tiếp theo. Mọi nguyên vật liệu đều được kiểm tra, phân loại và xử lý theo yêu cầu kỹ thuật trước khi đưa vào gia công.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE áp dụng quy trình kiếm soát vật liệu nhâm đảm bảo sự đóng nhất giữa màu dà phê duyệt và san xuất hàng loạt, đồng thời đấp ứng các tiêu chuản cua từng thị trưởng xuất kháu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowManufacturingCuttingBanner && (
        <figure className="manufacturing-cutting-banner">
          <img
            src="/assets/manufacturing/production-process/cutting-banner.webp"
            alt={t('Banner công đoạn cắt')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-cutting-banner-copy">
            <h1>{t('Cắt')}</h1>
            <p>
              {t(
                'Gia công vật liệu theo kích thước và quy cách kỹ thuật, tạo nền tăng cho các công đoạn sản xuất tiếp theo.',
              )}
            </p>
            <p>
              {t(
                'Sau khi vật liệu được chuẩn bị và kiểm tra, công doạn cất được thực hiện theo bản về kỹ thuật và danh mục vật liệu (BOM). Mục tiêu là tạo ra các chi tiết có kích thước chính xác, tối ưu tỷ lệ sử dụng vật liệu và đâm bảo sự đóng nhất giữa các lò sản xuất.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE kiếm soát quy trình cất nhấm đáp ứng yêu cầu về độ chính xác. hiệu quả sản xuất và khả nãng truy xuất trong toàn bộ dự án.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowManufacturingWoodworkingBanner && (
        <figure className="manufacturing-woodworking-banner">
          <img
            src="/assets/manufacturing/production-process/woodworking-banner.webp"
            alt={t('Banner gia công gỗ')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="manufacturing-woodworking-banner-copy">
            <h1>{t('Gia công gỗ')}</h1>
            <p>
              {t(
                'Gia công các chi tiết gỗ với độ chính xác cao, tạo nền tăng cho quả trình lắp ráp và hoàn thiện sản phẩm nội thất.',
              )}
            </p>
            <p>
              {t(
                'Sau công đoạn cất, các chỉ tiết gỗ được gia công theo bản vẽ kỹ thuật đé tạo hình, liên kết và chuẩn bị cho quá trình lấp ráp. Độ chính xác của công đoạn này ảnh hưởng trực tiếp đến kết cầu, độ bên và tính thấm mỹ của sản phẩm.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE kiếm soát quy trình gia công nhãm đảm bảo mọi chi tiết đáp ứng đúng kích thước, dung sai và yêu cầu kỹ thuật trước khi chuyển sang các công đoạn tiếp theo.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isManufacturingWoodworkingPage && (
        <section className="manufacturing-woodworking-content">
          <section className="manufacturing-woodworking-top-row">
            <div className="manufacturing-woodworking-process">
              <h2>{t('Quy trình gia công gỗ')}</h2>
              <div className="manufacturing-woodworking-process-list">
                {[
                  ['1', 'Nhận bán thành phẩm'],
                  ['2', 'Đối chiếu bản vẽ kỹ thuật'],
                  ['3', 'Gia công tạo hình'],
                  ['4', 'Gia công mộng và liên kết'],
                  ['5', 'Khoan và phay'],
                  ['6', 'Kiểm tra kích thước'],
                  ['7', 'Phân loại chi tiết'],
                  ['8', 'Chuyển sang chà nhám'],
                ].map(([number, title]) => (
                  <article key={number}>
                    <div className="manufacturing-woodworking-small-slot" aria-hidden="true" />
                    <span>{number}</span>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-woodworking-stages">
              <h2>{t('Các công đoạn gia công')}</h2>
              <div className="manufacturing-woodworking-stage-grid">
                {[
                  ['Tạo hình chi tiết', 'Gia công biên dạng và hình dạng theo thiết kế của từng sản phẩm.'],
                  ['Gia công mộng', 'Gia công các loại mộng và liên kết gỗ nhằm đảm bảo độ chính xác và khả năng lắp ráp.'],
                  ['Khoan', 'Khoan lỗ cho phụ kiện, liên kết và các chi tiết chức năng.'],
                  ['Phay', 'Gia công rãnh, bo cạnh và các chi tiết kỹ thuật theo bản vẽ.'],
                  ['Gia công CNC', 'Gia công các chi tiết phức tạp với độ chính xác và tính lặp lại cao.'],
                  ['Kiểm tra bán thành phẩm', 'Đánh giá kích thước, dung sai và chất lượng trước khi chuyển sang công đoạn tiếp theo.'],
                ].map(([title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-woodworking-stage-icon-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                    <div className="manufacturing-woodworking-stage-image-slot" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-woodworking-middle-row">
            <div className="manufacturing-woodworking-joints">
              <h2>{t('Các dạng liên kết gỗ')}</h2>
              <div className="manufacturing-woodworking-joint-grid">
                {[
                  ['Mortise & Tenon', 'Liên kết mộng âm dương truyền thống, đảm bảo độ bền và ổn định.'],
                  ['Dowel Joint', 'Liên kết bằng chốt gỗ, phù hợp với nhiều dòng nội thất hiện đại.'],
                  ['Finger Joint', 'Liên kết ghép thanh nhằm tối ưu vật liệu và tăng độ ổn định.'],
                  ['Groove & Tongue', 'Liên kết rãnh và hèm cho các chi tiết panel và mặt gỗ.'],
                  ['Mechanical Fastening', 'Gia công vị trí lắp vít cho các chi tiết panel và mặt gỗ.'],
                  ['Custom Joint', 'Gia công theo yêu cầu thiết kế và tiêu chuẩn riêng của từng dự án.'],
                ].map(([title, description]) => (
                  <article key={title}>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                    <div className="manufacturing-woodworking-joint-slot" aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-woodworking-controls">
              <h2>{t('Những yếu tố được kiểm soát')}</h2>
              <div className="manufacturing-woodworking-control-grid">
                {[
                  ['Kích thước', 'Đảm bảo mọi chi tiết đúng kích thước và dung sai theo bản vẽ kỹ thuật.'],
                  ['Độ chính xác', 'Kiểm soát khả năng lắp ghép của các chi tiết trong quá trình sản xuất.'],
                  ['Chất lượng bề mặt', 'Hạn chế sứt mẻ, nứt hoặc hư hỏng trong quá trình gia công.'],
                  ['Liên kết', 'Đảm bảo các vị trí mộng, khoan và phay đạt yêu cầu kỹ thuật.'],
                  ['Truy xuất bán thành phẩm', 'Quản lý chi tiết theo từng lô sản xuất và mã sản phẩm.'],
                  ['Kiểm tra trước chà nhám', 'Xác nhận chất lượng bán thành phẩm trước khi chuyển sang xử lý bề mặt.'],
                ].map(([title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-woodworking-control-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-woodworking-lower-row">
            <div className="manufacturing-woodworking-equipment">
              <h2>{t('Thiết bị gia công')}</h2>
              <div className="manufacturing-woodworking-equipment-grid">
                {[
                  ['Máy CNC', 'Gia công các chi tiết phức tạp theo bản vẽ kỹ thuật.'],
                  ['Máy khoan nhiều đầu', 'Gia công đồng thời nhiều vị trí khoan với độ chính xác cao.'],
                  ['Máy phay', 'Tạo rãnh, bo cạnh và các biên dạng kỹ thuật.'],
                  ['Máy tạo mộng', 'Gia công các liên kết gỗ phục vụ lắp ráp.'],
                  ['Thiết bị đo kiểm', 'Kiểm tra kích thước và dung sai của từng chi tiết.'],
                ].map(([title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-woodworking-equipment-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-woodworking-role-process">
              <section className="manufacturing-woodworking-role">
                <h2>{t('Vai trò trong quy trình sản xuất')}</h2>
                <div className="manufacturing-woodworking-role-flow">
                  {['Chuẩn bị vật liệu', 'Cắt', 'Gia công gỗ', 'Chà nhám', 'Hoàn thiện', 'Lắp ráp'].map(
                    (title, index, items) => (
                      <div className="manufacturing-woodworking-role-item" key={title}>
                        <figure className={title === 'Gia công gỗ' ? 'is-active' : undefined}>
                          <div className="manufacturing-woodworking-role-slot" aria-hidden="true" />
                          <figcaption>{t(title)}</figcaption>
                        </figure>
                        {index < items.length - 1 ? <span aria-hidden="true">→</span> : null}
                      </div>
                    ),
                  )}
                </div>
              </section>

              <section className="manufacturing-woodworking-diagram">
                <h2>{t('Sơ đồ minh họa quy trình gia công')}</h2>
                <div className="manufacturing-woodworking-diagram-flow">
                  {[
                    'Chi tiết sau cắt',
                    'Tạo hình',
                    'Khoan & Phay',
                    'Gia công mộng',
                    'Kiểm tra kích thước',
                    'Chuyển sang chà nhám',
                  ].map((title, index, items) => (
                    <div className="manufacturing-woodworking-diagram-item" key={title}>
                      <figure>
                        <div className="manufacturing-woodworking-diagram-slot" aria-hidden="true" />
                        <figcaption>{t(title)}</figcaption>
                      </figure>
                      {index < items.length - 1 ? <span aria-hidden="true">→</span> : null}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section className="manufacturing-woodworking-bottom-row">
            <div className="manufacturing-woodworking-commitment">
              <h2>{t('Cam kết của ANSLIFE')}</h2>
              <div className="manufacturing-woodworking-commitment-layout">
                <div className="manufacturing-woodworking-commitment-visual-slot" aria-hidden="true" />
                <div className="manufacturing-woodworking-commitment-list">
                  {[
                    'ANSLIFE kiểm soát toàn bộ quá trình gia công gỗ theo bản vẽ kỹ thuật và quy trình sản xuất thống nhất nhằm đảm bảo độ chính xác của từng chi tiết, khả năng lắp ráp và chất lượng ổn định giữa các lô sản xuất.',
                    'Các bán thành phẩm chỉ được chuyển sang công đoạn tiếp theo sau khi đáp ứng đầy đủ yêu cầu về kích thước, liên kết và ngoại quan.',
                  ].map((item) => (
                    <article key={item}>
                      <div className="manufacturing-woodworking-commitment-icon-slot" aria-hidden="true" />
                      <p>{t(item)}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="manufacturing-woodworking-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="manufacturing-woodworking-related-grid">
                {[
                  [
                    'Chuẩn bị vật liệu',
                    'Quy trình kiểm tra và chuẩn bị nguyên liệu trước sản xuất.',
                    '/manufacturing/production-process/material-preparation',
                  ],
                  [
                    'Cắt',
                    'Gia công vật liệu theo kích thước và quy cách kỹ thuật.',
                    '/manufacturing/production-process/cutting',
                  ],
                  [
                    'Chà nhám',
                    'Xử lý bề mặt trước khi hoàn thiện.',
                    '/manufacturing/production-process/sanding',
                  ],
                  [
                    'Máy móc & Thiết bị',
                    'Hệ thống thiết bị phục vụ gia công và sản xuất.',
                    '/manufacturing/machinery-equipment',
                  ],
                ].map(([title, description, href]) => (
                  <Link className="manufacturing-woodworking-related-card" key={title} to={toLocalizedPath(href)}>
                    <div className="manufacturing-woodworking-related-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                    <span aria-hidden="true">›</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-woodworking-cta">
            <div className="manufacturing-woodworking-cta-copy">
              <h2>{t('Cần gia công chi tiết gỗ theo bản vẽ kỹ thuật?')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu chi tiết, yêu cầu liên kết hoặc tiêu chuẩn dung sai để ANSLIFE đánh giá phương án gia công gỗ, kiểm soát độ chính xác và chuẩn bị bán thành phẩm cho các công đoạn tiếp theo.',
                )}
              </p>
            </div>
            <div className="manufacturing-woodworking-cta-actions">
              <Link to={toLocalizedPath('/contact/request-quotation')}>
                {t('Gửi yêu cầu')} <span aria-hidden="true">→</span>
              </Link>
              <Link to={toLocalizedPath('/about-anslife/company-info')}>
                {t('Liên hệ ANSLIFE')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        </section>
      )}
      {isManufacturingCuttingPage && (
        <section className="manufacturing-cutting-content">
          <section className="manufacturing-cutting-top-row">
            <div className="manufacturing-cutting-process">
              <h2>{t('Quy trình cắt')}</h2>
              <div className="manufacturing-cutting-process-list">
                {[
                  ['1', 'Nhận lệnh sản xuất'],
                  ['2', 'Đối chiếu bản vẽ'],
                  ['3', 'Lựa chọn vật liệu'],
                  ['4', 'Thiết lập máy cắt'],
                  ['5', 'Gia công theo quy cách'],
                  ['6', 'Kiểm tra kích thước'],
                  ['7', 'Phân loại chi tiết'],
                  ['8', 'Chuyển sang gia công tiếp theo'],
                ].map(([number, title]) => (
                  <article key={number}>
                    <div className="manufacturing-cutting-small-slot" aria-hidden="true" />
                    <span>{number}</span>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-cutting-categories">
              <h2>{t('Các hạng mục gia công')}</h2>
              <div className="manufacturing-cutting-category-grid">
                {[
                  [
                    'Cắt gỗ tự nhiên',
                    'Gia công gỗ theo kích thước và chiều vân phù hợp với thiết kế sản phẩm.',
                  ],
                  [
                    'Cắt gỗ kỹ thuật',
                    'Cắt plywood, MDF, ván dăm và các loại panel theo bản vẽ kỹ thuật.',
                  ],
                  ['Cắt Foam', 'Gia công foam theo hình dạng và kích thước phục vụ sản phẩm bọc nệm.'],
                  [
                    'Cắt vật liệu bọc',
                    'Cắt vải, da và PU theo rập nhằm đảm bảo độ chính xác khi may và bọc.',
                  ],
                  [
                    'Cắt vật liệu tự nhiên',
                    'Chuẩn bị các chi tiết mây, tre và vật liệu tự nhiên theo yêu cầu sản xuất.',
                  ],
                  [
                    'Chuẩn bị bán thành phẩm',
                    'Phân loại và đánh dấu các chi tiết trước khi chuyển sang công đoạn gia công tiếp theo.',
                  ],
                ].map(([title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-cutting-large-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-cutting-controls">
            <h2>{t('Những yếu tố được kiểm soát')}</h2>
            <div className="manufacturing-cutting-control-grid">
              {[
                [
                  'Kích thước',
                  'Đảm bảo chi tiết được cắt đúng kích thước theo bản vẽ kỹ thuật.',
                ],
                [
                  'Góc cắt',
                  'Kiểm soát góc cắt và sai số nhằm đảm bảo khả năng lắp ráp.',
                ],
                [
                  'Chất lượng bề mặt',
                  'Hạn chế sứt mẻ, nứt hoặc hư hỏng tại mép cắt.',
                ],
                [
                  'Hướng vân gỗ',
                  'Đảm bảo hướng vân phù hợp với yêu cầu thiết kế và thẩm mỹ.',
                ],
                [
                  'Tối ưu vật liệu',
                  'Sắp xếp phương án cắt hợp lý nhằm giảm hao hụt nguyên liệu.',
                ],
                [
                  'Truy xuất bán thành phẩm',
                  'Đánh dấu và quản lý từng chi tiết để phục vụ các công đoạn tiếp theo.',
                ],
              ].map(([title, description]) => (
                <article key={title}>
                  <div className="manufacturing-cutting-control-slot" aria-hidden="true" />
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-cutting-middle-row">
            <div className="manufacturing-cutting-equipment">
              <h2>{t('Thiết bị sử dụng')}</h2>
              <div className="manufacturing-cutting-equipment-grid">
                {[
                  ['Máy cưa bàn', 'Gia công các chi tiết gỗ theo kích thước tiêu chuẩn.'],
                  ['Máy cắt Panel', 'Cắt các loại tấm gỗ kỹ thuật với độ chính xác cao.'],
                  ['Máy CNC', 'Gia công các chi tiết có hình dạng phức tạp theo bản vẽ kỹ thuật.'],
                  ['Máy cắt Foam', 'Cắt foam theo kích thước và hình dạng yêu cầu.'],
                  ['Máy cắt vải', 'Kiểm tra kích thước và sai số sau khi cắt.'],
                  ['Thiết bị đo kiểm', 'Kiểm tra kích thước và sai số sau khi cắt.'],
                ].map(([title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-cutting-equipment-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-cutting-role-nesting">
              <section className="manufacturing-cutting-role">
                <h2>{t('Vai trò trong quy trình sản xuất')}</h2>
                <div className="manufacturing-cutting-role-flow">
                  {[
                    'Chuẩn bị vật liệu',
                    'Cắt',
                    'Gia công',
                    'Chà nhám',
                    'Hoàn thiện',
                    'Lắp ráp',
                  ].map((title, index, items) => (
                    <div className="manufacturing-cutting-role-item" key={title}>
                      <figure>
                        <div className="manufacturing-cutting-role-slot" aria-hidden="true" />
                        <figcaption>{t(title)}</figcaption>
                      </figure>
                      {index < items.length - 1 ? <span aria-hidden="true">→</span> : null}
                    </div>
                  ))}
                </div>
              </section>

              <section className="manufacturing-cutting-nesting">
                <div>
                  <h2>{t('Mẫu bố trí cắt tối ưu (Nesting Layout)')}</h2>
                  <div className="manufacturing-cutting-nesting-slot" aria-hidden="true" />
                </div>
                <ul>
                  {[
                    'Tối ưu diện tích tấm vật liệu',
                    'Giảm hao hụt nguyên liệu',
                    'Giảm chi phí sản xuất',
                    'Tăng hiệu quả sử dụng vật liệu',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
              </section>
            </div>
          </section>

          <section className="manufacturing-cutting-bottom-row">
            <div className="manufacturing-cutting-commitment">
              <h2>{t('Cam kết của ANSLIFE')}</h2>
              <div className="manufacturing-cutting-commitment-list">
                {[
                  'ANSLIFE kiểm soát công đoạn cắt theo bản vẽ kỹ thuật và quy trình sản xuất thống nhất nhằm đảm bảo độ chính xác của từng chi tiết, tối ưu sử dụng vật liệu và duy trì tính đồng nhất giữa mẫu duyệt và sản xuất hàng loạt.',
                  'Việc kiểm tra kích thước được thực hiện trước khi các chi tiết được chuyển sang công đoạn gia công tiếp theo, góp phần giảm sai lỗi và nâng cao hiệu quả sản xuất.',
                ].map((item) => (
                  <article key={item}>
                    <div className="manufacturing-cutting-commitment-slot" aria-hidden="true" />
                    <p>{t(item)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-cutting-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="manufacturing-cutting-related-grid">
                {[
                  [
                    'Chuẩn bị vật liệu',
                    'Kiểm tra và chuẩn bị nguyên liệu trước khi đưa vào sản xuất.',
                    '/manufacturing/production-process/material-preparation',
                  ],
                  [
                    'Gia công gỗ',
                    'Các công đoạn tạo hình, khoan, phay và hoàn thiện chi tiết sau khi cắt.',
                    '/manufacturing/production-process/woodworking',
                  ],
                  [
                    'Máy móc & Thiết bị',
                    'Hệ thống máy cắt, CNC và thiết bị đo kiểm phục vụ sản xuất.',
                    '/manufacturing/machinery-equipment',
                  ],
                  [
                    'Kiểm tra trong sản xuất',
                    'Quy trình kiểm soát chất lượng trong từng công đoạn gia công.',
                    '/quality-control/in-process-inspection',
                  ],
                ].map(([title, description, href]) => (
                  <Link className="manufacturing-cutting-related-card" key={title} to={toLocalizedPath(href)}>
                    <div className="manufacturing-cutting-related-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                    <span aria-hidden="true">›</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-cutting-cta">
            <div className="manufacturing-cutting-cta-copy">
              <h2>{t('Cần gia công cắt vật liệu theo bản vẽ kỹ thuật?')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, BOM, quy cách vật liệu hoặc yêu cầu dung sai để ANSLIFE kiểm tra phương án cắt, tối ưu vật liệu và chuẩn bị bán thành phẩm cho các công đoạn sản xuất tiếp theo.',
                )}
              </p>
            </div>
            <div className="manufacturing-cutting-cta-actions">
              <Link to={toLocalizedPath('/contact/request-quotation')}>
                {t('Gửi yêu cầu')} <span aria-hidden="true">→</span>
              </Link>
              <Link to={toLocalizedPath('/about-anslife/company-info')}>
                {t('Liên hệ ANSLIFE')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        </section>
      )}
      {isManufacturingMaterialPreparationPage && (
        <section className="manufacturing-material-preparation-content">
          <section className="manufacturing-material-preparation-top-row">
            <div className="manufacturing-material-preparation-process">
              <h2>{t('Quy trình chuẩn bị vật liệu')}</h2>
              <div className="manufacturing-material-preparation-process-list">
                {[
                  ['1', 'Tiếp nhận vật liệu'],
                  ['2', 'Kiểm tra hồ sơ & quy cách'],
                  ['3', 'Kiểm tra chất lượng'],
                  ['4', 'Kiểm soát độ ẩm (đối với gỗ)'],
                  ['5', 'Phân loại vật liệu'],
                  ['6', 'Lưu kho theo quy định'],
                  ['7', 'Cấp phát cho sản xuất'],
                ].map(([number, title]) => (
                  <article key={number}>
                    <div className="manufacturing-material-preparation-small-slot" aria-hidden="true" />
                    <span>{number}</span>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-material-preparation-checks">
              <h2>{t('Các hạng mục kiểm tra')}</h2>
              <div className="manufacturing-material-preparation-check-grid">
                {[
                  [
                    'Kiểm tra quy cách',
                    'Đối chiếu kích thước, chủng loại và thông số kỹ thuật với yêu cầu của đơn hàng.',
                  ],
                  [
                    'Kiểm tra ngoại quan',
                    'Đánh giá bề mặt vật liệu, màu sắc, khuyết tật và các dấu hiệu ảnh hưởng đến chất lượng sản phẩm.',
                  ],
                  [
                    'Kiểm soát độ ẩm',
                    'Đo và kiểm soát độ ẩm của gỗ theo tiêu chuẩn kỹ thuật trước khi gia công.',
                  ],
                  [
                    'Phân loại vật liệu',
                    'Sắp xếp theo chủng loại, quy cách và mục đích sử dụng nhằm tối ưu quá trình sản xuất.',
                  ],
                  [
                    'Truy xuất nguồn gốc',
                    'Quản lý lô vật liệu để đảm bảo khả năng truy xuất trong suốt quá trình sản xuất.',
                  ],
                  [
                    'Lưu kho',
                    'Bảo quản vật liệu trong điều kiện phù hợp nhằm duy trì chất lượng trước khi đưa vào sản xuất.',
                  ],
                ].map(([title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-material-preparation-large-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-material-preparation-materials">
            <h2>{t('Vật liệu được chuẩn bị')}</h2>
            <div className="manufacturing-material-preparation-material-grid">
              {[
                [
                  'Gỗ tự nhiên',
                  'Cao su, Ash, Oak, Beech, Acacia, Pine và các loại gỗ khác theo yêu cầu dự án.',
                ],
                ['Gỗ kỹ thuật', 'Plywood, MDF, ván dăm và các loại tấm công nghiệp.'],
                [
                  'Mây & Tre',
                  'Nguyên liệu tự nhiên phục vụ các sản phẩm mây tre và chi tiết trang trí.',
                ],
                ['Foam & Vật liệu bọc', 'Foam, vải, da, PU và các vật liệu đệm.'],
                ['Phụ kiện', 'Bản lề, ray trượt, tay nắm, vít và các linh kiện lắp ráp.'],
                [
                  'Vật liệu hoàn thiện',
                  'Sơn, stain, lacquer, dầu hoàn thiện và các vật liệu phủ bề mặt.',
                ],
              ].map(([title, description]) => (
                <article key={title}>
                  <div className="manufacturing-material-preparation-material-slot" aria-hidden="true" />
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-material-preparation-bottom-row">
            <div className="manufacturing-material-preparation-control-panel">
              <h2>{t('Những yếu tố được kiểm soát')}</h2>
              <div className="manufacturing-material-preparation-control-list">
                {[
                  [
                    'Đúng chủng loại',
                    'Đảm bảo vật liệu đúng theo yêu cầu của bản vẽ và BOM.',
                  ],
                  [
                    'Chất lượng ổn định',
                    'Kiểm tra sự đồng nhất giữa các lô vật liệu trước khi đưa vào sản xuất.',
                  ],
                  [
                    'Điều kiện bảo quản',
                    'Kiểm soát môi trường lưu kho phù hợp với từng nhóm vật liệu.',
                  ],
                  [
                    'Truy xuất vật liệu',
                    'Ghi nhận thông tin lô hàng và quá trình sử dụng để phục vụ truy xuất khi cần thiết.',
                  ],
                  [
                    'Sẵn sàng sản xuất',
                    'Đảm bảo vật liệu được chuẩn bị đầy đủ trước khi cấp phát cho từng công đoạn.',
                  ],
                ].map(([title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-material-preparation-list-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(title)}</h3>
                      <p>{t(description)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-material-preparation-role-panel">
              <h2>{t('Vai trò trong hệ thống sản xuất')}</h2>
              <div className="manufacturing-material-preparation-role-flow">
                {[
                  'Nhận vật liệu',
                  'Kiểm tra chất lượng',
                  'Kiểm soát độ ẩm',
                  'Phân loại',
                  'Lưu kho',
                  'Cấp phát',
                  'Gia công',
                ].map((title) => (
                  <article key={title}>
                    <div className="manufacturing-material-preparation-flow-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-material-preparation-commitment-panel">
              <h2>{t('Cam kết của ANSLIFE')}</h2>
              <p>
                {t(
                  'Việc chuẩn bị vật liệu được thực hiện theo quy trình thống nhất nhằm đảm bảo mọi nguyên liệu đưa vào sản xuất đều đáp ứng yêu cầu kỹ thuật và tiêu chuẩn chất lượng của từng dự án.',
                )}
              </p>
              <p>
                {t(
                  'Đây là nền tảng giúp ANSLIFE duy trì sự ổn định giữa mẫu phát triển và sản xuất hàng loạt, đồng thời giảm thiểu rủi ro trong các công đoạn tiếp theo.',
                )}
              </p>
              <div className="manufacturing-material-preparation-commitment-slot" aria-hidden="true" />
            </div>
          </section>

          <section className="manufacturing-material-preparation-related">
            <h2>{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="manufacturing-material-preparation-related-grid">
              {[
                [
                  'Nguyên liệu',
                  'Tìm hiểu các nhóm vật liệu được sử dụng trong sản xuất nội thất.',
                  '/materials',
                ],
                [
                  'Kiểm tra vật liệu',
                  'Quy trình kiểm tra chất lượng nguyên liệu đầu vào.',
                  '/quality-control/material-inspection',
                ],
                [
                  'Gia công gỗ',
                  'Công đoạn đầu tiên sau khi vật liệu được chuẩn bị.',
                  '/manufacturing/production-process/woodworking',
                ],
                [
                  'Kiểm soát độ ẩm',
                  'Quản lý độ ẩm của gỗ nhằm đảm bảo sự ổn định của sản phẩm.',
                  '/quality-control/moisture-control',
                ],
              ].map(([title, description, href]) => (
                <Link
                  className="manufacturing-material-preparation-related-card"
                  key={title}
                  to={toLocalizedPath(href)}
                >
                  <div className="manufacturing-material-preparation-related-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </div>
                  <span aria-hidden="true">›</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="manufacturing-material-preparation-cta">
            <div className="manufacturing-material-preparation-cta-copy">
              <h2>{t('Cần chuẩn bị vật liệu cho đơn hàng sản xuất?')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi BOM, bản vẽ kỹ thuật, tiêu chuẩn vật liệu hoặc yêu cầu dự án để ANSLIFE kiểm tra, phân loại và đề xuất phương án chuẩn bị vật liệu phù hợp trước khi đưa vào sản xuất.',
                )}
              </p>
            </div>
            <div className="manufacturing-material-preparation-cta-actions">
              <Link to={toLocalizedPath('/contact/request-quotation')}>
                {t('Gửi yêu cầu')} <span aria-hidden="true">→</span>
              </Link>
              <Link to={toLocalizedPath('/about-anslife/company-info')}>
                {t('Liên hệ ANSLIFE')} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        </section>
      )}
      {isManufacturingContainerLoadingPage && (
        <section className="manufacturing-container-loading-content">
          <section className="manufacturing-container-loading-goals">
            <h2>{t('Mục tiêu của quy trình xếp container')}</h2>
            <div className="manufacturing-container-loading-goal-grid">
              {[
                ['/assets/manufacturing/container-loading/goals/goal-01.webp', 'Bảo vệ hàng hóa', 'Hạn chế va đập, dịch chuyển và hư hỏng trong quá trình vận chuyển.'],
                ['/assets/manufacturing/container-loading/goals/goal-02.webp', 'Tối ưu không gian', 'Sắp xếp kiện hàng hợp lý để tận dụng tối đa dung tích container.'],
                ['/assets/manufacturing/container-loading/goals/goal-03.webp', 'Phân bổ tải trọng', 'Đảm bảo trọng lượng được phân bổ đồng đều nhằm tăng độ ổn định khi vận chuyển.'],
                ['/assets/manufacturing/container-loading/goals/goal-04.webp', 'Thuận tiện dỡ hàng', 'Sắp xếp theo thứ tự giao nhận và yêu cầu của khách hàng.'],
                ['/assets/manufacturing/container-loading/goals/goal-05.webp', 'Đáp ứng tiêu chuẩn Buyer', 'Tuân thủ quy cách xếp hàng và hướng dẫn logistics của từng dự án.'],
                ['/assets/manufacturing/container-loading/goals/goal-06.webp', 'Giảm chi phí vận chuyển', 'Tối ưu hệ số lấp đầy container và hạn chế phát sinh chi phí logistics.'],
              ].map(([image, title, description]) => (
                <article key={title}>
                  <div className="manufacturing-container-loading-card-image-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-container-loading-middle-row">
            <div className="manufacturing-container-loading-process">
              <h2>{t('Quy trình xếp container')}</h2>
              <div className="manufacturing-container-loading-process-flow">
                {[
                  ['/assets/manufacturing/container-loading/process/process-01.webp', 'Kiểm tra kiện hàng'],
                  ['/assets/manufacturing/container-loading/process/process-02.webp', 'Kiểm tra pallet'],
                  ['/assets/manufacturing/container-loading/process/process-03.webp', 'Lập sơ đồ xếp container'],
                  ['/assets/manufacturing/container-loading/process/process-04.webp', 'Đưa hàng vào container'],
                  ['/assets/manufacturing/container-loading/process/process-05.webp', 'Cố định kiện hàng'],
                  ['/assets/manufacturing/container-loading/process/process-06.webp', 'Kiểm tra an toàn'],
                  ['/assets/manufacturing/container-loading/process/process-07.webp', 'Niêm phong container'],
                  ['/assets/manufacturing/container-loading/process/process-08.webp', 'Xuất hàng'],
                ].map(([image, title], index) => (
                  <article key={title}>
                    <div className="manufacturing-container-loading-process-image-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                    <small>{index + 1}</small>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-container-loading-controls">
              <h2>{t('Những yếu tố được kiểm soát')}</h2>
              <div className="manufacturing-container-loading-control-grid">
                {[
                  ['/assets/manufacturing/container-loading/controls/control-01.webp', 'Kiểm tra kiện hàng', 'Xác nhận số lượng, mã hàng và tình trạng đóng gói trước khi xếp.'],
                  ['/assets/manufacturing/container-loading/controls/control-02.webp', 'Kiểm tra pallet', 'Đảm bảo pallet ổn định, đúng tải trọng và phù hợp với phương án xếp hàng.'],
                  ['/assets/manufacturing/container-loading/controls/control-03.webp', 'Phân bổ tải trọng', 'Bố trí trọng lượng hợp lý nhằm đảm bảo cân bằng container trong quá trình vận chuyển.'],
                  ['/assets/manufacturing/container-loading/controls/control-04.webp', 'Cố định hàng hóa', 'Sử dụng dây đai, thanh chèn và vật liệu bảo vệ để hạn chế dịch chuyển.'],
                  ['/assets/manufacturing/container-loading/controls/control-05.webp', 'Kiểm tra khoảng trống', 'Hạn chế khoảng trống lớn giúp giảm rung lắc và va chạm giữa các kiện hàng.'],
                  ['/assets/manufacturing/container-loading/controls/control-06.webp', 'Kiểm tra trước niêm phong', 'Đánh giá toàn bộ container trước khi đóng cửa và bàn giao cho đơn vị vận chuyển.'],
                ].map(([image, title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-container-loading-card-image-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-container-loading-types">
            <h2>{t('Các loại hình xếp hàng')}</h2>
            <div className="manufacturing-container-loading-type-grid">
              {[
                ['/assets/manufacturing/container-loading/types/type-01.webp', 'Nội thất nguyên chiếc', 'Xếp theo kích thước và khả năng chịu tải của từng sản phẩm.'],
                ['/assets/manufacturing/container-loading/types/type-02.webp', 'Knock-down (KD)', 'Tối ưu thể tích bằng cách xếp theo từng kiện và bộ sản phẩm.'],
                ['/assets/manufacturing/container-loading/types/type-03.webp', 'Linh kiện nội thất', 'Gom pallet theo mã hàng hoặc từng dự án.'],
                ['/assets/manufacturing/container-loading/types/type-04.webp', 'Hàng hỗn hợp (Mixed Container)', 'Kết hợp nhiều nhóm sản phẩm trong cùng container theo kế hoạch giao hàng.'],
                ['/assets/manufacturing/container-loading/types/type-05.webp', 'LCL', 'Chuẩn bị kiện hàng phù hợp với vận chuyển ghép container.'],
                ['/assets/manufacturing/container-loading/types/type-06.webp', 'FCL', 'Triển khai phương án xếp tối ưu cho container nguyên.'],
              ].map(([image, title, description]) => (
                <article key={title}>
                  <div className="manufacturing-container-loading-image-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-container-loading-bottom-row">
            <div className="manufacturing-container-loading-capability">
              <h2>{t('Năng lực xếp container của ANSLIFE')}</h2>
              <div className="manufacturing-container-loading-capability-grid">
                {[
                  ['/assets/manufacturing/container-loading/capability/capability-01.webp', 'Lập sơ đồ xếp hàng', 'Xây dựng phương án xếp container theo kích thước và tải trọng thực tế.'],
                  ['/assets/manufacturing/container-loading/capability/capability-02.webp', 'Kiểm soát an toàn', 'Đảm bảo hàng hóa được cố định chắc chắn trong suốt quá trình vận chuyển.'],
                  ['/assets/manufacturing/container-loading/capability/capability-03.webp', 'Phối hợp Logistics', 'Kết nối với đơn vị vận chuyển và lịch xuất hàng để đảm bảo tiến độ.'],
                  ['/assets/manufacturing/container-loading/capability/capability-04.webp', 'Hỗ trợ Supply Hub', 'Thực hiện gom hàng từ nhiều nhà máy và tổ chức xếp container tại Vietnam Supply Hub.'],
                ].map(([image, title, description]) => (
                  <article key={title}>
                    <div className="manufacturing-container-loading-card-image-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-container-loading-supply">
              <h2>{t('Xếp container trong chuỗi cung ứng của ANSLIFE')}</h2>
              <div className="manufacturing-container-loading-supply-flow">
                {[
                  ['/assets/manufacturing/container-loading/supply-chain/supply-01.webp', 'Sản xuất'],
                  ['/assets/manufacturing/container-loading/supply-chain/supply-02.webp', 'QC cuối'],
                  ['/assets/manufacturing/container-loading/supply-chain/supply-03.webp', 'Đóng gói'],
                  ['/assets/manufacturing/container-loading/supply-chain/supply-04.webp', 'Pallet hóa'],
                  ['/assets/manufacturing/container-loading/supply-chain/supply-05.webp', 'Xếp container'],
                  ['/assets/manufacturing/container-loading/supply-chain/supply-06.webp', 'Xuất khẩu'],
                  ['/assets/manufacturing/container-loading/supply-chain/supply-07.webp', 'Giao hàng'],
                ].map(([image, title]) => (
                  <article key={title}>
                    <div className="manufacturing-container-loading-supply-image-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-container-loading-cta">
            <div className="manufacturing-container-loading-cta-copy">
              <h2>{t('Cần lập phương án xếp container cho đơn hàng xuất khẩu?')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi quy cách sản phẩm, kích thước kiện hàng, tiêu chuẩn pallet hoặc lịch xuất hàng để ANSLIFE đánh giá và đề xuất phương án xếp container phù hợp.',
                )}
              </p>
            </div>
            <div className="manufacturing-container-loading-cta-actions">
              <a href="/contact/request-quotation">{t('Gửi yêu cầu')} <span aria-hidden="true">→</span></a>
              <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')} <span aria-hidden="true">→</span></a>
            </div>
          </section>
        </section>
      )}
      {isManufacturingPackingAreaPage && (
        <section className="manufacturing-packing-area-content">
          <section className="manufacturing-packing-area-stages">
            <h2>{t('Các công đoạn trong khu vực đóng gói')}</h2>
            <div className="manufacturing-packing-area-stage-grid">
              {[
                [
                  '1',
                  'Kiểm tra ngoại quan',
                  'Kiểm tra tình trạng sản phẩm sau lắp ráp và trước khi đóng gói.',
                  '/assets/manufacturing/packing-area/stages/stage-01.webp',
                ],
                [
                  '2',
                  'Vệ sinh sản phẩm',
                  'Làm sạch bụi, dấu bẩn và kiểm tra bề mặt hoàn thiện.',
                  '/assets/manufacturing/packing-area/stages/stage-02.webp',
                ],
                [
                  '3',
                  'Bảo vệ sản phẩm',
                  'Sử dụng túi PE, foam bảo vệ, bảo vệ cạnh và các vật liệu phù hợp để giảm rủi ro hư hỏng.',
                  '/assets/manufacturing/packing-area/stages/stage-03.webp',
                ],
                [
                  '4',
                  'Đóng thùng',
                  'Đóng gói theo đúng quy cách, kích thước và hướng dẫn của từng dự án.',
                  '/assets/manufacturing/packing-area/stages/stage-04.webp',
                ],
                [
                  '5',
                  'Ghi nhãn',
                  'Dán nhãn sản phẩm, mã hàng, ký hiệu vận chuyển và các thông tin theo yêu cầu của buyer.',
                  '/assets/manufacturing/packing-area/stages/stage-05.webp',
                ],
                [
                  '6',
                  'Chuyển sang khu vực xuất hàng',
                  'Kiện hàng được chuyển đến khu vực pallet hoặc chờ xếp container.',
                  '/assets/manufacturing/packing-area/stages/stage-06.webp',
                ],
              ].map(([number, title, description, image]) => (
                <article key={number}>
                  <div className="manufacturing-packing-area-stage-head">
                    <span>{number}</span>
                  </div>
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                  <div className="manufacturing-packing-area-image-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-packing-area-system-row">
            <div className="manufacturing-packing-area-materials">
              <h2>{t('Hệ thống vật liệu đóng gói')}</h2>
              <div className="manufacturing-packing-area-material-grid">
                {[
                  [
                    'Túi PE',
                    'Bảo vệ bề mặt khỏi bụi và hơi ẩm.',
                    '/assets/manufacturing/packing-area/materials/material-01.webp',
                  ],
                  [
                    'Foam bảo vệ',
                    'Giảm va đập và chống rung.',
                    '/assets/manufacturing/packing-area/materials/material-02.webp',
                  ],
                  [
                    'Bảo vệ cạnh',
                    'Bảo vệ các góc và cạnh dễ hư hỏng.',
                    '/assets/manufacturing/packing-area/materials/material-03.webp',
                  ],
                  [
                    'Thùng carton',
                    'Bao bì chính của sản phẩm.',
                    '/assets/manufacturing/packing-area/materials/material-04.webp',
                  ],
                  [
                    'Đai kiện',
                    'Giữ kiện hàng ổn định trong quá trình vận chuyển.',
                    '/assets/manufacturing/packing-area/materials/material-05.webp',
                  ],
                  [
                    'Pallet',
                    'Chuẩn bị cho lưu kho và xếp container.',
                    '/assets/manufacturing/packing-area/materials/material-06.webp',
                  ],
                ].map(([title, description, image]) => (
                  <article key={title}>
                    <div className="manufacturing-packing-area-material-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-packing-area-process">
              <h2>{t('Quy trình đóng gói')}</h2>
              <div className="manufacturing-packing-area-process-flow">
                {[
                  ['/assets/manufacturing/packing-area/process/process-01.webp', 'Sản phẩm hoàn thiện'],
                  ['/assets/manufacturing/packing-area/process/process-02.webp', 'Kiểm tra ngoại quan'],
                  ['/assets/manufacturing/packing-area/process/process-03.webp', 'Làm sạch sản phẩm'],
                  ['/assets/manufacturing/packing-area/process/process-04.webp', 'Lắp vật liệu bảo vệ'],
                  ['/assets/manufacturing/packing-area/process/process-05.webp', 'Đóng thùng carton'],
                  ['/assets/manufacturing/packing-area/process/process-06.webp', 'Dán nhãn'],
                  ['/assets/manufacturing/packing-area/process/process-07.webp', 'Đặt lên pallet'],
                  ['/assets/manufacturing/packing-area/process/process-08.webp', 'Chờ xuất hàng'],
                ].map(([image, title], index) => (
                  <article key={title}>
                    <div className="manufacturing-packing-area-process-image-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                    <small>{index + 1}</small>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-packing-area-controls">
            <h2>{t('Những yếu tố được kiểm soát')}</h2>
            <div className="manufacturing-packing-area-control-grid">
              {[
                ['Quy cách đóng gói', 'Đảm bảo đúng theo tiêu chuẩn của từng buyer hoặc từng thị trường.'],
                ['Vật liệu đóng gói', 'Kiểm tra chất lượng và tình trạng của tất cả vật liệu trước khi sử dụng.'],
                ['Nhãn sản phẩm', 'Kiểm tra mã hàng, số lượng, ký hiệu và thông tin vận chuyển.'],
                ['Độ an toàn', 'Đảm bảo sản phẩm được cố định chắc chắn trong thùng.'],
                ['Pallet hóa', 'Kiểm tra cách sắp xếp kiện hàng trên pallet trước khi lưu kho.'],
                ['Kiểm tra cuối', 'Xác nhận kiện hàng đạt yêu cầu trước khi chuyển sang khu vực xuất hàng.'],
              ].map(([title, description], index) => (
                <article key={title}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-packing-area-capability">
            <h2>{t('Năng lực đóng gói của ANSLIFE')}</h2>
            <div className="manufacturing-packing-area-capability-grid">
              {[
                [
                  'Đóng gói theo tiêu chuẩn Buyer',
                  'Thực hiện theo quy cách, hướng dẫn và tiêu chuẩn riêng của từng khách hàng.',
                  '/assets/manufacturing/packing-area/capability/capability-01.webp',
                ],
                [
                  'Đóng gói OEM / ODM',
                  'Hỗ trợ in logo, mã sản phẩm, hướng dẫn lắp ráp và nhận diện thương hiệu.',
                  '/assets/manufacturing/packing-area/capability/capability-02.webp',
                ],
                [
                  'Đóng gói Knock-down (KD)',
                  'Tối ưu thể tích vận chuyển và giảm chi phí logistics.',
                  '/assets/manufacturing/packing-area/capability/capability-03.webp',
                ],
                [
                  'Đóng gói cho dự án xuất khẩu',
                  'Triển khai đồng bộ cho các đơn hàng thương mại, khách sạn, văn phòng và chuỗi bán lẻ.',
                  '/assets/manufacturing/packing-area/capability/capability-04.webp',
                ],
              ].map(([title, description, image]) => (
                <article key={title}>
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </div>
                  <div className="manufacturing-packing-area-capability-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-packing-area-role">
            <div className="manufacturing-packing-area-role-slot" aria-hidden="true">
              <img src="/assets/manufacturing/packing-area/role/role-01.webp" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="manufacturing-packing-area-role-copy">
              <h2>{t('Vai trò của khu vực đóng gói')}</h2>
              <p>
                {t(
                  'Khu vực đóng gói là bước xác nhận cuối cùng trước khi sản phẩm rời nhà máy. Tại đây, mỗi sản phẩm đều được kiểm tra, bảo vệ và đóng gói theo quy trình thống nhất nhằm đảm bảo chất lượng trong quá trình lưu kho, vận chuyển và giao hàng quốc tế.',
                )}
              </p>
            </div>
            <div className="manufacturing-packing-area-role-grid">
              {[
                ['/assets/manufacturing/packing-area/role/role-02.webp', 'Bảo vệ tối ưu sản phẩm'],
                ['/assets/manufacturing/packing-area/role/role-03.webp', 'Giảm thiểu rủi ro hư hỏng'],
                ['/assets/manufacturing/packing-area/role/role-04.webp', 'Quy trình chuẩn hóa và kiểm soát'],
                ['/assets/manufacturing/packing-area/role/role-05.webp', 'Sẵn sàng cho xuất khẩu'],
              ].map(([image, title]) => (
                <article key={title}>
                  <div className="manufacturing-packing-area-role-image-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <h3>{t(title)}</h3>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-packing-area-cta">
            <div className="manufacturing-packing-area-cta-copy">
              <h2>{t('Cần xây dựng tiêu chuẩn đóng gói cho đơn hàng xuất khẩu?')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ sản phẩm, yêu cầu đóng gói, tiêu chuẩn carton, pallet hoặc quy cách logistics để ANSLIFE đánh giá và đề xuất phương án đóng gói phù hợp.',
                )}
              </p>
            </div>
            <div className="manufacturing-packing-area-cta-actions">
              <a href="/contact/request-quotation">{t('Gửi yêu cầu')} <span aria-hidden="true">→</span></a>
              <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')} <span aria-hidden="true">→</span></a>
            </div>
          </section>
        </section>
      )}
      {isManufacturingAssemblyLinePage && (
        <section className="manufacturing-assembly-line-content">
          <section className="manufacturing-assembly-line-stages">
            <h2>{t('Các công đoạn lắp ráp')}</h2>
            <div className="manufacturing-assembly-line-stage-grid">
              {[
                [
                  '01',
                  'Chuẩn bị linh kiện',
                  'Kiểm tra và phân loại các linh kiện trước khi đưa vào dây chuyền lắp ráp.',
                  '/assets/manufacturing/assembly-line/stages/stage-01.webp',
                ],
                [
                  '02',
                  'Lắp ráp kết cấu',
                  'Lắp ráp khung, mặt bàn, chân, cánh tủ và các bộ phận chính theo bản vẽ kỹ thuật.',
                  '/assets/manufacturing/assembly-line/stages/stage-02.webp',
                ],
                [
                  '03',
                  'Lắp phụ kiện',
                  'Lắp đặt bản lề, ray trượt, tay nắm, vít liên kết và các phụ kiện chức năng.',
                  '/assets/manufacturing/assembly-line/stages/stage-03.webp',
                ],
                [
                  '04',
                  'Cân chỉnh sản phẩm',
                  'Điều chỉnh kích thước, khe hở, độ cân bằng và khả năng vận hành của sản phẩm.',
                  '/assets/manufacturing/assembly-line/stages/stage-04.webp',
                ],
                [
                  '05',
                  'Kiểm tra vận hành',
                  'Đánh giá khả năng đóng mở, liên kết và độ ổn định trước khi chuyển sang QC.',
                  '/assets/manufacturing/assembly-line/stages/stage-05.webp',
                ],
                [
                  '06',
                  'Hoàn thiện trước QC',
                  'Làm sạch sản phẩm và kiểm tra ngoại quan trước khi kiểm tra chất lượng cuối cùng.',
                  '/assets/manufacturing/assembly-line/stages/stage-06.webp',
                ],
              ].map(([number, title, description, image]) => (
                <article key={number}>
                  <div className="manufacturing-assembly-line-stage-head">
                    <span>{number}</span>
                  </div>
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                  <div className="manufacturing-assembly-line-image-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <i aria-hidden="true">›</i>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-assembly-line-products">
            <h2>{t('Dây chuyền lắp ráp theo nhóm sản phẩm')}</h2>
            <div className="manufacturing-assembly-line-product-grid">
              {[
                ['Ghế', 'Lắp khung, mặt ngồi, tựa lưng, tay vịn và chân ghế.', '/assets/manufacturing/assembly-line/products/product-01.webp'],
                ['Bàn', 'Lắp mặt bàn, chân bàn và hệ liên kết.', '/assets/manufacturing/assembly-line/products/product-02.webp'],
                ['Tủ & Kệ', 'Lắp thân tủ, cánh, ray trượt, bản lề và phụ kiện.', '/assets/manufacturing/assembly-line/products/product-03.webp'],
                ['Nội thất bọc nệm', 'Lắp khung, foam, vật liệu bọc và phụ kiện hoàn thiện.', '/assets/manufacturing/assembly-line/products/product-04.webp'],
                ['Nội thất mây tre', 'Lắp khung, chi tiết đan và các bộ phận hoàn thiện.', '/assets/manufacturing/assembly-line/products/product-05.webp'],
                ['OEM / ODM', 'Triển khai quy trình lắp ráp theo yêu cầu riêng của từng dự án.', '/assets/manufacturing/assembly-line/products/product-06.webp'],
              ].map(([title, description, image]) => (
                <article key={title}>
                  <h3>{t(title)}</h3>
                  <p>{t(description)}</p>
                  <div className="manufacturing-assembly-line-product-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-assembly-line-middle-row">
            <div className="manufacturing-assembly-line-control">
              <h2>{t('Kiểm soát trong quá trình lắp ráp')}</h2>
              <div className="manufacturing-assembly-line-control-flow">
                {[
                  ['/assets/manufacturing/assembly-line/control/control-01.webp', 'Linh kiện'],
                  ['/assets/manufacturing/assembly-line/control/control-02.webp', 'Kiểm tra đầu vào'],
                  ['/assets/manufacturing/assembly-line/control/control-03.webp', 'Lắp ráp kết cấu'],
                  ['/assets/manufacturing/assembly-line/control/control-04.webp', 'Lắp phụ kiện'],
                  ['/assets/manufacturing/assembly-line/control/control-05.webp', 'Cân chỉnh'],
                  ['/assets/manufacturing/assembly-line/control/control-06.webp', 'Kiểm tra vận hành'],
                  ['/assets/manufacturing/assembly-line/control/control-07.webp', 'Kiểm tra ngoại quan'],
                  ['/assets/manufacturing/assembly-line/control/control-08.webp', 'Chuyển sang QC cuối'],
                ].map(([image, title]) => (
                  <article key={title}>
                    <div className="manufacturing-assembly-line-control-image-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-assembly-line-applications">
              <h2>{t('Ứng dụng')}</h2>
              <div className="manufacturing-assembly-line-application-grid">
                {[
                  ['/assets/manufacturing/assembly-line/applications/application-01.webp', 'Nội thất hoàn thiện'],
                  ['/assets/manufacturing/assembly-line/applications/application-02.webp', 'Nội thất Knock-down (KD)'],
                  ['/assets/manufacturing/assembly-line/applications/application-03.webp', 'Nội thất bọc nệm'],
                  ['/assets/manufacturing/assembly-line/applications/application-04.webp', 'Nội thất mây tre'],
                  ['/assets/manufacturing/assembly-line/applications/application-05.webp', 'OEM / ODM'],
                  ['/assets/manufacturing/assembly-line/applications/application-06.webp', 'Dự án khách sạn và thương mại'],
                ].map(([image, title]) => (
                  <article key={title}>
                    <div className="manufacturing-assembly-line-application-image-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-assembly-line-bottom-row">
            <div className="manufacturing-assembly-line-role">
              <div>
                <h2>{t('Vai trò của dây chuyền lắp ráp trong hệ thống sản xuất')}</h2>
                <p>
                  {t(
                    'Dây chuyền lắp ráp là bước chuyển từ các linh kiện riêng lẻ thành sản phẩm hoàn chỉnh. Mọi sản phẩm đều được kiểm tra về kết cấu, chức năng và ngoại quan trước khi chuyển sang kiểm tra chất lượng cuối cùng và đóng gói.',
                  )}
                </p>
                <p>
                  {t(
                    'Quy trình lắp ráp được xây dựng phù hợp với từng nhóm sản phẩm nhằm đảm bảo tính đồng nhất, hiệu quả sản xuất và đáp ứng yêu cầu kỹ thuật của từng buyer.',
                  )}
                </p>
              </div>
              <div className="manufacturing-assembly-line-wide-slot" aria-hidden="true">
                <img src="/assets/manufacturing/assembly-line/role/role-01.webp" alt="" loading="lazy" decoding="async" />
              </div>
            </div>

            <div className="manufacturing-assembly-line-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="manufacturing-assembly-line-related-grid">
                {[
                  [
                    '/assets/manufacturing/assembly-line/related/related-01.webp',
                    'Tổng quan nhà máy',
                    'Giới thiệu hệ thống tổ chức sản xuất của ANSLIFE.',
                    '/manufacturing/factory-overview',
                  ],
                  [
                    '/assets/manufacturing/assembly-line/related/related-02.webp',
                    'Máy móc & Thiết bị',
                    'Các công nghệ và thiết bị phục vụ sản xuất.',
                    '/manufacturing/machinery-equipment',
                  ],
                  [
                    '/assets/manufacturing/assembly-line/related/related-03.webp',
                    'Năng lực hoàn thiện',
                    'Quy trình xử lý bề mặt và hoàn thiện sản phẩm.',
                    '/manufacturing/finishing-capability',
                  ],
                  [
                    '/assets/manufacturing/assembly-line/related/related-04.webp',
                    'Kiểm tra cuối',
                    'Quy trình kiểm tra trước khi đóng gói và xuất khẩu.',
                    '/quality-control/final-inspection',
                  ],
                ].map(([image, title, description, href]) => (
                  <article key={title}>
                    <div className="manufacturing-assembly-line-related-image-slot" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                    <a href={href} aria-label={t(title)}>
                      <b aria-hidden="true">›</b>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-assembly-line-cta">
            <div className="manufacturing-assembly-line-cta-copy">
              <h2>{t('Cần tổ chức quy trình lắp ráp cho dự án nội thất?')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm, danh sách linh kiện hoặc tiêu chuẩn kỹ thuật để ANSLIFE đánh giá phương án lắp ráp, kiểm soát chất lượng và tổ chức sản xuất phù hợp.',
                )}
              </p>
            </div>
            <div className="manufacturing-assembly-line-cta-actions">
              <a href="/contact/request-quotation">{t('Gửi yêu cầu')} <span aria-hidden="true">→</span></a>
              <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')} <span aria-hidden="true">→</span></a>
            </div>
          </section>
        </section>
      )}
      {isManufacturingFinishingCapabilityPage && (
        <section className="manufacturing-finishing-capability-content">
          <section className="manufacturing-finishing-capability-capacity">
            <h2>{t('Năng lực hoàn thiện của ANSLIFE')}</h2>
            <div className="manufacturing-finishing-capability-capacity-grid">
              {[
                {
                  image: '/assets/manufacturing/finishing-capability/capacity/natural-wood.webp',
                  title: 'Hoàn thiện gỗ tự nhiên',
                  description: 'Giữ nguyên vẻ đẹp của vân gỗ hoặc xử lý màu sắc theo yêu cầu của từng bộ sưu tập.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/capacity/engineered-wood.webp',
                  title: 'Hoàn thiện gỗ kỹ thuật',
                  description:
                    'Áp dụng các giải pháp sơn và vật liệu phủ bề mặt nhằm tạo tính đồng nhất và độ bền cho sản phẩm.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/capacity/upholstery.webp',
                  title: 'Hoàn thiện nội thất bọc nệm',
                  description: 'Kiểm soát độ căng của vật liệu bọc, đường may và hình dáng tổng thể của sản phẩm.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/capacity/rattan-bamboo.webp',
                  title: 'Hoàn thiện mây tre',
                  description: 'Xử lý bề mặt và hoàn thiện màu sắc nhằm bảo vệ vật liệu tự nhiên và tăng giá trị thẩm mỹ.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/capacity/metal.webp',
                  title: 'Hoàn thiện kim loại',
                  description: 'Kết hợp các giải pháp sơn hoặc xử lý bề mặt phù hợp với yêu cầu thiết kế và môi trường sử dụng.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/capacity/custom.webp',
                  title: 'Hoàn thiện theo yêu cầu',
                  description: 'Phát triển màu sắc, bề mặt và hiệu ứng hoàn thiện theo mẫu hoặc tiêu chuẩn riêng của buyer.',
                },
              ].map(({ image, title, description }) => (
                <article key={title}>
                  <div className="manufacturing-finishing-capability-image-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="manufacturing-finishing-capability-capacity-copy">
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-finishing-capability-surface">
            <h2>{t('Các hệ hoàn thiện bề mặt')}</h2>
            <div className="manufacturing-finishing-capability-surface-grid">
              {[
                {
                  image: '/assets/manufacturing/finishing-capability/surface/natural-finish.webp',
                  title: 'Natural Finish',
                  description: 'Giữ nguyên màu sắc và vẻ đẹp tự nhiên của vật liệu.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/surface/stain-finish.webp',
                  title: 'Stain Finish',
                  description: 'Điều chỉnh màu sắc nhưng vẫn giữ được vân gỗ tự nhiên.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/surface/lacquer-finish.webp',
                  title: 'Lacquer Finish',
                  description: 'Tạo lớp phủ bảo vệ với độ bền và tính thẩm mỹ cao.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/surface/oil-finish.webp',
                  title: 'Oil Finish',
                  description: 'Làm nổi bật kết cấu tự nhiên và tạo cảm giác chân thực khi sử dụng.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/surface/matte-finish.webp',
                  title: 'Matte Finish',
                  description: 'Bề mặt mờ hiện đại, hạn chế phản xạ ánh sáng.',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/surface/custom-color-finish.webp',
                  title: 'Custom Color Finish',
                  description: 'Hoàn thiện theo bảng màu, mẫu chuẩn hoặc yêu cầu riêng của buyer.',
                },
              ].map(({ image, title, description }) => (
                <article key={title}>
                  <div className="manufacturing-finishing-capability-surface-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-finishing-capability-middle-row">
            <div className="manufacturing-finishing-capability-process">
              <h2>{t('Quy trình hoàn thiện')}</h2>
              <div className="manufacturing-finishing-capability-process-flow">
                {[
                  { image: '/assets/manufacturing/finishing-capability/process/sanding.webp', title: 'Chà nhám' },
                  {
                    image: '/assets/manufacturing/finishing-capability/process/surface-cleaning.webp',
                    title: 'Làm sạch bề mặt',
                  },
                  { image: '/assets/manufacturing/finishing-capability/process/base-treatment.webp', title: 'Xử lý nền' },
                  {
                    image: '/assets/manufacturing/finishing-capability/process/finish-application.webp',
                    title: 'Sơn hoặc hoàn thiện',
                  },
                  { image: '/assets/manufacturing/finishing-capability/process/drying.webp', title: 'Sấy khô' },
                  {
                    image: '/assets/manufacturing/finishing-capability/process/color-check.webp',
                    title: 'Kiểm tra màu sắc',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/process/visual-check.webp',
                    title: 'Kiểm tra ngoại quan',
                  },
                ].map(({ image, title }, index) => (
                  <article key={title}>
                    <span className="manufacturing-finishing-capability-flow-image" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <small>{index + 1}</small>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-finishing-capability-control">
              <h2>{t('Những yếu tố được kiểm soát')}</h2>
              <div className="manufacturing-finishing-capability-control-grid">
                {[
                  {
                    image: '/assets/manufacturing/finishing-capability/control/color.webp',
                    title: 'Màu sắc',
                    description: 'Đảm bảo đồng với mẫu duyệt và đồng đều giữa các lô sản xuất.',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/control/consistency.webp',
                    title: 'Độ đồng đều',
                    description: 'Kiểm soát sự nhất quán trên toàn bộ bề mặt sản phẩm.',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/control/surface-quality.webp',
                    title: 'Chất lượng bề mặt',
                    description: 'Kiểm tra độ mịn, độ phủ và ngoại quan sau hoàn thiện.',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/control/coating-adhesion.webp',
                    title: 'Liên kết lớp phủ',
                    description: 'Đảm bảo lớp hoàn thiện bám chắc vào bề mặt vật liệu.',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/control/lighting-check.webp',
                    title: 'Kiểm tra ánh sáng',
                    description: 'Đánh giá màu sắc và ngoại quan dưới điều kiện ánh sáng tiêu chuẩn.',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/control/final-check.webp',
                    title: 'Kiểm tra cuối',
                    description: 'Đánh giá tổng thể trước khi chuyển sang công đoạn đóng gói.',
                  },
                ].map(({ image, title, description }) => (
                  <article key={title}>
                    <span className="manufacturing-finishing-capability-flow-image" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-finishing-capability-applications">
            <h2>{t('Ứng dụng')}</h2>
            <div className="manufacturing-finishing-capability-application-grid">
              {[
                {
                  image: '/assets/manufacturing/finishing-capability/applications/home-furniture.webp',
                  title: 'Nội thất gia đình',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/applications/hotel-furniture.webp',
                  title: 'Nội thất khách sạn',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/applications/restaurant-furniture.webp',
                  title: 'Nội thất nhà hàng',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/applications/office-furniture.webp',
                  title: 'Nội thất văn phòng',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/applications/oem-odm.webp',
                  title: 'OEM / ODM',
                },
                {
                  image: '/assets/manufacturing/finishing-capability/applications/export-project.webp',
                  title: 'Dự án xuất khẩu',
                },
              ].map(({ image, title }) => (
                <article key={title}>
                  <h3>{t(title)}</h3>
                  <div className="manufacturing-finishing-capability-image-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-finishing-capability-bottom-row">
            <div className="manufacturing-finishing-capability-quality">
              <h2>{t('Hoàn thiện trong hệ thống chất lượng của ANSLIFE')}</h2>
              <div className="manufacturing-finishing-capability-quality-layout">
                <div>
                  <p>
                    {t(
                      'Tất cả các công đoạn hoàn thiện đều được đối chiếu với mẫu đã được phê duyệt và kiểm tra theo tiêu chuẩn chất lượng của từng dự án.',
                    )}
                  </p>
                  <p>
                    {t(
                      'Quá trình kiểm tra bao gồm màu sắc, ngoại quan, độ đồng đều và các yêu cầu kỹ thuật riêng của buyer trước khi sản phẩm được chuyển sang lắp ráp và đóng gói.',
                    )}
                  </p>
                </div>
                <div className="manufacturing-finishing-capability-wide-slot" aria-hidden="true">
                  <img
                    src="/assets/manufacturing/finishing-capability/quality/quality-system.webp"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            <div className="manufacturing-finishing-capability-value">
              <h2>{t('Vai trò của hoàn thiện trong chuỗi giá trị')}</h2>
              <div className="manufacturing-finishing-capability-value-flow">
                {[
                  {
                    image: '/assets/manufacturing/finishing-capability/value/aesthetic-value.webp',
                    title: 'Tăng giá trị thẩm mỹ',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/value/user-experience.webp',
                    title: 'Nâng cao trải nghiệm người dùng',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/value/surface-protection.webp',
                    title: 'Bảo vệ bề mặt sản phẩm',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/value/durability.webp',
                    title: 'Tăng tuổi thọ sản phẩm',
                  },
                  {
                    image: '/assets/manufacturing/finishing-capability/value/competitive-advantage.webp',
                    title: 'Tạo lợi thế cạnh tranh',
                  },
                ].map(({ image, title }) => (
                  <article key={title}>
                    <span className="manufacturing-finishing-capability-flow-image" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-finishing-capability-cta">
            <div className="manufacturing-finishing-capability-cta-copy">
              <h2>{t('Cần phát triển mẫu hoàn thiện cho dự án xuất khẩu?')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn hệ hoàn thiện, phối màu và kiểm soát mẫu chuẩn nhằm đảm bảo sản phẩm đạt yêu cầu thẩm mỹ, kỹ thuật và tiêu chuẩn của buyer.',
                )}
              </p>
            </div>
            <div className="manufacturing-finishing-capability-cta-actions">
              <a href="/contact/request-quotation">{t('Gửi yêu cầu')} <span aria-hidden="true">→</span></a>
              <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')} <span aria-hidden="true">→</span></a>
            </div>
          </section>
        </section>
      )}
      {isManufacturingMachineryEquipmentPage && (
        <section className="manufacturing-machinery-equipment-content">
          <section className="manufacturing-machinery-equipment-overview-row">
            <div className="manufacturing-machinery-equipment-flow-panel">
              <h2>{t('Hệ thống thiết bị sản xuất')}</h2>
              <div className="manufacturing-machinery-equipment-flow-list">
                {[
                  {
                    title: 'Khách hàng',
                    image: '/assets/manufacturing/factory-overview/system/customer.webp',
                  },
                  {
                    title: 'Phát triển sản phẩm',
                    image: '/assets/manufacturing/factory-overview/system/product-development.webp',
                  },
                  {
                    title: 'Lựa chọn nhà máy phù hợp',
                    image: '/assets/manufacturing/factory-overview/system/factory-matching.webp',
                  },
                  {
                    title: 'Tổ chức sản xuất',
                    image: '/assets/manufacturing/factory-overview/system/production-organization.webp',
                  },
                  {
                    title: 'QC độc lập',
                    image: '/assets/manufacturing/factory-overview/system/independent-qc.webp',
                  },
                  {
                    title: 'Đóng gói',
                    image: '/assets/manufacturing/factory-overview/system/packing.webp',
                  },
                  {
                    title: 'Xuất khẩu',
                    image: '/assets/manufacturing/factory-overview/system/export.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span className="manufacturing-machinery-equipment-flow-image" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(item.title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-machinery-equipment-production-panel">
              <h2>{t('Năng lực sản xuất')}</h2>
              <div className="manufacturing-machinery-equipment-production-capability-grid">
                {[
                  {
                    title: 'Nội thất hoàn thiện',
                    body: 'Sản xuất ghế, bàn, tủ, giường, kệ và các dòng nội thất hoàn thiện theo yêu cầu của khách hàng.',
                    image: '/assets/manufacturing/factory-overview/capability/finished-furniture.webp',
                  },
                  {
                    title: 'Linh kiện nội thất',
                    body: 'Gia công khung ghế, mặt bàn, chân ghế, chi tiết tủ, các khối bọc nệm và linh kiện mây tre.',
                    image: '/assets/manufacturing/factory-overview/capability/furniture-components.webp',
                  },
                  {
                    title: 'Gia công vật liệu',
                    body: 'Gia công gỗ tự nhiên, gỗ kỹ thuật, ván MDF và các chi tiết hoàn thiện.',
                    image: '/assets/manufacturing/factory-overview/capability/material-processing.webp',
                  },
                  {
                    title: 'OEM / ODM',
                    body: 'Phát triển và sản xuất sản phẩm theo bản vẽ, mẫu hoặc yêu cầu kỹ thuật của buyer.',
                    image: '/assets/manufacturing/factory-overview/capability/oem-odm.webp',
                  },
                  {
                    title: 'Dự án xuất khẩu',
                    body: 'Kết nối sản xuất với lưu kho, gom hàng và đáp ứng đơn xuất theo từng dự án.',
                    image: '/assets/manufacturing/factory-overview/capability/export-project.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span className="manufacturing-machinery-equipment-production-capability-image" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-machinery-equipment-system">
            <h2>{t('Hệ thống thiết bị sản xuất')}</h2>
            <div className="manufacturing-machinery-equipment-system-grid">
              {[
                {
                  image: '/assets/manufacturing/machinery-equipment/system/wood-processing.webp',
                  title: '1. Gia công gỗ',
                  description:
                    'Máy cắt, máy cưa, máy bào, máy soi và các thiết bị gia công gỗ phục vụ sản xuất linh kiện và nội thất hoàn thiện.',
                },
                {
                  image: '/assets/manufacturing/machinery-equipment/system/cnc-processing.webp',
                  title: '2. Gia công CNC',
                  description:
                    'Máy CNC phục vụ cắt, khoan, phay và gia công các chi tiết có độ chính xác cao theo bản vẽ kỹ thuật.',
                },
                {
                  image: '/assets/manufacturing/machinery-equipment/system/sanding.webp',
                  title: '3. Chà nhám',
                  description: 'Hệ thống chà nhám giúp tạo bề mặt đồng đều trước khi hoàn thiện sơn hoặc lắp ráp.',
                },
                {
                  image: '/assets/manufacturing/machinery-equipment/system/finishing.webp',
                  title: '4. Sơn hoàn thiện',
                  description:
                    'Thiết bị phun sơn, buồng sơn và hệ thống sấy phục vụ nhiều phương pháp hoàn thiện bề mặt theo yêu cầu của từng dự án.',
                },
                {
                  image: '/assets/manufacturing/machinery-equipment/system/upholstery.webp',
                  title: '5. Bọc nệm',
                  description: 'Thiết bị cắt foam, may và bọc nệm phục vụ các sản phẩm sofa, ghế và nội thất bọc nệm.',
                },
                {
                  image: '/assets/manufacturing/machinery-equipment/system/assembly.webp',
                  title: '6. Lắp ráp',
                  description:
                    'Khu vực và thiết bị hỗ trợ lắp ráp, kiểm tra kích thước và hoàn thiện sản phẩm trước khi kiểm tra chất lượng.',
                },
                {
                  image: '/assets/manufacturing/machinery-equipment/system/packing.webp',
                  title: '7. Đóng gói',
                  description: 'Thiết bị đóng gói, quấn màng, đai kiện và chuẩn bị pallet phục vụ xuất khẩu.',
                },
                {
                  image: '/assets/manufacturing/machinery-equipment/system/inspection.webp',
                  title: '8. Thiết bị kiểm tra',
                  description:
                    'Thiết bị đo lường và kiểm tra hỗ trợ kiểm soát chất lượng trong quá trình sản xuất và trước khi xuất hàng.',
                },
              ].map(({ image, title, description }) => (
                <article key={title}>
                  <div className="manufacturing-machinery-equipment-image-slot" aria-hidden="true">
                    <img src={image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="manufacturing-machinery-equipment-system-copy">
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-machinery-equipment-middle-row">
            <div className="manufacturing-machinery-equipment-technology">
              <h2>{t('Công nghệ gia công')}</h2>
              <div className="manufacturing-machinery-equipment-technology-grid">
                {[
                  {
                    image: '/assets/manufacturing/machinery-equipment/technology/cnc-processing.webp',
                    title: 'Gia công CNC',
                    description: 'Gia công chính xác theo bản vẽ kỹ thuật.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/technology/drilling-milling.webp',
                    title: 'Khoan & Phay',
                    description: 'Đảm bảo độ chính xác của các mối liên kết và chi tiết sản phẩm.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/technology/sanding.webp',
                    title: 'Chà nhám',
                    description: 'Tạo bề mặt đồng đều trước khi hoàn thiện.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/technology/spray-finishing.webp',
                    title: 'Phun sơn',
                    description: 'Đáp ứng nhiều hệ sơn và yêu cầu hoàn thiện khác nhau.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/technology/upholstery.webp',
                    title: 'Bọc nệm',
                    description: 'Gia công các sản phẩm bọc với độ chính xác và tính thẩm mỹ cao.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/technology/export-packing.webp',
                    title: 'Đóng gói',
                    description: 'Chuẩn bị sản phẩm theo tiêu chuẩn xuất khẩu quốc tế.',
                  },
                ].map(({ image, title, description }) => (
                  <article key={title}>
                    <span className="manufacturing-machinery-equipment-technology-image" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-machinery-equipment-capability">
              <h2>{t('Năng lực hỗ trợ sản xuất')}</h2>
              <div className="manufacturing-machinery-equipment-capability-grid">
                {[
                  {
                    image: '/assets/manufacturing/machinery-equipment/capability/multi-material.webp',
                    title: 'Gia công đa vật liệu',
                    description: 'Gỗ tự nhiên, gỗ kỹ thuật, mây tre, kim loại và vật liệu bọc.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/capability/oem-odm.webp',
                    title: 'Sản xuất OEM / ODM',
                    description: 'Triển khai sản xuất theo bản vẽ và tiêu chuẩn riêng của buyer.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/capability/export-project.webp',
                    title: 'Dự án xuất khẩu',
                    description: 'Đáp ứng các đơn hàng thương mại và dự án nội thất quy mô lớn.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/capability/quality-control.webp',
                    title: 'Kiểm soát chất lượng',
                    description:
                      'Thiết bị sản xuất kết hợp với quy trình QC nhằm đảm bảo chất lượng ổn định.',
                  },
                ].map(({ image, title, description }) => (
                  <article key={title}>
                    <span aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-machinery-equipment-bottom-row">
            <div className="manufacturing-machinery-equipment-role">
              <h2>{t('Vai trò của thiết bị trong quy trình sản xuất')}</h2>
              <div className="manufacturing-machinery-equipment-role-flow">
                {[
                  { image: '/assets/manufacturing/machinery-equipment/role/materials.webp', title: 'Nguyên liệu' },
                  { image: '/assets/manufacturing/machinery-equipment/role/processing.webp', title: 'Gia công' },
                  { image: '/assets/manufacturing/machinery-equipment/role/sanding.webp', title: 'Chà nhám' },
                  { image: '/assets/manufacturing/machinery-equipment/role/finishing.webp', title: 'Hoàn thiện' },
                  { image: '/assets/manufacturing/machinery-equipment/role/assembly.webp', title: 'Lắp ráp' },
                  { image: '/assets/manufacturing/machinery-equipment/role/qc.webp', title: 'QC' },
                  { image: '/assets/manufacturing/machinery-equipment/role/packing.webp', title: 'Đóng gói' },
                ].map(({ image, title }) => (
                  <article key={title}>
                    <span className="manufacturing-machinery-equipment-role-image" aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-machinery-equipment-investment">
              <h2>{t('Định hướng đầu tư')}</h2>
              <div className="manufacturing-machinery-equipment-investment-grid">
                {[
                  {
                    image: '/assets/manufacturing/machinery-equipment/investment/precision.webp',
                    title: 'Nâng cao độ chính xác',
                    description: 'Đầu tư thiết bị phù hợp nhằm đảm bảo độ ổn định của sản phẩm.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/investment/efficiency.webp',
                    title: 'Tăng hiệu quả sản xuất',
                    description: 'Cải thiện năng suất và tối ưu quy trình sản xuất.',
                  },
                  {
                    image: '/assets/manufacturing/machinery-equipment/investment/sustainable.webp',
                    title: 'Phát triển bền vững',
                    description: 'Ưu tiên công nghệ giúp sử dụng vật liệu hiệu quả và giảm lãng phí trong sản xuất.',
                  },
                ].map(({ image, title, description }) => (
                  <article key={title}>
                    <span aria-hidden="true">
                      <img src={image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-machinery-equipment-cta">
            <div className="manufacturing-machinery-equipment-cta-copy">
              <h2>{t('Cần đánh giá năng lực thiết bị cho dự án của bạn?')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn phương án sản xuất phù hợp với yêu cầu kỹ thuật, tiêu chuẩn hoàn thiện và tiến độ giao hàng của từng dự án nội thất xuất khẩu.',
                )}
              </p>
            </div>
            <div className="manufacturing-machinery-equipment-cta-actions">
              <a href="/contact/request-quotation">{t('Gửi yêu cầu')} <span aria-hidden="true">→</span></a>
              <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')} <span aria-hidden="true">→</span></a>
            </div>
          </section>
        </section>
      )}
      {isManufacturingFactoryOverviewPage && (
        <section className="manufacturing-factory-overview-content">
          <section className="manufacturing-factory-overview-top-row">
            <div className="manufacturing-factory-overview-system">
              <h2>{t('Hệ thống sản xuất của ANSLIFE')}</h2>
              <div className="manufacturing-factory-overview-system-flow">
                {[
                  {
                    title: 'Khách hàng',
                    image: '/assets/manufacturing/factory-overview/system/customer.webp',
                  },
                  {
                    title: 'Phát triển sản phẩm',
                    image: '/assets/manufacturing/factory-overview/system/product-development.webp',
                  },
                  {
                    title: 'Lựa chọn nhà máy phù hợp',
                    image: '/assets/manufacturing/factory-overview/system/factory-matching.webp',
                  },
                  {
                    title: 'Tổ chức sản xuất',
                    image: '/assets/manufacturing/factory-overview/system/production-organization.webp',
                  },
                  {
                    title: 'QC độc lập',
                    image: '/assets/manufacturing/factory-overview/system/independent-qc.webp',
                  },
                  {
                    title: 'Đóng gói',
                    image: '/assets/manufacturing/factory-overview/system/packing.webp',
                  },
                  {
                    title: 'Xuất khẩu',
                    image: '/assets/manufacturing/factory-overview/system/export.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span className="manufacturing-factory-overview-system-image" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(item.title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-factory-overview-capability">
              <h2>{t('Năng lực sản xuất')}</h2>
              <div className="manufacturing-factory-overview-capability-grid">
                {[
                  {
                    title: 'Nội thất hoàn thiện',
                    body: 'Sản xuất ghế, bàn, tủ, giường, kệ và các dòng nội thất hoàn thiện theo yêu cầu của khách hàng.',
                    image: '/assets/manufacturing/factory-overview/capability/finished-furniture.webp',
                  },
                  {
                    title: 'Linh kiện nội thất',
                    body: 'Gia công khung ghế, mặt bàn, chân gỗ, chi tiết tủ, cấu kiện bọc nệm và linh kiện mây tre.',
                    image: '/assets/manufacturing/factory-overview/capability/furniture-components.webp',
                  },
                  {
                    title: 'Gia công vật liệu',
                    body: 'Gia công gỗ tự nhiên, gỗ kỹ thuật, vật liệu bọc và các chi tiết hoàn thiện.',
                    image: '/assets/manufacturing/factory-overview/capability/material-processing.webp',
                  },
                  {
                    title: 'OEM / ODM',
                    body: 'Phát triển và sản xuất sản phẩm theo bản vẽ, mẫu hoặc yêu cầu kỹ thuật của buyer.',
                    image: '/assets/manufacturing/factory-overview/capability/oem-odm.webp',
                  },
                  {
                    title: 'Dự án xuất khẩu',
                    body: 'Kết nối sản xuất với lưu kho, gom hàng và điều phối xuất khẩu theo từng dự án.',
                    image: '/assets/manufacturing/factory-overview/capability/export-project.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span className="manufacturing-factory-overview-capability-image" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-factory-overview-production">
            <h2>{t('Hệ thống sản xuất')}</h2>
            <div className="manufacturing-factory-overview-production-grid">
              {[
                {
                  number: '1',
                  title: 'Chuẩn bị vật liệu',
                  body: 'Kiểm tra nguyên liệu đầu vào, độ ẩm và tiêu chuẩn vật liệu trước khi đưa vào sản xuất.',
                  image: '/assets/manufacturing/factory-overview/production-system/material-preparation.webp',
                },
                {
                  number: '2',
                  title: 'Gia công',
                  body: 'Gia công gỗ, kim loại, mây tre và các cấu kiện theo bản vẽ kỹ thuật.',
                  image: '/assets/manufacturing/factory-overview/production-system/processing.webp',
                },
                {
                  number: '3',
                  title: 'Hoàn thiện',
                  body: 'Chà nhám, sơn hoàn thiện, bọc nệm, lắp ráp và xử lý bề mặt.',
                  image: '/assets/manufacturing/factory-overview/production-system/finishing.webp',
                },
                {
                  number: '4',
                  title: 'Kiểm tra chất lượng',
                  body: 'Kiểm soát chất lượng tại từng công đoạn và kiểm tra cuối trước khi đóng gói.',
                  image: '/assets/manufacturing/factory-overview/production-system/quality-control.webp',
                },
                {
                  number: '5',
                  title: 'Đóng gói & Xuất khẩu',
                  body: 'Đóng gói theo tiêu chuẩn buyer, lưu kho và điều phối xuất khẩu.',
                  image: '/assets/manufacturing/factory-overview/production-system/packing-export.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="manufacturing-factory-overview-image-slot" aria-hidden="true">
                    {item.image ? <img src={item.image} alt="" loading="lazy" decoding="async" /> : null}
                  </div>
                  <div className="manufacturing-factory-overview-production-copy">
                    <span>{item.number}</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="manufacturing-factory-overview-middle-row">
            <div className="manufacturing-factory-overview-products">
              <h2>{t('Các nhóm sản phẩm sản xuất')}</h2>
              <div className="manufacturing-factory-overview-product-grid">
                {[
                  {
                    title: 'Nội thất hoàn thiện',
                    image: '/assets/manufacturing/factory-overview/product-groups/finished-furniture.webp',
                  },
                  {
                    title: 'Nội thất bọc nệm',
                    image: '/assets/manufacturing/factory-overview/product-groups/upholstered-furniture.webp',
                  },
                  {
                    title: 'Nội thất mây tre',
                    image: '/assets/manufacturing/factory-overview/product-groups/rattan-bamboo-furniture.webp',
                  },
                  {
                    title: 'Nội thất ngoài trời',
                    image: '/assets/manufacturing/factory-overview/product-groups/outdoor-furniture.webp',
                  },
                  {
                    title: 'Linh kiện nội thất',
                    image: '/assets/manufacturing/factory-overview/product-groups/furniture-components.webp',
                  },
                  {
                    title: 'OEM / ODM',
                    image: '/assets/manufacturing/factory-overview/product-groups/oem-odm.webp',
                  },
                  {
                    title: 'Hospitality Furniture',
                    image: '/assets/manufacturing/factory-overview/product-groups/hospitality-furniture.webp',
                  },
                  {
                    title: 'Commercial Furniture',
                    image: '/assets/manufacturing/factory-overview/product-groups/commercial-furniture.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="manufacturing-factory-overview-image-slot" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(item.title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-factory-overview-control">
              <h2>{t('Hệ thống kiểm soát')}</h2>
              <div className="manufacturing-factory-overview-control-grid">
                {[
                  {
                    title: 'Kiểm soát vật liệu',
                    body: 'Kiểm tra nguyên liệu theo tiêu chuẩn kỹ thuật trước khi sản xuất.',
                    image: '/assets/manufacturing/factory-overview/control-system/material-control.webp',
                  },
                  {
                    title: 'Kiểm soát sản xuất',
                    body: 'Theo dõi từng công đoạn nhằm đảm bảo đúng quy trình và bản vẽ.',
                    image: '/assets/manufacturing/factory-overview/control-system/production-control.webp',
                  },
                  {
                    title: 'Kiểm soát chất lượng',
                    body: 'QC độc lập trong suốt quá trình sản xuất và trước khi xuất hàng.',
                    image: '/assets/manufacturing/factory-overview/control-system/quality-control.webp',
                  },
                  {
                    title: 'Kiểm soát tiến độ',
                    body: 'Theo dõi kế hoạch sản xuất và tiến độ giao hàng của từng dự án.',
                    image: '/assets/manufacturing/factory-overview/control-system/schedule-control.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span className="manufacturing-factory-overview-control-image" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="manufacturing-factory-overview-operations">
              <h2>{t('Năng lực vận hành của ANSLIFE')}</h2>
              <div className="manufacturing-factory-overview-operation-flow">
                {[
                  {
                    title: 'Quản lý dự án',
                    image: '/assets/manufacturing/factory-overview/operations/project-management.webp',
                  },
                  {
                    title: 'Quản lý sản xuất',
                    image: '/assets/manufacturing/factory-overview/operations/production-management.webp',
                  },
                  {
                    title: 'Quản lý chất lượng',
                    image: '/assets/manufacturing/factory-overview/operations/quality-management.webp',
                  },
                  {
                    title: 'Quản lý đóng gói',
                    image: '/assets/manufacturing/factory-overview/operations/packing-management.webp',
                  },
                  {
                    title: 'Quản lý logistics',
                    image: '/assets/manufacturing/factory-overview/operations/logistics-management.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span className="manufacturing-factory-overview-operation-image" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(item.title)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-factory-overview-bottom-row">
            <div className="manufacturing-factory-overview-supply-chain">
              <h2>{t('Đóng gói trong hệ thống supply chain của ANSLIFE')}</h2>
              <div className="manufacturing-factory-overview-supply-flow">
                {[
                  {
                    title: 'Thiết kế sản phẩm',
                    image: '/assets/manufacturing/factory-overview/supply-chain/product-design.webp',
                  },
                  {
                    title: 'Sản xuất',
                    image: '/assets/manufacturing/factory-overview/supply-chain/production.webp',
                  },
                  {
                    title: 'QC',
                    image: '/assets/manufacturing/factory-overview/supply-chain/qc.webp',
                  },
                  {
                    title: 'Đóng gói',
                    image: '/assets/manufacturing/factory-overview/supply-chain/packing.webp',
                  },
                  {
                    title: 'Lưu kho',
                    image: '/assets/manufacturing/factory-overview/supply-chain/storage.webp',
                  },
                  {
                    title: 'Gom hàng',
                    image: '/assets/manufacturing/factory-overview/supply-chain/consolidation.webp',
                  },
                  {
                    title: 'Xếp container',
                    image: '/assets/manufacturing/factory-overview/supply-chain/container-loading.webp',
                  },
                  {
                    title: 'Xuất khẩu',
                    image: '/assets/manufacturing/factory-overview/supply-chain/export.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span className="manufacturing-factory-overview-supply-image" aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <h3>{t(item.title)}</h3>
                  </article>
                ))}
              </div>
              <p>{t('Kiểm soát đồng bộ - Thông tin xuyên suốt - Chất lượng nhất quán - Giao hàng đúng hẹn')}</p>
            </div>

            <div className="manufacturing-factory-overview-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="manufacturing-factory-overview-related-grid">
                {[
                  ['Quy trình sản xuất', 'Tìm hiểu các công đoạn từ chuẩn bị vật liệu đến đóng gói.'],
                  ['Máy móc & Thiết bị', 'Hệ thống thiết bị phục vụ gia công và sản xuất.'],
                  ['Chất lượng & Tiêu chuẩn', 'Quy trình kiểm soát chất lượng trong toàn bộ hệ thống sản xuất.'],
                  ['Vietnam Supply Hub', 'Giải pháp lưu kho, gom hàng và điều phối xuất khẩu.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                    <span aria-hidden="true">›</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="manufacturing-factory-overview-cta">
            <div className="manufacturing-factory-overview-cta-copy">
              <h2>{t('Trao đổi về năng lực sản xuất cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm, tiêu chuẩn chất lượng hoặc kế hoạch đơn hàng để ANSLIFE đánh giá năng lực sản xuất và đề xuất phương án vận hành phù hợp.',
                )}
              </p>
            </div>
            <div className="manufacturing-factory-overview-cta-actions">
              <a href="/contact/request-quotation">
                <span aria-hidden="true">✈</span>
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">
                <span aria-hidden="true">☎</span>
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {shouldShowMaterialsRubberWoodBanner && (
        <figure className="materials-rubber-wood-banner">
          <img
            src="/assets/materials/solid-wood/rubber-wood-banner.png"
            alt={t('Banner gỗ cao su')}
            loading="eager"
            decoding="async"
          />
        </figure>
      )}
      {shouldShowMaterialsAshBanner && (
        <figure className="materials-ash-banner">
          <img
            src="/assets/materials/solid-wood/ash-banner.webp"
            alt={t('Banner gỗ Ash')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-ash-banner-copy">
            <h1>{t('Gỗ Ash')}</h1>
            <p>{t('Ash Wood')}</p>
            <p>
              {t(
                'Loại gỗ cứng được sử dụng rộng rãi trong nội thất xuất khẩu nhờ vân gỗ đẹp, khả năng gia công tốt và tính linh hoạt trong hoàn thiện bề mặt.',
              )}
            </p>
            <p>
              {t(
                'Gỗ Ash là một trong những loại gỗ tự nhiên phổ biến trong ngành nội thất cao cấp và nội thất xuất khẩu. Với màu sắc sáng, vân gỗ rõ nét và khả năng hoàn thiện linh hoạt, Ash được sử dụng rộng rãi trong các dòng sản phẩm theo phong cách Bắc Âu, hiện đại và đương đại.',
              )}
            </p>
            <p>
              {t(
                'Ash phù hợp cho cả sản phẩm hoàn thiện, cấu kiện nội thất và các chương trình OEM / ODM yêu cầu tính thẩm mỹ cao cùng khả năng sản xuất ổn định.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsOakBanner && (
        <figure className="materials-oak-banner">
          <img
            src="/assets/materials/solid-wood/oak-banner.webp"
            alt={t('Banner gỗ Oak')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-oak-banner-copy">
            <h1>{t('Gỗ Oak')}</h1>
            <p>
              {t(
                'Một trong những loại gỗ được sử dụng phổ biến nhất trong ngành nội thất cao cấp nhờ độ bền, vẻ đẹp tự nhiên và khả năng thích ứng với nhiều phong cách thiết kế.',
              )}
            </p>
            <p>
              {t(
                'Gỗ Oak là loại gỗ tự nhiên được sử dụng rộng rãi trong nội thất dân dụng, nội thất thương mại và các dự án khách sạn, resort trên toàn thế giới. Với kết cấu chắc chắn, vân gỗ đặc trưng và khả năng hoàn thiện linh hoạt, Oak trở thành lựa chọn quen thuộc của nhiều thương hiệu nội thất tại Mỹ, Châu Âu và Nhật Bản.',
              )}
            </p>
            <p>
              {t(
                'Tại ANSLIFE, Oak được ứng dụng cho các chương trình OEM, ODM, sản phẩm hoàn thiện và các dự án nội thất yêu cầu chất lượng, tính thẩm mỹ và độ ổn định cao.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsBeechBanner && (
        <figure className="materials-beech-banner">
          <img
            src="/assets/materials/solid-wood/beech-banner.webp"
            alt={t('Banner gỗ Beech')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-beech-banner-copy">
            <h1>{t('Gỗ Beech')}</h1>
            <p>
              {t(
                'Loại gỗ được đánh giá cao nhờ kết cấu đồng đều, khả năng gia công chính xác và đặc biệt phù hợp cho các sản phẩm ghế và cấu kiện uốn cong.',
              )}
            </p>
            <p>
              {t(
                'Gỗ Beech là một trong những loại gỗ tự nhiên được sử dụng phổ biến trong ngành nội thất Châu Âu và Nhật Bản. Với cấu trúc gỗ đồng đều, độ cứng tốt và khả năng uốn cong bằng hơi nước (Steam Bending), Beech trở thành vật liệu lý tưởng cho nhiều dòng ghế, cấu kiện nội thất và sản phẩm yêu cầu độ chính xác cao.',
              )}
            </p>
            <p>
              {t(
                'Trong ngành nội thất xuất khẩu, Beech thường được sử dụng cho ghế ăn, ghế cafe, ghế nhà hàng, ghế khách sạn và các sản phẩm có chi tiết cong hoặc yêu cầu sản xuất hàng loạt với độ ổn định cao.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsAcaciaBanner && (
        <figure className="materials-acacia-banner">
          <img
            src="/assets/materials/solid-wood/acacia-banner.webp"
            alt={t('Banner gỗ Acacia')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-acacia-banner-copy">
            <h1>{t('Gỗ Acacia')}</h1>
            <p>
              {t(
                'Loại gỗ tự nhiên nổi bật với vân gỗ mạnh mẽ, màu sắc phong phú và khả năng ứng dụng linh hoạt cho nội thất trong nhà và ngoài trời.',
              )}
            </p>
            <p>
              {t(
                'Gỗ Acacia là một trong những loại gỗ được sử dụng rộng rãi trong ngành nội thất nhờ vẻ đẹp tự nhiên, độ bền tốt và tính thẩm mỹ cao. Với màu sắc đa dạng cùng hệ vân gỗ đặc trưng, Acacia thường được lựa chọn cho các sản phẩm mang phong cách tự nhiên, hiện đại và hospitality.',
              )}
            </p>
            <p>
              {t(
                'Trong ngành nội thất xuất khẩu, Acacia được sử dụng cho các bộ sưu tập nội thất gia đình, nội thất ngoài trời, nhà hàng, resort và các dự án yêu cầu sự cân bằng giữa tính thẩm mỹ, độ bền và hiệu quả chi phí.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsPineBanner && (
        <figure className="materials-pine-banner">
          <img
            src="/assets/materials/solid-wood/pine-banner.webp"
            alt={t('Banner gỗ Pine')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-pine-banner-copy">
            <h1>{t('Gỗ Pine')}</h1>
            <p>
              {t(
                'Loại gỗ tự nhiên nhẹ, dễ gia công và được sử dụng rộng rãi trong nội thất, DIY furniture và các chương trình sản xuất quy mô lớn.',
              )}
            </p>
            <p>
              {t(
                'Gỗ Pine là một trong những loại gỗ mềm được sử dụng phổ biến trên thị trường nội thất quốc tế. Với trọng lượng nhẹ, khả năng gia công tốt và màu sắc sáng tự nhiên, Pine được ứng dụng trong nhiều dòng sản phẩm từ nội thất gia đình, nội thất trẻ em đến các chương trình bán lẻ và thương mại điện tử.',
              )}
            </p>
            <p>
              {t(
                'Trong ngành nội thất xuất khẩu, Pine thường được lựa chọn cho các sản phẩm yêu cầu tối ưu chi phí, dễ vận chuyển và phù hợp với các thiết kế mang phong cách Scandinavian, Country hoặc Casual Living.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsPlywoodBanner && (
        <figure className="materials-plywood-banner">
          <img
            src="/assets/materials/engineered-wood/plywood-banner.webp"
            alt={t('Banner ván Plywood')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-plywood-banner-copy">
            <h1>{t('Plywood')}</h1>
            <p>
              {t(
                'Vật liệu gỗ kỹ thuật có độ ổn định cao, kết cấu nhiều lớp và được ứng dụng rộng rãi trong sản xuất nội thất hiện đại.',
              )}
            </p>
            <p>
              {t(
                'Plywood là vật liệu gỗ kỹ thuật được tạo thành từ nhiều lớp veneer gỗ tự nhiên ép chéo theo hướng vân khác nhau dưới áp suất và nhiệt độ cao. Cấu trúc này giúp tăng độ ổn định, hạn chế cong vênh và mang lại khả năng chịu lực tốt hơn so với nhiều loại vật liệu tấm khác.',
              )}
            </p>
            <p>
              {t(
                'Trong ngành nội thất xuất khẩu, Plywood được sử dụng rộng rãi cho nội thất hoàn thiện, cấu kiện nội thất, tủ, bàn, giường và các dự án thương mại nhờ khả năng gia công linh hoạt và tính ổn định trong sản xuất hàng loạt.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsMdfBanner && (
        <figure className="materials-mdf-banner">
          <img
            src="/assets/materials/engineered-wood/mdf-banner.webp"
            alt={t('Banner ván MDF')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-mdf-banner-copy">
            <h1>{t('MDF')}</h1>
            <p>
              {t(
                'Vật liệu gỗ kỹ thuật có bề mặt mịn, ổn định và là lựa chọn lý tưởng cho các sản phẩm yêu cầu sơn phủ hoặc hoàn thiện bề mặt chất lượng cao.',
              )}
            </p>
            <p>
              {t(
                'MDF là vật liệu gỗ kỹ thuật được sản xuất từ sợi gỗ nghiền mịn kết hợp với keo và phụ gia, sau đó ép dưới áp suất và nhiệt độ cao để tạo thành tấm có mật độ trung bình. Với bề mặt phẳng, cấu trúc đồng nhất và khả năng gia công tốt, MDF được sử dụng rộng rãi trong ngành nội thất hiện đại.',
              )}
            </p>
            <p>
              {t(
                'Tại ANSLIFE, MDF được ứng dụng cho các dòng nội thất hoàn thiện, nội thất màu sơn, tủ, kệ, panel trang trí và các dự án OEM / ODM yêu cầu chất lượng bề mặt ổn định.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsParticleBoardBanner && (
        <figure className="materials-particle-board-banner">
          <img
            src="/assets/materials/engineered-wood/particle-board-banner.webp"
            alt={t('Banner ván Particle Board')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-particle-board-banner-copy">
            <h1>{t('Ván dăm')}</h1>
            <p>
              {t(
                'Vật liệu gỗ kỹ thuật tối ưu chi phí, phù hợp cho nội thất dạng tấm và các chương trình sản xuất quy mô lớn.',
              )}
            </p>
            <p>
              {t(
                'Ván dăm (Particle Board) là vật liệu gỗ kỹ thuật được sản xuất từ dăm gỗ kết hợp với keo chuyên dụng, sau đó ép dưới áp suất và nhiệt độ cao để tạo thành tấm vật liệu có cấu trúc đồng đều.',
              )}
            </p>
            <p>
              {t(
                'Nhờ hiệu quả về chi phí, khả năng gia công tốt và tương thích với nhiều loại vật liệu phủ bề mặt, Particle Board được sử dụng rộng rãi trong các sản phẩm nội thất dạng tấm, nội thất lắp ráp (Ready-to-Assemble) và các chương trình bán lẻ quy mô lớn trên thị trường quốc tế.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsLaminatedBoardBanner && (
        <figure className="materials-laminated-board-banner">
          <img
            src="/assets/materials/engineered-wood/laminated-board-banner.webp"
            alt={t('Banner laminated board')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-laminated-board-banner-copy">
            <h1>{t('Ván phủ bề mặt')}</h1>
            <p>
              {t(
                'Giải pháp hoàn thiện bề mặt giúp nâng cao tính thẩm mỹ, độ bền và khả năng ứng dụng của các vật liệu gỗ kỹ thuật.',
              )}
            </p>
            <p>
              {t(
                'Vật liệu phủ bề mặt đóng vai trò quan trọng trong sản xuất nội thất hiện đại. Tùy theo yêu cầu về thẩm mỹ, độ bền, khả năng chống trầy xước hoặc điều kiện sử dụng, mỗi dự án sẽ lựa chọn phương án hoàn thiện phù hợp.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE hỗ trợ lựa chọn, kiểm tra và triển khai nhiều hệ vật liệu phủ bề mặt nhằm đáp ứng yêu cầu của buyer và tiêu chuẩn của từng thị trường xuất khẩu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsRattanBanner && (
        <figure className="materials-rattan-banner">
          <img
            src="/assets/materials/natural-materials/rattan-banner.webp"
            alt={t('Banner vật liệu mây')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-rattan-banner-copy">
            <h1>{t('Mây')}</h1>
            <p>
              {t(
                'Vật liệu tự nhiên mang đến sự linh hoạt, vẻ đẹp thủ công và giá trị bền vững trong thiết kế nội thất.',
              )}
            </p>
            <p>
              {t(
                'Mây là một trong những vật liệu tự nhiên đặc trưng của Đông Nam Á và được sử dụng rộng rãi trong ngành nội thất nhờ trọng lượng nhẹ, độ dẻo cao và khả năng tạo hình linh hoạt.',
              )}
            </p>
            <p>
              {t(
                'Tại ANSLIFE, mây được ứng dụng trong các sản phẩm nội thất hoàn thiện, cấu kiện trang trí và các dự án khách sạn, resort, nhà hàng theo phong cách tự nhiên, nhiệt đới và đương đại.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsBambooBanner && (
        <figure className="materials-bamboo-banner">
          <img
            src="/assets/materials/natural-materials/bamboo-banner.webp"
            alt={t('Banner vật liệu tre')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-bamboo-banner-copy">
            <h1>{t('Tre')}</h1>
            <p>
              {t(
                'Vật liệu tự nhiên phát triển nhanh, bền vững và có khả năng ứng dụng linh hoạt trong nội thất hiện đại.',
              )}
            </p>
            <p>
              {t(
                'Tre là một trong những vật liệu tự nhiên có tốc độ tái sinh nhanh và được sử dụng rộng rãi trong ngành nội thất nhờ khả năng gia công linh hoạt, độ bền tốt và giá trị phát triển bền vững.',
              )}
            </p>
            <p>
              {t(
                'Với đặc tính nhẹ, chắc và mang vẻ đẹp tự nhiên, tre được ứng dụng trong nhiều dòng sản phẩm nội thất, vật liệu trang trí và các dự án theo định hướng thiết kế xanh. Tại ANSLIFE, tre được kết hợp cùng gỗ, kim loại và các vật liệu tự nhiên khác để phát triển các giải pháp nội thất phục vụ thị trường xuất khẩu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsCaneWebbingBanner && (
        <figure className="materials-cane-webbing-banner">
          <img
            src="/assets/materials/natural-materials/cane-webbing-banner.webp"
            alt={t('Banner vật liệu cane webbing')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-cane-webbing-banner-copy">
            <h1>{t('Mặt đan mây')}</h1>
            <p>
              {t(
                'Giải pháp bề mặt tự nhiên mang lại sự thông thoáng, tính thẩm mỹ và giá trị thủ công cho nội thất.',
              )}
            </p>
            <p>
              {t(
                'Mặt đan mây là vật liệu được tạo thành từ các sợi mây tự nhiên đan theo nhiều kiểu khác nhau để hình thành bề mặt sử dụng cho ghế, cánh tủ, vách trang trí và các chi tiết nội thất.',
              )}
            </p>
            <p>
              {t(
                'Với vẻ đẹp tự nhiên, khả năng thông thoáng và giá trị thủ công, mặt đan mây được ứng dụng rộng rãi trong các bộ sưu tập nội thất Scandinavian, Japandi, Tropical và Contemporary.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsFoamBanner && (
        <figure className="materials-foam-banner">
          <img
            src="/assets/materials/upholstery-materials/foam-banner.webp"
            alt={t('Banner vật liệu Foam')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-foam-banner-copy">
            <h1>{t('Foam')}</h1>
            <p>
              {t(
                'Vật liệu đệm quyết định sự êm ái, khả năng nâng đỡ và độ bền của các sản phẩm nội thất bọc nệm.',
              )}
            </p>
            <p>
              {t(
                'Foam là vật liệu đệm được sử dụng phổ biến trong ngành nội thất bọc nệm nhờ khả năng đàn hồi, phân bố lực và tạo sự thoải mái khi sử dụng.',
              )}
            </p>
            <p>
              {t(
                'Tại ANSLIFE, foam được lựa chọn theo yêu cầu của từng sản phẩm, tiêu chuẩn của buyer và mục đích sử dụng, nhằm đảm bảo sự cân bằng giữa cảm giác ngồi, độ bền và hiệu quả sản xuất.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsFabricBanner && (
        <figure className="materials-fabric-banner">
          <img
            src="/assets/materials/upholstery-materials/fabric-banner.webp"
            alt={t('Banner vật liệu Fabric')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-fabric-banner-copy">
            <h1>{t('Vải')}</h1>
            <p>
              {t(
                'Giải pháp vật liệu bọc mang đến sự thoải mái, tính thẩm mỹ và độ bền cho các sản phẩm nội thất.',
              )}
            </p>
            <p>
              {t(
                'Vải bọc là lớp hoàn thiện trực tiếp tạo nên cảm nhận về màu sắc, kết cấu và trải nghiệm sử dụng của sản phẩm nội thất.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE hỗ trợ lựa chọn nhiều dòng vải bọc phù hợp với yêu cầu thiết kế, tiêu chuẩn kỹ thuật và mục đích sử dụng của từng dự án, từ nội thất gia đình đến khách sạn, nhà hàng, văn phòng và các chương trình OEM / ODM.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsLeatherPuBanner && (
        <figure className="materials-leather-pu-banner">
          <img
            src="/assets/materials/upholstery-materials/leather-pu-banner.webp"
            alt={t('Banner vật liệu Leather / PU')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-leather-pu-banner-copy">
            <h1>{t('Da / PU')}</h1>
            <p>
              {t(
                'Giải pháp vật liệu bọc mang đến vẻ đẹp sang trọng, độ bền cao và khả năng bảo trì thuận tiện cho các sản phẩm nội thất.',
              )}
            </p>
            <p>
              {t(
                'Da và PU là những vật liệu bọc được sử dụng phổ biến trong các dòng nội thất cao cấp, nội thất thương mại và các dự án khách sạn, văn phòng.',
              )}
            </p>
            <p>
              {t(
                'Mỗi loại vật liệu mang những đặc tính riêng về ngoại quan, cảm giác sử dụng và khả năng bảo trì.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE hỗ trợ lựa chọn vật liệu bọc phù hợp với yêu cầu thiết kế, tiêu chuẩn kỹ thuật và ngân sách của từng dự án, đảm bảo sự đồng nhất giữa mẫu duyệt và sản xuất hàng loạt.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsCushionMaterialsBanner && (
        <figure className="materials-cushion-materials-banner">
          <img
            src="/assets/materials/upholstery-materials/cushion-materials-banner.webp"
            alt={t('Banner vật liệu đệm')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-cushion-materials-banner-copy">
            <h1>{t('Vật liệu đệm')}</h1>
            <p>
              {t(
                'Các vật liệu bổ trợ giúp tạo độ mềm, độ phồng và nâng cao trải nghiệm sử dụng cho sản phẩm nội thất bọc nệm.',
              )}
            </p>
            <p>
              {t(
                'Vật liệu đệm là lớp vật liệu kết hợp cùng foam nhằm tạo nên sự êm ái, độ đầy và hình dáng của sản phẩm nội thất. Tùy theo mục đích sử dụng và yêu cầu của buyer, mỗi sản phẩm sẽ sử dụng một hoặc nhiều loại vật liệu đệm khác nhau.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE lựa chọn vật liệu đệm phù hợp với từng dòng sản phẩm, đảm bảo sự cân bằng giữa cảm giác sử dụng, độ bền, khả năng phục hồi và hiệu quả sản xuất.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isMaterialsCushionMaterialsPage && (
        <section className="materials-cushion-materials-content">
          <section className="materials-cushion-materials-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-cushion-materials-overview-panel">
              {[
                {
                  icon: '▱',
                  title: 'Tên thương mại',
                  body: 'Cushion Filling Materials',
                },
                {
                  icon: '✺',
                  title: 'Nhóm vật liệu',
                  body: 'Vật liệu bọc nệm',
                },
                {
                  icon: '▧',
                  title: 'Chức năng',
                  body: 'Tạo độ mềm\nTạo độ phồng\nHoàn thiện hình dáng\nTăng sự thoải mái',
                },
                {
                  icon: '▰',
                  title: 'Đặc điểm',
                  body: 'Nhẹ\nĐàn hồi\nDễ kết hợp\nĐa dạng vật liệu',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    {item.body.includes('\n') ? (
                      <ul>
                        {item.body.split('\n').map((line) => (
                          <li key={line}>{t(line)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{t(item.body)}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cushion-materials-types">
            <h2>{t('Các loại vật liệu đệm phổ biến')}</h2>
            <div className="materials-cushion-materials-type-grid">
              {[
                {
                  title: 'Polyester Fiber',
                  body: 'Loại vật liệu phổ biến nhất dùng để tạo độ mềm và độ đầy cho gối, đệm tựa và tay ghế.',
                },
                {
                  title: 'Silicon Fiber',
                  body: 'Mang lại độ phồng và khả năng phục hồi tốt hơn so với sợi polyester thông thường.',
                },
                {
                  title: 'Feather & Down',
                  body: 'Lông vũ và lông tơ tự nhiên tạo cảm giác mềm mại, thường sử dụng cho các dòng nội thất cao cấp.',
                },
                {
                  title: 'Foam Chip',
                  body: 'Các mảnh foam nghiền được sử dụng cho gối trang trí hoặc đệm phụ nhằm tận dụng hiệu quả vật liệu.',
                },
                {
                  title: 'EPS Beads',
                  body: 'Hạt xốp EPS tạo cảm giác linh hoạt và trọng lượng nhẹ cho một số dòng sản phẩm đặc biệt như Bean Bag.',
                },
                {
                  title: 'Recycled Fiber',
                  body: 'Sợi tái chế phục vụ các dự án ưu tiên vật liệu thân thiện với môi trường và phát triển bền vững.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-cushion-materials-type-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cushion-materials-application-structure-row">
            <div className="materials-cushion-materials-applications">
              <h2>{t('Ứng dụng trong nội thất')}</h2>
              <div className="materials-cushion-materials-application-grid">
                {[
                  {
                    title: 'Sofa',
                    items: ['Gối tựa', 'Đệm lưng', 'Đệm tay'],
                  },
                  {
                    title: 'Ghế bọc nệm',
                    items: ['Đệm ngồi', 'Đệm tựa'],
                  },
                  {
                    title: 'Giường',
                    items: ['Đầu giường bọc nệm', 'Đệm trang trí'],
                  },
                  {
                    title: 'Ottoman',
                    items: ['Đệm ngồi', 'Gối rời'],
                  },
                  {
                    title: 'Nội thất khách sạn',
                    items: ['Hospitality Cushion', 'Hotel Pillow', 'Lounge Cushion'],
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-cushion-materials-application-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <ul>
                      {item.items.map((entry) => (
                        <li key={entry}>{t(entry)}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-cushion-materials-structure">
              <h2>{t('Cấu trúc một bộ đệm tiêu chuẩn')}</h2>
              <div className="materials-cushion-materials-structure-grid">
                {[
                  {
                    title: 'Cấu trúc tiêu chuẩn',
                    layers: ['Vải / Da / PU', 'Polyester Fiber', 'PU Foam', 'Khung gỗ hoặc kết cấu sản phẩm'],
                  },
                  {
                    title: 'Cấu trúc cao cấp',
                    layers: ['Vải', 'Lông vũ', 'Silicon Fiber', 'HR Foam', 'Khung sản phẩm'],
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <h3>{t(item.title)}</h3>
                    <div className="materials-cushion-materials-layer-stack" aria-hidden="true">
                      {item.layers.map((layer) => (
                        <span key={layer} />
                      ))}
                    </div>
                    <ul>
                      {item.layers.map((layer) => (
                        <li key={layer}>{t(layer)}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-cushion-materials-criteria-control-row">
            <div className="materials-cushion-materials-criteria">
              <h2>{t('Các tiêu chí lựa chọn')}</h2>
              <div className="materials-cushion-materials-criteria-grid">
                {[
                  ['◌', 'Màu sắc', 'Đồng bộ với bộ sưu tập và mẫu duyệt.'],
                  ['▧', 'Kết cấu', 'Lựa chọn theo phong cách thiết kế và trải nghiệm sử dụng.'],
                  ['▱', 'Khả năng chống mài mòn', 'Đáp ứng yêu cầu của từng môi trường sử dụng.'],
                  ['◡', 'Dễ vệ sinh', 'Phù hợp với khách sạn, nhà hàng, văn phòng và không gian công cộng.'],
                  ['☼', 'Độ bền màu', 'Duy trì tính ổn định trong quá trình sử dụng.'],
                  ['☑', 'Tiêu chuẩn kỹ thuật', 'Lựa chọn theo yêu cầu riêng của buyer hoặc từng thị trường.'],
                ].map(([icon, title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">{icon}</span>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-cushion-materials-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-cushion-materials-control-grid">
                {[
                  ['▦', 'Khối lượng vật liệu', 'Đảm bảo đúng định lượng theo thiết kế.'],
                  ['♧', 'Hình dáng sản phẩm', 'Đảm bảo độ đầy và ngoại quan sau khi hoàn thiện.'],
                  ['▣', 'Độ đồng đều', 'Kiểm soát sự phân bố vật liệu trong từng bộ đệm.'],
                  ['☼', 'Kiểm tra cuối', 'Đánh giá cảm giác sử dụng và tính nhất quán trước khi đóng gói.'],
                  ['↻', 'Khả năng phục hồi', 'Đánh giá độ đàn hồi sau quá trình nén và sử dụng.'],
                ].map(([icon, title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">{icon}</span>
                    <div>
                      <h3>{t(title)}</h3>
                      <p>{t(body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-cushion-materials-supply-combo-row">
            <div className="materials-cushion-materials-supply">
              <div>
                <h2>{t('Vật liệu đệm trong hệ thống cung ứng của ANSLIFE')}</h2>
                <p>
                  {t(
                    'ANSLIFE lựa chọn và kết hợp các loại vật liệu đệm phù hợp với foam, vật liệu bọc và kết cấu sản phẩm nhằm đáp ứng yêu cầu về sự thoải mái, độ bền và tiêu chuẩn chất lượng của từng dự án.',
                  )}
                </p>
                <p>
                  {t(
                    'Mọi vật liệu đệm đều được kiểm soát theo mẫu duyệt và quy trình sản xuất để đảm bảo tính đồng nhất giữa phát triển sản phẩm và sản xuất hàng loạt.',
                  )}
                </p>
              </div>
              <div className="materials-cushion-materials-supply-image-slot" aria-hidden="true" />
            </div>

            <div className="materials-cushion-materials-combinations">
              <h2>{t('Kết hợp với các vật liệu khác')}</h2>
              <div className="materials-cushion-materials-combo-map">
                <div className="materials-cushion-materials-combo-center">
                  <strong>{t('Vật liệu đệm')}</strong>
                  <span>{t('Cushion Filling Materials')}</span>
                </div>
                {['Foam', 'Da / PU', 'Khung ghế', 'Lò xo', 'Vải'].map((item) => (
                  <article key={item}>
                    <div className="materials-cushion-materials-combo-thumb-slot" aria-hidden="true" />
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-cushion-materials-related">
            <h2>{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="materials-cushion-materials-related-grid">
              {[
                {
                  title: 'Foam',
                  body: 'Giải pháp tạo kết cấu và khả năng nâng đỡ cho sản phẩm bọc nệm.',
                },
                {
                  title: 'Vải',
                  body: 'Các dòng vải bọc cho sofa, ghế và giường.',
                },
                {
                  title: 'Da / PU',
                  body: 'Giải pháp bề mặt sang trọng và dễ bảo trì.',
                },
                {
                  title: 'Nội thất bọc nệm',
                  body: 'Khám phá các dòng sofa, ghế và giường sử dụng hệ đệm của ANSLIFE.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-cushion-materials-related-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <span aria-hidden="true">›</span>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cushion-materials-cta">
            <div className="materials-cushion-materials-cta-media" aria-hidden="true" />
            <div className="materials-cushion-materials-cta-copy">
              <h2>{t('Trao đổi về hệ vật liệu đệm cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi yêu cầu về độ mềm, độ phồng, cấu trúc đệm hoặc tiêu chuẩn kỹ thuật để ANSLIFE tư vấn giải pháp vật liệu phù hợp với từng sản phẩm và thị trường xuất khẩu.',
                )}
              </p>
            </div>
            <div className="materials-cushion-materials-cta-actions">
              <a href="/vn/contact">
                <span aria-hidden="true">✈</span>
                {t('Gửi yêu cầu')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">⇧</span>
                {t('Tải bản vẽ lên')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">☎</span>
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {shouldShowMaterialsCartonBanner && (
        <figure className="materials-carton-banner">
          <img
            src="/assets/materials/packing-materials/carton-banner.webp"
            alt={t('Banner thùng carton')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-carton-banner-copy">
            <h1>{t('Thùng carton')}</h1>
            <p>
              {t(
                'Giải pháp đóng gói giúp bảo vệ sản phẩm trong quá trình lưu kho, vận chuyển và xuất khẩu quốc tế.',
              )}
            </p>
            <p>
              {t(
                'Thùng carton là lớp bảo vệ đầu tiên của sản phẩm trong chuỗi cung ứng. Việc lựa chọn đúng loại carton, kết cấu thùng và phương pháp đóng gói giúp giảm rủi ro hư hỏng, tối ưu chi phí logistics và đảm bảo sản phẩm đến tay khách hàng trong tình trạng tốt nhất.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE thiết kế giải pháp đóng gói phù hợp với từng sản phẩm, phương thức vận chuyển và tiêu chuẩn riêng của từng buyer.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsFoamProtectionBanner && (
        <figure className="materials-foam-protection-banner">
          <img
            src="/assets/materials/packing-materials/foam-protection-banner.webp"
            alt={t('Banner foam bảo vệ')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-foam-protection-banner-copy">
            <h1>{t('Foam')}</h1>
            <p>
              {t(
                'Vật liệu đệm quyết định sự êm ái, khả năng nâng đỡ và tuổi thọ của các sản phẩm nội thất bọc nệm.',
              )}
            </p>
            <p>
              {t(
                'Foam là vật liệu đệm cốt lõi trong các sản phẩm nội thất bọc nệm. Việc lựa chọn đúng loại foam sẽ ảnh hưởng trực tiếp đến cảm giác ngồi, khả năng nâng đỡ, độ đàn hồi và độ bền của sản phẩm.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE lựa chọn và kiểm soát vật liệu foam theo yêu cầu của từng dự án, đảm bảo sự đồng nhất giữa mẫu duyệt và sản xuất hàng loạt, đáp ứng tiêu chuẩn của các thị trường xuất khẩu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsEdgeProtectionBanner && (
        <figure className="materials-edge-protection-banner">
          <img
            src="/assets/materials/packing-materials/edge-protection-banner.webp"
            alt={t('Banner bảo vệ cạnh')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-edge-protection-banner-copy">
            <h1>{t('Bảo vệ cạnh')}</h1>
            <p>
              {t(
                'Giải pháp bảo vệ các góc và cạnh sản phẩm nhằm giảm thiểu hư hỏng trong quá trình lưu kho, bốc xếp và vận chuyển quốc tế.',
              )}
            </p>
            <p>
              {t(
                'Các cạnh và góc là những vị trí dễ bị va đập nhất trong quá trình đóng gói và vận chuyển. Việc lựa chọn đúng giải pháp bảo vệ giúp hạn chế hư hỏng ngoại quan, giảm tỷ lệ khiếu nại và đảm bảo sản phẩm đến tay khách hàng trong tình trạng tốt nhất.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE thiết kế phương án bảo vệ cạnh phù hợp với từng dòng sản phẩm, phương thức đóng gói và yêu cầu riêng của buyer.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsPalletBanner && (
        <figure className="materials-pallet-banner">
          <img
            src="/assets/materials/packing-materials/pallet-banner.webp"
            alt={t('Banner pallet')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-pallet-banner-copy">
            <h1>{t('Pallet')}</h1>
            <p>
              {t(
                'Giải pháp lưu kho, nâng hạ và vận chuyển giúp bảo vệ sản phẩm và tối ưu hiệu quả logistics trong chuỗi cung ứng xuất khẩu.',
              )}
            </p>
            <p>
              {t(
                'Pallet là nền tảng của hệ thống đóng gói và logistics, giúp sản phẩm được lưu kho, nâng hạ, gom hàng và vận chuyển một cách an toàn và hiệu quả.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE lựa chọn phương án pallet phù hợp với từng loại sản phẩm, quy cách đóng gói và phương thức vận chuyển nhằm giảm rủi ro hư hỏng, tối ưu không gian container và đáp ứng yêu cầu của từng thị trường xuất khẩu.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {shouldShowMaterialsExportPackingBanner && (
        <figure className="materials-export-packing-banner">
          <img
            src="/assets/materials/packing-materials/export-packing-banner.webp"
            alt={t('Banner đóng gói xuất khẩu')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="materials-export-packing-banner-copy">
            <h1>{t('Đóng gói xuất khẩu')}</h1>
            <p>
              {t(
                'Giải pháp đóng gói được thiết kế nhằm bảo vệ sản phẩm trong toàn bộ chuỗi logistics quốc tế, từ nhà máy đến kho của khách hàng.',
              )}
            </p>
            <p>
              {t(
                'Đóng gói xuất khẩu không chỉ là việc đưa sản phẩm vào thùng carton mà là một hệ thống bảo vệ tổng thể. Mỗi phương án đóng gói được xây dựng dựa trên đặc điểm sản phẩm, phương thức vận chuyển, yêu cầu của buyer và điều kiện của thị trường nhập khẩu.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE phát triển giải pháp đóng gói phù hợp cho từng dự án nhằm giảm thiểu hư hỏng, tối ưu chi phí logistics và đảm bảo sản phẩm đến tay khách hàng trong tình trạng tốt nhất.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isMaterialsExportPackingPage && (
        <section className="materials-export-packing-content">
          <section className="materials-export-packing-goals">
            <h2>{t('Mục tiêu của hệ thống đóng gói')}</h2>
            <div className="materials-export-packing-goal-grid">
              {[
                ['♢', 'Bảo vệ sản phẩm', 'Giảm rủi ro va đập, rung động, trầy xước và biến dạng trong quá trình vận chuyển.'],
                ['✧', 'Đảm bảo chất lượng', 'Duy trì tình trạng sản phẩm từ nhà máy đến điểm giao hàng.'],
                ['▥', 'Tối ưu logistics', 'Giảm thể tích đóng gói, tối ưu không gian container và chi phí vận chuyển.'],
                ['▤', 'Thuận tiện bốc xếp', 'Thiết kế phù hợp với xe nâng, pallet và hệ thống kho.'],
                ['☑', 'Đáp ứng tiêu chuẩn buyer', 'Triển khai theo hướng dẫn đóng gói hoặc tiêu chuẩn riêng của từng khách hàng.'],
                ['◎', 'Phù hợp xuất khẩu quốc tế', 'Đáp ứng yêu cầu vận chuyển đường biển, đường hàng không và đường bộ.'],
              ].map(([icon, title, body]) => (
                <article key={title}>
                  <span aria-hidden="true">{icon}</span>
                  <h3>{t(title)}</h3>
                  <p>{t(body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-export-packing-system-components-row">
            <div className="materials-export-packing-system">
              <h2>{t('Hệ thống đóng gói của ANSLIFE')}</h2>
              <div className="materials-export-packing-system-layout">
                <div className="materials-export-packing-system-steps">
                  {[
                    'Sản phẩm hoàn thiện',
                    'Bọc PE / Túi bảo vệ',
                    'Foam bảo vệ',
                    'Bảo vệ cạnh',
                    'Thùng carton',
                    'Đai kiện',
                    'Pallet',
                    'Màng quấn Stretch Film',
                    'Xếp container',
                  ].map((item, index) => (
                    <article key={item}>
                      <span>{index + 1}</span>
                      <p>{t(item)}</p>
                    </article>
                  ))}
                </div>
                <div className="materials-export-packing-system-visual" aria-hidden="true" />
              </div>
            </div>

            <div className="materials-export-packing-components">
              <h2>{t('Các thành phần trong hệ thống đóng gói')}</h2>
              <div className="materials-export-packing-component-grid">
                {[
                  ['Thùng carton', 'Bao bì chính giúp bảo vệ sản phẩm và hỗ trợ vận chuyển.'],
                  ['Foam bảo vệ', 'Hấp thụ va đập và chống rung.'],
                  ['Bảo vệ cạnh', 'Giảm nguy cơ hư hỏng tại các góc và cạnh sản phẩm.'],
                  ['Túi PE', 'Bảo vệ bề mặt khỏi bụi bẩn, hơi ẩm và trầy xước.'],
                  ['Đai kiện', 'Giữ ổn định kiện hàng trong quá trình vận chuyển.'],
                  ['Pallet', 'Hỗ trợ lưu kho, nâng hạ và xếp container.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <div className="materials-export-packing-image-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-export-packing-process-qc-row">
            <div className="materials-export-packing-process">
              <h2>{t('Quy trình thiết kế đóng gói')}</h2>
              <div className="materials-export-packing-process-flow">
                {[
                  ['1', 'Đánh giá sản phẩm'],
                  ['2', 'Phân tích rủi ro vận chuyển'],
                  ['3', 'Thiết kế phương án đóng gói'],
                  ['4', 'Đóng gói thử nghiệm'],
                  ['5', 'Đánh giá kết quả'],
                  ['6', 'Phê duyệt mẫu'],
                ].map(([number, title]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <div aria-hidden="true">▢</div>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-export-packing-qc">
              <h2>{t('Kiểm soát chất lượng đóng gói')}</h2>
              <div className="materials-export-packing-qc-grid">
                {[
                  ['Kiểm tra vật liệu đóng gói', 'Đánh giá chất lượng carton, foam, pallet và các vật liệu bảo vệ trước khi sử dụng.'],
                  ['Kiểm tra kích thước', 'Đảm bảo quy cách đóng gói đúng theo bản vẽ và tiêu chuẩn của buyer.'],
                  ['Kiểm tra ngoại quan', 'Xác nhận sản phẩm được bảo vệ đầy đủ trước khi đóng thùng.'],
                  ['Kiểm tra ghi nhãn', 'Kiểm tra mã hàng, ký hiệu vận chuyển, nhãn cảnh báo và thông tin nhận diện.'],
                  ['Kiểm tra pallet', 'Đảm bảo pallet ổn định, xử lý đúng tiêu chuẩn ISPM 15 nếu với pallet gỗ.'],
                  ['Kiểm tra trước khi xếp container', 'Đánh giá toàn bộ kiện hàng trước khi xuất xưởng.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">✓</span>
                    <div>
                      <h3>{t(title)}</h3>
                      <p>{t(body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-export-packing-method-application-row">
            <div className="materials-export-packing-methods">
              <h2>{t('Phương thức đóng gói')}</h2>
              <div className="materials-export-packing-method-grid">
                {[
                  ['Fully Assembled', 'Sản phẩm được lắp ráp hoàn chỉnh trước khi đóng gói.'],
                  ['Knock-down (KD)', 'Các bộ phận được tháo rời nhằm tối ưu không gian vận chuyển và giảm chi phí logistics.'],
                  ['Nested Packing', 'Thiết kế lồng ghép nhiều sản phẩm để tối ưu thể tích đóng gói.'],
                  ['Custom Packaging', 'Giải pháp đóng gói được thiết kế riêng theo yêu cầu của buyer.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <div className="materials-export-packing-image-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-export-packing-applications">
              <h2>{t('Ứng dụng')}</h2>
              <div className="materials-export-packing-application-grid">
                {[
                  ['▱', 'Nội thất hoàn thiện', 'Ghế, bàn, tủ, giường và các sản phẩm hoàn chỉnh.'],
                  ['▭', 'Nội thất bọc nệm', 'Bảo vệ bề mặt vải, da và kết cấu đệm.'],
                  ['⚙', 'Linh kiện nội thất', 'Đóng gói theo bộ hoặc theo từng mã linh kiện.'],
                  ['▧', 'OEM / ODM', 'Giải pháp đóng gói theo tiêu chuẩn thương hiệu của khách hàng.'],
                  ['◎', 'Vietnam Supply Hub', 'Đóng gói lại, gom hàng và điều phối xuất khẩu theo từng lô hàng.'],
                ].map(([icon, title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">{icon}</span>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-export-packing-supply-related-row">
            <div className="materials-export-packing-supply-chain">
              <h2>{t('Đóng gói trong hệ thống supply chain của ANSLIFE')}</h2>
              <div className="materials-export-packing-supply-flow">
                {[
                  'Thiết kế sản phẩm',
                  'Sản xuất',
                  'QC',
                  'Đóng gói',
                  'Lưu kho',
                  'Gom hàng',
                  'Xếp container',
                  'Xuất khẩu',
                ].map((item) => (
                  <article key={item}>
                    <div className="materials-export-packing-supply-image-slot" aria-hidden="true" />
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
              <p>
                {t(
                  'Hệ thống vận hành đồng bộ - Kiểm soát chặt chẽ - Đảm bảo chất lượng toàn chuỗi',
                )}
              </p>
            </div>

            <div className="materials-export-packing-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="materials-export-packing-related-grid">
                {[
                  ['Thùng carton', 'Bao bì chính của sản phẩm.'],
                  ['Foam bảo vệ', 'Giải pháp hấp thụ va đập.'],
                  ['Bảo vệ cạnh', 'Giảm hư hỏng tại các góc và cạnh.'],
                  ['Pallet', 'Giải pháp lưu kho và vận chuyển.'],
                  ['Chuẩn đóng gói', 'Tiêu chuẩn kiểm soát chất lượng trong quá trình đóng gói.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">▢</span>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-export-packing-cta">
            <div className="materials-export-packing-cta-copy">
              <h2>{t('Trao đổi về giải pháp đóng gói xuất khẩu cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ sản phẩm, tiêu chuẩn đóng gói, yêu cầu vận chuyển hoặc quy cách container loading để ANSLIFE đánh giá và đề xuất phương án đóng gói phù hợp.',
                )}
              </p>
            </div>
            <div className="materials-export-packing-cta-actions">
              <a href="/vn/contact">
                <span aria-hidden="true">✈</span>
                {t('Gửi yêu cầu')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">⇧</span>
                {t('Tải bản vẽ lên')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">☎</span>
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {isMaterialsPalletPage && (
        <section className="materials-pallet-content">
          <section className="materials-pallet-role">
            <h2>{t('Vai trò của pallet')}</h2>
            <div className="materials-pallet-role-grid">
              {[
                ['▤', 'Hỗ trợ nâng hạ', 'Giúp xe nâng và thiết bị bốc xếp xử lý hàng hóa nhanh chóng và an toàn.'],
                ['♢', 'Bảo vệ sản phẩm', 'Giảm tiếp xúc trực tiếp với mặt sàn và hạn chế tác động từ môi trường lưu kho.'],
                ['⌂', 'Tối ưu lưu kho', 'Dễ dàng sắp xếp, quản lý và kiểm kê hàng hóa trong kho.'],
                ['▥', 'Tối ưu container', 'Thiết kế pallet phù hợp giúp tận dụng không gian container và giảm chi phí logistics.'],
                ['▧', 'Thuận tiện gom hàng', 'Hỗ trợ đóng ghép nhiều sản phẩm hoặc nhiều đơn hàng trên cùng một pallet.'],
                ['◎', 'Phù hợp xuất khẩu', 'Đáp ứng yêu cầu vận chuyển đường biển, đường hàng không và đường bộ.'],
              ].map(([icon, title, body]) => (
                <article key={title}>
                  <span aria-hidden="true">{icon}</span>
                  <h3>{t(title)}</h3>
                  <p>{t(body)}</p>
                  <div className="materials-pallet-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-pallet-type-standard-row">
            <div className="materials-pallet-types">
              <h2>{t('Các loại pallet')}</h2>
              <div className="materials-pallet-type-grid">
                {[
                  ['Pallet gỗ', 'Loại pallet được sử dụng phổ biến trong xuất khẩu nội thất nhờ khả năng chịu tải và chi phí hợp lý.'],
                  ['Pallet nhựa', 'Phù hợp với các môi trường yêu cầu độ sạch cao hoặc tái sử dụng nhiều lần.'],
                  ['Pallet theo yêu cầu', 'Thiết kế riêng theo kích thước sản phẩm, tải trọng và yêu cầu logistics của buyer.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <div className="materials-pallet-type-image-slot" aria-hidden="true" />
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-pallet-standards">
              <h2>{t('Tiêu chuẩn pallet')}</h2>
              <div className="materials-pallet-standard-grid">
                {[
                  [
                    '✤',
                    'Pallet xử lý nhiệt ISPM 15',
                    'Pallet gỗ được xử lý nhiệt theo tiêu chuẩn ISPM 15 và đóng dấu xác nhận, đáp ứng yêu cầu kiểm dịch thực vật của nhiều thị trường xuất khẩu.',
                  ],
                  [
                    '▣',
                    'Thiết kế theo tải trọng',
                    'Lựa chọn kết cấu pallet phù hợp với trọng lượng và kích thước của từng lô hàng.',
                  ],
                  [
                    '▤',
                    'Tương thích thiết bị nâng',
                    'Đảm bảo pallet phù hợp với xe nâng và hệ thống lưu kho tiêu chuẩn.',
                  ],
                ].map(([icon, title, body], index) => (
                  <article key={title}>
                    <span aria-hidden="true">{icon}</span>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                    {index === 2 && <div className="materials-pallet-standard-image-slot" aria-hidden="true" />}
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-pallet-applications">
            <h2>{t('Ứng dụng trong đóng gói')}</h2>
            <div className="materials-pallet-application-grid">
              {[
                ['▱', 'Ghế', 'Bảo vệ tay ghế, mặt ghế, lưng ghế và chân ghế.'],
                ['▔', 'Bàn', 'Bảo vệ mặt bàn, cạnh bàn và các chi tiết hoàn thiện.'],
                ['▥', 'Tủ & Kệ', 'Bảo vệ cánh tủ, đợt tủ và các bề mặt dễ trầy xước.'],
                ['▭', 'Nội thất bọc nệm', 'Ngăn ma sát trên bề mặt vải, da hoặc PU trong quá trình vận chuyển.'],
                ['▤', 'Linh kiện nội thất', 'Bảo vệ từng chi tiết gia công trước khi đóng gói theo bộ.'],
                ['▧', 'OEM / ODM', 'Thiết kế phương án pallet theo tiêu chuẩn riêng của từng khách hàng.'],
              ].map(([icon, title, body]) => (
                <article key={title}>
                  <span aria-hidden="true">{icon}</span>
                  <h3>{t(title)}</h3>
                  <p>{t(body)}</p>
                  <div className="materials-pallet-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-pallet-process-control-row">
            <div className="materials-pallet-process">
              <h2>{t('Quy trình thiết kế pallet')}</h2>
              <div className="materials-pallet-process-flow">
                {[
                  ['1', 'Đánh giá sản phẩm'],
                  ['2', 'Xác định tải trọng'],
                  ['3', 'Thiết kế pallet'],
                  ['4', 'Kiểm tra xếp hàng'],
                  ['5', 'Kiểm tra container'],
                  ['6', 'Triển khai xuất khẩu'],
                ].map(([number, title]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <div aria-hidden="true">▢</div>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-pallet-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-pallet-control-layout">
                <div className="materials-pallet-control-grid">
                  {[
                    ['Kích thước pallet', 'Đảm bảo phù hợp với sản phẩm và kích thước container.'],
                    ['Cố định hàng hóa', 'Đảm bảo hàng hóa được cố định chắc chắn trên pallet bằng dây đai hoặc màng quấn.'],
                    ['Khả năng chịu tải', 'Lựa chọn kết cấu pallet phù hợp với trọng lượng của lô hàng.'],
                    ['Kiểm tra trước xuất hàng', 'Đánh giá toàn bộ hệ thống pallet trước khi xếp container.'],
                    ['Tiêu chuẩn ISPM 15', 'Kiểm tra xử lý nhiệt và dấu chứng nhận đối với pallet gỗ xuất khẩu.'],
                    ['Tình trạng pallet', 'Kiểm tra bề mặt, kết cấu và độ ổn định của pallet trước khi sử dụng.'],
                  ].map(([title, body]) => (
                    <article key={title}>
                      <span aria-hidden="true">✓</span>
                      <div>
                        <h3>{t(title)}</h3>
                        <p>{t(body)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="materials-pallet-system-combo-row">
            <div className="materials-pallet-system">
              <div>
                <h2>{t('Pallet trong hệ thống đóng gói của ANSLIFE')}</h2>
                <p>
                  {t(
                    'ANSLIFE thiết kế và lựa chọn phương án pallet phù hợp với từng loại sản phẩm, quy cách đóng gói và điều kiện vận chuyển.',
                  )}
                </p>
                <p>
                  {t(
                    'Pallet được kết hợp cùng thùng carton, foam bảo vệ và bảo vệ cạnh để hình thành hệ thống đóng gói nhằm tạo nên hệ thống logistics ổn định, giảm thiểu rủi ro trong quá trình lưu kho và xuất khẩu.',
                  )}
                </p>
              </div>
              <div className="materials-pallet-system-image-slot" aria-hidden="true" />
            </div>

            <div className="materials-pallet-combinations">
              <h2>{t('Kết hợp với các vật liệu đóng gói khác')}</h2>
              <div className="materials-pallet-combo-flow">
                {['Thùng carton', 'Foam bảo vệ', 'Bảo vệ cạnh', 'Màng quấn PE', 'Đai kiện'].map((item) => (
                  <article key={item}>
                    <span aria-hidden="true">▢</span>
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-pallet-cta">
            <div className="materials-pallet-cta-copy">
              <h2>{t('Trao đổi về phương án pallet cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi quy cách sản phẩm, trọng lượng kiện hàng, phương án đóng gói hoặc yêu cầu container loading để ANSLIFE đề xuất kích thước, kết cấu và tiêu chuẩn pallet phù hợp.',
                )}
              </p>
            </div>
            <div className="materials-pallet-cta-actions">
              <a href="/vn/contact">
                <span aria-hidden="true">✈</span>
                {t('Gửi yêu cầu')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">⇧</span>
                {t('Tải bản vẽ lên')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">☎</span>
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {isMaterialsEdgeProtectionPage && (
        <section className="materials-edge-protection-content">
          <section className="materials-edge-protection-reasons">
            <h2>{t('Vì sao cần bảo vệ cạnh?')}</h2>
            <div className="materials-edge-protection-reason-grid">
              {[
                ['▱', 'Hạn chế va đập', 'Giảm tác động trực tiếp lên các góc và cạnh trong quá trình vận chuyển.'],
                ['✧', 'Bảo vệ bề mặt hoàn thiện', 'Giảm nguy cơ trầy xước, sứt mẻ hoặc bong lớp sơn hoàn thiện.'],
                ['▣', 'Tăng độ ổn định khi đóng gói', 'Giữ sản phẩm cố định bên trong thùng carton và hạn chế dịch chuyển.'],
                ['☑', 'Giảm tỷ lệ hư hỏng', 'Giúp giảm khiếu nại và chi phí phát sinh do hư hỏng trong quá trình giao hàng.'],
                [
                  '▰',
                  'Phù hợp nhiều sản phẩm',
                  'Ứng dụng cho nội thất hoàn thiện, linh kiện và sản phẩm Knock-down (KD).',
                ],
                [
                  '▤',
                  'Tối ưu logistics',
                  'Bảo vệ hiệu quả mà không làm tăng đáng kể kích thước và trọng lượng kiện hàng.',
                ],
              ].map(([icon, title, body]) => (
                <article key={title}>
                  <span aria-hidden="true">{icon}</span>
                  <h3>{t(title)}</h3>
                  <p>{t(body)}</p>
                  <div className="materials-edge-protection-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-edge-protection-types">
            <h2>{t('Các loại bảo vệ cạnh')}</h2>
            <div className="materials-edge-protection-type-grid">
              {[
                ['Corner Protector', 'Bảo vệ bốn góc của sản phẩm khỏi va đập và nén.'],
                ['Edge Protector', 'Bảo vệ toàn bộ cạnh dài của mặt bàn, tủ hoặc panel.'],
                ['Foam Edge Protection', 'Vật liệu foam định hình giúp hấp thụ lực va đập và bảo vệ bề mặt sơn.'],
                ['Paper Corner Protection', 'Giải pháp từ giấy ép nhiều lớp, thân thiện với môi trường và phù hợp với nhiều dòng sản phẩm.'],
              ].map(([title, body]) => (
                <article key={title}>
                  <div className="materials-edge-protection-type-image-slot" aria-hidden="true" />
                  <h3>{t(title)}</h3>
                  <p>{t(body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-edge-protection-applications">
            <h2>{t('Ứng dụng trong đóng gói')}</h2>
            <div className="materials-edge-protection-application-grid">
              {[
                ['▱', 'Ghế', 'Bảo vệ chân ghế, tay vịn và lưng ghế.'],
                ['▔', 'Bàn', 'Bảo vệ các góc và cạnh mặt bàn.'],
                ['▥', 'Tủ & Kệ', 'Bảo vệ cánh tủ, cạnh tủ và các chi tiết dễ va đập.'],
                ['▭', 'Nội thất bọc nệm', 'Bảo vệ khung gỗ và các chi tiết cứng bên dưới lớp bọc.'],
                ['▤', 'Linh kiện nội thất', 'Bảo vệ các chi tiết gia công trước khi đóng gói theo bộ.'],
                ['▧', 'OEM / ODM', 'Thiết kế giải pháp bảo vệ theo yêu cầu riêng của từng sản phẩm.'],
              ].map(([icon, title, body]) => (
                <article key={title}>
                  <span aria-hidden="true">{icon}</span>
                  <h3>{t(title)}</h3>
                  <p>{t(body)}</p>
                  <div className="materials-edge-protection-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-edge-protection-process-control-row">
            <div className="materials-edge-protection-process">
              <h2>{t('Quy trình lựa chọn giải pháp bảo vệ')}</h2>
              <div className="materials-edge-protection-process-flow">
                {[
                  ['1', 'Đánh giá sản phẩm'],
                  ['2', 'Xác định vị trí va đập'],
                  ['3', 'Lựa chọn vật liệu bảo vệ'],
                  ['4', 'Kiểm tra đóng gói thử'],
                  ['5', 'Đánh giá vận chuyển'],
                  ['6', 'Triển khai sản xuất'],
                ].map(([number, title]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <div aria-hidden="true">▢</div>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-edge-protection-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-edge-protection-control-grid">
                {[
                  ['Vị trí bảo vệ', 'Đảm bảo tất cả các góc và cạnh quan trọng đều được bảo vệ đầy đủ.'],
                  ['Kích thước', 'Lựa chọn đúng kích thước theo thiết kế sản phẩm.'],
                  ['Độ bám và cố định', 'Đảm bảo vật liệu bảo vệ không bị dịch chuyển trong quá trình vận chuyển.'],
                  ['Khả năng hấp thụ va đập', 'Đánh giá hiệu quả bảo vệ theo từng phương thức vận chuyển.'],
                  ['Kiểm tra trước xuất hàng', 'Xác nhận hệ thống bảo vệ được lắp đặt đúng quy trình trước khi đóng thùng.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">▧</span>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-edge-protection-supply-combo-row">
            <div className="materials-edge-protection-supply">
              <div className="materials-edge-protection-supply-image-slot" aria-hidden="true" />
              <div className="materials-edge-protection-supply-copy">
                <h2>{t('Bảo vệ cạnh trong hệ thống đóng gói của ANSLIFE')}</h2>
                <p>
                  {t(
                    'ANSLIFE xây dựng giải pháp bảo vệ cạnh dựa trên đặc điểm của từng sản phẩm, kết hợp với thùng carton, foam bảo vệ và pallet để tạo thành hệ thống đóng gói hoàn chỉnh.',
                  )}
                </p>
                <p>
                  {t(
                    'Mỗi phương án đều được đánh giá trong quá trình phát triển sản phẩm nhằm giảm thiểu rủi ro hư hỏng trong vận chuyển quốc tế và đảm bảo chất lượng khi giao đến khách hàng.',
                  )}
                </p>
                <div className="materials-edge-protection-supply-flow">
                  {[
                    'Thiết kế theo sản phẩm',
                    'Kiểm tra đóng gói thử',
                    'Giảm rủi ro hư hỏng',
                    'Tối ưu chi phí logistics',
                    'Đáp ứng tiêu chuẩn xuất khẩu',
                  ].map((item) => (
                    <article key={item}>
                      <span aria-hidden="true">▢</span>
                      <p>{t(item)}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="materials-edge-protection-combinations">
              <h2>{t('Kết hợp với các vật liệu đóng gói khác')}</h2>
              <div className="materials-edge-protection-combo-map">
                <div className="materials-edge-protection-combo-center">
                  <strong>{t('Bảo vệ cạnh')}</strong>
                  <span>{t('Edge & Corner Protection')}</span>
                </div>
                {['Thùng carton', 'Foam bảo vệ', 'Túi PE', 'Pallet', 'Đai kiện'].map((item) => (
                  <article key={item}>
                    <span aria-hidden="true">▢</span>
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-edge-protection-cta">
            <div className="materials-edge-protection-cta-copy">
              <h2>{t('Trao đổi về giải pháp bảo vệ cạnh cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ sản phẩm, quy cách đóng gói hoặc yêu cầu vận chuyển để ANSLIFE đề xuất phương án bảo vệ góc và cạnh phù hợp.',
                )}
              </p>
            </div>
            <div className="materials-edge-protection-cta-actions">
              <a href="/vn/contact">
                <span aria-hidden="true">✈</span>
                {t('Gửi yêu cầu')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">⇧</span>
                {t('Tải bản vẽ lên')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">☎</span>
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {isMaterialsFoamProtectionPage && (
        <section className="materials-foam-protection-content">
          <section className="materials-foam-protection-role">
            <h2>{t('Vai trò của foam bảo vệ')}</h2>
            <div className="materials-foam-protection-role-grid">
              {[
                ['▱', 'Hạn chế va đập', 'Giảm tác động từ va chạm trong quá trình vận chuyển và bốc xếp.'],
                ['≋', 'Chống rung', 'Hạn chế rung động liên tục gây ảnh hưởng đến kết cấu và bề mặt sản phẩm.'],
                ['✧', 'Bảo vệ bề mặt hoàn thiện', 'Giảm nguy cơ trầy xước, bong sơn hoặc hư hỏng lớp hoàn thiện.'],
                ['▣', 'Cố định sản phẩm', 'Giữ sản phẩm ổn định bên trong thùng carton, hạn chế dịch chuyển.'],
                [
                  '▰',
                  'Phù hợp nhiều sản phẩm',
                  'Ứng dụng cho nội thất bàn ghế, linh kiện, mặt bàn, khung ghế và sản phẩm bọc nệm.',
                ],
                [
                  '◎',
                  'Tối ưu chi phí logistics',
                  'Lựa chọn đúng loại foam giúp cân bằng giữa khả năng bảo vệ và chi phí đóng gói.',
                ],
              ].map(([icon, title, body]) => (
                <article key={title}>
                  <span aria-hidden="true">{icon}</span>
                  <h3>{t(title)}</h3>
                  <p>{t(body)}</p>
                  <div className="materials-foam-protection-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-protection-types">
            <h2>{t('Các loại foam bảo vệ')}</h2>
            <div className="materials-foam-protection-type-grid">
              {[
                ['PE Foam', 'Mềm, nhẹ và phù hợp để bảo vệ bề mặt sản phẩm khỏi trầy xước.'],
                ['EPE Foam', 'Đàn hồi tốt, hấp thụ va đập hiệu quả và được sử dụng phổ biến trong nội thất xuất khẩu.'],
                ['EVA Foam', 'Độ bền cao, chịu nén tốt, phù hợp với các chi tiết cần bảo vệ đặc biệt.'],
                [
                  'Foam định hình',
                  'Gia công theo hình dạng sản phẩm nhằm cố định và bảo vệ tối đa trong quá trình vận chuyển.',
                ],
              ].map(([title, body]) => (
                <article key={title}>
                  <div className="materials-foam-protection-type-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-protection-applications">
            <h2>{t('Ứng dụng trong đóng gói')}</h2>
            <div className="materials-foam-protection-application-grid">
              {[
                ['▱', 'Ghế', 'Bảo vệ tay ghế, mặt ghế, lưng ghế và chân ghế.'],
                ['▔', 'Bàn', 'Bảo vệ mặt bàn, cạnh bàn và các chi tiết hoàn thiện.'],
                ['▥', 'Tủ & Kệ', 'Bảo vệ cánh tủ, đợt tủ và các bề mặt dễ trầy xước.'],
                ['▭', 'Nội thất bọc nệm', 'Ngăn ma sát trên bề mặt vải, da hoặc PU trong quá trình vận chuyển.'],
                ['▤', 'Linh kiện nội thất', 'Bảo vệ từng chi tiết gia công trước khi đóng gói theo bộ.'],
                ['▧', 'OEM / ODM', 'Thiết kế foam theo kích thước và yêu cầu riêng của từng dự án.'],
              ].map(([icon, title, body]) => (
                <article key={title}>
                  <span aria-hidden="true">{icon}</span>
                  <h3>{t(title)}</h3>
                  <p>{t(body)}</p>
                  <div className="materials-foam-protection-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-protection-detail-row">
            <div className="materials-foam-protection-process">
              <h2>{t('Quy trình lựa chọn foam bảo vệ')}</h2>
              <div className="materials-foam-protection-process-flow">
                {[
                  ['1', 'Đánh giá sản phẩm'],
                  ['2', 'Xác định vị trí cần bảo vệ'],
                  ['3', 'Lựa chọn loại foam'],
                  ['4', 'Thiết kế phương án đóng gói'],
                  ['5', 'Kiểm tra thử nghiệm'],
                  ['6', 'Triển khai sản xuất'],
                ].map(([number, title]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <div aria-hidden="true">▢</div>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-foam-protection-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-foam-protection-control-grid">
                {[
                  ['Độ dày foam', 'Lựa chọn theo trọng lượng và mức độ nhạy cảm của sản phẩm.'],
                  ['Độ ổn định', 'Đảm bảo foam không bị xê dịch trong quá trình vận chuyển.'],
                  ['Mật độ foam', 'Đảm bảo khả năng hấp thụ va đập phù hợp với từng ứng dụng.'],
                  ['Kiểm tra trước xuất hàng', 'Đánh giá toàn bộ hệ thống bảo vệ trước khi đóng thùng và xếp container.'],
                  ['Vị trí bố trí', 'Đặt đúng tại các điểm chịu lực hoặc dễ hư hỏng.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">▧</span>
                    <div>
                      <h3>{t(title)}</h3>
                      <p>{t(body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-foam-protection-supply">
              <h2>{t('Foam bảo vệ trong hệ thống đóng gói của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE lựa chọn và thiết kế giải pháp foam bảo vệ theo đặc điểm của từng sản phẩm, kết hợp với thùng carton, bảo vệ cạnh và pallet để hình thành hệ thống đóng gói hoàn chỉnh.',
                )}
              </p>
              <p>
                {t(
                  'Mỗi phương án đều được kiểm tra trong giai đoạn phát triển sản phẩm nhằm giảm thiểu rủi ro hư hỏng trong quá trình vận chuyển quốc tế và đảm bảo chất lượng khi giao đến khách hàng.',
                )}
              </p>
              <div className="materials-foam-protection-supply-image-slot" aria-hidden="true" />
            </div>
          </section>

          <section className="materials-foam-protection-bottom-row">
            <div className="materials-foam-protection-combinations">
              <h2>{t('Kết hợp với các vật liệu đóng gói khác')}</h2>
              <div className="materials-foam-protection-combo-map">
                <div className="materials-foam-protection-combo-center">
                  <strong>{t('Foam bảo vệ')}</strong>
                </div>
                {['Thùng carton', 'Bảo vệ cạnh', 'Pallet', 'Túi PE', 'Đai kiện'].map((item) => (
                  <article key={item}>
                    <span aria-hidden="true">▢</span>
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-foam-protection-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="materials-foam-protection-related-grid">
                {[
                  ['Thùng carton', 'Giải pháp bao bì chính cho sản phẩm xuất khẩu.'],
                  ['Bảo vệ cạnh', 'Bảo vệ góc và cạnh dễ va đập.'],
                  ['Pallet', 'Giải pháp lưu kho, nâng hạ và vận chuyển.'],
                  ['Chuẩn đóng gói', 'Quy trình kiểm soát đóng gói trước khi xuất khẩu.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <div className="materials-foam-protection-related-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(title)}</h3>
                      <p>{t(body)}</p>
                    </div>
                    <span aria-hidden="true">›</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-foam-protection-cta">
            <div className="materials-foam-protection-cta-copy">
              <h2>{t('Trao đổi về giải pháp foam bảo vệ cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ sản phẩm, quy cách đóng gói hoặc yêu cầu vận chuyển để ANSLIFE đề xuất phương án foam bảo vệ phù hợp.',
                )}
              </p>
            </div>
            <div className="materials-foam-protection-cta-actions">
              <a href="/vn/contact">
                <span aria-hidden="true">✈</span>
                {t('Gửi yêu cầu')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">⇧</span>
                {t('Tải bản vẽ lên')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">☎</span>
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {isMaterialsCartonPage && (
        <section className="materials-carton-content">
          <section className="materials-carton-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-carton-overview-panel">
              {[
                {
                  icon: '□',
                  title: 'Tên thương mại',
                  body: 'Corrugated Carton',
                },
                {
                  icon: '▤',
                  title: 'Nhóm vật liệu',
                  body: 'Vật liệu đóng gói',
                },
                {
                  icon: '▱',
                  title: 'Chức năng',
                  body: 'Bảo vệ sản phẩm\nĐóng gói\nLưu kho\nVận chuyển',
                },
                {
                  icon: '♻',
                  title: 'Đặc điểm',
                  body: 'Nhẹ\nChịu lực\nDễ in ấn\nCó thể tái chế',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    {item.body.includes('\n') ? (
                      <ul>
                        {item.body.split('\n').map((line) => (
                          <li key={line}>{t(line)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{t(item.body)}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-carton-role">
            <h2>{t('Vai trò của thùng carton')}</h2>
            <div className="materials-carton-role-grid">
              {[
                {
                  icon: '▱',
                  title: 'Bảo vệ sản phẩm',
                  body: 'Giảm tác động va đập trong quá trình vận chuyển.',
                },
                {
                  icon: '▥',
                  title: 'Tối ưu logistics',
                  body: 'Thiết kế phù hợp giúp tối ưu không gian container và chi phí vận chuyển.',
                },
                {
                  icon: '◇',
                  title: 'Dễ nhận diện',
                  body: 'Có thể in logo, mã hàng, hướng dẫn và thông tin vận chuyển.',
                },
                {
                  icon: '◎',
                  title: 'Phù hợp xuất khẩu',
                  body: 'Đáp ứng yêu cầu đóng gói cho vận chuyển đường biển, đường bộ và đường hàng không.',
                },
                {
                  icon: '♻',
                  title: 'Thân thiện môi trường',
                  body: 'Có khả năng tái chế và phù hợp với xu hướng phát triển bền vững.',
                },
                {
                  icon: '▣',
                  title: 'Linh hoạt theo sản phẩm',
                  body: 'Thiết kế kích thước và kết cấu riêng cho từng dòng nội thất.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <div className="materials-carton-role-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-carton-type-application-row">
            <div className="materials-carton-types">
              <h2>{t('Các loại thùng carton')}</h2>
              <div className="materials-carton-type-grid">
                {[
                  {
                    title: 'Carton 3 lớp',
                    body: 'Phù hợp với các sản phẩm có trọng lượng nhẹ và kích thước nhỏ.',
                  },
                  {
                    title: 'Carton 5 lớp',
                    body: 'Được sử dụng phổ biến cho nội thất xuất khẩu nhờ khả năng chịu lực và bảo vệ tốt.',
                  },
                  {
                    title: 'Carton 7 lớp',
                    body: 'Áp dụng cho sản phẩm có trọng lượng lớn hoặc yêu cầu bảo vệ cao trong quá trình vận chuyển.',
                  },
                  {
                    title: 'Carton thiết kế riêng',
                    body: 'Thiết kế theo kích thước, kết cấu và tiêu chuẩn đóng gói của từng buyer.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-carton-type-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-carton-applications">
              <h2>{t('Ứng dụng trong đóng gói')}</h2>
              <div className="materials-carton-application-grid">
                {[
                  ['Ghế', 'Đóng gói từng sản phẩm hoặc theo bộ.'],
                  ['Bàn', 'Kết hợp với foam, bảo vệ cạnh và phụ kiện cố định.'],
                  ['Tủ & Kệ', 'Đóng gói dạng Knock-down (KD) hoặc nguyên khối.'],
                  ['Nội thất bọc nệm', 'Kết hợp túi PE và vật liệu bảo vệ bề mặt.'],
                  ['Linh kiện nội thất', 'Đóng gói theo bộ hoặc theo mã linh kiện.'],
                  ['OEM / ODM', 'Thiết kế bao bì riêng theo yêu cầu thương hiệu của khách hàng.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">▧</span>
                    <div>
                      <h3>{t(title)}</h3>
                      <p>{t(body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-carton-design-control-row">
            <div className="materials-carton-design">
              <h2>{t('Thiết kế thùng carton')}</h2>
              <div className="materials-carton-design-flow">
                {[
                  ['1', 'Kích thước sản phẩm'],
                  ['2', 'Thiết kế thùng'],
                  ['3', 'Lựa chọn vật liệu'],
                  ['4', 'Kiểm tra khả năng chịu lực'],
                  ['5', 'Đóng gói thử nghiệm'],
                  ['6', 'Sản xuất hàng loạt'],
                ].map(([number, title]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <div aria-hidden="true">▣</div>
                    <h3>{t(title)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-carton-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-carton-control-grid">
                {[
                  ['Kích thước', 'Đảm bảo phù hợp với sản phẩm và tối ưu không gian đóng gói.'],
                  ['Độ bền thùng', 'Lựa chọn kết cấu carton phù hợp với trọng lượng và phương thức vận chuyển.'],
                  ['Chất lượng in', 'Kiểm tra logo, ký hiệu vận chuyển, mã sản phẩm và nhãn cảnh báo.'],
                  ['Độ kín của thùng', 'Đảm bảo thùng được dán và cố định đúng quy trình.'],
                  ['Kiểm tra trước xuất hàng', 'Đánh giá ngoại quan và chất lượng đóng gói trước khi xếp container.'],
                ].map(([title, body]) => (
                  <article key={title}>
                    <span aria-hidden="true">☑</span>
                    <h3>{t(title)}</h3>
                    <p>{t(body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-carton-supply">
            <div className="materials-carton-supply-image-slot" aria-hidden="true" />
            <div className="materials-carton-supply-copy">
              <h2>{t('Thùng carton trong hệ thống đóng gói của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE thiết kế và lựa chọn giải pháp thùng carton phù hợp với từng loại sản phẩm, điều kiện vận chuyển và yêu cầu của buyer.',
                )}
              </p>
              <p>
                {t(
                  'Mỗi phương án đóng gói đều được kiểm tra trong quá trình phát triển sản phẩm nhằm đảm bảo khả năng bảo vệ, tối ưu chi phí logistics và tính nhất quán trong sản xuất hàng loạt.',
                )}
              </p>
            </div>
            <div className="materials-carton-supply-flow">
              {['Thiết kế phù hợp sản phẩm', 'Kiểm tra & thử nghiệm thực tế', 'Đảm bảo tiêu chuẩn xuất khẩu', 'Tối ưu chi phí logistics'].map((item) => (
                <article key={item}>
                  <span aria-hidden="true">▢</span>
                  <p>{t(item)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-carton-bottom-row">
            <div className="materials-carton-combinations">
              <h2>{t('Kết hợp với các vật liệu bảo vệ khác')}</h2>
              <div className="materials-carton-combo-grid">
                {['Foam bảo vệ', 'Bảo vệ cạnh', 'Túi PE', 'Pallet', 'Đai kiện'].map((item) => (
                  <article key={item}>
                    <div className="materials-carton-combo-image-slot" aria-hidden="true" />
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-carton-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="materials-carton-related-grid">
                {['Foam bảo vệ', 'Bảo vệ cạnh', 'Pallet', 'Chuẩn đóng gói'].map((title) => (
                  <article key={title}>
                    <div className="materials-carton-related-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(title)}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-carton-cta">
            <div className="materials-carton-cta-copy">
              <h2>{t('Trao đổi về giải pháp thùng carton cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ sản phẩm, quy cách đóng gói, carton mark hoặc tiêu chuẩn vận chuyển để ANSLIFE đề xuất phương án thùng carton phù hợp.',
                )}
              </p>
            </div>
            <div className="materials-carton-cta-actions">
              <a href="/vn/contact">
                <span aria-hidden="true">✈</span>
                {t('Gửi yêu cầu')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">⇧</span>
                {t('Tải bản vẽ lên')}
              </a>
              <a href="/vn/contact">
                <span aria-hidden="true">☎</span>
                {t('Liên hệ ANSLIFE')}
              </a>
            </div>
          </section>
        </section>
      )}
      {isMaterialsLeatherPuPage && (
        <section className="materials-leather-pu-content">
          <section className="materials-leather-pu-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-leather-pu-overview-panel">
              {[
                {
                  icon: '▱',
                  title: 'Tên thương mại',
                  body: 'Leather & PU Upholstery',
                },
                {
                  icon: '▤',
                  title: 'Nhóm vật liệu',
                  body: 'Vật liệu bọc nệm',
                },
                {
                  icon: '☷',
                  title: 'Đặc điểm',
                  body: 'Sang trọng\nDễ vệ sinh\nĐộ bền cao\nĐa dạng màu sắc',
                },
                {
                  icon: '▥',
                  title: 'Khả năng ứng dụng',
                  body: 'Sofa\nGhế ăn\nGhế lounge\nGhế văn phòng\nHeadboard',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
              <div className="materials-leather-pu-overview-image-slot" aria-hidden="true" />
            </div>
          </section>

          <section className="materials-leather-pu-features">
            <h2>{t('Vì sao Da / PU được sử dụng phổ biến?')}</h2>
            <div className="materials-leather-pu-feature-grid">
              {[
                {
                  icon: '◇',
                  title: 'Ngoại quan sang trọng',
                  body: 'Tạo cảm giác cao cấp và chuyên nghiệp cho sản phẩm nội thất.',
                },
                {
                  icon: '✧',
                  title: 'Dễ vệ sinh',
                  body: 'Bề mặt dễ lau chùi, phù hợp với các không gian có tần suất sử dụng cao.',
                },
                {
                  icon: '▿',
                  title: 'Độ bền sử dụng',
                  body: 'Đáp ứng tốt yêu cầu của nội thất gia đình và thương mại khi lựa chọn đúng chủng loại.',
                },
                {
                  icon: '◌',
                  title: 'Đa dạng màu sắc',
                  body: 'Nhiều lựa chọn màu và bề mặt phù hợp với từng bộ sưu tập sản phẩm.',
                },
                {
                  icon: '⌁',
                  title: 'Cảm giác sử dụng',
                  body: 'Mang lại trải nghiệm sử dụng khác nhau tùy theo từng loại da hoặc PU.',
                },
                {
                  icon: '◎',
                  title: 'Phù hợp nhiều thị trường',
                  body: 'Được sử dụng rộng rãi trong khách sạn, văn phòng, nhà hàng và nội thất xuất khẩu.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <div className="materials-leather-pu-feature-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-leather-pu-types">
            <h2>{t('Các nhóm vật liệu')}</h2>
            <div className="materials-leather-pu-type-grid">
              {[
                {
                  title: 'Da thật (Genuine Leather)',
                  body: 'Mang lại vẻ đẹp tự nhiên với bề mặt và vân da đặc trưng, thường được lựa chọn cho các dòng nội thất cao cấp.',
                  items: ['Sofa cao cấp', 'Lounge Chair', 'Executive Chair'],
                },
                {
                  title: 'Da tổng hợp (PU Leather)',
                  body: 'Giải pháp phổ biến nhờ tính thẩm mỹ, đa dạng màu sắc, dễ bảo trì và hiệu quả chi phí.',
                  items: ['Ghế ăn', 'Ghế văn phòng', 'Sofa', 'Nội thất khách sạn'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-leather-pu-type-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                    <h4>{t('Ứng dụng')}</h4>
                    <ul>
                      {item.items.map((entry) => (
                        <li key={entry}>{t(entry)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-leather-pu-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-leather-pu-application-grid">
              {[
                {
                  title: 'Sofa',
                  items: ['Đệm ngồi', 'Đệm tựa', 'Tay vịn'],
                },
                {
                  title: 'Ghế ăn',
                  items: ['Dining Chair', 'Armchair'],
                },
                {
                  title: 'Ghế lounge',
                  items: ['Accent Chair', 'Relax Chair'],
                },
                {
                  title: 'Ghế văn phòng',
                  items: ['Executive Chair', 'Meeting Chair'],
                },
                {
                  title: 'Đầu giường',
                  items: ['Upholstered Headboard'],
                },
                {
                  title: 'Nội thất dự án',
                  items: ['Hotel', 'Resort', 'Restaurant', 'Office'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-leather-pu-application-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{t(entry)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-leather-pu-choose-control-row">
            <div className="materials-leather-pu-criteria">
              <h2>{t('Các tiêu chí lựa chọn')}</h2>
              <div className="materials-leather-pu-criteria-grid">
                {[
                  {
                    icon: '◌',
                    title: 'Màu sắc',
                    body: 'Đồng bộ với bộ sưu tập và mẫu duyệt.',
                  },
                  {
                    icon: '▧',
                    title: 'Kết cấu bề mặt',
                    body: 'Lựa chọn theo phong cách thiết kế và trải nghiệm sử dụng.',
                  },
                  {
                    icon: '▿',
                    title: 'Khả năng chống mài mòn',
                    body: 'Đáp ứng yêu cầu của từng môi trường sử dụng.',
                  },
                  {
                    icon: '✧',
                    title: 'Dễ vệ sinh',
                    body: 'Phù hợp với khách sạn, nhà hàng, văn phòng và không gian công cộng.',
                  },
                  {
                    icon: '☼',
                    title: 'Độ bền màu',
                    body: 'Duy trì tính ổn định trong quá trình sử dụng.',
                  },
                  {
                    icon: '☑',
                    title: 'Tiêu chuẩn kỹ thuật',
                    body: 'Lựa chọn theo yêu cầu riêng của buyer hoặc từng thị trường.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">{item.icon}</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-leather-pu-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-leather-pu-control-grid">
                {[
                  {
                    icon: '♢',
                    title: 'Màu sắc',
                    body: 'Đảm bảo đồng theo mẫu đã được phê duyệt.',
                  },
                  {
                    icon: '⌕',
                    title: 'Bề mặt',
                    body: 'Kiểm tra vân, độ đồng đều và tình trạng ngoại quan.',
                  },
                  {
                    icon: '□',
                    title: 'Đường may',
                    body: 'Đảm bảo độ chính xác và tính thẩm mỹ của sản phẩm.',
                  },
                  {
                    icon: '☑',
                    title: 'Kết hợp với foam',
                    body: 'Đảm bảo độ căng, hình dáng của sản phẩm sau khi bọc.',
                  },
                  {
                    icon: '⌁',
                    title: 'Kiểm tra hoàn thiện',
                    body: 'Đánh giá tổng thể trước khi đóng gói và xuất hàng.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">{item.icon}</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-leather-pu-supply-combo-row">
            <div className="materials-leather-pu-supply">
              <div className="materials-leather-pu-supply-copy">
                <h2>{t('Da / PU trong hệ thống cung ứng của ANSLIFE')}</h2>
                <p>
                  {t(
                    'ANSLIFE hỗ trợ lựa chọn vật liệu da hoặc PU phù hợp với yêu cầu thiết kế, ngân sách và tiêu chuẩn kỹ thuật của từng dự án.',
                  )}
                </p>
                <p>
                  {t(
                    'Các mẫu vật liệu được quản lý đồng bộ với foam, khung sản phẩm và quy trình bọc nệm nhằm đảm bảo sự nhất quán giữa mẫu duyệt và sản xuất hàng loạt.',
                  )}
                </p>
              </div>
              <div className="materials-leather-pu-supply-image-slot" aria-hidden="true" />
            </div>

            <div className="materials-leather-pu-combinations">
              <h2>{t('Kết hợp với các vật liệu khác')}</h2>
              <div className="materials-leather-pu-combo-map">
                <div className="materials-leather-pu-combo-center">
                  <div className="materials-leather-pu-combo-image-slot" aria-hidden="true" />
                  <strong>{t('Da / PU')}</strong>
                  <span>{t('Leather & PU Upholstery')}</span>
                </div>
                {['Foam', 'Kim loại', 'Mây', 'Vải', 'Khung gỗ'].map((item) => (
                  <article key={item}>
                    <div className="materials-leather-pu-combo-thumb-slot" aria-hidden="true" />
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-leather-pu-related">
            <h2>{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="materials-leather-pu-related-grid">
              {[
                {
                  title: 'Foam',
                  body: 'Giải pháp đệm và nâng đỡ cho sản phẩm bọc nệm.',
                },
                {
                  title: 'Vải',
                  body: 'Các dòng vải bọc cho nhiều phong cách thiết kế.',
                },
                {
                  title: 'Nội thất bọc nệm',
                  body: 'Khám phá sofa, ghế và giường bọc nệm.',
                },
                {
                  title: 'Khung ghế',
                  body: 'Hệ khung kết hợp với foam và vật liệu bọc.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-leather-pu-related-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <span aria-hidden="true">›</span>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-leather-pu-cta">
            <div className="materials-leather-pu-cta-copy">
              <h2>{t('Trao đổi về giải pháp da / PU cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi mẫu vật liệu, bảng màu hoặc yêu cầu kỹ thuật để ANSLIFE tư vấn lựa chọn loại da hoặc PU phù hợp với sản phẩm, tiêu chuẩn sử dụng và thị trường xuất khẩu.',
                )}
              </p>
              <div className="materials-leather-pu-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải mẫu vật liệu lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
            <div className="materials-leather-pu-cta-image-slot" aria-hidden="true" />
          </section>
        </section>
      )}
      {isMaterialsFabricPage && (
        <section className="materials-fabric-content">
          <section className="materials-fabric-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-fabric-overview-panel">
              {[
                {
                  icon: '▥',
                  title: 'Tên thương mại',
                  body: 'Upholstery Fabric',
                },
                {
                  icon: '◍',
                  title: 'Nhóm vật liệu',
                  body: 'Vật liệu bọc nệm',
                },
                {
                  icon: '▧',
                  title: 'Đặc điểm',
                  body: 'Đa dạng màu sắc\nĐa dạng kết cấu\nThoải mái\nLinh hoạt trong thiết kế',
                },
                {
                  icon: '▥',
                  title: 'Ứng dụng',
                  body: 'Ghế\nSofa\nGiường\nHeadboard\nBench',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
              <div className="materials-fabric-overview-image-slot" aria-hidden="true" />
            </div>
          </section>

          <section className="materials-fabric-features">
            <h2>{t('Vì sao Upholstery Fabric được sử dụng phổ biến?')}</h2>
            <div className="materials-fabric-feature-grid">
              {[
                {
                  icon: '◌',
                  title: 'Đa dạng màu sắc',
                  body: 'Đáp ứng nhiều phong cách thiết kế và bộ sưu tập sản phẩm.',
                },
                {
                  icon: '▧',
                  title: 'Nhiều kết cấu bề mặt',
                  body: 'Từ mịn, dệt thô đến các kiểu vải có họa tiết đặc trưng.',
                },
                {
                  icon: '⌁',
                  title: 'Cảm giác sử dụng',
                  body: 'Mang lại sự thoải mái và dễ chịu khi tiếp xúc trực tiếp.',
                },
                {
                  icon: '✣',
                  title: 'Dễ phối hợp vật liệu',
                  body: 'Kết hợp tốt với gỗ, kim loại, mây và da.',
                },
                {
                  icon: '▤',
                  title: 'Phù hợp nhiều không gian',
                  body: 'Từ nội thất gia đình đến khách sạn, nhà hàng và văn phòng.',
                },
                {
                  icon: '□',
                  title: 'Linh hoạt theo yêu cầu buyer',
                  body: 'Có thể lựa chọn màu sắc, chất liệu và thông số kỹ thuật theo từng dự án.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <div className="materials-fabric-feature-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-fabric-groups">
            <h2>{t('Các nhóm vải phổ biến')}</h2>
            <div className="materials-fabric-group-grid">
              {[
                {
                  title: 'Polyester',
                  body: 'Độ bền tốt, dễ bảo trì và phù hợp với nhiều dòng sản phẩm.',
                },
                {
                  title: 'Linen Blend',
                  body: 'Mang lại vẻ tự nhiên và cảm giác mềm mại.',
                },
                {
                  title: 'Cotton Blend',
                  body: 'Thoải mái khi sử dụng và phù hợp với nội thất gia đình.',
                },
                {
                  title: 'Woven Fabric',
                  body: 'Đa dạng về họa tiết và kết cấu bề mặt.',
                },
                {
                  title: 'Performance Fabric',
                  body: 'Tăng khả năng chống bám bẩn, chống mài mòn và phù hợp với môi trường sử dụng cường độ cao.',
                },
                {
                  title: 'Recycled Fabric',
                  body: 'Giải pháp vật liệu hướng tới phát triển bền vững.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-fabric-group-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-fabric-app-criteria-row">
            <div className="materials-fabric-applications">
              <h2>{t('Ứng dụng trong nội thất')}</h2>
              <div className="materials-fabric-application-grid">
                {[
                  {
                    title: 'Sofa',
                    items: ['Đệm ngồi', 'Đệm tựa', 'Tay vịn'],
                  },
                  {
                    title: 'Ghế bọc nệm',
                    items: ['Dining Chair', 'Lounge Chair', 'Office Chair'],
                  },
                  {
                    title: 'Giường',
                    items: ['Headboard', 'Bed Frame'],
                  },
                  {
                    title: 'Bench',
                    items: ['Bench', 'Ottoman'],
                  },
                  {
                    title: 'Nội thất khách sạn',
                    items: ['Hotel Furniture', 'Resort Furniture', 'Restaurant Furniture'],
                  },
                  {
                    title: 'Nội thất văn phòng',
                    items: ['Reception Seating', 'Meeting Room', 'Workspace Furniture'],
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-fabric-application-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <ul>
                        {item.items.map((entry) => (
                          <li key={entry}>{t(entry)}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-fabric-criteria">
              <h2>{t('Các tiêu chí lựa chọn vải')}</h2>
              <div className="materials-fabric-criteria-grid">
                {[
                  {
                    icon: '◌',
                    title: 'Màu sắc',
                    body: 'Đồng bộ với thiết kế và bộ sưu tập sản phẩm.',
                  },
                  {
                    icon: '▧',
                    title: 'Kết cấu',
                    body: 'Lựa chọn theo phong cách thiết kế và cảm giác sử dụng.',
                  },
                  {
                    icon: '▿',
                    title: 'Độ bền mài mòn',
                    body: 'Phù hợp với tần suất sử dụng của từng không gian.',
                  },
                  {
                    icon: 'UV',
                    title: 'Độ bền màu',
                    body: 'Đảm bảo tính ổn định trong quá trình sử dụng.',
                  },
                  {
                    icon: '♢',
                    title: 'Khả năng vệ sinh',
                    body: 'Lựa chọn theo yêu cầu bảo trì và bảo dưỡng.',
                  },
                  {
                    icon: '☑',
                    title: 'Tiêu chuẩn kỹ thuật',
                    body: 'Đáp ứng các yêu cầu riêng của buyer hoặc từng thị trường.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">{item.icon}</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-fabric-control">
            <h2>{t('Những yếu tố cần kiểm soát')}</h2>
            <div className="materials-fabric-control-grid">
              {[
                {
                  icon: '◌',
                  title: 'Màu sắc',
                  body: 'Đảm bảo đúng theo mẫu duyệt.',
                },
                {
                  icon: '⚗',
                  title: 'Lô nhuộm',
                  body: 'Kiểm soát sự đồng đều giữa các lô sản xuất.',
                },
                {
                  icon: '▥',
                  title: 'Hướng vân vải',
                  body: 'Đảm bảo tính nhất quán khi cắt và may.',
                },
                {
                  icon: '▣',
                  title: 'Chất lượng đường may',
                  body: 'Kiểm tra độ chính xác và tính thẩm mỹ của sản phẩm hoàn thiện.',
                },
                {
                  icon: '⌕',
                  title: 'Kiểm tra ngoại quan',
                  body: 'Đánh giá bề mặt trước khi đóng gói và xuất hàng.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-fabric-supply-combo-row">
            <div className="materials-fabric-supply">
              <div className="materials-fabric-supply-copy">
                <h2>{t('Vải trong hệ thống cung ứng của ANSLIFE')}</h2>
                <p>
                  {t(
                    'ANSLIFE hỗ trợ lựa chọn chất liệu, màu sắc và thông số kỹ thuật của vải bọc theo yêu cầu của từng buyer và từng dự án.',
                  )}
                </p>
                <p>
                  {t(
                    'Các mẫu vải được quản lý đồng bộ với mẫu duyệt, vật liệu bọc, foam và quy trình sản xuất nhằm đảm bảo tính nhất quán giữa mẫu phát triển và sản xuất hàng loạt.',
                  )}
                </p>
              </div>
              <div className="materials-fabric-supply-image-slot" aria-hidden="true" />
            </div>

            <div className="materials-fabric-combinations">
              <h2>{t('Kết hợp với các vật liệu khác')}</h2>
              <div className="materials-fabric-combo-map">
                <div className="materials-fabric-combo-center">
                  <div className="materials-fabric-combo-image-slot" aria-hidden="true" />
                  <strong>{t('Vải')}</strong>
                  <span>{t('Upholstery Fabric')}</span>
                </div>
                {['Foam', 'Da / PU', 'Mây', 'Kim loại', 'Khung gỗ'].map((item) => (
                  <article key={item}>
                    <div className="materials-fabric-combo-thumb-slot" aria-hidden="true" />
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-fabric-related">
            <h2>{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="materials-fabric-related-grid">
              {[
                {
                  title: 'Foam',
                  body: 'Giải pháp đệm và nâng đỡ cho sản phẩm bọc nệm.',
                },
                {
                  title: 'Da / PU',
                  body: 'Các lựa chọn bề mặt bọc cao cấp.',
                },
                {
                  title: 'Nội thất bọc nệm',
                  body: 'Khám phá các dòng sofa, ghế và giường bọc nệm.',
                },
                {
                  title: 'Sơn & hoàn thiện bề mặt',
                  body: 'Giải pháp hoàn thiện cho phần khung gỗ kết hợp với vải bọc.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-fabric-related-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <span aria-hidden="true">›</span>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-fabric-cta">
            <div className="materials-fabric-cta-image-slot" aria-hidden="true" />
            <div className="materials-fabric-cta-copy">
              <h2>{t('Trao đổi về giải pháp vải bọc cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bảng màu, mẫu vải hoặc yêu cầu kỹ thuật để ANSLIFE tư vấn lựa chọn chất liệu, màu sắc và thông số phù hợp với từng sản phẩm và thị trường xuất khẩu.',
                )}
              </p>
              <div className="materials-fabric-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsFoamPage && (
        <section className="materials-foam-content">
          <section className="materials-foam-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-foam-overview-panel">
              {[
                {
                  icon: '▣',
                  title: 'Tên thương mại',
                  body: 'PU Foam',
                },
                {
                  icon: '◍',
                  title: 'Nhóm vật liệu',
                  body: 'Vật liệu bọc nệm',
                },
                {
                  icon: '▤',
                  title: 'Chức năng',
                  body: 'Đệm\nNâng đỡ\nTạo sự êm ái\nGiảm áp lực',
                },
                {
                  icon: '□',
                  title: 'Đặc điểm',
                  body: 'Đàn hồi\nNhẹ\nDễ tạo hình\nNhiều cấp độ cứng',
                },
                {
                  icon: '▥',
                  title: 'Ứng dụng',
                  body: 'Ghế\nSofa\nGiường\nHeadboard\nBench',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-features">
            <h2>{t('Vì sao Foam được sử dụng rộng rãi?')}</h2>
            <div className="materials-foam-feature-grid">
              {[
                {
                  icon: '◍',
                  title: 'Êm ái và thoải mái',
                  body: 'Mang lại cảm giác ngồi hoặc nằm phù hợp với từng dòng sản phẩm.',
                },
                {
                  icon: '≋',
                  title: 'Khả năng đàn hồi',
                  body: 'Giúp sản phẩm phục hồi hình dạng sau quá trình sử dụng.',
                },
                {
                  icon: '✣',
                  title: 'Nâng đỡ cơ thể',
                  body: 'Phân bố áp lực và tăng sự thoải mái cho người sử dụng.',
                },
                {
                  icon: '⌁',
                  title: 'Dễ tạo hình',
                  body: 'Có thể cắt, CNC hoặc tạo hình theo nhiều thiết kế khác nhau.',
                },
                {
                  icon: '▤',
                  title: 'Đa dạng chủng loại',
                  body: 'Có nhiều mật độ và độ cứng đáp ứng các yêu cầu khác nhau.',
                },
                {
                  icon: '✧',
                  title: 'Kết hợp linh hoạt',
                  body: 'Có thể kết hợp với lò xo, bông polyester và nhiều vật liệu bọc khác.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <div className="materials-foam-feature-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-types">
            <h2>{t('Các loại Foam phổ biến')}</h2>
            <div className="materials-foam-type-grid">
              {[
                {
                  title: 'Standard Foam',
                  body: 'Phù hợp với hầu hết các dòng ghế và sofa thông dụng.',
                },
                {
                  title: 'High Density Foam',
                  body: 'Độ bền cao, phù hợp với các sản phẩm sử dụng thường xuyên.',
                },
                {
                  title: 'High Resilience Foam (HR Foam)',
                  body: 'Đàn hồi tốt, mang lại cảm giác ngồi thoải mái và tuổi thọ cao.',
                },
                {
                  title: 'Memory Foam',
                  body: 'Phân bố áp lực tốt, thường sử dụng cho các dòng sản phẩm cao cấp.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-foam-type-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-foam-application-grid">
              {[
                {
                  title: 'Sofa',
                  items: ['Đệm ngồi', 'Đệm tựa', 'Tay vịn'],
                },
                {
                  title: 'Ghế bọc nệm',
                  items: ['Dining Chair', 'Lounge Chair', 'Office Chair'],
                },
                {
                  title: 'Giường',
                  items: ['Headboard', 'Đệm đầu giường'],
                },
                {
                  title: 'Bench',
                  items: ['Ghế băng', 'Ghế cuối giường'],
                },
                {
                  title: 'Nội thất khách sạn',
                  items: ['Hotel Furniture', 'Resort Furniture', 'Hospitality Seating'],
                },
                {
                  title: 'Nội thất theo dự án',
                  items: ['OEM / ODM', 'Custom Furniture'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-foam-application-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{t(entry)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-parameters">
            <h2>{t('Các thông số cần lựa chọn')}</h2>
            <div className="materials-foam-parameter-grid">
              {[
                {
                  icon: 'KG/m³',
                  title: 'Density (Mật độ)',
                  body: 'Ảnh hưởng đến độ bền và tuổi thọ của foam.',
                },
                {
                  icon: '◜',
                  title: 'Hardness (Độ cứng)',
                  body: 'Quyết định cảm giác ngồi hoặc nằm.',
                },
                {
                  icon: '≋',
                  title: 'Resilience (Độ đàn hồi)',
                  body: 'Khả năng phục hồi sau khi chịu tải.',
                },
                {
                  icon: 'L',
                  title: 'Thickness (Độ dày)',
                  body: 'Lựa chọn theo thiết kế và mục đích sử dụng.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-control">
            <h2>{t('Những yếu tố cần kiểm soát')}</h2>
            <div className="materials-foam-control-grid">
              {[
                {
                  icon: '▧',
                  title: 'Mật độ foam',
                  body: 'Đảm bảo đúng thông số kỹ thuật theo yêu cầu của dự án.',
                },
                {
                  icon: '↓',
                  title: 'Độ cứng',
                  body: 'Kiểm tra cảm giác sử dụng và khả năng nâng đỡ.',
                },
                {
                  icon: '□',
                  title: 'Kích thước',
                  body: 'Đảm bảo độ chính xác trước khi bọc nệm.',
                },
                {
                  icon: '↻',
                  title: 'Khả năng phục hồi',
                  body: 'Đánh giá khả năng đàn hồi sau quá trình nén.',
                },
                {
                  icon: '⌁',
                  title: 'Chất lượng gia công',
                  body: 'Kiểm tra bề mặt cắt và độ chính xác của chi tiết foam.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-supply">
            <div className="materials-foam-supply-image-slot" aria-hidden="true" />
            <div className="materials-foam-supply-copy">
              <h2>{t('Foam trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn chủng loại foam phù hợp với thiết kế sản phẩm, tiêu chuẩn kỹ thuật và yêu cầu sử dụng của từng dự án.',
                )}
              </p>
              <p>
                {t(
                  'Foam được kết hợp với hệ thống khung, vật liệu bọc và quy trình kiểm soát chất lượng nhằm đảm bảo sự đồng nhất giữa mẫu duyệt và sản xuất hàng loạt.',
                )}
              </p>
            </div>
            <div className="materials-foam-supply-flow">
              {['Tư vấn vật liệu', 'Phát triển sản phẩm', 'Kiểm soát chất lượng', 'Sản xuất ổn định', 'Đáp ứng tiêu chuẩn xuất khẩu'].map((item) => (
                <article key={item}>
                  <div className="materials-foam-supply-icon-slot" aria-hidden="true" />
                  <p>{t(item)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-combinations">
            <h2>{t('Kết hợp với các vật liệu khác')}</h2>
            <div className="materials-foam-combo-chain">
              {['Vải', 'Da / PU', 'Foam', 'Khung gỗ', 'Lò xo', 'Bông polyester'].map((item) => (
                <article key={item} className={item === 'Foam' ? 'is-main' : undefined}>
                  <div className="materials-foam-combo-image-slot" aria-hidden="true" />
                  <h3>{t(item)}</h3>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-foam-bottom-row">
            <div className="materials-foam-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="materials-foam-related-grid">
                {[
                  {
                    title: 'Nội thất bọc nệm',
                    body: 'Khám phá các sản phẩm sử dụng foam.',
                  },
                  {
                    title: 'Vải',
                    body: 'Các loại vải bọc phù hợp với từng dòng sản phẩm.',
                  },
                  {
                    title: 'Da / PU',
                    body: 'Giải pháp bọc cho sofa, ghế và nội thất thương mại.',
                  },
                  {
                    title: 'Khung ghế',
                    body: 'Hệ khung kết hợp cùng foam và vật liệu bọc.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-foam-related-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-foam-cta">
              <div className="materials-foam-cta-copy">
                <h2>{t('Trao đổi về giải pháp foam cho dự án của bạn')}</h2>
                <p>
                  {t(
                    'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu về độ cứng, mật độ và cảm giác sử dụng để ANSLIFE tư vấn lựa chọn loại foam phù hợp với từng dòng nội thất và thị trường xuất khẩu.',
                  )}
                </p>
                <div className="materials-foam-cta-actions">
                  <a href="/vn/contact">
                    <span aria-hidden="true">✈</span>
                    {t('Gửi yêu cầu')}
                  </a>
                  <a href="/vn/contact">
                    <span aria-hidden="true">⇧</span>
                    {t('Tải bản vẽ lên')}
                  </a>
                  <a href="/vn/contact">
                    <span aria-hidden="true">☎</span>
                    {t('Liên hệ ANSLIFE')}
                  </a>
                </div>
              </div>
              <div className="materials-foam-cta-image-slot" aria-hidden="true" />
            </div>
          </section>
        </section>
      )}
      {isMaterialsCaneWebbingPage && (
        <section className="materials-cane-webbing-content">
          <section className="materials-cane-webbing-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-cane-webbing-overview-panel">
              {[
                {
                  icon: '◌',
                  title: 'Tên thương mại',
                  body: 'Natural Cane Webbing',
                },
                {
                  icon: '♧',
                  title: 'Nhóm vật liệu',
                  body: 'Vật liệu tự nhiên',
                },
                {
                  icon: '☷',
                  title: 'Đặc điểm',
                  body: 'Thông thoáng\nNhẹ\nGiá trị thủ công\nTrang trí cao',
                },
                {
                  icon: '▧',
                  title: 'Cấu tạo',
                  body: 'Sợi mây tự nhiên được đan thành tấm theo nhiều kiểu mặt đan khác nhau.',
                },
                {
                  icon: '▥',
                  title: 'Khả năng ứng dụng',
                  body: 'Ghế\nTủ\nVách trang trí\nĐầu giường\nPanel nội thất',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cane-webbing-features">
            <h2>{t('Vì sao Cane Webbing được ưa chuộng?')}</h2>
            <div className="materials-cane-webbing-feature-grid">
              {[
                {
                  icon: '◍',
                  title: 'Thẩm mỹ tự nhiên',
                  body: 'Mang đến vẻ đẹp tinh tế và gần gũi với thiên nhiên.',
                },
                {
                  icon: '≋',
                  title: 'Thông thoáng',
                  body: 'Cấu trúc mặt đan giúp tăng khả năng lưu thông không khí cho bề mặt sử dụng.',
                },
                {
                  icon: '◌',
                  title: 'Trọng lượng nhẹ',
                  body: 'Giảm trọng lượng tổng thể của sản phẩm mà vẫn đảm bảo tính thẩm mỹ.',
                },
                {
                  icon: '✧',
                  title: 'Giá trị thủ công',
                  body: 'Mỗi tấm đan thể hiện kỹ thuật và tay nghề của người thợ.',
                },
                {
                  icon: '↔',
                  title: 'Dễ kết hợp vật liệu',
                  body: 'Phù hợp với gỗ tự nhiên, kim loại, kính và vật liệu bọc nệm.',
                },
                {
                  icon: '▢',
                  title: 'Phong cách thiết kế đa dạng',
                  body: 'Được sử dụng rộng rãi trong nhiều xu hướng nội thất hiện đại.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <div className="materials-cane-webbing-feature-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cane-webbing-weaves">
            <h2>{t('Các kiểu đan phổ biến')}</h2>
            <div className="materials-cane-webbing-weave-grid">
              {[
                {
                  title: 'Open Cane',
                  body: 'Kiểu đan lục giác truyền thống, tạo cảm giác nhẹ nhàng và thông thoáng.',
                },
                {
                  title: 'Close Weave',
                  body: 'Mật độ đan cao hơn, tạo độ kín và tạo điểm nhấn cho sản phẩm.',
                },
                {
                  title: 'Custom Weave',
                  body: 'Các kiểu đan được phát triển theo yêu cầu thiết kế riêng của từng dự án.',
                },
                {
                  title: 'Decorative Pattern',
                  body: 'Hoa văn đan trang trí phục vụ các dòng nội thất cao cấp.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-cane-webbing-weave-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cane-webbing-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-cane-webbing-application-grid">
              {[
                {
                  title: 'Ghế',
                  items: ['Lưng ghế', 'Mặt ghế', 'Ghế ăn', 'Ghế lounge'],
                },
                {
                  title: 'Tủ',
                  items: ['Cánh tủ', 'Cửa tủ', 'Panel trang trí'],
                },
                {
                  title: 'Đầu giường',
                  items: ['Headboard', 'Decorative Insert'],
                },
                {
                  title: 'Vách trang trí',
                  items: ['Decorative Screen', 'Room Divider', 'Wall Panel'],
                },
                {
                  title: 'Nội thất khách sạn',
                  items: ['Hotel Furniture', 'Resort Furniture', 'Restaurant Furniture'],
                },
                {
                  title: 'Nội thất tùy chỉnh',
                  items: ['Custom Furniture', 'OEM / ODM Projects'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-cane-webbing-application-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{t(entry)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cane-webbing-combo-finish-row">
            <div className="materials-cane-webbing-combinations">
              <h2>{t('Kết hợp với các vật liệu khác')}</h2>
              <div className="materials-cane-webbing-combo-map">
                <div className="materials-cane-webbing-combo-center">
                  <div className="materials-cane-webbing-combo-image-slot" aria-hidden="true" />
                  <strong>{t('Cane Webbing')}</strong>
                </div>
                {['Gỗ tự nhiên', 'Kim loại', 'Kính', 'Vải bọc', 'Da'].map((item) => (
                  <article key={item}>
                    <div className="materials-cane-webbing-combo-thumb-slot" aria-hidden="true" />
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-cane-webbing-finishing">
              <h2>{t('Các phương án hoàn thiện')}</h2>
              <div className="materials-cane-webbing-finish-grid">
                {[
                  {
                    title: 'Natural Finish',
                    body: 'Giữ nguyên màu sắc tự nhiên của mặt đan.',
                  },
                  {
                    title: 'Stain Finish',
                    body: 'Điều chỉnh màu sắc để đồng bộ với khung gỗ.',
                  },
                  {
                    title: 'Protective Coating',
                    body: 'Bảo vệ bề mặt và tăng độ bền trong điều kiện sử dụng trong nhà.',
                  },
                  {
                    title: 'Custom Color',
                    body: 'Hoàn thiện theo màu hoặc yêu cầu của buyer.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-cane-webbing-finish-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-cane-webbing-control">
            <h2>{t('Những yếu tố cần kiểm soát')}</h2>
            <div className="materials-cane-webbing-control-grid">
              {[
                {
                  icon: '◍',
                  title: 'Chất lượng sợi mây',
                  body: 'Đảm bảo độ đồng đều, độ già và tình trạng của sợi mây trước khi sản xuất.',
                },
                {
                  icon: '▧',
                  title: 'Mật độ đan',
                  body: 'Kiểm soát độ căng, khoảng cách và sự đồng nhất của mặt đan.',
                },
                {
                  icon: '↔',
                  title: 'Liên kết với khung',
                  body: 'Đảm bảo mặt đan được căng yêu cầu chuẩn và ổn định trong quá trình sử dụng.',
                },
                {
                  icon: '⌁',
                  title: 'Hoàn thiện bề mặt',
                  body: 'Kiểm tra màu sắc, độ đồng đều và chất lượng lớp hoàn thiện.',
                },
                {
                  icon: '□',
                  title: 'Đóng gói',
                  body: 'Bảo vệ mặt đan khỏi va đập và biến dạng trong quá trình vận chuyển.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cane-webbing-supply">
            <div className="materials-cane-webbing-supply-image-slot" aria-hidden="true" />
            <div className="materials-cane-webbing-supply-copy">
              <h2>{t('Cane Webbing trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn kiểu đan, phát triển sản phẩm, kiểm soát chất lượng và triển khai sản xuất các sản phẩm sử dụng mặt đan mây theo yêu cầu của từng dự án.',
                )}
              </p>
              <p>
                {t(
                  'Mặt đan mây có thể được ứng dụng trong các bộ sưu tập nội thất hoàn thiện, OEM / ODM và các dự án khách sạn, resort hoặc không gian thương mại.',
                )}
              </p>
            </div>
            <div className="materials-cane-webbing-supply-flow">
              {['Lựa chọn kiểu đan phù hợp', 'Kiểm soát chất lượng', 'Sản xuất chuyên nghiệp', 'Đáp ứng tiêu chuẩn xuất khẩu'].map((item) => (
                <article key={item}>
                  <div className="materials-cane-webbing-supply-icon-slot" aria-hidden="true" />
                  <p>{t(item)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cane-webbing-styles">
            <h2>{t('Phong cách thiết kế phù hợp')}</h2>
            <div className="materials-cane-webbing-style-grid">
              {[
                {
                  title: 'Scandinavian',
                  body: 'Tối giản, sáng màu và sử dụng vật liệu tự nhiên.',
                },
                {
                  title: 'Japandi',
                  body: 'Cân bằng giữa công năng, thủ công và vẻ đẹp tự nhiên.',
                },
                {
                  title: 'Tropical',
                  body: 'Không gian nghỉ dưỡng với vật liệu thiên nhiên.',
                },
                {
                  title: 'Contemporary',
                  body: 'Kết hợp vật liệu truyền thống với thiết kế hiện đại.',
                },
                {
                  title: 'Boutique Hospitality',
                  body: 'Khách sạn, resort và nhà hàng có dấu ấn thiết kế riêng.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-cane-webbing-style-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cane-webbing-related">
            <h2>{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="materials-cane-webbing-related-grid">
              {[
                {
                  title: 'Mây',
                  body: 'Tìm hiểu về nguyên liệu mây tự nhiên.',
                },
                {
                  title: 'Tre',
                  body: 'Khám phá các ứng dụng của tre trong nội thất.',
                },
                {
                  title: 'Nội thất mây tre',
                  body: 'Các bộ sưu tập sử dụng mây và mặt đan mây.',
                },
                {
                  title: 'Ghế',
                  body: 'Các dòng ghế sử dụng mặt đan mây tự nhiên.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-cane-webbing-related-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <span aria-hidden="true">›</span>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-cane-webbing-cta">
            <div className="materials-cane-webbing-cta-image-slot" aria-hidden="true" />
            <div className="materials-cane-webbing-cta-copy">
              <h2>{t('Trao đổi về mặt đan mây cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng mặt đan mây và đề xuất phương án sản xuất phù hợp.',
                )}
              </p>
              <div className="materials-cane-webbing-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsBambooPage && (
        <section className="materials-bamboo-content">
          <section className="materials-bamboo-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-bamboo-overview-panel">
              {[
                {
                  icon: '♜',
                  title: 'Tên thương mại',
                  body: 'Bamboo',
                },
                {
                  icon: '◍',
                  title: 'Nhóm vật liệu',
                  body: 'Vật liệu tự nhiên',
                },
                {
                  icon: '☷',
                  title: 'Đặc điểm',
                  body: 'Nhẹ\nĐộ bền tốt\nPhát triển nhanh\nThân thiện môi trường',
                },
                {
                  icon: '⚙',
                  title: 'Khả năng gia công',
                  body: 'Ép tấm\nUốn\nTiện\nCNC\nGhép thanh\nGia công thủ công',
                },
                {
                  icon: '▥',
                  title: 'Phong cách phù hợp',
                  body: 'Scandinavian\nJapandi\nModern\nEco Living\nHospitality',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-bamboo-features">
            <h2>{t('Vì sao Bamboo được sử dụng nhiều?')}</h2>
            <div className="materials-bamboo-feature-grid">
              {[
                {
                  icon: '◍',
                  title: 'Nguồn nguyên liệu tái tạo',
                  body: 'Tre có chu kỳ sinh trưởng ngắn và là một trong những vật liệu tự nhiên được đánh giá cao về khả năng tái tạo.',
                },
                {
                  icon: '▿',
                  title: 'Độ bền tốt',
                  body: 'Khi được xử lý phù hợp, tre đáp ứng tốt nhiều yêu cầu sử dụng trong nội thất.',
                },
                {
                  icon: '◌',
                  title: 'Trọng lượng nhẹ',
                  body: 'Giúp giảm trọng lượng sản phẩm và thuận lợi trong vận chuyển.',
                },
                {
                  icon: '⌁',
                  title: 'Gia công linh hoạt',
                  body: 'Có thể ép tấm, ghép thanh, tạo hình hoặc kết hợp với nhiều vật liệu khác.',
                },
                {
                  icon: '◉',
                  title: 'Giá trị thiết kế',
                  body: 'Mang đến vẻ đẹp tự nhiên, hiện đại và phù hợp với nhiều phong cách nội thất.',
                },
                {
                  icon: '◎',
                  title: 'Hướng đến phát triển bền vững',
                  body: 'Là lựa chọn phù hợp cho các dự án ưu tiên vật liệu có nguồn gốc tự nhiên và sử dụng tài nguyên hiệu quả.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <div className="materials-bamboo-feature-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-bamboo-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-bamboo-application-grid">
              {[
                {
                  icon: '▥',
                  title: 'Ghế',
                  items: ['Dining Chair', 'Lounge Chair', 'Bar Chair'],
                },
                {
                  icon: '◈',
                  title: 'Bàn',
                  items: ['Dining Table', 'Coffee Table', 'Side Table'],
                },
                {
                  icon: '▤',
                  title: 'Kệ & Tủ',
                  items: ['Bookshelf', 'Storage Cabinet', 'Display Unit'],
                },
                {
                  icon: '▧',
                  title: 'Panel trang trí',
                  items: ['Wall Panel', 'Decorative Screen', 'Ceiling Panel'],
                },
                {
                  icon: '♣',
                  title: 'Nội thất khách sạn & Resort',
                  items: ['Hospitality Furniture', 'Resort Furniture', 'Restaurant Furniture'],
                },
                {
                  icon: '▥',
                  title: 'Nội thất theo dự án',
                  items: ['Custom Furniture', 'Commercial Interior', 'Public Space'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-bamboo-application-image-slot" aria-hidden="true" />
                  <h3>
                    <span aria-hidden="true">{item.icon}</span>
                    {t(item.title)}
                  </h3>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{t(entry)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-bamboo-form-finish-row">
            <div className="materials-bamboo-forms">
              <h2>{t('Các hình thức ứng dụng của tre')}</h2>
              <div className="materials-bamboo-form-grid">
                {[
                  {
                    title: 'Tre nguyên cây',
                    body: 'Ứng dụng cho các thiết kế mang tính thủ công và kiến trúc đặc trưng.',
                  },
                  {
                    title: 'Tre ép khối',
                    body: 'Gia công thành các chi tiết chịu lực và sản phẩm nội thất hiện đại.',
                  },
                  {
                    title: 'Tre ghép thanh',
                    body: 'Sử dụng cho mặt bàn, panel và các chi tiết trang trí.',
                  },
                  {
                    title: 'Tre kết hợp vật liệu khác',
                    body: 'Kết hợp với gỗ, kim loại, kính hoặc vật liệu bọc để tạo nên nhiều giải pháp thiết kế.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-bamboo-form-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-bamboo-finishing">
              <h2>{t('Hoàn thiện bề mặt')}</h2>
              <div className="materials-bamboo-finish-grid">
                {[
                  {
                    title: 'Natural Finish',
                    body: 'Giữ nguyên màu sắc và vẻ đẹp tự nhiên của tre.',
                  },
                  {
                    title: 'Stain Finish',
                    body: 'Điều chỉnh màu sắc theo yêu cầu thiết kế.',
                  },
                  {
                    title: 'Oil Finish',
                    body: 'Tăng vẻ tự nhiên và bảo vệ bề mặt.',
                  },
                  {
                    title: 'Matte Finish',
                    body: 'Mang lại cảm giác hiện đại và tinh tế.',
                  },
                  {
                    title: 'Custom Finish',
                    body: 'Hoàn thiện theo bảng màu hoặc mẫu duyệt của buyer.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-bamboo-finish-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-bamboo-control">
            <h2>{t('Những yếu tố cần kiểm soát')}</h2>
            <div className="materials-bamboo-control-grid">
              {[
                {
                  icon: '♧',
                  title: 'Chất lượng nguyên liệu',
                  body: 'Kiểm tra độ đồng đều, độ già và tình trạng của tre trước khi sản xuất.',
                },
                {
                  icon: '♢',
                  title: 'Độ ẩm',
                  body: 'Kiểm soát nhằm đảm bảo tính ổn định của vật liệu.',
                },
                {
                  icon: '↔',
                  title: 'Chất lượng ghép thanh hoặc ép tấm',
                  body: 'Đảm bảo độ liên kết và độ ổn định của kết cấu.',
                },
                {
                  icon: '⌁',
                  title: 'Hoàn thiện bề mặt',
                  body: 'Kiểm tra màu sắc, độ đồng đều và chất lượng lớp hoàn thiện.',
                },
                {
                  icon: '□',
                  title: 'Đóng gói',
                  body: 'Bảo vệ sản phẩm trong quá trình lưu kho và vận chuyển quốc tế.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <div className="materials-bamboo-control-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-bamboo-supply">
            <div className="materials-bamboo-supply-copy">
              <h2>{t('Tre trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn vật liệu tre phù hợp, phát triển sản phẩm, tổ chức sản xuất và kiểm soát chất lượng cho các dự án nội thất xuất khẩu.',
                )}
              </p>
              <p>
                {t(
                  'Tre có thể được ứng dụng trong các chương trình OEM / ODM, nội thất hoàn thiện, dự án khách sạn, resort và các sản phẩm theo định hướng thiết kế bền vững.',
                )}
              </p>
            </div>
            <div className="materials-bamboo-supply-flow">
              {['Lựa chọn vật liệu phù hợp', 'Phát triển sản phẩm', 'Sản xuất chuyên nghiệp', 'Kiểm soát chất lượng', 'Hỗ trợ xuất khẩu và logistics'].map((item) => (
                <article key={item}>
                  <div className="materials-bamboo-supply-icon-slot" aria-hidden="true" />
                  <p>{t(item)}</p>
                </article>
              ))}
            </div>
            <div className="materials-bamboo-supply-image-slot" aria-hidden="true" />
          </section>

          <section className="materials-bamboo-styles">
            <h2>{t('Tre phù hợp với những phong cách nào?')}</h2>
            <div className="materials-bamboo-style-grid">
              {[
                {
                  title: 'Eco Living',
                  body: 'Ưu tiên vật liệu tự nhiên và phát triển bền vững.',
                },
                {
                  title: 'Japandi',
                  body: 'Đề cao sự tối giản, cân bằng và chất liệu tự nhiên.',
                },
                {
                  title: 'Scandinavian',
                  body: 'Kết hợp màu sắc sáng và thiết kế hiện đại.',
                },
                {
                  title: 'Tropical',
                  body: 'Không gian nghỉ dưỡng và resort.',
                },
                {
                  title: 'Contemporary',
                  body: 'Kết hợp tre với gỗ, kim loại và vật liệu bọc nệm.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-bamboo-style-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-bamboo-related">
            <h2>{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="materials-bamboo-related-grid">
              {[
                {
                  title: 'Nội thất mây tre',
                  body: 'Khám phá các bộ sưu tập sử dụng tre.',
                },
                {
                  title: 'Mây',
                  body: 'Tìm hiểu về vật liệu mây và các ứng dụng trong nội thất.',
                },
                {
                  title: 'Mặt đan mây',
                  body: 'Khám phá các giải pháp đan tự nhiên cho ghế và tủ.',
                },
                {
                  title: 'Sơn & hoàn thiện bề mặt',
                  body: 'Các phương án hoàn thiện phù hợp với tre.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-bamboo-related-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <span aria-hidden="true">›</span>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-bamboo-cta">
            <div className="materials-bamboo-cta-image-slot" aria-hidden="true" />
            <div className="materials-bamboo-cta-copy">
              <h2>{t('Trao đổi về vật liệu tre cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng tre và đề xuất phương án sản xuất phù hợp.',
                )}
              </p>
              <div className="materials-bamboo-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsRattanPage && (
        <section className="materials-rattan-content">
          <section className="materials-rattan-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-rattan-overview-panel">
              {[
                {
                  icon: '◌',
                  title: 'Tên thương mại',
                  body: 'Rattan',
                },
                {
                  icon: '♧',
                  title: 'Nhóm vật liệu',
                  body: 'Vật liệu tự nhiên',
                },
                {
                  icon: '◍',
                  title: 'Đặc điểm',
                  body: 'Nhẹ - Dẻo - Linh hoạt - Thân thiện môi trường',
                },
                {
                  icon: '▧',
                  title: 'Khả năng gia công',
                  body: 'Uốn - Đan - Gia công thủ công\nKết hợp với khung gỗ hoặc kim loại',
                },
                {
                  icon: '▥',
                  title: 'Phong cách phù hợp',
                  body: 'Natural - Tropical - Scandinavian - Resort - Contemporary',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rattan-features">
            <h2>{t('Vì sao mây được ưa chuộng?')}</h2>
            <div className="materials-rattan-feature-grid">
              {[
                {
                  icon: '◍',
                  title: 'Trọng lượng nhẹ',
                  body: 'Giúp sản phẩm dễ di chuyển và thuận tiện trong sử dụng.',
                },
                {
                  icon: '≈',
                  title: 'Dẻo và linh hoạt',
                  body: 'Có thể tạo nên nhiều hình dáng và chi tiết thiết kế khác nhau.',
                },
                {
                  icon: '✋',
                  title: 'Giá trị thủ công',
                  body: 'Mỗi sản phẩm thể hiện kỹ thuật đan và tay nghề của người thợ.',
                },
                {
                  icon: '♢',
                  title: 'Thẩm mỹ tự nhiên',
                  body: 'Mang đến cảm giác gần gũi, ấm áp và hài hòa với không gian.',
                },
                {
                  icon: '↔',
                  title: 'Kết hợp đa vật liệu',
                  body: 'Dễ kết hợp với gỗ, kim loại, kính hoặc vật liệu bọc nệm.',
                },
                {
                  icon: '◎',
                  title: 'Hướng đến phát triển bền vững',
                  body: 'Là vật liệu có nguồn gốc tự nhiên và thân thiện với môi trường.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <div className="materials-rattan-feature-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rattan-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-rattan-application-grid">
              {[
                {
                  title: 'Ghế',
                  items: ['Dining Chair', 'Lounge Chair', 'Accent Chair', 'Bar Chair'],
                },
                {
                  title: 'Sofa & Ghế băng',
                  items: ['Sofa', 'Bench', 'Daybed'],
                },
                {
                  title: 'Bàn',
                  items: ['Coffee Table', 'Side Table', 'Dining Table'],
                },
                {
                  title: 'Đèn trang trí',
                  items: ['Pendant Lamp', 'Floor Lamp'],
                },
                {
                  title: 'Tủ & Kệ',
                  items: ['Cabinet', 'Display Shelf', 'Storage Unit'],
                },
                {
                  title: 'Nội thất ngoài trời có mái che',
                  items: ['Resort Furniture', 'Terrace Furniture', 'Covered Outdoor Area'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-rattan-application-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{t(entry)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rattan-tech-finish-row">
            <div className="materials-rattan-techniques">
              <h2>{t('Các kỹ thuật gia công mây')}</h2>
              <div className="materials-rattan-technique-grid">
                {[
                  {
                    title: 'Uốn mây',
                    body: 'Tạo hình khung và các chi tiết cong theo thiết kế.',
                  },
                  {
                    title: 'Đan thủ công',
                    body: 'Ứng dụng nhiều kiểu đan với giá trị thẩm mỹ và công năng khác nhau.',
                  },
                  {
                    title: 'Kết hợp khung gỗ',
                    body: 'Tăng độ ổn định và khả năng chịu lực của sản phẩm.',
                  },
                  {
                    title: 'Kết hợp kim loại',
                    body: 'Tạo phong cách hiện đại và mở rộng khả năng thiết kế.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-rattan-technique-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-rattan-finishing">
              <h2>{t('Hoàn thiện bề mặt')}</h2>
              <div className="materials-rattan-finish-grid">
                {[
                  {
                    title: 'Natural Finish',
                    body: 'Giữ nguyên màu sắc và vẻ đẹp tự nhiên của mây.',
                  },
                  {
                    title: 'Stain Finish',
                    body: 'Điều chỉnh màu sắc phù hợp với bộ sưu tập sản phẩm.',
                  },
                  {
                    title: 'Clear Coating',
                    body: 'Bảo vệ bề mặt và tăng độ bền trong điều kiện sử dụng trong nhà.',
                  },
                  {
                    title: 'Custom Color Finish',
                    body: 'Hoàn thiện màu theo bảng màu hoặc mẫu duyệt của buyer.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-rattan-finish-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-rattan-control">
            <h2>{t('Những yếu tố cần kiểm soát')}</h2>
            <div className="materials-rattan-control-grid">
              {[
                {
                  icon: '◍',
                  title: 'Chất lượng nguyên liệu',
                  body: 'Tạo hình ổn định đều, độ già và tình trạng của sợi mây trước khi sản xuất.',
                },
                {
                  icon: '▧',
                  title: 'Kỹ thuật đan',
                  body: 'Đảm bảo mật độ đan, độ căng và tính đồng nhất của từng sản phẩm.',
                },
                {
                  icon: '↔',
                  title: 'Liên kết với khung',
                  body: 'Kiểm soát độ chắc chắn giữa mây và kết cấu gỗ hoặc kim loại.',
                },
                {
                  icon: '⌁',
                  title: 'Hoàn thiện bề mặt',
                  body: 'Kiểm tra màu sắc, độ đồng đều và chất lượng lớp hoàn thiện.',
                },
                {
                  icon: '□',
                  title: 'Đóng gói',
                  body: 'Bảo vệ các chi tiết đan khỏi va đập và biến dạng trong quá trình vận chuyển.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rattan-supply">
            <div className="materials-rattan-supply-copy">
              <h2>{t('Mây trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn nguyên liệu mây, phát triển sản phẩm, tổ chức sản xuất và kiểm soát chất lượng cho các dự án sử dụng vật liệu tự nhiên.',
                )}
              </p>
              <p>
                {t(
                  'Mây có thể được ứng dụng cho các bộ sưu tập nội thất hoàn thiện, OEM / ODM và các dự án khách sạn, resort, nhà hàng hoặc không gian thương mại với yêu cầu thiết kế riêng.',
                )}
              </p>
            </div>
            <div className="materials-rattan-supply-flow">
              {['Lựa chọn nguyên liệu chất lượng', 'Phát triển sản phẩm và mẫu thử', 'Sản xuất thủ công và công nghiệp', 'Kiểm soát chất lượng chặt chẽ'].map((item) => (
                <article key={item}>
                  <div className="materials-rattan-supply-icon-slot" aria-hidden="true" />
                  <p>{t(item)}</p>
                </article>
              ))}
            </div>
            <div className="materials-rattan-supply-image-slot" aria-hidden="true" />
          </section>

          <section className="materials-rattan-styles">
            <h2>{t('Mây phù hợp với những phong cách nào?')}</h2>
            <div className="materials-rattan-style-grid">
              {[
                {
                  title: 'Tropical',
                  body: 'Không gian nghỉ dưỡng và resort.',
                },
                {
                  title: 'Scandinavian',
                  body: 'Kết hợp vật liệu tự nhiên với thiết kế tối giản.',
                },
                {
                  title: 'Japandi',
                  body: 'Đề cao sự cân bằng giữa thủ công và công năng.',
                },
                {
                  title: 'Contemporary',
                  body: 'Kết hợp mây với gỗ, kim loại và vật liệu bọc nệm.',
                },
                {
                  title: 'Coastal Living',
                  body: 'Không gian ven biển và phong cách nghỉ dưỡng.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-rattan-style-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rattan-related">
            <h2>{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="materials-rattan-related-grid">
              {[
                {
                  title: 'Nội thất mây tre',
                  body: 'Khám phá các bộ sưu tập sử dụng mây tự nhiên.',
                },
                {
                  title: 'Ghế',
                  body: 'Các dòng ghế kết hợp khung gỗ và mây đan.',
                },
                {
                  title: 'Tre',
                  body: 'Tìm hiểu về vật liệu tre và các ứng dụng trong nội thất.',
                },
                {
                  title: 'Mặt đan mây',
                  body: 'Khám phá các kiểu đan và giải pháp mặt đan cho sản phẩm nội thất.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-rattan-related-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <span aria-hidden="true">›</span>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rattan-cta">
            <div className="materials-rattan-cta-image-slot" aria-hidden="true" />
            <div className="materials-rattan-cta-copy">
              <h2>{t('Trao đổi về vật liệu mây cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng mây và đề xuất phương án sản xuất phù hợp.',
                )}
              </p>
              <div className="materials-rattan-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsLaminatedBoardPage && (
        <section className="materials-laminated-board-content">
          <section className="materials-laminated-board-types">
            <h2>{t('Các loại vật liệu phủ bề mặt')}</h2>
            <div className="materials-laminated-board-type-grid">
              {[
                {
                  icon: '♧',
                  title: 'Veneer',
                  body: 'Lớp gỗ tự nhiên mỏng được dán lên bề mặt vật liệu nền nhằm giữ vẻ đẹp và cảm giác của gỗ tự nhiên.',
                  items: ['Nội thất cao cấp', 'Bàn', 'Tủ', 'Giường', 'Hospitality Furniture'],
                },
                {
                  icon: '▱',
                  title: 'Melamine',
                  body: 'Lớp giấy trang trí được ép trực tiếp lên bề mặt tấm gỗ, mang lại nhiều lựa chọn về màu sắc và vân gỗ với hiệu quả chi phí cao.',
                  items: ['Cabinet Furniture', 'Office Furniture', 'Residential Furniture'],
                },
                {
                  icon: '▱',
                  title: 'Laminate (HPL/CPL)',
                  body: 'Vật liệu phủ có khả năng chống trầy xước và chịu mài mòn tốt, phù hợp với các bề mặt sử dụng thường xuyên.',
                  items: ['Bàn', 'Văn phòng', 'Khách sạn', 'Nhà hàng'],
                },
                {
                  icon: '◇',
                  title: 'Acrylic',
                  body: 'Bề mặt bóng gương hiện đại với khả năng tạo hiệu ứng thẩm mỹ cao.',
                  items: ['Tủ bếp', 'Tủ áo', 'Nội thất hiện đại'],
                },
                {
                  icon: '◍',
                  title: 'PET Film',
                  body: 'Giải pháp bề mặt hiện đại với khả năng chống bám vân tay và dễ vệ sinh.',
                  items: ['Cabinet', 'Kitchen Furniture', 'Modern Interior'],
                },
                {
                  icon: '☼',
                  title: 'UV Finish',
                  body: 'Bề mặt được xử lý bằng sơn UV nhằm tăng độ cứng, khả năng chống trầy xước và độ bền của lớp hoàn thiện.',
                  items: ['Panel', 'Cabinet', 'Decorative Furniture'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-laminated-board-type-image-slot" aria-hidden="true" />
                  <div className="materials-laminated-board-type-body">
                    <h3>
                      <span aria-hidden="true">{item.icon}</span>
                      {t(item.title)}
                    </h3>
                    <p>{t(item.body)}</p>
                    <h4>{t('Ứng dụng')}</h4>
                    <ul>
                      {item.items.map((entry) => (
                        <li key={entry}>{t(entry)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-laminated-board-select-control-row">
            <div className="materials-laminated-board-selection">
              <h2>{t('Lựa chọn bề mặt theo nhu cầu')}</h2>
              <div className="materials-laminated-board-selection-table" role="table" aria-label={t('Lựa chọn bề mặt theo nhu cầu')}>
                {[
                  ['Yêu cầu', 'Giải pháp phù hợp'],
                  ['Vẻ đẹp gỗ tự nhiên', 'Veneer'],
                  ['Tối ưu chi phí', 'Melamine'],
                  ['Chống trầy xước', 'Laminate'],
                  ['Bóng gương hiện đại', 'Acrylic'],
                  ['Chống bám vân tay', 'PET'],
                  ['Độ bền bề mặt cao', 'UV Finish'],
                ].map((row, rowIndex) => (
                  <div className="materials-laminated-board-selection-row" role="row" key={row.join('-')}>
                    {row.map((cell, cellIndex) => (
                      <div role={rowIndex === 0 ? 'columnheader' : 'cell'} key={cell}>
                        {rowIndex > 0 && cellIndex === 0 && <span aria-hidden="true">▧</span>}
                        {t(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="materials-laminated-board-control">
              <h2>{t('Các yếu tố cần kiểm soát')}</h2>
              <div className="materials-laminated-board-control-grid">
                {[
                  {
                    icon: '◌',
                    title: 'Màu sắc',
                    body: 'Đảm bảo tính đồng nhất giữa mẫu duyệt và sản xuất hàng loạt.',
                  },
                  {
                    icon: '⌕',
                    title: 'Chất lượng bề mặt',
                    body: 'Kiểm tra độ phẳng, độ bóng, khả năng chống trầy xước và ngoại quan.',
                  },
                  {
                    icon: '▱',
                    title: 'Liên kết với vật liệu nền',
                    body: 'Đảm bảo lớp phủ bám chắc trên MDF, Plywood hoặc Particle Board.',
                  },
                  {
                    icon: '□',
                    title: 'Cạnh hoàn thiện',
                    body: 'Kiểm tra chất lượng dán cạnh và tính đồng nhất của sản phẩm.',
                  },
                  {
                    icon: '☑',
                    title: 'Mẫu duyệt',
                    body: 'Đối chiếu màu sắc và bề mặt theo mẫu đã được buyer phê duyệt.',
                  },
                  {
                    icon: '♢',
                    title: 'Độ ẩm vật liệu',
                    body: 'Kiểm soát để duy trì sự ổn định trong quá trình sản xuất và sử dụng.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">{item.icon}</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-laminated-board-supply">
            <div className="materials-laminated-board-supply-image-slot" aria-hidden="true" />
            <div className="materials-laminated-board-supply-copy">
              <h2>{t('Vật liệu phủ bề mặt trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn vật liệu phủ bề mặt phù hợp với thiết kế, điều kiện sử dụng và ngân sách của từng dự án.',
                )}
              </p>
              <p>
                {t(
                  'Các giải pháp hoàn thiện được triển khai đồng bộ với vật liệu nền, quy trình sản xuất, kiểm soát chất lượng và tiêu chuẩn riêng của buyer nhằm đảm bảo tính nhất quán cho từng đơn hàng xuất khẩu.',
                )}
              </p>
              <div className="materials-laminated-board-supply-flow">
                {['Tư vấn vật liệu', 'Kiểm tra & đánh giá', 'Triển khai sản xuất', 'Kiểm soát chất lượng', 'Đáp ứng tiêu chuẩn'].map((item) => (
                  <article key={item}>
                    <div className="materials-laminated-board-supply-icon-slot" aria-hidden="true" />
                    <p>{t(item)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-laminated-board-related">
            <h2>{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="materials-laminated-board-related-grid">
              {[
                {
                  title: 'Plywood',
                  body: 'Các giải pháp phủ bề mặt trên Plywood.',
                },
                {
                  title: 'MDF',
                  body: 'Hoàn thiện bề mặt cho sản phẩm sơn và phủ.',
                },
                {
                  title: 'Particle Board',
                  body: 'Ứng dụng Melamine và Laminate.',
                },
                {
                  title: 'Sơn & Hoàn thiện bề mặt',
                  body: 'Các hệ sơn và màu sắc cho nội thất xuất khẩu.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-laminated-board-related-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <span aria-hidden="true">›</span>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-laminated-board-cta">
            <div className="materials-laminated-board-cta-image-slot" aria-hidden="true" />
            <div className="materials-laminated-board-cta-copy">
              <h2>{t('Trao đổi về vật liệu phủ bề mặt cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá phương án phủ bề mặt phù hợp với vật liệu nền, ngân sách và tiêu chuẩn thị trường.',
                )}
              </p>
              <div className="materials-laminated-board-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsParticleBoardPage && (
        <section className="materials-particle-board-content">
          <section className="materials-particle-board-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-particle-board-overview-panel">
              {[
                {
                  icon: '▤',
                  title: 'Tên thương mại',
                  body: 'Particle Board',
                },
                {
                  icon: '♜',
                  title: 'Nhóm vật liệu',
                  body: 'Gỗ kỹ thuật',
                },
                {
                  icon: '▰',
                  title: 'Cấu tạo',
                  body: 'Dăm gỗ ép với keo chuyên dụng',
                },
                {
                  icon: '◎',
                  title: 'Đặc điểm',
                  body: 'Hiệu quả chi phí\nBề mặt ổn định\nGia công tốt\nPhù hợp nội thất dạng tấm',
                },
                {
                  icon: '⚒',
                  title: 'Khả năng gia công',
                  body: 'Cắt • Khoan • CNC\nDán cạnh • Lắp ráp\nPhủ bề mặt',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-particle-board-features">
            <h2>{t('Vì sao Particle Board được sử dụng phổ biến?')}</h2>
            <div className="materials-particle-board-feature-grid">
              {[
                {
                  icon: '◈',
                  title: 'Hiệu quả chi phí',
                  body: 'Là lựa chọn phù hợp cho các chương trình sản xuất quy mô lớn với yêu cầu tối ưu ngân sách.',
                },
                {
                  icon: '▰',
                  title: 'Kích thước ổn định',
                  body: 'Phù hợp với các sản phẩm dạng tấm có yêu cầu lắp ráp chính xác.',
                },
                {
                  icon: '✎',
                  title: 'Gia công nhanh',
                  body: 'Dễ cắt, khoan, CNC và lắp ráp trên các dây chuyền sản xuất hiện đại.',
                },
                {
                  icon: '▰',
                  title: 'Phù hợp phủ bề mặt',
                  body: 'Có thể phủ Melamine, Laminate hoặc Veneer theo yêu cầu thiết kế.',
                },
                {
                  icon: '⚙',
                  title: 'Tối ưu cho Flat-Pack',
                  body: 'Thích hợp với các sản phẩm đóng gói KD và Ready-to-Assemble.',
                },
                {
                  icon: '▥',
                  title: 'Sản xuất hàng loạt',
                  body: 'Đáp ứng tốt các đơn hàng lớn với chất lượng ổn định và thời gian sản xuất hiệu quả.',
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <b>{index + 1}</b>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-particle-board-applications">
            <h2>{t('Các ứng dụng phổ biến')}</h2>
            <div className="materials-particle-board-application-grid">
              {[
                {
                  title: 'Tủ',
                  items: ['Tủ quần áo', 'Tủ bếp', 'Tủ TV', 'Tủ lưu trữ'],
                },
                {
                  title: 'Kệ',
                  items: ['Bookshelf', 'Storage Shelf', 'Display Shelf'],
                },
                {
                  title: 'Bàn',
                  items: ['Bàn làm việc', 'Bàn học', 'Bàn văn phòng'],
                },
                {
                  title: 'Nội thất văn phòng',
                  items: ['Tủ hồ sơ', 'Module văn phòng', 'Workstation'],
                },
                {
                  title: 'Nội thất bán lẻ',
                  items: ['Flat-Pack Furniture', 'Ready-to-Assemble Furniture'],
                },
                {
                  title: 'Nội thất dự án',
                  items: ['Căn hộ', 'Văn phòng', 'Ký túc xá', 'Không gian thương mại'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-particle-board-application-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{t(entry)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-particle-board-finish-control-row">
            <div className="materials-particle-board-finishing">
              <h2>{t('Các phương án hoàn thiện')}</h2>
              <div className="materials-particle-board-finish-grid">
                {[
                  {
                    title: 'Melamine',
                    body: 'Giải pháp phổ biến nhất với nhiều lựa chọn màu sắc và vân gỗ.',
                  },
                  {
                    title: 'Laminate',
                    body: 'Tăng khả năng chống trầy xước và độ bền cho bề mặt sử dụng thường xuyên.',
                  },
                  {
                    title: 'Veneer',
                    body: 'Mang lại vẻ ngoài của gỗ tự nhiên cho các sản phẩm yêu cầu tính thẩm mỹ cao.',
                  },
                  {
                    title: 'Sơn hoàn thiện',
                    body: 'Áp dụng cho một số thiết kế và yêu cầu đặc biệt của dự án.',
                  },
                  {
                    title: 'UV / Acrylic (theo yêu cầu)',
                    body: 'Áp dụng cho các thiết kế hiện đại với yêu cầu bề mặt cao.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-particle-board-finish-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-particle-board-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-particle-board-control-list">
                {[
                  {
                    title: 'Chất lượng lõi ván',
                    body: 'Kiểm tra mật độ, độ đồng đều và khả năng chịu lực của tấm ván.',
                  },
                  {
                    title: 'Kích thước & độ dày',
                    body: 'Đảm bảo đúng quy cách và dung sai theo yêu cầu kỹ thuật.',
                  },
                  {
                    title: 'Bề mặt',
                    body: 'Kiểm tra độ phẳng và tình trạng bề mặt trước khi phủ hoàn thiện.',
                  },
                  {
                    title: 'Dán cạnh',
                    body: 'Đảm bảo cạnh được xử lý chính xác nhằm tăng độ bền và tính thẩm mỹ.',
                  },
                  {
                    title: 'Độ ẩm vật liệu',
                    body: 'Kiểm soát để duy trì sự ổn định trong quá trình sản xuất và sử dụng.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">▣</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-particle-board-supply">
            <div className="materials-particle-board-supply-copy">
              <h2>{t('Particle Board trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn chủng loại Particle Board phù hợp với yêu cầu kỹ thuật, mục tiêu chi phí và phương án hoàn thiện của từng dự án.',
                )}
              </p>
              <p>
                {t(
                  'Particle Board được ứng dụng cho các chương trình OEM / ODM, nội thất dạng tấm, nội thất lắp ráp và các dự án sản xuất quy mô lớn phục vụ thị trường xuất khẩu.',
                )}
              </p>
            </div>
            <div className="materials-particle-board-supply-flow">
              {[
                'Lựa chọn chủng loại phù hợp',
                'Kiểm soát chất lượng trước sản xuất',
                'Gia công & phủ bề mặt theo yêu cầu',
                'Đóng gói KD chuyên nghiệp',
                'Chuỗi cung ứng ổn định',
              ].map((item) => (
                <article key={item}>
                  <div className="materials-particle-board-supply-icon-slot" aria-hidden="true" />
                  <p>{t(item)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-particle-board-followup-row">
            <div className="materials-particle-board-fit">
              <h2>{t('Particle Board phù hợp với những ứng dụng nào?')}</h2>
              <div className="materials-particle-board-fit-grid">
                {[
                  {
                    title: 'Ready-to-Assemble Furniture',
                    body: 'Các sản phẩm đóng gói KD và tự lắp ráp.',
                  },
                  {
                    title: 'Residential Furniture',
                    body: 'Nội thất gia đình hiện đại.',
                  },
                  {
                    title: 'Office Furniture',
                    body: 'Bàn làm việc, tủ hồ sơ và hệ lưu trữ.',
                  },
                  {
                    title: 'Retail Furniture',
                    body: 'Các bộ sưu tập nội thất bán lẻ và thương mại điện tử.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">▧</span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-particle-board-quick-compare">
              <h2>{t('So sánh nhanh')}</h2>
              <div
                className="materials-particle-board-quick-table"
                role="table"
                aria-label={t('So sánh nhanh vật liệu gỗ kỹ thuật')}
              >
                {[
                  ['Vật liệu', 'Điểm mạnh'],
                  ['Plywood', 'Kết cấu ổn định, chịu lực cao'],
                  ['MDF', 'Bề mặt mịn, lý tưởng cho sơn và phủ bề mặt'],
                  ['Particle Board', 'Hiệu quả chi phí, tối ưu cho nội thất dạng tấm và Flat-Pack'],
                  ['Surface Panels', 'Đa dạng lựa chọn hoàn thiện và màu sắc'],
                ].map((row, rowIndex) => (
                  <div className="materials-particle-board-quick-row" role="row" key={row.join('-')}>
                    {row.map((cell) => (
                      <div
                        className={rowIndex === 0 || row[0] === 'Particle Board' ? 'is-highlight' : undefined}
                        role={rowIndex === 0 ? 'columnheader' : 'cell'}
                        key={cell}
                      >
                        {t(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="materials-particle-board-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="materials-particle-board-related-list">
                {[
                  {
                    title: 'Tủ & Lưu trữ',
                    body: 'Khám phá các hệ tủ sử dụng Particle Board.',
                  },
                  {
                    title: 'Kệ',
                    body: 'Các dòng kệ và nội thất dạng tấm.',
                  },
                  {
                    title: 'Hoàn thiện bề mặt',
                    body: 'Các giải pháp Melamine, Laminate và Veneer.',
                  },
                  {
                    title: 'Kiểm tra vật liệu',
                    body: 'Quy trình kiểm tra Particle Board trước khi đưa vào sản xuất.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-particle-board-related-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-particle-board-cta">
            <div className="materials-particle-board-cta-image-slot" aria-hidden="true" />
            <div className="materials-particle-board-cta-copy">
              <h2>{t('Trao đổi về vật liệu Particle Board cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng Particle Board và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-particle-board-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsMdfPage && (
        <section className="materials-mdf-content">
          <section className="materials-mdf-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-mdf-overview-panel">
              {[
                {
                  icon: '▤',
                  title: 'Tên thương mại',
                  body: 'Medium Density Fiberboard (MDF)',
                },
                {
                  icon: '♜',
                  title: 'Nhóm vật liệu',
                  body: 'Gỗ kỹ thuật',
                },
                {
                  icon: '▱',
                  title: 'Cấu tạo',
                  body: 'Sợi gỗ ép mật độ trung bình',
                },
                {
                  icon: '◎',
                  title: 'Đặc điểm',
                  body: 'Bề mặt mịn, đồng nhất, dễ gia công, ổn định kích thước',
                },
                {
                  icon: '⚒',
                  title: 'Khả năng gia công',
                  body: 'Cắt, khoan, CNC, phay, dán cạnh và sơn hoàn thiện',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-mdf-features">
            <h2>{t('Vì sao MDF được sử dụng phổ biến?')}</h2>
            <div className="materials-mdf-feature-grid">
              {[
                {
                  icon: '✎',
                  title: 'Bề mặt mịn',
                  body: 'Lý tưởng cho các sản phẩm sơn màu và hoàn thiện cao cấp.',
                },
                {
                  icon: '▱',
                  title: 'Cấu trúc đồng nhất',
                  body: 'Giúp quá trình gia công và hoàn thiện đạt độ ổn định cao.',
                },
                {
                  icon: '♙',
                  title: 'Gia công chính xác',
                  body: 'Phù hợp với CNC, tạo rãnh, phay và các chi tiết định hình.',
                },
                {
                  icon: '▥',
                  title: 'Hiệu quả sản xuất',
                  body: 'Đáp ứng tốt các chương trình sản xuất hàng loạt với chất lượng đồng đều.',
                },
                {
                  icon: '▱',
                  title: 'Dễ kết hợp vật liệu phủ',
                  body: 'Có thể phủ veneer, melamine, laminate hoặc sơn theo yêu cầu thiết kế.',
                },
                {
                  icon: '▥',
                  title: 'Ứng dụng đa dạng',
                  body: 'Được sử dụng trong nội thất gia đình, văn phòng, khách sạn và dự án thương mại.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-mdf-main-grid">
            <div className="materials-mdf-types">
              <h2>{t('Các loại MDF phổ biến')}</h2>
              <div className="materials-mdf-type-list">
                {[
                  {
                    title: 'MDF tiêu chuẩn',
                    body: 'Phù hợp với hầu hết các sản phẩm nội thất trong điều kiện sử dụng thông thường.',
                  },
                  {
                    title: 'MDF chống ẩm (MR MDF)',
                    body: 'Được sử dụng cho các khu vực có độ ẩm cao hơn như bếp hoặc phòng tắm theo yêu cầu thiết kế.',
                  },
                  {
                    title: 'MDF chống cháy (FR MDF)',
                    body: 'Phù hợp với các dự án yêu cầu tiêu chuẩn chống cháy theo quy định hoặc thiết kế công trình.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-mdf-type-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-mdf-structure">
              <h2>{t('Cấu tạo của MDF')}</h2>
              <div className="materials-mdf-structure-grid">
                <div className="materials-mdf-structure-image-slot" aria-hidden="true" />
                <ul>
                  {[
                    'Sợi gỗ được nghiền mịn và trộn keo chuyên dụng.',
                    'Hỗn hợp được ép dưới áp suất và nhiệt độ cao.',
                    'Tạo tấm MDF có cấu trúc đồng nhất.',
                    'Đảm bảo độ ổn định, chịu lực tốt và bề mặt mịn.',
                  ].map((item) => (
                    <li key={item}>{t(item)}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="materials-mdf-machining">
              <h2>{t('Khả năng gia công')}</h2>
              <div className="materials-mdf-machining-grid">
                {['Cắt', 'Khoan', 'CNC', 'Phay', 'Dán cạnh', 'Sơn hoàn thiện'].map((item) => (
                  <article key={item}>
                    <span aria-hidden="true">⚒</span>
                    <h3>{t(item)}</h3>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-mdf-application-control-row">
            <div className="materials-mdf-applications">
              <h2>{t('Ứng dụng trong nội thất')}</h2>
              <div className="materials-mdf-application-grid">
                {[
                  {
                    title: 'Tủ',
                    items: ['Tủ quần áo', 'Tủ bếp', 'Tủ TV', 'Tủ lưu trữ'],
                  },
                  {
                    title: 'Kệ',
                    items: ['Bookshelf', 'Display Shelf', 'Wall Shelf'],
                  },
                  {
                    title: 'Panel trang trí',
                    items: ['Vách ốp', 'Panel nội thất', 'Trang trí tường'],
                  },
                  {
                    title: 'Bàn',
                    items: ['Bàn làm việc', 'Bàn học', 'Bàn trang điểm'],
                  },
                  {
                    title: 'Cửa & cánh tủ',
                    items: ['Cánh tủ sơn', 'Cánh tủ phủ veneer', 'Cánh tủ phủ laminate'],
                  },
                  {
                    title: 'Nội thất dự án',
                    items: ['Khách sạn', 'Văn phòng', 'Căn hộ', 'Showroom'],
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-mdf-application-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <ul>
                      {item.items.map((entry) => (
                        <li key={entry}>{t(entry)}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-mdf-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-mdf-control-list">
                {[
                  {
                    title: 'Chất lượng bề mặt',
                    body: 'Đảm bảo bề mặt đồng đều trước khi phủ hoặc sơn.',
                  },
                  {
                    title: 'Kích thước & độ dày',
                    body: 'Kiểm tra theo bản vẽ và dung sai kỹ thuật.',
                  },
                  {
                    title: 'Độ ẩm vật liệu',
                    body: 'Kiểm soát nhằm duy trì sự ổn định trong quá trình sản xuất và sử dụng.',
                  },
                  {
                    title: 'Chất lượng cạnh',
                    body: 'Đảm bảo cạnh cắt sạch, phù hợp cho dán cạnh hoặc sơn.',
                  },
                  {
                    title: 'Khả năng hoàn thiện',
                    body: 'Đánh giá khả năng bám sơn hoặc vật liệu phủ trước khi sản xuất hàng loạt.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">▣</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-mdf-supply-fit-row">
            <div className="materials-mdf-supply">
              <h2>{t('MDF trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn chủng loại MDF phù hợp với yêu cầu kỹ thuật, điều kiện sử dụng và phương án hoàn thiện của từng dự án.',
                )}
              </p>
              <p>
                {t(
                  'MDF có thể được ứng dụng cho sản phẩm hoàn thiện, hệ tủ, panel trang trí, chương trình OEM / ODM và các dự án khách sạn, văn phòng hoặc căn hộ.',
                )}
              </p>
              <div className="materials-mdf-supply-flow">
                {['Lựa chọn vật liệu phù hợp', 'Đánh giá kỹ thuật & khả năng sản xuất', 'Kiểm soát chất lượng trước sản xuất', 'Tổ chức chuỗi cung ứng'].map((item) => (
                  <article key={item}>
                    <div className="materials-mdf-supply-icon-slot" aria-hidden="true" />
                    <p>{t(item)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-mdf-fit">
              <h2>{t('MDF phù hợp với những ứng dụng nào?')}</h2>
              <div className="materials-mdf-fit-grid">
                {[
                  {
                    title: 'Painted Furniture',
                    body: 'Nội thất sơn màu với yêu cầu bề mặt hoàn thiện cao.',
                  },
                  {
                    title: 'Hospitality Furniture',
                    body: 'Khách sạn, căn hộ dịch vụ và resort.',
                  },
                  {
                    title: 'Cabinet Furniture',
                    body: 'Các hệ tủ gia đình và thương mại.',
                  },
                  {
                    title: 'Office Furniture',
                    body: 'Bàn làm việc, tủ hồ sơ và hệ lưu trữ.',
                  },
                  {
                    title: 'Decorative Panels',
                    body: 'Panel và vách trang trí nội thất.',
                  },
                  {
                    title: 'Custom Project Furniture',
                    body: 'Các dự án nội thất theo yêu cầu riêng.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">▤</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-mdf-followup-row">
            <div className="materials-mdf-quick-compare">
              <h2>{t('So sánh nhanh')}</h2>
              <div className="materials-mdf-quick-table" role="table" aria-label={t('So sánh nhanh vật liệu gỗ kỹ thuật')}>
                {[
                  ['Vật liệu', 'Điểm mạnh'],
                  ['Plywood', 'Độ ổn định cao, chịu lực tốt'],
                  ['MDF', 'Bề mặt mịn, lý tưởng cho sơn và phủ bề mặt'],
                  ['Particle Board', 'Hiệu quả chi phí'],
                  ['Surface Panels', 'Đa dạng lựa chọn bề mặt hoàn thiện'],
                ].map((row, rowIndex) => (
                  <div className="materials-mdf-quick-row" role="row" key={row.join('-')}>
                    {row.map((cell) => (
                      <div
                        className={rowIndex === 0 || row[0] === 'MDF' ? 'is-highlight' : undefined}
                        role={rowIndex === 0 ? 'columnheader' : 'cell'}
                        key={cell}
                      >
                        {t(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="materials-mdf-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="materials-mdf-related-grid">
                {[
                  {
                    title: 'Tủ & Lưu trữ',
                    body: 'Khám phá các hệ tủ sử dụng MDF.',
                  },
                  {
                    title: 'Kệ',
                    body: 'Các dòng kệ và panel từ MDF.',
                  },
                  {
                    title: 'Sơn & hoàn thiện bề mặt',
                    body: 'Các phương án sơn, veneer, laminate và melamine.',
                  },
                  {
                    title: 'Kiểm tra vật liệu',
                    body: 'Quy trình kiểm tra MDF trước khi đưa vào sản xuất.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-mdf-related-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-mdf-cta">
            <div className="materials-mdf-cta-image-slot" aria-hidden="true" />
            <div className="materials-mdf-cta-copy">
              <h2>{t('Trao đổi về vật liệu MDF cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng MDF và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-mdf-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsPlywoodPage && (
        <section className="materials-plywood-content">
          <section className="materials-plywood-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-plywood-overview-panel">
              {[
                {
                  icon: '▤',
                  title: 'Tên thương mại',
                  body: 'Plywood',
                },
                {
                  icon: '♜',
                  title: 'Nhóm vật liệu',
                  body: 'Gỗ kỹ thuật',
                },
                {
                  icon: '◩',
                  title: 'Cấu tạo',
                  body: 'Nhiều lớp veneer gỗ tự nhiên ép chéo.',
                },
                {
                  icon: '▧',
                  title: 'Đặc điểm',
                  body: 'Ổn định, chịu lực tốt, ít cong vênh, gia công linh hoạt.',
                },
                {
                  icon: '⚒',
                  title: 'Khả năng gia công',
                  body: 'Cắt, CNC, khoan, phay, dán veneer, sơn hoàn thiện.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-plywood-features">
            <h2>{t('Vì sao Plywood được sử dụng phổ biến?')}</h2>
            <div className="materials-plywood-feature-grid">
              {[
                {
                  icon: '⚙',
                  title: 'Độ ổn định cao',
                  body: 'Cấu trúc nhiều lớp giúp giảm hiện tượng cong vênh và biến dạng trong quá trình sử dụng.',
                },
                {
                  icon: '✣',
                  title: 'Khả năng chịu lực tốt',
                  body: 'Phù hợp cho nhiều kết cấu nội thất và các chi tiết chịu tải.',
                },
                {
                  icon: '♙',
                  title: 'Gia công linh hoạt',
                  body: 'Dễ cắt, khoan, CNC và kết hợp với nhiều loại vật liệu khác.',
                },
                {
                  icon: '▥',
                  title: 'Hiệu quả sản xuất',
                  body: 'Đáp ứng tốt các chương trình sản xuất hàng loạt với chất lượng ổn định.',
                },
                {
                  icon: '◎',
                  title: 'Tương thích nhiều bề mặt hoàn thiện',
                  body: 'Có thể phủ veneer, laminate, melamine hoặc sơn theo yêu cầu thiết kế.',
                },
                {
                  icon: '⚙',
                  title: 'Ứng dụng đa dạng',
                  body: 'Sử dụng trong nội thất gia đình, thương mại, khách sạn và dự án xuất khẩu.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-plywood-main-grid">
            <div className="materials-plywood-structure">
              <h2>{t('Cấu tạo của Plywood')}</h2>
              <div className="materials-plywood-structure-image-slot" aria-hidden="true" />
              <ul>
                {[
                  'Các lớp veneer được xếp vuông góc với nhau.',
                  'Tăng độ ổn định và khả năng chịu lực.',
                  'Giảm co ngót và cong vênh.',
                ].map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
            </div>

            <div className="materials-plywood-applications">
              <h2>{t('Ứng dụng trong nội thất')}</h2>
              <div className="materials-plywood-application-grid">
                {[
                  {
                    title: 'Bàn',
                    items: ['Mặt bàn', 'Kết cấu bàn', 'Bàn làm việc'],
                  },
                  {
                    title: 'Tủ',
                    items: ['Thân tủ', 'Đợt tủ', 'Cánh tủ', 'Ngăn kéo'],
                  },
                  {
                    title: 'Giường',
                    items: ['Vạt giường', 'Khung giường', 'Đầu giường'],
                  },
                  {
                    title: 'Kệ',
                    items: ['Bookshelf', 'Display Shelf', 'Storage Shelf'],
                  },
                  {
                    title: 'Cấu kiện nội thất',
                    items: ['Vách ngăn', 'Panel', 'Chi tiết CNC', 'Kết cấu bên trong'],
                  },
                  {
                    title: 'Nội thất dự án',
                    items: ['Khách sạn', 'Resort', 'Văn phòng', 'Căn hộ dịch vụ'],
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-plywood-application-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <ul>
                        {item.items.map((entry) => (
                          <li key={entry}>{t(entry)}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-plywood-finishing">
              <h2>{t('Các phương án hoàn thiện')}</h2>
              <div className="materials-plywood-finish-list">
                {[
                  {
                    title: 'Veneer',
                    body: 'Mang lại bề mặt gỗ tự nhiên với nhiều lựa chọn về loài gỗ.',
                  },
                  {
                    title: 'Melamine',
                    body: 'Đa dạng màu sắc và hoa văn, phù hợp với sản xuất hàng loạt.',
                  },
                  {
                    title: 'Laminate',
                    body: 'Tăng khả năng chống trầy xước và đáp ứng yêu cầu sử dụng cường độ cao.',
                  },
                  {
                    title: 'Sơn hoàn thiện',
                    body: 'Hoàn thiện màu theo thiết kế và tiêu chuẩn của buyer.',
                  },
                  {
                    title: 'HPL (nếu dự án yêu cầu)',
                    body: 'Phù hợp cho các bề mặt cần độ bền và khả năng chống mài mòn cao.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-plywood-finish-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-plywood-detail-grid">
            <div className="materials-plywood-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-plywood-control-list">
                {[
                  {
                    title: 'Cấu trúc tấm',
                    body: 'Kiểm tra số lớp, độ đồng đều và chất lượng liên kết giữa các lớp veneer.',
                  },
                  {
                    title: 'Kích thước & độ dày',
                    body: 'Đảm bảo đúng quy cách và dung sai theo yêu cầu kỹ thuật.',
                  },
                  {
                    title: 'Chất lượng bề mặt',
                    body: 'Kiểm tra bề mặt trước khi phủ veneer hoặc hoàn thiện.',
                  },
                  {
                    title: 'Độ ẩm vật liệu',
                    body: 'Kiểm soát nhằm đảm bảo sự ổn định trong quá trình sản xuất.',
                  },
                  {
                    title: 'Khả năng gia công',
                    body: 'Đảm bảo vật liệu phù hợp với các công đoạn CNC, khoan và lắp ráp.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">▣</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-plywood-supply">
              <h2>{t('Plywood trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ lựa chọn chủng loại Plywood phù hợp với từng sản phẩm, yêu cầu kỹ thuật và thị trường xuất khẩu.',
                )}
              </p>
              <p>
                {t(
                  'Plywood có thể được ứng dụng cho nội thất hoàn thiện, cấu kiện nội thất, chương trình OEM / ODM và các dự án khách sạn, resort, văn phòng hoặc không gian thương mại.',
                )}
              </p>
              <div className="materials-plywood-supply-flow">
                {['Phát triển sản phẩm', 'Lựa chọn vật liệu', 'Đánh giá khả năng sản xuất', 'Tổ chức chuỗi cung ứng'].map((item) => (
                  <article key={item}>
                    <div className="materials-plywood-supply-icon-slot" aria-hidden="true" />
                    <p>{t(item)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-plywood-fit">
              <h2>{t('Plywood phù hợp với những ứng dụng nào?')}</h2>
              <div className="materials-plywood-fit-list">
                {[
                  {
                    title: 'Cabinet Furniture',
                    body: 'Các hệ tủ và lưu trữ.',
                  },
                  {
                    title: 'Panel Furniture',
                    body: 'Nội thất dạng tấm với kết cấu ổn định.',
                  },
                  {
                    title: 'Hospitality Furniture',
                    body: 'Khách sạn, resort và căn hộ dịch vụ.',
                  },
                  {
                    title: 'Office Furniture',
                    body: 'Bàn làm việc, tủ hồ sơ và hệ vách ngăn.',
                  },
                  {
                    title: 'Custom Project Furniture',
                    body: 'Các dự án nội thất theo yêu cầu riêng.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-plywood-fit-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-plywood-followup-row">
            <div className="materials-plywood-quick-compare">
              <h2>{t('So sánh nhanh')}</h2>
              <div className="materials-plywood-quick-table" role="table" aria-label={t('So sánh nhanh vật liệu gỗ kỹ thuật')}>
                {[
                  ['Vật liệu', 'Điểm mạnh'],
                  ['Plywood', 'Ổn định, chịu lực tốt, đa năng'],
                  ['MDF', 'Bề mặt mịn, phù hợp sơn và phủ bề mặt'],
                  ['Particle Board', 'Tối ưu chi phí cho nội thất dạng tấm'],
                  ['Surface Panels', 'Đa dạng lựa chọn hoàn thiện và màu sắc'],
                ].map((row, rowIndex) => (
                  <div className="materials-plywood-quick-row" role="row" key={row.join('-')}>
                    {row.map((cell) => (
                      <div
                        className={rowIndex === 0 || row[0] === 'Plywood' ? 'is-highlight' : undefined}
                        role={rowIndex === 0 ? 'columnheader' : 'cell'}
                        key={cell}
                      >
                        {t(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="materials-plywood-related">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="materials-plywood-related-grid">
                {[
                  {
                    title: 'Nội thất hoàn thiện',
                    body: 'Khám phá các sản phẩm sử dụng Plywood.',
                  },
                  {
                    title: 'Cấu kiện nội thất',
                    body: 'Các cấu kiện và chi tiết được sản xuất từ Plywood.',
                  },
                  {
                    title: 'Sơn & hoàn thiện bề mặt',
                    body: 'Các phương án phủ veneer, laminate, melamine và sơn.',
                  },
                  {
                    title: 'Kiểm tra vật liệu',
                    body: 'Quy trình kiểm tra Plywood trước khi đưa vào sản xuất.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-plywood-related-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-plywood-cta">
            <div className="materials-plywood-cta-image-slot" aria-hidden="true" />
            <div className="materials-plywood-cta-copy">
              <h2>{t('Trao đổi về vật liệu Plywood cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng Plywood và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-plywood-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsPinePage && (
        <section className="materials-pine-content">
          <section className="materials-pine-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-pine-overview-panel">
              {[
                {
                  icon: '▤',
                  title: 'Tên thương mại',
                  body: 'Pine',
                },
                {
                  icon: '♜',
                  title: 'Nhóm vật liệu',
                  body: 'Gỗ tự nhiên',
                },
                {
                  icon: '◩',
                  title: 'Màu sắc tự nhiên',
                  body: 'Vàng nhạt đến kem sáng.',
                },
                {
                  icon: '▧',
                  title: 'Đặc điểm vân gỗ',
                  body: 'Vân thẳng, mắt gỗ tự nhiên rõ nét.',
                },
                {
                  icon: '♧',
                  title: 'Trọng lượng',
                  body: 'Nhẹ hơn nhiều loại gỗ cùng thông dụng.',
                },
                {
                  icon: '⚒',
                  title: 'Khả năng gia công',
                  body: 'Dễ cắt, khoan, tiện, CNC và lắp ráp.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-pine-features">
            <h2>{t('Vì sao Pine được sử dụng phổ biến?')}</h2>
            <div className="materials-pine-feature-grid">
              {[
                {
                  icon: '♢',
                  title: 'Trọng lượng nhẹ',
                  body: 'Thuận lợi cho vận chuyển, lưu kho và lắp ráp.',
                },
                {
                  icon: '⚒',
                  title: 'Dễ gia công',
                  body: 'Phù hợp với sản xuất hàng loạt và nhiều phương pháp chế tạo.',
                },
                {
                  icon: '◉',
                  title: 'Hiệu quả chi phí',
                  body: 'Giúp tối ưu chi phí vật liệu cho nhiều dòng sản phẩm.',
                },
                {
                  icon: '☼',
                  title: 'Màu sắc sáng',
                  body: 'Tạo cảm giác tự nhiên, trẻ trung và dễ hoàn thiện.',
                },
                {
                  icon: '▣',
                  title: 'Phù hợp đóng gói KD',
                  body: 'Thuận lợi cho các sản phẩm Knock-down và thương mại điện tử.',
                },
                {
                  icon: '◎',
                  title: 'Nguồn cung ổn định',
                  body: 'Được sử dụng rộng rãi trên nhiều thị trường quốc tế.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-pine-characteristics">
            <h2>{t('Đặc trưng của Pine')}</h2>
            <div className="materials-pine-character-grid">
              <div className="materials-pine-character-image-slot" aria-hidden="true" />
              {[
                {
                  icon: '◎',
                  title: 'Mắt gỗ tự nhiên',
                  body: 'Một trong những dấu hiệu nhận biết đặc trưng của Pine là các mắt gỗ tự nhiên xuất hiện trên bề mặt vật liệu.',
                },
                {
                  icon: '◌',
                  title: 'Vân gỗ đơn giản',
                  body: 'Mang lại cảm giác mộc mạc, gần gũi và tự nhiên.',
                },
                {
                  icon: '♙',
                  title: 'Phong cách riêng',
                  body: 'Pine thường được lựa chọn cho các bộ sưu tập mang tính Scandinavian, Country hoặc Casual Living.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-pine-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-pine-application-grid">
              {[
                {
                  title: 'Giường',
                  items: ['Khung giường', 'Giường trẻ em', 'Giường tầng'],
                },
                {
                  title: 'Tủ & lưu trữ',
                  items: ['Tủ quần áo', 'Tủ đầu giường', 'Kệ lưu trữ'],
                },
                {
                  title: 'Kệ',
                  items: ['Bookshelf', 'Display Shelf', 'Storage Shelf'],
                },
                {
                  title: 'Bàn',
                  items: ['Bàn học', 'Bàn làm việc', 'Bàn phụ'],
                },
                {
                  title: 'Nội thất trẻ em',
                  items: ['Children Furniture', 'Kids Bedroom Furniture'],
                },
                {
                  title: 'Nội thất DIY & Flat-Pack',
                  items: ['Ready-to-Assemble Furniture', 'E-commerce Furniture'],
                },
                {
                  title: 'Nội thất dự án',
                  items: ['Khách sạn', 'Resort', 'Nhà hàng', 'Không gian thương mại'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-pine-application-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{t(entry)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-pine-production-row">
            <div className="materials-pine-flatpack">
              <h2>{t('Pine và sản phẩm Flat-Pack')}</h2>
              <p>{t('Vì sao Pine phù hợp với Flat-Pack Furniture?')}</p>
              <div className="materials-pine-flatpack-grid">
                <div className="materials-pine-flatpack-flow">
                  {[
                    'Trọng lượng nhẹ',
                    'Dễ gia công',
                    'Dễ đóng gói KD',
                    'Giảm chi phí logistics',
                    'Thuận lợi bán hàng online',
                  ].map((item) => (
                    <article key={item}>
                      <span aria-hidden="true">◈</span>
                      <p>{t(item)}</p>
                    </article>
                  ))}
                </div>
                <div className="materials-pine-flatpack-popular">
                  <h3>{t('Ứng dụng phổ biến')}</h3>
                  <ul>
                    {['Bookshelf', 'Storage Unit', 'Wardrobe', 'Bed Frame', 'Home Office Furniture'].map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="materials-pine-flatpack-image-slot" aria-hidden="true" />
            </div>

            <div className="materials-pine-finishing">
              <h2>{t('Khả năng hoàn thiện bề mặt')}</h2>
              <div className="materials-pine-finish-list">
                {[
                  {
                    title: 'Natural Finish',
                    body: 'Giữ nguyên màu sắc và mắt gỗ tự nhiên.',
                  },
                  {
                    title: 'White Wash',
                    body: 'Phong cách Scandinavian phổ biến.',
                  },
                  {
                    title: 'Stain Finish',
                    body: 'Điều chỉnh màu sắc theo yêu cầu thiết kế.',
                  },
                  {
                    title: 'Matte Finish',
                    body: 'Mang lại cảm giác hiện đại và tự nhiên.',
                  },
                  {
                    title: 'Color Finish',
                    body: 'Sơn màu theo yêu cầu của buyer.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-pine-finish-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-pine-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-pine-control-list">
                {[
                  {
                    title: 'Độ ẩm vật liệu',
                    body: 'Đảm bảo độ ổn định trong sản xuất và sử dụng.',
                  },
                  {
                    title: 'Mắt gỗ',
                    body: 'Kiểm soát vị trí và mức độ xuất hiện theo yêu cầu sản phẩm.',
                  },
                  {
                    title: 'Đồng đều màu sắc',
                    body: 'Duy trì tính nhất quán giữa các lô vật liệu.',
                  },
                  {
                    title: 'Hoàn thiện bề mặt',
                    body: 'Kiểm soát khả năng hấp thụ stain và chất lượng hoàn thiện.',
                  },
                  {
                    title: 'Đóng gói',
                    body: 'Bảo vệ sản phẩm trong quá trình vận chuyển quốc tế.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">▣</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-pine-supply">
            <div className="materials-pine-supply-image-slot" aria-hidden="true" />
            <div className="materials-pine-supply-copy">
              <h2>{t('Pine trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ phát triển sản phẩm, lựa chọn vật liệu, đánh giá khả năng sản xuất và tổ chức chuỗi cung ứng cho các dự án sử dụng gỗ Pine tại Việt Nam.',
                )}
              </p>
              <p>
                {t(
                  'Pine đặc biệt phù hợp với các chương trình OEM, ODM, nội thất trẻ em, nội thất đóng gói KD và các dòng sản phẩm bán lẻ quy mô lớn.',
                )}
              </p>
            </div>
            <div className="materials-pine-supply-flow">
              {['Phát triển sản phẩm', 'Lựa chọn vật liệu', 'Đánh giá khả năng sản xuất', 'Tổ chức chuỗi cung ứng'].map((item) => (
                <article key={item}>
                  <div className="materials-pine-supply-icon-slot" aria-hidden="true" />
                  <p>{t(item)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-pine-followup-row">
            <div className="materials-pine-quick-compare">
              <h2>{t('So sánh nhanh')}</h2>
              <div className="materials-pine-quick-table" role="table" aria-label={t('So sánh nhanh các vật liệu gỗ')}>
                {[
                  ['Vật liệu', 'Điểm mạnh'],
                  ['Rubberwood', 'Hiệu quả chi phí, sản xuất hàng loạt'],
                  ['Ash', 'Scandinavian, vân đẹp'],
                  ['Oak', 'Cao cấp, nhận diện quốc tế'],
                  ['Beech', 'Ghế và cấu kiện uốn cong'],
                  ['Acacia', 'Vân nổi bật, outdoor furniture'],
                  ['Pine', 'Nhẹ, KD furniture và bán lẻ'],
                ].map((row, rowIndex) => (
                  <div className="materials-pine-quick-row" role="row" key={row.join('-')}>
                    {row.map((cell) => (
                      <div
                        className={rowIndex === 0 || row[0] === 'Pine' ? 'is-highlight' : undefined}
                        role={rowIndex === 0 ? 'columnheader' : 'cell'}
                        key={cell}
                      >
                        {t(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="materials-pine-style-fit">
              <h2>{t('Pine phù hợp với những phong cách nào?')}</h2>
              <div className="materials-pine-style-grid">
                {[
                  {
                    title: 'Scandinavian',
                    body: 'Màu trắng, đơn giản và tự nhiên.',
                  },
                  {
                    title: 'Country',
                    body: 'Tạo cảm giác ấm áp và gần gũi.',
                  },
                  {
                    title: 'Casual Living',
                    body: 'Nội thất gia đình hướng đến sự thoải mái.',
                  },
                  {
                    title: 'Kids Furniture',
                    body: 'Ứng dụng phổ biến trong không gian trẻ em.',
                  },
                  {
                    title: 'E-commerce Furniture',
                    body: 'Thiết kế tối ưu cho vận chuyển và lắp ráp.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-pine-style-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-pine-related-links">
              <h2>{t('Liên kết với các nội dung liên quan')}</h2>
              <div className="materials-pine-related-list">
                {[
                  {
                    icon: '▱',
                    title: 'Giường',
                    body: 'Khám phá các sản phẩm giường sử dụng Pine.',
                  },
                  {
                    icon: '▤',
                    title: 'Tủ & Lưu trữ',
                    body: 'Các hệ tủ và lưu trữ từ Pine.',
                  },
                  {
                    icon: '▥',
                    title: 'Kệ',
                    body: 'Các dòng bookshelf và storage shelf.',
                  },
                  {
                    icon: '◩',
                    title: 'Sơn & hoàn thiện bề mặt',
                    body: 'Các phương án hoàn thiện phù hợp với Pine.',
                  },
                  {
                    icon: '▣',
                    title: 'Kiểm soát độ ẩm',
                    body: 'Các hoạt động kiểm soát vật liệu trong sản xuất.',
                  },
                ].map((item) => (
                  <a href="/vn/contact" key={item.title}>
                    <span aria-hidden="true">{item.icon}</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                    <b aria-hidden="true">›</b>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-pine-cta">
            <div className="materials-pine-cta-image-slot" aria-hidden="true" />
            <div className="materials-pine-cta-copy">
              <h2>{t('Trao đổi về vật liệu Pine cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng gỗ Pine và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-pine-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsAcaciaPage && (
        <section className="materials-acacia-content">
          <section className="materials-acacia-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-acacia-overview-panel">
              {[
                {
                  icon: '▤',
                  title: 'Tên thương mại',
                  body: 'Acacia',
                },
                {
                  icon: '♜',
                  title: 'Nhóm vật liệu',
                  body: 'Gỗ tự nhiên',
                },
                {
                  icon: '◩',
                  title: 'Màu sắc tự nhiên',
                  body: 'Từ vàng nhạt, nâu vàng đến nâu đậm tùy từng khu vực gỗ.',
                },
                {
                  icon: '▧',
                  title: 'Đặc điểm vân gỗ',
                  body: 'Vân gỗ rõ nét, tương phản cao và giàu tính tự nhiên.',
                },
                {
                  icon: '⚒',
                  title: 'Khả năng gia công',
                  body: 'Gia công tốt, phù hợp với nhiều phương pháp sản xuất nội thất hoàn thiện và cấu kiện nội thất.',
                },
                {
                  icon: '◈',
                  title: 'Đặc điểm nổi bật',
                  body: 'Vân đẹp\nMàu sắc phong phú\nĐộ bền tốt\nỨng dụng linh hoạt',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-acacia-features">
            <h2>{t('Vì sao Acacia được ưa chuộng?')}</h2>
            <div className="materials-acacia-feature-grid">
              {[
                {
                  icon: '◎',
                  title: 'Vân gỗ nổi bật',
                  body: 'Tạo điểm nhấn thị giác mạnh mẽ và mang đậm tính tự nhiên.',
                },
                {
                  icon: '◌',
                  title: 'Màu sắc đa dạng',
                  body: 'Mỗi sản phẩm có thể sở hữu những sắc độ tự nhiên riêng biệt.',
                },
                {
                  icon: '✓',
                  title: 'Độ bền tốt',
                  body: 'Phù hợp với nhiều môi trường sử dụng khác nhau.',
                },
                {
                  icon: '◇',
                  title: 'Giá trị thẩm mỹ cao',
                  body: 'Được sử dụng nhiều trong các bộ sưu tập nội thất mang phong cách tự nhiên và contemporary.',
                },
                {
                  icon: '▣',
                  title: 'Hiệu quả chi phí',
                  body: 'Mang lại sự cân bằng giữa chất lượng, thẩm mỹ và chi phí sản xuất.',
                },
                {
                  icon: '✣',
                  title: 'Ứng dụng linh hoạt',
                  body: 'Có thể sử dụng cho nội thất trong nhà, ngoài trời và các dự án hospitality.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-acacia-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-acacia-application-grid">
              {[
                {
                  title: 'Bàn',
                  items: ['Bàn ăn', 'Bàn cafe', 'Bàn phụ', 'Bàn ngoài trời'],
                },
                {
                  title: 'Ghế',
                  items: ['Ghế ăn', 'Ghế ngoài trời', 'Ghế nhà hàng', 'Ghế resort'],
                },
                {
                  title: 'Giường',
                  items: ['Khung giường', 'Đầu giường'],
                },
                {
                  title: 'Tủ & lưu trữ',
                  items: ['Tủ trang trí', 'Tủ phòng ngủ', 'Tủ lưu trữ'],
                },
                {
                  title: 'Nội thất ngoài trời',
                  items: ['Bàn ghế sân vườn', 'Ban công', 'Poolside Furniture', 'Resort Furniture'],
                },
                {
                  title: 'Nội thất dự án',
                  items: ['Khách sạn', 'Resort', 'Nhà hàng', 'Không gian thương mại'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-acacia-application-image-slot" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <ul>
                    {item.items.map((entry) => (
                      <li key={entry}>{t(entry)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-acacia-detail-row">
            <div className="materials-acacia-outdoor">
              <h2>{t('Acacia và nội thất ngoài trời')}</h2>
              <p>{t('Vì sao Acacia được sử dụng nhiều cho Outdoor Furniture?')}</p>
              <div className="materials-acacia-outdoor-grid">
                <div className="materials-acacia-outdoor-flow">
                  {[
                    'Độ bền tốt',
                    'Kết cấu ổn định',
                    'Vẻ đẹp tự nhiên',
                    'Dễ hoàn thiện bảo vệ bề mặt',
                    'Phù hợp môi trường sử dụng đa dạng',
                  ].map((item, index) => (
                    <article key={item}>
                      <span aria-hidden="true">◈</span>
                      <p>{t(item)}</p>
                      {index < 4 && <b aria-hidden="true">↓</b>}
                    </article>
                  ))}
                </div>
                <div className="materials-acacia-outdoor-popular">
                  <h3>{t('Ứng dụng phổ biến')}</h3>
                  <ul>
                    {[
                      'Dining Set Outdoor',
                      'Garden Furniture',
                      'Balcony Furniture',
                      'Resort Furniture',
                      'Poolside Furniture',
                    ].map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="materials-acacia-outdoor-image-slot" aria-hidden="true" />
            </div>

            <div className="materials-acacia-finishing">
              <h2>{t('Khả năng hoàn thiện bề mặt')}</h2>
              <div className="materials-acacia-finish-list">
                {[
                  {
                    title: 'Natural Finish',
                    body: 'Tôn lên vẻ đẹp tự nhiên và sự tương phản của vân gỗ.',
                  },
                  {
                    title: 'Stain Finish',
                    body: 'Phát triển màu sắc theo yêu cầu thiết kế.',
                  },
                  {
                    title: 'Oil Finish',
                    body: 'Một trong những phương án hoàn thiện phổ biến cho Acacia.',
                  },
                  {
                    title: 'Matte Finish',
                    body: 'Mang lại cảm giác hiện đại và gần gũi với vật liệu.',
                  },
                  {
                    title: 'Outdoor Protective Finish',
                    body: 'Hỗ trợ bảo vệ bề mặt cho các sản phẩm ngoài trời.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-acacia-finish-image-slot" aria-hidden="true" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-acacia-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-acacia-control-list">
                {[
                  {
                    title: 'Độ ẩm vật liệu',
                    body: 'Đảm bảo độ ổn định trong sản xuất và sử dụng.',
                  },
                  {
                    title: 'Đồng đều màu sắc',
                    body: 'Kiểm soát sự khác biệt tự nhiên giữa các chi tiết.',
                  },
                  {
                    title: 'Sắp xếp vân gỗ',
                    body: 'Đảm bảo tính thẩm mỹ cho sản phẩm hoàn thiện.',
                  },
                  {
                    title: 'Hoàn thiện bề mặt',
                    body: 'Kiểm soát màu sắc, độ bóng và chất lượng hoàn thiện.',
                  },
                  {
                    title: 'Điều kiện sử dụng',
                    body: 'Lựa chọn phương án hoàn thiện phù hợp với môi trường trong nhà hoặc ngoài trời.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">▣</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <section className="materials-acacia-supply">
              <div className="materials-acacia-supply-copy">
                <h2>{t('Acacia trong hệ thống cung ứng của ANSLIFE')}</h2>
                <p>
                  {t(
                    'ANSLIFE hỗ trợ phát triển sản phẩm, lựa chọn vật liệu, đánh giá khả năng sản xuất và tổ chức chuỗi cung ứng cho các dự án sử dụng gỗ Acacia tại Việt Nam.',
                  )}
                </p>
                <p>
                  {t(
                    'Acacia có thể được ứng dụng cho sản phẩm hoàn thiện, nội thất ngoài trời, chương trình OEM / ODM và các dự án khách sạn, resort hoặc thương mại.',
                  )}
                </p>
              </div>
              <div className="materials-acacia-supply-flow">
                {['Phát triển sản phẩm', 'Lựa chọn vật liệu', 'Đánh giá khả năng sản xuất', 'Tổ chức chuỗi cung ứng'].map((item) => (
                  <article key={item}>
                    <div className="materials-acacia-supply-icon-slot" aria-hidden="true" />
                    <p>{t(item)}</p>
                  </article>
                ))}
              </div>
            </section>
          </section>

          <section className="materials-acacia-style-compare-row">
            <div className="materials-acacia-quick-compare">
              <h2>{t('So sánh nhanh')}</h2>
              <div className="materials-acacia-quick-table" role="table" aria-label={t('So sánh nhanh các vật liệu gỗ')}>
                {[
                  ['Vật liệu', 'Điểm mạnh'],
                  ['Rubberwood', 'Hiệu quả chi phí, sản xuất hàng loạt'],
                  ['Ash', 'Vân đẹp, Scandinavian'],
                  ['Oak', 'Cao cấp, nhận diện quốc tế'],
                  ['Beech', 'Ghế và cấu kiện uốn cong'],
                  ['Acacia', 'Vân nổi bật, nội thất ngoài trời'],
                  ['Pine', 'Nhẹ, linh hoạt và dễ gia công'],
                ].map((row, rowIndex) => (
                  <div className="materials-acacia-quick-row" role="row" key={row.join('-')}>
                    {row.map((cell) => (
                      <div
                        className={rowIndex === 0 || row[0] === 'Acacia' ? 'is-highlight' : undefined}
                        role={rowIndex === 0 ? 'columnheader' : 'cell'}
                        key={cell}
                      >
                        {t(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="materials-acacia-style-fit">
              <h2>{t('Acacia phù hợp với những phong cách nào?')}</h2>
              <div className="materials-acacia-style-grid">
                {[
                  {
                    title: 'Natural Living',
                    body: 'Tôn vinh vẻ đẹp tự nhiên của vật liệu.',
                  },
                  {
                    title: 'Contemporary',
                    body: 'Kết hợp giữa thiết kế hiện đại và vật liệu tự nhiên.',
                  },
                  {
                    title: 'Rustic Modern',
                    body: 'Vân gỗ nổi bật tạo nên cá tính riêng cho sản phẩm.',
                  },
                  {
                    title: 'Tropical',
                    body: 'Phù hợp với resort, khách sạn và không gian nghỉ dưỡng.',
                  },
                  {
                    title: 'Outdoor Living',
                    body: 'Các không gian sân vườn, ban công và hồ bơi.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-acacia-style-image-slot" aria-hidden="true" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-acacia-cta">
            <div className="materials-acacia-cta-image-slot" aria-hidden="true" />
            <div className="materials-acacia-cta-copy">
              <h2>{t('Trao đổi về vật liệu Acacia cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng gỗ Acacia và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-acacia-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsBeechPage && (
        <section className="materials-beech-content">
          <section className="materials-beech-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-beech-overview-panel">
              {[
                {
                  icon: '▤',
                  title: 'Tên thương mại',
                  body: 'Beech',
                },
                {
                  icon: '♜',
                  title: 'Nhóm vật liệu',
                  body: 'Gỗ tự nhiên',
                },
                {
                  icon: '⌘',
                  title: 'Màu sắc tự nhiên',
                  body: 'Kem nhạt đến hồng nhạt hoặc vàng nhạt.',
                },
                {
                  icon: '▧',
                  title: 'Đặc điểm vân gỗ',
                  body: 'Mịn, đều và ít tương phản.',
                },
                {
                  icon: '⚒',
                  title: 'Khả năng gia công',
                  body: 'Rất tốt cho tiện, CNC, khoan, phay và đặc biệt là uốn cong.',
                },
                {
                  icon: '◈',
                  title: 'Đặc điểm nổi bật',
                  body: 'Độ đồng đều cao\nDễ gia công\nKhả năng uốn cong tốt\nPhù hợp sản xuất ghế',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-beech-features">
            <h2>{t('Vì sao Beech được sử dụng nhiều trong ngành ghế?')}</h2>
            <div className="materials-beech-feature-grid">
              {[
                {
                  icon: '◌',
                  title: 'Khả năng uốn cong',
                  body: 'Beech là một trong những loại gỗ phổ biến nhất cho công nghệ uốn cong bằng hơi nước.',
                },
                {
                  icon: '◍',
                  title: 'Kết cấu đồng đều',
                  body: 'Giúp sản phẩm có độ ổn định cao và dễ kiểm soát chất lượng.',
                },
                {
                  icon: '♙',
                  title: 'Độ cứng phù hợp',
                  body: 'Đáp ứng yêu cầu sử dụng cho các dòng ghế thương mại và dân dụng.',
                },
                {
                  icon: '⚙',
                  title: 'Gia công chính xác',
                  body: 'Phù hợp với sản xuất hàng loạt và các chi tiết có độ chính xác cao.',
                },
                {
                  icon: '✎',
                  title: 'Dễ hoàn thiện màu sắc',
                  body: 'Có thể phát triển nhiều màu stain khác nhau.',
                },
                {
                  icon: '▥',
                  title: 'Phổ biến tại Châu Âu và Nhật Bản',
                  body: 'Là vật liệu quen thuộc trong các bộ sưu tập ghế và nội thất hospitality.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-beech-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-beech-application-grid">
              {[
                {
                  title: 'Ghế ăn',
                  items: ['Dining Chair', 'Cafe Chair', 'Restaurant Chair'],
                },
                {
                  title: 'Ghế uốn cong',
                  items: ['Bentwood Chair', 'Curved Back Chair'],
                },
                {
                  title: 'Ghế khách sạn',
                  items: ['Hospitality Seating', 'Hotel Furniture'],
                },
                {
                  title: 'Ghế bọc nệm',
                  items: ['Upholstered Chair', 'Dining Armchair'],
                },
                {
                  title: 'Cấu kiện nội thất',
                  items: ['Tay ghế', 'Lưng ghế', 'Khung ghế', 'Chân ghế'],
                },
                {
                  title: 'Nội thất dự án',
                  items: ['Khách sạn', 'Nhà hàng', 'Resort', 'Không gian thương mại'],
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-beech-application-image-slot" />
                  <h3>{t(item.title)}</h3>
                  <ul>
                    {item.items.map((line) => (
                      <li key={line}>{t(line)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-beech-production-row">
            <div className="materials-beech-chair-production">
              <h2>{t('Beech và sản xuất ghế')}</h2>
              <p>{t('Vì sao Beech được sử dụng cho ghế?')}</p>
              <div className="materials-beech-chair-grid">
                <div className="materials-beech-chair-flow">
                  {[
                    'Kết cấu đồng đều',
                    'Gia công chính xác',
                    'Uốn cong tốt',
                    'Ổn định khi sử dụng',
                    'Phù hợp sản xuất hàng loạt',
                  ].map((item, index) => (
                    <article key={item}>
                      <span aria-hidden="true">▧</span>
                      <p>{t(item)}</p>
                      {index < 4 && <b aria-hidden="true">↓</b>}
                    </article>
                  ))}
                </div>
                <div className="materials-beech-chair-popular">
                  <h3>{t('Ứng dụng phổ biến')}</h3>
                  {['Dining Chair', 'Bentwood Chair', 'Cafe Chair', 'Restaurant Seating', 'Hospitality Seating'].map((item) => (
                    <article key={item}>
                      <span aria-hidden="true">▥</span>
                      <p>{t(item)}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="materials-beech-finishing">
              <h2>{t('Khả năng hoàn thiện bề mặt')}</h2>
              <div className="materials-beech-finish-list">
                {[
                  {
                    title: 'Natural Finish',
                    body: 'Giữ vẻ sáng và sạch của vật liệu.',
                  },
                  {
                    title: 'Stain Finish',
                    body: 'Phát triển màu theo yêu cầu thiết kế và buyer.',
                  },
                  {
                    title: 'Lacquer Finish',
                    body: 'Tăng độ bền và khả năng bảo vệ bề mặt.',
                  },
                  {
                    title: 'Matte Finish',
                    body: 'Mang lại cảm giác hiện đại và tự nhiên.',
                  },
                  {
                    title: 'Custom Color Finish',
                    body: 'Hoàn thiện theo bảng màu hoặc mẫu duyệt.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-beech-finish-image-slot" />
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-beech-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-beech-control-list">
                {[
                  {
                    title: 'Độ ẩm vật liệu',
                    body: 'Đảm bảo tính ổn định trong sản xuất và sử dụng.',
                  },
                  {
                    title: 'Chất lượng uốn cong',
                    body: 'Kiểm soát hình dạng và độ ổn định của cấu kiện cong.',
                  },
                  {
                    title: 'Kết cấu liên kết',
                    body: 'Đảm bảo độ bền của các điểm kết nối.',
                  },
                  {
                    title: 'Đồng đều màu sắc',
                    body: 'Duy trì tính nhất quán giữa các lô hàng.',
                  },
                  {
                    title: 'Hoàn thiện bề mặt',
                    body: 'Kiểm soát màu sắc, độ bóng và chất lượng hoàn thiện.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">▣</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-beech-supply">
            <div className="materials-beech-supply-image-slot" />
            <div className="materials-beech-supply-copy">
              <h2>{t('Beech trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ phát triển sản phẩm, lựa chọn vật liệu, đánh giá khả năng sản xuất và tổ chức chuỗi cung ứng cho các dự án sử dụng gỗ Beech tại Việt Nam.',
                )}
              </p>
              <p>
                {t(
                  'Beech đặc biệt phù hợp với các chương trình sản xuất ghế, nội thất hospitality, OEM / ODM và các sản phẩm yêu cầu cấu kiện cong hoặc độ chính xác gia công cao.',
                )}
              </p>
            </div>
            <div className="materials-beech-supply-flow">
              {['Phát triển sản phẩm', 'Lựa chọn vật liệu', 'Đánh giá khả năng sản xuất', 'Tổ chức chuỗi cung ứng'].map((item) => (
                <article key={item}>
                  <div className="materials-beech-supply-icon-slot" />
                  <p>{t(item)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-beech-style-compare-row">
            <div className="materials-beech-style-fit">
              <h2>{t('Beech phù hợp với những phong cách nào?')}</h2>
              <div className="materials-beech-style-grid">
                {[
                  {
                    title: 'Scandinavian',
                    body: 'Đường nét đơn giản và màu sắc sáng.',
                  },
                  {
                    title: 'Nordic',
                    body: 'Tập trung vào vật liệu tự nhiên và công năng.',
                  },
                  {
                    title: 'Modern',
                    body: 'Phù hợp với các thiết kế hiện đại và tối giản.',
                  },
                  {
                    title: 'Hospitality',
                    body: 'Nhà hàng, khách sạn và không gian công cộng.',
                  },
                  {
                    title: 'Cafe & Restaurant',
                    body: 'Một trong những vật liệu phổ biến nhất cho ngành F&B.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-beech-style-image-slot" />
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="materials-beech-quick-compare">
              <h2>{t('So sánh nhanh')}</h2>
              <div className="materials-beech-quick-table" role="table" aria-label={t('So sánh nhanh các vật liệu gỗ')}>
                {[
                  ['Vật liệu', 'Điểm mạnh'],
                  ['Rubberwood', 'Hiệu quả chi phí, sản xuất hàng loạt'],
                  ['Ash', 'Vân đẹp, Scandinavian'],
                  ['Oak', 'Cao cấp, nhận diện quốc tế'],
                  ['Beech', 'Ghế và cấu kiện uốn cong'],
                  ['Acacia', 'Vân gỗ nổi bật & cá tính'],
                  ['Pine', 'Nhẹ, dễ gia công'],
                ].map((row, rowIndex) => (
                  <div className="materials-beech-quick-row" role="row" key={row.join('-')}>
                    {row.map((cell) => (
                      <div
                        className={rowIndex === 0 || row[0] === 'Beech' ? 'is-highlight' : undefined}
                        role={rowIndex === 0 ? 'columnheader' : 'cell'}
                        key={cell}
                      >
                        {t(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="materials-beech-cta">
            <div className="materials-beech-cta-image-slot" />
            <div className="materials-beech-cta-copy">
              <h2>{t('Trao đổi về vật liệu Beech cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng gỗ Beech và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-beech-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsOakPage && (
        <section className="materials-oak-content">
          <section className="materials-oak-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-oak-overview-panel">
              {[
                {
                  icon: '▤',
                  title: 'Tên thương mại',
                  body: 'Oak',
                },
                {
                  icon: '♜',
                  title: 'Nhóm vật liệu',
                  body: 'Gỗ tự nhiên',
                },
                {
                  icon: '☼',
                  title: 'Phân loại phổ biến',
                  body: 'White Oak\nRed Oak',
                },
                {
                  icon: '▧',
                  title: 'Màu sắc tự nhiên',
                  body: 'Từ vàng nhạt đến nâu sáng.',
                },
                {
                  icon: '◰',
                  title: 'Đặc điểm vân gỗ',
                  body: 'Vân gỗ rõ nét, đẹp và dễ nhận diện.',
                },
                {
                  icon: '⚒',
                  title: 'Khả năng gia công',
                  body: 'Gia công tốt, phù hợp với nhiều phương pháp sản xuất nội thất hiện đại.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <span aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>
                      {item.body.split('\n').map((line, index) => (
                        <span key={`${item.title}-${line}`}>
                          {index > 0 && <br />}
                          {t(line)}
                        </span>
                      ))}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="materials-oak-main-grid">
            <section className="materials-oak-reasons">
              <h2>{t('Vì sao Oak được ưa chuộng?')}</h2>
              <div className="materials-oak-reason-panel">
                {[
                  {
                    icon: '▣',
                    title: 'Độ bền cao',
                    body: 'Kết cấu chắc chắn và khả năng sử dụng lâu dài.',
                  },
                  {
                    icon: '▥',
                    title: 'Vân gỗ đặc trưng',
                    body: 'Tạo nên vẻ đẹp tự nhiên và giá trị thẩm mỹ cao.',
                  },
                  {
                    icon: '♙',
                    title: 'Dễ hoàn thiện',
                    body: 'Phù hợp với nhiều màu sắc và phương pháp hoàn thiện khác nhau.',
                  },
                  {
                    icon: '◇',
                    title: 'Giá trị thị trường cao',
                    body: 'Là vật liệu quen thuộc trong các dòng nội thất trung và cao cấp.',
                  },
                  {
                    icon: '▰',
                    title: 'Ứng dụng rộng rãi',
                    body: 'Từ nội thất gia đình đến khách sạn, resort và dự án thương mại.',
                  },
                  {
                    icon: '◎',
                    title: 'Được thị trường quốc tế công nhận',
                    body: 'Là một trong những loại gỗ phổ biến nhất tại Mỹ và Châu Âu.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">{item.icon}</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="materials-oak-comparison">
              <h2>{t('White Oak và Red Oak')}</h2>
              <div className="materials-oak-comparison-table" role="table" aria-label={t('So sánh White Oak và Red Oak')}>
                {[
                  ['Đặc điểm', 'White Oak', 'Red Oak'],
                  ['Màu sắc', 'Nhạt hơn, trung tính', 'Hơi ngả đỏ'],
                  ['Vân gỗ', 'Tinh tế, đồng đều', 'Nổi bật hơn'],
                  ['Ứng dụng', 'Nội thất cao cấp, hospitality', 'Nội thất dân dụng'],
                  ['Phong cách', 'Scandinavian, Modern Luxury', 'Traditional, Contemporary'],
                ].map((row, rowIndex) => (
                  <div className="materials-oak-comparison-row" role="row" key={row.join('-')}>
                    {row.map((cell) => (
                      <div
                        className={rowIndex === 0 ? 'is-heading' : undefined}
                        role={rowIndex === 0 ? 'columnheader' : 'cell'}
                        key={cell}
                      >
                        {t(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="materials-oak-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-oak-application-grid">
              {[
                {
                  title: 'Ghế',
                  body: 'Ghế ăn, ghế lounge, ghế bọc nệm và ghế thiết kế.',
                },
                {
                  title: 'Bàn',
                  body: 'Bàn ăn, bàn làm việc, bàn hội nghị và bàn cà phê.',
                },
                {
                  title: 'Tủ & lưu trữ',
                  body: 'Tủ trang trí, tủ phòng ngủ và hệ lưu trữ cao cấp.',
                },
                {
                  title: 'Giường',
                  body: 'Khung giường và các bộ phận kết cấu.',
                },
                {
                  title: 'Nội thất dự án',
                  body: 'Khách sạn, resort, nhà hàng và không gian thương mại.',
                },
                {
                  title: 'Cấu kiện nội thất',
                  body: 'Khung ghế, chân bàn, tay vịn và các chi tiết gia công.',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-oak-application-image-slot" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="materials-oak-followup-grid">
            <div className="materials-oak-followup-main">
              <section className="materials-oak-finishing">
                <h2>{t('Khả năng hoàn thiện bề mặt')}</h2>
                <div className="materials-oak-finish-grid">
                  {[
                    {
                      title: 'Natural Oak',
                      body: 'Giữ nguyên màu sắc và vân gỗ tự nhiên.',
                    },
                    {
                      title: 'Stain Finish',
                      body: 'Tăng chiều sâu và phát triển màu sắc theo yêu cầu thiết kế.',
                    },
                    {
                      title: 'Smoked Oak',
                      body: 'Tạo sắc độ đậm và cảm giác sang trọng.',
                    },
                    {
                      title: 'Matte Finish',
                      body: 'Mang lại vẻ hiện đại và tinh tế.',
                    },
                    {
                      title: 'Oil Finish',
                      body: 'Tôn lên cảm giác tự nhiên của vật liệu.',
                    },
                    {
                      title: 'Custom Color Finish',
                      body: 'Hoàn thiện màu theo mẫu duyệt của buyer.',
                    },
                  ].map((item) => (
                    <article key={item.title}>
                      <div className="materials-oak-finish-image-slot" />
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="materials-oak-style-fit">
                <h2>{t('Oak phù hợp với những phong cách nào?')}</h2>
                <div className="materials-oak-style-grid">
                  {[
                    {
                      title: 'Scandinavian',
                      body: 'Màu sáng, vân đẹp và cảm giác tự nhiên.',
                    },
                    {
                      title: 'Modern',
                      body: 'Đường nét tối giản kết hợp với vật liệu chất lượng cao.',
                    },
                    {
                      title: 'Contemporary',
                      body: 'Linh hoạt với nhiều phương án hoàn thiện khác nhau.',
                    },
                    {
                      title: 'Hospitality',
                      body: 'Khách sạn, resort và các không gian thương mại cao cấp.',
                    },
                    {
                      title: 'Luxury Residential',
                      body: 'Nhà ở và căn hộ cao cấp.',
                    },
                  ].map((item) => (
                    <article key={item.title}>
                      <div className="materials-oak-style-image-slot" />
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="materials-oak-combinations">
                <h2>{t('Oak thường được kết hợp với')}</h2>
                <div className="materials-oak-combination-grid">
                  {[
                    {
                      title: 'Vải & vật liệu bọc',
                      body: 'Ghế ăn, ghế lounge và sofa.',
                    },
                    {
                      title: 'Kim loại',
                      body: 'Nội thất hiện đại và công trình thương mại.',
                    },
                    {
                      title: 'Đá tự nhiên',
                      body: 'Bàn ăn và nội thất cao cấp.',
                    },
                    {
                      title: 'Mây đan',
                      body: 'Phong cách Scandinavian và Tropical Contemporary.',
                    },
                    {
                      title: 'Kính',
                      body: 'Các dòng sản phẩm hiện đại và tối giản.',
                    },
                  ].map((item) => (
                    <article key={item.title}>
                      <div className="materials-oak-combination-image-slot" />
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="materials-oak-followup-side">
              <section className="materials-oak-control">
                <h2>{t('Những yếu tố cần kiểm soát')}</h2>
                <div className="materials-oak-control-list">
                  {[
                    {
                      icon: '▣',
                      title: 'Độ ẩm vật liệu',
                      body: 'Duy trì sự ổn định trong sản xuất và sử dụng.',
                    },
                    {
                      icon: '▤',
                      title: 'Đồng đều màu sắc',
                      body: 'Kiểm soát sự nhất quán giữa các lô hàng.',
                    },
                    {
                      icon: '◈',
                      title: 'Chất lượng vân gỗ',
                      body: 'Lựa chọn và sắp xếp phù hợp với yêu cầu thẩm mỹ.',
                    },
                    {
                      icon: '✎',
                      title: 'Hoàn thiện bề mặt',
                      body: 'Kiểm soát màu sắc, độ bóng và chất lượng hoàn thiện.',
                    },
                    {
                      icon: '▧',
                      title: 'Đóng gói & vận chuyển',
                      body: 'Bảo vệ sản phẩm trong quá trình logistics quốc tế.',
                    },
                  ].map((item) => (
                    <article key={item.title}>
                      <span aria-hidden="true">{item.icon}</span>
                      <div>
                        <h3>{t(item.title)}</h3>
                        <p>{t(item.body)}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="materials-oak-supply">
                <h2>{t('Oak trong hệ thống cung ứng của ANSLIFE')}</h2>
                <p>
                  {t(
                    'ANSLIFE hỗ trợ phát triển sản phẩm, lựa chọn vật liệu, đánh giá khả năng sản xuất và tổ chức chuỗi cung ứng cho các dự án sử dụng gỗ Oak tại Việt Nam.',
                  )}
                </p>
                <p>
                  {t(
                    'Oak có thể được ứng dụng cho sản phẩm hoàn thiện, cấu kiện nội thất, chương trình OEM / ODM và các dự án hospitality, residential hoặc commercial furniture.',
                  )}
                </p>
                <div className="materials-oak-supply-flow">
                  {[
                    'Phát triển sản phẩm',
                    'Lựa chọn vật liệu',
                    'Đánh giá khả năng sản xuất',
                    'Tổ chức chuỗi cung ứng',
                  ].map((item, index) => (
                    <article key={item}>
                      <div className="materials-oak-supply-icon-slot" />
                      <p>{t(item)}</p>
                      {index < 3 && <span aria-hidden="true">›</span>}
                    </article>
                  ))}
                </div>
              </section>

              <section className="materials-oak-related-links">
                <h2>{t('Liên kết với các nội dung liên quan')}</h2>
                <div className="materials-oak-related-list">
                  {[
                    {
                      icon: '▣',
                      title: 'Nội thất hoàn thiện',
                      body: 'Khám phá các sản phẩm sử dụng gỗ Oak.',
                      href: '/vn/products-solutions/finished-furniture',
                    },
                    {
                      icon: '☷',
                      title: 'Cấu kiện nội thất',
                      body: 'Các bộ phận và chi tiết được sản xuất từ Oak.',
                      href: '/vn/products-solutions/furniture-components',
                    },
                    {
                      icon: '✎',
                      title: 'Sơn & hoàn thiện bề mặt',
                      body: 'Các phương án hoàn thiện phù hợp với Oak.',
                      href: '/vn/products-solutions/finishing',
                    },
                    {
                      icon: '▤',
                      title: 'Kiểm soát độ ẩm',
                      body: 'Các hoạt động kiểm soát vật liệu trong sản xuất.',
                      href: '/vn/resources/manufacturing-notes',
                    },
                  ].map((item) => (
                    <a href={item.href} key={item.title}>
                      <span aria-hidden="true">{item.icon}</span>
                      <div>
                        <h3>{t(item.title)}</h3>
                        <p>{t(item.body)}</p>
                      </div>
                      <b aria-hidden="true">›</b>
                    </a>
                  ))}
                </div>
              </section>
            </aside>
          </div>

          <section className="materials-oak-cta">
            <div className="materials-oak-cta-image-slot" />
            <div className="materials-oak-cta-copy">
              <h2>{t('Trao đổi về vật liệu Oak cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng gỗ Oak và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-oak-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsAshPage && (
        <section className="materials-ash-content">
          <section className="materials-ash-overview">
            <h2>{t('Tổng quan vật liệu')}</h2>
            <div className="materials-ash-overview-panel">
              {[
                {
                  title: 'Tên thương mại',
                  body: 'Ash',
                  image: '/assets/materials/solid-wood/ash/overview/commercial-name.webp',
                },
                {
                  title: 'Nhóm vật liệu',
                  body: 'Gỗ tự nhiên',
                  image: '/assets/materials/solid-wood/ash/overview/material-group.webp',
                },
                {
                  title: 'Màu sắc tự nhiên',
                  body: 'Từ trắng kem đến vàng nhạt hoặc nâu nhạt.',
                  image: '/assets/materials/solid-wood/ash/overview/natural-color.webp',
                },
                {
                  title: 'Đặc điểm vân gỗ',
                  body: 'Vân gỗ rõ ràng, thẳng hoặc dạng sóng nhẹ, tạo cảm giác tự nhiên và hiện đại.',
                  image: '/assets/materials/solid-wood/ash/overview/wood-grain.webp',
                },
                {
                  title: 'Khả năng gia công',
                  body: 'Gia công tốt, phù hợp với cắt, tiện, CNC, uốn cong và nhiều phương pháp sản xuất nội thất.',
                  image: '/assets/materials/solid-wood/ash/overview/machining.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-ash-overview-image-slot">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-ash-features">
            <h2>{t('Đặc điểm nổi bật')}</h2>
            <div className="materials-ash-feature-panel">
              {[
                {
                  title: 'Vân gỗ đẹp và rõ nét',
                  body: 'Mang lại giá trị thẩm mỹ cao và dễ nhận diện trong các dòng nội thất hiện đại.',
                  image: '/assets/materials/solid-wood/ash/features/wood-grain.webp',
                },
                {
                  title: 'Màu sắc sáng',
                  body: 'Dễ kết hợp với nhiều phong cách thiết kế và phương án hoàn thiện.',
                  image: '/assets/materials/solid-wood/ash/features/light-color.webp',
                },
                {
                  title: 'Khả năng hoàn thiện linh hoạt',
                  body: 'Phù hợp với stain, lacquer, oil finish và nhiều hệ hoàn thiện khác.',
                  image: '/assets/materials/solid-wood/ash/features/flexible-finishing.webp',
                },
                {
                  title: 'Gia công tốt',
                  body: 'Thích hợp cho các chi tiết phức tạp, cấu kiện cong và sản phẩm yêu cầu độ chính xác cao.',
                  image: '/assets/materials/solid-wood/ash/features/machining.webp',
                },
                {
                  title: 'Tính ứng dụng cao',
                  body: 'Được sử dụng rộng rãi trong nội thất gia đình, khách sạn và dự án thương mại.',
                  image: '/assets/materials/solid-wood/ash/features/applications.webp',
                },
                {
                  title: 'Phù hợp với nhiều thị trường',
                  body: 'Là loại gỗ quen thuộc trong các chương trình nội thất xuất khẩu sang Mỹ, Châu Âu và Nhật Bản.',
                  image: '/assets/materials/solid-wood/ash/features/export-markets.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-ash-feature-heading">
                    <div className="materials-ash-feature-image-slot">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(item.title)}</h3>
                  </div>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-ash-applications">
            <h2>{t('Ứng dụng trong nội thất')}</h2>
            <div className="materials-ash-application-grid">
              {[
                {
                  title: 'Ghế',
                  body: 'Ghế ăn, ghế lounge, ghế bọc nệm và các dòng ghế thiết kế.',
                  image: '/assets/materials/solid-wood/ash/applications/chair.webp',
                },
                {
                  title: 'Bàn',
                  body: 'Bàn ăn, bàn làm việc, bàn cà phê và bàn phụ.',
                  image: '/assets/materials/solid-wood/ash/applications/table.webp',
                },
                {
                  title: 'Tủ & lưu trữ',
                  body: 'Tủ đầu giường, tủ trang trí và các hệ lưu trữ cao cấp.',
                  image: '/assets/materials/solid-wood/ash/applications/storage.webp',
                },
                {
                  title: 'Giường',
                  body: 'Khung giường và các bộ phận kết cấu.',
                  image: '/assets/materials/solid-wood/ash/applications/bed.webp',
                },
                {
                  title: 'Cấu kiện nội thất',
                  body: 'Tay ghế, chân bàn, khung ghế và các chi tiết gia công theo bản vẽ.',
                  image: '/assets/materials/solid-wood/ash/applications/components.webp',
                },
                {
                  title: 'Nội thất dự án',
                  body: 'Khách sạn, resort, nhà hàng, văn phòng và các không gian thương mại.',
                  image: '/assets/materials/solid-wood/ash/applications/project-furniture.webp',
                },
              ].map((item, index) => (
                <article key={item.title}>
                  <div className={`materials-ash-application-image-slot tone-${index + 1}`}>
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="materials-ash-detail-row">
            <section className="materials-ash-finishing">
              <h2>{t('Khả năng hoàn thiện bề mặt')}</h2>
              <div className="materials-ash-finishing-list">
                {[
                  {
                    tone: 'natural',
                    title: 'Natural Finish',
                    body: 'Giữ lại màu sắc tự nhiên và vẻ đẹp nguyên bản của vật liệu.',
                    image: '/assets/materials/solid-wood/ash/finishes/natural-finish.webp',
                  },
                  {
                    tone: 'stain',
                    title: 'Stain Finish',
                    body: 'Tạo chiều sâu cho vân gỗ và phát triển màu sắc theo yêu cầu thiết kế.',
                    image: '/assets/materials/solid-wood/ash/finishes/stain.webp',
                  },
                  {
                    tone: 'oil',
                    title: 'Oil Finish',
                    body: 'Mang lại cảm giác tự nhiên và gần gũi với vật liệu.',
                    image: '/assets/materials/solid-wood/ash/finishes/oil-finish.webp',
                  },
                  {
                    tone: 'matte',
                    title: 'Matte Finish',
                    body: 'Tạo bề mặt hiện đại và tinh tế.',
                    image: '/assets/materials/solid-wood/ash/finishes/matte-finish.webp',
                  },
                  {
                    tone: 'color',
                    title: 'Color Finish',
                    body: 'Hoàn thiện màu theo bảng màu hoặc mẫu duyệt của buyer.',
                    image: '/assets/materials/solid-wood/ash/finishes/color-finish.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span className={`materials-ash-finish-swatch ${item.tone}`} aria-hidden="true">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="materials-ash-control">
              <h2>{t('Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-ash-control-list">
                {[
                  {
                    title: 'Độ ẩm vật liệu',
                    body: 'Kiểm soát độ ổn định trước sản xuất và hoàn thiện.',
                  },
                  {
                    title: 'Đồng đều màu sắc',
                    body: 'Đảm bảo tính nhất quán giữa các lô vật liệu.',
                  },
                  {
                    title: 'Vân gỗ',
                    body: 'Lựa chọn và sắp xếp phù hợp với yêu cầu thẩm mỹ của sản phẩm.',
                  },
                  {
                    title: 'Hoàn thiện bề mặt',
                    body: 'Kiểm soát màu sắc, độ bóng và chất lượng hoàn thiện.',
                  },
                  {
                    title: 'Đóng gói & vận chuyển',
                    body: 'Bảo vệ sản phẩm trong quá trình lưu kho và xuất khẩu.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">✓</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="materials-ash-supply">
              <h2>{t('Ash trong hệ thống cung ứng của ANSLIFE')}</h2>
              <p>
                {t(
                  'ANSLIFE hỗ trợ phát triển sản phẩm, lựa chọn vật liệu, đánh giá khả năng sản xuất và tổ chức chuỗi cung ứng cho các dự án sử dụng gỗ Ash tại Việt Nam.',
                )}
              </p>
              <p>
                {t(
                  'Tùy theo yêu cầu của buyer, Ash có thể được sử dụng cho sản phẩm hoàn thiện, cấu kiện nội thất, chương trình OEM / ODM hoặc các dự án nội thất thương mại và xuất khẩu.',
                )}
              </p>
              <div className="materials-ash-supply-image-slot">
                <img
                  src="/assets/materials/solid-wood/ash/supply/supply-chain-overview.webp"
                  alt={t('Ash trong hệ thống cung ứng của ANSLIFE')}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>
          </div>

          <div className="materials-ash-followup-row">
            <section className="materials-ash-style-fit">
              <h2>{t('Ash phù hợp với những phong cách nào?')}</h2>
              <div className="materials-ash-style-grid">
                {[
                  {
                    title: 'Scandinavian',
                    body: 'Tận dụng màu sáng và vân gỗ tự nhiên.',
                    image: '/assets/materials/solid-wood/ash/styles/scandinavian.webp',
                  },
                  {
                    title: 'Modern',
                    body: 'Kết hợp với các đường nét đơn giản và hoàn thiện mờ.',
                    image: '/assets/materials/solid-wood/ash/styles/modern.webp',
                  },
                  {
                    title: 'Contemporary',
                    body: 'Linh hoạt với nhiều phương án màu sắc và vật liệu kết hợp.',
                    image: '/assets/materials/solid-wood/ash/styles/contemporary.webp',
                  },
                  {
                    title: 'Hospitality',
                    body: 'Phù hợp với các dự án khách sạn, resort và không gian thương mại.',
                    image: '/assets/materials/solid-wood/ash/styles/hospitality.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-ash-style-image-slot">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="materials-ash-related-links">
              <h2>{t('Liên kết nội dung liên quan')}</h2>
              <div className="materials-ash-related-list">
                {[
                  {
                    title: 'Nội thất hoàn thiện',
                    body: 'Khám phá các sản phẩm sử dụng gỗ Ash.',
                    href: '/products-solutions/finished-furniture',
                  },
                  {
                    title: 'Cấu kiện nội thất',
                    body: 'Các cấu kiện và bộ phận được sản xuất từ Ash.',
                    href: '/products-solutions/furniture-components',
                  },
                  {
                    title: 'Sơn & hoàn thiện bề mặt',
                    body: 'Các phương án hoàn thiện phù hợp với Ash.',
                    href: '/products-solutions/finishing',
                  },
                  {
                    title: 'Kiểm soát độ ẩm',
                    body: 'Các hoạt động kiểm soát vật liệu trong sản xuất.',
                    href: '/resources/manufacturing-notes',
                  },
                ].map((item) => (
                  <Link to={toLocalizedPath(item.href)} key={item.title}>
                    <span aria-hidden="true">✓</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                    <b aria-hidden="true">›</b>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <section className="materials-ash-cta">
            <div className="materials-ash-cta-image-slot">
              <img
                src="/assets/materials/solid-wood/ash/cta/project-consultation.webp"
                alt={t('Trao đổi về vật liệu Ash cho dự án của bạn')}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="materials-ash-cta-copy">
              <h2>{t('Trao đổi về vật liệu Ash cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng gỗ Ash và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-ash-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
          </section>
        </section>
      )}
      {isMaterialsRubberWoodPage && (
        <section className="materials-rubber-wood-content">
          <section className="materials-rubber-wood-overview">
            <h2>{t('1. Tổng quan vật liệu')}</h2>
            <div className="materials-rubber-wood-overview-grid">
              {[
                {
                  title: 'Tên thương mại',
                  body: 'Rubberwood',
                  image: '/assets/materials/solid-wood/rubber-wood/overview/commercial-name.png',
                },
                {
                  title: 'Nguồn gốc',
                  body: 'Cây cao su sau chu kỳ khai thác mủ.',
                  image: '/assets/materials/solid-wood/rubber-wood/overview/source.png',
                },
                {
                  title: 'Màu sắc tự nhiên',
                  body: 'Từ trắng kem đến vàng nhạt.',
                  image: '/assets/materials/solid-wood/rubber-wood/overview/natural-color.png',
                },
                {
                  title: 'Đặc điểm vân gỗ',
                  body: 'Vân tương đối đều, nhẹ và dễ hoàn thiện.',
                  image: '/assets/materials/solid-wood/rubber-wood/overview/wood-grain.png',
                },
                {
                  title: 'Khả năng gia công',
                  body: 'Gia công tốt bằng các phương pháp cắt, tiện, CNC, khoan và lắp ráp.',
                  image: '/assets/materials/solid-wood/rubber-wood/overview/machining.png',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-rubber-wood-overview-image-slot">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rubber-wood-features">
            <h2>{t('2. Đặc điểm nổi bật')}</h2>
            <div className="materials-rubber-wood-card-grid">
              {[
                {
                  title: 'Nguồn cung ổn định',
                  body: 'Nguồn cung dồi dào từ diện tích cao su lớn, đảm bảo tính ổn định và lịch sản xuất.',
                  image: '/assets/materials/solid-wood/rubber-wood/features/stable-supply.webp',
                },
                {
                  title: 'Dễ gia công',
                  body: 'Gia công tốt, ít gây mẻ, phù hợp với nhiều phương pháp cắt, tiện, CNC, khoan và lắp ráp.',
                  image: '/assets/materials/solid-wood/rubber-wood/features/easy-machining.webp',
                },
                {
                  title: 'Hoàn thiện linh hoạt',
                  body: 'Dễ chấp nhận nhiều hệ thống hoàn thiện: stain, sơn PU, sơn NC, sơn màu và các hiệu ứng khác.',
                  image: '/assets/materials/solid-wood/rubber-wood/features/flexible-finishing.webp',
                },
                {
                  title: 'Màu sắc sáng',
                  body: 'Màu sáng tự nhiên giúp sản phẩm dễ phối màu, tạo cảm giác hiện đại và tinh tế.',
                  image: '/assets/materials/solid-wood/rubber-wood/features/light-color.webp',
                },
                {
                  title: 'Thích hợp sản xuất hàng loạt',
                  body: 'Tính chất ổn định, đồng nhất, phù hợp cho sản xuất quy mô lớn và kiểm soát chất lượng.',
                  image: '/assets/materials/solid-wood/rubber-wood/features/mass-production.webp',
                },
                {
                  title: 'Giá trị kinh tế tốt',
                  body: 'Chi phí hợp lý, tối ưu hiệu quả đầu tư cho các dự án xuất khẩu và OEM/ODM.',
                  image: '/assets/materials/solid-wood/rubber-wood/features/economic-value.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-rubber-wood-card-image-slot">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rubber-wood-applications">
            <h2>{t('3. Ứng dụng trong nội thất')}</h2>
            <div className="materials-rubber-wood-card-grid">
              {[
                {
                  title: 'Ghế',
                  body: 'Ghế ăn, ghế cafe, ghế bar và ghế làm việc với thiết kế đa dạng.',
                  image: '/assets/materials/solid-wood/rubber-wood/applications/chair.webp',
                },
                {
                  title: 'Bàn',
                  body: 'Bàn ăn, bàn cafe, bàn làm việc, bàn trà và các loại bàn khác.',
                  image: '/assets/materials/solid-wood/rubber-wood/applications/table.webp',
                },
                {
                  title: 'Tủ & lưu trữ',
                  body: 'Tủ quần áo, tủ kệ, tủ bếp, kệ trang trí và giải pháp lưu trữ khác.',
                  image: '/assets/materials/solid-wood/rubber-wood/applications/storage.webp',
                },
                {
                  title: 'Giường',
                  body: 'Giường đôi, giường trẻ em, giường tầng và các thiết kế theo yêu cầu.',
                  image: '/assets/materials/solid-wood/rubber-wood/applications/bed.webp',
                },
                {
                  title: 'Cấu kiện nội thất',
                  body: 'Khung ghế, chân bàn, thanh giường, khung tủ và các cấu kiện lắp ráp khác.',
                  image: '/assets/materials/solid-wood/rubber-wood/applications/components.webp',
                },
                {
                  title: 'Nội thất dự án',
                  body: 'Sản phẩm cho dự án khách sạn, resort, căn hộ, văn phòng và không gian công cộng.',
                  image: '/assets/materials/solid-wood/rubber-wood/applications/project-furniture.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-rubber-wood-card-image-slot">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rubber-wood-finishing">
            <h2>{t('4. Khả năng hoàn thiện bề mặt')}</h2>
            <div className="materials-rubber-wood-finishing-grid">
              {[
                {
                  title: 'Stain',
                  body: 'Tôn vân gỗ tự nhiên, màu sắc ấm áp và sang trọng.',
                  image: '/assets/materials/solid-wood/rubber-wood/finishes/stain.webp',
                },
                {
                  title: 'Natural Finish',
                  body: 'Giữ màu gỗ tự nhiên, trong trẻo, tinh tế và hiện đại.',
                  image: '/assets/materials/solid-wood/rubber-wood/finishes/natural-finish.webp',
                },
                {
                  title: 'Lacquer',
                  body: 'Bề mặt mịn, bền màu, dễ vệ sinh và bảo trì.',
                  image: '/assets/materials/solid-wood/rubber-wood/finishes/lacquer.webp',
                },
                {
                  title: 'Matte Finish',
                  body: 'Hiệu ứng mờ cao cấp, chống bám vân tay, cảm giác tự nhiên.',
                  image: '/assets/materials/solid-wood/rubber-wood/finishes/matte-finish.webp',
                },
                {
                  title: 'Color Finish',
                  body: 'Sơn màu đa dạng, đáp ứng yêu cầu thiết kế riêng.',
                  image: '/assets/materials/solid-wood/rubber-wood/finishes/color-finish.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-rubber-wood-finish-image-slot">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="materials-rubber-wood-control-supply-row">
            <section className="materials-rubber-wood-control">
              <h2>{t('5. Những yếu tố cần kiểm soát')}</h2>
              <div className="materials-rubber-wood-control-list">
                {[
                  {
                    title: 'Độ ẩm vật liệu',
                    body: 'Kiểm soát độ ẩm phù hợp để hạn chế cong vênh, nứt nẻ và đảm bảo độ ổn định.',
                  },
                  {
                    title: 'Màu sắc',
                    body: 'Đồng nhất màu gỗ giữa các lô và giữa các chi tiết trong cùng một sản phẩm.',
                  },
                  {
                    title: 'Chất lượng ghép thanh',
                    body: 'Đảm bảo keo ghép đạt tiêu chuẩn, mối ghép chắc chắn và thẩm mỹ cao.',
                  },
                  {
                    title: 'Hoàn thiện bề mặt',
                    body: 'Bám dính tốt, bề mặt mịn, màu sắc đồng đều và đạt yêu cầu kỹ thuật.',
                  },
                  {
                    title: 'Đóng gói',
                    body: 'Bảo vệ sản phẩm trong quá trình vận chuyển, đảm bảo đến nơi trong tình trạng tốt nhất.',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <span aria-hidden="true">✓</span>
                    <div>
                      <h3>{t(item.title)}</h3>
                      <p>{t(item.body)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="materials-rubber-wood-supply">
              <h2>{t('6. Gỗ cao su trong hệ thống cung ứng của ANSLIFE')}</h2>
              <div className="materials-rubber-wood-supply-intro">
                <div className="materials-rubber-wood-supply-image-slot">
                  <img
                    src="/assets/materials/solid-wood/rubber-wood/supply/supply-chain-overview.webp"
                    alt={t('Tổng quan chuỗi cung ứng gỗ cao su')}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <p>
                    {t(
                      'ANSLIFE hỗ trợ khách hàng phát triển sản phẩm, lựa chọn vật liệu phù hợp, đánh giá tính khả thi sản xuất và tổ chức chuỗi cung ứng cho các dự án sử dụng gỗ cao su tại Việt Nam.',
                    )}
                  </p>
                  <p>
                    {t(
                      'Gỗ cao su có thể được ứng dụng cho sản phẩm hoàn thiện, cấu kiện nội thất, chương trình OEM/ODM và các dự án xuất khẩu đến Mỹ, Châu Âu, Nhật Bản và nhiều thị trường khác.',
                    )}
                  </p>
                </div>
              </div>
              <div className="materials-rubber-wood-supply-steps">
                {[
                  {
                    title: 'Tư vấn & phát triển SP',
                    image: '/assets/materials/solid-wood/rubber-wood/supply/product-development.webp',
                  },
                  {
                    title: 'Đánh giá tính khả thi',
                    image: '/assets/materials/solid-wood/rubber-wood/supply/feasibility-assessment.webp',
                  },
                  {
                    title: 'Sản xuất & kiểm soát chất lượng',
                    image: '/assets/materials/solid-wood/rubber-wood/supply/production-quality-control.webp',
                  },
                  {
                    title: 'Quản lý chuỗi cung ứng',
                    image: '/assets/materials/solid-wood/rubber-wood/supply/supply-chain-management.webp',
                  },
                ].map((item) => (
                  <article key={item.title}>
                    <div className="materials-rubber-wood-supply-step-image-slot">
                      <img src={item.image} alt="" loading="lazy" decoding="async" />
                    </div>
                    <p>{t(item.title)}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section className="materials-rubber-wood-related">
            <h2>{t('7. Liên kết với các nội dung liên quan')}</h2>
            <div className="materials-rubber-wood-related-grid">
              {[
                {
                  title: 'Nội thất hoàn thiện',
                  body: 'Khám phá các dòng sản phẩm nội thất do ANSLIFE sản xuất.',
                  image: '/assets/materials/solid-wood/rubber-wood/related/finished-furniture.webp',
                },
                {
                  title: 'Cấu kiện nội thất',
                  body: 'Tìm hiểu các cấu kiện và linh kiện nội thất.',
                  image: '/assets/materials/solid-wood/rubber-wood/related/furniture-components.webp',
                },
                {
                  title: 'Sơn & hoàn thiện bề mặt',
                  body: 'Các hệ thống sơn và hoàn thiện phù hợp cho gỗ cao su.',
                  image: '/assets/materials/solid-wood/rubber-wood/related/finishing-surface.webp',
                },
                {
                  title: 'Kiểm soát độ ẩm',
                  body: 'Giải pháp kiểm soát độ ẩm trong sản xuất và lưu kho.',
                  image: '/assets/materials/solid-wood/rubber-wood/related/moisture-control.webp',
                },
              ].map((item) => (
                <article key={item.title}>
                  <div className="materials-rubber-wood-related-image-slot">
                    <img src={item.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                    <span aria-hidden="true">→</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="materials-rubber-wood-cta">
            <div className="materials-rubber-wood-cta-image-slot">
              <img
                src="/assets/materials/solid-wood/rubber-wood/cta/project-furniture-consultation.webp"
                alt={t('Tư vấn ứng dụng gỗ cao su cho sản phẩm nội thất')}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="materials-rubber-wood-cta-copy">
              <h2>{t('8. Trao đổi về vật liệu gỗ cao su cho dự án của bạn')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng gỗ cao su và đề xuất phương án phù hợp.',
                )}
              </p>
              <div className="materials-rubber-wood-cta-actions">
                <a href="/vn/contact">
                  <span aria-hidden="true">✈</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">⇧</span>
                  {t('Tải bản vẽ lên')}
                </a>
                <a href="/vn/contact">
                  <span aria-hidden="true">☎</span>
                  {t('Liên hệ ANSLIFE')}
                </a>
              </div>
            </div>
            <div className="materials-rubber-wood-cta-image-slot">
              <img
                src="/assets/materials/solid-wood/rubber-wood/cta/technical-drawing-review.webp"
                alt={t('Đánh giá bản vẽ kỹ thuật cho dự án gỗ cao su')}
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>
        </section>
      )}
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
                <a href="/contact/request-quotation">{t('Gửi yêu cầu')} →</a>
                <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')} →</a>
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
                <a className="is-primary" href="/contact/request-quotation">
                  {t('Gửi yêu cầu')} →
                </a>
                <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')} →</a>
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
              <a className="is-primary" href="/contact/request-quotation">
                <span className="resources-export-knowledge-cta-icon resources-export-knowledge-cta-icon--book" aria-hidden="true" />
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">
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
              <a className="is-primary" href="/contact/request-quotation">
                <span className="resources-manufacturing-notes-cta-icon resources-manufacturing-notes-cta-icon--book" aria-hidden="true" />
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">
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
      {isSupplyHubPartnerStandardRoomPage && (
        <section className="supply-hub-partner-standard-room">
          <div className="supply-hub-partner-standard-room-intro">
            <span>{t('Vietnam Supply Hub')}</span>
            <h1>{t('Phòng mẫu chuẩn đối tác')}</h1>
            <p>
              {t(
                'ANSLIFE quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC trong một không gian tham chiếu thống nhất cho từng đối tác.',
              )}
            </p>
          </div>
          <div className="supply-hub-partner-standard-room-grid">
            {supplyHubPartnerStandardRoomLinks.map((item, index) => (
              <article key={item.href} className="supply-hub-partner-standard-room-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{t(item.title)}</h2>
                <p>{t(item.description)}</p>
                <Link to={toLocalizedPath(item.href)}>
                  {t('Xem chi tiết')}
                  <b aria-hidden="true">→</b>
                </Link>
              </article>
            ))}
          </div>
        </section>
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
              <a className="is-primary" href="/contact/request-quotation">
                <span className="quality-control-overview-action-icon quality-control-overview-action-icon--upload" aria-hidden="true" />
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">
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
              <a className="is-primary" href="/contact/request-quotation">
                <span className="quality-control-qc-process-action-icon quality-control-qc-process-action-icon--upload" aria-hidden="true" />
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">
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
              <a className="is-primary" href="/contact/request-quotation">
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">
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
              ].map(([step, image], index) => (
                <div key={step}>
                  <span className="quality-control-in-process-inspection-location-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
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
                <a className="is-primary" href="/contact/request-quotation">
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')}</a>
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
                <a className="is-primary" href="/contact/request-quotation">
                  <span className="quality-control-packing-standard-cta-icon quality-control-packing-standard-cta-icon--upload" aria-hidden="true" />
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/about-anslife/company-info">
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
      {shouldShowQualityControlBuyerSpecificStandardsBanner && (
        <figure className="quality-control-buyer-specific-standards-banner">
          <img
            src="/assets/quality-control/buyer-specific-standards/banner.webp"
            alt={t('Banner tiêu chuẩn riêng của buyer')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="quality-control-buyer-specific-standards-banner-copy">
            <h1>{t('Tiêu chuẩn riêng của Buyer')}</h1>
            <span>
              {t(
                'Quản lý và triển khai các tiêu chuẩn riêng theo yêu cầu của từng khách hàng và từng thị trường.',
              )}
            </span>
            <p>
              {t(
                'ANSLIFE hỗ trợ tiếp nhận, quản lý và triển khai các tiêu chuẩn này xuyên suốt quá trình sản xuất nhằm đâm bảo tính nhất quán giữa mẫu duyệt, sản xuất hàng loạt và các đơn hàng lập lại.',
              )}
            </p>
          </figcaption>
        </figure>
      )}
      {isQualityControlBuyerSpecificStandardsPage && (
        <section
          className="quality-control-buyer-specific-standards-content"
          aria-labelledby="quality-control-buyer-specific-standards-managed-title"
        >
          <section className="quality-control-buyer-specific-standards-panel">
            <h2 id="quality-control-buyer-specific-standards-managed-title">
              {`1. ${t('Những tiêu chuẩn nào có thể được quản lý?')}`}
            </h2>
            <div className="quality-control-buyer-specific-standards-grid">
              {[
                {
                  number: '01',
                  title: 'Tiêu chuẩn sản phẩm',
                  body: 'Yêu cầu về kích thước, kết cấu, dung sai và chức năng sử dụng của sản phẩm.',
                  examples: 'Ví dụ: Kích thước, Dung sai, Khả năng chịu tải, Tiêu chuẩn lắp ráp.',
                },
                {
                  number: '02',
                  title: 'Tiêu chuẩn vật liệu',
                  body: 'Yêu cầu về chủng loại, nguồn gốc và đặc tính vật liệu sử dụng.',
                  examples: 'Ví dụ: Loại gỗ, Veneer, Foam, Vải, Da, Vật liệu tự nhiên.',
                },
                {
                  number: '03',
                  title: 'Tiêu chuẩn hoàn thiện',
                  body: 'Yêu cầu về màu sắc, stain, độ bóng, độ mờ và chất lượng bề mặt.',
                  examples: 'Ví dụ: Mẫu màu, Bảng stain, Gloss level, Matte finish, Oil finish.',
                },
                {
                  number: '04',
                  title: 'Tiêu chuẩn chất lượng',
                  body: 'Các tiêu chí đánh giá sản phẩm trong quá trình kiểm tra và nghiệm thu.',
                  examples: 'Ví dụ: Checklist QC, Tiêu chí chấp nhận lỗi, Phương pháp kiểm tra.',
                },
                {
                  number: '05',
                  title: 'Tiêu chuẩn báo cáo',
                  body: 'Yêu cầu về nội dung và hình thức báo cáo kiểm tra.',
                  examples: 'Ví dụ: Mẫu báo cáo QC, Hình ảnh bắt buộc, Hồ sơ lưu trữ.',
                },
              ].map((item) => (
                <article key={item.number}>
                  <h3>
                    <span>{`${item.number}.`}</span>
                    {t(item.title)}
                  </h3>
                  <div
                    className="quality-control-buyer-specific-standards-image-slot"
                    aria-hidden="true"
                  />
                  <p>{t(item.body)}</p>
                  <p>{t(item.examples)}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-buyer-specific-standards-panel quality-control-buyer-specific-standards-process">
            <h2>{`2. ${t('Quy trình quản lý tiêu chuẩn Buyer')}`}</h2>
            <div className="quality-control-buyer-specific-standards-process-flow">
              {[
                {
                  number: '01',
                  title: 'Tiếp nhận tiêu chuẩn',
                  body: 'Thu thập các tài liệu, tiêu chuẩn và yêu cầu liên quan từ buyer.',
                  bullets: [],
                },
                {
                  number: '02',
                  title: 'Rà soát & xác nhận',
                  body: 'Đánh giá tính khả thi và làm rõ các yêu cầu trước khi triển khai.',
                  bullets: [],
                },
                {
                  number: '03',
                  title: 'Lưu trữ hồ sơ',
                  body: 'Thiết lập hồ sơ tiêu chuẩn riêng cho từng buyer và từng dự án.',
                  bullets: [],
                },
                {
                  number: '04',
                  title: 'Triển khai sản xuất',
                  body: 'Chuyển đổi tiêu chuẩn thành các yêu cầu cụ thể cho vật liệu, sản xuất, QC và đóng gói.',
                  bullets: [],
                },
                {
                  number: '05',
                  title: 'Kiểm tra & đối chiếu',
                  body: 'Mọi hoạt động kiểm tra đều được đối chiếu với tiêu chuẩn đã được xác nhận.',
                  bullets: [],
                },
                {
                  number: '06',
                  title: 'Lưu cho đơn hàng lặp lại',
                  body: 'Tiêu chuẩn được lưu giữ nhằm đảm bảo tính nhất quán giữa các đợt sản xuất.',
                  bullets: [],
                },
              ].map((item, index) => (
                <div className="quality-control-buyer-specific-standards-process-step-wrap" key={item.number}>
                  <article>
                    <h3>
                      <span>{item.number}</span>
                    </h3>
                    <h4>{t(item.title)}</h4>
                    <div
                      className="quality-control-buyer-specific-standards-process-image-slot"
                      aria-hidden="true"
                    />
                    <p>{t(item.body)}</p>
                    {item.bullets.length > 0 && (
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                  {index < 5 && (
                    <span
                      className="quality-control-buyer-specific-standards-process-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="quality-control-buyer-specific-standards-panel quality-control-buyer-specific-standards-system">
            <h2>{`3. ${t('Hệ thống quản lý tiêu chuẩn Buyer')}`}</h2>
            <div className="quality-control-buyer-specific-standards-system-grid">
              {[
                {
                  number: '01',
                  title: 'Hồ sơ kỹ thuật',
                  bullets: ['Bản vẽ', 'Thông số kỹ thuật', 'BOM'],
                },
                {
                  number: '02',
                  title: 'Mẫu duyệt',
                  bullets: ['Mẫu sản phẩm', 'Mẫu cấu kiện', 'Mẫu vật liệu'],
                },
                {
                  number: '03',
                  title: 'Bảng màu & hoàn thiện',
                  bullets: ['Stain', 'Color Sample', 'Finish Sample'],
                },
                {
                  number: '04',
                  title: 'Checklist QC',
                  bullets: ['Tiêu chuẩn kiểm tra', 'Tiêu chí chấp nhận'],
                },
                {
                  number: '05',
                  title: 'Tiêu chuẩn đóng gói',
                  bullets: ['Carton', 'Label', 'Pallet', 'Container'],
                },
              ].map((item) => (
                <article key={item.number}>
                  <h3>
                    <span>{`${item.number}.`}</span>
                    {t(item.title)}
                  </h3>
                  <div
                    className="quality-control-buyer-specific-standards-system-image-slot"
                    aria-hidden="true"
                  />
                  <ul>
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{t(bullet)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-buyer-specific-standards-panel quality-control-buyer-specific-standards-importance">
            <h2>{`4. ${t('Tại sao điều này quan trọng?')}`}</h2>
            <div className="quality-control-buyer-specific-standards-importance-flow">
              {[
                'Tiêu chuẩn Buyer',
                'Sản xuất đúng yêu cầu',
                'Kiểm tra đúng tiêu chuẩn',
                'Đóng gói đúng quy cách',
                'Giao hàng đúng cam kết',
                'Giảm khiếu nại',
              ].map((item, index, items) => (
                <div
                  className="quality-control-buyer-specific-standards-importance-step-wrap"
                  key={item}
                >
                  <article>
                    <div
                      className="quality-control-buyer-specific-standards-importance-image-slot"
                      aria-hidden="true"
                    />
                    <h3>{t(item)}</h3>
                  </article>
                  {index < items.length - 1 && (
                    <span
                      className="quality-control-buyer-specific-standards-importance-arrow"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="quality-control-buyer-specific-standards-panel quality-control-buyer-specific-standards-standard-room">
            <div className="quality-control-buyer-specific-standards-standard-room-copy">
              <h2>{`5. ${t('Liên kết với Phòng mẫu chuẩn đối tác')}`}</h2>
              <p>
                {t(
                  'ANSLIFE có thể lưu trữ và quản lý tiêu chuẩn riêng của từng buyer trong hệ thống Phòng mẫu chuẩn đối tác, bao gồm:',
                )}
              </p>
              <ul>
                {[
                  'Mẫu sản phẩm đã duyệt',
                  'Mẫu vật liệu',
                  'Bảng màu',
                  'Bản vẽ kỹ thuật',
                  'Checklist QC',
                  'Tiêu chuẩn đóng gói',
                  'Hồ sơ báo cáo chất lượng',
                ].map((item) => (
                  <li key={item}>{t(item)}</li>
                ))}
              </ul>
              <p>
                {t(
                  'Điều này giúp duy trì tính nhất quán giữa nhiều nhà máy, nhiều dự án và nhiều năm hợp tác.',
                )}
              </p>
            </div>
            <div
              className="quality-control-buyer-specific-standards-standard-room-image-slot"
              aria-hidden="true"
            />
          </section>
          <section className="quality-control-buyer-specific-standards-panel quality-control-buyer-specific-standards-buyer-examples">
            <h2>{`6. ${t('Buyer tiêu biểu thường có những gì?')}`}</h2>
            <div className="quality-control-buyer-specific-standards-buyer-grid">
              {[
                {
                  name: 'Buyer A',
                  items: [
                    'QC Checklist',
                    'Packaging Guideline',
                    'Color Standard',
                    'Product Specification',
                  ],
                },
                {
                  name: 'Buyer B',
                  items: [
                    'Approved Sample',
                    'Material Standard',
                    'Inspection Method',
                    'Reporting Format',
                  ],
                },
                {
                  name: 'Buyer C',
                  items: [
                    'Product Manual',
                    'Finish Standard',
                    'Label Requirement',
                    'Shipping Requirement',
                  ],
                },
              ].map((buyer) => (
                <article key={buyer.name}>
                  <div
                    className="quality-control-buyer-specific-standards-buyer-image-slot"
                    aria-hidden="true"
                  />
                  <div className="quality-control-buyer-specific-standards-buyer-copy">
                    <h3>{buyer.name}</h3>
                    <ul>
                      {buyer.items.map((item) => (
                        <li key={item}>{t(item)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="quality-control-buyer-specific-standards-panel quality-control-buyer-specific-standards-cta">
            <div className="quality-control-buyer-specific-standards-cta-copy">
              <h2>{t('Trao đổi về tiêu chuẩn riêng của Buyer')}</h2>
              <p>
                {t(
                  'Buyer có thể gửi tiêu chuẩn sản phẩm, checklist QC, bảng màu, mẫu duyệt hoặc yêu cầu đóng gói để ANSLIFE tiếp nhận, rà soát và đề xuất phương án quản lý phù hợp.',
                )}
              </p>
            </div>
            <div className="quality-control-buyer-specific-standards-cta-actions">
              <a className="is-primary" href="/contact/request-quotation">
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')}</a>
            </div>
          </section>
        </section>
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
                <a className="is-primary" href="/contact/request-quotation">
                  <span className="quality-control-inspection-report-cta-icon quality-control-inspection-report-cta-icon--upload" aria-hidden="true" />
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/about-anslife/company-info">
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
              <a className="is-primary" href="/contact/request-quotation">
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')}</a>
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
              <a className="is-primary" href="/contact/request-quotation">
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">{t('Liên hệ ANSLIFE')}</a>
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
              <a className="is-primary" href="/contact/request-quotation">
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">
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
              <a href="/contact/request-quotation">
                <span className="supply-hub-qc-checklist-action-icon supply-hub-qc-checklist-action-icon--document" aria-hidden="true" />
                {t('Gửi yêu cầu')}
              </a>
              <a href="/about-anslife/company-info">
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
                <a className="is-primary" href="/contact/request-quotation">
                  <span className="supply-hub-packing-standards-action-icon supply-hub-packing-standards-action-icon--upload" aria-hidden="true" />
                  {t('Gửi yêu cầu')}
                </a>
                <a href="/about-anslife/company-info">
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
              <a href="/contact/request-quotation">
                <b aria-hidden="true">✈</b>
                <span>{t('Gửi yêu cầu')}</span>
              </a>
              <a href="/about-anslife/company-info">
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
              <a href="/contact/request-quotation">
                <span>{t('Gửi yêu cầu')}</span>
                <b aria-hidden="true">→</b>
              </a>
              <a href="/about-anslife/company-info">
                <span>{t('Liên hệ ANSLIFE')}</span>
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
                <a href="/contact/request-quotation">
                  <span>{t('Gửi yêu cầu')}</span>
                  <b aria-hidden="true">→</b>
                </a>
                <a href="/about-anslife/company-info">
                  <span>{t('Liên hệ ANSLIFE')}</span>
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
              <a className="supply-hub-material-storage-cta-primary" href="/contact/request-quotation">
                {t('Gửi yêu cầu')}
              </a>
              <a className="supply-hub-material-storage-cta-secondary" href="/about-anslife/company-info">
                {t('Liên hệ ANSLIFE')}
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
                <a className="supply-hub-export-doc-cta-primary" href="/contact/request-quotation">
                  {t('Gửi yêu cầu')}
                  <span aria-hidden="true">→</span>
                </a>
                <a className="supply-hub-export-doc-cta-secondary" href="/about-anslife/company-info">
                  {t('Liên hệ ANSLIFE')}
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
                <a className="supply-hub-weekly-cta-primary" href="/contact/request-quotation">
                  <span aria-hidden="true">↗</span>
                  {t('Gửi yêu cầu')}
                </a>
                <a className="supply-hub-weekly-cta-secondary" href="/about-anslife/company-info">
                  <span aria-hidden="true">☏</span>
                  {t('Liên hệ ANSLIFE')}
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
              <a className="supply-hub-lcl-fcl-cta-primary" href="/contact/request-quotation">
                {t('Gửi yêu cầu')}
              </a>
              <a className="supply-hub-lcl-fcl-cta-secondary" href="/about-anslife/company-info">
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
              <a href="/contact/request-quotation">
                <span>{t('Gửi yêu cầu')}</span>
                <b aria-hidden="true">→</b>
              </a>
              <a href="/about-anslife/company-info">
                <span>{t('Liên hệ ANSLIFE')}</span>
                <b aria-hidden="true">☏</b>
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
              <a href="/contact/request-quotation">
                <span>{t('Gửi yêu cầu')}</span>
                <b aria-hidden="true">→</b>
              </a>
              <a href="/about-anslife/company-info">
                <span>{t('Liên hệ ANSLIFE')}</span>
                <b aria-hidden="true">☏</b>
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
