import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { getFeaturedImage, getTermsByTaxonomy, stripHtmlTags } from '../lib/content';
import { getProductCategories, getProducts } from '../lib/wp';
import type { WpCategory, WpEntity } from '../types/wp';

interface ProductResource {
  products: WpEntity[];
  categories: WpCategory[];
}

type ProductSortKey = 'newest' | 'name-asc' | 'name-desc';

const EMPTY_PRODUCT_CATEGORIES: WpCategory[] = [];

function normalizeCategoryId(
  value: number | string | null | undefined,
): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : null;
}

function getCategorySlugSetWithDescendants(
  categories: WpCategory[],
  rootSlug: string,
): Set<string> {
  const rootCategory = categories.find((category) => category.slug === rootSlug);
  if (!rootCategory) {
    return new Set([rootSlug]);
  }

  const childrenByParentId = new Map<string, WpCategory[]>();
  for (const category of categories) {
    const parentId = normalizeCategoryId(category.parentId);
    if (!parentId) {
      continue;
    }

    const children = childrenByParentId.get(parentId) ?? [];
    children.push(category);
    childrenByParentId.set(parentId, children);
  }

  const categorySlugs = new Set<string>([rootCategory.slug]);
  const rootId = normalizeCategoryId(rootCategory.id);
  if (!rootId) {
    return categorySlugs;
  }

  const queue: string[] = [rootId];
  const visited = new Set<string>([rootId]);

  while (queue.length > 0) {
    const currentId = queue.shift();
    if (!currentId) {
      continue;
    }

    const children = childrenByParentId.get(currentId) ?? [];
    for (const child of children) {
      categorySlugs.add(child.slug);
      const childId = normalizeCategoryId(child.id);
      if (childId && !visited.has(childId)) {
        visited.add(childId);
        queue.push(childId);
      }
    }
  }

  return categorySlugs;
}

function getTopLevelCategorySlug(
  categories: WpCategory[],
  categorySlug: string,
): string {
  const categoryBySlug = new Map(categories.map((category) => [category.slug, category]));
  const categoryById = new Map<string, WpCategory>();

  for (const category of categories) {
    const categoryId = normalizeCategoryId(category.id);
    if (categoryId) {
      categoryById.set(categoryId, category);
    }
  }

  let cursor = categoryBySlug.get(categorySlug);
  const visited = new Set<string>();
  while (cursor) {
    const parentId = normalizeCategoryId(cursor.parentId);
    if (!parentId) {
      return cursor.slug;
    }

    if (visited.has(parentId)) {
      break;
    }
    visited.add(parentId);
    cursor = categoryById.get(parentId);
  }

  return categorySlug;
}

