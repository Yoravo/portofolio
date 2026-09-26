"use client";

import { useState } from "react";
import { Check, Copy, Download, MapPin } from "lucide-react";
import { siteConfig, uiCopy } from "@/lib/config";

export default function AboutSection() {
  const [copied, setCopied] = useState(false);
  const copy = uiCopy.about;

  const onCopy = async () => {
    const text = [
      copy.lead,
      "",
      ...copy.paragraphs,
      "",
      `Location: ${siteConfig.location}`,
      `Languages: ${copy.languages}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Handled
    }
  };

  return (
    <section id="about" className="section border-b-2 border-(--ink)">
      <div className="container-x">
        {/* Chapter marker */}
        <div className="mb-4 flex items-center justify-between">
          <span className="caption font-semibold">{copy.path}</span>
          <span className="font-mono text-xs text-(--ink-3)">{copy.chapter}</span>
        </div>

        <h2 className="display mb-6 text-3xl sm:text-5xl">{copy.title}</h2>

        {/* Two-panel spread */}
        <div className="panels grid-cols-1 lg:grid-cols-12">
          {/* Narrative panel (7 cols) */}
          <div className="panel col-span-1 p-6 sm:p-8 lg:col-span-7">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-(--accent)">
              {copy.narrative}
            </p>
            <p className="mt-2 text-lg font-semibold leading-snug text-(--ink) sm:text-xl">
              {copy.lead}
            </p>

            <div className="mt-5 space-y-3.5 text-sm leading-relaxed text-(--ink-2) sm:text-base">
              {copy.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-(--line) pt-4">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-(--ink-3)">
                <MapPin size={14} aria-hidden="true" />
                <span>{siteConfig.location}</span>
              </span>
              <span className="font-mono text-xs text-(--ink-3)">
                {copy.languages}
              </span>
              <a
                href={siteConfig.cv}
                download
                className="btn btn-primary ml-auto text-xs uppercase"
              >
                <Download size={14} aria-hidden="true" />
                <span>{copy.download}</span>
              </a>
            </div>
          </div>

          {/* Specs panel (5 cols) */}
          <div className="panel tone col-span-1 p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-center justify-between border-b-2 border-(--ink) pb-3">
              <span className="caption font-bold">{copy.dossier}</span>
              <button
                type="button"
                onClick={onCopy}
                className="btn btn-ghost h-8 gap-1.5 px-2.5 font-mono text-xs uppercase"
                aria-label={copy.copyDossierLabel}
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-(--accent)" aria-hidden="true" />
                    <span>{copy.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} aria-hidden="true" />
                    <span>{copy.copyDossier}</span>
                  </>
                )}
              </button>
            </div>

            <dl className="mt-4 divide-y divide-(--line)">
              {copy.specs.map((item) => (
                <div key={item.label} className="py-2.5">
                  <dt className="font-mono text-[11px] font-semibold uppercase tracking-wider text-(--ink-3)">
                    {item.label}
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold text-(--ink)">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
