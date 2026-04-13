import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface OrderDataItemRow extends RowDataPacket {
  id: number;
  order_id: number;
  data_type: string;
  title: string;
  state: string;
  storage_key: string | null;
  metadata_json: string | null;
  created_by: number | null;
  created_by_name: string | null;
  approved_by: number | null;
  approved_by_name: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  order_no: string;
  order_status: string;
  sale_owner_user_id: number | null;
  customer_id: number;
  customer_code: string;
  customer_name: string;
  customer_country_code: string | null;
  factory_id: number | null;
  factory_code: string | null;
  factory_name: string | null;
  factory_location: string | null;
}

export interface OrderDataItemRecord {
  id: number;
  orderId: number;
  orderNo: string;
  orderStatus: string;
  saleOwnerUserId: number | null;
  customer: {
    id: number;
    code: string;
    name: string;
    countryCode: string | null;
  };
  factory: {
    id: number;
    code: string;
    name: string;
    location: string | null;
  } | null;
  dataType: string;
  title: string;
  state: string;
  storageKey: string | null;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDataItemInput {
  orderId: number;
  dataType: string;
  title: string;
  state?: string;
  storageKey?: string | null;
  metadata?: Record<string, unknown> | null;
  createdBy?: number | null;
}

export interface UpdateOrderDataItemInput {
  dataType?: string;
  title?: string;
  state?: string;
  storageKey?: string | null;
  metadata?: Record<string, unknown> | null;
  approvedBy?: number | null;
  approvedAt?: string | null;
}

export interface ListOrderDataItemsInput {
  limit?: number;
  orderId?: number;
  orderNo?: string;
  state?: string;
  dataType?: string;
}

function normalizeLimit(limit: number | undefined, fallback = 100): number {
  const parsed = Number(limit ?? fallback);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function normalizeOrderNo(value: string): string {
  return value.trim().toUpperCase();
}

function parseMetadata(value: string | null): Record<string, unknown> | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

function toIso(value: string): string {
  return new Date(value).toISOString();
}

function toMysqlDateTime(value: string | null): string | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid approved_at datetime.');
  }

  return parsed.toISOString().slice(0, 19).replace('T', ' ');
}

