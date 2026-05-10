import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { TOP_MENU, type MenuChildItem } from '../../config/site';
import {
  getStoredLanguage,
  isLanguageCode,
  LANGUAGE_STORAGE_KEY,
  type LanguageCode,
  withLanguagePath,
} from '../../i18n/language';
import SocialLinks from './SocialLinks';
import useSiteI18n from '../../hooks/useSiteI18n';
import { WORLD_LANGUAGE_OPTIONS } from '../../i18n/worldLanguages';
import { getProductCategories } from '../../lib/wp';
import { getCurrentUser, type AuthUser } from '../../lib/internalAuth';
import type { WpCategory } from '../../types/wp';

const supportedLanguageOptions = [
  { code: 'vn', label: 'Tiếng Việt', menuLabel: 'VN', flag: '🇻🇳' },
  { code: 'en', label: 'English', menuLabel: 'EN', flag: '🇬🇧' },
  { code: 'jp', label: '日本語', menuLabel: 'JP', flag: '🇯🇵' },
  { code: 'kr', label: '한국어', menuLabel: 'KR', flag: '🇰🇷' },
] as const satisfies ReadonlyArray<{
  code: LanguageCode;
  label: string;
  menuLabel: string;
  flag: string;
}>;
const mobileMenuLanguageOptions = supportedLanguageOptions;

const LANGUAGE_SELECTOR_STORAGE_KEY = 'anslife_language_selector';
const LANGUAGE_ROUTE_ALIAS: Record<string, LanguageCode> = {
  vn: 'vn',
  vi: 'vn',
  en: 'en',
  jp: 'jp',
  ja: 'jp',
  kr: 'kr',
  ko: 'kr',
};

const additionalLanguageOptions = WORLD_LANGUAGE_OPTIONS.filter(
  (item) => item.code !== 'en',
);

const PRODUCT_MENU_PATH = '/products';
const HEADER_PRIMARY_MENU_COUNT = 6;
const HEADER_HOTLINE_NUMBER = '+84 901.827.555';
const HEADER_HOTLINE_TEL = '+84901827555';
const HEADER_SEGMENT_ITEMS = [
  { id: 'individual', label: 'Cá nhân' },
  { id: 'organization', label: 'Tổ chức' },
  { id: 'special-partner', label: 'Đối tác đặc biệt' },
] as const;
type HeaderSegmentId = (typeof HEADER_SEGMENT_ITEMS)[number]['id'];
const HEADER_UTILITY_LINKS = [
  { label: 'Về ANSLIFE', path: '/about-anslife' },
  { label: 'Tin tức', path: '/news' },
  { label: 'Dự án', path: '/projects' },
  { label: 'Mạng lưới', path: '/global-network' },
  { label: 'Tuyển dụng', path: '/scholarship-community/join-anslife' },
] as const;
const FOOTER_NAV_COLUMNS = [
  {
    title: 'VỀ ANSLIFE',
    links: [
      { label: 'Giới thiệu về công ty', path: '/about-anslife/company-intro' },
      { label: 'Hệ sinh thái sản xuất', path: '/manufacturing-ecosystem' },
      {
        label: 'Năng lực sản xuất',
        path: '/manufacturing-ecosystem/production-ecosystem-scale',
      },
      { label: 'Hệ thống kiểm soát chất lượng', path: '/quality-control' },
    ],
  },
  {
    title: 'QUY TRÌNH THƯƠNG MẠI',
    links: [
      { label: 'Quy trình phát triển mẫu', path: '/manufacturing-ecosystem/sample-development' },
      { label: 'Quy trình đặt hàng', path: '/commercial-process/order-flow' },
      { label: 'Điều kiện giao hàng (Incoterms)', path: '/commercial-process/incoterms' },
      { label: 'Phương thức thanh toán', path: '/commercial-process/payment' },
      { label: 'Thời gian sản xuất', path: '/commercial-process/lead-time' },
      { label: 'Logistics', path: '/commercial-process/logistics' },
    ],
  },
  {
    title: 'DỰ ÁN & CASE STUDY',
    links: [
      { label: 'Dự án xuất khẩu', path: '/projects/type/du-an-xuat-khau' },
      { label: 'Case sản xuất', path: '/projects/type/case-san-xuat' },
      { label: 'Case cải tiến', path: '/projects/type/case-cai-tien' },
      { label: 'Hình ảnh giao hàng', path: '/projects/type/hinh-anh-giao-hang' },
      { label: 'Hình ảnh container', path: '/projects/type/hinh-anh-container' },
    ],
  },
  {
    title: 'HỆ THỐNG TOÀN CẦU',
    links: [
      { label: 'Việt Nam – Trụ sở', path: '/global-network/vietnam-hq' },
      { label: 'Singapore – Văn phòng', path: '/global-network/singapore-office' },
      { label: 'Nhật Bản – Văn phòng', path: '/global-network/japan-office' },
      { label: 'Hoa Kỳ – Văn phòng', path: '/global-network/us-office' },
      { label: 'Đối tác quốc tế', path: '/global-network/international-partners' },
    ],
  },
  {
    title: 'PHỤNG SỰ XÃ HỘI',
    links: [
      { label: 'Giới thiệu triết lý', path: '/scholarship-community/fund-overview' },
      { label: 'Hoạt động cộng đồng', path: '/scholarship-community/community-activities' },
      { label: 'Quỹ học bổng', path: '/scholarship-community/scholarship-program' },
      { label: 'Báo cáo & tác động', path: '/scholarship-community/workforce-development' },
    ],
  },
] as const;

type FooterContactIcon = 'location' | 'phone' | 'mail' | 'website';

const FOOTER_CONTACT_ITEMS = [
  {
    label: HEADER_HOTLINE_NUMBER,
    path: `tel:${HEADER_HOTLINE_TEL}`,
    icon: 'phone' as FooterContactIcon,
  },
  {
    label: 'info@anslife.net',
    path: 'mailto:info@anslife.net',
    icon: 'mail' as FooterContactIcon,
  },
  {
    label: 'www.anslife.net',
    path: 'https://anslife.net',
    icon: 'website' as FooterContactIcon,
  },
] as const;

