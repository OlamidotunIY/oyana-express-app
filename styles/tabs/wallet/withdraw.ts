import styled from "styled-components/native";

export const StyledWithdrawRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledWithdrawPanel = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledWithdrawSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledWithdrawLine = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledWithdrawHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledWithdrawWarning = styled.Text`
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledWithdrawLoadingWrap = styled.View`
  min-height: 56px;
  align-items: center;
  justify-content: center;
`;

export const StyledWithdrawAccountList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledWithdrawSelectable = styled.Pressable<{ selected: boolean }>`
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledWithdrawSaveRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;
