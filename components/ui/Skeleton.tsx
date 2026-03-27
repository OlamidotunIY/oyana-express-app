import React from "react";
import { StyledSkeleton } from "@/styles";

export function Skeleton(props: React.ComponentProps<typeof StyledSkeleton>)
{
    return <StyledSkeleton {...props} />;
}
