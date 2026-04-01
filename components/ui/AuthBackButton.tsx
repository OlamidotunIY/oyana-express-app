import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

import { BackButton, BackButtonIcon, BackButtonText } from "@/styles";

type AuthBackButtonProps = {
  fallbackHref: string;
  label?: string;
};

export function AuthBackButton({
  fallbackHref,
  label = "Back",
}: AuthBackButtonProps) {
  const router = useRouter();
  const theme = useTheme();

  const handlePress = React.useCallback(() => {
    if (typeof router.canGoBack === "function" && router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(fallbackHref as never);
  }, [fallbackHref, router]);

  return (
    <BackButton
      accessibilityHint="Go back to the previous onboarding step"
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={handlePress}
    >
      <BackButtonIcon>
        <MaterialIcons
          name="arrow-back"
          size={18}
          color={theme.colors.foreground}
        />
      </BackButtonIcon>
      <BackButtonText>{label}</BackButtonText>
    </BackButton>
  );
}
