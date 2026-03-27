import { gql } from "@apollo/client";

export const CONFIRM_WALLET_FUNDING_MUTATION = gql`
  mutation ConfirmWalletFunding($input: ConfirmWalletFundingInput!) {
    confirmWalletFunding(input: $input) {
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
