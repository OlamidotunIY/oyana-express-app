import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation SignUpDriver($input: SignUpDriverInput!) {
    signUpDriver(input: $input) {
      message
      success
    }
  }
`;
