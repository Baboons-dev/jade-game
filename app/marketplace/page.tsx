"use client";

import { ShoppingBag, Lock } from "lucide-react";
import { useGameStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const items = [
  {
    id: 1,
    name: "Golden Drill",
    description: "Increases coin drops by 25%",
    price: 1000,
    level: 5,
    image: "🔨"
  },
  {
    id: 2,
    name: "Lucky Charm",
    description: "10% chance for double coins",
    price: 2000,
    level: 10,
    image: "🍀"
  },
  {
    id: 3,
    name: "Speed Boost",
    description: "Drill moves 20% faster",
    price: 3000,
    level: 15,
    image: "⚡"
  },
  {
    id: 4,
    name: "Coin Magnet",
    description: "Automatically collects nearby coins",
    price: 5000,
    level: 20,
    image: "🧲"
  }
];

export default function MarketplacePage() {
  const { coins, level } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-700 to-amber-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-amber-300" />
          <h1 className="text-3xl font-bold text-amber-100">Marketplace</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => {
            const canBuy = coins >= item.price && level >= item.level;
            
            return (
              <div
                key={item.id}
                className="bg-amber-900/20 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-amber-100 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-amber-200/80">{item.description}</p>
                  </div>
                  <div className="text-4xl">{item.image}</div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-amber-200">
                    <span className="font-mono">{item.price}</span> coins
                  </div>
                  
                  {level < item.level ? (
                    <div className="flex items-center gap-2 text-amber-400">
                      <Lock className="w-4 h-4" />
                      <span>Level {item.level} required</span>
                    </div>
                  ) : (
                    <button
                      className={cn(
                        "px-4 py-2 rounded-lg font-semibold transition-colors",
                        canBuy 
                          ? "bg-amber-500 text-amber-900 hover:bg-amber-400" 
                          : "bg-amber-900/50 text-amber-600 cursor-not-allowed"
                      )}
                      disabled={!canBuy}
                    >
                      {canBuy ? "Buy" : "Not enough coins"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}