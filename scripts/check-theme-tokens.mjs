// Self-check for the theme system. Run: node scripts/check-theme-tokens.mjs
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const layout = fs.readFileSync("app/layout.tsx", "utf8");
const css = fs.readFileSync("app/globals.css", "utf8");
const config = fs.readFileSync("lib/config.ts", "utf8");

// 1. Run the real pre-paint script from layout.tsx against fake storage.
const script = layout.match(/__html: `(\(\(\)=>\{let theme=[\s\S]*?\}\)\(\))`/)?.[1];
assert(script, "theme-init script not found in app/layout.tsx");
const run = (getItem) => {
  const root = { dataset: {} };
  vm.runInNewContext(script, { localStorage: { getItem }, document: { documentElement: root } });
  return root.dataset.theme;
};
assert.equal(run(() => null), "dark", "no stored value → dark");
assert.equal(run(() => "light"), "light", "stored light → light");
assert.equal(run(() => "dark"), "dark", "stored dark → dark");
assert.equal(run(() => "sepia"), "dark", "invalid value → dark");
assert.equal(run(() => { throw new Error("blocked"); }), "dark", "blocked storage → dark");

// 2. Both theme blocks define the same colour tokens.
const block = (selector) => {
  const start = css.indexOf(`${selector} {`);
  assert(start >= 0, `${selector} block missing`);
  const body = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
};
const dark = block(":root");
const light = block(':root[data-theme="light"]');
for (const token of ["--page", "--surface", "--surface-2", "--ink", "--ink-2", "--ink-3", "--line", "--accent", "--accent-ink", "--tone"]) {
  assert(dark[token], `dark theme missing ${token}`);
  assert(light[token], `light theme missing ${token}`);
}

// 3. WCAG AA contrast for every text/background pairing the UI uses.
const lum = (hex) => {
  const [r, g, b] = hex.replace("#", "").match(/../g).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const pairs = [
  ["--ink", "--page"], ["--ink", "--surface"], ["--ink", "--surface-2"],
  ["--ink-2", "--surface"], ["--ink-2", "--surface-2"],
  ["--ink-3", "--page"], ["--ink-3", "--surface"], ["--ink-3", "--surface-2"],
  ["--accent", "--page"], ["--accent", "--surface"], ["--accent", "--surface-2"],
  ["--accent-ink", "--accent"], ["--page", "--ink"],
];
for (const [name, theme] of [["dark", dark], ["light", light]]) {
  for (const [fg, bg] of pairs) {
    const r = ratio(theme[fg], theme[bg]);
    assert(r >= 4.5, `${name}: ${fg} on ${bg} is ${r.toFixed(2)}:1, needs 4.5:1`);
  }
}

// 4. The CV linked from config exists.
const cv = config.match(/cv:\s*"([^"]+)"/)?.[1];
assert(cv && fs.existsSync(`public/${decodeURIComponent(cv.slice(1))}`), `CV missing: ${cv}`);

// 5. Zero em-dashes in UI copy or components (antislop R-02).
assert(!config.includes("—"), "lib/config.ts must not contain em-dashes (—)");

// 6. Kaneki Mascot has hair with pointer-events: none !important.
const kanekiCss = fs.readFileSync("components/ui/KanekiMascot.module.css", "utf8");
assert(
  kanekiCss.includes("pointer-events: none !important"),
  "Kaneki hair must have pointer-events: none !important"
);

console.log("theme bootstrap, token parity, contrast, CV, copy and mascot checks passed");
