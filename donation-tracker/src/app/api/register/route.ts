import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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

  return NextResponse.json({ message: 'Registration successful', user });
}
