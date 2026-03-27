import React from "react";
import
    {
        StyledCard,
        StyledCardContent,
        StyledCardDescription,
        StyledCardFooter,
        StyledCardHeader,
        StyledCardTitle,
    } from "@/styles";

export function Card(props: React.ComponentProps<typeof StyledCard>)
{
    return <StyledCard {...props} />;
}

export function CardHeader(props: React.ComponentProps<typeof StyledCardHeader>)
{
    return <StyledCardHeader {...props} />;
}

export function CardTitle(props: React.ComponentProps<typeof StyledCardTitle>)
{
    return <StyledCardTitle {...props} />;
}

export function CardDescription(props: React.ComponentProps<typeof StyledCardDescription>)
{
    return <StyledCardDescription {...props} />;
}

export function CardContent(props: React.ComponentProps<typeof StyledCardContent>)
{
    return <StyledCardContent {...props} />;
}

export function CardFooter(props: React.ComponentProps<typeof StyledCardFooter>)
{
    return <StyledCardFooter {...props} />;
}
