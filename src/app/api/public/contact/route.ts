import { NextResponse } from 'next/server';
import { createContactLead } from '../../../../lib/repositories/contentRepository';
import { getCorsHeaders } from '../../../../lib/http/cors';

export const dynamic = 'force-dynamic';

interface ContactRequestBody {
  formId?: number;
  payload?: Record<string, string>;
}

function normalizePayload(payload: unknown): Record<string, string> {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [key, String(value ?? '')]),
  );
}

function resolveFormType(formId: number): 'quote' | 'meeting' | 'contact' {
  const quoteFormId = Number(process.env.NEXT_PUBLIC_CF7_QUOTE_FORM_ID ?? 1);
  const meetingFormId = Number(process.env.NEXT_PUBLIC_CF7_MEETING_FORM_ID ?? 2);

  if (formId === quoteFormId) {
    return 'quote';
  }

  if (formId === meetingFormId) {
    return 'meeting';
  }

  return 'contact';
}

export async function POST(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'POST, OPTIONS');
  let body: ContactRequestBody | null = null;
  try {
    body = (await request.json()) as ContactRequestBody;
  } catch {
    return NextResponse.json(
      { status: 'validation_failed', message: 'Payload không hợp lệ.' },
      { status: 400, headers },
    );
  }

  const formId = Number(body?.formId ?? 0);
  const payload = normalizePayload(body?.payload);
  if (Object.keys(payload).length === 0) {
    return NextResponse.json(
      { status: 'validation_failed', message: 'Thiếu dữ liệu biểu mẫu.' },
      { status: 400, headers },
    );
  }

  try {
    await createContactLead(resolveFormType(formId), payload);
    return NextResponse.json({
      status: 'mail_sent',
      message: 'Yêu cầu đã được gửi thành công.',
    }, { headers });
  } catch (error) {
    console.error('[API][contact] Failed to create lead:', error);
    return NextResponse.json(
      {
        status: 'mail_failed',
        message:
          'Không thể lưu yêu cầu vào hệ thống dữ liệu. Vui lòng kiểm tra cấu hình database.',
      },
      { status: 500, headers },
    );
  }
}

export async function OPTIONS(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'POST, OPTIONS');
  return new NextResponse(null, { status: 204, headers });
}
