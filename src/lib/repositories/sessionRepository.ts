import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface UserSessionRow extends RowDataPacket {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: string;
}

export interface UserSessionRecord {
  id: number;
  userId: number;
  tokenHash: string;
  expiresAt: Date;
}

interface CreateUserSessionInput {
  userId: number;
  tokenHash: string;
  expiresAt: Date;
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

export async function createUserSession(input: CreateUserSessionInput): Promise<void> {
  const pool = await ensureReady();
  await pool.execute(
    `INSERT INTO app_user_sessions (user_id, token_hash, expires_at, updated_at)
     VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
    [input.userId, input.tokenHash, input.expiresAt],
  );
}

export async function getUserSessionByTokenHash(
  tokenHash: string,
): Promise<UserSessionRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<UserSessionRow[]>(
    `SELECT id, user_id, token_hash, expires_at
     FROM app_user_sessions
     WHERE token_hash = ?
     LIMIT 1`,
    [tokenHash],
  );

  const row = rows[0];
  if (!row) {
    return null;
  }

  const expiresAt = new Date(row.expires_at);
  if (Number.isNaN(expiresAt.getTime()) || expiresAt.getTime() <= Date.now()) {
    await pool.execute(`DELETE FROM app_user_sessions WHERE id = ?`, [row.id]);
    return null;
  }

  return {
    id: row.id,
    userId: row.user_id,
    tokenHash: row.token_hash,
    expiresAt,
  };
}

export async function deleteUserSessionByTokenHash(tokenHash: string): Promise<void> {
  const pool = await ensureReady();
  await pool.execute(`DELETE FROM app_user_sessions WHERE token_hash = ?`, [tokenHash]);
}

export async function deleteExpiredUserSessions(): Promise<number> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM app_user_sessions WHERE expires_at <= CURRENT_TIMESTAMP`,
  );
  return result.affectedRows;
}
