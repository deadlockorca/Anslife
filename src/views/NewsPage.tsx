import { useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  formatDate,
  getFeaturedImage,
  getTermsByTaxonomy,
  stripHtmlTags,
} from '../lib/content';
import { getCategories, getNews } from '../lib/wp';
import type { WpEntity } from '../types/wp';

interface NewsResource {
  posts: WpEntity[];
  categories: Array<{ id: number; slug: string; name: string }>;
}

const EMPTY_POSTS: WpEntity[] = [];
const EMPTY_CATEGORIES: Array<{ id: number; slug: string; name: string }> = [];

export default function NewsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const { category: categoryParam } = useParams();
  const loadNews = useCallback(async () => {
    const [postsResult, categoriesResult] = await Promise.allSettled([
      getNews(100),
      getCategories(),
    ]);

    return {
      posts: postsResult.status === 'fulfilled' ? postsResult.value : [],
      categories:
        categoriesResult.status === 'fulfilled' ? categoriesResult.value : [],
    };
  }, []);

  const { data, loading, error } = useAsyncResource<NewsResource>(loadNews);
  const [searchParams] = useSearchParams();
  const posts = data?.posts ?? EMPTY_POSTS;
  const categories = data?.categories ?? EMPTY_CATEGORIES;
  const requestedCategory = categoryParam ?? searchParams.get('category') ?? 'all';
  const activeCategory = useMemo(() => {
    if (requestedCategory === 'all') {
      return 'all';
    }

    return categories.some((category) => category.slug === requestedCategory)
      ? requestedCategory
      : 'all';
  }, [categories, requestedCategory]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') {
      return posts;
    }

    return posts.filter((post) =>
      getTermsByTaxonomy(post, 'category').some(
        (term) => term.slug === activeCategory,
      ),
    );
  }, [activeCategory, posts]);

  function handleCategoryChange(nextCategory: string) {
    if (nextCategory === 'all') {
      navigate(toLocalizedPath('/news'), { replace: true });
      return;
    }

    navigate(toLocalizedPath(`/news/category/${nextCategory}`), { replace: true });
  }

  return (
    <>
      <Seo
        title={t('Tin tức & Kiến thức')}
        description={t(
          'Tin doanh nghiệp, tin nhà máy và kiến thức sản xuất, QC, xuất khẩu.',
        )}
      />
      <section className="page-hero">
        <p className="kicker">{t('TIN TỨC')}</p>
        <h1>{t('Tin tức & Kiến thức')}</h1>
        <p>{t('Nội dung vận hành, sản xuất, QC và cập nhật từ hệ sinh thái ANSLIFE.')}</p>
      </section>

      <section className="filter-bar" aria-label="Bộ lọc tin tức">
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
      {error && posts.length === 0 && <ErrorBlock message={error} />}

      {!loading && (
        <section className="card-grid three-col">
          {filteredPosts.length === 0 && (
            <article className="content-card">
              <h3>{t('Chưa có bài viết')}</h3>
              <p>{t('Hiện chưa có bài viết nào được đăng từ CMS.')}</p>
            </article>
          )}
          {filteredPosts.map((post) => {
            const image = getFeaturedImage(post);
            return (
              <article key={post.id} className="content-card">
                {image && (
                  <img
                    src={image}
                    alt={post.title.rendered}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <p className="date-chip">{formatDate(post.date)}</p>
                <h3>{post.title.rendered}</h3>
                <p>{stripHtmlTags(post.excerpt.rendered)}</p>
                <Link to={toLocalizedPath(`/news/${post.slug}`)} className="inline-link">
                  {t('Đọc bài viết')}
                </Link>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
}
