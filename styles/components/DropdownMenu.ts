import styled from "styled-components/native";

export const StyledDropdownContent = styled.View`
  width: 100%;
  min-width: 220px;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

export const StyledDropdownGroup = styled.View`
  width: 100%;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

export const StyledDropdownItem = styled.Pressable<{ inset?: boolean }>`
  min-height: 36px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-horizontal: ${({ theme, inset }) => (inset ? theme.spacing.xl : theme.spacing.sm)}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledDropdownItemText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledDropdownLabel = styled.Text<{ inset?: boolean }>`
  padding-horizontal: ${({ theme, inset }) => (inset ? theme.spacing.xl : theme.spacing.sm)}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const StyledDropdownShortcut = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledDropdownIndicator = styled.View<{ active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : "transparent"};
`;
