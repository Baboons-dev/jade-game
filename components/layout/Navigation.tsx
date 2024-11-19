'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Gift, Trophy, Users, Menu, X, Coins, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/lib/store';
import { useSession } from 'next-auth/react';

const navItems = [
  { href: '/', label: 'Game', icon: Home },
  { href: '/lootbox', label: 'Lootbox', icon: Gift },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/referrals', label: 'Referrals', icon: Users },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { coins, freeLootboxes } = useGameStore();
  const { data: session } = useSession();
  const user = session?.user as User;

  return (
    <>
      {/* Header Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-black/90 text-white z-30 px-4 flex items-center justify-between lg:pl-24">
        {/* Avatar and Username */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="font-medium">DrillMaster</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Gift className="w-6 h-6" />
            <span className="font-bold">{freeLootboxes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins className="w-6 h-6" />
            <span className="font-bold">{user?.totalScore ?? '0'}</span>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="p-2 lg:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav
        className={cn(
          'fixed top-0 right-0 h-full bg-black/90 text-white w-64 transform transition-transform lg:translate-x-0 lg:w-20 z-20',
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        )}>
        <div className="flex flex-col items-center pt-20 h-full">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'w-full p-4 flex items-center gap-3 hover:bg-white/10 transition-colors',
                'lg:flex-col lg:gap-1 lg:py-6',
                pathname === href && 'bg-white/10'
              )}
              onClick={() => setIsOpen(false)}>
              <Icon className="w-6 h-6" />
              <span className="lg:text-xs">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
