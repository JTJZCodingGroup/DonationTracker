import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface LoginType {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body: LoginType = await req.json();

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // You can add a session or JWT token generation here

  return NextResponse.json({ message: 'Login successful' });
}
