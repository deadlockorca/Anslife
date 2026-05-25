import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import Seo from '../components/seo/Seo';
import { STATIC_PAGE_MAP, TOP_MENU, type MenuChildItem } from '../config/site';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  LANGUAGE_STORAGE_KEY,
  type LanguageCode,
  withLanguagePath,
} from '../i18n/language';
import { decodeHtml, getFeaturedImage, getTermsByTaxonomy } from '../lib/content';
import { getNews, getProducts, getProjects } from '../lib/wp';
import type { WpEntity } from '../types/wp';

interface HomeData {
  products: WpEntity[];
  projects: WpEntity[];
  news: WpEntity[];
}

interface HomeQuickAccessItem {
  id: string;
  icon: string;
  title: string;
  to: string;
}

interface HomeHeroScene {
  id: 'day' | 'evening' | 'night';
  theme: 'light' | 'dark';
  minHour: number;
  maxHour: number;
  icon: string;
  greetingLabel: string;
  sceneLabel: string;
  videoWebm: string;
  videoMp4: string;
  posterImage: string;
  desktopImage: string;
  tabletPortraitImage: string;
  mobilePortraitImage: string;
  mobileLandscapeImage: string;
}

interface HomeSearchGroupItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  to: string;
}

interface HomeSearchResultItem extends HomeSearchGroupItem {
  searchText: string;
}

interface HomeNavigationSearchItem {
  label: string;
  path: string;
  trail: string[];
}

const EMPTY_ENTITIES: WpEntity[] = [];
const DEMO_HERO_VIDEO_DAY =
  'https://www.vietcombank.com.vn/-/media/Project/VCB-Sites/VCB/Home-page/KHCN/UPDATE-2024/KHCN/VCB_CN-DAY_v3fix2_20260331.mp4?mh=900&mw=1440&ts=20260331104213&hash=607110EA73560F74A2B7A2552076CD7B';
const DEMO_HERO_VIDEO_EVENING =
  'https://www.vietcombank.com.vn/-/media/Project/VCB-Sites/VCB/Home-page/KHCN/UPDATE-2024/KHCN/VCBCNNIGHTv3fix1_20260331.mp4?mh=900&mw=1440&ts=20260331105801&hash=7C5EC623EAFE3EFEA5CEB1AC913D0ECD';
const DEMO_HERO_VIDEO_NIGHT =
  'https://www.vietcombank.com.vn/-/media/Project/VCB-Sites/VCB/Home-page/KHCN/UPDATE-2024/KHCN/VCBCNNIGHTv3fix1_20260331.mp4?mh=900&mw=1440&ts=20260331105801&hash=7C5EC623EAFE3EFEA5CEB1AC913D0ECD';
const DEMO_HERO_IMAGE_DAY =
  'https://www.vietcombank.com.vn/-/media/Project/VCB-Sites/VCB/Home-page/KHCN/UPDATE-2024/KHCN/KHCN_MB-NGANG.jpg?h=1125&w=2436&sc_lang=vi-VN&ts=20260331085509&hash=9325CC0FE64644A4CB63C46E8D5B889E';
const DEMO_HERO_IMAGE_EVENING =
  'https://www.vietcombank.com.vn/-/media/Project/VCB-Sites/VCB/Home-page/KHCN/UPDATE-2024/KHCN/KHCN_MB-NGANG_2.jpg?h=1125&w=2436&ts=20260331085523&hash=A63823446760C9C352210BEECA745FD4';
const DEMO_HERO_IMAGE_NIGHT =
  'https://www.vietcombank.com.vn/-/media/Project/VCB-Sites/VCB/Home-page/KHCN/UPDATE-2024/KHCN/KHCN_MB-NGANG_Dark.jpg?h=1125&w=2436&sc_lang=vi-VN&ts=20260331085537&hash=C9484EA2003C1A8C67FB3EC10F121E94';
const HOME_MOBILE_LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', menuLabel: 'EN' },
  { code: 'jp', label: 'Japanese', menuLabel: 'JP' },
  { code: 'vn', label: 'Vietnamese', menuLabel: 'VN' },
  { code: 'kr', label: 'Korean', menuLabel: 'KR' },
] as const satisfies ReadonlyArray<{
  code: LanguageCode;
  label: string;
  menuLabel: string;
}>;

function readPublicEnv(name: string): string {
  return process.env[name]?.trim() ?? '';
}

