import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface CustomerRow extends RowDataPacket {
  id: number;
  code: string;
  name: string;
  country_code: string | null;
  created_at: string;
  updated_at: string;
}

interface FactoryRow extends RowDataPacket {
  id: number;
  code: string;
  name: string;
  location: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerRecord {
  id: number;
  code: string;
  name: string;
  countryCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FactoryRecord {
  id: number;
  code: string;
  name: string;
  location: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerInput {
  code: string;
  name: string;
  countryCode?: string | null;
}

export interface UpdateCustomerInput {
  code?: string;
  name?: string;
  countryCode?: string | null;
}

export interface CreateFactoryInput {
  code: string;
  name: string;
  location?: string | null;
}

export interface UpdateFactoryInput {
  code?: string;
  name?: string;
  location?: string | null;
}

function normalizeLimit(limit: number | undefined, fallback = 100): number {
  const parsed = Number(limit ?? fallback);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function normalizeCode(value: string): string {
  return value.trim().toUpperCase();
}

function normalizeOptional(value: string | null | undefined): string | null {
  if (value == null) {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function mapCustomer(row: CustomerRow): CustomerRecord {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    countryCode: row.country_code,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

function mapFactory(row: FactoryRow): FactoryRecord {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    location: row.location,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
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

export async function listCustomers(limit?: number): Promise<CustomerRecord[]> {
  const pool = await ensureReady();
  const [rows] = await pool.query<CustomerRow[]>(
    `SELECT id, code, name, country_code, created_at, updated_at
     FROM customers
     ORDER BY created_at DESC, id DESC
     LIMIT ?`,
    [normalizeLimit(limit)],
  );

  return rows.map(mapCustomer);
}

export async function getCustomerById(id: number): Promise<CustomerRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<CustomerRow[]>(
    `SELECT id, code, name, country_code, created_at, updated_at
     FROM customers
     WHERE id = ?
     LIMIT 1`,
    [id],
  );
  const customer = rows[0];
  return customer ? mapCustomer(customer) : null;
}

export async function getCustomerByCode(code: string): Promise<CustomerRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<CustomerRow[]>(
    `SELECT id, code, name, country_code, created_at, updated_at
     FROM customers
     WHERE code = ?
     LIMIT 1`,
    [normalizeCode(code)],
  );
  const customer = rows[0];
  return customer ? mapCustomer(customer) : null;
}

export async function createCustomer(input: CreateCustomerInput): Promise<CustomerRecord> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO customers (code, name, country_code)
     VALUES (?, ?, ?)`,
    [normalizeCode(input.code), input.name.trim(), normalizeOptional(input.countryCode)],
  );

  const created = await getCustomerById(result.insertId);
  if (!created) {
    throw new Error('Failed to read created customer.');
  }

  return created;
}

export async function updateCustomer(
  id: number,
  input: UpdateCustomerInput,
): Promise<CustomerRecord | null> {
  const pool = await ensureReady();
  const updateFields: string[] = [];
  const updateValues: Array<string | number | null> = [];

  if (typeof input.code === 'string') {
    updateFields.push('code = ?');
    updateValues.push(normalizeCode(input.code));
  }
  if (typeof input.name === 'string') {
    updateFields.push('name = ?');
    updateValues.push(input.name.trim());
  }
  if (input.countryCode !== undefined) {
    updateFields.push('country_code = ?');
    updateValues.push(normalizeOptional(input.countryCode));
  }

  if (updateFields.length === 0) {
    return getCustomerById(id);
  }

  updateValues.push(id);
  await pool.execute(
    `UPDATE customers
     SET ${updateFields.join(', ')}
     WHERE id = ?`,
    updateValues,
  );

  return getCustomerById(id);
}

export async function listFactories(limit?: number): Promise<FactoryRecord[]> {
  const pool = await ensureReady();
  const [rows] = await pool.query<FactoryRow[]>(
    `SELECT id, code, name, location, created_at, updated_at
     FROM factories
     ORDER BY created_at DESC, id DESC
     LIMIT ?`,
    [normalizeLimit(limit)],
  );

  return rows.map(mapFactory);
}

export async function getFactoryById(id: number): Promise<FactoryRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<FactoryRow[]>(
    `SELECT id, code, name, location, created_at, updated_at
     FROM factories
     WHERE id = ?
     LIMIT 1`,
    [id],
  );
  const factory = rows[0];
  return factory ? mapFactory(factory) : null;
}

export async function getFactoryByCode(code: string): Promise<FactoryRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<FactoryRow[]>(
    `SELECT id, code, name, location, created_at, updated_at
     FROM factories
     WHERE code = ?
     LIMIT 1`,
    [normalizeCode(code)],
  );
  const factory = rows[0];
  return factory ? mapFactory(factory) : null;
}

export async function createFactory(input: CreateFactoryInput): Promise<FactoryRecord> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO factories (code, name, location)
     VALUES (?, ?, ?)`,
    [normalizeCode(input.code), input.name.trim(), normalizeOptional(input.location)],
  );

  const created = await getFactoryById(result.insertId);
  if (!created) {
    throw new Error('Failed to read created factory.');
  }

  return created;
}

export async function updateFactory(
  id: number,
  input: UpdateFactoryInput,
): Promise<FactoryRecord | null> {
  const pool = await ensureReady();
  const updateFields: string[] = [];
  const updateValues: Array<string | number | null> = [];

  if (typeof input.code === 'string') {
    updateFields.push('code = ?');
    updateValues.push(normalizeCode(input.code));
  }
  if (typeof input.name === 'string') {
    updateFields.push('name = ?');
    updateValues.push(input.name.trim());
  }
  if (input.location !== undefined) {
    updateFields.push('location = ?');
    updateValues.push(normalizeOptional(input.location));
  }

  if (updateFields.length === 0) {
    return getFactoryById(id);
  }

  updateValues.push(id);
  await pool.execute(
    `UPDATE factories
     SET ${updateFields.join(', ')}
     WHERE id = ?`,
    updateValues,
  );

  return getFactoryById(id);
}
