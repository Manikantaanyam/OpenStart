"use client";
import CountUp from "./components/CountUp";
import IssueTracker from "./components/IssueTicker";
import Navbar from "./components/Navbar";
import { MOCK_STATS } from "./constants/constant";

export default function Home() {
  return (
    <div>
      <Navbar />
      <IssueTracker />
      <div className="duration-300 max-w-7xl mx-auto px-6 py-6">
        <div className="pb-20 space-y-8 animate-in fade-in duration-500">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-2">
                Welcome in,
                <span className="font-medium text-yellow-500">Dev</span>
              </h1>
              <p className="text-stone-500">
                Here's what's happening in the open source world today.
              </p>
            </div>

            <div className="flex gap-8 px-8 py-4 bg-white rounded-3xl border border-stone-100 shadow-sm transition-colors">
              <div className="text-center">
                <div className="text-xs text-stone-400  uppercase font-bold tracking-wider mb-1">
                Tracked  Repos
                </div>
                <div className="text-2xl font-bold text-stone-800 ">
                  <CountUp end={MOCK_STATS.totalRepos} />
                </div>
              </div>

              <div className="w-px bg-stone-100 h-10 self-center"></div>
              <div className="text-center">
                <div className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">
                Tracked Issues
                </div>
                <div className="text-2xl font-bold text-stone-800 ">
                  <CountUp end={MOCK_STATS.totalIssues} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
