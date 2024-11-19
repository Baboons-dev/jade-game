import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';

import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';

const cookReferralCode = (length: number) => {
  let code = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const crypto = require('crypto-js');

async function decrypt(encryptedText: string) {
  if (encryptedText) {
    const secret_key = process.env.SECRET_KEY;
    const derived_key = crypto.enc.Base64.parse(secret_key);

    // Extract the IV (the first 16 characters) and the payload (the rest)
    const iv = encryptedText.substring(0, 16);
    const payload = encryptedText.substring(16);

    // Parse the IV
    const ivBytes = crypto.enc.Utf8.parse(iv);

    // Decrypt the payload
    const decrypted = crypto.AES.decrypt(payload, derived_key, {
      iv: ivBytes,
      mode: crypto.mode.CBC,
    });

    // Convert from word array to string
    return decrypted.toString(crypto.enc.Utf8);
  }
  return null;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        telegramId: { label: 'telegramId', type: 'text' },
        tgId: { label: 'tgId', type: 'text' },
        firstName: { label: 'firstName', type: 'text' },
      },
      async authorize(credentials): Promise<any> {
        console.log('credentials>>>>>>>>>>>>', credentials);
        if (!credentials) {
          throw new Error('No credentials provided.');
        }
        const decryptedId: any = await decrypt(credentials.tgId ?? '');

        console.log('decryptedId', decryptedId);
        if (decryptedId && decryptedId === credentials.telegramId) {
          let user: any = await prisma?.user?.findUnique({
            where: { telegramId: credentials.telegramId } as any,
            select: {
              id: true,
              firstName: true,
              telegramId: true,
              createdAt: true,
              updatedAt: true,
              referralScore: true,
              gameScore: true,
              totalScore: true,
              referralCode: true,
              referrals: true,
              referredById: true,
            },
          });

          console.log('user', user);

          if (!user) {
            user = await prisma?.user?.create({
              data: {
                telegramId: credentials.telegramId,
                firstName: credentials.firstName,
              },
            });
          }

          if (!user) {
            throw new Error('No user found with the provided email.');
          }
          if (user && !user.referralCode && user.firstName) {
            const code = cookReferralCode(6);
            user = await prisma.user.update({
              where: { telegramId: credentials.telegramId },
              data: {
                firstName: credentials.firstName,
                referralCode: code,
              },
              select: {
                id: true,
                firstName: true,
                telegramId: true,
                createdAt: true,
                updatedAt: true,
                referralScore: true,
                gameScore: true,
                totalScore: true,
                referralCode: true,
                referrals: true,
                referredById: true,
              },
            });
          }
          return user;
        } else {
          throw new Error(`err:Invalid user`);
        }
      },
    }),
    CredentialsProvider({
      id: 'email-password',
      name: 'Email Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          throw new Error('No credentials provided.');
        }

        const { email, password } = credentials;

        const admin = await prisma.admin.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!admin) {
          throw new Error('No admin found with the provided email.');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
          throw new Error('Invalid password.');
        }

        return {
          id: admin.id,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // signIn: "../../../login", // Path to your custom sign-in page
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      console.log('hitted jwt', token, user, trigger, session);

      if (trigger === 'update' && token && !token.role && session) {
        console.log(token, session);
        token = { ...token, ...session };
      }
      if (token) {
        return {
          ...token,
          ...user,
        };
      } else {
        return {};
      }
    },
    async session({ session, token }: any) {
      console.log('session', token, session);
      if (token && token.role && token.id) {
        session.user = {
          id: token.id,
          email: token.email,
          role: token.role,
        };
        return session;
      } else if (token && token.id) {
        session.user = token;
        return session;
      }
      return {};
    },
  },
};
