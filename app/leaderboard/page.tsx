"use client";

import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const leaderboardData = [
  { username: "DrillMaster", points: 15000, rank: 1 },
  { username: "DiggerPro", points: 12500, rank: 2 },
  { username: "EarthBreaker", points: 10000, rank: 3 },
  { username: "MineKing", points: 8750, rank: 4 },
  { username: "DrillExpert", points: 7500, rank: 5 },
  { username: "GroundBreaker", points: 6250, rank: 6 },
  { username: "DiggingChamp", points: 5000, rank: 7 },
  { username: "DrillWarrior", points: 3750, rank: 8 },
  { username: "EarthShaker", points: 2500, rank: 9 },
  { username: "DigLegend", points: 1250, rank: 10 },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white pt-16">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          {leaderboardData.map((player, index) => (
            <div
              key={player.username}
              className={cn(
                "flex items-center gap-4 p-4 border-b border-gray-200",
                "hover:bg-gray-50 transition-colors",
                index === 0 && "bg-gray-50"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold",
                index === 0 ? "bg-black text-white" :
                index === 1 ? "bg-gray-600 text-white" :
                index === 2 ? "bg-gray-400 text-gray-900" :
                "bg-gray-200 text-gray-700"
              )}>
                {player.rank}
              </div>
              
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{player.username}</p>
              </div>
              
              <div className="text-right">
                <p className="font-mono text-gray-600">{player.points.toLocaleString()} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}