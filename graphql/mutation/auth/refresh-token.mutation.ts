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
  }
`;
