"use client";

import { skillGroups } from "@/lib/config";
import { motion } from "framer-motion";

export default function SkillsSection() {
  return (
    <section id="skills" className="px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <h2 className="mb-2 text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Skills
        </h2>
        <p className="text-sm text-neutral-600">
          These are some of the technologies and tools I have experience with.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillGroups.map((group) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-neutral-100 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
