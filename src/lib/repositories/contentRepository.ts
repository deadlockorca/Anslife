import type { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ensureDatabaseSchema, getDbPool, isDatabaseConfigured } from '../db/mysql';
import type { WpCategory, WpEntity, WpTerm } from '../../types/wp';
import {
  getCatalogProductBySlug as getCatalogProductBySlugRecord,
  isCatalogProductSchemaAvailable,
  listCatalogCategories,
  listPublicCatalogProducts,
  type PublicCatalogProductRecord,
} from './catalogProductRepository';

type EntityKind = 'page' | 'product' | 'project' | 'news';
type ContactFormType = 'quote' | 'meeting' | 'contact';

interface EntityRow extends RowDataPacket {
  id: number;
  kind: EntityKind;
  slug: string;
  title: string;
  excerpt_html: string | null;
  content_html: string | null;
  featured_image: string | null;
  gallery_json: string | null;
  specifications_json: string | null;
  published_at: string;
}

interface TermRow extends RowDataPacket {
  item_id: number;
  id: number;
  taxonomy: string;
  slug: string;
  name: string;
}

interface TaxonomyRow extends RowDataPacket {
  id: number;
  slug: string;
  name: string;
  parent_id: number | string | null;
}

function normalizePerPage(perPage: number | null | undefined, fallback = 24): number {
  if (!Number.isFinite(perPage)) {
    return fallback;
  }

  return Math.min(100, Math.max(1, Math.floor(perPage as number)));
}

function parseJsonValue<T>(value: string | null): T | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

