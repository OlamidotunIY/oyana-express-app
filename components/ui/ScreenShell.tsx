import
{
  StyledKeyboardWrap,
  StyledShellBottom,
  StyledShellContent,
  StyledShellSafeArea,
  StyledShellScroll,
  StyledShellTop,
} from "@/styles";
import React from "react";
import
{
  Platform,
  type ScrollViewProps,
  type ViewStyle,
  type ViewProps,
} from "react-native";

type ScreenShellProps = {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  children?: React.ReactNode;
  scrollProps?: ScrollViewProps;
  contentProps?: ViewProps;
  contentJustify?: ViewStyle["justifyContent"];
  safeAreaEdges?: React.ComponentProps<typeof StyledShellSafeArea>["edges"];
  stickyTop?: React.ReactNode;
};

export function ScreenShell({
  top,
  bottom,
  children,
  scrollProps,
  contentProps,
  contentJustify,
  safeAreaEdges,
  stickyTop,
}: ScreenShellProps)
{
  const shouldRenderTop = React.useMemo(() =>
  {
    if (!top)
    {
      return false;
    }

    if (React.isValidElement(top) && typeof top.type === "function")
    {
      if (top.type.name === "ScreenHeader")
      {
        return false;
      }
    }

    return true;
  }, [top]);

  return (
    <StyledShellSafeArea edges={safeAreaEdges ?? ["left", "right", "bottom"]}>
      <StyledKeyboardWrap behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {stickyTop ?? null}
        <StyledShellScroll
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          {...scrollProps}
        >
          <StyledShellContent
            {...contentProps}
            style={[
              contentProps?.style,
              contentJustify ? { justifyContent: contentJustify } : null,
            ]}
          >
            {shouldRenderTop ? <StyledShellTop>{top}</StyledShellTop> : null}
            {children}
            {bottom ? <StyledShellBottom>{bottom}</StyledShellBottom> : null}
          </StyledShellContent>
        </StyledShellScroll>
      </StyledKeyboardWrap>
    </StyledShellSafeArea>
  );
}
