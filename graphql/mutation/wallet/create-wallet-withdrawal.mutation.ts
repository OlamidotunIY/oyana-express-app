import { gql } from "@apollo/client";

export const CREATE_WALLET_WITHDRAWAL_MUTATION = gql`
  mutation CreateWalletWithdrawal($input: CreateWalletWithdrawalInput!) {
    createWalletWithdrawal(input: $input) {
      id
      walletAccountId
      profileId
      reference
      amountMinor
      currency
      status
      bankCode
      bankName
      accountNumberMasked
      accountName
      recipientCode
      transferCode
      paystackTransferId
      failureReason
      completedAt
      failedAt
      relatedTransactionId
      savedBankAccountId
      createdAt
      updatedAt
    }
  }
`;
