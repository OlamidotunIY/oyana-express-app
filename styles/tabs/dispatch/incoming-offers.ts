import styled from "styled-components/native";

export const StyledIncomingDispatchOverlayRoot = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const StyledIncomingDispatchBackdrop = styled.Pressable`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

export const StyledIncomingDispatchSheet = styled.View`
  border-top-left-radius: ${({ theme }) => theme.radii.xl + 8}px;
  border-top-right-radius: ${({ theme }) => theme.radii.xl + 8}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
  shadow-color: #0f172a;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;
  elevation: 6;
`;

export const StyledIncomingDispatchHeader = styled.View`
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledIncomingDispatchEyebrow = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledIncomingDispatchTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xl}px;
  font-weight: 700;
`;

export const StyledIncomingDispatchDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

export const StyledIncomingDispatchList = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledIncomingDispatchCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledIncomingDispatchCardHead = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledIncomingDispatchCardTitle = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

export const StyledIncomingDispatchMetaRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledIncomingDispatchMetaChip = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme }) => theme.colors.muted};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledIncomingDispatchMetaText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
`;

export const StyledIncomingDispatchActions = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledIncomingDispatchActionItem = styled.View`
  flex: 1;
`;
export const StyledIncomingDispatchSecondaryActions = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;
