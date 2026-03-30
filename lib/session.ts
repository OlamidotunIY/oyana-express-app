import type { MeQuery, Profile } from "@/gql/graphql";
import { DriverType, OnboardingStep, UserRole } from "@/gql/graphql";
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

export type RouterTarget =
  | string
  | {
      pathname: string;
      params?: Record<string, string>;
    };

export type BootResolution = {
  route: RouterTarget;
  profile?: Profile | null;
  statusType?: AppStatusType;
};

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

export function isDriverRole(role?: UserRole | null) {
  return (
    role === UserRole.Rider ||
    role === UserRole.VanDriver ||
    role === UserRole.TruckDriver
  );
}

export function isProviderUser(profile?: Profile | null) {
  return isDriverRole(profile?.role);
}

export function getProfileRoleLabel(
  profile?: Pick<Profile, "role" | "driverType"> | null,
  fallback = "Driver",
) {
  if (profile?.role === UserRole.Admin) {
    return "Admin";
  }

  if (profile?.role === UserRole.Shipper) {
    return "Shipper";
  }

  if (
    profile?.role === UserRole.Rider ||
    profile?.driverType === DriverType.Bike
  ) {
    return "Rider";
  }

  if (
    profile?.role === UserRole.VanDriver ||
    profile?.driverType === DriverType.Van
  ) {
    return "Van Driver";
  }

  if (
    profile?.role === UserRole.TruckDriver ||
    profile?.driverType === DriverType.Truck
  ) {
    return "Truck Driver";
  }

  return fallback;
}

export function shouldPromptNotificationPermission(profile?: Profile | null) {
  return profile?.onboardingStep === OnboardingStep.NotificationPermission;
}

export function resolveAuthenticatedRoute(profile: Profile): RouterTarget {
  if (!profile.onboardingCompleted) {
    switch (profile.onboardingStep) {
      case OnboardingStep.EmailVerification:
        return {
          pathname: "/(auth)/verify-otp",
          params: {
            email: profile.email,
            mode: "email-verification",
          },
        };
      case OnboardingStep.PhoneInput:
        return "/(auth)/onboarding/phone";
      case OnboardingStep.PhoneVerification:
        return "/(auth)/onboarding/verify-phone";
      case OnboardingStep.DriverRegistration:
        return "/(auth)/onboarding/driver";
      case OnboardingStep.Address:
        return "/(auth)/onboarding/address";
      case OnboardingStep.NotificationPermission:
        return "/(auth)/notification-permission";
      case OnboardingStep.Completed:
      default:
        break;
    }
  }

  if (!isProviderUser(profile)) {
    return "/(auth)/customer-not-supported";
  }

  return "/(tabs)";
}

function isUnauthorizedClientError(error: unknown) {
  return isUnauthenticatedGraphQLError(error);
}

export async function resolveBootRoute(): Promise<BootResolution> {
  if (isForceUpdateEnabled()) {
    return {
      route: {
        pathname: "/app-status",
        params: { type: "force-update" },
      },
      statusType: "force-update",
    };
  }

  if (isMaintenanceEnabled()) {
    return {
      route: {
        pathname: "/app-status",
        params: { type: "maintenance" },
      },
      statusType: "maintenance",
    };
  }

  await ensureAuthCookiesLoaded();

  const { accessToken, refreshToken } = getAuthCookies();
  if (!accessToken && !refreshToken) {
    useUserStore.getState().clearUser();
    return { route: "/(auth)/onboarding" };
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
      return { route: "/(auth)/onboarding" };
    }

    useUserStore.getState().setUser(profile);

    return {
      route: resolveAuthenticatedRoute(profile),
      profile,
    };
  } catch (error) {
    if (isUnauthorizedClientError(error)) {
      clearAuthTokens();
      useUserStore.getState().clearUser();
      return { route: "/(auth)/onboarding" };
    }

    clearAuthTokens();
    useUserStore.getState().clearUser();
    return { route: "/(auth)/onboarding" };
  }
}

export async function refetchCurrentUser(): Promise<Profile | null> {
  const { data } = await client.query<MeQuery>({
    query: ME_QUERY,
    fetchPolicy: "no-cache",
    errorPolicy: "none",
  });

  const profile = data?.me ?? null;
  useUserStore.getState().setUser(profile);
  return profile;
}
