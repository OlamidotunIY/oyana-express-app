import { Stack, usePathname, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import
{
    AuthLayoutRoot,
    AuthTabBar,
    AuthTab,
    AuthTabText,
    AuthTabIndicator,
} from "@/styles";

function LoginTabBar()
{
    const router = useRouter();
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const isPassword = pathname.endsWith("login-with-password");

    return (
        <AuthTabBar style={{ paddingBottom: insets.bottom + 8 }}>
            <AuthTab
                onPress={() => router.replace("/(auth)/login-with-password")}
                activeOpacity={0.75}
            >
                <AuthTabText active={isPassword}>Password</AuthTabText>
                {isPassword && <AuthTabIndicator />}
            </AuthTab>
            <AuthTab
                onPress={() => router.replace("/(auth)/login-with-otp")}
                activeOpacity={0.75}
            >
                <AuthTabText active={!isPassword}>OTP</AuthTabText>
                {!isPassword && <AuthTabIndicator />}
            </AuthTab>
        </AuthTabBar>
    );
}

export default function AuthLayout()
{
    const pathname = usePathname();
    const showLoginTabs =
        pathname.endsWith("login-with-password") ||
        pathname.endsWith("login-with-otp");

    return (
        <AuthLayoutRoot>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="login-with-password" />
                <Stack.Screen name="login-with-otp" />
                <Stack.Screen name="register" />
                <Stack.Screen name="verify-otp" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="reset-password" />
                <Stack.Screen name="notification-permission" />
                <Stack.Screen name="customer-not-supported" />
            </Stack>
            {showLoginTabs && <LoginTabBar />}
        </AuthLayoutRoot>
    );
}
