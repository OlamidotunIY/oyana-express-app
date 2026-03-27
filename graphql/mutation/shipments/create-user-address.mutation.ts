import { gql } from "@apollo/client";

export const CREATE_USER_ADDRESS_MUTATION = gql`
  mutation CreateUserAddress($input: CreateUserAddressDto!) {
    createUserAddress(input: $input) {
      id
      profileId
      address
      city
      state
      postalCode
      label
      countryCode
      lat
      lng
      createdAt
      updatedAt
    }
  }
`;
