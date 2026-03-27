import { BidStatus } from "@/gql/graphql";
import styled from "styled-components/native";

const getBidStatusPillColors = (status: BidStatus) => {
  if (status === BidStatus.Accepted) {
    return {
      background: "success",
      border: "success",
      text: "primaryForeground",
    } as const;
  }
  if (status === BidStatus.Active) {
    return {
      background: "primary",
      border: "primary",
      text: "primaryForeground",
    } as const;
  }
  if (status === BidStatus.Rejected) {
    return {
      background: "destructive",
      border: "destructive",
      text: "destructiveForeground",
    } as const;
  }
  return {
    background: "muted",
    border: "border",
    text: "mutedForeground",
  } as const;
};

export const StyledBidStatusPill = styled.View<{ status: BidStatus }>`
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, status }) =>
    theme.colors[getBidStatusPillColors(status).border]};
  background-color: ${({ theme, status }) =>
    theme.colors[getBidStatusPillColors(status).background]};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledBidStatusText = styled.Text<{ status: BidStatus }>`
  color: ${({ theme, status }) =>
    theme.colors[getBidStatusPillColors(status).text]};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

export const StyledDetailMetaLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const StyledDetailActionsWrap = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;