function mapRowToOrderDataItem(row: OrderDataItemRow): OrderDataItemRecord {
  return {
    id: row.id,
    orderId: row.order_id,
    orderNo: row.order_no,
    orderStatus: row.order_status,
    saleOwnerUserId: row.sale_owner_user_id,
    customer: {
      id: row.customer_id,
      code: row.customer_code,
      name: row.customer_name,
      countryCode: row.customer_country_code,
    },
    factory:
      row.factory_id && row.factory_code && row.factory_name
        ? {
            id: row.factory_id,
            code: row.factory_code,
            name: row.factory_name,
            location: row.factory_location,
          }
        : null,
    dataType: row.data_type,
    title: row.title,
    state: row.state,
    storageKey: row.storage_key,
    metadata: parseMetadata(row.metadata_json),
    createdBy: row.created_by,
    createdByName: row.created_by_name,
    approvedBy: row.approved_by,
    approvedByName: row.approved_by_name,
    approvedAt: row.approved_at ? toIso(row.approved_at) : null,
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

async function getRowsByIds(ids: number[]): Promise<OrderDataItemRow[]> {
  if (ids.length === 0) {
    return [];
  }

  const pool = await ensureReady();
  const placeholders = ids.map(() => '?').join(', ');
  const [rows] = await pool.query<OrderDataItemRow[]>(
    `SELECT
       i.id, i.order_id, i.data_type, i.title, i.state, i.storage_key, i.metadata_json,
       i.created_by, i.approved_by, i.approved_at, i.created_at, i.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name,
       o.order_no, o.status AS order_status, o.sale_owner_user_id,
       c.id AS customer_id, c.code AS customer_code, c.name AS customer_name, c.country_code AS customer_country_code,
       f.id AS factory_id, f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM order_data_items i
     INNER JOIN trade_orders o ON o.id = i.order_id
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     LEFT JOIN app_users creator ON creator.id = i.created_by
     LEFT JOIN app_users approver ON approver.id = i.approved_by
     WHERE i.id IN (${placeholders})
     ORDER BY i.created_at DESC, i.id DESC`,
    ids,
  );

  return rows;
}

export async function getOrderDataItemById(id: number): Promise<OrderDataItemRecord | null> {
  const rows = await getRowsByIds([id]);
  if (rows.length === 0) {
    return null;
  }

  return mapRowToOrderDataItem(rows[0]);
}

export async function listOrderDataItems(
  input: ListOrderDataItemsInput = {},
): Promise<OrderDataItemRecord[]> {
  const pool = await ensureReady();

  const where: string[] = [];
  const values: Array<number | string> = [];

  if (Number.isInteger(input.orderId) && Number(input.orderId) > 0) {
    where.push('i.order_id = ?');
    values.push(Number(input.orderId));
  }
  if (input.orderNo?.trim()) {
    where.push('o.order_no LIKE ?');
    values.push(`%${normalizeOrderNo(input.orderNo)}%`);
  }
  if (input.state?.trim()) {
    where.push('i.state = ?');
    values.push(input.state.trim().toLowerCase());
  }
  if (input.dataType?.trim()) {
    where.push('i.data_type = ?');
    values.push(input.dataType.trim().toLowerCase());
  }

  const [rows] = await pool.query<OrderDataItemRow[]>(
    `SELECT
       i.id, i.order_id, i.data_type, i.title, i.state, i.storage_key, i.metadata_json,
       i.created_by, i.approved_by, i.approved_at, i.created_at, i.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name,
       o.order_no, o.status AS order_status, o.sale_owner_user_id,
       c.id AS customer_id, c.code AS customer_code, c.name AS customer_name, c.country_code AS customer_country_code,
       f.id AS factory_id, f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM order_data_items i
     INNER JOIN trade_orders o ON o.id = i.order_id
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     LEFT JOIN app_users creator ON creator.id = i.created_by
     LEFT JOIN app_users approver ON approver.id = i.approved_by
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY i.created_at DESC, i.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  return rows.map(mapRowToOrderDataItem);
}

export async function createOrderDataItem(
  input: CreateOrderDataItemInput,
): Promise<OrderDataItemRecord> {
  const pool = await ensureReady();
  const [insertResult] = await pool.execute<ResultSetHeader>(
    `INSERT INTO order_data_items (
      order_id, data_type, title, state, storage_key, metadata_json, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      input.orderId,
      input.dataType.trim().toLowerCase(),
      input.title.trim(),
      (input.state ?? 'pending_review').trim().toLowerCase(),
      input.storageKey?.trim() || null,
      input.metadata ? JSON.stringify(input.metadata) : null,
      input.createdBy ?? null,
    ],
  );

  const created = await getOrderDataItemById(insertResult.insertId);
  if (!created) {
    throw new Error('Failed to read created data item.');
  }

  return created;
}

export async function updateOrderDataItem(
  id: number,
  input: UpdateOrderDataItemInput,
): Promise<OrderDataItemRecord | null> {
  const pool = await ensureReady();
  const updateFields: string[] = [];
  const updateValues: Array<string | number | null> = [];

  if (input.dataType !== undefined) {
    updateFields.push('data_type = ?');
    updateValues.push(input.dataType.trim().toLowerCase());
  }
  if (input.title !== undefined) {
    updateFields.push('title = ?');
    updateValues.push(input.title.trim());
  }
  if (input.state !== undefined) {
    updateFields.push('state = ?');
    updateValues.push(input.state.trim().toLowerCase());
  }
  if (input.storageKey !== undefined) {
    updateFields.push('storage_key = ?');
    updateValues.push(input.storageKey?.trim() || null);
  }
  if (input.metadata !== undefined) {
    updateFields.push('metadata_json = ?');
    updateValues.push(input.metadata ? JSON.stringify(input.metadata) : null);
  }
  if (input.approvedBy !== undefined) {
    updateFields.push('approved_by = ?');
    updateValues.push(input.approvedBy ?? null);
  }
  if (input.approvedAt !== undefined) {
    updateFields.push('approved_at = ?');
    updateValues.push(toMysqlDateTime(input.approvedAt));
  }

  if (updateFields.length === 0) {
    return getOrderDataItemById(id);
  }

  updateValues.push(id);
  await pool.execute(
    `UPDATE order_data_items
     SET ${updateFields.join(', ')}
     WHERE id = ?`,
    updateValues,
  );

  return getOrderDataItemById(id);
}
