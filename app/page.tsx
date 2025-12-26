"use client";
import IssueTracker from "./components/IssueTracker";
import Navbar from "./components/Navbar";

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
