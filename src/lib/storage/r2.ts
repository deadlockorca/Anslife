import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';

type R2Config = {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  region: string;
  endpoint: string;
  publicBaseUrl: string;
  maxFileSizeBytes: number;
};

type GlobalWithR2Client = typeof globalThis & {
  __anslifeR2Client?: S3Client;
};

const DEFAULT_MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

function normalizePublicBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, '');
}

function getR2Config(): R2Config {
  const accountId = process.env.R2_ACCOUNT_ID?.trim() ?? '';
  const accessKeyId =
    process.env.R2_ACCESS_KEY_ID?.trim() ?? process.env.AWS_ACCESS_KEY_ID?.trim() ?? '';
  const secretAccessKey =
    process.env.R2_SECRET_ACCESS_KEY?.trim() ?? process.env.AWS_SECRET_ACCESS_KEY?.trim() ?? '';
  const bucket = process.env.R2_BUCKET?.trim() ?? '';
  const region = process.env.R2_REGION?.trim() || 'auto';
  const endpoint =
    process.env.R2_ENDPOINT?.trim() ||
    (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : '');
  const publicBaseUrl = normalizePublicBaseUrl(process.env.R2_PUBLIC_BASE_URL?.trim() ?? '');
  const maxFileSizeBytes = parsePositiveInt(
    process.env.R2_MAX_FILE_SIZE_BYTES,
    DEFAULT_MAX_FILE_SIZE_BYTES,
  );

  const missing: string[] = [];
  if (!accountId && !process.env.R2_ENDPOINT?.trim()) {
    missing.push('R2_ACCOUNT_ID hoặc R2_ENDPOINT');
  }
  if (!accessKeyId) {
    missing.push('R2_ACCESS_KEY_ID');
  }
  if (!secretAccessKey) {
    missing.push('R2_SECRET_ACCESS_KEY');
  }
  if (!bucket) {
    missing.push('R2_BUCKET');
  }
  if (!publicBaseUrl) {
    missing.push('R2_PUBLIC_BASE_URL');
  }

  if (missing.length > 0) {
    throw new Error(`Thiếu biến môi trường R2: ${missing.join(', ')}`);
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucket,
    region,
    endpoint,
    publicBaseUrl,
    maxFileSizeBytes,
  };
}

function getR2Client(): S3Client {
  const globalR2 = globalThis as GlobalWithR2Client;
  const config = getR2Config();

  if (!globalR2.__anslifeR2Client) {
    globalR2.__anslifeR2Client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }

  return globalR2.__anslifeR2Client;
}

function sanitizeFileName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function sanitizeFolder(value: string | null | undefined): string {
  if (!value) {
    return 'uploads';
  }

  const cleaned = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]+/g, '-')
    .replace(/\/+/g, '/')
    .replace(/^\/+|\/+$/g, '');

  return cleaned || 'uploads';
}

function extFromFileName(fileName: string): string {
  const match = fileName.toLowerCase().match(/\.[a-z0-9]+$/);
  return match ? match[0] : '';
}

function extFromMimeType(mimeType: string): string {
  if (mimeType === 'image/jpeg') return '.jpg';
  if (mimeType === 'image/png') return '.png';
  if (mimeType === 'image/webp') return '.webp';
  if (mimeType === 'image/gif') return '.gif';
  if (mimeType === 'image/avif') return '.avif';
  if (mimeType === 'image/svg+xml') return '.svg';
  return '';
}

export const r2AllowedImageMimeTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
]);

export type UploadImageToR2Params = {
  file: File;
  folder?: string | null;
};

export type UploadImageToR2Result = {
  key: string;
  url: string;
  size: number;
  contentType: string;
};

export async function uploadImageToR2({
  file,
  folder,
}: UploadImageToR2Params): Promise<UploadImageToR2Result> {
  const config = getR2Config();
  const client = getR2Client();

  if (!r2AllowedImageMimeTypes.has(file.type)) {
    throw new Error(
      'Định dạng ảnh không được hỗ trợ. Chỉ chấp nhận JPG, PNG, WEBP, GIF, AVIF, SVG.',
    );
  }

  if (file.size <= 0) {
    throw new Error('File ảnh rỗng.');
  }

  if (file.size > config.maxFileSizeBytes) {
    throw new Error(
      `Ảnh quá lớn. Kích thước tối đa là ${(
        config.maxFileSizeBytes /
        (1024 * 1024)
      ).toFixed(1)}MB.`,
    );
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const originalName = sanitizeFileName(file.name || 'image');
  const originalWithoutExt = originalName.replace(/\.[^.]+$/, '') || 'image';
  const extension = extFromFileName(originalName) || extFromMimeType(file.type) || '.jpg';
  const key = `${sanitizeFolder(folder)}/${year}/${month}/${day}/${Date.now()}-${randomUUID()}-${originalWithoutExt}${extension}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      CacheControl: 'public, max-age=31536000, immutable',
    }),
  );

  return {
    key,
    url: `${config.publicBaseUrl}/${key}`,
    size: file.size,
    contentType: file.type,
  };
}
