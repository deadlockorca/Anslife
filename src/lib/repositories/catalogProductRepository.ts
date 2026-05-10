import { randomBytes } from 'node:crypto';
import type { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';

const MAX_PRODUCT_IMAGES = 5;
const MAX_PRODUCT_SPECS = 30;

const BOOLEAN_TRUE_VALUES = new Set(['true', '1', 'yes', 'on']);
const BOOLEAN_FALSE_VALUES = new Set(['false', '0', 'no', 'off']);

export type CatalogProductTab = 'NEW' | 'BEST' | 'SALE';

export interface CatalogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface CatalogProductSpec {
  id: string;
  name: string;
  value: string;
  sortOrder: number;
}

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  imageUrls: string[];
  shortDescription: string | null;
  description: string | null;
  specs: CatalogProductSpec[];
  showContactPrice: boolean;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  tab: CatalogProductTab;
  inStock: boolean;
  isFeatured: boolean;
  categoryId: string | null;
  categoryName: string | null;
  createdAt: string;
}

export interface ListCatalogProductsParams {
  page: number;
  limit: number;
  search: string;
  categoryId: string;
  tab: CatalogProductTab | null;
}

export interface ListCatalogProductsResult {
  products: CatalogProduct[];
  categories: CatalogCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    search: string;
    categoryId: string;
    tab: CatalogProductTab | null;
  };
}

export interface CatalogProductInput {
  name: string;
  slugInput: string;
  imageUrl: string | null;
  imageUrls: string[];
  shortDescription: string | null;
  description: string | null;
  specs: Array<{
    name: string;
    value: string;
    sortOrder: number;
  }>;
  showContactPrice: boolean;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  tab: CatalogProductTab;
  inStock: boolean;
  isFeatured: boolean;
  categoryId: string | null;
}

export interface PublicCatalogProductRecord {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string | null;
  imageUrl: string | null;
  imageUrls: string[];
  specs: Array<{
    id: string;
    name: string;
    value: string;
    sortOrder: number;
  }>;
  category: {
    id: string;
    slug: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

interface CountRow extends RowDataPacket {
  total: number;
}

interface CatalogCategoryRow extends RowDataPacket {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  sortOrder: number;
  isActive: number;
  createdAt: string;
}

interface CatalogProductRow extends RowDataPacket {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  shortDescription: string | null;
  description: string | null;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  tab: CatalogProductTab;
  inStock: number;
  isFeatured: number;
  categoryId: string | null;
  createdAt: string;
  updatedAt: string;
  categoryName: string | null;
  categorySlug: string | null;
}

interface CatalogProductImageRow extends RowDataPacket {
  id: string;
  productId: string;
  url: string;
  sortOrder: number;
  createdAt: string;
}

interface CatalogProductSpecRow extends RowDataPacket {
  id: string;
  productId: string;
  name: string;
  value: string;
  sortOrder: number;
  createdAt: string;
}

function normalizeLikeValue(value: string): string {
  return value.trim().replace(/\s+/g, ' ').slice(0, 120);
}

function normalizePage(value: number): number {
  if (!Number.isFinite(value)) {
    return 1;
  }
  return Math.max(1, Math.floor(value));
}

function normalizeLimit(value: number): number {
  if (!Number.isFinite(value)) {
    return 50;
  }
  return Math.min(200, Math.max(1, Math.floor(value)));
}

function isNoSuchTableError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: string }).code === 'ER_NO_SUCH_TABLE'
  );
}

function toIso(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString();
  }
  return parsed.toISOString();
}

function toBooleanFromDb(value: number | boolean | string | null | undefined): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  if (typeof value === 'string') {
    const cleaned = value.trim().toLowerCase();
    if (BOOLEAN_TRUE_VALUES.has(cleaned)) {
      return true;
    }
    if (BOOLEAN_FALSE_VALUES.has(cleaned)) {
      return false;
    }
  }
  return false;
}

const toRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
};

const toCleanString = (value: unknown, maxLength = 191): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const cleaned = value.trim();
  if (!cleaned) {
    return null;
  }

  return cleaned.slice(0, maxLength);
};

const toCleanMultilineString = (value: unknown, maxLength = 191): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maxLength);
};

const toStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string') {
    const normalized = value.replace(/\r/g, '\n');
    return normalized
      .split('\n')
      .flatMap((line) => line.split(','))
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const toNumber = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.round(value);
  }

  if (typeof value === 'string') {
    const cleaned = value.trim();
    if (!cleaned) {
      return null;
    }

    const parsed = Number(cleaned.replace(/,/g, ''));
    if (Number.isFinite(parsed)) {
      return Math.round(parsed);
    }
  }

  return null;
};

const toTab = (value: unknown): CatalogProductTab => {
  if (typeof value === 'string') {
    const cleaned = value.trim().toUpperCase();

    if (cleaned === 'NEW' || cleaned === 'BEST' || cleaned === 'SALE') {
      return cleaned;
    }
  }

  return 'NEW';
};

const toSpecs = (value: unknown): { ok: true; data: CatalogProductInput['specs'] } | { ok: false; error: string } => {
  if (value == null) {
    return { ok: true, data: [] };
  }

  if (!Array.isArray(value)) {
    return { ok: false, error: 'Thông số sản phẩm không hợp lệ.' };
  }

  const parsedSpecs: CatalogProductInput['specs'] = [];

  for (const [index, item] of value.entries()) {
    const row = toRecord(item);
    if (!row) {
      return { ok: false, error: `Thông số sản phẩm dòng ${index + 1} không hợp lệ.` };
    }

    const name = toCleanString(row.name, 180) ?? '';
    const specValue = toCleanMultilineString(row.value, 4000) ?? '';

    if (!name && !specValue) {
      continue;
    }

    if (!name || !specValue) {
      return { ok: false, error: `Thông số sản phẩm dòng ${index + 1} cần đủ tên và giá trị.` };
    }

    parsedSpecs.push({
      name,
      value: specValue,
      sortOrder: parsedSpecs.length,
    });

    if (parsedSpecs.length > MAX_PRODUCT_SPECS) {
      return { ok: false, error: `Tối đa ${MAX_PRODUCT_SPECS} thông số sản phẩm.` };
    }
  }

  return { ok: true, data: parsedSpecs };
};

export const slugifyProduct = (value: string): string => {
  const base = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return (base || 'san-pham').slice(0, 120);
};

