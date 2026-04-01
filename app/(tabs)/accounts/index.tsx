import { Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button } from "@/components/ui/Button";
import {
  AppMode,
  DriverOnboardingStatus,
  MeQuery,
  MeQueryVariables,
  MyDriverProfileQuery,
  MyDriverProfileQueryVariables,
  SwitchAppModeMutation,
  SwitchAppModeMutationVariables,
} from "@/gql/graphql";
import { ME_QUERY, MY_DRIVER_PROFILE_QUERY, SWITCH_APP_MODE_MUTATION } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { useProfileImageUpload } from "@/hooks/use-profile-image-upload";
import { clearAuthTokens } from "@/lib/auth-cookies";
import { client } from "@/lib/apolloClient";
import { getProfileRoleLabel, hasDriverMode, isDriverMode } from "@/lib/session";
import { showBackendErrorToast } from "@/lib/toast";
import { useUserStore } from "@/store/userStore";
import
{
    StyledAccountAvatar,
    StyledAccountAvatarButton,
    StyledAccountAvatarCameraBadge,
    StyledAccountAvatarImage,
    StyledAccountAvatarText,
    StyledAccountHeroChip,
    StyledAccountHeroHeaderRow,
    StyledAccountHeroLabel,
    StyledAccountIdentityRow,
    StyledAccountIdentityTextGroup,
    StyledAccountInfoPill,
    StyledAccountInfoPillLabel,
    StyledAccountInfoPillsRow,
    StyledAccountInfoPillValue,
    StyledAccountLoadingWrap,
    StyledAccountNavigationDescription,
    StyledAccountNavigationIconWrap,
    StyledAccountNavigationLead,
    StyledAccountNavigationList,
    StyledAccountNavigationRow,
    StyledAccountNavigationTextGroup,
    StyledAccountNavigationTitle,
    StyledAccountProfileHero,
    StyledAccountProfileMeta,
    StyledAccountProfileName,
    StyledAccountRoot,
    StyledAccountSectionLabel,
    StyledAccountStatBox,
    StyledAccountStatBoxDivider,
    StyledAccountStatBoxIconWrap,
    StyledAccountStatBoxLabel,
    StyledAccountStatBoxRow,
    StyledAccountStatBoxValue,
    StyledAccountSurfaceCard,
} from "@/styles/tabs";
import { formatMinorCurrency } from "@/utils/format";
import { useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

type NavigationRowProps = {
  iconName: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  description: string;
  onPress: () => void;
};

function formatEnum(value?: string | null): string {
  if (!value) {
    return "-";
  }

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function NavigationRow({ iconName, title, description, onPress }: NavigationRowProps) {
  const theme = useTheme();

  return (
    <StyledAccountNavigationRow onPress={onPress}>
      <StyledAccountNavigationLead>
        <StyledAccountNavigationIconWrap>
          <MaterialIcons name={iconName} size={16} color={theme.colors.primary} />
        </StyledAccountNavigationIconWrap>
        <StyledAccountNavigationTextGroup>
          <StyledAccountNavigationTitle>{title}</StyledAccountNavigationTitle>
          <StyledAccountNavigationDescription>{description}</StyledAccountNavigationDescription>
        </StyledAccountNavigationTextGroup>
      </StyledAccountNavigationLead>
      <MaterialIcons name="arrow-forward-ios" size={16} color={theme.colors.mutedForeground} />
    </StyledAccountNavigationRow>
  );
}

function getDriverModeCta(profile: MeQuery["me"], driverProfile: MyDriverProfileQuery["myDriverProfile"]) {
  if (!profile) {
    return {
      title: "Driver mode",
      description: "Complete onboarding to unlock dispatch and freight tools.",
    };
  }

  if (isDriverMode(profile)) {
    return {
      title: "Switch to shipper mode",
      description: "Move back to your shipper tabs while keeping your driver account ready in the background.",
    };
  }

  if (hasDriverMode(profile)) {
    return {
      title: "Switch to driver mode",
      description: "Open your driver tabs and start receiving work with the approved driver profile on this account.",
    };
  }

  if (driverProfile?.onboardingStatus === DriverOnboardingStatus.InReview) {
    return {
      title: "Driver onboarding in review",
      description: "Your submission has been sent for review. You can reopen the form to check the details you submitted.",
    };
  }

  if (driverProfile?.onboardingStatus === DriverOnboardingStatus.Rejected) {
    return {
      title: "Resume driver onboarding",
      description: "Your last submission needs updates before approval. Open the flow to fix the review items and resubmit.",
    };
  }

  if (driverProfile?.onboardingStatus === DriverOnboardingStatus.Draft) {
    return {
      title: "Continue driver onboarding",
      description: "Pick up where you left off and finish the verification steps for your driver profile.",
    };
  }

  return {
    title: "Driver mode",
    description: "Unlock rider, van, or truck tools on this same account after completing driver verification.",
  };
}

export default function AccountsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const storedUser = useUserStore((s) => s.user);
  const clearUser = useUserStore((s) => s.clearUser);
  const setUser = useUserStore((s) => s.setUser);
  const { isUploading, pickAndUploadProfileImage } = useProfileImageUpload();

  async function handleLogout() {
    clearAuthTokens();
    clearUser();
    await client.clearStore();
    router.replace("/(auth)/onboarding" as never);
  }

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery<MeQuery, MeQueryVariables>(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const profile = profileData?.me ?? null;

  const {
    data: driverProfileData,
    loading: driverLoading,
    error: driverError,
  } = useQuery<MyDriverProfileQuery, MyDriverProfileQueryVariables>(MY_DRIVER_PROFILE_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    skip:
      !profile?.driverProfileId &&
      profile?.driverOnboardingStatus === DriverOnboardingStatus.NotStarted,
  });

  const [switchAppMode, { loading: switchingMode }] = useMutation<
    SwitchAppModeMutation,
    SwitchAppModeMutationVariables
  >(SWITCH_APP_MODE_MUTATION);

  useBackendErrorToast(profileError, "Unable to load profile details.", {
    title: "Account Error",
    dedupeKey: "account-profile-query",
  });

  useBackendErrorToast(driverError, "Unable to load driver onboarding details.", {
    title: "Account Error",
    dedupeKey: "account-driver-profile-query",
  });

  const driverProfile = driverProfileData?.myDriverProfile ?? null;
  const isLoading = (profileLoading || driverLoading) && !profile;

  const displayName =
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
    profile?.email ||
    "Oyana user";
  const roleLabel = getProfileRoleLabel(profile, "User");
  const initials =
    `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""}`.trim().toUpperCase() || "OU";
  const profileImageUrl = storedUser?.profileImageUrl ?? null;
  const walletBalance = formatMinorCurrency(
    profile?.walletBalanceMinor ?? 0,
    profile?.walletCurrency ?? "NGN",
  );
  const currentModeLabel = profile?.currentMode === AppMode.Driver ? "Driver mode" : "Shipper mode";
  const driverStatusLabel =
    profile?.driverOnboardingStatus === DriverOnboardingStatus.NotStarted
      ? "Shipper active"
      : formatEnum(profile?.driverOnboardingStatus);
  const driverCta = getDriverModeCta(profile, driverProfile);

  const handleDriverModeAction = async () => {
    if (!profile) {
      return;
    }

    if (isDriverMode(profile)) {
      try {
        const { data } = await switchAppMode({
          variables: {
            input: {
              mode: AppMode.Shipper,
            },
          },
        });

        if (data?.switchAppMode) {
          setUser(data.switchAppMode);
          await refetchProfile();
          router.replace("/(tabs)" as never);
        }
      } catch (error) {
        showBackendErrorToast(error, "Unable to switch back to shipper mode.", {
          title: "Mode Switch Error",
          dedupeKey: "account-switch-to-shipper",
        });
      }
      return;
    }

    if (hasDriverMode(profile)) {
      try {
        const { data } = await switchAppMode({
          variables: {
            input: {
              mode: AppMode.Driver,
            },
          },
        });

        if (data?.switchAppMode) {
          setUser(data.switchAppMode);
          await refetchProfile();
          router.replace("/(tabs)" as never);
        }
      } catch (error) {
        showBackendErrorToast(error, "Unable to switch into driver mode.", {
          title: "Mode Switch Error",
          dedupeKey: "account-switch-to-driver",
        });
      }
      return;
    }

    router.push("/accounts/driver-mode" as never);
  };

  return (
    <ScreenShell
      contentJustify="flex-start"
      stickyTop={
        <StyledAccountProfileHero>
          <StyledAccountHeroHeaderRow>
            <StyledAccountHeroLabel>{currentModeLabel}</StyledAccountHeroLabel>
            <StyledAccountHeroChip>{driverStatusLabel}</StyledAccountHeroChip>
          </StyledAccountHeroHeaderRow>

          {isLoading ? (
            <StyledAccountLoadingWrap>
              <Spinner size="small" />
            </StyledAccountLoadingWrap>
          ) : null}

          <StyledAccountIdentityRow>
            <StyledAccountAvatarButton
              accessibilityLabel="Change profile image"
              accessibilityRole="button"
              disabled={isUploading}
              hitSlop={10}
              onPress={() => void pickAndUploadProfileImage()}
            >
              <StyledAccountAvatar>
                {profileImageUrl ? (
                  <StyledAccountAvatarImage
                    source={{ uri: profileImageUrl }}
                    resizeMode="cover"
                  />
                ) : (
                  <StyledAccountAvatarText>{initials}</StyledAccountAvatarText>
                )}
              </StyledAccountAvatar>
              <StyledAccountAvatarCameraBadge>
                <MaterialIcons
                  name={isUploading ? "hourglass-empty" : "photo-camera"}
                  size={12}
                  color={theme.colors.primaryForeground}
                />
              </StyledAccountAvatarCameraBadge>
            </StyledAccountAvatarButton>
            <StyledAccountIdentityTextGroup>
              <StyledAccountProfileName numberOfLines={1}>{displayName}</StyledAccountProfileName>
              <StyledAccountProfileMeta numberOfLines={1}>
                {profile?.phoneE164 ?? profile?.email ?? "-"}
              </StyledAccountProfileMeta>
            </StyledAccountIdentityTextGroup>
          </StyledAccountIdentityRow>

          <StyledAccountInfoPillsRow>
            <StyledAccountInfoPill>
              <StyledAccountInfoPillLabel>Role</StyledAccountInfoPillLabel>
              <StyledAccountInfoPillValue>{roleLabel}</StyledAccountInfoPillValue>
            </StyledAccountInfoPill>
            <StyledAccountInfoPill>
              <StyledAccountInfoPillLabel>Profile status</StyledAccountInfoPillLabel>
              <StyledAccountInfoPillValue>{formatEnum(profile?.status)}</StyledAccountInfoPillValue>
            </StyledAccountInfoPill>
          </StyledAccountInfoPillsRow>
        </StyledAccountProfileHero>
      }
    >
      <StyledAccountRoot>
        <StyledAccountStatBoxRow>
          <StyledAccountStatBox>
            <StyledAccountStatBoxIconWrap>
              <MaterialIcons
                name="account-balance-wallet"
                size={12}
                color={theme.colors.heroChipForeground}
              />
            </StyledAccountStatBoxIconWrap>
            <StyledAccountStatBoxValue>{walletBalance}</StyledAccountStatBoxValue>
            <StyledAccountStatBoxLabel>Wallet balance</StyledAccountStatBoxLabel>
          </StyledAccountStatBox>
          <StyledAccountStatBoxDivider />
          <StyledAccountStatBox>
            <StyledAccountStatBoxIconWrap>
              <MaterialIcons
                name="notifications"
                size={12}
                color={theme.colors.heroChipForeground}
              />
            </StyledAccountStatBoxIconWrap>
            <StyledAccountStatBoxValue>{profile?.unreadNotificationCount ?? 0}</StyledAccountStatBoxValue>
            <StyledAccountStatBoxLabel>Unread notifications</StyledAccountStatBoxLabel>
          </StyledAccountStatBox>
        </StyledAccountStatBoxRow>

        <StyledAccountSurfaceCard>
          <StyledAccountSectionLabel>Account</StyledAccountSectionLabel>
          <StyledAccountNavigationList>
            <NavigationRow
              iconName="location-on"
              title="Manage addresses"
              description="Add and update pickup or delivery addresses for your shipments."
              onPress={() => router.push("/accounts/manage-addresses" as never)}
            />
            <NavigationRow
              iconName="settings"
              title="Settings"
              description="Manage notifications, appearance, and account preferences."
              onPress={() => router.push("/accounts/settings" as never)}
            />
            {!profile?.phoneVerified ? (
              <NavigationRow
                iconName="phone-iphone"
                title="Verify phone"
                description="Confirm your phone number for wallet actions and account recovery."
                onPress={() => router.push("/accounts/verify-phone" as never)}
              />
            ) : null}
            {driverProfile || hasDriverMode(profile) ? (
              <NavigationRow
                iconName="directions-car"
                title="Driver onboarding"
                description="Review your driver verification details, documents, and onboarding status."
                onPress={() => router.push("/accounts/driver-mode" as never)}
              />
            ) : null}
          </StyledAccountNavigationList>
        </StyledAccountSurfaceCard>

        <StyledAccountSurfaceCard>
          <StyledAccountSectionLabel>Support &amp; policy</StyledAccountSectionLabel>
          <StyledAccountNavigationList>
            <NavigationRow
              iconName="support-agent"
              title="Support"
              description="Reach out to support channels and help resources."
              onPress={() => router.push("/accounts/support-stack" as never)}
            />
            <NavigationRow
              iconName="policy"
              title="Legal / Policies"
              description="Terms, privacy policy, and platform legal notices."
              onPress={() => router.push("/accounts/legal" as never)}
            />
          </StyledAccountNavigationList>
        </StyledAccountSurfaceCard>

        <StyledAccountSurfaceCard>
          <StyledAccountSectionLabel>Driver mode</StyledAccountSectionLabel>
          <StyledAccountNavigationDescription>
            {driverCta.description}
          </StyledAccountNavigationDescription>
          <Button fullWidth onPress={() => void handleDriverModeAction()} disabled={switchingMode}>
            {switchingMode ? "Switching..." : driverCta.title}
          </Button>
        </StyledAccountSurfaceCard>

        <StyledAccountSurfaceCard>
          <StyledAccountNavigationList>
            <StyledAccountNavigationRow onPress={() => void handleLogout()}>
              <StyledAccountNavigationLead>
                <StyledAccountNavigationIconWrap>
                  <MaterialIcons name="logout" size={16} color={theme.colors.destructive} />
                </StyledAccountNavigationIconWrap>
                <StyledAccountNavigationTextGroup>
                  <StyledAccountNavigationTitle style={{ color: theme.colors.destructive }}>
                    Sign out
                  </StyledAccountNavigationTitle>
                  <StyledAccountNavigationDescription>
                    Sign out of this Oyana account.
                  </StyledAccountNavigationDescription>
                </StyledAccountNavigationTextGroup>
              </StyledAccountNavigationLead>
            </StyledAccountNavigationRow>
          </StyledAccountNavigationList>
        </StyledAccountSurfaceCard>
      </StyledAccountRoot>
    </ScreenShell>
  );
}
