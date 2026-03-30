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
    let isActive = true;

    const boot = async () =>
    {
      try
      {
        const resolution = await resolveBootRoute();
        if (!isActive)
        {
          return;
        }

        router.replace(resolution.route as never);
      } catch
      {
        if (isActive)
        {
          router.replace("/(auth)/onboarding");
        }
      }
    };

    void boot();

    return () =>
    {
      isActive = false;
    };
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
