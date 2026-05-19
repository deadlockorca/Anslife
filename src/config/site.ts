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
    label: 'Finished Furniture',
    path: '/products-solutions/finished-furniture',
  },
  {
    label: 'Furniture Components',
    path: '/products-solutions/furniture-components',
  },
  {
    label: 'Plywood & Boards',
    path: '/products-solutions/plywood-boards',
  },
  {
    label: 'Wood Materials',
    path: '/products-solutions/wood-materials',
  },
  {
    label: 'Foam & Upholstery Materials',
    path: '/products-solutions/foam-upholstery-materials',
  },
  {
    label: 'Rattan & Bamboo Materials',
    path: '/products-solutions/rattan-bamboo-materials',
  },
  {
    label: 'Packing Materials',
    path: '/products-solutions/packing-materials',
  },
  {
    label: 'OEM/ODM Development',
    path: '/products-solutions/oem-odm-development',
  },
  {
    label: 'Vietnam Storage Solution',
    path: '/products-solutions/vietnam-storage-solution',
  },
  {
    label: 'Export Consolidation',
    path: '/products-solutions/export-consolidation',
  },
];

export const TOP_MENU: TopMenuItem[] = [
  {
    label: 'HOME',
    path: '/',
  },
  {
    label: 'ABOUT US',
    path: '/about-anslife',
    children: [
      { label: 'Company Overview', path: '/about-anslife/company-intro' },
      { label: 'Vision & Mission', path: '/about-anslife/vision-mission' },
      { label: 'Core Values', path: '/about-anslife/core-values' },
      { label: 'Manufacturing Philosophy', path: '/about-anslife/production-philosophy' },
      { label: 'Organization', path: '/about-anslife/organization' },
      { label: 'Team', path: '/about-anslife/team' },
      { label: 'Global Network', path: '/global-network' },
      { label: 'Social Responsibility', path: '/scholarship-community' },
    ],
  },
  {
    label: 'PRODUCTS & SOLUTIONS',
    path: '/products-solutions',
    children: PRODUCTS_AND_SOLUTIONS_MENU,
  },
  {
    label: 'MANUFACTURING CAPABILITY',
    path: '/manufacturing-ecosystem/production-ecosystem-scale',
    children: [
      { label: 'Factory Network', path: '/manufacturing-ecosystem/production-system' },
      { label: 'ANSLIFE Factory', path: '/manufacturing-ecosystem/anslife-factory' },
      { label: 'Satellite Factories', path: '/manufacturing-ecosystem/satellite-factories' },
      { label: 'Production Capacity', path: '/manufacturing-ecosystem/production-capacity' },
      {
        label: 'Product Development',
        path: '/manufacturing-ecosystem/product-development-capability',
      },
      { label: 'Materials & Supply Chain', path: '/manufacturing-ecosystem/raw-material-zone' },
      { label: 'Equipment & Technology', path: '/manufacturing-ecosystem/equipment-technology' },
      { label: 'QC & Packing', path: '/quality-control' },
      {
        label: 'Standards & Certifications',
        path: '/manufacturing-ecosystem/standards-certificates',
      },
      { label: 'Export Markets', path: '/manufacturing-ecosystem/export-markets' },
    ],
  },
  {
    label: 'OEM/ODM SERVICE',
    path: '/manufacturing-ecosystem/custom-production-oem-odm',
    children: [
      { label: 'OEM Service', path: '/manufacturing-ecosystem/custom-production-oem-odm' },
      { label: 'ODM Service', path: '/manufacturing-ecosystem/custom-production-oem-odm' },
      { label: 'Custom Design', path: '/manufacturing-ecosystem/custom-production-oem-odm' },
      { label: 'Sample Development', path: '/manufacturing-ecosystem/sample-development' },
      { label: 'Order Process', path: '/commercial-process/order-flow' },
      { label: 'Incoterms', path: '/commercial-process/incoterms' },
      { label: 'Payment', path: '/commercial-process/payment' },
      { label: 'Lead Time', path: '/commercial-process/lead-time' },
      { label: 'Logistics', path: '/commercial-process/logistics' },
    ],
  },
  {
    label: 'VIETNAM SUPPLY HUB',
    path: '/commercial-process/vietnam-supply-hub',
    children: [
      { label: 'Storage in Vietnam', path: '/commercial-process/vietnam-supply-hub' },
      { label: 'Partner Standard Room', path: '/commercial-process/partner-standard-room' },
      {
        label: 'Sample & Standard Management',
        path: '/commercial-process/partner-standard-room',
      },
      {
        label: 'Weekly Shipment Arrangement',
        path: '/commercial-process/weekly-shipment-arrangement',
      },
      { label: 'QC Before Shipment', path: '/quality-control/pre-shipment-inspection' },
      { label: 'Export Packing', path: '/manufacturing-ecosystem/packaging' },
      { label: 'Container / LCL Consolidation', path: '/commercial-process/export-consolidation' },
      { label: 'Documentation Support', path: '/commercial-process/documentation-support' },
    ],
  },
  {
    label: 'PROJECTS',
    path: '/projects',
    children: [
      { label: 'Export Projects', path: '/projects/type/du-an-xuat-khau' },
      { label: 'Manufacturing Cases', path: '/projects/type/case-san-xuat' },
      { label: 'Improvement Cases', path: '/projects/type/case-cai-tien' },
      { label: 'Delivery Gallery', path: '/projects/type/hinh-anh-giao-hang' },
      { label: 'Container Loading', path: '/projects/type/hinh-anh-container' },
    ],
  },
  {
    label: 'NEWS',
    path: '/news',
  },
  {
    label: 'CONTACT',
    path: '/contact',
    children: [
      { label: 'Company Information', path: '/contact/company-info' },
      { label: 'Request a Quote', path: '/contact/quote-request' },
      { label: 'Schedule a Meeting', path: '/contact/schedule-meeting' },
      { label: 'Map', path: '/contact/map' },
    ],
  },
];

