import styled from "styled-components/native";

export const StyledUploadProfileImageRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledUploadProfileImageSection = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledUploadProfileImageSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledUploadProfileImageTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

export const StyledUploadProfileImageHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;
