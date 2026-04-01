import React from "react";
import { TextInput, View } from "react-native";
import
{
    StyledInputOTP,
    StyledInputOTPGroup,
    StyledInputOTPHiddenInput,
    StyledInputOTPSeparator,
    StyledInputOTPSlot,
    StyledInputOTPSlotText,
} from "@/styles";

const OTPContext = React.createContext<{
    value: string;
    activeIndex: number;
} | null>(null);

export function InputOTP({
    value,
    onChange,
    maxLength,
    children,
    ...props
}: {
    value: string;
    onChange: (value: string) => void;
    maxLength: number;
    containerClassName?: string;
    children?: React.ReactNode;
} & React.ComponentProps<typeof StyledInputOTP>)
{
    const [activeIndex, setActiveIndex] = React.useState(0);
    const inputRef = React.useRef<TextInput>(null);

    return (
        <View style={{ position: "relative" }}>
            <StyledInputOTP {...props} pointerEvents="none">
                <OTPContext.Provider value={{ value, activeIndex }}>{children}</OTPContext.Provider>
            </StyledInputOTP>
            <StyledInputOTPHiddenInput
                ref={inputRef}
                keyboardType="number-pad"
                value={value}
                autoFocus
                caretHidden
                maxLength={maxLength}
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, "").slice(0, maxLength))}
                onSelectionChange={(event) => setActiveIndex(event.nativeEvent.selection.start)}
            />
        </View>
    );
}

export function InputOTPGroup(props: React.ComponentProps<typeof StyledInputOTPGroup>)
{
    return <StyledInputOTPGroup {...props} />;
}

export function InputOTPSlot({
    index,
    ...props
}: React.ComponentProps<typeof StyledInputOTPSlot> & {
    index: number;
})
{
    const context = React.useContext(OTPContext);
    const char = context?.value[index] ?? "";
    const active = context?.activeIndex === index;

    return (
        <StyledInputOTPSlot active={active} {...props}>
            <StyledInputOTPSlotText>{char}</StyledInputOTPSlotText>
        </StyledInputOTPSlot>
    );
}

export function InputOTPSeparator(props: React.ComponentProps<typeof StyledInputOTPSeparator>)
{
    return <StyledInputOTPSeparator {...props} />;
}
