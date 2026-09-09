import { projects, uiCopy } from "@/lib/config";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Radja Ravine Salfriandry`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <div className="section-padding bg-grid min-h-[70dvh]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/projects"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg text-sm font-medium transition-colors hover:text-(--neon-cyan)"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {uiCopy.projects.back}
        </Link>

        <div
          className="mb-8 mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          <Terminal size={16} style={{ color: "var(--neon-cyan)" }} aria-hidden="true" />
          <span>~/projects/{project.slug}</span>
        </div>

        <article className="card-3d grid gap-8 overflow-hidden p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Preview */}
          <div className="min-w-0">
            <div
              className="relative aspect-video w-full overflow-hidden rounded-xl border"
              style={{
                borderColor: "var(--border-dim)",
                background: "var(--bg-secondary)",
                boxShadow: "var(--depth-1)",
              }}
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${uiCopy.projects.preview} ${project.title}`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-top"
                  priority
                />
              ) : project.demo ? (
                <iframe
                  src={project.demo}
                  title={`${uiCopy.projects.preview} ${project.title}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {uiCopy.projects.noPreview}
                  </span>
                </div>
              )}
            </div>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-lg text-sm font-medium transition-colors hover:text-(--neon-cyan)"
                style={{ color: "var(--text-secondary)" }}
              >
                <ExternalLink size={15} aria-hidden="true" />
                {uiCopy.projects.openLive}
              </a>
            )}
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-col gap-6 py-1">
            <div>
              <h1
                className="text-balance text-3xl font-bold leading-tight text-glow-cyan sm:text-4xl"
                style={{ color: "var(--neon-cyan)" }}
              >
                {project.title}
              </h1>
              <p
                className="mt-4 max-w-prose text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.description}
              </p>
            </div>

            <div>
              <h2
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                {uiCopy.projects.stack}
              </h2>
              <ul className="flex flex-wrap gap-2" aria-label={uiCopy.projects.stack}>
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium"
                    style={{
                      color: "var(--neon-cyan)",
                      background: "var(--neon-cyan-dim)",
                      border: "1px solid var(--neon-cyan-border)",
                    }}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-button inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
              >
                <FaGithub size={16} aria-hidden="true" />
                {uiCopy.projects.github}
              </Link>
              {project.demo && (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  {uiCopy.projects.demo}
                </Link>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
