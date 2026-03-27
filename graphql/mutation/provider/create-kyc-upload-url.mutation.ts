import { gql } from "@apollo/client";

export const CREATE_KYC_UPLOAD_URL_MUTATION = gql`
  mutation CreateKycUploadUrl($input: CreateKycUploadUrlDto!) {
    createKycUploadUrl(input: $input) {
      mediaId
      storageBucket
      storagePath
      uploadUrl
      expiresAt
    }
  }
`;
