import styled from "styled-components/native";

export const StyledButtonGroup = styled.View<{
  orientation?: "horizontal" | "vertical";
}>`
  flex-direction: ${({ orientation = "horizontal" }) =>
    orientation === "vertical" ? "column" : "row"};
  align-items: stretch;
`;

export const StyledButtonGroupText = styled.View`
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  align-items: center;
  justify-content: center;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;
