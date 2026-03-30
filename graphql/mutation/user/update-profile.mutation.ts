import { gql } from "@apollo/client";

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      email
      emailVerified
      emailVerifiedAt
      role
      firstName
      lastName
      phoneE164
      profileImageUrl
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
