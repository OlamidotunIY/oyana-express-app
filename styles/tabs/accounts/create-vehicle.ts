import styled from "styled-components/native";

export const StyledCreateVehicleRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

export const StyledCreateVehicleForm = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledCreateVehicleSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledCreateVehicleLabel = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const StyledCreateVehicleCategoryRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledCreateVehicleCategoryOption = styled.Pressable<{
  $active: boolean;
}>`
  flex: 1;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, $active }) =>
    $active ? "rgba(255, 106, 0, 0.14)" : theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md}px;
  min-height: 42px;
  align-items: center;
  justify-content: center;
`;

export const StyledCreateVehicleCategoryOptionText = styled.Text<{
  $active: boolean;
}>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;
