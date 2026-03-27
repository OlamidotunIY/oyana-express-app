import { gql } from "@apollo/client";

export const WALLET_TRANSACTIONS_QUERY = gql`
  query WalletTransactions($walletAccountId: String!) {
    walletTransactions(walletAccountId: $walletAccountId) {
      id
      walletAccountId
      direction
      transactionType
      amountMinor
      currency
      status
      reference
      shipmentId
      metadata
      createdAt
      updatedAt
    }
  }
`;
