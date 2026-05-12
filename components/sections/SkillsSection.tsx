"use client";

import { skillGroups } from "@/lib/config";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-grid">
      <div className="mx-auto max-w-6xl">
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
              ~/skills
            </span>
          </div>
          <h2
            className="text-3xl font-bold text-glow-cyan"
            style={{ color: "var(--neon-cyan)" }}
          >
            Skills
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Technologies and tools I work with daily.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.08 * i }}
              className="h-full"
              style={{ perspective: "1000px" }}
            >
              <TiltCard className="p-6 h-full" intensity={10}>
                <h3
                  className="mb-4 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--neon-amber)" }}
                >
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md px-2.5 py-1 text-xs font-medium"
                      style={{
                        background: "var(--neon-cyan-dim)",
                        color: "var(--neon-cyan)",
                        border: "1px solid rgba(0,240,255,0.15)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
