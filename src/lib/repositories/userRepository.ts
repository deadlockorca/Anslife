import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';
import type { ActorScope, AppRole } from '../auth/authorization';

interface UserAuthRow extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
  full_name: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface UserAuthContext {
  id: number;
  email: string;
  passwordHash: string;
  fullName: string;
  isActive: boolean;
  roles: AppRole[];
  scopes: ActorScope[];
}

export interface UserProfile {
  id: number;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: AppRole[];
  scopes: ActorScope[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  fullName: string;
  passwordHash: string;
  isActive?: boolean;
  roles: AppRole[];
  scopes?: ActorScope[];
}

export interface UpdateUserInput {
  fullName?: string;
  passwordHash?: string;
  isActive?: boolean;
  roles?: AppRole[];
  scopes?: ActorScope[];
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

const DEFAULT_ADMIN_ROLES: AppRole[] = ['super_admin'];
const DEFAULT_ADMIN_SCOPES: ActorScope[] = [{ type: 'global', value: '*' }];

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

export async function getUserAuthContextByEmail(
  email: string,
): Promise<UserAuthContext | null> {
  const pool = await ensureReady();
  const normalizedEmail = normalizeEmail(email);
  const [rows] = await pool.query<UserAuthRow[]>(
    `SELECT id, email, password_hash, full_name, is_active, created_at, updated_at
     FROM app_users
     WHERE email = ?
     LIMIT 1`,
    [normalizedEmail],
  );

  const user = rows[0];
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    passwordHash: user.password_hash,
    fullName: user.full_name,
    isActive: user.is_active === 1,
    roles: [...DEFAULT_ADMIN_ROLES],
    scopes: [...DEFAULT_ADMIN_SCOPES],
  };
}

export async function getUserAuthContextById(
  userId: number,
): Promise<UserAuthContext | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<UserAuthRow[]>(
    `SELECT id, email, password_hash, full_name, is_active, created_at, updated_at
     FROM app_users
     WHERE id = ?
     LIMIT 1`,
    [userId],
  );

  const user = rows[0];
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    passwordHash: user.password_hash,
    fullName: user.full_name,
    isActive: user.is_active === 1,
    roles: [...DEFAULT_ADMIN_ROLES],
    scopes: [...DEFAULT_ADMIN_SCOPES],
  };
}

export async function touchUserLastLogin(userId: number): Promise<void> {
  const pool = await ensureReady();
  await pool.execute(
    `UPDATE app_users
     SET last_login_at = CURRENT_TIMESTAMP,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [userId],
  );
}

export async function listUsers(): Promise<UserProfile[]> {
  const pool = await ensureReady();
  const [rows] = await pool.query<UserAuthRow[]>(
    `SELECT id, email, password_hash, full_name, is_active, created_at, updated_at
     FROM app_users
     ORDER BY created_at DESC, id DESC`,
  );

  if (rows.length === 0) {
    return [];
  }

  return rows.map((row) => ({
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    isActive: row.is_active === 1,
    roles: [...DEFAULT_ADMIN_ROLES],
    scopes: [...DEFAULT_ADMIN_SCOPES],
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  }));
}

export async function createUser(input: CreateUserInput): Promise<UserProfile> {
  const pool = await ensureReady();
  const normalizedEmail = normalizeEmail(input.email);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [insertResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO app_users (email, password_hash, full_name, is_active, updated_at)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        normalizedEmail,
        input.passwordHash,
        input.fullName.trim(),
        input.isActive === false ? 0 : 1,
      ],
    );

    const userId = insertResult.insertId;

    await connection.commit();

    const createdUser = await getUserAuthContextById(userId);
    if (!createdUser) {
      throw new Error('Failed to read created user.');
    }

    return {
      id: createdUser.id,
      email: createdUser.email,
      fullName: createdUser.fullName,
      isActive: createdUser.isActive,
      roles: createdUser.roles,
      scopes: createdUser.scopes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function updateUser(
  userId: number,
  input: UpdateUserInput,
): Promise<UserProfile | null> {
  const pool = await ensureReady();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const updateFields: string[] = [];
    const updateValues: Array<string | number> = [];

    if (typeof input.fullName === 'string') {
      updateFields.push('full_name = ?');
      updateValues.push(input.fullName.trim());
    }
    if (typeof input.passwordHash === 'string') {
      updateFields.push('password_hash = ?');
      updateValues.push(input.passwordHash);
    }
    if (typeof input.isActive === 'boolean') {
      updateFields.push('is_active = ?');
      updateValues.push(input.isActive ? 1 : 0);
    }

    if (updateFields.length > 0) {
      updateFields.push('updated_at = CURRENT_TIMESTAMP');
      updateValues.push(userId);
      await connection.execute(
        `UPDATE app_users
         SET ${updateFields.join(', ')}
         WHERE id = ?`,
        updateValues,
      );
    }

    // Single-admin mode: role/scope persistence is disabled.

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  const pool2 = await ensureReady();
  const [rows] = await pool2.query<UserAuthRow[]>(
    `SELECT id, email, password_hash, full_name, is_active, created_at, updated_at
     FROM app_users
     WHERE id = ?
     LIMIT 1`,
    [userId],
  );
  const row = rows[0];
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    isActive: row.is_active === 1,
    roles: [...DEFAULT_ADMIN_ROLES],
    scopes: [...DEFAULT_ADMIN_SCOPES],
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

export async function deleteUser(userId: number): Promise<boolean> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM app_users WHERE id = ?`,
    [userId],
  );

  return result.affectedRows > 0;
}
