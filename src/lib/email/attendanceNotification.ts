import nodemailer from 'nodemailer';
import type { AuthActor } from '../auth/actor';
import type { AttendanceLogRecord } from '../repositories/attendanceRepository';
import type { AttendanceWorkPhotoRecord } from '../repositories/attendanceWorkPhotoRepository';

type AttendanceNotificationAction = 'check_in' | 'check_out' | 'work_photos';

interface AttendanceNotificationInput {
  actor: AuthActor;
  action: AttendanceNotificationAction;
  attendanceDate: string;
  log?: AttendanceLogRecord;
  photos?: AttendanceWorkPhotoRecord[];
  ipAddress?: string | null;
  userAgent?: string | null;
  origin?: string;
  folderId?: string | null;
}

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

function formatDate(value: string): string {
  const parsed = new Date(`${value}T00:00:00+07:00`);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    dateStyle: 'full',
  }).format(parsed);
}

function formatDateTime(value: string | null | undefined): string {
  if (!value) {
    return 'Chưa có';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(parsed);
}

function getActionLabel(action: AttendanceNotificationAction): string {
  if (action === 'check_in') {
    return 'Check-in';
  }
  if (action === 'check_out') {
    return 'Check-out - Upload ảnh công việc';
  }
  return 'Upload ảnh công việc';
}

function getLocationText(log: AttendanceLogRecord | undefined, action: AttendanceNotificationAction) {
  if (!log) {
    return 'Chưa có';
  }

  const location = getActionLocation(log, action);
  if (!location) {
    return 'Chưa có';
  }

  return `${location.latitude}, ${location.longitude}`;
}

function getActionLocation(log: AttendanceLogRecord | undefined, action: AttendanceNotificationAction) {
  if (!log) {
    return null;
  }

  const latitude = action === 'check_out' ? log.checkOutLat : log.checkInLat;
  const longitude = action === 'check_out' ? log.checkOutLng : log.checkInLng;
  if (latitude == null || longitude == null) {
    return null;
  }

  return { latitude, longitude };
}

function getPhotoUrl(log: AttendanceLogRecord | undefined, action: AttendanceNotificationAction) {
  if (!log) {
    return null;
  }

  return action === 'check_out' ? log.checkOutPhotoUrl : log.checkInPhotoUrl;
}

function buildAbsoluteUrl(origin: string | undefined, pathOrUrl: string | null): string | null {
  const value = pathOrUrl?.trim();
  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedOrigin = getPublicOrigin(origin);
  if (!normalizedOrigin) {
    return value;
  }

  return `${normalizedOrigin}/${value.replace(/^\/+/, '')}`;
}

function getPublicOrigin(origin: string | undefined): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const publicSiteUrl = configuredSiteUrl || origin || '';
  if (!publicSiteUrl) {
    return '';
  }

  try {
    return new URL(publicSiteUrl).origin;
  } catch {
    return publicSiteUrl.replace(/\/$/, '').replace(/\/[a-z]{2}(?:-[A-Z]{2})?$/, '');
  }
}

function buildPortalUrl(origin: string | undefined, folderId?: string | null): string {
  const normalizedOrigin = getPublicOrigin(origin);
  const baseUrl = normalizedOrigin
    ? `${normalizedOrigin}/vn/admin/report-data`
    : '/vn/admin/report-data';
  if (!folderId?.trim()) {
    return baseUrl;
  }

  const params = new URLSearchParams();
  params.set('folder_id', folderId.trim());
  return `${baseUrl}?${params.toString()}`;
}

function buildGoogleMapsUrl(log: AttendanceLogRecord | undefined, action: AttendanceNotificationAction) {
  const location = getActionLocation(log, action);
  if (!location) {
    return null;
  }

  const coordinates = `${location.latitude},${location.longitude}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(coordinates)}`;
}