const FOOTER_LEGAL_LINKS = [
  { label: 'Chính sách bảo mật', path: '/contact/company-info' },
  { label: 'Điều khoản sử dụng', path: '/commercial-process' },
] as const;
const TOAM_PRODUCT_MENU_FALLBACK: MenuChildItem[] = [
  {
    label: 'Sofa - Ghế thư giãn',
    path: '/products/category/sofa-ghe-thu-gian',
    children: [
      { label: 'Ưu đãi độc quyền', path: '/products/category/sofa-uu-dai-doc-quyen' },
      { label: 'Sofa góc - Sofa bộ', path: '/products/category/sofa-goc-sofa-bo' },
      { label: 'Sofa thư giãn Recliner', path: '/products/category/sofa-thu-gian-recliner' },
      { label: 'Sofa đơn', path: '/products/category/sofa-don' },
      { label: 'Sofa 2 chỗ', path: '/products/category/sofa-2-cho' },
      { label: 'Sofa 3 chỗ', path: '/products/category/sofa-3-cho' },
      { label: 'Sofa bed', path: '/products/category/sofa-bed' },
      { label: 'Đôn - Ottoman', path: '/products/category/sofa-don-ottoman' },
      { label: 'Sofa da bò', path: '/products/category/sofa-da-bo' },
    ],
  },
  {
    label: 'Bàn',
    path: '/products/category/ban',
    children: [
      { label: 'Bộ bàn ăn', path: '/products/category/ban-bo-ban-an' },
      { label: 'Bàn ăn', path: '/products/category/ban-ban-an' },
      { label: 'Bàn Cafe - Bàn trà', path: '/products/category/ban-cafe-ban-tra' },
      { label: 'Bàn Console - Kệ Console', path: '/products/category/ban-console-ke-console' },
      { label: 'Bàn Lamp - Bàn góc', path: '/products/category/ban-lamp-ban-goc' },
      { label: 'Bàn học - Bàn làm việc', path: '/products/category/ban-hoc-ban-lam-viec' },
      { label: 'Bàn - Tủ trang điểm', path: '/products/category/ban-tu-trang-diem' },
      { label: 'Bàn ngoài trời', path: '/products/category/ban-ngoai-troi' },
    ],
  },
  {
    label: 'Ghế',
    path: '/products/category/ghe',
    children: [
      { label: 'Ghế', path: '/products/category/ghe-ghe' },
      { label: 'Ghế Bar - Ghế đôn', path: '/products/category/ghe-bar-ghe-don' },
      { label: 'Ghế Bench', path: '/products/category/ghe-bench' },
      { label: 'Ghế ngoài trời', path: '/products/category/ghe-ngoai-troi' },
      { label: 'Ghế học - Ghế làm việc', path: '/products/category/ghe-hoc-ghe-lam-viec' },
    ],
  },
  {
    label: 'Tủ - Kệ',
    path: '/products/category/tu-ke',
    children: [
      { label: 'Tủ Tivi - Kệ Tivi', path: '/products/category/tu-ke-tu-tivi-ke-tivi' },
      { label: 'Tủ đầu giường', path: '/products/category/tu-ke-tu-dau-giuong' },
      {
        label: 'Tủ kính - Tủ trưng bầy - Tủ sách',
        path: '/products/category/tu-ke-tu-kinh-trung-bay-tu-sach',
      },
      {
        label: 'Tủ Sideboard - Tủ Buffet',
        path: '/products/category/tu-ke-tu-sideboard-tu-buffet',
      },
      {
        label: 'Tủ ngăn kéo - Tủ trang trí nhỏ',
        path: '/products/category/tu-ke-tu-ngan-keo-tu-trang-tri-nho',
      },
      { label: 'Tủ nhà tắm - Lavabo', path: '/products/category/tu-ke-tu-nha-tam-lavabo' },
      { label: 'Tủ - Kệ giầy', path: '/products/category/tu-ke-tu-ke-giay' },
      { label: 'Tủ quần áo', path: '/products/category/tu-ke-tu-quan-ao' },
    ],
  },
  {
    label: 'Giường',
    path: '/products/category/giuong',
    children: [
      { label: 'Giường đơn - Cũi', path: '/products/category/giuong-don-cui' },
      { label: 'Giường tầng', path: '/products/category/giuong-tang' },
      { label: 'Giường Queen', path: '/products/category/giuong-queen' },
      { label: 'Giường King', path: '/products/category/giuong-king' },
      { label: 'Giường 2m2', path: '/products/category/giuong-2m2' },
      { label: 'Bộ phòng ngủ', path: '/products/category/bo-phong-ngu' },
    ],
  },
  { label: 'Đệm', path: '/products/category/dem' },
  {
    label: 'Đồ trang trí',
    path: '/products/category/do-trang-tri',
    children: [
      { label: 'Đồ trang trí Giáng Sinh', path: '/products/category/do-trang-tri-giang-sinh' },
      { label: 'Pha lê cao cấp Bohemia', path: '/products/category/pha-le-cao-cap-bohemia' },
      { label: 'Tranh', path: '/products/category/do-trang-tri-tranh' },
      { label: 'Phụ kiện trang trí', path: '/products/category/phu-kien-trang-tri' },
      { label: 'Đèn', path: '/products/category/do-trang-tri-den' },
      { label: 'Bình hoa - Lọ hoa', path: '/products/category/binh-hoa-lo-hoa' },
      { label: 'Hoa giả- cây giả', path: '/products/category/hoa-gia-cay-gia' },
    ],
  },
  {
    label: 'Đồ gia dụng',
    path: '/products/category/do-gia-dung',
    children: [
      { label: 'Đồ gia dụng - Đồ nhà bếp', path: '/products/category/do-gia-dung-do-nha-bep' },
      {
        label: 'Khăn trải bàn - Tấm lót trang trí',
        path: '/products/category/khan-trai-ban-tam-lot-trang-tri',
      },
      { label: 'Thảm', path: '/products/category/do-gia-dung-tham' },
      { label: 'Giỏ trang trí - Hộp trang trí', path: '/products/category/gio-trang-tri-hop-trang-tri' },
      { label: 'Nến - Tinh dầu thơm', path: '/products/category/nen-tinh-dau-thom' },
      { label: 'Bộ chăn ga gối', path: '/products/category/bo-chan-ga-goi' },
      { label: 'Vỏ gối trang trí', path: '/products/category/vo-goi-trang-tri' },
      { label: 'Gương trang trí', path: '/products/category/guong-trang-tri' },
    ],
  },
  {
    label: 'Không gian ngoài trời',
    path: '/products/category/khong-gian-ngoai-troi',
    children: [
      { label: 'Bàn ngoài trời', path: '/products/category/khong-gian-ban-ngoai-troi' },
      { label: 'Ghế ngoài trời', path: '/products/category/khong-gian-ghe-ngoai-troi' },
      {
        label: 'Bộ bàn ghế ngoài trời',
        path: '/products/category/khong-gian-bo-ban-ghe-ngoai-troi',
      },
      {
        label: 'Sản phẩm ngoài trời khác',
        path: '/products/category/khong-gian-san-pham-ngoai-troi-khac',
      },
    ],
  },
  { label: 'Đồ cho bé', path: '/products/category/do-cho-be' },
];
const DEFAULT_SITE_BG_VIDEO_MP4 = '/assets/videos/home-bg.mp4';
const DEFAULT_SITE_BG_VIDEO_POSTER = '/assets/videos/home-bg-poster.jpg';

function normalizeCategoryId(
  value: number | string | null | undefined,
): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : null;
}

function buildProductMenuChildren(categories: WpCategory[]): MenuChildItem[] {
  const normalizedCategories = categories
    .map((category, index) => ({
      index,
      id: normalizeCategoryId(category.id),
      parentId: normalizeCategoryId(category.parentId),
      slug: category.slug?.trim(),
      name: category.name?.trim(),
    }))
    .filter(
      (category): category is { index: number; id: string; parentId: string | null; slug: string; name: string } =>
        Boolean(category.id && category.slug && category.name),
    );

  if (normalizedCategories.length === 0) {
    return [];
  }

  const nodeById = new Map<string, MenuChildItem>();
  for (const category of normalizedCategories) {
    nodeById.set(category.id, {
      label: category.name,
      path: `/products/category/${category.slug}`,
      children: [],
    });
  }

  const roots: MenuChildItem[] = [];
  for (const category of normalizedCategories) {
    const node = nodeById.get(category.id);
    if (!node) {
      continue;
    }

    if (category.parentId && nodeById.has(category.parentId)) {
      const parentNode = nodeById.get(category.parentId);
      if (parentNode) {
        parentNode.children = parentNode.children ?? [];
        parentNode.children.push(node);
      }
      continue;
    }

    roots.push(node);
  }

  const source = roots.length > 0 ? roots : normalizedCategories.map((category) => nodeById.get(category.id)).filter((item): item is MenuChildItem => Boolean(item));

  const pruneEmptyChildren = (items: MenuChildItem[]): MenuChildItem[] =>
    items.map((item) => {
      const nestedChildren = item.children ? pruneEmptyChildren(item.children) : [];
      if (nestedChildren.length > 0) {
        return {
          ...item,
          children: nestedChildren,
        };
      }

      return {
        label: item.label,
        path: item.path,
      };
    });

  return pruneEmptyChildren(source);
}

