import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  as?: "button" | "a";
  href?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full cursor-pointer";

  const variants = {
    primary:
      "bg-[#C97B7B] text-white hover:bg-[#b86868] shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-[#C97B7B] text-[#C97B7B] hover:bg-[#C97B7B] hover:text-white",
    ghost: "text-[#C97B7B] hover:bg-[#C97B7B]/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (as === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
