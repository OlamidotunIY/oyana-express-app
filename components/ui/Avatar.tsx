import React from "react";
import { Image } from "react-native";
import
    {
        AVATAR_SIZES,
        StyledAvatar,
        StyledAvatarBadge,
        StyledAvatarFallback,
        StyledAvatarGroup,
        StyledAvatarGroupCount,
    } from "@/styles";

export function Avatar({
    size = "default",
    children,
    ...props
}: React.ComponentProps<typeof StyledAvatar> & {
    size?: keyof typeof AVATAR_SIZES;
})
{
    return (
        <StyledAvatar size={size} {...props}>
            {children}
        </StyledAvatar>
    );
}

export function AvatarImage(props: React.ComponentProps<typeof Image>)
{
    return <Image style={[{ width: "100%", height: "100%" }, props.style]} {...props} />;
}

export function AvatarFallback(props: React.ComponentProps<typeof StyledAvatarFallback>)
{
    return <StyledAvatarFallback {...props} />;
}

export function AvatarBadge(props: React.ComponentProps<typeof StyledAvatarBadge>)
{
    return <StyledAvatarBadge {...props} />;
}

export function AvatarGroup(props: React.ComponentProps<typeof StyledAvatarGroup>)
{
    return <StyledAvatarGroup {...props} />;
}

export function AvatarGroupCount({
    children,
    ...props
}: React.ComponentProps<typeof StyledAvatarGroupCount>)
{
    return (
        <StyledAvatarGroupCount {...props}>
            <StyledAvatarFallback>{children}</StyledAvatarFallback>
        </StyledAvatarGroupCount>
    );
}
