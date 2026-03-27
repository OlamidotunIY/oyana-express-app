import styled from "styled-components/native";

export const PasswordRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const EyeButton = styled.TouchableOpacity`
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
`;

export const EyeButtonText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;
