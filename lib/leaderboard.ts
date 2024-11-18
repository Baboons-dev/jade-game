"use server";
import prisma from "./prisma";

export const getLeaderboard = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    const [leaderboard, totalUsers] = await prisma.$transaction([
      prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          totalCredits: true,
          toolCredits: true,
          promptCredits: true,
        },
        orderBy: { totalCredits: "desc" },
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
    console.error("Failed to fetch leaderboard:", error);
    return { leaderboard: [], totalPages: 0 };
  }
};

export const getRanks = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      totalCredits: true,
    },
    orderBy: { totalCredits: "desc" },
  });

  if (users) return users;

  return [];
};
