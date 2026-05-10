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
    throw new Error(`Request failed (${response.status}) at ${endpoint}`);
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

export async function getAllProducts(): Promise<WpEntity[]> {
  return fetchJson<WpEntity[]>(`/products?per_page=all`);
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
): Promise<Cf7Response> {
  return fetchJson<Cf7Response>(`/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formId, payload }),
  });
}
