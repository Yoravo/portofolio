"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig, navLinks, uiCopy } from "@/lib/config";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);

      if (pathname !== "/") return;
      const sectionIds = ["hero", "about", "journey", "skills", "contact"];
      let current = "hero";
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const isActive = (link: (typeof navLinks)[0]) => {
    if (pathname.startsWith("/projects") && link.href === "/projects") {
      return true;
    }
    if (pathname !== "/") return false;
    return link.sectionId === activeSection;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200",
        scrolled ? "border-b backdrop-blur-md" : "bg-transparent",
      )}
      style={{
        borderColor: scrolled ? "var(--border-dim)" : "transparent",
        background: scrolled ? "var(--nav-surface)" : "transparent",
        boxShadow: scrolled ? "var(--depth-1)" : "none",
      }}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5"
        aria-label={uiCopy.navigation}
      >
        {/* Logo */}
        <Link
          href="/"
          className="group inline-flex min-h-[44px] items-center gap-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-colors"
          style={{ color: "var(--neon-cyan)" }}
        >
          <span className="text-glow-cyan">
            {">"} {siteConfig.title.split(" - ")[0].split(" ")[0]}
          </span>
          <span
            className="transition-colors group-hover:text-(--neon-cyan)"
            style={{ color: "var(--text-muted)" }}
          >
            _
          </span>
        </Link>

        {/* Desktop nav + ThemeToggle */}
        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-[40px] items-center rounded-lg px-3 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-150",
                      active
                        ? "font-semibold"
                        : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)",
                    )}
                    style={
                      active
                        ? {
                            color: "var(--neon-cyan)",
                            background: "var(--neon-cyan-dim)",
                            border: "1px solid var(--neon-cyan-border)",
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="ml-2 pl-2 border-l" style={{ borderColor: "var(--border-dim)" }}>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls: ThemeToggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={toggleBtnRef}
            type="button"
            className="interactive-surface inline-flex h-11 w-11 items-center justify-center rounded-xl"
            style={{ color: "var(--text-secondary)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? uiCopy.closeMenu : uiCopy.openMenu}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="border-t px-6 py-4 md:hidden shadow-lg"
          style={{
            borderColor: "var(--border-dim)",
            background: "var(--bg-card)",
          }}
        >
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-[44px] items-center rounded-lg px-3.5 py-2 text-xs font-medium tracking-wide uppercase transition-all",
                      active
                        ? "font-semibold"
                        : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-elevated)",
                    )}
                    style={
                      active
                        ? {
                            color: "var(--neon-cyan)",
                            background: "var(--neon-cyan-dim)",
                            border: "1px solid var(--neon-cyan-border)",
                          }
                        : undefined
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
