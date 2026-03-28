import { ErrorLink } from "@apollo/client/link/error";
import { router } from "expo-router";
import { clearAuthTokens } from "@/lib/auth-cookies";
import { getBackendErrorMessage, isUnauthenticatedGraphQLError } from "@/lib/graphql-errors";
import { showBackendErrorToast } from "@/lib/toast";
import { useUserStore } from "@/store/userStore";

export const errorLink = new ErrorLink(({ error }) => {
  if (!error) {
    return undefined;
  }

  showBackendErrorToast(
    error,
    "Request failed. Please try again.",
    {
      title: "Request Failed",
      dedupeKey: `gql:${getBackendErrorMessage(error, "request-failed")}`,
    },
  );

  if (isUnauthenticatedGraphQLError(error)) {
    clearAuthTokens();
    useUserStore.getState().clearUser();

    setTimeout(() => {
      try {
        router.replace("/(auth)/onboarding");
      } catch {
        // Root navigator may not be mounted yet. Auth guard still handles fallback.
      }
    }, 0);
  }

  return undefined;
});
