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
const contactSections = [
  'company-info',
  'quote-request',
  'request-quotation',
  'general-inquiry',
  'upload-drawing',
  'oem-odm-request',
  'supply-hub-inquiry',
  'schedule-meeting',
  'factory-visit-request',
  'map',
] as const;

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

const calendarLocaleByLanguage: Record<string, string> = {
  vn: 'vi-VN',
  en: 'en-US',
  jp: 'ja-JP',
  kr: 'ko-KR',
};

function getCalendarWeekdayLabels(language: string): string[] {
  const locale = calendarLocaleByLanguage[language] ?? 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  // 2024-01-07 is a Sunday; build labels Sun..Sat using local-time dates.
  return Array.from({ length: 7 }, (_, index) =>
    formatter.format(new Date(2024, 0, 7 + index)),
  );
}

type ContactSection = (typeof contactSections)[number];

type QuoteContactSection =
  | 'quote-request'
  | 'request-quotation'
  | 'general-inquiry'
  | 'upload-drawing'
  | 'oem-odm-request'
  | 'supply-hub-inquiry';

interface QuoteFormCopy {
  title: string;
  intro: string;
  productLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  buttonLabel: string;
  inquiryType: string;
  referenceLabel?: string;
  referencePlaceholder?: string;
}

const workRequestTypeOptions = [
  {
    value: 'purchase_request',
    label: 'Yêu cầu mua hàng / sản xuất',
    description: 'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.',
  },
  {
    value: 'rnd_request',
    label: 'Yêu cầu R&D / phát triển mẫu',
    description: 'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.',
  },
  {
    value: 'oem_odm_request',
    label: 'Yêu cầu OEM / ODM',
    description: 'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.',
  },
  {
    value: 'component_request',
    label: 'Yêu cầu cấu kiện nội thất',
    description: 'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.',
  },
  {
    value: 'finishing_request',
    label: 'Yêu cầu hoàn thiện bề mặt',
    description: 'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.',
  },
  {
    value: 'qc_request',
    label: 'Yêu cầu QC / kiểm soát chất lượng',
    description: 'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.',
  },
  {
    value: 'supply_hub_request',
    label: 'Yêu cầu Supply Hub',
    description: 'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.',
  },
  {
    value: 'trade_finance_request',
    label: 'Yêu cầu tài trợ thương mại',
    description: 'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.',
  },
  {
    value: 'logistics_documentation_request',
    label: 'Yêu cầu logistics / chứng từ',
    description: 'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.',
  },
] as const;

const marketOriginOptions = [
  'Nhật Bản',
  'EU',
  'Mỹ',
  'Hàn Quốc',
  'Trung Quốc',
  'Úc',
  'Canada',
] as const;

function isQuoteContactSection(
  section: ContactSection | 'all',
): section is QuoteContactSection {
  return (
    section === 'quote-request' ||
    section === 'request-quotation' ||
    section === 'general-inquiry' ||
    section === 'upload-drawing' ||
    section === 'oem-odm-request' ||
    section === 'supply-hub-inquiry'
  );
}

function isMeetingContactSection(section: ContactSection | 'all'): boolean {
  return section === 'schedule-meeting' || section === 'factory-visit-request';
}

