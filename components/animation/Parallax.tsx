"use client";

import type { ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const { ref, offsetY } = useParallax(speed);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translateY(${offsetY * 0.5}px)` }}
    >
      {children}
    </div>
  );
}