function createEntityId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${randomBytes(6).toString('hex')}`.slice(0, 191);
}

async function getReadyPool() {
  if (!isDatabaseConfigured()) {
    throw new Error('DATABASE_URL chưa được cấu hình.');
  }

  const ready = await ensureDatabaseSchema();
  if (!ready) {
    throw new Error('Không thể kết nối cơ sở dữ liệu.');
  }

  const pool = getDbPool();
  if (!pool) {
    throw new Error('Không thể khởi tạo kết nối cơ sở dữ liệu.');
  }

  return pool;
}

function mapCategoryRow(row: CatalogCategoryRow): CatalogCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    parentId: row.parentId,
    sortOrder: row.sortOrder,
    isActive: toBooleanFromDb(row.isActive),
  };
}

function buildWhereClause(
  params: Pick<ListCatalogProductsParams, 'search' | 'categoryId' | 'tab'>,
  values: Array<string | number>,
): string {
  const whereClauses: string[] = ['1=1'];

  if (params.search) {
    const likeValue = `%${normalizeLikeValue(params.search)}%`;
    whereClauses.push('(p.name LIKE ? OR p.slug LIKE ?)');
    values.push(likeValue, likeValue);
  }

  if (params.categoryId) {
    whereClauses.push('p.categoryId = ?');
    values.push(params.categoryId);
  }

  if (params.tab) {
    whereClauses.push('p.tab = ?');
    values.push(params.tab);
  }

  return whereClauses.join(' AND ');
}

function mapProducts(
  rows: CatalogProductRow[],
  imageRows: CatalogProductImageRow[],
  specRows: CatalogProductSpecRow[],
): CatalogProduct[] {
  const imageMap = new Map<string, string[]>();
  const specMap = new Map<string, CatalogProductSpec[]>();

  for (const row of imageRows) {
    const list = imageMap.get(row.productId) ?? [];
    if (row.url && !list.includes(row.url) && list.length < MAX_PRODUCT_IMAGES) {
      list.push(row.url);
      imageMap.set(row.productId, list);
    }
  }

  for (const row of specRows) {
    const list = specMap.get(row.productId) ?? [];
    list.push({
      id: row.id,
      name: row.name,
      value: row.value,
      sortOrder: row.sortOrder,
    });
    specMap.set(row.productId, list);
  }

  return rows.map((row) => {
    const imageUrls = imageMap.get(row.id) ?? [];
    const primaryImageUrl = imageUrls[0] ?? row.imageUrl;

    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      imageUrl: primaryImageUrl,
      imageUrls: imageUrls.length > 0 ? imageUrls : primaryImageUrl ? [primaryImageUrl] : [],
      shortDescription: row.shortDescription,
      description: row.description,
      specs: (specMap.get(row.id) ?? []).sort((a, b) => a.sortOrder - b.sortOrder),
      showContactPrice:
        row.price <= 0 && (row.originalPrice === null || Number(row.originalPrice) <= 0),
      price: row.price,
      originalPrice: row.originalPrice,
      badge: row.badge,
      tab: row.tab,
      inStock: toBooleanFromDb(row.inStock),
      isFeatured: toBooleanFromDb(row.isFeatured),
      categoryId: row.categoryId,
      categoryName: row.categoryName,
      createdAt: toIso(row.createdAt),
    };
  });
}

async function loadImagesAndSpecsByProductIds(
  productIds: string[],
): Promise<{ imageRows: CatalogProductImageRow[]; specRows: CatalogProductSpecRow[] }> {
  if (productIds.length === 0) {
    return { imageRows: [], specRows: [] };
  }

  const pool = await getReadyPool();
  const placeholders = productIds.map(() => '?').join(', ');

  const [imageRows] = await pool.query<CatalogProductImageRow[]>(
    `SELECT id, productId, url, sortOrder, createdAt
     FROM productimage
     WHERE variantId IS NULL AND productId IN (${placeholders})
     ORDER BY productId ASC, sortOrder ASC, createdAt ASC`,
    productIds,
  );

  const [specRows] = await pool.query<CatalogProductSpecRow[]>(
    `SELECT id, productId, name, value, sortOrder, createdAt
     FROM productspec
     WHERE productId IN (${placeholders})
     ORDER BY productId ASC, sortOrder ASC, createdAt ASC`,
    productIds,
  );

  return { imageRows, specRows };
}

async function resolveUniqueSlug(
  connection: PoolConnection,
  baseSlug: string,
  excludeId?: string,
): Promise<string> {
  let candidate = baseSlug;
  let counter = 1;

  while (true) {
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT id
       FROM product
       WHERE slug = ? ${excludeId ? 'AND id <> ?' : ''}
       LIMIT 1`,
      excludeId ? [candidate, excludeId] : [candidate],
    );

    if (rows.length === 0) {
      return candidate;
    }

    candidate = `${baseSlug}-${counter}`.slice(0, 191);
    counter += 1;
  }
}

async function ensureCategoryExists(connection: PoolConnection, categoryId: string): Promise<boolean> {
  const [rows] = await connection.query<RowDataPacket[]>(
    `SELECT id FROM category WHERE id = ? LIMIT 1`,
    [categoryId],
  );

  return rows.length > 0;
}

async function insertProductImages(
  connection: PoolConnection,
  productId: string,
  imageUrls: string[],
): Promise<void> {
  for (const [index, url] of imageUrls.entries()) {
    await connection.execute<ResultSetHeader>(
      `INSERT INTO productimage (
         id, productId, variantId, url, alt, isPrimary, sortOrder, createdAt, updatedAt
       ) VALUES (?, ?, NULL, ?, NULL, ?, ?, NOW(3), NOW(3))`,
      [createEntityId('pimg'), productId, url, index === 0 ? 1 : 0, index],
    );
  }
}

async function insertProductSpecs(
  connection: PoolConnection,
  productId: string,
  specs: CatalogProductInput['specs'],
): Promise<void> {
  for (const spec of specs) {
    await connection.execute<ResultSetHeader>(
      `INSERT INTO productspec (
         id, productId, name, value, sortOrder, createdAt, updatedAt
       ) VALUES (?, ?, ?, ?, ?, NOW(3), NOW(3))`,
      [createEntityId('psp'), productId, spec.name, spec.value, spec.sortOrder],
    );
  }
}

