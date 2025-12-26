import { ArrowRight, Bell, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { MOCK_ISSUES } from "../constants/constant";

export default function IssueTracker(): React.ReactNode {
  const [currentIndex, setCurrentIndex] = useState(0);
  const issues = MOCK_ISSUES.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % issues.length);
    }, 2000);
  }, [issues.length]);

  const currentIssue = issues[currentIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-4 mb-2">
      <div className="bg-white/60 backdrop-blur-md border border-stone-200 rounded-2xl p-3 flex items-center shadow-sm transition-colors">
        <div className="bg-yellow-400 p-1.5 rounded-full mr-3 animate-pulse">
          <Bell className="w-4 h-4 text-stone-900" />
        </div>

        <div className="flex-1 overflow-hidden h-9 relative">
          <div
            key={currentIssue.id}
            className="absolute w-full h-full flex items-center justify-baseline animate0in slice-in-from-bottom-2 fade-in duration-300"
          >
            <div className="flex items-center gap-3 truncate">
              {/* Repo logo */}
              <img
                src={currentIssue.repoLogoUrl}
                alt={currentIssue.repoName}
                className="w-6 h-6 rounded-md object-cover border border-stone-100"
              />

              <div className="flex items-center gap-2 truncate">
                <span className="font-semibold text-stone-800 text-sm">
                  {currentIssue.repoName}
                </span>
                <span className="text-stone-400 text-sm hidden sm:inline">
                  &bull;
                </span>
                <span className="text-stone-600 text-sm truncate font-medium">
                  {currentIssue.title}
                </span>
              </div>

              <span className="text-xs bg-stone-100 text-stone-500  px-2 py-0.5 rounded-full border border-stone-200 ml-2 hidden lg:inline-block">
                {currentIssue.type}
              </span>
            </div>
          </div>
        </div>
        <div className="items-center gap-1.5 text-xs text-stone-400 whitespace-nowrap bg-stone-50 px-2 py-1 rounded-lg border border-stone-100 ml-2 hidden sm:flex">
          <Clock className="w-3 h-3" />
          {currentIssue.createdAt}
        </div>

        <button className="ml-4 p-1 hover:bg-stone-100  rounded-full transition-colors hidden sm:block">
          <ArrowRight className="w-4 h-4 text-stone-500" />
        </button>
      </div>
    </div>
  );
}
