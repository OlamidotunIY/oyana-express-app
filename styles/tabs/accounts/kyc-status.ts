import styled from "styled-components/native";

export const StyledKycStatusRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledKycStatusLoadingWrap = styled.View`
  min-height: 56px;
  align-items: center;
  justify-content: center;
`;

export const StyledKycStatusSection = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledKycStatusSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledKycStatusHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledKycStatusList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledKycStatusListRow = styled.View`
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledKycStatusTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;
