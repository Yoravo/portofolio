"use client";

import { skillGroups, uiCopy } from "@/lib/config";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding bg-grid">
      <div className="mx-auto max-w-6xl">
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
              {uiCopy.skills.path}
            </span>
          </div>
          <h2 className="text-balance text-3xl font-bold text-glow-cyan text-(--neon-cyan)">
            {uiCopy.skills.title}
          </h2>
          <p className="mt-2 text-base text-(--text-secondary)">{uiCopy.skills.description}</p>
        </motion.header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <TiltCard className="flex h-full flex-col p-5 sm:p-6" intensity={8}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-(--neon-amber)">
                  {group.category}
                </h3>
                <ul className="flex flex-wrap gap-2" aria-label={group.category}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-(--neon-cyan-border) bg-(--neon-cyan-dim) px-2.5 py-1 text-xs font-medium text-(--neon-cyan)"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
