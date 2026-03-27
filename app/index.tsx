import { Stack, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useTheme } from "styled-components/native";
import Logo from "@/components/Logo";
import { SplashContainer, LoadingWrapper } from "@/styles/SplashScreen";
import { resolveBootRoute } from "@/lib/session";

export default function Index()
{
  const theme = useTheme();
  const router = useRouter();

  useEffect(() =>
  {
    resolveBootRoute().then((resolution) =>
    {
      if (resolution.route === "tabs")
      {
        router.replace("/(tabs)");
      } else if (resolution.route === "verify-email")
      {
        router.replace({
          pathname: "/(auth)/verify-otp",
          params: {
            email: resolution.email,
            mode: "email-verification",
          },
        });
      } else if (resolution.route === "notification-permission")
      {
        router.replace("/(auth)/notification-permission");
      } else
      {
        router.replace("/(auth)/onboarding");
      }
    });
  }, [router]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SplashContainer>
        <Logo />
        <LoadingWrapper>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadingWrapper>
      </SplashContainer>
    </>
  );
}


