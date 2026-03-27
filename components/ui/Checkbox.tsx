import React from "react";
import { useControllableState } from "./shared/use-controllable-state";
import { StyledCheckbox, StyledCheckboxIndicator } from "@/styles";

export type CheckboxProps = React.ComponentProps<typeof StyledCheckbox> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox = React.forwardRef<
    React.ElementRef<typeof StyledCheckbox>,
    CheckboxProps
>(({ checked, defaultChecked = false, onCheckedChange, onPress, ...props }, ref) =>
{
    const [value, setValue] = useControllableState<boolean>({
        value: checked,
        defaultValue: defaultChecked,
        onChange: onCheckedChange,
    });

    return (
        <StyledCheckbox
            {...props}
            ref={ref}
            checked={value}
            onPress={(event) =>
            {
                onPress?.(event);
                setValue(!value);
            }}
        >
            {value ? <StyledCheckboxIndicator /> : null}
        </StyledCheckbox>
    );
});

Checkbox.displayName = "Checkbox";
