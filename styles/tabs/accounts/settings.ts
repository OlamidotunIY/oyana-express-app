import styled from "styled-components/native";

export const StyledSettingsRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledSettingsSection = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledSettingsItemButton = styled.Pressable`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsItemLead = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsItemIconWrap = styled.View`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 106, 0, 0.12);
`;

export const StyledSettingsItemTextGroup = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledSettingsItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledSettingsItemDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledSettingsAvailabilityPanel = styled.View`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsAvailabilityHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsAvailabilityTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledSettingsAvailabilityBadge = styled.Text<{
  $isAvailable: boolean;
}>`
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, $isAvailable }) =>
    $isAvailable ? "rgba(16, 185, 129, 0.36)" : "rgba(245, 158, 11, 0.36)"};
  background-color: ${({ theme, $isAvailable }) =>
    $isAvailable ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)"};
  color: ${({ theme, $isAvailable }) =>
    $isAvailable ? theme.colors.success : theme.colors.warning};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding-vertical: 3px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsAvailabilityDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledSettingsAvailabilityMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;
