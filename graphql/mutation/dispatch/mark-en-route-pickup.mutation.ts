import { gql } from "@apollo/client";

export const MARK_EN_ROUTE_PICKUP = gql`
  mutation MarkEnRoutePickup($shipmentId: String!) {
    markEnRoutePickup(shipmentId: $shipmentId) {
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
