import { gql } from "@apollo/client";

export const SET_PROVIDER_AVAILABILITY_MUTATION = gql`
  mutation SetProviderAvailability($input: SetProviderAvailabilityInput!) {
    setProviderAvailability(input: $input) {
      id
      email
      emailVerified
      emailVerifiedAt
      roles
      firstName
      lastName
      phoneE164
      phoneVerified
      phoneVerifiedAt
      notificationsEnabled
      notificationPromptedAt
      pushPermissionGranted
      pushPermissionStatus
      state
      referralCode
      businessName
      providerId
      providerIsAvailable
      providerAvailabilityUpdatedAt
      primaryAddress
      city
      preferredLanguage
      status
      lastLoginAt
      createdAt
      updatedAt
    }
  }
`;
