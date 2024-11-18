"use client";

import { useState, useEffect } from 'react';
import { Coins, Package } from 'lucide-react';

interface LootboxProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: (amount: number) => void;
}

export function Lootbox({ isOpen, onClose, onReward }: LootboxProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [reward, setReward] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && !isAnimating) {
      setIsAnimating(true);
      setReward(null);
      
      // Simulate opening animation
      setTimeout(() => {
        const coinReward = Math.floor(Math.random() * 50) + 10;
        setReward(coinReward);
        onReward(coinReward);
      }, 1000);
    }
  }, [isOpen, onReward]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center transform transition-all">
        {!reward ? (
          <div className={`transition-transform duration-1000 ${isAnimating ? 'animate-bounce' : ''}`}>
            <Package className="w-20 h-20 mx-auto mb-4 text-purple-500" />
            <p className="text-lg font-bold">Opening Lootbox...</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Coins className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold">{reward}</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Collect Reward
            </button>
          </div>
        )}
      </div>
    </div>
  );
}