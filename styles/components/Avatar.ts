import styled from "styled-components/native";

export const AVATAR_SIZES = {
  sm: 24,
  default: 32,
  lg: 40,
} as const;

export const StyledAvatar = styled.View<{ size?: keyof typeof AVATAR_SIZES }>`
  width: ${({ size = "default" }) => AVATAR_SIZES[size]}px;
  height: ${({ size = "default" }) => AVATAR_SIZES[size]}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.muted};
`;

export const StyledAvatarFallback = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 500;
`;

export const StyledAvatarBadge = styled.View`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const StyledAvatarGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledAvatarGroupCount = styled.View`
  margin-left: -8px;
  min-width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  align-items: center;
  justify-content: center;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.muted};
`;
