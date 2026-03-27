import { gql } from "@apollo/client";

export const MY_USER_ADDRESSES_QUERY = gql`
  query MyUserAddresses {
    myUserAddresses {
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
