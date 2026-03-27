import { gql } from "@apollo/client";

export const START_PHONE_VERIFICATION_MUTATION = gql`
  mutation StartPhoneVerification($input: StartPhoneVerificationDto!) {
    startPhoneVerification(input: $input) {
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
