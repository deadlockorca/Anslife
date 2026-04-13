import { NextRequest, NextResponse } from 'next/server';
import type { DataState } from '../../../../../lib/auth/authorization';
import {
  DATA_STATES,
  can,
  canTransitionDataState,
} from '../../../../../lib/auth/authorization';
import { getAuthActor, getRequestIp } from '../../../../../lib/auth/actor';
import { writeAuditLog } from '../../../../../lib/repositories/auditRepository';
import {
  getSupplierMaterialById,
  updateSupplierMaterial,
} from '../../../../../lib/repositories/workflowRepository';

export const dynamic = 'force-dynamic';

interface UpdateSupplierMaterialBody {
  supplierCode?: string;
  supplierName?: string;
  materialCode?: string;
  materialName?: string;
  certificateUrl?: string | null;
  quoteUrl?: string | null;
  metadata?: Record<string, unknown> | null;
  state?: string;
}

function parseId(value: string): number | null {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

function isDataState(value: string): value is DataState {
  return DATA_STATES.includes(value as DataState);
}

function isValidCode(value: string): boolean {
  return /^[A-Za-z0-9._-]{2,64}$/.test(value);
}

function buildScopeTargetFromItem(
  item: NonNullable<Awaited<ReturnType<typeof getSupplierMaterialById>>>,
) {
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
  item: NonNullable<Awaited<ReturnType<typeof getSupplierMaterialById>>>,
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

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
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

    const params = await context.params;
    const itemId = parseId(params.id);
    if (!itemId) {
      return NextResponse.json(
        { ok: false, code: 'invalid_item_id', message: 'ID dữ liệu không hợp lệ.' },
        { status: 400 },
      );
    }

    const item = await getSupplierMaterialById(itemId);
    if (!item) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu nhà cung cấp.' },
        { status: 404 },
      );
    }
    if (!canActorViewSupplierMaterial(actor, item)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền xem dữ liệu này.' },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    console.error('[API][internal][supplier-materials/:id][GET] Failed:', error);
    return NextResponse.json(
      { ok: false, code: 'internal_error', message: 'Không thể tải chi tiết dữ liệu nhà cung cấp.' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  let body: UpdateSupplierMaterialBody = {};
  try {
    body = (await request.json()) as UpdateSupplierMaterialBody;
  } catch {
    return NextResponse.json(
      { ok: false, code: 'invalid_payload', message: 'Payload không hợp lệ.' },
      { status: 400 },
    );
  }

  const params = await context.params;
  const itemId = parseId(params.id);
  if (!itemId) {
    return NextResponse.json(
      { ok: false, code: 'invalid_item_id', message: 'ID dữ liệu không hợp lệ.' },
      { status: 400 },
    );
  }

  const supplierCode =
    body.supplierCode == null ? undefined : String(body.supplierCode).trim().toUpperCase();
  const supplierName = body.supplierName == null ? undefined : String(body.supplierName).trim();
  const materialCode =
    body.materialCode == null ? undefined : String(body.materialCode).trim().toUpperCase();
  const materialName = body.materialName == null ? undefined : String(body.materialName).trim();
  const certificateUrl =
    body.certificateUrl == null ? body.certificateUrl : String(body.certificateUrl).trim();
  const quoteUrl = body.quoteUrl == null ? body.quoteUrl : String(body.quoteUrl).trim();
  const metadata =
    body.metadata === undefined
      ? undefined
      : body.metadata === null
        ? null
        : body.metadata && typeof body.metadata === 'object' && !Array.isArray(body.metadata)
          ? body.metadata
          : undefined;
  const state = body.state == null ? undefined : String(body.state).trim().toLowerCase();

  if (supplierCode !== undefined && !isValidCode(supplierCode)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_supplier_code', message: 'Mã nhà cung cấp không hợp lệ.' },
      { status: 400 },
    );
  }
  if (supplierName !== undefined && (supplierName.length < 2 || supplierName.length > 191)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_supplier_name', message: 'Tên nhà cung cấp không hợp lệ.' },
      { status: 400 },
    );
  }
  if (materialCode !== undefined && !isValidCode(materialCode)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_material_code', message: 'Mã vật liệu không hợp lệ.' },
      { status: 400 },
    );
  }
  if (materialName !== undefined && (materialName.length < 2 || materialName.length > 191)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_material_name', message: 'Tên vật liệu không hợp lệ.' },
      { status: 400 },
    );
  }
  if (certificateUrl !== undefined && certificateUrl !== null && certificateUrl.length > 1024) {
    return NextResponse.json(
      { ok: false, code: 'invalid_certificate_url', message: 'Certificate URL quá dài.' },
      { status: 400 },
    );
  }
  if (quoteUrl !== undefined && quoteUrl !== null && quoteUrl.length > 1024) {
    return NextResponse.json(
      { ok: false, code: 'invalid_quote_url', message: 'Quote URL quá dài.' },
      { status: 400 },
    );
  }
  if (metadata === undefined && body.metadata !== undefined) {
    return NextResponse.json(
      { ok: false, code: 'invalid_metadata', message: 'Metadata phải là JSON object hoặc null.' },
      { status: 400 },
    );
  }
  if (state !== undefined && !isDataState(state)) {
    return NextResponse.json(
      { ok: false, code: 'invalid_state', message: 'Trạng thái dữ liệu không hợp lệ.' },
      { status: 400 },
    );
  }

  const hasAnyField =
    supplierCode !== undefined ||
    supplierName !== undefined ||
    materialCode !== undefined ||
    materialName !== undefined ||
    certificateUrl !== undefined ||
    quoteUrl !== undefined ||
    metadata !== undefined ||
    state !== undefined;
  if (!hasAnyField) {
    return NextResponse.json(
      { ok: false, code: 'no_changes', message: 'Không có dữ liệu cần cập nhật.' },
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

    const currentItem = await getSupplierMaterialById(itemId);
    if (!currentItem) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu nhà cung cấp.' },
        { status: 404 },
      );
    }
    if (!isDataState(currentItem.state)) {
      return NextResponse.json(
        { ok: false, code: 'invalid_state', message: 'Trạng thái hiện tại của dữ liệu nhà cung cấp không hợp lệ.' },
        { status: 500 },
      );
    }
    const currentState: DataState = currentItem.state;
    if (!canActorViewSupplierMaterial(actor, currentItem)) {
      return NextResponse.json(
        { ok: false, code: 'forbidden', message: 'Bạn không có quyền sửa dữ liệu này.' },
        { status: 403 },
      );
    }

    const scopeTarget = buildScopeTargetFromItem(currentItem);
    const hasContentUpdate =
      supplierCode !== undefined ||
      supplierName !== undefined ||
      materialCode !== undefined ||
      materialName !== undefined ||
      certificateUrl !== undefined ||
      quoteUrl !== undefined ||
      metadata !== undefined;
    if (hasContentUpdate) {
      const updateDecision = can({
        roles: actor.roles,
        resource: 'supplier_material',
        action: 'update',
        state: currentState,
        actorScopes: actor.scopes,
        scopeTarget,
      });
      if (!updateDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: 'Bạn không có quyền cập nhật dữ liệu nhà cung cấp.' },
          { status: 403 },
        );
      }
    }

    let approvedBy: number | null | undefined;
    let approvedAt: string | null | undefined;
    if (state !== undefined && state !== currentState) {
      const transitionDecision = canTransitionDataState({
        roles: actor.roles,
        from: currentState,
        to: state,
      });
      if (!transitionDecision.allowed) {
        return NextResponse.json(
          { ok: false, code: 'forbidden', message: transitionDecision.reason },
          { status: 403 },
        );
      }
      if (['approved_internal', 'approved_sales', 'approved_buyer'].includes(state)) {
        approvedBy = actor.userId;
        approvedAt = new Date().toISOString();
      } else {
        approvedBy = null;
        approvedAt = null;
      }
    }

    const updated = await updateSupplierMaterial(itemId, {
      supplierCode,
      supplierName,
      materialCode,
      materialName,
      certificateUrl,
      quoteUrl,
      metadata,
      state,
      approvedBy,
      approvedAt,
    });
    if (!updated) {
      return NextResponse.json(
        { ok: false, code: 'not_found', message: 'Không tìm thấy dữ liệu nhà cung cấp.' },
        { status: 404 },
      );
    }

    await writeAuditLog({
      actorUserId: actor.userId,
      action: state !== undefined && state !== currentItem.state ? 'change_state' : 'update',
      resource: 'supplier_material',
      resourceId: String(updated.id),
      before: {
        state: currentItem.state,
        supplierCode: currentItem.supplierCode,
        materialCode: currentItem.materialCode,
      },
      after: {
        state: updated.state,
        supplierCode: updated.supplierCode,
        materialCode: updated.materialCode,
      },
      ipAddress: getRequestIp(request),
      userAgent: request.headers.get('user-agent'),
    });

    return NextResponse.json({ ok: true, item: updated });
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

    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Không thể cập nhật dữ liệu nhà cung cấp.';
    const statusCode = message.includes('Invalid date') ? 400 : 500;
    console.error('[API][internal][supplier-materials/:id][PATCH] Failed:', error);
    return NextResponse.json(
      { ok: false, code: statusCode === 400 ? 'invalid_input' : 'internal_error', message },
      { status: statusCode },
    );
  }
}
