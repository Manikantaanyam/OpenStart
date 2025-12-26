import { Star, GitMerge, ExternalLink, Eye } from "lucide-react";

const ProjectCard = ({ repo }) => {
  return (
    <div className="bg-white  rounded-4xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-stone-100  group relative">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-stone-50  border border-stone-100  p-1">
            <img
              src={repo.avatar_url}
              alt={repo.display_name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div>
            <h3 className="font-bold text-xl text-stone-900  group-hover:text-yellow-600 transition-colors">
              {repo.display_name}
            </h3>
          </div>
        </div>

        <div className="flex gap-2">
          <button>
            <Eye className="w-4 h-4" />
          </button>

          <a
            href={`https://github.com/${repo.full_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center hover:bg-yellow-400 hover:border-yellow-400 transition-all cursor-pointer group-hover:text-stone-900 text-stone-400"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <p className="text-stone-500  text-sm mb-6 line-clamp-2 h-10">
        {repo.description}
      </p>

      <div className="flex  items-center justify-between">
        <div className="flex flex-wrap gap-2 h-full">
          {repo.techStack.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase font-bold tracking-wider text-stone-400  bg-stone-50 px-2 py-1 rounded-lg border border-stone-100 "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-bold text-stone-700 ">
            {repo.stars.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-400 ">
          <GitMerge className="w-4 h-4" />
          <span className="text-sm">12 issues</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
