import { gql } from "@apollo/client";

export const MY_WALLET_COMPLIANCE_QUERY = gql`
  query MyWalletCompliance {
    myWalletCompliance {
      phoneVerified
      canFund
      canWithdraw
      blockReasons
    }
  }
`;
