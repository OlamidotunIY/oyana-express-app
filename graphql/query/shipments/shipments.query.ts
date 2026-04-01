import { gql } from "@apollo/client";

export const SHIPMENTS_QUERY = gql`
  query Shipments($filter: ShipmentQueryFilter) {
    shipments(filter: $filter) {
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
    }
  }
`;
