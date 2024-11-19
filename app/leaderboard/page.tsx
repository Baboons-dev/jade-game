'use client';

import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { User } from '@/types/type';
import { useSession } from 'next-auth/react';
import { getLeaderboard } from '@/lib/leaderboard';

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardUser] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currRank, setCurrentRank] = useState(0);
  const { data: session } = useSession();
  const user = session?.user as User;

  useEffect(() => {
    getLeaderboard(currentPage, 10)
      .then((res) => {
        setLeaderboardUser(res.leaderboard);
        setTotalPages(res.totalPages);
      })
      .catch(() => console.error('Failed to load users'));
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white pt-16">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-gray-800" />
          <h1 className="text-3xl font-bold text-gray-800">Leaderboard</h1>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
          {leaderboardData.map((player: User, index) => (
            <div
              key={player.id}
              className={cn(
                'flex items-center gap-4 p-4 border-b border-gray-200',
                'hover:bg-gray-50 transition-colors',
                index === 0 && 'bg-gray-50'
              )}>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                  index === 0
                    ? 'bg-black text-white'
                    : index === 1
                      ? 'bg-gray-600 text-white'
                      : index === 2
                        ? 'bg-gray-400 text-gray-900'
                        : 'bg-gray-200 text-gray-700'
                )}>
                {index + 1}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-800">{player.firstName}</p>
              </div>

              <div className="text-right">
                <p className="font-mono text-gray-600">{player.totalScore.toLocaleString()} pts</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center align-middle mt-8 space-x-4">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{ borderRadius: 6 }}
                className="border border-black p-2 bg-white text-black disabled:text-gray-400">
                <ChevronLeft />
              </button>
            )}
            <span
              style={{ borderRadius: 6 }}
              className="text-xl font-medium px-3 py-2 bg-white text-black border border-black">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              disabled={currentPage === totalPages}
              style={{ borderRadius: 6 }}
              className="border border-black p-2 bg-white text-black disabled:text-gray-400">
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
