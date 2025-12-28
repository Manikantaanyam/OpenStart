import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
  },
});

export default async function fetchInfoOfAllRepos(repoList: string[]) {
  // Build dynamic aliases: repo0, repo1, etc.
  const queryFields = repoList
    .map((full_name, index) => {
      const [owner, name] = full_name.split("/");
      return `
      repo${index}: repository(owner: "${owner}", name: "${name}") {
        name
        full_name: nameWithOwner
        description
        stargazerCount
        updatedAt
        owner { avatarUrl }
        languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
          nodes { name }
        }
      }
    `;
    })
    .join("\n");

  const query = `query { ${queryFields} }`;

  // The response will look like { repo0: {...}, repo1: {...} }
  const response: any = await graphqlWithAuth(query);

  // Convert the object back into a clean array for easier looping
  return Object.values(response).filter(Boolean);
}



