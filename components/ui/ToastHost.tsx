import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastStore } from "@/store/toastStore";
import
    {
        StyledToastCard,
        StyledToastHost,
        StyledToastMessage,
        StyledToastTitle,
    } from "@/styles";

export function ToastHost()
{
    const insets = useSafeAreaInsets();
    const toasts = useToastStore((state) => state.toasts);
    const dismissToast = useToastStore((state) => state.dismissToast);

    if (toasts.length === 0)
    {
        return null;
    }

    return (
        <StyledToastHost pointerEvents="box-none" style={{ top: insets.top + 8 }}>
            {toasts.map((toast) => (
                <StyledToastCard key={toast.id} tone={toast.tone} onPress={() => dismissToast(toast.id)}>
                    {toast.title ? <StyledToastTitle tone={toast.tone}>{toast.title}</StyledToastTitle> : null}
                    <StyledToastMessage tone={toast.tone}>{toast.message}</StyledToastMessage>
                </StyledToastCard>
            ))}
        </StyledToastHost>
    );
}
