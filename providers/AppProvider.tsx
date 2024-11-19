'use client';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import ReferralProvider from './ReferralProvider';
import { TelegramProvider } from './TelegramProvider';

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <TelegramProvider>
        <ReferralProvider>{children}</ReferralProvider>
      </TelegramProvider>
    </SessionProvider>
  );
};

export default AppProvider;
