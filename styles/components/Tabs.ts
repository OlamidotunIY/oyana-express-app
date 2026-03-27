import styled from "styled-components/native";

export const StyledTabs = styled.View`
  width: 100%;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledTabsList = styled.View<{
  orientation?: "horizontal" | "vertical";
}>`
  flex-direction: ${({ orientation = "horizontal" }) =>
    orientation === "vertical" ? "column" : "row"};
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.xxs}px;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

export const StyledTabsTrigger = styled.Pressable<{ selected?: boolean }>`
  flex: 1;
  min-height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.background : "transparent"};
`;

export const StyledTabsTriggerText = styled.Text<{ selected?: boolean }>`
  color: ${({ theme, selected }) =>
    selected ? theme.colors.foreground : theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 500;
`;

export const StyledTabsContent = styled.View`
  width: 100%;
`;
