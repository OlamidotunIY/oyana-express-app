import { gql } from "@apollo/client";

export const GET_PROVIDER_DISPATCH_TAB_QUARY = gql`
  query getProviderDispatchTabQuary {
    myDispatchOffers {
      id
      batchId
      providerId
      shipmentId
      vehicleId
      status
      sentAt
      respondedAt
      expiresAt
      providerEtaMinutes
      createdAt
      updatedAt
    }
    getProviderDashboardQuary {
      activeAssignments {
        id
        trackingCode
        status
        pickupAddressId
        dropoffAddressId
        scheduledAt
        createdAt
        packageDescription
        pricingCurrency
        quotedPriceMinor
        finalPriceMinor
      }
    }
  }
`;
