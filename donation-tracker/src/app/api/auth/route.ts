import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

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

  // Generate a cookie
  const cookie = serialize('token', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  const response = NextResponse.json({ message: 'Login successful' });
  response.headers.append('Set-Cookie', cookie);

  return response;
}
