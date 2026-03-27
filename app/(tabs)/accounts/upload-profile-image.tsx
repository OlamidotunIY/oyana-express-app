import React from "react";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Card, CardContent } from "@/components/ui";
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
    return (
        <ScreenShell contentJustify="flex-start">
            <StyledUploadProfileImageRoot>
                <Card>
                    <CardContent>
                        <StyledUploadProfileImageSection>
                            <StyledUploadProfileImageSectionLabel>Profile image</StyledUploadProfileImageSectionLabel>
                            <StyledUploadProfileImageTitle>Upload profile image</StyledUploadProfileImageTitle>
                            <StyledUploadProfileImageHint>
                                Profile image upload action is wired to this screen. You can connect your file
                                picker or camera flow here.
                            </StyledUploadProfileImageHint>
                            <Button fullWidth variant="outline" disabled>
                                Choose image (coming soon)
                            </Button>
                        </StyledUploadProfileImageSection>
                    </CardContent>
                </Card>
            </StyledUploadProfileImageRoot>
        </ScreenShell>
    );
}
