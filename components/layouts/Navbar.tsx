"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", sectionId: "hero" },
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/#skills", label: "Skills", sectionId: "skills" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
  { href: "/projects", label: "Projects", sectionId: null },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["hero", "about", "skills", "contact"];

    const handleScroll = () => {
      let current = "hero";

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= window.innerHeight * 0.5) {
            current = id;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = (link: (typeof navLinks)[0]) => {
    if (pathname === "/projects" && link.href === "/projects") return true;
    if (pathname !== "/" && link.href === "/projects")
      return pathname.startsWith("/projects");
    if (pathname !== "/") return false;
    return link.sectionId === activeSection;
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-400 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-full items-center justify-between px-8 py-4">
        <Link
          href="/"
          className="text-sm font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          {siteConfig.title.split(" - ")[0]}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cn(
                  "text-sm font-semibold transition-colors",
                  isActive(link)
                    ? "bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    : "text-neutral-600 hover:text-blue-600",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="flex items-center md:hidden text-neutral-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-neutral-100 bg-white px-8 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive(link)
                      ? "bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      : "text-neutral-500 hover:text-neutral-900",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
