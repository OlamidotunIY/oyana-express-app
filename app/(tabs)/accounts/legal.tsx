import React from "react";
import * as Linking from "expo-linking";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Card, CardContent } from "@/components/ui";
import
    {
        StyledLegalHint,
        StyledLegalRoot,
        StyledLegalSection,
        StyledLegalSectionLabel,
        StyledLegalTitle,
    } from "@/styles/tabs/accounts";

const TERMS_URL = process.env.EXPO_PUBLIC_TERMS_URL ?? "https://oyana.app/terms";
const PRIVACY_URL = process.env.EXPO_PUBLIC_PRIVACY_URL ?? "https://oyana.app/privacy";

export default function LegalScreen()
{
    const openUrl = async (url: string) =>
    {
        await Linking.openURL(url);
    };

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledLegalRoot>
                <Card>
                    <CardContent>
                        <StyledLegalSection>
                            <StyledLegalSectionLabel>Legal / Policies</StyledLegalSectionLabel>
                            <StyledLegalTitle>Terms and privacy</StyledLegalTitle>
                            <StyledLegalHint>
                                Review legal documents and policy commitments for using Oyana services.
                            </StyledLegalHint>
                            <Button fullWidth variant="outline" onPress={() => void openUrl(TERMS_URL)}>
                                Open terms
                            </Button>
                            <Button fullWidth variant="outline" onPress={() => void openUrl(PRIVACY_URL)}>
                                Open privacy policy
                            </Button>
                        </StyledLegalSection>
                    </CardContent>
                </Card>
            </StyledLegalRoot>
        </ScreenShell>
    );
}
