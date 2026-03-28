import styled from "styled-components/native";

export const StyledManageAddressesScreen = styled.View`
  flex: 1;
`;

export const StyledManageAddressesRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.lg}px;
  padding-bottom: 96px;
`;

export const StyledManageAddressesLoadingWrap = styled.View`
  min-height: 56px;
  align-items: center;
  justify-content: center;
`;

export const StyledManageAddressesSection = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledManageAddressesSectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledManageAddressesList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledManageAddressesListRow = styled.View`
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledManageAddressesTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 600;
`;

export const StyledManageAddressesHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

export const StyledManageAddressesLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.xs}px;
  padding-vertical: 2px;
  align-self: flex-start;
`;

export const StyledManageAddressesFloatingButton = styled.Pressable<{
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

export const StyledManageAddressesSearchBox = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledManageAddressesInput = styled.TextInput`
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledManageAddressesLabelInput = styled.TextInput`
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledManageAddressesSuggestionList = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledManageAddressesSuggestionRow = styled.Pressable`
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  gap: 2px;
`;

export const StyledManageAddressesSuggestionMain = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 500;
`;

export const StyledManageAddressesSuggestionSub = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledManageAddressesFormSection = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledManageAddressesFieldLabel = styled.Text`
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 2px;
`;

export const StyledManageAddressesSelectedRow = styled.View`
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.md}px;
  padding: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.muted};
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledManageAddressesSelectedTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 600;
`;

export const StyledManageAddressesSelectedSub = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

export const StyledManageAddressesActions = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;
