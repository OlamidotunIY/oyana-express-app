import styled from "styled-components/native";

export const StyledHomeRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledHeroCard = styled.View`
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  background-color: ${({ theme }) => theme.colors.heroSurface};
  padding-top: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.xl}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledHeroGlowLarge = styled.View`
  position: absolute;
  width: 210px;
  height: 210px;
  border-radius: 105px;
  background-color: rgba(255, 106, 0, 0.26);
  top: -88px;
  right: -78px;
`;

export const StyledHeroGlowSmall = styled.View`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: rgba(52, 211, 153, 0.18);
  bottom: -34px;
  left: -28px;
`;

export const StyledSectionHeading = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledStatusPill = styled.View<{ isOnline: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ isOnline }) =>
    isOnline ? "rgba(16, 185, 129, 0.42)" : "rgba(248, 113, 113, 0.45)"};
  background-color: ${({ isOnline }) =>
    isOnline ? "rgba(16, 185, 129, 0.2)" : "rgba(248, 113, 113, 0.14)"};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledStatusPillText = styled.Text<{ isOnline: boolean }>`
  color: ${({ theme, isOnline }) =>
    isOnline ? theme.colors.success : theme.colors.destructive};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const StyledLivePill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.heroChipBorder};
  background-color: ${({ theme }) => theme.colors.heroChipBackground};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledLivePillText = styled.Text`
  color: ${({ theme }) => theme.colors.heroChipForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
`;

export const StyledHeroTitle = styled.Text`
  color: ${({ theme }) => theme.colors.heroForeground};
  font-size: ${({ theme }) => theme.typography.xl + 2}px;
  font-weight: 700;
`;

export const StyledHeroDescription = styled.Text`
  color: ${({ theme }) => theme.colors.heroMutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledHeroMetricsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledHeroMetricTile = styled.View`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme }) => theme.colors.heroTileBackground};
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.heroTileBorder};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledHeroMetricValue = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileForeground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledHeroMetricLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledSurfaceCard = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledSectionChip = styled.Text`
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

export const StyledSurfaceRow = styled.Pressable`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSurfaceRowTextGroup = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledSurfaceRowTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledSurfaceRowDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledMetricTile = styled.View`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledMetricValue = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledMetricLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
`;

export const StyledSectionHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledAlertsList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAlertItem = styled.Pressable`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAlertItemHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAlertItemIconWrap = styled.View`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: rgba(255, 106, 0, 0.12);
  align-items: center;
  justify-content: center;
`;

export const StyledAlertItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledAlertItemDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledSuccessRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: rgba(34, 197, 94, 0.1);
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: rgba(34, 197, 94, 0.25);
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledSuccessRowText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledEmptyStateText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledHeroBalanceLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StyledHeroBalance = styled.Text`
  color: ${({ theme }) => theme.colors.heroForeground};
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
`;

export const StyledStatGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledStatCard = styled.View`
  flex: 1;
  min-width: 44%;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: 2px;
`;

export const StyledStatCardIconWrap = styled.View`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: rgba(255, 106, 0, 0.1);
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledStatCardValue = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 800;
`;

export const StyledStatCardLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 500;
`;

export const StyledAccountRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAccountRowLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex: 1;
`;

export const StyledAccountRowIcon = styled.View`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  align-items: center;
  justify-content: center;
`;

export const StyledAccountRowLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledAccountRowValue = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const StyledKycBadge = styled.View<{ verified: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ verified }) =>
    verified ? "rgba(16, 185, 129, 0.35)" : "rgba(251, 191, 36, 0.4)"};
  background-color: ${({ verified }) =>
    verified ? "rgba(16, 185, 129, 0.12)" : "rgba(251, 191, 36, 0.12)"};
  padding-vertical: 4px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledKycBadgeText = styled.Text<{ verified: boolean }>`
  color: ${({ theme, verified }) =>
    verified ? theme.colors.success : theme.colors.warning};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const StyledHeroStatBoxRow = styled.View`
  flex-direction: row;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.heroTileBorder};
  background-color: ${({ theme }) => theme.colors.heroTileBackground};
  overflow: hidden;
`;

export const StyledHeroStatBox = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: 2px;
`;

export const StyledHeroStatBoxDivider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.heroTileBorder};
  margin-vertical: 10px;
`;

export const StyledHeroStatBoxIconWrap = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.colors.heroChipBackground};
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

export const StyledHeroStatBoxValue = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileForeground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledHeroStatBoxLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledHomeActionsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledHomeActionItem = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.spacing.lg}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme }) => theme.colors.heroActionBackground};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.heroActionBorder};
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledHomeActionCircle = styled.View<{ $active?: boolean }>`
  align-items: center;
  justify-content: center;
`;

export const StyledHomeActionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroActionForeground};
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;
