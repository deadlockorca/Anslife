import type { FormEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getAIFallbackPageHtml } from '../content/aiGeneratedContent';
import ErrorBlock from '../components/common/ErrorBlock';
import HtmlContent from '../components/common/HtmlContent';
import LoadingBlock from '../components/common/LoadingBlock';
import Seo from '../components/seo/Seo';
import { useAsyncResource } from '../hooks/useAsyncResource';
import useSiteI18n from '../hooks/useSiteI18n';
import { decodeHtml } from '../lib/content';
import { getPageBySlug, getProducts, submitContactForm } from '../lib/wp';

const quoteFormId = Number(process.env.NEXT_PUBLIC_CF7_QUOTE_FORM_ID ?? 1);
const meetingFormId = Number(process.env.NEXT_PUBLIC_CF7_MEETING_FORM_ID ?? 2);
const contactSections = ['company-info', 'quote-request', 'schedule-meeting', 'map'] as const;

const contactMapLocations = [
  {
    id: 'hq',
    name: 'Trụ sở chính',
    address:
      'Tầng 5, Tòa nhà Zen Tower, Số 12 đường Khuất Duy Tiến, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội.',
    note: 'Điểm điều phối thương mại và vận hành trung tâm của ANSLIFE.',
    mapQuery: 'Zen Tower 12 Khuat Duy Tien Thanh Xuan Trung Ha Noi',
  },
  {
    id: 'hcm',
    name: 'Văn phòng TP.HCM',
    address:
      'Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh.',
    note: 'Phù hợp cho lịch hẹn trao đổi dự án và xác nhận mẫu.',
    mapQuery: 'So 15 Duong D2 Khu dan cu Hiep Phat Phuong Phu Loi Thanh pho Ho Chi Minh',
  },
  {
    id: 'factory',
    name: 'Nhà máy Đồng Nai',
    address: 'Số 609, Tổ 3, Khu phố 1, Phường Long Bình, Tỉnh Đồng Nai, Việt Nam.',
    note: 'Tham quan nhà máy theo lịch đăng ký trước với đội ngũ ANSLIFE.',
    mapQuery: 'So 609 To 3 Khu pho 1 Phuong Long Binh Dong Nai Viet Nam',
  },
] as const;

type ContactSection = (typeof contactSections)[number];
interface QuoteProductOption {
  slug: string;
  title: string;
}

type SubmissionState =
  | { status: 'idle'; message: '' }
  | { status: 'loading'; message: string }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

const idleState: SubmissionState = { status: 'idle', message: '' };

