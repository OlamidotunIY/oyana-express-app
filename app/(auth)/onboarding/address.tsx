import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CreateUserAddressMutation,
  CreateUserAddressMutationVariables,
  MyUserAddressesQuery,
  SearchAddressesQuery,
  SearchAddressesQueryVariables,
  SetActiveUserAddressMutation,
  SetActiveUserAddressMutationVariables,
} from "@/gql/graphql";
import {
  CREATE_USER_ADDRESS_MUTATION,
  MY_USER_ADDRESSES_QUERY,
  SEARCH_ADDRESSES_QUERY,
  SET_ACTIVE_USER_ADDRESS_MUTATION,
} from "@/graphql";
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
} from "@/styles";
import { useTheme } from "styled-components/native";

export default function OnboardingAddressScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const showToast = useToastStore((state) => state.showToast);
  const [queryText, setQueryText] = React.useState("");

  const { data: savedAddressesData, refetch: refetchAddresses } =
    useQuery<MyUserAddressesQuery>(MY_USER_ADDRESSES_QUERY, {
      fetchPolicy: "cache-and-network",
    });

  const [searchAddresses, { data: searchData, loading: searchLoading }] =
    useLazyQuery<SearchAddressesQuery, SearchAddressesQueryVariables>(
      SEARCH_ADDRESSES_QUERY,
    );

  const [createUserAddress, { loading: creatingAddress }] = useMutation<
    CreateUserAddressMutation,
    CreateUserAddressMutationVariables
  >(CREATE_USER_ADDRESS_MUTATION);

  const [setActiveUserAddress, { loading: activatingAddress }] = useMutation<
    SetActiveUserAddressMutation,
    SetActiveUserAddressMutationVariables
  >(SET_ACTIVE_USER_ADDRESS_MUTATION);

  const savedAddresses = savedAddressesData?.myUserAddresses ?? [];
  const suggestions = searchData?.searchAddresses ?? [];

  async function refreshAndContinue(successMessage: string) {
    await refetchAddresses();
    const user = await refetchCurrentUser();
    if (!user) {
      throw new Error("Unable to refresh your account after updating the address.");
    }

    showToast({
      message: successMessage,
      tone: "success",
    });
    router.replace(resolveAuthenticatedRoute(user) as never);
  }

  async function handleSearch(text: string) {
    setQueryText(text);

    if (text.trim().length < 3) {
      return;
    }

    await searchAddresses({
      variables: {
        input: {
          query: text.trim(),
        },
      },
    });
  }

  async function handleCreateAddress(placeId: string, label?: string | null) {
    try {
      await createUserAddress({
        variables: {
          input: {
            placeId,
            label: label ?? undefined,
            setAsActive: true,
          },
        },
      });

      await refreshAndContinue("Active address saved.");
    } catch (error) {
      showToast({
        message: parseAuthError(error, "Unable to save the selected address."),
        tone: "error",
      });
    }
  }

  async function handleActivateAddress(addressId: string) {
    try {
      await setActiveUserAddress({
        variables: {
          addressId,
        },
      });

      await refreshAndContinue("Active address updated.");
    } catch (error) {
      showToast({
        message: parseAuthError(error, "Unable to activate this address."),
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
            <AuthTitle>Set your active address</AuthTitle>
            <AuthSubtitle>
              Choose the address you’re operating from so nearby freight and
              dispatch matches can use it.
            </AuthSubtitle>
          </AuthHeader>

          <AuthForm>
            <AuthField>
              <AuthLabel>Search for an address</AuthLabel>
              <Input
                value={queryText}
                onChangeText={(text) => void handleSearch(text)}
                placeholder="Search for a street address"
                autoCapitalize="words"
              />
            </AuthField>
          </AuthForm>

          <View style={{ gap: 12, marginBottom: 24 }}>
            {queryText.trim().length >= 3 ? (
              suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <Pressable
                    key={suggestion.placeId}
                    onPress={() =>
                      void handleCreateAddress(
                        suggestion.placeId,
                        suggestion.mainText ?? suggestion.description,
                      )
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      borderRadius: 20,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      backgroundColor: theme.colors.card,
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.foreground,
                        fontWeight: "600",
                        marginBottom: 4,
                      }}
                    >
                      {suggestion.mainText ?? suggestion.description}
                    </Text>
                    <Text style={{ color: theme.colors.mutedForeground }}>
                      {suggestion.secondaryText ?? suggestion.description}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Text style={{ color: theme.colors.mutedForeground }}>
                  {searchLoading ? "Searching addresses…" : "No addresses found yet."}
                </Text>
              )
            ) : null}
          </View>

          {savedAddresses.length > 0 ? (
            <View style={{ gap: 12, marginBottom: 24 }}>
              <Text
                style={{
                  color: theme.colors.foreground,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                Saved addresses
              </Text>
              {savedAddresses.map((address) => (
                <Pressable
                  key={address.id}
                  onPress={() => void handleActivateAddress(address.id)}
                  style={{
                    borderWidth: 1,
                    borderColor: address.isActive
                      ? theme.colors.primary
                      : theme.colors.border,
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    backgroundColor: address.isActive
                      ? theme.colors.heroSurface
                      : theme.colors.card,
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontWeight: "600",
                    }}
                  >
                    {address.label ?? address.address}
                  </Text>
                  <Text style={{ color: theme.colors.mutedForeground, marginTop: 4 }}>
                    {[address.address, address.city].filter(Boolean).join(", ")}
                  </Text>
                  {address.isActive ? (
                    <Text style={{ color: theme.colors.primary, marginTop: 8 }}>
                      Active address
                    </Text>
                  ) : null}
                </Pressable>
              ))}
            </View>
          ) : null}

          <Button
            onPress={() => void refetchAddresses()}
            disabled={creatingAddress || activatingAddress}
            fullWidth
            variant="outline"
          >
            {creatingAddress || activatingAddress
              ? "Saving address…"
              : "Refresh addresses"}
          </Button>
        </AuthContent>
      </AuthScrollView>
    </AuthKeyboardAvoiding>
  );
}
