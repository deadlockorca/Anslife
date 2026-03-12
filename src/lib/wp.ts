import type { Cf7Response, WpCategory, WpEntity } from '../types/wp';

const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://cms.muagi.vn/wp-json'
).replace(/\/$/, '');
const FALLBACK_API_BASE = API_BASE.endsWith('/wp-json')
  ? API_BASE.replace(/\/wp-json$/, '/index.php/wp-json')
  : API_BASE;

function normalizePerPage(perPage: number): number {
  if (!Number.isFinite(perPage)) {
    return 24;
  }

  return Math.min(100, Math.max(1, Math.floor(perPage)));
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const endpoints = [API_BASE];
  if (FALLBACK_API_BASE !== API_BASE) {
    endpoints.push(FALLBACK_API_BASE);
  }

  let networkError: Error | null = null;

  for (const base of endpoints) {
    const endpoint = `${base}${path}`;

    try {
      const response = await fetch(endpoint, {
        ...init,
        headers: {
          Accept: 'application/json',
          ...(init?.headers ?? {}),
        },
      });

      if (response.ok) {
        return (await response.json()) as T;
      }

      const shouldTryNext = response.status === 404 && base !== endpoints.at(-1);
      if (shouldTryNext) {
        continue;
      }

      throw new Error(`Request failed (${response.status}) at ${endpoint}`);
    } catch (error) {
      networkError =
        error instanceof Error
          ? error
          : new Error(`Unknown request error at ${endpoint}`);

      const hasMoreOptions = base !== endpoints.at(-1);
      if (hasMoreOptions) {
        continue;
      }
    }
  }

  throw networkError ?? new Error('Unknown API error');
}

function is404Error(error: unknown): boolean {
  return error instanceof Error && /Request failed \(404\)/.test(error.message);
}

function firstOrNull<T>(items: T[]): T | null {
  if (!items || items.length === 0) {
    return null;
  }

  return items[0];
}

export async function getPageBySlug(slug: string): Promise<WpEntity | null> {
  const data = await fetchJson<WpEntity[]>(
    `/wp/v2/pages?slug=${encodeURIComponent(slug)}&_embed=1`,
  );
  return firstOrNull(data);
}

export async function getProducts(perPage = 24): Promise<WpEntity[]> {
  const normalizedPerPage = normalizePerPage(perPage);

  try {
    return await fetchJson<WpEntity[]>(
      `/wp/v2/product?per_page=${normalizedPerPage}&_embed=1`,
    );
  } catch (error) {
    if (is404Error(error)) {
      return [];
    }

    throw error;
  }
}

export async function getProductBySlug(slug: string): Promise<WpEntity | null> {
  try {
    const data = await fetchJson<WpEntity[]>(
      `/wp/v2/product?slug=${encodeURIComponent(slug)}&_embed=1`,
    );
    return firstOrNull(data);
  } catch (error) {
    if (is404Error(error)) {
      return null;
    }

    throw error;
  }
}

export async function getProjects(perPage = 24): Promise<WpEntity[]> {
  const normalizedPerPage = normalizePerPage(perPage);

  try {
    return await fetchJson<WpEntity[]>(
      `/wp/v2/project?per_page=${normalizedPerPage}&_embed=1`,
    );
  } catch (error) {
    if (is404Error(error)) {
      return [];
    }

    throw error;
  }
}

export async function getProjectBySlug(slug: string): Promise<WpEntity | null> {
  try {
    const data = await fetchJson<WpEntity[]>(
      `/wp/v2/project?slug=${encodeURIComponent(slug)}&_embed=1`,
    );
    return firstOrNull(data);
  } catch (error) {
    if (is404Error(error)) {
      return null;
    }

    throw error;
  }
}

export async function getNews(perPage = 24): Promise<WpEntity[]> {
  const normalizedPerPage = normalizePerPage(perPage);
  return fetchJson<WpEntity[]>(`/wp/v2/posts?per_page=${normalizedPerPage}&_embed=1`);
}

export async function getNewsBySlug(slug: string): Promise<WpEntity | null> {
  const data = await fetchJson<WpEntity[]>(
    `/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed=1`,
  );
  return firstOrNull(data);
}

export async function getCategories(): Promise<WpCategory[]> {
  return fetchJson<WpCategory[]>(`/wp/v2/categories?per_page=100`);
}

export async function getProductCategories(): Promise<WpCategory[]> {
  try {
    return await fetchJson<WpCategory[]>(`/wp/v2/product_category?per_page=100`);
  } catch (error) {
    if (is404Error(error)) {
      return [];
    }

    throw error;
  }
}

export async function getProjectTypes(): Promise<WpCategory[]> {
  try {
    return await fetchJson<WpCategory[]>(`/wp/v2/project_type?per_page=100`);
  } catch (error) {
    if (is404Error(error)) {
      return [];
    }

    throw error;
  }
}

export async function submitContactForm(
  formId: number,
  payload: Record<string, string>,
): Promise<Cf7Response> {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.set(key, value);
  });

  return fetchJson<Cf7Response>(
    `/contact-form-7/v1/contact-forms/${formId}/feedback`,
    {
      method: 'POST',
      body: formData,
    },
  );
}
