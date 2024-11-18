"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { DrillPath } from "@/components/game/DrillPath";
import { DrillParticles } from "@/components/game/DrillParticles";
import { Drill } from "@/components/game/Drill";
import { LevelUpModal } from "@/components/game/LevelUpModal";
import { useGameStore } from "@/lib/store";

export default function Home() {
  const { coins, addCoins, level, addLevel } = useGameStore();
  const [depth, setDepth] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const maxDepth = 100;

  const handleTap = () => {
    setIsActive(true);
    const newDepth = Math.min(depth + 1, maxDepth);
    setDepth(newDepth);

    if (Math.random() < 0.3) {
      addCoins(Math.floor(Math.random() * 3) + 1);
    }

    if (newDepth >= maxDepth) {
      addLevel();
      setDepth(0);
      setShowLevelUp(true);
    }

    setTimeout(() => setIsActive(false), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white pt-16">
      {/* HUD */}
      <div className="p-4 flex justify-center items-center bg-black/5">
        <div className="flex items-center gap-4">
          <Progress value={(depth / maxDepth) * 100} className="w-32" />
          <span className="font-bold">Level {level}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-[calc(100vh-120px)] overflow-hidden">
        {/* Ground */}
        <div 
          className="absolute inset-x-0 top-0 bg-gray-200"
          style={{ height: '80%' }}
        />

        {/* Drill Path */}
        <DrillPath depth={depth} maxDepth={maxDepth} />

        {/* Drill Particles */}
        <DrillParticles depth={depth} maxDepth={maxDepth} isActive={isActive} />

        {/* Drill */}
        <Drill depth={depth} maxDepth={maxDepth} isActive={isActive} />

        {/* Tap Area */}
        <button
          className="absolute inset-0 w-full h-full"
          onClick={handleTap}
        />
      </div>

      {/* Level Up Modal */}
      <LevelUpModal 
        isOpen={showLevelUp}
        level={level}
        onClose={() => setShowLevelUp(false)}
      />
    </div>
  );
}