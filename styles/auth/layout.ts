import styled from "styled-components/native";

export const AuthTabBar = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.background};
  border-top-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const AuthTab = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 4px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const AuthTabText = styled.Text<{ active: boolean }>`
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 500;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.mutedForeground};
`;

export const AuthTabIndicator = styled.View`
  width: 20px;
  height: 3px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const AuthLayoutRoot = styled.View`
  flex: 1;
`;
