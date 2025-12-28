"use server";

import prisma from "@/lib/prisma";

export async function getIssues() {
  const response = await prisma.issue.findMany();
  return response;
}
