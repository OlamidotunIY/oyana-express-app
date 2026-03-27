import styled from "styled-components/native";

export const NameRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const NameField = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs + 2}px;
`;

export const StateRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex-wrap: wrap;
`;

export const StateChip = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.spacing.sm + 2}px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.background};
`;

export const StateChipText = styled.Text<{ active: boolean }>`
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 500;
  color: ${({ theme, active }) =>
    active ? theme.colors.primaryForeground : theme.colors.mutedForeground};
`;
