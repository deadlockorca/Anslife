import { Link } from 'react-router-dom';
import type { SectionItem } from '../../config/site';
import useSiteI18n from '../../hooks/useSiteI18n';

interface PageSectionsProps {
  sections: SectionItem[];
  basePath: string;
}

export default function PageSections({ sections, basePath }: PageSectionsProps) {
  const { t, toLocalizedPath } = useSiteI18n();

  return (
    <section className="section-list" aria-label="Nội dung chính">
      <div className="section-list-header">
        <h2>{t('Các nhóm nội dung')}</h2>
        <p>
          {t(
            'V1 hiển thị theo dạng trang con để team nhập nội dung nhanh và dễ mở rộng đa ngôn ngữ ở giai đoạn sau.',
          )}
        </p>
      </div>
      <div className="section-grid">
        {sections.map((section) => (
          <article key={section.id} className="section-card">
            <h3>{t(section.title)}</h3>
            <p>{t(section.description)}</p>
            <Link
              to={toLocalizedPath(section.path ?? `${basePath}/${section.id}`)}
              className="inline-link"
            >
              {t('Xem chi tiết')}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
