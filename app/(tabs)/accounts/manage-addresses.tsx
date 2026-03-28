import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components/native";

import { Button, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import
{
    CreateUserAddressMutation,
    CreateUserAddressMutationVariables,
    MyUserAddressesQuery,
    MyUserAddressesQueryVariables,
    SearchAddressesQuery,
    SearchAddressesQueryVariables,
} from "@/gql/graphql";
import
{
    CREATE_USER_ADDRESS_MUTATION,
    MY_USER_ADDRESSES_QUERY,
    SEARCH_ADDRESSES_QUERY,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { showBackendErrorToast, showToast } from "@/lib/toast";
import
{
    StyledManageAddressesActions,
    StyledManageAddressesFieldLabel,
    StyledManageAddressesFloatingButton,
    StyledManageAddressesFormSection,
    StyledManageAddressesHint,
    StyledManageAddressesInput,
    StyledManageAddressesLabel,
    StyledManageAddressesLabelInput,
    StyledManageAddressesList,
    StyledManageAddressesListRow,
    StyledManageAddressesLoadingWrap,
    StyledManageAddressesRoot,
    StyledManageAddressesScreen,
    StyledManageAddressesSearchBox,
    StyledManageAddressesSection,
    StyledManageAddressesSectionLabel,
    StyledManageAddressesSelectedRow,
    StyledManageAddressesSelectedSub,
    StyledManageAddressesSelectedTitle,
    StyledManageAddressesSuggestionList,
    StyledManageAddressesSuggestionMain,
    StyledManageAddressesSuggestionRow,
    StyledManageAddressesSuggestionSub,
    StyledManageAddressesTitle,
} from "@/styles/tabs/accounts";

type SelectedPlace = {
    placeId: string;
    description: string;
    mainText: string;
    secondaryText: string;
};

export default function ManageAddressesScreen()
{
    const theme = useTheme();
    const tabBarHeight = useBottomTabBarHeight();

    const [showForm, setShowForm] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [labelInput, setLabelInput] = React.useState("");
    const [selectedPlace, setSelectedPlace] = React.useState<SelectedPlace | null>(null);
    const [saving, setSaving] = React.useState(false);

    const { data, loading, error, refetch } = useQuery<
        MyUserAddressesQuery,
        MyUserAddressesQueryVariables
    >(MY_USER_ADDRESSES_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const { data: searchData, loading: searchLoading } = useQuery<
        SearchAddressesQuery,
        SearchAddressesQueryVariables
    >(SEARCH_ADDRESSES_QUERY, {
        variables: { input: { query: searchQuery } },
        skip: searchQuery.trim().length < 3,
        fetchPolicy: "no-cache",
    });

    const [createUserAddress] = useMutation<
        CreateUserAddressMutation,
        CreateUserAddressMutationVariables
    >(CREATE_USER_ADDRESS_MUTATION);

    useBackendErrorToast(error, "Unable to load addresses.", {
        title: "Addresses Error",
        dedupeKey: "account-manage-addresses-query",
    });

    const addresses = data?.myUserAddresses ?? [];
    const suggestions = searchData?.searchAddresses ?? [];

    function resetForm()
    {
        setSearchQuery("");
        setLabelInput("");
        setSelectedPlace(null);
        setShowForm(false);
    }

    async function handleSave()
    {
        if (!selectedPlace)
        {
            return;
        }

        setSaving(true);

        try
        {
            await createUserAddress({
                variables: {
                    input: {
                        placeId: selectedPlace.placeId,
                        label: labelInput.trim() || undefined,
                    },
                },
            });

            await refetch();
            resetForm();

            showToast({
                title: "Address saved",
                message: "The address has been added to your profile.",
                tone: "success",
                dedupeKey: "manage-addresses-created",
            });
        } catch (err)
        {
            showBackendErrorToast(err, "Unable to save address.", {
                title: "Addresses Error",
                dedupeKey: "manage-addresses-create-error",
            });
        } finally
        {
            setSaving(false);
        }
    }

    return (
        <StyledManageAddressesScreen>
            <ScreenShell contentJustify="flex-start">
                <StyledManageAddressesRoot>

                    {loading && !data ? (
                        <StyledManageAddressesLoadingWrap>
                            <Spinner size="small" />
                        </StyledManageAddressesLoadingWrap>
                    ) : null}

                    {/* ── SAVED ADDRESSES ─────────────────────────── */}
                    <StyledManageAddressesSection>
                        <StyledManageAddressesSectionLabel>Saved addresses</StyledManageAddressesSectionLabel>
                        {addresses.length === 0 ? (
                            <StyledManageAddressesHint>
                                No saved addresses yet. Tap + to add one.
                            </StyledManageAddressesHint>
                        ) : (
                            <StyledManageAddressesList>
                                {addresses.map((addr) => (
                                    <StyledManageAddressesListRow key={addr.id}>
                                        {addr.label ? (
                                            <StyledManageAddressesLabel>{addr.label}</StyledManageAddressesLabel>
                                        ) : null}
                                        <StyledManageAddressesTitle numberOfLines={2}>
                                            {addr.address}
                                        </StyledManageAddressesTitle>
                                        <StyledManageAddressesHint>
                                            {[addr.city, addr.state, addr.countryCode]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </StyledManageAddressesHint>
                                    </StyledManageAddressesListRow>
                                ))}
                            </StyledManageAddressesList>
                        )}
                    </StyledManageAddressesSection>

                    {/* ── ADD ADDRESS FORM ────────────────────────── */}
                    {showForm ? (
                        <StyledManageAddressesSection>
                            <StyledManageAddressesSectionLabel>Add new address</StyledManageAddressesSectionLabel>

                            <StyledManageAddressesFormSection>
                                <StyledManageAddressesSearchBox>
                                    <StyledManageAddressesFieldLabel>Search location</StyledManageAddressesFieldLabel>
                                    <StyledManageAddressesInput
                                        placeholder="Start typing an address…"
                                        placeholderTextColor={theme.colors.mutedForeground}
                                        value={searchQuery}
                                        onChangeText={(text) =>
                                        {
                                            setSearchQuery(text);
                                            setSelectedPlace(null);
                                        }}
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                    />
                                    {searchLoading ? (
                                        <StyledManageAddressesLoadingWrap>
                                            <Spinner size="small" />
                                        </StyledManageAddressesLoadingWrap>
                                    ) : null}
                                    {suggestions.length > 0 && !selectedPlace ? (
                                        <StyledManageAddressesSuggestionList>
                                            {suggestions.map((s) => (
                                                <StyledManageAddressesSuggestionRow
                                                    key={s.placeId}
                                                    onPress={() =>
                                                    {
                                                        setSelectedPlace({
                                                            placeId: s.placeId,
                                                            description: s.description,
                                                            mainText: s.mainText ?? "",
                                                            secondaryText: s.secondaryText ?? "",
                                                        });
                                                        setSearchQuery(s.description);
                                                    }}
                                                >
                                                    <StyledManageAddressesSuggestionMain>
                                                        {s.mainText}
                                                    </StyledManageAddressesSuggestionMain>
                                                    <StyledManageAddressesSuggestionSub>
                                                        {s.secondaryText}
                                                    </StyledManageAddressesSuggestionSub>
                                                </StyledManageAddressesSuggestionRow>
                                            ))}
                                        </StyledManageAddressesSuggestionList>
                                    ) : null}
                                    {selectedPlace ? (
                                        <StyledManageAddressesSelectedRow>
                                            <StyledManageAddressesSelectedTitle>
                                                {selectedPlace.mainText}
                                            </StyledManageAddressesSelectedTitle>
                                            <StyledManageAddressesSelectedSub>
                                                {selectedPlace.secondaryText}
                                            </StyledManageAddressesSelectedSub>
                                        </StyledManageAddressesSelectedRow>
                                    ) : null}
                                </StyledManageAddressesSearchBox>

                                <StyledManageAddressesSearchBox>
                                    <StyledManageAddressesFieldLabel>
                                        Label (optional)
                                    </StyledManageAddressesFieldLabel>
                                    <StyledManageAddressesLabelInput
                                        placeholder="e.g. Home, Office…"
                                        placeholderTextColor={theme.colors.mutedForeground}
                                        value={labelInput}
                                        onChangeText={setLabelInput}
                                        autoCapitalize="words"
                                    />
                                </StyledManageAddressesSearchBox>

                                <StyledManageAddressesActions>
                                    <Button
                                        variant="outline"
                                        onPress={resetForm}
                                        disabled={saving}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onPress={() => void handleSave()}
                                        disabled={!selectedPlace || saving}
                                    >
                                        {saving ? "Saving…" : "Save address"}
                                    </Button>
                                </StyledManageAddressesActions>
                            </StyledManageAddressesFormSection>
                        </StyledManageAddressesSection>
                    ) : null}

                </StyledManageAddressesRoot>
            </ScreenShell>

            {!showForm ? (
                <StyledManageAddressesFloatingButton
                    accessibilityLabel="Add address"
                    onPress={() => setShowForm(true)}
                    $bottom={tabBarHeight + 12}
                >
                    <MaterialIcons name="add" size={24} color="#F8FAFC" />
                </StyledManageAddressesFloatingButton>
            ) : null}
        </StyledManageAddressesScreen>
    );
}
