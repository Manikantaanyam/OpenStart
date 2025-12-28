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

export async function getIssueforRepo(repo_name: string, filter: string) {
  const shouldFilter = filter && filter !== "All";

  const [project, issues] = await Promise.all([
    prisma.project.findUnique({
      where: { full_name: repo_name },
      select: {
        display_name: true,
        full_name: true,
        avatar_url: true,
        description: true,
      },
    }),
    prisma.issue.findMany({
      where: {
        project_full_name: repo_name,
        ...(shouldFilter && { issue_labels: { has: filter } }),
      },
    }),
  ]);

  return { project, issues };
}
