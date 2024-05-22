import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prismaModel";

interface NewProjectType {
  name: string;
  goal: number;
  end_date: string;
  progress: number;
}

export async function POST(req: Request) {
  const body: NewProjectType = await req.json();
  const project = await prisma.projects.create({
    data: body,
  });

  return NextResponse.json(project);
}

export async function GET(req: Request) {
  console.log("REVALIDATING");
  const projects = await prisma.projects.findMany();

  return NextResponse.json(projects);
}
