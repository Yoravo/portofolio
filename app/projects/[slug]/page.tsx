import { projects } from "@/lib/config"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} — Radja Ravine Salfriandry`,
    description: project.description,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <main className="px-8 pt-4 pb-4">

      {/* Back button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 mb-10"
      >
        <ArrowLeft size={16} />
        Back to Projects
      </Link>

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">

        {/* Left — image */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-neutral-100 bg-neutral-100 shadow-sm">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-neutral-400">No image</span>
              </div>
            )}
          </div>
        </div>

        {/* Right — content */}
        <div className="flex flex-1 flex-col gap-6">

          {/* Title */}
          <h1 className="text-3xl font-bold text-blue-700 sm:text-4xl">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-base leading-relaxed text-neutral-600">
            {project.description}
          </p>

          {/* Tags */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <FaGithub size={16} />
              View on GitHub
            </Link>
            {project.demo && (
              <Link
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <ExternalLink size={16} />
                Live Demo
              </Link>
            )}
          </div>

        </div>
      </div>
    </main>
  )
}