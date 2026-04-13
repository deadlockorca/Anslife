import crypto from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function parsePhotoDataUrl(dataUrl: string): { extension: string; buffer: Buffer } {
  const trimmed = dataUrl.trim();
  const match = trimmed.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/i);
  if (!match) {
    throw new Error('INVALID_ATTENDANCE_PHOTO');
  }

  const mimeType = match[1].toLowerCase();
  const extension = ALLOWED_MIME_TO_EXT[mimeType];
  if (!extension) {
    throw new Error('INVALID_ATTENDANCE_PHOTO');
  }

  const base64Payload = match[2];
  const buffer = Buffer.from(base64Payload, 'base64');
  if (buffer.length === 0 || buffer.length > MAX_PHOTO_BYTES) {
    throw new Error('INVALID_ATTENDANCE_PHOTO');
  }

  return { extension, buffer };
}

function sanitizeDateToken(dateToken: string): string {
  const trimmed = dateToken.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : 'unknown-date';
}

export async function saveAttendancePhoto(params: {
  userId: number;
  attendanceDate: string;
  mode: 'check-in' | 'check-out';
  photoDataUrl: string;
}): Promise<string> {
  const { extension, buffer } = parsePhotoDataUrl(params.photoDataUrl);
  const safeDate = sanitizeDateToken(params.attendanceDate);

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const relativeDir = path.posix.join('uploads', 'attendance', year, month, day);
  const absoluteDir = path.join(process.cwd(), 'public', ...relativeDir.split('/'));
  await fs.mkdir(absoluteDir, { recursive: true });

  const randomToken = crypto.randomUUID().slice(0, 8);
  const filename = `${safeDate}-${params.mode}-u${params.userId}-${Date.now()}-${randomToken}.${extension}`;
  const absoluteFilePath = path.join(absoluteDir, filename);
  await fs.writeFile(absoluteFilePath, buffer, { mode: 0o644 });

  return `/${path.posix.join(relativeDir, filename)}`;
}
