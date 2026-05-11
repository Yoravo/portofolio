"use client";

import { timeline, TimelineEvent } from "@/lib/config";
import { motion } from "framer-motion";
import { Terminal, GraduationCap, Briefcase, Rocket, Flag } from "lucide-react";

const typeIcon: Record<TimelineEvent["type"], React.ReactNode> = {
  education: <GraduationCap size={14} />,
  work: <Briefcase size={14} />,
  project: <Rocket size={14} />,
  milestone: <Flag size={14} />,
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-2">
            <Terminal size={16} style={{ color: "var(--neon-cyan)" }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              ~/journey
            </span>
          </div>
          <h2
            className="text-3xl font-bold text-glow-cyan"
            style={{ color: "var(--neon-cyan)" }}
          >
            Journey
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            My path so far — education, work, and projects.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px"
            style={{ background: "var(--border-dim)" }}
          />

          <div className="flex flex-col gap-8">
            {timeline.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="relative pl-12"
              >
                {/* Dot on timeline */}
                <div
                  className="absolute left-3.5 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full"
                  style={{
                    background: "var(--bg-void)",
                    border: `2px solid ${typeColor[event.type]}`,
                    boxShadow: `0 0 8px ${typeColor[event.type]}40`,
                  }}
                />

                {/* Card */}
                <div
                  className="card-3d p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Top row: date + type badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] font-medium tracking-wider uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {event.date}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                      style={{
                        color: typeColor[event.type],
                        background: `${typeColor[event.type]}15`,
                        border: `1px solid ${typeColor[event.type]}30`,
                      }}
                    >
                      {typeIcon[event.type]}
                      {event.type}
                    </span>
                  </div>

                  {/* Title & subtitle */}
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {event.title}
                  </h3>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: typeColor[event.type] }}
                  >
                    {event.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
