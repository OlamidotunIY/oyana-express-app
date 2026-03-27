import styled from "styled-components/native";

export const StyledFundRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledFundPanel = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledFundSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledFundCardList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledFundSelectable = styled.Pressable<{ selected: boolean }>`
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledFundSelectableLine = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledFundSelectableHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledFundWarning = styled.Text`
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledFundLoadingWrap = styled.View`
  min-height: 56px;
  align-items: center;
  justify-content: center;
`;
