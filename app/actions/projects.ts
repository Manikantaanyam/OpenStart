"use server";
import prisma from "@/lib/prisma";

export async function getProjects() {
  try {
    const [totalIssues, projects] = await Promise.all([
      prisma.issue.count(),
      prisma.project.findMany({
        orderBy: {
          stars: "desc",
        },
        include: {
          _count: {
            select: {
              issues: true,
            },
          },
        },
      }),
    ]);

    return { totalIssues, projects };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch projects.");
  }
}
