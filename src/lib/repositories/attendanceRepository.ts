import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface AttendanceLogRow extends RowDataPacket {
  id: number;
  user_id: number;
  user_email: string;
  user_full_name: string;
  attendance_date: string;
  check_in_at: string | null;
  check_out_at: string | null;
  check_in_ip: string | null;
  check_out_ip: string | null;
  check_in_user_agent: string | null;
  check_out_user_agent: string | null;
  check_in_lat: string | null;
  check_in_lng: string | null;
  check_in_photo_url: string | null;
  check_out_lat: string | null;
  check_out_lng: string | null;
  check_out_photo_url: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export interface AttendanceLogRecord {
  id: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  attendanceDate: string;
  checkInAt: string | null;
  checkOutAt: string | null;
  checkInIp: string | null;
  checkOutIp: string | null;
  checkInUserAgent: string | null;
  checkOutUserAgent: string | null;
  checkInLat: number | null;
  checkInLng: number | null;
  checkInPhotoUrl: string | null;
  checkOutLat: number | null;
  checkOutLng: number | null;
  checkOutPhotoUrl: string | null;
  note: string | null;
  workMinutes: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListAttendanceLogsInput {
  limit?: number;
  userId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface AttendanceCheckInput {
  userId: number;
  attendanceDate: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  photoUrl?: string | null;
  note?: string | null;
}

function normalizeLimit(limit: number | undefined, fallback = 100): number {
  const parsed = Number(limit ?? fallback);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function normalizeDate(value: string): string {
  const normalized = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new Error('INVALID_ATTENDANCE_DATE');
  }
  return normalized;
}

function normalizeOptionalText(
  value: string | null | undefined,
  maxLength: number,
): string | null {
  if (value == null) {
    return null;
  }
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }
  return normalized.slice(0, maxLength);
}

function normalizeOptionalPhotoUrl(value: string | null | undefined): string | null {
  if (value == null) {
    return null;
  }
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }
  return normalized.slice(0, 1024);
}

function normalizeLatitude(value: number | null | undefined): number | null {
  if (value == null) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < -90 || parsed > 90) {
    return null;
  }
  return Number(parsed.toFixed(7));
}

function normalizeLongitude(value: number | null | undefined): number | null {
  if (value == null) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < -180 || parsed > 180) {
    return null;
  }
  return Number(parsed.toFixed(7));
}

function toIso(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toISOString();
}

