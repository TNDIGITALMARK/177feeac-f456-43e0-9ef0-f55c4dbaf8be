"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ScoreCounter } from "@/components/ui/score-counter";
import { LargeActionButton } from "@/components/ui/large-action-button";
import { VoiceCommandButton } from "@/components/ui/voice-command-button";
import { NavigationTab } from "@/components/ui/navigation-tab";
import { Calculator, Mic, BarChart3, Trophy } from "lucide-react";

interface HoleData {
  number: number;
  par: number;
  strokes: number;
  isCompleted: boolean;
}

export const ScoreTrackingPage = () => {
  // Mock golf course data for seniors
  const [currentHole, setCurrentHole] = useState(1);
  const [holes, setHoles] = useState<HoleData[]>([
    { number: 1, par: 4, strokes: 4, isCompleted: false },
    { number: 2, par: 3, strokes: 3, isCompleted: false },
    { number: 3, par: 5, strokes: 5, isCompleted: false },
    { number: 4, par: 4, strokes: 4, isCompleted: false },
    { number: 5, par: 3, strokes: 3, isCompleted: false },
    { number: 6, par: 4, strokes: 4, isCompleted: false },
    { number: 7, par: 5, strokes: 5, isCompleted: false },
    { number: 8, par: 3, strokes: 3, isCompleted: false },
    { number: 9, par: 4, strokes: 4, isCompleted: false },
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState("score");

  const currentHoleData = holes[currentHole - 1];
  const totalStrokes = holes.reduce((sum, hole) => sum + hole.strokes, 0);
  const totalPar = holes.reduce((sum, hole) => sum + hole.par, 0);
  const scoreRelativeToPar = totalStrokes - totalPar;

  const handleStrokeIncrement = () => {
    setHoles(prev => prev.map(hole =>
      hole.number === currentHole
        ? { ...hole, strokes: Math.min(hole.strokes + 1, 15) }
        : hole
    ));
  };

  const handleStrokeDecrement = () => {
    setHoles(prev => prev.map(hole =>
      hole.number === currentHole
        ? { ...hole, strokes: Math.max(hole.strokes - 1, 1) }
        : hole
    ));
  };

  const handleNextHole = () => {
    setHoles(prev => prev.map(hole =>
      hole.number === currentHole
        ? { ...hole, isCompleted: true }
        : hole
    ));

    if (currentHole < 9) {
      setCurrentHole(prev => prev + 1);
    }
  };

  const handleVoiceStart = () => {
    setIsRecording(true);
    // Simulate voice recognition for demo
    setTimeout(() => {
      setIsRecording(false);
      // Mock voice command processing
      const commands = ["add one stroke", "subtract stroke", "next hole"];
      const randomCommand = commands[Math.floor(Math.random() * commands.length)];

      if (randomCommand === "add one stroke") {
        handleStrokeIncrement();
      } else if (randomCommand === "subtract stroke") {
        handleStrokeDecrement();
      } else if (randomCommand === "next hole") {
        handleNextHole();
      }
    }, 2000);
  };

  const handleVoiceStop = () => {
    setIsRecording(false);
  };

  const getScoreText = () => {
    if (scoreRelativeToPar === 0) return "Even Par";
    if (scoreRelativeToPar > 0) return `+${scoreRelativeToPar}`;
    return `${scoreRelativeToPar}`;
  };

  return (
    <div className="golden-swing-app min-h-screen bg-background">
      {/* Header */}
      <div className="golden-swing-high-contrast p-6">
        <div className="text-center">
          <h1 className="golden-swing-header text-white">Golden Swing</h1>
          <div className="flex items-center justify-center gap-6 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">{totalStrokes}</div>
              <div className="text-sm">Total Strokes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">
                {getScoreText()}
              </div>
              <div className="text-sm">Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{currentHole}</div>
              <div className="text-sm">Current Hole</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 pb-24">
        {/* Current Hole Info */}
        <div className="text-center golden-swing-spacing">
          <h2 className="golden-swing-header">
            Hole {currentHoleData.number}
          </h2>
          <div className="golden-swing-large-text text-muted-foreground mb-6">
            Par {currentHoleData.par} •
            {currentHoleData.isCompleted ? " Completed" : " In Progress"}
          </div>
        </div>

        {/* Score Counter */}
        <ScoreCounter
          value={currentHoleData.strokes}
          onIncrement={handleStrokeIncrement}
          onDecrement={handleStrokeDecrement}
          label={`Hole ${currentHoleData.number} Strokes`}
          min={1}
          max={15}
          className="mb-8"
        />

        {/* Voice Command */}
        <div className="golden-swing-spacing">
          <VoiceCommandButton
            onStartRecording={handleVoiceStart}
            onStopRecording={handleVoiceStop}
            isRecording={isRecording}
            text="Say Score"
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 golden-swing-spacing">
          <LargeActionButton
            onClick={handleNextHole}
            variant="secondary"
            className="w-full"
            disabled={currentHole >= 9}
          >
            Complete Hole {currentHoleData.number}
          </LargeActionButton>

          {currentHole > 1 && (
            <LargeActionButton
              onClick={() => setCurrentHole(prev => prev - 1)}
              variant="outline"
              className="w-full"
            >
              Previous Hole
            </LargeActionButton>
          )}
        </div>

        {/* Quick Score Overview */}
        <div className="golden-swing-card bg-muted/20 mt-8">
          <h3 className="golden-swing-large-text mb-4 text-center">
            Quick Overview
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {holes.slice(0, 3).map((hole) => (
              <div
                key={hole.number}
                className={cn(
                  "text-center p-3 rounded-lg",
                  hole.isCompleted ? "bg-secondary/20" : "bg-muted/50"
                )}
              >
                <div className="font-bold">{hole.number}</div>
                <div className="text-sm">Par {hole.par}</div>
                <div className="text-lg font-semibold">
                  {hole.strokes}
                </div>
              </div>
            ))}
          </div>
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