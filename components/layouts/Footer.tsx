import Link from "next/link";
import { siteConfig, navLinks, uiCopy } from "@/lib/config";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialItems = [
    {
      href: siteConfig.github,
      icon: <FaGithub size={18} aria-hidden="true" />,
      label: "GitHub",
    },
    {
      href: siteConfig.linkedin,
      icon: <FaLinkedin size={18} aria-hidden="true" />,
      label: "LinkedIn",
    },
    {
      href: siteConfig.instagram,
      icon: <FaInstagram size={18} aria-hidden="true" />,
      label: "Instagram",
    },
    {
      href: `mailto:${siteConfig.email}`,
      icon: <Mail size={18} aria-hidden="true" />,
      label: "Email",
    },
  ];

  return (
    <footer
      className="mt-16 border-t px-6 py-10 transition-colors duration-200"
      style={{
        borderColor: "var(--border-dim)",
        background: "var(--bg-void)",
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Left */}
        <div className="text-center sm:text-left">
          <p
            className="text-xs font-bold tracking-widest uppercase text-glow-cyan"
            style={{ color: "var(--neon-cyan)" }}
          >
            {">"} {siteConfig.title.split(" - ")[0]}
          </p>
          <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
            © {currentYear} — {uiCopy.footerStatus}
          </p>
        </div>

        {/* Center nav */}
        <nav aria-label={uiCopy.footerNavigation}>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center text-xs font-medium uppercase tracking-wider transition-colors duration-150 hover:text-(--neon-cyan)"
                  style={{ color: "var(--text-muted)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right socials */}
        <div className="flex items-center gap-2.5">
          {socialItems.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="interactive-surface inline-flex h-11 w-11 items-center justify-center rounded-xl"
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
