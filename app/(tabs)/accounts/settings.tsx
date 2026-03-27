import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Card, CardContent, Spinner } from "@/components/ui";
import
{
    MeQuery,
    MeQueryVariables,
    SetProviderAvailabilityMutation,
    SetProviderAvailabilityMutationVariables,
    UserType,
} from "@/gql/graphql";
import { ME_QUERY, SET_PROVIDER_AVAILABILITY_MUTATION } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { showBackendErrorToast, showToast } from "@/lib/toast";
import { useUserStore } from "@/store/userStore";
import
{
    StyledSettingsAvailabilityBadge,
    StyledSettingsAvailabilityDescription,
    StyledSettingsAvailabilityHeader,
    StyledSettingsAvailabilityMeta,
    StyledSettingsAvailabilityPanel,
    StyledSettingsAvailabilityTitle,
    StyledSettingsItemButton,
    StyledSettingsItemDescription,
    StyledSettingsItemIconWrap,
    StyledSettingsItemLead,
    StyledSettingsItemTextGroup,
    StyledSettingsItemTitle,
    StyledSettingsRoot,
    StyledSettingsSection,
    StyledSettingsSectionLabel,
} from "@/styles/tabs/accounts";

type SettingsItemProps = {
    iconName: React.ComponentProps<typeof MaterialIcons>["name"];
    title: string;
    description: string;
    onPress: () => void;
};

function SettingsItem({ iconName, title, description, onPress }: SettingsItemProps)
{
    const theme = useTheme();

    return (
        <StyledSettingsItemButton onPress={onPress}>
            <StyledSettingsItemLead>
                <StyledSettingsItemIconWrap>
                    <MaterialIcons name={iconName} size={16} color={theme.colors.primary} />
                </StyledSettingsItemIconWrap>
                <StyledSettingsItemTextGroup>
                    <StyledSettingsItemTitle>{title}</StyledSettingsItemTitle>
                    <StyledSettingsItemDescription>{description}</StyledSettingsItemDescription>
                </StyledSettingsItemTextGroup>
            </StyledSettingsItemLead>
            <MaterialIcons name="arrow-forward-ios" size={15} color="#94A3B8" />
        </StyledSettingsItemButton>
    );
}

export default function SettingsScreen()
{
    const router = useRouter();
    const setUser = useUserStore((state) => state.setUser);

    const {
        data: profileData,
        loading: profileLoading,
        error: profileError,
        refetch: refetchProfile,
    } = useQuery<MeQuery, MeQueryVariables>(ME_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const [setProviderAvailability, { loading: updatingProviderAvailability }] = useMutation<
        SetProviderAvailabilityMutation,
        SetProviderAvailabilityMutationVariables
    >(SET_PROVIDER_AVAILABILITY_MUTATION);

    useBackendErrorToast(profileError, "Unable to load provider availability.", {
        title: "Settings Error",
        dedupeKey: "account-settings-profile",
    });

    const profile = profileData?.me ?? null;
    const hasBusinessRole = Boolean(profile?.roles?.includes(UserType.Business));
    const isProviderAvailable = profile?.providerIsAvailable === true;
    const providerAvailabilityLabel = isProviderAvailable ? "Available" : "Unavailable";
    const providerAvailabilityUpdatedAt = profile?.providerAvailabilityUpdatedAt
        ? new Date(String(profile.providerAvailabilityUpdatedAt)).toLocaleString()
        : "Not updated";

    const toggleProviderAvailability = async () =>
    {
        if (!profile?.providerId)
        {
            return;
        }

        const nextAvailability = !isProviderAvailable;

        try
        {
            const { data } = await setProviderAvailability({
                variables: {
                    input: {
                        isAvailable: nextAvailability,
                    },
                },
            });

            const updatedProfile = data?.setProviderAvailability ?? null;
            if (updatedProfile)
            {
                setUser(updatedProfile);
            }

            await refetchProfile();

            showToast({
                title: "Provider Availability",
                message: `Provider is now ${nextAvailability ? "available" : "unavailable"}.`,
                tone: "success",
                dedupeKey: `provider-availability-${nextAvailability ? "available" : "unavailable"}`,
            });
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to update provider availability.", {
                title: "Settings Error",
                dedupeKey: "account-settings-provider-availability",
            });
        }
    };

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledSettingsRoot>
                <Card>
                    <CardContent>
                        <StyledSettingsSection>
                            <StyledSettingsSectionLabel>Account settings</StyledSettingsSectionLabel>
                            {hasBusinessRole ? (
                                <StyledSettingsAvailabilityPanel>
                                    <StyledSettingsAvailabilityHeader>
                                        <StyledSettingsAvailabilityTitle>
                                            Dispatch availability
                                        </StyledSettingsAvailabilityTitle>
                                        {profileLoading ? (
                                            <Spinner size="small" />
                                        ) : (
                                            <StyledSettingsAvailabilityBadge $isAvailable={isProviderAvailable}>
                                                {providerAvailabilityLabel}
                                            </StyledSettingsAvailabilityBadge>
                                        )}
                                    </StyledSettingsAvailabilityHeader>
                                    <StyledSettingsAvailabilityDescription>
                                        When unavailable, dispatch requests will not be sent to your provider account.
                                    </StyledSettingsAvailabilityDescription>
                                    <StyledSettingsAvailabilityMeta>
                                        Last updated: {providerAvailabilityUpdatedAt}
                                    </StyledSettingsAvailabilityMeta>
                                    <Button
                                        fullWidth
                                        variant="secondary"
                                        disabled={updatingProviderAvailability || !profile?.providerId}
                                        onPress={() => void toggleProviderAvailability()}
                                    >
                                        {isProviderAvailable ? "Set unavailable" : "Set available"}
                                    </Button>
                                </StyledSettingsAvailabilityPanel>
                            ) : null}

                            <SettingsItem
                                iconName="person"
                                title="Profile"
                                description="Update personal profile details and avatar."
                                onPress={() => router.push("/accounts/edit-profile" as never)}
                            />
                            <SettingsItem
                                iconName="verified"
                                title="Verify phone"
                                description={profile?.phoneVerified ? "Your phone number is verified." : "Add and verify your phone number for account actions."}
                                onPress={() => router.push("/accounts/verify-phone" as never)}
                            />
                            <SettingsItem
                                iconName="account-balance-wallet"
                                title="Wallet"
                                description="Manage wallet funding, withdrawal, and compliance."
                                onPress={() => router.push("/wallet" as never)}
                            />
                            <SettingsItem
                                iconName="badge"
                                title="KYC"
                                description="Continue verification and track compliance status."
                                onPress={() => router.push("/accounts/kyc-upload" as never)}
                            />
                            <SettingsItem
                                iconName="directions-car"
                                title="Fleet"
                                description="Manage provider vehicles and dispatch readiness."
                                onPress={() => router.push("/accounts/manage-vehicles" as never)}
                            />
                        </StyledSettingsSection>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <StyledSettingsSection>
                            <StyledSettingsSectionLabel>Support and policy</StyledSettingsSectionLabel>
                            <SettingsItem
                                iconName="support-agent"
                                title="Support"
                                description="Open support resources and assistance channels."
                                onPress={() => router.push("/accounts/support-stack" as never)}
                            />
                            <SettingsItem
                                iconName="policy"
                                title="Legal"
                                description="Read terms, privacy policy, and platform notices."
                                onPress={() => router.push("/accounts/legal" as never)}
                            />
                        </StyledSettingsSection>
                    </CardContent>
                </Card>
            </StyledSettingsRoot>
        </ScreenShell>
    );
}
