import { gql } from "@apollo/client";

export const GET_PROVIDER_MARKETPLACE_TAB_QUARY = gql`
  query getProviderMarketplaceTabQuary($filter: MarketplaceShipmentsFilterDto) {
    marketplaceShipments(filter: $filter) {
      items {
        id
        trackingCode
        status
        scheduledAt
        createdAt
        packageDescription
        pricingCurrency
        quotedPriceMinor
        finalPriceMinor
        pickupAddressSummary
        dropoffAddressSummary
      }
      nextCursor
    }
  }
`;
