import React, { useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SIGN_UP_MUTATION } from "@/graphql";
import { State, UserType } from "@/gql/graphql";
import type { SignUpMutation, SignUpMutationVariables } from "@/gql/graphql";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
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
    AuthFooter,
    AuthFooterText,
    AuthFooterLink,
    BackButton,
    BackButtonText,
    NameRow,
    NameField,
    StateRow,
    StateChip,
    StateChipText,
} from "@/styles";
const STATE_OPTIONS: { label: string; value: State }[] = [
    { label: "Lagos", value: State.Lagos },
    { label: "Abuja", value: State.Abuja },
    { label: "Oyo", value: State.Oyo },
];

export default function Register()
{
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { type } = useLocalSearchParams<{ type: string }>();
    const showToast = useToastStore((s) => s.showToast);

    const isProvider = type === "provider";

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [state, setStateValue] = useState<State>(State.Lagos);

    const [signUp, { loading }] = useMutation<SignUpMutation, SignUpMutationVariables>(SIGN_UP_MUTATION);

    async function handleSubmit()
    {
        if (!email.trim() || !firstName.trim() || !lastName.trim() || !password)
        {
            showToast({ message: "Please fill in all required fields.", tone: "error" });
            return;
        }

        if (isProvider && !businessName.trim())
        {
            showToast({ message: "Please enter your business name.", tone: "error" });
            return;
        }

        try
        {
            const { data } = await signUp({
                variables: {
                    input: {
                        email: email.trim().toLowerCase(),
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        password,
                        state,
                        roles: [isProvider ? UserType.Business : UserType.Individual],
                        ...(phoneNumber.trim() ? { phoneNumber: phoneNumber.trim() } : {}),
                        ...(isProvider && businessName.trim() ? { businessName: businessName.trim() } : {}),
                    },
                },
            });

            if (data?.signUp?.success)
            {
                showToast({
                    message: data.signUp.message,
                    tone: "success",
                });
                router.replace({
                    pathname: "/(auth)/verify-otp",
                    params: {
                        email: email.trim().toLowerCase(),
                        mode: "email-verification",
                    },
                });
            }
            else
            {
                showToast({
                    message: data?.signUp?.message ?? "Registration failed.",
                    tone: "error",
                });
            }
        }
        catch (err)
        {
            showToast({
                message: parseAuthError(err, "Registration failed. Please try again."),
                tone: "error",
            });
        }
    }

    return (
        <AuthKeyboardAvoiding behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <AuthScrollView
                contentContainerStyle={{ paddingTop: insets.top + 24 }}
                keyboardShouldPersistTaps="handled"
            >
                <AuthContent>
                    <BackButton onPress={() => router.back()}>
                        <BackButtonText>← Back</BackButtonText>
                    </BackButton>

                    <AuthHeader>
                        <AuthTitle>
                            {isProvider ? "Register as Provider" : "Create account"}
                        </AuthTitle>
                        <AuthSubtitle>
                            {isProvider
                                ? "Set up your logistics provider account"
                                : "Start sending packages today"}
                        </AuthSubtitle>
                    </AuthHeader>

                    <AuthForm>
                        <NameRow>
                            <NameField>
                                <AuthLabel>First name</AuthLabel>
                                <Input
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="John"
                                    autoCapitalize="words"
                                    autoComplete="given-name"
                                />
                            </NameField>
                            <NameField>
                                <AuthLabel>Last name</AuthLabel>
                                <Input
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Doe"
                                    autoCapitalize="words"
                                    autoComplete="family-name"
                                />
                            </NameField>
                        </NameRow>

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
                                placeholder="Create a password"
                                autoComplete="new-password"
                            />
                        </AuthField>

                        <AuthField>
                            <AuthLabel>Phone number (optional)</AuthLabel>
                            <Input
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="+234..."
                                keyboardType="phone-pad"
                                autoComplete="tel"
                            />
                        </AuthField>

                        {isProvider && (
                            <AuthField>
                                <AuthLabel>Business name</AuthLabel>
                                <Input
                                    value={businessName}
                                    onChangeText={setBusinessName}
                                    placeholder="Your logistics company"
                                    autoCapitalize="words"
                                />
                            </AuthField>
                        )}

                        <AuthField>
                            <AuthLabel>State</AuthLabel>
                            <StateRow>
                                {STATE_OPTIONS.map((opt) => (
                                    <StateChip
                                        key={opt.value}
                                        active={state === opt.value}
                                        onPress={() => setStateValue(opt.value)}
                                        activeOpacity={0.7}
                                    >
                                        <StateChipText active={state === opt.value}>
                                            {opt.label}
                                        </StateChipText>
                                    </StateChip>
                                ))}
                            </StateRow>
                        </AuthField>
                    </AuthForm>

                    <Button onPress={handleSubmit} disabled={loading} fullWidth>
                        {loading ? "Creating account…" : "Create account"}
                    </Button>

                    <AuthFooter>
                        <AuthFooterText>Already have an account? </AuthFooterText>
                        <AuthFooterLink
                            onPress={() => router.replace("/(auth)/login-with-password")}
                        >
                            Sign in
                        </AuthFooterLink>
                    </AuthFooter>
                </AuthContent>
            </AuthScrollView>
        </AuthKeyboardAvoiding>
    );
}
