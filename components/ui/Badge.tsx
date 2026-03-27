import React from "react";
import { StyledBadge, StyledBadgeText } from "@/styles";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export const badgeVariants = ({ variant = "default" }: { variant?: BadgeVariant } = {}) => ({
    variant,
});

export interface BadgeProps extends React.ComponentProps<typeof StyledBadge>
{
    variant?: BadgeVariant;
    label?: string;
    children?: React.ReactNode;
}

export function Badge({ variant = "default", label, children, ...props }: BadgeProps)
{
    return (
        <StyledBadge variant={variant} {...props}>
            {typeof children === "string" || label ? (
                <StyledBadgeText variant={variant}>{label ?? children}</StyledBadgeText>
            ) : (
                children
            )}
        </StyledBadge>
    );
}
