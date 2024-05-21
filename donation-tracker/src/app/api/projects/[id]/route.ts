import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface contextType {
  params: {
    id: string
  }
}

export async function GET(req: Request, context: contextType) {
  const { params } = context;
  const project = await prisma.projects.findUnique({
    where: {
        id: params.id,
      },
  });

  const donations = await prisma.donations.findMany({
    where: {
      project_id: params.id,
    }
  })
  
  return NextResponse.json({project, donations})
}
