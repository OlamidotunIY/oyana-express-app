import React from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  RequestPhoneOtpMutation,
  RequestPhoneOtpMutationVariables,
} from "@/gql/graphql";
import { REQUEST_PHONE_OTP_MUTATION } from "@/graphql";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { parseAuthError } from "@/lib/session";
import { useToastStore } from "@/store/toastStore";
import {
  AuthContent,
  AuthField,
  AuthFooter,
  AuthFooterLink,
  AuthForm,
  AuthHeader,
  AuthKeyboardAvoiding,
  AuthLabel,
  AuthScrollView,
  AuthSubtitle,
  AuthTitle,
  BackButton,
  BackButtonText,
} from "@/styles";

export default function OnboardingPhoneScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const showToast = useToastStore((state) => state.showToast);
  const [phoneE164, setPhoneE164] = React.useState("");

  const [requestPhoneOtp, { loading }] = useMutation<
    RequestPhoneOtpMutation,
    RequestPhoneOtpMutationVariables
  >(REQUEST_PHONE_OTP_MUTATION);

  async function handleContinue() {
    if (!phoneE164.trim()) {
      showToast({
        message: "Enter your phone number to continue.",
        tone: "error",
      });
      return;
    }

    try {
      const { data } = await requestPhoneOtp({
        variables: {
          input: {
            phoneE164: phoneE164.trim(),
          },
        },
      });

      showToast({
        message:
          data?.requestPhoneOtp.message ??
          "Verification code sent to your phone number.",
        tone: "success",
      });

      router.replace({
        pathname: "/(auth)/onboarding/verify-phone",
        params: {
          phone: phoneE164.trim(),
        },
      } as never);
    } catch (error) {
      showToast({
        message: parseAuthError(error, "Unable to send the phone code."),
        tone: "error",
      });
    }
  }

  return (
    <AuthKeyboardAvoiding
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthScrollView
        contentContainerStyle={{ paddingTop: insets.top + 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthContent>
          <BackButton onPress={() => router.back()}>
            <BackButtonText>← Back</BackButtonText>
          </BackButton>

          <AuthHeader>
            <AuthTitle>Add your phone number</AuthTitle>
            <AuthSubtitle>
              We’ll send a verification code before your driver profile is set
              up.
            </AuthSubtitle>
          </AuthHeader>

          <AuthForm>
            <AuthField>
              <AuthLabel>Phone number</AuthLabel>
              <Input
                value={phoneE164}
                onChangeText={setPhoneE164}
                placeholder="+2348012345678"
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            </AuthField>
          </AuthForm>

          <Button onPress={() => void handleContinue()} disabled={loading} fullWidth>
            {loading ? "Sending code…" : "Send verification code"}
          </Button>

          <AuthFooter>
            <AuthFooterLink onPress={() => router.replace("/(auth)/login-with-password")}>
              Use a different account
            </AuthFooterLink>
          </AuthFooter>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}
