import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const CHANNELS = [
  "general-updates",
  "shipment-updates",
  "dispatch-updates",
  "support-updates",
  "dispute-updates",
] as const;

export async function initializeNotificationChannels() {
  if (Platform.OS !== "android") {
    return;
  }

  await Promise.all(
    CHANNELS.map((channelId) =>
      Notifications.setNotificationChannelAsync(channelId, {
        name: channelId,
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF6A00",
      }),
    ),
  );
}

export async function registerForPushNotificationsAsync() {
  const currentPermissions = await Notifications.getPermissionsAsync();
  let finalStatus = currentPermissions.status;

  if (finalStatus !== "granted") {
    const requestedPermissions = await Notifications.requestPermissionsAsync();
    finalStatus = requestedPermissions.status;
  }

  if (finalStatus !== "granted") {
    return {
      status: finalStatus,
      token: null,
    };
  }

  const projectId =
    Constants.easConfig?.projectId ??
    Constants.expoConfig?.extra?.eas?.projectId ??
    process.env.EXPO_PUBLIC_EXPO_PROJECT_ID;

  const tokenResponse = projectId
    ? await Notifications.getExpoPushTokenAsync({ projectId })
    : await Notifications.getExpoPushTokenAsync();

  return {
    status: finalStatus,
    token: tokenResponse.data,
  };
}
