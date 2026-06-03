export const SITE_NAME = 'ANSLIFE - Manufacturing & Export Ecosystem';
export const DEFAULT_SITE_URL = 'https://anslife.net';

export type SocialKey = 'facebook' | 'instagram' | 'youtube' | 'tiktok';

export interface SocialLink {
  key: SocialKey;
  label: string;
  url: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    url: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL || 'https://facebook.com',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    url: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL || 'https://instagram.com',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    url: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL || 'https://youtube.com',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    url: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK_URL || 'https://tiktok.com',
  },
];

export interface MenuChildItem {
  label: string;
  path: string;
  children?: MenuChildItem[];
}

export interface TopMenuItem {
  label: string;
  path: string;
  children?: MenuChildItem[];
}

export interface SectionItem {
  id: string;
  title: string;
  description: string;
  path?: string;
}

export interface StaticPageConfig {
  path: string;
  title: string;
  slug: string;
  summary: string;
  sections: SectionItem[];
}

export const PRODUCTS_AND_SOLUTIONS_MENU: MenuChildItem[] = [
  {
    label: 'Nội thất hoàn thiện',
    path: '/products-solutions/finished-furniture',
  },
  {
    label: 'Cấu kiện nội thất',
    path: '/products-solutions/furniture-components',
  },
  {
    label: 'Cung ứng vật liệu',
    path: '/products-solutions/materials-supply',
    children: [
      {
        label: 'Tổng quan dịch vụ cung ứng vật liệu',
        path: '/products-solutions/materials-supply',
      },
    ],
  },
  {
    label: 'Giải pháp vận hành & cung ứng',
    path: '/products-solutions/operations-supply-solutions',
  },
];

