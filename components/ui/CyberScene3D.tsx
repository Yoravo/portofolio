"use client";

import { useEffect, useRef } from "react";

// Ink wireframe: an icosahedron drawn like a manga sketch. Painter-sorted
// faces are filled with page colour and screentone so hidden edges drop out,
// front edges get a heavy ink stroke. Drag to spin (inertia on release).
// Canvas 2D only, no dependency; DPR-aware, pauses offscreen, honours
// reduced motion by drawing a single still frame.

type V3 = [number, number, number];

const PHI = (1 + Math.sqrt(5)) / 2;
const VERTS: V3[] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const FACES: [number, number, number][] = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];
// One face carries the accent, like the single red kakugan on a page.
const ACCENT_FACE = 4;

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

export default function CyberScene3D({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let rx = -0.35;
    let ry = 0.6;
    let vx = 0;
    let vy = reduced ? 0 : 0.006;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = true;
    let frame = 0;
    let colors = { ink: "#000", page: "#fff", tone: "#888", accent: "#f00" };

    // Offscreen screentone tile, rebuilt when the theme changes.
    let tonePattern: CanvasPattern | null = null;
    const readTheme = () => {
      colors = {
        ink: cssVar("--ink"),
        page: cssVar("--surface"),
        tone: cssVar("--tone"),
        accent: cssVar("--accent"),
      };
      const tile = document.createElement("canvas");
      tile.width = tile.height = 6;
      const t = tile.getContext("2d");
      if (t) {
        t.fillStyle = colors.tone;
        t.beginPath();
        t.arc(3, 3, 1.1, 0, Math.PI * 2);
        t.fill();
        tonePattern = ctx.createPattern(tile, "repeat");
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const scale = Math.min(w, h) * 0.24;
      const cx = w / 2;
      const cy = h / 2;
      const [sx, cxr] = [Math.sin(rx), Math.cos(rx)];
      const [sy, cyr] = [Math.sin(ry), Math.cos(ry)];

      const pts = VERTS.map(([x, y, z]) => {
        const x1 = x * cyr + z * sy;
        const z1 = -x * sy + z * cyr;
        const y2 = y * cxr - z1 * sx;
        const z2 = y * sx + z1 * cxr;
        const p = 5 / (5 + z2);
        return { x: cx + x1 * scale * p, y: cy + y2 * scale * p, z: z2 };
      });

      const faces = FACES.map((f, i) => {
        const [a, b, c] = f.map((k) => pts[k]);
        const cross = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        return { f, i, depth: (a.z + b.z + c.z) / 3, front: cross < 0 };
      }).sort((p, q) => q.depth - p.depth);

      ctx.lineJoin = "round";
      for (const { f, i, front } of faces) {
        const [a, b, c] = f.map((k) => pts[k]);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.fillStyle = i === ACCENT_FACE && front ? colors.accent : colors.page;
        ctx.fill();
        // Faces turned away from the light get screentone shading.
        if (front && i !== ACCENT_FACE && tonePattern && (a.y + b.y + c.y) / 3 > cy - scale * 0.2) {
          ctx.fillStyle = tonePattern;
          ctx.fill();
        }
        ctx.strokeStyle = colors.ink;
        ctx.lineWidth = front ? 2.25 : 1;
        ctx.stroke();
      }
    };

    const tick = () => {
      frame = 0;
      if (!visible) return;
      if (!dragging) {
        rx += vx;
        ry += vy;
        vx *= 0.95;
        vy += (0.006 - vy) * 0.02;
      }
      draw();
      if (!reduced) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && !reduced) frame = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      ry += dx * 0.01;
      rx += dy * 0.01;
      vy = dx * 0.004;
      vx = dy * 0.004;
      if (reduced) draw();
    };
    const onUp = () => {
      dragging = false;
    };

    readTheme();
    resize();
    draw();
    start();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => {
      readTheme();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      className="block h-full w-full cursor-grab touch-none active:cursor-grabbing"
    />
  );
}
