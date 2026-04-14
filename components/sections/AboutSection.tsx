"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import { MapPin, Download } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <h2 className="mb-2 text-3xl font-bold text-blue-700 bg-clip-text">
          About Me
        </h2>
      </motion.div>

      <div className="flex flex-col gap-12 md:flex-row md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-1 space-y-4"
        >
          <p className="text-base leading-relaxed text-neutral-600">
            Hi! I&apos;m{" "}
            <span className="font-semibold text-neutral-900">
              Radja Ravine Salfriandry
            </span>
            , a passionate web developer based in Karawang, Indonesia. I
            specialize in building modern, responsive, and performant web
            applications using React and Next.js.
          </p>
          <p className="text-base leading-relaxed text-neutral-600">
            I have experience working with both frontend and backend
            technologies, including Laravel and PHP. I enjoy turning complex
            problems into simple, beautiful, and intuitive digital experiences.
          </p>
          <p className="text-base leading-relaxed text-neutral-600">
            When I&apos;m not coding, I&apos;m usually exploring new
            technologies, contributing to open source, or leveling up my skills.
          </p>

          {/* Location + CV */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-sm text-neutral-500">
              <MapPin size={15} />
              {siteConfig.location}
            </div>

            <a
              href={siteConfig.cv}
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              download
            >
              <Download size={15} />
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Right — stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 md:w-72"
        >
          {[
            { value: "2+", label: "Years of experience" },
            { value: "10+", label: "Projects completed" },
            { value: "5+", label: "Technologies mastered" },
            { value: "100%", label: "Passion for coding" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-neutral-100 bg-white p-5 shadow-sm"
            >
              <p className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
