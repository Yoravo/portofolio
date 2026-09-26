"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { siteConfig, socialLinks, uiCopy } from "@/lib/config";

// The canvas is interactive-only; keep it out of the server HTML and the initial chunk.
const CyberScene3D = dynamic(() => import("@/components/ui/CyberScene3D"), {
  ssr: false,
  loading: () => <div className="tone h-full w-full" aria-hidden="true" />,
});

const socialIcon = (label: string) => {
  switch (label) {
    case "GitHub":
      return <FaGithub size={17} aria-hidden="true" />;
    case "LinkedIn":
      return <FaLinkedin size={17} aria-hidden="true" />;
    case "Instagram":
      return <FaInstagram size={17} aria-hidden="true" />;
    default:
      return <Mail size={17} aria-hidden="true" />;
  }
};

export default function HeroSection() {
  const [mode, setMode] = useState<"3d" | "photo">("3d");
  const copy = uiCopy.hero;

  return (
    <section id="hero" className="section border-b-2 border-(--ink)">
      <div className="container-x">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="caption">
            {copy.chapter} · {copy.volume}
          </span>
          <span className="caption border-(--accent) text-(--accent)">{copy.status}</span>
        </div>

        {/* Cover spread: the title panel reads first, the 3D figure sits beside it. */}
        <div className="panels grid-cols-1 lg:grid-cols-12">
          <div className="panel ink-in flex flex-col p-5 sm:p-8 lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-wider text-(--ink-3)">
              {copy.subtitle} · {copy.location}
            </span>
            <h1 className="display mt-3 text-[clamp(2.6rem,11vw,6.5rem)]">
              {copy.title}
            </h1>

            <p className="bubble mt-6 mb-8 max-w-xl text-base sm:text-lg">{copy.speech}</p>

            <div className="flex flex-wrap items-center gap-2">
              <Link href="/#projects" className="btn btn-primary">
                {copy.projects}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/#contact" className="btn btn-ghost">
                {copy.contact}
              </Link>
              <a href={siteConfig.cv} download className="btn btn-ghost">
                {copy.resume}
              </a>
            </div>

            <div className="mt-auto flex items-center gap-1.5 border-t border-(--line) pt-4 max-lg:mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="btn btn-ghost h-11 w-11 p-0"
                  aria-label={s.label}
                >
                  {socialIcon(s.label)}
                </a>
              ))}
            </div>
          </div>

          <figure
            className="panel tone ink-in flex flex-col p-4 sm:p-5 lg:col-span-5"
            style={{ "--d": "180ms" } as React.CSSProperties}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="caption">{mode === "3d" ? copy.panel3d : copy.panelPhoto}</span>
              <div className="flex border-2 border-(--ink)" role="group" aria-label={copy.panel3d}>
                {(["3d", "photo"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={mode === m}
                    onClick={() => setMode(m)}
                    className={`min-h-9 px-2.5 font-mono text-xs uppercase ${
                      mode === m ? "bg-(--ink) text-(--page)" : "bg-(--surface) text-(--ink)"
                    }`}
                  >
                    {m === "3d" ? copy.viewModes.matrix3d : copy.viewModes.avatar}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative aspect-square w-full border-2 border-(--ink) bg-(--surface)">
              {mode === "3d" ? (
                <CyberScene3D label={copy.label3d} />
              ) : (
                <Image
                  src={siteConfig.avatar}
                  alt={copy.avatarAlt}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
              )}
            </div>

            <figcaption className="mt-2 font-mono text-xs text-(--ink-2)">
              {mode === "3d" ? copy.hint3d : copy.hintPhoto}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
