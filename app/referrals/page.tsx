"use client";

import { Users, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const referrals = [
  { username: "DrillBuddy", joinDate: "2024-03-15", coinsEarned: 500, isActive: true },
  { username: "MineExplorer", joinDate: "2024-03-14", coinsEarned: 300, isActive: true },
  { username: "DiggerFriend", joinDate: "2024-03-12", coinsEarned: 200, isActive: false },
  { username: "EarthMover", joinDate: "2024-03-10", coinsEarned: 400, isActive: true },
];

export default function ReferralsPage() {
  const totalCoins = referrals.reduce((sum, ref) => sum + ref.coinsEarned, 0);
  const activeReferrals = referrals.filter(ref => ref.isActive).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white pt-16">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Users className="w-8 h-8 text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-800">Referrals</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-gray-600 mb-2">Total Referrals</h3>
            <p className="text-3xl font-bold text-gray-800">{referrals.length}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-gray-600 mb-2">Active Referrals</h3>
            <p className="text-3xl font-bold text-gray-800">{activeReferrals}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-gray-600 mb-2">Total Coins Earned</h3>
            <p className="text-3xl font-bold text-gray-800">{totalCoins}</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Referral Link</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value="https://drilling-game.com/ref/YOUR_ID"
              readOnly
              className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg"
            />
            <button className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Copy
            </button>
          </div>
        </div>

        {/* Referrals List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Your Referrals</h2>
          </div>
          
          {referrals.map((referral) => (
            <div
              key={referral.username}
              className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{referral.username}</p>
                <p className="text-sm text-gray-600">Joined {new Date(referral.joinDate).toLocaleDateString()}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-mono text-gray-600">{referral.coinsEarned} coins</p>
                  <p className={cn(
                    "text-sm",
                    referral.isActive ? "text-green-600" : "text-gray-500"
                  )}>
                    {referral.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                
                <Gift className={cn(
                  "w-5 h-5",
                  referral.isActive ? "text-green-600" : "text-gray-500"
                )} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}