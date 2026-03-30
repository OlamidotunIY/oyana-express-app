import React from "react";
import { Platform } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  SignUpDriverMutation,
  SignUpDriverMutationVariables,
} from "@/gql/graphql";
import { SIGN_UP_MUTATION } from "@/graphql";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { parseAuthError } from "@/lib/session";
import { useGoogleDriverAuth } from "@/lib/useGoogleDriverAuth";
import { useToastStore } from "@/store/toastStore";
import {
  AuthContent,
  AuthField,
  AuthFooter,
  AuthFooterLink,
  AuthFooterText,
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

export default function Register() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const showToast = useToastStore((state) => state.showToast);
  const { promptGoogleAuth, loading: googleLoading } = useGoogleDriverAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [signUp, { loading }] = useMutation<
    SignUpDriverMutation,
    SignUpDriverMutationVariables
  >(SIGN_UP_MUTATION);

  async function handleSubmit() {
    if (!email.trim() || !password) {
      showToast({
        message: "Enter your email and password to continue.",
        tone: "error",
      });
      return;
    }

    try {
      const { data } = await signUp({
        variables: {
          input: {
            email: email.trim().toLowerCase(),
            password,
          },
        },
      });

      if (!data?.signUpDriver?.success) {
        showToast({
          message: data?.signUpDriver?.message ?? "Registration failed.",
          tone: "error",
        });
        return;
      }

      showToast({
        message: data.signUpDriver.message,
        tone: "success",
      });
      router.replace({
        pathname: "/(auth)/verify-otp",
        params: {
          email: email.trim().toLowerCase(),
          mode: "email-verification",
        },
      });
    } catch (error) {
      showToast({
        message: parseAuthError(error, "Registration failed. Please try again."),
        tone: "error",
      });
    }
  }

  return (
    <AuthKeyboardAvoiding
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthScrollView
        contentContainerStyle={{ paddingTop: insets.top + 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthContent>
          <BackButton onPress={() => router.back()}>
            <BackButtonText>← Back</BackButtonText>
          </BackButton>

          <AuthHeader>
            <AuthTitle>Create your driver account</AuthTitle>
            <AuthSubtitle>
              Start with your email and password. You’ll finish the rest of your
              onboarding inside the app.
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

            <AuthField>
              <AuthLabel>Password</AuthLabel>
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Create a password"
                autoComplete="new-password"
              />
            </AuthField>
          </AuthForm>

          <Button onPress={() => void handleSubmit()} disabled={loading} fullWidth>
            {loading ? "Creating account…" : "Continue with email"}
          </Button>

          <Button
            onPress={() => void promptGoogleAuth()}
            disabled={googleLoading}
            fullWidth
            variant="outline"
          >
            {googleLoading ? "Connecting to Google…" : "Continue with Google"}
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
