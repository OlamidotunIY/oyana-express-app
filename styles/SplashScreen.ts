import styled from "styled-components/native";

export const SplashContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadingWrapper = styled.View`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
`;
