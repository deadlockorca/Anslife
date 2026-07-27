import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';
import type { ActorScope, AppRole } from '../auth/authorization';

interface UserAuthRow extends RowDataPacket {
  id: number;
  email: string;
  password_hash: string;
  full_name: string;
  is_active: number;
  roles_json: string | null;
  scopes_json: string | null;
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

let userAccessColumnsReady = false;

function parseStoredRoles(value: string | null): AppRole[] {
  if (!value) {
    return [...DEFAULT_ADMIN_ROLES];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [...DEFAULT_ADMIN_ROLES];
    }

    const roles = parsed.filter((item): item is AppRole =>
      typeof item === 'string',
    );
    return roles.length > 0 ? roles : [...DEFAULT_ADMIN_ROLES];
  } catch {
    return [...DEFAULT_ADMIN_ROLES];
  }
}

function parseStoredScopes(value: string | null): ActorScope[] {
  if (!value) {
    return [...DEFAULT_ADMIN_SCOPES];
  }

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) {
      return [...DEFAULT_ADMIN_SCOPES];
    }

    const scopes = parsed.filter((item): item is ActorScope => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        return false;
      }

      const candidate = item as Partial<ActorScope>;
      return typeof candidate.type === 'string' && typeof candidate.value === 'string';
    });
    return scopes.length > 0 ? scopes : [...DEFAULT_ADMIN_SCOPES];
  } catch {
    return [...DEFAULT_ADMIN_SCOPES];
  }
}

function mapUserProfile(row: UserAuthRow): UserProfile {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    isActive: row.is_active === 1,
    roles: parseStoredRoles(row.roles_json),
    scopes: parseStoredScopes(row.scopes_json),
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

function mapUserAuthContext(row: UserAuthRow): UserAuthContext {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    fullName: row.full_name,
    isActive: row.is_active === 1,
    roles: parseStoredRoles(row.roles_json),
    scopes: parseStoredScopes(row.scopes_json),
  };
}

async function ensureUserAccessColumns(pool: Awaited<ReturnType<typeof ensureReady>>) {
  if (userAccessColumnsReady) {
    return;
  }

  const [rolesColumns] = await pool.query<RowDataPacket[]>(
    `SHOW COLUMNS FROM app_users LIKE 'roles_json'`,
  );
  if (rolesColumns.length === 0) {
    await pool.execute(`ALTER TABLE app_users ADD COLUMN roles_json TEXT NULL AFTER is_active`);
  }

  const [scopesColumns] = await pool.query<RowDataPacket[]>(
    `SHOW COLUMNS FROM app_users LIKE 'scopes_json'`,
  );
  if (scopesColumns.length === 0) {
    await pool.execute(`ALTER TABLE app_users ADD COLUMN scopes_json TEXT NULL AFTER roles_json`);
  }

  userAccessColumnsReady = true;
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

export async function getUserAuthContextByEmail(
  email: string,
): Promise<UserAuthContext | null> {
  const pool = await ensureReady();
  await ensureUserAccessColumns(pool);
  const normalizedEmail = normalizeEmail(email);
  const [rows] = await pool.query<UserAuthRow[]>(
    `SELECT id, email, password_hash, full_name, is_active, roles_json, scopes_json, created_at, updated_at
     FROM app_users
     WHERE email = ?
     LIMIT 1`,
    [normalizedEmail],
  );

  const user = rows[0];
  if (!user) {
    return null;
  }

  return mapUserAuthContext(user);
}

export async function getUserAuthContextById(
  userId: number,
): Promise<UserAuthContext | null> {
  const pool = await ensureReady();
  await ensureUserAccessColumns(pool);
  const [rows] = await pool.query<UserAuthRow[]>(
    `SELECT id, email, password_hash, full_name, is_active, roles_json, scopes_json, created_at, updated_at
     FROM app_users
     WHERE id = ?
     LIMIT 1`,
    [userId],
  );

  const user = rows[0];
  if (!user) {
    return null;
  }

  return mapUserAuthContext(user);
}

export async function touchUserLastLogin(userId: number): Promise<void> {
  const pool = await ensureReady();
  await ensureUserAccessColumns(pool);
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
  await ensureUserAccessColumns(pool);
  const [rows] = await pool.query<UserAuthRow[]>(
    `SELECT id, email, password_hash, full_name, is_active, roles_json, scopes_json, created_at, updated_at
     FROM app_users
     ORDER BY created_at DESC, id DESC`,
  );

  if (rows.length === 0) {
    return [];
  }

  return rows.map((row) => mapUserProfile(row));
}

export async function createUser(input: CreateUserInput): Promise<UserProfile> {
  const pool = await ensureReady();
  await ensureUserAccessColumns(pool);
  const normalizedEmail = normalizeEmail(input.email);
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [insertResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO app_users (email, password_hash, full_name, is_active, roles_json, scopes_json, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        normalizedEmail,
        input.passwordHash,
        input.fullName.trim(),
        input.isActive === false ? 0 : 1,
        JSON.stringify(input.roles.length > 0 ? input.roles : DEFAULT_ADMIN_ROLES),
        JSON.stringify(input.scopes && input.scopes.length > 0 ? input.scopes : DEFAULT_ADMIN_SCOPES),
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
  await ensureUserAccessColumns(pool);
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
    if (Array.isArray(input.roles)) {
      updateFields.push('roles_json = ?');
      updateValues.push(
        JSON.stringify(input.roles.length > 0 ? input.roles : DEFAULT_ADMIN_ROLES),
      );
    }
    if (Array.isArray(input.scopes)) {
      updateFields.push('scopes_json = ?');
      updateValues.push(
        JSON.stringify(input.scopes.length > 0 ? input.scopes : DEFAULT_ADMIN_SCOPES),
      );
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

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  const pool2 = await ensureReady();
  await ensureUserAccessColumns(pool2);
  const [rows] = await pool2.query<UserAuthRow[]>(
    `SELECT id, email, password_hash, full_name, is_active, roles_json, scopes_json, created_at, updated_at
     FROM app_users
     WHERE id = ?
     LIMIT 1`,
    [userId],
  );
  const row = rows[0];
  if (!row) {
    return null;
  }

  return mapUserProfile(row);
}

export async function deleteUser(userId: number): Promise<boolean> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM app_users WHERE id = ?`,
    [userId],
  );

  return result.affectedRows > 0;
}
