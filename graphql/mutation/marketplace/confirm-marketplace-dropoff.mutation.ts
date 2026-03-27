import { gql } from "@apollo/client";

export const CONFIRM_MARKETPLACE_DROPOFF = gql`
  mutation ConfirmMarketplaceDropoff($shipmentId: String!) {
    confirmMarketplaceDropoff(shipmentId: $shipmentId) {
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
