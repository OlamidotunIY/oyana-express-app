import React from "react";
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

    return (
        <StyledInputOTP {...props}>
            <StyledInputOTPHiddenInput
                keyboardType="number-pad"
                value={value}
                autoFocus
                maxLength={maxLength}
                onChangeText={(text) => onChange(text.replace(/[^0-9a-zA-Z]/g, "").slice(0, maxLength))}
                onSelectionChange={(event) => setActiveIndex(event.nativeEvent.selection.start)}
            />
            <OTPContext.Provider value={{ value, activeIndex }}>{children}</OTPContext.Provider>
        </StyledInputOTP>
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
