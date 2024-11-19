'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
import prisma from './prisma';

export const incrementGameScore = async (increment: number) => {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session) {
      return false;
    }

    const currentUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        gameScore: {
          increment,
        },
        totalScore: {
          increment,
        },
      },
    });
    if (currentUser) {
      return currentUser;
    }
    return false;
  } catch (e) {
    return false;
  }
};
