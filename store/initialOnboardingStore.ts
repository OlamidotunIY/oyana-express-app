import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AppMode } from "@/gql/graphql";

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

interface InitialOnboardingStore {
  completedProfileIds: string[];
  selectedModesByProfileId: Record<string, AppMode>;
  hasCompletedInitialOnboarding: (profileId?: string | null) => boolean;
  getSelectedMode: (profileId?: string | null) => AppMode | null;
  setSelectedMode: (profileId: string, mode: AppMode) => void;
  clearSelectedMode: (profileId: string) => void;
  markCompleted: (profileId: string) => void;
}

export const useInitialOnboardingStore = create<InitialOnboardingStore>()(
  persist(
    (set, get) => ({
      completedProfileIds: [],
      selectedModesByProfileId: {},
      hasCompletedInitialOnboarding: (profileId) => {
        if (!profileId) {
          return false;
        }

        return get().completedProfileIds.includes(profileId);
      },
      getSelectedMode: (profileId) => {
        if (!profileId) {
          return null;
        }

        return get().selectedModesByProfileId[profileId] ?? null;
      },
      setSelectedMode: (profileId, mode) =>
        set((state) => ({
          selectedModesByProfileId: {
            ...state.selectedModesByProfileId,
            [profileId]: mode,
          },
        })),
      clearSelectedMode: (profileId) =>
        set((state) => {
          const nextModes = { ...state.selectedModesByProfileId };
          delete nextModes[profileId];

          return {
            selectedModesByProfileId: nextModes,
          };
        }),
      markCompleted: (profileId) =>
        set((state) => ({
          completedProfileIds: state.completedProfileIds.includes(profileId)
            ? state.completedProfileIds
            : [...state.completedProfileIds, profileId],
        })),
    }),
    {
      name: "oyana-initial-onboarding-storage",
      storage: createJSONStorage(() => expoSecureStorage),
    },
  ),
);

let initialOnboardingHydrationPromise: Promise<void> | null = null;

export async function ensureInitialOnboardingStoreLoaded() {
  if (useInitialOnboardingStore.persist.hasHydrated()) {
    return;
  }

  if (!initialOnboardingHydrationPromise) {
    initialOnboardingHydrationPromise = Promise.resolve(
      useInitialOnboardingStore.persist.rehydrate(),
    ).finally(() => {
      initialOnboardingHydrationPromise = null;
    });
  }

  await initialOnboardingHydrationPromise;
}
