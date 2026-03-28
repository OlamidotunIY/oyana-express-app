import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";
import { Button } from "@/components/ui/Button";
import
{
    OnboardingBackground,
    OnboardingBgImage,
    OnboardingButtonGroup,
    OnboardingFooter,
    OnboardingFooterText,
    OnboardingOverlay,
    OnboardingSheet,
    OnboardingSheetFade,
} from "@/styles";

const backgroundImage = require("../../assets/images/authImage.png");

export default function Onboarding()
{
    const router = useRouter();
    const theme = useTheme();

    return (
        <OnboardingBackground>
            <OnboardingBgImage source={backgroundImage} resizeMode="cover" />
            <OnboardingOverlay />
            <OnboardingSheetFade
                colors={["transparent", theme.colors.card]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <OnboardingSheet>
                <OnboardingButtonGroup>
                    <Button
                        variant="default"
                        fullWidth
                        size="lg"
                        onPress={() =>
                            router.push({
                                pathname: "/(auth)/register",
                                params: { type: "provider" },
                            })
                        }
                    >
                        Deliver and Earn - Become a Provider
                    </Button>
                    <Button
                        variant="outline"
                        fullWidth
                        size="lg"
                        onPress={() =>
                            router.push({
                                pathname: "/(auth)/register",
                                params: { type: "user" },
                            })
                        }
                    >
                        Ship and Track - Send a Delivery
                    </Button>
                </OnboardingButtonGroup>

                <OnboardingFooter>
                    <OnboardingFooterText>Already have an account? </OnboardingFooterText>
                    <Button
                        variant="link"
                        style={{ paddingHorizontal: 0, paddingVertical: 0, minHeight: 0 }}
                        onPress={() => router.push("/(auth)/login-with-password")}
                    >
                        Login
                    </Button>
                </OnboardingFooter>
            </OnboardingSheet>
        </OnboardingBackground>
    );
}
