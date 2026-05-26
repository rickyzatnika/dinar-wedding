import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}

export function Card({ children, className, highlight }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300",
        highlight && "ring-2 ring-[#C97B7B] shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
