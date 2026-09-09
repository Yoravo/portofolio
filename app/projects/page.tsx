import { projects, uiCopy } from "@/lib/config";
import { Terminal } from "lucide-react";
import { Metadata } from "next";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: uiCopy.projects.metadataTitle,
  description: uiCopy.projects.metadataDescription,
};

export default function ProjectsPage() {
  return (
    <div className="section-padding bg-grid">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <div className="mb-2 flex items-center gap-2">
            <Terminal size={16} style={{ color: "var(--neon-cyan)" }} aria-hidden="true" />
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              {uiCopy.projects.path}
            </span>
          </div>
          <h1
            className="text-balance text-3xl font-bold text-glow-cyan sm:text-4xl"
            style={{ color: "var(--neon-cyan)" }}
          >
            {uiCopy.projects.title}
          </h1>
          <p className="mt-2 text-base" style={{ color: "var(--text-secondary)" }}>
            {uiCopy.projects.description}
          </p>
        </header>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
