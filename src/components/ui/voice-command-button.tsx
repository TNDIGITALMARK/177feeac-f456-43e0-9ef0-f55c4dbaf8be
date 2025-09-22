"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";

interface VoiceCommandButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording?: boolean;
  disabled?: boolean;
  className?: string;
  text?: string;
}

export const VoiceCommandButton = ({
  onStartRecording,
  onStopRecording,
  isRecording = false,
  disabled = false,
  className,
  text = "Voice Command",
}: VoiceCommandButtonProps) => {
  const handleClick = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "golden-swing-button-large",
        "flex items-center justify-center gap-3",
        "rounded-xl transition-all duration-200",
        "font-semibold tracking-wide",
        "focus:ring-4 focus:ring-opacity-50",
        "active:scale-[0.98]",
        {
          // Recording state - pulsing gold
          "bg-secondary text-secondary-foreground voice-active": isRecording,

          // Default state - navy
          "bg-primary text-primary-foreground hover:bg-primary/90": !isRecording,

          // Disabled state
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
      type="button"
      aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
      aria-pressed={isRecording}
    >
      <span className="text-2xl">
        {isRecording ? <MicOff size={28} /> : <Mic size={28} />}
      </span>
      <span>
        {isRecording ? "Stop Recording" : text}
      </span>
      {isRecording && (
        <div className="flex gap-1 ml-2">
          <div className="w-2 h-2 bg-current rounded-full animate-pulse"
               style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-current rounded-full animate-pulse"
               style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 bg-current rounded-full animate-pulse"
               style={{ animationDelay: "300ms" }} />
        </div>
      )}
    </button>
  );
};