import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TOP_MENU } from '../../config/site';
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
import { getProducts, getProjects } from '../../lib/wp';

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

function normalizeSearchText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export default function SiteLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileActiveMenuPath, setMobileActiveMenuPath] = useState(
    TOP_MENU.find((item) => item.path !== '/')?.path ?? '/',
  );
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchReady, setSearchReady] = useState(false);
  const [searchIndex, setSearchIndex] = useState<HeaderSearchSuggestion[]>([]);
  const desktopSearchBoxRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchBoxRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t, toLocalizedPath } = useSiteI18n();
  const [selectedLanguageOption, setSelectedLanguageOption] = useState<string>(() => {
    if (typeof window === 'undefined') {
      return language;
    }

    return window.localStorage.getItem(LANGUAGE_SELECTOR_STORAGE_KEY) ?? language;
  });
  const mobileMenuItems = useMemo(
    () => TOP_MENU.filter((item) => item.path !== '/'),
    [],
  );

  const mobileActiveMenuItem = useMemo(
    () =>
      mobileMenuItems.find((item) => item.path === mobileActiveMenuPath) ??
      mobileMenuItems[0],
    [mobileMenuItems, mobileActiveMenuPath],
  );

  const resolveRouteLanguage = useCallback((code: string): LanguageCode | null => {
    const mappedCode = LANGUAGE_ROUTE_ALIAS[code];
    if (mappedCode) {
      return mappedCode;
    }

    return isLanguageCode(code) ? code : null;
  }, []);

  useEffect(() => {
    if (location.pathname !== '/vn') {
      setShowLanguagePopup(false);
      return;
    }

    setShowLanguagePopup(getStoredLanguage() === null);
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
    setSearchFocused(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    setSelectedLanguageOption((currentCode) =>
      resolveRouteLanguage(currentCode) ? language : currentCode,
    );
  }, [language, resolveRouteLanguage]);

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

  return (
    <div className="site-shell">
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
          <div className="topbar-primary">
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

            {renderSearchBox('header-search desktop-search', desktopSearchBoxRef)}

            <div className="header-actions">
              <Link
                to={toLocalizedPath('/contact/quote-request')}
                className="header-action-pill primary"
              >
                {t('Gửi yêu cầu báo giá')}
              </Link>
              <Link
                to={toLocalizedPath('/contact/schedule-meeting')}
                className="header-action-pill"
              >
                {t('Đặt lịch làm việc')}
              </Link>
            </div>

            <div className="header-language">
              <label htmlFor="language-switcher" className="sr-only">
                Chọn ngôn ngữ
              </label>
              <select
                id="language-switcher"
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

          </div>

          <div className="mobile-utility-row">
            <Link
              to={toLocalizedPath('/contact/company-info')}
              className="mobile-utility-pill mobile-location-pill"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-utility-icon">⌖</span>
              <span>{t('Văn phòng Hà Nội')}</span>
            </Link>
            <Link
              to={toLocalizedPath('/contact/schedule-meeting')}
              className="mobile-utility-pill mobile-login-pill"
              onClick={() => setMobileOpen(false)}
            >
              <span className="mobile-utility-icon">👤</span>
              <span>{t('Đặt lịch làm việc')}</span>
            </Link>
          </div>

          <div className="mobile-search-row">
            <button
              type="button"
              className="mobile-menu-trigger"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu-panel"
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span className="mobile-menu-trigger-icon">☰</span>
              <span>{t('Menu')}</span>
            </button>
            {renderSearchBox('header-search mobile-search', mobileSearchBoxRef)}
          </div>

          <nav className="main-nav">
            {TOP_MENU.map((item) => (
              <div
                key={item.path}
                className={`menu-item-group ${item.children ? 'has-children' : ''}`}
              >
                {item.children && item.children.length > 0 && item.path !== '/' ? (
                  <button
                    type="button"
                    className={`menu-link menu-link-button has-children ${
                      isPathMatch(item.path) ? 'is-active' : ''
                    }`}
                    aria-haspopup="true"
                    aria-label={t(item.label)}
                  >
                    {t(item.label)}
                  </button>
                ) : (
                  <NavLink
                    to={toLocalizedPath(item.path)}
                    className={({ isActive }) =>
                      `menu-link ${item.children ? 'has-children' : ''} ${isActive ? 'is-active' : ''}`
                    }
                    onClick={() => setMobileOpen(false)}
                    end={item.path === '/'}
                  >
                    {t(item.label)}
                  </NavLink>
                )}

                {item.children && item.children.length > 0 && (
                  <div className="submenu" role="menu" aria-label={`Mục con ${item.label}`}>
                    {item.children.map((child) =>
                      child.children && child.children.length > 0 ? (
                        <div key={child.path} className="submenu-flyout-item">
                          <button
                            type="button"
                            className="submenu-link submenu-link-parent submenu-link-button"
                            aria-haspopup="true"
                            aria-label={t(child.label)}
                          >
                            {t(child.label)}
                            <span className="submenu-link-arrow" aria-hidden="true">
                              ›
                            </span>
                          </button>
                          <div className="submenu-flyout-panel">
                            {child.children.map((grandChild) => (
                              <NavLink
                                key={grandChild.path}
                                to={toLocalizedPath(grandChild.path)}
                                className="submenu-link submenu-link-nested"
                                onClick={() => setMobileOpen(false)}
                              >
                                {t(grandChild.label)}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <NavLink
                          key={child.path}
                          to={toLocalizedPath(child.path)}
                          className="submenu-link"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(child.label)}
                        </NavLink>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

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
              {mobileMenuItems.map((item) => (
                item.children && item.children.length > 0 ? (
                  <button
                    key={item.path}
                    type="button"
                    className={`mobile-menu-tab ${
                      mobileActiveMenuItem?.path === item.path ? 'is-active' : ''
                    }`}
                    onClick={() => setMobileActiveMenuPath(item.path)}
                  >
                    <span>{t(item.label)}</span>
                    <span className="mobile-menu-arrow">›</span>
                  </button>
                ) : (
                  <NavLink
                    key={item.path}
                    to={toLocalizedPath(item.path)}
                    className={({ isActive }) =>
                      `mobile-menu-tab ${isActive ? 'is-active' : ''}`
                    }
                    onClick={() => setMobileOpen(false)}
                    end={item.path === '/'}
                  >
                    <span>{t(item.label)}</span>
                    <span className="mobile-menu-arrow">›</span>
                  </NavLink>
                )
              ))}
            </nav>

            <div className="mobile-menu-right">
              {mobileActiveMenuItem && (
                <>
                  <div className="mobile-menu-right-head">
                    <p>{t('Mục nổi bật')}</p>
                    <p className="mobile-menu-parent-link">
                      {t(mobileActiveMenuItem.label)}
                    </p>
                  </div>

                  <div className="mobile-menu-child-grid">
                    {mobileActiveMenuItem.children?.map((child) =>
                      child.children && child.children.length > 0 ? (
                        <div key={child.path} className="mobile-menu-group">
                          <p className="mobile-menu-group-title">{t(child.label)}</p>
                          <div className="mobile-menu-group-list">
                            {child.children.map((grandChild) => (
                              <NavLink
                                key={grandChild.path}
                                to={toLocalizedPath(grandChild.path)}
                                className="mobile-menu-child-card mobile-menu-child-card-nested"
                                onClick={() => setMobileOpen(false)}
                              >
                                {t(grandChild.label)}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <NavLink
                          key={child.path}
                          to={toLocalizedPath(child.path)}
                          className="mobile-menu-child-card"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(child.label)}
                        </NavLink>
                      ),
                    )}
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

      <main className="content-shell">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-company">
          <strong>ANSLIFE</strong> - {t('Hệ sinh thái sản xuất')},{' '}
          {t('Kiểm soát chất lượng')}, {t('Hệ thống toàn cầu')}.
        </div>
        <div className="footer-address">
          <strong>{t('Thông tin địa chỉ ANSLIFE')}</strong>
          <p>
            <span>{t('Văn phòng Hà Nội')}:</span>{' '}
            {t(
              'Tầng 5, Tòa nhà Zen Tower, Số 12 đường Khuất Duy Tiến, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội.',
            )}
          </p>
          <p>
            <span>{t('Văn phòng TP.HCM')}:</span>{' '}
            {t('Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh')}
          </p>
          <p>
            <span>{t('Địa chỉ nhà máy')}:</span>{' '}
            {t('Số 609, Tổ 3, Khu phố 1, Phường Long Bình, Tỉnh Đồng Nai, Việt Nam.')}
          </p>
        </div>
        <div className="footer-social">
          <strong>{t('Kết nối ANSLIFE')}</strong>
          <SocialLinks />
        </div>
        <div className="footer-note">
          {t('Giao diện Next.js + CMS WordPress')} ({new Date().getFullYear()})
        </div>
      </footer>
    </div>
  );
}
