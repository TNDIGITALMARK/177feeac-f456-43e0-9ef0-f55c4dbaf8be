"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { LargeActionButton } from "@/components/ui/large-action-button";
import { AchievementBadge } from "@/components/ui/achievement-badge";
import { NavigationTab } from "@/components/ui/navigation-tab";
import {
  Calculator,
  Mic,
  BarChart3,
  Trophy,
  Share2,
  Download,
  Star,
  Award,
  TrendingUp,
  Calendar
} from "lucide-react";

interface RoundData {
  date: string;
  course: string;
  holes: Array<{
    number: number;
    par: number;
    strokes: number;
    achievement?: "birdie" | "par" | "eagle";
  }>;
  totalStrokes: number;
  totalPar: number;
  bestHole: number;
  improvements: string[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "birdie" | "par" | "eagle" | "ace" | "streak" | "milestone";
  earned: boolean;
  date?: string;
}

export const RoundSummaryPage = () => {
  const [activeTab, setActiveTab] = useState("summary");

  // Mock round data
  const [roundData] = useState<RoundData>({
    date: "March 15, 2024",
    course: "Sunset Valley Golf Club",
    holes: [
      { number: 1, par: 4, strokes: 4, achievement: "par" },
      { number: 2, par: 3, strokes: 2, achievement: "birdie" },
      { number: 3, par: 5, strokes: 5, achievement: "par" },
      { number: 4, par: 4, strokes: 5 },
      { number: 5, par: 3, strokes: 3, achievement: "par" },
      { number: 6, par: 4, strokes: 4, achievement: "par" },
      { number: 7, par: 5, strokes: 6 },
      { number: 8, par: 3, strokes: 4 },
      { number: 9, par: 4, strokes: 3, achievement: "birdie" },
    ],
    totalStrokes: 36,
    totalPar: 35,
    bestHole: 2,
    improvements: [
      "Improved putting accuracy by 15%",
      "Better club selection on approach shots",
      "Consistent tempo throughout round"
    ]
  });

  // Mock achievements
  const [achievements] = useState<Achievement[]>([
    {
      id: "first-birdie",
      title: "First Birdie!",
      description: "Made your first birdie of the round",
      type: "birdie",
      earned: true,
      date: "Today"
    },
    {
      id: "par-streak",
      title: "Par Master",
      description: "Three consecutive pars",
      type: "streak",
      earned: true,
      date: "Today"
    },
    {
      id: "under-40",
      title: "Under 40",
      description: "Completed 9 holes under 40 strokes",
      type: "milestone",
      earned: false
    },
    {
      id: "eagle",
      title: "Eagle Eye",
      description: "Score an eagle (-2)",
      type: "eagle",
      earned: false
    }
  ]);

  const scoreRelativeToPar = roundData.totalStrokes - roundData.totalPar;
  const birdieCount = roundData.holes.filter(h => h.achievement === "birdie").length;
  const parCount = roundData.holes.filter(h => h.achievement === "par").length;

  const getScoreText = () => {
    if (scoreRelativeToPar === 0) return "Even Par";
    if (scoreRelativeToPar > 0) return `+${scoreRelativeToPar}`;
    return `${scoreRelativeToPar}`;
  };

  const handleShareRound = () => {
    // Mock sharing functionality
    const shareText = `Just finished a great round at ${roundData.course}! Shot ${getScoreText()} with ${birdieCount} birdies! 🏌️‍♂️ #GoldenSwing #Golf`;

    if (navigator.share) {
      navigator.share({
        title: "My Golf Round",
        text: shareText,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(shareText);
    }
  };

  const handleSaveRound = () => {
    // Mock save functionality
    console.log("Round saved to history");
  };

  return (
    <div className="golden-swing-app min-h-screen bg-background">
      {/* Header */}
      <div className="golden-swing-high-contrast p-6">
        <div className="text-center">
          <h1 className="golden-swing-header text-white">Round Complete!</h1>
          <div className="text-secondary text-xl font-semibold">
            {roundData.course}
          </div>
          <div className="text-white/80">{roundData.date}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 pb-24">
        {/* Final Score */}
        <div className="golden-swing-card bg-secondary/10 border-2 border-secondary mb-8">
          <div className="text-center">
            <h2 className="golden-swing-header mb-4">Final Score</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {roundData.totalStrokes}
                </div>
                <div className="text-sm text-muted-foreground">Total Strokes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary">
                  {getScoreText()}
                </div>
                <div className="text-sm text-muted-foreground">vs Par</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {birdieCount}
                </div>
                <div className="text-sm text-muted-foreground">Birdies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="golden-swing-spacing">
          <h3 className="golden-swing-header flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-secondary" />
            Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                title={achievement.title}
                description={achievement.description}
                type={achievement.type}
                earned={achievement.earned}
                size="md"
              />
            ))}
          </div>
        </div>

        {/* Round Highlights */}
        <div className="golden-swing-card bg-card mt-8">
          <h3 className="golden-swing-large-text mb-4 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Round Highlights
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
              <span className="font-medium">Best Hole:</span>
              <span className="text-lg font-bold text-secondary">
                Hole {roundData.bestHole} (Birdie!)
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
              <span className="font-medium">Pars Made:</span>
              <span className="text-lg font-bold text-primary">
                {parCount} holes
              </span>
            </div>
          </div>
        </div>

        {/* Improvements */}
        <div className="golden-swing-card bg-muted/20 mt-8">
          <h3 className="golden-swing-large-text mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Today's Improvements
          </h3>
          <ul className="space-y-3">
            {roundData.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0" />
                <span className="text-base">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scorecard Summary */}
        <div className="golden-swing-card bg-card mt-8">
          <h3 className="golden-swing-large-text mb-4">Scorecard</h3>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-10 gap-2 text-sm">
              <div className="font-semibold">Hole</div>
              {roundData.holes.map(hole => (
                <div key={hole.number} className="text-center font-semibold">
                  {hole.number}
                </div>
              ))}

              <div className="font-semibold">Par</div>
              {roundData.holes.map(hole => (
                <div key={`par-${hole.number}`} className="text-center">
                  {hole.par}
                </div>
              ))}

              <div className="font-semibold">Score</div>
              {roundData.holes.map(hole => (
                <div key={`score-${hole.number}`} className={cn(
                  "text-center font-bold rounded px-1",
                  {
                    "bg-secondary/20 text-secondary-foreground": hole.achievement === "birdie",
                    "bg-primary/20 text-primary": hole.achievement === "par",
                    "bg-muted": !hole.achievement
                  }
                )}>
                  {hole.strokes}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 golden-swing-spacing mt-8">
          <LargeActionButton
            onClick={handleShareRound}
            variant="secondary"
            className="w-full"
            icon={<Share2 />}
          >
            Share This Round
          </LargeActionButton>

          <LargeActionButton
            onClick={handleSaveRound}
            variant="outline"
            className="w-full"
            icon={<Download />}
          >
            Save to History
          </LargeActionButton>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="flex gap-2">
          <NavigationTab
            label="Score"
            icon={<Calculator />}
            active={activeTab === "score"}
            onClick={() => setActiveTab("score")}
          />
          <NavigationTab
            label="Caddy"
            icon={<Mic />}
            active={activeTab === "caddy"}
            onClick={() => setActiveTab("caddy")}
          />
          <NavigationTab
            label="Stats"
            icon={<BarChart3 />}
            active={activeTab === "stats"}
            onClick={() => setActiveTab("stats")}
          />
          <NavigationTab
            label="Summary"
            icon={<Trophy />}
            active={activeTab === "summary"}
            onClick={() => setActiveTab("summary")}
          />
        </div>
      </div>
    </div>
  );
};