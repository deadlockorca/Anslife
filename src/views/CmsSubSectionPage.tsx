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
  const shouldRenderBlankScholarshipPage =
    config.slug === 'about-anslife' && section.id === 'scholarship-community';
  const shouldRenderBlankQualityInProcessPage =
    config.slug === 'quality-control' && section.id === 'in-process-inspection';
  const shouldRenderBlankSubSectionPage =
    shouldRenderBlankScholarshipPage ||
    shouldRenderBlankQualityInProcessPage ||
    isSupplyHubOverviewPage;
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
      {isSupplyHubOverviewPage && (
        <section className="supply-hub-overview-content">
          <div className="supply-hub-overview-main-grid">
            <div className="supply-hub-overview-left">
              <section className="supply-hub-overview-block">
                <h2>{t('Vietnam Supply Hub là gì?')}</h2>
                <div className="supply-hub-overview-definition">
                  <article>
                    <i className="supply-hub-overview-feature-icon supply-hub-overview-feature-icon-network" />
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
                    <i className="supply-hub-overview-feature-icon supply-hub-overview-feature-icon-warehouse" />
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
                    <i className="supply-hub-overview-feature-icon supply-hub-overview-feature-icon-shield" />
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
                    ['contact', 'Một đầu mối làm việc'],
                    ['box', 'Tối ưu tồn kho'],
                    ['forklift', 'Gom hàng linh hoạt'],
                    ['progress', 'Kiểm soát tiến độ và chất lượng'],
                    ['document', 'Hỗ trợ chứng từ xuất khẩu'],
                    ['calendar', 'Phù hợp với lịch xuất hàng định kỳ'],
                  ].map(([icon, item], index) => (
                    <article key={item}>
                      <i className={`supply-hub-overview-image-slot supply-hub-overview-image-slot-${icon}`} />
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
                    ],
                    [
                      '02',
                      'Inventory Buffer Support',
                      'Hỗ trợ lưu giữ hàng hóa, vật liệu hoặc các mặt hàng có khối lượng giao hàng nhất định theo kế hoạch buyer.',
                    ],
                    [
                      '03',
                      'Consolidation Management',
                      'Gom hàng từ nhiều nguồn cung hoặc nhiều nhóm sản phẩm để tối ưu container và chi phí vận hành.',
                    ],
                    [
                      '04',
                      'Export Coordination',
                      'Theo dõi kế hoạch xuất hàng, phối hợp đóng gói, lịch giao và các bước liên quan đến vận chuyển.',
                    ],
                    [
                      '05',
                      'Documentation Support',
                      'Hỗ trợ chuẩn bị và kiểm tra chứng từ xuất khẩu theo yêu cầu buyer hoặc đơn vị logistics.',
                    ],
                    [
                      '06',
                      'Partner Sample Room',
                      'Lưu giữ, đối chiếu và quản lý mẫu chuẩn phục vụ phát triển sản phẩm và kiểm tra chất lượng.',
                    ],
                  ].map(([number, title, description]) => (
                    <article key={number}>
                      <i className="supply-hub-overview-image-slot" />
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
                    ],
                    [
                      'Importers & Distributors',
                      'Nhà nhập khẩu, phân phối cần gom nhiều nhóm hàng và xuất hàng định kỳ.',
                    ],
                    [
                      'Furniture Brands',
                      'Thương hiệu nội thất cần lưu mẫu, lưu hàng, quản lý vật liệu và phát triển sản phẩm.',
                    ],
                    [
                      'OEM / ODM Customers',
                      'Khách hàng cần sản xuất, lưu kho, gom hàng và xuất hàng theo kế hoạch riêng.',
                    ],
                  ].map(([title, description]) => (
                    <article key={title}>
                      <i className="supply-hub-overview-image-slot" />
                      <h3>{t(title)}</h3>
                      <p>{t(description)}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
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
