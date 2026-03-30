import
{
    AuthLayoutRoot,
} from "@/styles";
import { Stack } from "expo-router";

export default function AuthLayout()
{
    return (
        <AuthLayoutRoot>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="login-with-password" />
                <Stack.Screen name="register" />
                <Stack.Screen name="verify-otp" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="reset-password" />
                <Stack.Screen name="notification-permission" />
                <Stack.Screen name="customer-not-supported" />
            </Stack>
        </AuthLayoutRoot>
    );
}
