import { Readable } from 'node:stream';
import { google } from 'googleapis';
import type { drive_v3 } from 'googleapis';
import * as XLSX from 'xlsx';

const DRIVE_FOLDER_MIME_TYPE = 'application/vnd.google-apps.folder';
const GOOGLE_NATIVE_MIME_PREFIX = 'application/vnd.google-apps.';
const PDF_MIME_TYPE = 'application/pdf';
const EXCEL_MIME_TYPES = new Set([
  'application/vnd.ms-excel',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
  'application/vnd.google-apps.spreadsheet',
]);
const TABLE_PREVIEW_MAX_ROWS = 120;
const TABLE_PREVIEW_MAX_COLUMNS = 40;

export interface DrivePortalItem {
  id: string;
  name: string;
  mimeType: string;
  kind: 'folder' | 'file';
  size: string | null;
  modifiedTime: string | null;
  webViewLink: string | null;
  canPreview: boolean;
  canDownload: boolean;
}

export interface DrivePortalFolder {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string | null;
}

export interface DrivePortalFolderListing {
  folder: DrivePortalFolder;
  items: DrivePortalItem[];
}

export interface DrivePortalContent {
  stream: Readable;
  filename: string;
  mimeType: string;
}

export interface DrivePortalTablePreview {
  fileId: string;
  filename: string;
  mimeType: string;
  sheetName: string;
  sheetNames: string[];
  rows: string[][];
  truncated: boolean;
  maxRows: number;
  maxColumns: number;
}

let cachedDriveClient: drive_v3.Drive | null = null;

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}.`);
  }
  return value;
}

export function getDriveRootFolderId(): string {
  return getRequiredEnv('GOOGLE_DRIVE_ROOT_FOLDER_ID');
}

function getDriveClient(): drive_v3.Drive {
  if (cachedDriveClient) {
    return cachedDriveClient;
  }

  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  const auth =
    keyFile
      ? new google.auth.GoogleAuth({
          keyFile,
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        })
      : new google.auth.GoogleAuth({
          credentials: clientEmail && privateKey ? { client_email: clientEmail, private_key: privateKey } : undefined,
          scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

  cachedDriveClient = google.drive({ version: 'v3', auth });
  return cachedDriveClient;
}

function normalizeDriveFile(file: drive_v3.Schema$File): DrivePortalItem {
  const id = String(file.id ?? '');
  const name = String(file.name ?? 'Untitled');
  const mimeType = String(file.mimeType ?? 'application/octet-stream');
  const isFolder = mimeType === DRIVE_FOLDER_MIME_TYPE;

  return {
    id,
    name,
    mimeType,
    kind: isFolder ? 'folder' : 'file',
    size: file.size ?? null,
    modifiedTime: file.modifiedTime ?? null,
    webViewLink: file.webViewLink ?? null,
    canPreview: isFolder ? false : canPreviewMimeType(mimeType),
    canDownload: !isFolder,
  };
}

function normalizeFolder(file: drive_v3.Schema$File): DrivePortalFolder {
  return {
    id: String(file.id ?? ''),
    name: String(file.name ?? 'Untitled'),
    mimeType: String(file.mimeType ?? DRIVE_FOLDER_MIME_TYPE),
    webViewLink: file.webViewLink ?? null,
  };
}

function isGoogleNativeMimeType(mimeType: string): boolean {
  return mimeType.startsWith(GOOGLE_NATIVE_MIME_PREFIX);
}

export function canPreviewMimeType(mimeType: string): boolean {
  return (
    mimeType === PDF_MIME_TYPE ||
    mimeType.startsWith('image/') ||
    mimeType.startsWith('text/') ||
    isGoogleNativeMimeType(mimeType) ||
    EXCEL_MIME_TYPES.has(mimeType)
  );
}

export function canPreviewAsTable(mimeType: string, filename?: string | null): boolean {
  const normalizedFilename = String(filename ?? '').toLowerCase();
  return (
    EXCEL_MIME_TYPES.has(mimeType) ||
    normalizedFilename.endsWith('.xlsx') ||
    normalizedFilename.endsWith('.xls') ||
    normalizedFilename.endsWith('.xlsm') ||
    normalizedFilename.endsWith('.csv')
  );
}

function sanitizeFilename(value: string): string {
  return value.replace(/[\\r\\n\"]/g, '').trim() || 'anslife-drive-file';
}

async function getDriveFileById(fileId: string, fields: string): Promise<drive_v3.Schema$File> {
  const drive = getDriveClient();
  const response = await drive.files.get({
    fileId,
    fields,
    supportsAllDrives: true,
  });
  return response.data;
}

async function assertFileIsInsideRoot(
  fileId: string,
  rootFolderId = getDriveRootFolderId(),
): Promise<void> {
  if (fileId === rootFolderId) {
    return;
  }

  let currentId = fileId;
  const visited = new Set<string>();

  for (let depth = 0; depth < 20; depth += 1) {
    if (visited.has(currentId)) {
      break;
    }
    visited.add(currentId);

    const file = await getDriveFileById(currentId, 'id,parents');
    const parentIds = file.parents ?? [];
    if (parentIds.includes(rootFolderId)) {
      return;
    }
    if (parentIds.length === 0) {
      break;
    }
    currentId = parentIds[0] ?? '';
    if (!currentId) {
      break;
    }
  }

  throw new Error('DRIVE_FILE_OUTSIDE_ROOT');
}

export async function listDrivePortalFolder(
  folderId = getDriveRootFolderId(),
  rootFolderId = getDriveRootFolderId(),
): Promise<DrivePortalFolderListing> {
  await assertFileIsInsideRoot(folderId, rootFolderId);

  const folder = await getDriveFileById(folderId, 'id,name,mimeType,webViewLink');
  if (folder.mimeType !== DRIVE_FOLDER_MIME_TYPE) {
    throw new Error('DRIVE_NOT_FOLDER');
  }

  const drive = getDriveClient();
  const response = await drive.files.list({
    q: `'${folderId.replace(/'/g, "\\'")}' in parents and trashed=false`,
    fields: 'files(id,name,mimeType,size,modifiedTime,webViewLink)',
    includeItemsFromAllDrives: true,
    orderBy: 'folder,name_natural',
    pageSize: 200,
    supportsAllDrives: true,
  });

  const files = response.data.files ?? [];
  return {
    folder: normalizeFolder(folder),
    items: files.map(normalizeDriveFile).filter((item) => item.id),
  };
}

