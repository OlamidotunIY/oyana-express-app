import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import Constants from "expo-constants";
import { Linking, Platform, Switch } from "react-native";
import { useTheme } from "styled-components/native";

import { Button, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import
    {
        MeQuery,
        MeQueryVariables,
        MyNotificationSettingsQuery,
        SetProviderAvailabilityMutation,
        SetProviderAvailabilityMutationVariables,
        UpdateNotificationSettingsMutation,
        UpdateNotificationSettingsMutationVariables,
        UpsertPushDeviceMutation,
        UpsertPushDeviceMutationVariables,
    } from "@/gql/graphql";
import
    {
        ME_QUERY,
        MY_NOTIFICATION_SETTINGS_QUERY,
        SET_PROVIDER_AVAILABILITY_MUTATION,
        UPDATE_NOTIFICATION_SETTINGS_MUTATION,
        UPSERT_PUSH_DEVICE_MUTATION,
    } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { client } from "@/lib/apolloClient";
import { registerForPushNotificationsAsync } from "@/lib/push-notifications";
import { getProfileRoleLabel, isDriverRole } from "@/lib/session";
import { showBackendErrorToast, showToast } from "@/lib/toast";
import
    {
        type ThemePreference,
        usePreferencesStore,
    } from "@/store/preferencesStore";
import { useUserStore } from "@/store/userStore";
import
    {
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

function formatPermissionStatus(value?: string | null): string
{
    if (!value)
    {
        return "Not set";
    }

    return value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatThemeLabel(value: ThemePreference): string
{
    if (value === "system")
    {
        return "System";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function SettingsScreen()
{
    const theme = useTheme();
    const setUser = useUserStore((state) => state.setUser);
    const themePreference = usePreferencesStore((state) => state.themePreference);
    const setThemePreference = usePreferencesStore(
        (state) => state.setThemePreference,
    );
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

    const [setProviderAvailability, { loading: updatingProviderAvailability }] =
        useMutation<
            SetProviderAvailabilityMutation,
            SetProviderAvailabilityMutationVariables
        >(SET_PROVIDER_AVAILABILITY_MUTATION);

    const [updateNotificationSettings] = useMutation<
        UpdateNotificationSettingsMutation,
        UpdateNotificationSettingsMutationVariables
    >(UPDATE_NOTIFICATION_SETTINGS_MUTATION);

    const [upsertPushDevice] = useMutation<
        UpsertPushDeviceMutation,
        UpsertPushDeviceMutationVariables
    >(UPSERT_PUSH_DEVICE_MUTATION);

    useBackendErrorToast(profileError, "Unable to load settings.", {
        title: "Settings Error",
        dedupeKey: "account-settings-profile",
    });

    useBackendErrorToast(
        notificationError,
        "Unable to load notification settings.",
        {
            title: "Settings Error",
            dedupeKey: "account-settings-notifications",
        },
    );

    const profile = profileData?.me ?? null;
    const notificationSettings = notificationData?.myNotificationSettings;
    const hasBusinessRole = isDriverRole(profile?.role);
    const driverLabel = getProfileRoleLabel(profile, "Driver");
    const isProviderAvailable = profile?.providerIsAvailable === true;
    const providerAvailabilityUpdatedAt = profile?.providerAvailabilityUpdatedAt
        ? new Date(String(profile.providerAvailabilityUpdatedAt)).toLocaleString()
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

    const syncProfile = React.useCallback(async () =>
    {
        const { data } = await client.query<MeQuery>({
            query: ME_QUERY,
            fetchPolicy: "no-cache",
        });

        if (data?.me)
        {
            setUser(data.me);
        }

        await Promise.all([refetchProfile(), refetchNotifications()]);
    }, [refetchNotifications, refetchProfile, setUser]);

    const toggleProviderAvailability = async () =>
    {
        if (!profile?.providerId)
        {
            return;
        }

        const nextAvailability = !isProviderAvailable;

        try
        {
            const { data } = await setProviderAvailability({
                variables: {
                    input: {
                        isAvailable: nextAvailability,
                    },
                },
            });

            const updatedProfile = data?.setProviderAvailability ?? null;
            if (updatedProfile)
            {
                setUser(updatedProfile);
            }

            await refetchProfile();

            showToast({
                title: `${driverLabel} Availability`,
                message: `${driverLabel} is now ${nextAvailability ? "available" : "unavailable"}.`,
                tone: "success",
                dedupeKey: `provider-availability-${nextAvailability ? "available" : "unavailable"}`,
            });
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to update driver availability.", {
                title: "Settings Error",
                dedupeKey: "account-settings-provider-availability",
            });
        }
    };

    const toggleNotifications = async (nextValue: boolean) =>
    {
        setNotificationsBusy(true);

        try
        {
            if (!nextValue)
            {
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

            if (status !== "granted" || !token)
            {
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
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to update notification settings.", {
                title: "Settings Error",
                dedupeKey: "account-settings-notifications-update",
            });
        } finally
        {
            setNotificationsBusy(false);
        }
    };

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledSettingsRoot>
                {hasBusinessRole ? (
                    <StyledSettingsSection>
                        <StyledSettingsSectionLabel>Operations</StyledSettingsSectionLabel>
                        <StyledSettingsPanel>
                            <StyledSettingsPanelHeader>
                                <StyledSettingsPanelTextGroup>
                                    <StyledSettingsPanelTitle>
                                        {driverLabel} availability
                                    </StyledSettingsPanelTitle>
                                    <StyledSettingsPanelDescription>
                                        Control whether new dispatch work can reach your driver
                                        account.
                                    </StyledSettingsPanelDescription>
                                </StyledSettingsPanelTextGroup>
                                {profileLoading ? (
                                    <Spinner size="small" />
                                ) : (
                                    <StyledSettingsStatusBadge
                                        $tone={isProviderAvailable ? "success" : "warning"}
                                    >
                                        {isProviderAvailable ? "Available" : "Unavailable"}
                                    </StyledSettingsStatusBadge>
                                )}
                            </StyledSettingsPanelHeader>

                            <StyledSettingsPanelMeta>
                                Last updated: {providerAvailabilityUpdatedAt}
                            </StyledSettingsPanelMeta>

                            <StyledSettingsSwitchRow>
                                <StyledSettingsPanelTextGroup>
                                    <StyledSettingsPanelTitle>
                                        Receive new assignments
                                    </StyledSettingsPanelTitle>
                                    <StyledSettingsPanelDescription>
                                        Turn this off to pause driver dispatch requests.
                                    </StyledSettingsPanelDescription>
                                </StyledSettingsPanelTextGroup>
                                <Switch
                                    disabled={
                                        updatingProviderAvailability || !profile?.providerId
                                    }
                                    onValueChange={() => void toggleProviderAvailability()}
                                    value={isProviderAvailable}
                                    trackColor={{
                                        false: theme.colors.border,
                                        true: "rgba(255, 106, 0, 0.38)",
                                    }}
                                    thumbColor={
                                        isProviderAvailable
                                            ? theme.colors.primary
                                            : theme.colors.mutedForeground
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
                                <StyledSettingsPanelTitle>
                                    Push notifications
                                </StyledSettingsPanelTitle>
                                <StyledSettingsPanelDescription>
                                    Manage shipment alerts, dispatch activity, and account
                                    updates.
                                </StyledSettingsPanelDescription>
                            </StyledSettingsPanelTextGroup>
                            {notificationLoading || notificationsBusy ? (
                                <Spinner size="small" />
                            ) : (
                                <StyledSettingsStatusBadge
                                    $tone={notificationsEnabled ? "success" : "muted"}
                                >
                                    {notificationsEnabled ? "Enabled" : "Muted"}
                                </StyledSettingsStatusBadge>
                            )}
                        </StyledSettingsPanelHeader>

                        <StyledSettingsSwitchRow>
                            <StyledSettingsPanelTextGroup>
                                <StyledSettingsPanelTitle>
                                    Shipment and account alerts
                                </StyledSettingsPanelTitle>
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
                                    notificationsEnabled
                                        ? theme.colors.primary
                                        : theme.colors.mutedForeground
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
                            <Button
                                fullWidth
                                variant="outline"
                                onPress={() => void Linking.openSettings()}
                            >
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
                            {(["system", "light", "dark"] as ThemePreference[]).map(
                                (option) => (
                                    <StyledSettingsThemeOptionButton
                                        key={option}
                                        $selected={themePreference === option}
                                        onPress={() => setThemePreference(option)}
                                    >
                                        <StyledSettingsThemeOptionText
                                            $selected={themePreference === option}
                                        >
                                            {formatThemeLabel(option)}
                                        </StyledSettingsThemeOptionText>
                                    </StyledSettingsThemeOptionButton>
                                ),
                            )}
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
