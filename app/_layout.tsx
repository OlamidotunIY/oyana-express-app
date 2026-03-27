import { IncomingDispatchOffersOverlay } from "@/components/dispatch/IncomingDispatchOffersOverlay";
import { ToastHost } from "@/components/ui";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { client } from "@/lib/apolloClient";
import { initializeNotificationChannels } from "@/lib/push-notifications";
import { getUiTheme } from "@/lib/ui-theme";
import { ApolloProvider } from "@apollo/client/react";
import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";
import { useEffect } from "react";
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

  useEffect(() =>
  {
    void initializeNotificationChannels();
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={getUiTheme(colorScheme)}>
        <>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
          <ToastHost />
          <IncomingDispatchOffersOverlay />
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}


