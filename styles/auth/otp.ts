import styled from "styled-components/native";

export const OtpWrapper = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl + 8}px;
`;

export const OtpEmailHighlight = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 500;
`;
