import { gql } from "@apollo/client";

export const CONFIRM_DROPOFF = gql`
  mutation ConfirmDropoff($shipmentId: String!) {
    confirmDropoff(shipmentId: $shipmentId) {
      id
      trackingCode
      status
      pickupAddressId
      dropoffAddressId
      packageDescription
      pricingCurrency
      quotedPriceMinor
      finalPriceMinor
      createdAt
      updatedAt
    }
  }
`;