export const TOP_MENU: TopMenuItem[] = [
  {
    label: 'Trang chủ',
    path: '/',
  },
  {
    label: 'Về ANSLIFE',
    path: '/about-anslife',
    children: [
      { label: 'Triết lý', path: '/about-anslife/philosophy' },
      { label: 'Tổng quan công ty', path: '/about-anslife/company-intro' },
      { label: 'Lịch sử phát triển', path: '/about-anslife/development-history' },
      { label: 'Phụng sự xã hội', path: '/about-anslife/scholarship-community' },
      { label: 'Thông tin liên hệ', path: '/about-anslife/company-info' },
    ],
  },
  {
    label: 'Sản phẩm & Giải pháp',
    path: '/products-solutions',
    children: PRODUCTS_AND_SOLUTIONS_MENU,
  },
  {
    label: 'Nguyên liệu',
    path: '/materials',
    children: [
      {
        label: 'Gỗ tự nhiên',
        path: '/materials/solid-wood',
        children: [
          { label: 'Gỗ cao su', path: '/materials/solid-wood/rubber-wood' },
          { label: 'Ash', path: '/materials/solid-wood/ash' },
          { label: 'Oak', path: '/materials/solid-wood/oak' },
          { label: 'Beech', path: '/materials/solid-wood/beech' },
          { label: 'Acacia', path: '/materials/solid-wood/acacia' },
          { label: 'Pine', path: '/materials/solid-wood/pine' },
        ],
      },
      {
        label: 'Gỗ kỹ thuật',
        path: '/materials/engineered-wood',
        children: [
          { label: 'Plywood', path: '/materials/engineered-wood/plywood' },
          { label: 'MDF', path: '/materials/engineered-wood/mdf' },
          {
            label: 'Ván dăm',
            path: '/materials/engineered-wood/particle-board',
          },
          {
            label: 'Ván phủ bề mặt',
            path: '/materials/engineered-wood/laminated-board',
          },
        ],
      },
      {
        label: 'Vật liệu tự nhiên',
        path: '/materials/natural-materials',
        children: [
          { label: 'Mây', path: '/materials/natural-materials/rattan' },
          { label: 'Tre', path: '/materials/natural-materials/bamboo' },
          { label: 'Mặt đan mây', path: '/materials/natural-materials/cane-webbing' },
        ],
      },
      {
        label: 'Vật liệu bọc nệm',
        path: '/materials/upholstery-materials',
        children: [
          { label: 'Foam', path: '/materials/upholstery-materials/foam' },
          { label: 'Vải', path: '/materials/upholstery-materials/fabric' },
          { label: 'Da / PU', path: '/materials/upholstery-materials/leather-pu' },
          { label: 'Vật liệu đệm', path: '/materials/upholstery-materials/cushion-materials' },
        ],
      },
      {
        label: 'Hoàn thiện bề mặt',
        path: '/materials/finishing',
        children: [
          { label: 'Hoàn thiện tự nhiên', path: '/materials/finishing/natural-finish' },
          { label: 'Stain', path: '/materials/finishing/stain' },
          { label: 'Lacquer', path: '/materials/finishing/lacquer' },
          { label: 'Hoàn thiện dầu', path: '/materials/finishing/oil-finish' },
          { label: 'Hoàn thiện sơn màu', path: '/materials/finishing/painted-finish' },
          { label: 'Hoàn thiện mờ', path: '/materials/finishing/matte-finish' },
        ],
      },
      {
        label: 'Vật liệu đóng gói',
        path: '/materials/packing-materials',
        children: [
          { label: 'Thùng carton', path: '/materials/packing-materials/carton' },
          { label: 'Foam bảo vệ', path: '/materials/packing-materials/foam-protection' },
          { label: 'Bảo vệ cạnh', path: '/materials/packing-materials/edge-protection' },
          { label: 'Pallet', path: '/materials/packing-materials/pallet' },
          { label: 'Đóng gói xuất khẩu', path: '/materials/packing-materials/export-packing' },
        ],
      },
    ],
  },
  {
    label: 'Sản xuất',
    path: '/manufacturing',
    children: [
      { label: 'Tổng quan nhà máy', path: '/manufacturing/factory-overview' },
      {
        label: 'Quy trình sản xuất',
        path: '/manufacturing/production-process',
        children: [
          {
            label: 'Chuẩn bị vật liệu',
            path: '/manufacturing/production-process/material-preparation',
          },
          { label: 'Cắt', path: '/manufacturing/production-process/cutting' },
          { label: 'Gia công gỗ', path: '/manufacturing/production-process/woodworking' },
          { label: 'Chà nhám', path: '/manufacturing/production-process/sanding' },
          {
            label: 'Hoàn thiện / sơn',
            path: '/manufacturing/production-process/finishing-painting',
          },
          { label: 'Lắp ráp', path: '/manufacturing/production-process/assembly' },
          { label: 'Kiểm tra', path: '/manufacturing/production-process/inspection' },
          { label: 'Đóng gói sản phẩm', path: '/manufacturing/production-process/packing' },
        ],
      },
      { label: 'Máy móc & thiết bị', path: '/manufacturing/machinery-equipment' },
      { label: 'Năng lực hoàn thiện', path: '/manufacturing/finishing-capability' },
      { label: 'Dây chuyền lắp ráp', path: '/manufacturing/assembly-line' },
      { label: 'Khu vực đóng gói', path: '/manufacturing/packing-area' },
      { label: 'Xếp container', path: '/manufacturing/container-loading' },
    ],
  },
  {
    label: 'Supply Hub Việt Nam',
    path: '/vietnam-supply-hub',
    children: [
      {
        label: 'Tổng quan mô hình Supply Hub',
        path: '/vietnam-supply-hub/overview',
      },
      {
        label: 'Lưu kho & tồn kho đệm tại Việt Nam',
        path: '/vietnam-supply-hub/storage-solution',
      },
      { label: 'Gom hàng LCL / FCL', path: '/vietnam-supply-hub/lcl-fcl-consolidation' },
      {
        label: 'Điều phối xuất hàng định kỳ',
        path: '/vietnam-supply-hub/weekly-shipment-arrangement',
      },
      {
        label: 'Lưu kho vật liệu & cấu kiện',
        path: '/vietnam-supply-hub/material-component-storage',
      },
      {
        label: 'Hỗ trợ chứng từ xuất khẩu',
        path: '/vietnam-supply-hub/export-documentation-support',
      },
      {
        label: 'Phòng mẫu chuẩn đối tác',
        path: '/vietnam-supply-hub/partner-standard-room',
        children: [
          {
            label: 'Mẫu sản phẩm đã duyệt',
            path: '/vietnam-supply-hub/partner-standard-room/approved-product-samples',
          },
          {
            label: 'Mẫu cấu kiện',
            path: '/vietnam-supply-hub/partner-standard-room/component-samples',
          },
          {
            label: 'Bản vẽ kỹ thuật',
            path: '/vietnam-supply-hub/partner-standard-room/technical-drawings',
          },
          {
            label: 'Bảng màu / hoàn thiện',
            path: '/vietnam-supply-hub/partner-standard-room/color-finish-boards',
          },
          {
            label: 'Tài liệu vật liệu',
            path: '/vietnam-supply-hub/partner-standard-room/material-references',
          },
          {
            label: 'Tiêu chuẩn đóng gói',
            path: '/vietnam-supply-hub/partner-standard-room/packing-standards',
          },
          {
            label: 'Checklist QC',
            path: '/vietnam-supply-hub/partner-standard-room/qc-checklists',
          },
        ],
      },
    ],
  },
  {
    label: 'Chất lượng & Tiêu chuẩn',
    path: '/quality-control',
    children: [
      { label: 'Tổng quan hệ thống chất lượng', path: '/quality-control' },
      { label: 'Quy trình kiểm soát chất lượng', path: '/quality-control/qc-process' },
      { label: 'Kiểm tra vật liệu', path: '/quality-control/material-inspection' },
      { label: 'Kiểm tra trong sản xuất', path: '/quality-control/in-process-inspection' },
      { label: 'Kiểm tra cuối', path: '/quality-control/final-inspection' },
      { label: 'Kiểm soát mẫu duyệt', path: '/quality-control/approved-sample-control' },
      { label: 'Kiểm soát độ ẩm', path: '/quality-control/moisture-control' },
      { label: 'Chuẩn đóng gói', path: '/quality-control/packing-standard' },
      { label: 'Báo cáo kiểm tra', path: '/quality-control/inspection-report' },
      { label: 'Tiêu chuẩn riêng của buyer', path: '/quality-control/buyer-specific-standards' },
    ],
  },
  {
    label: 'Tài nguyên',
    path: '/resources',
    children: [
      { label: 'Ghi chú sản xuất', path: '/resources/manufacturing-notes' },
      { label: 'Kiến thức xuất khẩu', path: '/resources/export-knowledge' },
      { label: 'Case Study', path: '/resources/case-studies' },
      { label: 'Cập nhật công ty', path: '/resources/company-updates' },
    ],
  },
  {
    label: 'Câu hỏi thường gặp',
    path: '/resources/faq',
  },
  {
    label: 'Liên hệ / Gửi yêu cầu',
    path: '/contact',
    children: [
      { label: 'Yêu cầu chung', path: '/contact' },
      { label: 'Yêu cầu báo giá', path: '/contact/request-quotation' },
      { label: 'Tải bản vẽ / ảnh tham chiếu', path: '/contact/upload-drawing' },
      { label: 'Yêu cầu OEM / ODM', path: '/contact/oem-odm-request' },
      { label: 'Yêu cầu Supply Hub', path: '/contact/supply-hub-inquiry' },
      { label: 'Yêu cầu thăm nhà máy', path: '/contact/factory-visit-request' },
      { label: 'Thông tin liên hệ', path: '/contact/company-info' },
    ],
  },
];

