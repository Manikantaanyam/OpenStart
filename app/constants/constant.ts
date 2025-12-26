import { Eye, LayoutGrid, List } from "lucide-react";
import { Route } from "../types/type";

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
