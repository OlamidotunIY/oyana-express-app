import type { MeQuery, Profile } from "@/gql/graphql";
import { UserType } from "@/gql/graphql";
import { ME_QUERY } from "@/graphql";
import { client } from "@/lib/apolloClient";
import {
  getBackendErrorMessage,
  isUnauthenticatedGraphQLError,
} from "@/lib/graphql-errors";
import {
  clearAuthTokens,
  ensureAuthCookiesLoaded,
  getAuthCookies,
} from "@/lib/auth-cookies";
import { useUserStore } from "@/store/userStore";

export type AppStatusType = "maintenance" | "force-update";

export type BootResolution =
  | { route: "auth"; reason?: "not-provider" }
  | { route: "verify-email"; email: string }
  | { route: "notification-permission"; profile: Profile }
  | { route: "tabs"; profile: Profile }
  | { route: "app-status"; statusType: AppStatusType };

export function isForceUpdateEnabled() {
  return process.env.EXPO_PUBLIC_FORCE_UPDATE === "true";
}

export function isMaintenanceEnabled() {
  return process.env.EXPO_PUBLIC_MAINTENANCE_MODE === "true";
}

export function detectIdentifierType(identifier: string) {
  const normalized = identifier.trim();
  if (normalized.includes("@")) {
    return "email" as const;
  }

  return "phone" as const;
}

export function parseAuthError(error: unknown, fallbackMessage: string) {
  return getBackendErrorMessage(error, fallbackMessage);
}

export function isProviderUser(profile?: Profile | null) {
  return profile?.roles.includes(UserType.Business);
}

export function shouldPromptNotificationPermission(profile?: Profile | null) {
  return Boolean(profile?.emailVerified && !profile?.notificationPromptedAt);
}

export function resolveAuthenticatedRoute(profile: Profile) {
  return shouldPromptNotificationPermission(profile)
    ? "/(auth)/notification-permission"
    : "/(tabs)";
}

function isUnauthorizedClientError(error: unknown) {
  return isUnauthenticatedGraphQLError(error);
}

export async function resolveBootRoute(): Promise<BootResolution> {
  if (isForceUpdateEnabled()) {
    return { route: "app-status", statusType: "force-update" };
  }

  if (isMaintenanceEnabled()) {
    return { route: "app-status", statusType: "maintenance" };
  }

  await ensureAuthCookiesLoaded();

  const { accessToken, refreshToken } = getAuthCookies();
  if (!accessToken && !refreshToken) {
    useUserStore.getState().clearUser();
    return { route: "auth" };
  }

  try {
    const { data } = await client.query<MeQuery>({
      query: ME_QUERY,
      fetchPolicy: "no-cache",
      errorPolicy: "none",
    });

    const profile = data?.me ?? null;
    if (!profile) {
      clearAuthTokens();
      useUserStore.getState().clearUser();
      return { route: "auth" };
    }

    if (!isProviderUser(profile)) {
      clearAuthTokens();
      useUserStore.getState().clearUser();
      return { route: "auth", reason: "not-provider" };
    }

    useUserStore.getState().setUser(profile);

    if (!profile.emailVerified) {
      return {
        route: "verify-email",
        email: profile.email,
      };
    }

    if (shouldPromptNotificationPermission(profile)) {
      return {
        route: "notification-permission",
        profile,
      };
    }

    return {
      route: "tabs",
      profile,
    };
  } catch (error) {
    if (isUnauthorizedClientError(error)) {
      clearAuthTokens();
      useUserStore.getState().clearUser();
      return { route: "auth" };
    }

    clearAuthTokens();
    useUserStore.getState().clearUser();
    return { route: "auth" };
  }
}
