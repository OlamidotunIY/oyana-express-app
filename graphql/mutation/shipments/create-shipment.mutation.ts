import { gql } from "@apollo/client";

export const CREATE_SHIPMENT_MUTATION = gql`
  mutation CreateShipment($input: CreateShipmentDto!) {
    createShipment(input: $input) {
      id
      trackingCode
      customerProfileId
      mode
      vehicleCategory
      scheduleType
      status
      pickupAddressId
      dropoffAddressId
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