export async function listCatalogCategories(options?: { activeOnly?: boolean }): Promise<CatalogCategory[]> {
  const pool = await getReadyPool();
  const activeFilter = options?.activeOnly ? 'WHERE isActive = 1' : '';

  try {
    const [rows] = await pool.query<CatalogCategoryRow[]>(
      `SELECT id, name, slug, description, parentId, sortOrder, isActive, createdAt
       FROM category
       ${activeFilter}
       ORDER BY sortOrder ASC, createdAt ASC`,
    );

    return rows.map(mapCategoryRow);
  } catch (error) {
    if (isNoSuchTableError(error)) {
      throw new Error('Chưa tìm thấy bảng category. Hãy import SQL toamhoanhao trước.');
    }
    throw error;
  }
}

export async function listCatalogProducts(
  input: Partial<ListCatalogProductsParams> = {},
): Promise<ListCatalogProductsResult> {
  const page = normalizePage(input.page ?? 1);
  const limit = normalizeLimit(input.limit ?? 50);
  const search = normalizeLikeValue(input.search ?? '');
  const categoryId = (input.categoryId ?? '').trim();
  const tab = input.tab ?? null;

  const pool = await getReadyPool();

  try {
    const values: Array<string | number> = [];
    const whereSql = buildWhereClause({ search, categoryId, tab }, values);

    const [countRows] = await pool.query<CountRow[]>(
      `SELECT COUNT(*) AS total
       FROM product p
       WHERE ${whereSql}`,
      values,
    );

    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const offset = (safePage - 1) * limit;

    const [rows] = await pool.query<CatalogProductRow[]>(
      `SELECT
         p.id,
         p.name,
         p.slug,
         p.imageUrl,
         p.shortDescription,
         p.description,
         p.price,
         p.originalPrice,
         p.badge,
         p.tab,
         p.inStock,
         p.isFeatured,
         p.categoryId,
         p.createdAt,
         p.updatedAt,
         c.name AS categoryName,
         c.slug AS categorySlug
       FROM product p
       LEFT JOIN category c ON c.id = p.categoryId
       WHERE ${whereSql}
       ORDER BY p.createdAt DESC
       LIMIT ? OFFSET ?`,
      [...values, limit, offset],
    );

    const productIds = rows.map((row) => row.id);
    const { imageRows, specRows } = await loadImagesAndSpecsByProductIds(productIds);
    const categories = await listCatalogCategories();

    return {
      products: mapProducts(rows, imageRows, specRows),
      categories,
      pagination: {
        page: safePage,
        limit,
        total,
        totalPages,
        hasNext: safePage < totalPages,
        hasPrev: safePage > 1,
      },
      filters: {
        search,
        categoryId,
        tab,
      },
    };
  } catch (error) {
    if (isNoSuchTableError(error)) {
      throw new Error('Chưa tìm thấy bảng product/category. Hãy import SQL toamhoanhao trước.');
    }
    throw error;
  }
}

export async function getCatalogProductById(productId: string): Promise<CatalogProduct | null> {
  const id = productId.trim();
  if (!id) {
    return null;
  }

  const pool = await getReadyPool();

  try {
    const [rows] = await pool.query<CatalogProductRow[]>(
      `SELECT
         p.id,
         p.name,
         p.slug,
         p.imageUrl,
         p.shortDescription,
         p.description,
         p.price,
         p.originalPrice,
         p.badge,
         p.tab,
         p.inStock,
         p.isFeatured,
         p.categoryId,
         p.createdAt,
         p.updatedAt,
         c.name AS categoryName,
         c.slug AS categorySlug
       FROM product p
       LEFT JOIN category c ON c.id = p.categoryId
       WHERE p.id = ?
       LIMIT 1`,
      [id],
    );

    const row = rows[0];
    if (!row) {
      return null;
    }

    const { imageRows, specRows } = await loadImagesAndSpecsByProductIds([id]);
    const mapped = mapProducts([row], imageRows, specRows);
    return mapped[0] ?? null;
  } catch (error) {
    if (isNoSuchTableError(error)) {
      throw new Error('Chưa tìm thấy bảng product/category. Hãy import SQL toamhoanhao trước.');
    }
    throw error;
  }
}