export default function ProductsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const { category: categoryParam } = useParams();
  const [sortKey, setSortKey] = useState<ProductSortKey>('newest');
  const loadProducts = useCallback(async () => {
    const [productsResult, categoriesResult] = await Promise.allSettled([
      getProducts(100),
      getProductCategories(),
    ]);

    return {
      products: productsResult.status === 'fulfilled' ? productsResult.value : [],
      categories:
        categoriesResult.status === 'fulfilled' ? categoriesResult.value : [],
    };
  }, []);

  const { data, loading, error } = useAsyncResource<ProductResource>(loadProducts);
  const [searchParams] = useSearchParams();
  const categories = data?.categories ?? EMPTY_PRODUCT_CATEGORIES;

  const requestedCategory = categoryParam ?? searchParams.get('category') ?? 'all';
  const activeCategory = useMemo(
    () => (requestedCategory === 'all' ? 'all' : requestedCategory),
    [requestedCategory],
  );
  const topLevelCategories = useMemo(() => {
    const roots = categories.filter((category) => !normalizeCategoryId(category.parentId));
    return roots.length > 0 ? roots : categories;
  }, [categories]);
  const activeTopLevelCategory = useMemo(() => {
    if (activeCategory === 'all') {
      return 'all';
    }

    return getTopLevelCategorySlug(categories, activeCategory);
  }, [activeCategory, categories]);
  const childrenByParentId = useMemo(() => {
    const grouped = new Map<string, WpCategory[]>();
    for (const category of categories) {
      const parentId = normalizeCategoryId(category.parentId);
      if (!parentId) {
        continue;
      }

      const children = grouped.get(parentId) ?? [];
      children.push(category);
      grouped.set(parentId, children);
    }

    return grouped;
  }, [categories]);
  const activeTopLevelChildren = useMemo(() => {
    if (activeTopLevelCategory === 'all') {
      return [];
    }

    const activeTopLevel = categories.find(
      (category) => category.slug === activeTopLevelCategory,
    );
    const activeTopLevelId = normalizeCategoryId(activeTopLevel?.id);
    if (!activeTopLevelId) {
      return [];
    }

    return childrenByParentId.get(activeTopLevelId) ?? [];
  }, [activeTopLevelCategory, categories, childrenByParentId]);
  const categorySlugsToMatch = useMemo(() => {
    if (activeCategory === 'all') {
      return null;
    }

    return getCategorySlugSetWithDescendants(categories, activeCategory);
  }, [activeCategory, categories]);

  const filteredProducts = useMemo(() => {
    if (!data) {
      return [];
    }

    if (!categorySlugsToMatch) {
      return data.products;
    }

    return data.products.filter((product) =>
      getTermsByTaxonomy(product, 'product_category').some(
        (term) => categorySlugsToMatch.has(term.slug),
      ),
    );
  }, [categorySlugsToMatch, data]);
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    if (sortKey === 'name-asc') {
      products.sort((left, right) =>
        left.title.rendered.localeCompare(right.title.rendered, 'vi'),
      );
      return products;
    }

    if (sortKey === 'name-desc') {
      products.sort((left, right) =>
        right.title.rendered.localeCompare(left.title.rendered, 'vi'),
      );
      return products;
    }

    products.sort((left, right) => {
      const leftTime = Date.parse(left.date);
      const rightTime = Date.parse(right.date);

      return (Number.isNaN(rightTime) ? 0 : rightTime) - (Number.isNaN(leftTime) ? 0 : leftTime);
    });
    return products;
  }, [filteredProducts, sortKey]);

  function handleCategoryChange(nextCategory: string) {
    if (nextCategory === 'all') {
      navigate(toLocalizedPath('/products'), { replace: true });
      return;
    }

    navigate(toLocalizedPath(`/products/category/${nextCategory}`), { replace: true });
  }

  return (
    <>
      <Seo
        title={t('Sản phẩm')}
        description={t(
          'Danh mục sản phẩm ANSLIFE: ghế, bàn, tủ kệ, bộ phòng ngủ, OEM/ODM và thiết kế riêng.',
        )}
      />
      <section className="page-hero">
        <p className="kicker">{t('DANH MỤC SẢN PHẨM')}</p>
        <h1>{t('Sản phẩm')}</h1>
        <p>
          {t(
            'Danh mục sản phẩm theo nhóm, cho phép gửi yêu cầu báo giá trực tiếp từ từng trang chi tiết.',
          )}
        </p>
      </section>

      {loading && <LoadingBlock />}
      {error && <ErrorBlock message={error} />}

      {!loading && !error && (
        <section className="products-catalog-layout">
          <aside className="products-catalog-sidebar">
            <article className="products-catalog-panel">
              <h2>{t('Danh mục')}</h2>
              <p>{t('Danh sách sản phẩm')}</p>

              <div className="products-catalog-menu">
                <button
                  type="button"
                  className={
                    activeTopLevelCategory === 'all'
                      ? 'products-catalog-link active'
                      : 'products-catalog-link'
                  }
                  onClick={() => handleCategoryChange('all')}
                >
                  <span>▸</span>
                  <span>{t('Tất cả sản phẩm')}</span>
                </button>

                {topLevelCategories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={
                      activeTopLevelCategory === category.slug
                        ? 'products-catalog-link active'
                        : 'products-catalog-link'
                    }
                    onClick={() => handleCategoryChange(category.slug)}
                  >
                    <span>▸</span>
                    <span>{t(category.name)}</span>
                  </button>
                ))}
              </div>
            </article>

            {activeTopLevelChildren.length > 0 && (
              <article className="products-catalog-panel">
                <h2>{t('Nhóm con')}</h2>
                <p>{t('Theo danh mục chi tiết')}</p>
                <div className="products-catalog-submenu">
                  {activeTopLevelChildren.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      className={
                        activeCategory === category.slug
                          ? 'products-catalog-subitem active'
                          : 'products-catalog-subitem'
                      }
                      onClick={() => handleCategoryChange(category.slug)}
                    >
                      {t(category.name)}
                    </button>
                  ))}
                </div>
              </article>
            )}
          </aside>

          <div className="products-catalog-main">
            <div className="products-mobile-categories" aria-label="Bộ lọc danh mục">
              <button
                type="button"
                className={activeTopLevelCategory === 'all' ? 'chip active' : 'chip'}
                onClick={() => handleCategoryChange('all')}
              >
                {t('Tất cả')}
              </button>
              {topLevelCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={activeTopLevelCategory === category.slug ? 'chip active' : 'chip'}
                  onClick={() => handleCategoryChange(category.slug)}
                >
                  {t(category.name)}
                </button>
              ))}
            </div>

            <div className="products-catalog-toolbar">
              <p className="products-catalog-result">
                {t('Hiển thị')} <strong>{sortedProducts.length}</strong> {t('sản phẩm')}
              </p>
              <label className="products-catalog-sort">
                <span>{t('Sắp xếp')}</span>
                <select
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value as ProductSortKey)}
                >
                  <option value="newest">{t('Mới nhất')}</option>
                  <option value="name-asc">{t('Tên A-Z')}</option>
                  <option value="name-desc">{t('Tên Z-A')}</option>
                </select>
              </label>
            </div>

            <div className="products-catalog-grid">
              {sortedProducts.length === 0 && (
                <article className="products-catalog-empty">
                  <h3>{t('Chưa có sản phẩm')}</h3>
                  <p>{t('Hiện chưa có sản phẩm nào trong hệ thống dữ liệu.')}</p>
                </article>
              )}

              {sortedProducts.map((product) => {
                const image = getFeaturedImage(product);
                const category = getTermsByTaxonomy(product, 'product_category')[0];
                const categorySlug = category?.slug ?? 'all';

                return (
                  <article key={product.id} className="products-catalog-card">
                    <Link to={toLocalizedPath(`/products/${categorySlug}/${product.slug}`)}>
                      {image ? (
                        <img
                          src={image}
                          alt={product.title.rendered}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="products-catalog-image-fallback">
                          {t('Chưa có ảnh')}
                        </div>
                      )}
                    </Link>

                    <div className="products-catalog-card-body">
                      {category && (
                        <span className="products-catalog-tag">{t(category.name)}</span>
                      )}
                      <h3>{product.title.rendered}</h3>
                      <p>{stripHtmlTags(product.excerpt.rendered)}</p>
                      <Link
                        to={toLocalizedPath(`/products/${categorySlug}/${product.slug}`)}
                        className="products-catalog-link-inline"
                      >
                        {t('Xem chi tiết')}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
