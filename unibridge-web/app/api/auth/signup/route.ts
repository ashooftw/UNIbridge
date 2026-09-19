import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, role, department, institution, skills } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: 'User with this institutional email already exists.' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role: role || 'STUDENT',
        department: department || 'Ayush Health Informatics',
        institution: institution || 'All India Institute of Ayurveda',
        skills: skills || 'Python, Next.js, FHIR Standards',
      },
    });

    return NextResponse.json({
      success: true,
      user: newUser,
      message: 'Account successfully registered on UniBridge!',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create user account' }, { status: 500 });
  }
}
