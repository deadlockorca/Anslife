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
import { getProducts, getProjects } from '../../lib/wp';
import { getCurrentUser, type AuthUser } from '../../lib/internalAuth';

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
  const [desktopOpenMenuPath, setDesktopOpenMenuPath] = useState<string | null>(null);
  const [mobileActiveMenuPath, setMobileActiveMenuPath] = useState(
    TOP_MENU.find((item) => item.path !== '/')?.path ?? '/',
  );
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchReady, setSearchReady] = useState(false);
  const [searchIndex, setSearchIndex] = useState<HeaderSearchSuggestion[]>([]);
  const [headerAuthUser, setHeaderAuthUser] = useState<AuthUser | null>(null);
  const desktopSearchBoxRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchBoxRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t, toLocalizedPath } = useSiteI18n();
  const isAdminRoute = useMemo(
    () => /\/admin(?:\/|$)/.test(location.pathname),
    [location.pathname],
  );
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

  return (
    <div
      className={`site-shell ${isAdminRoute ? 'is-admin-route' : ''} ${
        !isAdminRoute ? 'has-mobile-bottom-nav' : ''
      }`}
    >
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

            {!isAdminRoute && renderSearchBox('header-search desktop-search', desktopSearchBoxRef)}

            {!isAdminRoute && (
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
            )}

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

          {!isAdminRoute && (
            <>
              <div className="mobile-search-row">
                {renderSearchBox('header-search mobile-search', mobileSearchBoxRef)}
              </div>

              <nav className="main-nav">
                {TOP_MENU.map((item) => {
                  const hasChildren = Boolean(item.children && item.children.length > 0);
                  const isLoginItem = item.path === '/admin/login';
                  const resolvedPath = isLoginItem ? authMenuPath : item.path;
                  const resolvedLabel = isLoginItem ? authMenuLabel : t(item.label);
                  const linkClassName = `menu-link ${hasChildren ? 'has-children' : ''} ${
                    item.path === '/admin/login' ? 'menu-link-login' : ''
                  }`;

                  return (
                    <div
                      key={item.path}
                      className={`menu-item-group ${hasChildren ? 'has-children' : ''} ${
                        item.path === '/admin/login' ? 'is-login-item' : ''
                      } ${desktopOpenMenuPath === item.path ? 'is-open' : ''}`}
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

                      {hasChildren && (
                        <div className="submenu" role="menu" aria-label={`Mục con ${item.label}`}>
                          {renderDesktopSubmenuItems(item.children ?? [])}
                        </div>
                      )}
                    </div>
                );
              })}
              </nav>
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
                  const hasChildren = Boolean(item.children && item.children.length > 0);
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

      {!isAdminRoute && (
        <nav className="mobile-bottom-nav" aria-label={t('Danh mục điều hướng')}>
          <NavLink
            to={toLocalizedPath('/')}
            end
            className={({ isActive }) =>
              `mobile-bottom-nav-item ${isActive ? 'is-active' : ''}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="mobile-bottom-nav-icon" aria-hidden="true">
              ⌂
            </span>
            <span>{t('Trang chủ')}</span>
          </NavLink>

          <button
            type="button"
            className={`mobile-bottom-nav-item ${mobileOpen ? 'is-active' : ''}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-panel"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="mobile-bottom-nav-icon" aria-hidden="true">
              ☰
            </span>
            <span>{t('Menu')}</span>
          </button>

          <NavLink
            to={toLocalizedPath('/products')}
            className={({ isActive }) =>
              `mobile-bottom-nav-item ${isActive ? 'is-active' : ''}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="mobile-bottom-nav-icon" aria-hidden="true">
              ▦
            </span>
            <span>{t('Sản phẩm')}</span>
          </NavLink>

          <NavLink
            to={toLocalizedPath('/projects')}
            className={({ isActive }) =>
              `mobile-bottom-nav-item ${isActive ? 'is-active' : ''}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="mobile-bottom-nav-icon" aria-hidden="true">
              ◇
            </span>
            <span>{t('Dự án')}</span>
          </NavLink>

          <NavLink
            to={toLocalizedPath('/contact')}
            end
            className={({ isActive }) =>
              `mobile-bottom-nav-item mobile-bottom-nav-cta ${isActive ? 'is-active' : ''}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <span className="mobile-bottom-nav-icon" aria-hidden="true">
              ✦
            </span>
            <span>{t('Liên hệ')}</span>
          </NavLink>
        </nav>
      )}

      <main className="content-shell">
        <Outlet />
      </main>

      {!isAdminRoute && (
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
            {t('Nền tảng Next.js + Database nội bộ')} ({new Date().getFullYear()})
          </div>
        </footer>
      )}
    </div>
  );
}
