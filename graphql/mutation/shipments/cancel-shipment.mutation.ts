import { gql } from "@apollo/client";

export const CANCEL_SHIPMENT_MUTATION = gql`
  mutation CancelShipment($input: CancelShipmentDto!) {
    cancelShipment(input: $input) {
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