export async function getDrivePortalContent(
  fileId: string,
  rootFolderId = getDriveRootFolderId(),
): Promise<DrivePortalContent> {
  await assertFileIsInsideRoot(fileId, rootFolderId);

  const file = await getDriveFileById(fileId, 'id,name,mimeType');
  const filename = sanitizeFilename(String(file.name ?? 'anslife-drive-file'));
  const mimeType = String(file.mimeType ?? 'application/octet-stream');

  if (mimeType === DRIVE_FOLDER_MIME_TYPE) {
    throw new Error('DRIVE_NOT_FILE');
  }

  const drive = getDriveClient();
  if (isGoogleNativeMimeType(mimeType)) {
    const response = await drive.files.export(
      {
        fileId,
        mimeType: PDF_MIME_TYPE,
      },
      { responseType: 'stream' },
    );
    return {
      stream: response.data as Readable,
      filename: `${filename}.pdf`,
      mimeType: PDF_MIME_TYPE,
    };
  }

  const response = await drive.files.get(
    {
      fileId,
      alt: 'media',
      supportsAllDrives: true,
    },
    { responseType: 'stream' },
  );

  return {
    stream: response.data as Readable,
    filename,
    mimeType,
  };
}

async function readStreamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function normalizeCellValue(value: unknown): string {
  if (value == null) {
    return '';
  }
  if (value instanceof Date) {
    return new Intl.DateTimeFormat('vi-VN').format(value);
  }
  return String(value);
}

function trimEmptyTrailingCells(row: string[]): string[] {
  const nextRow = [...row];
  while (nextRow.length > 0 && nextRow[nextRow.length - 1] === '') {
    nextRow.pop();
  }
  return nextRow;
}

export async function getDrivePortalTablePreview(
  fileId: string,
  requestedSheetName?: string | null,
  rootFolderId = getDriveRootFolderId(),
): Promise<DrivePortalTablePreview> {
  await assertFileIsInsideRoot(fileId, rootFolderId);

  const file = await getDriveFileById(fileId, 'id,name,mimeType');
  const filename = sanitizeFilename(String(file.name ?? 'anslife-drive-file.xlsx'));
  const mimeType = String(file.mimeType ?? 'application/octet-stream');
  if (!canPreviewAsTable(mimeType, filename)) {
    throw new Error('DRIVE_NOT_SPREADSHEET');
  }

  const drive = getDriveClient();
  const response =
    mimeType === 'application/vnd.google-apps.spreadsheet'
      ? await drive.files.export(
          {
            fileId,
            mimeType: 'text/csv',
          },
          { responseType: 'stream' },
        )
      : await drive.files.get(
          {
            fileId,
            alt: 'media',
            supportsAllDrives: true,
          },
          { responseType: 'stream' },
        );

  const buffer = await readStreamToBuffer(response.data as Readable);
  const workbook = XLSX.read(buffer, {
    type: 'buffer',
    cellDates: true,
  });
  const sheetNames = workbook.SheetNames;
  const sheetName =
    requestedSheetName && sheetNames.includes(requestedSheetName)
      ? requestedSheetName
      : (sheetNames[0] ?? '');
  const sheet = sheetName ? workbook.Sheets[sheetName] : null;
  if (!sheet) {
    throw new Error('DRIVE_SPREADSHEET_EMPTY');
  }

  const rawRows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    raw: false,
    defval: '',
    blankrows: false,
  });
  const limitedRows = rawRows.slice(0, TABLE_PREVIEW_MAX_ROWS);
  const rows = limitedRows
    .map((row) =>
      trimEmptyTrailingCells(
        row.slice(0, TABLE_PREVIEW_MAX_COLUMNS).map((cell) => normalizeCellValue(cell)),
      ),
    )
    .filter((row) => row.some((cell) => cell.trim().length > 0));

  return {
    fileId,
    filename,
    mimeType,
    sheetName,
    sheetNames,
    rows,
    truncated:
      rawRows.length > TABLE_PREVIEW_MAX_ROWS ||
      rows.some((row) => row.length >= TABLE_PREVIEW_MAX_COLUMNS),
    maxRows: TABLE_PREVIEW_MAX_ROWS,
    maxColumns: TABLE_PREVIEW_MAX_COLUMNS,
  };
}
