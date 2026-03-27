import { gql } from "@apollo/client";

export const WITHDRAW_BID = gql`
  mutation WithdrawBid($id: String!) {
    withdrawBid(id: $id) {
      id
      shipmentId
      providerId
      amountMinor
      currency
      message
      status
      createdAt
      updatedAt
    }
  }
`;
