import { gql } from "@apollo/client";

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      accessToken
      refreshToken
      user {
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
        walletBalanceMinor
        walletEscrowMinor
        walletCurrency
        unreadNotificationCount
        preferredLanguage
        status
        lastLoginAt
        createdAt
        updatedAt
      }
    }
  }
`;
