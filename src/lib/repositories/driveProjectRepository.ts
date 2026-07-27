import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

interface DriveProjectRow extends RowDataPacket {
  id: number;
  name: string;
  drive_folder_id: string;
  description: string | null;
  is_active: number;
  can_view: number | null;
  can_download: number | null;
  created_at: string;
  updated_at: string;
}

interface DriveProjectMemberRow extends RowDataPacket {
  id: number;
  project_id: number;
  user_id: number;
  user_email: string;
  user_full_name: string;
  can_view: number;
  can_download: number;
  created_at: string;
  updated_at: string;
}

export interface DriveProjectAccessRecord {
  id: number;
  name: string;
  driveFolderId: string;
  description: string | null;
  isActive: boolean;
  canView: boolean;
  canDownload: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DriveProjectMemberRecord {
  id: number;
  projectId: number;
  userId: number;
  userEmail: string;
  userFullName: string;
  canView: boolean;
  canDownload: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DriveProjectAdminRecord extends DriveProjectAccessRecord {
  members: DriveProjectMemberRecord[];
}

export interface UpsertDriveProjectInput {
  name: string;
  driveFolderId: string;
  description?: string | null;
  isActive?: boolean;
}

export interface UpsertDriveProjectMemberInput {
  projectId: number;
  userId: number;
  canView?: boolean;
  canDownload?: boolean;
}

let driveProjectSchemaReady = false;

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

function toIsoDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function mapDriveProject(row: DriveProjectRow): DriveProjectAccessRecord {
  return {
    id: Number(row.id),
    name: row.name,
    driveFolderId: row.drive_folder_id,
    description: row.description,
    isActive: row.is_active === 1,
    canView: row.can_view == null ? false : row.can_view === 1,
    canDownload: row.can_download == null ? false : row.can_download === 1,
    createdAt: toIsoDate(row.created_at),
    updatedAt: toIsoDate(row.updated_at),
  };
}

function mapDriveProjectMember(row: DriveProjectMemberRow): DriveProjectMemberRecord {
  return {
    id: Number(row.id),
    projectId: Number(row.project_id),
    userId: Number(row.user_id),
    userEmail: row.user_email,
    userFullName: row.user_full_name,
    canView: row.can_view === 1,
    canDownload: row.can_download === 1,
    createdAt: toIsoDate(row.created_at),
    updatedAt: toIsoDate(row.updated_at),
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

  if (!driveProjectSchemaReady) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS drive_projects (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(191) NOT NULL,
        drive_folder_id VARCHAR(191) NOT NULL,
        description VARCHAR(512) NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
        updated_at DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
        UNIQUE INDEX uniq_drive_projects_folder (drive_folder_id),
        INDEX idx_drive_projects_active (is_active),
        PRIMARY KEY (id)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS drive_project_members (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        project_id BIGINT UNSIGNED NOT NULL,
        user_id BIGINT UNSIGNED NOT NULL,
        can_view TINYINT(1) NOT NULL DEFAULT 1,
        can_download TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
        updated_at DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
        INDEX idx_drive_project_members_user (user_id),
        UNIQUE INDEX uniq_drive_project_member (project_id, user_id),
        PRIMARY KEY (id),
        CONSTRAINT fk_drive_project_members_project
          FOREIGN KEY (project_id) REFERENCES drive_projects(id)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_drive_project_members_user
          FOREIGN KEY (user_id) REFERENCES app_users(id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    `);

    driveProjectSchemaReady = true;
  }

  return pool;
}

export async function listDriveProjectsForUser(
  userId: number,
): Promise<DriveProjectAccessRecord[]> {
  const pool = await ensureReady();
  const [rows] = await pool.query<DriveProjectRow[]>(
    `SELECT
       p.id,
       p.name,
       p.drive_folder_id,
       p.description,
       p.is_active,
       m.can_view,
       m.can_download,
       p.created_at,
       p.updated_at
     FROM drive_project_members m
     INNER JOIN drive_projects p ON p.id = m.project_id
     WHERE m.user_id = ?
       AND m.can_view = 1
       AND p.is_active = 1
     ORDER BY p.created_at DESC, p.id DESC`,
    [userId],
  );

  return rows.map(mapDriveProject);
}

export async function listDriveProjectsForAdmin(): Promise<DriveProjectAdminRecord[]> {
  const pool = await ensureReady();
  const [projectRows] = await pool.query<DriveProjectRow[]>(
    `SELECT
       id,
       name,
       drive_folder_id,
       description,
       is_active,
       1 AS can_view,
       1 AS can_download,
       created_at,
       updated_at
     FROM drive_projects
     ORDER BY created_at DESC, id DESC`,
  );

  const projects = projectRows.map(mapDriveProject);
  if (projects.length === 0) {
    return [];
  }

  const projectIds = projects.map((project) => project.id);
  const [memberRows] = await pool.query<DriveProjectMemberRow[]>(
    `SELECT
       m.id,
       m.project_id,
       m.user_id,
       u.email AS user_email,
       u.full_name AS user_full_name,
       m.can_view,
       m.can_download,
       m.created_at,
       m.updated_at
     FROM drive_project_members m
     INNER JOIN app_users u ON u.id = m.user_id
     WHERE m.project_id IN (?)
     ORDER BY u.full_name ASC, u.email ASC`,
    [projectIds],
  );

  const membersByProjectId = new Map<number, DriveProjectMemberRecord[]>();
  for (const member of memberRows.map(mapDriveProjectMember)) {
    const members = membersByProjectId.get(member.projectId) ?? [];
    members.push(member);
    membersByProjectId.set(member.projectId, members);
  }

  return projects.map((project) => ({
    ...project,
    members: membersByProjectId.get(project.id) ?? [],
  }));
}

export async function getDriveProjectById(
  projectId: number,
): Promise<DriveProjectAccessRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<DriveProjectRow[]>(
    `SELECT
       id,
       name,
       drive_folder_id,
       description,
       is_active,
       1 AS can_view,
       1 AS can_download,
       created_at,
       updated_at
     FROM drive_projects
     WHERE id = ?
     LIMIT 1`,
    [projectId],
  );

  const row = rows[0];
  return row ? mapDriveProject(row) : null;
}

export async function getDriveProjectAccessForUser(
  userId: number,
  projectId: number,
): Promise<DriveProjectAccessRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<DriveProjectRow[]>(
    `SELECT
       p.id,
       p.name,
       p.drive_folder_id,
       p.description,
       p.is_active,
       m.can_view,
       m.can_download,
       p.created_at,
       p.updated_at
     FROM drive_project_members m
     INNER JOIN drive_projects p ON p.id = m.project_id
     WHERE m.user_id = ?
       AND p.id = ?
       AND m.can_view = 1
       AND p.is_active = 1
     LIMIT 1`,
    [userId, projectId],
  );

  const row = rows[0];
  return row ? mapDriveProject(row) : null;
}

export async function upsertDriveProject(
  input: UpsertDriveProjectInput,
): Promise<DriveProjectAccessRecord> {
  const pool = await ensureReady();
  const name = normalizeRequired(input.name, 'name', 191);
  const driveFolderId = normalizeRequired(input.driveFolderId, 'driveFolderId', 191);
  const description = normalizeOptional(input.description, 512);
  const isActive = input.isActive === false ? 0 : 1;

  await pool.execute<ResultSetHeader>(
    `INSERT INTO drive_projects (name, drive_folder_id, description, is_active, updated_at)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON DUPLICATE KEY UPDATE
       name = VALUES(name),
       description = VALUES(description),
       is_active = VALUES(is_active),
       updated_at = CURRENT_TIMESTAMP`,
    [name, driveFolderId, description, isActive],
  );

  const [rows] = await pool.query<DriveProjectRow[]>(
    `SELECT
       id,
       name,
       drive_folder_id,
       description,
       is_active,
       1 AS can_view,
       1 AS can_download,
       created_at,
       updated_at
     FROM drive_projects
     WHERE drive_folder_id = ?
     LIMIT 1`,
    [driveFolderId],
  );

  const row = rows[0];
  if (!row) {
    throw new Error('Failed to read drive project.');
  }

  return mapDriveProject(row);
}

export async function updateDriveProject(
  projectId: number,
  input: UpsertDriveProjectInput,
): Promise<DriveProjectAccessRecord | null> {
  const pool = await ensureReady();
  const name = normalizeRequired(input.name, 'name', 191);
  const driveFolderId = normalizeRequired(input.driveFolderId, 'driveFolderId', 191);
  const description = normalizeOptional(input.description, 512);
  const isActive = input.isActive === false ? 0 : 1;

  await pool.execute(
    `UPDATE drive_projects
     SET name = ?,
         drive_folder_id = ?,
         description = ?,
         is_active = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [name, driveFolderId, description, isActive, projectId],
  );

  return getDriveProjectById(projectId);
}

export async function deleteDriveProject(projectId: number): Promise<boolean> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM drive_projects WHERE id = ?`,
    [projectId],
  );

  return result.affectedRows > 0;
}

export async function upsertDriveProjectMember(
  input: UpsertDriveProjectMemberInput,
): Promise<DriveProjectMemberRecord> {
  const pool = await ensureReady();
  const projectId = Number(input.projectId);
  const userId = Number(input.userId);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    throw new Error('projectId is invalid.');
  }
  if (!Number.isInteger(userId) || userId <= 0) {
    throw new Error('userId is invalid.');
  }

  await pool.execute(
    `INSERT INTO drive_project_members (project_id, user_id, can_view, can_download, updated_at)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON DUPLICATE KEY UPDATE
       can_view = VALUES(can_view),
       can_download = VALUES(can_download),
       updated_at = CURRENT_TIMESTAMP`,
    [
      projectId,
      userId,
      input.canView === false ? 0 : 1,
      input.canDownload === false ? 0 : 1,
    ],
  );

  const member = await getDriveProjectMember(projectId, userId);
  if (!member) {
    throw new Error('Failed to read drive project member.');
  }

  return member;
}

export async function getDriveProjectMember(
  projectId: number,
  userId: number,
): Promise<DriveProjectMemberRecord | null> {
  const pool = await ensureReady();
  const [rows] = await pool.query<DriveProjectMemberRow[]>(
    `SELECT
       m.id,
       m.project_id,
       m.user_id,
       u.email AS user_email,
       u.full_name AS user_full_name,
       m.can_view,
       m.can_download,
       m.created_at,
       m.updated_at
     FROM drive_project_members m
     INNER JOIN app_users u ON u.id = m.user_id
     WHERE m.project_id = ?
       AND m.user_id = ?
     LIMIT 1`,
    [projectId, userId],
  );

  const row = rows[0];
  return row ? mapDriveProjectMember(row) : null;
}

export async function deleteDriveProjectMember(
  projectId: number,
  userId: number,
): Promise<boolean> {
  const pool = await ensureReady();
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM drive_project_members
     WHERE project_id = ?
       AND user_id = ?`,
    [projectId, userId],
  );

  return result.affectedRows > 0;
}
