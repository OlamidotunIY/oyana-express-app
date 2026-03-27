import styled from "styled-components/native";

export const StyledBadge = styled.View<{
  variant?: "default" | "secondary" | "destructive" | "outline";
}>`
  border-radius: ${({ theme }) => theme.radii.sm}px;
  padding-vertical: ${({ theme }) => theme.spacing.xxs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  align-self: flex-start;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, variant = "default" }) =>
    variant === "outline" ? theme.colors.border : "transparent"};
  background-color: ${({ theme, variant = "default" }) => {
    switch (variant) {
      case "secondary":
        return theme.colors.secondary;
      case "destructive":
        return theme.colors.destructive;
      case "outline":
        return "transparent";
      default:
        return theme.colors.primary;
    }
  }};
`;

export const StyledBadgeText = styled.Text<{
  variant?: "default" | "secondary" | "destructive" | "outline";
}>`
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 600;
  color: ${({ theme, variant = "default" }) => {
    switch (variant) {
      case "secondary":
        return theme.colors.secondaryForeground;
      case "destructive":
        return theme.colors.destructiveForeground;
      case "outline":
        return theme.colors.foreground;
      default:
        return theme.colors.primaryForeground;
    }
  }};
`;
