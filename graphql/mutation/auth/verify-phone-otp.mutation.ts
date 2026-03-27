import { gql } from "@apollo/client";

export const VERIFY_PHONE_OTP_MUTATION = gql`
  mutation VerifyPhoneOtp($input: VerifyPhoneOtpInput!) {
    verifyPhoneOtp(input: $input) {
      message
      success
    }
  }
`;
