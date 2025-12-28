"use server";

import prisma from "@/lib/prisma";

export async function getIssues(filter: string) {
  const shouldFilter = filter && filter !== "All";

  const response = await prisma.issue.findMany({
    take: 10,
    where: shouldFilter ? { issue_labels: { has: filter } } : {},
  });
  return response;
}
