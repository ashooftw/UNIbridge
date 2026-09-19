import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const records = await prisma.skillGapTelemetry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    console.error('Failed to fetch telemetry records:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch telemetry records' }, { status: 500 });
  }
}
