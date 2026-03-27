import styled from "styled-components/native";

export const StyledEditProfileRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledEditProfileLoadingWrap = styled.View`
  min-height: 56px;
  align-items: center;
  justify-content: center;
`;

export const StyledEditProfileForm = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledEditProfileLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
  text-transform: uppercase;
`;
