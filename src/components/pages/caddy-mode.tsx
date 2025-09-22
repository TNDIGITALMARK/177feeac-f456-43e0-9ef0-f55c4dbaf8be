"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LargeActionButton } from "@/components/ui/large-action-button";
import { VoiceCommandButton } from "@/components/ui/voice-command-button";
import { NavigationTab } from "@/components/ui/navigation-tab";
import {
  Calculator,
  Mic,
  BarChart3,
  Trophy,
  Wind,
  Target,
  MapPin,
  Compass,
  Cloud,
  Sun
} from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  humidity: number;
}

interface HoleInfo {
  number: number;
  par: number;
  yardage: number;
  hazards: string[];
  recommendation: string;
}

export const CaddyModePage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeTab, setActiveTab] = useState("caddy");
  const [currentAdvice, setCurrentAdvice] = useState("");
  const [lastVoiceCommand, setLastVoiceCommand] = useState("");

  // Mock weather data
  const [weather] = useState<WeatherData>({
    temperature: 72,
    condition: "Partly Cloudy",
    windSpeed: 8,
    windDirection: "SW",
    humidity: 65,
  });

  // Mock hole information
  const [currentHole] = useState<HoleInfo>({
    number: 1,
    par: 4,
    yardage: 385,
    hazards: ["Water hazard left", "Bunker right"],
    recommendation: "Use driver, aim center-right to avoid water"
  });

  // Mock caddy advice based on conditions
  const caddyAdvice = [
    "With this wind, consider taking one more club",
    "The green slopes left to right, aim for the left side",
    "Water hazard is closer than it looks, play it safe",
    "Perfect conditions for your 7-iron on this approach",
    "The pin is in the back today, don't be short"
  ];

  const handleVoiceStart = () => {
    setIsRecording(true);
  };

  const handleVoiceStop = () => {
    setIsRecording(false);

    // Simulate voice recognition and caddy response
    const voiceCommands = [
      "what club should I use",
      "how far is the pin",
      "what's the wind doing",
      "where should I aim",
      "is there water"
    ];

    const responses = {
      "what club should I use": "I recommend your 7-iron for this shot",
      "how far is the pin": "The pin is 145 yards from your position",
      "what's the wind doing": "8 mph wind from the southwest, factor in half a club",
      "where should I aim": "Aim for the left center of the green to avoid trouble",
      "is there water": "Yes, water hazard on the left side of the fairway"
    };

    setTimeout(() => {
      const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
      setLastVoiceCommand(randomCommand);
      setCurrentAdvice(responses[randomCommand]);

      // Audio feedback simulation
      const speech = new SpeechSynthesisUtterance(responses[randomCommand]);
      speech.rate = 0.8; // Slower for seniors
      speech.pitch = 1.0;
      speechSynthesis.speak(speech);
    }, 1500);
  };

  useEffect(() => {
    // Initial caddy greeting
    const initialAdvice = caddyAdvice[Math.floor(Math.random() * caddyAdvice.length)];
    setCurrentAdvice(initialAdvice);
  }, []);

  const getWindIcon = () => {
    return <Wind className="w-6 h-6" />;
  };

  const getWeatherIcon = () => {
    return weather.condition.includes("Cloudy")
      ? <Cloud className="w-6 h-6" />
      : <Sun className="w-6 h-6" />;
  };

  return (
    <div className="golden-swing-app min-h-screen bg-background">
      {/* Header */}
      <div className="golden-swing-high-contrast p-6">
        <div className="text-center">
          <h1 className="golden-swing-header text-white">Your Personal Caddy</h1>
          <div className="golden-swing-large-text text-secondary">
            Hole {currentHole.number} • Par {currentHole.par}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 pb-24">
        {/* Current Advice */}
        <div className="golden-swing-card bg-secondary/10 border-2 border-secondary mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="golden-swing-large-text mb-2">Caddy Says:</h3>
              <p className="text-lg leading-relaxed">
                {currentAdvice || "Ask me anything about your next shot!"}
              </p>
              {lastVoiceCommand && (
                <div className="text-sm text-muted-foreground mt-2">
                  You asked: "{lastVoiceCommand}"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Voice Command */}
        <div className="golden-swing-spacing">
          <VoiceCommandButton
            onStartRecording={handleVoiceStart}
            onStopRecording={handleVoiceStop}
            isRecording={isRecording}
            text="Ask Your Caddy"
            className="w-full"
          />
        </div>

        {/* Weather & Conditions */}
        <div className="golden-swing-card bg-card mb-6">
          <h3 className="golden-swing-large-text mb-4 flex items-center gap-2">
            {getWeatherIcon()}
            Course Conditions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-orange-500" />
              <div>
                <div className="font-semibold">{weather.temperature}°F</div>
                <div className="text-sm text-muted-foreground">{weather.condition}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getWindIcon()}
              <div>
                <div className="font-semibold">{weather.windSpeed} mph {weather.windDirection}</div>
                <div className="text-sm text-muted-foreground">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hole Information */}
        <div className="golden-swing-card bg-card mb-6">
          <h3 className="golden-swing-large-text mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            Hole Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="golden-swing-large-text">Distance:</span>
              <span className="text-2xl font-bold text-primary">{currentHole.yardage} yards</span>
            </div>
            <div>
              <span className="golden-swing-large-text">Hazards:</span>
              <ul className="mt-2 space-y-1">
                {currentHole.hazards.map((hazard, index) => (
                  <li key={index} className="text-destructive font-medium">
                    • {hazard}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 golden-swing-spacing">
          <LargeActionButton
            onClick={() => setCurrentAdvice("For this distance, I'd recommend your pitching wedge")}
            variant="outline"
            size="default"
            className="h-auto py-6"
            icon={<Target />}
          >
            Club Selection
          </LargeActionButton>

          <LargeActionButton
            onClick={() => setCurrentAdvice("Aim for the center of the green, wind will push it right")}
            variant="outline"
            size="default"
            className="h-auto py-6"
            icon={<Compass />}
          >
            Where to Aim
          </LargeActionButton>
        </div>

        {/* Pro Tips */}
        <div className="golden-swing-card bg-muted/20 mt-8">
          <h3 className="golden-swing-large-text mb-4">💡 Pro Tip</h3>
          <p className="text-base leading-relaxed">
            {currentHole.recommendation}
          </p>
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