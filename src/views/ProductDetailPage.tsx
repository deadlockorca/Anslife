import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErrorBlock from '../components/common/ErrorBlock';
import HtmlContent from '../components/common/HtmlContent';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import {
  decodeHtml,
  getFeaturedImage,
  getTermsByTaxonomy,
  stripHtmlTags,
} from '../lib/content';
import { getProductBySlug } from '../lib/wp';
import type { WpEntity } from '../types/wp';

function buildDimensionsLabel(product: WpEntity): string {
  const specs = product.specifications;
  if (!specs?.dimensions) {
    return '';
  }

  const dimensions = [specs.dimensions.l, specs.dimensions.d, specs.dimensions.h].filter(
    (item): item is string => Boolean(item && item.trim().length > 0),
  );

  if (dimensions.length !== 3) {
    return '';
  }

  return `${dimensions[0]} x ${dimensions[1]} x ${dimensions[2]} cm`;
}

export default function ProductDetailPage() {
  const { category = 'all', slug = '' } = useParams();
  const navigate = useNavigate();
  const { t, toLocalizedPath } = useSiteI18n();

  const loadProduct = useCallback(() => getProductBySlug(slug), [slug]);
  const { data, loading, error } = useAsyncResource(loadProduct);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [data?.id]);

  const categoryMatched =
    category === 'all' ||
    (data !== null &&
      getTermsByTaxonomy(data, 'product_category').some(
        (term) => term.slug === category,
      ));

  const image = data ? getFeaturedImage(data) : null;
  const finishOptions = data ? getTermsByTaxonomy(data, 'product_finish') : [];
  const seatOptions = data ? getTermsByTaxonomy(data, 'product_seat_option') : [];
  const productCategories = data ? getTermsByTaxonomy(data, 'product_category') : [];
  const primaryCategorySlug = productCategories[0]?.slug ?? null;

  useEffect(() => {
    if (!data || !primaryCategorySlug) {
      return;
    }

    if (category === 'all') {
      navigate(toLocalizedPath(`/products/${primaryCategorySlug}/${data.slug}`), {
        replace: true,
      });
    }
  }, [category, data, navigate, primaryCategorySlug, toLocalizedPath]);

  const galleryItems = useMemo(() => {
    if (!data) {
      return [];
    }

    if (Array.isArray(data.gallery) && data.gallery.length > 0) {
      return data.gallery
        .filter((item) => item.src && item.src.trim().length > 0)
        .map((item, index) => ({
          id: item.id || index + 1,
          src: item.src,
          thumbnail: item.thumbnail || item.src,
          alt: item.alt || decodeHtml(data.title.rendered),
        }));
    }

    if (!image) {
      return [];
    }

    return [
      {
        id: data.id,
        src: image,
        thumbnail: image,
        alt: decodeHtml(data.title.rendered),
      },
    ];
  }, [data, image]);

  const activeImage = galleryItems[activeImageIndex] ?? galleryItems[0] ?? null;
  const specs = data?.specifications;
  const dimensionLabel = data ? buildDimensionsLabel(data) : '';

  const genericSpecificationRows =
    specs?.items
      ?.map((item) => ({
        label: item.name,
        value: item.value,
      }))
      .filter((row) => row.label.trim().length > 0 && row.value.trim().length > 0) ?? [];

  const specificationRows =
    genericSpecificationRows.length > 0
      ? genericSpecificationRows
      : [
          { label: t('Mã sản phẩm'), value: specs?.product_code || '' },
          { label: t('Chất liệu'), value: specs?.material || '' },
          { label: t('Kích thước (L x D x H)'), value: dimensionLabel },
          { label: 'Seat length', value: specs?.seat?.length || '' },
          { label: 'Seat depth', value: specs?.seat?.depth || '' },
          { label: 'Seat height', value: specs?.seat?.height || '' },
        ].filter((row) => row.value && row.value.trim().length > 0);

  const hasExcerpt = Boolean(data?.excerpt?.rendered && stripHtmlTags(data.excerpt.rendered));
  const hasContent = Boolean(data?.content?.rendered && stripHtmlTags(data.content.rendered));

  return (
    <>
      <Seo
        title={data?.title.rendered ?? t('Chi tiết sản phẩm')}
        description={
          data
            ? stripHtmlTags(data.excerpt.rendered)
            : t('Thông tin chi tiết sản phẩm ANSLIFE')
        }
        image={image ?? undefined}
      />
      <section className="page-hero">
        <p className="kicker">{t('CHI TIẾT SẢN PHẨM')}</p>
        <h1>{data?.title.rendered ?? t('Chi tiết sản phẩm')}</h1>
      </section>

      {loading && <LoadingBlock />}
      {error && <ErrorBlock message={error} />}

      {!loading && !error && !data && (
        <ErrorBlock message={t('Không tìm thấy sản phẩm trong hệ thống dữ liệu.')} />
      )}

      {!loading && !error && data && !categoryMatched && (
        <ErrorBlock message={t('Sản phẩm tồn tại nhưng không thuộc nhóm URL hiện tại.')} />
      )}

      {data && categoryMatched && (
        <section className="detail-layout product-detail-layout">
          <div className="product-media">
            {activeImage ? (
              <img
                src={activeImage.src}
                alt={activeImage.alt || decodeHtml(data.title.rendered)}
                loading="lazy"
                className="product-main-image"
              />
            ) : (
              <div className="product-empty-media">{t('Chưa có ảnh sản phẩm')}</div>
            )}

            {galleryItems.length > 1 && (
              <div className="product-thumb-grid" aria-label="Thư viện ảnh sản phẩm">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`product-thumb-button ${
                      index === activeImageIndex ? 'active' : ''
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Xem ảnh ${index + 1}`}
                  >
                    <img src={item.thumbnail || item.src} alt={item.alt || ''} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-content">
            <p className="detail-meta">
              {t('Danh mục')}:{' '}
              {productCategories
                .map((term) => term.name)
                .join(', ') || t('Chưa gán')}
            </p>

            {(finishOptions.length > 0 || seatOptions.length > 0) && (
              <div className="product-options-grid">
                {finishOptions.length > 0 && (
                  <article className="product-option-card">
                    <h3>{t('Tùy chọn hoàn thiện')}</h3>
                    <ul>
                      {finishOptions.map((option) => (
                        <li key={option.id}>{option.name}</li>
                      ))}
                    </ul>
                  </article>
                )}

                {seatOptions.length > 0 && (
                  <article className="product-option-card">
                    <h3>{t('Tùy chọn mặt ngồi')}</h3>
                    <ul>
                      {seatOptions.map((option) => (
                        <li key={option.id}>{option.name}</li>
                      ))}
                    </ul>
                  </article>
                )}
              </div>
            )}

            {specificationRows.length > 0 && (
              <section className="product-spec-card">
                <h3>{t('Thông số kỹ thuật')}</h3>
                <div className="product-spec-table">
                  {specificationRows.map((row) => (
                    <div key={row.label} className="product-spec-row">
                      <span>{row.label}</span>
                      <strong>{row.value}</strong>
                    </div>
                  ))}
                </div>
                {specs?.note && <p className="product-spec-note">{specs.note}</p>}
              </section>
            )}

            {hasExcerpt && (
              <section className="product-richtext-card">
                <h3>{t('Mô tả nhanh')}</h3>
                <HtmlContent html={data.excerpt.rendered} className="html-content" />
              </section>
            )}

            {hasContent && (
              <section className="product-richtext-card">
                <h3>{t('Mô tả chi tiết')}</h3>
                <HtmlContent html={data.content.rendered} className="html-content" />
              </section>
            )}

            <div className="product-action-row">
              <Link
                to={toLocalizedPath(
                  `/contact/quote-request?product=${encodeURIComponent(data.slug)}`,
                )}
                className="button-solid"
              >
                {t('Gửi yêu cầu báo giá')}
              </Link>
            </div>
          </div>
        </section>
      )}

      <Link to={toLocalizedPath('/products')} className="inline-link back-link">
        {t('Quay lại danh mục sản phẩm')}
      </Link>
    </>
  );
}
