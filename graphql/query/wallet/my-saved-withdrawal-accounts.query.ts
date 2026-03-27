import { gql } from "@apollo/client";

export const MY_SAVED_WITHDRAWAL_ACCOUNTS_QUERY = gql`
  query MySavedWithdrawalAccounts {
    mySavedWithdrawalAccounts {
      id
      provider
      bankCode
      bankName
      accountNumberMasked
      accountName
      recipientCode
      lastUsedAt
      createdAt
      updatedAt
    }
  }
`;
