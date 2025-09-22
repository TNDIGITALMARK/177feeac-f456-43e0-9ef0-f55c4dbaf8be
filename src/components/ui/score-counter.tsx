"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

interface ScoreCounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  label: string;
  min?: number;
  max?: number;
  className?: string;
}

export const ScoreCounter = ({
  value,
  onIncrement,
  onDecrement,
  label,
  min = 1,
  max = 20,
  className,
}: ScoreCounterProps) => {
  const canDecrement = value > min;
  const canIncrement = value < max;

  return (
    <div className={cn("golden-swing-card bg-card", className)}>
      <div className="text-center">
        <h3 className="golden-swing-large-text text-card-foreground mb-4">
          {label}
        </h3>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onDecrement}
            disabled={!canDecrement}
            className={cn(
              "flex items-center justify-center",
              "w-12 h-12 rounded-lg",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:ring-4 focus:ring-primary/20"
            )}
            aria-label={`Decrease ${label}`}
          >
            <Minus size={24} />
          </button>

          <div className="mx-8">
            <div className="text-6xl font-bold text-primary mb-2">
              {value}
            </div>
            <div className="text-sm text-muted-foreground">
              strokes
            </div>
          </div>

          <button
            onClick={onIncrement}
            disabled={!canIncrement}
            className={cn(
              "flex items-center justify-center",
              "w-12 h-12 rounded-lg",
              "bg-secondary text-secondary-foreground",
              "hover:bg-secondary/90 transition-colors",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus:ring-4 focus:ring-secondary/20"
            )}
            aria-label={`Increase ${label}`}
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};