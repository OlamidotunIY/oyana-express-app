import styled from "styled-components/native";

export const StyledHeaderContainer = styled.View<{ $bg?: string }>`
  background-color: ${({ theme, $bg }) => $bg ?? theme.colors.background};
  shadow-color: #0f172a;
  shadow-offset: 0px 4px;
  shadow-opacity: ${({ $bg }) => ($bg ? 0 : 0.08)};
  shadow-radius: 12px;
  elevation: ${({ $bg }) => ($bg ? 0 : 4)};
`;

export const StyledHeaderContent = styled.View`
  min-height: 40px;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledBackButton = styled.Pressable<{
  $disabled: boolean;
  $colored?: boolean;
}>`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme, $colored }) =>
    $colored ? theme.colors.heroChipBorder : theme.colors.border};
  background-color: ${({ theme, $colored }) =>
    $colored ? theme.colors.heroChipBackground : theme.colors.muted};
  opacity: ${({ $disabled }) => ($disabled ? 0.45 : 1)};
`;

export const StyledMenuButton = styled(StyledBackButton)<{
  $colored?: boolean;
}>`
  margin-left: auto;
  ${({ $colored }) =>
    $colored
      ? `
    width: auto;
    height: auto;
    border-width: 0px;
    border-color: transparent;
    background-color: transparent;
    padding: 4px;
  `
      : ""}
`;

export const StyledHeaderTitle = styled.Text<{ $colored?: boolean }>`
  flex: 1;
  color: ${({ theme, $colored }) =>
    $colored ? theme.colors.heroForeground : theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md + 1}px;
  font-weight: 700;
  text-align: left;
`;

export const StyledProfileCard = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledProfileAvatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const StyledProfileAvatarText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledProfileText = styled.View`
  flex-shrink: 1;
  gap: 1px;
`;

export const StyledProfileGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.heroMutedForeground};
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
`;

export const StyledProfileName = styled.Text`
  color: ${({ theme }) => theme.colors.heroForeground};
  font-size: ${({ theme }) => theme.typography.md}px;
  line-height: 20px;
  font-weight: 700;
`;

export const StyledMenuItemRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledMenuItemLabel = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledHeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledNotificationWrapper = styled.View`
  position: relative;
`;

export const StyledNotificationBadge = styled.View`
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  padding-horizontal: 3px;
  z-index: 1;
`;

export const StyledNotificationBadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: 9px;
  font-weight: 700;
  line-height: 12px;
`;
