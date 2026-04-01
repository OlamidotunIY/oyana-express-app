import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";

import { Button, Card, CardContent, Input, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import {
  MeQuery,
  MeQueryVariables,
  RequestPhoneOtpMutation,
  RequestPhoneOtpMutationVariables,
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
  VerifyPhoneOtpAndAuthenticateMutation,
  VerifyPhoneOtpAndAuthenticateMutationVariables,
} from "@/gql/graphql";
import {
  ME_QUERY,
  REQUEST_PHONE_OTP_MUTATION,
  UPDATE_PROFILE_MUTATION,
  VERIFY_PHONE_OTP_MUTATION,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { persistAuthTokens } from "@/lib/auth-cookies";
import { parseAuthError } from "@/lib/session";
import { showToast } from "@/lib/toast";
import { useUserStore } from "@/store/userStore";
import {
  StyledEditProfileForm,
  StyledEditProfileLabel,
  StyledEditProfileLoadingWrap,
  StyledEditProfileRoot,
} from "@/styles/tabs/accounts";

const OTP_LENGTH = 6;

export default function VerifyPhoneScreen() {
  const setUser = useUserStore((state) => state.setUser);
  const [phoneE164, setPhoneE164] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [otpRequested, setOtpRequested] = React.useState(false);

  const { data, loading, error, refetch } = useQuery<MeQuery, MeQueryVariables>(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const [requestPhoneOtp, { loading: sendingOtp }] = useMutation<
    RequestPhoneOtpMutation,
    RequestPhoneOtpMutationVariables
  >(REQUEST_PHONE_OTP_MUTATION);

  const [updateProfile] = useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UPDATE_PROFILE_MUTATION);

  const [verifyPhoneOtpAndAuthenticate, { loading: verifyingOtp }] = useMutation<
    VerifyPhoneOtpAndAuthenticateMutation,
    VerifyPhoneOtpAndAuthenticateMutationVariables
  >(VERIFY_PHONE_OTP_MUTATION);

  useBackendErrorToast(error, "Unable to load your phone verification state.", {
    title: "Phone Verification Error",
    dedupeKey: "account-verify-phone-query",
  });

  React.useEffect(() => {
    const nextPhone = data?.me?.phoneE164 ?? "";
    if (nextPhone) {
      setPhoneE164(nextPhone);
    }
  }, [data?.me?.phoneE164]);

  async function handleRequestOtp() {
    if (!phoneE164.trim()) {
      showToast({
        title: "Phone Verification",
        message: "Enter a phone number in E.164 format.",
        tone: "error",
      });
      return;
    }

    try {
      const updatedProfile = await updateProfile({
        variables: {
          input: {
            phoneE164: phoneE164.trim(),
          },
        },
      });

      if (updatedProfile.data?.updateProfile) {
        setUser(updatedProfile.data.updateProfile);
      }

      const { data: response } = await requestPhoneOtp({
        variables: {
          input: {
            phoneE164: phoneE164.trim(),
          },
        },
      });

      if (response?.requestPhoneOtp.success) {
        setOtpRequested(true);
        showToast({
          title: "Phone Verification",
          message: response.requestPhoneOtp.message,
          tone: "success",
        });
      }
    } catch (mutationError) {
      showToast({
        title: "Phone Verification",
        message: parseAuthError(mutationError, "Unable to send verification code."),
        tone: "error",
      });
    }
  }

  async function handleVerifyOtp() {
    if (otp.trim().length !== OTP_LENGTH) {
      showToast({
        title: "Phone Verification",
        message: "Enter the full 6-digit code.",
        tone: "error",
      });
      return;
    }

    try {
      const { data: response } = await verifyPhoneOtpAndAuthenticate({
        variables: {
          input: {
            phoneE164: phoneE164.trim(),
            token: otp.trim(),
          },
        },
      });

      const authResponse = response?.verifyPhoneOtpAndAuthenticate ?? null;
      if (authResponse) {
        persistAuthTokens(authResponse.accessToken, authResponse.refreshToken);
        setUser(authResponse.user);
        setOtp("");
        setOtpRequested(false);
        await refetch();
        showToast({
          title: "Phone Verification",
          message: "Your phone number has been verified successfully.",
          tone: "success",
        });
      }
    } catch (mutationError) {
      showToast({
        title: "Phone Verification",
        message: parseAuthError(mutationError, "Unable to verify phone number."),
        tone: "error",
      });
    }
  }

  const profile = data?.me ?? null;

  return (
    <ScreenShell contentJustify="flex-start">
      <StyledEditProfileRoot>
        {loading && !profile ? (
          <Card>
            <CardContent>
              <StyledEditProfileLoadingWrap>
                <Spinner size="small" />
              </StyledEditProfileLoadingWrap>
            </CardContent>
          </Card>
        ) : null}

        <Card>
          <CardContent>
            <StyledEditProfileForm>
              <StyledEditProfileLabel>Verification status</StyledEditProfileLabel>
              <Input value={profile?.phoneVerified ? "Verified" : "Not verified"} editable={false} />

              <StyledEditProfileLabel>Phone (E.164)</StyledEditProfileLabel>
              <Input
                value={phoneE164}
                onChangeText={setPhoneE164}
                placeholder="+2348012345678"
                keyboardType="phone-pad"
              />

              <Button fullWidth onPress={() => void handleRequestOtp()} disabled={sendingOtp || verifyingOtp}>
                {sendingOtp ? "Sending code..." : otpRequested ? "Resend code" : "Send verification code"}
              </Button>

              {otpRequested || profile?.phoneVerified === false ? (
                <>
                  <StyledEditProfileLabel>Verification code</StyledEditProfileLabel>
                  <Input
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="Enter 6-digit code"
                    keyboardType="number-pad"
                    autoCapitalize="none"
                  />

                  <Button fullWidth variant="secondary" onPress={() => void handleVerifyOtp()} disabled={verifyingOtp || sendingOtp}>
                    {verifyingOtp ? "Verifying..." : "Verify phone"}
                  </Button>
                </>
              ) : null}
            </StyledEditProfileForm>
          </CardContent>
        </Card>
      </StyledEditProfileRoot>
    </ScreenShell>
  );
}
