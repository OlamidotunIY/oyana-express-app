import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";
import { Button } from "@/components/ui/Button";
import { useGoogleDriverAuth } from "@/lib/useGoogleDriverAuth";
import {
  OnboardingBackground,
  OnboardingBgImage,
  OnboardingButtonGroup,
  OnboardingFooter,
  OnboardingFooterText,
  OnboardingOverlay,
  OnboardingSheet,
  OnboardingSheetFade,
} from "@/styles";

const backgroundImage = require("../../../assets/images/authImage.png");

export default function OnboardingLanding() {
  const router = useRouter();
  const theme = useTheme();
  const { promptGoogleAuth, loading: googleLoading } = useGoogleDriverAuth();

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
            onPress={() => router.push("/(auth)/onboarding/phone" as never)}
          >
            Continue with Phone
          </Button>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            onPress={() => void promptGoogleAuth()}
            disabled={googleLoading}
          >
            {googleLoading ? "Connecting to Google..." : "Continue with Google"}
          </Button>
        </OnboardingButtonGroup>

        <OnboardingFooter>
          <OnboardingFooterText>
            New mobile accounts start as shippers. Driver mode becomes available from your account after onboarding.
          </OnboardingFooterText>
        </OnboardingFooter>
      </OnboardingSheet>
    </OnboardingBackground>
  );
}
