import { ShipmentStatus } from "@/gql/graphql";
import styled from "styled-components/native";

const getStatusPillColors = (status: ShipmentStatus) => {
  if (
    status === ShipmentStatus.Completed ||
    status === ShipmentStatus.Delivered
  ) {
    return {
      background: "success",
      border: "success",
      text: "primaryForeground",
    } as const;
  }

  if (
    status === ShipmentStatus.Cancelled ||
    status === ShipmentStatus.Expired
  ) {
    return {
      background: "warning",
      border: "warning",
      text: "primaryForeground",
    } as const;
  }

  if (
    status === ShipmentStatus.Assigned ||
    status === ShipmentStatus.EnRoutePickup ||
    status === ShipmentStatus.PickedUp ||
    status === ShipmentStatus.EnRouteDropoff
  ) {
    return {
      background: "primary",
      border: "primary",
      text: "primaryForeground",
    } as const;
  }

  return {
    background: "muted",
    border: "border",
    text: "foreground",
  } as const;
};

export const StyledFreightRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFreightScreen = styled.View`
  flex: 1;
`;

export const StyledFreightGrid = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFreightBoardHeader = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFreightBoardEyebrow = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledFreightBoardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xl}px;
  font-weight: 700;
`;

export const StyledFreightBoardText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledFreightGridItem = styled.View`
  width: 100%;
`;

export const StyledFreightAddressRow = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFreightAddressLine = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFreightRouteIconWrap = styled.View`
  margin-top: 1px;
`;

export const StyledFreightRouteStack = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFreightRouteConnector = styled.View`
  width: 1px;
  height: 14px;
  margin-left: 6px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const StyledFreightRouteLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

export const StyledFreightAddressText2 = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 19px;
`;

export const StyledFreightHeroCard = styled.View`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl + 6}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: rgba(255, 255, 255, 0.14);
  background-color: #1f2937;
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFreightHeroGlowLarge = styled.View`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 110px;
  background-color: rgba(255, 106, 0, 0.24);
  top: -92px;
  right: -74px;
`;

export const StyledFreightHeroGlowSmall = styled.View`
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-color: rgba(59, 130, 246, 0.22);
  bottom: -42px;
  left: -30px;
`;

export const StyledFreightSectionHeading = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFreightSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledFreightSectionChip = styled.Text`
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

export const StyledFreightHeroTitle = styled.Text`
  color: #f8fafc;
  font-size: ${({ theme }) => theme.typography.xl + 1}px;
  font-weight: 700;
`;

export const StyledFreightHeroDescription = styled.Text`
  color: rgba(241, 245, 249, 0.86);
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledFreightHeroStatsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFreightHeroStatTile = styled.View`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: rgba(255, 255, 255, 0.16);
  background-color: rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFreightHeroStatValue = styled.Text`
  color: #ffffff;
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledFreightHeroStatLabel = styled.Text`
  color: rgba(241, 245, 249, 0.84);
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledFreightHeroActionRow = styled.View`
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFreightSurfaceCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl + 4}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #0f172a;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 2;
`;

export const StyledPanelHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledPanelTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledPanelDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledPanelHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledFilterSummaryChip = styled.Text`
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding-vertical: 3px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFilterMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledFilterSectionCard = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.xl}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFilterSectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledFilterSectionText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledFilterErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.destructive};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledShipmentList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentRow = styled.Pressable`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentMain = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledShipmentHead = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledShipmentTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledShipmentMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledLoadMetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledLoadMetaTile = styled.View`
  flex: 1;
  min-width: 0px;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledLoadMetaValue = styled.Text`
  flex: 1;
  min-width: 0px;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledLoadMetaLabel = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
`;

export const StyledFreightStatusPill = styled.View<{ status: ShipmentStatus }>`
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, status }) => {
    const palette = getStatusPillColors(status);
    return theme.colors[palette.border];
  }};
  background-color: ${({ theme, status }) => {
    const palette = getStatusPillColors(status);
    return theme.colors[palette.background];
  }};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledStatusText = styled.Text<{ status: ShipmentStatus }>`
  color: ${({ theme, status }) => {
    const palette = getStatusPillColors(status);
    return theme.colors[palette.text];
  }};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

export const StyledFreightEmptyStateWrap = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: 64px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFreightEmptyStateText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  text-align: center;
`;

export const StyledFilterRow = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFilterGrid = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFilterItem = styled.View`
  width: 100%;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFilterLabel = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 600;
`;

export const StyledInlineRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledInlineItem = styled.View`
  flex: 1;
  min-width: 140px;
`;

export const StyledFilterModalRoot = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledFilterModalBackdrop = styled.Pressable`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

export const StyledFilterModalCard = styled.View`
  width: 100%;
  max-width: 520px;
  max-height: 78%;
  align-self: center;
  border-radius: ${({ theme }) => theme.radii.xl + 4}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledDateFieldButton = styled.Pressable`
  min-height: 46px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledDateFieldText = styled.Text<{ $hasValue?: boolean }>`
  flex: 1;
  color: ${({ theme, $hasValue }) =>
    $hasValue ? theme.colors.foreground : theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

// ── Fixed header (stickyTop) ──────────────────────────────────────────

export const StyledFreightHeaderCard = styled.View`
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  background-color: #0f2742;
  padding-top: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFreightHeaderTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFreightAddressBar = styled.Pressable`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFreightAddressText = styled.Text`
  flex: 1;
  color: rgba(241, 245, 249, 0.9);
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 500;
`;

export const StyledFreightHeaderIconsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFreightHeaderIconBtn = styled.Pressable`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
`;

export const StyledFreightSearchWrap = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFreightSearchNativeInput = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  padding: 0px;
`;

export const StyledFreightFloatingButton = styled.Pressable<{
  $bottom: number;
}>`
  position: absolute;
  right: 20px;
  bottom: ${({ $bottom }) => $bottom}px;
  min-width: 118px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xs}px;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #0f172a;
  shadow-offset: 0px 6px;
  shadow-opacity: 0.18;
  shadow-radius: 14px;
  elevation: 5;
`;

export const StyledFreightFloatingButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

// ── Marketplace shipment card ─────────────────────────────────────────

export const StyledFreightShipmentCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #0f172a;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 1;
`;

export const StyledFreightShipmentCardTop = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFreightShipmentIconBadge = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background-color: rgba(255, 106, 0, 0.1);
  align-items: center;
  justify-content: center;
`;

export const StyledFreightShipmentTopMain = styled.View`
  flex: 1;
  gap: 2px;
`;

export const StyledFreightShipmentCode = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledFreightShipmentSubline = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledFreightShipmentDescription = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledFreightShipmentFooter = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFreightShipmentFooterText = styled.Text`
  flex: 1;
  min-width: 0px;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledFreightShipmentOpenText = styled.Text`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledFreightShipmentCardHead = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFreightShipmentCardTitleGroup = styled.View`
  flex: 1;
  gap: 2px;
`;

// ── Address picker modal ─────────────────────────────────────────────

export const StyledFreightAddressList = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFreightAddressItem = styled.Pressable<{ $active?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, $active }) =>
    $active ? "rgba(255, 106, 0, 0.08)" : theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFreightAddressItemIconWrap = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: rgba(255, 106, 0, 0.1);
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StyledFreightAddressItemTextGroup = styled.View`
  flex: 1;
  gap: 2px;
`;

export const StyledFreightAddressItemMain = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 600;
`;

export const StyledFreightAddressItemSub = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

// ── Bid modal info box ────────────────────────────────────────────────

export const StyledFreightBidInfoRow = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.md}px;
`;
