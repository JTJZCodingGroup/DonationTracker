import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prismaModel";

interface newDonationType {
  project_id: string;
  amount: number;
  donated_at?: string;
}

export async function POST(req: Request) {
  const body: newDonationType = await req.json();

  // add donation to donation table
  const donation = await prisma.donations.create({
    data: body,
  });

  // update progress of project by donation amount
  const res = await prisma.projects.update({
    where: {
      id: body.project_id,
    },
    data: {
      progress: {
        increment: body.amount,
      },
    },
  });

  return NextResponse.json(donation);
}
