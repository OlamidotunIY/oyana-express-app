import { gql } from "@apollo/client";

export const ADD_SHIPMENT_ITEM_MUTATION = gql`
  mutation AddShipmentItem($input: AddShipmentItemDto!) {
    addShipmentItem(input: $input) {
      id
      shipmentId
      name
      quantity
      weightKg
      createdAt
    }
  }
`;
