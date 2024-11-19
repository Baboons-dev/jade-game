declare interface DefaultSession {
  user?: {
    id: string;
    firstName: string;
    telegramId: string | number;
    createdAt: string;
    updatedAt: string;
    totalScore: number;
    gameScore: number;
    referralScore: number;
    referralCode: string;
    referredById?: string | null;
  };
}
