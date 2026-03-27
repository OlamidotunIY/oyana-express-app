import
{
  StyledDropdownContent,
  StyledDropdownGroup,
  StyledDropdownIndicator,
  StyledDropdownItem,
  StyledDropdownItemText,
  StyledDropdownLabel, StyledDropdownShortcut
} from "@/styles";
import React from "react";
import { Separator } from "./Separator";
import
{
  OverlayModal,
  OverlayRoot,
  OverlayTrigger, useOverlayContext
} from "./shared/overlay";

type RadioGroupContextValue = {
  value?: string;
  onValueChange?: (value: string) => void;
};

const DropdownRadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export function DropdownMenu(props: React.ComponentProps<typeof OverlayRoot>)
{
  return <OverlayRoot {...props} />;
}

export function DropdownMenuPortal({ children }: { children?: React.ReactNode })
{
  return <>{children}</>;
}

export function DropdownMenuTrigger(props: React.ComponentProps<typeof OverlayTrigger>)
{
  return <OverlayTrigger {...props} />;
}

export function DropdownMenuContent({
  children,
  style,
  ...props
}: React.ComponentProps<typeof StyledDropdownContent>)
{
  return (
    <OverlayModal
      align="top"
      contentStyle={[
        {
          marginTop: 64,
          maxWidth: 280,
          width: "92%",
        },
        style,
      ]}
    >
      <StyledDropdownContent {...props}>{children}</StyledDropdownContent>
    </OverlayModal>
  );
}

export function DropdownMenuGroup(props: React.ComponentProps<typeof StyledDropdownGroup>)
{
  return <StyledDropdownGroup {...props} />;
}

export function DropdownMenuItem({
  children,
  inset,
  onPress,
  ...props
}: Omit<React.ComponentProps<typeof StyledDropdownItem>, "children"> & {
  inset?: boolean;
  children?: React.ReactNode;
})
{
  const { setOpen } = useOverlayContext("DropdownMenuItem");

  return (
    <StyledDropdownItem
      {...props}
      inset={inset}
      onPress={(event) =>
      {
        onPress?.(event);
        setOpen(false);
      }}
    >
      {typeof children === "string" ? <StyledDropdownItemText>{children}</StyledDropdownItemText> : children}
    </StyledDropdownItem>
  );
}

export function DropdownMenuCheckboxItem({
  children,
  checked,
  onCheckedChange,
  onPress,
  ...props
}: Omit<React.ComponentProps<typeof StyledDropdownItem>, "children"> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
})
{
  const { setOpen } = useOverlayContext("DropdownMenuCheckboxItem");

  return (
    <StyledDropdownItem
      {...props}
      onPress={(event) =>
      {
        onPress?.(event);
        onCheckedChange?.(!checked);
        setOpen(false);
      }}
    >
      <StyledDropdownIndicator active={checked} />
      {typeof children === "string" ? <StyledDropdownItemText>{children}</StyledDropdownItemText> : children}
    </StyledDropdownItem>
  );
}

export function DropdownMenuRadioGroup({
  children,
  value,
  onValueChange,
}: {
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
})
{
  return (
    <DropdownRadioGroupContext.Provider value={{ value, onValueChange }}>
      <StyledDropdownGroup>{children}</StyledDropdownGroup>
    </DropdownRadioGroupContext.Provider>
  );
}

export function DropdownMenuRadioItem({
  children,
  value,
  onPress,
  ...props
}: Omit<React.ComponentProps<typeof StyledDropdownItem>, "children"> & {
  value: string;
  children?: React.ReactNode;
})
{
  const { setOpen } = useOverlayContext("DropdownMenuRadioItem");
  const context = React.useContext(DropdownRadioGroupContext);

  return (
    <StyledDropdownItem
      {...props}
      onPress={(event) =>
      {
        onPress?.(event);
        context?.onValueChange?.(value);
        setOpen(false);
      }}
    >
      <StyledDropdownIndicator active={context?.value === value} />
      {typeof children === "string" ? <StyledDropdownItemText>{children}</StyledDropdownItemText> : children}
    </StyledDropdownItem>
  );
}

export function DropdownMenuLabel({
  inset,
  ...props
}: React.ComponentProps<typeof StyledDropdownLabel> & { inset?: boolean })
{
  return <StyledDropdownLabel inset={inset} {...props} />;
}

export function DropdownMenuSeparator(props: React.ComponentProps<typeof Separator>)
{
  return <Separator {...props} />;
}

export function DropdownMenuShortcut(props: React.ComponentProps<typeof StyledDropdownShortcut>)
{
  return <StyledDropdownShortcut {...props} />;
}

export function DropdownMenuSub(props: React.ComponentProps<typeof OverlayRoot>)
{
  return <OverlayRoot {...props} />;
}

export function DropdownMenuSubTrigger(props: React.ComponentProps<typeof DropdownMenuItem>)
{
  return <DropdownMenuItem {...props} />;
}

export function DropdownMenuSubContent(props: React.ComponentProps<typeof DropdownMenuContent>)
{
  return <DropdownMenuContent {...props} />;
}
