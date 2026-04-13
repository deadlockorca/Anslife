import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../lib/auth/authorization';
import { DATA_STATES, can } from '../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../lib/repositories/auditRepository';
import {
  createSupplierMaterial,
  listSupplierMaterials,
  type SupplierMaterialRecord,
} from '../../../../lib/repositories/workflowRepository';

export const dynamic = 'force-dynamic';

interface CreateSupplierMaterialBody {
  supplierCode?: string;
  supplierName?: string;
  materialCode?: string;
  materialName?: string;
  certificateUrl?: string | null;
  quoteUrl?: string | null;
  metadata?: Record<string, unknown> | null;
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value ?? 100);
  if (!Number.isFinite(parsed)) {
    return 100;
  }
  return Math.min(200, Math.max(1, Math.floor(parsed)));
}

function isDataState(value: string): value is DataState {
  return DATA_STATES.includes(value as DataState);
}

function isValidCode(value: string): boolean {
  return /^[A-Za-z0-9._-]{2,64}$/.test(value);
}

function buildScopeTargetFromItem(item: SupplierMaterialRecord) {
  return {
    supplierId: item.supplierCode,
    materialCode: item.materialCode,
  };
}

function canAccessLegacySupplierModule(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
): boolean {
  return actor.roles.includes('super_admin') || actor.roles.includes('system_admin');
}

function canActorViewSupplierMaterial(
  actor: NonNullable<Awaited<ReturnType<typeof getAuthActor>>>,
  item: SupplierMaterialRecord,
): boolean {
  if (!isDataState(item.state)) {
    return false;
  }
  return can({
    roles: actor.roles,
    resource: 'supplier_material',
    action: 'view',
    state: item.state,
    actorScopes: actor.scopes,
    scopeTarget: buildScopeTargetFromItem(item),
  }).allowed;
}

export async function GET(request: NextRequest) {
  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }
    if (!canAccessLegacySupplierModule(actor)) {
      return NextResponse.json(
        {
          ok: false,
          code: 'forbidden',
          message:
            'Supplier Portal là module legacy. Chỉ Super Admin/Admin hệ thống mới được truy cập.',
        },
        { status: 403 },
      );
    }

    const url = new URL(request.url);
    const perPage = parsePerPage(url.searchParams.get('per_page'));
    const supplierCode = url.searchParams.get('supplier_code')?.trim() ?? '';
    const materialCode = url.searchParams.get('material_code')?.trim() ?? '';
    const state = url.searchParams.get('state')?.trim().toLowerCase() ?? '';

    if (state && !isDataState(state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái dữ liệu không hợp lệ.' },
        { status: 400 },
      );
    }

    const items = await listSupplierMaterials({
      limit: perPage,
      supplierCode: supplierCode || undefined,
      materialCode: materialCode || undefined,
      state: state || undefined,
    });
    const filteredItems = items.filter((item) => canActorViewSupplierMaterial(actor, item));
    return NextResponse.json({ ok: true, items: filteredItems });
  } catch (error) {
    console.error('[API][internal][supplier-materials][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải dữ liệu nhà cung cấp.' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: CreateSupplierMaterialBody = {};
  try {
    body = (await request.json()) as CreateSupplierMaterialBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const supplierCode = String(body.supplierCode ?? '').trim().toUpperCase();
  const supplierName = String(body.supplierName ?? '').trim();
  const materialCode = String(body.materialCode ?? '').trim().toUpperCase();
  const materialName = String(body.materialName ?? '').trim();
  const certificateUrl =
    body.certificateUrl == null ? null : String(body.certificateUrl).trim();
  const quoteUrl = body.quoteUrl == null ? null : String(body.quoteUrl).trim();
  const metadata =
    body.metadata === null
      ? null
      : body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
        ? body.metadata
        : undefined;

  if (!isValidCode(supplierCode)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_supplier_code', message: 'Mã nhà cung cấp không hợp lệ.' },
      { status: 400 },
    );
  }
  if (supplierName.length < 2 || supplierName.length > 191) {
    return NextResponse.json(
      { ok: false, code: 'invalid_supplier_name', message: 'Tên nhà cung cấp không hợp lệ.' },
      { status: 400 },
    );
  }
  if (!isValidCode(materialCode)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_material_code', message: 'Mã vật liệu không hợp lệ.' },
      { status: 400 },
    );
  }
  if (materialName.length < 2 || materialName.length > 191) {
    return NextResponse.json(
      { ok: false, code: 'invalid_material_name', message: 'Tên vật liệu không hợp lệ.' },
      { status: 400 },
    );
  }
  if (certificateUrl && certificateUrl.length > 1024) {
    return NextResponse.json(
      { ok: false, code: 'invalid_certificate_url', message: 'Certificate URL quá dài.' },
      { status: 400 },
    );
  }
  if (quoteUrl && quoteUrl.length > 1024) {
    return NextResponse.json(
      { ok: false, code: 'invalid_quote_url', message: 'Quote URL quá dài.' },
      { status: 400 },
    );
  }
  if (metadata === undefined) {
    return NextResponse.json(
      { ok: false, code: 'invalid_metadata', message: 'Metadata phải là JSON object hoặc null.' },
      { status: 400 },
    );
  }

  try {
    const actor = await getAuthActor(request);
    if (!actor) {
      return NextResponse.json(
        { ok: false, code: 'unauthorized', message: 'Bạn chưa đăng nhập.' },
        { status: 401 },
      );
    }
    if (!canAccessLegacySupplierModule(actor)) {
      return NextResponse.json(
        {
          ok: false,
          code: 'forbidden',
          message:
            'Supplier Portal là module legacy. Chỉ Super Admin/Admin hệ thống mới được truy cập.',
        },
        { status: 403 },
      );
    }

    const createDecision = can({
      roles: actor.roles,
      resource: 'supplier_material',
      action: 'create',
      state: 'pending_review',
      actorScopes: actor.scopes,
      scopeTarget: {
        supplierId: supplierCode,
        materialCode,
      },
    });
    if (!createDecision.allowed) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền tạo dữ liệu nhà cung cấp.' },
        { status: 403 },
      );
    }

    const item = await createSupplierMaterial({
      supplierCode,
      supplierName,
      materialCode,
      materialName,
      certificateUrl,
      quoteUrl,
      state: 'pending_review',
      metadata,
      createdBy: actor.userId,
    });

    await writeAuditLog({
      actorUserId: actor.userId,
      action: 'create',
      resource: 'supplier_material',
      resourceId: String(item.id),
      after: {
        supplierCode: item.supplierCode,
        materialCode: item.materialCode,
        state: item.state,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    const duplicateCode =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'ER_DUP_ENTRY';
    if (duplicateCode) {
      return NextResponse.json(
        { ok: false, code: 'duplicate_supplier_material', message: 'Cặp supplier/material đã tồn tại.' },
        { status: 409 },
      );
    }

    console.error('[API][internal][supplier-materials][POST] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tạo dữ liệu nhà cung cấp.' },
      { status: 500 },
    );
  }
}
