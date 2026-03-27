import { TextInput } from "react-native";
import styled from "styled-components/native";

export const StyledTextarea = styled(TextInput)`
  width: 100%;
  min-height: 96px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.input};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  text-align-vertical: top;
  font-size: ${({ theme }) => theme.typography.sm}px;
`;
