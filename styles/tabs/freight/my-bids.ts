import { BidStatus } from "@/gql/graphql";
import styled from "styled-components/native";

const getBidPillColors = (status: BidStatus) => {
  if (status === BidStatus.Accepted) {
    return {
      background: "success",
      border: "success",
      text: "primaryForeground",
    } as const;
  }

  if (status === BidStatus.Rejected || status === BidStatus.Withdrawn) {
    return {
      background: "warning",
      border: "warning",
      text: "primaryForeground",
    } as const;
  }

  return {
    background: "muted",
    border: "border",
    text: "foreground",
  } as const;
};

export const StyledMyBidsScreen = styled.View`
  flex: 1;
`;

export const StyledMyBidsRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export const StyledMyBidsHero = styled.View`
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  background-color: #0f2742;
  padding-top: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.xl}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xl}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledMyBidsIntro = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledMyBidsEyebrow = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledMyBidsTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xl}px;
  font-weight: 700;
`;

export const StyledMyBidsDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledMyBidsHeroDescription = styled.Text`
  color: rgba(241, 245, 249, 0.82);
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledMyBidsStatRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledMyBidsStatTile = styled.View`
  flex: 1;
  min-width: 110px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: rgba(255, 255, 255, 0.12);
  background-color: rgba(255, 255, 255, 0.08);
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: 2px;
`;

export const StyledMyBidsStatValue = styled.Text`
  color: #ffffff;
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledMyBidsStatLabel = styled.Text`
  color: rgba(241, 245, 249, 0.78);
  font-size: ${({ theme }) => theme.typography.xs}px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledMyBidsLoadingWrap = styled.View`
  min-height: 64px;
  align-items: center;
  justify-content: center;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledMyBidsList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledMyBidsCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledMyBidsCardAccent = styled.View<{ status: BidStatus }>`
  height: 4px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme, status }) => {
    const palette = getBidPillColors(status);
    return theme.colors[palette.border];
  }};
`;

export const StyledMyBidsCardHead = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledMyBidsCardMain = styled.View`
  flex: 1;
  gap: 2px;
`;

export const StyledMyBidsCardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledMyBidsCardMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledMyBidsAmount = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 600;
`;

export const StyledMyBidsMessage = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledMyBidsMetaGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledMyBidsMetaTile = styled.View`
  flex: 1;
  min-width: 120px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.sm}px;
  gap: 2px;
`;

export const StyledMyBidsMetaLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledMyBidsMetaValue = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 600;
`;

export const StyledMyBidsStatusPill = styled.View<{ status: BidStatus }>`
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, status }) => {
    const palette = getBidPillColors(status);
    return theme.colors[palette.border];
  }};
  background-color: ${({ theme, status }) => {
    const palette = getBidPillColors(status);
    return theme.colors[palette.background];
  }};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledMyBidsStatusText = styled.Text<{ status: BidStatus }>`
  color: ${({ theme, status }) => {
    const palette = getBidPillColors(status);
    return theme.colors[palette.text];
  }};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

export const StyledMyBidsActions = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledMyBidsEmpty = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
`;
