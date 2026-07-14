import nodemailer from 'nodemailer';

type ContactPayload = Record<string, string>;

const FIELD_LABELS: Record<string, string> = {
  'your-name': 'Họ và tên',
  'your-email': 'Email',
  'your-phone': 'Số điện thoại',
  'your-company': 'Công ty / Tổ chức',
  'country-region': 'Quốc gia / Vùng lãnh thổ',
  'province-city': 'Tỉnh / Thành phố',
  'request-category': 'Loại yêu cầu',
  'your-message': 'Nội dung liên hệ',
  'factory-introduction': 'Giới thiệu nhà máy',
  'community-introduction': 'Giới thiệu chương trình phụng sự',
  'inquiry-type': 'Loại form',
  'privacy-consent': 'Đồng ý chính sách',
  'product-interest': 'Sản phẩm / dịch vụ quan tâm',
  'reference-link': 'Link tham chiếu',
  'career-group': 'Nhóm nghề',
  'career-market': 'Khu vực / bộ phận',
  'career-position': 'Vị trí ứng tuyển',
  'career-status': 'Trạng thái vị trí',
  'cv-link': 'Link CV / Portfolio',
  'latest-experience': 'Kinh nghiệm gần nhất',
};

const REQUEST_CATEGORY_LABELS: Record<string, string> = {
  purchase_request: 'Yêu cầu mua hàng / sản xuất',
  rnd_request: 'Yêu cầu R&D / phát triển mẫu',
  oem_odm_request: 'Yêu cầu OEM / ODM',
  component_request: 'Yêu cầu cấu kiện nội thất',
  finishing_request: 'Yêu cầu hoàn thiện bề mặt',
  qc_request: 'Yêu cầu QC / kiểm soát chất lượng',
  supply_hub_request: 'Yêu cầu Supply Hub',
  trade_finance_request: 'Yêu cầu tài trợ thương mại',
  scholarship_sponsorship_request: 'Yêu cầu tài trợ học bổng',
  community_program_request:
    'Yêu cầu đề nghị tham gia các chương trình cộng đồng, phụng sự xã hội',
  logistics_documentation_request: 'Yêu cầu logistics / chứng từ',
  factory_trade_finance: 'Đăng kí tài trợ thương mại',
  factory_rnd_product: 'R&D sản phẩm',
  factory_project_management: 'Hợp tác quản lý dự án',
  factory_logistics: 'Logistics / chứng từ xuất khẩu',
  factory_oem_odm: 'Gia công OEM / ODM',
  factory_qc_standard: 'QC / tiêu chuẩn chất lượng',
  factory_surface_finishing: 'Hoàn thiện bề mặt',
  factory_supply_hub: 'Tham gia hệ thống Supply Hub',
  community_scholarship: 'Học bổng',
  community_disaster_relief: 'Cứu trợ thiên tai',
  community_education_support: 'Hỗ trợ giáo dục',
  community_livelihood_support: 'Hỗ trợ sinh kế',
  community_local_program: 'Chương trình cộng đồng địa phương',
  community_environment: 'Hoạt động môi trường',
  community_health_wellbeing: 'Y tế / chăm sóc sức khỏe',
  community_sponsorship_partnership: 'Tài trợ / đồng hành chương trình',
  community_other: 'Đề xuất phụng sự xã hội khác',
  recruitment_application: 'Ứng tuyển tuyển dụng',
};

const FIELD_ORDER = [
  'your-name',
  'your-email',
  'your-phone',
  'your-company',
  'country-region',
  'province-city',
  'request-category',
  'career-position',
  'career-group',
  'career-market',
  'career-status',
  'cv-link',
  'latest-experience',
  'product-interest',
  'reference-link',
  'your-message',
  'factory-introduction',
  'community-introduction',
  'inquiry-type',
  'privacy-consent',
];

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeRequestCategoryValue(value: string): string {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => REQUEST_CATEGORY_LABELS[item] ?? item)
    .join(', ');
}

function normalizeFieldValue(key: string, value: string): string {
  if (key === 'request-category') {
    return normalizeRequestCategoryValue(value);
  }

  if (key === 'privacy-consent') {
    return value === 'on' || value === 'true' ? 'Có' : value;
  }

  return value;
}

function getOrderedPayloadEntries(payload: ContactPayload): Array<[string, string]> {
  const seen = new Set<string>();
  const orderedEntries: Array<[string, string]> = [];

  for (const key of FIELD_ORDER) {
    const value = payload[key]?.trim();
    if (!value) {
      continue;
    }

    seen.add(key);
    orderedEntries.push([key, normalizeFieldValue(key, value)]);
  }

  for (const [key, rawValue] of Object.entries(payload)) {
    if (seen.has(key)) {
      continue;
    }

    const value = rawValue.trim();
    if (!value) {
      continue;
    }

    orderedEntries.push([key, normalizeFieldValue(key, value)]);
  }

  return orderedEntries;
}

