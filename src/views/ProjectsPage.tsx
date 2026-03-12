import { useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { getTermsByTaxonomy, stripHtmlTags } from '../lib/content';
import { getProjectTypes, getProjects } from '../lib/wp';
import type { WpEntity } from '../types/wp';

interface ProjectResource {
  projects: WpEntity[];
  types: Array<{ id: number; slug: string; name: string }>;
}

const EMPTY_PROJECT_TYPES: Array<{ id: number; slug: string; name: string }> = [];

export default function ProjectsPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const navigate = useNavigate();
  const { type: typeParam } = useParams();
  const loadProjects = useCallback(async () => {
    const [projectsResult, typesResult] = await Promise.allSettled([
      getProjects(100),
      getProjectTypes(),
    ]);

    return {
      projects: projectsResult.status === 'fulfilled' ? projectsResult.value : [],
      types: typesResult.status === 'fulfilled' ? typesResult.value : [],
    };
  }, []);

  const { data, loading, error } = useAsyncResource<ProjectResource>(loadProjects);
  const [searchParams] = useSearchParams();
  const types = data?.types ?? EMPTY_PROJECT_TYPES;

  const requestedType = typeParam ?? searchParams.get('type') ?? 'all';
  const activeType = useMemo(() => {
    if (requestedType === 'all') {
      return 'all';
    }

    return types.some((item) => item.slug === requestedType)
      ? requestedType
      : 'all';
  }, [requestedType, types]);

  const filteredProjects = useMemo(() => {
    if (!data) {
      return [];
    }

    if (activeType === 'all') {
      return data.projects;
    }

    return data.projects.filter((project) =>
      getTermsByTaxonomy(project, 'project_type').some(
        (term) => term.slug === activeType,
      ),
    );
  }, [activeType, data]);

  function handleTypeChange(nextType: string) {
    if (nextType === 'all') {
      navigate(toLocalizedPath('/projects'), { replace: true });
      return;
    }

    navigate(toLocalizedPath(`/projects/type/${nextType}`), { replace: true });
  }

  return (
    <>
      <Seo
        title={t('Dự án & Nghiên cứu điển hình')}
        description={t(
          'Danh mục dự án xuất khẩu, trường hợp sản xuất và trường hợp cải tiến của ANSLIFE.',
        )}
      />
      <section className="page-hero">
        <p className="kicker">{t('DỰ ÁN')}</p>
        <h1>{t('Dự án & Nghiên cứu điển hình')}</h1>
        <p>
          {t(
            'Tổng hợp dự án thực tế, bài học vận hành và hình ảnh giao hàng theo thị trường.',
          )}
        </p>
      </section>

      <section className="filter-bar" aria-label="Bộ lọc dự án">
        <button
          type="button"
          className={activeType === 'all' ? 'chip active' : 'chip'}
          onClick={() => handleTypeChange('all')}
        >
          {t('Tất cả')}
        </button>
        {types.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeType === item.slug ? 'chip active' : 'chip'}
            onClick={() => handleTypeChange(item.slug)}
          >
            {t(item.name)}
          </button>
        ))}
      </section>

      {loading && <LoadingBlock />}
      {error && <ErrorBlock message={error} />}

      {!loading && !error && (
        <section className="card-grid three-col">
          {filteredProjects.length === 0 && (
            <article className="content-card">
              <h3>{t('Chưa có dự án')}</h3>
              <p>{t('Hiện chưa có dự án nào được đăng từ CMS.')}</p>
            </article>
          )}
          {filteredProjects.map((project) => (
            <article key={project.id} className="content-card">
              <h3>{project.title.rendered}</h3>
              <p>{stripHtmlTags(project.excerpt.rendered)}</p>
              <Link
                to={toLocalizedPath(`/projects/${project.slug}`)}
                className="inline-link"
              >
                {t('Xem chi tiết')}
              </Link>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
