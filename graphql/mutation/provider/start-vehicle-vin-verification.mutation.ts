import { gql } from "@apollo/client";

export const START_VEHICLE_VIN_VERIFICATION_MUTATION = gql`
  mutation StartVehicleVinVerification($input: StartVehicleVinVerificationDto!) {
    startVehicleVinVerification(input: $input) {
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
