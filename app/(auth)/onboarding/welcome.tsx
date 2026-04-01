import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMutation } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

import { AuthBackButton } from "@/components/ui/AuthBackButton";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  AppMode,
  UpdateProfileMutation,
  UpdateProfileMutationVariables,
} from "@/gql/graphql";
import { UPDATE_PROFILE_MUTATION } from "@/graphql";
import {
  hasCompletedInitialOnboarding,
  parseAuthError,
  resolveAuthenticatedRoute,
} from "@/lib/session";
import { useInitialOnboardingStore } from "@/store/initialOnboardingStore";
import { useToastStore } from "@/store/toastStore";
import { useUserStore } from "@/store/userStore";
import {
  AuthContent,
  AuthField,
  AuthForm,
  AuthHeader,
  AuthKeyboardAvoiding,
  AuthLabel,
  AuthScrollView,
  AuthSubtitle,
  AuthTitle,
} from "@/styles";

function normalizeRoleParam(value?: string | string[] | null) {
  const rawValue = Array.isArray(value) ? value[0] : value;
  if (rawValue === "driver") {
    return AppMode.Driver;
  }

  if (rawValue === "shipper") {
    return AppMode.Shipper;
  }

  return null;
}

export default function OnboardingWelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { role } = useLocalSearchParams<{ role?: string }>();
  const profile = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const showToast = useToastStore((state) => state.showToast);
  const markCompleted = useInitialOnboardingStore((state) => state.markCompleted);
  const clearSelectedMode = useInitialOnboardingStore((state) => state.clearSelectedMode);

  const persistedRole = profile
    ? useInitialOnboardingStore.getState().getSelectedMode(profile.id)
    : null;
  const selectedRole = normalizeRoleParam(role) ?? persistedRole;

  const [firstName, setFirstName] = React.useState(profile?.firstName ?? "");
  const [lastName, setLastName] = React.useState(profile?.lastName ?? "");

  const [updateProfile, { loading }] = useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UPDATE_PROFILE_MUTATION);

  React.useEffect(() => {
    if (!profile) {
      router.replace("/(auth)/onboarding" as never);
      return;
    }

    if (hasCompletedInitialOnboarding(profile)) {
      router.replace(resolveAuthenticatedRoute(profile) as never);
      return;
    }

    if (!selectedRole) {
      router.replace("/(auth)/onboarding/role" as never);
    }
  }, [profile, router, selectedRole]);

  React.useEffect(() => {
    setFirstName(profile?.firstName ?? "");
    setLastName(profile?.lastName ?? "");
  }, [profile?.firstName, profile?.lastName]);

  const handleContinue = React.useCallback(async () => {
    if (!profile || !selectedRole) {
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      showToast({
        message: "Enter your full name before continuing.",
        tone: "error",
      });
      return;
    }

    try {
      const { data } = await updateProfile({
        variables: {
          input: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
          },
        },
      });

      const updatedProfile = data?.updateProfile;
      if (!updatedProfile) {
        throw new Error("Your profile could not be updated.");
      }

      setUser(updatedProfile);
      markCompleted(updatedProfile.id);
      clearSelectedMode(updatedProfile.id);

      if (selectedRole === AppMode.Driver) {
        router.replace("/(tabs)/accounts/driver-mode" as never);
        return;
      }

      router.replace(resolveAuthenticatedRoute(updatedProfile) as never);
    } catch (error) {
      showToast({
        message: parseAuthError(error, "Unable to save your name right now."),
        tone: "error",
      });
    }
  }, [
    clearSelectedMode,
    firstName,
    lastName,
    markCompleted,
    profile,
    router,
    selectedRole,
    setUser,
    showToast,
    updateProfile,
  ]);

  const roleLabel = selectedRole === AppMode.Driver ? "Driver" : "Shipper";

  return (
    <AuthKeyboardAvoiding
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 32,
          paddingBottom: Math.max(insets.bottom, 20) + 20,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthContent>
          <AuthBackButton fallbackHref="/(auth)/onboarding/role" />

          <AuthHeader>
            <WelcomeRoleBadge>
              <MaterialIcons
                name={selectedRole === AppMode.Driver ? "directions-car" : "local-shipping"}
                size={14}
                color={theme.colors.primary}
              />
              <WelcomeRoleBadgeText>{roleLabel}</WelcomeRoleBadgeText>
            </WelcomeRoleBadge>

            <AuthTitle>Welcome to Oyana</AuthTitle>
            <AuthSubtitle>
              Tell us your full name so we can set up your mobile account.{" "}
              {selectedRole === AppMode.Driver
                ? "We'll take you straight into driver onboarding next."
                : "After this, we'll open your shipper home."}
            </AuthSubtitle>
          </AuthHeader>

          <AuthForm>
            <AuthField>
              <AuthLabel>First name</AuthLabel>
              <Input
                value={firstName}
                onChangeText={setFirstName}
                placeholder="John"
                autoCapitalize="words"
                autoComplete="name-given"
              />
            </AuthField>

            <AuthField>
              <AuthLabel>Last name</AuthLabel>
              <Input
                value={lastName}
                onChangeText={setLastName}
                placeholder="Doe"
                autoCapitalize="words"
                autoComplete="name-family"
              />
            </AuthField>
          </AuthForm>

          <WelcomeSummaryCard>
            <WelcomeSummaryTitle>
              {selectedRole === AppMode.Driver
                ? "Next stop: driver onboarding"
                : "Next stop: shipper home"}
            </WelcomeSummaryTitle>
            <WelcomeSummaryText>
              {selectedRole === AppMode.Driver
                ? "After saving your name, you'll land inside the driver verification flow to add your legal details, vehicle, and compliance documents."
                : "After saving your name, you'll land on your shipper home and can start creating shipments or quick dispatch requests."}
            </WelcomeSummaryText>
          </WelcomeSummaryCard>

          <Button
            fullWidth
            size="lg"
            onPress={() => void handleContinue()}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : selectedRole === AppMode.Driver
                ? "Continue to driver onboarding"
                : "Go to shipper home"}
          </Button>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}

const WelcomeRoleBadge = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
  background-color: ${({ theme }) => theme.colors.heroSurface};
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const WelcomeRoleBadgeText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

const WelcomeSummaryCard = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.xl}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.heroSurface};
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const WelcomeSummaryTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

const WelcomeSummaryText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;
