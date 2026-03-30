import { gql } from "@apollo/client";

export const COMPLETE_DRIVER_REGISTRATION_MUTATION = gql`
  mutation CompleteDriverRegistration($input: CompleteDriverRegistrationInput!) {
    completeDriverRegistration(input: $input) {
      id
      email
      emailVerified
      emailVerifiedAt
      roles
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