export const STATIC_PAGE_MAP: Record<string, StaticPageConfig> = {
  productSolutions: {
    path: '/products-solutions',
    title: 'Products & Solutions',
    slug: 'products-solutions',
    summary: '',
    sections: [
      {
        id: 'finished-furniture',
        title: 'Finished Furniture',
        description: '',
      },
      {
        id: 'furniture-components',
        title: 'Furniture Components',
        description: '',
      },
      {
        id: 'plywood-boards',
        title: 'Plywood & Boards',
        description: '',
      },
      {
        id: 'wood-materials',
        title: 'Wood Materials',
        description: '',
      },
      {
        id: 'foam-upholstery-materials',
        title: 'Foam & Upholstery Materials',
        description: '',
      },
      {
        id: 'rattan-bamboo-materials',
        title: 'Rattan & Bamboo Materials',
        description: '',
      },
      {
        id: 'packing-materials',
        title: 'Packing Materials',
        description: '',
      },
      {
        id: 'oem-odm-development',
        title: 'OEM/ODM Development',
        description: '',
      },
      {
        id: 'vietnam-storage-solution',
        title: 'Vietnam Storage Solution',
        description: '',
      },
      {
        id: 'export-consolidation',
        title: 'Export Consolidation',
        description: '',
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
        id: 'company-intro',
        title: 'Giới thiệu về công ty',
        description:
          'ANSLIFE là một hệ thống sản xuất và xuất khẩu nội thất tập trung vào chuỗi sản xuất, kiểm soát chất lượng và kết nối nguồn lực trong ngành.',
      },
      {
        id: 'vision-mission',
        title: 'Tầm nhìn - Sứ mệnh',
        description: 'Định hướng dài hạn và giá trị mà ANSLIFE theo đuổi.',
      },
      {
        id: 'core-values',
        title: 'Giá trị cốt lõi',
        description: 'Những nguyên tắc vận hành của đội ngũ và chuỗi cung ứng.',
      },
      {
        id: 'production-philosophy',
        title: 'Triết lý sản xuất',
        description: 'Cam kết chất lượng và tính bền vững trong từng khâu.',
      },
      {
        id: 'organization',
        title: 'Cơ cấu tổ chức',
        description: 'Mô hình điều hành và phối hợp giữa các bộ phận.',
      },
      {
        id: 'team',
        title: 'Đội ngũ',
        description: 'Nhóm chuyên môn và năng lực triển khai theo từng thị trường.',
      },
      {
        id: 'anslife-ecosystem',
        title: 'Hệ sinh thái ANSLIFE',
        description:
          'Liên kết giữa nhà máy, nguyên liệu, QC và dịch vụ thương mại.',
      },
      {
        id: 'development-history',
        title: 'Lịch sử phát triển',
        description:
          'Các giai đoạn hình thành, chuẩn hóa và mở rộng hệ thống ANSLIFE.',
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
    title: 'Kiểm soát chất lượng',
    slug: 'quality-control',
    summary: 'Hệ thống QC theo chuỗi giá trị từ nguyên liệu đến trước xuất hàng.',
    sections: [
      {
        id: 'qc-philosophy',
        title: 'Triết lý QC',
        description: 'Nguyên tắc QC nhằm đảm bảo độ tin cậy và tính đồng nhất.',
      },
      {
        id: 'qc-system',
        title: 'Hệ thống QC',
        description: 'Mô hình tổ chức và bộ tiêu chí đánh giá theo công đoạn.',
      },
      {
        id: 'input-inspection',
        title: 'Kiểm tra nguyên liệu',
        description: 'Kiểm tra chất lượng đầu vào cho gỗ và vật tư phụ trợ.',
      },
      {
        id: 'in-process-inspection',
        title: 'Kiểm tra trong sản xuất',
        description: 'Theo dõi chất lượng từng công đoạn gia công và lắp ráp.',
      },
      {
        id: 'pre-shipment-inspection',
        title: 'Kiểm tra trước xuất hàng',
        description: 'Kiểm tra AQL, đóng gói, nhãn mác và tính sẵn sàng giao hàng.',
      },
      {
        id: 'quality-improvement-cases',
        title: 'Case cải tiến chất lượng',
        description: 'Tổng hợp các tình huống và biện pháp cải tiến chất lượng.',
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
    path: '/scholarship-community',
    title: 'Quỹ học bổng & cộng đồng',
    slug: 'scholarship-community',
    summary: 'Chương trình học bổng và các hoạt động cộng đồng của ANSLIFE.',
    sections: [
      {
        id: 'fund-overview',
        title: 'Giới thiệu quỹ',
        description: 'Mục tiêu, cơ chế vận hành và phạm vi hỗ trợ của quỹ.',
      },
      {
        id: 'scholarship-program',
        title: 'Chương trình học bổng',
        description: 'Mục tiêu chương trình, điều kiện xét và câu chuyện học bổng.',
      },
      {
        id: 'community-activities',
        title: 'Hoạt động cộng đồng',
        description: 'Dự án từ thiện và chương trình xã hội theo từng giai đoạn.',
      },
      {
        id: 'workforce-development',
        title: 'Phát triển nguồn nhân lực',
        description: 'Chương trình đào tạo, hướng nghiệp và nâng cao năng lực con người.',
      },
      {
        id: 'join-anslife',
        title: 'Tham gia cùng ANSLIFE',
        description: 'Cách thức đồng hành cùng quỹ và các chương trình.',
      },
    ],
  },
};

export const LANGUAGE_PLACEHOLDERS = [
  { code: 'en', label: 'Tiếng Anh' },
  { code: 'jp', label: 'Tiếng Nhật' },
  { code: 'kr', label: 'Tiếng Hàn' },
];
