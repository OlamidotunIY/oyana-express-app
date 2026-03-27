import { StyledNativeSelect } from "@/styles";
import { Picker } from "@react-native-picker/picker";
import React from "react";

type NativeSelectOptionProps = {
    value: string;
    label?: string;
    children?: React.ReactNode;
};

export function NativeSelect({
    children,
    value,
    onValueChange,
    ...props
}: Omit<React.ComponentProps<typeof Picker>, "children" | "selectedValue"> & {
    children?: React.ReactNode;
    value?: string;
})
{
    const options = React.Children.toArray(children)
        .filter(React.isValidElement)
        .flatMap((child) =>
        {
            const element = child as React.ReactElement<NativeSelectOptionProps & { children?: React.ReactNode }>;

            if (element.type === NativeSelectOptGroup)
            {
                return React.Children.toArray(element.props.children).filter(React.isValidElement) as React.ReactElement<NativeSelectOptionProps>[];
            }

            return [element as React.ReactElement<NativeSelectOptionProps>];
        })
        .map((item) => ({
            label: item.props.label ?? String(item.props.children ?? item.props.value),
            value: item.props.value,
        }));

    return (
        <StyledNativeSelect>
            <Picker
                selectedValue={value}
                onValueChange={(nextValue) => onValueChange?.(nextValue, 0)}
                dropdownIconColor="#9CA3AF"
                {...props}
            >
                {options.map((option) => (
                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                ))}
            </Picker>
        </StyledNativeSelect>
    );
}

export function NativeSelectOption(_props: NativeSelectOptionProps)
{
    return null;
}

export function NativeSelectOptGroup({ children }: { label?: string; children?: React.ReactNode })
{
    return <>{children}</>;
}