function pickFirstNonEmpty(...values: Array<string | null | undefined>): string {
  for (const value of values) {
    const normalized = value?.trim();
    if (normalized) {
      return normalized;
    }
  }

  return '';
}

function isHourInRange(hour: number, minHour: number, maxHour: number): boolean {
  if (minHour <= maxHour) {
    return hour >= minHour && hour <= maxHour;
  }

  return hour >= minHour || hour <= maxHour;
}

function normalizeSearchValue(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[đĐ]/g, 'd')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('vi')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function searchContainsText(searchText: string, normalizedQuery: string): boolean {
  if (!normalizedQuery) {
    return true;
  }

  const normalizedSearchText = normalizeSearchValue(searchText);
  const queryTokens = normalizedQuery.split(' ').filter(Boolean);
  if (queryTokens.length === 0) {
    return true;
  }

  return queryTokens.every((token) => normalizedSearchText.includes(token));
}

function flattenMenuItemsForSearch(
  items: MenuChildItem[],
  parentTrail: string[] = [],
): HomeNavigationSearchItem[] {
  const flattenedItems: HomeNavigationSearchItem[] = [];

  for (const item of items) {
    const label = item.label.trim();
    const path = item.path.trim();
    if (!label || !path) {
      continue;
    }

    const trail = [...parentTrail, label];
    flattenedItems.push({
      label,
      path,
      trail,
    });

    if (item.children && item.children.length > 0) {
      flattenedItems.push(...flattenMenuItemsForSearch(item.children, trail));
    }
  }

  return flattenedItems;
}

function buildProductDetailPath(product: WpEntity): string {
  const primaryCategory = getTermsByTaxonomy(product, 'product_category')[0];
  if (primaryCategory?.slug) {
    return `/products/${primaryCategory.slug}/${product.slug}`;
  }

  return `/products/${product.slug}`;
}

