import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface LogisticsRow extends RowDataPacket {
  id: number;
  order_id: number;
  etd: string | null;
  eta: string | null;
  container_no: string | null;
  departure_port: string | null;
  arrival_port: string | null;
  shipping_line: string | null;
  vessel_name: string | null;
  logistics_note: string | null;
  updated_by: number | null;
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

export interface OrderLogisticsRecord {
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
  etd: string | null;
  eta: string | null;
  containerNo: string | null;
  departurePort: string | null;
  arrivalPort: string | null;
  shippingLine: string | null;
  vesselName: string | null;
  note: string | null;
  updatedBy: number | null;
  updatedByName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListOrderLogisticsInput {
  limit?: number;
  orderNo?: string;
  customerCode?: string;
  factoryCode?: string;
}

export interface SaveOrderLogisticsInput {
  orderId: number;
  etd?: string | null;
  eta?: string | null;
  containerNo?: string | null;
  departurePort?: string | null;
  arrivalPort?: string | null;
  shippingLine?: string | null;
  vesselName?: string | null;
  note?: string | null;
  updatedBy?: number | null;
}

function normalizeLimit(limit: number | undefined, fallback = 100): number {
  const parsed = Number(limit ?? fallback);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(300, Math.max(1, Math.floor(parsed)));
}

function normalizeOptional(value: string | null | undefined, max = 191): string | null {
  if (value == null) {
    return null;
  }
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }
  return normalized.slice(0, max);
}

function normalizeDate(value: string | null | undefined): string | null {
  if (value == null) {
    return null;
  }
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new Error('Invalid date. Expected YYYY-MM-DD.');
  }
  return normalized;
}

function toIso(value: string): string {
  return new Date(value).toISOString();
}

