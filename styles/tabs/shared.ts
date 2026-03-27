import styled from "styled-components/native";

export const TabScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TabScreenTitle = styled.Text`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const TabScreenSubtitle = styled.Text`
  font-size: 14px;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.mutedForeground};
`;
