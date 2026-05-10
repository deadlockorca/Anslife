import { NextRequest, NextResponse } from 'next/server';
import { getAuthActor } from '../../../../../lib/auth/actor';
import { can } from '../../../../../lib/auth/authorization';
import { uploadImageToR2 } from '../../../../../lib/storage/r2';

export const runtime = 'nodejs';
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

export async function POST(request: NextRequest) {
  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }

    if (!canManageCatalog(actor)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tải ảnh sản phẩm.' },
        { status: 403 },
      );
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('multipart/form-data')) {
      return NextResponse.json(
        {
          ok: false,
          code: 'invalid_content_type',
          message: 'Content-Type không hợp lệ. Vui lòng gửi multipart/form-data.',
        },
        { status: 400 },
      );
    }

    const formData = await request.formData();
    const fileValue = formData.get('file');
    const folderValue = formData.get('folder');

    if (!(fileValue instanceof File)) {
      return NextResponse.json(
        { ok: false, code: 'missing_file', message: 'Thiếu file ảnh.' },
        { status: 400 },
      );
    }

    const folder = typeof folderValue === 'string' ? folderValue : 'products';
    const uploaded = await uploadImageToR2({
      file: fileValue,
      folder,
    });

    return NextResponse.json(
      {
        ok: true,
        url: uploaded.url,
        key: uploaded.key,
        size: uploaded.size,
        contentType: uploaded.contentType,
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Không thể tải ảnh lên R2.';
    return NextResponse.json({ ok: false, code: 'internal_error', message }, { status: 500 });
  }
}
