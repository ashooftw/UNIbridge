import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const problems = await prisma.problemStatement.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: problems });
  } catch (error) {
    console.error('Failed to fetch problems:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch problems' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, companyName, description, requiredSkills, targetDeliverables, difficulty, timelineWeeks, targetAudience } = body;

    if (!title || !companyName || !description || !requiredSkills) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: title, companyName, description, and requiredSkills are required.'
      }, { status: 400 });
    }

    const newProblem = await prisma.problemStatement.create({
      data: {
        title: title.trim(),
        companyName: companyName.trim(),
        description: description.trim(),
        requiredSkills: requiredSkills.trim(),
        targetDeliverables: (targetDeliverables || 'Prototype source code, documentation, test benchmark report').trim(),
        difficulty: difficulty || 'INTERMEDIATE',
        timelineWeeks: Number(timelineWeeks) || 12,
        mentorshipAvailable: true,
        targetAudience: (targetAudience || 'Student Capstone Team').trim(),
      },
    });

    return NextResponse.json({ success: true, data: newProblem });
  } catch (error) {
    console.error('Failed to create problem statement:', error);
    return NextResponse.json({ success: false, error: 'Failed to create problem statement' }, { status: 500 });
  }
}
