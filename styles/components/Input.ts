import { TextInput } from "react-native";
import styled from "styled-components/native";

export const StyledInput = styled(TextInput)`
  width: 100%;
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.input};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const PasswordWrapper = styled.View`
  width: 100%;
  position: relative;
`;

export const PasswordEyeBtn = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;
