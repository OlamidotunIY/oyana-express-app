import "expo-dev-client";
import { ToastHost } from "@/components/ui";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { client } from "@/lib/apolloClient";
import { initializeNotificationChannels } from "@/lib/push-notifications";
import { getUiTheme } from "@/lib/ui-theme";
import { ApolloProvider } from "@apollo/client/react";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { ThemeProvider } from "styled-components/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout()
{
  const colorScheme = useColorScheme();
  const handleLayout = useCallback(() =>
  {
    void SplashScreen.hideAsync().catch(() => undefined);
  }, []);

  useEffect(() =>
  {
    void initializeNotificationChannels();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={getUiTheme(colorScheme)}>
        <View style={{ flex: 1 }} onLayout={handleLayout}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          <ToastHost />
        </View>
      </ThemeProvider>
    </ApolloProvider>
  );
}
