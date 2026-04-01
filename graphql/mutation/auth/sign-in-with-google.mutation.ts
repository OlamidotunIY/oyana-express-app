import { gql } from "@apollo/client";

export const SIGN_IN_WITH_GOOGLE_MUTATION = gql`
  mutation SignInWithGoogle($input: SignInWithGoogleInput!) {
    signInWithGoogle(input: $input) {
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
        profileImageUrl
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
