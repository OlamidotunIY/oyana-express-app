import { gql } from "@apollo/client";

export const START_NIN_FACE_VERIFICATION_MUTATION = gql`
  mutation StartNinFaceVerification($input: StartNinFaceVerificationDto!) {
    startNinFaceVerification(input: $input) {
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
