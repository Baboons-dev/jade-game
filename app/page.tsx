'use client';

import { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { DrillPath } from '@/components/game/DrillPath';
import { DrillParticles } from '@/components/game/DrillParticles';
import { Character } from '@/components/game/Character';
import { LevelUpModal } from '@/components/game/LevelUpModal';
import { useGameStore } from '@/lib/store';
import { incrementGameScore } from '@/lib/credits';
import { useSession } from 'next-auth/react';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const { level, addLevel } = useGameStore();
  const [depth, setDepth] = useState(0);
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const maxDepth = 100;
  const { update } = useSession();

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
    <div className="min-h-screen bg-[#87CEEB]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/10">
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </div>
        <div className="text-center">
          <div className="text-sm opacity-70">mini app</div>
          <div className="font-medium">xPlay</div>
        </div>
        <div className="w-6" />
        {/* Spacer for alignment */}
      </div>

      {/* Game Area */}
      <div className="relative h-[calc(100vh-180px)] overflow-hidden">
        {/* Sky Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CEEB] to-[#87CEEB]" />

        {/* Ground */}
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-[#8B4513]">
          {/* Scattered rocks */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-[#6B3410]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        {/* Jade Crystals */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${40 + Math.random() * 40}%`,
            }}>
            <Image src="/jade.png" alt="Jade" width={24} height={24} />
          </div>
        ))}

        {/* Character */}
        <Character depth={depth} maxDepth={maxDepth} isActive={isActive} />

        {/* Drill Path */}
        <DrillPath depth={depth} maxDepth={maxDepth} />

        {/* Drill Particles */}
        <DrillParticles depth={depth} maxDepth={maxDepth} isActive={isActive} />

        {/* Level Progress */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-sm mb-1">Level {level}</div>
          <Progress value={(depth / maxDepth) * 100} className="h-3" />
        </div>

        {/* Tap Area */}
        <button className="absolute inset-0 w-full h-full focus:outline-none" onClick={handleTap} />
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