function getQuoteFormCopy(section: ContactSection | 'all'): QuoteFormCopy {
  switch (section) {
    case 'general-inquiry':
      return {
        title: 'Gửi yêu cầu chung',
        intro: 'Gửi thông tin liên hệ và nội dung cần trao đổi với đội ngũ ANSLIFE.',
        productLabel: 'Sản phẩm / nhóm hàng quan tâm',
        messageLabel: 'Nội dung yêu cầu',
        messagePlaceholder: 'Mô tả nhu cầu, thị trường, thời gian cần phản hồi hoặc thông tin cần tư vấn.',
        buttonLabel: 'Gửi yêu cầu',
        inquiryType: 'general_inquiry',
      };
    case 'upload-drawing':
      return {
        title: 'Tải bản vẽ / ảnh tham chiếu',
        intro: 'Gửi link bản vẽ, ảnh tham chiếu hoặc mã sản phẩm để ANSLIFE kiểm tra khả năng phát triển.',
        productLabel: 'Sản phẩm / bản vẽ liên quan',
        messageLabel: 'Thông tin bản vẽ / ảnh tham chiếu',
        messagePlaceholder:
          'Dán link Google Drive, Dropbox, WeTransfer hoặc mô tả file bạn muốn gửi. Nếu cần gửi file trực tiếp, đội ngũ ANSLIFE sẽ phản hồi qua email.',
        buttonLabel: 'Gửi thông tin tham chiếu',
        inquiryType: 'upload_drawing',
        referenceLabel: 'Link bản vẽ / ảnh tham chiếu',
        referencePlaceholder: 'https://drive.google.com/... hoặc link thư mục tham chiếu',
      };
    case 'oem-odm-request':
      return {
        title: 'Gửi yêu cầu OEM / ODM',
        intro: 'Gửi brief sản phẩm, target giá, thị trường và yêu cầu kỹ thuật để bắt đầu trao đổi OEM / ODM.',
        productLabel: 'Sản phẩm / ý tưởng OEM ODM',
        messageLabel: 'Thông tin OEM / ODM',
        messagePlaceholder:
          'Mô tả sản phẩm, vật liệu, kích thước, target giá, số lượng dự kiến, thị trường và timeline.',
        buttonLabel: 'Gửi yêu cầu OEM / ODM',
        inquiryType: 'oem_odm_request',
        referenceLabel: 'Link brief / bản vẽ / ảnh mẫu',
        referencePlaceholder: 'Dán link tài liệu kỹ thuật, hình ảnh mẫu hoặc brief sản phẩm nếu có.',
      };
    case 'supply-hub-inquiry':
      return {
        title: 'Gửi yêu cầu Supply Hub',
        intro: 'Gửi nhu cầu lưu kho, gom hàng, kiểm soát mẫu hoặc điều phối xuất hàng từ Việt Nam.',
        productLabel: 'Nhóm hàng / vật liệu cần điều phối',
        messageLabel: 'Nhu cầu Supply Hub',
        messagePlaceholder:
          'Mô tả nhu cầu lưu kho, tần suất xuất hàng, thị trường nhận hàng, LCL/FCL và yêu cầu chứng từ.',
        buttonLabel: 'Gửi yêu cầu Supply Hub',
        inquiryType: 'supply_hub_inquiry',
      };
    case 'request-quotation':
      return {
        title: 'Gửi yêu cầu làm việc',
        intro:
          'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.',
        productLabel: 'Sản phẩm / nhóm hàng / dịch vụ quan tâm',
        messageLabel: 'Nội dung yêu cầu',
        messagePlaceholder:
          'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.',
        buttonLabel: 'Gửi yêu cầu',
        inquiryType: 'work_request',
      };
    case 'quote-request':
    default:
      return {
        title: 'Gửi yêu cầu báo giá',
        intro: 'Gửi thông tin sản phẩm, số lượng và yêu cầu kỹ thuật để ANSLIFE phản hồi báo giá.',
        productLabel: 'Sản phẩm quan tâm',
        messageLabel: 'Nội dung',
        messagePlaceholder: 'Mô tả yêu cầu báo giá, số lượng dự kiến, tiêu chuẩn đóng gói hoặc thị trường.',
        buttonLabel: 'Gửi báo giá',
        inquiryType: 'request_quotation',
      };
  }
}

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

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function toIsoDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

function formatCalendarMonthLabel(date: Date, language: string): string {
  const locale = calendarLocaleByLanguage[language] ?? 'en-US';
  return new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  })
    .format(date)
    .toUpperCase();
}

