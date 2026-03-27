import styled from "styled-components/native";
import type { ToastTone } from "@/store/toastStore";

export const StyledToastHost = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1000;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

export const StyledToastCard = styled.Pressable<{ tone: ToastTone }>`
  width: 100%;
  max-width: 640px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, tone }) => {
    if (tone === "error") return theme.colors.destructive;
    if (tone === "success") return theme.colors.success;
    return theme.colors.border;
  }};
  background-color: ${({ theme, tone }) => {
    if (tone === "error") return theme.colors.destructive;
    if (tone === "success") return theme.colors.success;
    return theme.colors.card;
  }};
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  padding-vertical: ${({ theme }) => theme.spacing.sm}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

export const StyledToastTitle = styled.Text<{ tone: ToastTone }>`
  color: ${({ theme, tone }) =>
    tone === "info" ? theme.colors.foreground : theme.colors.primaryForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

export const StyledToastMessage = styled.Text<{ tone: ToastTone }>`
  color: ${({ theme, tone }) =>
    tone === "info"
      ? theme.colors.mutedForeground
      : theme.colors.primaryForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;
