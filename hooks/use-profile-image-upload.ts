import { useMutation } from "@apollo/client/react";
import * as ImagePicker from "expo-image-picker";
import React from "react";

import {
    CREATE_PROFILE_IMAGE_UPLOAD_URL_MUTATION,
    SET_PROFILE_IMAGE_MUTATION,
} from "@/graphql";
import { showBackendErrorToast, showErrorToast, showToast } from "@/lib/toast";
import { StoredUser, useUserStore } from "@/store/userStore";

type CreateProfileImageUploadUrlMutation = {
    createProfileImageUploadUrl: {
        storageBucket: string;
        storagePath: string;
        uploadUrl: string;
        expiresAt: string;
    };
};

type CreateProfileImageUploadUrlMutationVariables = {
    input: {
        fileName: string;
        mimeType?: string;
        sizeBytes?: string;
    };
};

type SetProfileImageMutation = {
    setProfileImage: StoredUser;
};

type SetProfileImageMutationVariables = {
    input: {
        storageBucket: string;
        storagePath: string;
    };
};

async function uploadFileToSignedUrl(uploadUrl: string, uri: string, mimeType: string)
{
    const fileResponse = await fetch(uri);
    const blob = await fileResponse.blob();

    const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": mimeType,
        },
        body: blob,
    });

    if (!uploadResponse.ok)
    {
        throw new Error("Profile image upload failed.");
    }
}

export function useProfileImageUpload()
{
    const setUser = useUserStore((state) => state.setUser);
    const [isUploading, setIsUploading] = React.useState(false);

    const [createProfileImageUploadUrl] = useMutation<
        CreateProfileImageUploadUrlMutation,
        CreateProfileImageUploadUrlMutationVariables
    >(CREATE_PROFILE_IMAGE_UPLOAD_URL_MUTATION);

    const [setProfileImage] = useMutation<
        SetProfileImageMutation,
        SetProfileImageMutationVariables
    >(SET_PROFILE_IMAGE_MUTATION);

    const pickAndUploadProfileImage = React.useCallback(async () =>
    {
        if (isUploading)
        {
            return null;
        }

        try
        {
            const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!mediaPermission.granted)
            {
                showErrorToast("Media library permission is required to select a profile image.");
                return null;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.85,
            });

            if (result.canceled || !result.assets?.length)
            {
                return null;
            }

            const asset = result.assets[0];
            const fileName = asset.fileName ?? `profile-image-${Date.now()}.jpg`;
            const mimeType = asset.mimeType ?? "image/jpeg";

            setIsUploading(true);

            const uploadResponse = await createProfileImageUploadUrl({
                variables: {
                    input: {
                        fileName,
                        mimeType,
                        sizeBytes: asset.fileSize != null ? String(asset.fileSize) : undefined,
                    },
                },
            });

            const uploadPayload = uploadResponse.data?.createProfileImageUploadUrl;
            if (!uploadPayload?.uploadUrl)
            {
                throw new Error("Upload URL was not returned.");
            }

            await uploadFileToSignedUrl(uploadPayload.uploadUrl, asset.uri, mimeType);

            const profileResponse = await setProfileImage({
                variables: {
                    input: {
                        storageBucket: uploadPayload.storageBucket,
                        storagePath: uploadPayload.storagePath,
                    },
                },
            });

            const updatedProfile = profileResponse.data?.setProfileImage ?? null;
            if (!updatedProfile)
            {
                throw new Error("Updated profile was not returned.");
            }

            setUser(updatedProfile);

            showToast({
                tone: "success",
                title: "Profile image updated",
                message: "Your profile image was updated successfully.",
                dedupeKey: "profile-image-upload-success",
            });

            return updatedProfile;
        }
        catch (error)
        {
            showBackendErrorToast(error, "Unable to update profile image.", {
                title: "Profile Image Error",
                dedupeKey: "profile-image-upload-error",
            });
            return null;
        }
        finally
        {
            setIsUploading(false);
        }
    }, [createProfileImageUploadUrl, isUploading, setProfileImage, setUser]);

    return {
        isUploading,
        pickAndUploadProfileImage,
    };
}
