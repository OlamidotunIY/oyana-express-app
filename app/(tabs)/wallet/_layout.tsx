import { PageHeader, TabHeader, resolveHeaderTitle } from "@/components/NavigationHeader";
import { Stack, useRouter } from "expo-router";
import { useTheme } from "styled-components/native";

export default function WalletLayout()
{
    const router = useRouter();
    const theme = useTheme();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Wallet",
                    header: ({ options, route }) => (
                        <TabHeader
                            title={resolveHeaderTitle(route.name, options.title)}
                            backgroundColor={theme.colors.heroSurface}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="wallet-fund"
                options={{
                    title: "Fund Wallet",
                    header: ({ options, route, navigation, back }) => (
                        <PageHeader
                            canGoBack
                            onBackPress={() =>
                            {
                                if (back || navigation.canGoBack())
                                {
                                    navigation.goBack();
                                    return;
                                }

                                router.push("/(tabs)/wallet");
                            }}
                            title={resolveHeaderTitle(route.name, options.title)}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name="wallet-withdraw"
                options={{
                    title: "Withdraw",
                    header: ({ options, route, navigation, back }) => (
                        <PageHeader
                            canGoBack
                            onBackPress={() =>
                            {
                                if (back || navigation.canGoBack())
                                {
                                    navigation.goBack();
                                    return;
                                }

                                router.push("/(tabs)/wallet");
                            }}
                            title={resolveHeaderTitle(route.name, options.title)}
                        />
                    ),
                }}
            />
        </Stack>
    );
}
