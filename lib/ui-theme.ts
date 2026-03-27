import type { DefaultTheme } from "styled-components/native";

const sharedTheme = {
  radii: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 999,
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
  },
  borderWidths: {
    thin: 1,
    thick: 2,
  },
  typography: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
};

export const lightTheme: DefaultTheme = {
  ...sharedTheme,
  colors: {
    background: "#FFFFFF",
    foreground: "#020817",
    card: "#FFFFFF",
    cardForeground: "#020817",
    popover: "#FFFFFF",
    popoverForeground: "#020817",
    primary: "#FF6A00",
    primaryForeground: "#F8FAFC",
    secondary: "#F1F5F9",
    secondaryForeground: "#0F172A",
    muted: "#F1F5F9",
    mutedForeground: "#64748B",
    accent: "#F1F5F9",
    accentForeground: "#0F172A",
    destructive: "#EF4444",
    destructiveForeground: "#F8FAFC",
    border: "#E2E8F0",
    input: "#E2E8F0",
    ring: "#020817",
    success: "#16A34A",
    warning: "#D97706",
    overlay: "rgba(15, 23, 42, 0.55)",
  },
};

export const darkTheme: DefaultTheme = {
  ...sharedTheme,
  colors: {
    background: "#020817",
    foreground: "#F8FAFC",
    card: "#020817",
    cardForeground: "#F8FAFC",
    popover: "#020817",
    popoverForeground: "#F8FAFC",
    primary: "#FF6A00",
    primaryForeground: "#F8FAFC",
    secondary: "#1E293B",
    secondaryForeground: "#F8FAFC",
    muted: "#1E293B",
    mutedForeground: "#94A3B8",
    accent: "#1E293B",
    accentForeground: "#F8FAFC",
    destructive: "#7F1D1D",
    destructiveForeground: "#F8FAFC",
    border: "#1E293B",
    input: "#1E293B",
    ring: "#CBD5E1",
    success: "#22C55E",
    warning: "#F59E0B",
    overlay: "rgba(0, 0, 0, 0.65)",
  },
};

export function getUiTheme(colorScheme?: "light" | "dark" | null) {
  return colorScheme === "dark" ? darkTheme : lightTheme;
}
