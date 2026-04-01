import { gql } from "@apollo/client";

export const UPDATE_DRIVER_PRESENCE_MUTATION = gql`
  mutation UpdateDriverPresence($input: UpdateDriverPresenceInput!) {
    updateDriverPresence(input: $input) {
      id
      isOnline
      lat
      lng
      accuracyMeters
      heading
      speedKph
      recordedAt
      lastHeartbeatAt
      updatedAt
    }
  }
`;
