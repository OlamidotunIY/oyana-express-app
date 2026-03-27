import { gql } from "@apollo/client";

export const PAYSTACK_SUPPORTED_BANKS_QUERY = gql`
  query PaystackSupportedBanks($countryCode: String) {
    paystackSupportedBanks(countryCode: $countryCode) {
      name
      code
      slug
      longcode
      gateway
      payWithBank
      active
      country
      currency
    }
  }
`;