export const STATIC_PAGE_MAP: Record<string, StaticPageConfig> = {
  productSolutions: {
    path: '/products-solutions',
    title: 'Sản phẩm & Giải pháp',
    slug: 'products-solutions',
    summary: '',
    sections: [
      {
        id: 'finished-furniture',
        title: 'Nội thất hoàn thiện',
        description: 'Nhóm nội thất hoàn thiện sẵn sàng phát triển cho buyer quốc tế.',
      },
      {
        id: 'furniture-components',
        title: 'Cấu kiện nội thất',
        description: 'Cấu kiện cho ghế, bàn, tủ và các cấu phần bọc nệm.',
      },
      {
        id: 'materials-supply',
        title: 'Cung ứng vật liệu',
        description: 'Ván, gỗ tự nhiên, veneer, foam, vật liệu bọc và vật liệu đóng gói.',
      },
      {
        id: 'operations-supply-solutions',
        title: 'Giải pháp vận hành & cung ứng',
        description:
          'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.',
      },
    ],
  },
  about: {
    path: '/about-anslife',
    title: 'Về ANSLIFE',
    slug: 'about-anslife',
    summary: 'Giới thiệu doanh nghiệp, tầm nhìn, sứ mệnh và hệ giá trị cốt lõi.',
    sections: [
      {
        id: 'philosophy',
        title: 'Triết lý',
        description:
          'Quan điểm cốt lõi của ANSLIFE về chất lượng, sự ổn định, niềm tin và hợp tác dài hạn.',
      },
      {
        id: 'company-intro',
        title: 'Tổng quan công ty',
        description:
          'ANSLIFE là một hệ thống sản xuất và xuất khẩu nội thất tập trung vào chuỗi sản xuất, kiểm soát chất lượng và kết nối nguồn lực trong ngành.',
      },
      {
        id: 'development-history',
        title: 'Lịch sử phát triển',
        description: 'Các giai đoạn phát triển của ANSLIFE từ thiết kế, sản xuất đến hệ sinh thái xuất khẩu.',
      },
      {
        id: 'scholarship-community',
        title: 'Phụng sự xã hội',
        description: '',
      },
      {
        id: 'working-standards',
        title: 'Tiêu chuẩn & QC',
        description: 'Cách ANSLIFE quản lý mẫu, kỹ thuật, QC và giao tiếp dự án.',
      },
      {
        id: 'company-info',
        title: 'Thông tin công ty',
        description:
          'ANSLIFE là một hệ thống sản xuất và xuất khẩu nội thất tập trung vào chuỗi sản xuất, kiểm soát chất lượng và kết nối nguồn lực trong ngành.',
      },
    ],
  },
  materials: {
    path: '/materials',
    title: 'Nguyên liệu',
    slug: 'materials',
    summary: 'Thư viện vật liệu theo nhóm gỗ, vật liệu tự nhiên, bọc nệm, hoàn thiện và đóng gói.',
    sections: [
      {
        id: 'solid-wood',
        title: 'Gỗ tự nhiên',
        description: 'Rubber wood, Ash, Oak, Beech, Acacia và Pine.',
      },
      {
        id: 'engineered-wood',
        title: 'Gỗ kỹ thuật',
        description: 'Plywood, MDF, particle board và laminated board.',
      },
      {
        id: 'natural-materials',
        title: 'Vật liệu tự nhiên',
        description: 'Rattan, bamboo và cane webbing.',
      },
      {
        id: 'upholstery-materials',
        title: 'Vật liệu bọc nệm',
        description: 'Foam, fabric, leather / PU và vật liệu đệm.',
      },
      {
        id: 'finishing',
        title: 'Hoàn thiện bề mặt',
        description: 'Natural finish, stain, lacquer, oil, painted và matte finish.',
      },
      {
        id: 'packing-materials',
        title: 'Vật liệu đóng gói',
        description: 'Vật liệu bảo vệ hàng trong vận chuyển xuất khẩu.',
      },
      {
        id: 'furniture-materials-supplier-vietnam',
        title: 'Nhà cung ứng vật liệu nội thất Việt Nam',
        description: 'Nguồn vật liệu phục vụ sản xuất nội thất cho buyer và đối tác quốc tế.',
      },
      {
        id: 'plywood-supplier-vietnam',
        title: 'Nhà cung ứng plywood Việt Nam',
        description: 'Nguồn plywood cho sản xuất nội thất và kế hoạch xuất hàng từ Việt Nam.',
      },
      {
        id: 'wood-materials-furniture-production',
        title: 'Vật liệu gỗ cho sản xuất nội thất',
        description: 'Gỗ tự nhiên, ván kỹ thuật và mẫu vật liệu cho phát triển sản phẩm.',
      },
      {
        id: 'foam-upholstery-materials-vietnam',
        title: 'Foam & vật liệu bọc nệm Việt Nam',
        description: 'Foam, vải, da và vật liệu đệm cho sản phẩm nội thất.',
      },
      {
        id: 'export-furniture-packing-materials',
        title: 'Vật liệu đóng gói nội thất xuất khẩu',
        description: 'Carton, foam bảo vệ, bảo vệ cạnh và packing cho hàng nội thất xuất khẩu.',
      },
    ],
  },
  manufacturing: {
    path: '/manufacturing',
    title: 'Sản xuất',
    slug: 'manufacturing',
    summary: 'Nhà máy, quy trình, thiết bị và năng lực hoàn thiện.',
    sections: [
      {
        id: 'factory-overview',
        title: 'Tổng quan nhà máy',
        description: 'Tổng quan không gian và năng lực nhà máy.',
      },
      {
        id: 'production-process',
        title: 'Quy trình sản xuất',
        description: 'Chuẩn bị vật liệu, gia công, hoàn thiện, kiểm tra và đóng gói.',
      },
      {
        id: 'machinery-equipment',
        title: 'Máy móc & thiết bị',
        description: 'Thiết bị phục vụ các công đoạn sản xuất.',
      },
      {
        id: 'finishing-capability',
        title: 'Năng lực hoàn thiện',
        description: 'Khả năng kiểm soát bề mặt, màu và lớp phủ.',
      },
      {
        id: 'assembly-line',
        title: 'Dây chuyền lắp ráp',
        description: 'Tổ chức lắp ráp theo sản phẩm và đơn hàng.',
      },
      {
        id: 'packing-area',
        title: 'Khu vực đóng gói',
        description: 'Khu vực đóng gói và kiểm soát trước xuất hàng.',
      },
      {
        id: 'container-loading',
        title: 'Xếp container',
        description: 'Chuẩn bị container và sắp xếp hàng xuất.',
      },
      {
        id: 'vietnam-furniture-manufacturer',
        title: 'Nhà sản xuất nội thất Việt Nam',
        description: 'Năng lực sản xuất nội thất tại Việt Nam cho buyer quốc tế.',
      },
      {
        id: 'vietnam-wooden-furniture-manufacturer',
        title: 'Nhà sản xuất nội thất gỗ Việt Nam',
        description: 'Sản xuất nội thất gỗ từ Việt Nam theo yêu cầu buyer.',
      },
      {
        id: 'oem-odm-furniture-manufacturer-vietnam',
        title: 'Nhà sản xuất nội thất OEM / ODM tại Việt Nam',
        description: 'Phát triển mẫu và sản xuất OEM / ODM nội thất tại Việt Nam.',
      },
      {
        id: 'vietnam-furniture-production-partner',
        title: 'Đối tác sản xuất nội thất Việt Nam',
        description: 'Đối tác sản xuất, QC và điều phối xuất khẩu nội thất từ Việt Nam.',
      },
    ],
  },
  supplyHub: {
    path: '/vietnam-supply-hub',
    title: 'Trung tâm cung ứng Việt Nam',
    slug: 'vietnam-supply-hub',
    summary: 'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.',
    sections: [
      { id: 'overview', title: 'Tổng quan', description: 'Tổng quan Vietnam Supply Hub.' },
      {
        id: 'storage-solution',
        title: 'Giải pháp lưu kho tại Việt Nam',
        description: 'Không gian lưu kho và tổ chức xuất hàng từ Việt Nam.',
      },
      {
        id: 'inventory-buffer-vietnam',
        title: 'Tồn kho đệm tại Việt Nam',
        description: 'Inventory buffer phục vụ kế hoạch cung ứng.',
      },
      {
        id: 'weekly-shipment-arrangement',
        title: 'Điều phối xuất hàng hằng tuần',
        description: 'Lịch xuất hàng định kỳ theo buyer và thị trường.',
      },
      {
        id: 'lcl-fcl-consolidation',
        title: 'Gom hàng LCL / FCL',
        description: 'Gom hàng theo LCL hoặc FCL.',
      },
      {
        id: 'japan-singapore-supply-support',
        title: 'Hỗ trợ cung ứng Nhật Bản & Singapore',
        description: 'Điều phối nguồn cung cho Nhật Bản và Singapore.',
      },
      {
        id: 'material-component-storage',
        title: 'Lưu kho vật liệu & linh kiện',
        description: 'Lưu vật liệu và linh kiện theo chuẩn đối tác.',
      },
      {
        id: 'export-documentation-support',
        title: 'Hỗ trợ chứng từ xuất khẩu',
        description: 'Chuẩn bị thông tin chứng từ và lô hàng.',
      },
      {
        id: 'partner-standard-room',
        title: 'Phòng mẫu chuẩn đối tác',
        description: 'Mẫu duyệt, bản vẽ, finishing board, packing standard và checklist QC.',
      },
      {
        id: 'vietnam-supply-hub-japanese-buyers',
        title: 'Supply Hub Việt Nam cho buyer Nhật Bản',
        description: 'Điều phối lưu kho, mẫu chuẩn và xuất hàng từ Việt Nam cho buyer Nhật Bản.',
      },
      {
        id: 'vietnam-storage-solution-importers',
        title: 'Giải pháp lưu kho Việt Nam cho nhà nhập khẩu',
        description: 'Lưu kho và tổ chức tồn kho phục vụ importer làm việc với nguồn cung Việt Nam.',
      },
      {
        id: 'weekly-shipment-vietnam-japan',
        title: 'Xuất hàng hằng tuần từ Việt Nam sang Nhật Bản',
        description: 'Điều phối lịch xuất hàng định kỳ từ Việt Nam sang Nhật Bản.',
      },
      {
        id: 'vietnam-export-consolidation-service',
        title: 'Dịch vụ gom hàng xuất khẩu Việt Nam',
        description: 'Gom lô hàng, vật liệu và linh kiện để chuẩn bị xuất khẩu từ Việt Nam.',
      },
    ],
  },
  ecosystem: {
    path: '/manufacturing-ecosystem',
    title: 'Hệ sinh thái sản xuất',
    slug: 'manufacturing-ecosystem',
    summary: 'Toàn bộ mô hình vận hành từ nguồn nguyên liệu đến đóng gói.',
    sections: [
      {
        id: 'production-system',
        title: 'Hệ thống sản xuất',
        description:
          'Hệ thống nhà máy ANSLIFE, nhà máy đối tác và năng lực tổng hợp.',
      },
      {
        id: 'raw-material-zone',
        title: 'Vùng nguyên liệu',
        description: 'Nguồn cung gỗ, chuỗi cung ứng và kiểm soát đầu vào.',
      },
      {
        id: 'manufacturing-process',
        title: 'Quy trình sản xuất',
        description: 'Phát triển mẫu, gia công, lắp ráp, sơn hoàn thiện và đóng gói.',
      },
      {
        id: 'standards-certificates',
        title: 'Tiêu chuẩn & chứng chỉ',
        description: 'Tiêu chuẩn sản xuất và bộ chứng chỉ trong hệ sinh thái.',
      },
      {
        id: 'anslife-factory',
        title: 'Nhà máy ANSLIFE',
        description:
          'Trung tâm sản xuất chủ lực, điều phối kỹ thuật và kiểm soát chất lượng trước xuất hàng.',
      },
      {
        id: 'satellite-factories',
        title: 'Nhà máy vệ tinh',
        description:
          'Mạng lưới nhà máy liên kết, vận hành theo tiêu chuẩn kỹ thuật và kiểm soát của ANSLIFE.',
      },
      {
        id: 'ecosystem-operating-model',
        title: 'Mô hình vận hành hệ sinh thái',
        description:
          'Mô hình phối hợp giữa trung tâm sản xuất chủ lực và các nhà máy vệ tinh theo từng nhóm đơn hàng.',
      },
      {
        id: 'manufacturing-partner-registration',
        title: 'Đăng ký đối tác sản xuất',
        description:
          'Quy trình tiếp nhận và đánh giá đối tác sản xuất theo tiêu chuẩn năng lực, chất lượng và tuân thủ.',
      },
      {
        id: 'wood-supply',
        title: 'Nguồn cung gỗ',
        description:
          'Nguồn cung nguyên liệu gỗ ổn định theo tiêu chí kỹ thuật và khả năng truy xuất.',
      },
      {
        id: 'supply-system',
        title: 'Hệ thống cung ứng',
        description:
          'Tổ chức chuỗi cung ứng nguyên liệu theo kế hoạch sản xuất và tiến độ giao hàng.',
      },
      {
        id: 'material-control',
        title: 'Kiểm soát nguyên liệu',
        description:
          'Bộ tiêu chí kiểm tra chất lượng đầu vào, độ ẩm, quy cách và hồ sơ truy xuất nguyên liệu.',
      },
      {
        id: 'equipment-technology',
        title: 'Thiết bị & công nghệ',
        description:
          'Nền tảng thiết bị và công nghệ sản xuất phục vụ gia công, lắp ráp và hoàn thiện sản phẩm.',
      },
      {
        id: 'production-machinery',
        title: 'Máy móc sản xuất',
        description:
          'Hệ thống máy móc phục vụ gia công chính xác và đảm bảo tính ổn định theo từng công đoạn.',
      },
      {
        id: 'processing-technology',
        title: 'Công nghệ gia công',
        description:
          'Ứng dụng công nghệ gia công để nâng độ chính xác, tính đồng nhất và hiệu quả vận hành.',
      },
      {
        id: 'sample-development',
        title: 'Phát triển mẫu',
        description:
          'Quy trình phát triển mẫu từ bản vẽ kỹ thuật đến đánh giá khả năng sản xuất thực tế.',
      },
      {
        id: 'processing',
        title: 'Gia công',
        description:
          'Tổ chức công đoạn gia công theo tiêu chuẩn kỹ thuật và kiểm soát sai số trong sản xuất.',
      },
      {
        id: 'assembly',
        title: 'Lắp ráp',
        description:
          'Quy trình lắp ráp kết cấu và kiểm tra độ ổn định sản phẩm trước công đoạn hoàn thiện.',
      },
      {
        id: 'finishing',
        title: 'Sơn hoàn thiện',
        description:
          'Kiểm soát màu sắc, bề mặt và độ bền lớp phủ theo tiêu chuẩn đã duyệt.',
      },
      {
        id: 'packaging',
        title: 'Đóng gói',
        description:
          'Tiêu chuẩn đóng gói phù hợp vận chuyển quốc tế nhằm bảo vệ sản phẩm trong suốt hành trình.',
      },
      {
        id: 'production-standards',
        title: 'Tiêu chuẩn sản xuất',
        description:
          'Bộ tiêu chuẩn vận hành áp dụng xuyên suốt từ nguyên liệu đầu vào đến xuất hàng.',
      },
      {
        id: 'ecosystem-certifications',
        title: 'Chứng chỉ trong hệ sinh thái',
        description:
          'Hồ sơ chứng chỉ và tuân thủ phục vụ yêu cầu kỹ thuật tại các thị trường xuất khẩu.',
      },
      {
        id: 'production-ecosystem-scale',
        title: 'Quy mô hệ sinh thái sản xuất',
        description:
          'Tổng quan mô hình trung tâm sản xuất chủ lực và mạng lưới sản xuất liên kết.',
      },
      {
        id: 'production-capacity',
        title: 'Công suất sản xuất',
        description:
          'Khả năng đáp ứng sản lượng theo mùa vụ, nhóm sản phẩm và kế hoạch xuất khẩu.',
      },
      {
        id: 'product-development-capability',
        title: 'Năng lực phát triển sản phẩm',
        description:
          'Khả năng phát triển mẫu, tối ưu cấu trúc và hoàn thiện thông số kỹ thuật.',
      },
      {
        id: 'order-handling-capability',
        title: 'Khả năng xử lý đơn hàng',
        description:
          'Quy trình điều phối đơn hàng từ xác nhận kỹ thuật đến bàn giao logistics.',
      },
      {
        id: 'custom-production-oem-odm',
        title: 'Sản xuất theo yêu cầu (OEM / ODM)',
        description:
          'Năng lực triển khai linh hoạt theo thiết kế khách hàng hoặc đồng phát triển sản phẩm.',
      },
      {
        id: 'export-markets',
        title: 'Thị trường xuất khẩu',
        description:
          'Năng lực phục vụ các thị trường quốc tế theo yêu cầu tiêu chuẩn và hồ sơ kỹ thuật.',
      },
    ],
  },
  quality: {
    path: '/quality-control',
    title: 'Chất lượng & Tiêu chuẩn',
    slug: 'quality-control',
    summary: 'Quy trình QC, kiểm soát mẫu, đóng gói và tiêu chuẩn buyer.',
    sections: [
      {
        id: 'qc-process',
        title: 'Quy trình kiểm soát chất lượng',
        description: 'Luồng kiểm soát chất lượng từ vật liệu đến xuất hàng.',
      },
      {
        id: 'material-inspection',
        title: 'Kiểm tra vật liệu',
        description: 'Kiểm tra vật liệu đầu vào và mẫu tham chiếu.',
      },
      {
        id: 'in-process-inspection',
        title: 'Kiểm tra trong sản xuất',
        description: 'Theo dõi chất lượng từng công đoạn gia công và lắp ráp.',
      },
      {
        id: 'final-inspection',
        title: 'Kiểm tra cuối',
        description: 'Kiểm tra thành phẩm trước xuất hàng.',
      },
      {
        id: 'approved-sample-control',
        title: 'Kiểm soát mẫu duyệt',
        description: 'Quản lý mẫu chuẩn và đối chiếu sản xuất.',
      },
      {
        id: 'moisture-control',
        title: 'Kiểm soát độ ẩm',
        description: 'Kiểm soát độ ẩm vật liệu và thành phẩm.',
      },
      {
        id: 'packing-standard',
        title: 'Chuẩn đóng gói',
        description: 'Chuẩn đóng gói theo hàng xuất khẩu.',
      },
      {
        id: 'inspection-report',
        title: 'Báo cáo kiểm tra',
        description: 'Hồ sơ inspection report và kết quả kiểm tra.',
      },
      {
        id: 'buyer-specific-standards',
        title: 'Tiêu chuẩn riêng của buyer',
        description: 'Yêu cầu riêng theo buyer và thị trường.',
      },
      {
        id: 'buyer-standard-room',
        title: 'Phòng tiêu chuẩn buyer',
        description: 'Không gian quản lý mẫu duyệt, vật liệu, packing standard và checklist buyer.',
      },
      {
        id: 'furniture-qc-checklist',
        title: 'Checklist QC nội thất',
        description: 'Checklist QC cho vật liệu, công đoạn, thành phẩm và đóng gói nội thất.',
      },
      {
        id: 'export-packing-standard',
        title: 'Tiêu chuẩn đóng gói xuất khẩu',
        description: 'Tiêu chuẩn packing cho hàng nội thất trước khi xuất khẩu.',
      },
    ],
  },
  resources: {
    path: '/resources',
    title: 'Tài nguyên',
    slug: 'resources',
    summary: 'Tài liệu vật liệu, sản xuất, xuất khẩu, case study và FAQ.',
    sections: [
      {
        id: 'material-library',
        title: 'Thư viện vật liệu',
        description: 'Tài liệu tham chiếu nguyên liệu và mẫu vật liệu.',
      },
      {
        id: 'manufacturing-notes',
        title: 'Ghi chú sản xuất',
        description: 'Ghi chú kỹ thuật và thực hành sản xuất.',
      },
      {
        id: 'export-knowledge',
        title: 'Kiến thức xuất khẩu',
        description: 'Nội dung hỗ trợ buyer trong quá trình xuất khẩu.',
      },
      {
        id: 'case-studies',
        title: 'Case study',
        description: 'Các tình huống triển khai theo sản phẩm và dự án.',
      },
      {
        id: 'company-updates',
        title: 'Cập nhật công ty',
        description: 'Cập nhật hoạt động và năng lực ANSLIFE.',
      },
      {
        id: 'faq',
        title: 'FAQ',
        description: 'Câu hỏi thường gặp.',
      },
    ],
  },
  commercial: {
    path: '/commercial-process',
    title: 'Quy trình thương mại',
    slug: 'commercial-process',
    summary: 'Quy trình đặt hàng, thanh toán và hậu cần cho khách hàng quốc tế.',
    sections: [
      {
        id: 'order-flow',
        title: 'Quy trình đặt hàng',
        description: 'Các bước từ tiếp nhận yêu cầu đến xác nhận đơn.',
      },
      {
        id: 'incoterms',
        title: 'Điều kiện giao hàng (Incoterms)',
        description: 'Phạm vi trách nhiệm và điều kiện giao nhận.',
      },
      {
        id: 'payment',
        title: 'Phương thức thanh toán',
        description: 'Các hình thức thanh toán và điều kiện liên quan.',
      },
      {
        id: 'lead-time',
        title: 'Thời gian sản xuất',
        description: 'Mốc thời gian theo quy mô đơn hàng và năng lực nhà máy.',
      },
      {
        id: 'logistics',
        title: 'Hậu cần',
        description: 'Tổ chức vận tải, đóng gói và theo dõi tiến độ giao hàng.',
      },
      {
        id: 'vietnam-supply-hub',
        title: 'Vietnam Supply Hub',
        description:
          'Giải pháp lưu kho, quản lý tồn kho, QC, đóng gói và điều phối xuất hàng từ Việt Nam cho buyer quốc tế.',
      },
      {
        id: 'partner-standard-room',
        title: 'Partner Standard Room',
        description:
          'Không gian lưu mẫu, bản vẽ, mẫu vật liệu, mẫu sơn, tiêu chuẩn đóng gói và checklist QC riêng cho từng đối tác.',
      },
      {
        id: 'weekly-shipment-arrangement',
        title: 'Weekly Shipment Arrangement',
        description:
          'Tổ chức lịch xuất hàng định kỳ từ Việt Nam sang Nhật Bản, Singapore và các thị trường quốc tế.',
      },
      {
        id: 'export-consolidation',
        title: 'Export Consolidation',
        description:
          'Gom hàng container hoặc LCL, phối hợp hàng hóa, vật liệu và chứng từ trước khi xuất khẩu.',
      },
      {
        id: 'documentation-support',
        title: 'Documentation Support',
        description:
          'Hỗ trợ chứng từ xuất khẩu, hồ sơ giao hàng và thông tin lô hàng theo yêu cầu của khách hàng.',
      },
    ],
  },
  global: {
    path: '/global-network',
    title: 'Hệ thống toàn cầu',
    slug: 'global-network',
    summary: 'Mạng lưới vận hành và đối tác quốc tế của ANSLIFE.',
    sections: [
      {
        id: 'vietnam-hq',
        title: 'Việt Nam - Trụ sở',
        description: 'Trung tâm điều phối sản xuất, QC và thương mại.',
      },
      {
        id: 'singapore-office',
        title: 'Singapore - Văn phòng đại diện',
        description: 'Điểm kết nối thị trường và đối tác khu vực.',
      },
      {
        id: 'japan-office',
        title: 'Nhật Bản - Văn phòng đại diện',
        description: 'Hỗ trợ khách hàng và tiêu chuẩn chất lượng thị trường Nhật.',
      },
      {
        id: 'us-office',
        title: 'Hoa Kỳ - Văn phòng đại diện',
        description: 'Điều phối dự án và kết nối khách hàng tại Hoa Kỳ.',
      },
      {
        id: 'international-partners',
        title: 'Đối tác quốc tế',
        description: 'Mạng lưới đối tác cung ứng, sản xuất và phân phối.',
      },
    ],
  },
  scholarship: {
    path: '/about-anslife/scholarship-community',
    title: 'Phụng sự xã hội',
    slug: 'scholarship-community',
    summary: '',
    sections: [],
  },
};

export const LANGUAGE_PLACEHOLDERS = [
  { code: 'en', label: 'Tiếng Anh' },
  { code: 'jp', label: 'Tiếng Nhật' },
  { code: 'kr', label: 'Tiếng Hàn' },
];