export async function getCatalogProductBySlug(slug: string): Promise<PublicCatalogProductRecord | null> {
  const normalized = slug.trim();
  if (!normalized) {
    return null;
  }

  const pool = await getReadyPool();

  try {
    const [rows] = await pool.query<CatalogProductRow[]>(
      `SELECT
         p.id,
         p.name,
         p.slug,
         p.imageUrl,
         p.shortDescription,
         p.description,
         p.price,
         p.originalPrice,
         p.badge,
         p.tab,
         p.inStock,
         p.isFeatured,
         p.categoryId,
         p.createdAt,
         p.updatedAt,
         c.name AS categoryName,
         c.slug AS categorySlug
       FROM product p
       LEFT JOIN category c ON c.id = p.categoryId
       WHERE p.slug = ?
         AND p.status = 'ACTIVE'
         AND p.isPublished = 1
         AND p.inStock = 1
       LIMIT 1`,
      [normalized],
    );

    const row = rows[0];
    if (!row) {
      return null;
    }

    const { imageRows, specRows } = await loadImagesAndSpecsByProductIds([row.id]);
    const imageUrls = imageRows
      .filter((item) => item.productId === row.id)
      .map((item) => item.url)
      .filter((url, index, array) => Boolean(url) && array.indexOf(url) === index)
      .slice(0, MAX_PRODUCT_IMAGES);

    const specs = specRows
      .filter((item) => item.productId === row.id)
      .map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        sortOrder: item.sortOrder,
      }));

    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      shortDescription: row.shortDescription,
      description: row.description,
      imageUrl: imageUrls[0] ?? row.imageUrl,
      imageUrls,
      specs,
      category:
        row.categoryId && row.categoryName && row.categorySlug
          ? {
              id: row.categoryId,
              slug: row.categorySlug,
              name: row.categoryName,
            }
          : null,
      createdAt: toIso(row.createdAt),
      updatedAt: toIso(row.updatedAt),
    };
  } catch (error) {
    if (isNoSuchTableError(error)) {
      return null;
    }
    throw error;
  }
}

async function queryPublicCatalogProducts(
  limit: number | null,
): Promise<PublicCatalogProductRecord[]> {
  const pool = await getReadyPool();
  const limitSql = typeof limit === 'number' ? 'LIMIT ?' : '';
  const queryValues: Array<string | number> = [];
  if (typeof limit === 'number') {
    queryValues.push(limit);
  }

  try {
    const [rows] = await pool.query<CatalogProductRow[]>(
      `SELECT
         p.id,
         p.name,
         p.slug,
         p.imageUrl,
         p.shortDescription,
         p.description,
         p.price,
         p.originalPrice,
         p.badge,
         p.tab,
         p.inStock,
         p.isFeatured,
         p.categoryId,
         p.createdAt,
         p.updatedAt,
         c.name AS categoryName,
         c.slug AS categorySlug
       FROM product p
       LEFT JOIN category c ON c.id = p.categoryId
       WHERE p.status = 'ACTIVE'
         AND p.isPublished = 1
         AND p.inStock = 1
       ORDER BY p.createdAt DESC
       ${limitSql}`,
      queryValues,
    );

    const productIds = rows.map((row) => row.id);
    const { imageRows, specRows } = await loadImagesAndSpecsByProductIds(productIds);

    return rows.map((row) => {
      const imageUrls = imageRows
        .filter((item) => item.productId === row.id)
        .map((item) => item.url)
        .filter((url, index, array) => Boolean(url) && array.indexOf(url) === index)
        .slice(0, MAX_PRODUCT_IMAGES);
      const specs = specRows
        .filter((item) => item.productId === row.id)
        .map((item) => ({
          id: item.id,
          name: item.name,
          value: item.value,
          sortOrder: item.sortOrder,
        }));

      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        shortDescription: row.shortDescription,
        description: row.description,
        imageUrl: imageUrls[0] ?? row.imageUrl,
        imageUrls,
        specs,
        category:
          row.categoryId && row.categoryName && row.categorySlug
            ? {
                id: row.categoryId,
                slug: row.categorySlug,
                name: row.categoryName,
              }
            : null,
        createdAt: toIso(row.createdAt),
        updatedAt: toIso(row.updatedAt),
      };
    });
  } catch (error) {
    if (isNoSuchTableError(error)) {
      return [];
    }
    throw error;
  }
}

export async function listPublicCatalogProducts(perPage: number): Promise<PublicCatalogProductRecord[]> {
  const limit = Math.min(100, Math.max(1, Math.floor(perPage)));
  return queryPublicCatalogProducts(limit);
}

export async function listAllPublicCatalogProducts(): Promise<PublicCatalogProductRecord[]> {
  return queryPublicCatalogProducts(null);
}

