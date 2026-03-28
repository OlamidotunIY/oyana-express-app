import React from "react";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Card, CardContent } from "@/components/ui";
import { useProfileImageUpload } from "@/hooks/use-profile-image-upload";
import
    {
        StyledUploadProfileImageHint,
        StyledUploadProfileImageRoot,
        StyledUploadProfileImageSection,
        StyledUploadProfileImageSectionLabel,
        StyledUploadProfileImageTitle,
    } from "@/styles/tabs/accounts";

export default function UploadProfileImageScreen()
{
    const { isUploading, pickAndUploadProfileImage } = useProfileImageUpload();

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledUploadProfileImageRoot>
                <Card>
                    <CardContent>
                        <StyledUploadProfileImageSection>
                            <StyledUploadProfileImageSectionLabel>Profile image</StyledUploadProfileImageSectionLabel>
                            <StyledUploadProfileImageTitle>Upload profile image</StyledUploadProfileImageTitle>
                            <StyledUploadProfileImageHint>
                                Select an image from your library and we will upload it, save it to your
                                profile, and refresh the local account state automatically.
                            </StyledUploadProfileImageHint>
                            <Button
                                fullWidth
                                variant="outline"
                                onPress={() => void pickAndUploadProfileImage()}
                                disabled={isUploading}
                            >
                                {isUploading ? "Uploading..." : "Choose image"}
                            </Button>
                        </StyledUploadProfileImageSection>
                    </CardContent>
                </Card>
            </StyledUploadProfileImageRoot>
        </ScreenShell>
    );
}
