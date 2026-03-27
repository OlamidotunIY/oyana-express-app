import React from "react";
import { Label } from "./Label";
import { Separator } from "./Separator";
import
    {
        StyledField,
        StyledFieldContent,
        StyledFieldDescription,
        StyledFieldError,
        StyledFieldGroup,
        StyledFieldLegend,
        StyledFieldSeparatorWrap,
        StyledFieldSet,
        StyledFieldTitle,
    } from "@/styles";

export function FieldSet(props: React.ComponentProps<typeof StyledFieldSet>)
{
    return <StyledFieldSet {...props} />;
}

export function FieldLegend(
    props: React.ComponentProps<typeof StyledFieldLegend> & {
        variant?: "legend" | "label";
    },
)
{
    return <StyledFieldLegend {...props} />;
}

export function FieldGroup(props: React.ComponentProps<typeof StyledFieldGroup>)
{
    return <StyledFieldGroup {...props} />;
}

export function Field({
    orientation = "vertical",
    ...props
}: React.ComponentProps<typeof StyledField> & {
    orientation?: "vertical" | "horizontal" | "responsive";
})
{
    return <StyledField orientation={orientation} {...props} />;
}

export function FieldContent(props: React.ComponentProps<typeof StyledFieldContent>)
{
    return <StyledFieldContent {...props} />;
}

export function FieldLabel(props: React.ComponentProps<typeof Label>)
{
    return <Label {...props} />;
}

export function FieldTitle(props: React.ComponentProps<typeof StyledFieldTitle>)
{
    return <StyledFieldTitle {...props} />;
}

export function FieldDescription(props: React.ComponentProps<typeof StyledFieldDescription>)
{
    return <StyledFieldDescription {...props} />;
}

export function FieldSeparator({
    children,
    ...props
}: React.ComponentProps<typeof StyledFieldSeparatorWrap> & {
    children?: React.ReactNode;
})
{
    return (
        <StyledFieldSeparatorWrap {...props}>
            <Separator />
            {children ? <StyledFieldDescription>{children}</StyledFieldDescription> : null}
            <Separator />
        </StyledFieldSeparatorWrap>
    );
}

export function FieldError({
    children,
    errors,
    ...props
}: React.ComponentProps<typeof StyledFieldError> & {
    errors?: Array<{ message?: string } | undefined>;
})
{
    const messages = errors?.map((error) => error?.message).filter(Boolean) as
        | string[]
        | undefined;
    const content = children ?? (messages?.length ? messages.join("\n") : null);

    if (!content)
    {
        return null;
    }

    return <StyledFieldError {...props}>{content}</StyledFieldError>;
}
