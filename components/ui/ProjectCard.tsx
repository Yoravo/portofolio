import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Project, uiCopy } from "@/lib/config";

export default function ProjectCard({ project }: { project: Project }) {
  const copy = uiCopy.projects;

  return (
    <article className="panel flex flex-col p-5 sm:p-6">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${copy.preview} ${project.title}`}
        className="block"
      >
        <div className="relative aspect-video w-full border-2 border-(--ink) bg-(--surface-2)">
          {project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center font-mono text-xs text-(--ink-3)">
              <span>{copy.noPreview}</span>
            </div>
          )}
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <h2 className="display text-xl sm:text-2xl">
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-(--accent)"
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-(--ink-2)">
          {project.description}
        </p>

        <ul className="my-4 flex flex-wrap gap-1.5" aria-label={copy.stack}>
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border border-(--line) bg-(--surface-2) px-2.5 py-1 font-mono text-xs text-(--ink)"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-2 border-t border-(--line) pt-4">
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost text-xs uppercase"
          >
            <FaGithub size={14} aria-hidden="true" />
            <span>{copy.github}</span>
          </Link>
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-xs uppercase"
            >
              <span>{copy.demo}</span>
              <ExternalLink size={13} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
