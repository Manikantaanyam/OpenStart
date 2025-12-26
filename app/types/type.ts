import { LucideIcon } from "lucide-react";

export interface Route {
  id: Number;
  href: String;
  label: String;
  icon: LucideIcon;
}

export interface Issue {
  id: string;
  title: string;
  repoName: string;
  difficulty: "Beginner" | "Intermediate";
  type: "Bug" | "Feature" | "Documentation" | "UI/UX";
  url: string;
  createdAt: string;
  avatarUrl: string; // Author avatar
  repoLogoUrl: string;
}

export type ProjectResult = {
  id: Number;
  display_name: String;
  full_name: String;
  description: String;
  avatar_url: String;
  stars: Number;
  techStack: String[];
  active: Date;
};
