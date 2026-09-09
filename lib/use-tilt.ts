"use client";

import { useRef, useState } from "react";

export function useTilt(intensity = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "rotateX(0deg) rotateY(0deg)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({ transform: "rotateX(0deg) rotateY(0deg)" });
  };

  return { ref, style, handleMouseMove, handleMouseLeave };
}