function toWpEntity(row: EntityRow, termGroups: WpTerm[][]): WpEntity {
  const featuredMedia = row.featured_image
    ? [{ source_url: row.featured_image }]
    : undefined;
  const embedded =
    featuredMedia || termGroups.length > 0
      ? {
          ...(featuredMedia ? { 'wp:featuredmedia': featuredMedia } : {}),
          ...(termGroups.length > 0 ? { 'wp:term': termGroups } : {}),
        }
      : undefined;

  return {
    id: row.id,
    slug: row.slug,
    date: new Date(row.published_at).toISOString(),
    link: `/${row.kind}/${row.slug}`,
    title: { rendered: row.title ?? '' },
    content: { rendered: row.content_html ?? '' },
    excerpt: { rendered: row.excerpt_html ?? '' },
    gallery: parseJsonValue(row.gallery_json),
    specifications: parseJsonValue(row.specifications_json),
    _embedded: embedded,
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toParagraphHtml(value: string | null): string {
  if (!value || value.trim().length === 0) {
    return '';
  }

  return `<p>${escapeHtml(value).replace(/\n/g, '<br/>')}</p>`;
}

function toWpEntityFromCatalogRecord(record: PublicCatalogProductRecord): WpEntity {
  const featuredMedia = record.imageUrl
    ? [{ source_url: record.imageUrl }]
    : undefined;
  const terms: WpTerm[][] = record.category
    ? [
        [
          {
            id: record.category.id,
            slug: record.category.slug,
            name: record.category.name,
            taxonomy: 'product_category',
          },
        ],
      ]
    : [];

  const embedded =
    featuredMedia || terms.length > 0
      ? {
          ...(featuredMedia ? { 'wp:featuredmedia': featuredMedia } : {}),
          ...(terms.length > 0 ? { 'wp:term': terms } : {}),
        }
      : undefined;

  return {
    id: record.id,
    slug: record.slug,
    date: new Date(record.createdAt).toISOString(),
    link: `/product/${record.slug}`,
    title: { rendered: record.name },
    content: { rendered: toParagraphHtml(record.description) },
    excerpt: { rendered: toParagraphHtml(record.shortDescription) },
    gallery: record.imageUrls.map((url, index) => ({
      id: `${record.id}-${index + 1}`,
      src: url,
      thumbnail: url,
      alt: record.name,
    })),
    specifications:
      record.specs.length > 0
        ? {
            items: record.specs.map((spec) => ({
              name: spec.name,
              value: spec.value,
            })),
          }
        : undefined,
    _embedded: embedded,
  };
}

async function loadTermGroupsByItemId(
  itemIds: number[],
): Promise<Map<number, WpTerm[][]>> {
  const groupedTerms = new Map<number, WpTerm[][]>();
  if (itemIds.length === 0) {
    return groupedTerms;
  }

  const pool = getDbPool();
  if (!pool) {
    return groupedTerms;
  }

  const placeholders = itemIds.map(() => '?').join(', ');
  const [rows] = await pool.query<TermRow[]>(
    `SELECT cit.item_id, t.id, t.taxonomy, t.slug, t.name
     FROM content_item_taxonomies cit
     INNER JOIN taxonomies t ON t.id = cit.taxonomy_id
     WHERE cit.item_id IN (${placeholders})
     ORDER BY cit.item_id ASC, t.taxonomy ASC, t.name ASC`,
    itemIds,
  );

  const taxonomyMapByItem = new Map<number, Map<string, WpTerm[]>>();
  for (const row of rows) {
    const taxonomyMap =
      taxonomyMapByItem.get(row.item_id) ?? new Map<string, WpTerm[]>();
    const taxonomyTerms = taxonomyMap.get(row.taxonomy) ?? [];

    taxonomyTerms.push({
      id: row.id,
      slug: row.slug,
      name: row.name,
      taxonomy: row.taxonomy,
    });
    taxonomyMap.set(row.taxonomy, taxonomyTerms);
    taxonomyMapByItem.set(row.item_id, taxonomyMap);
  }

  for (const [itemId, taxonomyMap] of taxonomyMapByItem.entries()) {
    groupedTerms.set(itemId, Array.from(taxonomyMap.values()));
  }

  return groupedTerms;
}

async function listEntitiesByKind(
  kind: EntityKind,
  perPage?: number,
): Promise<WpEntity[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const ready = await ensureDatabaseSchema();
  if (!ready) {
    return [];
  }

  const pool = getDbPool();
  if (!pool) {
    return [];
  }

  const [rows] = await pool.query<EntityRow[]>(
    `SELECT id, kind, slug, title, excerpt_html, content_html, featured_image,
            gallery_json, specifications_json, published_at
     FROM content_items
     WHERE kind = ?
     ORDER BY published_at DESC, id DESC
     LIMIT ?`,
    [kind, normalizePerPage(perPage)],
  );

  const itemIds = rows.map((row) => row.id);
  const termGroupsByItem = await loadTermGroupsByItemId(itemIds);

  return rows.map((row) => toWpEntity(row, termGroupsByItem.get(row.id) ?? []));
}

async function getEntityByKindAndSlug(
  kind: EntityKind,
  slug: string,
): Promise<WpEntity | null> {
  if (!slug) {
    return null;
  }

  if (!isDatabaseConfigured()) {
    return null;
  }

  const ready = await ensureDatabaseSchema();
  if (!ready) {
    return null;
  }

  const pool = getDbPool();
  if (!pool) {
    return null;
  }

  const [rows] = await pool.query<EntityRow[]>(
    `SELECT id, kind, slug, title, excerpt_html, content_html, featured_image,
            gallery_json, specifications_json, published_at
     FROM content_items
     WHERE kind = ? AND slug = ?
     LIMIT 1`,
    [kind, slug],
  );

  const row = rows[0];
  if (!row) {
    return null;
  }

  const termGroupsByItem = await loadTermGroupsByItemId([row.id]);
  return toWpEntity(row, termGroupsByItem.get(row.id) ?? []);
}

export async function getPageBySlug(slug: string): Promise<WpEntity | null> {
  return getEntityByKindAndSlug('page', slug);
}

export async function listProducts(perPage?: number): Promise<WpEntity[]> {
  if (await isCatalogProductSchemaAvailable()) {
    const products = await listPublicCatalogProducts(normalizePerPage(perPage));
    if (products.length > 0) {
      return products.map(toWpEntityFromCatalogRecord);
    }
  }

  return listEntitiesByKind('product', perPage);
}

export async function getProductBySlug(slug: string): Promise<WpEntity | null> {
  if (await isCatalogProductSchemaAvailable()) {
    const product = await getCatalogProductBySlugRecord(slug);
    if (product) {
      return toWpEntityFromCatalogRecord(product);
    }
  }

  return getEntityByKindAndSlug('product', slug);
}

export async function listProjects(perPage?: number): Promise<WpEntity[]> {
  return listEntitiesByKind('project', perPage);
}

export async function getProjectBySlug(slug: string): Promise<WpEntity | null> {
  return getEntityByKindAndSlug('project', slug);
}

export async function listNews(perPage?: number): Promise<WpEntity[]> {
  return listEntitiesByKind('news', perPage);
}

export async function getNewsBySlug(slug: string): Promise<WpEntity | null> {
  return getEntityByKindAndSlug('news', slug);
}

export async function listCategoriesByTaxonomy(
  taxonomy: string,
): Promise<WpCategory[]> {
  if (taxonomy === 'product_category') {
    try {
      const categories = await listCatalogCategories({ activeOnly: true });
      if (categories.length > 0) {
        return categories.map((category) => ({
          id: category.id,
          slug: category.slug,
          name: category.name,
          parentId: category.parentId,
        }));
      }
    } catch (error) {
      console.warn(
        '[contentRepository] Falling back to taxonomies for product_category:',
        error,
      );
    }
  }

  if (!taxonomy || !isDatabaseConfigured()) {
    return [];
  }

  const ready = await ensureDatabaseSchema();
  if (!ready) {
    return [];
  }

  const pool = getDbPool();
  if (!pool) {
    return [];
  }

  const [rows] = await pool.query<TaxonomyRow[]>(
    `SELECT id, slug, name, NULL AS parent_id
     FROM taxonomies
     WHERE taxonomy = ?
     ORDER BY name ASC`,
    [taxonomy],
  );

  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    parentId: row.parent_id,
  }));
}

function pickValue(payload: Record<string, string>, keys: string[]): string {
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim();
    }
  }

  return '';
}

export async function createContactLead(
  formType: ContactFormType,
  payload: Record<string, string>,
): Promise<number> {
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

  const sanitizedPayload = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, String(value ?? '')]),
  );

  const name = pickValue(sanitizedPayload, ['your-name', 'name', 'full_name']);
  const email = pickValue(sanitizedPayload, ['your-email', 'email']);
  const phone = pickValue(sanitizedPayload, ['your-phone', 'phone']);
  const company = pickValue(sanitizedPayload, ['your-company', 'company']);
  const message = pickValue(sanitizedPayload, ['your-message', 'message']);
  const productInterest = pickValue(sanitizedPayload, [
    'product-interest',
    'product_interest',
  ]);

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO contact_leads (
      form_type, name, email, phone, company, message, product_interest, payload_json, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    [
      formType,
      name || null,
      email || null,
      phone || null,
      company || null,
      message || null,
      productInterest || null,
      JSON.stringify(sanitizedPayload),
    ],
  );

  return result.insertId;
}
