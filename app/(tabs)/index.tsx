import { ScreenShell } from "@/components/ui/ScreenShell";
import { GetProviderDashboardQuaryQuery, ShipmentStatus } from "@/gql/graphql";
import { GET_PROVIDER_DASHBOARD_QUARY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import
{
  StyledAccountRow,
  StyledAccountRowIcon,
  StyledAccountRowLabel,
  StyledAccountRowLeft,
  StyledAccountRowValue,
  StyledAlertItem,
  StyledAlertItemDescription,
  StyledAlertItemHeader,
  StyledAlertItemIconWrap,
  StyledAlertItemTitle,
  StyledAlertsList,
  StyledDivider,
  StyledEmptyStateText,
  StyledHeroBalance,
  StyledHeroBalanceLabel,
  StyledHeroCard,
  StyledHeroStatBox,
  StyledHeroStatBoxDivider,
  StyledHeroStatBoxIconWrap,
  StyledHeroStatBoxLabel,
  StyledHeroStatBoxRow,
  StyledHeroStatBoxValue,
  StyledHomeRoot,
  StyledKycBadge,
  StyledKycBadgeText,
  StyledSectionChip,
  StyledSectionHeading,
  StyledSectionLabel,
  StyledStatCard,
  StyledStatCardIconWrap,
  StyledStatCardLabel,
  StyledStatCardValue,
  StyledStatGrid,
  StyledSuccessRow,
  StyledSuccessRowText,
  StyledSurfaceCard,
  StyledSurfaceRow,
  StyledSurfaceRowDescription,
  StyledSurfaceRowTextGroup,
  StyledSurfaceRowTitle,
} from "@/styles";
import
{
  formatMinorCurrency,
  formatShipmentStatus,
  getTimestamp,
  isDateToday,
  toMinorNumber,
} from "@/utils/format";
import { useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

const LOW_WALLET_THRESHOLD_MINOR = 300_000;

const COMPLETED_SHIPMENT_STATUSES = new Set<ShipmentStatus>([
  ShipmentStatus.Completed,
  ShipmentStatus.Delivered,
]);

export default function HomeScreen()
{
  const router = useRouter();
  const theme = useTheme();
  const { data, error } = useQuery<GetProviderDashboardQuaryQuery>(
    GET_PROVIDER_DASHBOARD_QUARY,
    {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
  );

  useBackendErrorToast(error, "Unable to load dashboard data.", {
    title: "Dashboard Error",
    dedupeKey: "home-dashboard-query",
  });

  const dashboard = data?.getProviderDashboardQuary;
  const summary = dashboard?.myShipmentDashboard?.summary;
  const recentShipments = dashboard?.myShipmentDashboard?.recentShipments ?? [];
  const activeAssignments = dashboard?.activeAssignments ?? [];
  const completedShipments = dashboard?.completedShipments ?? [];
  const wallet = dashboard?.myWallet ?? null;

  const activeAssignment = React.useMemo(() =>
  {
    if (!activeAssignments.length)
    {
      return null;
    }

    return [...activeAssignments].sort((left, right) =>
    {
      const rightDate = right.scheduledAt ?? right.createdAt;
      const leftDate = left.scheduledAt ?? left.createdAt;
      return getTimestamp(rightDate) - getTimestamp(leftDate);
    })[0];
  }, [activeAssignments]);

  const activeAssignmentRoute = React.useMemo(() =>
  {
    if (!activeAssignment)
    {
      return null;
    }

    const dashboardShipment = recentShipments.find(
      (shipment) => shipment.id === activeAssignment.id,
    );

    if (
      dashboardShipment?.pickupAddressSummary &&
      dashboardShipment.dropoffAddressSummary
    )
    {
      return `${dashboardShipment.pickupAddressSummary} -> ${dashboardShipment.dropoffAddressSummary}`;
    }

    return null;
  }, [activeAssignment, recentShipments]);

  const completedTodayShipments = React.useMemo(
    () =>
      completedShipments.filter((shipment) =>
      {
        if (!COMPLETED_SHIPMENT_STATUSES.has(shipment.status))
        {
          return false;
        }

        return isDateToday(shipment.updatedAt ?? shipment.createdAt);
      }),
    [completedShipments],
  );

  const completedTripsToday = completedTodayShipments.length;

  const todayEarningsMinor = React.useMemo(
    () =>
      completedTodayShipments.reduce((sum, shipment) =>
      {
        const shipmentAmount = shipment.finalPriceMinor ?? shipment.quotedPriceMinor;
        return sum + toMinorNumber(shipmentAmount);
      }, 0),
    [completedTodayShipments],
  );

  const earningsCurrency =
    completedTodayShipments[0]?.pricingCurrency ??
    wallet?.currency ??
    summary?.pendingPaymentCurrency ??
    "NGN";

  const pendingPayoutMinor = toMinorNumber(summary?.pendingPaymentAmountMinor);
  const pendingPayoutCurrency = summary?.pendingPaymentCurrency ?? earningsCurrency;

  const hasKycPending = React.useMemo(() =>
  {
    const overallStatus = String(dashboard?.kycStatus?.overallStatus ?? "").toLowerCase();
    return overallStatus !== "verified";
  }, [dashboard?.kycStatus?.overallStatus]);

  const walletBalanceMinor = toMinorNumber(wallet?.balanceMinor);
  const hasLowWalletThreshold =
    Boolean(wallet) && walletBalanceMinor < LOW_WALLET_THRESHOLD_MINOR;
  const hasAlerts = hasKycPending || hasLowWalletThreshold;
  const alertCount = Number(hasKycPending) + Number(hasLowWalletThreshold);
  const activeAssignmentsCount = summary?.activeShipments ?? activeAssignments.length;
  const readinessScore = Math.min(
    100,
    32 + activeAssignmentsCount * 18,
  );

  return (
    <ScreenShell
      contentProps={{ style: { justifyContent: "flex-start" } }}
      stickyTop={
        <StyledHeroCard>
          <StyledHeroBalanceLabel>Wallet balance</StyledHeroBalanceLabel>
          <StyledHeroBalance>
            {formatMinorCurrency(walletBalanceMinor, wallet?.currency ?? "NGN")}
          </StyledHeroBalance>

          <StyledHeroStatBoxRow>
            <StyledHeroStatBox>
              <StyledHeroStatBoxIconWrap>
                <MaterialIcons
                  name="work"
                  size={12}
                  color={theme.colors.heroChipForeground}
                />
              </StyledHeroStatBoxIconWrap>
              <StyledHeroStatBoxValue>{activeAssignmentsCount}</StyledHeroStatBoxValue>
              <StyledHeroStatBoxLabel>Active jobs</StyledHeroStatBoxLabel>
            </StyledHeroStatBox>
            <StyledHeroStatBoxDivider />
            <StyledHeroStatBox>
              <StyledHeroStatBoxIconWrap>
                <MaterialIcons
                  name="payments"
                  size={12}
                  color={theme.colors.heroChipForeground}
                />
              </StyledHeroStatBoxIconWrap>
              <StyledHeroStatBoxValue>
                {formatMinorCurrency(todayEarningsMinor, earningsCurrency)}
              </StyledHeroStatBoxValue>
              <StyledHeroStatBoxLabel>Earned today</StyledHeroStatBoxLabel>
            </StyledHeroStatBox>
          </StyledHeroStatBoxRow>
        </StyledHeroCard>
      }
    >
      <StyledHomeRoot>

        {/* ── SHIPMENTS OVERVIEW ────────────────────────────── */}
        <StyledSurfaceCard>
          <StyledSectionLabel>Shipments</StyledSectionLabel>

          <StyledStatGrid>
            <StyledStatCard>
              <StyledStatCardIconWrap>
                <MaterialIcons name="local-shipping" color={theme.colors.primary} size={16} />
              </StyledStatCardIconWrap>
              <StyledStatCardValue>{completedTripsToday}</StyledStatCardValue>
              <StyledStatCardLabel>Completed today</StyledStatCardLabel>
            </StyledStatCard>

            <StyledStatCard>
              <StyledStatCardIconWrap>
                <MaterialIcons name="calendar-month" color={theme.colors.primary} size={16} />
              </StyledStatCardIconWrap>
              <StyledStatCardValue>{summary?.completedThisMonth ?? 0}</StyledStatCardValue>
              <StyledStatCardLabel>This month</StyledStatCardLabel>
            </StyledStatCard>

            <StyledStatCard>
              <StyledStatCardIconWrap>
                <MaterialIcons name="pending-actions" color={theme.colors.primary} size={16} />
              </StyledStatCardIconWrap>
              <StyledStatCardValue>
                {formatMinorCurrency(pendingPayoutMinor, pendingPayoutCurrency)}
              </StyledStatCardValue>
              <StyledStatCardLabel>Pending payout</StyledStatCardLabel>
            </StyledStatCard>

            <StyledStatCard>
              <StyledStatCardIconWrap>
                <MaterialIcons name="trending-up" color={theme.colors.primary} size={16} />
              </StyledStatCardIconWrap>
              <StyledStatCardValue>{readinessScore}%</StyledStatCardValue>
              <StyledStatCardLabel>Readiness score</StyledStatCardLabel>
            </StyledStatCard>
          </StyledStatGrid>
        </StyledSurfaceCard>

        {/* ── CURRENT ASSIGNMENT ────────────────────────────── */}
        <StyledSurfaceCard>
          <StyledSectionHeading>
            <StyledSectionLabel>Current assignment</StyledSectionLabel>
            <StyledSectionChip>
              {activeAssignment ? formatShipmentStatus(activeAssignment.status) : "Idle"}
            </StyledSectionChip>
          </StyledSectionHeading>

          {activeAssignment ? (
            <StyledSurfaceRow onPress={() => router.push("/")}>
              <StyledSurfaceRowTextGroup>
                <StyledSurfaceRowTitle>{activeAssignment.trackingCode}</StyledSurfaceRowTitle>
                <StyledSurfaceRowDescription>
                  {activeAssignmentRoute ??
                    activeAssignment.packageDescription ??
                    `Status: ${formatShipmentStatus(activeAssignment.status)}`}
                </StyledSurfaceRowDescription>
              </StyledSurfaceRowTextGroup>
              <MaterialIcons
                name="arrow-forward-ios"
                color={theme.colors.mutedForeground}
                size={16}
              />
            </StyledSurfaceRow>
          ) : (
            <StyledEmptyStateText>No active assignment right now.</StyledEmptyStateText>
          )}
        </StyledSurfaceCard>

        {/* ── ACTION REQUIRED ───────────────────────────────── */}
        {hasAlerts ? (
          <StyledSurfaceCard>
            <StyledSectionHeading>
              <StyledSectionLabel>Action required</StyledSectionLabel>
              <StyledSectionChip>{alertCount} open</StyledSectionChip>
            </StyledSectionHeading>

            <StyledAlertsList>
              {hasKycPending ? (
                <StyledAlertItem onPress={() => router.push("/(tabs)/accounts")}>
                  <StyledAlertItemHeader>
                    <StyledAlertItemIconWrap>
                      <MaterialIcons name="verified-user" color={theme.colors.primary} size={16} />
                    </StyledAlertItemIconWrap>
                    <StyledAlertItemTitle>KYC verification pending</StyledAlertItemTitle>
                  </StyledAlertItemHeader>
                  <StyledAlertItemDescription>
                    Complete identity verification to keep payouts and assignments active.
                  </StyledAlertItemDescription>
                </StyledAlertItem>
              ) : null}

              {hasLowWalletThreshold ? (
                <StyledAlertItem onPress={() => router.push("/(tabs)/wallet")}>
                  <StyledAlertItemHeader>
                    <StyledAlertItemIconWrap>
                      <MaterialIcons name="account-balance-wallet" color={theme.colors.primary} size={16} />
                    </StyledAlertItemIconWrap>
                    <StyledAlertItemTitle>Wallet below minimum threshold</StyledAlertItemTitle>
                  </StyledAlertItemHeader>
                  <StyledAlertItemDescription>
                    Balance {formatMinorCurrency(walletBalanceMinor, wallet?.currency ?? "NGN")} is
                    below the {formatMinorCurrency(LOW_WALLET_THRESHOLD_MINOR, wallet?.currency ?? "NGN")} minimum.
                    Top up to keep receiving dispatch offers.
                  </StyledAlertItemDescription>
                </StyledAlertItem>
              ) : null}
            </StyledAlertsList>
          </StyledSurfaceCard>
        ) : (
          <StyledSurfaceCard>
            <StyledSuccessRow>
              <MaterialIcons name="check-circle" color={theme.colors.success} size={18} />
              <StyledSuccessRowText>All systems healthy — no urgent alerts.</StyledSuccessRowText>
            </StyledSuccessRow>
          </StyledSurfaceCard>
        )}

        {/* ── ACCOUNT STATUS ────────────────────────────────── */}
        <StyledSurfaceCard>
          <StyledSectionLabel>Account status</StyledSectionLabel>

          <StyledAccountRow>
            <StyledAccountRowLeft>
              <StyledAccountRowIcon>
                <MaterialIcons name="verified-user" color={theme.colors.mutedForeground} size={16} />
              </StyledAccountRowIcon>
              <StyledAccountRowLabel>KYC status</StyledAccountRowLabel>
            </StyledAccountRowLeft>
            <StyledKycBadge verified={!hasKycPending}>
              <MaterialIcons
                name={hasKycPending ? "hourglass-empty" : "check-circle"}
                color={hasKycPending ? theme.colors.warning : theme.colors.success}
                size={11}
              />
              <StyledKycBadgeText verified={!hasKycPending}>
                {hasKycPending ? "Pending" : "Verified"}
              </StyledKycBadgeText>
            </StyledKycBadge>
          </StyledAccountRow>

          <StyledDivider />

          <StyledAccountRow>
            <StyledAccountRowLeft>
              <StyledAccountRowIcon>
                <MaterialIcons name="account-balance-wallet" color={theme.colors.mutedForeground} size={16} />
              </StyledAccountRowIcon>
              <StyledAccountRowLabel>Wallet balance</StyledAccountRowLabel>
            </StyledAccountRowLeft>
            <StyledAccountRowValue>
              {formatMinorCurrency(walletBalanceMinor, wallet?.currency ?? "NGN")}
            </StyledAccountRowValue>
          </StyledAccountRow>

          <StyledDivider />

          <StyledAccountRow>
            <StyledAccountRowLeft>
              <StyledAccountRowIcon>
                <MaterialIcons name="checklist" color={theme.colors.mutedForeground} size={16} />
              </StyledAccountRowIcon>
              <StyledAccountRowLabel>Completed this month</StyledAccountRowLabel>
            </StyledAccountRowLeft>
            <StyledAccountRowValue>{summary?.completedThisMonth ?? 0} trips</StyledAccountRowValue>
          </StyledAccountRow>
        </StyledSurfaceCard>

      </StyledHomeRoot>
    </ScreenShell>
  );
}

