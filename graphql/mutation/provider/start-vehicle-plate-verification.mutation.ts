import { gql } from "@apollo/client";

export const START_VEHICLE_PLATE_VERIFICATION_MUTATION = gql`
  mutation StartVehiclePlateVerification($input: StartVehiclePlateVerificationDto!) {
    startVehiclePlateVerification(input: $input) {
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
