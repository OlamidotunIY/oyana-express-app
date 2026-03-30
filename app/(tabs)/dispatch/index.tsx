import { Button, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { ShipmentMode, ShipmentStatus, VehicleCategory } from "@/gql/graphql";
import { GET_PROVIDER_DASHBOARD_QUARY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import
{
    StyledDispatchEmptyState,
    StyledDispatchEmptyStateText,
    StyledDispatchOverviewText,
    StyledDispatchFilterTab,
    StyledDispatchFilterTabText,
    StyledDispatchFilterTabs,
    StyledDispatchModeBadge,
    StyledDispatchModeText,
    StyledDispatchRoot,
    StyledDispatchShipmentCard,
    StyledDispatchShipmentCardMain,
    StyledDispatchShipmentCardTop,
    StyledDispatchShipmentCode,
    StyledDispatchShipmentCountChip,
    StyledDispatchShipmentCountText,
    StyledDispatchShipmentDescription,
    StyledDispatchShipmentListHeader,
    StyledDispatchShipmentMetaChip,
    StyledDispatchShipmentMetaRow,
    StyledDispatchShipmentMetaText,
    StyledDispatchShipmentProgressDot,
    StyledDispatchShipmentProgressLabel,
    StyledDispatchShipmentProgressRow,
    StyledDispatchShipmentProgressStep,
    StyledDispatchShipmentTrailing,
    StyledDispatchSectionLabel,
    StyledDispatchSurfaceCard,
    StyledOfferList,
} from "@/styles/tabs";
import { formatEnumLabel, formatMinorCurrency, formatShipmentStatus, getTimestamp } from "@/utils/format";
import { useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

type ShipmentBoardItem = {
    id: string;
    trackingCode: string;
    mode: ShipmentMode;
    status: ShipmentStatus;
    vehicleCategory: VehicleCategory;
    scheduledAt?: string | null;
    createdAt: string;
    updatedAt?: string;
    packageDescription?: string | null;
    pricingCurrency: string;
    quotedPriceMinor?: number | null;
    finalPriceMinor?: number | null;
};

type ProviderShipmentsBoardQuery = {
    getProviderDashboardQuary: {
        activeAssignments: ShipmentBoardItem[];
        completedShipments: ShipmentBoardItem[];
    };
};

const DEV_SHIPMENT_BOARD_DATA: ProviderShipmentsBoardQuery = {
    getProviderDashboardQuary: {
        activeAssignments: [
            {
                id: "ship-001",
                trackingCode: "OY-2024-0042",
                mode: ShipmentMode.Dispatch,
                status: ShipmentStatus.EnRoutePickup,
                vehicleCategory: VehicleCategory.Bike,
                scheduledAt: null,
                createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
                packageDescription: "Electronics – handle with care",
                pricingCurrency: "NGN",
                quotedPriceMinor: 350000,
                finalPriceMinor: null,
            },
            {
                id: "ship-017",
                trackingCode: "OY-2024-0091",
                mode: ShipmentMode.Marketplace,
                status: ShipmentStatus.Assigned,
                vehicleCategory: VehicleCategory.Van,
                scheduledAt: null,
                createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
                packageDescription: "Palletized food supplies for regional delivery",
                pricingCurrency: "NGN",
                quotedPriceMinor: 980000,
                finalPriceMinor: null,
            },
        ],
        completedShipments: [
            {
                id: "ship-014",
                trackingCode: "OY-2024-0080",
                mode: ShipmentMode.Dispatch,
                status: ShipmentStatus.Completed,
                vehicleCategory: VehicleCategory.Bike,
                scheduledAt: null,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
                updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
                packageDescription: "Office documents and signed contracts",
                pricingCurrency: "NGN",
                quotedPriceMinor: 220000,
                finalPriceMinor: 220000,
            },
            {
                id: "ship-015",
                trackingCode: "OY-2024-0084",
                mode: ShipmentMode.Marketplace,
                status: ShipmentStatus.Completed,
                vehicleCategory: VehicleCategory.Truck,
                scheduledAt: null,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
                updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
                packageDescription: "Industrial tools and machine components",
                pricingCurrency: "NGN",
                quotedPriceMinor: 1850000,
                finalPriceMinor: 1850000,
            },
        ],
    },
};

function getShipmentNextAction(
    status: ShipmentStatus,
): { label: string } | null
{
    switch (status)
    {
        case ShipmentStatus.Assigned:
            return { label: "Start route to pickup" };
        case ShipmentStatus.EnRoutePickup:
            return { label: "Confirm pickup" };
        case ShipmentStatus.PickedUp:
            return { label: "Proceed to dropoff" };
        case ShipmentStatus.EnRouteDropoff:
            return { label: "Confirm dropoff" };
        default:
            return null;
    }
}

function getShipmentProgress(status: ShipmentStatus)
{
    const rank = (() =>
    {
        switch (status)
        {
            case ShipmentStatus.Assigned:
                return 1;
            case ShipmentStatus.EnRoutePickup:
                return 2;
            case ShipmentStatus.PickedUp:
                return 3;
            case ShipmentStatus.EnRouteDropoff:
                return 3;
            case ShipmentStatus.Delivered:
            case ShipmentStatus.Completed:
                return 4;
            default:
                return 0;
        }
    })();

    return [
        { id: "assigned", label: "Assigned", state: rank > 1 ? "completed" : rank === 1 ? "active" : "upcoming" },
        { id: "pickup", label: "Pickup", state: rank > 2 ? "completed" : rank === 2 ? "active" : "upcoming" },
        { id: "dropoff", label: "Dropoff", state: rank > 3 ? "completed" : rank === 3 ? "active" : "upcoming" },
        { id: "done", label: "Done", state: rank === 4 ? "completed" : "upcoming" },
    ] as const;
}

function getShipmentModePresentation(mode: ShipmentMode)
{
    if (mode === ShipmentMode.Marketplace)
    {
        return {
            label: "Freight",
            icon: "local-shipping" as const,
        };
    }

    return {
        label: "Dispatch",
        icon: "two-wheeler" as const,
    };
}

export default function DispatchScreen()
{
    const router = useRouter();
    const theme = useTheme();
    const [shipmentFilter, setShipmentFilter] = React.useState<"active" | "completed">("active");

    const { data, loading, error } = useQuery<ProviderShipmentsBoardQuery>(
        GET_PROVIDER_DASHBOARD_QUARY,
        {
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    useBackendErrorToast(error, "Unable to load dispatch data.", {
        title: "Dispatch Error",
        dedupeKey: "dispatch-tab-query",
    });

    const resolvedData = (__DEV__ && !data?.getProviderDashboardQuary?.activeAssignments?.length && !data?.getProviderDashboardQuary?.completedShipments?.length)
        ? DEV_SHIPMENT_BOARD_DATA
        : data;
    const activeAssignments = resolvedData?.getProviderDashboardQuary.activeAssignments ?? [];
    const completedShipments = resolvedData?.getProviderDashboardQuary.completedShipments ?? [];

    const openShipmentDetails = (shipmentId: string, mode: ShipmentMode) =>
    {
        const context = mode === ShipmentMode.Marketplace ? "freight" : "dispatch";
        router.push(`/shipment-details?context=${context}&shipmentId=${encodeURIComponent(shipmentId)}` as never);
    };

    const sortedAssignments = React.useMemo(
        () => [...activeAssignments].sort(
            (left, right) =>
                getTimestamp((right.scheduledAt ?? right.createdAt) as string | null) -
                getTimestamp((left.scheduledAt ?? left.createdAt) as string | null),
        ),
        [activeAssignments],
    );

    const sortedCompletedShipments = React.useMemo(
        () => [...completedShipments].sort(
            (left, right) =>
                getTimestamp((right.updatedAt ?? right.createdAt) as string | null) -
                getTimestamp((left.updatedAt ?? left.createdAt) as string | null),
        ),
        [completedShipments],
    );

    const displayedShipments = shipmentFilter === "active"
        ? sortedAssignments
        : sortedCompletedShipments;

    const emptyStateCopy = shipmentFilter === "active"
        ? "No active shipments right now. New dispatch and freight jobs will appear here once they are assigned."
        : "No completed shipments yet. Completed dispatch and freight jobs will appear here after handover.";

    return (
        <ScreenShell contentProps={{ style: { justifyContent: "flex-start" } }}>
            <StyledDispatchRoot>
                <StyledDispatchSurfaceCard>
                    <StyledDispatchShipmentListHeader>
                        <StyledDispatchSectionLabel>
                            {shipmentFilter === "active" ? "Active shipments" : "Completed shipments"}
                        </StyledDispatchSectionLabel>
                        <StyledDispatchShipmentCountChip>
                            <StyledDispatchShipmentCountText>
                                {displayedShipments.length} {shipmentFilter === "active" ? "live" : "done"}
                            </StyledDispatchShipmentCountText>
                        </StyledDispatchShipmentCountChip>
                    </StyledDispatchShipmentListHeader>

                    <StyledDispatchFilterTabs>
                        <StyledDispatchFilterTab
                            onPress={() => setShipmentFilter("active")}
                            $active={shipmentFilter === "active"}
                        >
                            <StyledDispatchFilterTabText $active={shipmentFilter === "active"}>
                                Active shipments
                            </StyledDispatchFilterTabText>
                        </StyledDispatchFilterTab>
                        <StyledDispatchFilterTab
                            onPress={() => setShipmentFilter("completed")}
                            $active={shipmentFilter === "completed"}
                        >
                            <StyledDispatchFilterTabText $active={shipmentFilter === "completed"}>
                                Completed shipments
                            </StyledDispatchFilterTabText>
                        </StyledDispatchFilterTab>
                    </StyledDispatchFilterTabs>

                    {loading && !data ? <Spinner size="small" /> : null}

                    {displayedShipments.length === 0 && !loading ? (
                        <StyledDispatchEmptyState>
                            <MaterialIcons name="inbox" size={32} color={theme.colors.mutedForeground} />
                            <StyledDispatchEmptyStateText>
                                {emptyStateCopy}
                            </StyledDispatchEmptyStateText>
                        </StyledDispatchEmptyState>
                    ) : (
                        <StyledOfferList>
                            {displayedShipments.map((shipment) =>
                            {
                                const mode = getShipmentModePresentation(shipment.mode);
                                const modeKey =
                                    shipment.mode === ShipmentMode.Marketplace
                                        ? "marketplace"
                                        : "dispatch";
                                const action = getShipmentNextAction(shipment.status);
                                const progressSteps = getShipmentProgress(shipment.status);
                                const amountMinor = shipment.finalPriceMinor ?? shipment.quotedPriceMinor;
                                return (
                                    <StyledDispatchShipmentCard
                                        key={shipment.id}
                                        onPress={() =>
                                            openShipmentDetails(shipment.id, shipment.mode)
                                        }
                                    >
                                        <StyledDispatchShipmentCardTop>
                                            <StyledDispatchShipmentCardMain>
                                                <StyledDispatchShipmentCode>{shipment.trackingCode}</StyledDispatchShipmentCode>
                                                <StyledDispatchShipmentDescription>
                                                    {shipment.packageDescription ?? "Dispatch shipment in progress"}
                                                </StyledDispatchShipmentDescription>
                                            </StyledDispatchShipmentCardMain>
                                            <StyledDispatchShipmentTrailing>
                                                <StyledDispatchModeBadge $mode={modeKey}>
                                                    <MaterialIcons name={mode.icon} size={12} color={shipment.mode === ShipmentMode.Marketplace ? "#7c2d12" : "#1d4ed8"} />
                                                    <StyledDispatchModeText $mode={modeKey}>
                                                        {mode.label}
                                                    </StyledDispatchModeText>
                                                </StyledDispatchModeBadge>
                                                <StyledDispatchShipmentMetaChip>
                                                    <StyledDispatchShipmentMetaText>
                                                        {formatShipmentStatus(shipment.status)}
                                                    </StyledDispatchShipmentMetaText>
                                                </StyledDispatchShipmentMetaChip>
                                            </StyledDispatchShipmentTrailing>
                                        </StyledDispatchShipmentCardTop>
                                        <StyledDispatchShipmentMetaRow>
                                            <StyledDispatchShipmentMetaChip>
                                                <StyledDispatchShipmentMetaText>
                                                    {shipmentFilter === "active" ? "Started" : "Completed"} {new Date((shipmentFilter === "active" ? shipment.createdAt : shipment.updatedAt ?? shipment.createdAt)).toLocaleDateString()}
                                                </StyledDispatchShipmentMetaText>
                                            </StyledDispatchShipmentMetaChip>
                                            <StyledDispatchShipmentMetaChip>
                                                <StyledDispatchShipmentMetaText>
                                                    {formatEnumLabel(shipment.vehicleCategory)}
                                                </StyledDispatchShipmentMetaText>
                                            </StyledDispatchShipmentMetaChip>
                                            {amountMinor != null ? (
                                                <StyledDispatchShipmentMetaChip>
                                                    <StyledDispatchShipmentMetaText>
                                                        {formatMinorCurrency(amountMinor, shipment.pricingCurrency)}
                                                    </StyledDispatchShipmentMetaText>
                                                </StyledDispatchShipmentMetaChip>
                                            ) : null}
                                            {action ? (
                                                <StyledDispatchShipmentMetaChip>
                                                    <StyledDispatchShipmentMetaText>
                                                        Next: {action.label}
                                                    </StyledDispatchShipmentMetaText>
                                                </StyledDispatchShipmentMetaChip>
                                            ) : null}
                                        </StyledDispatchShipmentMetaRow>
                                        {shipmentFilter === "active" ? (
                                            <StyledDispatchShipmentProgressRow>
                                                {progressSteps.map((step) => (
                                                    <StyledDispatchShipmentProgressStep key={step.id}>
                                                        <StyledDispatchShipmentProgressDot $state={step.state} />
                                                        <StyledDispatchShipmentProgressLabel $state={step.state}>
                                                            {step.label}
                                                        </StyledDispatchShipmentProgressLabel>
                                                    </StyledDispatchShipmentProgressStep>
                                                ))}
                                            </StyledDispatchShipmentProgressRow>
                                        ) : null}
                                    </StyledDispatchShipmentCard>
                                );
                            })}
                        </StyledOfferList>
                    )}
                </StyledDispatchSurfaceCard>

            </StyledDispatchRoot>
        </ScreenShell>
    );
}
