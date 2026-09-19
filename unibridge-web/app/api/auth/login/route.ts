import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json();

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          role: role || 'STUDENT',
          skills: 'Python, Next.js, FHIR Standards, Embedded C++',
        },
      });
    }

    return NextResponse.json({
      success: true,
      user,
      message: `Welcome back, ${user.name}! Authenticated for role ${user.role}.`,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
