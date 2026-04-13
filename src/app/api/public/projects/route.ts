import { NextResponse } from 'next/server';
import {
  getProjectBySlug,
  listProjects,
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
      const project = await getProjectBySlug(slug);
      return NextResponse.json(project ? [project] : [], { headers });
    }

    const projects = await listProjects(perPage);
    return NextResponse.json(projects, { headers });
  } catch (error) {
    console.error('[API][projects] Failed to load projects:', error);
    return NextResponse.json(
      { code: 'internal_error', message: 'Failed to load projects.' },
      { status: 500, headers },
    );
  }
}

export async function OPTIONS(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'GET, OPTIONS');
  return new NextResponse(null, { status: 204, headers });
}
