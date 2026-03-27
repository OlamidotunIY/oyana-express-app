import styled from "styled-components/native";

export const StyledCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  shadow-color: #000;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  shadow-offset: 0px 2px;
  elevation: 2;
`;

export const StyledCardHeader = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledCardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.cardForeground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 600;
`;

export const StyledCardDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledCardContent = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-vertical: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledCardFooter = styled.View`
  padding-horizontal: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding-top: ${({ theme }) => theme.spacing.sm}px;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;
