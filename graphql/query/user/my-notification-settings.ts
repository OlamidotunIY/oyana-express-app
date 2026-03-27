import { gql } from "@apollo/client";

export const MY_NOTIFICATION_SETTINGS_QUERY = gql`
  query MyNotificationSettings {
    myNotificationSettings {
      notificationsEnabled
      notificationPromptedAt
      pushPermissionGranted
      pushPermissionStatus
      hasActivePushDevice
      lastPushDeviceSeenAt
    }
  }
`;