export async function parseCatalogProductInput(
  input: unknown,
): Promise<{ ok: true; data: CatalogProductInput } | { ok: false; error: string }> {
  const payload = toRecord(input);

  if (!payload) {
    return { ok: false, error: 'Payload không hợp lệ.' };
  }

  const name = toCleanString(payload.name, 180);
  if (!name) {
    return { ok: false, error: 'Tên sản phẩm là bắt buộc.' };
  }

  const showContactPrice = toBooleanInput(payload.showContactPrice, false);
  const parsedPrice = toNumber(payload.price);
  const parsedOriginalPrice = toNumber(payload.originalPrice);

  if (!showContactPrice && (parsedPrice === null || parsedPrice < 0)) {
    return { ok: false, error: 'Giá bán không hợp lệ.' };
  }

  if (parsedOriginalPrice !== null && parsedOriginalPrice < 0) {
    return { ok: false, error: 'Giá gốc không hợp lệ.' };
  }

  const price = showContactPrice ? 0 : (parsedPrice ?? 0);
  const originalPrice = showContactPrice ? null : parsedOriginalPrice;

  const specsParsed = toSpecs(payload.specs);
  if (!specsParsed.ok) {
    return { ok: false, error: specsParsed.error };
  }

  const imageUrlInput = toCleanString(payload.imageUrl, 191);
  const imageUrlsFromPayload = toStringArray(payload.imageUrls)
    .map((url) => toCleanString(url, 191))
    .filter((url): url is string => Boolean(url));

  const mergedImageUrls: string[] = [];
  if (imageUrlInput) {
    mergedImageUrls.push(imageUrlInput);
  }

  for (const url of imageUrlsFromPayload) {
    if (!mergedImageUrls.includes(url)) {
      mergedImageUrls.push(url);
    }
  }

  if (mergedImageUrls.length > MAX_PRODUCT_IMAGES) {
    return { ok: false, error: `Mỗi sản phẩm tối đa ${MAX_PRODUCT_IMAGES} ảnh.` };
  }

  return {
    ok: true,
    data: {
      name,
      slugInput: toCleanString(payload.slug, 120) ?? '',
      imageUrl: mergedImageUrls[0] ?? null,
      imageUrls: mergedImageUrls,
      shortDescription: toCleanMultilineString(payload.shortDescription, 191),
      description: toCleanMultilineString(payload.description, 191),
      specs: specsParsed.data,
      showContactPrice,
      price,
      originalPrice,
      badge: toCleanString(payload.badge, 191),
      tab: toTab(payload.tab),
      inStock: toBooleanInput(payload.inStock, true),
      isFeatured: toBooleanInput(payload.isFeatured, false),
      categoryId: toCleanString(payload.categoryId, 191),
    },
  };
}

function toBooleanInput(value: unknown, fallback: boolean): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  if (typeof value === 'string') {
    const cleaned = value.trim().toLowerCase();
    if (BOOLEAN_TRUE_VALUES.has(cleaned)) {
      return true;
    }
    if (BOOLEAN_FALSE_VALUES.has(cleaned)) {
      return false;
    }
  }

  return fallback;
}

