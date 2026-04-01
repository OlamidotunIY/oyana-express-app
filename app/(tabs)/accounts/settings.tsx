import React from "react";
import Constants from "expo-constants";
import { Linking, Platform, Switch } from "react-native";
import { useMutation, useQuery } from "@apollo/client/react";
import { useTheme } from "styled-components/native";

import { Button, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import {
  DriverOnboardingStatus,
  MeQuery,
  MeQueryVariables,
  MyDriverProfileQuery,
  MyDriverProfileQueryVariables,
  MyNotificationSettingsQuery,
  UpdateNotificationSettingsMutation,
  UpdateNotificationSettingsMutationVariables,
  UpsertPushDeviceMutation,
  UpsertPushDeviceMutationVariables,
} from "@/gql/graphql";
import {
  ME_QUERY,
  MY_DRIVER_PROFILE_QUERY,
  MY_NOTIFICATION_SETTINGS_QUERY,
  UPDATE_NOTIFICATION_SETTINGS_MUTATION,
  UPSERT_PUSH_DEVICE_MUTATION,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { useDriverPresence } from "@/hooks/use-driver-presence";
import { client } from "@/lib/apolloClient";
import { registerForPushNotificationsAsync } from "@/lib/push-notifications";
import { getProfileRoleLabel } from "@/lib/session";
import { showBackendErrorToast, showToast } from "@/lib/toast";
import {
  type ThemePreference,
  usePreferencesStore,
} from "@/store/preferencesStore";
import { useUserStore } from "@/store/userStore";
import {
  StyledSettingsPanel,
  StyledSettingsPanelDescription,
  StyledSettingsPanelHeader,
  StyledSettingsPanelMeta,
  StyledSettingsPanelTextGroup,
  StyledSettingsPanelTitle,
  StyledSettingsRoot,
  StyledSettingsSection,
  StyledSettingsSectionLabel,
  StyledSettingsStatusBadge,
  StyledSettingsSwitchRow,
  StyledSettingsThemeOptionButton,
  StyledSettingsThemeOptionText,
  StyledSettingsThemeOptionsRow,
} from "@/styles/tabs/accounts";

function formatPermissionStatus(value?: string | null): string {
  if (!value) return "Not set";
  return value.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatThemeLabel(value: ThemePreference): string {
  return value === "system" ? "System" : value.charAt(0).toUpperCase() + value.slice(1);
}

export default function SettingsScreen() {
  const theme = useTheme();
  const setUser = useUserStore((state) => state.setUser);
  const themePreference = usePreferencesStore((state) => state.themePreference);
  const setThemePreference = usePreferencesStore((state) => state.setThemePreference);
  const [notificationsBusy, setNotificationsBusy] = React.useState(false);

  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery<MeQuery, MeQueryVariables>(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const {
    data: notificationData,
    loading: notificationLoading,
    error: notificationError,
    refetch: refetchNotifications,
  } = useQuery<MyNotificationSettingsQuery>(MY_NOTIFICATION_SETTINGS_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const profile = profileData?.me ?? null;

  const {
    data: driverProfileData,
    loading: driverProfileLoading,
    error: driverProfileError,
    refetch: refetchDriverProfile,
  } = useQuery<MyDriverProfileQuery, MyDriverProfileQueryVariables>(MY_DRIVER_PROFILE_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
    skip:
      profile?.driverProfileId == null &&
      profile?.driverOnboardingStatus === DriverOnboardingStatus.NotStarted,
  });

  const [updateNotificationSettings] = useMutation<
    UpdateNotificationSettingsMutation,
    UpdateNotificationSettingsMutationVariables
  >(UPDATE_NOTIFICATION_SETTINGS_MUTATION);

  const [upsertPushDevice] = useMutation<
    UpsertPushDeviceMutation,
    UpsertPushDeviceMutationVariables
  >(UPSERT_PUSH_DEVICE_MUTATION);

  const { isUpdatingPresence, setOnlineState } = useDriverPresence({
    successTitle: "Driver presence",
    errorDedupeKey: "account-settings-driver-presence",
    onUpdated: async () => {
      await Promise.all([refetchDriverProfile(), refetchProfile(), refetchNotifications()]);
    },
  });

  useBackendErrorToast(profileError, "Unable to load settings.", {
    title: "Settings Error",
    dedupeKey: "account-settings-profile",
  });
  useBackendErrorToast(notificationError, "Unable to load notification settings.", {
    title: "Settings Error",
    dedupeKey: "account-settings-notifications",
  });
  useBackendErrorToast(driverProfileError, "Unable to load driver presence.", {
    title: "Settings Error",
    dedupeKey: "account-settings-driver-profile",
  });

  const notificationSettings = notificationData?.myNotificationSettings;
  const driverProfile = driverProfileData?.myDriverProfile ?? null;
  const driverLabel = getProfileRoleLabel(profile, "Driver");
  const showDriverPresence =
    profile?.driverOnboardingStatus === DriverOnboardingStatus.Approved ||
    profile?.driverOnboardingStatus === DriverOnboardingStatus.InReview;
  const isDriverOnline = driverProfile?.presence?.isOnline === true;
  const driverPresenceUpdatedAt = driverProfile?.presence?.lastHeartbeatAt
    ? new Date(String(driverProfile.presence.lastHeartbeatAt)).toLocaleString()
    : "Not updated";
  const notificationsEnabled =
    notificationSettings?.notificationsEnabled ??
    profile?.notificationsEnabled ??
    false;
  const pushPermissionGranted =
    notificationSettings?.pushPermissionGranted ??
    profile?.pushPermissionGranted ??
    false;
  const pushPermissionStatus =
    notificationSettings?.pushPermissionStatus ??
    profile?.pushPermissionStatus ??
    null;
  const hasActivePushDevice = notificationSettings?.hasActivePushDevice ?? false;

  const syncProfile = React.useCallback(async () => {
    const { data } = await client.query<MeQuery>({
      query: ME_QUERY,
      fetchPolicy: "no-cache",
    });

    if (data?.me) {
      setUser(data.me);
    }

    await Promise.all([refetchProfile(), refetchNotifications()]);
  }, [refetchNotifications, refetchProfile, setUser]);

  const toggleNotifications = async (nextValue: boolean) => {
    setNotificationsBusy(true);

    try {
      if (!nextValue) {
        await updateNotificationSettings({
          variables: {
            input: {
              notificationsEnabled: false,
              markPrompted: true,
            },
          },
        });

        await syncProfile();
        showToast({
          title: "Notifications",
          message: "Push alerts have been turned off for this account.",
          tone: "success",
          dedupeKey: "settings-notifications-disabled",
        });
        return;
      }

      const { status, token } = await registerForPushNotificationsAsync();

      if (status !== "granted" || !token) {
        await updateNotificationSettings({
          variables: {
            input: {
              notificationsEnabled: false,
              pushPermissionGranted: false,
              pushPermissionStatus: status,
              markPrompted: true,
            },
          },
        });

        await syncProfile();
        showToast({
          title: "Notifications",
          message:
            status === "granted"
              ? "Push token could not be created on this device."
              : "Notification permission was not granted.",
          tone: "info",
          dedupeKey: `settings-notifications-${status ?? "unknown"}`,
        });
        return;
      }

      await updateNotificationSettings({
        variables: {
          input: {
            notificationsEnabled: true,
            pushPermissionGranted: true,
            pushPermissionStatus: status,
            markPrompted: true,
          },
        },
      });

      await upsertPushDevice({
        variables: {
          input: {
            expoPushToken: token,
            platform: Platform.OS,
            appVersion: Constants.expoConfig?.version ?? "1.0.0",
            pushPermissionStatus: status,
            isActive: true,
          },
        },
      });

      await syncProfile();
      showToast({
        title: "Notifications",
        message: "Push alerts are now enabled.",
        tone: "success",
        dedupeKey: "settings-notifications-enabled",
      });
    } catch (error) {
      showBackendErrorToast(error, "Unable to update notification settings.", {
        title: "Settings Error",
        dedupeKey: "account-settings-notifications-update",
      });
    } finally {
      setNotificationsBusy(false);
    }
  };

  return (
    <ScreenShell contentJustify="flex-start">
      <StyledSettingsRoot>
        {showDriverPresence ? (
          <StyledSettingsSection>
            <StyledSettingsSectionLabel>Driver Presence</StyledSettingsSectionLabel>
            <StyledSettingsPanel>
              <StyledSettingsPanelHeader>
                <StyledSettingsPanelTextGroup>
                  <StyledSettingsPanelTitle>{driverLabel} availability</StyledSettingsPanelTitle>
                  <StyledSettingsPanelDescription>
                    Turn this on when you want nearby dispatch requests to use your live location.
                  </StyledSettingsPanelDescription>
                </StyledSettingsPanelTextGroup>
                {profileLoading || driverProfileLoading ? (
                  <Spinner size="small" />
                ) : (
                  <StyledSettingsStatusBadge $tone={isDriverOnline ? "success" : "warning"}>
                    {isDriverOnline ? "Online" : "Offline"}
                  </StyledSettingsStatusBadge>
                )}
              </StyledSettingsPanelHeader>

              <StyledSettingsPanelMeta>
                Last heartbeat: {driverPresenceUpdatedAt}
              </StyledSettingsPanelMeta>

              <StyledSettingsSwitchRow>
                <StyledSettingsPanelTextGroup>
                  <StyledSettingsPanelTitle>Receive dispatch requests</StyledSettingsPanelTitle>
                  <StyledSettingsPanelDescription>
                    Oyana will request your location each time you go online.
                  </StyledSettingsPanelDescription>
                </StyledSettingsPanelTextGroup>
                <Switch
                  disabled={isUpdatingPresence}
                  onValueChange={() => void setOnlineState(!isDriverOnline)}
                  value={isDriverOnline}
                  trackColor={{
                    false: theme.colors.border,
                    true: "rgba(255, 106, 0, 0.38)",
                  }}
                  thumbColor={
                    isDriverOnline ? theme.colors.primary : theme.colors.mutedForeground
                  }
                />
              </StyledSettingsSwitchRow>
            </StyledSettingsPanel>
          </StyledSettingsSection>
        ) : null}

        <StyledSettingsSection>
          <StyledSettingsSectionLabel>Notifications</StyledSettingsSectionLabel>
          <StyledSettingsPanel>
            <StyledSettingsPanelHeader>
              <StyledSettingsPanelTextGroup>
                <StyledSettingsPanelTitle>Push notifications</StyledSettingsPanelTitle>
                <StyledSettingsPanelDescription>
                  Manage shipment alerts, dispatch activity, and account updates.
                </StyledSettingsPanelDescription>
              </StyledSettingsPanelTextGroup>
              {notificationLoading || notificationsBusy ? (
                <Spinner size="small" />
              ) : (
                <StyledSettingsStatusBadge $tone={notificationsEnabled ? "success" : "muted"}>
                  {notificationsEnabled ? "Enabled" : "Muted"}
                </StyledSettingsStatusBadge>
              )}
            </StyledSettingsPanelHeader>

            <StyledSettingsSwitchRow>
              <StyledSettingsPanelTextGroup>
                <StyledSettingsPanelTitle>Shipment and account alerts</StyledSettingsPanelTitle>
                <StyledSettingsPanelDescription>
                  {pushPermissionGranted
                    ? "Permission granted on this device."
                    : "Permission has not been granted on this device yet."}
                </StyledSettingsPanelDescription>
              </StyledSettingsPanelTextGroup>
              <Switch
                disabled={notificationLoading || notificationsBusy}
                onValueChange={(value) => void toggleNotifications(value)}
                value={notificationsEnabled}
                trackColor={{
                  false: theme.colors.border,
                  true: "rgba(255, 106, 0, 0.38)",
                }}
                thumbColor={
                  notificationsEnabled ? theme.colors.primary : theme.colors.mutedForeground
                }
              />
            </StyledSettingsSwitchRow>

            <StyledSettingsPanelMeta>
              Permission status: {formatPermissionStatus(pushPermissionStatus)}
            </StyledSettingsPanelMeta>
            <StyledSettingsPanelMeta>
              Active device linked: {hasActivePushDevice ? "Yes" : "No"}
            </StyledSettingsPanelMeta>

            {!pushPermissionGranted ? (
              <Button fullWidth variant="outline" onPress={() => void Linking.openSettings()}>
                Open device settings
              </Button>
            ) : null}
          </StyledSettingsPanel>
        </StyledSettingsSection>

        <StyledSettingsSection>
          <StyledSettingsSectionLabel>Appearance</StyledSettingsSectionLabel>
          <StyledSettingsPanel>
            <StyledSettingsPanelTextGroup>
              <StyledSettingsPanelTitle>Theme</StyledSettingsPanelTitle>
              <StyledSettingsPanelDescription>
                Choose how the app should look on this device.
              </StyledSettingsPanelDescription>
            </StyledSettingsPanelTextGroup>

            <StyledSettingsThemeOptionsRow>
              {(["system", "light", "dark"] as ThemePreference[]).map((option) => (
                <StyledSettingsThemeOptionButton
                  key={option}
                  $selected={themePreference === option}
                  onPress={() => setThemePreference(option)}
                >
                  <StyledSettingsThemeOptionText $selected={themePreference === option}>
                    {formatThemeLabel(option)}
                  </StyledSettingsThemeOptionText>
                </StyledSettingsThemeOptionButton>
              ))}
            </StyledSettingsThemeOptionsRow>

            <StyledSettingsPanelMeta>
              Current preference: {formatThemeLabel(themePreference)}
            </StyledSettingsPanelMeta>
          </StyledSettingsPanel>
        </StyledSettingsSection>
      </StyledSettingsRoot>
    </ScreenShell>
  );
}
