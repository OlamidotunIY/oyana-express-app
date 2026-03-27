import React from "react";
import { StyledAlert, StyledAlertDescription, StyledAlertTitle } from "@/styles";

export function Alert({
    variant = "default",
    ...props
}: React.ComponentProps<typeof StyledAlert> & { variant?: "default" | "destructive" })
{
    return <StyledAlert variant={variant} {...props} />;
}

export function AlertTitle(props: React.ComponentProps<typeof StyledAlertTitle>)
{
    return <StyledAlertTitle {...props} />;
}

export function AlertDescription(props: React.ComponentProps<typeof StyledAlertDescription>)
{
    return <StyledAlertDescription {...props} />;
}
