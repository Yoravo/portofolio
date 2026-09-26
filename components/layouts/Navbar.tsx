"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig, uiCopy } from "@/lib/config";
import ThemeToggle from "@/components/ui/ThemeToggle";

const sectionIds = navLinks.map((l) => l.sectionId);
const [firstName, ...rest] = siteConfig.name.toUpperCase().split(" ");
const middle = rest.slice(0, -1).join(" ");
const lastName = rest.at(-1);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    const onScroll = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Project pages belong to the Projects chapter.
  const isCurrent = (id: string) =>
    pathname.startsWith("/projects") ? id === "projects" : pathname === "/" && id === active;

  return (
    <header className="sticky top-0 z-40 border-b-2 border-(--ink) bg-(--page)">
      <div className="container-x flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="display inline-flex min-h-11 items-center text-lg text-(--ink) hover:text-(--accent)"
        >
          {firstName} {middle}
          <span className="hidden xl:inline">&nbsp;{lastName}</span>
        </Link>

        <nav aria-label={uiCopy.navigation} className="hidden items-center gap-2 lg:flex">
          <ul className="flex items-center">
            {navLinks.map((link) => {
              const current = isCurrent(link.sectionId);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={current ? "location" : undefined}
                    className={`inline-flex h-11 items-center gap-1.5 px-2.5 font-mono text-xs font-semibold uppercase tracking-wider ${
                      current ? "bg-(--ink) text-(--page)" : "text-(--ink-2) hover:text-(--ink)"
                    }`}
                  >
                    <span className="hidden opacity-70 xl:inline">{link.chapter}</span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? uiCopy.closeMenu : uiCopy.openMenu}
            className="btn btn-ghost h-11 w-11 p-0"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={uiCopy.navigation}
          className="border-t-2 border-(--ink) bg-(--surface) lg:hidden"
        >
          <ul className="container-x flex flex-col py-2">
            {navLinks.map((link) => {
              const current = isCurrent(link.sectionId);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "location" : undefined}
                    className={`flex h-12 items-center justify-between px-3 font-mono text-sm font-semibold uppercase tracking-wider ${
                      current ? "bg-(--ink) text-(--page)" : "text-(--ink) hover:bg-(--surface-2)"
                    }`}
                  >
                    {link.label}
                    <span className="opacity-70">{link.chapter}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
