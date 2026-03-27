import { PageHeader, TabHeader, resolveHeaderTitle } from "@/components/NavigationHeader";
import { Stack, useRouter } from "expo-router";

export default function WalletLayout()
{
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Wallet",
                    header: ({ options, route }) => (
                        <TabHeader
                            title={resolveHeaderTitle(route.name, options.title)}
                            backgroundColor="#0f2742"
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
