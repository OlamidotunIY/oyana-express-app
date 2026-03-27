import styled from "styled-components/native";

export const StyledKycUploadRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledKycUploadSection = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledKycUploadSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledKycUploadHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;
