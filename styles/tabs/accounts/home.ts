import styled from "styled-components/native";

export const StyledAccountRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledAccountProfileHero = styled.View`
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

export const StyledAccountHeroGlowLarge = styled.View`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 110px;
  background-color: rgba(255, 106, 0, 0.25);
  top: -96px;
  right: -82px;
`;

export const StyledAccountHeroGlowSmall = styled.View`
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 65px;
  background-color: rgba(59, 130, 246, 0.2);
  bottom: -44px;
  left: -30px;
`;

export const StyledAccountHeroHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAccountHeroLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledAccountHeroChip = styled.Text`
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.heroChipBorder};
  background-color: ${({ theme }) => theme.colors.heroChipBackground};
  color: ${({ theme }) => theme.colors.heroChipForeground};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding-vertical: 3px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAccountLoadingWrap = styled.View`
  min-height: 44px;
  align-items: center;
  justify-content: center;
`;

export const StyledAccountIdentityRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAccountAvatarButton = styled.Pressable`
  position: relative;
`;

export const StyledAccountAvatar = styled.View`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.heroTileBorder};
  background-color: rgba(255, 106, 0, 0.9);
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const StyledAccountAvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const StyledAccountAvatarText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledAccountAvatarCameraBadge = styled.View`
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 22px;
  height: 22px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.heroSurface};
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const StyledAccountIdentityTextGroup = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

export const StyledAccountProfileName = styled.Text`
  color: ${({ theme }) => theme.colors.heroForeground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledAccountProfileMeta = styled.Text`
  color: ${({ theme }) => theme.colors.heroMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledAccountInfoPillsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAccountInfoPill = styled.View`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.heroTileBorder};
  background-color: ${({ theme }) => theme.colors.heroTileBackground};
  padding: ${({ theme }) => theme.spacing.sm}px;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

export const StyledAccountInfoPillLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledAccountInfoPillValue = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledAccountKpiRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAccountKpiTile = styled.View`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.heroTileBorder};
  background-color: ${({ theme }) => theme.colors.heroTileBackground};
  padding: ${({ theme }) => theme.spacing.sm}px;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

export const StyledAccountKpiValue = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileForeground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledAccountKpiLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  text-transform: uppercase;
  font-weight: 700;
`;

export const StyledAccountKpiHint = styled.Text`
  color: ${({ theme }) => theme.colors.heroMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledAccountSurfaceCard = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledAccountSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledAccountNavigationList = styled.View`
  gap: 0px;
`;

export const StyledAccountNavigationRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const StyledAccountNavigationLead = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAccountNavigationIconWrap = styled.View`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: rgba(255, 106, 0, 0.12);
  align-items: center;
  justify-content: center;
`;

export const StyledAccountNavigationTextGroup = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledAccountNavigationTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledAccountNavigationDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledAccountStatBoxRow = styled.View`
  flex-direction: row;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.heroTileBorder};
  background-color: ${({ theme }) => theme.colors.heroTileBackground};
  overflow: hidden;
`;

export const StyledAccountStatBox = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: 2px;
`;

export const StyledAccountStatBoxDivider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.heroTileBorder};
  margin-vertical: 10px;
`;

export const StyledAccountStatBoxIconWrap = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.colors.heroChipBackground};
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

export const StyledAccountStatBoxValue = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileForeground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledAccountStatBoxLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledAccountQuickActionsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledAccountQuickActionItem = styled.Pressable<{
  $active?: boolean;
}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.spacing.lg}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme, $active }) =>
    $active
      ? theme.colors.heroActionActiveBackground
      : theme.colors.heroActionBackground};
  border-width: 1px;
  border-color: ${({ theme, $active }) =>
    $active
      ? theme.colors.heroActionActiveBorder
      : theme.colors.heroActionBorder};
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledAccountQuickActionCircle = styled.View<{
  $active?: boolean;
}>`
  align-items: center;
  justify-content: center;
`;

export const StyledAccountQuickActionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroActionForeground};
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;
