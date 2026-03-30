import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "@/components/ui/Button";
import {
  AuthContent,
  AuthHeader,
  AuthKeyboardAvoiding,
  AuthScrollView,
  AuthSubtitle,
  AuthTitle,
} from "@/styles";

type AppStatusParams = {
  type?: "maintenance" | "force-update";
};

export default function AppStatusScreen() {
  const insets = useSafeAreaInsets();
  const { type } = useLocalSearchParams<AppStatusParams>();
  const isForceUpdate = type === "force-update";

  return (
    <AuthKeyboardAvoiding
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthScrollView
        contentContainerStyle={{ paddingTop: insets.top + 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthContent>
          <AuthHeader>
            <AuthTitle>
              {isForceUpdate ? "Update required" : "We’ll be right back"}
            </AuthTitle>
            <AuthSubtitle>
              {isForceUpdate
                ? "Please update the app to continue using your driver account."
                : "The platform is temporarily unavailable while we complete maintenance."}
            </AuthSubtitle>
          </AuthHeader>

          <Button fullWidth disabled>
            {isForceUpdate ? "Update to continue" : "Maintenance in progress"}
          </Button>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}
