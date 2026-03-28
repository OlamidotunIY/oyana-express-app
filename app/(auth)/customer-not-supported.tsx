import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";

import { Button } from "@/components/ui/Button";
import { clearAuthTokens } from "@/lib/auth-cookies";
import { client } from "@/lib/apolloClient";
import { useUserStore } from "@/store/userStore";
import
{
    AuthContent,
    AuthHeader,
    AuthKeyboardAvoiding,
    AuthScrollView,
    AuthSubtitle,
    AuthTitle,
} from "@/styles";
import { useTheme } from "styled-components/native";

export default function CustomerNotSupportedScreen()
{
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    const clearUser = useUserStore((s) => s.clearUser);

    async function handleSignOut()
    {
        clearAuthTokens();
        clearUser();
        await client.clearStore();
        router.replace("/(auth)/onboarding");
    }

    return (
        <AuthKeyboardAvoiding>
            <AuthScrollView
                contentContainerStyle={{ paddingTop: insets.top + 40, flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <AuthContent>
                    <View style={{ marginBottom: 32 }}>
                        <MaterialIcons
                            name="phone-iphone"
                            size={52}
                            color={theme.colors.primary}
                        />
                    </View>

                    <AuthHeader>
                        <AuthTitle>Providers only</AuthTitle>
                        <AuthSubtitle>
                            This app is currently available to registered business providers only.
                            Customer access is not yet supported on mobile.
                        </AuthSubtitle>
                    </AuthHeader>

                    <AuthSubtitle style={{ marginBottom: 40, lineHeight: 24 }}>
                        If you want to book or track shipments as a customer, please visit our web platform instead. Business providers can continue using this app to manage their operations.
                    </AuthSubtitle>

                    <View style={{ gap: 12 }}>
                        <Button variant="outline" onPress={() => void handleSignOut()}>
                            Sign out
                        </Button>
                    </View>
                </AuthContent>
            </AuthScrollView>
        </AuthKeyboardAvoiding>
    );
}
