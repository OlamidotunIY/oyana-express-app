import { gql } from "@apollo/client";

export const CONFIRM_PICKUP = gql`
  mutation ConfirmPickup($shipmentId: String!) {
    confirmPickup(shipmentId: $shipmentId) {
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
