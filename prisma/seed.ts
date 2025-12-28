import fetchInfoOfAllRepos from "@/lib/github";
import fetchAllIssues from "@/lib/github-issues";
import prisma from "@/lib/prisma";
import { repos } from "@/repos";

async function main() {
  console.log("🚀 Starting data ingestion...");

  try {
    const repoDataArray: any[] = await fetchInfoOfAllRepos(repos);

    for (const repo of repoDataArray) {
      console.log(`Syncing: ${repo.full_name}`);

      await prisma.project.create({
        data: {
          display_name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          stars: repo.stargazerCount,
          active: new Date(repo.updatedAt),
          avatar_url: repo.owner.avatarUrl,
          // Extract just the names from the languages nodes
          techStack: repo.languages.nodes.map((l: any) => l.name),
        },
      });
    }

    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fetchAllIssues();
