import { NextResponse } from 'next/server';
import {
  getProductBySlug,
  listProducts,
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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug')?.trim() ?? '';
  const perPage = parsePerPage(url.searchParams.get('per_page'));
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');

  try {
    if (slug) {
      const product = await getProductBySlug(slug);
      return NextResponse.json(product ? [product] : [], { headers });
    }

    const products = await listProducts(perPage);
    return NextResponse.json(products, { headers });
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
