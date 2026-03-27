import styled from "styled-components/native";

export const StyledShipmentDetailsRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledShipmentDetailsTopBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentDetailsBackButton = styled.Pressable`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  align-items: center;
  justify-content: center;
`;

export const StyledShipmentDetailsTopTitleWrap = styled.View`
  flex: 1;
  align-items: center;
  gap: 2px;
`;

export const StyledShipmentDetailsTopEyebrow = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
`;

export const StyledShipmentDetailsTopTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledShipmentDetailsTopSpacer = styled.View`
  width: 40px;
  height: 40px;
`;

export const StyledShipmentMapCard = styled.View`
  min-height: 280px;
  border-radius: ${({ theme }) => theme.radii.xl + 10}px;
  background-color: transparent;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledShipmentMapHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledShipmentMapBadge = styled.View`
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentMapBadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.35px;
`;

export const StyledShipmentMapDistanceCard = styled.View`
  align-items: flex-end;
  gap: 2px;
`;

export const StyledShipmentMapDistanceLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledShipmentMapDistanceValue = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xl + 4}px;
  font-weight: 700;
`;

export const StyledShipmentMapVisual = styled.View`
  flex: 1;
  min-height: 220px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl}px;
  background-color: #dbeafe;
`;

export const StyledShipmentMapRouteLine = styled.View`
  height: 4px;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.25);
  overflow: hidden;
`;

export const StyledShipmentMapRouteProgress = styled.View<{
  $widthPercent: number;
}>`
  width: ${({ $widthPercent }) => `${$widthPercent}%`};
  height: 100%;
  background-color: #ffffff;
`;

export const StyledShipmentMapPinsRow = styled.View`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StyledShipmentMapPin = styled.View<{
  $tone: "pickup" | "dropoff";
}>`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border-width: 3px;
  border-color: ${({ $tone }) => ($tone === "pickup" ? "#22c55e" : "#fb7185")};
  background-color: #ffffff;
`;

export const StyledShipmentAddressStack = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledShipmentAddressCard = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledShipmentAddressLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const StyledShipmentAddressValue = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
  font-weight: 600;
`;

export const StyledShipmentSummaryCard = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledShipmentSummaryHead = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentSummaryTextWrap = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledShipmentSummaryTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xxl}px;
  font-weight: 700;
`;

export const StyledShipmentSummaryCode = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledShipmentSummaryDescription = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 22px;
`;

export const StyledShipmentMetaChips = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentMetaChip = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentMetaChipText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
`;

export const StyledShipmentMetricGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentMetricItem = styled.View`
  flex: 1;
  min-width: 120px;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme }) => theme.colors.muted};
`;

export const StyledShipmentMetricLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  text-align: center;
`;

export const StyledShipmentMetricValue = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
  text-align: center;
`;

export const StyledShipmentSectionCard = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledShipmentSectionHeading = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledShipmentSectionText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledShipmentItemsList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentItemCard = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledShipmentItemHead = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentItemName = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledShipmentItemQuantity = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledShipmentItemMetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentItemMetaChip = styled.View`
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.background};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentItemMetaText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
`;

export const StyledShipmentTimelineList = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledShipmentTimelineItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentTimelineIconWrap = styled.View<{
  $tone: "primary" | "success" | "warning" | "muted";
}>`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $tone }) => {
    if ($tone === "success") return theme.colors.success;
    if ($tone === "warning") return theme.colors.warning;
    if ($tone === "muted") return theme.colors.muted;
    return theme.colors.primary;
  }};
`;

export const StyledShipmentTimelineContent = styled.View`
  flex: 1;
  gap: 2px;
`;

export const StyledShipmentTimelineTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledShipmentTimelineMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledShipmentFooterWrap = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentFooterNote = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  text-align: center;
`;
