import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface newDonationType {
  project_id: string,
  amount: number
  donated_at?: string,
}

export async function POST(req: Request) {
  const body:newDonationType = await req.json();
  
  const donation = await prisma.donations.create({
    data: body
  });
  
  return NextResponse.json(donation)
}