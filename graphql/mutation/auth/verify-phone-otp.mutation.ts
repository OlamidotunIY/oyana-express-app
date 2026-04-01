import { gql } from "@apollo/client";

export const VERIFY_PHONE_OTP_MUTATION = gql`
  mutation VerifyPhoneOtpAndAuthenticate(
    $input: VerifyPhoneOtpAndAuthenticateInput!
  ) {
    verifyPhoneOtpAndAuthenticate(input: $input) {
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
