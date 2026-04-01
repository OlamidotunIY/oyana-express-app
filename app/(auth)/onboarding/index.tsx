import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";
import { Button } from "@/components/ui/Button";
import { resolveAuthenticatedRoute } from "@/lib/session";
import { useGoogleDriverAuth } from "@/lib/useGoogleDriverAuth";
import { useUserStore } from "@/store/userStore";
import
  {
    OnboardingBackground,
    OnboardingBgImage,
    OnboardingButtonGroup,
    OnboardingOverlay,
    OnboardingSheet,
    OnboardingSheetFade,
    StyledButtonText,
  } from "@/styles";

const backgroundImage = require("../../../assets/images/authImage.png");

export default function OnboardingLanding()
{
  const router = useRouter();
  const theme = useTheme();
  const user = useUserStore((state) => state.user);
  const { promptGoogleAuth, loading: googleLoading } = useGoogleDriverAuth();

  React.useEffect(() =>
  {
    if (!user)
    {
      return;
    }

    router.replace(resolveAuthenticatedRoute(user) as never);
  }, [router, user]);

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
            <MaterialIcons name="phone" size={20} color={theme.colors.primaryForeground} />
            <StyledButtonText variant="default" size="lg">Continue with Phone</StyledButtonText>
          </Button>
          <Button
            variant="outline"
            fullWidth
            size="lg"
            onPress={() => void promptGoogleAuth()}
            disabled={googleLoading}
          >
            <AntDesign name="google" size={20} color={theme.colors.foreground} />
            <StyledButtonText variant="outline" size="lg">
              {googleLoading ? "Connecting to Google..." : "Continue with Google"}
            </StyledButtonText>
          </Button>
        </OnboardingButtonGroup>

      </OnboardingSheet>
    </OnboardingBackground>
  );
}
