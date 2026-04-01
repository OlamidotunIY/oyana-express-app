import { gql } from "@apollo/client";

export const SET_PROFILE_IMAGE_MUTATION = gql`
  mutation SetProfileImage($input: SetProfileImageInput!) {
    setProfileImage(input: $input) {
      id
      email
      emailVerified
      emailVerifiedAt
      role
      accountRole
      availableModes
      currentMode
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
      driverProfileId
      driverOnboardingStatus
      driverCapabilities
      walletBalanceMinor
      walletEscrowMinor
      walletCurrency
      unreadNotificationCount
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
