import { gql } from "@apollo/client";

export const MARK_MARKETPLACE_EN_ROUTE_PICKUP = gql`
  mutation MarkMarketplaceEnRoutePickup($shipmentId: String!) {
    markMarketplaceEnRoutePickup(shipmentId: $shipmentId) {
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
