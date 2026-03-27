import { gql } from "@apollo/client";

export const SEARCH_ADDRESSES_QUERY = gql`
  query SearchAddresses($input: SearchAddressInput!) {
    searchAddresses(input: $input) {
      placeId
      description
      mainText
      secondaryText
    }
  }
`;
