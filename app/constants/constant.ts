import { Eye, LayoutGrid, List } from "lucide-react";
import { Issue, Route } from "../types/type";

export const ROUTES: Route[] = [
  {
    id: 1,
    href: "/",
    label: "Dashboard",
    icon: LayoutGrid,
  },
  {
    id: 2,
    href: "/issues",
    label: "Issues",
    icon: List,
  },
  {
    id: 3,
    href: "/watchlist",
    label: "Watchlist",
    icon: Eye,
  },
];

export const MOCK_STATS = {
  totalRepos: 142,
  totalIssues: 856,
};

export const MOCK_ISSUES: Issue[] = [
  {
    id: "1",
    title: "Fix typo in README.md",
    repoName: "supabase/supabase",
    difficulty: "Beginner",
    type: "Documentation",
    url: "#",
    createdAt: "2 mins ago",
    avatarUrl: "https://picsum.photos/seed/user1/50/50",
    repoLogoUrl: "https://picsum.photos/seed/supabase/100/100",
  },
  {
    id: "2",
    title: "Add darker border to button component",
    repoName: "shadcn/ui",
    difficulty: "Beginner",
    type: "UI/UX",
    url: "#",
    createdAt: "15 mins ago",
    avatarUrl: "https://picsum.photos/seed/user2/50/50",
    repoLogoUrl: "https://picsum.photos/seed/shadcn/100/100",
  },
  {
    id: "3",
    title: "Update dependency versions",
    repoName: "facebook/react",
    difficulty: "Intermediate",
    type: "Bug",
    url: "#",
    createdAt: "1 hour ago",
    avatarUrl: "https://picsum.photos/seed/user3/50/50",
    repoLogoUrl: "https://picsum.photos/seed/react/100/100",
  },
  {
    id: "4",
    title: "Create a new login page layout",
    repoName: "vercel/next.js",
    difficulty: "Beginner",
    type: "Feature",
    url: "#",
    createdAt: "2 hours ago",
    avatarUrl: "https://picsum.photos/seed/user4/50/50",
    repoLogoUrl: "https://picsum.photos/seed/nextjs/100/100",
  },
  {
    id: "5",
    title: "Mobile responsiveness fix for navbar",
    repoName: "tailwindlabs/tailwindcss",
    difficulty: "Beginner",
    type: "UI/UX",
    url: "#",
    createdAt: "3 hours ago",
    avatarUrl: "https://picsum.photos/seed/user5/50/50",
    repoLogoUrl: "https://picsum.photos/seed/tailwind/100/100",
  },
  {
    id: "6",
    title: "Add unit tests for utils",
    repoName: "microsoft/typescript",
    difficulty: "Intermediate",
    type: "Bug",
    url: "#",
    createdAt: "4 hours ago",
    avatarUrl: "https://picsum.photos/seed/user6/50/50",
    repoLogoUrl: "https://picsum.photos/seed/typescript/100/100",
  },
];
