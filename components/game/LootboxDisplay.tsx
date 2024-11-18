"use client";

import { Package, Coins, Gift } from 'lucide-react';

interface LootboxDisplayProps {
  type: 'free' | 'premium';
  cost: number;
  canOpen: boolean;
  onOpen: () => void;
  freeLootboxes: number;
}

export function LootboxDisplay({ type, cost, canOpen, onOpen, freeLootboxes }: LootboxDisplayProps) {
  const isFree = type === 'free';

  return (
    <div className="text-center">
      <div className="relative inline-block mb-6">
        <Package 
          className={`w-32 h-32 ${
            canOpen 
              ? isFree 
                ? 'text-black animate-pulse' 
                : 'text-gray-800 animate-pulse'
              : 'text-gray-400'
          }`}
        />
        {isFree && (
          <div className="absolute -top-2 -right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {freeLootboxes}
          </div>
        )}
      </div>
      
      <div className="mt-4 space-y-4">
        {isFree ? (
          <>
            <p className="text-gray-800 text-lg mb-4">
              You have {freeLootboxes} free lootbox{freeLootboxes !== 1 ? 'es' : ''}!
            </p>
            <button
              onClick={onOpen}
              className="w-full px-6 py-3 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Gift className="w-5 h-5" />
              Open Free Lootbox
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 text-xl text-gray-800">
              <Coins className="w-6 h-6 text-gray-600" />
              <span>{cost}</span>
            </div>

            <button
              onClick={onOpen}
              disabled={!canOpen}
              className={`
                w-full px-6 py-3 rounded-lg font-semibold transition-colors
                ${canOpen 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
              `}
            >
              {canOpen ? 'Open Lootbox' : 'Not Enough Coins'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}