"use client";

import React, { useState } from "react";
import { ScoreTrackingPage } from "@/components/pages/score-tracking";
import { CaddyModePage } from "@/components/pages/caddy-mode";
import { RoundSummaryPage } from "@/components/pages/round-summary";

type AppPage = "score" | "caddy" | "summary";

export const GoldenSwingApp = () => {
  const [currentPage, setCurrentPage] = useState<AppPage>("score");

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "score":
        return <ScoreTrackingPage />;
      case "caddy":
        return <CaddyModePage />;
      case "summary":
        return <RoundSummaryPage />;
      default:
        return <ScoreTrackingPage />;
    }
  };

  return (
    <div className="golden-swing-app">
      {renderCurrentPage()}
    </div>
  );
};