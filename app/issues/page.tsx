"use client";

import { ArrowUpRight, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getIssues } from "../actions/issues";

export default function Issues() {
  const [filter, setFilter] = useState("All");
  const [issues, setIssues] = useState([]);

  const categories = [
    "All",
    "Help Wanted",
    "Good First Issue",
    "bug",
    "documentation",
    "UI/UX",
    "refactor",
  ];

  useEffect(() => {
    async function loadIssues() {
      const result = await getIssues(filter);
      setIssues(result);
    }
    loadIssues();
  }, [filter]);

  console.log("issues", issues);

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-light text-stone-900 mb-2">
            Open <span className="font-medium">Issues</span>
          </h1>
          <p className="text-stone-500 ">
            Curated opportunities for you to contribute.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search Issues..."
              className="pl-10 pr-4 py-3 bg-white border border-stone-200  rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2  focus:ring-yellow-300  w-64 transition-all"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          </div>
          <button className="p-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors">
            <Filter className="w-5 h-5 text-stone-600" />
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === c
                ? "bg-stone-900 text-white shadow-lg"
                : "bg-white text-stone-500 border border-stone-200 hover:border-stone-400 "
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Issues list */}
      <div className="bg-white rounded-[2.5rem] p-2 shadow-sm border border-stone-100 min-h-150 transition-colors">
        <div className="space-y-1">
          {issues.map((i) => (
            <div className="group p-6 rounded-4xl hover:bg-[#FDFBF7] border border-transparent hover:border-stone-100 transition-all cursor-pointer flex flex-col md:flex-row gap-6 items-start md:items-center">
              {/* Icon Box */}
              <div></div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-stone-900 text-lg group-hover:text-yellow-600 transition-colors">
                    {i.project_full_name}
                  </span>
                  <span className="flex gap-3">
                    {i.issue_labels.map((label) => (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-stone-100  text-stone-500  border border-stone-200 ">
                        {label}
                      </span>
                    ))}
                  </span>
                </div>
                <h3 className="text-stone-600  font-medium mb-2">
                  {i.issue_title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-stone-400 ">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Open
                  </span>
                  <p>{}</p>
                  <span>#{i.issue_number}</span>
                </div>
              </div>

              {/* Action */}
              <div className="w-full md:w-auto flex justify-end">
                <a
                  href={`https://github.com/${i.project_full_name}/issues/${i.issue_number}`}
                  className="px-6 py-3 rounded-xl bg-stone-900 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 flex items-center gap-2"
                >
                  View issue <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
