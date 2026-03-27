import { gql } from "@apollo/client";

export const UPDATE_NOTIFICATION_SETTINGS_MUTATION = gql`
  mutation UpdateNotificationSettings(
    $input: UpdateNotificationSettingsInput!
  ) {
    updateNotificationSettings(input: $input) {
      notificationsEnabled
      notificationPromptedAt
      pushPermissionGranted
      pushPermissionStatus
      hasActivePushDevice
      lastPushDeviceSeenAt
    }
  }
`;
