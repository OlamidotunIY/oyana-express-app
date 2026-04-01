import { create } from "zustand";

interface AuthFlowStore {
  pendingPhone: string | null;
  setPendingPhone: (phone: string | null) => void;
}

/**
 * Non-persisted store for transient auth flow state.
 * Used to pass the pending phone number between the phone entry and OTP
 * verify screens without relying on URL params (which corrupt '+' as ' ').
 */
export const useAuthFlowStore = create<AuthFlowStore>()((set) => ({
  pendingPhone: null,
  setPendingPhone: (phone) => set({ pendingPhone: phone }),
}));
