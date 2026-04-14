import { Project } from "@/lib/config";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col rounded-xl border border-neutral-300 bg-white shadow-lg transition-shadow hover:shadow-md overflow-hidden">
      <Link href={`/projects/${project.slug}`}>
        <div className="relative h-60 w-full bg-neutral-100 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-neutral-400">No image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-base font-semibold text-neutral-900 hover:text-blue-700 transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-sm leading-relaxed text-neutral-600 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1">
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <FaGithub size={14} />
            GitHub
          </Link>
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 transition-colors hover:text-blue-900"
            >
              <ExternalLink size={14} />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}