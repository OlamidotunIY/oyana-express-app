import { TextInput } from "react-native";
import styled from "styled-components/native";

export const StyledInputOTP = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

export const StyledInputOTPGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const StyledInputOTPSlot = styled.View<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, active }) =>
    active ? theme.colors.ring : theme.colors.input};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledInputOTPSlotText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 500;
`;

export const StyledInputOTPHiddenInput = styled(TextInput)`
  position: absolute;
  opacity: 0;
`;

export const StyledInputOTPSeparator = styled.View`
  width: 12px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.mutedForeground};
`;
