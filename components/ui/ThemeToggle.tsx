"use client";

import { Moon, Sun } from "lucide-react";
import { uiCopy } from "@/lib/config";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Restricted storage must not prevent switching this page's theme.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="interactive-surface inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl"
    >
      <span className="theme-light-action">
        <Sun size={18} aria-hidden="true" />
        <span className="sr-only">{uiCopy.lightMode}</span>
      </span>
      <span className="theme-dark-action">
        <Moon size={18} aria-hidden="true" />
        <span className="sr-only">{uiCopy.darkMode}</span>
      </span>
    </button>
  );
}
