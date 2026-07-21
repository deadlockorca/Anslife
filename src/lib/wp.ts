import type { Cf7Response, WpCategory, WpEntity } from '../types/wp';

const API_BASE = (
  process.env.NEXT_PUBLIC_INTERNAL_API_BASE ?? '/api/public'
).replace(/\/$/, '');

function normalizePerPage(perPage: number): number {
  if (!Number.isFinite(perPage)) {
    return 24;
  }

  return Math.min(100, Math.max(1, Math.floor(perPage)));
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const endpoint = `${API_BASE}${path}`;
  const response = await fetch(endpoint, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status}) at ${endpoint}`;
    try {
      const errorBody = (await response.json()) as { message?: unknown };
      if (typeof errorBody.message === 'string' && errorBody.message.trim()) {
        message = errorBody.message;
      }
    } catch {
      // Keep the fallback request error when the response is not JSON.
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
}

function firstOrNull<T>(items: T[]): T | null {
  if (!items || items.length === 0) {
    return null;
  }

  return items[0];
}

export async function getPageBySlug(slug: string): Promise<WpEntity | null> {
  const data = await fetchJson<WpEntity[]>(
    `/pages?slug=${encodeURIComponent(slug)}`,
  );
  return firstOrNull(data);
}

export async function getProducts(perPage = 24): Promise<WpEntity[]> {
  const normalizedPerPage = normalizePerPage(perPage);
  return fetchJson<WpEntity[]>(`/products?per_page=${normalizedPerPage}`);
}
export interface ProductPageResponse {
  items: WpEntity[];
  total: number;
  totalPages: number;
  page: number;
  perPage: number;
}

function parseHeaderNumber(value: string | null, fallback: number): number {
  const parsed = Number(value ?? '');
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return parsed;
}

export async function getProductsPage(input?: {
  perPage?: number;
  page?: number;
  categorySlugs?: string[];
  sort?: 'newest' | 'name-asc' | 'name-desc';
}): Promise<ProductPageResponse> {
  const perPage = normalizePerPage(input?.perPage ?? 24);
  const pageRaw = Number(input?.page ?? 1);
  const page = Number.isFinite(pageRaw) ? Math.max(1, Math.floor(pageRaw)) : 1;
  const params = new URLSearchParams();
  params.set('per_page', String(perPage));
  params.set('page', String(page));

  if (Array.isArray(input?.categorySlugs) && input.categorySlugs.length > 0) {
    params.set('category_slugs', input.categorySlugs.join(','));
  }

  if (input?.sort && input.sort !== 'newest') {
    params.set('sort', input.sort);
  }

  const endpoint = `${API_BASE}/products?${params.toString()}`;
  const response = await fetch(endpoint, {
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) at ${endpoint}`);
  }

  const items = (await response.json()) as WpEntity[];
  const total = parseHeaderNumber(response.headers.get('X-WP-Total'), items.length);
  const totalPages = parseHeaderNumber(response.headers.get('X-WP-TotalPages'), 1);
  const currentPage = parseHeaderNumber(response.headers.get('X-WP-Page'), page);
  const currentPerPage = parseHeaderNumber(response.headers.get('X-WP-Per-Page'), perPage);

  return {
    items,
    total,
    totalPages,
    page: currentPage,
    perPage: currentPerPage,
  };
}

export async function getProductBySlug(slug: string): Promise<WpEntity | null> {
  const data = await fetchJson<WpEntity[]>(`/products?slug=${encodeURIComponent(slug)}`);
  return firstOrNull(data);
}

export async function getProjects(perPage = 24): Promise<WpEntity[]> {
  const normalizedPerPage = normalizePerPage(perPage);
  return fetchJson<WpEntity[]>(`/projects?per_page=${normalizedPerPage}`);
}

export async function getProjectBySlug(slug: string): Promise<WpEntity | null> {
  const data = await fetchJson<WpEntity[]>(`/projects?slug=${encodeURIComponent(slug)}`);
  return firstOrNull(data);
}

export async function getNews(perPage = 24): Promise<WpEntity[]> {
  const normalizedPerPage = normalizePerPage(perPage);
  return fetchJson<WpEntity[]>(`/news?per_page=${normalizedPerPage}`);
}

export async function getNewsBySlug(slug: string): Promise<WpEntity | null> {
  const data = await fetchJson<WpEntity[]>(`/news?slug=${encodeURIComponent(slug)}`);
  return firstOrNull(data);
}

export async function getCategories(): Promise<WpCategory[]> {
  return fetchJson<WpCategory[]>(`/categories?taxonomy=category`);
}

export async function getProductCategories(): Promise<WpCategory[]> {
  return fetchJson<WpCategory[]>(`/categories?taxonomy=product_category`);
}

export async function getProjectTypes(): Promise<WpCategory[]> {
  return fetchJson<WpCategory[]>(`/categories?taxonomy=project_type`);
}

export async function submitContactForm(
  formId: number,
  payload: Record<string, string>,
  attachmentFile?: File,
): Promise<Cf7Response> {
  if (attachmentFile) {
    const formData = new FormData();
    formData.append('formId', String(formId));
    formData.append('payload', JSON.stringify(payload));
    formData.append('attachment', attachmentFile);

    return fetchJson<Cf7Response>(`/contact`, {
      method: 'POST',
      body: formData,
    });
  }

  return fetchJson<Cf7Response>(`/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formId, payload }),
  });
}
