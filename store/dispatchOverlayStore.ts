import { create } from "zustand";

type DispatchOverlayStore = {
  dismissedOfferIds: string[];
  snoozedUntilByOfferId: Record<string, number>;
  dismissOffers: (ids: string[]) => void;
  snoozeOffers: (ids: string[], durationMs: number) => void;
  restoreOffer: (id: string) => void;
  clearDismissedOffers: () => void;
  clearExpiredSnoozes: (now: number) => void;
};

export const useDispatchOverlayStore = create<DispatchOverlayStore>((set) => ({
  dismissedOfferIds: [],
  snoozedUntilByOfferId: {},
  dismissOffers: (ids) => {
    const normalizedIds = ids.filter(Boolean);
    if (normalizedIds.length === 0) {
      return;
    }

    set((state) => ({
      dismissedOfferIds: Array.from(
        new Set([...state.dismissedOfferIds, ...normalizedIds]),
      ),
    }));
  },
  snoozeOffers: (ids, durationMs) => {
    const normalizedIds = ids.filter(Boolean);
    if (normalizedIds.length === 0 || durationMs <= 0) {
      return;
    }

    const snoozeUntil = Date.now() + durationMs;

    set((state) => ({
      dismissedOfferIds: state.dismissedOfferIds.filter(
        (offerId) => !normalizedIds.includes(offerId),
      ),
      snoozedUntilByOfferId: normalizedIds.reduce<Record<string, number>>(
        (acc, id) => {
          acc[id] = snoozeUntil;
          return acc;
        },
        { ...state.snoozedUntilByOfferId },
      ),
    }));
  },
  restoreOffer: (id) => {
    if (!id) {
      return;
    }

    set((state) => ({
      dismissedOfferIds: state.dismissedOfferIds.filter(
        (offerId) => offerId !== id,
      ),
      snoozedUntilByOfferId: Object.fromEntries(
        Object.entries(state.snoozedUntilByOfferId).filter(
          ([offerId]) => offerId !== id,
        ),
      ),
    }));
  },
  clearDismissedOffers: () => {
    set({ dismissedOfferIds: [] });
  },
  clearExpiredSnoozes: (now) => {
    set((state) => ({
      snoozedUntilByOfferId: Object.fromEntries(
        Object.entries(state.snoozedUntilByOfferId).filter(
          ([, until]) => until > now,
        ),
      ),
    }));
  },
}));
