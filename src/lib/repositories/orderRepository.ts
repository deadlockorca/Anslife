import type { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';
import { ORDER_STATUSES, isOrderStatus } from '../auth/authorization';
import {
  getCustomerByCode,
  getCustomerById,
  getFactoryByCode,
  getFactoryById,
} from './masterDataRepository';

interface TradeOrderRow extends RowDataPacket {
  id: number;
  order_no: string;
  customer_id: number;
  customer_code: string;
  customer_name: string;
  customer_country_code: string | null;
  factory_id: number | null;
  factory_code: string | null;
  factory_name: string | null;
  factory_location: string | null;
  sale_owner_user_id: number | null;
  status: string;
  due_date: string | null;
  metadata_json: string | null;
  created_at: string;
  updated_at: string;
}

interface AssignmentRow extends RowDataPacket {
  order_id: number;
  user_id: number;
  assignment_role: string;
}

export interface OrderAssignment {
  userId: number;
  assignmentRole: string;
}

export interface OrderCustomerRef {
  id: number;
  code: string;
  name: string;
  countryCode: string | null;
}

export interface OrderFactoryRef {
  id: number;
  code: string;
  name: string;
  location: string | null;
}

export interface TradeOrderRecord {
  id: number;
  orderNo: string;
  customer: OrderCustomerRef;
  factory: OrderFactoryRef | null;
  saleOwnerUserId: number | null;
  status: string;
  dueDate: string | null;
  metadata: Record<string, unknown> | null;
  assignments: OrderAssignment[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTradeOrderInput {
  orderNo: string;
  customerId?: number;
  customerCode?: string;
  factoryId?: number | null;
  factoryCode?: string | null;
  saleOwnerUserId?: number | null;
  status?: string;
  dueDate?: string | null;
  metadata?: Record<string, unknown> | null;
  assignments?: OrderAssignment[];
}

export interface UpdateTradeOrderInput {
  customerId?: number;
  customerCode?: string;
  factoryId?: number | null;
  factoryCode?: string | null;
  saleOwnerUserId?: number | null;
  status?: string;
  dueDate?: string | null;
  metadata?: Record<string, unknown> | null;
  assignments?: OrderAssignment[];
}

export interface ListTradeOrdersInput {
  limit?: number;
  orderNo?: string;
  customerCode?: string;
  factoryCode?: string;
  status?: string;
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

function normalizeStatus(value: string | undefined): string {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (!normalized) {
    return 'draft';
  }

  if (!isOrderStatus(normalized)) {
    throw new Error(
      `Invalid order status. Allowed: ${ORDER_STATUSES.join(', ')}.`,
    );
  }

  return normalized;
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
    throw new Error('Invalid due date. Expected YYYY-MM-DD.');
  }

  return normalized;
}

function normalizeAssignments(assignments: OrderAssignment[] | undefined): OrderAssignment[] {
  if (!Array.isArray(assignments)) {
    return [];
  }

  const unique = new Map<string, OrderAssignment>();
  for (const assignment of assignments) {
    const userId = Number(assignment.userId);
    const assignmentRole = String(assignment.assignmentRole ?? '').trim();
    if (!Number.isInteger(userId) || userId <= 0 || !assignmentRole) {
      continue;
    }
    const key = `${userId}:${assignmentRole}`;
    unique.set(key, { userId, assignmentRole });
  }

  return Array.from(unique.values());
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

async function resolveCustomer(
  input: Pick<CreateTradeOrderInput, 'customerId' | 'customerCode'>,
): Promise<OrderCustomerRef> {
  if (Number.isInteger(input.customerId) && Number(input.customerId) > 0) {
    const customer = await getCustomerById(Number(input.customerId));
    if (customer) {
      return customer;
    }
  }

  if (typeof input.customerCode === 'string' && input.customerCode.trim()) {
    const customer = await getCustomerByCode(input.customerCode);
    if (customer) {
      return customer;
    }
  }

  throw new Error('Customer not found.');
}

async function resolveFactory(
  input: Pick<CreateTradeOrderInput, 'factoryId' | 'factoryCode'>,
): Promise<OrderFactoryRef | null> {
  if (input.factoryId === null || input.factoryCode === null) {
    return null;
  }

  if (Number.isInteger(input.factoryId) && Number(input.factoryId) > 0) {
    const factory = await getFactoryById(Number(input.factoryId));
    if (factory) {
      return factory;
    }
  }

  if (typeof input.factoryCode === 'string' && input.factoryCode.trim()) {
    const factory = await getFactoryByCode(input.factoryCode);
    if (factory) {
      return factory;
    }
  }

  if (input.factoryId !== undefined || input.factoryCode !== undefined) {
    throw new Error('Factory not found.');
  }

  return null;
}

async function loadAssignmentsMap(orderIds: number[]): Promise<Map<number, OrderAssignment[]>> {
  const assignmentMap = new Map<number, OrderAssignment[]>();
  if (orderIds.length === 0) {
    return assignmentMap;
  }

  const pool = getDbPool();
  if (!pool) {
    return assignmentMap;
  }

  const placeholders = orderIds.map(() => '?').join(', ');
  const [rows] = await pool.query<AssignmentRow[]>(
    `SELECT order_id, user_id, assignment_role
     FROM trade_order_assignments
     WHERE order_id IN (${placeholders})
     ORDER BY order_id ASC, assignment_role ASC, user_id ASC`,
    orderIds,
  );

  for (const row of rows) {
    const current = assignmentMap.get(row.order_id) ?? [];
    current.push({ userId: row.user_id, assignmentRole: row.assignment_role });
    assignmentMap.set(row.order_id, current);
  }

  return assignmentMap;
}

function mapTradeOrder(
  row: TradeOrderRow,
  assignments: OrderAssignment[],
): TradeOrderRecord {
  return {
    id: row.id,
    orderNo: row.order_no,
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
    saleOwnerUserId: row.sale_owner_user_id,
    status: row.status,
    dueDate: row.due_date,
    metadata: parseMetadata(row.metadata_json),
    assignments,
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

async function getTradeOrderRowsByIds(orderIds: number[]): Promise<TradeOrderRow[]> {
  if (orderIds.length === 0) {
    return [];
  }

  const pool = await ensureReady();
  const placeholders = orderIds.map(() => '?').join(', ');
  const [rows] = await pool.query<TradeOrderRow[]>(
    `SELECT
       o.id, o.order_no, o.customer_id, o.factory_id, o.sale_owner_user_id,
       o.status, o.due_date, o.metadata_json, o.created_at, o.updated_at,
       c.code AS customer_code,
       c.name AS customer_name,
       c.country_code AS customer_country_code,
       f.code AS factory_code,
       f.name AS factory_name,
       f.location AS factory_location
     FROM trade_orders o
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     WHERE o.id IN (${placeholders})
     ORDER BY o.created_at DESC, o.id DESC`,
    orderIds,
  );

  return rows;
}

async function saveAssignments(
  connection: PoolConnection,
  orderId: number,
  assignments: OrderAssignment[],
): Promise<void> {
  await connection.execute(`DELETE FROM trade_order_assignments WHERE order_id = ?`, [orderId]);
  for (const assignment of assignments) {
    await connection.execute(
      `INSERT INTO trade_order_assignments (order_id, user_id, assignment_role)
       VALUES (?, ?, ?)`,
      [orderId, assignment.userId, assignment.assignmentRole],
    );
  }
}

export async function listTradeOrders(
  input: ListTradeOrdersInput = {},
): Promise<TradeOrderRecord[]> {
  const pool = await ensureReady();

  const where: string[] = [];
  const values: Array<string | number> = [];

  if (input.orderNo?.trim()) {
    where.push('o.order_no LIKE ?');
    values.push(`%${normalizeOrderNo(input.orderNo)}%`);
  }
  if (input.customerCode?.trim()) {
    where.push('c.code = ?');
    values.push(input.customerCode.trim().toUpperCase());
  }
  if (input.factoryCode?.trim()) {
    where.push('f.code = ?');
    values.push(input.factoryCode.trim().toUpperCase());
  }
  if (input.status?.trim()) {
    where.push('o.status = ?');
    values.push(input.status.trim().toLowerCase());
  }

  const [rows] = await pool.query<TradeOrderRow[]>(
    `SELECT
       o.id, o.order_no, o.customer_id, o.factory_id, o.sale_owner_user_id,
       o.status, o.due_date, o.metadata_json, o.created_at, o.updated_at,
       c.code AS customer_code,
       c.name AS customer_name,
       c.country_code AS customer_country_code,
       f.code AS factory_code,
       f.name AS factory_name,
       f.location AS factory_location
     FROM trade_orders o
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY o.created_at DESC, o.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  if (rows.length === 0) {
    return [];
  }

  const orderIds = rows.map((row) => row.id);
  const assignments = await loadAssignmentsMap(orderIds);
  return rows.map((row) => mapTradeOrder(row, assignments.get(row.id) ?? []));
}

export async function getTradeOrderById(id: number): Promise<TradeOrderRecord | null> {
  const rows = await getTradeOrderRowsByIds([id]);
  if (rows.length === 0) {
    return null;
  }
  const assignments = await loadAssignmentsMap([id]);
  return mapTradeOrder(rows[0], assignments.get(id) ?? []);
}

export async function createTradeOrder(input: CreateTradeOrderInput): Promise<TradeOrderRecord> {
  const pool = await ensureReady();
  const customer = await resolveCustomer(input);
  const factory = await resolveFactory(input);
  const assignments = normalizeAssignments(input.assignments);

  const [insertResult] = await pool.execute<ResultSetHeader>(
    `INSERT INTO trade_orders (
      order_no, customer_id, factory_id, sale_owner_user_id, status, due_date, metadata_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      normalizeOrderNo(input.orderNo),
      customer.id,
      factory?.id ?? null,
      input.saleOwnerUserId ?? null,
      normalizeStatus(input.status),
      normalizeDate(input.dueDate),
      input.metadata ? JSON.stringify(input.metadata) : null,
    ],
  );

  if (assignments.length > 0) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      await saveAssignments(connection, insertResult.insertId, assignments);
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  const created = await getTradeOrderById(insertResult.insertId);
  if (!created) {
    throw new Error('Failed to read created order.');
  }
  return created;
}

export async function updateTradeOrder(
  id: number,
  input: UpdateTradeOrderInput,
): Promise<TradeOrderRecord | null> {
  const pool = await ensureReady();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const updateFields: string[] = [];
    const updateValues: Array<string | number | null> = [];

    if (input.customerId !== undefined || input.customerCode !== undefined) {
      const customer = await resolveCustomer({
        customerId: input.customerId,
        customerCode: input.customerCode,
      });
      updateFields.push('customer_id = ?');
      updateValues.push(customer.id);
    }

    if (input.factoryId !== undefined || input.factoryCode !== undefined) {
      const factory = await resolveFactory({
        factoryId: input.factoryId,
        factoryCode: input.factoryCode,
      });
      updateFields.push('factory_id = ?');
      updateValues.push(factory?.id ?? null);
    }

    if (input.saleOwnerUserId !== undefined) {
      updateFields.push('sale_owner_user_id = ?');
      updateValues.push(input.saleOwnerUserId ?? null);
    }
    if (input.status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(normalizeStatus(input.status));
    }
    if (input.dueDate !== undefined) {
      updateFields.push('due_date = ?');
      updateValues.push(normalizeDate(input.dueDate));
    }
    if (input.metadata !== undefined) {
      updateFields.push('metadata_json = ?');
      updateValues.push(input.metadata ? JSON.stringify(input.metadata) : null);
    }

    if (updateFields.length > 0) {
      updateValues.push(id);
      await connection.execute(
        `UPDATE trade_orders
         SET ${updateFields.join(', ')}
         WHERE id = ?`,
        updateValues,
      );
    }

    if (input.assignments !== undefined) {
      const assignments = normalizeAssignments(input.assignments);
      await saveAssignments(connection, id, assignments);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  return getTradeOrderById(id);
}
