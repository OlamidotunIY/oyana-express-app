import { gql } from "@apollo/client";

export const UPSERT_PUSH_DEVICE_MUTATION = gql`
  mutation UpsertPushDevice($input: UpsertPushDeviceInput!) {
    upsertPushDevice(input: $input) {
      id
      expoPushToken
      platform
      appVersion
      pushPermissionStatus
      isActive
      lastSeenAt
    }
  }
`;
