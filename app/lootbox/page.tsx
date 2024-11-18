"use client";

import { useState } from "react";
import { Gift } from "lucide-react";
import { useGameStore } from "@/lib/store";
import { LootboxDisplay } from "@/components/game/LootboxDisplay";
import { PrizeWheel } from "@/components/game/PrizeWheel";

export default function LootboxPage() {
  const { coins, level, freeLootboxes, removeCoins, useFreeLootbox, addCoins } = useGameStore();
  const [showWheel, setShowWheel] = useState(false);
  const lootboxCost = 50;

  const canOpenLootbox = coins >= lootboxCost;

  const handleOpenLootbox = () => {
    if (canOpenLootbox) {
      removeCoins(lootboxCost);
      setShowWheel(true);
    }
  };

  const handleOpenFreeLootbox = () => {
    useFreeLootbox();
    setShowWheel(true);
  };

  const handleReward = (amount: number) => {
    addCoins(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Gift className="w-8 h-8 text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-800">Lootbox Shop</h1>
        </div>
        
        <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Free Lootboxes */}
          {freeLootboxes > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-gray-200 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Free Lootboxes</h2>
              <LootboxDisplay 
                type="free"
                cost={0}
                canOpen={true}
                onOpen={handleOpenFreeLootbox}
                freeLootboxes={freeLootboxes}
              />
            </div>
          )}

          {/* Paid Lootboxes */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-gray-200 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Premium Lootbox</h2>
            <LootboxDisplay 
              type="premium"
              cost={lootboxCost}
              canOpen={canOpenLootbox}
              onOpen={handleOpenLootbox}
              freeLootboxes={0}
            />
          </div>
        </div>
      </div>

      <PrizeWheel 
        isOpen={showWheel}
        onClose={() => setShowWheel(false)}
        onReward={handleReward}
        level={level}
      />
    </div>
  );
}