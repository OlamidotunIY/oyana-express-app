import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
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
