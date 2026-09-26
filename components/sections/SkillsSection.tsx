"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { skillGroups, uiCopy } from "@/lib/config";

export default function SkillsSection() {
  const [query, setQuery] = useState("");
  const copy = uiCopy.skills;
  const q = query.trim().toLowerCase();

  const matches = (skill: string) => (!q ? true : skill.toLowerCase().includes(q));
  const anyMatch = skillGroups.some((g) => g.skills.some(matches));

  return (
    <section id="skills" className="section border-b-2 border-(--ink)">
      <div className="container-x">
        <div className="mb-4 flex items-center justify-between">
          <span className="caption font-semibold">{copy.path}</span>
          <span className="font-mono text-xs text-(--ink-3)">{copy.chapter}</span>
        </div>

        <h2 className="display text-3xl sm:text-5xl">{copy.title}</h2>
        <p className="mt-2 max-w-2xl text-base text-(--ink-2)">{copy.description}</p>

        {/* Live search input */}
        <div className="my-8 max-w-md">
          <div className="relative flex items-center">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 text-(--ink-3)"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              aria-label={copy.searchLabel}
              className="field pl-10 pr-9 font-mono text-xs sm:text-sm"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 inline-flex h-6 w-6 items-center justify-center text-(--ink-3) hover:text-(--ink)"
                aria-label="Clear search"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Categories panels */}
        {anyMatch ? (
          <div className="panels grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => {
              const matched = group.skills.filter(matches);
              const active = matched.length > 0;
              return (
                <article
                  key={group.category}
                  className={`panel flex flex-col p-5 sm:p-6 ${
                    q && !active ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between border-b-2 border-(--ink) pb-2.5">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-(--ink)">
                      {group.category}
                    </h3>
                    <span className="font-mono text-[11px] text-(--ink-3)">
                      {group.skills.length}
                    </span>
                  </div>

                  <ul className="flex flex-wrap gap-1.5" aria-label={group.category}>
                    {group.skills.map((skill) => {
                      const isHit = q && matches(skill);
                      return (
                        <li
                          key={skill}
                          className={`border px-2.5 py-1 font-mono text-xs font-medium transition-colors ${
                            isHit
                              ? "border-(--accent) bg-(--accent) text-(--accent-ink)"
                              : "border-(--line) bg-(--surface-2) text-(--ink)"
                          }`}
                        >
                          {skill}
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="panel p-8 text-center font-mono text-sm text-(--ink-3)">
            {copy.noMatch}
          </div>
        )}
      </div>
    </section>
  );
}
