"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import ReferralProvider from "./ReferralProvider";
import { TelegramProvider } from "./TelegramProvider";

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <TelegramProvider>
      <SessionProvider>
        <ReferralProvider>{children}</ReferralProvider>
      </SessionProvider>
    </TelegramProvider>
  );
};

export default AppProvider;
