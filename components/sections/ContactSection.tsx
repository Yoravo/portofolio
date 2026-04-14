"use client";

import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
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

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
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
      const form = e.currentTarget;
      const data = new FormData(form);

      const res = await fetch(siteConfig.formspree, {
        method: "POST",
        body: data,
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
    <section id="contact" className="px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-12"
      >
        <h2 className="mb-2 text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Contact
        </h2>
        <p className="text-sm text-neutral-600">
          Have a project in mind? Let&apos;s talk.
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
          <p className="text-base leading-relaxed text-neutral-600">
            I&apos;m currently open for freelance work and full-time
            opportunities. Feel free to reach out if you want to collaborate or
            just say hi!
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <Mail size={16} className="text-blue-600" />
              </div>
              {siteConfig.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <MapPin size={16} className="text-blue-600" />
              </div>
              {siteConfig.location}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors hover:bg-blue-50 hover:text-gray-900"
            >
              <FaGithub size={18} />
            </Link>
            <Link
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
            >
              <FaLinkedin size={18} />
            </Link>
            <Link
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors hover:bg-blue-50 hover:text-pink-500"
            >
              <FaInstagram size={18} />
            </Link>
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
              className="flex-1 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
              className="flex-1 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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
            className="rounded-lg border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 outline-none placeholder:text-neutral-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
          />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-sm text-green-600">
                Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500">
                {errorMsg || "Something went wrong. Please try again."}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
