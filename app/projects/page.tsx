import { projects, uiCopy } from "@/lib/config";
import { Metadata } from "next";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: uiCopy.projects.metadataTitle,
  description: uiCopy.projects.metadataDescription,
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const copy = uiCopy.projects;

  return (
    <div className="section">
      <div className="container-x">
        <div className="mb-4 flex items-center justify-between">
          <span className="caption font-semibold">{copy.path}</span>
          <span className="font-mono text-xs text-(--ink-3)">{copy.chapter}</span>
        </div>

        <header className="mb-8">
          <h1 className="display text-4xl sm:text-6xl">{copy.title}</h1>
          <p className="mt-2 text-base text-(--ink-2)">{copy.description}</p>
        </header>

        <div className="panels grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