function buildPlainText(input: AttendanceNotificationInput): string {
  const actionLabel = getActionLabel(input.action);
  const lines = [
    `[ANSLIFE] ${actionLabel} báo cáo công việc`,
    '',
    `Nhân sự: ${input.actor.fullName}`,
    `Email: ${input.actor.email}`,
    `Ngày báo cáo: ${formatDate(input.attendanceDate)}`,
    `Hành động: ${actionLabel}`,
  ];

  if (input.log) {
    lines.push(
      `Giờ check-in: ${formatDateTime(input.log.checkInAt)}`,
      `Giờ check-out: ${formatDateTime(input.log.checkOutAt)}`,
      `Vị trí GPS: ${getLocationText(input.log, input.action)}`,
    );
    const mapsUrl = buildGoogleMapsUrl(input.log, input.action);
    if (mapsUrl) {
      lines.push(`Google Map: ${mapsUrl}`);
    }

    const photoUrl = getPhotoUrl(input.log, input.action);
    const absolutePhotoUrl = buildAbsoluteUrl(input.origin, photoUrl);
    if (absolutePhotoUrl) {
      lines.push(`Ảnh ${actionLabel}: ${absolutePhotoUrl}`);
    }
  }

  if (input.photos?.length) {
    lines.push('', `Ảnh công việc: ${input.photos.length} file`);
    input.photos.forEach((photo, index) => {
      lines.push(
        `${index + 1}. ${photo.originalFileName ?? photo.fileName}${
          photo.driveWebViewLink ? ` - ${photo.driveWebViewLink}` : ''
        }`,
      );
    });
  }

  lines.push(
    '',
    `IP: ${input.ipAddress ?? 'Chưa có'}`,
    `Thiết bị: ${input.userAgent ?? 'Chưa có'}`,
    `Xem trong hệ thống: ${buildPortalUrl(input.origin, input.folderId)}`,
  );

  return lines.join('\n');
}

function buildHtml(input: AttendanceNotificationInput): string {
  const actionLabel = getActionLabel(input.action);
  const photoUrl = buildAbsoluteUrl(input.origin, getPhotoUrl(input.log, input.action));
  const detailUrl = buildPortalUrl(input.origin, input.folderId);
  const mapsUrl = buildGoogleMapsUrl(input.log, input.action);
  const summaryRows = [
    ['Nhân sự', input.actor.fullName],
    ['Email', input.actor.email],
    ['Ngày báo cáo', formatDate(input.attendanceDate)],
    ['Hành động', actionLabel],
    ['Check-in', formatDateTime(input.log?.checkInAt)],
    ['Check-out', formatDateTime(input.log?.checkOutAt)],
    ['GPS', getLocationText(input.log, input.action)],
    ['IP', input.ipAddress ?? 'Chưa có'],
    ['Thiết bị', input.userAgent ?? 'Chưa có'],
  ];
  const summaryHtml = summaryRows
    .map(
      ([label, value]) => `
        <div style="margin:0 0 6px;">
          <span style="color:#6d737c;font-weight:700;">${escapeHtml(label)}:</span>
          <span>${escapeHtml(value)}</span>
        </div>`,
    )
    .join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#20242a;line-height:1.5;">
      <h2 style="margin:0 0 8px;">${escapeHtml(actionLabel)} báo cáo công việc</h2>
      <p style="margin:0 0 18px;color:#5b616b;">
        ${escapeHtml(input.actor.fullName)} · ${escapeHtml(input.actor.email)}
      </p>
      <div style="max-width:760px;margin:0 0 18px;padding:14px 16px;border:1px solid #eadfd2;background:#fff8f0;border-radius:10px;">
        <div style="font-weight:700;margin:0 0 10px;color:#20242a;">Tóm tắt</div>
        ${summaryHtml}
        <div style="margin:0 0 6px;">
          <span style="color:#6d737c;font-weight:700;">Ảnh check:</span>
          <span>${
            photoUrl
              ? `<a href="${escapeHtml(photoUrl)}">Mở ảnh ${escapeHtml(actionLabel)}</a>`
              : 'Chưa có'
          }</span>
        </div>
        <div style="margin-top:16px;">
          ${
            mapsUrl
              ? `<a href="${escapeHtml(mapsUrl)}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 16px;border-radius:8px;background:#1f7a4d;color:#ffffff;text-decoration:none;font-weight:700;">
                  Xem trên Google Map
                </a>`
              : ''
          }
          <a href="${escapeHtml(detailUrl)}" style="display:inline-block;padding:10px 16px;border-radius:8px;background:#2f4d73;color:#ffffff;text-decoration:none;font-weight:700;">
            Xem chi tiết trên hệ thống
          </a>
        </div>
      </div>
    </div>`;
}

export async function sendAttendanceNotificationEmail(
  input: AttendanceNotificationInput,
): Promise<void> {
  const smtpHost = getRequiredEnv('SMTP_HOST');
  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const smtpUser = getRequiredEnv('SMTP_USER');
  const smtpPass = getRequiredEnv('SMTP_PASS');
  const secure = (process.env.SMTP_SECURE ?? 'true').toLowerCase() === 'true';
  const to = getRequiredEnv('CONTACT_NOTIFICATION_TO');
  const from = process.env.CONTACT_NOTIFICATION_FROM?.trim() || smtpUser;

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
    replyTo: input.actor.email,
    subject: `[ANSLIFE] ${getActionLabel(input.action)} - ${input.actor.fullName} - ${input.attendanceDate}`,
    text: buildPlainText(input),
    html: buildHtml(input),
  });
}
