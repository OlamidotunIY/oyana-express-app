import React from "react";
import { Modal, Pressable, type PressableProps } from "react-native";
import styled from "styled-components/native";
import { asChildClone } from "./compose-press";
import { useControllableState } from "./use-controllable-state";

type OverlayContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const OverlayContext = React.createContext<OverlayContextValue | null>(null);

const StyledOverlayRoot = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.overlay};
  padding: ${({ theme }) => theme.spacing.lg}px;
  align-items: center;
`;

const StyledOverlayDismiss = styled.Pressable`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const StyledOverlayCard = styled.View`
  width: 100%;
  max-width: 420px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

export function useOverlayContext(name: string) {
  const context = React.useContext(OverlayContext);
  if (!context) {
    throw new Error(`${name} must be used inside overlay root.`);
  }
  return context;
}

export function OverlayRoot({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const [value, setValue] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <OverlayContext.Provider value={{ open: value, setOpen: setValue }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function OverlayTrigger({
  asChild,
  children,
  onPress,
  ...props
}: Omit<PressableProps, "children"> & {
  asChild?: boolean;
  children?: React.ReactNode;
}) {
  const { open, setOpen } = useOverlayContext("OverlayTrigger");

  const handlePress: PressableProps["onPress"] = (event) => {
    onPress?.(event);
    setOpen(!open);
  };

  if (asChild) {
    const cloned = asChildClone(children, handlePress, props.disabled);
    if (cloned) {
      return cloned;
    }
  }

  return (
    <Pressable {...props} onPress={handlePress}>
      {children}
    </Pressable>
  );
}

export function OverlayClose({
  asChild,
  children,
  onPress,
  ...props
}: Omit<PressableProps, "children"> & {
  asChild?: boolean;
  children?: React.ReactNode;
}) {
  const { setOpen } = useOverlayContext("OverlayClose");

  const handlePress: PressableProps["onPress"] = (event) => {
    onPress?.(event);
    setOpen(false);
  };

  if (asChild) {
    const cloned = asChildClone(children, handlePress, props.disabled);
    if (cloned) {
      return cloned;
    }
  }

  return (
    <Pressable {...props} onPress={handlePress}>
      {children}
    </Pressable>
  );
}

export function OverlayModal({
  children,
  align = "center",
  dismissOnOutsidePress = true,
  contentStyle,
  onRequestClose,
}: {
  children?: React.ReactNode;
  align?: "top" | "center" | "bottom";
  dismissOnOutsidePress?: boolean;
  contentStyle?: React.ComponentProps<typeof StyledOverlayCard>["style"];
  onRequestClose?: () => void;
}) {
  const { open, setOpen } = useOverlayContext("OverlayModal");

  if (!open) {
    return null;
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={open}
      onRequestClose={() => {
        onRequestClose?.();
        setOpen(false);
      }}
    >
      <StyledOverlayRoot
        style={{
          justifyContent:
            align === "top" ? "flex-start" : align === "bottom" ? "flex-end" : "center",
        }}
      >
        {dismissOnOutsidePress ? <StyledOverlayDismiss onPress={() => setOpen(false)} /> : null}
        <StyledOverlayCard style={contentStyle}>{children}</StyledOverlayCard>
      </StyledOverlayRoot>
    </Modal>
  );
}
