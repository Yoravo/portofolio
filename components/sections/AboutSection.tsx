"use client";

import { siteConfig, uiCopy } from "@/lib/config";
import { motion } from "framer-motion";
import { MapPin, Download, Terminal } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-grid">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <div className="mb-2 flex items-center gap-2">
            <Terminal size={16} style={{ color: "var(--neon-cyan)" }} aria-hidden="true" />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              {uiCopy.about.path}
            </span>
          </div>
          <h2 className="text-balance text-3xl font-bold text-glow-cyan" style={{ color: "var(--neon-cyan)" }}>
            {uiCopy.about.title}
          </h2>
        </motion.header>

        <div className="flex flex-col gap-10 md:flex-row md:items-start lg:gap-14">
          {/* Terminal bio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="min-w-0 flex-1 space-y-5"
          >
            <TiltCard className="overflow-hidden" intensity={4}>
              {/* Terminal header */}
              <div className="flex items-center gap-3 border-b border-(--border-dim) bg-(--bg-secondary) px-4 py-3">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-medium tracking-wider text-(--text-muted)">
                  {uiCopy.about.terminal}
                </span>
              </div>

              {/* Bio */}
              <div className="space-y-4 p-5 sm:p-6">
                {uiCopy.about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-relaxed text-(--text-secondary) sm:text-base">
                    <span className="font-semibold text-(--neon-cyan)" aria-hidden="true">{">"} </span>
                    {paragraph}
                  </p>
                ))}
                <p className="text-sm leading-relaxed text-(--text-secondary)">
                  <span className="font-semibold text-(--neon-amber)" aria-hidden="true">{">"} </span>
                  {uiCopy.about.languages}
                </p>
              </div>
            </TiltCard>

            {/* Location + CV */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex min-h-11 items-center gap-2 text-sm text-(--text-secondary)">
                <MapPin size={16} aria-hidden="true" />
                {siteConfig.location}
              </div>
              <a href={siteConfig.cv} className="neon-button inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold" download>
                <Download size={16} aria-hidden="true" />
                {uiCopy.about.download}
              </a>
            </div>
          </motion.div>

          {/* Stat tiles */}
          <motion.dl
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-2 gap-3 md:w-72"
          >
            {uiCopy.about.stats.map((stat) => (
              <TiltCard key={stat.label} className="flex flex-col p-4 text-center" intensity={8}>
                <dt className="order-2 mt-1 text-xs font-medium uppercase tracking-wider text-(--text-muted)">
                  {stat.label}
                </dt>
                <dd className="order-1 text-2xl font-bold tabular-nums text-(--text-primary)">
                  {stat.value}
                </dd>
              </TiltCard>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
