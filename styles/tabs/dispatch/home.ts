import { DispatchOfferStatus } from "@/gql/graphql";
import styled from "styled-components/native";

const getOfferPillColors = (status: DispatchOfferStatus) => {
  if (status === DispatchOfferStatus.Accepted) {
    return {
      background: "success",
      border: "success",
      text: "primaryForeground",
    } as const;
  }

  if (
    status === DispatchOfferStatus.Declined ||
    status === DispatchOfferStatus.Cancelled
  ) {
    return {
      background: "warning",
      border: "warning",
      text: "primaryForeground",
    } as const;
  }

  if (status === DispatchOfferStatus.Expired) {
    return {
      background: "muted",
      border: "border",
      text: "mutedForeground",
    } as const;
  }

  return {
    background: "muted",
    border: "border",
    text: "foreground",
  } as const;
};

export const StyledDispatchRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledDispatchHeroCard = styled.View`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl + 6}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: rgba(255, 255, 255, 0.12);
  background-color: #082f49;
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledDispatchHeroGlowLarge = styled.View`
  position: absolute;
  width: 210px;
  height: 210px;
  border-radius: 105px;
  background-color: rgba(255, 106, 0, 0.28);
  top: -92px;
  right: -78px;
`;

export const StyledDispatchHeroGlowSmall = styled.View`
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-color: rgba(52, 211, 153, 0.2);
  bottom: -46px;
  left: -28px;
`;

export const StyledDispatchSectionHeading = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledDispatchSectionChip = styled.Text`
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: rgba(241, 245, 249, 0.24);
  background-color: rgba(241, 245, 249, 0.12);
  color: #e2e8f0;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding-vertical: 3px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchHeroTitle = styled.Text`
  color: #f8fafc;
  font-size: ${({ theme }) => theme.typography.xl + 1}px;
  font-weight: 700;
`;

export const StyledDispatchHeroDescription = styled.Text`
  color: rgba(241, 245, 249, 0.88);
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledDispatchHeroStatsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchHeroStatTile = styled.View`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: rgba(255, 255, 255, 0.16);
  background-color: rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledDispatchHeroStatValue = styled.Text`
  color: #ffffff;
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledDispatchHeroStatLabel = styled.Text`
  color: rgba(241, 245, 249, 0.86);
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledDispatchHeroActionRow = styled.View`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledTabSurface = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl + 4}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #0f172a;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 2;
`;

export const StyledDispatchSurfaceCard = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledDispatchPanelTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledDispatchPanelDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledOfferList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledOfferRow = styled.Pressable`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledOfferMain = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledOfferHead = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledOfferTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledOfferMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledOfferStatusPill = styled.View<{
  status: DispatchOfferStatus;
}>`
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, status }) => {
    const palette = getOfferPillColors(status);
    return theme.colors[palette.border];
  }};
  background-color: ${({ theme, status }) => {
    const palette = getOfferPillColors(status);
    return theme.colors[palette.background];
  }};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledOfferStatusText = styled.Text<{
  status: DispatchOfferStatus;
}>`
  color: ${({ theme, status }) => {
    const palette = getOfferPillColors(status);
    return theme.colors[palette.text];
  }};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

export const StyledDispatchEmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchEmptyStateText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  text-align: center;
`;

export const StyledHintText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledDispatchOverviewText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledDispatchFilterTabs = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchFilterTab = styled.Pressable<{
  $active: boolean;
}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.background};
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledDispatchFilterTabText = styled.Text<{
  $active: boolean;
}>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primaryForeground : theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledDispatchShipmentListHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchShipmentCountChip = styled.View`
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchShipmentCountText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledDispatchShipmentCard = styled.Pressable`
  gap: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.xl}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledDispatchShipmentCardTop = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchShipmentTrailing = styled.View`
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledDispatchShipmentCardMain = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledDispatchShipmentCode = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledDispatchShipmentDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledDispatchShipmentMetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchShipmentMetaChip = styled.View`
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchModeBadge = styled.View<{
  $mode: "dispatch" | "marketplace";
}>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ $mode }) =>
    $mode === "marketplace" ? "#ffedd5" : "#dbeafe"};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDispatchModeText = styled.Text<{
  $mode: "dispatch" | "marketplace";
}>`
  color: ${({ $mode }) => ($mode === "marketplace" ? "#9a3412" : "#1d4ed8")};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledDispatchShipmentMetaText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
`;

export const StyledDispatchShipmentProgressRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledDispatchShipmentProgressStep = styled.View`
  flex: 1;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledDispatchShipmentProgressDot = styled.View<{
  $state: "completed" | "active" | "upcoming";
}>`
  width: 10px;
  height: 10px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme, $state }) => {
    if ($state === "completed") return theme.colors.success;
    if ($state === "active") return theme.colors.primary;
    return theme.colors.border;
  }};
`;

export const StyledDispatchShipmentProgressLabel = styled.Text<{
  $state: "completed" | "active" | "upcoming";
}>`
  color: ${({ theme, $state }) => {
    if ($state === "upcoming") return theme.colors.mutedForeground;
    return theme.colors.foreground;
  }};
  font-size: 11px;
  font-weight: ${({ $state }) => ($state === "active" ? 700 : 600)};
  text-align: center;
`;
