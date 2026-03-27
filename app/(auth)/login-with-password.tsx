import React, { useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SIGN_IN_MUTATION } from "@/graphql";
import type { SignInMutation, SignInMutationVariables } from "@/gql/graphql";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { persistAuthTokens } from "@/lib/auth-cookies";
import { parseAuthError, resolveAuthenticatedRoute } from "@/lib/session";
import { useUserStore } from "@/store/userStore";
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
    AuthFooter,
    AuthFooterText,
    AuthFooterLink,
} from "@/styles";

export default function LoginWithPassword()
{
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const setUser = useUserStore((s) => s.setUser);
    const showToast = useToastStore((s) => s.showToast);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, { loading }] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN_MUTATION);

    async function handleSubmit()
    {
        if (!email.trim() || !password)
        {
            showToast({ message: "Please enter your email and password.", tone: "error" });
            return;
        }

        try
        {
            const { data } = await signIn({
                variables: { input: { email: email.trim().toLowerCase(), password } },
            });
            if (!data)
            {
                showToast({ message: "Sign in failed. Please try again.", tone: "error" });
                return;
            }
            const { accessToken, refreshToken, user } = data.signIn;
            persistAuthTokens(accessToken, refreshToken);
            setUser(user);
            router.replace(resolveAuthenticatedRoute(user));
        }
        catch (err)
        {
            const message = parseAuthError(err, "Sign in failed. Please try again.");

            if (message.toLowerCase().includes("email not verified"))
            {
                showToast({
                    message,
                    tone: "success",
                });
                router.replace({
                    pathname: "/(auth)/verify-otp",
                    params: {
                        email: email.trim().toLowerCase(),
                        mode: "email-verification",
                    },
                });
                return;
            }

            showToast({
                message,
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
                        <AuthTitle>Welcome back</AuthTitle>
                        <AuthSubtitle>Sign in to your account</AuthSubtitle>
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

                        <AuthField>
                            <AuthLabel>Password</AuthLabel>
                            <PasswordInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                        </AuthField>
                    </AuthForm>

                    <Button onPress={handleSubmit} disabled={loading} fullWidth>
                        {loading ? "Signing in…" : "Sign in"}
                    </Button>

                    <AuthFooter>
                        <AuthFooterLink onPress={() => router.push("/(auth)/forgot-password")}>Forgot password?</AuthFooterLink>
                    </AuthFooter>

                    <AuthFooter>
                        <AuthFooterText>Don&apos;t have an account? </AuthFooterText>
                        <AuthFooterLink
                            onPress={() => router.push("/(auth)/register?type=user")}
                        >
                            Register
                        </AuthFooterLink>
                    </AuthFooter>
                </AuthContent>
            </AuthScrollView>
        </AuthKeyboardAvoiding>
    );
}
