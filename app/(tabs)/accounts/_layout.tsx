import
{
    HeaderMenuItem,
    PageHeader,
    TabHeader,
    resolveHeaderTitle,
} from "@/components/NavigationHeader";
import { Stack, useRouter } from "expo-router";
import { useTheme } from "styled-components/native";

export default function AccountLayout()
{
    const router = useRouter();
    const theme = useTheme();

    const accountMenuItems: HeaderMenuItem[] = [
        {
            id: "account-settings",
            label: "Settings",
            iconName: "settings",
            onPress: () => router.push("/accounts/settings" as never),
        },
        {
            id: "account-edit-profile",
            label: "Edit profile",
            iconName: "edit",
            onPress: () => router.push("/accounts/edit-profile" as never),
        },
    ];

    return (
        <Stack
            screenOptions={{
                header: ({ options, route, navigation, back }) => (
                    <PageHeader
                        canGoBack={Boolean(back)}
                        onBackPress={() => navigation.goBack()}
                        title={resolveHeaderTitle(route.name, options.title)}
                    />
                ),
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Account",
                    header: ({ options, route }) => (
                        <TabHeader
                            title={resolveHeaderTitle(route.name, options.title)}
                            menuItems={accountMenuItems}
                            backgroundColor={theme.colors.heroSurface}
                        />
                    ),
                }}
            />
            <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
            <Stack.Screen name="driver-mode" options={{ title: "Driver Mode" }} />
            <Stack.Screen name="manage-addresses" options={{ title: "Manage Addresses" }} />
            <Stack.Screen name="verify-phone" options={{ title: "Verify Phone" }} />
            <Stack.Screen name="settings" options={{ title: "Settings" }} />
            <Stack.Screen name="support-stack" options={{ title: "Support" }} />
            <Stack.Screen name="legal" options={{ title: "Legal & Policies" }} />
        </Stack>
    );
}
