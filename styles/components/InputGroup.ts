import styled from "styled-components/native";
import { StyledInput } from "./Input";
import { StyledTextarea } from "./Textarea";

export const StyledInputGroup = styled.View`
  width: 100%;
  min-height: 40px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.input};
  background-color: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

export const StyledInputGroupAddon = styled.Pressable<{
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
}>`
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  ${({ align }) => (align === "inline-end" ? "margin-left: auto;" : "")}
`;

export const StyledInputGroupText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
`;

export const StyledInputGroupInput = styled(StyledInput)`
  flex: 1;
  border-width: 0px;
  border-radius: 0px;
`;

export const StyledInputGroupTextarea = styled(StyledTextarea)`
  flex: 1;
  border-width: 0px;
  border-radius: 0px;
`;
