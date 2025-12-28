"use server";
import prisma from "@/lib/prisma";

export async function getProjects() {
  const projects = await prisma.project.findMany({
    include: {
      _count: {
        select: {
          issues: true,
        },
      },
      
    },
  });
  return projects;
}


