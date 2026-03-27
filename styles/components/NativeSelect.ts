import styled from "styled-components/native";

export const StyledNativeSelect = styled.View`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.input};
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;