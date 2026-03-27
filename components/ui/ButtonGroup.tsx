import React from "react";
import { Separator } from "./Separator";
import { StyledButtonGroup, StyledButtonGroupText } from "@/styles";

export const buttonGroupVariants = ({
    orientation = "horizontal",
}: {
    orientation?: "horizontal" | "vertical";
} = {}) => ({ orientation });

export function ButtonGroup({
    orientation = "horizontal",
    ...props
}: React.ComponentProps<typeof StyledButtonGroup> & {
    orientation?: "horizontal" | "vertical";
})
{
    return <StyledButtonGroup orientation={orientation} {...props} />;
}

export function ButtonGroupText(props: React.ComponentProps<typeof StyledButtonGroupText>)
{
    return <StyledButtonGroupText {...props} />;
}

export function ButtonGroupSeparator({
    orientation = "vertical",
    ...props
}: React.ComponentProps<typeof Separator>)
{
    return <Separator orientation={orientation} {...props} />;
}
