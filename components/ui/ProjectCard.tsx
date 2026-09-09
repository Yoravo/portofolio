"use client";

import { Project, uiCopy } from "@/lib/config";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function ProjectCard({ project }: { project: Project }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="card-3d group flex min-w-0 flex-col overflow-hidden"
    >
      {/* Preview */}
      <Link href={`/projects/${project.slug}`} aria-label={`${uiCopy.projects.preview} ${project.title}`}>
        <div
          className="relative aspect-video w-full overflow-hidden"
          style={{ background: "var(--bg-secondary)" }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${uiCopy.projects.preview} ${project.title}`}
              fill
              sizes="(min-width: 1200px) 368px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top"
            />
          ) : project.demo ? (
            <div className="pointer-events-none h-full w-full" aria-hidden="true">
              <iframe
                src={project.demo}
                title={`${uiCopy.projects.preview} ${project.title}`}
                className="h-[200%] w-[200%] origin-top-left scale-50 border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                tabIndex={-1}
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-(--text-muted)">{uiCopy.projects.noPreview}</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 border-t border-(--border-dim) p-5 sm:p-6">
        <h2 className="text-xl font-semibold leading-snug">
          <Link href={`/projects/${project.slug}`} className="rounded text-(--text-primary) transition-colors hover:text-(--neon-cyan)">
            {project.title}
          </Link>
        </h2>
        <p className="flex-1 text-base leading-relaxed text-(--text-secondary)">
          {project.description}
        </p>
        <ul className="flex flex-wrap gap-2" aria-label={uiCopy.projects.stack}>
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-(--neon-cyan-border) bg-(--neon-cyan-dim) px-2.5 py-1 text-xs font-medium text-(--neon-cyan)">
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-3 border-t border-(--border-dim) pt-4">
          <Link href={project.github} target="_blank" rel="noopener noreferrer" className="secondary-button inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium">
            <FaGithub size={16} aria-hidden="true" /> {uiCopy.projects.github}
          </Link>
          {project.demo && (
            <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="secondary-button inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-medium">
              <ExternalLink size={16} aria-hidden="true" /> {uiCopy.projects.demo}
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}
