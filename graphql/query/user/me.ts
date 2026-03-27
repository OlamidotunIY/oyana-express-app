import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
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