function mapRecord(row: LogisticsRow): OrderLogisticsRecord {
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
    etd: row.etd,
    eta: row.eta,
    containerNo: row.container_no,
    departurePort: row.departure_port,
    arrivalPort: row.arrival_port,
    shippingLine: row.shipping_line,
    vesselName: row.vessel_name,
    note: row.logistics_note,
    updatedBy: row.updated_by,
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

async function getRowsByWhereClause(
  whereSql: string,
  values: Array<string | number>,
  limit?: number,
): Promise<LogisticsRow[]> {
  const pool = await ensureReady();
  const [rows] = await pool.query<LogisticsRow[]>(
    `SELECT
       l.id, l.order_id, l.etd, l.eta, l.container_no, l.departure_port, l.arrival_port,
       l.shipping_line, l.vessel_name, l.logistics_note, l.updated_by, l.created_at, l.updated_at,
       updater.full_name AS updated_by_name,
       o.order_no, o.sale_owner_user_id,
       c.code AS customer_code, c.name AS customer_name, c.country_code AS customer_country_code,
       f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM order_logistics l
     INNER JOIN trade_orders o ON o.id = l.order_id
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     LEFT JOIN app_users updater ON updater.id = l.updated_by
     ${whereSql}
     ORDER BY l.updated_at DESC, l.id DESC
     ${limit ? 'LIMIT ?' : ''}`,
    limit ? [...values, normalizeLimit(limit)] : values,
  );

  return rows;
}

export async function listOrderLogistics(
  input: ListOrderLogisticsInput = {},
): Promise<OrderLogisticsRecord[]> {
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (input.orderNo?.trim()) {
    where.push('o.order_no LIKE ?');
    values.push(`%${input.orderNo.trim().toUpperCase()}%`);
  }
  if (input.customerCode?.trim()) {
    where.push('c.code = ?');
    values.push(input.customerCode.trim().toUpperCase());
  }
  if (input.factoryCode?.trim()) {
    where.push('f.code = ?');
    values.push(input.factoryCode.trim().toUpperCase());
  }

  const rows = await getRowsByWhereClause(
    where.length > 0 ? `WHERE ${where.join(' AND ')}` : '',
    values,
    input.limit,
  );
  return rows.map(mapRecord);
}

export async function getOrderLogisticsById(id: number): Promise<OrderLogisticsRecord | null> {
  const rows = await getRowsByWhereClause('WHERE l.id = ?', [id], 1);
  if (rows.length === 0) {
    return null;
  }
  return mapRecord(rows[0]);
}

export async function getOrderLogisticsByOrderId(
  orderId: number,
): Promise<OrderLogisticsRecord | null> {
  const rows = await getRowsByWhereClause('WHERE l.order_id = ?', [orderId], 1);
  if (rows.length === 0) {
    return null;
  }
  return mapRecord(rows[0]);
}

export async function upsertOrderLogistics(
  input: SaveOrderLogisticsInput,
): Promise<OrderLogisticsRecord> {
  const pool = await ensureReady();
  const [existingRows] = await pool.query<RowDataPacket[]>(
    `SELECT id FROM order_logistics WHERE order_id = ? LIMIT 1`,
    [input.orderId],
  );

  if (existingRows.length === 0) {
    const [insertResult] = await pool.execute<ResultSetHeader>(
      `INSERT INTO order_logistics (
        order_id, etd, eta, container_no, departure_port, arrival_port, shipping_line, vessel_name, logistics_note, updated_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        input.orderId,
        normalizeDate(input.etd),
        normalizeDate(input.eta),
        normalizeOptional(input.containerNo, 64),
        normalizeOptional(input.departurePort, 191),
        normalizeOptional(input.arrivalPort, 191),
        normalizeOptional(input.shippingLine, 191),
        normalizeOptional(input.vesselName, 191),
        normalizeOptional(input.note, 10000),
        input.updatedBy ?? null,
      ],
    );

    const created = await getOrderLogisticsById(insertResult.insertId);
    if (!created) {
      throw new Error('Failed to read created logistics.');
    }
    return created;
  }

  const existingId = Number(existingRows[0].id);
  await updateOrderLogisticsById(existingId, input);
  const updated = await getOrderLogisticsById(existingId);
  if (!updated) {
    throw new Error('Failed to read updated logistics.');
  }
  return updated;
}

export async function updateOrderLogisticsById(
  id: number,
  input: Omit<SaveOrderLogisticsInput, 'orderId'> & { orderId?: number },
): Promise<OrderLogisticsRecord | null> {
  const pool = await ensureReady();
  const fields: string[] = [];
  const values: Array<string | number | null> = [];

  if (input.orderId !== undefined) {
    fields.push('order_id = ?');
    values.push(input.orderId);
  }
  if (input.etd !== undefined) {
    fields.push('etd = ?');
    values.push(normalizeDate(input.etd));
  }
  if (input.eta !== undefined) {
    fields.push('eta = ?');
    values.push(normalizeDate(input.eta));
  }
  if (input.containerNo !== undefined) {
    fields.push('container_no = ?');
    values.push(normalizeOptional(input.containerNo, 64));
  }
  if (input.departurePort !== undefined) {
    fields.push('departure_port = ?');
    values.push(normalizeOptional(input.departurePort, 191));
  }
  if (input.arrivalPort !== undefined) {
    fields.push('arrival_port = ?');
    values.push(normalizeOptional(input.arrivalPort, 191));
  }
  if (input.shippingLine !== undefined) {
    fields.push('shipping_line = ?');
    values.push(normalizeOptional(input.shippingLine, 191));
  }
  if (input.vesselName !== undefined) {
    fields.push('vessel_name = ?');
    values.push(normalizeOptional(input.vesselName, 191));
  }
  if (input.note !== undefined) {
    fields.push('logistics_note = ?');
    values.push(normalizeOptional(input.note, 10000));
  }
  if (input.updatedBy !== undefined) {
    fields.push('updated_by = ?');
    values.push(input.updatedBy ?? null);
  }

  if (fields.length === 0) {
    return getOrderLogisticsById(id);
  }

  values.push(id);
  await pool.execute(
    `UPDATE order_logistics
     SET ${fields.join(', ')}
     WHERE id = ?`,
    values,
  );

  return getOrderLogisticsById(id);
}
