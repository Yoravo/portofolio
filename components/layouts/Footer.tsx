import Link from "next/link";
import { navLinks, siteConfig, uiCopy } from "@/lib/config";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: siteConfig.github, icon: <FaGithub size={16} aria-hidden="true" />, label: "GitHub" },
    { href: siteConfig.linkedin, icon: <FaLinkedin size={16} aria-hidden="true" />, label: "LinkedIn" },
    { href: siteConfig.instagram, icon: <FaInstagram size={16} aria-hidden="true" />, label: "Instagram" },
    { href: `mailto:${siteConfig.email}`, icon: <Mail size={16} aria-hidden="true" />, label: "Email" },
  ];

  return (
    <footer className="border-t-2 border-(--ink) bg-(--surface) py-8">
      <div className="container-x flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="display text-base tracking-tight text-(--ink)">
            {siteConfig.name.toUpperCase()}
          </p>
          <p className="mt-1 font-mono text-xs text-(--ink-3)">
            © {currentYear} • {uiCopy.footerStatus}
          </p>
        </div>

        <nav aria-label={uiCopy.footerNavigation}>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-mono text-xs font-semibold uppercase text-(--ink-2) hover:text-(--accent)"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          {socials.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="btn btn-ghost h-11 w-11 p-0"
              aria-label={s.label}
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
