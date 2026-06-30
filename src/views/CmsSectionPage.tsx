import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import HtmlContent from '../components/common/HtmlContent';
import LoadingBlock from '../components/common/LoadingBlock';
import ErrorBlock from '../components/common/ErrorBlock';
import PageSections from '../components/common/PageSections';
import Seo from '../components/seo/Seo';
import { TOP_MENU, type StaticPageConfig } from '../config/site';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { getAIFallbackPageHtml } from '../content/aiGeneratedContent';
import { getPageBySlug } from '../lib/wp';

interface CmsSectionPageProps {
  config: StaticPageConfig;
}

export default function CmsSectionPage({ config }: CmsSectionPageProps) {
  const { language, t, toLocalizedPath } = useSiteI18n();
  const hiddenAboutSectionIds = useMemo(
    () => new Set(['vision-mission', 'core-values']),
    [],
  );
  const materialGroupSectionIds = useMemo(
    () =>
      new Set([
        'solid-wood',
        'engineered-wood',
        'natural-materials',
        'upholstery-materials',
        'packing-materials',
      ]),
    [],
  );
  const loadPage = useCallback(() => getPageBySlug(config.slug), [config.slug]);
  const { data, loading, error } = useAsyncResource(loadPage);
  const fallbackHtml = getAIFallbackPageHtml(config.slug, language);
  const shouldRenderBlankPage =
    config.slug === 'scholarship-community' || config.slug === 'quality-control';
  const resolvedHtml = shouldRenderBlankPage
    ? ''
    : data?.content.rendered ?? fallbackHtml;
  const sectionListForNavigation = useMemo(
    () =>
      config.slug === 'quality-control'
        ? []
        : config.slug === 'materials'
        ? config.sections.filter((section) => materialGroupSectionIds.has(section.id))
        : config.slug === 'about-anslife'
        ? config.sections.filter((section) => !hiddenAboutSectionIds.has(section.id))
        : config.sections,
    [config.sections, config.slug, hiddenAboutSectionIds, materialGroupSectionIds],
  );
  const shouldHideHeroKicker =
    config.slug === 'about-anslife' || config.slug === 'global-network';
  const shouldHideAboutHeroSummary = config.slug === 'about-anslife' || shouldRenderBlankPage;
  const shouldShowScholarshipCommunityBanner = config.slug === 'scholarship-community';
  const shouldShowMaterialGroupsOnly = config.slug === 'materials';
  const materialMenuGroups = useMemo(
    () => TOP_MENU.find((item) => item.path === '/materials')?.children ?? [],
    [],
  );
  const displayHtml = useMemo(() => {
    if (!resolvedHtml) {
      return resolvedHtml;
    }

    const htmlWithoutBanner =
      config.slug === 'about-anslife' || config.slug === 'global-network'
        ? resolvedHtml.replace(/<figure class="ai-banner">[\s\S]*?<\/figure>/i, '')
        : resolvedHtml;

    if (config.slug !== 'manufacturing-ecosystem') {
      return htmlWithoutBanner;
    }

    return config.sections.reduce((html, section) => {
      const escapedId = section.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const sectionPattern = new RegExp(
        `<section\\s+id="${escapedId}"[^>]*>[\\s\\S]*?<\\/section>`,
        'gi',
      );
      return html.replace(sectionPattern, '');
    }, htmlWithoutBanner);
  }, [config.sections, config.slug, resolvedHtml]);
  const shouldShowLoading = !shouldRenderBlankPage && loading && !resolvedHtml;
  const shouldShowError = !shouldRenderBlankPage && Boolean(error) && !resolvedHtml;
  const scholarshipDirections = [
    {
      mark: '01',
      title: 'Phát triển con người',
      body: 'Đầu tư vào đào tạo, môi trường làm việc và cơ hội phát triển cho đội ngũ nhân sự.',
    },
    {
      mark: '02',
      title: 'Đồng hành cùng cộng đồng',
      body: 'Tham gia các hoạt động xã hội và chia sẻ giá trị với địa phương nơi ANSLIFE hoạt động.',
    },
    {
      mark: '03',
      title: 'Phát triển ngành sản xuất',
      body: 'Hỗ trợ nâng cao năng lực cho các nhà máy đối tác và thúc đẩy tiêu chuẩn sản xuất ổn định.',
    },
    {
      mark: '04',
      title: 'Hướng tới phát triển bền vững',
      body: 'Khuyến khích sử dụng vật liệu phù hợp, tối ưu nguồn lực và giảm lãng phí trong sản xuất.',
    },
  ];
  const scholarshipPrograms = [
    {
      title: 'Quỹ học bổng',
      body: 'Đồng hành cùng học sinh, sinh viên có hoàn cảnh khó khăn và khuyến khích tinh thần học tập.',
    },
    {
      title: 'Hoạt động cộng đồng',
      body: 'Tham gia các chương trình hỗ trợ cộng đồng và các hoạt động thiện nguyện tại địa phương.',
    },
    {
      title: 'Phát triển nguồn nhân lực',
      body: 'Đào tạo kỹ năng nghề, phát triển đội ngũ quản lý và nâng cao năng lực sản xuất.',
    },
    {
      title: 'Đồng hành cùng đối tác',
      body: 'Chia sẻ kinh nghiệm, quy trình và tiêu chuẩn nhằm nâng cao năng lực của chuỗi cung ứng.',
    },
  ];
  const scholarshipPhilosophy = [
    'Con người',
    'Đối tác',
    'Cộng đồng',
    'Môi trường',
    'Phát triển bền vững',
  ];
  const scholarshipCommitments = [
    {
      title: 'Trách nhiệm',
      body: 'Hoạt động minh bạch và có trách nhiệm với khách hàng, đối tác và cộng đồng.',
    },
    {
      title: 'Chất lượng',
      body: 'Không ngừng nâng cao chất lượng sản phẩm và dịch vụ.',
    },
    {
      title: 'Hợp tác',
      body: 'Xây dựng mối quan hệ hợp tác lâu dài dựa trên sự tin cậy và cùng phát triển.',
    },
    {
      title: 'Con người',
      body: 'Tạo môi trường làm việc an toàn, tôn trọng và khuyến khích học hỏi.',
    },
    {
      title: 'Bền vững',
      body: 'Hướng tới sự cân bằng giữa hiệu quả kinh doanh và giá trị xã hội.',
    },
  ];
  const scholarshipJourney = [
    'Đầu tư con người',
    'Nâng cao năng lực',
    'Hỗ trợ cộng đồng',
    'Phát triển chuỗi cung ứng',
    'Phát triển bền vững',
  ];
  const scholarshipRelatedLinks = [
    {
      title: 'Triết lý ANSLIFE',
      body: 'Tìm hiểu giá trị cốt lõi và định hướng phát triển của ANSLIFE.',
      href: '/about-anslife/philosophy',
    },
    {
      title: 'Tổng quan công ty',
      body: 'Khám phá mô hình hoạt động và năng lực của ANSLIFE.',
      href: '/about-anslife/company-intro',
    },
    {
      title: 'Chất lượng & Tiêu chuẩn',
      body: 'Cam kết về chất lượng trong toàn bộ chuỗi sản xuất.',
      href: '/quality-control',
    },
    {
      title: 'Vietnam Supply Hub',
      body: 'Giải pháp hỗ trợ chuỗi cung ứng và phát triển đối tác.',
      href: '/vietnam-supply-hub',
    },
  ];

  return (
    <>
      <Seo title={t(config.title)} description={t(config.summary)} />
      {shouldShowScholarshipCommunityBanner ? (
        <figure className="scholarship-community-banner">
          <img
            src="/assets/about/scholarship-community-banner.webp"
            alt={t('Banner phụng sự xã hội ANSLIFE')}
            loading="eager"
            decoding="async"
          />
          <figcaption className="scholarship-community-banner-copy">
            <h1>{t('Phụng sự xã hội')}</h1>
            <p>
              {t(
                'Phát triển doanh nghiệp gắn liền với trách nhiệm đối với con người, cộng đồng và sự phát triển bền vững.',
              )}
            </p>
            <p>
              {t(
                'ANSLIFE tin rằng giá trị của một doanh nghiệp không chỉ được tạo ra từ sản phẩm, mà còn từ những đóng góp tích cực cho cộng đồng và ngành sản xuất.',
              )}
            </p>
            <p>
              {t(
                'Chúng tôi hướng đến sự phát triển bền vững thông qua việc đầu tư vào con người, nâng cao năng lực sản xuất, hỗ trợ cộng đồng và xây dựng chuỗi cung ứng có trách nhiệm.',
              )}
            </p>
          </figcaption>
        </figure>
      ) : (
        <section className="page-hero">
          {!shouldHideHeroKicker && <p className="kicker">{t('TRANG WEB ANSLIFE V1')}</p>}
          <h1>{t(config.title)}</h1>
          {!shouldHideAboutHeroSummary && config.summary && <p>{t(config.summary)}</p>}
        </section>
      )}

      {shouldShowScholarshipCommunityBanner && (
        <section className="scholarship-community-content">
          <section className="scholarship-community-block" aria-labelledby="scholarship-direction-title">
            <h2 id="scholarship-direction-title">{t('Định hướng phụng sự')}</h2>
            <div className="scholarship-community-direction-grid">
              {scholarshipDirections.map((item) => (
                <article className="scholarship-community-card scholarship-community-card-tall" key={item.title}>
                  <span className="scholarship-community-card-mark">{item.mark}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                  <div className="scholarship-community-image-slot" aria-hidden="true" />
                </article>
              ))}
            </div>
          </section>

          <section className="scholarship-community-block" aria-labelledby="scholarship-program-title">
            <h2 id="scholarship-program-title">{t('Các chương trình của ANSLIFE')}</h2>
            <div className="scholarship-community-program-grid">
              {scholarshipPrograms.map((item) => (
                <article className="scholarship-community-card" key={item.title}>
                  <div className="scholarship-community-image-slot scholarship-community-image-slot-wide" aria-hidden="true" />
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.body)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="scholarship-community-systems" aria-label={t('Triết lý và cam kết phát triển')}>
            <article className="scholarship-community-panel">
              <h2>{t('Triết lý phát triển')}</h2>
              <div className="scholarship-community-philosophy">
                <ul>
                  {scholarshipPhilosophy.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <div className="scholarship-community-image-slot scholarship-community-image-slot-fill" aria-hidden="true" />
              </div>
            </article>

            <article className="scholarship-community-panel scholarship-community-panel-wide">
              <h2>{t('Cam kết của ANSLIFE')}</h2>
              <div className="scholarship-community-commitment-grid">
                {scholarshipCommitments.map((item, index) => (
                  <section key={item.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </section>
                ))}
              </div>
            </article>

            <article className="scholarship-community-panel">
              <h2>{t('Hành trình phát triển cùng cộng đồng')}</h2>
              <ol className="scholarship-community-journey">
                {scholarshipJourney.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {t(item)}
                  </li>
                ))}
              </ol>
            </article>
          </section>

          <section className="scholarship-community-statement" aria-label={t('Cam kết phát triển bền vững')}>
            <div className="scholarship-community-image-slot scholarship-community-image-slot-panorama" aria-hidden="true" />
            <blockquote>
              <p>
                {t(
                  'ANSLIFE cam kết tạo ra giá trị lâu dài cho khách hàng, cộng đồng và ngành sản xuất bằng sự chân thành, trách nhiệm và tinh thần không ngừng hoàn thiện.',
                )}
              </p>
            </blockquote>
          </section>

          <section className="scholarship-community-block" aria-labelledby="scholarship-related-title">
            <h2 id="scholarship-related-title">{t('Liên kết với các nội dung liên quan')}</h2>
            <div className="scholarship-community-related-grid">
              {scholarshipRelatedLinks.map((item) => (
                <a className="scholarship-community-related-card" href={item.href} key={item.title}>
                  <div className="scholarship-community-image-slot" aria-hidden="true" />
                  <div>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.body)}</p>
                  </div>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </section>

          <section className="scholarship-community-cta">
            <div className="scholarship-community-image-slot scholarship-community-cta-image" aria-hidden="true" />
            <div>
              <h2>{t('Đồng hành cùng ANSLIFE vì sự phát triển bền vững')}</h2>
              <p>
                {t(
                  'ANSLIFE luôn sẵn sàng hợp tác với khách hàng, đối tác và các tổ chức để xây dựng những dự án mang lại giá trị lâu dài cho doanh nghiệp, cộng đồng và ngành sản xuất nội thất.',
                )}
              </p>
            </div>
            <div className="scholarship-community-cta-actions">
              <a href="/contact">{t('Liên hệ hợp tác')}</a>
              <a href="/contact">{t('Gửi đề xuất')}</a>
              <a href="/contact">{t('Kết nối với ANSLIFE')}</a>
            </div>
          </section>
        </section>
      )}

      {shouldShowLoading && <LoadingBlock />}
      {shouldShowError && <ErrorBlock message={error as string} />}
      {!shouldShowMaterialGroupsOnly && displayHtml && (
        <HtmlContent
          className="html-content html-panel"
          html={displayHtml}
        />
      )}

      {shouldShowMaterialGroupsOnly && (
        <section className="materials-group-list" aria-label={t('Các nhóm nội dung')}>
          <div className="section-list-header">
            <h2>{t('Các nhóm nội dung')}</h2>
            <p>{t('Chọn nhóm vật liệu, sau đó vào từng mục con để xem chi tiết.')}</p>
          </div>
          <div className="materials-group-grid">
            {materialMenuGroups.map((group) => (
              <article className="materials-group-card" key={group.path}>
                <header>
                  <h3>{t(group.label)}</h3>
                </header>
                <div className="materials-child-grid">
                  {(group.children ?? []).map((child) => (
                    <section className="materials-child-card" key={child.path}>
                      <h4>{t(child.label)}</h4>
                      <Link to={toLocalizedPath(child.path)} className="inline-link">
                        {t('Xem chi tiết')}
                      </Link>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {!shouldShowScholarshipCommunityBanner && !shouldShowMaterialGroupsOnly && (
        <PageSections sections={sectionListForNavigation} basePath={config.path} />
      )}
    </>
  );
}
