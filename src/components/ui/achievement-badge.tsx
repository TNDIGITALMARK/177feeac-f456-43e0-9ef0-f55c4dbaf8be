"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Award, Star, Trophy, Target } from "lucide-react";

interface AchievementBadgeProps {
  title: string;
  description?: string;
  type: "birdie" | "par" | "eagle" | "ace" | "streak" | "milestone";
  earned?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const achievementIcons = {
  birdie: Star,
  par: Target,
  eagle: Award,
  ace: Trophy,
  streak: Star,
  milestone: Trophy,
};

const achievementColors = {
  birdie: "text-yellow-500",
  par: "text-blue-500",
  eagle: "text-purple-500",
  ace: "text-gold-500",
  streak: "text-orange-500",
  milestone: "text-secondary",
};

export const AchievementBadge = ({
  title,
  description,
  type,
  earned = false,
  className,
  size = "md",
}: AchievementBadgeProps) => {
  const Icon = achievementIcons[type];
  const iconColorClass = achievementColors[type];

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
        "golden-swing-spacing",
        {
          // Earned achievement
          "bg-secondary/10 border-secondary text-secondary-foreground": earned,

          // Unearned achievement
          "bg-muted/50 border-muted text-muted-foreground opacity-60": !earned,

          // Size variations
          "p-3": size === "sm",
          "p-4": size === "md",
          "p-6": size === "lg",
        },
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center rounded-full",
        "bg-background/80",
        {
          "w-10 h-10": size === "sm",
          "w-12 h-12": size === "md",
          "w-16 h-16": size === "lg",
        }
      )}>
        <Icon
          className={cn(
            earned ? iconColorClass : "text-muted-foreground",
            {
              "w-5 h-5": size === "sm",
              "w-6 h-6": size === "md",
              "w-8 h-8": size === "lg",
            }
          )}
        />
      </div>

      <div className="flex-1">
        <h4 className={cn(
          "font-semibold",
          {
            "text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
          }
        )}>
          {title}
        </h4>
        {description && (
          <p className={cn(
            "text-current/80 leading-tight",
            {
              "text-xs": size === "sm",
              "text-sm": size === "md",
              "text-base": size === "lg",
            }
          )}>
            {description}
          </p>
        )}
      </div>

      {earned && (
        <div className="text-secondary">
          <Award className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};