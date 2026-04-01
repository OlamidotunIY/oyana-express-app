import { useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Button, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import {
  ShipmentMode,
  ShipmentStatus,
  ShipmentsQuery,
  ShipmentsQueryVariables,
} from "@/gql/graphql";
import { SHIPMENTS_QUERY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { formatEnumLabel, formatMinorCurrency, formatShipmentStatus, getTimestamp } from "@/utils/format";

type ShipmentViewFilter = "active" | "completed";
type ShipmentModeFilter = "all" | "dispatch" | "freight";

const COMPLETED_STATUSES = new Set<ShipmentStatus>([
  ShipmentStatus.Cancelled,
  ShipmentStatus.Completed,
  ShipmentStatus.Delivered,
]);

export default function ShipmentsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [statusFilter, setStatusFilter] = React.useState<ShipmentViewFilter>("active");
  const [modeFilter, setModeFilter] = React.useState<ShipmentModeFilter>("all");

  const { data, loading, error, refetch } = useQuery<ShipmentsQuery, ShipmentsQueryVariables>(
    SHIPMENTS_QUERY,
    {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
  );

  useBackendErrorToast(error, "Unable to load your shipments.", {
    title: "Shipments Error",
    dedupeKey: "shipper-shipments-query",
  });

  const shipments = React.useMemo(() => {
    const items = [...(data?.shipments ?? [])].sort(
      (left, right) => getTimestamp(right.updatedAt) - getTimestamp(left.updatedAt),
    );

    return items.filter((shipment) => {
      const matchesStatus =
        statusFilter === "completed"
          ? COMPLETED_STATUSES.has(shipment.status)
          : !COMPLETED_STATUSES.has(shipment.status);

      if (!matchesStatus) {
        return false;
      }

      if (modeFilter === "dispatch") {
        return shipment.mode === ShipmentMode.Dispatch;
      }

      if (modeFilter === "freight") {
        return shipment.mode === ShipmentMode.Marketplace;
      }

      return true;
    });
  }, [data?.shipments, modeFilter, statusFilter]);

  const openShipment = (shipmentId: string, mode: ShipmentMode) => {
    const context = mode === ShipmentMode.Dispatch ? "dispatch" : "freight";
    router.push(`/shipment-details?context=${context}&shipmentId=${encodeURIComponent(shipmentId)}` as never);
  };

  return (
    <ScreenShell contentJustify="flex-start">
      <StyledRoot>
        <StyledHeaderCard>
          <StyledHeaderTitle>Your shipments</StyledHeaderTitle>
          <StyledHeaderDescription>
            Track dispatch requests and freight bookings from one place.
          </StyledHeaderDescription>

          <StyledActionsRow>
            <Button variant={statusFilter === "active" ? "default" : "outline"} onPress={() => setStatusFilter("active")}>
              Active
            </Button>
            <Button variant={statusFilter === "completed" ? "default" : "outline"} onPress={() => setStatusFilter("completed")}>
              Completed
            </Button>
          </StyledActionsRow>

          <StyledModeRow>
            <StyledModeChip $active={modeFilter === "all"} onPress={() => setModeFilter("all")}>
              <StyledModeText $active={modeFilter === "all"}>All</StyledModeText>
            </StyledModeChip>
            <StyledModeChip $active={modeFilter === "dispatch"} onPress={() => setModeFilter("dispatch")}>
              <StyledModeText $active={modeFilter === "dispatch"}>Dispatch</StyledModeText>
            </StyledModeChip>
            <StyledModeChip $active={modeFilter === "freight"} onPress={() => setModeFilter("freight")}>
              <StyledModeText $active={modeFilter === "freight"}>Freight</StyledModeText>
            </StyledModeChip>
          </StyledModeRow>
        </StyledHeaderCard>

        {loading && !data?.shipments ? (
          <StyledLoadingWrap>
            <Spinner size="small" />
          </StyledLoadingWrap>
        ) : null}

        {shipments.length === 0 && !loading ? (
          <StyledEmptyCard>
            <MaterialIcons name="inventory-2" size={28} color={theme.colors.mutedForeground} />
            <StyledEmptyTitle>No shipments yet</StyledEmptyTitle>
            <StyledEmptyBody>
              Your new dispatch requests and freight bookings will show up here.
            </StyledEmptyBody>
            <Button variant="outline" onPress={() => void refetch()}>
              Refresh
            </Button>
          </StyledEmptyCard>
        ) : (
          <StyledList>
            {shipments.map((shipment) => {
              const amount = shipment.finalPriceMinor ?? shipment.quotedPriceMinor;
              return (
                <StyledCard key={shipment.id} onPress={() => openShipment(shipment.id, shipment.mode)}>
                  <StyledCardTop>
                    <StyledCardMain>
                      <StyledTrackingCode>{shipment.trackingCode}</StyledTrackingCode>
                      <StyledDescription numberOfLines={2}>
                        {shipment.packageDescription ?? "Shipment request"}
                      </StyledDescription>
                    </StyledCardMain>
                    <StyledStatusBadge>
                      <StyledStatusText>{formatShipmentStatus(shipment.status)}</StyledStatusText>
                    </StyledStatusBadge>
                  </StyledCardTop>

                  <StyledMetaRow>
                    <StyledMetaChip>
                      <StyledMetaText>{formatEnumLabel(shipment.mode)}</StyledMetaText>
                    </StyledMetaChip>
                    <StyledMetaChip>
                      <StyledMetaText>{formatEnumLabel(shipment.vehicleCategory)}</StyledMetaText>
                    </StyledMetaChip>
                    {amount != null ? (
                      <StyledMetaChip>
                        <StyledMetaText>
                          {formatMinorCurrency(amount, shipment.pricingCurrency)}
                        </StyledMetaText>
                      </StyledMetaChip>
                    ) : null}
                  </StyledMetaRow>

                  <StyledRouteText numberOfLines={2}>
                    {shipment.pickupAddressSummary ?? shipment.pickupAddressId} to{" "}
                    {shipment.dropoffAddressSummary ?? shipment.dropoffAddressId}
                  </StyledRouteText>
                </StyledCard>
              );
            })}
          </StyledList>
        )}
      </StyledRoot>
    </ScreenShell>
  );
}

const StyledRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const StyledHeaderCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StyledHeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

const StyledHeaderDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

const StyledActionsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StyledModeRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex-wrap: wrap;
`;

const StyledModeChip = styled.Pressable<{ $active: boolean }>`
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $active, theme }) => ($active ? "rgba(255, 106, 0, 0.12)" : theme.colors.background)};
`;

const StyledModeText = styled.Text<{ $active: boolean }>`
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.mutedForeground)};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
`;

const StyledLoadingWrap = styled.View`
  min-height: 160px;
  align-items: center;
  justify-content: center;
`;

const StyledEmptyCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
`;

const StyledEmptyTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

const StyledEmptyBody = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
  text-align: center;
`;

const StyledList = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const StyledCard = styled.Pressable`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StyledCardTop = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-items: flex-start;
`;

const StyledCardMain = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const StyledTrackingCode = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

const StyledDescription = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

const StyledStatusBadge = styled.View`
  border-radius: ${({ theme }) => theme.radii.full}px;
  padding-vertical: 4px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  background-color: ${({ theme }) => theme.colors.muted};
`;

const StyledStatusText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
`;

const StyledMetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StyledMetaChip = styled.View`
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: 4px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

const StyledMetaText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
`;

const StyledRouteText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;
