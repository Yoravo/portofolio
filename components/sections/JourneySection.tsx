"use client";

import { timeline, TimelineEvent, uiCopy } from "@/lib/config";
import { motion } from "framer-motion";
import { Terminal, GraduationCap, Briefcase, Rocket, Flag } from "lucide-react";

const typeIcon: Record<TimelineEvent["type"], React.ReactNode> = {
  education: <GraduationCap size={14} aria-hidden="true" />,
  work: <Briefcase size={14} aria-hidden="true" />,
  project: <Rocket size={14} aria-hidden="true" />,
  milestone: <Flag size={14} aria-hidden="true" />,
};

const typeColor: Record<TimelineEvent["type"], string> = {
  education: "var(--neon-purple)",
  work: "var(--neon-amber)",
  project: "var(--neon-cyan)",
  milestone: "var(--neon-green)",
};

export default function JourneySection() {
  return (
    <section id="journey" className="section-padding bg-grid">
      <div className="mx-auto max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <div className="mb-2 flex items-center gap-2">
            <Terminal size={16} className="text-(--neon-cyan)" aria-hidden="true" />
            <span className="text-xs font-medium tracking-widest uppercase text-(--text-muted)">
              {uiCopy.journey.path}
            </span>
          </div>
          <h2 className="text-balance text-3xl font-bold text-glow-cyan text-(--neon-cyan)">
            {uiCopy.journey.title}
          </h2>
          <p className="mt-2 text-base text-(--text-secondary)">{uiCopy.journey.description}</p>
        </motion.header>

        <div className="relative">
          <div className="absolute top-0 bottom-0 left-3 w-px bg-(--border-subtle) sm:left-5" aria-hidden="true" />
          <ol className="flex flex-col gap-6">
            {timeline.map((event) => (
              <motion.li
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="relative pl-8 sm:pl-12"
              >
                <div
                  className="absolute top-6 left-1.5 h-3.5 w-3.5 rounded-full sm:left-3.5"
                  aria-hidden="true"
                  style={{
                    background: "var(--bg-void)",
                    border: `2px solid ${typeColor[event.type]}`,
                    boxShadow: `0 0 8px color-mix(in srgb, ${typeColor[event.type]} 25%, transparent)`,
                  }}
                />
                <article className="card-3d p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-medium tracking-wider uppercase text-(--text-muted)">{event.date}</span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium"
                      style={{
                        color: typeColor[event.type],
                        background: `color-mix(in srgb, ${typeColor[event.type]} 8%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${typeColor[event.type]} 25%, transparent)`,
                      }}
                    >
                      {typeIcon[event.type]}
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-(--text-primary)">{event.title}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: typeColor[event.type] }}>{event.subtitle}</p>
                  <p className="mt-3 text-base leading-relaxed text-(--text-secondary)">{event.description}</p>
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
