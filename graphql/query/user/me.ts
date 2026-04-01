import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      emailVerified
      emailVerifiedAt
      role
      accountRole
      availableModes
      currentMode
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
