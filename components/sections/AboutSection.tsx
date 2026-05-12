"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import { MapPin, Download, Terminal } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const stats = [
  { value: "2+", label: "Years Learning" },
  { value: "10+", label: "Projects Built" },
  { value: "5+", label: "Tech Mastered" },
  { value: "∞", label: "Passion Level" },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-grid">
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
              ~/about
            </span>
          </div>
          <h2
            className="text-3xl font-bold text-glow-cyan"
            style={{ color: "var(--neon-cyan)" }}
          >
            About Me
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12 md:flex-row md:items-start">
          {/* Terminal bio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 space-y-4"
            style={{ perspective: "800px" }}
          >
            <TiltCard className="overflow-hidden" intensity={4}>
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{
                  borderBottom: "1px solid var(--border-dim)",
                  background: "var(--bg-secondary)",
                }}
              >
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </div>
                <span
                  className="text-[10px] font-medium tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  about.exe
                </span>
              </div>

              {/* Bio */}
              <div className="p-5 space-y-3">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--neon-cyan)" }}>{">"} </span>
                  Hi! I&apos;m{" "}
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Radja Ravine Salfriandry
                  </span>
                  , a fresh graduate web developer based in Karawang, Indonesia.
                  I enjoy building modern, responsive, and user-friendly web
                  applications, with a current focus on React and Next.js.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--neon-cyan)" }}>{">"} </span>I
                  have experience working with both frontend and backend
                  technologies, including Laravel and PHP. I&apos;m especially
                  interested in creating interfaces that are clean, functional,
                  and easy to use.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--neon-cyan)" }}>{">"} </span>
                  I&apos;m always looking for opportunities to learn, improve my
                  skills, and gain more real-world experience through meaningful
                  projects and collaboration.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span style={{ color: "var(--neon-amber)" }}>{">"} </span>
                  <span style={{ color: "var(--text-muted)" }}>
                    Languages: Indonesian (Native), English (Intermediate)
                  </span>
                </p>
              </div>
            </TiltCard>

            {/* Location + CV */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                <MapPin size={14} />
                {siteConfig.location}
              </div>
              <a
                href={siteConfig.cv}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all
  duration-200 hover:brightness-110 glow-cyan"
                style={{
                  background: "var(--neon-cyan)",
                  color: "var(--bg-primary)",
                }}
                download
              >
                <Download size={14} />
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 md:w-64"
            style={{ perspective: "600px" }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <TiltCard className="p-4 text-center" intensity={12}>
                  <p
                    className="text-2xl font-bold text-glow-cyan"
                    style={{ color: "var(--neon-cyan)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-1 text-[10px] uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.label}
                  </p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
