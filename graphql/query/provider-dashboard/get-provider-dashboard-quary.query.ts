import { gql } from "@apollo/client";

export const GET_PROVIDER_DASHBOARD_QUARY = gql`
  query getProviderDashboardQuary {
    getProviderDashboardQuary {
      myShipmentDashboard {
        summary {
          activeShipments
          completedThisMonth
          pendingPaymentAmountMinor
          pendingPaymentCurrency
        }
        recentShipments {
          id
          trackingCode
          status
          scheduledAt
          createdAt
          pickupAddressSummary
          dropoffAddressSummary
        }
      }
      myWallet {
        id
        currency
        balanceMinor
        status
      }
      kycStatus {
        id
        overallStatus
        kycLevel
        ninStatus
        phoneStatus
        faceStatus
        vehiclePlateStatus
        vehicleVinStatus
      }
      activeAssignments {
        id
        trackingCode
        mode
        status
        vehicleCategory
        scheduledAt
        createdAt
        packageDescription
        pricingCurrency
        quotedPriceMinor
        finalPriceMinor
      }
      completedShipments {
        id
        trackingCode
        mode
        status
        vehicleCategory
        scheduledAt
        createdAt
        updatedAt
        packageDescription
        pricingCurrency
        finalPriceMinor
        quotedPriceMinor
      }
      vehicles {
        id
        category
        status
      }
    }
  }
`;
