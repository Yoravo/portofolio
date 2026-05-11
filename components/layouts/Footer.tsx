"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t px-6 py-8 mt-16"
      style={{
        borderColor: "var(--border-dim)",
        background: "var(--bg-void)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <div className="mx-auto max-w-6xl flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Left */}
        <div>
          <p
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "var(--neon-cyan)" }}
          >
            {">"} {siteConfig.title.split(" - ")[0]}
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
            © {currentYear} — All systems operational.
          </p>
        </div>

        {/* Center nav */}
        <div className="flex items-center gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "/#about", label: "About" },
            { href: "/#journey", label: "Journey" },
            { href: "/#skills", label: "Skills" },
            { href: "/#contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--neon-cyan)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right socials */}
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
            {
              href: `mailto:${siteConfig.email}`,
              icon: <Mail size={16} />,
              label: "Email",
            },
          ].map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
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
              aria-label={social.label}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
