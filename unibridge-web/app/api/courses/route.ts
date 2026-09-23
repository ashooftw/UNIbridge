import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const courses = await prisma.courseOutcome.findMany({
      orderBy: { courseName: 'asc' },
    });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch courses' }, { status: 500 });
  }
}
