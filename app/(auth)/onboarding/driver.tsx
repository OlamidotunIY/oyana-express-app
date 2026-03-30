import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CompleteDriverRegistrationMutation,
  CompleteDriverRegistrationMutationVariables,
  DriverType,
} from "@/gql/graphql";
import { COMPLETE_DRIVER_REGISTRATION_MUTATION } from "@/graphql";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  parseAuthError,
  refetchCurrentUser,
  resolveAuthenticatedRoute,
} from "@/lib/session";
import { useToastStore } from "@/store/toastStore";
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
  BackButton,
  BackButtonText,
  NameField,
  NameRow,
} from "@/styles";
import { useTheme } from "styled-components/native";

const DRIVER_OPTIONS: { label: string; value: DriverType }[] = [
  { label: "Rider", value: DriverType.Bike },
  { label: "Van Driver", value: DriverType.Van },
  { label: "Truck Driver", value: DriverType.Truck },
];

export default function OnboardingDriverScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const showToast = useToastStore((state) => state.showToast);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [driverType, setDriverType] = React.useState<DriverType>(DriverType.Bike);
  const [plateNumber, setPlateNumber] = React.useState("");
  const [capacityKg, setCapacityKg] = React.useState("");
  const [isAvailable, setIsAvailable] = React.useState(true);

  const [completeDriverRegistration, { loading }] = useMutation<
    CompleteDriverRegistrationMutation,
    CompleteDriverRegistrationMutationVariables
  >(COMPLETE_DRIVER_REGISTRATION_MUTATION);

  async function handleSubmit() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !plateNumber.trim() ||
      !capacityKg.trim()
    ) {
      showToast({
        message: "Complete all driver registration fields to continue.",
        tone: "error",
      });
      return;
    }

    if (!/^\d+$/.test(capacityKg.trim())) {
      showToast({
        message: "Capacity must be entered in kilograms.",
        tone: "error",
      });
      return;
    }

    try {
      await completeDriverRegistration({
        variables: {
          input: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            driverType,
            plateNumber: plateNumber.trim(),
            capacityKg: Number(capacityKg.trim()),
            isAvailable,
          },
        },
      });

      const user = await refetchCurrentUser();
      if (!user) {
        throw new Error("Unable to refresh your account after driver registration.");
      }

      showToast({
        message: "Driver registration saved.",
        tone: "success",
      });
      router.replace(resolveAuthenticatedRoute(user) as never);
    } catch (error) {
      showToast({
        message: parseAuthError(
          error,
          "Driver registration failed. Please try again.",
        ),
        tone: "error",
      });
    }
  }

  return (
    <AuthKeyboardAvoiding
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthScrollView
        contentContainerStyle={{ paddingTop: insets.top + 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthContent>
          <BackButton onPress={() => router.back()}>
            <BackButtonText>← Back</BackButtonText>
          </BackButton>

          <AuthHeader>
            <AuthTitle>Set up your driver profile</AuthTitle>
            <AuthSubtitle>
              Choose your vehicle type, add your plate number, and tell us how
              much you can carry.
            </AuthSubtitle>
          </AuthHeader>

          <AuthForm>
            <NameRow>
              <NameField>
                <AuthLabel>First name</AuthLabel>
                <Input
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="John"
                  autoCapitalize="words"
                  autoComplete="given-name"
                />
              </NameField>
              <NameField>
                <AuthLabel>Last name</AuthLabel>
                <Input
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Doe"
                  autoCapitalize="words"
                  autoComplete="family-name"
                />
              </NameField>
            </NameRow>

            <AuthField>
              <AuthLabel>Vehicle type</AuthLabel>
              <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
                {DRIVER_OPTIONS.map((option) => {
                  const active = option.value === driverType;
                  return (
                    <Pressable
                      key={option.value}
                      onPress={() => setDriverType(option.value)}
                      style={{
                        borderWidth: 1,
                        borderColor: active
                          ? theme.colors.primary
                          : theme.colors.border,
                        backgroundColor: active
                          ? theme.colors.primary
                          : theme.colors.card,
                        borderRadius: 999,
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: active
                            ? theme.colors.primaryForeground
                            : theme.colors.foreground,
                          fontWeight: "600",
                        }}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </AuthField>

            <AuthField>
              <AuthLabel>Plate number</AuthLabel>
              <Input
                value={plateNumber}
                onChangeText={setPlateNumber}
                placeholder="ABC-123XY"
                autoCapitalize="characters"
              />
            </AuthField>

            <AuthField>
              <AuthLabel>Capacity (kg)</AuthLabel>
              <Input
                value={capacityKg}
                onChangeText={setCapacityKg}
                placeholder="250"
                keyboardType="number-pad"
              />
            </AuthField>

            <AuthField>
              <AuthLabel>Availability</AuthLabel>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {[
                  { label: "Available", value: true },
                  { label: "Unavailable", value: false },
                ].map((option) => {
                  const active = option.value === isAvailable;
                  return (
                    <Pressable
                      key={option.label}
                      onPress={() => setIsAvailable(option.value)}
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: active
                          ? theme.colors.primary
                          : theme.colors.border,
                        backgroundColor: active
                          ? theme.colors.primary
                          : theme.colors.card,
                        borderRadius: 16,
                        paddingVertical: 14,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: active
                            ? theme.colors.primaryForeground
                            : theme.colors.foreground,
                          fontWeight: "600",
                        }}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </AuthField>
          </AuthForm>

          <Button onPress={() => void handleSubmit()} disabled={loading} fullWidth>
            {loading ? "Saving driver profile…" : "Continue"}
          </Button>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}
