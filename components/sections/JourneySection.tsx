"use client";

import { useState } from "react";
import { timeline, TimelineEvent, uiCopy } from "@/lib/config";

type Category = "all" | TimelineEvent["type"];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "work", label: "Work" },
  { key: "project", label: "Projects" },
  { key: "education", label: "Education" },
  { key: "milestone", label: "Milestones" },
];

export default function JourneySection() {
  const [active, setActive] = useState<Category>("all");
  const copy = uiCopy.journey;

  const items =
    active === "all" ? timeline : timeline.filter((e) => e.type === active);

  return (
    <section id="journey" className="section border-b-2 border-(--ink)">
      <div className="container-x">
        <div className="mb-4 flex items-center justify-between">
          <span className="caption font-semibold">{copy.path}</span>
          <span className="font-mono text-xs text-(--ink-3)">{copy.chapter}</span>
        </div>

        <h2 className="display text-3xl sm:text-5xl">{copy.title}</h2>
        <p className="mt-2 max-w-2xl text-base text-(--ink-2)">{copy.description}</p>

        {/* Filter controls */}
        <div
          className="my-8 flex flex-wrap items-center gap-1.5"
          role="toolbar"
          aria-label={copy.filterAria}
        >
          {categories.map((cat) => {
            const count =
              cat.key === "all"
                ? timeline.length
                : timeline.filter((e) => e.type === cat.key).length;
            const selected = active === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(cat.key)}
                className={`btn h-9 min-h-0 gap-1.5 px-3 py-0 font-mono text-xs uppercase ${
                  selected ? "btn-primary" : "btn-ghost"
                }`}
              >
                <span>{cat.label}</span>
                <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Sequence panels */}
        <ol className="relative border-l-2 border-(--ink) pl-4 sm:pl-6">
          {items.map((event) => (
            <li key={event.id} className="relative mb-4 last:mb-0">
              {/* Timeline marker */}
              <span
                className="absolute top-5 -left-[23px] h-3 w-3 border-2 border-(--ink) bg-(--page) sm:-left-[31px]"
                aria-hidden="true"
              />

              <article className="panel p-5 sm:p-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="caption font-bold">{event.date}</span>
                  <span className="font-mono text-xs font-semibold uppercase text-(--ink-3)">
                    {event.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-(--ink) sm:text-xl">
                  {event.title}
                </h3>
                <p className="font-mono text-sm font-semibold text-(--accent)">
                  {event.subtitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-(--ink-2) sm:text-base">
                  {event.description}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
