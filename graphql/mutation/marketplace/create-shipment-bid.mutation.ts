import { gql } from "@apollo/client";

export const CREATE_SHIPMENT_BID = gql`
  mutation CreateShipmentBid($input: CreateShipmentBidDto!) {
    createShipmentBid(input: $input) {
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
