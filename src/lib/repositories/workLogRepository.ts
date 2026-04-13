import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface WorkLogRow extends RowDataPacket {
  id: number;
  order_id: number;
  visibility: string;
  note_type: string;
  message: string;
  created_by: number | null;
  updated_by: number | null;
  created_by_name: string | null;
  updated_by_name: string | null;
  created_at: string;
  updated_at: string;
  order_no: string;
  sale_owner_user_id: number | null;
  customer_code: string;
  customer_name: string;
  customer_country_code: string | null;
  factory_code: string | null;
  factory_name: string | null;
  factory_location: string | null;
}

export type WorkLogVisibility = 'internal' | 'trader' | 'buyer';

export interface OrderWorkLogRecord {
  id: number;
  orderId: number;
  orderNo: string;
  saleOwnerUserId: number | null;
  customer: {
    code: string;
    name: string;
    countryCode: string | null;
  };
  factory: {
    code: string;
    name: string;
    location: string | null;
  } | null;
  visibility: WorkLogVisibility;
  noteType: string;
  message: string;
  createdBy: number | null;
  updatedBy: number | null;
  createdByName: string | null;
  updatedByName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListOrderWorkLogsInput {
  limit?: number;
  orderNo?: string;
  visibility?: WorkLogVisibility;
}

export interface CreateOrderWorkLogInput {
  orderId: number;
  visibility: WorkLogVisibility;
  noteType?: string;
  message: string;
  createdBy?: number | null;
}

export interface UpdateOrderWorkLogInput {
  visibility?: WorkLogVisibility;
  noteType?: string;
  message?: string;
  updatedBy?: number | null;
}

function normalizeLimit(limit: number | undefined, fallback = 100): number {
  const parsed = Number(limit ?? fallback);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(400, Math.max(1, Math.floor(parsed)));
}

function normalizeVisibility(value: string): WorkLogVisibility {
  const normalized = value.trim().toLowerCase();
  if (normalized === 'internal' || normalized === 'trader' || normalized === 'buyer') {
    return normalized;
  }
  throw new Error('Invalid visibility.');
}

function normalizeNoteType(value: string | null | undefined): string {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (!normalized) {
    return 'update';
  }
  return normalized.slice(0, 64);
}

function normalizeMessage(value: string): string {
  const normalized = value.trim();
  if (normalized.length < 2) {
    throw new Error('Message is too short.');
  }
  if (normalized.length > 12000) {
    return normalized.slice(0, 12000);
  }
  return normalized;
}

function toIso(value: string): string {
  return new Date(value).toISOString();
}

function mapRecord(row: WorkLogRow): OrderWorkLogRecord {
  return {
    id: row.id,
    orderId: row.order_id,
    orderNo: row.order_no,
    saleOwnerUserId: row.sale_owner_user_id,
    customer: {
      code: row.customer_code,
      name: row.customer_name,
      countryCode: row.customer_country_code,
    },
    factory:
      row.factory_code && row.factory_name
        ? {
            code: row.factory_code,
            name: row.factory_name,
            location: row.factory_location,
          }
        : null,
    visibility: normalizeVisibility(row.visibility),
    noteType: row.note_type,
    message: row.message,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    createdByName: row.created_by_name,
    updatedByName: row.updated_by_name,
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
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

async function queryLogs(
  whereSql: string,
  values: Array<string | number>,
  limit?: number,
): Promise<WorkLogRow[]> {
  const pool = await ensureReady();
  const [rows] = await pool.query<WorkLogRow[]>(
    `SELECT
       l.id, l.order_id, l.visibility, l.note_type, l.message, l.created_by, l.updated_by, l.created_at, l.updated_at,
       creator.full_name AS created_by_name,
       updater.full_name AS updated_by_name,
       o.order_no, o.sale_owner_user_id,
       c.code AS customer_code, c.name AS customer_name, c.country_code AS customer_country_code,
       f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM order_work_logs l
     INNER JOIN trade_orders o ON o.id = l.order_id
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     LEFT JOIN app_users creator ON creator.id = l.created_by
     LEFT JOIN app_users updater ON updater.id = l.updated_by
     ${whereSql}
     ORDER BY l.updated_at DESC, l.id DESC
     ${limit ? 'LIMIT ?' : ''}`,
    limit ? [...values, normalizeLimit(limit)] : values,
  );
  return rows;
}

export async function listOrderWorkLogs(
  input: ListOrderWorkLogsInput = {},
): Promise<OrderWorkLogRecord[]> {
  const where: string[] = [];
  const values: Array<string | number> = [];
  if (input.orderNo?.trim()) {
    where.push('o.order_no LIKE ?');
    values.push(`%${input.orderNo.trim().toUpperCase()}%`);
  }
  if (input.visibility?.trim()) {
    where.push('l.visibility = ?');
    values.push(normalizeVisibility(input.visibility));
  }

  const rows = await queryLogs(
    where.length > 0 ? `WHERE ${where.join(' AND ')}` : '',
    values,
    input.limit,
  );
  return rows.map(mapRecord);
}

export async function getOrderWorkLogById(id: number): Promise<OrderWorkLogRecord | null> {
  const rows = await queryLogs('WHERE l.id = ?', [id], 1);
  if (rows.length === 0) {
    return null;
  }
  return mapRecord(rows[0]);
}

export async function createOrderWorkLog(
  input: CreateOrderWorkLogInput,
): Promise<OrderWorkLogRecord> {
  const pool = await ensureReady();
  const [insertResult] = await pool.execute<ResultSetHeader>(
    `INSERT INTO order_work_logs (
      order_id, visibility, note_type, message, created_by, updated_by
    ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      input.orderId,
      normalizeVisibility(input.visibility),
      normalizeNoteType(input.noteType),
      normalizeMessage(input.message),
      input.createdBy ?? null,
      input.createdBy ?? null,
    ],
  );

  const created = await getOrderWorkLogById(insertResult.insertId);
  if (!created) {
    throw new Error('Failed to read created work log.');
  }
  return created;
}

export async function updateOrderWorkLog(
  id: number,
  input: UpdateOrderWorkLogInput,
): Promise<OrderWorkLogRecord | null> {
  const pool = await ensureReady();
  const fields: string[] = [];
  const values: Array<string | number | null> = [];

  if (input.visibility !== undefined) {
    fields.push('visibility = ?');
    values.push(normalizeVisibility(input.visibility));
  }
  if (input.noteType !== undefined) {
    fields.push('note_type = ?');
    values.push(normalizeNoteType(input.noteType));
  }
  if (input.message !== undefined) {
    fields.push('message = ?');
    values.push(normalizeMessage(input.message));
  }
  if (input.updatedBy !== undefined) {
    fields.push('updated_by = ?');
    values.push(input.updatedBy ?? null);
  }

  if (fields.length === 0) {
    return getOrderWorkLogById(id);
  }

  values.push(id);
  await pool.execute(
    `UPDATE order_work_logs
     SET ${fields.join(', ')}
     WHERE id = ?`,
    values,
  );
  return getOrderWorkLogById(id);
}
