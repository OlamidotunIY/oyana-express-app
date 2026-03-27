import { gql } from "@apollo/client";

export const MY_WALLET_TRANSACTIONS_QUERY = gql`
  query MyWalletTransactions($input: WalletTransactionsInput) {
    myWalletTransactions(input: $input) {
      items {
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
      nextCursor
      hasMore
    }
  }
`;
