import { Readable } from 'node:stream';
import crypto from 'node:crypto';
import path from 'node:path';
import { google } from 'googleapis';
import type { drive_v3 } from 'googleapis';

const DRIVE_FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder';
const MAX_FOLDER_DEPTH = 5;

let cachedDriveClient: drive_v3.Drive | null = null;

export interface WorkReportDriveUploadInput {
  buffer: Buffer;
  mimeType: string;
  originalFilename: string;
  userId: number;
  userFullName: string;
  reportDate: string;
}

export interface WorkReportDriveUploadResult {
  fileId: string;
  parentId: string;
  fileName: string;
  webViewLink: string | null;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}.`);
  }
  return value;
}

export function getWorkReportRootFolderId(): string {
  return getRequiredEnv('GOOGLE_DRIVE_WORK_REPORT_FOLDER_ID');
}

function getDriveClient(): drive_v3.Drive {
  if (cachedDriveClient) {
    return cachedDriveClient;
  }

  const uploadClientId = process.env.GOOGLE_DRIVE_UPLOAD_CLIENT_ID?.trim();
  const uploadClientSecret = process.env.GOOGLE_DRIVE_UPLOAD_CLIENT_SECRET?.trim();
  const uploadRefreshToken = process.env.GOOGLE_DRIVE_UPLOAD_REFRESH_TOKEN?.trim();
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (uploadClientId && uploadClientSecret && uploadRefreshToken) {
    const oauthClient = new google.auth.OAuth2(uploadClientId, uploadClientSecret);
    oauthClient.setCredentials({
      refresh_token: uploadRefreshToken,
    });
    cachedDriveClient = google.drive({ version: 'v3', auth: oauthClient });
    return cachedDriveClient;
  }

  const auth =
    keyFile
      ? new google.auth.GoogleAuth({
          keyFile,
          scopes: ['https://www.googleapis.com/auth/drive'],
        })
      : new google.auth.GoogleAuth({
          credentials: clientEmail && privateKey ? { client_email: clientEmail, private_key: privateKey } : undefined,
          scopes: ['https://www.googleapis.com/auth/drive'],
        });

  cachedDriveClient = google.drive({ version: 'v3', auth });
  return cachedDriveClient;
}

function normalizeGoogleDriveError(error: unknown): Error {
  const responseData =
    error && typeof error === 'object' && 'response' in error
      ? (error as { response?: { data?: { error?: { code?: number; message?: string } } } }).response?.data
      : null;
  const message = responseData?.error?.message ?? (error instanceof Error ? error.message : '');
  if (
    responseData?.error?.code === 403 &&
    message.toLowerCase().includes('service accounts do not have storage quota')
  ) {
    return new Error('GOOGLE_DRIVE_SERVICE_ACCOUNT_NO_QUOTA');
  }
  return error instanceof Error ? error : new Error('GOOGLE_DRIVE_UPLOAD_FAILED');
}

function escapeDriveQueryLiteral(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function sanitizeDriveName(value: string, fallback: string): string {
  const normalized = value
    .replace(/[\\/:*?"<>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return (normalized || fallback).slice(0, 180);
}

function getDateParts(reportDate: string): { year: string; month: string; day: string } {
  const match = reportDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    throw new Error('INVALID_WORK_REPORT_DATE');
  }
  return {
    year: match[1],
    month: match[2],
    day: reportDate,
  };
}

function getFileExtension(filename: string, mimeType: string): string {
  const extension = path.extname(filename).replace(/^\./, '').toLowerCase();
  if (extension && /^[a-z0-9]{1,8}$/.test(extension)) {
    return extension;
  }
  if (mimeType === 'image/jpeg') {
    return 'jpg';
  }
  if (mimeType === 'image/png') {
    return 'png';
  }
  if (mimeType === 'image/webp') {
    return 'webp';
  }
  return 'bin';
}

async function ensureDriveFolder(parentId: string, name: string): Promise<string> {
  const drive = getDriveClient();
  const safeName = sanitizeDriveName(name, 'Folder');
  const response = await drive.files.list({
    q: [
      `'${escapeDriveQueryLiteral(parentId)}' in parents`,
      `name='${escapeDriveQueryLiteral(safeName)}'`,
      `mimeType='${DRIVE_FOLDER_MIME_TYPE}'`,
      'trashed=false',
    ].join(' and '),
    fields: 'files(id,name)',
    includeItemsFromAllDrives: true,
    pageSize: 1,
    supportsAllDrives: true,
  });

  const existingId = response.data.files?.[0]?.id;
  if (existingId) {
    return existingId;
  }

  const created = await drive.files
    .create({
      requestBody: {
        name: safeName,
        mimeType: DRIVE_FOLDER_MIME_TYPE,
        parents: [parentId],
      },
      fields: 'id',
      supportsAllDrives: true,
    })
    .catch((error: unknown) => {
      throw normalizeGoogleDriveError(error);
    });

  const folderId = created.data.id;
  if (!folderId) {
    throw new Error('DRIVE_FOLDER_CREATE_FAILED');
  }
  return folderId;
}

async function ensureNestedFolders(rootFolderId: string, names: string[]): Promise<string> {
  if (names.length > MAX_FOLDER_DEPTH) {
    throw new Error('DRIVE_FOLDER_DEPTH_TOO_DEEP');
  }

  let parentId = rootFolderId;
  for (const name of names) {
    parentId = await ensureDriveFolder(parentId, name);
  }
  return parentId;
}

export async function uploadWorkReportImageToDrive(
  input: WorkReportDriveUploadInput,
): Promise<WorkReportDriveUploadResult> {
  const rootFolderId = getWorkReportRootFolderId();
  const dateParts = getDateParts(input.reportDate);
  const userFolderName = sanitizeDriveName(`${input.userFullName} - u${input.userId}`, `User u${input.userId}`);
  const parentId = await ensureNestedFolders(rootFolderId, [
    dateParts.year,
    dateParts.month,
    dateParts.day,
    userFolderName,
  ]);

  const extension = getFileExtension(input.originalFilename, input.mimeType);
  const basename = sanitizeDriveName(
    path.basename(input.originalFilename, path.extname(input.originalFilename)),
    'work-photo',
  );
  const fileName = `${input.reportDate}-${basename}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
  const drive = getDriveClient();
  const created = await drive.files
    .create({
      requestBody: {
        name: fileName,
        parents: [parentId],
      },
      media: {
        mimeType: input.mimeType,
        body: Readable.from(input.buffer),
      },
      fields: 'id,name,webViewLink',
      supportsAllDrives: true,
    })
    .catch((error: unknown) => {
      throw normalizeGoogleDriveError(error);
    });

  const fileId = created.data.id;
  if (!fileId) {
    throw new Error('DRIVE_FILE_UPLOAD_FAILED');
  }

  return {
    fileId,
    parentId,
    fileName: String(created.data.name ?? fileName),
    webViewLink: created.data.webViewLink ?? null,
  };
}
