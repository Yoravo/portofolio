"use client";

import { useRef, useState } from "react";
import { Check, Copy, LoaderCircle, Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { siteConfig, socialLinks, uiCopy } from "@/lib/config";

const copy = uiCopy.contact;
const socialIcons = [FaGithub, FaLinkedin, FaInstagram];
type Field = "name" | "email" | "message";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const submitting = useRef(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the mailto link beside it still works.
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    const el = e.currentTarget;
    const next: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) next.name = copy.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = copy.errors.email;
    if (form.message.trim().length < 10) next.message = copy.errors.message;
    setErrors(next);
    const first = (Object.keys(next) as Field[])[0];
    if (first) {
      setStatus("idle");
      (el.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    // Capture before disabling fields; disabled controls are omitted by FormData.
    const body = new FormData(el);
    body.set("name", form.name.trim());
    body.set("email", form.email.trim());
    body.set("message", form.message.trim());
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
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  };

  const update = (field: Field, value: string) => {
    setForm((c) => ({ ...c, [field]: value }));
    setErrors((c) => ({ ...c, [field]: undefined }));
    setStatus("idle");
  };

  const msgLen = form.message.trim().length;

  return (
    <section id="contact" className="section">
      <div className="container-x">
        <div className="mb-4 flex items-center justify-between">
          <span className="caption font-semibold">{copy.path}</span>
          <span className="font-mono text-xs text-(--ink-3)">{copy.chapter}</span>
        </div>

        <h2 className="display text-3xl sm:text-5xl">{copy.title}</h2>
        <p className="mt-2 max-w-2xl text-base text-(--ink-2)">{copy.description}</p>

        <div className="panels mt-8 grid-cols-1 lg:grid-cols-12">
          {/* Direct lines */}
          <div className="panel tone flex flex-col gap-5 p-6 sm:p-8 lg:col-span-5">
            <p className="bubble text-base">{copy.introduction}</p>

            <div className="mt-4 flex items-stretch border-2 border-(--ink) bg-(--surface)">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex min-h-12 min-w-0 flex-1 items-center gap-2.5 px-3 font-mono text-sm hover:text-(--accent)"
              >
                <Mail size={16} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{siteConfig.email}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-w-12 items-center justify-center gap-1.5 border-l-2 border-(--ink) px-3 font-mono text-xs uppercase hover:bg-(--ink) hover:text-(--page)"
                aria-label={copy.copyEmail}
              >
                {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              </button>
            </div>
            <p role="status" className="-mt-3 min-h-4 font-mono text-xs text-(--ink-2)">
              {copied ? copy.copied : ""}
            </p>

            <p className="flex items-center gap-2 font-mono text-sm text-(--ink-2)">
              <MapPin size={16} aria-hidden="true" />
              {siteConfig.location}
            </p>

            <div className="mt-auto flex gap-1.5">
              {socialLinks.slice(0, 3).map((s, i) => {
                const Icon = socialIcons[i];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost h-11 w-11 bg-(--surface) p-0"
                    aria-label={s.label}
                  >
                    <Icon size={17} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            noValidate
            aria-busy={status === "loading"}
            className="panel min-w-0 p-6 sm:p-8 lg:col-span-7"
          >
            <p className="mb-5 font-mono text-xs text-(--ink-3)">{copy.required}</p>
            <fieldset disabled={status === "loading"} className="min-w-0 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {(["name", "email"] as const).map((field) => (
                  <div key={field} className="min-w-0">
                    <label htmlFor={`contact-${field}`} className="mb-1.5 block text-sm font-semibold">
                      {copy[field]}
                    </label>
                    <input
                      id={`contact-${field}`}
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      autoComplete={field}
                      required
                      value={form[field]}
                      onChange={(e) => update(field, e.target.value)}
                      aria-invalid={Boolean(errors[field])}
                      aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                      className="field"
                    />
                    {errors[field] && (
                      <p id={`contact-${field}-error`} className="mt-1.5 text-sm font-semibold text-(--accent)">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <label htmlFor="contact-message" className="block text-sm font-semibold">
                    {copy.message}
                  </label>
                  <span className="font-mono text-xs tabular-nums text-(--ink-3)" aria-hidden="true">
                    {msgLen}/10
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  rows={6}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-hint contact-message-error" : "contact-message-hint"
                  }
                  className="field resize-y"
                />
                <p id="contact-message-hint" className="mt-1.5 text-xs text-(--ink-3)">
                  {copy.messageHint}
                </p>
                {errors.message && (
                  <p id="contact-message-error" className="mt-1.5 text-sm font-semibold text-(--accent)">
                    {errors.message}
                  </p>
                )}
              </div>
              <button type="submit" className="btn btn-primary w-full uppercase tracking-wider sm:w-auto">
                {status === "loading" ? (
                  <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                ) : (
                  <Send size={16} aria-hidden="true" />
                )}
                {status === "loading" ? copy.sending : copy.send}
              </button>
            </fieldset>
            <p role="status" aria-atomic="true" className="mt-4 text-sm font-semibold">
              {status === "success" ? copy.success : ""}
            </p>
            <p role="alert" className="text-sm font-semibold text-(--accent)">
              {status === "error" ? copy.errors.request : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
