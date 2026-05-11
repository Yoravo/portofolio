"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import { Mail, MapPin, Terminal, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMsg("Message is too short.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(siteConfig.formspree, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-padding bg-grid">
      <div className="mx-auto max-w-6xl">
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
              ~/contact
            </span>
          </div>
          <h2
            className="text-3xl font-bold text-glow-cyan"
            style={{ color: "var(--neon-cyan)" }}
          >
            Contact
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Interested in working together? Let&apos;s connect.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 md:flex-row">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col gap-6 md:w-72"
          >
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              I&apos;m currently open to freelance projects, internships, and
              full-time opportunities. Feel free to reach out.
            </p>

            <div className="flex flex-col gap-3">
              <div
                className="flex items-center gap-3 rounded-lg p-3 text-sm"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-dim)",
                }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                  style={{ background: "var(--neon-cyan-dim)" }}
                >
                  <Mail size={14} style={{ color: "var(--neon-cyan)" }} />
                </div>
                <span style={{ color: "var(--text-secondary)" }}>
                  {siteConfig.email}
                </span>
              </div>
              <div
                className="flex items-center gap-3 rounded-lg p-3 text-sm"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-dim)",
                }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                  style={{ background: "var(--neon-amber-dim)" }}
                >
                  <MapPin size={14} style={{ color: "var(--neon-amber)" }} />
                </div>
                <span style={{ color: "var(--text-secondary)" }}>
                  {siteConfig.location}
                </span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                {
                  href: siteConfig.github,
                  icon: <FaGithub size={16} />,
                  label: "GitHub",
                },
                {
                  href: siteConfig.linkedin,
                  icon: <FaLinkedin size={16} />,
                  label: "LinkedIn",
                },
                {
                  href: siteConfig.instagram,
                  icon: <FaInstagram size={16} />,
                  label: "Instagram",
                },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    color: "var(--text-muted)",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-dim)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--neon-cyan)";
                    e.currentTarget.style.borderColor = "rgba(0,240,255,0.3)";
                    e.currentTarget.style.boxShadow =
                      "0 0 12px rgba(0,240,255,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "var(--border-dim)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  aria-label={s.label}
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col gap-4"
            style={{ perspective: "800px" }}
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input-3d flex-1 px-4 py-2.5 text-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input-3d flex-1 px-4 py-2.5 text-sm"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="input-3d resize-none px-4 py-2.5 text-sm"
            />

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200
  hover:brightness-110 disabled:opacity-50 glow-cyan"
                style={{
                  background: "var(--neon-cyan)",
                  color: "var(--bg-primary)",
                }}
              >
                <Send size={14} />
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <p className="text-sm" style={{ color: "var(--neon-green)" }}>
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm" style={{ color: "var(--neon-pink)" }}>
                  {errorMsg}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
