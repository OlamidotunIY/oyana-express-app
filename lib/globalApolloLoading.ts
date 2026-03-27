// src/lib/globalApolloLoading.ts
import { create } from "zustand";

export const useGlobalApolloLoading = create<{
  loadingCount: number;
  increment: () => void;
  decrement: () => void;
  isLoading: boolean;
}>((set, get) => ({
  loadingCount: 0,
  increment: () => set((s) => ({ loadingCount: s.loadingCount + 1 })),
  decrement: () =>
    set((s) => {
      const newCount = Math.max(0, s.loadingCount - 1);
      return { loadingCount: newCount };
    }),
  get isLoading() {
    return get().loadingCount > 0;
  },
}));
