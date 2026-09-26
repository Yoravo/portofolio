import { projects, siteConfig, siteUrl, uiCopy } from "@/lib/config";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
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
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${siteUrl}/projects/${project.slug}`,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const copy = uiCopy.projects;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    url: project.demo ?? `${siteUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteUrl,
    },
    keywords: project.tags.join(", "),
  };

  return (
    <div className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-x">
        <Link
          href="/#projects"
          className="btn btn-ghost mb-6 text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>{copy.back}</span>
        </Link>

        <article className="panel p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Visual preview */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full border-2 border-(--ink) bg-(--surface-2)">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${copy.preview} ${project.title}`}
                    fill
                    sizes="(min-width: 1024px) 680px, 100vw"
                    className="object-cover object-top"
                    priority
                  />
                ) : project.demo ? (
                  <iframe
                    src={project.demo}
                    title={`${copy.preview} ${project.title}`}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center font-mono text-sm text-(--ink-3)">
                    <span>{copy.noPreview}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description & actions */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <span className="caption mb-3">{copy.path}</span>
                <h1 className="display text-3xl sm:text-4xl">{project.title}</h1>
                <p className="mt-4 text-base leading-relaxed text-(--ink-2)">
                  {project.description}
                </p>

                <div className="mt-6 border-t border-(--line) pt-4">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-(--ink-3)">
                    {copy.stack}
                  </span>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label={copy.stack}>
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-(--line) bg-(--surface-2) px-2.5 py-1 font-mono text-xs text-(--ink)"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-(--line) pt-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-xs uppercase"
                  >
                    <span>{copy.demo}</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost text-xs uppercase"
                >
                  <FaGithub size={14} aria-hidden="true" />
                  <span>{copy.github}</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
