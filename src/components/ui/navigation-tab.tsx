"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NavigationTabProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  className?: string;
  badge?: number;
}

export const NavigationTab = ({
  label,
  icon,
  active = false,
  onClick,
  className,
  badge,
}: NavigationTabProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2",
        "p-4 min-h-[80px] flex-1 rounded-lg",
        "transition-all duration-200",
        "font-medium text-sm",
        "focus:ring-4 focus:ring-opacity-50",
        {
          // Active state
          "bg-secondary text-secondary-foreground shadow-lg": active,

          // Inactive state
          "bg-background text-foreground hover:bg-muted/50": !active,
        },
        className
      )}
      type="button"
      aria-label={label}
      aria-pressed={active}
    >
      <div className="relative">
        <div className={cn(
          "text-2xl transition-colors",
          {
            "text-secondary-foreground": active,
            "text-muted-foreground": !active,
          }
        )}>
          {icon}
        </div>

        {badge !== undefined && badge > 0 && (
          <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
            {badge > 99 ? "99+" : badge}
          </div>
        )}
      </div>

      <span className={cn(
        "text-center leading-tight",
        {
          "text-secondary-foreground font-semibold": active,
          "text-muted-foreground": !active,
        }
      )}>
        {label}
      </span>
    </button>
  );
};