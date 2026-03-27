import { gql } from "@apollo/client";

export const SHIPMENT_TRACKING_QUERY = gql`
  query ShipmentTracking($shipmentId: String!) {
    shipmentTracking(id: $shipmentId) {
      shipment {
        id
        trackingCode
        status
        packageDescription
        pickupAddressSummary
        dropoffAddressSummary
        pricingCurrency
        quotedPriceMinor
        finalPriceMinor
        createdAt
        updatedAt
      }
      events {
        id
        shipmentId
        eventType
        actorRole
        actorProfileId
        createdAt
      }
      milestones {
        id
        shipmentId
        milestoneType
        status
        occurredAt
        createdAt
        lat
        lng
      }
    }
  }
`;
