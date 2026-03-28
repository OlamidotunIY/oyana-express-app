import sc from "styled-components/native";

export const StyledSettingsRoot = sc.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledSettingsSection = sc.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsSectionLabel = sc.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledSettingsPanel = sc.View`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsPanelHeader = sc.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsPanelTextGroup = sc.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledSettingsPanelTitle = sc.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledSettingsPanelDescription = sc.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledSettingsPanelMeta = sc.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledSettingsStatusBadge = sc.Text<{
  $tone: "success" | "warning" | "muted";
}>`
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ $tone }) =>
    $tone === "success"
      ? "rgba(16, 185, 129, 0.36)"
      : $tone === "warning"
        ? "rgba(245, 158, 11, 0.36)"
        : "rgba(148, 163, 184, 0.28)"};
  background-color: ${({ $tone }) =>
    $tone === "success"
      ? "rgba(16, 185, 129, 0.12)"
      : $tone === "warning"
        ? "rgba(245, 158, 11, 0.12)"
        : "rgba(148, 163, 184, 0.12)"};
  color: ${({ theme, $tone }) =>
    $tone === "success"
      ? theme.colors.success
      : $tone === "warning"
        ? theme.colors.warning
        : theme.colors.mutedForeground};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding-vertical: 3px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsSwitchRow = sc.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledSettingsThemeOptionsRow = sc.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledSettingsThemeOptionButton = sc.Pressable<{
  $selected: boolean;
}>`
  flex: 1;
  min-height: 42px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, $selected }) =>
    $selected ? "rgba(255, 106, 0, 0.12)" : theme.colors.background};
  align-items: center;
  justify-content: center;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledSettingsThemeOptionText = sc.Text<{
  $selected: boolean;
}>`
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;
