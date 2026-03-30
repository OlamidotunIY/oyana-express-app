import { Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { MeQuery, MeQueryVariables } from "@/gql/graphql";
import { GET_PROVIDER_DASHBOARD_QUARY, ME_QUERY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { useProfileImageUpload } from "@/hooks/use-profile-image-upload";
import { clearAuthTokens } from "@/lib/auth-cookies";
import { client } from "@/lib/apolloClient";
import { getProfileRoleLabel } from "@/lib/session";
import { useUserStore } from "@/store/userStore";
import
{
    StyledAccountAvatar,
    StyledAccountAvatarButton,
    StyledAccountAvatarCameraBadge,
    StyledAccountAvatarImage,
    StyledAccountAvatarText,
    StyledAccountHeroChip,
    StyledAccountHeroHeaderRow,
    StyledAccountHeroLabel,
    StyledAccountIdentityRow,
    StyledAccountIdentityTextGroup,
    StyledAccountInfoPill,
    StyledAccountInfoPillLabel,
    StyledAccountInfoPillsRow,
    StyledAccountInfoPillValue,
    StyledAccountLoadingWrap,
    StyledAccountNavigationDescription,
    StyledAccountNavigationIconWrap,
    StyledAccountNavigationLead,
    StyledAccountNavigationList,
    StyledAccountNavigationRow,
    StyledAccountNavigationTextGroup,
    StyledAccountNavigationTitle,
    StyledAccountProfileHero,
    StyledAccountProfileMeta,
    StyledAccountProfileName,
    StyledAccountRoot,
    StyledAccountSectionLabel,
    StyledAccountStatBox,
    StyledAccountStatBoxDivider,
    StyledAccountStatBoxIconWrap,
    StyledAccountStatBoxLabel,
    StyledAccountStatBoxRow,
    StyledAccountStatBoxValue,
    StyledAccountSurfaceCard,
} from "@/styles/tabs";
import { useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

type NavigationRowProps = {
    iconName: React.ComponentProps<typeof MaterialIcons>["name"];
    title: string;
    description: string;
    onPress: () => void;
};

function formatEnum(value?: string | null): string
{
    if (!value)
    {
        return "-";
    }

    return value
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function NavigationRow({ iconName, title, description, onPress }: NavigationRowProps)
{
    const theme = useTheme();

    return (
        <StyledAccountNavigationRow onPress={onPress}>
            <StyledAccountNavigationLead>
                <StyledAccountNavigationIconWrap>
                    <MaterialIcons name={iconName} size={16} color={theme.colors.primary} />
                </StyledAccountNavigationIconWrap>
                <StyledAccountNavigationTextGroup>
                    <StyledAccountNavigationTitle>{title}</StyledAccountNavigationTitle>
                    <StyledAccountNavigationDescription>{description}</StyledAccountNavigationDescription>
                </StyledAccountNavigationTextGroup>
            </StyledAccountNavigationLead>
            <MaterialIcons name="arrow-forward-ios" size={16} color={theme.colors.mutedForeground} />
        </StyledAccountNavigationRow>
    );
}

export default function AccountsScreen()
{
    const router = useRouter();
    const theme = useTheme();
    const storedUser = useUserStore((s) => s.user);
    const clearUser = useUserStore((s) => s.clearUser);
    const { isUploading, pickAndUploadProfileImage } = useProfileImageUpload();

    async function handleLogout()
    {
        clearAuthTokens();
        clearUser();
        await client.clearStore();
        router.replace("/(auth)/onboarding" as never);
    }

    const {
        data: profileData,
        loading: profileLoading,
        error: profileError,
    } = useQuery<MeQuery, MeQueryVariables>(ME_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const {
        data: dashboardData,
        loading: dashboardLoading,
        error: dashboardError,
    } = useQuery<any>(GET_PROVIDER_DASHBOARD_QUARY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    useBackendErrorToast(profileError, "Unable to load profile details.", {
        title: "Account Error",
        dedupeKey: "account-profile-query",
    });

    useBackendErrorToast(dashboardError, "Unable to load driver status.", {
        title: "Account Error",
        dedupeKey: "account-dashboard-query",
    });

    const profile = profileData?.me ?? null;
    const dashboard = dashboardData?.getProviderDashboardQuary;
    const vehicles = dashboard?.vehicles ?? [];
    const approvedKyc = String(dashboard?.kycStatus?.overallStatus ?? "").toLowerCase() === "verified";
    const activeVehiclesCount = vehicles.filter((entry: any) => String(entry.status) === "ACTIVE").length;
    const isLoading = (profileLoading || dashboardLoading) && !profile && !dashboard;

    const displayName =
        [profile?.firstName, profile?.lastName].filter(Boolean).join(" ") ||
        profile?.email ||
        "Driver";
    const roleLabel = getProfileRoleLabel(profile, "Driver");
    const initials =
        `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""}`.trim().toUpperCase() || "OP";
    const profileImageUrl = storedUser?.profileImageUrl ?? null;

    return (
        <ScreenShell
            contentJustify="flex-start"
            stickyTop={
                <StyledAccountProfileHero>
                    <StyledAccountHeroHeaderRow>
                        <StyledAccountHeroLabel>{roleLabel} profile</StyledAccountHeroLabel>
                        <StyledAccountHeroChip>{approvedKyc ? "KYC Verified" : "KYC Pending"}</StyledAccountHeroChip>
                    </StyledAccountHeroHeaderRow>

                    {isLoading ? (
                        <StyledAccountLoadingWrap>
                            <Spinner size="small" />
                        </StyledAccountLoadingWrap>
                    ) : null}

                    <StyledAccountIdentityRow>
                        <StyledAccountAvatarButton
                            accessibilityLabel="Change profile image"
                            accessibilityRole="button"
                            disabled={isUploading}
                            hitSlop={10}
                            onPress={() => void pickAndUploadProfileImage()}
                        >
                            <StyledAccountAvatar>
                                {profileImageUrl ? (
                                    <StyledAccountAvatarImage
                                        source={{ uri: profileImageUrl }}
                                        resizeMode="cover"
                                    />
                                ) : (
                                    <StyledAccountAvatarText>{initials}</StyledAccountAvatarText>
                                )}
                            </StyledAccountAvatar>
                            <StyledAccountAvatarCameraBadge>
                                <MaterialIcons
                                    name={isUploading ? "hourglass-empty" : "photo-camera"}
                                    size={12}
                                    color={theme.colors.primaryForeground}
                                />
                            </StyledAccountAvatarCameraBadge>
                        </StyledAccountAvatarButton>
                        <StyledAccountIdentityTextGroup>
                            <StyledAccountProfileName numberOfLines={1}>{displayName}</StyledAccountProfileName>
                            <StyledAccountProfileMeta numberOfLines={1}>{profile?.email ?? "-"}</StyledAccountProfileMeta>
                        </StyledAccountIdentityTextGroup>
                    </StyledAccountIdentityRow>

                    <StyledAccountInfoPillsRow>
                        <StyledAccountInfoPill>
                            <StyledAccountInfoPillLabel>Role</StyledAccountInfoPillLabel>
                            <StyledAccountInfoPillValue>{roleLabel}</StyledAccountInfoPillValue>
                        </StyledAccountInfoPill>
                        <StyledAccountInfoPill>
                            <StyledAccountInfoPillLabel>Profile status</StyledAccountInfoPillLabel>
                            <StyledAccountInfoPillValue>{formatEnum(profile?.status)}</StyledAccountInfoPillValue>
                        </StyledAccountInfoPill>
                    </StyledAccountInfoPillsRow>
                </StyledAccountProfileHero>
            }
        >
            <StyledAccountRoot>
                {/* ── KYC + FLEET STATS ───────────────────────── */}
                <StyledAccountStatBoxRow>
                    <StyledAccountStatBox>
                        <StyledAccountStatBoxIconWrap>
                            <MaterialIcons
                                name="verified-user"
                                size={12}
                                color={theme.colors.heroChipForeground}
                            />
                        </StyledAccountStatBoxIconWrap>
                        <StyledAccountStatBoxValue>{approvedKyc ? "Verified" : "Pending"}</StyledAccountStatBoxValue>
                        <StyledAccountStatBoxLabel>KYC status</StyledAccountStatBoxLabel>
                    </StyledAccountStatBox>
                    <StyledAccountStatBoxDivider />
                    <StyledAccountStatBox>
                        <StyledAccountStatBoxIconWrap>
                            <MaterialIcons
                                name="directions-car"
                                size={12}
                                color={theme.colors.heroChipForeground}
                            />
                        </StyledAccountStatBoxIconWrap>
                        <StyledAccountStatBoxValue>{vehicles.length}</StyledAccountStatBoxValue>
                        <StyledAccountStatBoxLabel>{activeVehiclesCount} active</StyledAccountStatBoxLabel>
                    </StyledAccountStatBox>
                </StyledAccountStatBoxRow>

                <StyledAccountSurfaceCard>
                    <StyledAccountSectionLabel>Operations</StyledAccountSectionLabel>
                    <StyledAccountNavigationList>
                        <NavigationRow
                            iconName="location-on"
                            title="Manage addresses"
                            description="Add and manage saved addresses for your shipments."
                            onPress={() => router.push("/accounts/manage-addresses" as never)}
                        />
                        <NavigationRow
                            iconName="settings"
                            title="Settings"
                            description="Open driver settings and account controls."
                            onPress={() => router.push("/accounts/settings" as never)}
                        />
                        <NavigationRow
                            iconName="directions-car"
                            title="Manage vehicle"
                            description="Review and update your active vehicle record."
                            onPress={() => router.push("/accounts/manage-vehicles" as never)}
                        />
                        <NavigationRow
                            iconName="badge"
                            title="KYC docs"
                            description="Open verification flow and upload required documents."
                            onPress={() => router.push("/accounts/kyc-upload" as never)}
                        />
                    </StyledAccountNavigationList>
                </StyledAccountSurfaceCard>

                <StyledAccountSurfaceCard>
                    <StyledAccountSectionLabel>Support &amp; policy</StyledAccountSectionLabel>
                    <StyledAccountNavigationList>
                        <NavigationRow
                            iconName="support-agent"
                            title="Support"
                            description="Reach out to support channels and help resources."
                            onPress={() => router.push("/accounts/support-stack" as never)}
                        />
                        <NavigationRow
                            iconName="policy"
                            title="Legal / Policies"
                            description="Terms, privacy policy, and platform legal notices."
                            onPress={() => router.push("/accounts/legal" as never)}
                        />
                    </StyledAccountNavigationList>
                </StyledAccountSurfaceCard>

                <StyledAccountSurfaceCard>
                    <StyledAccountNavigationList>
                        <StyledAccountNavigationRow onPress={() => void handleLogout()}>
                            <StyledAccountNavigationLead>
                                <StyledAccountNavigationIconWrap>
                                    <MaterialIcons name="logout" size={16} color={theme.colors.destructive} />
                                </StyledAccountNavigationIconWrap>
                                <StyledAccountNavigationTextGroup>
                                    <StyledAccountNavigationTitle style={{ color: theme.colors.destructive }}>
                                        Sign out
                                    </StyledAccountNavigationTitle>
                                    <StyledAccountNavigationDescription>
                                        Sign out of your driver account.
                                    </StyledAccountNavigationDescription>
                                </StyledAccountNavigationTextGroup>
                            </StyledAccountNavigationLead>
                        </StyledAccountNavigationRow>
                    </StyledAccountNavigationList>
                </StyledAccountSurfaceCard>
            </StyledAccountRoot>
        </ScreenShell>
    );
}
