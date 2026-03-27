import React from "react";
import type { TextInputProps } from "react-native";
import { StyledInput } from "@/styles";

export function Input(props: TextInputProps & { className?: string })
{
    return <StyledInput placeholderTextColor="#9CA3AF" {...props} />;
}
