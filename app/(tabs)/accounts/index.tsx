import { Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { MeQuery, MeQueryVariables } from "@/gql/graphql";
import { GET_PROVIDER_DASHBOARD_QUARY, ME_QUERY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import
{
    StyledAccountAvatar,
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
    StyledAccountQuickActionItem,
    StyledAccountQuickActionLabel,
    StyledAccountQuickActionsRow,
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
    const [isOnline, setIsOnline] = React.useState(false);
    const toggleAvailability = () =>
    {
        setIsOnline((currentState) => !currentState);
    };

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

    useBackendErrorToast(dashboardError, "Unable to load provider status.", {
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
        "Provider";
    const roleLabel =
        profile?.roles?.map((role: any) => formatEnum(role)).join(" / ") || "-";
    const initials =
        `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""}`.trim().toUpperCase() || "OP";

    return (
        <ScreenShell
            contentJustify="flex-start"
            stickyTop={
                <StyledAccountProfileHero>
                    <StyledAccountHeroHeaderRow>
                        <StyledAccountHeroLabel>Provider profile</StyledAccountHeroLabel>
                        <StyledAccountHeroChip>{approvedKyc ? "KYC Verified" : "KYC Pending"}</StyledAccountHeroChip>
                    </StyledAccountHeroHeaderRow>

                    {isLoading ? (
                        <StyledAccountLoadingWrap>
                            <Spinner size="small" />
                        </StyledAccountLoadingWrap>
                    ) : null}

                    <StyledAccountIdentityRow>
                        <StyledAccountAvatar>
                            <StyledAccountAvatarText>{initials}</StyledAccountAvatarText>
                        </StyledAccountAvatar>
                        <StyledAccountIdentityTextGroup>
                            <StyledAccountProfileName numberOfLines={1}>{displayName}</StyledAccountProfileName>
                            <StyledAccountProfileMeta numberOfLines={1}>{profile?.email ?? "-"}</StyledAccountProfileMeta>
                        </StyledAccountIdentityTextGroup>
                    </StyledAccountIdentityRow>

                    <StyledAccountInfoPillsRow>
                        <StyledAccountInfoPill>
                            <StyledAccountInfoPillLabel>Roles</StyledAccountInfoPillLabel>
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
                            <MaterialIcons name="verified-user" size={12} color="rgba(241,245,249,0.8)" />
                        </StyledAccountStatBoxIconWrap>
                        <StyledAccountStatBoxValue>{approvedKyc ? "Verified" : "Pending"}</StyledAccountStatBoxValue>
                        <StyledAccountStatBoxLabel>KYC status</StyledAccountStatBoxLabel>
                    </StyledAccountStatBox>
                    <StyledAccountStatBoxDivider />
                    <StyledAccountStatBox>
                        <StyledAccountStatBoxIconWrap>
                            <MaterialIcons name="directions-car" size={12} color="rgba(241,245,249,0.8)" />
                        </StyledAccountStatBoxIconWrap>
                        <StyledAccountStatBoxValue>{vehicles.length}</StyledAccountStatBoxValue>
                        <StyledAccountStatBoxLabel>{activeVehiclesCount} active</StyledAccountStatBoxLabel>
                    </StyledAccountStatBox>
                </StyledAccountStatBoxRow>

                {/* ── QUICK ACTIONS ───────────────────────────── */}
                <StyledAccountQuickActionsRow>
                    <StyledAccountQuickActionItem onPress={toggleAvailability} $active={isOnline}>
                        <MaterialIcons name={isOnline ? "wifi" : "wifi-off"} size={22} color={isOnline ? "#FF6A00" : "rgba(241,245,249,0.82)"} />
                        <StyledAccountQuickActionLabel>{isOnline ? "Online" : "Offline"}</StyledAccountQuickActionLabel>
                    </StyledAccountQuickActionItem>
                    <StyledAccountQuickActionItem onPress={() => router.push("/accounts/manage-vehicles" as never)}>
                        <MaterialIcons name="directions-car" size={22} color="rgba(241,245,249,0.82)" />
                        <StyledAccountQuickActionLabel>Vehicles</StyledAccountQuickActionLabel>
                    </StyledAccountQuickActionItem>
                    <StyledAccountQuickActionItem onPress={() => router.push("/accounts/kyc-upload" as never)}>
                        <MaterialIcons name="badge" size={22} color="rgba(241,245,249,0.82)" />
                        <StyledAccountQuickActionLabel>KYC</StyledAccountQuickActionLabel>
                    </StyledAccountQuickActionItem>
                    <StyledAccountQuickActionItem onPress={() => router.push("/accounts/settings" as never)}>
                        <MaterialIcons name="settings" size={22} color="rgba(241,245,249,0.82)" />
                        <StyledAccountQuickActionLabel>Settings</StyledAccountQuickActionLabel>
                    </StyledAccountQuickActionItem>
                </StyledAccountQuickActionsRow>

                <StyledAccountSurfaceCard>
                    <StyledAccountSectionLabel>Operations</StyledAccountSectionLabel>
                    <StyledAccountNavigationList>
                        <NavigationRow
                            iconName="settings"
                            title="Settings"
                            description="Open provider settings and account controls."
                            onPress={() => router.push("/accounts/settings" as never)}
                        />
                        <NavigationRow
                            iconName="directions-car"
                            title="Manage vehicles"
                            description="Register and maintain your active fleet records."
                            onPress={() => router.push("/accounts/manage-vehicles" as never)}
                        />
                        <NavigationRow
                            iconName="badge"
                            title="KYC docs"
                            description="Open verification flow and upload required documents."
                            onPress={() => router.push("/accounts/kyc-upload" as never)}
                        />
                        <NavigationRow
                            iconName="verified-user"
                            title="KYC status"
                            description="Track approvals, rejections, and pending actions."
                            onPress={() => router.push("/accounts/kyc-status" as never)}
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
            </StyledAccountRoot>
        </ScreenShell>
    );
}
