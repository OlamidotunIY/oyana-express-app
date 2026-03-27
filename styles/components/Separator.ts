import styled from "styled-components/native";

export const StyledSeparator = styled.View<{
  orientation?: "horizontal" | "vertical";
}>`
  background-color: ${({ theme }) => theme.colors.border};
  ${({ orientation = "horizontal" }) =>
    orientation === "vertical"
      ? "width: 1px; min-height: 100%; align-self: stretch;"
      : "height: 1px; width: 100%;"}
`;
