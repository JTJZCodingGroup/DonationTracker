import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

interface RegisterType {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const body: RegisterType = await req.json();

  // Hash the password
  const hashedPassword = await bcrypt.hash(body.password, 10);

  // Create a new user
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPassword,
    },
  });

  // Generate a cookie
  const cookie = serialize('token', user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  const response = NextResponse.json({ message: 'Registration successful', user });
  response.headers.append('Set-Cookie', cookie);

  return response;
}
