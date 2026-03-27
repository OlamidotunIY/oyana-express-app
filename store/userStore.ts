import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { Profile } from "../gql/graphql";

const expoSecureStorage = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

interface UserStore {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () =>
        set({
          user: null,
        }),
    }),
    {
      name: "oyana-user-storage",
      storage: createJSONStorage(() => expoSecureStorage),
    },
  ),
);
