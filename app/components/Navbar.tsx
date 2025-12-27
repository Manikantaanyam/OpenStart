"use client";
import Link from "next/link";
import { ROUTES } from "../constants/constant";
import { usePathname } from "next/navigation";
import { Command, Search, Settings } from "lucide-react";
import { useState } from "react";

export default function Navbar(): React.ReactNode {
  const pathname = usePathname();
  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 pt-6 px-6 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-stone-900 text-white px-4 py-2 rounded-full font-bold text-lg tracking-tight">
            OpenStart
          </div>
        </div>

        {/* Center nav pills */}
        <div className="hidden md:flex bg-stone-900/5 backdrop-blur-sm p-1.5 rounded-full items-center gap-1">
          {ROUTES.map((r) => {
            const Icon = r.icon;
            const isActive = pathname == r.href;
            return (
              <Link
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                    ${
                      isActive
                        ? "bg-stone-900 text-white shadow-lg"
                        : "text-stone-600 hover:bg-white/50"
                    }`}
                key={r.id}
                href={r.href}
              >
                <Icon className="w-4 h-4" />
                <span>{r.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={(p) => setSearchOpen(!p)}
            className="group p-3 bg-white rounded-full text-stone-500 hover:text-stone-900 shadow-sm border-stone-100 transition-colors flex items-center gap-2 pr-4"
          >
            <Search className="w-5 h-5" />
            <span className="hidden lg:flex items-center gap-1 text-xs text-stone-300 font-medium group-hover:text-stone-600">
              <Command className="w-3 h-3" />K
            </span>
          </button>

          <button className="p-3 bg-white rounded-full text-stone-500 hover:text-stone-900 shadow-sm border border-stone-100  transition-colors hidden sm:block">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden flex pt-4 justify-center gap-2 overflow-x-auto pb-2">
        {ROUTES.map((r) => {
          const isActive = pathname == r.href;
          return (
            <Link
              className={`px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-2
                   transition-colors ${
                     isActive
                       ? "bg-stone-900 text-white"
                       : "bg-white text-stone-600 border-stone-200 hover:bg-white/50"
                   }`}
              key={r.id}
              href={r.href}
            >
              {r.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
