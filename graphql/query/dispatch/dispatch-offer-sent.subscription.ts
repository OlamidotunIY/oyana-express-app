import { gql } from "@apollo/client";

export const DISPATCH_OFFER_SENT_SUBSCRIPTION = gql`
  subscription DispatchOfferSent {
    dispatchOfferSent {
      batchId
      createdAt
      expiresAt
      id
      metadata
      providerEtaMinutes
      providerId
      respondedAt
      sentAt
      shipmentId
      status
      updatedAt
      vehicleId
    }
  }
`;
