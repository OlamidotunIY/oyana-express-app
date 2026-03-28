import styled from "styled-components/native";

export const StyledWalletRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledBalanceHero = styled.View`
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

export const StyledWalletHeroGlowLarge = styled.View`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 110px;
  background-color: rgba(255, 106, 0, 0.25);
  top: -88px;
  right: -72px;
`;

export const StyledWalletHeroGlowSmall = styled.View`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: rgba(59, 130, 246, 0.24);
  bottom: -38px;
  left: -26px;
`;

export const StyledHeroHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledWalletSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledHeroChip = styled.Text`
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

export const StyledBalanceAmount = styled.Text`
  color: ${({ theme }) => theme.colors.heroForeground};
  font-size: ${({ theme }) => theme.typography.xxl + 4}px;
  font-weight: 800;
`;

export const StyledHeroHint = styled.Text`
  color: ${({ theme }) => theme.colors.heroMutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledHeroStatsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledHeroStatTile = styled.View`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.heroTileBorder};
  background-color: ${({ theme }) => theme.colors.heroTileBackground};
  padding: ${({ theme }) => theme.spacing.sm}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledHeroStatValue = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileForeground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledHeroStatLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledHeroActionRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledHeroActionItem = styled.View`
  flex: 1;
`;

export const StyledSharedWalletNote = styled.Text`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledWalletSurfaceCard = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledWalletSectionHeading = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledNeutralChip = styled.Text`
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

export const StyledLoadingRow = styled.View`
  min-height: 44px;
  align-items: center;
  justify-content: center;
`;

export const StyledHelperText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledIssueList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledIssueRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: rgba(217, 119, 6, 0.32);
  background-color: rgba(217, 119, 6, 0.09);
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledIssueText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledTransactionList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledTransactionRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledTransactionIconWrap = styled.View`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  align-items: center;
  justify-content: center;
`;

export const StyledTransactionMain = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledTransactionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledTransactionMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledTransactionRight = styled.View`
  align-items: flex-end;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

export const StyledTransactionAmount = styled.Text<{ isCredit: boolean }>`
  color: ${({ theme, isCredit }) =>
    isCredit ? theme.colors.success : theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledTransactionStatus = styled.Text<{ isPending: boolean }>`
  color: ${({ theme, isPending }) =>
    isPending ? theme.colors.warning : theme.colors.mutedForeground};
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
`;

export const StyledWalletStatBoxRow = styled.View`
  flex-direction: row;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.heroTileBorder};
  background-color: ${({ theme }) => theme.colors.heroTileBackground};
  overflow: hidden;
`;

export const StyledWalletStatBox = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: 2px;
`;

export const StyledWalletStatBoxDivider = styled.View`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.heroTileBorder};
  margin-vertical: 10px;
`;

export const StyledWalletStatBoxIconWrap = styled.View`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  background-color: ${({ theme }) => theme.colors.heroChipBackground};
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`;

export const StyledWalletStatBoxValue = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileForeground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledWalletStatBoxLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroTileMutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledWalletActionsRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledWalletActionItem = styled.Pressable`
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

export const StyledWalletActionCircle = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StyledWalletActionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.heroActionForeground};
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

export const StyledCleanTransactionRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledTransactionRowDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
`;
