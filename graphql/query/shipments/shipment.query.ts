import { gql } from "@apollo/client";

export const SHIPMENT_QUERY = gql`
  query Shipment($shipmentId: String!) {
    shipment(id: $shipmentId) {
      id
      trackingCode
      customerProfileId
      mode
      vehicleCategory
      scheduleType
      status
      pickupAddressId
      pickupAddressSummary
      dropoffAddressId
      dropoffAddressSummary
      scheduledAt
      packageDescription
      packageValueMinor
      specialInstructions
      requiresEscrow
      pricingCurrency
      quotedPriceMinor
      finalPriceMinor
      commissionRateBps
      commissionAmountMinor
      createdAt
      updatedAt
      cancelledAt
      cancelledByProfileId
      cancellationReason
      items {
        id
        shipmentId
        name
        quantity
        weightKg
        createdAt
      }
      pickupAddress {
        address
        city
        countryCode
        createdAt
        id
        label
        lat
        lng
        postalCode
        profileId
        state
        updatedAt
      }
      dropoffAddress {
        address
        city
        countryCode
        createdAt
        id
        label
        lat
        lng
        postalCode
        profileId
        state
        updatedAt
      }
    }
  }
`;
