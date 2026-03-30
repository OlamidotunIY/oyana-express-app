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
        preferredLanguage
        status
        lastLoginAt
        createdAt
        updatedAt
      }
    }
  }
`;
