import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

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

function normalizeOptional(value: string | null | undefined): string | null {
  if (value == null) {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
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

function toMysqlDate(value: string | null | undefined): string | null {
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

function toMysqlDateTime(value: string | null | undefined): string | null {
  if (value == null) {
    return null;
  }
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Invalid datetime format.');
  }
  return parsed.toISOString().slice(0, 19).replace('T', ' ');
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

interface OrderScopeJoinRow extends RowDataPacket {
  order_no: string;
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

interface UserAuditJoinRow extends RowDataPacket {
  created_by_name: string | null;
  approved_by_name: string | null;
}

interface OrderContext {
  orderNo: string;
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
}

function mapOrderContext(row: OrderScopeJoinRow): OrderContext {
  return {
    orderNo: row.order_no,
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
  };
}

interface QcItemRow extends OrderScopeJoinRow, UserAuditJoinRow {
  id: number;
  order_id: number;
  title: string;
  finding_type: string;
  severity: string;
  state: string;
  report_no: string | null;
  observed_at: string | null;
  metadata_json: string | null;
  created_by: number | null;
  approved_by: number | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface QcItemRecord extends OrderContext {
  id: number;
  orderId: number;
  title: string;
  findingType: string;
  severity: string;
  state: string;
  reportNo: string | null;
  observedAt: string | null;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListQcItemsInput {
  limit?: number;
  orderNo?: string;
  state?: string;
  severity?: string;
}

export interface CreateQcItemInput {
  orderId: number;
  title: string;
  findingType?: string;
  severity?: string;
  state?: string;
  reportNo?: string | null;
  observedAt?: string | null;
  metadata?: Record<string, unknown> | null;
  createdBy?: number | null;
}

export interface UpdateQcItemInput {
  title?: string;
  findingType?: string;
  severity?: string;
  state?: string;
  reportNo?: string | null;
  observedAt?: string | null;
  metadata?: Record<string, unknown> | null;
  approvedBy?: number | null;
  approvedAt?: string | null;
}

function mapQcItem(row: QcItemRow): QcItemRecord {
  return {
    id: row.id,
    orderId: row.order_id,
    ...mapOrderContext(row),
    title: row.title,
    findingType: row.finding_type,
    severity: row.severity,
    state: row.state,
    reportNo: row.report_no,
    observedAt: row.observed_at ? toIso(row.observed_at) : null,
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

async function getQcRowsByIds(ids: number[]): Promise<QcItemRow[]> {
  if (ids.length === 0) {
    return [];
  }
  const pool = await ensureReady();
  const placeholders = ids.map(() => '?').join(', ');
  const [rows] = await pool.query<QcItemRow[]>(
    `SELECT
       q.id, q.order_id, q.title, q.finding_type, q.severity, q.state, q.report_no,
       q.observed_at, q.metadata_json, q.created_by, q.approved_by, q.approved_at,
       q.created_at, q.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name,
       o.order_no, o.sale_owner_user_id,
       c.id AS customer_id, c.code AS customer_code, c.name AS customer_name, c.country_code AS customer_country_code,
       f.id AS factory_id, f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM qc_items q
     INNER JOIN trade_orders o ON o.id = q.order_id
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     LEFT JOIN app_users creator ON creator.id = q.created_by
     LEFT JOIN app_users approver ON approver.id = q.approved_by
     WHERE q.id IN (${placeholders})
     ORDER BY q.created_at DESC, q.id DESC`,
    ids,
  );
  return rows;
}

export async function getQcItemById(id: number): Promise<QcItemRecord | null> {
  const rows = await getQcRowsByIds([id]);
  if (rows.length === 0) {
    return null;
  }
  return mapQcItem(rows[0]);
}

export async function listQcItems(input: ListQcItemsInput = {}): Promise<QcItemRecord[]> {
  const pool = await ensureReady();
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (input.orderNo?.trim()) {
    where.push('o.order_no LIKE ?');
    values.push(`%${normalizeOrderNo(input.orderNo)}%`);
  }
  if (input.state?.trim()) {
    where.push('q.state = ?');
    values.push(input.state.trim().toLowerCase());
  }
  if (input.severity?.trim()) {
    where.push('q.severity = ?');
    values.push(input.severity.trim().toLowerCase());
  }

  const [rows] = await pool.query<QcItemRow[]>(
    `SELECT
       q.id, q.order_id, q.title, q.finding_type, q.severity, q.state, q.report_no,
       q.observed_at, q.metadata_json, q.created_by, q.approved_by, q.approved_at,
       q.created_at, q.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name,
       o.order_no, o.sale_owner_user_id,
       c.id AS customer_id, c.code AS customer_code, c.name AS customer_name, c.country_code AS customer_country_code,
       f.id AS factory_id, f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM qc_items q
     INNER JOIN trade_orders o ON o.id = q.order_id
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     LEFT JOIN app_users creator ON creator.id = q.created_by
     LEFT JOIN app_users approver ON approver.id = q.approved_by
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY q.created_at DESC, q.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  return rows.map(mapQcItem);
}

export async function createQcItem(input: CreateQcItemInput): Promise<QcItemRecord> {
  const pool = await ensureReady();
  const [insertResult] = await pool.execute<ResultSetHeader>(
    `INSERT INTO qc_items (
      order_id, title, finding_type, severity, state, report_no, observed_at, metadata_json, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.orderId,
      input.title.trim(),
      normalizeOptional(input.findingType)?.toLowerCase() ?? 'general',
      normalizeOptional(input.severity)?.toLowerCase() ?? 'major',
      normalizeOptional(input.state)?.toLowerCase() ?? 'pending_review',
      normalizeOptional(input.reportNo),
      toMysqlDateTime(input.observedAt),
      input.metadata ? JSON.stringify(input.metadata) : null,
      input.createdBy ?? null,
    ],
  );

  const created = await getQcItemById(insertResult.insertId);
  if (!created) {
    throw new Error('Failed to read created QC item.');
  }
  return created;
}

export async function updateQcItem(
  id: number,
  input: UpdateQcItemInput,
): Promise<QcItemRecord | null> {
  const pool = await ensureReady();
  const updateFields: string[] = [];
  const updateValues: Array<string | number | null> = [];

  if (input.title !== undefined) {
    updateFields.push('title = ?');
    updateValues.push(input.title.trim());
  }
  if (input.findingType !== undefined) {
    updateFields.push('finding_type = ?');
    updateValues.push(normalizeOptional(input.findingType)?.toLowerCase() ?? 'general');
  }
  if (input.severity !== undefined) {
    updateFields.push('severity = ?');
    updateValues.push(normalizeOptional(input.severity)?.toLowerCase() ?? 'major');
  }
  if (input.state !== undefined) {
    updateFields.push('state = ?');
    updateValues.push(input.state.trim().toLowerCase());
  }
  if (input.reportNo !== undefined) {
    updateFields.push('report_no = ?');
    updateValues.push(normalizeOptional(input.reportNo));
  }
  if (input.observedAt !== undefined) {
    updateFields.push('observed_at = ?');
    updateValues.push(toMysqlDateTime(input.observedAt));
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
    return getQcItemById(id);
  }

  updateValues.push(id);
  await pool.execute(
    `UPDATE qc_items
     SET ${updateFields.join(', ')}
     WHERE id = ?`,
    updateValues,
  );

  return getQcItemById(id);
}

interface CapaItemRow extends OrderScopeJoinRow, UserAuditJoinRow {
  id: number;
  order_id: number;
  qc_item_id: number | null;
  title: string;
  root_cause: string | null;
  corrective_action: string | null;
  preventive_action: string | null;
  owner_user_id: number | null;
  due_date: string | null;
  state: string;
  metadata_json: string | null;
  created_by: number | null;
  approved_by: number | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CapaItemRecord extends OrderContext {
  id: number;
  orderId: number;
  qcItemId: number | null;
  title: string;
  rootCause: string | null;
  correctiveAction: string | null;
  preventiveAction: string | null;
  ownerUserId: number | null;
  dueDate: string | null;
  state: string;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListCapaItemsInput {
  limit?: number;
  orderNo?: string;
  state?: string;
  ownerUserId?: number;
}

export interface CreateCapaItemInput {
  orderId: number;
  qcItemId?: number | null;
  title: string;
  rootCause?: string | null;
  correctiveAction?: string | null;
  preventiveAction?: string | null;
  ownerUserId?: number | null;
  dueDate?: string | null;
  state?: string;
  metadata?: Record<string, unknown> | null;
  createdBy?: number | null;
}

export interface UpdateCapaItemInput {
  qcItemId?: number | null;
  title?: string;
  rootCause?: string | null;
  correctiveAction?: string | null;
  preventiveAction?: string | null;
  ownerUserId?: number | null;
  dueDate?: string | null;
  state?: string;
  metadata?: Record<string, unknown> | null;
  approvedBy?: number | null;
  approvedAt?: string | null;
}

function mapCapaItem(row: CapaItemRow): CapaItemRecord {
  return {
    id: row.id,
    orderId: row.order_id,
    ...mapOrderContext(row),
    qcItemId: row.qc_item_id,
    title: row.title,
    rootCause: row.root_cause,
    correctiveAction: row.corrective_action,
    preventiveAction: row.preventive_action,
    ownerUserId: row.owner_user_id,
    dueDate: row.due_date,
    state: row.state,
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

async function getCapaRowsByIds(ids: number[]): Promise<CapaItemRow[]> {
  if (ids.length === 0) {
    return [];
  }
  const pool = await ensureReady();
  const placeholders = ids.map(() => '?').join(', ');
  const [rows] = await pool.query<CapaItemRow[]>(
    `SELECT
       cpa.id, cpa.order_id, cpa.qc_item_id, cpa.title, cpa.root_cause, cpa.corrective_action,
       cpa.preventive_action, cpa.owner_user_id, cpa.due_date, cpa.state, cpa.metadata_json,
       cpa.created_by, cpa.approved_by, cpa.approved_at, cpa.created_at, cpa.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name,
       o.order_no, o.sale_owner_user_id,
       c.id AS customer_id, c.code AS customer_code, c.name AS customer_name, c.country_code AS customer_country_code,
       f.id AS factory_id, f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM capa_items cpa
     INNER JOIN trade_orders o ON o.id = cpa.order_id
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     LEFT JOIN app_users creator ON creator.id = cpa.created_by
     LEFT JOIN app_users approver ON approver.id = cpa.approved_by
     WHERE cpa.id IN (${placeholders})
     ORDER BY cpa.created_at DESC, cpa.id DESC`,
    ids,
  );
  return rows;
}

export async function getCapaItemById(id: number): Promise<CapaItemRecord | null> {
  const rows = await getCapaRowsByIds([id]);
  if (rows.length === 0) {
    return null;
  }
  return mapCapaItem(rows[0]);
}

export async function listCapaItems(input: ListCapaItemsInput = {}): Promise<CapaItemRecord[]> {
  const pool = await ensureReady();
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (input.orderNo?.trim()) {
    where.push('o.order_no LIKE ?');
    values.push(`%${normalizeOrderNo(input.orderNo)}%`);
  }
  if (input.state?.trim()) {
    where.push('cpa.state = ?');
    values.push(input.state.trim().toLowerCase());
  }
  if (Number.isInteger(input.ownerUserId) && Number(input.ownerUserId) > 0) {
    where.push('cpa.owner_user_id = ?');
    values.push(Number(input.ownerUserId));
  }

  const [rows] = await pool.query<CapaItemRow[]>(
    `SELECT
       cpa.id, cpa.order_id, cpa.qc_item_id, cpa.title, cpa.root_cause, cpa.corrective_action,
       cpa.preventive_action, cpa.owner_user_id, cpa.due_date, cpa.state, cpa.metadata_json,
       cpa.created_by, cpa.approved_by, cpa.approved_at, cpa.created_at, cpa.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name,
       o.order_no, o.sale_owner_user_id,
       c.id AS customer_id, c.code AS customer_code, c.name AS customer_name, c.country_code AS customer_country_code,
       f.id AS factory_id, f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM capa_items cpa
     INNER JOIN trade_orders o ON o.id = cpa.order_id
     INNER JOIN customers c ON c.id = o.customer_id
     LEFT JOIN factories f ON f.id = o.factory_id
     LEFT JOIN app_users creator ON creator.id = cpa.created_by
     LEFT JOIN app_users approver ON approver.id = cpa.approved_by
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY cpa.created_at DESC, cpa.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  return rows.map(mapCapaItem);
}

export async function createCapaItem(input: CreateCapaItemInput): Promise<CapaItemRecord> {
  const pool = await ensureReady();
  const [insertResult] = await pool.execute<ResultSetHeader>(
    `INSERT INTO capa_items (
      order_id, qc_item_id, title, root_cause, corrective_action, preventive_action,
      owner_user_id, due_date, state, metadata_json, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.orderId,
      input.qcItemId ?? null,
      input.title.trim(),
      normalizeOptional(input.rootCause),
      normalizeOptional(input.correctiveAction),
      normalizeOptional(input.preventiveAction),
      input.ownerUserId ?? null,
      toMysqlDate(input.dueDate),
      normalizeOptional(input.state)?.toLowerCase() ?? 'draft',
      input.metadata ? JSON.stringify(input.metadata) : null,
      input.createdBy ?? null,
    ],
  );

  const created = await getCapaItemById(insertResult.insertId);
  if (!created) {
    throw new Error('Failed to read created CAPA item.');
  }
  return created;
}

export async function updateCapaItem(
  id: number,
  input: UpdateCapaItemInput,
): Promise<CapaItemRecord | null> {
  const pool = await ensureReady();
  const updateFields: string[] = [];
  const updateValues: Array<string | number | null> = [];

  if (input.qcItemId !== undefined) {
    updateFields.push('qc_item_id = ?');
    updateValues.push(input.qcItemId ?? null);
  }
  if (input.title !== undefined) {
    updateFields.push('title = ?');
    updateValues.push(input.title.trim());
  }
  if (input.rootCause !== undefined) {
    updateFields.push('root_cause = ?');
    updateValues.push(normalizeOptional(input.rootCause));
  }
  if (input.correctiveAction !== undefined) {
    updateFields.push('corrective_action = ?');
    updateValues.push(normalizeOptional(input.correctiveAction));
  }
  if (input.preventiveAction !== undefined) {
    updateFields.push('preventive_action = ?');
    updateValues.push(normalizeOptional(input.preventiveAction));
  }
  if (input.ownerUserId !== undefined) {
    updateFields.push('owner_user_id = ?');
    updateValues.push(input.ownerUserId ?? null);
  }
  if (input.dueDate !== undefined) {
    updateFields.push('due_date = ?');
    updateValues.push(toMysqlDate(input.dueDate));
  }
  if (input.state !== undefined) {
    updateFields.push('state = ?');
    updateValues.push(input.state.trim().toLowerCase());
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
    return getCapaItemById(id);
  }

  updateValues.push(id);
  await pool.execute(
    `UPDATE capa_items
     SET ${updateFields.join(', ')}
     WHERE id = ?`,
    updateValues,
  );

  return getCapaItemById(id);
}

interface FactorySurveyRow extends UserAuditJoinRow {
  id: number;
  factory_id: number;
  survey_code: string;
  title: string;
  survey_date: string | null;
  score: string | null;
  state: string;
  summary: string | null;
  metadata_json: string | null;
  created_by: number | null;
  approved_by: number | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  factory_code: string;
  factory_name: string;
  factory_location: string | null;
}

export interface FactorySurveyRecord {
  id: number;
  factory: {
    id: number;
    code: string;
    name: string;
    location: string | null;
  };
  surveyCode: string;
  title: string;
  surveyDate: string | null;
  score: number | null;
  state: string;
  summary: string | null;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListFactorySurveysInput {
  limit?: number;
  factoryCode?: string;
  state?: string;
  surveyCode?: string;
}

export interface CreateFactorySurveyInput {
  factoryId: number;
  surveyCode: string;
  title: string;
  surveyDate?: string | null;
  score?: number | null;
  state?: string;
  summary?: string | null;
  metadata?: Record<string, unknown> | null;
  createdBy?: number | null;
}

export interface UpdateFactorySurveyInput {
  surveyCode?: string;
  title?: string;
  surveyDate?: string | null;
  score?: number | null;
  state?: string;
  summary?: string | null;
  metadata?: Record<string, unknown> | null;
  approvedBy?: number | null;
  approvedAt?: string | null;
}

function mapFactorySurvey(row: FactorySurveyRow): FactorySurveyRecord {
  const score = row.score == null ? null : Number(row.score);
  return {
    id: row.id,
    factory: {
      id: row.factory_id,
      code: row.factory_code,
      name: row.factory_name,
      location: row.factory_location,
    },
    surveyCode: row.survey_code,
    title: row.title,
    surveyDate: row.survey_date,
    score: Number.isFinite(score) ? score : null,
    state: row.state,
    summary: row.summary,
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

async function getFactorySurveyRowsByIds(ids: number[]): Promise<FactorySurveyRow[]> {
  if (ids.length === 0) {
    return [];
  }
  const pool = await ensureReady();
  const placeholders = ids.map(() => '?').join(', ');
  const [rows] = await pool.query<FactorySurveyRow[]>(
    `SELECT
       fs.id, fs.factory_id, fs.survey_code, fs.title, fs.survey_date, fs.score, fs.state,
       fs.summary, fs.metadata_json, fs.created_by, fs.approved_by, fs.approved_at,
       fs.created_at, fs.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name,
       f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM factory_surveys fs
     INNER JOIN factories f ON f.id = fs.factory_id
     LEFT JOIN app_users creator ON creator.id = fs.created_by
     LEFT JOIN app_users approver ON approver.id = fs.approved_by
     WHERE fs.id IN (${placeholders})
     ORDER BY fs.created_at DESC, fs.id DESC`,
    ids,
  );
  return rows;
}

export async function getFactorySurveyById(id: number): Promise<FactorySurveyRecord | null> {
  const rows = await getFactorySurveyRowsByIds([id]);
  if (rows.length === 0) {
    return null;
  }
  return mapFactorySurvey(rows[0]);
}

export async function listFactorySurveys(
  input: ListFactorySurveysInput = {},
): Promise<FactorySurveyRecord[]> {
  const pool = await ensureReady();
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (input.factoryCode?.trim()) {
    where.push('f.code = ?');
    values.push(input.factoryCode.trim().toUpperCase());
  }
  if (input.state?.trim()) {
    where.push('fs.state = ?');
    values.push(input.state.trim().toLowerCase());
  }
  if (input.surveyCode?.trim()) {
    where.push('fs.survey_code LIKE ?');
    values.push(`%${input.surveyCode.trim().toUpperCase()}%`);
  }

  const [rows] = await pool.query<FactorySurveyRow[]>(
    `SELECT
       fs.id, fs.factory_id, fs.survey_code, fs.title, fs.survey_date, fs.score, fs.state,
       fs.summary, fs.metadata_json, fs.created_by, fs.approved_by, fs.approved_at,
       fs.created_at, fs.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name,
       f.code AS factory_code, f.name AS factory_name, f.location AS factory_location
     FROM factory_surveys fs
     INNER JOIN factories f ON f.id = fs.factory_id
     LEFT JOIN app_users creator ON creator.id = fs.created_by
     LEFT JOIN app_users approver ON approver.id = fs.approved_by
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY fs.created_at DESC, fs.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  return rows.map(mapFactorySurvey);
}

export async function createFactorySurvey(
  input: CreateFactorySurveyInput,
): Promise<FactorySurveyRecord> {
  const pool = await ensureReady();
  const [insertResult] = await pool.execute<ResultSetHeader>(
    `INSERT INTO factory_surveys (
      factory_id, survey_code, title, survey_date, score, state, summary, metadata_json, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.factoryId,
      input.surveyCode.trim().toUpperCase(),
      input.title.trim(),
      toMysqlDate(input.surveyDate),
      input.score ?? null,
      normalizeOptional(input.state)?.toLowerCase() ?? 'pending_review',
      normalizeOptional(input.summary),
      input.metadata ? JSON.stringify(input.metadata) : null,
      input.createdBy ?? null,
    ],
  );

  const created = await getFactorySurveyById(insertResult.insertId);
  if (!created) {
    throw new Error('Failed to read created factory survey.');
  }
  return created;
}

export async function updateFactorySurvey(
  id: number,
  input: UpdateFactorySurveyInput,
): Promise<FactorySurveyRecord | null> {
  const pool = await ensureReady();
  const updateFields: string[] = [];
  const updateValues: Array<string | number | null> = [];

  if (input.surveyCode !== undefined) {
    updateFields.push('survey_code = ?');
    updateValues.push(input.surveyCode.trim().toUpperCase());
  }
  if (input.title !== undefined) {
    updateFields.push('title = ?');
    updateValues.push(input.title.trim());
  }
  if (input.surveyDate !== undefined) {
    updateFields.push('survey_date = ?');
    updateValues.push(toMysqlDate(input.surveyDate));
  }
  if (input.score !== undefined) {
    updateFields.push('score = ?');
    updateValues.push(input.score ?? null);
  }
  if (input.state !== undefined) {
    updateFields.push('state = ?');
    updateValues.push(input.state.trim().toLowerCase());
  }
  if (input.summary !== undefined) {
    updateFields.push('summary = ?');
    updateValues.push(normalizeOptional(input.summary));
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
    return getFactorySurveyById(id);
  }

  updateValues.push(id);
  await pool.execute(
    `UPDATE factory_surveys
     SET ${updateFields.join(', ')}
     WHERE id = ?`,
    updateValues,
  );

  return getFactorySurveyById(id);
}

interface SupplierMaterialRow extends UserAuditJoinRow {
  id: number;
  supplier_code: string;
  supplier_name: string;
  material_code: string;
  material_name: string;
  certificate_url: string | null;
  quote_url: string | null;
  state: string;
  metadata_json: string | null;
  created_by: number | null;
  approved_by: number | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupplierMaterialRecord {
  id: number;
  supplierCode: string;
  supplierName: string;
  materialCode: string;
  materialName: string;
  certificateUrl: string | null;
  quoteUrl: string | null;
  state: string;
  metadata: Record<string, unknown> | null;
  createdBy: number | null;
  createdByName: string | null;
  approvedBy: number | null;
  approvedByName: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListSupplierMaterialsInput {
  limit?: number;
  supplierCode?: string;
  materialCode?: string;
  state?: string;
}

export interface CreateSupplierMaterialInput {
  supplierCode: string;
  supplierName: string;
  materialCode: string;
  materialName: string;
  certificateUrl?: string | null;
  quoteUrl?: string | null;
  state?: string;
  metadata?: Record<string, unknown> | null;
  createdBy?: number | null;
}

export interface UpdateSupplierMaterialInput {
  supplierCode?: string;
  supplierName?: string;
  materialCode?: string;
  materialName?: string;
  certificateUrl?: string | null;
  quoteUrl?: string | null;
  state?: string;
  metadata?: Record<string, unknown> | null;
  approvedBy?: number | null;
  approvedAt?: string | null;
}

function mapSupplierMaterial(row: SupplierMaterialRow): SupplierMaterialRecord {
  return {
    id: row.id,
    supplierCode: row.supplier_code,
    supplierName: row.supplier_name,
    materialCode: row.material_code,
    materialName: row.material_name,
    certificateUrl: row.certificate_url,
    quoteUrl: row.quote_url,
    state: row.state,
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

async function getSupplierMaterialRowsByIds(ids: number[]): Promise<SupplierMaterialRow[]> {
  if (ids.length === 0) {
    return [];
  }
  const pool = await ensureReady();
  const placeholders = ids.map(() => '?').join(', ');
  const [rows] = await pool.query<SupplierMaterialRow[]>(
    `SELECT
       sm.id, sm.supplier_code, sm.supplier_name, sm.material_code, sm.material_name,
       sm.certificate_url, sm.quote_url, sm.state, sm.metadata_json, sm.created_by, sm.approved_by,
       sm.approved_at, sm.created_at, sm.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name
     FROM supplier_material_items sm
     LEFT JOIN app_users creator ON creator.id = sm.created_by
     LEFT JOIN app_users approver ON approver.id = sm.approved_by
     WHERE sm.id IN (${placeholders})
     ORDER BY sm.created_at DESC, sm.id DESC`,
    ids,
  );
  return rows;
}

export async function getSupplierMaterialById(id: number): Promise<SupplierMaterialRecord | null> {
  const rows = await getSupplierMaterialRowsByIds([id]);
  if (rows.length === 0) {
    return null;
  }
  return mapSupplierMaterial(rows[0]);
}

export async function listSupplierMaterials(
  input: ListSupplierMaterialsInput = {},
): Promise<SupplierMaterialRecord[]> {
  const pool = await ensureReady();
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (input.supplierCode?.trim()) {
    where.push('sm.supplier_code = ?');
    values.push(input.supplierCode.trim().toUpperCase());
  }
  if (input.materialCode?.trim()) {
    where.push('sm.material_code = ?');
    values.push(input.materialCode.trim().toUpperCase());
  }
  if (input.state?.trim()) {
    where.push('sm.state = ?');
    values.push(input.state.trim().toLowerCase());
  }

  const [rows] = await pool.query<SupplierMaterialRow[]>(
    `SELECT
       sm.id, sm.supplier_code, sm.supplier_name, sm.material_code, sm.material_name,
       sm.certificate_url, sm.quote_url, sm.state, sm.metadata_json, sm.created_by, sm.approved_by,
       sm.approved_at, sm.created_at, sm.updated_at,
       creator.full_name AS created_by_name,
       approver.full_name AS approved_by_name
     FROM supplier_material_items sm
     LEFT JOIN app_users creator ON creator.id = sm.created_by
     LEFT JOIN app_users approver ON approver.id = sm.approved_by
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY sm.created_at DESC, sm.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  return rows.map(mapSupplierMaterial);
}

export async function createSupplierMaterial(
  input: CreateSupplierMaterialInput,
): Promise<SupplierMaterialRecord> {
  const pool = await ensureReady();
  const [insertResult] = await pool.execute<ResultSetHeader>(
    `INSERT INTO supplier_material_items (
      supplier_code, supplier_name, material_code, material_name,
      certificate_url, quote_url, state, metadata_json, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.supplierCode.trim().toUpperCase(),
      input.supplierName.trim(),
      input.materialCode.trim().toUpperCase(),
      input.materialName.trim(),
      normalizeOptional(input.certificateUrl),
      normalizeOptional(input.quoteUrl),
      normalizeOptional(input.state)?.toLowerCase() ?? 'pending_review',
      input.metadata ? JSON.stringify(input.metadata) : null,
      input.createdBy ?? null,
    ],
  );

  const created = await getSupplierMaterialById(insertResult.insertId);
  if (!created) {
    throw new Error('Failed to read created supplier material.');
  }
  return created;
}

export async function updateSupplierMaterial(
  id: number,
  input: UpdateSupplierMaterialInput,
): Promise<SupplierMaterialRecord | null> {
  const pool = await ensureReady();
  const updateFields: string[] = [];
  const updateValues: Array<string | number | null> = [];

  if (input.supplierCode !== undefined) {
    updateFields.push('supplier_code = ?');
    updateValues.push(input.supplierCode.trim().toUpperCase());
  }
  if (input.supplierName !== undefined) {
    updateFields.push('supplier_name = ?');
    updateValues.push(input.supplierName.trim());
  }
  if (input.materialCode !== undefined) {
    updateFields.push('material_code = ?');
    updateValues.push(input.materialCode.trim().toUpperCase());
  }
  if (input.materialName !== undefined) {
    updateFields.push('material_name = ?');
    updateValues.push(input.materialName.trim());
  }
  if (input.certificateUrl !== undefined) {
    updateFields.push('certificate_url = ?');
    updateValues.push(normalizeOptional(input.certificateUrl));
  }
  if (input.quoteUrl !== undefined) {
    updateFields.push('quote_url = ?');
    updateValues.push(normalizeOptional(input.quoteUrl));
  }
  if (input.state !== undefined) {
    updateFields.push('state = ?');
    updateValues.push(input.state.trim().toLowerCase());
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
    return getSupplierMaterialById(id);
  }

  updateValues.push(id);
  await pool.execute(
    `UPDATE supplier_material_items
     SET ${updateFields.join(', ')}
     WHERE id = ?`,
    updateValues,
  );

  return getSupplierMaterialById(id);
}
