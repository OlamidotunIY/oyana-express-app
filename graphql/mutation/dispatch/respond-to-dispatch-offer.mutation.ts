import { gql } from "@apollo/client";

export const RESPOND_TO_DISPATCH_OFFER = gql`
  mutation RespondToDispatchOffer($input: UpdateDispatchOfferDto!) {
    respondToDispatchOffer(input: $input) {
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
  }
`;
