import { gql } from "@apollo/client";

export const MY_WALLET_QUERY = gql`
  query MyWallet {
    myWallet {
      id
      ownerProfileId
      currency
      balanceMinor
      escrowMinor
      status
      createdAt
      updatedAt
    }
  }
`;
