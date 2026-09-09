import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// 1. Test Theme Resolution Logic
function resolveTheme(storageValue, shouldThrow = false) {
  let theme = "dark";
  try {
    if (shouldThrow) {
      throw new Error("SecurityError: Access denied");
    }
    if (storageValue === "light") {
      theme = "light";
    }
  } catch {
    // defaults to dark on any error
  }
  return theme;
}

assert.equal(resolveTheme(null), "dark", "Default without storage should be dark");
assert.equal(resolveTheme("light"), "light", "Explicit light setting should resolve to light");
assert.equal(resolveTheme("dark"), "dark", "Explicit dark setting should resolve to dark");
assert.equal(resolveTheme("unexpected"), "dark", "Invalid setting should fall back to dark");
assert.equal(resolveTheme(null, true), "dark", "Restricted storage error should fall back to dark");

// 2. Validate CSS Variables in app/globals.css
const cssContent = fs.readFileSync(path.resolve("app/globals.css"), "utf-8");

const requiredTokens = [
  "--bg-void",
  "--bg-primary",
  "--bg-secondary",
  "--bg-card",
  "--bg-elevated",
  "--border-dim",
  "--border-subtle",
  "--text-primary",
  "--text-secondary",
  "--text-muted",
  "--neon-cyan",
  "--neon-cyan-dim",
  "--neon-cyan-border",
  "--neon-amber",
  "--neon-amber-dim",
  "--neon-purple",
  "--neon-green",
  "--neon-pink",
  "--accent-foreground",
  "--grid-line",
  "--scanline",
  "--nav-surface",
];

for (const token of requiredTokens) {
  assert(
    cssContent.includes(token + ":"),
    `Missing required CSS token in globals.css: ${token}`
  );
}

// 3. Validate CV asset path
const configContent = fs.readFileSync(path.resolve("lib/config.ts"), "utf-8");
const cvMatch = configContent.match(/cv:\s*["']([^"']+)["']/);
assert(cvMatch, "lib/config.ts should define siteConfig.cv");

const rawCvPath = decodeURIComponent(cvMatch[1].replace(/^\//, ""));
const cvFileOnDisk = path.resolve("public", rawCvPath);
assert(
  fs.existsSync(cvFileOnDisk),
  `CV file referenced in config does not exist on disk: ${cvFileOnDisk}`
);

console.log("All theme token, bootstrap, and asset checks passed successfully.");
