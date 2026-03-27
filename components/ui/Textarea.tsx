import React from "react";
import type { TextInputProps } from "react-native";
import { StyledTextarea } from "@/styles";

export function Textarea(props: TextInputProps & { className?: string })
{
    return <StyledTextarea multiline numberOfLines={5} placeholderTextColor="#9CA3AF" {...props} />;
}
