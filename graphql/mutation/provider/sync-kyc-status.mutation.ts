import { gql } from "@apollo/client";

export const SYNC_KYC_STATUS_MUTATION = gql`
  mutation SyncKycStatus($input: SyncKycStatusDto!) {
    syncKycStatus(input: $input) {
      id
      checkType
      status
      vendorReference
      responseCode
      message
      maskedIdentifier
      createdAt
      verifiedAt
      failedAt
    }
  }
`;
