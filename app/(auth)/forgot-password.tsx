import React, { useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ForgotPasswordMutation, ForgotPasswordMutationVariables } from "@/gql/graphql";
import { FORGOT_PASSWORD_MUTATION } from "@/graphql";
import { parseAuthError } from "@/lib/session";
import { useToastStore } from "@/store/toastStore";
import {
  AuthContent,
  AuthField,
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

export default function ForgotPassword() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const showToast = useToastStore((state) => state.showToast);
  const [email, setEmail] = useState("");

  const [forgotPassword, { loading }] = useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD_MUTATION);

  async function handleSubmit() {
    if (!email.trim()) {
      showToast({ message: "Enter your email address.", tone: "error" });
      return;
    }

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const { data } = await forgotPassword({
        variables: {
          input: {
            email: normalizedEmail,
          },
        },
      });

      showToast({
        message: data?.forgotPassword.message ?? "Reset code sent.",
        tone: "success",
      });

      router.push({
        pathname: "/(auth)/verify-otp",
        params: {
          email: normalizedEmail,
          mode: "reset-password",
        },
      });
    } catch (error) {
      showToast({
        message: parseAuthError(error, "We could not send a reset code."),
        tone: "error",
      });
    }
  }

  return (
    <AuthKeyboardAvoiding behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <AuthScrollView contentContainerStyle={{ paddingTop: insets.top + 32 }} keyboardShouldPersistTaps="handled">
        <AuthContent>
          <BackButton onPress={() => router.back()}>
            <BackButtonText>← Back</BackButtonText>
          </BackButton>

          <AuthHeader>
            <AuthTitle>Reset your password</AuthTitle>
            <AuthSubtitle>Enter your email and we'll send you a 6-digit reset code.</AuthSubtitle>
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

          <Button fullWidth onPress={() => void handleSubmit()} disabled={loading}>
            {loading ? "Sending code…" : "Send reset code"}
          </Button>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}