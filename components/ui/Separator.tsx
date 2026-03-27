import React from "react";
import { StyledSeparator } from "@/styles";

export type SeparatorProps = {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
    style?: React.ComponentProps<typeof StyledSeparator>["style"];
};

export function Separator({ orientation = "horizontal", style }: SeparatorProps)
{
    return <StyledSeparator orientation={orientation} style={style} />;
}
