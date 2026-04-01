import { gql } from "@apollo/client";

export const MY_DRIVER_PROFILE_QUERY = gql`
  query MyDriverProfile {
    myDriverProfile {
      id
      providerId
      onboardingStatus
      driverType
      legalFirstName
      legalLastName
      dateOfBirth
      selfieStorageBucket
      selfieStoragePath
      licenseNumber
      licenseExpiryAt
      identityType
      identityNumber
      insurancePolicyNumber
      rejectionReason
      capabilities
      canDispatch
      canFreight
      submittedAt
      reviewedAt
      approvedAt
      vehicle {
        id
        category
        plateNumber
        vin
        make
        model
        color
        capacityKg
        capacityVolumeCm3
        createdAt
        updatedAt
      }
      complianceDocuments {
        id
        type
        status
        storageBucket
        storagePath
        mimeType
        notes
        uploadedAt
        reviewedAt
      }
      submissions {
        id
        status
        rejectionReason
        reviewerId
        snapshot
        submittedAt
        reviewedAt
      }
      presence {
        id
        isOnline
        lat
        lng
        accuracyMeters
        heading
        speedKph
        recordedAt
        lastHeartbeatAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
