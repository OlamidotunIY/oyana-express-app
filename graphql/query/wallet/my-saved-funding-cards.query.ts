import { gql } from "@apollo/client";

export const MY_SAVED_FUNDING_CARDS_QUERY = gql`
  query MySavedFundingCards {
    mySavedFundingCards {
      id
      provider
      brand
      cardType
      bank
      first6
      last4
      expMonth
      expYear
      reusable
      channel
      createdAt
      updatedAt
      lastUsedAt
    }
  }
`;
