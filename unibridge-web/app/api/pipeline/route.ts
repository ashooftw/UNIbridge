import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pipelineItems = await prisma.placementPipeline.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: pipelineItems });
  } catch (error) {
    console.error('Failed to fetch placement pipeline data:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch placement pipeline data' }, { status: 500 });
  }
}
