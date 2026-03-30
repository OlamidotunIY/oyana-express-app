import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";

const ONBOARDING_STEPS = [
  { key: "email-verification", label: "Email verification" },
  { key: "phone", label: "Phone number" },
  { key: "verify-phone", label: "Phone verification" },
  { key: "driver", label: "Driver profile" },
  { key: "address", label: "Active address" },
  { key: "notifications", label: "Notifications" },
] as const;

export type OnboardingProgressStep = (typeof ONBOARDING_STEPS)[number]["key"];

type OnboardingProgressProps = {
  currentStep: OnboardingProgressStep;
};

export function OnboardingProgress({
  currentStep,
}: OnboardingProgressProps) {
  const theme = useTheme();
  const currentIndex = Math.max(
    ONBOARDING_STEPS.findIndex((step) => step.key === currentStep),
    0,
  );
  const currentLabel = ONBOARDING_STEPS[currentIndex]?.label ?? "Onboarding";

  return (
    <View style={{ marginBottom: 28, gap: 12 }}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {ONBOARDING_STEPS.map((step, index) => {
          const isFilled = index <= currentIndex;

          return (
            <View
              key={step.key}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 999,
                backgroundColor: isFilled
                  ? theme.colors.primary
                  : theme.colors.border,
                opacity: isFilled ? 1 : 0.6,
              }}
            />
          );
        })}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 0.3,
            textTransform: "uppercase",
          }}
        >
          Step {currentIndex + 1} of {ONBOARDING_STEPS.length}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            color: theme.colors.mutedForeground,
            fontSize: 12,
            fontWeight: "600",
            textAlign: "right",
          }}
        >
          {currentLabel}
        </Text>
      </View>
    </View>
  );
}
