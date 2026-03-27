import { gql } from "@apollo/client";

export const CREATE_WALLET_FUNDING_MUTATION = gql`
  mutation CreateWalletFunding($input: CreateWalletFundingInput!) {
    createWalletFunding(input: $input) {
      success
      status
      reference
      authorizationUrl
      message
      paymentIntent {
        id
        walletAccountId
        provider
        amountMinor
        currency
        status
        paystackReference
        authorizationUrl
        confirmedAt
        createdAt
        updatedAt
      }
      walletTransaction {
        id
        walletAccountId
        direction
        transactionType
        amountMinor
        currency
        status
        reference
        createdAt
        updatedAt
      }
    }
  }
`;
