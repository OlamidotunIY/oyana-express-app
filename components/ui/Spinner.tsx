import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";
import { SpinnerWrap } from "@/styles";

export function Spinner({ size = "small" }: { size?: "small" | "large" })
{
    const theme = useTheme();

    return (
        <SpinnerWrap>
            <ActivityIndicator size={size} color={theme.colors.primary} />
        </SpinnerWrap>
    );
}
