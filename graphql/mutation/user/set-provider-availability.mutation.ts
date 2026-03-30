import { gql } from "@apollo/client";

export const SET_PROVIDER_AVAILABILITY_MUTATION = gql`
  mutation SetProviderAvailability($input: SetProviderAvailabilityInput!) {
    setProviderAvailability(input: $input) {
      id
      email
      emailVerified
      emailVerifiedAt
      role
      profileImageUrl
      firstName
      lastName
      phoneE164
      phoneVerified
      phoneVerifiedAt
      notificationsEnabled
      notificationPromptedAt
      pushPermissionGranted
      pushPermissionStatus
      publicRole
      driverType
      onboardingStep
      onboardingCompleted
      state
      referralCode
      businessName
      providerId
      providerIsAvailable
      providerAvailabilityUpdatedAt
      primaryAddress
      city
      activeAddressId
      preferredLanguage
      status
      lastLoginAt
      createdAt
      updatedAt
    }
  }
`;
