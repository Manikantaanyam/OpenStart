"use client";
import { useEffect, useState } from "react";
import { getProjects } from "../actions/projects";
import ProjectCard from "../components/ProjectCard";
import { ProjectResult } from "../types/type";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectResult[]>([]);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
    }

    loadProjects();
  }, []);

  return (
    <div className="max-w-7xl p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((r) => (
          <ProjectCard repo={r} key={r.id} />
        ))}
      </div>
    </div>
  );
}
