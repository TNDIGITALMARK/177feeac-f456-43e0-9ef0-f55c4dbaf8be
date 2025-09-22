"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LargeActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "large" | "xl";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const LargeActionButton = ({
  onClick,
  children,
  variant = "primary",
  size = "large",
  disabled = false,
  className,
  icon,
}: LargeActionButtonProps) => {
  const baseClasses = cn(
    "golden-swing-button-large",
    "inline-flex items-center justify-center gap-3",
    "rounded-xl transition-all duration-200",
    "font-semibold tracking-wide",
    "focus:ring-4 focus:ring-opacity-50",
    "active:scale-[0.98] disabled:scale-100",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    {
      // Primary variant (Navy background, white text)
      "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20":
        variant === "primary",

      // Secondary variant (Gold background, navy text)
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary/20":
        variant === "secondary",

      // Outline variant
      "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-primary/20":
        variant === "outline",

      // Size variations
      "min-h-[60px] px-6 py-4 text-lg": size === "default",
      "min-h-[70px] px-8 py-5 text-xl": size === "large",
      "min-h-[80px] px-10 py-6 text-2xl": size === "xl",
    },
    className
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      type="button"
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};