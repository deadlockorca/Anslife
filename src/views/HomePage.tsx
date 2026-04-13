import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { getFeaturedImage, getTermsByTaxonomy, stripHtmlTags } from '../lib/content';
import { getNews, getProducts, getProjects } from '../lib/wp';
import type { WpEntity } from '../types/wp';

interface HomeData {
  products: WpEntity[];
  projects: WpEntity[];
  news: WpEntity[];
}

const EMPTY_ENTITIES: WpEntity[] = [];

export default function HomePage() {
  const { t, toLocalizedPath } = useSiteI18n();
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
    const productImage = products
      .map((item) => getFeaturedImage(item))
      .find((value): value is string => Boolean(value));
    if (productImage) {
      return productImage;
    }

    return (
      projects
        .map((item) => getFeaturedImage(item))
        .find((value): value is string => Boolean(value)) ?? null
    );
  }, [products, projects]);

  const productCategoryHighlights = useMemo(() => {
    const categoryMap = new Map<string, string>();
    for (const product of products) {
      const terms = getTermsByTaxonomy(product, 'product_category');
      for (const term of terms) {
        if (!categoryMap.has(term.slug)) {
          categoryMap.set(term.slug, term.name);
        }
      }
    }

    return Array.from(categoryMap.entries())
      .slice(0, 6)
      .map(([slug, name]) => ({ slug, name }));
  }, [products]);

  const heroStyle = heroImage
    ? {
        backgroundImage: `linear-gradient(120deg, rgba(14, 24, 38, 0.84) 0%, rgba(39, 63, 94, 0.74) 48%, rgba(181, 104, 68, 0.64) 100%), url(${heroImage})`,
      }
    : undefined;
  const factoryProfiles = useMemo(
    () => [
      {
        id: 'central',
        title: t('Trung tâm sản xuất chủ lực'),
        headline: t('Quy mô lớn, vận hành chuỗi sản xuất chính'),
        points: [
          t('Tập trung các công đoạn cốt lõi và kiểm soát kỹ thuật.'),
          t('Ưu tiên đơn hàng chiến lược, yêu cầu tiêu chuẩn cao.'),
          t('Là điểm điều phối tiến độ cho toàn hệ sinh thái.'),
        ],
      },
      {
        id: 'satellite',
        title: t('Mạng lưới sản xuất liên kết'),
        headline: t('Quy mô linh hoạt theo nhóm sản phẩm'),
        points: [
          t('Mở rộng công suất theo mùa vụ và kế hoạch xuất khẩu.'),
          t('Chuyên môn hóa theo từng dòng sản phẩm hoặc công đoạn.'),
          t('Phối hợp cùng trung tâm sản xuất chủ lực để đảm bảo tiến độ giao hàng.'),
        ],
      },
    ],
    [t],
  );

  return (
    <>
      <Seo
        title={t('Trang chủ')}
        description={t(
          'Website ANSLIFE V1: hệ sinh thái sản xuất, chất lượng và năng lực toàn cầu.',
        )}
      />

      <section className="home-ans-hero">
        <div className="home-ans-banner" style={heroStyle}>
          <p className="home-ans-label">{t('SẢN XUẤT NỘI THẤT ANSLIFE')}</p>
          <h1>{t('Giải pháp sản xuất nội thất xuất khẩu theo tiêu chuẩn quốc tế.')}</h1>
          <p>
            {t(
              'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất đến kiểm soát chất lượng và giao hàng. Hạ tầng nhà máy linh hoạt cho OEM/ODM.',
            )}
          </p>
          <div className="hero-actions">
            <Link to={toLocalizedPath('/products')} className="button-solid">
              {t('Khám phá sản phẩm')}
            </Link>
            <Link to={toLocalizedPath('/contact')} className="button-ghost">
              {t('Nhận tư vấn dự án')}
            </Link>
          </div>
        </div>
        <aside className="home-ans-side">
          <article className="home-ans-side-card">
            <p>{t('Hệ sinh thái sản xuất')}</p>
            <h2>{t('Nhà máy ANSLIFE + nhà máy đối tác')}</h2>
            <Link to={toLocalizedPath('/manufacturing-ecosystem')}>
              {t('Xem chi tiết')}
            </Link>
          </article>
          <article className="home-ans-side-card">
            <p>{t('Kiểm soát chất lượng')}</p>
            <h2>{t('QC nhiều lớp từ đầu vào đến trước xuất hàng')}</h2>
            <Link to={toLocalizedPath('/quality-control')}>{t('Xem chi tiết')}</Link>
          </article>
          <article className="home-ans-side-card">
            <p>{t('Mạng lưới toàn cầu')}</p>
            <h2>{t('Kết nối dự án tại Việt Nam, Nhật, Singapore và Hoa Kỳ')}</h2>
            <Link to={toLocalizedPath('/global-network')}>{t('Xem chi tiết')}</Link>
          </article>
        </aside>
      </section>

      {error && <ErrorBlock message={error} />}

      <section className="home-ans-section home-ans-factory-section">
        <div className="home-ans-head">
          <div>
            <p className="kicker">{t('Hệ thống sản xuất')}</p>
            <h2>{t('Quy mô theo từng nhà máy')}</h2>
          </div>
          <Link to={toLocalizedPath('/manufacturing-ecosystem')}>{t('Xem chi tiết')}</Link>
        </div>
        <div className="home-ans-factory-grid">
          {factoryProfiles.map((factory) => (
            <article key={factory.id} className="home-ans-factory-card">
              <p className="home-ans-tag">{factory.title}</p>
              <h3>{factory.headline}</h3>
              <ul>
                {factory.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {data && (
        <>
          <section className="home-ans-section">
            <div className="home-ans-head">
              <div>
                <p className="kicker">{t('Danh mục sản phẩm')}</p>
                <h2>{t('Sản phẩm tiêu biểu')}</h2>
              </div>
              <Link to={toLocalizedPath('/products')}>{t('Xem toàn bộ')}</Link>
            </div>
            {productCategoryHighlights.length > 0 && (
              <div className="home-ans-category-strip">
                {productCategoryHighlights.map((category) => (
                  <Link
                    key={category.slug}
                    to={toLocalizedPath(`/products/category/${category.slug}`)}
                    className="home-ans-chip"
                  >
                    {t(category.name)}
                  </Link>
                ))}
              </div>
            )}
            <div className="home-ans-grid">
              {products.length === 0 && (
                <article className="home-ans-card">
                  <p className="home-ans-tag">{t('Sản phẩm')}</p>
                  <h3>{t('Chưa có sản phẩm')}</h3>
                  <p>{t('Hiện chưa có sản phẩm nào trong hệ thống dữ liệu.')}</p>
                </article>
              )}
              {products.map((product) => {
                const image = getFeaturedImage(product);
                const primaryCategory = getTermsByTaxonomy(
                  product,
                  'product_category',
                )[0];
                const categorySlug = primaryCategory?.slug;
                const categoryName = primaryCategory?.name ?? 'Sản phẩm';
                const summary = stripHtmlTags(product.excerpt.rendered);
                const productDetailPath = categorySlug
                  ? `/products/${categorySlug}/${product.slug}`
                  : `/products/${product.slug}`;

                return (
                  <article key={product.id} className="home-ans-card">
                    {image && (
                      <img
                        src={image}
                        alt={product.title.rendered}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <p className="home-ans-tag">{t(categoryName)}</p>
                    <h3>{product.title.rendered}</h3>
                    <p>{summary || t('Đang cập nhật mô tả sản phẩm.')}</p>
                    <Link to={toLocalizedPath(productDetailPath)} className="home-ans-link">
                      {t('Xem chi tiết')}
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="home-ans-section">
            <div className="home-ans-head">
              <div>
                <p className="kicker">{t('Dự án')}</p>
                <h2>{t('Dự án & case study')}</h2>
              </div>
              <Link to={toLocalizedPath('/projects')}>{t('Xem toàn bộ')}</Link>
            </div>
            <div className="home-ans-grid home-ans-grid-compact">
              {projects.length === 0 && (
                <article className="home-ans-card">
                  <p className="home-ans-tag">{t('Dự án')}</p>
                  <h3>{t('Chưa có dự án')}</h3>
                  <p>{t('Hiện chưa có dự án nào trong hệ thống dữ liệu.')}</p>
                </article>
              )}
              {projects.map((project) => {
                const image = getFeaturedImage(project);
                const summary = stripHtmlTags(project.excerpt.rendered);
                return (
                  <article key={project.id} className="home-ans-card">
                    {image && (
                      <img
                        src={image}
                        alt={project.title.rendered}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <p className="home-ans-tag">{t('Dự án')}</p>
                    <h3>{project.title.rendered}</h3>
                    <p>{summary || t('Đang cập nhật nội dung dự án.')}</p>
                    <Link
                      to={toLocalizedPath(`/projects/${project.slug}`)}
                      className="home-ans-link"
                    >
                      {t('Xem chi tiết')}
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="home-ans-section">
            <div className="home-ans-head">
              <div>
                <p className="kicker">{t('Tin tức')}</p>
                <h2>{t('Tin tức & kiến thức sản xuất')}</h2>
              </div>
              <Link to={toLocalizedPath('/news')}>{t('Xem toàn bộ')}</Link>
            </div>
            <div className="home-ans-grid home-ans-grid-compact">
              {news.length === 0 && (
                <article className="home-ans-card">
                  <p className="home-ans-tag">{t('Tin tức')}</p>
                  <h3>{t('Chưa có bài viết')}</h3>
                  <p>{t('Hiện chưa có bài viết nào trong hệ thống dữ liệu.')}</p>
                </article>
              )}
              {news.map((post) => {
                const image = getFeaturedImage(post);
                const summary = stripHtmlTags(post.excerpt.rendered);
                return (
                  <article key={post.id} className="home-ans-card">
                    {image && (
                      <img
                        src={image}
                        alt={post.title.rendered}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <p className="home-ans-tag">{t('Tin tức')}</p>
                    <h3>{post.title.rendered}</h3>
                    <p>{summary || t('Đang cập nhật nội dung bài viết.')}</p>
                    <Link
                      to={toLocalizedPath(`/news/${post.slug}`)}
                      className="home-ans-link"
                    >
                      {t('Đọc bài viết')}
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        </>
      )}
    </>
  );
}