function renderFooterContactIcon(icon: FooterContactIcon) {
  switch (icon) {
    case 'location':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 2a6.5 6.5 0 0 0-6.5 6.5c0 4.88 5.36 11.9 6.02 12.74a.63.63 0 0 0 .97 0c.66-.84 6.01-7.86 6.01-12.74A6.5 6.5 0 0 0 12 2Zm0 9.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5Z" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M19.2 15.24a3.5 3.5 0 0 0-2.5-1.03h-1.88a1.2 1.2 0 0 0-1 .54l-.9 1.34a13.7 13.7 0 0 1-5-5l1.33-.9c.35-.23.56-.62.56-1.03V8.3a3.5 3.5 0 0 0-1.03-2.5L7.67 4.7a1.8 1.8 0 0 0-2.55 0L3.7 6.13A2.87 2.87 0 0 0 2.88 8.8c.3 2.6 1.42 5.33 3.3 7.9a18.56 18.56 0 0 0 7.9 5.3 2.9 2.9 0 0 0 2.66-.81l1.42-1.43a1.8 1.8 0 0 0 0-2.55l-1.95-1.96Z" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3.5 5A2.5 2.5 0 0 0 1 7.5v9A2.5 2.5 0 0 0 3.5 19h17a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 20.5 5h-17Zm0 2h17c.2 0 .38.08.52.2L12 13.55 2.98 7.2A.8.8 0 0 1 3.5 7Zm-.5 2.08 6.6 4.64a4.2 4.2 0 0 0 4.8 0L21 9.08v7.42a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5V9.08Z" />
        </svg>
      );
    case 'website':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.92 9h-3.18a15.65 15.65 0 0 0-1.32-5A8.05 8.05 0 0 1 19.92 11ZM12 4.08c.9 1.05 1.9 3.05 2.38 5.92H9.62C10.1 7.13 11.1 5.13 12 4.08Zm-3.42 1.94a15.7 15.7 0 0 0-1.32 4.98H4.08a8.05 8.05 0 0 1 4.5-4.98ZM4.08 13h3.18a15.66 15.66 0 0 0 1.32 4.98A8.04 8.04 0 0 1 4.08 13Zm7.92 6.92c-.9-1.05-1.9-3.05-2.38-5.92h4.76c-.48 2.87-1.48 4.87-2.38 5.92Zm3.42-1.94c.59-1.45 1.05-3.15 1.32-4.98h3.18a8.04 8.04 0 0 1-4.5 4.98Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopOpenMenuPath, setDesktopOpenMenuPath] = useState<string | null>(null);
  const [activeProductMegaCategoryPath, setActiveProductMegaCategoryPath] = useState('');
  const [mobileSegmentOpen, setMobileSegmentOpen] = useState(false);
  const [activeHeaderSegmentId, setActiveHeaderSegmentId] = useState<HeaderSegmentId>(
    HEADER_SEGMENT_ITEMS[0].id,
  );
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [mobileLanguageOpen, setMobileLanguageOpen] = useState(false);
  const [mobileUtilityActivePath, setMobileUtilityActivePath] = useState<string | null>(
    null,
  );
  const [mobileUtilityExpandedGroups, setMobileUtilityExpandedGroups] = useState<
    Record<string, boolean>
  >({});
  const [expandedFooterSections, setExpandedFooterSections] = useState<
    Record<string, boolean>
  >({});
  const [searchQuery, setSearchQuery] = useState('');
  const [productMenuLoaded, setProductMenuLoaded] = useState(false);
  const [productMenuChildren, setProductMenuChildren] = useState<MenuChildItem[]>(
    TOAM_PRODUCT_MENU_FALLBACK,
  );
  const [headerAuthUser, setHeaderAuthUser] = useState<AuthUser | null>(null);
  const desktopMenuCloseTimerRef = useRef<number | null>(null);
  const mobileSearchBoxRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t, toLocalizedPath } = useSiteI18n();
  const siteBgVideoWebm =
    process.env.NEXT_PUBLIC_SITE_BG_VIDEO_WEBM?.trim() ||
    process.env.NEXT_PUBLIC_HOME_HERO_VIDEO_WEBM?.trim() ||
    '';
  const siteBgVideoMp4 =
    process.env.NEXT_PUBLIC_SITE_BG_VIDEO_MP4?.trim() ||
    process.env.NEXT_PUBLIC_HOME_HERO_VIDEO_MP4?.trim() ||
    DEFAULT_SITE_BG_VIDEO_MP4;
  const siteBgPoster =
    process.env.NEXT_PUBLIC_SITE_BG_VIDEO_POSTER?.trim() ||
    process.env.NEXT_PUBLIC_HOME_HERO_POSTER?.trim() ||
    DEFAULT_SITE_BG_VIDEO_POSTER;
  const hasGlobalVideoBackground = siteBgVideoWebm.length > 0 || siteBgVideoMp4.length > 0;
  const isAdminRoute = useMemo(
    () => /\/admin(?:\/|$)/.test(location.pathname),
    [location.pathname],
  );
  const isHomeRoute = useMemo(
    () => /^\/(?:vn|en|jp|kr)\/?$/.test(location.pathname),
    [location.pathname],
  );
  const isCompanyIntroRoute = useMemo(
    () => location.pathname.includes('/about-anslife/company-intro'),
    [location.pathname],
  );
  const isAboutWideRoute = useMemo(
    () =>
      /\/about-anslife\/(?:company-intro|vision-mission|core-values|production-philosophy|organization|team|anslife-ecosystem|development-history)(?:\/|$)/.test(
        location.pathname,
      ),
    [location.pathname],
  );
  const isWoodThemeRoute = !isAdminRoute && !isHomeRoute;
  const showGlobalVideoBackground =
    hasGlobalVideoBackground && !isAdminRoute && isHomeRoute;
  const [selectedLanguageOption, setSelectedLanguageOption] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return language;
    }

    return window.localStorage.getItem(LANGUAGE_SELECTOR_STORAGE_KEY) ?? language;
  });
  const topMenuItems = useMemo(
    () =>
      TOP_MENU.map((item) => {
        if (item.path !== PRODUCT_MENU_PATH) {
          return item;
        }

        return {
          ...item,
          children: productMenuChildren,
        };
      }),
    [productMenuChildren],
  );
  const desktopTopMenuItems = useMemo(
    () =>
      topMenuItems.map((item) => ({
        label: item.label,
        path: item.path,
        children: item.children,
      })),
    [topMenuItems],
  );
  const desktopPrimaryMenuCount = useMemo(() => {
    if (!isHomeRoute) {
      return HEADER_PRIMARY_MENU_COUNT;
    }

    const homePreferredPrimaryCount = Math.max(
      HEADER_PRIMARY_MENU_COUNT,
      desktopTopMenuItems.length - 2,
    );
    return Math.min(homePreferredPrimaryCount, desktopTopMenuItems.length);
  }, [desktopTopMenuItems.length, isHomeRoute]);
  const desktopPrimaryTopMenuItems = useMemo(
    () => desktopTopMenuItems.slice(0, desktopPrimaryMenuCount),
    [desktopPrimaryMenuCount, desktopTopMenuItems],
  );
  const desktopSecondaryTopMenuItems = useMemo(
    () => desktopTopMenuItems.slice(desktopPrimaryMenuCount),
    [desktopPrimaryMenuCount, desktopTopMenuItems],
  );
  const mobileUtilityMenuItems = useMemo(
    () =>
      desktopTopMenuItems.map((item) => ({
        label: item.label,
        path: item.path,
        children: item.children,
      })),
    [desktopTopMenuItems],
  );
  const activeMobileUtilityItem = useMemo(
    () =>
      mobileUtilityActivePath
        ? mobileUtilityMenuItems.find((item) => item.path === mobileUtilityActivePath) ?? null
        : null,
    [mobileUtilityActivePath, mobileUtilityMenuItems],
  );
  const productRootCategories = useMemo(() => {
    const productMenuItem = topMenuItems.find((item) => item.path === PRODUCT_MENU_PATH);
    return productMenuItem?.children ?? [];
  }, [topMenuItems]);
  const activeProductMegaCategory = useMemo(() => {
    if (productRootCategories.length === 0) {
      return null;
    }

    return (
      productRootCategories.find(
        (category) => category.path === activeProductMegaCategoryPath,
      ) ?? productRootCategories[0]
    );
  }, [activeProductMegaCategoryPath, productRootCategories]);

  const activeHeaderSegment = useMemo(
    () =>
      HEADER_SEGMENT_ITEMS.find((item) => item.id === activeHeaderSegmentId) ??
      HEADER_SEGMENT_ITEMS[0],
    [activeHeaderSegmentId],
  );
  const activeLanguageOption = supportedLanguageOptions.find(
    (option) => option.code === language,
  );
  const mobileLanguageLabel = activeLanguageOption?.menuLabel ?? language.toUpperCase();
  const mobileLanguageFlag = activeLanguageOption?.flag ?? '🌐';
  const footerYear = new Date().getFullYear();

  const clearDesktopMenuCloseTimer = useCallback(() => {
    if (desktopMenuCloseTimerRef.current !== null) {
      window.clearTimeout(desktopMenuCloseTimerRef.current);
      desktopMenuCloseTimerRef.current = null;
    }
  }, []);

  const openDesktopMenu = useCallback(
    (path: string) => {
      clearDesktopMenuCloseTimer();
      setDesktopOpenMenuPath(path);
    },
    [clearDesktopMenuCloseTimer],
  );

  const scheduleDesktopMenuClose = useCallback(
    (path: string) => {
      clearDesktopMenuCloseTimer();
      desktopMenuCloseTimerRef.current = window.setTimeout(() => {
        setDesktopOpenMenuPath((currentPath) => (currentPath === path ? null : currentPath));
        desktopMenuCloseTimerRef.current = null;
      }, 260);
    },
    [clearDesktopMenuCloseTimer],
  );

  const closeNavigationMenus = useCallback(() => {
    setMobileOpen(false);
    setDesktopOpenMenuPath(null);
  }, []);

  const resetMobileUtilityHierarchy = useCallback(() => {
    setMobileUtilityActivePath(null);
    setMobileUtilityExpandedGroups({});
  }, []);

  useEffect(() => {
    return () => {
      clearDesktopMenuCloseTimer();
    };
  }, [clearDesktopMenuCloseTimer]);

  useEffect(() => {
    if (productRootCategories.length === 0) {
      setActiveProductMegaCategoryPath('');
      return;
    }

    setActiveProductMegaCategoryPath((currentPath) => {
      const categoryStillExists = productRootCategories.some(
        (category) => category.path === currentPath,
      );
      return categoryStillExists ? currentPath : productRootCategories[0].path;
    });
  }, [productRootCategories]);

  const resolveRouteLanguage = useCallback((code: string): LanguageCode | null => {
    const mappedCode = LANGUAGE_ROUTE_ALIAS[code];
    if (mappedCode) {
      return mappedCode;
    }

    return isLanguageCode(code) ? code : null;
  }, []);

  useEffect(() => {
    closeNavigationMenus();
    setMobileSearchOpen(false);
    clearDesktopMenuCloseTimer();
    setMobileSegmentOpen(false);
    resetMobileUtilityHierarchy();
    setSearchQuery('');
    setExpandedFooterSections({});
  }, [
    clearDesktopMenuCloseTimer,
    closeNavigationMenus,
    location.pathname,
    resetMobileUtilityHierarchy,
  ]);

  useEffect(() => {
    let nestedFrameId: number | null = null;
    const frameId = window.requestAnimationFrame(() => {
      nestedFrameId = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      if (nestedFrameId !== null) {
        window.cancelAnimationFrame(nestedFrameId);
      }
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (isAdminRoute) {
      closeNavigationMenus();
    }
  }, [closeNavigationMenus, isAdminRoute]);

  useEffect(() => {
    let isMounted = true;

    async function syncHeaderAuthState() {
      try {
        const user = await getCurrentUser();
        if (isMounted) {
          setHeaderAuthUser(user);
        }
      } catch {
        if (isMounted) {
          setHeaderAuthUser(null);
        }
      }
    }

    void syncHeaderAuthState();
    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  useEffect(() => {
    setSelectedLanguageOption((currentCode) =>
      resolveRouteLanguage(currentCode) ? language : currentCode,
    );
  }, [language, resolveRouteLanguage]);

  useEffect(() => {
    let isMounted = true;

    async function loadProductMenuCategories() {
      try {
        const categories = await getProductCategories();
        const nextProductMenuChildren = buildProductMenuChildren(categories);

        if (!isMounted) {
          return;
        }

        if (nextProductMenuChildren.length > 0) {
          setProductMenuChildren(nextProductMenuChildren);
        }
      } catch (error) {
        console.error('[SiteLayout] Failed to load product menu categories:', error);
      } finally {
        if (isMounted) {
          setProductMenuLoaded(true);
        }
      }
    }

    void loadProductMenuCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const authMenuPath = headerAuthUser ? '/admin/users' : '/admin/login';
  const headerLoginLabel = headerAuthUser ? t('Quản trị') : t('Đăng nhập');
  const isExternalPath = useCallback(
    (path: string) => /^(https?:\/\/|mailto:|tel:)/i.test(path),
    [],
  );

  const renderMenuLeaf = useCallback(
    (item: MenuChildItem, className: string, keyPrefix: string): ReactNode => {
      const key = `${keyPrefix}-${item.path}-${item.label}`;
      const resolvedPath = toLocalizedPath(item.path);
      const resolvedLabel = t(item.label);

      if (isExternalPath(item.path)) {
        return (
          <a
            key={key}
            href={resolvedPath}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              closeNavigationMenus();
              if (event.detail > 0) {
                event.currentTarget.blur();
              }
            }}
          >
            {resolvedLabel}
          </a>
        );
      }

      return (
        <NavLink
          key={key}
          to={resolvedPath}
          className={className}
          onClick={(event) => {
            closeNavigationMenus();
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          {resolvedLabel}
        </NavLink>
      );
    },
    [closeNavigationMenus, isExternalPath, t, toLocalizedPath],
  );

  const renderProductMegaLeaf = useCallback(
    (item: MenuChildItem, className: string): ReactNode => {
      const resolvedPath = toLocalizedPath(item.path);
      const resolvedLabel = t(item.label);
      const hasChildren = Boolean(item.children && item.children.length > 0);

      if (hasChildren) {
        return (
          <span className={`${className} product-mega-static`} aria-label={resolvedLabel}>
            {resolvedLabel}
          </span>
        );
      }

      if (isExternalPath(item.path)) {
        return (
          <a
            href={resolvedPath}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeNavigationMenus}
          >
            {resolvedLabel}
          </a>
        );
      }

      return (
        <NavLink
          to={resolvedPath}
          className={className}
          onClick={closeNavigationMenus}
        >
          {resolvedLabel}
        </NavLink>
      );
    },
    [closeNavigationMenus, isExternalPath, t, toLocalizedPath],
  );

  function renderProductMegaTreeList(
    items: MenuChildItem[],
    depth = 0,
  ): ReactNode {
    if (items.length === 0) {
      return null;
    }

    return (
      <ul
        className={
          depth === 0
            ? 'product-mega-list'
            : 'product-mega-list product-mega-list-nested'
        }
      >
        {items.map((item, index) => (
          <li key={`product-mega-${depth}-${item.path}-${item.label}-${index}`}>
            {renderProductMegaLeaf(
              item,
              depth === 0
                ? 'product-mega-link'
                : 'product-mega-link product-mega-link-nested',
            )}
            {item.children && item.children.length > 0 && (
              <div className="product-mega-children">
                {renderProductMegaTreeList(item.children, depth + 1)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  }

  const renderDesktopSubmenuItems = useCallback(
    (items: MenuChildItem[], depth = 0): ReactNode =>
      items.map((item) => {
        const hasChildren = Boolean(item.children && item.children.length > 0);
        if (!hasChildren) {
          const className = depth === 0 ? 'submenu-link' : 'submenu-link submenu-link-nested';
          return renderMenuLeaf(item, className, `desktop-${depth}`);
        }

        if (depth === 0) {
          const key = `desktop-parent-${depth}-${item.path}-${item.label}`;
          const label = t(item.label);
          const parentNode = (
            <button
              key={key}
              type="button"
              className="submenu-link submenu-link-parent submenu-link-button"
              aria-haspopup="true"
              aria-label={label}
              onClick={(event) => event.preventDefault()}
            >
              {label}
              <span className="submenu-link-arrow" aria-hidden="true">
                ›
              </span>
            </button>
          );

          return (
            <div key={`desktop-group-${item.path}-${item.label}`} className="submenu-flyout-item">
              {parentNode}
              <div className="submenu-flyout-panel">
                {renderDesktopSubmenuItems(item.children ?? [], depth + 1)}
              </div>
            </div>
          );
        }

        return (
          <div
            key={`desktop-nested-${item.path}-${item.label}`}
            className="submenu-group"
          >
            <p className="submenu-group-title">{t(item.label)}</p>
            <div className="submenu-group-list">
              {renderDesktopSubmenuItems(item.children ?? [], depth + 1)}
            </div>
          </div>
        );
      }),
    [renderMenuLeaf, t],
  );

  useEffect(() => {
    if (!mobileOpen) {
      setMobileSegmentOpen(false);
      setMobileLanguageOpen(false);
      resetMobileUtilityHierarchy();
    }
  }, [mobileOpen, resetMobileUtilityHierarchy]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    setMobileSearchOpen(false);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileSearchOpen) {
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      const inputNode = mobileSearchBoxRef.current?.querySelector('input');
      if (inputNode instanceof HTMLInputElement) {
        inputNode.focus();
        inputNode.select();
      }
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (!mobileSearchOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileSearchOverlay();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileSearchOpen]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const lockedScrollY = window.scrollY;
    const body = document.body;
    body.classList.add('mobile-menu-open');
    body.style.top = `-${lockedScrollY}px`;

    return () => {
      body.classList.remove('mobile-menu-open');
      body.style.top = '';
      window.scrollTo({ top: lockedScrollY, behavior: 'auto' });
    };
  }, [mobileOpen]);

  function handleLanguageSelect(code: LanguageCode) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    setShowLanguagePopup(false);
    setMobileLanguageOpen(false);
    const targetPath = withLanguagePath(
      `${location.pathname}${location.search}${location.hash}`,
      code,
    );
    navigate(targetPath, { replace: true });
    closeNavigationMenus();
  }

  function handleMobileSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rawQuery = searchQuery.trim();
    if (!rawQuery) {
      return;
    }

    navigate(toLocalizedPath(`/search?q=${encodeURIComponent(rawQuery)}`));
    setMobileSearchOpen(false);
    setSearchQuery('');
    closeNavigationMenus();
  }

  function closeMobileSearchOverlay() {
    setMobileSearchOpen(false);
    setSearchQuery('');
  }

  function scrollToTopAfterNavigation() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    });
  }

  function handleBrandClick() {
    closeNavigationMenus();
    setMobileSearchOpen(false);
    setSearchQuery('');
    scrollToTopAfterNavigation();
  }

  function renderMobileUtilitySubmenuItems(
    items: MenuChildItem[],
    keyPrefix: string,
    depth = 0,
  ): ReactNode {
    if (items.length === 0) {
      return <p className="mobile-menu-empty">{t('Mục này đang được cập nhật.')}</p>;
    }

    return items.map((item, index) => {
      const hasChildren = Boolean(item.children && item.children.length > 0);
      const itemKey = `${keyPrefix}-${depth}-${item.path}-${item.label}-${index}`;
      const paddingLeft = `${0.9 + depth * 0.8}rem`;

      if (!hasChildren) {
        if (isExternalPath(item.path)) {
          return (
            <a
              key={itemKey}
              href={toLocalizedPath(item.path)}
              className={`mobile-menu-utility-sub-link ${depth > 0 ? 'is-nested' : ''}`}
              style={{ paddingLeft }}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                closeNavigationMenus();
                resetMobileUtilityHierarchy();
              }}
            >
              {t(item.label)}
            </a>
          );
        }

        return (
          <NavLink
            key={itemKey}
            to={toLocalizedPath(item.path)}
            className={({ isActive }) =>
              `mobile-menu-utility-sub-link ${depth > 0 ? 'is-nested' : ''} ${
                isActive ? 'is-active' : ''
              }`
            }
            style={{ paddingLeft }}
            onClick={() => {
              closeNavigationMenus();
              resetMobileUtilityHierarchy();
            }}
          >
            {t(item.label)}
          </NavLink>
        );
      }

      const isOpen = Boolean(mobileUtilityExpandedGroups[itemKey]);

      return (
        <div
          key={itemKey}
          className={`mobile-menu-utility-subitem ${isOpen ? 'is-open' : ''}`}
        >
          <button
            type="button"
            className={`mobile-menu-utility-subtoggle ${depth > 0 ? 'is-nested' : ''}`}
            style={{ paddingLeft }}
            aria-expanded={isOpen}
            onClick={() =>
              setMobileUtilityExpandedGroups((currentGroups) => ({
                ...currentGroups,
                [itemKey]: !currentGroups[itemKey],
              }))
            }
          >
            <span>{t(item.label)}</span>
            <span className="mobile-menu-utility-sub-caret" aria-hidden="true">
              ▾
            </span>
          </button>
          {isOpen && (
            <div className="mobile-menu-utility-subchildren">
              {renderMobileUtilitySubmenuItems(item.children ?? [], itemKey, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  }

  function renderDesktopMenuItem(item: MenuChildItem): ReactNode {
    const isProductMegaMenu = item.path === PRODUCT_MENU_PATH;
    const hasChildren = isProductMegaMenu
      ? true
      : Boolean(item.children && item.children.length > 0);
    const resolvedPath = item.path;
    const resolvedLabel = t(item.label);
    const linkClassName = `menu-link ${hasChildren ? 'has-children' : ''}`;

    return (
      <div
        key={item.path}
        className={`menu-item-group ${hasChildren ? 'has-children' : ''} ${
          desktopOpenMenuPath === item.path ? 'is-open' : ''
        } ${isProductMegaMenu ? 'is-product-menu' : ''}`}
        onMouseEnter={
          hasChildren ? () => openDesktopMenu(item.path) : undefined
        }
        onMouseLeave={
          hasChildren
            ? () => scheduleDesktopMenuClose(item.path)
            : undefined
        }
        onFocusCapture={
          hasChildren ? () => openDesktopMenu(item.path) : undefined
        }
        onBlurCapture={
          hasChildren
            ? (event) => {
                const nextTarget = event.relatedTarget;
                if (
                  nextTarget instanceof Node &&
                  event.currentTarget.contains(nextTarget)
                ) {
                  return;
                }
                scheduleDesktopMenuClose(item.path);
              }
            : undefined
        }
      >
        {hasChildren && item.path !== '/' ? (
          <button
            type="button"
            className={`${linkClassName} menu-link-button ${
              desktopOpenMenuPath === item.path ? 'is-active' : ''
            }`}
            aria-haspopup="true"
            aria-expanded={desktopOpenMenuPath === item.path}
            aria-label={resolvedLabel}
            onMouseDown={(event) => {
              // Keep desktop dropdown open-by-hover only for pointer interaction.
              event.preventDefault();
            }}
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            {resolvedLabel}
          </button>
        ) : isExternalPath(resolvedPath) ? (
          <a
            href={toLocalizedPath(resolvedPath)}
            className={linkClassName}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              closeNavigationMenus();
              if (event.detail > 0) {
                event.currentTarget.blur();
              }
            }}
          >
            {resolvedLabel}
          </a>
        ) : (
          <NavLink
            to={toLocalizedPath(resolvedPath)}
            className={({ isActive }) =>
              `${linkClassName} ${isActive ? 'is-active' : ''}`
            }
            onClick={(event) => {
              closeNavigationMenus();
              if (event.detail > 0) {
                event.currentTarget.blur();
              }
            }}
            end={item.path === '/'}
          >
            {resolvedLabel}
          </NavLink>
        )}

        {hasChildren &&
          (isProductMegaMenu ? (
            <div
              className="submenu product-mega-menu product-mega-sheet"
              role="menu"
              aria-label={t('Danh mục sản phẩm')}
              onMouseEnter={() => openDesktopMenu(item.path)}
            >
              <div className="product-mega-shell">
                <aside className="product-mega-sidebar">
                  {!productMenuLoaded && productRootCategories.length === 0 ? (
                    <p className="product-mega-empty">
                      {t('Đang tải danh mục sản phẩm...')}
                    </p>
                  ) : productRootCategories.length > 0 ? (
                    <div className="product-mega-root-list">
                      {productRootCategories.map((category) => {
                        const isActive =
                          activeProductMegaCategory?.path === category.path;
                        const childCount = category.children?.length ?? 0;
                        const hasCategoryChildren = childCount > 0;
                        const categoryLabel = t(category.label);

                        if (hasCategoryChildren) {
                          return (
                            <button
                              key={`product-root-${category.path}`}
                              type="button"
                              onMouseEnter={() =>
                                setActiveProductMegaCategoryPath(category.path)
                              }
                              onFocus={() =>
                                setActiveProductMegaCategoryPath(category.path)
                              }
                              onClick={(event) => {
                                event.preventDefault();
                                setActiveProductMegaCategoryPath(category.path);
                              }}
                              className={`product-mega-root-item ${
                                isActive ? 'active' : ''
                              }`}
                            >
                              <span>{categoryLabel}</span>
                              <span className="product-mega-root-count">
                                {childCount > 0 ? childCount : '•'}
                              </span>
                            </button>
                          );
                        }

                        if (isExternalPath(category.path)) {
                          return (
                            <a
                              key={`product-root-${category.path}`}
                              href={toLocalizedPath(category.path)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onMouseEnter={() =>
                                setActiveProductMegaCategoryPath(category.path)
                              }
                              onFocus={() =>
                                setActiveProductMegaCategoryPath(category.path)
                              }
                              onClick={() => setDesktopOpenMenuPath(null)}
                              className={`product-mega-root-item ${
                                isActive ? 'active' : ''
                              }`}
                            >
                              <span>{categoryLabel}</span>
                              <span className="product-mega-root-count">
                                {childCount > 0 ? childCount : '•'}
                              </span>
                            </a>
                          );
                        }

                        return (
                          <NavLink
                            key={`product-root-${category.path}`}
                            to={toLocalizedPath(category.path)}
                            onMouseEnter={() =>
                              setActiveProductMegaCategoryPath(category.path)
                            }
                            onFocus={() =>
                              setActiveProductMegaCategoryPath(category.path)
                            }
                            onClick={() => setDesktopOpenMenuPath(null)}
                            className={`product-mega-root-item ${
                              isActive ? 'active' : ''
                            }`}
                          >
                            <span>{categoryLabel}</span>
                            <span className="product-mega-root-count">
                              {childCount > 0 ? childCount : '•'}
                            </span>
                          </NavLink>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="product-mega-empty">
                      {t('Chưa có danh mục trong cơ sở dữ liệu.')}
                    </p>
                  )}
                </aside>

                <div className="product-mega-content">
                  {activeProductMegaCategory ? (
                    <>
                      {renderProductMegaLeaf(
                        activeProductMegaCategory,
                        'product-mega-heading',
                      )}
                      <p className="product-mega-caption">
                        {activeProductMegaCategory.children?.length
                          ? `${activeProductMegaCategory.children.length} ${t(
                              'nhóm sản phẩm',
                            )}`
                          : t('Danh mục này chưa có nhóm con.')}
                      </p>

                      {activeProductMegaCategory.children &&
                      activeProductMegaCategory.children.length > 0 ? (
                        <div className="product-mega-card-grid">
                          {activeProductMegaCategory.children.map((branch) => (
                            <article
                              key={`product-branch-${branch.path}-${branch.label}`}
                              className="product-mega-card"
                            >
                              {renderProductMegaLeaf(
                                branch,
                                'product-mega-card-title',
                              )}

                              {branch.children && branch.children.length > 0 ? (
                                <div className="product-mega-card-list">
                                  {renderProductMegaTreeList(branch.children)}
                                </div>
                              ) : isExternalPath(branch.path) ? (
                                <a
                                  href={toLocalizedPath(branch.path)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="product-mega-card-action"
                                  onClick={() => setDesktopOpenMenuPath(null)}
                                >
                                  {t('Xem sản phẩm')}
                                </a>
                              ) : (
                                <NavLink
                                  to={toLocalizedPath(branch.path)}
                                  className="product-mega-card-action"
                                  onClick={() => setDesktopOpenMenuPath(null)}
                                >
                                  {t('Xem sản phẩm')}
                                </NavLink>
                              )}
                            </article>
                          ))}
                        </div>
                      ) : (
                        <p className="product-mega-empty">
                          {t(
                            'Nội dung danh mục này đang được cập nhật.',
                          )}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="product-mega-empty">
                      {t('Chưa có danh mục để hiển thị.')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className="submenu"
              role="menu"
              aria-label={`Mục con ${item.label}`}
            >
              {renderDesktopSubmenuItems(item.children ?? [])}
            </div>
          ))}
      </div>
    );
  }

  function renderLanguageSwitcher(selectId = 'language-switcher') {
    return (
      <div className="header-language">
        <label htmlFor={selectId} className="sr-only">
          Chọn ngôn ngữ
        </label>
        <select
          id={selectId}
          className="language-switcher"
          value={selectedLanguageOption}
          onChange={(event) => {
            const nextValue = event.target.value;
            setSelectedLanguageOption(nextValue);
            window.localStorage.setItem(LANGUAGE_SELECTOR_STORAGE_KEY, nextValue);

            const routeLanguage = resolveRouteLanguage(nextValue);
            if (routeLanguage) {
              handleLanguageSelect(routeLanguage);
              return;
            }

            if (!getStoredLanguage()) {
              window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
            }
            setShowLanguagePopup(false);
          }}
        >
          <optgroup label={t('Ngôn ngữ đã hỗ trợ')}>
            {supportedLanguageOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label}
              </option>
            ))}
          </optgroup>
          <optgroup label={t('Tất cả ngôn ngữ khác (sẽ hỗ trợ sau)')}>
            {additionalLanguageOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    );
  }

  const toggleFooterSection = useCallback((sectionKey: string) => {
    setExpandedFooterSections((currentState) => ({
      ...currentState,
      [sectionKey]: !currentState[sectionKey],
    }));
  }, []);

  function renderFooterSectionToggle(
    sectionKey: string,
    sectionId: string,
    label: string,
    isSectionExpanded: boolean,
  ) {
    return (
      <button
        type="button"
        className={`site-footer-section-toggle ${isSectionExpanded ? 'is-open' : ''}`}
        aria-expanded={isSectionExpanded}
        aria-controls={sectionId}
        onClick={() => toggleFooterSection(sectionKey)}
      >
        <span>{label}</span>
        <span className="site-footer-section-caret" aria-hidden="true">
          ▾
        </span>
      </button>
    );
  }

  const footerContactSectionKey = 'contact';
  const footerContactSectionId = 'site-footer-contact-list';
  const isFooterContactExpanded = Boolean(expandedFooterSections[footerContactSectionKey]);

  return (
    <div
      className={`site-shell ${isAdminRoute ? 'is-admin-route' : ''} ${
        !isAdminRoute && isHomeRoute ? 'is-home-route' : ''
      } ${
        !isAdminRoute && isCompanyIntroRoute ? 'is-company-intro-route' : ''
      } ${
        !isAdminRoute && isAboutWideRoute ? 'is-about-wide-route' : ''
      } ${
        isWoodThemeRoute ? 'is-wood-theme-route' : ''
      } ${
        showGlobalVideoBackground ? 'has-global-video' : ''
      }`}
    >
      {showGlobalVideoBackground && (
        <div className="site-global-video-layer" aria-hidden="true">
          <video
            className="site-global-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={siteBgPoster || undefined}
          >
            {siteBgVideoWebm && <source src={siteBgVideoWebm} type="video/webm" />}
            {siteBgVideoMp4 && <source src={siteBgVideoMp4} type="video/mp4" />}
          </video>
          <div className="site-global-video-mask" />
        </div>
      )}

      {showLanguagePopup && (
        <div className="language-popup-overlay" role="dialog" aria-modal="true">
          <div className="language-popup-card">
            <p className="kicker">Language</p>
            <h2>Chọn ngôn ngữ / Select language</h2>
            <p>Vui lòng chọn ngôn ngữ để tiếp tục vào website.</p>
            <div className="language-popup-grid">
              {supportedLanguageOptions.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  className="language-popup-option"
                  onClick={() => handleLanguageSelect(option.code)}
                >
                  <strong>{option.label}</strong>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className={`topbar ${isWoodThemeRoute ? 'is-company-intro-theme' : ''}`}>
        <div className="topbar-inner">
          {!isAdminRoute && (
            <div className="topbar-utility">
              <nav className="topbar-segment-nav" aria-label={t('Nhóm khách hàng')}>
                {HEADER_SEGMENT_ITEMS.map((item) => (
                  <span key={item.id} className="topbar-segment-link topbar-segment-label">
                    {t(item.label)}
                  </span>
                ))}
              </nav>

              <div className="topbar-utility-right">
                <nav className="topbar-meta-nav" aria-label={t('Liên kết nhanh')}>
                  {HEADER_UTILITY_LINKS.map((item) => (
                    <NavLink
                      key={item.path}
                      to={toLocalizedPath(item.path)}
                      className={({ isActive }) =>
                        `topbar-meta-link ${isActive ? 'is-active' : ''}`
                      }
                      onClick={closeNavigationMenus}
                    >
                      {t(item.label)}
                    </NavLink>
                  ))}
                </nav>

                <a className="topbar-hotline" href={`tel:${HEADER_HOTLINE_TEL}`}>
                  <span aria-hidden="true">☎</span>
                  <span>{HEADER_HOTLINE_NUMBER}</span>
                </a>

                {renderLanguageSwitcher('language-switcher-utility')}
              </div>
            </div>
          )}

          <div className={`topbar-primary ${isAdminRoute ? 'is-admin-route' : ''}`}>
            {!isAdminRoute && (
              <button
                type="button"
                className="mobile-home-menu-fab"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu-panel"
                aria-label={mobileOpen ? t('Đóng menu') : t('Mở menu')}
                onClick={(event) => {
                  event.stopPropagation();
                  closeMobileSearchOverlay();
                  setMobileOpen(true);
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            )}
            <NavLink
              to={toLocalizedPath('/')}
              className="brand"
              onClick={handleBrandClick}
            >
              <img
                src="/assets/anslife-logo.png"
                alt="ANSLIFE"
                className="brand-logo"
                loading="eager"
                decoding="async"
              />
            </NavLink>
            {!isAdminRoute && (
              <button
                type="button"
                className={`mobile-home-search-fab ${mobileSearchOpen ? 'is-active' : ''}`}
                aria-expanded={mobileSearchOpen}
                aria-label={t('Tìm kiếm')}
                onClick={(event) => {
                  event.stopPropagation();
                  closeNavigationMenus();
                  setMobileSearchOpen((currentState) => {
                    const nextState = !currentState;
                    if (!nextState) {
                      setSearchQuery('');
                    }
                    return nextState;
                  });
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m16 16 4 4" />
                </svg>
              </button>
            )}
            {isAdminRoute && renderLanguageSwitcher('language-switcher-admin')}
          </div>

          {!isAdminRoute && (
            <>
              <nav className="main-nav main-nav-primary" aria-label={t('Danh mục điều hướng')}>
                {desktopPrimaryTopMenuItems.map((item) => renderDesktopMenuItem(item))}
              </nav>
              {desktopSecondaryTopMenuItems.length > 0 && (
                <nav className="main-nav main-nav-secondary" aria-label={t('Liên kết nhanh')}>
                  {desktopSecondaryTopMenuItems.map((item) => renderDesktopMenuItem(item))}
                </nav>
              )}

              <Link
                to={toLocalizedPath(authMenuPath)}
                className="header-login-button"
                onClick={closeNavigationMenus}
              >
                {headerLoginLabel}
              </Link>

            </>
          )}
        </div>
      </header>

      {!isAdminRoute &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`mobile-search-overlay ${mobileSearchOpen ? 'is-open' : ''}`}
            aria-hidden={!mobileSearchOpen}
          >
            <div
              className="mobile-search-panel"
              role="dialog"
              aria-modal="true"
              aria-label={t('Tìm kiếm')}
              ref={mobileSearchBoxRef}
            >
              <button
                type="button"
                className="mobile-search-close"
                aria-label={t('Đóng tìm kiếm')}
                onClick={closeMobileSearchOverlay}
              >
                ×
              </button>

              <form
                className="mobile-search-content"
                role="search"
                onSubmit={handleMobileSearchSubmit}
              >
                <p className="mobile-search-title">{t('Tìm kiếm')}</p>
                <div className="mobile-search-field-row">
                  <input
                    type="text"
                    inputMode="search"
                    aria-label={t('Tìm kiếm')}
                    placeholder={t('Tìm sản phẩm, dự án, tin tức...')}
                    value={searchQuery}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    className="mobile-search-field-input"
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                  <button
                    type="submit"
                    className="mobile-search-field-icon"
                    aria-label={t('Tìm kiếm')}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <circle cx="11" cy="11" r="6.5" />
                      <path d="m16 16 4 4" />
                    </svg>
                  </button>
                </div>
                <button type="submit" className="mobile-search-submit">
                  {t('Tìm kiếm')}
                </button>
              </form>
            </div>
          </div>,
          document.body,
        )}

      {!isAdminRoute &&
        mobileOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="mobile-menu-overlay is-open"
            aria-hidden={false}
          >
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label={t('Đóng menu')}
            onClick={() => setMobileOpen(false)}
          />
          <aside
            id="mobile-menu-panel"
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t('Danh mục điều hướng')}
          >
            <div className="mobile-menu-head">
              <Link
                to={toLocalizedPath('/')}
                className="mobile-menu-brand"
                onClick={closeNavigationMenus}
              >
                <img
                  src="/assets/anslife-logo.png"
                  alt="ANSLIFE"
                  className="mobile-menu-brand-logo"
                  loading="eager"
                  decoding="async"
                />
              </Link>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label={t('Đóng menu')}
                onClick={() => setMobileOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="mobile-menu-body">
              {!activeMobileUtilityItem && (
                <>
                  <button
                    type="button"
                    className={`mobile-menu-segment-toggle ${mobileSegmentOpen ? 'is-open' : ''}`}
                    aria-expanded={mobileSegmentOpen}
                    onClick={() => setMobileSegmentOpen((currentValue) => !currentValue)}
                  >
                    <span className="mobile-menu-segment-icon" aria-hidden="true">
                      ●
                    </span>
                    <span className="mobile-menu-segment-copy">
                      <small>{t('Bạn đang truy cập')}</small>
                      <strong>{t(activeHeaderSegment.label)}</strong>
                    </span>
                    <span className="mobile-menu-segment-caret" aria-hidden="true">
                      ▾
                    </span>
                  </button>

                  {mobileSegmentOpen && (
                    <div className="mobile-menu-segment-options">
                      {HEADER_SEGMENT_ITEMS.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`mobile-menu-segment-option ${
                            activeHeaderSegment.id === item.id ? 'is-active' : ''
                          }`}
                          onClick={() => {
                            setActiveHeaderSegmentId(item.id);
                            setMobileSegmentOpen(false);
                          }}
                        >
                          {t(item.label)}
                        </button>
                      ))}
                    </div>
                  )}

                  <Link
                    to={toLocalizedPath(authMenuPath)}
                    className="mobile-menu-login-row"
                    onClick={closeNavigationMenus}
                  >
                    {headerLoginLabel}
                  </Link>
                </>
              )}

              {activeMobileUtilityItem ? (
                <section
                  className="mobile-menu-utility-subpanel"
                  aria-label={t(activeMobileUtilityItem.label)}
                >
                  <button
                    type="button"
                    className="mobile-menu-utility-back"
                    onClick={resetMobileUtilityHierarchy}
                  >
                    <span className="mobile-menu-utility-back-icon" aria-hidden="true">
                      ←
                    </span>
                    <span>{t(activeMobileUtilityItem.label)}</span>
                  </button>

                  <nav className="mobile-menu-utility-sublist">
                    {renderMobileUtilitySubmenuItems(
                      activeMobileUtilityItem.children ?? [],
                      `mobile-utility-${activeMobileUtilityItem.path}`,
                    )}
                  </nav>
                </section>
              ) : (
                <nav className="mobile-menu-utility" aria-label={t('Liên kết nhanh')}>
                  {mobileUtilityMenuItems.map((item) => {
                    const hasChildren = Boolean(item.children && item.children.length > 0);
                    if (!hasChildren) {
                      return (
                        <NavLink
                          key={item.path}
                          to={toLocalizedPath(item.path)}
                          className={({ isActive }) =>
                            `mobile-menu-utility-link ${isActive ? 'is-active' : ''}`
                          }
                          onClick={closeNavigationMenus}
                        >
                          {t(item.label)}
                        </NavLink>
                      );
                    }

                    return (
                      <button
                        key={item.path}
                        type="button"
                        className="mobile-menu-utility-link mobile-menu-utility-trigger"
                        onClick={() => {
                          setMobileUtilityActivePath(item.path);
                          setMobileUtilityExpandedGroups({});
                          setMobileLanguageOpen(false);
                          setMobileSegmentOpen(false);
                        }}
                      >
                        <span>{t(item.label)}</span>
                        <span className="mobile-menu-utility-trigger-arrow" aria-hidden="true">
                          ›
                        </span>
                      </button>
                    );
                  })}
                </nav>
              )}

              {!activeMobileUtilityItem && (
                <div className="mobile-menu-language-wrap">
                  <button
                    type="button"
                    className={`mobile-menu-language ${mobileLanguageOpen ? 'is-open' : ''}`}
                    aria-expanded={mobileLanguageOpen}
                    aria-controls="mobile-language-options"
                    onClick={() => setMobileLanguageOpen((currentValue) => !currentValue)}
                  >
                    <span className="mobile-menu-language-flag" aria-hidden="true">
                      {mobileLanguageFlag}
                    </span>
                    <span className="mobile-menu-language-label">{mobileLanguageLabel}</span>
                    <span className="mobile-menu-language-arrow" aria-hidden="true">
                      ▾
                    </span>
                  </button>

                  {mobileLanguageOpen && (
                    <div
                      id="mobile-language-options"
                      className="mobile-menu-language-options"
                      role="menu"
                      aria-label={t('Chọn ngôn ngữ')}
                    >
                      {mobileMenuLanguageOptions.map((option) => (
                        <button
                          key={option.code}
                          type="button"
                          role="menuitemradio"
                          aria-checked={language === option.code}
                          className={`mobile-menu-language-option ${
                            language === option.code ? 'is-active' : ''
                          }`}
                          onClick={() => handleLanguageSelect(option.code)}
                        >
                          <span
                            className="mobile-menu-language-option-flag"
                            aria-hidden="true"
                          >
                            {option.flag}
                          </span>
                          <span className="mobile-menu-language-option-label">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
          </div>,
          document.body,
        )}

      <main className="content-shell">
        <Outlet />
      </main>

      {!isAdminRoute && !isHomeRoute && (
        <footer className={`site-footer ${isWoodThemeRoute ? 'is-company-intro-theme' : ''}`}>
          <div className="site-footer-main">
            <section className="site-footer-company">
              <Link to={toLocalizedPath('/')} className="site-footer-brand" onClick={handleBrandClick}>
                <img
                  src="/assets/anslife-logo.png"
                  alt="ANSLIFE"
                  className="site-footer-brand-logo"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p className="site-footer-company-copy">
                {t('Nhà sản xuất và xuất khẩu nội thất gỗ uy tín cho các thương hiệu toàn cầu.')}
              </p>
              <SocialLinks className="site-footer-social-icons" />
            </section>

            {FOOTER_NAV_COLUMNS.map((column, index) => {
              const sectionKey = `column-${index}`;
              const sectionId = `site-footer-links-${index}`;
              const isSectionExpanded = Boolean(expandedFooterSections[sectionKey]);
              const columnTitle = t(column.title);

              return (
                <nav
                  key={column.title}
                  className="site-footer-section site-footer-column"
                  aria-label={columnTitle}
                >
                  {renderFooterSectionToggle(sectionKey, sectionId, columnTitle, isSectionExpanded)}
                  <h3>{columnTitle}</h3>
                  <div
                    id={sectionId}
                    className={`site-footer-links ${isSectionExpanded ? 'is-open' : ''}`}
                  >
                    {column.links.map((item, itemIndex) => (
                      <Link
                        key={`${column.title}-${item.path}-${itemIndex}`}
                        to={toLocalizedPath(item.path)}
                        className="site-footer-link"
                        onClick={closeNavigationMenus}
                      >
                        {t(item.label)}
                      </Link>
                    ))}
                  </div>
                </nav>
              );
            })}

            <section className="site-footer-section site-footer-contact" aria-label={t('LIÊN HỆ')}>
              {renderFooterSectionToggle(
                footerContactSectionKey,
                footerContactSectionId,
                t('LIÊN HỆ'),
                isFooterContactExpanded,
              )}
              <h3>{t('LIÊN HỆ')}</h3>
              <div
                id={footerContactSectionId}
                className={`site-footer-contact-list ${isFooterContactExpanded ? 'is-open' : ''}`}
              >
                {FOOTER_CONTACT_ITEMS.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="site-footer-contact-item"
                    target={item.path.startsWith('http') ? '_blank' : undefined}
                    rel={item.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {renderFooterContactIcon(item.icon)}
                    <span>{t(item.label)}</span>
                  </a>
                ))}
              </div>
            </section>
          </div>

          <div className="site-footer-legal">
            <p className="site-footer-copy">
              © {footerYear} ANSLIFE. {t('Mọi quyền được bảo lưu.')}
            </p>
            <nav className="site-footer-legal-links" aria-label={t('Liên kết chân trang')}>
              {FOOTER_LEGAL_LINKS.map((item) => (
                <Link
                  key={item.path}
                  to={toLocalizedPath(item.path)}
                  className="site-footer-legal-link"
                  onClick={closeNavigationMenus}
                >
                  {t(item.label)}
                </Link>
              ))}
            </nav>
          </div>
        </footer>
      )}
    </div>
  );
}
