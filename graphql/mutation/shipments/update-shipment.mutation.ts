import { gql } from "@apollo/client";

export const UPDATE_SHIPMENT_MUTATION = gql`
  mutation UpdateShipment($id: String!, $input: UpdateShipmentDto!) {
    updateShipment(id: $id, input: $input) {
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
