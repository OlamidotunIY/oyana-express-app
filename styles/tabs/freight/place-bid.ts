import styled from "styled-components/native";

export const StyledPlaceBidScreen = styled.View`
  flex: 1;
`;

export const StyledPlaceBidRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export const StyledPlaceBidIntro = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledPlaceBidEyebrow = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledPlaceBidTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xl}px;
  font-weight: 700;
`;

export const StyledPlaceBidDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledPlaceBidLoadingWrap = styled.View`
  min-height: 64px;
  align-items: center;
  justify-content: center;
`;

export const StyledPlaceBidSummary = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledPlaceBidRouteRow = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledPlaceBidRouteLine = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledPlaceBidRouteIconWrap = styled.View`
  margin-top: 1px;
`;

export const StyledPlaceBidRouteText = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledPlaceBidValue = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 600;
`;

export const StyledPlaceBidActions = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledPlaceBidMissing = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;
