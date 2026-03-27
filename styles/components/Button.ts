import styled from "styled-components/native";

export const BUTTON_SIZES = {
  default: { minHeight: 40, paddingHorizontal: 16, paddingVertical: 10 },
  xs: { minHeight: 28, paddingHorizontal: 10, paddingVertical: 6 },
  sm: { minHeight: 34, paddingHorizontal: 14, paddingVertical: 8 },
  lg: { minHeight: 44, paddingHorizontal: 22, paddingVertical: 12 },
  icon: { width: 40, height: 40 },
  "icon-xs": { width: 28, height: 28 },
  "icon-sm": { width: 34, height: 34 },
  "icon-lg": { width: 44, height: 44 },
} as const;

export const StyledButton = styled.Pressable<{
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  fullWidth?: boolean;
}>`
  border-radius: ${({ theme }) => theme.radii.md}px;
  border-width: ${({ theme, variant }) => (variant === "outline" ? theme.borderWidths.thin : 0)}px;
  border-color: ${({ theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xs}px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  background-color: ${({ theme, variant = "default" }) => {
    switch (variant) {
      case "destructive":
        return theme.colors.destructive;
      case "secondary":
        return theme.colors.secondary;
      case "outline":
      case "ghost":
      case "link":
        return "transparent";
      default:
        return theme.colors.primary;
    }
  }};
`;

export const StyledButtonText = styled.Text<{
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg";
}>`
  font-size: ${({ theme, size = "default" }) =>
    size === "xs" || size === "icon-xs" ? theme.typography.xs : theme.typography.sm}px;
  font-weight: 600;
  color: ${({ theme, variant = "default" }) => {
    switch (variant) {
      case "destructive":
        return theme.colors.destructiveForeground;
      case "secondary":
        return theme.colors.secondaryForeground;
      case "outline":
      case "ghost":
        return theme.colors.foreground;
      case "link":
        return theme.colors.primary;
      default:
        return theme.colors.primaryForeground;
    }
  }};
  text-decoration-line: ${({ variant }) => (variant === "link" ? "underline" : "none")};
`;
