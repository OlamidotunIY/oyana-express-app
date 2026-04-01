import { IncomingDispatchOffersOverlay } from "@/components/dispatch/IncomingDispatchOffersOverlay";
import { HapticTab } from "@/components/haptic-tab";
import
{
    HeaderMenuItem,
    TabHeader,
    resolveHeaderTitle,
} from "@/components/NavigationHeader";
import {
    canAccessFreight,
    hasDriverMode,
    isDriverMode,
    resolveAuthenticatedRoute,
} from "@/lib/session";
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
    const driverModeEnabled = isDriverMode(user);
    const showFreightTab = driverModeEnabled && canAccessFreight(user);
    const notificationCount = user?.unreadNotificationCount ?? 0;

    React.useEffect(() =>
    {
        if (user !== null && !hasDriverMode(user) && driverModeEnabled)
        {
            router.replace(resolveAuthenticatedRoute(user) as never);
        }
    }, [driverModeEnabled, router, user]);

    const getTabMenuItems = React.useCallback((routeName: string): HeaderMenuItem[] =>
    {
        if (routeName === "accounts")
        {
            return [
                {
                    id: "kyc-status",
                    label: driverModeEnabled ? "Driver setup" : "Driver mode",
                    iconName: "verified-user" as const,
                    onPress: () => router.push("/accounts/driver-mode" as never),
                },
            ];
        }

        return [];
    }, [driverModeEnabled, router]);

    const handleHomeRefresh = React.useCallback(() =>
    {
        router.replace("/(tabs)");
    }, [router]);

    const handleNotificationsPress = React.useCallback(() =>
    {
        router.push("/(tabs)/notifications" as never);
    }, [router]);

    return (
        <>
            <Tabs
                screenOptions={{
                    header: ({ options, route }) =>
                    {
                        const title = resolveHeaderTitle(route.name, options.title);
                        const heroBg =
                            route.name === "index" ? theme.colors.heroSurface :
                                route.name === "wallet" ? theme.colors.heroSurface :
                                    undefined;
                        return (
                            <TabHeader
                                title={title}
                                showProfileCard={route.name === "index"}
                                menuItems={getTabMenuItems(route.name)}
                                notificationCount={route.name === "index" ? notificationCount : undefined}
                                onNotificationsPress={route.name === "index" ? handleNotificationsPress : undefined}
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
                        title: "Dispatch",
                        headerShown: false,
                        href: driverModeEnabled ? undefined : null,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="inventory-2" color={color} size={size} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="shipments"
                    options={{
                        title: "Shipments",
                        href: driverModeEnabled ? null : undefined,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="local-shipping" color={color} size={size} />
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
                    name="notifications"
                    options={{
                        title: "Notifications",
                        href: driverModeEnabled ? null : undefined,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="notifications" color={color} size={size} />
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
            {driverModeEnabled ? <IncomingDispatchOffersOverlay /> : null}
        </>
    );
}
