import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor } from '../../../../../lib/auth/actor';
import { can } from '../../../../../lib/auth/authorization';
import {
  deleteCatalogProduct,
  parseCatalogProductInput,
  updateCatalogProduct,
} from '../../../../../lib/repositories/catalogProductRepository';

export const dynamic = 'force-dynamic';

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

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
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
      return NextResponse.json({ ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật sản phẩm.' }, { status: 403 });
    }

    const parsed = await parseCatalogProductInput(body);
    if (!parsed.ok) {
      return NextResponse.json({ ok: false, code: 'invalid_input', message: parsed.error }, { status: 400 });
    }

    const product = await updateCatalogProduct(id, parsed.data);
    if (!product) {
      return NextResponse.json({ ok: false, code: 'not_found', message: 'Không tìm thấy sản phẩm.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, product });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Không thể cập nhật sản phẩm.';
    console.error('[API][internal][catalog-products/:id][PATCH] Failed:', error);
    return NextResponse.json({ ok: false, code: 'internal_error', message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json({ ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' }, { status: 401 });
    }

    if (!canManageCatalog(actor)) {
      return NextResponse.json({ ok: false, code: 'forbidden', message: 'Bạn không có quyền xóa sản phẩm.' }, { status: 403 });
    }

    const deleted = await deleteCatalogProduct(id);
    if (!deleted) {
      return NextResponse.json({ ok: false, code: 'not_found', message: 'Không tìm thấy sản phẩm.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Không thể xóa sản phẩm.';
    console.error('[API][internal][catalog-products/:id][DELETE] Failed:', error);
    return NextResponse.json({ ok: false, code: 'internal_error', message }, { status: 500 });
  }
}
