import { useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { getFeaturedImage, getTermsByTaxonomy, stripHtmlTags } from '../lib/content';
import { getProductCategories, getProducts } from '../lib/wp';
import type { WpEntity } from '../types/wp';

interface ProductResource {
  products: WpEntity[];
  categories: Array<{ id: number; slug: string; name: string }>;
}

const EMPTY_PRODUCT_CATEGORIES: Array<{ id: number; slug: string; name: string }> = [];
const PRODUCT_CATEGORY_GROUPS: Record<string, string[]> = {
  ghe: ['ghe', 'ghe-an', 'ghe-lounge', 'ghe-bar'],
  ban: ['ban', 'ban-an', 'ban-ca-phe', 'ban-phu'],
  'tu-ke': ['tu-ke', 'tu-quan-ao', 'ke-trang-tri', 'tu-luu-tru'],
  'bo-phong-ngu': [
    'bo-phong-ngu',
    'giuong-ngu',
    'tu-dau-giuong',
    'tu-quan-ao',
    'ban-trang-diem',
    'bo-phong-ngu-hoan-chinh',
  ],
};

export default function ProductsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const { category: categoryParam } = useParams();
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
  const categorySlugsToMatch = useMemo(() => {
    if (activeCategory === 'all') {
      return null;
    }

    return new Set(PRODUCT_CATEGORY_GROUPS[activeCategory] ?? [activeCategory]);
  }, [activeCategory]);

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

      <section className="filter-bar" aria-label="Bộ lọc danh mục">
        <button
          type="button"
          className={activeCategory === 'all' ? 'chip active' : 'chip'}
          onClick={() => handleCategoryChange('all')}
        >
          {t('Tất cả')}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={activeCategory === category.slug ? 'chip active' : 'chip'}
            onClick={() => handleCategoryChange(category.slug)}
          >
            {t(category.name)}
          </button>
        ))}
      </section>

      {loading && <LoadingBlock />}
      {error && <ErrorBlock message={error} />}

      {!loading && !error && (
        <section className="card-grid three-col">
          {filteredProducts.length === 0 && (
            <article className="content-card">
              <h3>{t('Chưa có sản phẩm')}</h3>
              <p>{t('Hiện chưa có sản phẩm nào được đăng từ CMS.')}</p>
            </article>
          )}
          {filteredProducts.map((product) => {
            const image = getFeaturedImage(product);
            const category = getTermsByTaxonomy(product, 'product_category')[0];
            const categorySlug = category?.slug ?? 'all';

            return (
              <article key={product.id} className="content-card">
                {image && (
                  <img
                    src={image}
                    alt={product.title.rendered}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <h3>{product.title.rendered}</h3>
                <p>{stripHtmlTags(product.excerpt.rendered)}</p>
                <Link
                  to={toLocalizedPath(`/products/${categorySlug}/${product.slug}`)}
                  className="inline-link"
                >
                  {t('Xem chi tiết')}
                </Link>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}
