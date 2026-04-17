import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
import { decodeHtml, getTermsByTaxonomy } from '../../lib/content';
import { getProductCategories, getProducts, getProjects } from '../../lib/wp';
import { getCurrentUser, type AuthUser } from '../../lib/internalAuth';
import type { WpCategory } from '../../types/wp';

const supportedLanguageOptions = [
  { code: 'vn', label: 'Tiếng Việt', menuLabel: 'VN' },
  { code: 'en', label: 'English', menuLabel: 'EN' },
  { code: 'jp', label: '日本語', menuLabel: 'JP' },
  { code: 'kr', label: '한국어', menuLabel: 'KR' },
] as const satisfies ReadonlyArray<{
  code: LanguageCode;
  label: string;
  menuLabel: string;
}>;

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

interface HeaderSearchSuggestion {
  id: string;
  kind: 'product' | 'project';
  title: string;
  path: string;
  searchKey: string;
}

const PRODUCT_MENU_PATH = '/products';
const DEFAULT_MOBILE_MENU_PATH = TOP_MENU.find((item) => item.path !== '/')?.path ?? '/';
const HEADER_HOTLINE_NUMBER = '+84 901.827.555';
const HEADER_HOTLINE_TEL = '+84901827555';
const HEADER_SEGMENT_ITEMS = [
  { id: 'individual', label: 'Cá nhân' },
  { id: 'organization', label: 'Tổ chức' },
  { id: 'special-partner', label: 'Đối tác đặc biệt' },
] as const;
const HEADER_UTILITY_LINKS = [
  { label: 'Về ANSLIFE', path: '/about-anslife' },
  { label: 'Tin tức', path: '/news' },
  { label: 'Dự án', path: '/projects' },
  { label: 'Mạng lưới', path: '/global-network' },
  { label: 'Tuyển dụng', path: '/scholarship-community/join-anslife' },
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

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

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

export default function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpenMenuPath, setDesktopOpenMenuPath] = useState<string | null>(null);
  const [activeProductMegaCategoryPath, setActiveProductMegaCategoryPath] = useState('');
  const [mobileActiveMenuPath, setMobileActiveMenuPath] = useState(DEFAULT_MOBILE_MENU_PATH);
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchReady, setSearchReady] = useState(false);
  const [searchIndex, setSearchIndex] = useState<HeaderSearchSuggestion[]>([]);
  const [productMenuLoaded, setProductMenuLoaded] = useState(false);
  const [productMenuChildren, setProductMenuChildren] = useState<MenuChildItem[]>(
    TOAM_PRODUCT_MENU_FALLBACK,
  );
  const [headerAuthUser, setHeaderAuthUser] = useState<AuthUser | null>(null);
  const desktopSearchBoxRef = useRef<HTMLDivElement | null>(null);
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
  const desktopTopMenuItems = useMemo(() => {
    const itemByPath = new Map(topMenuItems.map((item) => [item.path, item]));
    const mapToChild = (
      path: string,
      overrideLabel?: string,
    ): MenuChildItem | null => {
      const source = itemByPath.get(path);
      if (!source) {
        return null;
      }

      return {
        label: overrideLabel ?? source.label,
        path: source.path,
        children: source.children,
      };
    };

    const compactDesktopMenu = [
      {
        label: 'Giới thiệu về Anslife',
        path: '/about-anslife',
        children: itemByPath.get('/about-anslife')?.children ?? [],
      },
      {
        label: 'Công cụ & Năng lực',
        path: '/manufacturing-ecosystem',
        children: [
          mapToChild('/manufacturing-ecosystem', 'Hệ sinh thái sản xuất'),
          mapToChild(
            '/manufacturing-ecosystem/production-ecosystem-scale',
            'Năng lực sản xuất',
          ),
          mapToChild('/quality-control', 'Kiểm soát chất lượng'),
          mapToChild('/commercial-process', 'Quy trình thương mại'),
        ].filter((item): item is MenuChildItem => Boolean(item)),
      },
      {
        label: 'Dự án & Mạng lưới',
        path: '/projects',
        children: [
          mapToChild('/projects', 'Dự án & Case Study'),
          mapToChild('/global-network', 'Hệ thống toàn cầu'),
          mapToChild('/scholarship-community', 'Phụng sự xã hội'),
          { label: 'Tin tức', path: '/news' },
        ].filter((item): item is MenuChildItem => Boolean(item)),
      },
      {
        label: 'Liên hệ & Hỗ trợ',
        path: '/contact',
        children: [
          mapToChild('/contact', 'Liên hệ'),
          { label: 'Gửi yêu cầu báo giá', path: '/contact/quote-request' },
          { label: 'Đặt lịch làm việc', path: '/contact/schedule-meeting' },
        ].filter((item): item is MenuChildItem => Boolean(item)),
      },
    ];

    return compactDesktopMenu;
  }, [topMenuItems]);
  const mobileMenuItems = useMemo(
    () => topMenuItems.filter((item) => item.path !== '/'),
    [topMenuItems],
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

  const mobileActiveMenuItem = useMemo(
    () =>
      mobileMenuItems.find((item) => item.path === mobileActiveMenuPath) ??
      mobileMenuItems[0],
    [mobileMenuItems, mobileActiveMenuPath],
  );

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
    setMobileOpen(false);
    setDesktopOpenMenuPath(null);
    setSearchFocused(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    if (isAdminRoute) {
      setMobileOpen(false);
    }
  }, [isAdminRoute]);

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

  const isPathMatch = useCallback(
    (path: string) => {
      const localizedPath = toLocalizedPath(path);
      if (path === '/') {
        return location.pathname === localizedPath;
      }

      return (
        location.pathname === localizedPath ||
        location.pathname.startsWith(`${localizedPath}/`)
      );
    },
    [location.pathname, toLocalizedPath],
  );

  const authMenuPath = headerAuthUser ? '/admin/users' : '/admin/login';
  const authMenuLabel = headerAuthUser
    ? headerAuthUser.fullName.trim() || headerAuthUser.email.trim()
    : t('Đăng nhập');
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
              setMobileOpen(false);
              setDesktopOpenMenuPath(null);
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
            setMobileOpen(false);
            setDesktopOpenMenuPath(null);
            if (event.detail > 0) {
              event.currentTarget.blur();
            }
          }}
        >
          {resolvedLabel}
        </NavLink>
      );
    },
    [isExternalPath, t, toLocalizedPath],
  );

  const renderProductMegaLeaf = useCallback(
    (item: MenuChildItem, className: string): ReactNode => {
      const resolvedPath = toLocalizedPath(item.path);
      const resolvedLabel = t(item.label);

      if (isExternalPath(item.path)) {
        return (
          <a
            href={resolvedPath}
            className={className}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setMobileOpen(false);
              setDesktopOpenMenuPath(null);
            }}
          >
            {resolvedLabel}
          </a>
        );
      }

      return (
        <NavLink
          to={resolvedPath}
          className={className}
          onClick={() => {
            setMobileOpen(false);
            setDesktopOpenMenuPath(null);
          }}
        >
          {resolvedLabel}
        </NavLink>
      );
    },
    [isExternalPath, t, toLocalizedPath],
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
          const parentNode = isExternalPath(item.path) ? (
            <a
              key={key}
              href={toLocalizedPath(item.path)}
              className="submenu-link submenu-link-parent"
              target="_blank"
              rel="noopener noreferrer"
              aria-haspopup="true"
              aria-label={label}
              onClick={() => setMobileOpen(false)}
            >
              {label}
              <span className="submenu-link-arrow" aria-hidden="true">
                ›
              </span>
            </a>
          ) : (
            <NavLink
              key={key}
              to={toLocalizedPath(item.path)}
              className="submenu-link submenu-link-parent"
              aria-haspopup="true"
              aria-label={label}
              onClick={() => setMobileOpen(false)}
            >
              {label}
              <span className="submenu-link-arrow" aria-hidden="true">
                ›
              </span>
            </NavLink>
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
            {renderMenuLeaf(item, 'submenu-group-title', `desktop-group-title-${depth}`)}
            <div className="submenu-group-list">
              {renderDesktopSubmenuItems(item.children ?? [], depth + 1)}
            </div>
          </div>
        );
      }),
    [isExternalPath, renderMenuLeaf, t, toLocalizedPath],
  );

  const renderMobileSubmenuItems = useCallback(
    (items: MenuChildItem[], depth = 0): ReactNode =>
      items.map((item) => {
        const hasChildren = Boolean(item.children && item.children.length > 0);
        if (!hasChildren) {
          const className =
            depth === 0
              ? 'mobile-menu-child-card'
              : 'mobile-menu-child-card mobile-menu-child-card-nested';
          return renderMenuLeaf(item, className, `mobile-${depth}`);
        }

        return (
          <div
            key={`mobile-group-${item.path}-${item.label}`}
            className={`mobile-menu-group ${depth > 0 ? 'mobile-menu-subgroup' : ''}`}
          >
            {renderMenuLeaf(item, 'mobile-menu-group-title', `mobile-group-title-${depth}`)}
            <div className="mobile-menu-group-list">
              {renderMobileSubmenuItems(item.children ?? [], depth + 1)}
            </div>
          </div>
        );
      }),
    [renderMenuLeaf],
  );

  useEffect(() => {
    const matchedItem = mobileMenuItems.find((item) => isPathMatch(item.path));
    if (matchedItem) {
      setMobileActiveMenuPath(matchedItem.path);
    }
  }, [isPathMatch, mobileMenuItems]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (
        desktopSearchBoxRef.current?.contains(target) ||
        mobileSearchBoxRef.current?.contains(target)
      ) {
        return;
      }

      setSearchFocused(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

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
    const targetPath = withLanguagePath(
      `${location.pathname}${location.search}${location.hash}`,
      code,
    );
    navigate(targetPath, { replace: true });
    setMobileOpen(false);
  }

  const loadSearchIndex = useCallback(async () => {
    setSearchLoading(true);
    try {
      const [productsResult, projectsResult] = await Promise.allSettled([
        getProducts(100),
        getProjects(100),
      ]);

      const products = productsResult.status === 'fulfilled' ? productsResult.value : [];
      const projects = projectsResult.status === 'fulfilled' ? projectsResult.value : [];

      const productSuggestions = products.map((product) => {
        const title = decodeHtml(product.title.rendered).trim();
        const category = getTermsByTaxonomy(product, 'product_category')[0];
        const categorySlug = category?.slug ?? 'all';

        return {
          id: `product-${product.id}`,
          kind: 'product' as const,
          title,
          path: `/products/${categorySlug}/${product.slug}`,
          searchKey: normalizeSearchText(title),
        };
      });

      const projectSuggestions = projects.map((project) => {
        const title = decodeHtml(project.title.rendered).trim();
        return {
          id: `project-${project.id}`,
          kind: 'project' as const,
          title,
          path: `/projects/${project.slug}`,
          searchKey: normalizeSearchText(title),
        };
      });

      setSearchIndex([...productSuggestions, ...projectSuggestions]);
    } finally {
      setSearchLoading(false);
      setSearchReady(true);
    }
  }, []);

  const normalizedQuery = useMemo(() => normalizeSearchText(searchQuery), [searchQuery]);
  const searchResults = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return searchIndex
      .filter((item) => item.searchKey.includes(normalizedQuery))
      .slice(0, 8);
  }, [normalizedQuery, searchIndex]);

  function handleSearchResultClick(path: string) {
    navigate(toLocalizedPath(path));
    setSearchFocused(false);
    setSearchQuery('');
    setMobileOpen(false);
  }

  function scrollToTopAfterNavigation() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    });
  }

  function handleBrandClick() {
    setMobileOpen(false);
    setDesktopOpenMenuPath(null);
    setSearchFocused(false);
    setSearchQuery('');
    scrollToTopAfterNavigation();
  }

  function renderSearchBox(className: string, ref: { current: HTMLDivElement | null }) {
    return (
      <div className={className} role="search" ref={ref}>
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
          onFocus={() => {
            setSearchFocused(true);
            if (!searchReady && !searchLoading) {
              void loadSearchIndex();
            }
          }}
          onChange={(event) => setSearchQuery(event.target.value)}
          onBlur={() => {
            setSearchFocused(false);
          }}
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === 'Enter') {
              event.preventDefault();
              if (searchResults.length > 0) {
                handleSearchResultClick(searchResults[0].path);
              }
            }
          }}
        />
        {searchFocused && normalizedQuery.length > 0 && (
          <div className="header-search-dropdown" role="listbox">
            {searchLoading && (
              <p className="header-search-empty">{t('Đang tải dữ liệu tìm kiếm...')}</p>
            )}
            {!searchLoading && searchResults.length === 0 && (
              <p className="header-search-empty">{t('Không tìm thấy kết quả phù hợp.')}</p>
            )}
            {!searchLoading &&
              searchResults.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="header-search-item"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSearchResultClick(item.path)}
                >
                  <strong>{item.title}</strong>
                  <span>{t(item.kind === 'product' ? 'Sản phẩm' : 'Dự án')}</span>
                </button>
              ))}
          </div>
        )}
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

  return (
    <div
      className={`site-shell ${isAdminRoute ? 'is-admin-route' : ''} ${
        !isAdminRoute && isHomeRoute ? 'is-home-route' : ''
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

      <header className="topbar">
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
                      onClick={() => {
                        setMobileOpen(false);
                        setDesktopOpenMenuPath(null);
                      }}
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
              <div className="mobile-home-header-actions">
                <Link
                  to={toLocalizedPath(authMenuPath)}
                  className="mobile-home-login-fab"
                  aria-label={headerLoginLabel}
                  onClick={() => {
                    setMobileOpen(false);
                    setDesktopOpenMenuPath(null);
                  }}
                >
                  <span aria-hidden="true">↪</span>
                </Link>
                <button
                  type="button"
                  className="mobile-home-menu-fab"
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-menu-panel"
                  aria-label={mobileOpen ? t('Đóng menu') : t('Mở menu')}
                  onClick={() => setMobileOpen((value) => !value)}
                >
                  <span aria-hidden="true">☰</span>
                </button>
              </div>
            )}
            {isAdminRoute && renderLanguageSwitcher('language-switcher-admin')}
          </div>

          {!isAdminRoute && (
            <>
              <nav className="main-nav" aria-label={t('Danh mục điều hướng')}>
                {desktopTopMenuItems.map((item) => {
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
                        hasChildren ? () => setDesktopOpenMenuPath(item.path) : undefined
                      }
                      onMouseLeave={
                        hasChildren
                          ? () =>
                              setDesktopOpenMenuPath((currentPath) =>
                                currentPath === item.path ? null : currentPath,
                              )
                          : undefined
                      }
                      onFocusCapture={
                        hasChildren ? () => setDesktopOpenMenuPath(item.path) : undefined
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
                              setDesktopOpenMenuPath((currentPath) =>
                                currentPath === item.path ? null : currentPath,
                              );
                            }
                          : undefined
                      }
                    >
                      {hasChildren && item.path !== '/' ? (
                        isExternalPath(resolvedPath) ? (
                          <a
                            href={toLocalizedPath(resolvedPath)}
                            className={`${linkClassName} ${
                              isPathMatch(item.path) ? 'is-active' : ''
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-haspopup="true"
                            aria-label={resolvedLabel}
                            onClick={(event) => {
                              setMobileOpen(false);
                              setDesktopOpenMenuPath(null);
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
                            aria-haspopup="true"
                            aria-label={resolvedLabel}
                            onClick={(event) => {
                              setMobileOpen(false);
                              setDesktopOpenMenuPath(null);
                              if (event.detail > 0) {
                                event.currentTarget.blur();
                              }
                            }}
                          >
                            {resolvedLabel}
                          </NavLink>
                        )
                      ) : isExternalPath(resolvedPath) ? (
                        <a
                          href={toLocalizedPath(resolvedPath)}
                          className={linkClassName}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => {
                            setMobileOpen(false);
                            setDesktopOpenMenuPath(null);
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
                            setMobileOpen(false);
                            setDesktopOpenMenuPath(null);
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
                            className="submenu product-mega-menu"
                            role="menu"
                            aria-label={t('Danh mục sản phẩm')}
                            onMouseEnter={() => setDesktopOpenMenuPath(item.path)}
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
                                      const categoryLabel = t(category.label);

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
              })}
              </nav>

              <Link
                to={toLocalizedPath(authMenuPath)}
                className="header-login-button"
                onClick={() => {
                  setMobileOpen(false);
                  setDesktopOpenMenuPath(null);
                }}
              >
                {headerLoginLabel}
              </Link>

              <div className="mobile-search-row">
                {renderSearchBox('header-search mobile-search', mobileSearchBoxRef)}
              </div>
            </>
          )}
        </div>
      </header>

      {!isAdminRoute && (
        <div
          className={`mobile-menu-overlay ${mobileOpen ? 'is-open' : ''}`}
          aria-hidden={!mobileOpen}
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
              <h2>{t('Danh mục điều hướng')}</h2>
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
              <nav className="mobile-menu-left" aria-label={t('Danh mục điều hướng')}>
                {mobileMenuItems.map((item) => {
                  const hasChildren = item.path === PRODUCT_MENU_PATH
                    ? true
                    : Boolean(item.children && item.children.length > 0);
                  const isLoginItem = item.path === '/admin/login';
                  const resolvedPath = isLoginItem ? authMenuPath : item.path;
                  const resolvedLabel = isLoginItem ? authMenuLabel : t(item.label);

                  return (
                    hasChildren ? (
                      <button
                        key={item.path}
                        type="button"
                        className={`mobile-menu-tab ${
                          mobileActiveMenuItem?.path === item.path ? 'is-active' : ''
                        }`}
                        onClick={() => setMobileActiveMenuPath(item.path)}
                      >
                        <span>{resolvedLabel}</span>
                        <span className="mobile-menu-arrow">›</span>
                      </button>
                    ) : isExternalPath(resolvedPath) ? (
                      <a
                        key={item.path}
                        href={toLocalizedPath(resolvedPath)}
                        className={`mobile-menu-tab ${
                          item.path === '/admin/login' ? 'mobile-menu-login' : ''
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span>{resolvedLabel}</span>
                        <span className="mobile-menu-arrow">›</span>
                      </a>
                    ) : (
                      <NavLink
                        key={item.path}
                        to={toLocalizedPath(resolvedPath)}
                        className={({ isActive }) =>
                          `mobile-menu-tab ${
                            item.path === '/admin/login' ? 'mobile-menu-login' : ''
                          } ${isActive ? 'is-active' : ''}`
                        }
                        onClick={() => setMobileOpen(false)}
                        end={item.path === '/'}
                      >
                        <span>{resolvedLabel}</span>
                        <span className="mobile-menu-arrow">›</span>
                      </NavLink>
                    )
                  );
                })}
              </nav>

              <div className="mobile-menu-right">
                {mobileActiveMenuItem && (
                  <>
                    <div className="mobile-menu-right-head">
                      <p>{t('Mục nổi bật')}</p>
                      {renderMenuLeaf(
                        {
                          label: mobileActiveMenuItem.label,
                          path: mobileActiveMenuItem.path,
                        },
                        'mobile-menu-parent-link',
                        'mobile-parent',
                      )}
                    </div>

                    <div className="mobile-menu-child-grid">
                      {mobileActiveMenuItem.children &&
                        renderMobileSubmenuItems(mobileActiveMenuItem.children)}
                      {(!mobileActiveMenuItem.children ||
                        mobileActiveMenuItem.children.length === 0) && (
                        <p className="mobile-menu-empty">{t('Mục này đang được cập nhật.')}</p>
                      )}
                    </div>

                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      )}

      <main className="content-shell">
        <Outlet />
      </main>

      {!isAdminRoute && !isHomeRoute && (
        <footer className="site-footer">
          <div className="footer-company">
            <strong>ANSLIFE</strong> - {t('Hệ sinh thái sản xuất')},{' '}
            {t('Kiểm soát chất lượng')}, {t('Hệ thống toàn cầu')}.
          </div>
          <div className="footer-social">
            <strong>{t('Kết nối ANSLIFE')}</strong>
            <SocialLinks />
          </div>
        </footer>
      )}
    </div>
  );
}
