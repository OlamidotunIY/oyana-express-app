import { ErrorLink } from "@apollo/client/link/error";
import { router } from "expo-router";
import { clearAuthTokens, getAuthCookies } from "@/lib/auth-cookies";
import { getBackendErrorMessage, isUnauthenticatedGraphQLError } from "@/lib/graphql-errors";
import { showBackendErrorToast } from "@/lib/toast";
import { useUserStore } from "@/store/userStore";

const PUBLIC_AUTH_OPERATIONS = new Set([
  "RequestPhoneOtp",
  "VerifyPhoneOtpAndAuthenticate",
  "SignInWithGoogle",
]);

export const errorLink = new ErrorLink(({ error, operation }) => {
  if (!error) {
    return undefined;
  }

  const operationName = operation.operationName ?? "";
  const isPublicAuthOperation = PUBLIC_AUTH_OPERATIONS.has(operationName);

  if (!isPublicAuthOperation) {
    showBackendErrorToast(
      error,
      "Request failed. Please try again.",
      {
        title: "Request Failed",
        dedupeKey: `gql:${getBackendErrorMessage(error, "request-failed")}`,
      },
    );
  }

  if (isUnauthenticatedGraphQLError(error)) {
    const { accessToken, refreshToken } = getAuthCookies();

    if (!accessToken && !refreshToken) {
      return undefined;
    }

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
