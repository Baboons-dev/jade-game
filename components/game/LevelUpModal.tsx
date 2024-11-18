"use client";

import { useRouter } from 'next/navigation';
import { Package, ArrowRight } from 'lucide-react';

interface LevelUpModalProps {
  isOpen: boolean;
  level: number;
  onClose: () => void;
}

export function LevelUpModal({ isOpen, level, onClose }: LevelUpModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleGoToLootbox = () => {
    onClose();
    router.push('/lootbox');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl p-8 text-center max-w-md mx-4 shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Level Up!</h2>
        <p className="text-xl mb-6 text-gray-600">You reached Level {level}</p>
        
        <div className="relative inline-block mb-6">
          <Package className="w-24 h-24 text-gray-800 animate-pulse" />
          <div className="absolute -top-2 -right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            1
          </div>
        </div>

        <p className="text-lg mb-8 text-gray-600">
          You earned a <span className="font-bold">FREE</span> lootbox!
        </p>

        <div className="space-y-3">
          <button
            onClick={handleGoToLootbox}
            className="w-full px-6 py-3 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            Open Lootbox
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Continue Playing
          </button>
        </div>
      </div>
    </div>
  );
}