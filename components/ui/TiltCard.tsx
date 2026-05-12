"use client";

import { useTilt } from "@/lib/use-tilt";

export default function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt(intensity);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-3d ${className}`}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        transition:
          "transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}
