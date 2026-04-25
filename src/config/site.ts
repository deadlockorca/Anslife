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

export const TOP_MENU: TopMenuItem[] = [
  {
    label: "Giới thiệu về Anslife",
    path: "/about-anslife",
    children: [
      {
        label: "Giới thiệu về công ty",
        path: "/about-anslife/company-intro"
      },
      {
        label: "Tầm nhìn, sứ mệnh",
        path: "/about-anslife/vision-mission"
      },
      {
        label: "Giá trị cốt lõi",
        path: "/about-anslife/core-values"
      },
      {
        label: "Triết lý vận hành",
        path: "/about-anslife/production-philosophy"
      },
      {
        label: "Cơ cấu tổ chức",
        path: "/about-anslife/organization"
      },
      {
        label: "Đội ngũ",
        path: "/about-anslife/team"
      },
      {
        label: "Hệ sinh thái Anslife",
        path: "/about-anslife/anslife-ecosystem"
      },
      {
        label: "Lịch sử phát triển",
        path: "/about-anslife/development-history"
      }
    ]
  },
  {
    label: "Hệ sinh thái sản xuất",
    path: "/manufacturing-ecosystem",
    children: [
      {
        label: "Hệ thống sản xuất",
        path: "/manufacturing-ecosystem/production-system",
        children: [
          {
            label: "Mô hình vận hành hệ sinh thái",
            path: "/manufacturing-ecosystem/ecosystem-operating-model"
          },
          {
            label: "Nhà máy vệ tinh",
            path: "/manufacturing-ecosystem/satellite-factories"
          },
          {
            label: "Nhà máy ANSLIFE",
            path: "/manufacturing-ecosystem/anslife-factory"
          }
        ]
      },
      {
        label: "Vùng nguyên liệu",
        path: "/manufacturing-ecosystem/raw-material-zone",
        children: [
          {
            label: "Nguồn cung gỗ",
            path: "/manufacturing-ecosystem/wood-supply"
          },
          {
            label: "Vật liệu công nghiệp",
            path: "/manufacturing-ecosystem/supply-system",
            children: [
              {
                label: "Vật liệu liên quan",
                path: "/manufacturing-ecosystem/supply-system"
              },
              {
                label: "MDF / PB / ván công nghiệp",
                path: "/manufacturing-ecosystem/supply-system"
              },
              {
                label: "Plywood",
                path: "/manufacturing-ecosystem/supply-system"
              }
            ]
          },
          {
            label: "Kiểm soát nguyên liệu",
            path: "/manufacturing-ecosystem/material-control"
          }
        ]
      },
      {
        label: "Thiết bị & công nghệ",
        path: "/manufacturing-ecosystem/equipment-technology",
        children: [
          {
            label: "Máy móc sản xuất",
            path: "/manufacturing-ecosystem/production-machinery"
          },
          {
            label: "Công nghệ gia công",
            path: "/manufacturing-ecosystem/processing-technology"
          }
        ]
      },
      {
        label: "Quy trình sản xuất",
        path: "/manufacturing-ecosystem/manufacturing-process",
        children: [
          {
            label: "Phát triển mẫu",
            path: "/manufacturing-ecosystem/sample-development"
          },
          {
            label: "Gia công",
            path: "/manufacturing-ecosystem/processing"
          },
          {
            label: "Lắp ráp",
            path: "/manufacturing-ecosystem/assembly"
          },
          {
            label: "Sơn hoàn thiện",
            path: "/manufacturing-ecosystem/finishing"
          },
          {
            label: "Đóng gói",
            path: "/manufacturing-ecosystem/packaging"
          }
        ]
      },
      {
        label: "Tiêu chuẩn & chứng chỉ",
        path: "/manufacturing-ecosystem/standards-certificates",
        children: [
          {
            label: "Tiêu chuẩn sản xuất",
            path: "/manufacturing-ecosystem/production-standards"
          },
          {
            label: "Chứng chỉ trong hệ sinh thái",
            path: "/manufacturing-ecosystem/ecosystem-certifications"
          }
        ]
      },
      {
        label: "Đăng ký đối tác sản xuất",
        path: "/manufacturing-ecosystem/manufacturing-partner-registration",
        children: [
          {
            label: "Giới thiệu chương trình đối tác",
            path: "/manufacturing-ecosystem/manufacturing-partner-registration"
          },
          {
            label: "Điều kiện tham gia",
            path: "/manufacturing-ecosystem/manufacturing-partner-registration"
          },
          {
            label: "Quy trình đánh giá",
            path: "/manufacturing-ecosystem/manufacturing-partner-registration"
          },
          {
            label: "Form đăng ký nhà máy",
            path: "/manufacturing-ecosystem/manufacturing-partner-registration"
          }
        ]
      }
    ]
  },
  {
    label: "Năng lực sản xuất",
    path: "/manufacturing-ecosystem/production-ecosystem-scale",
    children: [
      {
        label: "Quy mô hệ sinh thái",
        path: "/manufacturing-ecosystem/production-ecosystem-scale"
      },
      {
        label: "Công suất sản xuất",
        path: "/manufacturing-ecosystem/production-capacity"
      },
      {
        label: "Năng lực phát triển sản phẩm",
        path: "/manufacturing-ecosystem/product-development-capability"
      },
      {
        label: "Khả năng xử lý đơn hàng",
        path: "/manufacturing-ecosystem/order-handling-capability"
      },
      {
        label: "Sản xuất theo yêu cầu",
        path: "/manufacturing-ecosystem/custom-production-oem-odm",
        children: [
          {
            label: "OEM",
            path: "/manufacturing-ecosystem/custom-production-oem-odm"
          },
          {
            label: "ODM",
            path: "/manufacturing-ecosystem/custom-production-oem-odm"
          },
          {
            label: "Custom Design",
            path: "/manufacturing-ecosystem/custom-production-oem-odm"
          }
        ]
      },
      {
        label: "Thị trường xuất khẩu",
        path: "/manufacturing-ecosystem/export-markets"
      }
    ]
  },
  {
    label: "Hệ thống kiểm soát chất lượng",
    path: "/quality-control",
    children: [
      {
        label: "Triết lý QC",
        path: "/quality-control/qc-philosophy"
      },
      {
        label: "Hệ thống QC",
        path: "/quality-control/qc-system"
      },
      {
        label: "Kiểm tra nguyên liệu",
        path: "/quality-control/input-inspection"
      },
      {
        label: "Kiểm tra trong sản xuất",
        path: "/quality-control/in-process-inspection"
      },
      {
        label: "Kiểm tra trước xuất hàng",
        path: "/quality-control/pre-shipment-inspection"
      },
      {
        label: "Quy trình xử lý lỗi",
        path: "/quality-control/quality-improvement-cases"
      },
      {
        label: "Case cải tiến chất lượng",
        path: "/quality-control/quality-improvement-cases"
      }
    ]
  },
  {
    label: "Sản phẩm",
    path: "/products",
    children: [
      {
        label: "Nội thất gỗ",
        path: "/products/category/noi-that-go",
        children: [
          {
            label: "Ghế",
            path: "/products/category/ghe",
            children: [
              {
                label: "Ghế ăn",
                path: "/products/category/ghe-an"
              },
              {
                label: "Ghế lounge",
                path: "/products/category/ghe-lounge"
              },
              {
                label: "Ghế bar",
                path: "/products/category/ghe-bar"
              }
            ]
          },
          {
            label: "Bàn",
            path: "/products/category/ban",
            children: [
              {
                label: "Bàn ăn",
                path: "/products/category/ban-an"
              },
              {
                label: "Bàn cà phê",
                path: "/products/category/ban-ca-phe"
              },
              {
                label: "Bàn phụ",
                path: "/products/category/ban-phu"
              }
            ]
          },
          {
            label: "Tủ / Kệ",
            path: "/products/category/tu-ke",
            children: [
              {
                label: "Tủ quần áo",
                path: "/products/category/tu-quan-ao"
              },
              {
                label: "Kệ trang trí",
                path: "/products/category/ke-trang-tri"
              },
              {
                label: "Tủ lưu trữ",
                path: "/products/category/tu-luu-tru"
              }
            ]
          },
          {
            label: "Bộ phòng ngủ",
            path: "/products/category/bo-phong-ngu",
            children: [
              {
                label: "Giường ngủ",
                path: "/products/category/giuong-ngu"
              },
              {
                label: "Tủ đầu giường",
                path: "/products/category/tu-dau-giuong"
              },
              {
                label: "Tủ quần áo",
                path: "/products/category/tu-quan-ao"
              },
              {
                label: "Bàn trang điểm",
                path: "/products/category/ban-trang-diem"
              },
              {
                label: "Bộ phòng ngủ hoàn chỉnh",
                path: "/products/category/bo-phong-ngu-hoan-chinh"
              }
            ]
          }
        ]
      },
      {
        label: "Bộ bàn ăn",
        path: "/products/category/bo-ban-an",
        children: [
          {
            label: "Bàn ăn",
            path: "/products/category/ban-an"
          },
          {
            label: "Ghế ăn",
            path: "/products/category/ghe-an"
          }
        ]
      },
      {
        label: "Mây tre đan",
        path: "/products/category/may-tre-dan",
        children: [
          {
            label: "Ghế mây",
            path: "/products/category/ghe-may"
          },
          {
            label: "Bàn mây",
            path: "/products/category/ban-may"
          },
          {
            label: "Giỏ mây",
            path: "/products/category/gio-may"
          },
          {
            label: "Khay mây",
            path: "/products/category/khay-may"
          },
          {
            label: "Decor mây tre",
            path: "/products/category/decor-may-tre"
          },
          {
            label: "Sản phẩm mây tre theo thiết kế",
            path: "/products/category/san-pham-may-tre-theo-thiet-ke"
          }
        ]
      },
      {
        label: "Kitchenware gỗ",
        path: "/products/category/kitchenware-go",
        children: [
          {
            label: "Thớt gỗ",
            path: "/products/category/thot-go"
          },
          {
            label: "Khay gỗ",
            path: "/products/category/khay-go"
          },
          {
            label: "Muỗng gỗ",
            path: "/products/category/muong-go"
          },
          {
            label: "Dụng cụ nhà bếp",
            path: "/products/category/dung-cu-nha-bep"
          }
        ]
      },
      {
        label: "Decor & Thủ công mỹ nghệ",
        path: "/products/category/decor-thu-cong-my-nghe",
        children: [
          {
            label: "Sơn mài",
            path: "/products/category/son-mai"
          },
          {
            label: "Khảm trai",
            path: "/products/category/kham-trai"
          },
          {
            label: "Trang trí gỗ",
            path: "/products/category/trang-tri-go"
          },
          {
            label: "Art objects",
            path: "/products/category/art-objects"
          }
        ]
      },
      {
        label: "Sản phẩm theo thiết kế",
        path: "/products/category/thiet-ke-rieng"
      },
      {
        label: "OEM / ODM",
        path: "/products/category/oem-odm"
      }
    ]
  },
  {
    label: "Quy trình thương mại",
    path: "/commercial-process",
    children: [
      {
        label: "Quy trình đặt hàng",
        path: "/commercial-process/order-flow"
      },
      {
        label: "Quy trình phát triển mẫu",
        path: "/manufacturing-ecosystem/sample-development"
      },
      {
        label: "Điều kiện giao hàng (Incoterms)",
        path: "/commercial-process/incoterms"
      },
      {
        label: "Phương thức thanh toán",
        path: "/commercial-process/payment"
      },
      {
        label: "Thời gian sản xuất",
        path: "/commercial-process/lead-time"
      },
      {
        label: "Logistics",
        path: "/commercial-process/logistics"
      }
    ]
  },
  {
    label: "Dự án & Case Study",
    path: "/projects",
    children: [
      {
        label: "Dự án xuất khẩu",
        path: "/projects/type/du-an-xuat-khau"
      },
      {
        label: "Case sản xuất",
        path: "/projects/type/case-san-xuat"
      },
      {
        label: "Case cải tiến",
        path: "/projects/type/case-cai-tien"
      },
      {
        label: "Hình ảnh giao hàng",
        path: "/projects/type/hinh-anh-giao-hang"
      },
      {
        label: "Hình ảnh container",
        path: "/projects/type/hinh-anh-container"
      }
    ]
  },
  {
    label: "Hệ thống toàn cầu",
    path: "/global-network",
    children: [
      {
        label: "Việt Nam – Trụ sở",
        path: "/global-network/vietnam-hq"
      },
      {
        label: "Singapore – Văn phòng đại diện",
        path: "/global-network/singapore-office"
      },
      {
        label: "Nhật Bản – Văn phòng đại diện",
        path: "/global-network/japan-office"
      },
      {
        label: "Hoa Kỳ – Văn phòng đại diện",
        path: "/global-network/us-office"
      },
      {
        label: "Đối tác quốc tế",
        path: "/global-network/international-partners"
      }
    ]
  },
  {
    label: "Phụng sự xã hội",
    path: "/scholarship-community",
    children: [
      {
        label: "Giới thiệu triết lý",
        path: "/scholarship-community/fund-overview"
      },
      {
        label: "Quỹ học bổng",
        path: "/scholarship-community/scholarship-program"
      },
      {
        label: "Hoạt động cộng đồng",
        path: "/scholarship-community/community-activities"
      },
      {
        label: "Phát triển nguồn nhân lực",
        path: "/scholarship-community/workforce-development"
      },
      {
        label: "Tham gia cùng ANSLIFE",
        path: "/scholarship-community/join-anslife"
      }
    ]
  },
  {
    label: "Liên hệ",
    path: "/contact",
    children: [
      {
        label: "Thông tin công ty",
        path: "/contact/company-info"
      },
      {
        label: "Gửi yêu cầu báo giá",
        path: "/contact/quote-request"
      },
      {
        label: "Đặt lịch làm việc",
        path: "/contact/schedule-meeting"
      },
      {
        label: "Bản đồ",
        path: "/contact/map"
      }
    ]
  }
];

export const STATIC_PAGE_MAP: Record<string, StaticPageConfig> = {
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