export async function createCatalogProduct(input: CatalogProductInput): Promise<CatalogProduct> {
  const pool = await getReadyPool();
  const connection = await pool.getConnection();
  let createdProductId: string | null = null;

  try {
    await connection.beginTransaction();

    if (input.categoryId) {
      const categoryExists = await ensureCategoryExists(connection, input.categoryId);
      if (!categoryExists) {
        throw new Error('Danh mục không tồn tại.');
      }
    }

    const slugBase = slugifyProduct(input.slugInput || input.name);
    const uniqueSlug = await resolveUniqueSlug(connection, slugBase);
    const productId = createEntityId('prd');
    createdProductId = productId;

    await connection.execute<ResultSetHeader>(
      `INSERT INTO product (
         id,
         name,
         slug,
         sku,
         description,
         imageUrl,
         price,
         originalPrice,
         badge,
         tab,
         isFeatured,
         inStock,
         categoryId,
         createdAt,
         updatedAt,
         shortDescription,
         status,
         isPublished,
         totalSold
       ) VALUES (
         ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3), ?, 'ACTIVE', 1, 0
       )`,
      [
        productId,
        input.name,
        uniqueSlug,
        input.description,
        input.imageUrl,
        input.price,
        input.originalPrice,
        input.badge,
        input.tab,
        input.isFeatured ? 1 : 0,
        input.inStock ? 1 : 0,
        input.categoryId,
        input.shortDescription,
      ],
    );

    if (input.imageUrls.length > 0) {
      await insertProductImages(connection, productId, input.imageUrls);
    }

    if (input.specs.length > 0) {
      await insertProductSpecs(connection, productId, input.specs);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    if (isNoSuchTableError(error)) {
      throw new Error('Chưa tìm thấy bảng product/category. Hãy import SQL toamhoanhao trước.');
    }
    throw error;
  } finally {
    connection.release();
  }

  if (!createdProductId) {
    throw new Error('Không thể đọc lại sản phẩm vừa tạo.');
  }

  const product = await getCatalogProductById(createdProductId);
  if (!product) {
    throw new Error('Không thể đọc lại sản phẩm vừa tạo.');
  }
  return product;
}

export async function updateCatalogProduct(
  productId: string,
  input: CatalogProductInput,
): Promise<CatalogProduct | null> {
  const id = productId.trim();
  if (!id) {
    return null;
  }

  const pool = await getReadyPool();
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [existingRows] = await connection.query<RowDataPacket[]>(
      `SELECT id FROM product WHERE id = ? LIMIT 1`,
      [id],
    );

    if (existingRows.length === 0) {
      await connection.rollback();
      return null;
    }

    if (input.categoryId) {
      const categoryExists = await ensureCategoryExists(connection, input.categoryId);
      if (!categoryExists) {
        throw new Error('Danh mục không tồn tại.');
      }
    }

    const slugBase = slugifyProduct(input.slugInput || input.name);
    const uniqueSlug = await resolveUniqueSlug(connection, slugBase, id);

    await connection.execute<ResultSetHeader>(
      `UPDATE product
       SET
         name = ?,
         slug = ?,
         description = ?,
         imageUrl = ?,
         price = ?,
         originalPrice = ?,
         badge = ?,
         tab = ?,
         isFeatured = ?,
         inStock = ?,
         categoryId = ?,
         shortDescription = ?,
         updatedAt = NOW(3)
       WHERE id = ?`,
      [
        input.name,
        uniqueSlug,
        input.description,
        input.imageUrl,
        input.price,
        input.originalPrice,
        input.badge,
        input.tab,
        input.isFeatured ? 1 : 0,
        input.inStock ? 1 : 0,
        input.categoryId,
        input.shortDescription,
        id,
      ],
    );

    await connection.execute<ResultSetHeader>(
      `DELETE FROM productimage WHERE productId = ? AND variantId IS NULL`,
      [id],
    );

    if (input.imageUrls.length > 0) {
      await insertProductImages(connection, id, input.imageUrls);
    }

    await connection.execute<ResultSetHeader>(
      `DELETE FROM productspec WHERE productId = ?`,
      [id],
    );

    if (input.specs.length > 0) {
      await insertProductSpecs(connection, id, input.specs);
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    if (isNoSuchTableError(error)) {
      throw new Error('Chưa tìm thấy bảng product/category. Hãy import SQL toamhoanhao trước.');
    }
    throw error;
  } finally {
    connection.release();
  }

  return getCatalogProductById(id);
}

export async function deleteCatalogProduct(productId: string): Promise<boolean> {
  const id = productId.trim();
  if (!id) {
    return false;
  }

  const pool = await getReadyPool();

  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `DELETE FROM product WHERE id = ? LIMIT 1`,
      [id],
    );

    return result.affectedRows > 0;
  } catch (error) {
    if (isNoSuchTableError(error)) {
      throw new Error('Chưa tìm thấy bảng product/category. Hãy import SQL toamhoanhao trước.');
    }
    throw error;
  }
}

export async function isCatalogProductSchemaAvailable(): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return false;
  }

  const ready = await ensureDatabaseSchema();
  if (!ready) {
    return false;
  }

  const pool = getDbPool();
  if (!pool) {
    return false;
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total
       FROM information_schema.tables
       WHERE table_schema = DATABASE()
         AND table_name IN ('product', 'category', 'productimage')`,
    );

    return Number(rows[0]?.total ?? 0) >= 3;
  } catch {
    return false;
  }
}
