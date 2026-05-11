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
  { href: "/#journey", label: "Journey", sectionId: "journey" },
  { href: "/#skills", label: "Skills", sectionId: "skills" },
  { href: "/projects", label: "Projects", sectionId: "projects" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const visibleLinks =
    pathname === "/"
      ? navLinks
      : navLinks.filter((link) => !link.href.startsWith("/#"));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") return;
      const sectionIds = [
        "hero",
        "about",
        "journey",
        "skills",
        "projects",
        "contact",
      ];
      let current = "hero";
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5)
          current = id;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = (link: (typeof navLinks)[0]) => {
    if (pathname !== "/" && link.href === "/projects")
      return pathname.startsWith("/projects");
    if (pathname !== "/") return false;
    return link.sectionId === activeSection;
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const el = document.getElementById(href.replace("/#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b backdrop-blur-md" : "bg-transparent",
      )}
      style={{
        borderColor: scrolled ? "rgba(0,240,255,0.06)" : "transparent",
        background: scrolled ? "rgba(4,4,10,0.85)" : "transparent",
        boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "var(--neon-cyan)" }}
          >
            {">"} {siteConfig.title.split(" - ")[0].split(" ")[0]}
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            _
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {visibleLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium tracking-wide uppercase rounded transition-all duration-200",
                  isActive(link)
                    ? "text-(--neon-cyan) bg-(--neon-cyan-dim)"
                    : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex items-center md:hidden"
          style={{ color: "var(--text-secondary)" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="border-t px-6 py-4 md:hidden"
          style={{
            borderColor: "var(--border-dim)",
            background: "var(--bg-void)",
          }}
        >
          <ul className="flex flex-col gap-1">
            {visibleLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "block px-3 py-2 text-xs font-medium tracking-wide uppercase rounded transition-all",
                    isActive(link)
                      ? "text-(--neon-cyan) bg-(--neon-cyan-dim)"
                      : "text-(--text-secondary) hover:text-(--text-primary)",
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
