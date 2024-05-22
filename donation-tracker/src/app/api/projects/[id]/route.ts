import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaModel";

interface contextType {
  params: {
    id: string;
  };
}

export async function GET(req: Request, context: contextType) {
  const { params } = context;

  console.log("CALLING GET NOT FROM CACHE");

  const project = await prisma.projects.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!project)
    return NextResponse.json({}, { status: 500, statusText: "invalid ID" });

  const donations = await prisma.donations.findMany({
    where: {
      project_id: params.id,
    },
  });

  return NextResponse.json({ project, donations });
}
