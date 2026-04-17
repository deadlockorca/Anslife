import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { getFeaturedImage, getTermsByTaxonomy } from '../lib/content';
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
  return value.trim().toLocaleLowerCase('vi');
}

export default function HomePage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours());
  const [isSearchPopupOpen, setIsSearchPopupOpen] = useState(false);
  const [searchPopupQuery, setSearchPopupQuery] = useState('');
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
        id: 'hot-news',
        icon: '🏷',
        title: t('Tin nổi bật'),
        to: '/news',
      },
      {
        id: 'online-register',
        icon: '🗓',
        title: t('Đăng ký trực tuyến'),
        to: '/contact',
      },
      {
        id: 'products',
        icon: '🪑',
        title: t('Sản phẩm'),
        to: '/products',
      },
      {
        id: 'projects',
        icon: '📦',
        title: t('Dự án'),
        to: '/projects',
      },
      {
        id: 'promotions',
        icon: '✨',
        title: t('Ưu đãi'),
        to: '/contact/quote-request',
      },
    ],
    [t],
  );

  const featuredProductPath = useMemo(() => {
    const featuredProduct = products[0];
    if (!featuredProduct) {
      return '/products';
    }

    const primaryCategory = getTermsByTaxonomy(featuredProduct, 'product_category')[0];
    if (primaryCategory?.slug) {
      return `/products/${primaryCategory.slug}/${featuredProduct.slug}`;
    }

    return `/products/${featuredProduct.slug}`;
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
      normalizeSearchValue(`${item.title} ${item.description}`).includes(
        normalizedSearchPopupQuery,
      ),
    );
  }, [normalizedSearchPopupQuery, searchGroupItems]);

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

  return (
    <>
      <Seo
        title={t('Trang chủ')}
        description={t('Website ANSLIFE V1: hệ sinh thái sản xuất, chất lượng và năng lực toàn cầu.')}
      />

      <div className="home-vcb-root">
        <section className={`home-vcb-screen home-vcb-screen--${activeHeroScene.theme}`}>
          <div className="home-vcb-screen-media" aria-hidden="true">
            <picture className="home-vcb-screen-media-picture">
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

            <div className="home-vcb-screen-media-fallback" style={heroStyle} />
            {hasHeroVideo && (
              <video
                key={activeHeroScene.id}
                className="home-vcb-screen-video"
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

          <div className="home-vcb-screen-main">
            <div className="home-vcb-greeting">
              <span className="home-vcb-greeting-icon" aria-hidden="true">
                {activeHeroScene.icon}
              </span>
              <div className="home-vcb-greeting-copy">
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
              <span>{t('Sản phẩm nội thất, dự án, báo giá...')}</span>
            </button>

            <p>
              {t(
                'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất, QC tới giao hàng theo tiêu chuẩn quốc tế.',
              )}
            </p>
          </div>

          {error && (
            <div className="home-vcb-screen-error">
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
                    placeholder={t('Tìm sản phẩm, dự án, báo giá, năng lực sản xuất...')}
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
                  <h3>{t('Các nhóm giải pháp của ANSLIFE')}</h3>
                  <div className="home-anslife-search-popup-groups">
                    {filteredSearchGroupItems.length === 0 ? (
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
