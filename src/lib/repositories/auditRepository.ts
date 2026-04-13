import type { RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface AuditLogRow extends RowDataPacket {
  id: number;
  actor_user_id: number | null;
  actor_name: string | null;
  action: string;
  resource: string;
  resource_id: string;
  before_json: string | null;
  after_json: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface AuditLogInput {
  actorUserId?: number | null;
  action: string;
  resource: string;
  resourceId: string;
  before?: unknown;
  after?: unknown;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface AuditLogRecord {
  id: number;
  actorUserId: number | null;
  actorName: string | null;
  action: string;
  resource: string;
  resourceId: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface ListAuditLogsInput {
  limit?: number;
  action?: string;
  resource?: string;
  resourceId?: string;
  actorUserId?: number;
}

function toIso(value: string): string {
  return new Date(value).toISOString();
}

function parseObjectJson(value: string | null): Record<string, unknown> | null {
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

function mapRowToAuditLog(row: AuditLogRow): AuditLogRecord {
  return {
    id: row.id,
    actorUserId: row.actor_user_id,
    actorName: row.actor_name,
    action: row.action,
    resource: row.resource,
    resourceId: row.resource_id,
    before: parseObjectJson(row.before_json),
    after: parseObjectJson(row.after_json),
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
    createdAt: toIso(row.created_at),
  };
}

function normalizeLimit(limit: number | undefined): number {
  const parsed = Number(limit ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }
  return Math.min(500, Math.max(1, Math.floor(parsed)));
}

async function ensureReady() {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const ready = await ensureDatabaseSchema();
  if (!ready) {
    return null;
  }

  return getDbPool();
}

export async function writeAuditLog(input: AuditLogInput): Promise<void> {
  const pool = await ensureReady();
  if (!pool) {
    return;
  }

  await pool.execute(
    `INSERT INTO audit_logs (
      actor_user_id, action, resource, resource_id,
      before_json, after_json, ip_address, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.actorUserId ?? null,
      input.action,
      input.resource,
      input.resourceId,
      input.before ? JSON.stringify(input.before) : null,
      input.after ? JSON.stringify(input.after) : null,
      input.ipAddress ?? null,
      input.userAgent ?? null,
    ],
  );
}

export async function listAuditLogs(
  input: ListAuditLogsInput = {},
): Promise<AuditLogRecord[]> {
  const pool = await ensureReady();
  if (!pool) {
    return [];
  }

  const where: string[] = [];
  const values: Array<number | string> = [];

  if (input.action?.trim()) {
    where.push('l.action = ?');
    values.push(input.action.trim().toLowerCase());
  }
  if (input.resource?.trim()) {
    where.push('l.resource = ?');
    values.push(input.resource.trim().toLowerCase());
  }
  if (input.resourceId?.trim()) {
    where.push('l.resource_id LIKE ?');
    values.push(`%${input.resourceId.trim()}%`);
  }
  if (Number.isInteger(input.actorUserId) && Number(input.actorUserId) > 0) {
    where.push('l.actor_user_id = ?');
    values.push(Number(input.actorUserId));
  }

  const [rows] = await pool.query<AuditLogRow[]>(
    `SELECT
       l.id, l.actor_user_id, l.action, l.resource, l.resource_id,
       l.before_json, l.after_json, l.ip_address, l.user_agent, l.created_at,
       u.full_name AS actor_name
     FROM audit_logs l
     LEFT JOIN app_users u ON u.id = l.actor_user_id
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY l.created_at DESC, l.id DESC
     LIMIT ?`,
    [...values, normalizeLimit(input.limit)],
  );

  return rows.map(mapRowToAuditLog);
}
