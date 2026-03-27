import { getBackendErrorMessage } from "@/lib/graphql-errors";
import { ToastTone, useToastStore } from "@/store/toastStore";

type ShowToastInput = {
  title?: string;
  message: string;
  tone?: ToastTone;
  dedupeKey?: string;
  durationMs?: number;
};

export function showToast(input: ShowToastInput) {
  return useToastStore.getState().showToast(input);
}

export function showErrorToast(message: string, options?: { title?: string; dedupeKey?: string }) {
  return showToast({
    title: options?.title ?? "Error",
    message,
    tone: "error",
    dedupeKey: options?.dedupeKey ?? `error:${message}`,
  });
}

export function showBackendErrorToast(
  error: unknown,
  fallbackMessage: string,
  options?: { title?: string; dedupeKey?: string },
) {
  const message = getBackendErrorMessage(error, fallbackMessage);

  if (!message) {
    return null;
  }

  return showErrorToast(message, {
    title: options?.title,
    dedupeKey: options?.dedupeKey ?? `backend:${message}`,
  });
}