function normalizeInputValue(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function parseListQueryParam(value: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ContactPage() {
  const { t } = useSiteI18n();
  const { section: sectionParam } = useParams();
  const [searchParams] = useSearchParams();
  const loadContactPage = useCallback(() => getPageBySlug('contact'), []);
  const loadQuoteProducts = useCallback(() => getProducts(100), []);
  const { data, loading, error } = useAsyncResource(loadContactPage);
  const {
    data: quoteProductsData,
    loading: quoteProductsLoading,
    error: quoteProductsError,
  } = useAsyncResource(loadQuoteProducts);
  const fallbackContactHtml = getAIFallbackPageHtml('contact');
  const resolvedHtml = data?.content.rendered ?? fallbackContactHtml;
  const shouldShowError = Boolean(error) && !resolvedHtml;
  const activeSection: ContactSection | 'all' = contactSections.includes(
    sectionParam as ContactSection,
  )
    ? (sectionParam as ContactSection)
    : 'all';
  const showCompanyInfo = activeSection === 'all' || activeSection === 'company-info';
  const showQuoteForm = activeSection === 'all' || activeSection === 'quote-request';
  const showMeetingForm = activeSection === 'all' || activeSection === 'schedule-meeting';
  const showMapSection = activeSection === 'map';

  const [quoteState, setQuoteState] = useState<SubmissionState>(idleState);
  const [meetingState, setMeetingState] = useState<SubmissionState>(idleState);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productInput, setProductInput] = useState('');
  const [isProductInputFocused, setIsProductInputFocused] = useState(false);

  const productOptions = useMemo<QuoteProductOption[]>(() => {
    const products = quoteProductsData ?? [];
    const seenTitles = new Set<string>();

    return products
      .map((product) => ({
        slug: product.slug,
        title: normalizeInputValue(decodeHtml(product.title.rendered)),
      }))
      .filter((item) => item.title.length > 0)
      .filter((item) => {
        const key = item.title.toLowerCase();
        if (seenTitles.has(key)) {
          return false;
        }

        seenTitles.add(key);
        return true;
      })
      .sort((left, right) => left.title.localeCompare(right.title, 'vi'));
  }, [quoteProductsData]);

  const prefilledProductCandidates = useMemo(() => {
    const fromProduct = parseListQueryParam(searchParams.get('product'));
    const fromProducts = parseListQueryParam(searchParams.get('products'));
    return Array.from(new Set([...fromProduct, ...fromProducts]));
  }, [searchParams]);

  useEffect(() => {
    if (selectedProducts.length > 0 || prefilledProductCandidates.length === 0) {
      return;
    }

    if (quoteProductsLoading) {
      return;
    }

    const bySlug = new Map(
      productOptions.map((option) => [option.slug.toLowerCase(), option.title]),
    );
    const byTitle = new Map(
      productOptions.map((option) => [option.title.toLowerCase(), option.title]),
    );

    const prefilledProducts = prefilledProductCandidates
      .map((candidate) => normalizeInputValue(candidate))
      .filter((candidate) => candidate.length > 0)
      .map(
        (candidate) =>
          bySlug.get(candidate.toLowerCase()) ??
          byTitle.get(candidate.toLowerCase()) ??
          candidate,
      )
      .filter(
        (item, index, list) =>
          list.findIndex((entry) => entry.toLowerCase() === item.toLowerCase()) ===
          index,
      );

    if (prefilledProducts.length > 0) {
      setSelectedProducts(prefilledProducts);
    }
  }, [
    prefilledProductCandidates,
    productOptions,
    quoteProductsLoading,
    selectedProducts.length,
  ]);

  const productInterestPayload = useMemo(() => {
    if (selectedProducts.length > 0) {
      return selectedProducts.join(', ');
    }

    return normalizeInputValue(productInput);
  }, [productInput, selectedProducts]);

  const filteredProductSuggestions = useMemo(() => {
    const keyword = normalizeInputValue(productInput).toLowerCase();
    const selectedSet = new Set(selectedProducts.map((item) => item.toLowerCase()));
    if (keyword.length === 0) {
      return [];
    }

    return productOptions
      .filter((option) => !selectedSet.has(option.title.toLowerCase()))
      .filter((option) => option.title.toLowerCase().includes(keyword))
      .slice(0, 16);
  }, [productInput, productOptions, selectedProducts]);

  const addProductChoice = useCallback(
    (rawValue: string) => {
      const normalized = normalizeInputValue(rawValue);
      if (!normalized) {
        return;
      }

      const matchedOption = productOptions.find(
        (option) =>
          option.title.toLowerCase() === normalized.toLowerCase() ||
          option.slug.toLowerCase() === normalized.toLowerCase(),
      );

      const finalTitle = matchedOption?.title ?? normalized;

      setSelectedProducts((previous) => {
        if (
          previous.some((item) => item.toLowerCase() === finalTitle.toLowerCase())
        ) {
          return previous;
        }

        return [...previous, finalTitle];
      });
      setProductInput('');
    },
    [productOptions],
  );

  const removeProductChoice = useCallback((productTitle: string) => {
    setSelectedProducts((previous) =>
      previous.filter((item) => item !== productTitle),
    );
  }, []);

  async function submitByFormId(
    formId: number,
    event: FormEvent<HTMLFormElement>,
    setState: (state: SubmissionState) => void,
    onSuccess?: () => void,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    );

    setState({ status: 'loading', message: t('Đang gửi dữ liệu...') });

    try {
      const response = await submitContactForm(formId, payload);
      if (response.status === 'mail_sent') {
        setState({ status: 'success', message: response.message });
        form.reset();
        onSuccess?.();
        return;
      }

      setState({ status: 'error', message: response.message });
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : t('Không gửi được form. Vui lòng thử lại.');

      setState({ status: 'error', message });
    }
  }

  return (
    <>
      <Seo
        title={t('Liên hệ')}
        description={t('Thông tin công ty ANSLIFE, form báo giá và đặt lịch làm việc.')}
      />

      {showCompanyInfo && loading && <LoadingBlock />}
      {showCompanyInfo && shouldShowError && <ErrorBlock message={error as string} />}
      {showCompanyInfo && resolvedHtml && (
        <section id="thong-tin-cong-ty">
          <HtmlContent html={resolvedHtml} className="html-content html-panel" />
        </section>
      )}

      {showMapSection && (
        <section id="ban-do" className="contact-map-section">
          <article className="form-card contact-map-overview">
            <h2>{t('Bản đồ ANSLIFE')}</h2>
            <p>
              {t(
                'Trang này tập trung vào điều hướng vị trí. Bạn có thể mở trực tiếp từng địa điểm trên Google Maps để lấy chỉ đường nhanh.',
              )}
            </p>
          </article>

          <div className="contact-map-frame">
            <iframe
              title={t('Bản đồ trụ sở ANSLIFE')}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                'Zen Tower 12 Khuat Duy Tien Thanh Xuan Trung Ha Noi',
              )}&output=embed`}
            />
          </div>

          <div className="contact-map-points">
            {contactMapLocations.map((location) => (
              <article key={location.id} className="ai-highlight-card contact-map-point">
                <h3>{t(location.name)}</h3>
                <p>{t(location.address)}</p>
                <p>{t(location.note)}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    location.mapQuery,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-link"
                >
                  {t('Mở trên Google Maps')}
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

      {(showQuoteForm || showMeetingForm) && (
        <section className={`form-grid ${showQuoteForm && showMeetingForm ? '' : 'single-col'}`}>
          {showQuoteForm && (
            <article className="form-card" id="gui-yeu-cau-bao-gia">
              <h2>{t('Gửi yêu cầu báo giá')}</h2>
              <form
                onSubmit={(event) =>
                  submitByFormId(quoteFormId, event, setQuoteState, () => {
                    setSelectedProducts([]);
                    setProductInput('');
                  })
                }
              >
                <label>
                  {t('Họ tên')}
                  <input name="your-name" required />
                </label>
                <label>
                  {t('Email')}
                  <input type="email" name="your-email" required />
                </label>
                <label>
                  {t('Công ty')}
                  <input name="your-company" required />
                </label>
                <div className="product-interest-field">
                  <label htmlFor="product-interest-input">{t('Sản phẩm quan tâm')}</label>
                  <div className="product-interest-inline">
                    <div className="product-interest-autocomplete">
                      <input
                        id="product-interest-input"
                        value={productInput}
                        placeholder={t('Nhập tên sản phẩm rồi bấm Thêm')}
                        onFocus={() => setIsProductInputFocused(true)}
                        onBlur={() => {
                          window.setTimeout(() => setIsProductInputFocused(false), 120);
                        }}
                        onChange={(event) => setProductInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ',') {
                            event.preventDefault();
                            addProductChoice(productInput);
                          }
                        }}
                      />
                      {isProductInputFocused && filteredProductSuggestions.length > 0 && (
                        <div className="product-interest-suggestions" role="listbox">
                          {filteredProductSuggestions.map((option) => (
                            <button
                              key={option.slug}
                              type="button"
                              className="product-interest-suggestion-item"
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => addProductChoice(option.title)}
                            >
                              {option.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      className="button-ghost form-inline-button"
                      onClick={() => addProductChoice(productInput)}
                    >
                      {t('Thêm')}
                    </button>
                  </div>
                  <input type="hidden" name="product-interest" value={productInterestPayload} />
                  {selectedProducts.length > 0 && (
                    <div className="product-interest-chip-list">
                      {selectedProducts.map((item) => (
                        <span key={item} className="product-interest-chip">
                          {item}
                          <button
                            type="button"
                            onClick={() => removeProductChoice(item)}
                            aria-label={`${t('Xóa')} ${item}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="form-helper-text">
                    {quoteProductsLoading
                        ? t('Đang tải danh sách sản phẩm...')
                      : quoteProductsError
                        ? t(
                            'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.',
                          )
                        : productOptions.length === 0
                          ? t('Chưa có sản phẩm trong hệ thống để gợi ý.')
                      : t(
                          'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.',
                        )}
                  </p>
                </div>
                <label>
                  {t('Nội dung')}
                  <textarea name="your-message" rows={4} required />
                </label>
                <button
                  type="submit"
                  className="button-solid"
                  disabled={quoteState.status === 'loading'}
                >
                  {quoteState.status === 'loading' ? t('Đang gửi...') : t('Gửi báo giá')}
                </button>
                {quoteState.status !== 'idle' && (
                  <p className={quoteState.status === 'success' ? 'success-text' : 'error-text'}>
                    {quoteState.message}
                  </p>
                )}
              </form>
            </article>
          )}

          {showMeetingForm && (
            <article className="form-card" id="dat-lich-lam-viec">
              <h2>{t('Đặt lịch làm việc')}</h2>
              <form
                onSubmit={(event) => submitByFormId(meetingFormId, event, setMeetingState)}
              >
                <label>
                  {t('Họ tên')}
                  <input name="your-name" required />
                </label>
                <label>
                  {t('Email')}
                  <input type="email" name="your-email" required />
                </label>
                <label>
                  {t('Số điện thoại')}
                  <input name="your-phone" required />
                </label>
                <label>
                  {t('Ngày mong muốn')}
                  <input type="date" name="meeting-date" required />
                </label>
                <label>
                  {t('Nội dung')}
                  <textarea name="your-message" rows={4} required />
                </label>
                <button
                  type="submit"
                  className="button-solid"
                  disabled={meetingState.status === 'loading'}
                >
                  {meetingState.status === 'loading' ? t('Đang gửi...') : t('Đặt lịch')}
                </button>
                {meetingState.status !== 'idle' && (
                  <p className={meetingState.status === 'success' ? 'success-text' : 'error-text'}>
                    {meetingState.message}
                  </p>
                )}
              </form>
            </article>
          )}
        </section>
      )}
    </>
  );
}
