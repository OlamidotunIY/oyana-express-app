import React, { useCallback, useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FORGOT_PASSWORD_MUTATION, REQUEST_OTP_MUTATION, VERIFY_OTP_MUTATION } from "@/graphql";
import type {
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables,
    RequestOtpMutation,
    RequestOtpMutationVariables,
    VerifyOtpMutation,
    VerifyOtpMutationVariables,
} from "@/gql/graphql";
import
{
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/InputOtp";
import { Button } from "@/components/ui/Button";
import { OnboardingProgress } from "@/components/ui/OnboardingProgress";
import { persistAuthTokens } from "@/lib/auth-cookies";
import { parseAuthError, resolveAuthenticatedRoute } from "@/lib/session";
import { useUserStore } from "@/store/userStore";
import { useToastStore } from "@/store/toastStore";
import
{
    AuthKeyboardAvoiding,
    AuthScrollView,
    AuthContent,
    AuthFooter,
    AuthFooterLink,
    AuthHeader,
    AuthTitle,
    AuthSubtitle,
    BackButton,
    BackButtonText,
    OtpWrapper,
    OtpEmailHighlight,
} from "@/styles";

const OTP_LENGTH = 6;

type VerifyMode = "signin" | "email-verification" | "reset-password";

function normalizeVerifyMode(mode?: string): VerifyMode
{
    if (mode === "email-verification")
    {
        return "email-verification";
    }

    if (mode === "reset-password")
    {
        return "reset-password";
    }

    return "signin";
}

export default function VerifyOtp()
{
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { email, mode } = useLocalSearchParams<{ email: string; mode?: string }>();
    const setUser = useUserStore((s) => s.setUser);
    const showToast = useToastStore((s) => s.showToast);

    const [otp, setOtp] = useState("");
    const [resending, setResending] = useState(false);
    const verifyMode = normalizeVerifyMode(mode);

    const [verifyOtp, { loading }] = useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VERIFY_OTP_MUTATION);
    const [requestOtp] = useMutation<RequestOtpMutation, RequestOtpMutationVariables>(REQUEST_OTP_MUTATION);
    const [forgotPassword] = useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(FORGOT_PASSWORD_MUTATION);

    const title = verifyMode === "reset-password"
        ? "Enter reset code"
        : verifyMode === "email-verification"
            ? "Verify your email"
            : "Enter your code";

    const subtitle = verifyMode === "reset-password"
        ? "Enter the 6-digit reset code sent to"
        : verifyMode === "email-verification"
            ? "Enter the 6-digit verification code sent to"
            : "We sent a 6-digit code to";
    const showOnboardingProgress = verifyMode === "email-verification";

    const handleVerify = useCallback(async () =>
    {
        if (otp.length < OTP_LENGTH)
        {
            showToast({ message: "Please enter the full 6-digit code.", tone: "error" });
            return;
        }

        if (verifyMode === "reset-password")
        {
            router.replace({
                pathname: "/(auth)/reset-password",
                params: {
                    email: email ?? "",
                    token: otp,
                },
            });
            return;
        }

        try
        {
            const { data } = await verifyOtp({
                variables: {
                    input: {
                        email: email ?? "",
                        token: otp,
                    },
                },
            });
            const { accessToken, refreshToken, user } = data?.verifyOtp ?? {};
            if (accessToken && refreshToken && user)
            {
                persistAuthTokens(accessToken, refreshToken);
                setUser(user);
                router.replace(resolveAuthenticatedRoute(user) as never);
            } else
            {
                showToast({
                    message: "Invalid or expired code. Please try again.",
                    tone: "error",
                });
                setOtp("");
            }
        }
        catch (err)
        {
            showToast({
                message: parseAuthError(err, "Invalid or expired code. Please try again."),
                tone: "error",
            });
            setOtp("");
        }
    }, [email, otp, router, setUser, showToast, verifyMode, verifyOtp]);

    async function handleResend()
    {
        if (!email)
        {
            showToast({ message: "Missing email address for resend.", tone: "error" });
            return;
        }

        setResending(true);

        try
        {
            if (verifyMode === "reset-password")
            {
                const { data } = await forgotPassword({
                    variables: {
                        input: {
                            email,
                        },
                    },
                });

                showToast({
                    message: data?.forgotPassword.message ?? "Reset code resent.",
                    tone: "success",
                });
            } else
            {
                const { data } = await requestOtp({
                    variables: {
                        input: {
                            email,
                            mode: verifyMode === "email-verification" ? "email_verification" : "login",
                        },
                    },
                });

                showToast({
                    message: data?.requestOtp.message ?? "Code resent successfully.",
                    tone: "success",
                });
            }
        }
        catch (error)
        {
            showToast({
                message: parseAuthError(error, "Unable to resend code."),
                tone: "error",
            });
        }
        finally
        {
            setResending(false);
        }
    }

    // Auto-submit when all slots are filled
    React.useEffect(() =>
    {
        if (otp.length === OTP_LENGTH && !loading)
        {
            void handleVerify();
        }
    }, [otp, loading, handleVerify]);

    return (
        <AuthKeyboardAvoiding behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <AuthScrollView
                contentContainerStyle={{ paddingTop: insets.top + 32 }}
                keyboardShouldPersistTaps="handled"
            >
                <AuthContent>
                    {showOnboardingProgress ? (
                        <OnboardingProgress currentStep="email-verification" />
                    ) : null}

                    <BackButton onPress={() => router.back()}>
                        <BackButtonText>← Back</BackButtonText>
                    </BackButton>

                    <AuthHeader>
                        <AuthTitle>{title}</AuthTitle>
                        <AuthSubtitle>
                            {subtitle}{"\n"}
                            <OtpEmailHighlight>{email}</OtpEmailHighlight>
                        </AuthSubtitle>
                    </AuthHeader>

                    <OtpWrapper>
                        <InputOTP value={otp} onChange={setOtp} maxLength={OTP_LENGTH}>
                            <InputOTPGroup>
                                {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                                    <InputOTPSlot key={i} index={i} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    </OtpWrapper>

                    <Button
                        onPress={() => void handleVerify()}
                        disabled={loading || otp.length < OTP_LENGTH}
                        fullWidth
                    >
                        {loading ? "Verifying…" : verifyMode === "reset-password" ? "Continue" : "Verify"}
                    </Button>

                    <AuthFooter>
                        <AuthFooterLink onPress={() => void handleResend()}>
                            {resending ? "Sending…" : "Resend code"}
                        </AuthFooterLink>
                    </AuthFooter>
                </AuthContent>
            </AuthScrollView>
        </AuthKeyboardAvoiding>
    );
}
