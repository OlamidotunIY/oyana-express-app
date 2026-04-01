import { useMutation } from "@apollo/client/react";
import React from "react";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { AuthBackButton } from "@/components/ui/AuthBackButton";
import { Button } from "@/components/ui/Button";
import {
  RequestPhoneOtpMutation,
  RequestPhoneOtpMutationVariables,
} from "@/gql/graphql";
import { REQUEST_PHONE_OTP_MUTATION } from "@/graphql";
import {
  formatNationalNumberToE164,
  getNationalNumberFromE164,
  getPhoneCountryConfig,
  sanitizeNationalPhoneInput,
} from "@/lib/phone";
import { parseAuthError } from "@/lib/session";
import { useAuthFlowStore } from "@/store/authFlowStore";
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
  StyledInput,
} from "@/styles";

export default function OnboardingPhoneScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const showToast = useToastStore((state) => state.showToast);
  const pendingPhone = useAuthFlowStore((state) => state.pendingPhone);
  const setPendingPhone = useAuthFlowStore((state) => state.setPendingPhone);
  const [countryConfig] = React.useState(() => getPhoneCountryConfig());
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const [requestPhoneOtp, { loading }] = useMutation<
    RequestPhoneOtpMutation,
    RequestPhoneOtpMutationVariables
  >(REQUEST_PHONE_OTP_MUTATION);

  React.useEffect(() => {
    if (!pendingPhone?.trim()) {
      return;
    }

    setPhoneNumber(getNationalNumberFromE164(pendingPhone, countryConfig.country));
  }, [countryConfig.country, pendingPhone]);

  async function handleContinue() {
    if (!phoneNumber.trim()) {
      showToast({
        message: "Enter your phone number to continue.",
        tone: "error",
      });
      return;
    }

    const phoneE164 = formatNationalNumberToE164(
      phoneNumber,
      countryConfig.country,
    );

    if (!phoneE164) {
      showToast({
        message: "Enter a valid phone number to continue.",
        tone: "error",
      });
      return;
    }

    try {
      const { data } = await requestPhoneOtp({
        variables: {
          input: {
            phoneE164,
          },
        },
      });

      const response = data?.requestPhoneOtp;
      if (!response?.success) {
        showToast({
          message: response?.message ?? "Unable to send the phone code right now.",
          tone: "error",
        });
        return;
      }

      showToast({
        message:
          response.message ?? "Verification code sent to your phone number.",
        tone: "success",
      });

      setPendingPhone(phoneE164);
      router.push("/(auth)/onboarding/verify-phone" as never);
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
          <AuthBackButton fallbackHref="/(auth)/onboarding" />

          <AuthHeader>
            <AuthTitle>Continue with your phone</AuthTitle>
            <AuthSubtitle>
              We detected your country code automatically. Enter the rest of your
              phone number and we&apos;ll text you a 6-digit code to sign in or
              create your shipper account.
            </AuthSubtitle>
          </AuthHeader>

          <AuthForm>
            <AuthField>
              <AuthLabel>Phone number</AuthLabel>
              <PhoneInputRow>
                <CountryCodeBadge>
                  <CountryCodeText>{countryConfig.dialCode}</CountryCodeText>
                </CountryCodeBadge>
                <PhoneNumberInput
                  value={phoneNumber}
                  onChangeText={(value) =>
                    setPhoneNumber(sanitizeNationalPhoneInput(value))
                  }
                  placeholder={countryConfig.country === "NG" ? "8012345678" : "Phone number"}
                  keyboardType="phone-pad"
                  autoComplete="tel"
                />
              </PhoneInputRow>
              <PhoneHint>
                Detected country code from your device settings: {countryConfig.dialCode}
              </PhoneHint>
            </AuthField>
          </AuthForm>

          <Button onPress={() => void handleContinue()} disabled={loading} fullWidth>
            {loading ? "Sending code..." : "Send verification code"}
          </Button>

          <AuthFooter>
            <AuthFooterLink onPress={() => router.replace("/(auth)/onboarding")}>
              Back to sign-in options
            </AuthFooterLink>
          </AuthFooter>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}

const PhoneInputRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const CountryCodeBadge = styled.View`
  min-width: 82px;
  min-height: 48px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.muted};
  align-items: center;
  justify-content: center;
`;

const CountryCodeText = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

const PhoneNumberInput = styled(StyledInput)`
  flex: 1;
  min-height: 48px;
`;

const PhoneHint = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;
