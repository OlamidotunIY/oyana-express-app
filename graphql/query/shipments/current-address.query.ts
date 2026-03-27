import { gql } from "@apollo/client";

export const CURRENT_ADDRESS_QUERY = gql`
  query CurrentAddress($lat: Float!, $lng: Float!) {
    currentAddress(lat: $lat, lng: $lng) {
      placeId
      formattedAddress
      addressLine
      city
      stateOrProvince
      postalCode
      countryCode
      latitude
      longitude
    }
  }
`;
