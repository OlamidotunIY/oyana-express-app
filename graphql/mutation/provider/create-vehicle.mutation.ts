import { gql } from "@apollo/client";

export const CREATE_VEHICLE_MUTATION = gql`
  mutation CreateVehicle($input: CreateVehicleDto!) {
    createVehicle(input: $input) {
      id
      providerId
      category
      plateNumber
      vin
      make
      model
      color
      capacityKg
      capacityVolumeCm3
      plateVerificationStatus
      vinVerificationStatus
      lastVerificationAt
      verificationFailureReason
      status
      createdAt
      updatedAt
    }
  }
`;
