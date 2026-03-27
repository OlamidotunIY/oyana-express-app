import { gql } from "@apollo/client";

export const REQUEST_PHONE_OTP_MUTATION = gql`
  mutation RequestPhoneOtp($input: RequestPhoneOtpInput!) {
    requestPhoneOtp(input: $input) {
      message
      success
    }
  }
`;
