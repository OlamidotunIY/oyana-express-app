import React from "react";
import { StyledLabel } from "@/styles";

export const labelVariants = () => undefined;

export function Label(props: React.ComponentProps<typeof StyledLabel>)
{
    return <StyledLabel {...props} />;
}
