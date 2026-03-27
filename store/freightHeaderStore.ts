import { create } from "zustand";

type FreightHeaderStore = {
  bidsRefreshNonce: number;
  triggerBidsRefresh: () => void;
};

export const useFreightHeaderStore = create<FreightHeaderStore>((set) => ({
  bidsRefreshNonce: 0,
  triggerBidsRefresh: () =>
    set((state) => ({
      bidsRefreshNonce: state.bidsRefreshNonce + 1,
    })),
}));
