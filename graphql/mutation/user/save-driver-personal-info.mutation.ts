import { gql } from "@apollo/client";

export const SAVE_DRIVER_PERSONAL_INFO_MUTATION = gql`
  mutation SaveDriverPersonalInfo($input: SaveDriverPersonalInfoInput!) {
    saveDriverPersonalInfo(input: $input) {
      id
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
