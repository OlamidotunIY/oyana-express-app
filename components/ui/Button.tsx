import React from "react";
import type { PressableProps, TextStyle, ViewStyle } from "react-native";
import { asChildClone } from "./shared/compose-press";
import { BUTTON_SIZES, StyledButton, StyledButtonText } from "@/styles";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = keyof typeof BUTTON_SIZES;

export const buttonVariants = ({
  variant = "default",
  size = "default",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
} = {}) => ({ variant, size });

export type ButtonProps = Omit<PressableProps, "style"> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
};

export function Button({
  asChild = false,
  variant = "default",
  size = "default",
  fullWidth,
  style,
  textStyle,
  children,
  onPress,
  disabled,
  ...props
}: ButtonProps) {
  if (asChild) {
    const cloned = asChildClone(children, onPress, disabled);
    if (cloned) {
      return cloned;
    }
  }

  return (
    <StyledButton
      {...props}
      onPress={onPress}
      disabled={disabled}
      variant={variant}
      fullWidth={fullWidth}
      style={[BUTTON_SIZES[size], style]}
    >
      {typeof children === "string" ? (
        <StyledButtonText variant={variant} size={size} style={textStyle}>
          {children}
        </StyledButtonText>
      ) : (
        children
      )}
    </StyledButton>
  );
}
