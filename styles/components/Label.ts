import styled from "styled-components/native";

export const StyledLabel = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 500;
`;
