import React from "react";
import { KeyboardAvoidingView, Modal, Platform, ScrollView } from "react-native";
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
import { useUserStore } from "@/store/userStore";
import
{
    StyledManageAddressesActiveBadge,
    StyledManageAddressesActiveBadgeText,
    StyledManageAddressesActions,
    StyledManageAddressesFieldLabel,
    StyledManageAddressesFloatingButton,
    StyledManageAddressesFormSection,
    StyledManageAddressesHint,
    StyledManageAddressesInput,
    StyledManageAddressesLabel,
    StyledManageAddressesLabelInput,
    StyledManageAddressesList,
    StyledManageAddressesListRowHeader,
    StyledManageAddressesListRowInfo,
    StyledManageAddressesListRowTouchable,
    StyledManageAddressesLoadingWrap,
    StyledManageAddressesRoot,
    StyledManageAddressesScreen,
    StyledManageAddressesSearchBox,
    StyledManageAddressesSection,
    StyledManageAddressesSectionLabel,
    StyledManageAddressesSelectedRow,
    StyledManageAddressesSelectedSub,
    StyledManageAddressesSelectedTitle,
    StyledManageAddressesSetActiveBtn,
    StyledManageAddressesSetActiveBtnText,
    StyledManageAddressesSheet,
    StyledManageAddressesSheetHandle,
    StyledManageAddressesSheetOverlay,
    StyledManageAddressesSheetTitle,
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

    const [showSheet, setShowSheet] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [labelInput, setLabelInput] = React.useState("");
    const [selectedPlace, setSelectedPlace] = React.useState<SelectedPlace | null>(null);
    const [saving, setSaving] = React.useState(false);

    const activeAddressId = useUserStore((s) => s.activeAddressId);
    const setActiveAddressId = useUserStore((s) => s.setActiveAddressId);

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
        setShowSheet(false);
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
                                {addresses.map((addr) =>
                                {
                                    const isActive = activeAddressId === addr.id;

                                    return (
                                        <StyledManageAddressesListRowTouchable
                                            key={addr.id}
                                            $active={isActive}
                                            onPress={() => {/* no-op — tap "Set as active" below */ }}
                                        >
                                            <StyledManageAddressesListRowHeader>
                                                <StyledManageAddressesListRowInfo>
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
                                                </StyledManageAddressesListRowInfo>
                                                {isActive ? (
                                                    <StyledManageAddressesActiveBadge>
                                                        <MaterialIcons name="check" size={10} color={theme.colors.primaryForeground} />
                                                        <StyledManageAddressesActiveBadgeText>Active</StyledManageAddressesActiveBadgeText>
                                                    </StyledManageAddressesActiveBadge>
                                                ) : null}
                                            </StyledManageAddressesListRowHeader>
                                            {!isActive ? (
                                                <StyledManageAddressesSetActiveBtn
                                                    onPress={() => setActiveAddressId(addr.id)}
                                                >
                                                    <StyledManageAddressesSetActiveBtnText>
                                                        Set as active
                                                    </StyledManageAddressesSetActiveBtnText>
                                                </StyledManageAddressesSetActiveBtn>
                                            ) : null}
                                        </StyledManageAddressesListRowTouchable>
                                    );
                                })}
                            </StyledManageAddressesList>
                        )}
                    </StyledManageAddressesSection>

                </StyledManageAddressesRoot>
            </ScreenShell>

            {/* ── FLOATING ADD BUTTON ───────────────────────── */}
            <StyledManageAddressesFloatingButton
                accessibilityLabel="Add address"
                onPress={() => setShowSheet(true)}
                $bottom={tabBarHeight + 12}
            >
                <MaterialIcons name="add" size={24} color="#F8FAFC" />
            </StyledManageAddressesFloatingButton>

            {/* ── ADD ADDRESS BOTTOM SHEET ──────────────────── */}
            <Modal
                visible={showSheet}
                transparent
                animationType="slide"
                onRequestClose={resetForm}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <StyledManageAddressesSheetOverlay onPress={resetForm}>
                        <StyledManageAddressesSheet onStartShouldSetResponder={() => true}>
                            <StyledManageAddressesSheetHandle />
                            <StyledManageAddressesSheetTitle>Add new address</StyledManageAddressesSheetTitle>

                            <ScrollView
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
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
                            </ScrollView>
                        </StyledManageAddressesSheet>
                    </StyledManageAddressesSheetOverlay>
                </KeyboardAvoidingView>
            </Modal>
        </StyledManageAddressesScreen>
    );
}
