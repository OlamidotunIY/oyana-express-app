import { gql } from "@apollo/client";

export const MY_KYC_STATUS_QUERY = gql`
  query MyKycStatus {
    myKycStatus {
      id
      providerId
      overallStatus
      kycLevel
      ninStatus
      phoneStatus
      faceStatus
      vehiclePlateStatus
      vehicleVinStatus
      maskedNin
      maskedPhone
      failureSummary
      lastVendorSyncAt
      lastCheckAt
      createdAt
      updatedAt
    }
  }
`;

export const MY_KYC_CHECKS_QUERY = gql`
  query MyKycChecks($filter: MyKycChecksFilterDto) {
    myKycChecks(filter: $filter) {
      id
      checkType
      status
      vendor
      vendorReference
      responseCode
      confidence
      message
      maskedIdentifier
      createdAt
      verifiedAt
      failedAt
    }
  }
`;
