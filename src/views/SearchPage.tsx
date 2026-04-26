import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { STATIC_PAGE_MAP, TOP_MENU, type MenuChildItem } from '../config/site';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { decodeHtml, getTermsByTaxonomy } from '../lib/content';
import { getNews, getProducts, getProjects } from '../lib/wp';
import type { WpEntity } from '../types/wp';

interface SearchData {
  products: WpEntity[];
  projects: WpEntity[];
  news: WpEntity[];
}

interface MenuSearchNode {
  label: string;
  path: string;
  trail: string[];
}

interface SearchResultItem {
  id: string;
  icon: string;
  kind: 'navigation' | 'section' | 'product' | 'project' | 'news';
  title: string;
  description: string;
  to: string;
  searchText: string;
}

const EMPTY_ENTITIES: WpEntity[] = [];

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
): MenuSearchNode[] {
  const flattenedItems: MenuSearchNode[] = [];

  for (const item of items) {
    const label = item.label.trim();
    const path = item.path.trim();
    if (!label || !path) {
      continue;
    }

    const trail = [...parentTrail, label];
    flattenedItems.push({ label, path, trail });

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

export default function SearchPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const normalizedQuery = useMemo(() => normalizeSearchValue(query), [query]);
  const [queryInput, setQueryInput] = useState(query);

  useEffect(() => {
    setQueryInput(query);
  }, [query]);

  const loadSearchData = useCallback(async (): Promise<SearchData> => {
    if (!normalizedQuery) {
      return {
        products: [],
        projects: [],
        news: [],
      };
    }

    const [productsResult, projectsResult, newsResult] = await Promise.allSettled([
      getProducts(100),
      getProjects(100),
      getNews(100),
    ]);

    return {
      products: productsResult.status === 'fulfilled' ? productsResult.value : [],
      projects: projectsResult.status === 'fulfilled' ? projectsResult.value : [],
      news: newsResult.status === 'fulfilled' ? newsResult.value : [],
    };
  }, [normalizedQuery]);

  const { data, loading, error } = useAsyncResource<SearchData>(loadSearchData);
  const products = data?.products ?? EMPTY_ENTITIES;
  const projects = data?.projects ?? EMPTY_ENTITIES;
  const news = data?.news ?? EMPTY_ENTITIES;

  const structuralResults = useMemo<SearchResultItem[]>(() => {
    const navigationItems = flattenMenuItemsForSearch(TOP_MENU as MenuChildItem[])
      .map((item, index) => {
        const translatedTrail = item.trail.map((label) => t(label));
        const translatedTitle = translatedTrail[translatedTrail.length - 1] ?? t(item.label);
        const breadcrumb = translatedTrail.slice(0, -1).join(' · ');

        return {
          id: `search-navigation-${index}-${item.path}`,
          icon: '🧭',
          kind: 'navigation' as const,
          title: translatedTitle,
          description: breadcrumb || t('Điều hướng website'),
          to: item.path,
          searchText: `${item.label} ${translatedTitle} ${item.trail.join(' ')} ${translatedTrail.join(' ')} ${item.path}`,
        };
      });

    const staticItems = Object.values(STATIC_PAGE_MAP).flatMap((page) => {
      const pageTitle = t(page.title);
      const pageSummary = t(page.summary);

      const pageResult: SearchResultItem = {
        id: `search-static-page-${page.slug}`,
        icon: '🧭',
        kind: 'section',
        title: pageTitle,
        description: pageSummary,
        to: page.path,
        searchText: `${page.title} ${pageTitle} ${page.summary} ${pageSummary} ${page.slug} ${page.path}`,
      };

      const sectionResults = page.sections.map((section) => {
        const sectionTitle = t(section.title);
        const sectionDescription = t(section.description);
        return {
          id: `search-static-section-${page.slug}-${section.id}`,
          icon: '🧭',
          kind: 'section' as const,
          title: sectionTitle,
          description: `${pageTitle} · ${sectionDescription}`,
          to: `${page.path}/${section.id}`,
          searchText: `${section.title} ${sectionTitle} ${section.description} ${sectionDescription} ${page.title} ${pageTitle} ${section.id} ${page.slug}`,
        };
      });

      return [pageResult, ...sectionResults];
    });

    const uniqueItems = new Map<string, SearchResultItem>();
    for (const item of [...navigationItems, ...staticItems]) {
      const key = `${item.to}__${normalizeSearchValue(item.title)}`;
      if (!uniqueItems.has(key)) {
        uniqueItems.set(key, item);
      }
    }

    return Array.from(uniqueItems.values());
  }, [t]);

  const dynamicResults = useMemo<SearchResultItem[]>(() => {
    const productResults = products.map((product) => {
      const title = decodeHtml(product.title.rendered).trim() || product.slug;
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
        kind: 'product' as const,
        title,
        description,
        to: buildProductDetailPath(product),
        searchText: `${title} ${description} ${product.slug}`,
      };
    });

    const projectResults = projects.map((project) => {
      const title = decodeHtml(project.title.rendered).trim() || project.slug;
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
        kind: 'project' as const,
        title,
        description,
        to: `/projects/${project.slug}`,
        searchText: `${title} ${description} ${project.slug}`,
      };
    });

    const newsResults = news.map((post) => {
      const title = decodeHtml(post.title.rendered).trim() || post.slug;
      const categoryNames = getTermsByTaxonomy(post, 'category')
        .map((term) => term.name.trim())
        .filter(Boolean)
        .join(', ');
      const description = categoryNames
        ? `${t('Tin tức')}: ${categoryNames}`
        : t('Tin tức');

      return {
        id: `search-news-${post.id}`,
        icon: '📰',
        kind: 'news' as const,
        title,
        description,
        to: `/news/${post.slug}`,
        searchText: `${title} ${description} ${post.slug}`,
      };
    });

    return [...productResults, ...projectResults, ...newsResults];
  }, [news, products, projects, t]);

  const filteredResults = useMemo(() => {
    if (!normalizedQuery) {
      return [] as SearchResultItem[];
    }

    return [...structuralResults, ...dynamicResults].filter((item) =>
      searchContainsText(item.searchText, normalizedQuery),
    );
  }, [dynamicResults, normalizedQuery, structuralResults]);

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = queryInput.trim();

    const nextParams = new URLSearchParams(searchParams);
    if (nextQuery) {
      nextParams.set('q', nextQuery);
    } else {
      nextParams.delete('q');
    }

    setSearchParams(nextParams);
  }

  function getKindLabel(kind: SearchResultItem['kind']): string {
    switch (kind) {
      case 'product':
        return t('Sản phẩm');
      case 'project':
        return t('Dự án');
      case 'news':
        return t('Tin tức');
      case 'navigation':
        return t('Điều hướng');
      default:
        return t('Trang thông tin');
    }
  }

  return (
    <>
      <Seo
        title={query ? `${t('Kết quả tìm kiếm')}: ${query}` : t('Kết quả tìm kiếm')}
        description={t('Trang kết quả tìm kiếm theo từ khóa trên hệ sinh thái ANSLIFE.')}
      />

      <section className="page-hero">
        <h1>{t('Kết quả tìm kiếm')}</h1>
        <p>{t('Nhập từ khóa để tìm sản phẩm, dự án, tin tức và các trang thông tin liên quan.')}</p>
      </section>

      <section className="content-block">
        <form className="search-page-toolbar" role="search" onSubmit={handleSearchSubmit}>
          <div className="search-page-input-wrap">
            <span className="search-page-input-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="text"
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              className="search-page-input"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              placeholder={t('Tìm sản phẩm, dự án, QC, triết lý vận hành...')}
              aria-label={t('Từ khóa tìm kiếm')}
            />
          </div>
          <button type="submit" className="button-solid search-page-submit">
            {t('Tìm kiếm')}
          </button>
        </form>

        {normalizedQuery ? (
          <p className="search-page-meta">
            {t('Từ khóa')}: <strong>{query}</strong>
            {' · '}
            {t('Kết quả')}: <strong>{filteredResults.length}</strong>
          </p>
        ) : (
          <p className="search-page-meta">{t('Vui lòng nhập từ khóa để bắt đầu tìm kiếm.')}</p>
        )}
      </section>

      {error && normalizedQuery && <ErrorBlock message={error} />}
      {loading && normalizedQuery && <LoadingBlock />}

      {!loading && normalizedQuery && (
        filteredResults.length > 0 ? (
          <section className="section-list search-page-result-list" aria-label={t('Kết quả tìm kiếm')}>
            {filteredResults.map((item) => (
              <Link
                key={item.id}
                to={toLocalizedPath(item.to)}
                className="search-page-result-item"
              >
                <span className="search-page-result-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="search-page-result-copy">
                  <span className="search-page-result-kind">{getKindLabel(item.kind)}</span>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </span>
              </Link>
            ))}
          </section>
        ) : (
          <article className="html-content html-panel">
            <p>{t('Không tìm thấy kết quả phù hợp. Bạn có thể thử từ khóa khác.')}</p>
          </article>
        )
      )}
    </>
  );
}
