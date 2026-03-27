import React from "react";
import type { PressableProps } from "react-native";

export function composePressHandlers(
  first?: PressableProps["onPress"],
  second?: PressableProps["onPress"],
): PressableProps["onPress"] {
  return (event) => {
    first?.(event);
    second?.(event);
  };
}

export function asChildClone(
  child: React.ReactNode,
  onPress?: PressableProps["onPress"],
  disabled?: boolean | null,
) {
  if (!React.isValidElement(child)) {
    return null;
  }

  const typedChild = child as React.ReactElement<{
    onPress?: PressableProps["onPress"];
    disabled?: boolean;
  }>;

  return React.cloneElement(typedChild, {
    onPress: composePressHandlers(typedChild.props.onPress, onPress),
    disabled: disabled ?? typedChild.props.disabled,
  });
}
