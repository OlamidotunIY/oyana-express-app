import { gql } from "@apollo/client";

export const CONFIRM_MARKETPLACE_PICKUP = gql`
  mutation ConfirmMarketplacePickup($shipmentId: String!) {
    confirmMarketplacePickup(shipmentId: $shipmentId) {
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
