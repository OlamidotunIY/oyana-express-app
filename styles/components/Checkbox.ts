import styled from "styled-components/native";

export const StyledCheckbox = styled.Pressable<{ checked?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radii.sm}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : "transparent"};
  align-items: center;
  justify-content: center;
`;

export const StyledCheckboxIndicator = styled.View`
  width: 9px;
  height: 9px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.primaryForeground};
`;
