"use client";

import { siteConfig, socialLinks, uiCopy } from "@/lib/config";
import { motion } from "framer-motion";
import { Mail, MapPin, Terminal, Send, LoaderCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useRef, useState } from "react";

const copy = uiCopy.contact;
const socialIcons = [FaGithub, FaLinkedin, FaInstagram, Mail];
type Field = "name" | "email" | "message";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const submitting = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    const form = e.currentTarget;
    const nextErrors: Partial<Record<Field, string>> = {};
    if (!formData.name.trim()) nextErrors.name = copy.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = copy.errors.email;
    if (formData.message.trim().length < 10) nextErrors.message = copy.errors.message;
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      setStatus("idle");
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    // Capture before disabling fields; disabled controls are omitted by FormData.
    const body = new FormData(form);
    body.set("name", formData.name.trim());
    body.set("email", formData.email.trim());
    body.set("message", formData.message.trim());
    submitting.current = true;
    setStatus("loading");
    try {
      const res = await fetch(siteConfig.formspree, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error("Contact request failed");
      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  const updateField = (field: Field, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
  };

  return (
    <section id="contact" className="section-padding bg-grid">
      <div className="mx-auto max-w-6xl">
        <motion.header initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} className="mb-12">
          <div className="mb-2 flex items-center gap-2">
            <Terminal size={16} className="text-(--neon-cyan)" aria-hidden="true" />
            <span className="text-xs font-medium tracking-widest uppercase text-(--text-muted)">{copy.path}</span>
          </div>
          <h2 className="text-3xl font-bold text-glow-cyan text-(--neon-cyan)">{copy.title}</h2>
          <p className="mt-2 text-base text-(--text-secondary)">{copy.description}</p>
        </motion.header>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          {/* Contact details */}
          <div className="flex min-w-0 flex-col gap-6">
            <p className="max-w-prose text-base leading-relaxed text-(--text-secondary)">{copy.introduction}</p>
            <div className="space-y-3">
              <a href={`mailto:${siteConfig.email}`} className="interactive-surface flex min-h-14 items-center gap-3 rounded-xl p-3 text-sm">
                <Mail size={18} className="shrink-0 text-(--neon-cyan)" aria-hidden="true" />
                <span className="min-w-0 [overflow-wrap:anywhere]">{siteConfig.email}</span>
              </a>
              <p className="flex min-h-14 items-center gap-3 rounded-xl border border-(--border-dim) bg-(--bg-card) p-3 text-sm text-(--text-secondary)">
                <MapPin size={18} className="shrink-0 text-(--neon-amber)" aria-hidden="true" />
                {siteConfig.location}
              </p>
            </div>
            <div className="flex gap-3">
              {socialLinks.slice(0, 3).map((social, i) => {
                const Icon = socialIcons[i];
                return (
                  <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="interactive-surface inline-flex h-11 w-11 items-center justify-center rounded-xl" aria-label={social.label}>
                    <Icon size={18} aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate aria-busy={status === "loading"} className="card-3d min-w-0 p-5 sm:p-7">
            <p className="mb-5 text-xs text-(--text-muted)">{copy.required}</p>
            <fieldset disabled={status === "loading"} className="min-w-0 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {(["name", "email"] as const).map((field) => (
                  <div key={field} className="min-w-0">
                    <label htmlFor={`contact-${field}`} className="mb-2 block text-sm font-medium text-(--text-primary)">{copy[field]}</label>
                    <input
                      id={`contact-${field}`}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      autoComplete={field}
                      required
                      value={formData[field]}
                      onChange={(e) => updateField(field, e.target.value)}
                      aria-invalid={Boolean(errors[field])}
                      aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                      className="input-3d min-h-12 w-full min-w-0 px-4 py-3"
                    />
                    {errors[field] && <p id={`contact-${field}-error`} className="mt-2 text-sm text-(--neon-pink)" role="alert">{errors[field]}</p>}
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-(--text-primary)">{copy.message}</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-hint contact-message-error" : "contact-message-hint"}
                  className="input-3d w-full resize-y px-4 py-3"
                />
                <p id="contact-message-hint" className="mt-2 text-xs text-(--text-muted)">{copy.messageHint}</p>
                {errors.message && <p id="contact-message-error" className="mt-2 text-sm text-(--neon-pink)" role="alert">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === "loading"} className="neon-button inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold sm:w-auto">
                {status === "loading" ? <LoaderCircle size={16} className="animate-spin" aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
                {status === "loading" ? copy.sending : copy.send}
              </button>
            </fieldset>
            <p role="status" aria-atomic="true" className="mt-4 text-sm text-(--neon-green)">
              {status === "loading" ? copy.sending : status === "success" ? copy.success : ""}
            </p>
            <p role="alert" className="text-sm text-(--neon-pink)">{status === "error" ? copy.errors.request : ""}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
