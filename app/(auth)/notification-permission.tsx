import React, { useState } from "react";
import { Platform, View } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";

import { Button } from "@/components/ui/Button";
import
  {
    MeQuery,
    UpdateNotificationSettingsMutation,
    UpdateNotificationSettingsMutationVariables,
    UpsertPushDeviceMutation,
    UpsertPushDeviceMutationVariables,
  } from "@/gql/graphql";
import
  {
    ME_QUERY,
    UPDATE_NOTIFICATION_SETTINGS_MUTATION,
    UPSERT_PUSH_DEVICE_MUTATION,
  } from "@/graphql";
import { client } from "@/lib/apolloClient";
import { registerForPushNotificationsAsync } from "@/lib/push-notifications";
import { parseAuthError } from "@/lib/session";
import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/userStore";
import
  {
    AuthContent,
    AuthHeader,
    AuthKeyboardAvoiding,
    AuthScrollView,
    AuthSubtitle,
    AuthTitle,
  } from "@/styles";

export default function NotificationPermissionScreen()
{
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const showToast = useToastStore((state) => state.showToast);
  const setUser = useUserStore((state) => state.setUser);
  const [busy, setBusy] = useState(false);

  const [updateNotificationSettings] = useMutation<
    UpdateNotificationSettingsMutation,
    UpdateNotificationSettingsMutationVariables
  >(UPDATE_NOTIFICATION_SETTINGS_MUTATION);

  const [upsertPushDevice] = useMutation<
    UpsertPushDeviceMutation,
    UpsertPushDeviceMutationVariables
  >(UPSERT_PUSH_DEVICE_MUTATION);

  async function syncUserAndContinue()
  {
    const { data } = await client.query<MeQuery>({
      query: ME_QUERY,
      fetchPolicy: "no-cache",
    });

    if (data?.me)
    {
      setUser(data.me);
    }

    router.replace("/(tabs)");
  }

  async function handleSkip()
  {
    setBusy(true);

    try
    {
      await updateNotificationSettings({
        variables: {
          input: {
            notificationsEnabled: false,
            pushPermissionGranted: false,
            pushPermissionStatus: "deferred",
            markPrompted: true,
          },
        },
      });

      showToast({ message: "Notifications left off for now.", tone: "success" });
      await syncUserAndContinue();
    } catch (error)
    {
      showToast({
        message: parseAuthError(error, "Unable to save your notification preference."),
        tone: "error",
      });
    } finally
    {
      setBusy(false);
    }
  }

  async function handleEnable()
  {
    setBusy(true);

    try
    {
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

        showToast({
          message: status === "granted" ? "Push token could not be created on this device." : "Notification permission was not granted.",
          tone: "error",
        });
        await syncUserAndContinue();
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

      showToast({ message: "Notifications enabled.", tone: "success" });
      await syncUserAndContinue();
    } catch (error)
    {
      showToast({
        message: parseAuthError(error, "Unable to enable notifications."),
        tone: "error",
      });
    } finally
    {
      setBusy(false);
    }
  }

  return (
    <AuthKeyboardAvoiding behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <AuthScrollView contentContainerStyle={{ paddingTop: insets.top + 40 }} keyboardShouldPersistTaps="handled">
        <AuthContent>
          <AuthHeader>
            <AuthTitle>Stay in the loop</AuthTitle>
            <AuthSubtitle>
              Enable push notifications to get shipment updates, dispatch activity, and important account alerts.
            </AuthSubtitle>
          </AuthHeader>

          <View style={{ gap: 16 }}>
            <Button fullWidth onPress={() => void handleEnable()} disabled={busy}>
              {busy ? "Saving…" : "Enable notifications"}
            </Button>

            <Button fullWidth variant="outline" onPress={() => void handleSkip()} disabled={busy}>
              Not now
            </Button>
          </View>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}