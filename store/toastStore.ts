import { create } from "zustand";

export type ToastTone = "error" | "success" | "info";

export type ToastItem = {
  id: string;
  title?: string;
  message: string;
  tone: ToastTone;
  createdAt: number;
};

type ShowToastInput = {
  title?: string;
  message: string;
  tone?: ToastTone;
  durationMs?: number;
  dedupeKey?: string;
};

type ToastStore = {
  toasts: ToastItem[];
  showToast: (input: ShowToastInput) => string | null;
  dismissToast: (id: string) => void;
  clearToasts: () => void;
};

const activeTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const recentToastByKey = new Map<string, number>();
const DEDUPE_WINDOW_MS = 1800;

function makeToastId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  showToast: ({ title, message, tone = "info", durationMs = 4200, dedupeKey }) => {
    const normalizedMessage = message.trim();
    if (!normalizedMessage) {
      return null;
    }

    const currentTime = Date.now();
    const dedupeKeys = [`message:${normalizedMessage}`];
    if (dedupeKey) {
      dedupeKeys.push(`custom:${dedupeKey}`);
    }

    const hasRecentToast = dedupeKeys.some((key) => {
      const lastShownAt = recentToastByKey.get(key);
      return typeof lastShownAt === "number" && currentTime - lastShownAt < DEDUPE_WINDOW_MS;
    });

    if (hasRecentToast) {
      return null;
    }

    for (const key of dedupeKeys) {
      recentToastByKey.set(key, currentTime);
    }

    const id = makeToastId();
    const toast: ToastItem = {
      id,
      title,
      message: normalizedMessage,
      tone,
      createdAt: Date.now(),
    };

    set((state) => ({
      toasts: [...state.toasts, toast].slice(-3),
    }));

    if (durationMs > 0) {
      const timeout = setTimeout(() => {
        get().dismissToast(id);
      }, durationMs);
      activeTimeouts.set(id, timeout);
    }

    return id;
  },
  dismissToast: (id) => {
    const timeout = activeTimeouts.get(id);
    if (timeout) {
      clearTimeout(timeout);
      activeTimeouts.delete(id);
    }

    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToasts: () => {
    for (const timeout of activeTimeouts.values()) {
      clearTimeout(timeout);
    }

    activeTimeouts.clear();
    set({ toasts: [] });
  },
}));
