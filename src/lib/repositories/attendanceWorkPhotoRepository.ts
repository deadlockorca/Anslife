import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface AttendanceWorkPhotoRow extends RowDataPacket {
  id: number;
  user_id: number;
  user_email: string;
  user_full_name: string;
  attendance_date: string | Date;
  drive_file_id: string;
  drive_parent_id: string;
  drive_web_view_link: string | null;
  file_name: string;
  original_file_name: string | null;
  mime_type: string;
  file_size: string | number | null;
  uploaded_at: string;
}

export interface AttendanceWorkPhotoRecord {
  id: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  attendanceDate: string;
  driveFileId: string;
  driveParentId: string;
  driveWebViewLink: string | null;
  fileName: string;
  originalFileName: string | null;
  mimeType: string;
  fileSize: number | null;
  uploadedAt: string;
}

export interface ListAttendanceWorkPhotosInput {
  limit?: number;
  userId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface CreateAttendanceWorkPhotoInput {
  userId: number;
  attendanceDate: string;
  driveFileId: string;
  driveParentId: string;
  driveWebViewLink?: string | null;
  fileName: string;
  originalFileName?: string | null;
  mimeType: string;
  fileSize?: number | null;
}

function normalizeLimit(limit: number | undefined, fallback = 300): number {
  const parsed = Number(limit ?? fallback);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(1000, Math.max(1, Math.floor(parsed)));
}

function normalizeDate(value: string): string {
  const normalized = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new Error('INVALID_ATTENDANCE_DATE');
  }
  return normalized;
}

function normalizeText(value: string | null | undefined, maxLength: number): string | null {
  if (value == null) {
    return null;
  }
  const normalized = String(value).trim();
  if (!normalized) {
    return null;
  }
  return normalized.slice(0, maxLength);
}

function toDateString(value: string | Date): string {
  if (value instanceof Date) {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(value);
  }
  return String(value).slice(0, 10);
}

function toIso(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toISOString();
}

function mapRecord(row: AttendanceWorkPhotoRow): AttendanceWorkPhotoRecord {
  const fileSize = row.file_size == null ? null : Number(row.file_size);
  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    userEmail: row.user_email,
    userFullName: row.user_full_name,
    attendanceDate: toDateString(row.attendance_date),
    driveFileId: row.drive_file_id,
    driveParentId: row.drive_parent_id,
    driveWebViewLink: row.drive_web_view_link,
    fileName: row.file_name,
    originalFileName: row.original_file_name,
    mimeType: row.mime_type,
    fileSize: fileSize != null && Number.isFinite(fileSize) ? fileSize : null,
    uploadedAt: toIso(row.uploaded_at),
  };
}

async function ensureReady() {
  if (!isDatabaseConfigured()) {
    throw new Error('Database is not configured.');
  }

  const ready = await ensureDatabaseSchema();
  if (!ready) {
    throw new Error('Database schema is not ready.');
  }

  const pool = getDbPool();
  if (!pool) {
    throw new Error('Database connection is unavailable.');
  }

  return pool;
}

export async function listAttendanceWorkPhotos(
  input: ListAttendanceWorkPhotosInput = {},
): Promise<AttendanceWorkPhotoRecord[]> {
  const pool = await ensureReady();
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (Number.isInteger(input.userId) && Number(input.userId) > 0) {
    where.push('p.user_id = ?');
    values.push(Number(input.userId));
  }

  if (input.fromDate?.trim()) {
    where.push('p.attendance_date >= ?');
    values.push(normalizeDate(input.fromDate));
  }

  if (input.toDate?.trim()) {
    where.push('p.attendance_date <= ?');
    values.push(normalizeDate(input.toDate));
  }

  const [rows] = await pool.query<AttendanceWorkPhotoRow[]>(
    `SELECT
       p.id, p.user_id, p.attendance_date, p.drive_file_id, p.drive_parent_id,
       p.drive_web_view_link, p.file_name, p.original_file_name, p.mime_type,
       p.file_size, p.uploaded_at,
       u.email AS user_email,
       u.full_name AS user_full_name
     FROM attendance_work_photos p
     INNER JOIN app_users u ON u.id = p.user_id
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY p.attendance_date DESC, p.uploaded_at DESC, p.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  return rows.map(mapRecord);
}

export async function createAttendanceWorkPhoto(
  input: CreateAttendanceWorkPhotoInput,
): Promise<AttendanceWorkPhotoRecord> {
  const pool = await ensureReady();
  const normalizedDate = normalizeDate(input.attendanceDate);
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO attendance_work_photos (
       user_id, attendance_date, drive_file_id, drive_parent_id, drive_web_view_link,
       file_name, original_file_name, mime_type, file_size
     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.userId,
      normalizedDate,
      normalizeText(input.driveFileId, 191),
      normalizeText(input.driveParentId, 191),
      normalizeText(input.driveWebViewLink, 1024),
      normalizeText(input.fileName, 255),
      normalizeText(input.originalFileName, 255),
      normalizeText(input.mimeType, 191),
      input.fileSize == null ? null : Math.max(0, Math.floor(input.fileSize)),
    ],
  );

  const photos = await listAttendanceWorkPhotos({
    userId: input.userId,
    fromDate: normalizedDate,
    toDate: normalizedDate,
    limit: 100,
  });
  const created = photos.find((photo) => photo.id === result.insertId);
  if (!created) {
    throw new Error('ATTENDANCE_WORK_PHOTO_CREATE_FAILED');
  }
  return created;
}
