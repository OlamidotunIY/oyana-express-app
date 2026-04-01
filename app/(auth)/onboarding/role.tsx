import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";

import { AuthBackButton } from "@/components/ui/AuthBackButton";
import { Button } from "@/components/ui/Button";
import { AppMode } from "@/gql/graphql";
import {
  hasCompletedInitialOnboarding,
  resolveAuthenticatedRoute,
} from "@/lib/session";
import { useInitialOnboardingStore } from "@/store/initialOnboardingStore";
import { useUserStore } from "@/store/userStore";
import {
  AuthContent,
  AuthHeader,
  AuthScrollView,
  AuthSubtitle,
  AuthTitle,
} from "@/styles";

type RoleOption = {
  description: string;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  value: AppMode;
};

const ROLE_OPTIONS: RoleOption[] = [
  {
    value: AppMode.Shipper,
    icon: "local-shipping",
    description: "Create shipments, request quick dispatch, and manage your wallet.",
  },
  {
    value: AppMode.Driver,
    icon: "directions-car",
    description: "Start driver verification now and unlock dispatch or freight tools after approval.",
  },
];

export default function OnboardingRoleScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const user = useUserStore((state) => state.user);
  const setSelectedMode = useInitialOnboardingStore((state) => state.setSelectedMode);
  const [selectedRole, setSelectedRole] = React.useState<AppMode>(AppMode.Shipper);

  React.useEffect(() => {
    if (!user) {
      router.replace("/(auth)/onboarding" as never);
      return;
    }

    if (hasCompletedInitialOnboarding(user)) {
      router.replace(resolveAuthenticatedRoute(user) as never);
      return;
    }

    const persistedMode = useInitialOnboardingStore.getState().getSelectedMode(user.id);
    if (persistedMode) {
      setSelectedRole(persistedMode);
    }
  }, [router, user]);

  const handleContinue = React.useCallback(() => {
    if (!user) {
      return;
    }

    setSelectedMode(user.id, selectedRole);
    router.push({
      pathname: "/(auth)/onboarding/welcome",
      params: {
        role: selectedRole === AppMode.Driver ? "driver" : "shipper",
      },
    } as never);
  }, [router, selectedRole, setSelectedMode, user]);

  return (
    <AuthScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: insets.top + 18,
        paddingBottom: Math.max(insets.bottom, 20) + 20,
      }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <AuthContent style={{ flex: 1 }}>
        <AuthBackButton fallbackHref="/(auth)/onboarding/verify-phone" />

        <AuthHeader style={{ marginBottom: 28 }}>
          <AuthTitle>Will you ship or drive with Oyana?</AuthTitle>
          <AuthSubtitle>
            Choose how you want to start today. You can switch modes later from your account.
          </AuthSubtitle>
        </AuthHeader>

        <RoleArtCard>
          <RoleArtBackdropOne />
          <RoleArtBackdropTwo />
          <RoleArtBackdropThree />

          <RoleArtCharacters>
            <RoleAvatar>
              <MaterialIcons name="inventory-2" size={34} color={theme.colors.foreground} />
            </RoleAvatar>
            <RoleAvatar style={{ marginTop: 32 }}>
              <MaterialIcons name="drive-eta" size={34} color={theme.colors.foreground} />
            </RoleAvatar>
          </RoleArtCharacters>
        </RoleArtCard>

        <RoleOptions>
          {ROLE_OPTIONS.map((option) => {
            const active = selectedRole === option.value;

            return (
              <RoleChoice
                key={option.value}
                $active={active}
                onPress={() => setSelectedRole(option.value)}
              >
                <RoleChoiceLead>
                  <RoleChoiceIcon $active={active}>
                    <MaterialIcons
                      name={option.icon}
                      size={20}
                      color={active ? theme.colors.primaryForeground : theme.colors.primary}
                    />
                  </RoleChoiceIcon>
                  <View style={{ flex: 1, gap: 4 }}>
                    <RoleChoiceTitle $active={active}>
                      {option.value === AppMode.Driver ? "Driver" : "Shipper"}
                    </RoleChoiceTitle>
                    <RoleChoiceDescription>
                      {option.description}
                    </RoleChoiceDescription>
                  </View>
                </RoleChoiceLead>
                <MaterialIcons
                  name={active ? "radio-button-checked" : "radio-button-unchecked"}
                  size={22}
                  color={active ? theme.colors.primary : theme.colors.mutedForeground}
                />
              </RoleChoice>
            );
          })}
        </RoleOptions>

        <Button fullWidth size="lg" onPress={handleContinue}>
          {selectedRole === AppMode.Driver ? "Continue as driver" : "Continue as shipper"}
        </Button>
      </AuthContent>
    </AuthScrollView>
  );
}

const RoleArtCard = styled.View`
  position: relative;
  height: 280px;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

const RoleArtBackdrop = styled.View`
  position: absolute;
  width: 180px;
  height: 132px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const RoleArtBackdropOne = styled(RoleArtBackdrop)`
  transform: rotate(-24deg);
  left: 36px;
  top: 54px;
`;

const RoleArtBackdropTwo = styled(RoleArtBackdrop)`
  transform: rotate(18deg);
  right: 40px;
  top: 48px;
`;

const RoleArtBackdropThree = styled(RoleArtBackdrop)`
  width: 156px;
  height: 118px;
  transform: rotate(-12deg);
  right: 18px;
  bottom: 22px;
`;

const RoleArtCharacters = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const RoleAvatar = styled.View`
  width: 124px;
  height: 124px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thick}px;
  border-color: ${({ theme }) => theme.colors.foreground};
  background-color: ${({ theme }) => theme.colors.card};
  align-items: center;
  justify-content: center;
`;

const RoleOptions = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

const RoleChoice = styled(Pressable)<{ $active: boolean }>`
  border-radius: ${({ theme }) => theme.radii.xl}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.heroSurface : theme.colors.card};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const RoleChoiceLead = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const RoleChoiceIcon = styled.View<{ $active: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.heroActionActiveBackground};
  align-items: center;
  justify-content: center;
`;

const RoleChoiceTitle = styled.Text<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.foreground : theme.colors.foreground)};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

const RoleChoiceDescription = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;
