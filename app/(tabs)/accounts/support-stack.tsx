import React from "react";
import * as Linking from "expo-linking";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Card, CardContent } from "@/components/ui";
import
    {
        StyledSupportHint,
        StyledSupportRoot,
        StyledSupportSection,
        StyledSupportSectionLabel,
        StyledSupportTitle,
    } from "@/styles/tabs/accounts";

export default function SupportStackScreen()
{
    const openEmail = async () =>
    {
        await Linking.openURL("mailto:support@oyana.app");
    };

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledSupportRoot>
                <Card>
                    <CardContent>
                        <StyledSupportSection>
                            <StyledSupportSectionLabel>Support</StyledSupportSectionLabel>
                            <StyledSupportTitle>Need help?</StyledSupportTitle>
                            <StyledSupportHint>
                                Reach support for account, shipment, payout, or technical issues.
                            </StyledSupportHint>
                            <Button fullWidth onPress={() => void openEmail()}>
                                Contact support
                            </Button>
                        </StyledSupportSection>
                    </CardContent>
                </Card>
            </StyledSupportRoot>
        </ScreenShell>
    );
}
