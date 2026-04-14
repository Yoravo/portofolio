import { projects } from "@/lib/config"
import { Metadata } from "next"
import ProjectCard from "@/components/ui/ProjectCard"

export const metadata: Metadata = {
  title: "Projects — Radja Ravine Salfriandry",
  description: "A collection of projects built by Radja Ravine Salfriandry.",
}

export default function ProjectsPage() {
  return (
    <main className="px-8 pt-6 pb-16">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold text-blue-700 sm:text-4xl">
          Projects
        </h1>
        <p className="text-sm text-neutral-600">
          Things I&apos;ve built so far.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  )
}