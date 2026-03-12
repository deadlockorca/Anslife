import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'anslife-next',
    timestamp: new Date().toISOString(),
  });
}
