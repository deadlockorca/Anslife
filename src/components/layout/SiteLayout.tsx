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
import { getCurrentUser, type AuthUser } from '../../lib/internalAuth';

const supportedLanguageOptions = [
  { code: 'en', label: 'English', menuLabel: 'EN', flag: '🇬🇧' },
  { code: 'jp', label: '日本語', menuLabel: 'JP', flag: '🇯🇵' },
  { code: 'vn', label: 'Tiếng Việt', menuLabel: 'VN', flag: '🇻🇳' },
  { code: 'kr', label: '한국어', menuLabel: 'KR', flag: '🇰🇷' },
] as const satisfies ReadonlyArray<{
  code: LanguageCode;
  label: string;
  menuLabel: string;
  flag: string;
}>;
const mobilePanelLanguageOptions = supportedLanguageOptions;
const homeMobileLanguageOptions: ReadonlyArray<{
  code: string;
  label: string;
  menuLabel: string;
  flag: string;
  routeCode?: LanguageCode;
}> = [
  ...supportedLanguageOptions.map((option) => ({
    ...option,
    routeCode: option.code,
  })),
  { code: 'sv', label: 'Swedish', menuLabel: 'SV', flag: '🇸🇪' },
  { code: 'fr', label: 'French', menuLabel: 'FR', flag: '🇫🇷' },
  { code: 'ru', label: 'Russian', menuLabel: 'RU', flag: '🇷🇺' },
  { code: 'es', label: 'Spanish', menuLabel: 'ES', flag: '🇪🇸' },
];

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

const DEFAULT_SITE_BG_VIDEO_MP4 = '/assets/videos/home-bg.mp4';
const DEFAULT_SITE_BG_VIDEO_POSTER = '/assets/videos/home-bg-poster.jpg';

type MobileMenuIcon =
  | 'home'
  | 'building'
  | 'box'
  | 'leaf'
  | 'factory'
  | 'pin'
  | 'shield'
  | 'document'
  | 'question'
  | 'send';

function getMobileMenuIcon(path: string): MobileMenuIcon {
  if (path === '/') {
    return 'home';
  }

  if (path.startsWith('/about-anslife')) {
    return 'building';
  }

  if (path.startsWith('/products-solutions') || path.startsWith('/products')) {
    return 'box';
  }

  if (path.startsWith('/materials')) {
    return 'leaf';
  }

  if (path.startsWith('/manufacturing')) {
    return 'factory';
  }

  if (path.startsWith('/vietnam-supply-hub')) {
    return 'pin';
  }

  if (path.startsWith('/quality-control')) {
    return 'shield';
  }

  if (path === '/resources/faq') {
    return 'question';
  }

  if (path.startsWith('/resources')) {
    return 'document';
  }

  return 'send';
}

