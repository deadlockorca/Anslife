import { NextResponse } from 'next/server';
import { createContactLead } from '../../../../lib/repositories/contentRepository';
import { getCorsHeaders } from '../../../../lib/http/cors';
import {
  type ContactEmailAttachment,
  sendContactNotificationEmail,
} from '../../../../lib/email/contactNotification';
import { createRecruitmentApplication } from '../../../../lib/repositories/recruitmentRepository';

export const dynamic = 'force-dynamic';
const MAX_CONTACT_ATTACHMENT_SIZE = 8 * 1024 * 1024;

interface ContactRequestBody {
  formId?: number;
  payload?: Record<string, string>;
}

interface UploadedFormFile {
  name: string;
  type?: string;
  size: number;
  arrayBuffer: () => Promise<ArrayBuffer>;
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

function sanitizeAttachmentFilename(filename: string): string {
  const cleaned = filename.replace(/[^\p{L}\p{N}._ -]+/gu, '_').trim();
  return cleaned || 'anslife-attachment';
}

function isUploadedFormFile(
  value: FormDataEntryValue | null,
): value is FormDataEntryValue & UploadedFormFile {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'size' in value &&
    'arrayBuffer' in value &&
    typeof value.arrayBuffer === 'function'
  );
}

async function parseContactRequest(request: Request): Promise<{
  formId: number;
  payload: Record<string, string>;
  attachments: ContactEmailAttachment[];
}> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.toLowerCase().includes('multipart/form-data')) {
    const formData = await request.formData();
    const formId = Number(formData.get('formId') ?? 0);
    const rawPayload = formData.get('payload');
    const parsedPayload =
      typeof rawPayload === 'string' && rawPayload.trim()
        ? (JSON.parse(rawPayload) as unknown)
        : {};
    const payload = normalizePayload(parsedPayload);
    const attachmentValue = formData.get('attachment');
    const attachments: ContactEmailAttachment[] = [];

    if (isUploadedFormFile(attachmentValue) && attachmentValue.size > 0) {
      if (attachmentValue.size > MAX_CONTACT_ATTACHMENT_SIZE) {
        throw new Error('CONTACT_ATTACHMENT_TOO_LARGE');
      }

      attachments.push({
        filename: sanitizeAttachmentFilename(attachmentValue.name),
        contentType: attachmentValue.type || undefined,
        content: Buffer.from(await attachmentValue.arrayBuffer()),
      });
    }

    return { formId, payload, attachments };
  }

  const body = (await request.json()) as ContactRequestBody;
  return {
    formId: Number(body?.formId ?? 0),
    payload: normalizePayload(body?.payload),
    attachments: [],
  };
}

export async function POST(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'POST, OPTIONS');
  let parsedRequest: {
    formId: number;
    payload: Record<string, string>;
    attachments: ContactEmailAttachment[];
  } | null = null;
  try {
    parsedRequest = await parseContactRequest(request);
  } catch (error) {
    if (error instanceof Error && error.message === 'CONTACT_ATTACHMENT_TOO_LARGE') {
      return NextResponse.json(
        { status: 'validation_failed', message: 'File đính kèm tối đa 8MB.' },
        { status: 400, headers },
      );
    }

    return NextResponse.json(
      { status: 'validation_failed', message: 'Payload không hợp lệ.' },
      { status: 400, headers },
    );
  }

  const { formId, payload, attachments } = parsedRequest;
  if (Object.keys(payload).length === 0) {
    return NextResponse.json(
      { status: 'validation_failed', message: 'Thiếu dữ liệu biểu mẫu.' },
      { status: 400, headers },
    );
  }

  let leadSaved = false;
  let leadError: unknown = null;
  try {
    await createContactLead(resolveFormType(formId), payload);
    leadSaved = true;
  } catch (error) {
    leadError = error;
    console.error('[API][contact] Failed to create lead:', error);
  }

  if (payload['request-category'] === 'recruitment_application') {
    try {
      await createRecruitmentApplication(payload);
    } catch (error) {
      console.error('[API][contact] Failed to create recruitment application:', error);
    }
  }

  try {
    await sendContactNotificationEmail(payload, attachments);
  } catch (error) {
    console.error('[API][contact] Failed to send notification email:', error);
    const message = leadSaved
      ? 'Yêu cầu đã được lưu nhưng chưa gửi được email thông báo. Vui lòng kiểm tra cấu hình SMTP.'
      : 'Không thể gửi email hoặc lưu yêu cầu. Vui lòng kiểm tra cấu hình SMTP và database.';

    return NextResponse.json(
      {
        status: 'mail_failed',
        message,
      },
      { status: 500, headers },
    );
  }

  if (leadError) {
    return NextResponse.json({
      status: 'mail_sent',
      message: 'Yêu cầu đã được gửi qua email.',
    }, { headers });
  }

  return NextResponse.json({
    status: 'mail_sent',
    message: 'Yêu cầu đã được gửi thành công.',
  }, { headers });
}

export async function OPTIONS(request: Request) {
  const headers = getCorsHeaders(request.headers.get('origin'), 'POST, OPTIONS');
  return new NextResponse(null, { status: 204, headers });
}
