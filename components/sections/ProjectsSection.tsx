import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects, uiCopy } from "@/lib/config";

// Server Component: static content, no client JS.
export default function ProjectsSection() {
  const copy = uiCopy.projects;
  const flagship = projects.find((p) => p.image) ?? projects[0];
  const supporting = projects.filter((p) => p.slug !== flagship.slug);

  return (
    <section id="projects" className="section border-b-2 border-(--ink)">
      <div className="container-x">
        <div className="mb-4 flex items-center justify-between">
          <span className="caption font-semibold">{copy.path}</span>
          <span className="font-mono text-xs text-(--ink-3)">{copy.chapter}</span>
        </div>

        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="display text-3xl sm:text-5xl">{copy.title}</h2>
            <p className="mt-2 text-base text-(--ink-2)">{copy.description}</p>
          </div>
          <Link href="/projects" className="btn btn-ghost text-xs uppercase tracking-wider">
            <span>{copy.allProjects}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* The splash page: the latest project gets the whole width. */}
        <article className="panel mb-2 p-5 sm:p-8 lg:mb-2.5">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <Link
              href={`/projects/${flagship.slug}`}
              className="relative block aspect-video w-full border-2 border-(--ink) bg-(--surface-2) lg:col-span-7"
              aria-label={`${copy.preview} ${flagship.title}`}
            >
              {flagship.image && (
                <Image
                  src={flagship.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-top"
                />
              )}
            </Link>

            <div className="flex flex-col lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="caption border-(--accent) font-semibold text-(--accent)">
                  {copy.featured}
                </span>
                {flagship.demo && (
                  <span className="font-mono text-xs font-semibold uppercase text-(--ink-2)">
                    {copy.liveLabel}
                  </span>
                )}
              </div>

              <h3 className="display mt-3 text-2xl sm:text-3xl">
                <Link href={`/projects/${flagship.slug}`} className="hover:text-(--accent)">
                  {flagship.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-(--ink-2) sm:text-base">
                {flagship.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={copy.stack}>
                {flagship.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-(--line) bg-(--surface-2) px-2.5 py-1 font-mono text-xs text-(--ink)"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-(--line) pt-4 lg:mt-auto">
                {flagship.demo && (
                  <a
                    href={flagship.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary text-xs uppercase"
                  >
                    <span>{copy.demo}</span>
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
                <a
                  href={flagship.github}
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

        {/* Smaller panels for the rest, like the page after a splash. */}
        <div className="panels grid-cols-1 md:grid-cols-3">
          {supporting.map((p) => (
            <article key={p.slug} className="panel flex flex-col p-5 sm:p-6">
              <h3 className="display text-xl">
                <Link href={`/projects/${p.slug}`} className="hover:text-(--accent)">
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-(--ink-2)">{p.description}</p>

              <ul className="my-4 flex flex-wrap gap-1.5" aria-label={copy.stack}>
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="border border-(--line) bg-(--surface-2) px-2 py-0.5 font-mono text-[11px] text-(--ink)"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-(--line) pt-3">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link inline-flex min-h-11 items-center font-mono text-xs font-semibold uppercase"
                  >
                    {copy.demo}
                  </a>
                )}
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex min-h-11 items-center font-mono text-xs font-semibold uppercase"
                >
                  {copy.github}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
