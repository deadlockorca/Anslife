import type { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface DataShareLinkRow extends RowDataPacket {
  id: number;
  data_item_id: number;
  token: string;
  expires_at: string | null;
  created_by: number | null;
  created_by_name: string | null;
  created_at: string;
}

export interface DataShareLinkRecord {
  id: number;
  dataItemId: number;
  token: string;
  expiresAt: string | null;
  createdBy: number | null;
  createdByName: string | null;
  createdAt: string;
}

export interface CreateDataShareLinkInput {
  dataItemId: number;
  token: string;
  createdBy?: number | null;
  expiresAt?: string | null;
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
    throw new Error('Invalid expires_at datetime.');
  }

  return parsed.toISOString().slice(0, 19).replace('T', ' ');
}

function mapRowToDataShareLink(row: DataShareLinkRow): DataShareLinkRecord {
  return {
    id: row.id,
    dataItemId: row.data_item_id,
    token: row.token,
    expiresAt: row.expires_at ? toIso(row.expires_at) : null,
    createdBy: row.created_by,
    createdByName: row.created_by_name,
    createdAt: toIso(row.created_at),
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

async function getRowsByIds(ids: number[]): Promise<DataShareLinkRow[]> {
  if (ids.length === 0) {
    return [];
  }

  const pool = await ensureReady();
  const placeholders = ids.map(() => '?').join(', ');
  const [rows] = await pool.query<DataShareLinkRow[]>(
    `SELECT
       l.id, l.data_item_id, l.token, l.expires_at, l.created_by, l.created_at,
       u.full_name AS created_by_name
     FROM data_share_links l
     LEFT JOIN app_users u ON u.id = l.created_by
     WHERE l.id IN (${placeholders})
     ORDER BY l.created_at DESC, l.id DESC`,
    ids,
  );

  return rows;
}

export async function getDataShareLinkById(id: number): Promise<DataShareLinkRecord | null> {
  const rows = await getRowsByIds([id]);
  if (rows.length === 0) {
    return null;
  }

  return mapRowToDataShareLink(rows[0]);
}

export async function getDataShareLinkByToken(
  token: string,
): Promise<DataShareLinkRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<DataShareLinkRow[]>(
    `SELECT
       l.id, l.data_item_id, l.token, l.expires_at, l.created_by, l.created_at,
       u.full_name AS created_by_name
     FROM data_share_links l
     LEFT JOIN app_users u ON u.id = l.created_by
     WHERE l.token = ?
     LIMIT 1`,
    [token],
  );

  if (rows.length === 0) {
    return null;
  }

  return mapRowToDataShareLink(rows[0]);
}

export async function listDataShareLinksByDataItemId(
  dataItemId: number,
  limit = 50,
): Promise<DataShareLinkRecord[]> {
  const parsedLimit = Math.min(200, Math.max(1, Math.floor(Number(limit) || 50)));
  const pool = await ensureReady();
  const [rows] = await pool.query<DataShareLinkRow[]>(
    `SELECT
       l.id, l.data_item_id, l.token, l.expires_at, l.created_by, l.created_at,
       u.full_name AS created_by_name
     FROM data_share_links l
     LEFT JOIN app_users u ON u.id = l.created_by
     WHERE l.data_item_id = ?
     ORDER BY l.created_at DESC, l.id DESC
     LIMIT ?`,
    [dataItemId, parsedLimit],
  );

  return rows.map(mapRowToDataShareLink);
}

export async function createDataShareLink(
  input: CreateDataShareLinkInput,
): Promise<DataShareLinkRecord> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO data_share_links (
      data_item_id, token, expires_at, created_by
    ) VALUES (?, ?, ?, ?)`,
    [
      input.dataItemId,
      input.token,
      toMysqlDateTime(input.expiresAt ?? null),
      input.createdBy ?? null,
    ],
  );

  const created = await getDataShareLinkById(Number(result.insertId));
  if (!created) {
    throw new Error('Failed to fetch created data share link.');
  }

  return created;
}

export async function deleteDataShareLinkById(id: number): Promise<boolean> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM data_share_links WHERE id = ?`,
    [id],
  );

  return result.affectedRows > 0;
}
