import React from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  RequestPhoneOtpMutation,
  RequestPhoneOtpMutationVariables,
  VerifyPhoneOtpMutation,
  VerifyPhoneOtpMutationVariables,
} from "@/gql/graphql";
import {
  REQUEST_PHONE_OTP_MUTATION,
  VERIFY_PHONE_OTP_MUTATION,
} from "@/graphql";
import { Button } from "@/components/ui/Button";
import { OnboardingProgress } from "@/components/ui/OnboardingProgress";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/InputOtp";
import {
  parseAuthError,
  refetchCurrentUser,
  resolveAuthenticatedRoute,
} from "@/lib/session";
import { useToastStore } from "@/store/toastStore";
import {
  AuthContent,
  AuthFooter,
  AuthFooterLink,
  AuthHeader,
  AuthKeyboardAvoiding,
  AuthScrollView,
  AuthSubtitle,
  AuthTitle,
  BackButton,
  BackButtonText,
  OtpEmailHighlight,
  OtpWrapper,
} from "@/styles";

const OTP_LENGTH = 6;

export default function OnboardingVerifyPhoneScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { phone } = useLocalSearchParams<{ phone?: string }>();
  const showToast = useToastStore((state) => state.showToast);
  const [otp, setOtp] = React.useState("");
  const [resending, setResending] = React.useState(false);

  const [verifyPhoneOtp, { loading }] = useMutation<
    VerifyPhoneOtpMutation,
    VerifyPhoneOtpMutationVariables
  >(VERIFY_PHONE_OTP_MUTATION);
  const [requestPhoneOtp] = useMutation<
    RequestPhoneOtpMutation,
    RequestPhoneOtpMutationVariables
  >(REQUEST_PHONE_OTP_MUTATION);

  async function handleVerify() {
    if (!phone?.trim()) {
      showToast({
        message: "Missing phone number for verification.",
        tone: "error",
      });
      return;
    }

    if (otp.length < OTP_LENGTH) {
      showToast({
        message: "Enter the full 6-digit phone verification code.",
        tone: "error",
      });
      return;
    }

    try {
      await verifyPhoneOtp({
        variables: {
          input: {
            phoneE164: phone.trim(),
            token: otp,
          },
        },
      });

      const user = await refetchCurrentUser();
      if (!user) {
        throw new Error("Unable to refresh your account after phone verification.");
      }

      showToast({
        message: "Phone number verified successfully.",
        tone: "success",
      });
      router.replace(resolveAuthenticatedRoute(user) as never);
    } catch (error) {
      showToast({
        message: parseAuthError(
          error,
          "Invalid or expired phone code. Please try again.",
        ),
        tone: "error",
      });
      setOtp("");
    }
  }

  async function handleResend() {
    if (!phone?.trim()) {
      showToast({
        message: "Missing phone number for resend.",
        tone: "error",
      });
      return;
    }

    setResending(true);
    try {
      const { data } = await requestPhoneOtp({
        variables: {
          input: {
            phoneE164: phone.trim(),
          },
        },
      });

      showToast({
        message: data?.requestPhoneOtp.message ?? "Code resent successfully.",
        tone: "success",
      });
    } catch (error) {
      showToast({
        message: parseAuthError(error, "Unable to resend the phone code."),
        tone: "error",
      });
    } finally {
      setResending(false);
    }
  }

  React.useEffect(() => {
    if (otp.length === OTP_LENGTH && !loading) {
      void handleVerify();
    }
  }, [loading, otp]);

  return (
    <AuthKeyboardAvoiding
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthScrollView
        contentContainerStyle={{ paddingTop: insets.top + 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthContent>
          <OnboardingProgress currentStep="verify-phone" />

          <BackButton onPress={() => router.back()}>
            <BackButtonText>← Back</BackButtonText>
          </BackButton>

          <AuthHeader>
            <AuthTitle>Verify your phone</AuthTitle>
            <AuthSubtitle>
              Enter the 6-digit code sent to{"\n"}
              <OtpEmailHighlight>{phone}</OtpEmailHighlight>
            </AuthSubtitle>
          </AuthHeader>

          <OtpWrapper>
            <InputOTP value={otp} onChange={setOtp} maxLength={OTP_LENGTH}>
              <InputOTPGroup>
                {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </OtpWrapper>

          <Button
            onPress={() => void handleVerify()}
            disabled={loading || otp.length < OTP_LENGTH}
            fullWidth
          >
            {loading ? "Verifying…" : "Verify phone number"}
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
