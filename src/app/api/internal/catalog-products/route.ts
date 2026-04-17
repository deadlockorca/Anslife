import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor } from '../../../../lib/auth/actor';
import { can } from '../../../../lib/auth/authorization';
import {
  type CatalogProductTab,
  createCatalogProduct,
  listCatalogProducts,
  parseCatalogProductInput,
} from '../../../../lib/repositories/catalogProductRepository';

export const dynamic = 'force-dynamic';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

function parsePositiveInt(value: string | null, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.floor(parsed);
}

function parseTabFilter(value: string | null): CatalogProductTab | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toUpperCase();
  if (normalized === 'NEW' || normalized === 'BEST' || normalized === 'SALE') {
    return normalized;
  }

  return null;
}

function parseListParams(url: URL) {
  const page = parsePositiveInt(url.searchParams.get('page'), DEFAULT_PAGE);
  const requestedLimit = parsePositiveInt(url.searchParams.get('limit'), DEFAULT_LIMIT);

  return {
    page,
    limit: Math.min(requestedLimit, MAX_LIMIT),
    search: (url.searchParams.get('search') ?? '').trim(),
    categoryId: (url.searchParams.get('categoryId') ?? '').trim(),
    tab: parseTabFilter(url.searchParams.get('tab')),
  };
}

function canManageCatalog(actor: Awaited<ReturnType<typeof getAuthActor>>): boolean {
  if (!actor) {
    return false;
  }

  return can({
    roles: actor.roles,
    resource: 'system',
    action: 'manage',
    actorScopes: actor.scopes,
  }).allowed;
}

export async function GET(request: NextRequest) {
  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json({ ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' }, { status: 401 });
    }

    if (!canManageCatalog(actor)) {
      return NextResponse.json({ ok: false, code: 'forbidden', message: 'Bạn không có quyền truy cập danh mục sản phẩm.' }, { status: 403 });
    }

    const params = parseListParams(new URL(request.url));
    const payload = await listCatalogProducts(params);

    return NextResponse.json({
      ok: true,
      products: payload.products,
      categories: payload.categories,
      pagination: payload.pagination,
      filters: payload.filters,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Không thể tải dữ liệu sản phẩm.';
    console.error('[API][internal][catalog-products][GET] Failed:', error);
    return NextResponse.json({ ok: false, code: 'internal_error', message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' }, { status: 400 });
  }

  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json({ ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' }, { status: 401 });
    }

    if (!canManageCatalog(actor)) {
      return NextResponse.json({ ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo sản phẩm.' }, { status: 403 });
    }

    const parsed = await parseCatalogProductInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, code: 'invalid_input', message: parsed.error }, { status: 400 });
    }

    const product = await createCatalogProduct(parsed.data);
    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Không thể tạo sản phẩm.';
    console.error('[API][internal][catalog-products][POST] Failed:', error);
    return NextResponse.json({ ok: false, code: 'internal_error', message }, { status: 500 });
  }
}
