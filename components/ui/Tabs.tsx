import React from "react";
import { useControllableState } from "./shared/use-controllable-state";
import
    {
        StyledTabs,
        StyledTabsContent,
        StyledTabsList,
        StyledTabsTrigger,
        StyledTabsTriggerText,
    } from "@/styles";

const TabsContext = React.createContext<{
    value: string;
    setValue: (value: string) => void;
} | null>(null);

export const tabsListVariants = ({
    orientation = "horizontal",
}: {
    orientation?: "horizontal" | "vertical";
} = {}) => ({ orientation });

export function Tabs({
    value,
    defaultValue,
    onValueChange,
    children,
    ...props
}: React.ComponentProps<typeof StyledTabs> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
})
{
    const [currentValue, setCurrentValue] = useControllableState<string>({
        value,
        defaultValue: defaultValue ?? "",
        onChange: onValueChange,
    });

    return (
        <TabsContext.Provider value={{ value: currentValue, setValue: setCurrentValue }}>
            <StyledTabs {...props}>{children}</StyledTabs>
        </TabsContext.Provider>
    );
}

export function TabsList({
    orientation = "horizontal",
    ...props
}: React.ComponentProps<typeof StyledTabsList> & {
    orientation?: "horizontal" | "vertical";
})
{
    return <StyledTabsList orientation={orientation} {...props} />;
}

export function TabsTrigger({
    value,
    onPress,
    children,
    ...props
}: React.ComponentProps<typeof StyledTabsTrigger> & {
    value: string;
})
{
    const context = React.useContext(TabsContext);
    const selected = context?.value === value;

    return (
        <StyledTabsTrigger
            {...props}
            selected={selected}
            onPress={(event) =>
            {
                onPress?.(event);
                context?.setValue(value);
            }}
        >
            {typeof children === "string" ? (
                <StyledTabsTriggerText selected={selected}>{children}</StyledTabsTriggerText>
            ) : (
                children
            )}
        </StyledTabsTrigger>
    );
}

export function TabsContent({
    value,
    children,
    ...props
}: React.ComponentProps<typeof StyledTabsContent> & {
    value: string;
})
{
    const context = React.useContext(TabsContext);

    if (!context || context.value !== value)
    {
        return null;
    }

    return <StyledTabsContent {...props}>{children}</StyledTabsContent>;
}
