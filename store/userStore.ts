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
  activeAddressId: string | null;
  setUser: (user: Profile | null) => void;
  clearUser: () => void;
  setActiveAddressId: (id: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      activeAddressId: null,
      setUser: (user) => set({ user }),
      clearUser: () =>
        set({
          user: null,
          activeAddressId: null,
        }),
      setActiveAddressId: (activeAddressId) => set({ activeAddressId }),
    }),
    {
      name: "oyana-user-storage",
      storage: createJSONStorage(() => expoSecureStorage),
    },
  ),
);
