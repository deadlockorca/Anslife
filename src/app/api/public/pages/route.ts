import { NextResponse } from 'next/server';
import { getPageBySlug } from '../../../../lib/repositories/contentRepository';
import { getCorsHeaders } from '../../../../lib/http/cors';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug')?.trim() ?? '';
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');

  if (!slug) {
    return NextResponse.json([], { headers });
  }

  try {
    const page = await getPageBySlug(slug);
    return NextResponse.json(page ? [page] : [], { headers });
  } catch (error) {
    console.error('[API][pages] Failed to load page:', error);
    return NextResponse.json(
      { code: 'internal_error', message: 'Failed to load page.' },
      { status: 500, headers },
    );
  }
}

export async function OPTIONS(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');
  return new NextResponse(null, { status: 204, headers });
}
