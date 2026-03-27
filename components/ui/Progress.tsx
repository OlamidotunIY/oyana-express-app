import React from "react";
import { StyledProgressFill, StyledProgressRoot } from "@/styles";

export function Progress({
    value = 0,
    ...props
}: React.ComponentProps<typeof StyledProgressRoot> & { value?: number })
{
    return (
        <StyledProgressRoot {...props}>
            <StyledProgressFill value={value} />
        </StyledProgressRoot>
    );
}
