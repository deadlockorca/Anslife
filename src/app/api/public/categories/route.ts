import { NextResponse } from 'next/server';
import { listCategoriesByTaxonomy } from '../../../../lib/repositories/contentRepository';
import { getCorsHeaders } from '../../../../lib/http/cors';

export const dynamic = 'force-dynamic';

const ALLOWED_TAXONOMIES = new Set([
  'category',
  'product_category',
  'project_type',
  'product_finish',
  'product_seat_option',
]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const taxonomy = (url.searchParams.get('taxonomy') ?? 'category').trim();
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');

  if (!ALLOWED_TAXONOMIES.has(taxonomy)) {
    return NextResponse.json(
      { code: 'invalid_taxonomy', message: 'Invalid taxonomy.' },
      { status: 400, headers },
    );
  }

  try {
    const categories = await listCategoriesByTaxonomy(taxonomy);
    return NextResponse.json(categories, { headers });
  } catch (error) {
    console.error('[API][categories] Failed to load categories:', error);
    return NextResponse.json(
      { code: 'internal_error', message: 'Failed to load categories.' },
      { status: 500, headers },
    );
  }
}

export async function OPTIONS(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');
  return new NextResponse(null, { status: 204, headers });
}
