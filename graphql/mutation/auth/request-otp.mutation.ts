import { gql } from "@apollo/client";

export const REQUEST_OTP_MUTATION = gql`
  mutation RequestOtp($input: RequestOtpInput!) {
    requestOtp(input: $input) {
      message
      success
    }
  }
`;
