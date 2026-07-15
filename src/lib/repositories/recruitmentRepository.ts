import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

export type RecruitmentStatus = 'open' | 'paused';

interface RecruitmentJobRow extends RowDataPacket {
  id: number;
  group_code: string;
  group_title: string;
  group_body: string | null;
  market_name: string;
  market_status: RecruitmentStatus;
  title: string;
  summary: string;
  description: string | null;
  requirements_json: string | null;
  benefits_json: string | null;
  location: string | null;
  work_type: string | null;
  status: RecruitmentStatus;
  sort_order: number;
  is_public: number;
  created_at: string;
  updated_at: string;
}

interface RecruitmentApplicationRow extends RowDataPacket {
  id: number;
  job_id: number | null;
  job_title: string | null;
  career_group: string | null;
  career_market: string | null;
  career_status: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  country_region: string | null;
  cv_link: string | null;
  latest_experience: string | null;
  message: string | null;
  payload_json: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface RecruitmentJobRecord {
  id: number;
  groupCode: string;
  groupTitle: string;
  groupBody: string | null;
  marketName: string;
  marketStatus: RecruitmentStatus;
  title: string;
  summary: string;
  description: string | null;
  requirements: string[];
  benefits: string[];
  location: string | null;
  workType: string | null;
  status: RecruitmentStatus;
  sortOrder: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitmentApplicationRecord {
  id: number;
  jobId: number | null;
  jobTitle: string | null;
  careerGroup: string | null;
  careerMarket: string | null;
  careerStatus: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  countryRegion: string | null;
  cvLink: string | null;
  latestExperience: string | null;
  message: string | null;
  payload: Record<string, string> | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecruitmentJobInput {
  groupCode: string;
  groupTitle: string;
  groupBody?: string | null;
  marketName: string;
  marketStatus?: RecruitmentStatus;
  title: string;
  summary: string;
  description?: string | null;
  requirements?: string[];
  benefits?: string[];
  location?: string | null;
  workType?: string | null;
  status?: RecruitmentStatus;
  sortOrder?: number;
  isPublic?: boolean;
}

export type UpdateRecruitmentJobInput = Partial<CreateRecruitmentJobInput>;

export interface ListRecruitmentJobsInput {
  includeHidden?: boolean;
  status?: RecruitmentStatus | 'all';
  limit?: number;
}

const RECRUITMENT_STATUS_VALUES = new Set<RecruitmentStatus>([
  'open',
  'paused',
]);

let recruitmentSchemaReady = false;

function isRecruitmentStatus(value: string): value is RecruitmentStatus {
  return RECRUITMENT_STATUS_VALUES.has(value as RecruitmentStatus);
}

function normalizeStatus(value: string | null | undefined, fallback: RecruitmentStatus): RecruitmentStatus {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (normalized === 'receiving') {
    return 'open';
  }
  if (normalized === 'closed') {
    return 'paused';
  }
  return isRecruitmentStatus(normalized) ? normalized : fallback;
}

function normalizeLimit(limit: number | undefined, fallback = 200): number {
  const parsed = Number(limit ?? fallback);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(500, Math.max(1, Math.floor(parsed)));
}

function normalizeOptional(value: string | null | undefined, maxLength?: number): string | null {
  if (value == null) {
    return null;
  }

  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  return maxLength ? normalized.slice(0, maxLength) : normalized;
}

function normalizeRequired(value: string, fieldName: string, maxLength: number): string {
  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) {
    throw new Error(`${fieldName} is invalid.`);
  }

  return normalized;
}

function parseStringArray(value: string | null): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) => String(item ?? '').trim()).filter(Boolean);
  } catch {
    return [];
  }
}

function parsePayload(value: string | null): Record<string, string> | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return null;
    }

    return Object.fromEntries(
      Object.entries(parsed).map(([key, item]) => [key, String(item ?? '')]),
    );
  } catch {
    return null;
  }
}

function serializeStringArray(value: string[] | undefined): string {
  return JSON.stringify((value ?? []).map((item) => item.trim()).filter(Boolean));
}

