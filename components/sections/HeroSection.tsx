"use client";

import { siteConfig } from "@/lib/config";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const firstName = siteConfig.title.split(" - ")[0];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-65px)] overflow-hidden bg-grid"
      style={{ perspective: "var(--perspective)" }}
    >
      {/* Ambient glow — pushed back in Z space */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full blur-[120px]"
        style={{
          background: "rgba(0,240,255,0.05)",
          transform: "translateZ(-60px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-100 w-100 rounded-full blur-[120px]"
        style={{
          background: "rgba(168,85,247,0.04)",
          transform: "translateZ(-60px)",
        }}
      />

      <div
        className="relative mx-auto flex max-w-6xl min-h-[calc(100vh-65px-80px)] flex-col justify-center px-6 pt-8 pb-12 md:flex-row
  md:items-center md:gap-16"
      >
        {/* Left — text content */}
        <div className="flex-1" style={{ transformStyle: "preserve-3d" }}>
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "rgba(0,255,136,0.06)",
              border: "1px solid rgba(0,255,136,0.2)",
              transform: "translateZ(10px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 pulse-ring"
                style={{ background: "var(--neon-green)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: "var(--neon-green)" }}
              />
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: "var(--neon-green)" }}
            >
              Available for work
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4"
          >
            <p
              className="text-lg font-medium mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Hi, I&apos;m
            </p>
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl glitch-text text-glow-cyan"
              data-text={firstName}
              style={{ color: "var(--neon-cyan)" }}
            >
              {firstName}
            </h1>
          </motion.div>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-4 text-xl font-medium cursor-blink sm:text-2xl"
            style={{ color: "var(--neon-amber)" }}
          >
            {siteConfig.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-4 max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Support text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mb-10 max-w-xl text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            {siteConfig.supportText}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-10 flex flex-wrap gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200
  hover:brightness-110 glow-cyan"
              style={{
                background: "var(--neon-cyan)",
                color: "var(--bg-primary)",
              }}
            >
              View Projects <ArrowRight size={16} />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200"
              style={{
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-card)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
                e.currentTarget.style.boxShadow = "var(--depth-1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Mail size={16} /> Contact Me
            </Link>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            {[
              {
                href: siteConfig.github,
                icon: <FaGithub size={18} />,
                hoverColor: "var(--text-primary)",
              },
              {
                href: siteConfig.linkedin,
                icon: <FaLinkedin size={18} />,
                hoverColor: "#0a66c2",
              },
              {
                href: siteConfig.instagram,
                icon: <FaInstagram size={18} />,
                hoverColor: "var(--neon-pink)",
              },
              {
                href: `mailto:${siteConfig.email}`,
                icon: <Mail size={18} />,
                hoverColor: "var(--neon-cyan)",
              },
            ].map((s, i) => (
              <Link
                key={i}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = s.hoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
                aria-label={`Social link ${i}`}
              >
                {s.icon}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex shrink-0 justify-center md:mt-0"
          style={{ perspective: "600px" }}
        >
          <div className="relative animate-idle-3d rounded-full">
            {/* Glow behind avatar */}
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{
                background: "rgba(0,240,255,0.12)",
                transform: "translateZ(-20px)",
              }}
            />

            {/* Avatar ring */}
            <div
              className="relative rounded-full p-0.5 glow-cyan-strong"
              style={{
                background:
                  "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative overflow-hidden rounded-full h-56 w-56 md:h-72 md:w-72">
                <Image
                  src={siteConfig.avatar}
                  alt="Avatar"
                  width={288}
                  height={288}
                  className="h-full w-full object-cover"
                />
                {/* Scanline */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(4,4,10,0.5), transparent 60%)",
                  }}
                />
              </div>
            </div>

            {/* Floating badge — front layer */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 -right-3 rounded-lg px-3 py-2 glow-cyan"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(0,240,255,0.2)",
                transform: "translateZ(40px)",
                boxShadow: "var(--depth-2)",
              }}
            >
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--neon-cyan)" }}
              >
                Next.js + React
              </p>
            </motion.div>

            {/* Floating badge — middle layer */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-3 -right-3 rounded-lg px-3 py-2"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(168,85,247,0.2)",
                transform: "translateZ(35px)",
                boxShadow:
                  "0 0 15px rgba(168,85,247,0.15), 0 0 30px rgba(168,85,247,0.05)",
              }}
            >
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--neon-purple)" }}
              >
                Laravel
              </p>
            </motion.div>

            {/* Floating badge — back layer */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-3 -left-3 rounded-lg px-3 py-2 glow-amber"
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(255,107,0,0.2)",
                transform: "translateZ(25px)",
                boxShadow: "var(--depth-1)",
              }}
            >
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--neon-amber)" }}
              >
                Web Developer
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
