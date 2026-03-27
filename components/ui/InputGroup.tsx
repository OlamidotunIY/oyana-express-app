import React from "react";
import { Button, type ButtonProps } from "./Button";
import
    {
        StyledInputGroup,
        StyledInputGroupAddon,
        StyledInputGroupInput,
        StyledInputGroupText,
        StyledInputGroupTextarea,
    } from "@/styles";

export function InputGroup(props: React.ComponentProps<typeof StyledInputGroup>)
{
    return <StyledInputGroup {...props} />;
}

export function InputGroupAddon({
    align = "inline-start",
    ...props
}: React.ComponentProps<typeof StyledInputGroupAddon> & {
    align?: "inline-start" | "inline-end" | "block-start" | "block-end";
})
{
    return <StyledInputGroupAddon align={align} {...props} />;
}

const sizeMap: Record<"xs" | "sm" | "icon-xs" | "icon-sm", ButtonProps["size"]> = {
    xs: "xs",
    sm: "sm",
    "icon-xs": "icon-xs",
    "icon-sm": "icon-sm",
};

export function InputGroupButton({
    size = "xs",
    ...props
}: Omit<ButtonProps, "size"> & {
    size?: "xs" | "sm" | "icon-xs" | "icon-sm";
})
{
    return <Button size={sizeMap[size]} variant="ghost" {...props} />;
}

export function InputGroupText(props: React.ComponentProps<typeof StyledInputGroupText>)
{
    return <StyledInputGroupText {...props} />;
}

export function InputGroupInput(props: React.ComponentProps<typeof StyledInputGroupInput>)
{
    return <StyledInputGroupInput {...props} />;
}

export function InputGroupTextarea(props: React.ComponentProps<typeof StyledInputGroupTextarea>)
{
    return <StyledInputGroupTextarea {...props} />;
}
