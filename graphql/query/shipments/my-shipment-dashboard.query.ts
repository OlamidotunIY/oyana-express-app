import { gql } from "@apollo/client";

export const MY_SHIPMENT_DASHBOARD_QUERY = gql`
  query MyShipmentDashboard {
    myShipmentDashboard {
      summary {
        totalShipments
        activeShipments
        completedThisMonth
        pendingPaymentCount
        pendingPaymentAmountMinor
        pendingPaymentCurrency
      }
      recentShipments {
        id
        trackingCode
        status
        mode
        scheduledAt
        createdAt
        pickupAddressSummary
        dropoffAddressSummary
      }
    }
  }
`;
