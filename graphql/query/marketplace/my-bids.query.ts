import { gql } from "@apollo/client";

export const MY_BIDS_QUERY = gql`
  query MyBids {
    myBids {
      id
      shipmentId
      providerId
      amountMinor
      currency
      message
      status
      createdAt
      updatedAt
    }
  }
`;
