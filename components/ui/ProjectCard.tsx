"use client";

import { Project } from "@/lib/config";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ rotateX: -2, rotateY: 2, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card-3d group flex flex-col overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Preview */}
      <Link href={`/projects/${project.slug}`}>
        <div
          className="relative h-52 w-full overflow-hidden"
          style={{ background: "var(--bg-secondary)" }}
        >
          {project.demo ? (
            <div className="pointer-events-none h-full w-full">
              <iframe
                src={project.demo}
                title={`Preview of ${project.title}`}
                className="h-[200%] w-[200%] origin-top-left scale-50 border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                tabIndex={-1}
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                No preview
              </span>
            </div>
          )}
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--bg-card), transparent 50%)",
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Link href={`/projects/${project.slug}`}>
          <h3
            className="text-base font-semibold transition-colors duration-200"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--neon-cyan)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
          >
            {project.title}
          </h3>
        </Link>
        <p
          className="flex-1 text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 text-xs font-medium"
              style={{
                background: "var(--neon-cyan-dim)",
                color: "var(--neon-cyan)",
                border: "1px solid rgba(0,240,255,0.12)",
              }}
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
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <FaGithub size={14} /> GitHub
          </Link>
          {project.demo && (
            <Link
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: "var(--neon-cyan)" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <ExternalLink size={14} /> Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
