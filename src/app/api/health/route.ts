import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: '1Fi EMI Store API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
}