export default function HomePage() {
  const { language, t, toLocalizedPath } = useSiteI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours());
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [isMobileLanguageOpen, setIsMobileLanguageOpen] = useState(false);
  const [searchPopupQuery, setSearchPopupQuery] = useState('');
  const [searchIndexItems, setSearchIndexItems] = useState<HomeSearchResultItem[]>([]);
  const [searchIndexLoading, setSearchIndexLoading] = useState(false);
  const [searchIndexReady, setSearchIndexReady] = useState(false);
  const searchPopupInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      const nextHour = new Date().getHours();
      setCurrentHour((previousHour) =>
        previousHour === nextHour ? previousHour : nextHour,
      );
    }, 60_000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const loadHomeData = useCallback(async () => {
    const [productsResult, projectsResult, newsResult] = await Promise.allSettled([
      getProducts(6),
      getProjects(3),
      getNews(3),
    ]);

    return {
      products: productsResult.status === 'fulfilled' ? productsResult.value : [],
      projects: projectsResult.status === 'fulfilled' ? projectsResult.value : [],
      news: newsResult.status === 'fulfilled' ? newsResult.value : [],
    };
  }, []);

  const { data, error } = useAsyncResource<HomeData>(loadHomeData);

  const products = data?.products ?? EMPTY_ENTITIES;
  const projects = data?.projects ?? EMPTY_ENTITIES;
  const news = data?.news ?? EMPTY_ENTITIES;

  const heroImage = useMemo(() => {
    const fromProducts = products
      .map((item) => getFeaturedImage(item))
      .find((value): value is string => Boolean(value));

    if (fromProducts) {
      return fromProducts;
    }

    const fromProjects = projects
      .map((item) => getFeaturedImage(item))
      .find((value): value is string => Boolean(value));

    if (fromProjects) {
      return fromProjects;
    }

    return (
      news
        .map((item) => getFeaturedImage(item))
        .find((value): value is string => Boolean(value)) ?? null
    );
  }, [news, products, projects]);

  const heroScenes = useMemo<HomeHeroScene[]>(() => {
    const sharedPosterImage = pickFirstNonEmpty(
      readPublicEnv('NEXT_PUBLIC_HOME_HERO_POSTER'),
      DEMO_HERO_IMAGE_DAY,
      heroImage,
    );
    const sharedDesktopImage = pickFirstNonEmpty(
      readPublicEnv('NEXT_PUBLIC_HOME_HERO_IMAGE_DESKTOP'),
      DEMO_HERO_IMAGE_DAY,
      heroImage,
      sharedPosterImage,
    );
    const sharedTabletPortraitImage = pickFirstNonEmpty(
      readPublicEnv('NEXT_PUBLIC_HOME_HERO_IMAGE_TABLET'),
      sharedDesktopImage,
    );
    const sharedMobilePortraitImage = pickFirstNonEmpty(
      readPublicEnv('NEXT_PUBLIC_HOME_HERO_IMAGE_MOBILE'),
      sharedDesktopImage,
    );
    const sharedMobileLandscapeImage = pickFirstNonEmpty(
      readPublicEnv('NEXT_PUBLIC_HOME_HERO_IMAGE_MOBILE_LANDSCAPE'),
      sharedDesktopImage,
    );
    const sharedVideoWebm = readPublicEnv('NEXT_PUBLIC_HOME_HERO_VIDEO_WEBM');
    const sharedVideoMp4 = readPublicEnv('NEXT_PUBLIC_HOME_HERO_VIDEO_MP4');

    const buildScene = ({
      id,
      minHour,
      maxHour,
      theme,
      icon,
      greetingLabel,
      sceneLabel,
      fallbackVideoMp4,
      fallbackImage,
    }: {
      id: HomeHeroScene['id'];
      minHour: number;
      maxHour: number;
      theme: HomeHeroScene['theme'];
      icon: string;
      greetingLabel: string;
      sceneLabel: string;
      fallbackVideoMp4: string;
      fallbackImage: string;
    }): HomeHeroScene => {
      const envPrefix = `NEXT_PUBLIC_HOME_HERO_${id.toUpperCase()}`;
      const posterImage = pickFirstNonEmpty(
        readPublicEnv(`${envPrefix}_POSTER`),
        fallbackImage,
        sharedPosterImage,
      );
      const desktopImage = pickFirstNonEmpty(
        readPublicEnv(`${envPrefix}_IMAGE_DESKTOP`),
        fallbackImage,
        sharedDesktopImage,
        posterImage,
      );
      const tabletPortraitImage = pickFirstNonEmpty(
        readPublicEnv(`${envPrefix}_IMAGE_TABLET`),
        sharedTabletPortraitImage,
        desktopImage,
      );
      const mobilePortraitImage = pickFirstNonEmpty(
        readPublicEnv(`${envPrefix}_IMAGE_MOBILE`),
        sharedMobilePortraitImage,
        desktopImage,
      );
      const mobileLandscapeImage = pickFirstNonEmpty(
        readPublicEnv(`${envPrefix}_IMAGE_MOBILE_LANDSCAPE`),
        sharedMobileLandscapeImage,
        desktopImage,
      );

      return {
        id,
        minHour,
        maxHour,
        theme,
        icon,
        greetingLabel,
        sceneLabel,
        videoWebm: pickFirstNonEmpty(readPublicEnv(`${envPrefix}_VIDEO_WEBM`), sharedVideoWebm),
        videoMp4: pickFirstNonEmpty(
          readPublicEnv(`${envPrefix}_VIDEO_MP4`),
          sharedVideoMp4,
          fallbackVideoMp4,
        ),
        posterImage,
        desktopImage,
        tabletPortraitImage,
        mobilePortraitImage,
        mobileLandscapeImage,
      };
    };

    return [
      buildScene({
        id: 'day',
        minHour: 4,
        maxHour: 17,
        theme: 'light',
        icon: '🌤️',
        greetingLabel: t('Chào buổi sáng'),
        sceneLabel: t('Không gian ban ngày'),
        fallbackVideoMp4: DEMO_HERO_VIDEO_DAY,
        fallbackImage: DEMO_HERO_IMAGE_DAY,
      }),
      buildScene({
        id: 'evening',
        minHour: 18,
        maxHour: 22,
        theme: 'light',
        icon: '🌤️',
        greetingLabel: t('Chào buổi chiều'),
        sceneLabel: t('Không gian hoàng hôn'),
        fallbackVideoMp4: DEMO_HERO_VIDEO_EVENING,
        fallbackImage: DEMO_HERO_IMAGE_EVENING,
      }),
      buildScene({
        id: 'night',
        minHour: 23,
        maxHour: 3,
        theme: 'dark',
        icon: '🌙',
        greetingLabel: t('Chào buổi tối'),
        sceneLabel: t('Không gian ban đêm'),
        fallbackVideoMp4: DEMO_HERO_VIDEO_NIGHT,
        fallbackImage: DEMO_HERO_IMAGE_NIGHT,
      }),
    ];
  }, [heroImage, t]);

  const activeHeroScene = useMemo(
    () =>
      heroScenes.find((scene) =>
        isHourInRange(currentHour, scene.minHour, scene.maxHour),
      ) ?? heroScenes[0],
    [currentHour, heroScenes],
  );

  const heroStyle = useMemo<CSSProperties | undefined>(() => {
    const heroFallbackImage = pickFirstNonEmpty(
      activeHeroScene.desktopImage,
      activeHeroScene.posterImage,
    );
    if (!heroFallbackImage) {
      return undefined;
    }

    return {
      backgroundImage: `url(${heroFallbackImage})`,
    };
  }, [activeHeroScene.desktopImage, activeHeroScene.posterImage]);

  const hasHeroVideo =
    activeHeroScene.videoWebm.length > 0 || activeHeroScene.videoMp4.length > 0;

  const quickAccessItems = useMemo<HomeQuickAccessItem[]>(
    () => [
      {
        id: 'factory',
        icon: '🏭',
        title: t('Nhà máy'),
        to: '/manufacturing/factory-overview',
      },
      {
        id: 'products',
        icon: '🪑',
        title: t('Sản phẩm'),
        to: '/products',
      },
      {
        id: 'materials',
        icon: '🧱',
        title: t('Nguyên liệu'),
        to: '/materials',
      },
      {
        id: 'supply-hub',
        icon: '📦',
        title: t('Trung tâm cung ứng'),
        to: '/vietnam-supply-hub',
      },
      {
        id: 'contact',
        icon: '☎',
        title: t('Liên hệ'),
        to: '/contact',
      },
    ],
    [t],
  );
  const activeMobileLanguageLabel = useMemo(
    () =>
      HOME_MOBILE_LANGUAGE_OPTIONS.find((option) => option.code === language)?.label ??
      language.toUpperCase(),
    [language],
  );

  const featuredProductPath = useMemo(() => {
    const featuredProduct = products[0];
    if (!featuredProduct) {
      return '/products';
    }

    return buildProductDetailPath(featuredProduct);
  }, [products]);

  const searchRecentKeywords = useMemo(
    () => [
      t('Nội thất gỗ'),
      t('OEM / ODM'),
      t('Báo giá nhanh'),
      t('Dự án khách sạn'),
    ],
    [t],
  );

  const searchGroupItems = useMemo<HomeSearchGroupItem[]>(
    () => [
      {
        id: 'featured-products',
        icon: '🪑',
        title: t('Sản phẩm nổi bật'),
        description: t('Nội thất xuất khẩu, bộ sưu tập theo chất liệu và phong cách.'),
        to: featuredProductPath,
      },
      {
        id: 'custom-manufacturing',
        icon: '🏭',
        title: t('Gia công theo yêu cầu'),
        description: t('OEM/ODM, phát triển mẫu và vận hành sản xuất linh hoạt.'),
        to: '/manufacturing-ecosystem/custom-production-oem-odm',
      },
      {
        id: 'project-case-study',
        icon: '📦',
        title: t('Dự án & Case Study'),
        description: t('Các dự án nội thất thực tế cho thị trường trong nước và quốc tế.'),
        to: '/projects',
      },
      {
        id: 'quote-and-contact',
        icon: '📄',
        title: t('Báo giá & làm việc'),
        description: t('Gửi yêu cầu báo giá, đặt lịch trao đổi với đội ngũ ANSLIFE.'),
        to: '/contact/quote-request',
      },
    ],
    [featuredProductPath, t],
  );

  const normalizedSearchPopupQuery = useMemo(
    () => normalizeSearchValue(searchPopupQuery),
    [searchPopupQuery],
  );

  const filteredSearchGroupItems = useMemo(() => {
    if (!normalizedSearchPopupQuery) {
      return searchGroupItems;
    }

    return searchGroupItems.filter((item) =>
      searchContainsText(
        `${item.title} ${item.description}`,
        normalizedSearchPopupQuery,
      ),
    );
  }, [normalizedSearchPopupQuery, searchGroupItems]);

  const navigationSearchItems = useMemo<HomeSearchResultItem[]>(() => {
    const flattenedMenuItems = flattenMenuItemsForSearch(TOP_MENU as MenuChildItem[]);
    const uniqueMenuItems = new Map<string, HomeNavigationSearchItem>();
    for (const item of flattenedMenuItems) {
      const uniqueKey = `${item.path}__${item.label}`;
      if (!uniqueMenuItems.has(uniqueKey)) {
        uniqueMenuItems.set(uniqueKey, item);
      }
    }

    return Array.from(uniqueMenuItems.values()).map((item, index) => {
      const translatedTrail = item.trail.map((label) => t(label));
      const translatedTitle = translatedTrail[translatedTrail.length - 1] ?? t(item.label);
      const breadcrumb = translatedTrail.slice(0, -1).join(' · ');
      const normalizedPath = item.path.replace(/[/-]+/g, ' ');

      return {
        id: `search-navigation-${index}-${item.path}`,
        icon: '🧭',
        title: translatedTitle,
        description: breadcrumb || t('Truy cập nhanh'),
        to: item.path,
        searchText: `${item.label} ${translatedTitle} ${item.trail.join(' ')} ${translatedTrail.join(
          ' ',
        )} ${normalizedPath}`,
      };
    });
  }, [t]);

  const staticSectionSearchItems = useMemo<HomeSearchResultItem[]>(() => {
    const items: HomeSearchResultItem[] = [];

    for (const page of Object.values(STATIC_PAGE_MAP)) {
      const pageTitle = t(page.title);
      const pageSummary = t(page.summary);

      items.push({
        id: `search-static-page-${page.slug}`,
        icon: '🧭',
        title: pageTitle,
        description: pageSummary,
        to: page.path,
        searchText: `${page.title} ${pageTitle} ${page.summary} ${pageSummary} ${page.slug} ${page.path}`,
      });

      for (const section of page.sections) {
        const sectionTitle = t(section.title);
        const sectionDescription = t(section.description);
        items.push({
          id: `search-static-section-${page.slug}-${section.id}`,
          icon: '🧭',
          title: sectionTitle,
          description: `${pageTitle} · ${sectionDescription}`,
          to: `${page.path}/${section.id}`,
          searchText: `${section.title} ${sectionTitle} ${section.description} ${sectionDescription} ${page.title} ${pageTitle} ${section.id} ${page.slug}`,
        });
      }
    }

    return items;
  }, [t]);

  const structuralSearchItems = useMemo<HomeSearchResultItem[]>(() => {
    const uniqueItems = new Map<string, HomeSearchResultItem>();
    for (const item of [...navigationSearchItems, ...staticSectionSearchItems]) {
      const uniqueKey = `${item.to}__${normalizeSearchValue(item.title)}`;
      if (!uniqueItems.has(uniqueKey)) {
        uniqueItems.set(uniqueKey, item);
      }
    }

    return Array.from(uniqueItems.values());
  }, [navigationSearchItems, staticSectionSearchItems]);

  const buildSearchResultItems = useCallback(
    ({ products: nextProducts, projects: nextProjects, news: nextNews }: HomeData) => {
      const productItems: HomeSearchResultItem[] = nextProducts.map((product) => {
        const productTitle = decodeHtml(product.title.rendered).trim() || product.slug;
        const categoryNames = getTermsByTaxonomy(product, 'product_category')
          .map((term) => term.name.trim())
          .filter(Boolean)
          .join(', ');
        const description = categoryNames
          ? `${t('Sản phẩm')}: ${categoryNames}`
          : t('Sản phẩm');

        return {
          id: `search-product-${product.id}`,
          icon: '🪑',
          title: productTitle,
          description,
          to: buildProductDetailPath(product),
          searchText: `${productTitle} ${description} ${product.slug}`,
        };
      });

      const projectItems: HomeSearchResultItem[] = nextProjects.map((project) => {
        const projectTitle = decodeHtml(project.title.rendered).trim() || project.slug;
        const projectTypeNames = getTermsByTaxonomy(project, 'project_type')
          .map((term) => term.name.trim())
          .filter(Boolean)
          .join(', ');
        const description = projectTypeNames
          ? `${t('Dự án')}: ${projectTypeNames}`
          : t('Dự án');

        return {
          id: `search-project-${project.id}`,
          icon: '📦',
          title: projectTitle,
          description,
          to: `/projects/${project.slug}`,
          searchText: `${projectTitle} ${description} ${project.slug}`,
        };
      });

      const newsItems: HomeSearchResultItem[] = nextNews.map((post) => {
        const newsTitle = decodeHtml(post.title.rendered).trim() || post.slug;
        const newsCategoryNames = getTermsByTaxonomy(post, 'category')
          .map((term) => term.name.trim())
          .filter(Boolean)
          .join(', ');
        const description = newsCategoryNames
          ? `${t('Tin tức')}: ${newsCategoryNames}`
          : t('Tin tức');

        return {
          id: `search-news-${post.id}`,
          icon: '📰',
          title: newsTitle,
          description,
          to: `/news/${post.slug}`,
          searchText: `${newsTitle} ${description} ${post.slug}`,
        };
      });

      return [...productItems, ...projectItems, ...newsItems];
    },
    [t],
  );

  const searchResultItems = useMemo<HomeSearchResultItem[]>(
    () => [
      ...structuralSearchItems,
      ...buildSearchResultItems({
        products,
        projects,
        news,
      }),
    ],
    [buildSearchResultItems, news, products, projects, structuralSearchItems],
  );

  const loadSearchIndex = useCallback(async () => {
    if (searchIndexLoading) {
      return;
    }

    setSearchIndexLoading(true);
    try {
      const [productsResult, projectsResult, newsResult] = await Promise.allSettled([
        getProducts(100),
        getProjects(100),
        getNews(100),
      ]);

      setSearchIndexItems(
        [
          ...structuralSearchItems,
          ...buildSearchResultItems({
            products: productsResult.status === 'fulfilled' ? productsResult.value : [],
            projects: projectsResult.status === 'fulfilled' ? projectsResult.value : [],
            news: newsResult.status === 'fulfilled' ? newsResult.value : [],
          }),
        ],
      );
    } finally {
      setSearchIndexLoading(false);
      setSearchIndexReady(true);
    }
  }, [buildSearchResultItems, searchIndexLoading, structuralSearchItems]);

  const activeSearchResultItems = useMemo(
    () =>
      searchIndexReady && searchIndexItems.length > 0
        ? searchIndexItems
        : searchResultItems,
    [searchIndexItems, searchIndexReady, searchResultItems],
  );

  const filteredSearchResultItems = useMemo(() => {
    if (!normalizedSearchPopupQuery) {
      return activeSearchResultItems.slice(0, 8);
    }

    return activeSearchResultItems
      .filter((item) =>
        searchContainsText(item.searchText, normalizedSearchPopupQuery),
      )
      .slice(0, 12);
  }, [activeSearchResultItems, normalizedSearchPopupQuery]);

  const handleSearchSubmit = useCallback(() => {
    const rawQuery = searchPopupQuery.trim();
    if (!rawQuery) {
      return;
    }

    setSearchPopupQuery('');
    setIsSearchPopupOpen(false);
    navigate(toLocalizedPath(`/search?q=${encodeURIComponent(rawQuery)}`));
  }, [
    navigate,
    searchPopupQuery,
    toLocalizedPath,
  ]);

  const handleMobileLanguageSelect = useCallback(
    (code: LanguageCode) => {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
      setIsMobileLanguageOpen(false);
      navigate(
        withLanguagePath(`${location.pathname}${location.search}${location.hash}`, code),
        { replace: true },
      );
    },
    [location.hash, location.pathname, location.search, navigate],
  );

  useEffect(() => {
    if (!isSearchPopupOpen || searchIndexReady || searchIndexLoading) {
      return;
    }

    void loadSearchIndex();
  }, [isSearchPopupOpen, loadSearchIndex, searchIndexLoading, searchIndexReady]);

  useEffect(() => {
    if (!isSearchPopupOpen) {
      return;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      searchPopupInputRef.current?.focus();
    }, 40);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchPopupOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      window.clearTimeout(focusTimer);
      body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchPopupOpen]);

  useEffect(() => {
    setIsMobileLanguageOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <Seo
        title={t('Trang chủ')}
        description={t('Website ANSLIFE V1: hệ sinh thái sản xuất, chất lượng và năng lực toàn cầu.')}
      />

      <div className="home-anslife-root">
        <section className={`home-anslife-screen home-anslife-screen--${activeHeroScene.theme}`}>
          <div className="home-anslife-screen-media" aria-hidden="true">
            <picture className="home-anslife-screen-media-picture">
              <source
                media="(min-width:1024px)"
                srcSet={activeHeroScene.desktopImage}
              />
              <source
                media="(min-width:768px) and (orientation: portrait)"
                srcSet={activeHeroScene.tabletPortraitImage}
              />
              <source
                media="(max-width:767px) and (orientation: portrait)"
                srcSet={activeHeroScene.mobilePortraitImage}
              />
              <source
                media="(max-width:1023px) and (orientation: landscape)"
                srcSet={activeHeroScene.mobileLandscapeImage}
              />
              <img src={activeHeroScene.desktopImage} alt="" />
            </picture>

            <div className="home-anslife-screen-media-fallback" style={heroStyle} />
            {hasHeroVideo && (
              <video
                key={activeHeroScene.id}
                className="home-anslife-screen-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={activeHeroScene.posterImage || undefined}
              >
                {activeHeroScene.videoWebm && (
                  <source src={activeHeroScene.videoWebm} type="video/webm" />
                )}
                {activeHeroScene.videoMp4 && (
                  <source src={activeHeroScene.videoMp4} type="video/mp4" />
                )}
              </video>
            )}
          </div>

          <div className="home-anslife-screen-main">
            <div className="home-anslife-greeting">
              <span className="home-anslife-greeting-icon" aria-hidden="true">
                {activeHeroScene.icon}
              </span>
              <div className="home-anslife-greeting-copy">
                <h1>{activeHeroScene.greetingLabel}</h1>
                <p>{t('Quý khách đang tìm kiếm gì hôm nay?')}</p>
              </div>
            </div>

            <button
              type="button"
              className="home-anslife-screen-search"
              aria-haspopup="dialog"
              aria-expanded={isSearchPopupOpen}
              aria-controls="home-anslife-search-popup"
              onClick={() => {
                setSearchPopupQuery('');
                setIsSearchPopupOpen(true);
              }}
            >
              <span className="home-anslife-screen-search-icon" aria-hidden="true">
                ⌕
              </span>
              <span>{t('Tìm sản phẩm, vật liệu, dịch vụ cung ứng...')}</span>
            </button>

            <div className="home-anslife-mobile-language">
              <button
                type="button"
                className={`home-anslife-mobile-language-toggle ${
                  isMobileLanguageOpen ? 'is-open' : ''
                }`}
                aria-expanded={isMobileLanguageOpen}
                aria-controls="home-anslife-mobile-language-options"
                aria-label="Choose language"
                onClick={() => setIsMobileLanguageOpen((currentValue) => !currentValue)}
              >
                <span className="home-anslife-mobile-language-globe" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21M12 3c-2.3 2.5-3.5 5.5-3.5 9s1.2 6.5 3.5 9" />
                  </svg>
                </span>
                <span>{activeMobileLanguageLabel}</span>
                <span className="home-anslife-mobile-language-caret" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>

              {isMobileLanguageOpen && (
                <div
                  id="home-anslife-mobile-language-options"
                  className="home-anslife-mobile-language-options"
                  role="menu"
                  aria-label="Choose language"
                >
                  {HOME_MOBILE_LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      role="menuitemradio"
                      aria-checked={language === option.code}
                      className={`home-anslife-mobile-language-option ${
                        language === option.code ? 'is-active' : ''
                      }`}
                      onClick={() => handleMobileLanguageSelect(option.code)}
                    >
                      <span>{option.menuLabel}</span>
                      <strong>{option.label}</strong>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p>
              {t(
                'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất, QC tới giao hàng theo tiêu chuẩn quốc tế.',
              )}
            </p>
          </div>

          {error && (
            <div className="home-anslife-screen-error">
              <ErrorBlock message={error} />
            </div>
          )}

          <nav className="home-anslife-screen-quick" aria-label={t('Truy cập nhanh')}>
            {quickAccessItems.map((item) => (
              <Link
                key={item.id}
                to={toLocalizedPath(item.to)}
                className="home-anslife-screen-quick-item"
              >
                <span className="home-anslife-screen-quick-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="home-anslife-screen-quick-title">{item.title}</span>
              </Link>
            ))}
          </nav>
        </section>
      </div>

      {isSearchPopupOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="home-anslife-search-popup-overlay"
            role="presentation"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setIsSearchPopupOpen(false);
              }
            }}
          >
            <section
              id="home-anslife-search-popup"
              className="home-anslife-search-popup"
              role="dialog"
              aria-modal="true"
              aria-label={t('Tìm kiếm')}
            >
              <header className="home-anslife-search-popup-header">
                <h2>{t('Tìm kiếm')}</h2>
                <button
                  type="button"
                  className="home-anslife-search-popup-close"
                  aria-label={t('Đóng')}
                  onClick={() => setIsSearchPopupOpen(false)}
                >
                  ×
                </button>
              </header>

              <div className="home-anslife-search-popup-body">
                <label htmlFor="home-anslife-search-input" className="sr-only">
                  {t('Tìm kiếm')}
                </label>
                <div className="home-anslife-search-popup-input-wrap">
                  <span className="home-anslife-search-popup-input-icon" aria-hidden="true">
                    ⌕
                  </span>
                  <input
                    id="home-anslife-search-input"
                    ref={searchPopupInputRef}
                    type="text"
                    inputMode="search"
                    value={searchPopupQuery}
                    onChange={(event) => setSearchPopupQuery(event.target.value)}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        handleSearchSubmit();
                      }
                    }}
                    placeholder={t('Tìm sản phẩm, vật liệu, dịch vụ cung ứng...')}
                  />
                </div>

                <section className="home-anslife-search-popup-section">
                  <h3>{t('Từ khóa gần đây')}</h3>
                  <div className="home-anslife-search-popup-keywords">
                    {searchRecentKeywords.map((keyword) => (
                      <button
                        key={keyword}
                        type="button"
                        className={`home-anslife-search-popup-keyword ${
                          normalizeSearchValue(keyword) === normalizedSearchPopupQuery
                            ? 'is-active'
                            : ''
                        }`}
                        onClick={() => setSearchPopupQuery(keyword)}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="home-anslife-search-popup-section">
                  {!normalizedSearchPopupQuery && (
                    <h3>{t('Các nhóm giải pháp của ANSLIFE')}</h3>
                  )}
                  <div className="home-anslife-search-popup-groups">
                    {normalizedSearchPopupQuery ? (
                      searchIndexLoading &&
                      !searchIndexReady &&
                      filteredSearchResultItems.length === 0 ? (
                        <p className="home-anslife-search-popup-empty">
                          {t('Đang tải dữ liệu tìm kiếm...')}
                        </p>
                      ) : filteredSearchResultItems.length === 0 ? (
                        <p className="home-anslife-search-popup-empty">
                          {t('Không tìm thấy kết quả phù hợp.')}
                        </p>
                      ) : (
                        filteredSearchResultItems.map((item) => (
                          <Link
                            key={item.id}
                            to={toLocalizedPath(item.to)}
                            className="home-anslife-search-popup-group"
                            onClick={() => {
                              setSearchPopupQuery('');
                              setIsSearchPopupOpen(false);
                            }}
                          >
                            <span className="home-anslife-search-popup-group-icon" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className="home-anslife-search-popup-group-copy">
                              <strong>{item.title}</strong>
                              <span>{item.description}</span>
                            </span>
                          </Link>
                        ))
                      )
                    ) : (
                      filteredSearchGroupItems.length === 0 ? (
                        <p className="home-anslife-search-popup-empty">
                          {t('Không tìm thấy nhóm phù hợp. Hãy thử từ khóa khác.')}
                        </p>
                      ) : (
                        filteredSearchGroupItems.map((item) => (
                          <Link
                            key={item.id}
                            to={toLocalizedPath(item.to)}
                            className="home-anslife-search-popup-group"
                            onClick={() => {
                              setSearchPopupQuery('');
                              setIsSearchPopupOpen(false);
                            }}
                          >
                            <span className="home-anslife-search-popup-group-icon" aria-hidden="true">
                              {item.icon}
                            </span>
                            <span className="home-anslife-search-popup-group-copy">
                              <strong>{item.title}</strong>
                              <span>{item.description}</span>
                            </span>
                          </Link>
                        ))
                      )
                    )}
                  </div>
                </section>

                <section className="home-anslife-search-popup-section">
                  <h3>{t('Truy cập nhanh')}</h3>
                  <div className="home-anslife-search-popup-shortcuts">
                    {quickAccessItems.slice(0, 4).map((item) => (
                      <Link
                        key={item.id}
                        to={toLocalizedPath(item.to)}
                        className="home-anslife-search-popup-shortcut"
                        onClick={() => {
                          setSearchPopupQuery('');
                          setIsSearchPopupOpen(false);
                        }}
                      >
                        <span aria-hidden="true">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
