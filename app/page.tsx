'use client';

import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { DrillPath } from '@/components/game/DrillPath';
import { DrillParticles } from '@/components/game/DrillParticles';
import { Drill } from '@/components/game/Drill';
import { LevelUpModal } from '@/components/game/LevelUpModal';
import { useGameStore } from '@/lib/store';
import { incrementGameScore } from '@/lib/credits';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { level, addLevel } = useGameStore();
  const [depth, setDepth] = useState(0);
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const maxDepth = 100;
  const { data, update } = useSession();

  console.log(data?.user);

  const handleTap = () => {
    setIsActive(true);
    const newDepth = Math.min(depth + 1, maxDepth);
    setDepth(newDepth);
    setScore((prev) => prev + 1);

    if (newDepth >= maxDepth) {
      incrementGameScore(score + 1).then(async (res) => {
        await update({ totalScore: res.totalScore, gameScore: res.gameScore });
        addLevel();
        setDepth(0);
        setScore(0);
        setShowLevelUp(true);
      });
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
          <span className="font-bold">Score {score}</span>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative h-[calc(100vh-120px)] overflow-hidden">
        {/* Ground */}
        <div className="absolute inset-x-0 top-0 bg-gray-200" style={{ height: '80%' }} />

        {/* Drill Path */}
        <DrillPath depth={depth} maxDepth={maxDepth} />

        {/* Drill Particles */}
        <DrillParticles depth={depth} maxDepth={maxDepth} isActive={isActive} />

        {/* Drill */}
        <Drill depth={depth} maxDepth={maxDepth} isActive={isActive} />

        {/* Tap Area */}
        <button className="absolute inset-0 w-full h-full" onClick={handleTap} />
      </div>

      {/* Level Up Modal */}
      <LevelUpModal
        isOpen={showLevelUp}
        level={level}
        onClose={() => {
          setShowLevelUp(false);
        }}
      />
    </div>
  );
}