function mapRecruitmentJob(row: RecruitmentJobRow): RecruitmentJobRecord {
  return {
    id: row.id,
    groupCode: row.group_code,
    groupTitle: row.group_title,
    groupBody: row.group_body,
    marketName: row.market_name,
    marketStatus: normalizeStatus(row.market_status, 'open'),
    title: row.title,
    summary: row.summary,
    description: row.description,
    requirements: parseStringArray(row.requirements_json),
    benefits: parseStringArray(row.benefits_json),
    location: row.location,
    workType: row.work_type,
    status: normalizeStatus(row.status, 'open'),
    sortOrder: row.sort_order,
    isPublic: Boolean(row.is_public),
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

function mapRecruitmentApplication(row: RecruitmentApplicationRow): RecruitmentApplicationRecord {
  return {
    id: row.id,
    jobId: row.job_id,
    jobTitle: row.job_title,
    careerGroup: row.career_group,
    careerMarket: row.career_market,
    careerStatus: row.career_status,
    name: row.name,
    email: row.email,
    phone: row.phone,
    countryRegion: row.country_region,
    cvLink: row.cv_link,
    latestExperience: row.latest_experience,
    message: row.message,
    payload: parsePayload(row.payload_json),
    status: row.status,
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

  if (!recruitmentSchemaReady) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recruitment_jobs (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        group_code VARCHAR(64) NOT NULL,
        group_title VARCHAR(191) NOT NULL,
        group_body VARCHAR(512) NULL,
        market_name VARCHAR(191) NOT NULL,
        market_status VARCHAR(32) NOT NULL DEFAULT 'open',
        title VARCHAR(191) NOT NULL,
        summary VARCHAR(512) NOT NULL,
        description LONGTEXT NULL,
        requirements_json LONGTEXT NULL,
        benefits_json LONGTEXT NULL,
        location VARCHAR(191) NULL,
        work_type VARCHAR(191) NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'open',
        sort_order INT NOT NULL DEFAULT 0,
        is_public TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
        updated_at DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
        INDEX idx_recruitment_jobs_public_status (is_public, status),
        INDEX idx_recruitment_jobs_group_market (group_code, market_name),
        INDEX idx_recruitment_jobs_sort (sort_order, id),
        PRIMARY KEY (id)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS recruitment_applications (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        job_id BIGINT UNSIGNED NULL,
        job_title VARCHAR(191) NULL,
        career_group VARCHAR(191) NULL,
        career_market VARCHAR(191) NULL,
        career_status VARCHAR(64) NULL,
        name VARCHAR(191) NULL,
        email VARCHAR(191) NULL,
        phone VARCHAR(64) NULL,
        country_region VARCHAR(191) NULL,
        cv_link VARCHAR(1024) NULL,
        latest_experience VARCHAR(512) NULL,
        message LONGTEXT NULL,
        payload_json LONGTEXT NULL,
        status VARCHAR(32) NOT NULL DEFAULT 'new',
        created_at DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
        updated_at DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
        INDEX idx_recruitment_applications_job (job_id),
        INDEX idx_recruitment_applications_status (status),
        INDEX idx_recruitment_applications_created_at (created_at),
        PRIMARY KEY (id),
        CONSTRAINT fk_recruitment_applications_job
          FOREIGN KEY (job_id) REFERENCES recruitment_jobs(id)
          ON DELETE SET NULL ON UPDATE CASCADE
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    recruitmentSchemaReady = true;
  }

  return pool;
}

export async function listRecruitmentJobs(
  input: ListRecruitmentJobsInput = {},
): Promise<RecruitmentJobRecord[]> {
  const pool = await ensureReady();
  const where: string[] = [];
  const values: Array<string | number> = [];

  if (!input.includeHidden) {
    where.push('is_public = 1');
  }

  if (input.status && input.status !== 'all') {
    where.push('status = ?');
    values.push(input.status);
  }

  values.push(normalizeLimit(input.limit));
  const [rows] = await pool.query<RecruitmentJobRow[]>(
    `SELECT *
     FROM recruitment_jobs
     ${where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY sort_order ASC, id ASC
     LIMIT ?`,
    values,
  );

  return rows.map(mapRecruitmentJob);
}

export async function getRecruitmentJobById(id: number): Promise<RecruitmentJobRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<RecruitmentJobRow[]>(
    `SELECT *
     FROM recruitment_jobs
     WHERE id = ?
     LIMIT 1`,
    [id],
  );

  return rows[0] ? mapRecruitmentJob(rows[0]) : null;
}

export async function createRecruitmentJob(
  input: CreateRecruitmentJobInput,
): Promise<RecruitmentJobRecord> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO recruitment_jobs (
       group_code, group_title, group_body, market_name, market_status, title, summary,
       description, requirements_json, benefits_json, location, work_type, status,
       sort_order, is_public
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      normalizeRequired(input.groupCode, 'groupCode', 64),
      normalizeRequired(input.groupTitle, 'groupTitle', 191),
      normalizeOptional(input.groupBody ?? null, 512),
      normalizeRequired(input.marketName, 'marketName', 191),
      normalizeStatus(input.marketStatus, 'open'),
      normalizeRequired(input.title, 'title', 191),
      normalizeRequired(input.summary, 'summary', 512),
      normalizeOptional(input.description ?? null),
      serializeStringArray(input.requirements),
      serializeStringArray(input.benefits),
      normalizeOptional(input.location ?? null, 191),
      normalizeOptional(input.workType ?? null, 191),
      normalizeStatus(input.status, 'open'),
      Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 0,
      input.isPublic === false ? 0 : 1,
    ],
  );

  const created = await getRecruitmentJobById(result.insertId);
  if (!created) {
    throw new Error('Failed to read created recruitment job.');
  }

  return created;
}

export async function updateRecruitmentJob(
  id: number,
  input: UpdateRecruitmentJobInput,
): Promise<RecruitmentJobRecord | null> {
  const pool = await ensureReady();
  const fields: string[] = [];
  const values: Array<string | number | null> = [];

  if (typeof input.groupCode === 'string') {
    fields.push('group_code = ?');
    values.push(normalizeRequired(input.groupCode, 'groupCode', 64));
  }
  if (typeof input.groupTitle === 'string') {
    fields.push('group_title = ?');
    values.push(normalizeRequired(input.groupTitle, 'groupTitle', 191));
  }
  if (input.groupBody !== undefined) {
    fields.push('group_body = ?');
    values.push(normalizeOptional(input.groupBody, 512));
  }
  if (typeof input.marketName === 'string') {
    fields.push('market_name = ?');
    values.push(normalizeRequired(input.marketName, 'marketName', 191));
  }
  if (input.marketStatus !== undefined) {
    fields.push('market_status = ?');
    values.push(normalizeStatus(input.marketStatus, 'open'));
  }
  if (typeof input.title === 'string') {
    fields.push('title = ?');
    values.push(normalizeRequired(input.title, 'title', 191));
  }
  if (typeof input.summary === 'string') {
    fields.push('summary = ?');
    values.push(normalizeRequired(input.summary, 'summary', 512));
  }
  if (input.description !== undefined) {
    fields.push('description = ?');
    values.push(normalizeOptional(input.description));
  }
  if (input.requirements !== undefined) {
    fields.push('requirements_json = ?');
    values.push(serializeStringArray(input.requirements));
  }
  if (input.benefits !== undefined) {
    fields.push('benefits_json = ?');
    values.push(serializeStringArray(input.benefits));
  }
  if (input.location !== undefined) {
    fields.push('location = ?');
    values.push(normalizeOptional(input.location, 191));
  }
  if (input.workType !== undefined) {
    fields.push('work_type = ?');
    values.push(normalizeOptional(input.workType, 191));
  }
  if (input.status !== undefined) {
    fields.push('status = ?');
    values.push(normalizeStatus(input.status, 'open'));
  }
  if (input.sortOrder !== undefined) {
    fields.push('sort_order = ?');
    values.push(Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 0);
  }
  if (input.isPublic !== undefined) {
    fields.push('is_public = ?');
    values.push(input.isPublic ? 1 : 0);
  }

  if (fields.length === 0) {
    return getRecruitmentJobById(id);
  }

  values.push(id);
  await pool.execute(
    `UPDATE recruitment_jobs
     SET ${fields.join(', ')}
     WHERE id = ?`,
    values,
  );

  return getRecruitmentJobById(id);
}

export async function listRecruitmentApplications(limit?: number): Promise<RecruitmentApplicationRecord[]> {
  const pool = await ensureReady();
  const [rows] = await pool.query<RecruitmentApplicationRow[]>(
    `SELECT *
     FROM recruitment_applications
     ORDER BY created_at DESC, id DESC
     LIMIT ?`,
    [normalizeLimit(limit, 100)],
  );

  return rows.map(mapRecruitmentApplication);
}

export async function createRecruitmentApplication(
  payload: Record<string, string>,
): Promise<RecruitmentApplicationRecord> {
  const pool = await ensureReady();
  const rawJobId = Number(payload['recruitment-job-id'] ?? 0);
  const jobId = Number.isInteger(rawJobId) && rawJobId > 0 ? rawJobId : null;

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO recruitment_applications (
       job_id, job_title, career_group, career_market, career_status, name, email, phone,
       country_region, cv_link, latest_experience, message, payload_json
     )
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      jobId,
      normalizeOptional(payload['career-position'] ?? null, 191),
      normalizeOptional(payload['career-group'] ?? null, 191),
      normalizeOptional(payload['career-market'] ?? null, 191),
      normalizeOptional(payload['career-status'] ?? null, 64),
      normalizeOptional(payload['your-name'] ?? null, 191),
      normalizeOptional(payload['your-email'] ?? null, 191),
      normalizeOptional(payload['your-phone'] ?? null, 64),
      normalizeOptional(payload['country-region'] ?? null, 191),
      normalizeOptional(payload['cv-link'] ?? null, 1024),
      normalizeOptional(payload['latest-experience'] ?? null, 512),
      normalizeOptional(payload['your-message'] ?? null),
      JSON.stringify(payload),
    ],
  );

  const [rows] = await pool.query<RecruitmentApplicationRow[]>(
    `SELECT *
     FROM recruitment_applications
     WHERE id = ?
     LIMIT 1`,
    [result.insertId],
  );

  const created = rows[0];
  if (!created) {
    throw new Error('Failed to read created recruitment application.');
  }

  return mapRecruitmentApplication(created);
}
