import React from "react";
import { useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Card, CardContent, Spinner } from "@/components/ui";
import
{
    GetProviderDashboardQuaryQuery,
    GetProviderDashboardQuaryQueryVariables,
} from "@/gql/graphql";
import { GET_PROVIDER_DASHBOARD_QUARY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { formatEnumLabel } from "@/utils/format";
import
{
    StyledManageVehiclesFloatingButton,
    StyledManageVehiclesHint,
    StyledManageVehiclesList,
    StyledManageVehiclesListRow,
    StyledManageVehiclesLoadingWrap,
    StyledManageVehiclesRoot,
    StyledManageVehiclesScreen,
    StyledManageVehiclesSection,
    StyledManageVehiclesSectionLabel,
    StyledManageVehiclesTitle,
} from "@/styles/tabs/accounts";

export default function ManageVehiclesScreen()
{
    const router = useRouter();
    const tabBarHeight = useBottomTabBarHeight();

    const { data, loading, error } = useQuery<
        GetProviderDashboardQuaryQuery,
        GetProviderDashboardQuaryQueryVariables
    >(GET_PROVIDER_DASHBOARD_QUARY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    useBackendErrorToast(error, "Unable to load vehicles.", {
        title: "Vehicles Error",
        dedupeKey: "account-manage-vehicles-query",
    });

    const vehicles = data?.getProviderDashboardQuary?.vehicles ?? [];

    return (
        <StyledManageVehiclesScreen>
            <ScreenShell contentJustify="flex-start">
                <StyledManageVehiclesRoot>
                    {loading && !data ? (
                        <Card>
                            <CardContent>
                                <StyledManageVehiclesLoadingWrap>
                                    <Spinner size="small" />
                                </StyledManageVehiclesLoadingWrap>
                            </CardContent>
                        </Card>
                    ) : null}

                    <Card>
                        <CardContent>
                            <StyledManageVehiclesSection>
                                <StyledManageVehiclesSectionLabel>Active vehicle</StyledManageVehiclesSectionLabel>
                                {vehicles.length === 0 ? (
                                    <StyledManageVehiclesHint>
                                        No vehicle has been added to your driver profile yet.
                                    </StyledManageVehiclesHint>
                                ) : (
                                    <StyledManageVehiclesList>
                                        {vehicles.map((vehicle) => (
                                            <StyledManageVehiclesListRow key={vehicle.id}>
                                                <StyledManageVehiclesTitle>
                                                    {formatEnumLabel(vehicle.category)}
                                                </StyledManageVehiclesTitle>
                                                <StyledManageVehiclesHint>
                                                    Status: {formatEnumLabel(vehicle.status)}
                                                </StyledManageVehiclesHint>
                                            </StyledManageVehiclesListRow>
                                        ))}
                                    </StyledManageVehiclesList>
                                )}
                            </StyledManageVehiclesSection>
                        </CardContent>
                    </Card>
                </StyledManageVehiclesRoot>
            </ScreenShell>

            <StyledManageVehiclesFloatingButton
                accessibilityLabel="Update vehicle"
                onPress={() => router.push("/accounts/create-vehicle" as never)}
                $bottom={tabBarHeight + 12}
            >
                <MaterialIcons name="add" size={24} color="#F8FAFC" />
            </StyledManageVehiclesFloatingButton>
        </StyledManageVehiclesScreen>
    );
}
