import { projects } from "@/lib/config";
import { Metadata } from "next";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: "Projects - Radja Ravine Salfriandry",
  description: "A collection of projects built by Radja Ravine Salfriandry.",
};

export default function ProjectsPage() {
  return (
    <main className="section-padding bg-grid">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h1
            className="mb-2 text-3xl font-bold text-glow-cyan sm:text-4xl"
            style={{ color: "var(--neon-cyan)" }}
          >
            Projects
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Things I&apos;ve built so far.
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
