import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  coins: number;
  level: number;
  freeLootboxes: number;
  addCoins: (amount: number) => void;
  removeCoins: (amount: number) => void;
  addLevel: () => void;
  addFreeLootbox: () => void;
  useFreeLootbox: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      coins: 0,
      level: 1,
      freeLootboxes: 0,
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      removeCoins: (amount) => set((state) => ({ coins: state.coins - amount })),
      addLevel: () => set((state) => ({ 
        level: state.level + 1,
        freeLootboxes: state.freeLootboxes + 1
      })),
      addFreeLootbox: () => set((state) => ({ 
        freeLootboxes: state.freeLootboxes + 1 
      })),
      useFreeLootbox: () => set((state) => ({ 
        freeLootboxes: state.freeLootboxes - 1 
      })),
    }),
    {
      name: 'game-storage',
    }
  )
);