import { IncomingDispatchOffersOverlay } from "@/components/dispatch/IncomingDispatchOffersOverlay";
import { HapticTab } from "@/components/haptic-tab";
import
{
    HeaderMenuItem,
    TabHeader,
    resolveHeaderTitle,
} from "@/components/NavigationHeader";
import { isProviderUser } from "@/lib/session";
import { useUserStore } from "@/store/userStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

export default function TabsLayout()
{
    const router = useRouter();
    const theme = useTheme();
    const user = useUserStore((state) => state.user);
    const showFreightTab = isProviderUser(user);

    const getTabMenuItems = React.useCallback((routeName: string): HeaderMenuItem[] =>
    {
        if (routeName === "accounts")
        {
            return [
                {
                    id: "kyc-status",
                    label: "KYC status",
                    iconName: "verified-user" as const,
                    onPress: () => router.push("/accounts/kyc-status" as never),
                },
            ];
        }

        return [];
    }, [router]);

    const handleHomeRefresh = React.useCallback(() =>
    {
        router.replace("/(tabs)");
    }, [router]);

    return (
        <>
            <Tabs
                screenOptions={{
                    header: ({ options, route }) =>
                    {
                        const title = resolveHeaderTitle(route.name, options.title);
                        const heroBg =
                            route.name === "index" ? "#0f2742" :
                                route.name === "wallet" ? "#0f2742" :
                                    undefined;
                        return (
                            <TabHeader
                                title={title}
                                showProfileCard={route.name === "index"}
                                menuItems={getTabMenuItems(route.name)}
                                onRefresh={route.name === "index" ? handleHomeRefresh : undefined}
                                backgroundColor={heroBg}
                            />
                        );
                    },
                    tabBarButton: HapticTab,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.mutedForeground,
                    tabBarStyle: {
                        backgroundColor: theme.colors.background,
                        borderTopColor: theme.colors.border,
                        height: 64,
                        paddingTop: 6,
                        paddingBottom: 8,
                    },
                    tabBarLabelStyle: {
                        fontSize: 11,
                        fontWeight: "600",
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home-filled" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="dispatch"
                    options={{
                        title: "Shipments",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="inventory-2" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="freight"
                    options={{
                        title: "Freight",
                        headerShown: false,
                        href: showFreightTab ? undefined : null,
                        popToTopOnBlur: true,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="local-shipping" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="wallet"
                    options={{
                        title: "Wallet",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="account-balance-wallet" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="accounts"
                    options={{
                        title: "Account",
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="person" color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
            <IncomingDispatchOffersOverlay />
        </>
    );
}
