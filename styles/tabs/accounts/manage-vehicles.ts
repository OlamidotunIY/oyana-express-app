import styled from "styled-components/native";

export const StyledManageVehiclesScreen = styled.View`
  flex: 1;
`;

export const StyledManageVehiclesRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: 96px;
`;

export const StyledManageVehiclesLoadingWrap = styled.View`
  min-height: 56px;
  align-items: center;
  justify-content: center;
`;

export const StyledManageVehiclesSection = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledManageVehiclesSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const StyledManageVehiclesHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledManageVehiclesList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledManageVehiclesListRow = styled.View`
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledManageVehiclesTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledManageVehiclesFloatingButton = styled.Pressable<{
  $bottom: number;
}>`
  position: absolute;
  right: 20px;
  bottom: ${({ $bottom }) => $bottom}px;
  width: 54px;
  height: 54px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  elevation: 4;
`;
