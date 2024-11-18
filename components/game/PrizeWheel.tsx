"use client";

import { useState, useEffect } from 'react';
import { Coins } from 'lucide-react';

interface PrizeWheelProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: (amount: number) => void;
  level: number;
}

const SEGMENTS = 8;
const ROTATION_TIME = 4000;

export function PrizeWheel({ isOpen, onClose, onReward, level }: PrizeWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [finalRotation, setFinalRotation] = useState(0);
  const [reward, setReward] = useState<number | null>(null);

  const rewards = [
    50 * level,
    25 * level,
    100 * level,
    75 * level,
    125 * level,
    25 * level,
    150 * level,
    50 * level,
  ];

  useEffect(() => {
    if (isOpen && !isSpinning && reward === null) {
      spinWheel();
    }
  }, [isOpen]);

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setReward(null);

    const winningIndex = Math.floor(Math.random() * SEGMENTS);
    const baseRotations = 5;
    const segmentAngle = 360 / SEGMENTS;
    const finalAngle = (360 - (winningIndex * segmentAngle)) + (baseRotations * 360);
    
    setFinalRotation(finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = rewards[winningIndex];
      setReward(prize);
      onReward(prize);
    }, ROTATION_TIME);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 text-center max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Spin the Wheel!</h2>
        
        <div className="relative w-72 h-72 mx-auto mb-6">
          {/* Pointer */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-10 bg-black clip-triangle z-10" />
          
          {/* Wheel */}
          <div
            className="absolute inset-0 rounded-full border-8 border-gray-900 overflow-hidden bg-gray-800"
            style={{
              transform: `rotate(${finalRotation}deg)`,
              transition: isSpinning ? `transform ${ROTATION_TIME}ms cubic-bezier(0.32, 0.94, 0.60, 1)` : 'none',
            }}
          >
            {rewards.map((reward, index) => {
              const rotation = (360 / SEGMENTS) * index;
              return (
                <div
                  key={index}
                  className="absolute w-full h-full"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  {/* Segment */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
                    style={{
                      width: '4px',
                      height: '50%',
                      backgroundColor: index % 2 === 0 ? '#1f2937' : '#111827',
                    }}
                  />
                  
                  {/* Number */}
                  <div
                    className="absolute top-[20%] left-1/2 -translate-x-1/2 text-white font-bold text-xl"
                    style={{
                      transform: `rotate(${-rotation}deg)`,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    {reward}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Point */}
          <div className="absolute inset-0 m-auto w-12 h-12 bg-black rounded-full z-20 border-4 border-white" />
        </div>

        {reward !== null && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-4 text-2xl font-bold text-gray-800">
              <Coins className="w-8 h-8 text-gray-600" />
              <span>You won {reward} coins!</span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Collect Reward
            </button>
          </div>
        )}
      </div>
    </div>
  );
}