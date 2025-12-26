"use client";
import { Heart, Plus, Quote } from "lucide-react";
import CountUp from "./components/CountUp";
import IssueTracker from "./components/IssueTicker";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import {  MOCK_STATS } from "./constants/constant";

import { useEffect, useState } from "react";
import { getProjects } from "./actions/projects";
import { ProjectResult } from "./types/type";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");

  const [projects, setProjects] = useState<ProjectResult[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
    }

    loadProjects();
  }, []);

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
                  Tracked Repos
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

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column (2/3) - Projects */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-xl font-medium text-stone-800 ">
                    Popular Projects
                  </h3>
                  <button className="text-sm text-stone-400 hover:text-stone-900  transition-colors">
                    View all
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((repo) => (
                    <ProjectCard key={repo.id} repo={repo} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column (1/3) */}
            <div className="space-y-6">
              {/* Add Repo Card */}
              <div className="bg-[#1A1A1A]  rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-between border border-transparent ">
                <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400 rounded-full blur-[80px] opacity-10 -mr-10 -mt-10"></div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                    <Plus className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-light mb-2">
                    Add{" "}
                    <span className="font-medium text-yellow-400">Project</span>
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-6">
                    Think a repository belongs here? Submit it and our AI will
                    analyze its beginner-friendliness.
                  </p>
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="github.com/username/repo"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                    />
                    {repoUrl && (
                      <div className="absolute right-3 top-3.5 w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    )}
                  </div>
                  <button className="w-full py-3 bg-white text-stone-900 rounded-xl text-sm font-bold hover:bg-stone-200 transition-colors flex items-center justify-center gap-2">
                    Analyze
                  </button>
                </div>
              </div>

              {/* Motivation Section - Replaces Pro Tip */}
              <div
                className="bg-[#F6F4F0]  rounded-[2.5rem] p-8 border border-stone-100 
             flex flex-col relative overflow-hidden group hover:border-yellow-200/50 transition-colors"
              >
                <div className="absolute -right-6 -top-6 text-stone-200  transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Quote className="w-32 h-32 opacity-20" />
                </div>

                <div className="z-10">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </div>
                  <h3 className="font-bold text-lg text-stone-800  mb-2">
                    Why Contribute?
                  </h3>
                  <p className="text-stone-600  text-sm italic leading-relaxed">
                    "The power of Open Source is the power of the people. The
                    people rule."
                  </p>
                  <div className="mt-4 pt-4 border-t border-stone-200 ">
                    <p className="text-xs text-stone-500  font-medium">
                      YOUR CODE MATTERS
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Start your journey today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
