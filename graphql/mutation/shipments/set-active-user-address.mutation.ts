import { gql } from "@apollo/client";

export const SET_ACTIVE_USER_ADDRESS_MUTATION = gql`
  mutation SetActiveUserAddress($addressId: String!) {
    setActiveUserAddress(addressId: $addressId) {
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
      isActive
      createdAt
      updatedAt
    }
  }
`;
