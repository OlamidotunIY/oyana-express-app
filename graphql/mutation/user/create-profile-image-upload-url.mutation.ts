import { gql } from "@apollo/client";

export const CREATE_PROFILE_IMAGE_UPLOAD_URL_MUTATION = gql`
  mutation CreateProfileImageUploadUrl($input: CreateProfileImageUploadUrlInput!) {
    createProfileImageUploadUrl(input: $input) {
      storageBucket
      storagePath
      uploadUrl
      expiresAt
    }
  }
`;
