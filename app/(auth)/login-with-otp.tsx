import React, { useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { REQUEST_OTP_MUTATION } from "@/graphql";
import type { RequestOtpMutation, RequestOtpMutationVariables } from "@/gql/graphql";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { parseAuthError } from "@/lib/session";
import { useToastStore } from "@/store/toastStore";
import
{
    AuthKeyboardAvoiding,
    AuthScrollView,
    AuthContent,
    AuthHeader,
    AuthTitle,
    AuthSubtitle,
    AuthForm,
    AuthField,
    AuthLabel,
} from "@/styles";

export default function LoginWithOtp()
{
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const showToast = useToastStore((s) => s.showToast);

    const [email, setEmail] = useState("");

    const [requestOtp, { loading }] = useMutation<RequestOtpMutation, RequestOtpMutationVariables>(REQUEST_OTP_MUTATION);

    async function handleRequestOtp()
    {
        if (!email.trim())
        {
            showToast({ message: "Please enter your email address.", tone: "error" });
            return;
        }

        try
        {
            const { data } = await requestOtp({
                variables: {
                    input: { email: email.trim().toLowerCase(), mode: "login" },
                },
            });

            if (data?.requestOtp?.success)
            {
                router.push({
                    pathname: "/(auth)/verify-otp",
                    params: { email: email.trim().toLowerCase() },
                });
            }
            else
            {
                showToast({
                    message: data?.requestOtp?.message ?? "Failed to send OTP.",
                    tone: "error",
                });
            }
        }
        catch (err)
        {
            showToast({
                message: parseAuthError(err, "Failed to send OTP. Please try again."),
                tone: "error",
            });
        }
    }

    return (
        <AuthKeyboardAvoiding behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <AuthScrollView
                contentContainerStyle={{ paddingTop: insets.top + 32 }}
                keyboardShouldPersistTaps="handled"
            >
                <AuthContent>
                    <AuthHeader>
                        <AuthTitle>Sign in with OTP</AuthTitle>
                        <AuthSubtitle>
                            Enter your email and we&apos;ll send you a one-time code
                        </AuthSubtitle>
                    </AuthHeader>

                    <AuthForm>
                        <AuthField>
                            <AuthLabel>Email</AuthLabel>
                            <Input
                                value={email}
                                onChangeText={setEmail}
                                placeholder="you@example.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="email"
                            />
                        </AuthField>
                    </AuthForm>

                    <Button onPress={handleRequestOtp} disabled={loading} fullWidth>
                        {loading ? "Sending…" : "Send OTP"}
                    </Button>
                </AuthContent>
            </AuthScrollView>
        </AuthKeyboardAvoiding>
    );
}