function getContactSummary(payload: ContactPayload) {
  const senderName = payload['your-name']?.trim() || 'Khách hàng';
  const senderEmail = payload['your-email']?.trim() || 'Chưa có email';
  const senderPhone = payload['your-phone']?.trim() || 'Chưa có số điện thoại';
  const company = payload['your-company']?.trim() || 'Chưa có công ty';
  const market = payload['country-region']?.trim() || 'Chưa chọn thị trường';
  const requestType =
    normalizeRequestCategoryValue(payload['request-category'] ?? '') || 'Yêu cầu liên hệ';

  return {
    senderName,
    senderEmail,
    senderPhone,
    company,
    market,
    requestType,
  };
}

function buildPlainText(payload: ContactPayload): string {
  const summary = getContactSummary(payload);
  const lines = getOrderedPayloadEntries(payload).map(([key, value]) => {
    const label = FIELD_LABELS[key] ?? key;
    return `${label}: ${value}`;
  });

  return [
    `Có yêu cầu mới từ ${summary.senderName} <${summary.senderEmail}>.`,
    `Loại yêu cầu: ${summary.requestType}`,
    `Công ty / Tổ chức: ${summary.company}`,
    `Thị trường: ${summary.market}`,
    `Số điện thoại: ${summary.senderPhone}`,
    '',
    'Chi tiết biểu mẫu:',
    ...lines,
  ].join('\n');
}

function buildHtml(payload: ContactPayload): string {
  const summary = getContactSummary(payload);
  const rows = getOrderedPayloadEntries(payload)
    .map(([key, value]) => {
      const label = FIELD_LABELS[key] ?? key;
      return `
        <tr>
          <th style="padding:10px 12px;text-align:left;border-bottom:1px solid #eee;background:#faf7f1;width:220px;">${escapeHtml(label)}</th>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`;
    })
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#20242a;line-height:1.5;">
      <h2 style="margin:0 0 8px;">Yêu cầu mới từ ${escapeHtml(summary.senderName)}</h2>
      <p style="margin:0 0 18px;color:#5b616b;">
        ${escapeHtml(summary.senderEmail)} · ${escapeHtml(summary.requestType)}
      </p>
      <div style="max-width:760px;margin:0 0 18px;padding:14px 16px;border:1px solid #eadfd2;background:#fff8f0;border-radius:10px;">
        <div style="font-weight:700;margin:0 0 10px;color:#20242a;">Tóm tắt nhanh</div>
        <div style="display:grid;grid-template-columns:160px 1fr;gap:6px 14px;">
          <div style="color:#6d737c;">Người gửi</div>
          <div style="font-weight:700;">${escapeHtml(summary.senderName)}</div>
          <div style="color:#6d737c;">Email</div>
          <div>${escapeHtml(summary.senderEmail)}</div>
          <div style="color:#6d737c;">Số điện thoại</div>
          <div>${escapeHtml(summary.senderPhone)}</div>
          <div style="color:#6d737c;">Công ty / Tổ chức</div>
          <div>${escapeHtml(summary.company)}</div>
          <div style="color:#6d737c;">Thị trường</div>
          <div>${escapeHtml(summary.market)}</div>
          <div style="color:#6d737c;">Loại yêu cầu</div>
          <div style="font-weight:700;">${escapeHtml(summary.requestType)}</div>
        </div>
      </div>
      <table style="border-collapse:collapse;width:100%;max-width:760px;border:1px solid #eee;">
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

export async function sendContactNotificationEmail(payload: ContactPayload): Promise<void> {
  const smtpHost = getRequiredEnv('SMTP_HOST');
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const smtpUser = getRequiredEnv('SMTP_USER');
  const smtpPass = getRequiredEnv('SMTP_PASS');
  const secure = (process.env.SMTP_SECURE ?? 'true').toLowerCase() === 'true';
  const to = getRequiredEnv('CONTACT_NOTIFICATION_TO');
  const from = process.env.CONTACT_NOTIFICATION_FROM?.trim() || smtpUser;
  const replyTo = payload['your-email']?.trim() || undefined;
  const summary = getContactSummary(payload);

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from,
    to,
    replyTo,
    subject: `[ANSLIFE] ${summary.senderName} <${summary.senderEmail}> - ${summary.requestType}`,
    text: buildPlainText(payload),
    html: buildHtml(payload),
  });
}
