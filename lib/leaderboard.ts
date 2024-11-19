'use server';
import prisma from './prisma';
import { User } from '@/types/type';

export const getLeaderboard = async (
  page = 1,
  limit = 10
): Promise<{ leaderboard: User[]; totalPages: number }> => {
  try {
    const skip = (page - 1) * limit;

    const [leaderboard, totalUsers] = await prisma.$transaction([
      prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          gameScore: true,
          totalScore: true,
        },
        orderBy: { totalScore: 'desc' },
        take: limit,
        skip: skip,
      }),
      prisma.user.count(),
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    return {
      leaderboard,
      totalPages,
    };
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return { leaderboard: [], totalPages: 0 };
  }
};

export const getRanks = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      totalScore: true,
    },
    orderBy: { totalScore: 'desc' },
  });

  if (users) return users;

  return [];
};
