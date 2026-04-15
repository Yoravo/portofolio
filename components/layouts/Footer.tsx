import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-neutral-900 px-8 py-8 mt-16">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Left */}
        <div>
          <p className="text-sm font-semibold text-neutral-100">
            {siteConfig.title.split(" - ")[0]}
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            © {currentYear} All rights reserved.
          </p>
        </div>

        {/* Center */}
        <div className="flex items-center gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "/#about", label: "About" },
            { href: "/#skills", label: "Skills" },
            { href: "/#contact", label: "Contact" },
            { href: "/projects", label: "Projects" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-neutral-400 transition-colors hover:text-neutral-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right — social */}
        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-neutral-100"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-blue-500"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </Link>
          <Link
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 transition-colors hover:text-pink-500"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </Link>
          <Link
            href={`mailto:${siteConfig.email}`}
            className="text-neutral-400 transition-colors hover:text-neutral-100"
            aria-label="Email"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
