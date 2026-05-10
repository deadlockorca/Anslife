import { NextResponse } from 'next/server';
import {
  getProductBySlug,
  listProductsPage,
  listProducts,
  type PublicProductSortKey,
} from '../../../../lib/repositories/contentRepository';
import { getCorsHeaders } from '../../../../lib/http/cors';

export const dynamic = 'force-dynamic';

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 24);
  if (!Number.isFinite(parsed)) {
    return 24;
  }

  return Math.min(100, Math.max(1, Math.floor(parsed)));
}

function parsePage(value: string | null): number {
  const parsed = Number(value ?? 1);
  if (!Number.isFinite(parsed)) {
    return 1;
  }

  return Math.max(1, Math.floor(parsed));
}

function parseCategorySlugs(value: string | null): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function parseSort(value: string | null): PublicProductSortKey {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (normalized === 'name-asc' || normalized === 'name-desc') {
    return normalized;
  }

  return 'newest';
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug')?.trim() ?? '';
  const page = parsePage(url.searchParams.get('page'));
  const perPage = parsePerPage(url.searchParams.get('per_page'));
  const categorySlugs = parseCategorySlugs(url.searchParams.get('category_slugs'));
  const sort = parseSort(url.searchParams.get('sort'));
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');

  try {
    if (slug) {
      const product = await getProductBySlug(slug);
      return NextResponse.json(product ? [product] : [], { headers });
    }

    if (categorySlugs.length > 0 || page > 1 || sort !== 'newest' || perPage === 24) {
      const pagedResult = await listProductsPage({
        page,
        perPage,
        categorySlugs,
        sort,
      });

      return NextResponse.json(pagedResult.items, {
        headers: {
          ...headers,
          'X-WP-Total': String(pagedResult.pagination.total),
          'X-WP-TotalPages': String(pagedResult.pagination.totalPages),
          'X-WP-Page': String(pagedResult.pagination.page),
          'X-WP-Per-Page': String(pagedResult.pagination.perPage),
        },
      });
    }

    const products = await listProducts(perPage);
    return NextResponse.json(products, {
      headers: {
        ...headers,
        'X-WP-Total': String(products.length),
        'X-WP-TotalPages': '1',
        'X-WP-Page': '1',
        'X-WP-Per-Page': String(perPage),
      },
    });
  } catch (error) {
    console.error('[API][products] Failed to load products:', error);
    return NextResponse.json(
      { code: 'internal_error', message: 'Failed to load products.' },
      { status: 500, headers },
    );
  }
}

export async function OPTIONS(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');
  return new NextResponse(null, { status: 204, headers });
}
