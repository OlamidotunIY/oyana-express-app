import styled from "styled-components/native";

export const StyledSupportRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledSupportSection = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledSupportSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledSupportTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledSupportHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;
