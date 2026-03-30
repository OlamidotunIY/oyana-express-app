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
            onPress={() => router.push("/(auth)/register")}
          >
            Register as a Driver
          </Button>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            onPress={() => void promptGoogleAuth()}
            disabled={googleLoading}
          >
            {googleLoading ? "Connecting to Google…" : "Continue with Google"}
          </Button>
        </OnboardingButtonGroup>

        <OnboardingFooter>
          <OnboardingFooterText>Already have an account? </OnboardingFooterText>
          <Button
            variant="link"
            style={{ paddingHorizontal: 0, paddingVertical: 0, minHeight: 0 }}
            onPress={() => router.push("/(auth)/login-with-password")}
          >
            Sign in
          </Button>
        </OnboardingFooter>
      </OnboardingSheet>
    </OnboardingBackground>
  );
}
