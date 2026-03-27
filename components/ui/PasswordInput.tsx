import React, { useState } from "react";
import type { TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";
import { PasswordWrapper, PasswordEyeBtn, StyledInput } from "@/styles";

export function PasswordInput(props: Omit<TextInputProps, "secureTextEntry">)
{
    const [visible, setVisible] = useState(false);
    const theme = useTheme();

    return (
        <PasswordWrapper>
            <StyledInput
                placeholderTextColor="#9CA3AF"
                {...props}
                secureTextEntry={!visible}
                style={[{ paddingRight: 44 }, props.style as object]}
            />
            <PasswordEyeBtn onPress={() => setVisible((v) => !v)} activeOpacity={0.7}>
                <Ionicons
                    name={visible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={theme.colors.mutedForeground}
                />
            </PasswordEyeBtn>
        </PasswordWrapper>
    );
}
