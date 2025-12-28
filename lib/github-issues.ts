import { repos } from "@/repos";
import { graphql } from "@octokit/graphql";
import prisma from "./prisma";

// Helper to split array into chunks
const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

async function fetchBatch(repoChunk: any) {
  const repoQueryString = repoChunk.map((r) => `repo:${r}`).join(" ");
  // Added "sort:created-desc" to get the newest issues first
  const searchQuery = `is:open is:issue ${repoQueryString} label:"good first issue",bug,documentation,"beginner friendly" sort:created-desc`;

  const query = `
    query GetBeginnerIssues($queryString: String!) {
      search(query: $queryString, type: ISSUE, first: 100) {
        nodes {
          ... on Issue {
            number
            title
            state
            url
            createdAt
            repository { nameWithOwner }
            labels(first: 3) { nodes { name } }
          }
        }
      }
    }
  `;

  const data = await graphql(query, {
    queryString: searchQuery,
    headers: {
      authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`, // Replace with your token
    },
  });

  return data.search.nodes;
}

export default async function fetchAllIssues() {
  // Increased chunk size to 10 repos to reduce GitHub API round-trips
  const chunks = chunkArray(repos, 1);
  let totalProcessed = 0;

  console.log(`Starting sync for ${repos.length} repos...`);

  for (const chunk of chunks) {
    try {
      const githubIssues = await fetchBatch(chunk);
      if (githubIssues.length === 0) continue;

      const githubUrls = githubIssues.map((i) => i.url);

      // 1. Check which issues already exist in the DB
      const existingIssues = await prisma.issue.findMany({
        where: { github_id: { in: githubUrls } },
        select: { github_id: true },
      });

      const existingIdsSet = new Set(existingIssues.map((i) => i.github_id));

      const toCreate = [];
      const toUpdate = [];

      // 2. Sort issues into Create or Update buckets
      for (const issue of githubIssues) {
        const data = {
          github_id: issue.url,
          issue_title: issue.title,
          issue_number: issue.number,
          issue_labels: issue.labels.nodes.map((l: any) => l.name),
          issue_time: new Date(issue.createdAt),
          state: issue.state.toUpperCase() === "OPEN" ? "OPEN" : "CLOSED",
          project_full_name: issue.repository.nameWithOwner,
        };

        if (existingIdsSet.has(issue.url)) {
          toUpdate.push(data);
        } else {
          toCreate.push(data);
        }
      }

      // 3. Execute DB operations
      // createMany is extremely fast for new records
      const createPromise = prisma.issue.createMany({
        data: toCreate,
        skipDuplicates: true,
      });

      // We run updates in parallel using Promise.all
      const updatePromises = toUpdate.map((issue) =>
        prisma.issue.update({
          where: { github_id: issue.github_id },
          data: {
            issue_title: issue.issue_title,
            issue_labels: issue.issue_labels,
            state: issue.state as any, // Type cast for the Enum
          },
        })
      );

      await Promise.all([createPromise, ...updatePromises]);

      totalProcessed += githubIssues.length;
      console.log(
        `Chunk Complete: +${toCreate.length} created, ~${toUpdate.length} updated.`
      );
    } catch (error) {
      console.error(`Error processing chunk:`, error.message);
    }
  }

  console.log(`Sync complete. Total processed: ${totalProcessed}`);
}
