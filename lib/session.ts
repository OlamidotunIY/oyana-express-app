import type { MeQuery, Profile } from "@/gql/graphql";
import {
  AppMode,
  DriverCapability,
  DriverOnboardingStatus,
  DriverType,
  UserRole,
} from "@/gql/graphql";
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
  return role === UserRole.Rider || role === UserRole.VanDriver || role === UserRole.TruckDriver;
}

export function hasDriverMode(profile?: Profile | null) {
  if (!profile) {
    return false;
  }

  return (
    profile.availableModes.includes(AppMode.Driver) ||
    profile.driverOnboardingStatus === DriverOnboardingStatus.Approved
  );
}

export function isDriverMode(profile?: Profile | null) {
  return profile?.currentMode === AppMode.Driver;
}

export function isShipperMode(profile?: Profile | null) {
  return !profile || profile.currentMode === AppMode.Shipper;
}

export function isProviderUser(profile?: Profile | null) {
  return isDriverMode(profile);
}

export function canAccessDispatch(profile?: Profile | null) {
  if (!profile) {
    return false;
  }

  return (
    profile.driverCapabilities.includes(DriverCapability.Dispatch) ||
    profile.driverOnboardingStatus === DriverOnboardingStatus.Approved
  );
}

export function canAccessFreight(profile?: Profile | null) {
  if (!profile) {
    return false;
  }

  if (profile.driverCapabilities.includes(DriverCapability.Freight)) {
    return true;
  }

  return (
    profile.driverOnboardingStatus === DriverOnboardingStatus.Approved &&
    (profile.driverType === DriverType.Van || profile.driverType === DriverType.Truck)
  );
}

export function getProfileRoleLabel(
  profile?: Pick<
    Profile,
    "role" | "driverType" | "currentMode" | "availableModes" | "driverOnboardingStatus"
  > | null,
  fallback = "User",
) {
  if (profile?.role === UserRole.Admin) {
    return "Admin";
  }

  if (
    profile?.currentMode === AppMode.Shipper ||
    (!profile?.availableModes?.includes(AppMode.Driver) &&
      profile?.driverOnboardingStatus !== DriverOnboardingStatus.Approved)
  ) {
    return "Shipper";
  }

  if (profile?.driverType === DriverType.Bike) {
    return "Rider";
  }

  if (profile?.driverType === DriverType.Van) {
    return "Van Driver";
  }

  if (profile?.driverType === DriverType.Truck) {
    return "Truck Driver";
  }

  return fallback;
}

export function shouldPromptNotificationPermission(_profile?: Profile | null) {
  return false;
}

export function resolveAuthenticatedRoute(_profile: Profile): RouterTarget {
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