function toNumber(value: string | null): number | null {
  if (value == null) {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function calculateWorkMinutes(
  checkInAt: string | null,
  checkOutAt: string | null,
): number | null {
  if (!checkInAt || !checkOutAt) {
    return null;
  }

  const checkInTime = new Date(checkInAt).getTime();
  const checkOutTime = new Date(checkOutAt).getTime();
  if (!Number.isFinite(checkInTime) || !Number.isFinite(checkOutTime) || checkOutTime < checkInTime) {
    return null;
  }

  return Math.floor((checkOutTime - checkInTime) / 60000);
}

function mapAttendanceLog(row: AttendanceLogRow): AttendanceLogRecord {
  const checkInAt = toIso(row.check_in_at);
  const checkOutAt = toIso(row.check_out_at);

  return {
    id: row.id,
    userId: row.user_id,
    userEmail: row.user_email,
    userFullName: row.user_full_name,
    attendanceDate: row.attendance_date,
    checkInAt,
    checkOutAt,
    checkInIp: row.check_in_ip,
    checkOutIp: row.check_out_ip,
    checkInUserAgent: row.check_in_user_agent,
    checkOutUserAgent: row.check_out_user_agent,
    checkInLat: toNumber(row.check_in_lat),
    checkInLng: toNumber(row.check_in_lng),
    checkInPhotoUrl: row.check_in_photo_url,
    checkOutLat: toNumber(row.check_out_lat),
    checkOutLng: toNumber(row.check_out_lng),
    checkOutPhotoUrl: row.check_out_photo_url,
    note: row.note,
    workMinutes: calculateWorkMinutes(checkInAt, checkOutAt),
    createdAt: toIso(row.created_at) ?? row.created_at,
    updatedAt: toIso(row.updated_at) ?? row.updated_at,
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

async function getAttendanceRowsByIds(ids: number[]): Promise<AttendanceLogRow[]> {
  if (ids.length === 0) {
    return [];
  }

  const pool = await ensureReady();
  const placeholders = ids.map(() => '?').join(', ');
  const [rows] = await pool.query<AttendanceLogRow[]>(
    `SELECT
       a.id, a.user_id, a.attendance_date, a.check_in_at, a.check_out_at,
       a.check_in_ip, a.check_out_ip,
       a.check_in_user_agent, a.check_out_user_agent,
       a.check_in_lat, a.check_in_lng, a.check_in_photo_url,
       a.check_out_lat, a.check_out_lng, a.check_out_photo_url,
       a.note, a.created_at, a.updated_at,
       u.email AS user_email,
       u.full_name AS user_full_name
     FROM attendance_logs a
     INNER JOIN app_users u ON u.id = a.user_id
     WHERE a.id IN (${placeholders})
     ORDER BY a.attendance_date DESC, a.id DESC`,
    ids,
  );

  return rows;
}

export async function getAttendanceLogById(id: number): Promise<AttendanceLogRecord | null> {
  const rows = await getAttendanceRowsByIds([id]);
  const firstRow = rows[0];
  return firstRow ? mapAttendanceLog(firstRow) : null;
}

export async function getAttendanceLogByUserAndDate(
  userId: number,
  attendanceDate: string,
): Promise<AttendanceLogRecord | null> {
  const pool = await ensureReady();
  const normalizedDate = normalizeDate(attendanceDate);
  const [rows] = await pool.query<AttendanceLogRow[]>(
    `SELECT
       a.id, a.user_id, a.attendance_date, a.check_in_at, a.check_out_at,
       a.check_in_ip, a.check_out_ip,
       a.check_in_user_agent, a.check_out_user_agent,
       a.check_in_lat, a.check_in_lng, a.check_in_photo_url,
       a.check_out_lat, a.check_out_lng, a.check_out_photo_url,
       a.note, a.created_at, a.updated_at,
       u.email AS user_email,
       u.full_name AS user_full_name
     FROM attendance_logs a
     INNER JOIN app_users u ON u.id = a.user_id
     WHERE a.user_id = ? AND a.attendance_date = ?
     LIMIT 1`,
    [userId, normalizedDate],
  );

  const firstRow = rows[0];
  return firstRow ? mapAttendanceLog(firstRow) : null;
}

export async function listAttendanceLogs(
  input: ListAttendanceLogsInput = {},
): Promise<AttendanceLogRecord[]> {
  const pool = await ensureReady();
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (Number.isInteger(input.userId) && Number(input.userId) > 0) {
    where.push('a.user_id = ?');
    values.push(Number(input.userId));
  }

  if (input.fromDate?.trim()) {
    where.push('a.attendance_date >= ?');
    values.push(normalizeDate(input.fromDate));
  }

  if (input.toDate?.trim()) {
    where.push('a.attendance_date <= ?');
    values.push(normalizeDate(input.toDate));
  }

  const [rows] = await pool.query<AttendanceLogRow[]>(
    `SELECT
       a.id, a.user_id, a.attendance_date, a.check_in_at, a.check_out_at,
       a.check_in_ip, a.check_out_ip,
       a.check_in_user_agent, a.check_out_user_agent,
       a.check_in_lat, a.check_in_lng, a.check_in_photo_url,
       a.check_out_lat, a.check_out_lng, a.check_out_photo_url,
       a.note, a.created_at, a.updated_at,
       u.email AS user_email,
       u.full_name AS user_full_name
     FROM attendance_logs a
     INNER JOIN app_users u ON u.id = a.user_id
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY a.attendance_date DESC, a.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  return rows.map(mapAttendanceLog);
}

export async function checkInAttendance(
  input: AttendanceCheckInput,
): Promise<AttendanceLogRecord> {
  const pool = await ensureReady();
  const normalizedDate = normalizeDate(input.attendanceDate);
  const existing = await getAttendanceLogByUserAndDate(input.userId, normalizedDate);
  if (existing?.checkInAt) {
    throw new Error('ATTENDANCE_ALREADY_CHECKED_IN');
  }

  const note = normalizeOptionalText(input.note, 512);
  const ipAddress = normalizeOptionalText(input.ipAddress, 64);
  const userAgent = normalizeOptionalText(input.userAgent, 512);
  const latitude = normalizeLatitude(input.latitude);
  const longitude = normalizeLongitude(input.longitude);
  const photoUrl = normalizeOptionalPhotoUrl(input.photoUrl);

  if (existing) {
    await pool.execute(
      `UPDATE attendance_logs
       SET check_in_at = CURRENT_TIMESTAMP,
           check_in_ip = ?,
           check_in_user_agent = ?,
           check_in_lat = ?,
           check_in_lng = ?,
           check_in_photo_url = ?,
           note = COALESCE(?, note),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [ipAddress, userAgent, latitude, longitude, photoUrl, note, existing.id],
    );

    const updated = await getAttendanceLogById(existing.id);
    if (!updated) {
      throw new Error('ATTENDANCE_CHECK_IN_FAILED');
    }
    return updated;
  }

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO attendance_logs (
       user_id, attendance_date, check_in_at,
       check_in_ip, check_in_user_agent, check_in_lat, check_in_lng, check_in_photo_url, note,
       created_at, updated_at
     )
     VALUES (?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [input.userId, normalizedDate, ipAddress, userAgent, latitude, longitude, photoUrl, note],
  );

  const created = await getAttendanceLogById(result.insertId);
  if (!created) {
    throw new Error('ATTENDANCE_CHECK_IN_FAILED');
  }

  return created;
}

export async function checkOutAttendance(
  input: AttendanceCheckInput,
): Promise<AttendanceLogRecord> {
  const pool = await ensureReady();
  const normalizedDate = normalizeDate(input.attendanceDate);
  const existing = await getAttendanceLogByUserAndDate(input.userId, normalizedDate);
  if (!existing || !existing.checkInAt) {
    throw new Error('ATTENDANCE_CHECKIN_REQUIRED');
  }
  if (existing.checkOutAt) {
    throw new Error('ATTENDANCE_ALREADY_CHECKED_OUT');
  }

  const note = normalizeOptionalText(input.note, 512);
  const ipAddress = normalizeOptionalText(input.ipAddress, 64);
  const userAgent = normalizeOptionalText(input.userAgent, 512);
  const latitude = normalizeLatitude(input.latitude);
  const longitude = normalizeLongitude(input.longitude);
  const photoUrl = normalizeOptionalPhotoUrl(input.photoUrl);

  await pool.execute(
    `UPDATE attendance_logs
     SET check_out_at = CURRENT_TIMESTAMP,
         check_out_ip = ?,
         check_out_user_agent = ?,
         check_out_lat = ?,
         check_out_lng = ?,
         check_out_photo_url = ?,
         note = COALESCE(?, note),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [ipAddress, userAgent, latitude, longitude, photoUrl, note, existing.id],
  );

  const updated = await getAttendanceLogById(existing.id);
  if (!updated) {
    throw new Error('ATTENDANCE_CHECK_OUT_FAILED');
  }

  return updated;
}