function renderMobileMenuIcon(icon: MobileMenuIcon): ReactNode {
  switch (icon) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M3.5 10.8 12 3.7l8.5 7.1" />
          <path d="M5.7 9.8v9.4h4.4v-5.4h3.8v5.4h4.4V9.8" />
        </svg>
      );
    case 'building':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M5 20V5.4L14 3v17" />
          <path d="M14 9h5v11" />
          <path d="M8 8h2M8 12h2M8 16h2M16 12h1M16 16h1" />
        </svg>
      );
    case 'box':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="m12 3.5 7.5 4.1v8.8L12 20.5l-7.5-4.1V7.6L12 3.5Z" />
          <path d="M4.9 7.8 12 12l7.1-4.2M12 12v8.1" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20.5 4.1c-7.2.3-12 2.8-13.9 7.1-1.4 3.3.2 6.3 2.8 7.5 3 1.4 6.5-.2 8.2-3.6 1.3-2.5 1.4-5.6 2.9-11Z" />
          <path d="M4 20c3.5-5.2 7.2-8.3 11.5-9.7" />
        </svg>
      );
    case 'factory':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 20V9.2l4.4 2.6V8.9l4.5 2.7V6h3v5.6h4.1V20H4Z" />
          <path d="M7 16h2M12 16h2M17 16h2" />
        </svg>
      );
    case 'pin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 21s7-6.1 7-11.2A7 7 0 0 0 5 9.8C5 14.9 12 21 12 21Z" />
          <circle cx="12" cy="9.8" r="2.2" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 3.5 19 6v5.4c0 4.3-2.8 7.2-7 9.1-4.2-1.9-7-4.8-7-9.1V6l7-2.5Z" />
          <path d="m8.8 12 2.1 2.1 4.5-4.6" />
        </svg>
      );
    case 'document':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6.5 3.5h7l4 4V20.5h-11v-17Z" />
          <path d="M13.5 3.7V8h4M9 12h6M9 16h5" />
        </svg>
      );
    case 'question':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.4 9.2a2.9 2.9 0 0 1 2.8-2c1.8 0 3.1 1.1 3.1 2.7 0 1.3-.8 2-2.1 2.8-.9.6-1.2 1.1-1.2 2.1" />
          <path d="M12 17.6h.01" />
        </svg>
      );
    case 'send':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20.5 3.8 3.8 11l7 2.2 2.2 7 7.5-16.4Z" />
          <path d="m10.8 13.2 4.7-4.7" />
        </svg>
      );
    default:
      return null;
  }
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
  const [headerAuthUser, setHeaderAuthUser] = useState<AuthUser | null>(null);
  const desktopMenuCloseTimerRef = useRef<number | null>(null);
  const mobileSearchBoxRef = useRef<HTMLDivElement | null>(null);
  const mobileHomeActionsRef = useRef<HTMLDivElement | null>(null);
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
    () =>
      location.pathname.includes('/about-anslife/company-intro') ||
      location.pathname.includes('/about-anslife/company-info'),
    [location.pathname],
  );
  const isAboutWideRoute = useMemo(
    () =>
      /\/about-anslife\/(?:company-intro|company-info|vision-mission|core-values|production-philosophy|organization|team|anslife-ecosystem|development-history)(?:\/|$)/.test(
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
  const topMenuItems = useMemo(() => TOP_MENU, []);
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
  const footerTopMenuItems = useMemo(
    () =>
      desktopTopMenuItems.filter(
        (item) =>
          item.path !== '/' &&
          item.path !== '/vietnam-supply-hub' &&
          item.path !== '/quality-control' &&
          item.path !== '/resources/faq',
      ),
    [desktopTopMenuItems],
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
    setMobileLanguageOpen(false);
    clearDesktopMenuCloseTimer();
    setMobileSegmentOpen(false);
    resetMobileUtilityHierarchy();
    setSearchQuery('');
    setExpandedFooterSections({});
  }, [
    clearDesktopMenuCloseTimer,
    closeNavigationMenus,
    location.hash,
    location.pathname,
    location.search,
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

  function renderDesktopSubmenuItems(
    items: MenuChildItem[],
    depth = 0,
  ): ReactNode {
    return items.map((item) => {
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
    });
  }

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

  function closeMobileSearchOverlay() {
    setMobileSearchOpen(false);
    setSearchQuery('');
  }

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
    if (!mobileLanguageOpen || mobileOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        mobileHomeActionsRef.current?.contains(target)
      ) {
        return;
      }

      setMobileLanguageOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileLanguageOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileLanguageOpen, mobileOpen]);

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
    setMobileLanguageOpen(false);
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
                  {productRootCategories.length > 0 ? (
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

  function renderFooterHeaderMenuItems(
    items: MenuChildItem[] = [],
    keyPrefix: string,
  ): ReactNode {
    return items.map((item, index) => {
      const itemKey = `${keyPrefix}-${item.path}-${index}`;

      return (
        <div key={itemKey} className="site-footer-menu-item">
          {isExternalPath(item.path) ? (
            <a
              href={toLocalizedPath(item.path)}
              className="site-footer-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeNavigationMenus}
            >
              {t(item.label)}
            </a>
          ) : (
            <Link
              to={toLocalizedPath(item.path)}
              className="site-footer-link"
              onClick={closeNavigationMenus}
            >
              {t(item.label)}
            </Link>
          )}
        </div>
      );
    });
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
                  setMobileLanguageOpen(false);
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
              <div className="mobile-home-actions" ref={mobileHomeActionsRef}>
                <button
                  type="button"
                  className={`mobile-home-language-fab ${mobileLanguageOpen ? 'is-active' : ''}`}
                  aria-expanded={mobileLanguageOpen}
                  aria-controls="home-mobile-language-options"
                  aria-label={t('Chọn ngôn ngữ')}
                  onClick={(event) => {
                    event.stopPropagation();
                    closeNavigationMenus();
                    setMobileSearchOpen(false);
                    setSearchQuery('');
                    setMobileLanguageOpen((currentState) => !currentState);
                  }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3a14 14 0 0 1 0 18" />
                    <path d="M12 3a14 14 0 0 0 0 18" />
                  </svg>
                </button>

                {!isHomeRoute && (
                  <button
                    type="button"
                    className={`mobile-home-search-fab ${mobileSearchOpen ? 'is-active' : ''}`}
                    aria-expanded={mobileSearchOpen}
                    aria-label={t('Tìm kiếm')}
                    onClick={(event) => {
                      event.stopPropagation();
                      closeNavigationMenus();
                      setMobileLanguageOpen(false);
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

                {mobileLanguageOpen && (
                  <div
                    id="home-mobile-language-options"
                    className="home-mobile-language-menu"
                    role="menu"
                    aria-label={t('Chọn ngôn ngữ')}
                  >
                    {homeMobileLanguageOptions.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        role="menuitemradio"
                        aria-checked={language === option.code}
                        className={`home-mobile-language-option ${
                          language === option.code ? 'is-active' : ''
                        }`}
                        onClick={() => {
                          if (option.routeCode) {
                            handleLanguageSelect(option.routeCode);
                            return;
                          }

                          setSelectedLanguageOption(option.code);
                          window.localStorage.setItem(
                            LANGUAGE_SELECTOR_STORAGE_KEY,
                            option.code,
                          );
                          setMobileLanguageOpen(false);
                        }}
                      >
                        <span className="home-mobile-language-flag" aria-hidden="true">
                          {option.flag}
                        </span>
                        <span className="home-mobile-language-label">{option.label}</span>
                        {language === option.code && (
                          <span className="home-mobile-language-check" aria-hidden="true">
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                    placeholder={t('Tìm sản phẩm, vật liệu, dịch vụ cung ứng...')}
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
                          <span className="mobile-menu-utility-icon" aria-hidden="true">
                            {renderMobileMenuIcon(getMobileMenuIcon(item.path))}
                          </span>
                          <span className="mobile-menu-utility-label">{t(item.label)}</span>
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
                          setMobileSegmentOpen(false);
                        }}
                      >
                        <span className="mobile-menu-utility-icon" aria-hidden="true">
                          {renderMobileMenuIcon(getMobileMenuIcon(item.path))}
                        </span>
                        <span className="mobile-menu-utility-label">{t(item.label)}</span>
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
                      {mobilePanelLanguageOptions.map((option) => (
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
                {t('Sản xuất và xuất khẩu nội thất gỗ.')}
              </p>
              <SocialLinks className="site-footer-social-icons" />
            </section>

            {footerTopMenuItems.map((column, index) => {
              const sectionKey = `column-${index}`;
              const sectionId = `site-footer-links-${index}`;
              const isSectionExpanded = Boolean(expandedFooterSections[sectionKey]);
              const columnTitle = t(column.label);

              return (
                <nav
                  key={column.path}
                  className="site-footer-section site-footer-column"
                  aria-label={columnTitle}
                >
                  {renderFooterSectionToggle(sectionKey, sectionId, columnTitle, isSectionExpanded)}
                  <h3>
                    {isExternalPath(column.path) ? (
                      <a
                        href={toLocalizedPath(column.path)}
                        className="site-footer-heading-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeNavigationMenus}
                      >
                        {columnTitle}
                      </a>
                    ) : (
                      <Link
                        to={toLocalizedPath(column.path)}
                        className="site-footer-heading-link"
                        onClick={closeNavigationMenus}
                      >
                        {columnTitle}
                      </Link>
                    )}
                  </h3>
                  <div
                    id={sectionId}
                    className={`site-footer-links ${isSectionExpanded ? 'is-open' : ''}`}
                  >
                    {renderFooterHeaderMenuItems(
                      column.children ?? [],
                      `footer-header-menu-${column.path}`,
                    )}
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
          </div>
        </footer>
      )}
    </div>
  );
}
