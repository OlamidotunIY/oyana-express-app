import React, { useState } from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ResetPasswordMutation, ResetPasswordMutationVariables } from "@/gql/graphql";
import { RESET_PASSWORD_MUTATION } from "@/graphql";
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

export default function ResetPassword() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { email, token } = useLocalSearchParams<{ email: string; token: string }>();
  const showToast = useToastStore((state) => state.showToast);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [resetPassword, { loading }] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD_MUTATION);

  async function handleSubmit() {
    if (!newPassword || newPassword.length < 8) {
      showToast({ message: "Use at least 8 characters for your new password.", tone: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast({ message: "Passwords do not match.", tone: "error" });
      return;
    }

    try {
      const { data } = await resetPassword({
        variables: {
          input: {
            email: email ?? "",
            token: token ?? "",
            newPassword,
          },
        },
      });

      showToast({
        message: data?.resetPassword.message ?? "Password updated successfully.",
        tone: "success",
      });
      router.replace("/(auth)/login-with-password");
    } catch (error) {
      showToast({
        message: parseAuthError(error, "Unable to reset password."),
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
            <AuthTitle>Create a new password</AuthTitle>
            <AuthSubtitle>Set a new password for {email ?? "your account"}.</AuthSubtitle>
          </AuthHeader>

          <AuthForm>
            <AuthField>
              <AuthLabel>New password</AuthLabel>
              <PasswordInput
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter a new password"
                autoComplete="new-password"
              />
            </AuthField>

            <AuthField>
              <AuthLabel>Confirm password</AuthLabel>
              <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your new password"
                autoComplete="new-password"
              />
            </AuthField>
          </AuthForm>

          <Button fullWidth onPress={() => void handleSubmit()} disabled={loading}>
            {loading ? "Updating password…" : "Update password"}
          </Button>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}