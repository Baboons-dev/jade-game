'use server';
import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';
import prisma from './prisma';

export const updateRefer = async (code: string) => {
  try {
    const session: any = await getServerSession(authOptions as any);

    if (!session) {
      throw new Error('Unauthorized', { cause: { status: 401 } });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (currentUser?.referredById) {
      throw new Error('User is already referred', { cause: { status: 400 } });
    }

    const referrer = await prisma.user.findUnique({
      where: {
        referralCode: code,
      },
    });

    if (!referrer) {
      throw new Error('Invalid referral code', { cause: { status: 400 } });
    }

    if (referrer?.id === currentUser?.id) {
      throw new Error('Cannot refer yourself', { cause: { status: 400 } });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        referredBy: {
          connect: { id: referrer.id },
        },
      },
    });

    const updatedReferrer = await prisma.user.update({
      where: {
        id: referrer.id,
      },
      data: {
        totalScore: {
          increment: 3,
        },
        referralScore: {
          increment: 3,
        },
      },
    });

    return updatedUser;
  } catch (e) {
    return false;
  }
};
