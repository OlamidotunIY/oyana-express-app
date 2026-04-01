import { gql } from "@apollo/client";

export const CREATE_DRIVER_DOCUMENT_UPLOAD_URL_MUTATION = gql`
  mutation CreateDriverDocumentUploadUrl(
    $input: CreateDriverDocumentUploadUrlInput!
  ) {
    createDriverDocumentUploadUrl(input: $input) {
      storageBucket
      storagePath
      uploadUrl
      expiresAt
    }
  }
`;