export default function ContactPage() {
  const { language, t } = useSiteI18n();
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
  const fallbackContactHtml = getAIFallbackPageHtml('contact', language);
  const resolvedHtml = data?.content.rendered ?? fallbackContactHtml;
  const shouldShowError = Boolean(error) && !resolvedHtml;
  const activeSection: ContactSection | 'all' = contactSections.includes(
    sectionParam as ContactSection,
  )
    ? (sectionParam as ContactSection)
    : 'all';
  const isBlankRequestQuotationPage = activeSection === 'request-quotation';
  const showCompanyInfo = activeSection === 'all' || activeSection === 'company-info';
  const showQuoteForm =
    activeSection === 'all' ||
    (isQuoteContactSection(activeSection) && !isBlankRequestQuotationPage);
  const showMeetingForm = activeSection === 'all' || isMeetingContactSection(activeSection);
  const showMapSection = activeSection === 'map';
  const quoteFormCopy = useMemo(() => getQuoteFormCopy(activeSection), [activeSection]);
  const isWorkRequestForm = activeSection === 'request-quotation';

  const [quoteState, setQuoteState] = useState<SubmissionState>(idleState);
  const [meetingState, setMeetingState] = useState<SubmissionState>(idleState);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productInput, setProductInput] = useState('');
  const [isProductInputFocused, setIsProductInputFocused] = useState(false);
  const [selectedMeetingDate, setSelectedMeetingDate] = useState('');
  const [calendarBaseMonth, setCalendarBaseMonth] = useState(() =>
    startOfMonth(new Date()),
  );

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

  const meetingCalendarMonths = useMemo(
    () => [calendarBaseMonth, addMonths(calendarBaseMonth, 1)],
    [calendarBaseMonth],
  );

  const selectedMeetingDateLabel = useMemo(() => {
    const selectedDate = parseIsoDate(selectedMeetingDate);
    if (!selectedDate) {
      return t('Chưa chọn ngày');
    }

    const locale = calendarLocaleByLanguage[language] ?? 'en-US';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(selectedDate);
  }, [language, selectedMeetingDate, t]);

  const todayIsoDate = useMemo(() => toIsoDateString(new Date()), []);
  const calendarDayLabels = useMemo(
    () => getCalendarWeekdayLabels(language),
    [language],
  );

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

      {isBlankRequestQuotationPage && (
        <section className="contact-request-quotation-page" id="request-quotation">
          <figure className="contact-request-quotation-banner">
            <img
              src="/assets/contact/request-quotation/request-quotation-banner.webp"
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
            />
            <figcaption className="contact-request-quotation-banner-copy">
              <h1>{t('Liên hệ với chúng tôi')}</h1>
              <p>{t('Chúng tôi luôn sẫn sàng lắng nghe và hỗ trợ bạn.')}</p>
              <p>{t('Vui lòng điền thông tin vào biểu mẫu bên dưới.')}</p>
            </figcaption>
          </figure>

          <section className="contact-request-quotation-form-section">
            <form
              className="contact-request-quotation-form"
              onSubmit={(event) => submitByFormId(quoteFormId, event, setQuoteState)}
            >
              <div className="contact-request-quotation-form-column">
                <h2>
                  <span aria-hidden="true">✈</span>
                  {t('Thông tin liên hệ')}
                </h2>

                <label>
                  <span className="contact-request-quotation-label-text">
                    {t('Họ và tên')} <em aria-hidden="true">*</em>
                  </span>
                  <input name="your-name" placeholder={t('Nhập họ và tên')} required />
                </label>

                <label>
                  <span className="contact-request-quotation-label-text">
                    {t('Email')} <em aria-hidden="true">*</em>
                  </span>
                  <input
                    type="email"
                    name="your-email"
                    placeholder={t('Nhập email của bạn')}
                    required
                  />
                </label>

                <label>
                  <span className="contact-request-quotation-label-text">
                    {t('Số điện thoại')} <em aria-hidden="true">*</em>
                  </span>
                  <input name="your-phone" placeholder={t('Nhập số điện thoại')} required />
                </label>

                <label>
                  {t('Công ty / Tổ chức')}
                  <input name="your-company" placeholder={t('Nhập tên công ty hoặc tổ chức')} />
                </label>

                <label>
                  {t('Quốc gia / Vùng lãnh thổ')}
                  <select name="country-region" defaultValue="">
                    <option value="" disabled>
                      {t('Chọn quốc gia / vùng lãnh thổ')}
                    </option>
                    {[
                      'Nhật',
                      'EU',
                      'Mỹ',
                      'Hàn Quốc',
                      'Trung Quốc',
                      'Úc',
                      'Canada',
                      'Việt Nam',
                    ].map((countryRegion) => (
                      <option key={countryRegion} value={countryRegion}>
                        {t(countryRegion)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  <span className="contact-request-quotation-label-text">
                    {t('Nội dung liên hệ')} <em aria-hidden="true">*</em>
                  </span>
                  <textarea
                    name="your-message"
                    rows={7}
                    placeholder={t('Vui lòng mô tả chi tiết yêu cầu của bạn')}
                    required
                  />
                </label>

                <label className="contact-request-quotation-policy">
                  <input name="privacy-consent" type="checkbox" required />
                  <span>
                    {t('Tôi đồng ý để ANSLIFE xử lý thông tin theo')}{' '}
                    <a href="/privacy-policy">{t('Chính sách bảo mật')}.</a>
                  </span>
                </label>

                <input type="hidden" name="inquiry-type" value="work_request" />

                <button
                  type="submit"
                  className="contact-request-quotation-submit"
                  disabled={quoteState.status === 'loading'}
                >
                  <span aria-hidden="true">✈</span>
                  {quoteState.status === 'loading' ? t('Đang gửi...') : t('Gửi yêu cầu')}
                </button>

                {quoteState.status !== 'idle' && (
                  <p
                    className={
                      quoteState.status === 'success'
                        ? 'contact-request-quotation-success'
                        : 'contact-request-quotation-error'
                    }
                  >
                    {quoteState.message}
                  </p>
                )}
              </div>

              <aside className="contact-request-quotation-type-column">
                <h2>
                  <span aria-hidden="true">▤</span>
                  {t('Loại yêu cầu')}
                </h2>

                <fieldset className="contact-request-quotation-type-list">
                  <legend>{t('Loại yêu cầu')}</legend>
                  {workRequestTypeOptions.map((option, index) => (
                    <label key={option.value} className="contact-request-quotation-type-item">
                      <input
                        type="radio"
                        name="request-category"
                        value={option.value}
                        defaultChecked={index === 0}
                        required
                      />
                      <span>{t(option.label)}</span>
                    </label>
                  ))}
                </fieldset>

                <div className="contact-request-quotation-support">
                  <h3>
                    <span aria-hidden="true">🎧</span>
                    {t('Cần hỗ trợ nhanh?')}
                  </h3>
                  <p>{t('Liên hệ trực tiếp với chúng tôi qua:')}</p>
                  <ul>
                    <li>
                      <span aria-hidden="true">☎</span>
                      <a href="tel:+84123456789">(+84) 123 456 789</a>
                    </li>
                    <li>
                      <span aria-hidden="true">✉</span>
                      <a href="mailto:contact@anslife.com">contact@anslife.com</a>
                    </li>
                    <li>
                      <span aria-hidden="true">◷</span>
                      {t('Thứ 2 - Thứ 6: 08:00 - 17:30')}
                    </li>
                  </ul>
                </div>
              </aside>
            </form>
          </section>

          <section className="contact-request-quotation-benefits" aria-label={t('Cam kết hỗ trợ')}>
            {[
              {
                icon: '♢',
                title: 'Bảo mật thông tin',
                text: 'Cam kết bảo mật tuyệt đối thông tin của khách hàng.',
              },
              {
                icon: '◷',
                title: 'Phản hồi nhanh chóng',
                text: 'Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.',
              },
              {
                icon: '♢',
                title: 'Hỗ trợ tận tâm',
                text: 'Đội ngũ chuyên nghiệp sẵn sàng hỗ trợ bạn.',
              },
              {
                icon: '◎',
                title: 'Toàn cầu',
                text: 'Kết nối và phục vụ khách hàng trên toàn thế giới.',
              },
            ].map((item) => (
              <article key={item.title} className="contact-request-quotation-benefit">
                <span aria-hidden="true">{item.icon}</span>
                <div>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.text)}</p>
                </div>
              </article>
            ))}
          </section>
        </section>
      )}

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

      {showQuoteForm && (
        <section className="form-grid single-col">
          <article className="form-card" id="gui-yeu-cau-bao-gia">
            <h2>{t(quoteFormCopy.title)}</h2>
            <p>{t(quoteFormCopy.intro)}</p>
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
              <input type="hidden" name="inquiry-type" value={quoteFormCopy.inquiryType} />
              {isWorkRequestForm && (
                <fieldset className="work-request-type-field">
                  <legend>{t('Loại yêu cầu')}</legend>
                  <select name="request-category" required defaultValue={workRequestTypeOptions[0].value}>
                    {workRequestTypeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(option.label)}
                      </option>
                    ))}
                  </select>
                  <div className="work-request-type-list" aria-label={t('Các loại yêu cầu')}>
                    {workRequestTypeOptions.map((option) => (
                      <article key={option.value} className="work-request-type-item">
                        <strong>{t(option.label)}</strong>
                        <span>{t(option.description)}</span>
                      </article>
                    ))}
                  </div>
                </fieldset>
              )}
              {isWorkRequestForm && (
                <label>
                  {t('Bạn đến từ thị trường nào?')}
                  <select name="market-origin" required defaultValue="">
                    <option value="" disabled>
                      {t('Chọn thị trường')}
                    </option>
                    {marketOriginOptions.map((market) => (
                      <option key={market} value={market}>
                        {t(market)}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {quoteFormCopy.referenceLabel && (
                <label>
                  {t(quoteFormCopy.referenceLabel)}
                  <input
                    name="reference-link"
                    placeholder={t(quoteFormCopy.referencePlaceholder ?? '')}
                  />
                </label>
              )}
              <div className="product-interest-field">
                <label htmlFor="product-interest-input">{t(quoteFormCopy.productLabel)}</label>
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
                {t(quoteFormCopy.messageLabel)}
                <textarea
                  name="your-message"
                  rows={4}
                  placeholder={t(quoteFormCopy.messagePlaceholder)}
                  required
                />
              </label>
              <button
                type="submit"
                className="button-solid"
                disabled={quoteState.status === 'loading'}
              >
                {quoteState.status === 'loading' ? t('Đang gửi...') : t(quoteFormCopy.buttonLabel)}
              </button>
              {quoteState.status !== 'idle' && (
                <p className={quoteState.status === 'success' ? 'success-text' : 'error-text'}>
                  {quoteState.message}
                </p>
              )}
            </form>
          </article>
        </section>
      )}

      {showMeetingForm && (
        <section className="meeting-schedule-layout">
          <article className="meeting-calendar-shell meeting-schedule-calendar" aria-label={t('Chọn ngày làm việc')}>
            <header className="meeting-calendar-header">
              <h3>{t('Chọn ngày của bạn')}</h3>
              <button
                type="button"
                className="meeting-calendar-next"
                onClick={() => setCalendarBaseMonth((current) => addMonths(current, 1))}
                aria-label={t('Tháng tiếp theo')}
              >
                <span aria-hidden="true">→</span>
              </button>
            </header>

            <div className="meeting-calendar-months">
              {meetingCalendarMonths.map((monthDate) => {
                const year = monthDate.getFullYear();
                const month = monthDate.getMonth();
                const firstDayIndex = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const trailingEmptyCells = (7 - ((firstDayIndex + daysInMonth) % 7)) % 7;

                return (
                  <article
                    key={`${year}-${month}`}
                    className="meeting-calendar-month-panel"
                  >
                    <h4>{formatCalendarMonthLabel(monthDate, language)}</h4>

                    <div className="meeting-calendar-weekdays">
                      {calendarDayLabels.map((dayLabel) => (
                        <span key={`${year}-${month}-day-${dayLabel}`}>{dayLabel}</span>
                      ))}
                    </div>

                    <div className="meeting-calendar-days-grid">
                      {Array.from({ length: firstDayIndex }).map((_, index) => (
                        <span
                          key={`${year}-${month}-leading-empty-${index}`}
                          className="meeting-calendar-day-empty"
                          aria-hidden="true"
                        />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, index) => {
                        const dayNumber = index + 1;
                        const dateValue = new Date(year, month, dayNumber);
                        const isoDate = toIsoDateString(dateValue);
                        const isSelected = selectedMeetingDate === isoDate;
                        const isDisabled = isoDate < todayIsoDate;
                        const isToday = isoDate === todayIsoDate;

                        return (
                          <button
                            key={isoDate}
                            type="button"
                            className={`meeting-calendar-day${
                              isSelected ? ' is-selected' : ''
                            }${isToday ? ' is-today' : ''}`}
                            disabled={isDisabled}
                            aria-pressed={isSelected}
                            onClick={() => setSelectedMeetingDate(isoDate)}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}

                      {Array.from({ length: trailingEmptyCells }).map((_, index) => (
                        <span
                          key={`${year}-${month}-trailing-empty-${index}`}
                          className="meeting-calendar-day-empty"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </article>

          <article className="form-card meeting-schedule-form" id="dat-lich-lam-viec">
            <h2>{t('Đặt lịch làm việc')}</h2>
            <form
              onSubmit={(event) =>
                submitByFormId(meetingFormId, event, setMeetingState, () =>
                  setSelectedMeetingDate(''),
                )
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
                {t('Số điện thoại')}
                <input name="your-phone" required />
              </label>
              <input type="hidden" name="meeting-date" value={selectedMeetingDate} />
              <p className="meeting-date-selected-note">
                {t('Ngày đã chọn')}: <strong>{selectedMeetingDateLabel}</strong>
              </p>
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
        </section>
      )}
    </>
  );
}
