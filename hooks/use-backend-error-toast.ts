import React from "react";
import { showBackendErrorToast } from "@/lib/toast";

type UseBackendErrorToastOptions = {
  title?: string;
  dedupeKey?: string;
};

export function useBackendErrorToast(
  error: unknown,
  fallbackMessage: string,
  options?: UseBackendErrorToastOptions,
) {
  React.useEffect(() => {
    if (!error) {
      return;
    }

    showBackendErrorToast(error, fallbackMessage, options);
  }, [error, fallbackMessage, options?.title, options?.dedupeKey]);
}
