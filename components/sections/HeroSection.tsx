"use client";

import { siteConfig } from "@/lib/config";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-65px)] overflow-hidden px-8 pt-8 pb-12"
    >
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-125px w-125px rounded-full bg-blue-100 opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-100px w-100px rounded-full bg-purple-100 opacity-50 blur-3xl" />

      <div className="relative flex min-h-[calc(100vh-65px-160px)] flex-col justify-center md:flex-row md:items-center md:gap-16">
        <div className="flex-1">
          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-blue-700">
              Available for work
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl"
          >
            <span className="text-neutral-500">Hi, I&apos;m </span>
            <br />
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {siteConfig.title.split(" - ")[0]}
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-4 text-xl font-medium text-neutral-600 sm:text-2xl"
          >
            {siteConfig.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-4 max-w-xl text-base text-neutral-600 sm:text-lg"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Support text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mb-10 max-w-xl text-sm text-neutral-500"
          >
            {siteConfig.supportText}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-10 flex flex-wrap gap-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              View Projects <ArrowRight size={16} />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              Contact Me
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 transition-colors hover:text-neutral-900"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-blue-500"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </Link>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="text-neutral-400 transition-colors hover:text-blue-500"
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
            <Link
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-pink-500"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Right — avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex shrink-0 justify-center md:mt-0"
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-blue-400 to-purple-500 opacity-30 blur-xl" />

            {/* Gradient ring */}
            <div className="relative rounded-full bg-linear-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
              <div className="relative overflow-hidden rounded-full h-64 w-64 md:h-72 md:w-72">
                <Image
                  src={siteConfig.avatar}
                  alt="Avatar"
                  width={288}
                  height={288}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-purple-900/30 to-blue-900/10" />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 -right-3 rounded-xl bg-white px-3 py-2 shadow-lg"
            >
              <p className="text-xs font-semibold text-neutral-800">
                Next.js + React
              </p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-3 -left-3 rounded-xl bg-white px-3 py-2 shadow-lg"
            >
              <p className="text-xs font-semibold text-neutral-800">
                Web Developer
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
