"use client";

import { siteConfig, socialLinks, uiCopy } from "@/lib/config";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const firstName = siteConfig.title.split(" - ")[0];

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

  const socialIcon = (label: string) => {
    switch (label) {
      case "GitHub":
        return <FaGithub size={18} aria-hidden="true" />;
      case "LinkedIn":
        return <FaLinkedin size={18} aria-hidden="true" />;
      case "Instagram":
        return <FaInstagram size={18} aria-hidden="true" />;
      default:
        return <Mail size={18} aria-hidden="true" />;
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100dvh-65px)] overflow-hidden bg-grid"
      style={{ perspective: "var(--perspective)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full blur-[120px]"
        style={{
          background: "var(--ambient-cyan)",
          transform: "translateZ(-60px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-100 w-100 rounded-full blur-[120px]"
        style={{
          background: "var(--ambient-purple)",
          transform: "translateZ(-60px)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100dvh-65px-80px)] max-w-6xl flex-col justify-center px-6 pt-10 pb-16 md:flex-row md:items-center md:gap-16">
        {/* Left — text content */}
        <div className="flex-1" style={{ transformStyle: "preserve-3d" }}>
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
            style={{
              background: "var(--neon-cyan-dim)",
              border: "1px solid var(--neon-cyan-border)",
              transform: "translateZ(10px)",
            }}
          >
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
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
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--neon-green)" }}
            >
              {uiCopy.hero.availability}
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="mb-4"
          >
            <p
              className="mb-2 text-base font-medium sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {uiCopy.hero.greeting}
            </p>
            <h1
              className="text-balance text-4xl font-bold tracking-tight text-glow-cyan sm:text-5xl md:text-6xl glitch-text"
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
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mb-4 text-xl font-semibold cursor-blink sm:text-2xl"
            style={{ color: "var(--neon-amber)" }}
          >
            {siteConfig.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mb-4 max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Support text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-8 max-w-xl text-xs leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {siteConfig.supportText}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="mb-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/projects"
              className="neon-button inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-md"
            >
              {uiCopy.hero.projects} <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/#contact"
              className="secondary-button inline-flex min-h-[44px] items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium"
            >
              <Mail size={16} aria-hidden="true" /> {uiCopy.hero.contact}
            </Link>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex items-center gap-2.5"
          >
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="interactive-surface inline-flex h-11 w-11 items-center justify-center rounded-xl"
                aria-label={social.label}
              >
                {socialIcon(social.label)}
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-12 flex shrink-0 justify-center md:mt-0"
          style={{ perspective: "600px" }}
        >
          <div className="relative animate-idle-3d rounded-full">
            {/* Glow behind avatar */}
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{
                background: "var(--ambient-cyan)",
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
              <div className="relative h-56 w-56 overflow-hidden rounded-full md:h-72 md:w-72">
                <Image
                  src={siteConfig.avatar}
                  alt={uiCopy.hero.avatarAlt}
                  width={288}
                  height={288}
                  priority
                  className="h-full w-full object-cover"
                />
                {/* Scanline overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(to top, var(--overlay-avatar), transparent 60%)`,
                  }}
                />
              </div>
            </div>

            {/* Floating badge 1: Next.js */}
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: 0, ease: "easeInOut" }}
              className="card-3d absolute -bottom-3 -right-3 rounded-lg px-3 py-2"
              style={{
                transform: "translateZ(40px)",
                borderColor: "var(--neon-cyan-border)",
              }}
            >
              <p className="text-xs font-semibold" style={{ color: "var(--neon-cyan)" }}>
                {uiCopy.hero.badges[0]}
              </p>
            </motion.div>

            {/* Floating badge 2: Laravel */}
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 2.8, repeat: 0, ease: "easeInOut" }}
              className="card-3d absolute -top-3 -right-3 rounded-lg px-3 py-2"
              style={{
                transform: "translateZ(35px)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <p className="text-xs font-semibold" style={{ color: "var(--neon-purple)" }}>
                {uiCopy.hero.badges[1]}
              </p>
            </motion.div>

            {/* Floating badge 3: Web Developer */}
            <motion.div
              animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: 0, ease: "easeInOut" }}
              className="card-3d absolute -top-3 -left-3 rounded-lg px-3 py-2"
              style={{
                transform: "translateZ(25px)",
                borderColor: "var(--border-subtle)",
              }}
            >
              <p className="text-xs font-semibold" style={{ color: "var(--neon-amber)" }}>
                {uiCopy.hero.badges[2]}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
