import { Button, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import
{
    BidStatus,
    ConfirmMarketplaceDropoffMutation,
    ConfirmMarketplaceDropoffMutationVariables,
    ConfirmMarketplacePickupMutation,
    ConfirmMarketplacePickupMutationVariables,
    ConfirmDropoffMutation,
    ConfirmDropoffMutationVariables,
    ConfirmPickupMutation,
    ConfirmPickupMutationVariables,
    DispatchOfferStatus,
    GetProviderDispatchTabQuaryQuery,
    MarkEnRoutePickupMutation,
    MarkEnRoutePickupMutationVariables,
    MarkMarketplaceEnRoutePickupMutation,
    MarkMarketplaceEnRoutePickupMutationVariables,
    MyBidsQuery,
    MyUserAddressesQuery,
    RespondToDispatchOfferMutation,
    RespondToDispatchOfferMutationVariables,
    ShipmentEvent,
    ShipmentMilestone,
    ShipmentMilestoneStatus,
    ShipmentMilestoneType,
    ShipmentMode,
    ShipmentQuery,
    ShipmentQueryVariables,
    ShipmentScheduleType,
    ShipmentStatus,
    VehicleCategory,
} from "@/gql/graphql";
import
{
    CONFIRM_MARKETPLACE_DROPOFF,
    CONFIRM_MARKETPLACE_PICKUP,
    CONFIRM_DROPOFF,
    CONFIRM_PICKUP,
    GET_PROVIDER_DISPATCH_TAB_QUARY,
    MARK_EN_ROUTE_PICKUP,
    MARK_MARKETPLACE_EN_ROUTE_PICKUP,
    MY_BIDS_QUERY,
    MY_USER_ADDRESSES_QUERY,
    RESPOND_TO_DISPATCH_OFFER,
    SHIPMENT_QUERY,
    SHIPMENT_TRACKING_QUERY,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { DEV_DISPATCH_DATA, DEV_FREIGHT_DATA } from "@/lib/dev-fixtures";
import
{
    StyledBidStatusPill,
    StyledBidStatusText,
    StyledDetailActionsWrap,
    StyledFreightStatusPill,
    StyledOfferStatusPill,
    StyledOfferStatusText,
    StyledShipmentAddressCard,
    StyledShipmentAddressLabel,
    StyledShipmentAddressStack,
    StyledShipmentAddressValue,
    StyledShipmentDetailsBackButton,
    StyledShipmentDetailsRoot,
    StyledShipmentDetailsTopBar,
    StyledShipmentDetailsTopEyebrow,
    StyledShipmentDetailsTopSpacer,
    StyledShipmentDetailsTopTitle,
    StyledShipmentDetailsTopTitleWrap,
    StyledShipmentFooterNote,
    StyledShipmentFooterWrap,
    StyledShipmentItemCard,
    StyledShipmentItemHead,
    StyledShipmentItemMetaChip,
    StyledShipmentItemMetaRow,
    StyledShipmentItemMetaText,
    StyledShipmentItemName,
    StyledShipmentItemQuantity,
    StyledShipmentItemsList,
    StyledShipmentMapBadge,
    StyledShipmentMapBadgeText,
    StyledShipmentMapCard,
    StyledShipmentMapDistanceCard,
    StyledShipmentMapDistanceLabel,
    StyledShipmentMapDistanceValue,
    StyledShipmentMapHeader,
    StyledShipmentMapVisual,
    StyledShipmentMetaChip,
    StyledShipmentMetaChipText,
    StyledShipmentMetaChips,
    StyledShipmentMetricGrid,
    StyledShipmentMetricItem,
    StyledShipmentMetricLabel,
    StyledShipmentMetricValue,
    StyledShipmentSectionCard,
    StyledShipmentSectionHeading,
    StyledShipmentSectionText,
    StyledShipmentTimelineContent,
    StyledShipmentTimelineIconWrap,
    StyledShipmentTimelineItem,
    StyledShipmentTimelineList,
    StyledShipmentTimelineMeta,
    StyledShipmentTimelineTitle,
    StyledShipmentSummaryCard,
    StyledShipmentSummaryCode,
    StyledShipmentSummaryDescription,
    StyledShipmentSummaryHead,
    StyledShipmentSummaryTextWrap,
    StyledShipmentSummaryTitle,
    StyledStatusText
} from "@/styles/tabs";
import { formatEnumLabel, formatMinorCurrency, formatShipmentStatus } from "@/utils/format";
import { useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import { useTheme } from "styled-components/native";

type DetailContext = "freight" | "dispatch";

type NormalizedShipment = NonNullable<ShipmentQuery["shipment"]>;
type ShipmentAddress = NonNullable<NonNullable<ShipmentQuery["shipment"]>["pickupAddress"]>;
type ShipmentContentItem = NonNullable<NonNullable<ShipmentQuery["shipment"]>["items"]>[number];
type Coordinate = { latitude: number; longitude: number };
type LinkedAddress = MyUserAddressesQuery["myUserAddresses"][number];
type ShipmentTrackingDetailsQuery = {
    shipmentTracking: {
        events: ShipmentEvent[];
        milestones: ShipmentMilestone[];
    };
};
type ShipmentTrackingDetailsQueryVariables = { shipmentId: string };
type ActivityTone = "primary" | "success" | "warning" | "muted";
type OperationalActivityRow = {
    id: string;
    title: string;
    meta: string;
    iconName: React.ComponentProps<typeof MaterialIcons>["name"];
    tone: ActivityTone;
    timestamp: number;
};

const DEFAULT_MAP_CENTER: Coordinate = { latitude: 6.5244, longitude: 3.3792 };
const OSRM_ROUTE_BASE_URL = "https://router.project-osrm.org/route/v1/driving";

const STATIC_DISPATCH_SHIPMENT_FALLBACKS: Record<string, Partial<NormalizedShipment>> = {
    "ship-001": {
        trackingCode: "OY-2024-0042",
        packageDescription: "Electronics with fragile handling requirements",
        pickupAddressSummary: "Ikeja Along, Lagos",
        dropoffAddressSummary: "Ozumba Mbadiwe Ave, Victoria Island",
        pickupAddressId: "dispatch-pickup-001",
        dropoffAddressId: "dispatch-dropoff-001",
        pricingCurrency: "NGN",
        quotedPriceMinor: 350000,
        finalPriceMinor: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    "ship-002": {
        trackingCode: "OY-2024-0044",
        packageDescription: "Urgent office supplies and small parcels",
        pickupAddressSummary: "Allen Avenue, Ikeja",
        dropoffAddressSummary: "Marina Road, Lagos Island",
        pickupAddressId: "dispatch-pickup-002",
        dropoffAddressId: "dispatch-dropoff-002",
        pricingCurrency: "NGN",
        quotedPriceMinor: 210000,
        finalPriceMinor: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    },
    "ship-003": {
        trackingCode: "OY-2024-0045",
        packageDescription: "Medical supplies requiring priority delivery",
        pickupAddressSummary: "Apapa Port Road, Lagos",
        dropoffAddressSummary: "Bodija, Ibadan",
        pickupAddressId: "dispatch-pickup-003",
        dropoffAddressId: "dispatch-dropoff-003",
        pricingCurrency: "NGN",
        quotedPriceMinor: 490000,
        finalPriceMinor: null,
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
};

function getParamValue(value: string | string[] | undefined): string | undefined
{
    if (!value) return undefined;
    return Array.isArray(value) ? value[0] : value;
}

function estimateDistanceKm(...parts: Array<string | null | undefined>): number
{
    const source = parts.filter(Boolean).join("|") || "route";
    let hash = 0;

    for (let index = 0; index < source.length; index += 1)
    {
        hash = (hash * 31 + source.charCodeAt(index)) | 0;
    }

    const normalized = Math.abs(hash % 370);
    return Math.max(3.5, normalized / 10 + 4);
}

function isCoordinateValue(value: number | null | undefined): value is number
{
    return typeof value === "number" && Number.isFinite(value);
}

function createFallbackCoordinate(seed: string, variant: "pickup" | "dropoff"): Coordinate
{
    let hash = 0;

    for (let index = 0; index < seed.length; index += 1)
    {
        hash = (hash * 33 + seed.charCodeAt(index)) | 0;
    }

    const latOffset = (Math.abs(hash % 1200) / 10000) + (variant === "pickup" ? 0.02 : 0.16);
    const lngOffset = (Math.abs((hash >> 4) % 1400) / 10000) + (variant === "pickup" ? 0.02 : 0.12);

    return {
        latitude: 6.35 + latOffset,
        longitude: 3.1 + lngOffset,
    };
}

function resolveShipmentCoordinate(
    addresses: LinkedAddress[],
    shipmentAddress: ShipmentAddress | null | undefined,
    addressId: string | null | undefined,
    addressSummary: string | null | undefined,
    variant: "pickup" | "dropoff",
): Coordinate | null
{
    if (shipmentAddress && isCoordinateValue(shipmentAddress.lat) && isCoordinateValue(shipmentAddress.lng))
    {
        return {
            latitude: shipmentAddress.lat,
            longitude: shipmentAddress.lng,
        };
    }

    const linkedAddress = addresses.find((item) => item.id === addressId);
    if (linkedAddress && isCoordinateValue(linkedAddress.lat) && isCoordinateValue(linkedAddress.lng))
    {
        return {
            latitude: linkedAddress.lat,
            longitude: linkedAddress.lng,
        };
    }

    const summaryMatch = addresses.find(
        (item) =>
            item.address === addressSummary ||
            `${item.address}, ${item.city}` === addressSummary ||
            item.label === addressSummary,
    );

    if (summaryMatch && isCoordinateValue(summaryMatch.lat) && isCoordinateValue(summaryMatch.lng))
    {
        return {
            latitude: summaryMatch.lat,
            longitude: summaryMatch.lng,
        };
    }

    const seed = addressId ?? addressSummary;
    if (!seed)
    {
        return null;
    }

    return createFallbackCoordinate(seed, variant);
}

function formatShipmentAddress(
    address: ShipmentAddress | null | undefined,
    addressSummary: string | null | undefined,
    addressId: string | null | undefined,
    fallback: string,
): string
{
    const parts = [address?.address, address?.city, address?.state].filter(
        (part): part is string => Boolean(part && part.trim()),
    );

    if (parts.length > 0)
    {
        return parts.join(", ");
    }

    return addressSummary ?? addressId ?? fallback;
}

function toRadians(value: number): number
{
    return (value * Math.PI) / 180;
}

function calculateDistanceKm(
    pickupCoordinate: Coordinate | null,
    dropoffCoordinate: Coordinate | null,
    fallbackDistanceKm: number,
): number
{
    if (!pickupCoordinate || !dropoffCoordinate)
    {
        return fallbackDistanceKm;
    }

    const earthRadiusKm = 6371;
    const deltaLatitude = toRadians(dropoffCoordinate.latitude - pickupCoordinate.latitude);
    const deltaLongitude = toRadians(dropoffCoordinate.longitude - pickupCoordinate.longitude);
    const latitudeA = toRadians(pickupCoordinate.latitude);
    const latitudeB = toRadians(dropoffCoordinate.latitude);

    const arc =
        Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
        Math.cos(latitudeA) * Math.cos(latitudeB) *
        Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

    const angularDistance = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc));
    return Math.max(1.2, earthRadiusKm * angularDistance);
}

function buildMapRegion(pickupCoordinate: Coordinate | null, dropoffCoordinate: Coordinate | null): Region
{
    if (pickupCoordinate && dropoffCoordinate)
    {
        const latitudeDelta = Math.max(Math.abs(pickupCoordinate.latitude - dropoffCoordinate.latitude) * 1.8, 0.08);
        const longitudeDelta = Math.max(Math.abs(pickupCoordinate.longitude - dropoffCoordinate.longitude) * 1.8, 0.08);

        return {
            latitude: (pickupCoordinate.latitude + dropoffCoordinate.latitude) / 2,
            longitude: (pickupCoordinate.longitude + dropoffCoordinate.longitude) / 2,
            latitudeDelta,
            longitudeDelta,
        };
    }

    const anchor = pickupCoordinate ?? dropoffCoordinate ?? DEFAULT_MAP_CENTER;

    return {
        latitude: anchor.latitude,
        longitude: anchor.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
    };
}

function isCoordinatePair(value: unknown): value is [number, number]
{
    return Array.isArray(value)
        && value.length >= 2
        && typeof value[0] === "number"
        && Number.isFinite(value[0])
        && typeof value[1] === "number"
        && Number.isFinite(value[1]);
}

function buildStaticShipment(
    shipmentId: string,
    base: Partial<NormalizedShipment>,
    mode: ShipmentMode,
): NormalizedShipment
{
    const createdAt = base.createdAt ?? new Date().toISOString();

    return {
        __typename: "Shipment",
        id: shipmentId,
        trackingCode: base.trackingCode ?? shipmentId,
        customerProfileId: base.customerProfileId ?? "dev-customer-profile",
        mode,
        vehicleCategory: base.vehicleCategory ?? VehicleCategory.Van,
        scheduleType: base.scheduleType ?? (base.scheduledAt ? ShipmentScheduleType.Scheduled : ShipmentScheduleType.Instant),
        status: base.status ?? ShipmentStatus.Broadcasting,
        pickupAddressId: base.pickupAddressId ?? base.pickupAddressSummary ?? "pickup-address-dev",
        pickupAddressSummary: base.pickupAddressSummary ?? base.pickupAddressId ?? "Pickup address pending",
        dropoffAddressId: base.dropoffAddressId ?? base.dropoffAddressSummary ?? "dropoff-address-dev",
        dropoffAddressSummary: base.dropoffAddressSummary ?? base.dropoffAddressId ?? "Dropoff address pending",
        scheduledAt: base.scheduledAt ?? null,
        packageDescription: base.packageDescription ?? null,
        packageValueMinor: base.packageValueMinor ?? null,
        specialInstructions: base.specialInstructions ?? null,
        requiresEscrow: base.requiresEscrow ?? false,
        pricingCurrency: base.pricingCurrency ?? "NGN",
        quotedPriceMinor: base.quotedPriceMinor ?? null,
        finalPriceMinor: base.finalPriceMinor ?? null,
        commissionRateBps: base.commissionRateBps ?? 0,
        commissionAmountMinor: base.commissionAmountMinor ?? 0,
        createdAt,
        updatedAt: base.updatedAt ?? createdAt,
        cancelledAt: base.cancelledAt ?? null,
        cancelledByProfileId: base.cancelledByProfileId ?? null,
        cancellationReason: base.cancellationReason ?? null,
        items: base.items ?? [],
        pickupAddress: base.pickupAddress ?? null,
        dropoffAddress: base.dropoffAddress ?? null,
    };
}

function formatActivityTimestamp(dateValue?: string | null): string
{
    if (!dateValue) return "Time unavailable";
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return "Time unavailable";
    return parsed.toLocaleString();
}

function buildMilestoneActivity(milestone: ShipmentMilestone): OperationalActivityRow | null
{
    if (milestone.status === ShipmentMilestoneStatus.Pending)
    {
        return null;
    }

    const timestamp = new Date(milestone.occurredAt ?? milestone.createdAt).getTime();
    const meta = `${formatActivityTimestamp(milestone.occurredAt ?? milestone.createdAt)} . ${formatEnumLabel(milestone.status)}`;

    switch (milestone.milestoneType)
    {
        case ShipmentMilestoneType.ArrivedPickup:
            return { id: milestone.id, title: "Rider arrived at pickup", meta, iconName: "place", tone: "primary", timestamp };
        case ShipmentMilestoneType.PickedUp:
            return { id: milestone.id, title: "Shipment picked up", meta, iconName: "inventory-2", tone: "success", timestamp };
        case ShipmentMilestoneType.ArrivedDropoff:
            return { id: milestone.id, title: "Rider arrived at dropoff", meta, iconName: "flag", tone: "primary", timestamp };
        case ShipmentMilestoneType.Delivered:
            return { id: milestone.id, title: "Shipment delivered", meta, iconName: "done-all", tone: "success", timestamp };
        case ShipmentMilestoneType.Completed:
            return { id: milestone.id, title: "Shipment completed", meta, iconName: "check-circle", tone: "success", timestamp };
        default:
            return null;
    }
}

function buildEventActivity(event: ShipmentEvent): OperationalActivityRow | null
{
    const timestamp = new Date(event.createdAt).getTime();
    const meta = formatActivityTimestamp(event.createdAt);

    switch (event.eventType)
    {
        case "CREATED":
            return { id: event.id, title: "Shipment created", meta, iconName: "description", tone: "muted", timestamp };
        case "BROADCASTED":
            return { id: event.id, title: "Shipment broadcasted", meta, iconName: "campaign", tone: "muted", timestamp };
        case "PICKED_UP":
            return { id: event.id, title: "Shipment picked up", meta, iconName: "inventory-2", tone: "success", timestamp };
        case "DELIVERED":
            return { id: event.id, title: "Shipment delivered", meta, iconName: "done-all", tone: "success", timestamp };
        case "COMPLETED":
            return { id: event.id, title: "Shipment completed", meta, iconName: "check-circle", tone: "success", timestamp };
        case "CANCELLED":
            return { id: event.id, title: "Shipment cancelled", meta, iconName: "cancel", tone: "warning", timestamp };
        case "BID_PLACED":
            return { id: event.id, title: "Bid placed", meta, iconName: "gavel", tone: "muted", timestamp };
        default:
            return null;
    }
}

function buildFallbackActivities(
    shipment: NormalizedShipment | undefined,
    _dispatchOffer: GetProviderDispatchTabQuaryQuery["myDispatchOffers"][number] | undefined,
): OperationalActivityRow[]
{
    if (!shipment)
    {
        return [];
    }

    const rows: OperationalActivityRow[] = [
        {
            id: `${shipment.id}-created`,
            title: "Shipment created",
            meta: formatActivityTimestamp(shipment.createdAt),
            iconName: "description",
            tone: "muted",
            timestamp: new Date(shipment.createdAt).getTime(),
        },
    ];

    return rows.sort((left, right) => right.timestamp - left.timestamp);
}

function buildOperationalActivities(
    shipment: NormalizedShipment | undefined,
    dispatchOffer: GetProviderDispatchTabQuaryQuery["myDispatchOffers"][number] | undefined,
    events: ShipmentEvent[],
    milestones: ShipmentMilestone[],
): OperationalActivityRow[]
{
    const rows = [
        ...milestones.map(buildMilestoneActivity),
        ...events.map(buildEventActivity),
    ].filter((row): row is OperationalActivityRow => Boolean(row));

    if (rows.length === 0)
    {
        return buildFallbackActivities(shipment, dispatchOffer);
    }

    const seenTitles = new Set<string>();
    return rows
        .sort((left, right) => right.timestamp - left.timestamp)
        .filter((row) =>
        {
            if (seenTitles.has(row.title))
            {
                return false;
            }
            seenTitles.add(row.title);
            return true;
        });
}

function getDispatchActionStage(status: ShipmentStatus)
{
    switch (status)
    {
        case ShipmentStatus.Assigned:
            return {
                title: "Next action",
                description: "Head to the pickup point and start the live route when you are ready to move.",
                actionLabel: "Start route to pickup",
                actionType: "markEnRoutePickup" as const,
            };
        case ShipmentStatus.EnRoutePickup:
            return {
                title: "Next action",
                description: "You are on the pickup leg. Confirm pickup once the parcel has been collected and loaded.",
                actionLabel: "Confirm pickup",
                actionType: "confirmPickup" as const,
            };
        case ShipmentStatus.PickedUp:
        case ShipmentStatus.EnRouteDropoff:
            return {
                title: "Next action",
                description: "The shipment is on the dropoff leg. Confirm dropoff after the handover to complete the job.",
                actionLabel: "Confirm dropoff",
                actionType: "confirmDropoff" as const,
            };
        case ShipmentStatus.Delivered:
        case ShipmentStatus.Completed:
            return {
                title: "Dispatch complete",
                description: "This assignment has already been completed. The activity feed below shows the shipment progress that has been recorded.",
                actionLabel: "Completed",
                actionType: "completed" as const,
            };
        default:
            return null;
    }
}

function getFreightActionStage(status: ShipmentStatus)
{
    switch (status)
    {
        case ShipmentStatus.Assigned:
            return {
                title: "Next action",
                description: "The load has been awarded to your team. Start route to pickup once the truck is ready to move.",
                actionLabel: "Start route to pickup",
                actionType: "markMarketplaceEnRoutePickup" as const,
            };
        case ShipmentStatus.EnRoutePickup:
            return {
                title: "Next action",
                description: "You are on the pickup leg. Confirm pickup after the cargo has been loaded and secured.",
                actionLabel: "Confirm pickup",
                actionType: "confirmMarketplacePickup" as const,
            };
        case ShipmentStatus.PickedUp:
        case ShipmentStatus.EnRouteDropoff:
            return {
                title: "Next action",
                description: "The cargo is in transit. Confirm dropoff after final handover at the destination.",
                actionLabel: "Confirm dropoff",
                actionType: "confirmMarketplaceDropoff" as const,
            };
        case ShipmentStatus.Delivered:
        case ShipmentStatus.Completed:
            return {
                title: "Freight complete",
                description: "This awarded load has already been completed. The timeline below shows the shipment progress that has been recorded.",
                actionLabel: "Completed",
                actionType: "completed" as const,
            };
        default:
            return null;
    }
}

export default function ShipmentDetailsScreen()
{
    const router = useRouter();
    const theme = useTheme();
    const params = useLocalSearchParams();
    const shipmentId = getParamValue(params.shipmentId);
    const offerId = getParamValue(params.offerId);
    const rawContext = getParamValue(params.context);
    const context: DetailContext = rawContext === "dispatch" ? "dispatch" : "freight";

    const staticFreightShipment = React.useMemo(
        () => (__DEV__ && context === "freight"
            ? DEV_FREIGHT_DATA.marketplaceShipments.items.find((item) => item.id === shipmentId)
            : undefined),
        [context, shipmentId],
    );

    const staticDispatchOffer = React.useMemo(
        () => (__DEV__ && context === "dispatch"
            ? DEV_DISPATCH_DATA.myDispatchOffers.find((item) => item.id === offerId || item.shipmentId === shipmentId)
            : undefined),
        [context, offerId, shipmentId],
    );

    const staticDispatchShipment = React.useMemo(() =>
    {
        if (!__DEV__ || context !== "dispatch" || !shipmentId)
        {
            return undefined;
        }

        const activeAssignment = DEV_DISPATCH_DATA.getProviderDashboardQuary.activeAssignments.find(
            (item) => item.id === shipmentId,
        );

        if (activeAssignment)
        {
            return buildStaticShipment(shipmentId, {
                ...activeAssignment,
                pickupAddressSummary: activeAssignment.pickupAddressId,
                dropoffAddressSummary: activeAssignment.dropoffAddressId,
                mode: ShipmentMode.Dispatch,
                vehicleCategory: VehicleCategory.Bike,
                scheduleType: ShipmentScheduleType.Instant,
            }, ShipmentMode.Dispatch);
        }

        const fallback = STATIC_DISPATCH_SHIPMENT_FALLBACKS[shipmentId];
        if (!fallback)
        {
            return undefined;
        }

        return buildStaticShipment(shipmentId, {
            ...fallback,
            mode: ShipmentMode.Dispatch,
            status: staticDispatchOffer?.status === DispatchOfferStatus.Accepted
                ? ShipmentStatus.Assigned
                : ShipmentStatus.Created,
            vehicleCategory: VehicleCategory.Bike,
        }, ShipmentMode.Dispatch);
    }, [context, shipmentId, staticDispatchOffer?.status]);

    const staticShipment = React.useMemo(() =>
    {
        if (context === "freight")
        {
            if (staticFreightShipment)
            {
                return buildStaticShipment(staticFreightShipment.id, {
                    ...staticFreightShipment,
                    mode: ShipmentMode.Marketplace,
                    vehicleCategory: VehicleCategory.Van,
                }, ShipmentMode.Marketplace);
            }

            if (__DEV__ && shipmentId)
            {
                return buildStaticShipment(shipmentId, {
                    trackingCode: shipmentId,
                    packageDescription: "Freight shipment",
                    pickupAddressSummary: "Pickup address will be confirmed on assignment",
                    dropoffAddressSummary: "Dropoff address will be confirmed on assignment",
                    pricingCurrency: "NGN",
                    quotedPriceMinor: null,
                    status: ShipmentStatus.Assigned,
                    vehicleCategory: VehicleCategory.Van,
                    scheduleType: ShipmentScheduleType.Instant,
                }, ShipmentMode.Marketplace);
            }

            return undefined;
        }

        return staticDispatchShipment;
    }, [context, shipmentId, staticDispatchShipment, staticFreightShipment]);

    const isStaticShipment = Boolean(staticShipment);

    const { data: shipmentData, loading: shipmentLoading, error: shipmentError } = useQuery<ShipmentQuery, ShipmentQueryVariables>(
        SHIPMENT_QUERY,
        {
            variables: { shipmentId: shipmentId ?? "" },
            skip: !shipmentId || isStaticShipment,
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    const { data: bidsData, loading: bidsLoading, error: bidsError } = useQuery<MyBidsQuery>(
        MY_BIDS_QUERY,
        {
            skip: context !== "freight" || isStaticShipment,
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    const { data: userAddressesData } = useQuery<MyUserAddressesQuery>(
        MY_USER_ADDRESSES_QUERY,
        {
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    const { data: dispatchData, loading: dispatchLoading, error: dispatchError, refetch: refetchDispatch } = useQuery<GetProviderDispatchTabQuaryQuery>(
        GET_PROVIDER_DISPATCH_TAB_QUARY,
        {
            skip: context !== "dispatch" || (!shipmentId && !offerId) || Boolean(staticDispatchOffer),
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    const { data: trackingData, error: trackingError } = useQuery<ShipmentTrackingDetailsQuery, ShipmentTrackingDetailsQueryVariables>(
        SHIPMENT_TRACKING_QUERY,
        {
            variables: { shipmentId: shipmentId ?? "" },
            skip: !shipmentId || isStaticShipment,
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    const [respondToDispatchOffer, { loading: respondingToDispatchOffer }] = useMutation<
        RespondToDispatchOfferMutation,
        RespondToDispatchOfferMutationVariables
    >(RESPOND_TO_DISPATCH_OFFER);
    const [markEnRoutePickup, { loading: markingEnRoutePickup, error: markEnRoutePickupError }] = useMutation<
        MarkEnRoutePickupMutation,
        MarkEnRoutePickupMutationVariables
    >(MARK_EN_ROUTE_PICKUP);
    const [confirmPickup, { loading: confirmingPickup, error: confirmPickupError }] = useMutation<
        ConfirmPickupMutation,
        ConfirmPickupMutationVariables
    >(CONFIRM_PICKUP);
    const [confirmDropoff, { loading: confirmingDropoff, error: confirmDropoffError }] = useMutation<
        ConfirmDropoffMutation,
        ConfirmDropoffMutationVariables
    >(CONFIRM_DROPOFF);
    const [markMarketplaceEnRoutePickup, { loading: markingMarketplaceEnRoutePickup, error: markMarketplaceEnRoutePickupError }] = useMutation<
        MarkMarketplaceEnRoutePickupMutation,
        MarkMarketplaceEnRoutePickupMutationVariables
    >(MARK_MARKETPLACE_EN_ROUTE_PICKUP);
    const [confirmMarketplacePickup, { loading: confirmingMarketplacePickup, error: confirmMarketplacePickupError }] = useMutation<
        ConfirmMarketplacePickupMutation,
        ConfirmMarketplacePickupMutationVariables
    >(CONFIRM_MARKETPLACE_PICKUP);
    const [confirmMarketplaceDropoff, { loading: confirmingMarketplaceDropoff, error: confirmMarketplaceDropoffError }] = useMutation<
        ConfirmMarketplaceDropoffMutation,
        ConfirmMarketplaceDropoffMutationVariables
    >(CONFIRM_MARKETPLACE_DROPOFF);

    useBackendErrorToast(shipmentError, "Unable to load shipment details.", {
        title: "Shipment Error",
        dedupeKey: "shared-shipment-details-query",
    });

    useBackendErrorToast(bidsError, "Unable to load bid details.", {
        title: "Shipment Error",
        dedupeKey: "shared-shipment-bids-query",
    });

    useBackendErrorToast(dispatchError, "Unable to load dispatch details.", {
        title: "Dispatch Error",
        dedupeKey: "shared-dispatch-details-query",
    });

    useBackendErrorToast(trackingError, "Unable to load shipment activities.", {
        title: "Shipment Error",
        dedupeKey: "shared-shipment-tracking-query",
    });

    useBackendErrorToast(markEnRoutePickupError, "Unable to start route to pickup.", {
        title: "Dispatch Error",
        dedupeKey: "shared-dispatch-mark-en-route-pickup",
    });

    useBackendErrorToast(confirmPickupError, "Unable to confirm pickup.", {
        title: "Dispatch Error",
        dedupeKey: "shared-dispatch-confirm-pickup",
    });

    useBackendErrorToast(confirmDropoffError, "Unable to confirm dropoff.", {
        title: "Dispatch Error",
        dedupeKey: "shared-dispatch-confirm-dropoff",
    });

    useBackendErrorToast(markMarketplaceEnRoutePickupError, "Unable to start freight route to pickup.", {
        title: "Freight Error",
        dedupeKey: "shared-freight-mark-en-route-pickup",
    });

    useBackendErrorToast(confirmMarketplacePickupError, "Unable to confirm freight pickup.", {
        title: "Freight Error",
        dedupeKey: "shared-freight-confirm-pickup",
    });

    useBackendErrorToast(confirmMarketplaceDropoffError, "Unable to confirm freight dropoff.", {
        title: "Freight Error",
        dedupeKey: "shared-freight-confirm-dropoff",
    });

    const resolvedDispatchData = (__DEV__ && context === "dispatch" && !dispatchData?.myDispatchOffers?.length)
        ? DEV_DISPATCH_DATA
        : dispatchData;

    const shipment = React.useMemo(() =>
    {
        if (shipmentData?.shipment)
        {
            return shipmentData.shipment;
        }

        if (staticShipment)
        {
            return staticShipment;
        }

        if (context === "dispatch" && shipmentId)
        {
            return buildStaticShipment(shipmentId, {
                trackingCode: shipmentId,
                packageDescription: "Dispatch assignment",
                pickupAddressSummary: "Pickup address will be confirmed after acceptance",
                dropoffAddressSummary: "Dropoff address will be confirmed after acceptance",
                pricingCurrency: "NGN",
                quotedPriceMinor: null,
                status: ShipmentStatus.Created,
                vehicleCategory: VehicleCategory.Bike,
            }, ShipmentMode.Dispatch);
        }

        return undefined;
    }, [context, shipmentData?.shipment, shipmentId, staticShipment]);

    const existingBid = React.useMemo(
        () => bidsData?.myBids.find((bid) => bid.shipmentId === shipmentId),
        [bidsData?.myBids, shipmentId],
    );

    const dispatchOffer = React.useMemo(
        () => resolvedDispatchData?.myDispatchOffers.find((item) => item.id === offerId || item.shipmentId === shipmentId) ?? staticDispatchOffer,
        [offerId, resolvedDispatchData?.myDispatchOffers, shipmentId, staticDispatchOffer],
    );
    const activityRows = React.useMemo(
        () => buildOperationalActivities(
            shipment,
            dispatchOffer,
            trackingData?.shipmentTracking.events ?? [],
            trackingData?.shipmentTracking.milestones ?? [],
        ),
        [dispatchOffer, shipment, trackingData?.shipmentTracking.events, trackingData?.shipmentTracking.milestones],
    );
    const dispatchActionStage = React.useMemo(
        () => context === "dispatch" && shipment ? getDispatchActionStage(shipment.status) : null,
        [context, shipment],
    );

    const isLoading = !isStaticShipment && (
        shipmentLoading ||
        (context === "freight" && bidsLoading) ||
        (context === "dispatch" && dispatchLoading)
    ) && !shipmentData?.shipment && !staticShipment;

    const pickupAddress = React.useMemo(
        () => formatShipmentAddress(
            shipment?.pickupAddress,
            shipment?.pickupAddressSummary,
            shipment?.pickupAddressId,
            "Pickup pending",
        ),
        [shipment?.pickupAddress, shipment?.pickupAddressId, shipment?.pickupAddressSummary],
    );
    const dropoffAddress = React.useMemo(
        () => formatShipmentAddress(
            shipment?.dropoffAddress,
            shipment?.dropoffAddressSummary,
            shipment?.dropoffAddressId,
            "Dropoff pending",
        ),
        [shipment?.dropoffAddress, shipment?.dropoffAddressId, shipment?.dropoffAddressSummary],
    );
    const linkedAddresses = userAddressesData?.myUserAddresses ?? [];
    const pickupCoordinate = React.useMemo(
        () => resolveShipmentCoordinate(
            linkedAddresses,
            shipment?.pickupAddress,
            shipment?.pickupAddressId,
            shipment?.pickupAddressSummary,
            "pickup",
        ),
        [linkedAddresses, shipment?.pickupAddress, shipment?.pickupAddressId, shipment?.pickupAddressSummary],
    );
    const dropoffCoordinate = React.useMemo(
        () => resolveShipmentCoordinate(
            linkedAddresses,
            shipment?.dropoffAddress,
            shipment?.dropoffAddressId,
            shipment?.dropoffAddressSummary,
            "dropoff",
        ),
        [linkedAddresses, shipment?.dropoffAddress, shipment?.dropoffAddressId, shipment?.dropoffAddressSummary],
    );
    const fallbackDistanceKm = React.useMemo(
        () => estimateDistanceKm(pickupAddress, dropoffAddress, shipment?.trackingCode, dispatchOffer?.shipmentId),
        [dispatchOffer?.shipmentId, dropoffAddress, pickupAddress, shipment?.trackingCode],
    );
    const distanceKm = React.useMemo(
        () => calculateDistanceKm(pickupCoordinate, dropoffCoordinate, fallbackDistanceKm),
        [dropoffCoordinate, fallbackDistanceKm, pickupCoordinate],
    );
    const [routeCoordinates, setRouteCoordinates] = React.useState<Coordinate[]>([]);
    const [routeDistanceKm, setRouteDistanceKm] = React.useState<number | null>(null);

    React.useEffect(() =>
    {
        setRouteCoordinates([]);
        setRouteDistanceKm(null);

        if (!pickupCoordinate || !dropoffCoordinate)
        {
            return;
        }

        const abortController = new AbortController();
        let disposed = false;

        const loadRoute = async () =>
        {
            try
            {
                const url = `${OSRM_ROUTE_BASE_URL}/${pickupCoordinate.longitude},${pickupCoordinate.latitude};${dropoffCoordinate.longitude},${dropoffCoordinate.latitude}?overview=full&geometries=geojson`;
                const response = await fetch(url, { signal: abortController.signal });

                if (!response.ok)
                {
                    return;
                }

                const payload = await response.json() as {
                    routes?: Array<{
                        distance?: number;
                        geometry?: {
                            coordinates?: unknown[];
                        };
                    }>;
                };

                const firstRoute = payload.routes?.[0];
                const rawCoordinates = firstRoute?.geometry?.coordinates ?? [];
                const nextCoordinates = rawCoordinates
                    .filter(isCoordinatePair)
                    .map(([longitude, latitude]) => ({ latitude, longitude }));

                if (!disposed && nextCoordinates.length >= 2)
                {
                    setRouteCoordinates(nextCoordinates);
                }

                if (!disposed && typeof firstRoute?.distance === "number" && Number.isFinite(firstRoute.distance))
                {
                    setRouteDistanceKm(Math.max(0.1, firstRoute.distance / 1000));
                }
            }
            catch
            {
                // Fall back to the straight-line preview when routed geometry is unavailable.
            }
        };

        void loadRoute();

        return () =>
        {
            disposed = true;
            abortController.abort();
        };
    }, [dropoffCoordinate, pickupCoordinate]);

    const resolvedMapCoordinates = routeCoordinates.length >= 2
        ? routeCoordinates
        : pickupCoordinate && dropoffCoordinate
            ? [pickupCoordinate, dropoffCoordinate]
            : [];
    const resolvedDistanceKm = routeDistanceKm ?? distanceKm;
    const mapRegion = React.useMemo(
        () => buildMapRegion(pickupCoordinate, dropoffCoordinate),
        [dropoffCoordinate, pickupCoordinate],
    );
    const priceMinor = shipment?.finalPriceMinor ?? shipment?.quotedPriceMinor;
    const primaryMetric = priceMinor != null && shipment
        ? formatMinorCurrency(priceMinor, shipment.pricingCurrency)
        : "TBD";
    const dispatchActionLoading = markingEnRoutePickup || confirmingPickup || confirmingDropoff;
    const freightActionStage = shipment ? getFreightActionStage(shipment.status) : null;
    const freightActionLoading = markingMarketplaceEnRoutePickup || confirmingMarketplacePickup || confirmingMarketplaceDropoff;
    const shipmentItems = shipment?.items ?? [];

    const handlePrimaryAction = React.useCallback(async () =>
    {
        if (!shipmentId || !shipment)
        {
            return;
        }

        if (context === "dispatch")
        {
            if (dispatchOffer?.status === DispatchOfferStatus.Accepted)
            {
                const refetchQueries = [
                    { query: SHIPMENT_QUERY, variables: { shipmentId } },
                    { query: SHIPMENT_TRACKING_QUERY, variables: { shipmentId } },
                    { query: GET_PROVIDER_DISPATCH_TAB_QUARY },
                ];

                if (dispatchActionStage?.actionType === "markEnRoutePickup")
                {
                    await markEnRoutePickup({ variables: { shipmentId }, refetchQueries, awaitRefetchQueries: true });
                }
                else if (dispatchActionStage?.actionType === "confirmPickup")
                {
                    await confirmPickup({ variables: { shipmentId }, refetchQueries, awaitRefetchQueries: true });
                }
                else if (dispatchActionStage?.actionType === "confirmDropoff")
                {
                    await confirmDropoff({ variables: { shipmentId }, refetchQueries, awaitRefetchQueries: true });
                }

                return;
            }

            if (!dispatchOffer)
            {
                return;
            }

            const isStaticDispatch = Boolean(staticDispatchOffer) || (__DEV__ && !dispatchData?.myDispatchOffers?.length);
            if (!isStaticDispatch)
            {
                await respondToDispatchOffer({
                    variables: {
                        input: {
                            offerId: dispatchOffer.id,
                            status: DispatchOfferStatus.Accepted,
                            respondedAt: new Date().toISOString(),
                        },
                    },
                });

                await refetchDispatch();
            }

            return;
        }

        if (existingBid?.status === BidStatus.Accepted)
        {
            const refetchQueries = [
                { query: SHIPMENT_QUERY, variables: { shipmentId } },
                { query: SHIPMENT_TRACKING_QUERY, variables: { shipmentId } },
                { query: MY_BIDS_QUERY },
            ];

            if (freightActionStage?.actionType === "markMarketplaceEnRoutePickup")
            {
                await markMarketplaceEnRoutePickup({ variables: { shipmentId }, refetchQueries, awaitRefetchQueries: true });
            }
            else if (freightActionStage?.actionType === "confirmMarketplacePickup")
            {
                await confirmMarketplacePickup({ variables: { shipmentId }, refetchQueries, awaitRefetchQueries: true });
            }
            else if (freightActionStage?.actionType === "confirmMarketplaceDropoff")
            {
                await confirmMarketplaceDropoff({ variables: { shipmentId }, refetchQueries, awaitRefetchQueries: true });
            }

            return;
        }

        if (existingBid?.status === BidStatus.Active)
        {
            router.push("/freight/my-bids" as never);
            return;
        }

        router.push(`/freight/place-bid?shipmentId=${encodeURIComponent(shipmentId)}` as never);
    }, [confirmDropoff, confirmMarketplaceDropoff, confirmMarketplacePickup, confirmPickup, context, dispatchActionStage?.actionType, dispatchData?.myDispatchOffers?.length, dispatchOffer, existingBid?.status, freightActionStage?.actionType, markEnRoutePickup, markMarketplaceEnRoutePickup, refetchDispatch, respondToDispatchOffer, router, shipment, shipmentId, staticDispatchOffer]);

    const primaryActionLabel = context === "dispatch"
        ? (dispatchOffer?.status === DispatchOfferStatus.Accepted
            ? (dispatchActionStage?.actionLabel ?? "Already Accepted")
            : "Accept")
        : existingBid?.status === BidStatus.Accepted
            ? (freightActionStage?.actionLabel ?? "Shipment Active")
            : existingBid?.status === BidStatus.Active
                ? "Manage Bid"
                : "Place Bid";

    const primaryActionDisabled = context === "dispatch"
        ? (dispatchOffer?.status === DispatchOfferStatus.Accepted
            ? dispatchActionLoading || dispatchActionStage?.actionType === "completed"
            : respondingToDispatchOffer)
        : existingBid?.status === BidStatus.Accepted
            ? freightActionLoading || freightActionStage?.actionType === "completed"
            : false;

    if (!shipmentId)
    {
        return (
            <ScreenShell safeAreaEdges={["top", "left", "right", "bottom"]} contentJustify="flex-start">
                <StyledShipmentDetailsRoot>
                    <StyledShipmentSectionCard>
                        <StyledShipmentSectionText>No shipment ID provided.</StyledShipmentSectionText>
                    </StyledShipmentSectionCard>
                </StyledShipmentDetailsRoot>
            </ScreenShell>
        );
    }

    return (
        <ScreenShell
            safeAreaEdges={["top", "left", "right", "bottom"]}
            contentJustify="flex-start"
            bottom={shipment ? (
                <StyledShipmentFooterWrap>
                    <Button fullWidth onPress={() => void handlePrimaryAction()} disabled={primaryActionDisabled}>
                        {context === "dispatch" && dispatchActionLoading
                            ? "Updating dispatch..."
                            : context === "freight" && freightActionLoading
                                ? "Updating freight..."
                                : primaryActionLabel}
                    </Button>
                    <StyledShipmentFooterNote>
                        {context === "dispatch"
                            ? (dispatchOffer?.status === DispatchOfferStatus.Accepted
                                ? (dispatchActionStage?.description ?? "This assignment is already active. Review the activity feed below and use the next action when needed.")
                                : "Review the route before accepting the dispatch assignment.")
                            : existingBid?.status === BidStatus.Accepted
                                ? (freightActionStage?.description ?? "This freight shipment stays on the details page. The current timeline below shows the active shipment progress that has been recorded.")
                                : "Bids can be adjusted later from your freight dashboard."}
                    </StyledShipmentFooterNote>
                </StyledShipmentFooterWrap>
            ) : undefined}
        >
            <StyledShipmentDetailsRoot>
                <StyledShipmentDetailsTopBar>
                    <StyledShipmentDetailsBackButton onPress={() => router.back()}>
                        <MaterialIcons name="arrow-back-ios-new" size={16} color={theme.colors.foreground} />
                    </StyledShipmentDetailsBackButton>
                    <StyledShipmentDetailsTopTitleWrap>
                        <StyledShipmentDetailsTopEyebrow>
                            {context === "dispatch" ? "Dispatch" : "Marketplace"}
                        </StyledShipmentDetailsTopEyebrow>
                        <StyledShipmentDetailsTopTitle>Shipment details</StyledShipmentDetailsTopTitle>
                    </StyledShipmentDetailsTopTitleWrap>
                    <StyledShipmentDetailsTopSpacer />
                </StyledShipmentDetailsTopBar>

                {isLoading ? (
                    <StyledShipmentSectionCard>
                        <Spinner size="small" />
                    </StyledShipmentSectionCard>
                ) : !shipment ? (
                    <StyledShipmentSectionCard>
                        <StyledShipmentSectionText>Shipment details are unavailable.</StyledShipmentSectionText>
                    </StyledShipmentSectionCard>
                ) : (
                    <>
                        <StyledShipmentMapCard>
                            <StyledShipmentMapHeader>
                                <StyledShipmentMapBadge>
                                    <StyledShipmentMapBadgeText>
                                        {context === "dispatch" ? "Dispatch offer" : "Freight request"}
                                    </StyledShipmentMapBadgeText>
                                </StyledShipmentMapBadge>
                                <StyledShipmentMapDistanceCard>
                                    <StyledShipmentMapDistanceLabel>
                                        {pickupCoordinate && dropoffCoordinate ? "Route distance" : "Estimated distance"}
                                    </StyledShipmentMapDistanceLabel>
                                    <StyledShipmentMapDistanceValue>{resolvedDistanceKm.toFixed(1)} km</StyledShipmentMapDistanceValue>
                                </StyledShipmentMapDistanceCard>
                            </StyledShipmentMapHeader>

                            <StyledShipmentMapVisual>
                                <MapView
                                    style={{ flex: 1 }}
                                    initialRegion={mapRegion}
                                    region={mapRegion}
                                    scrollEnabled={false}
                                    zoomEnabled={false}
                                    rotateEnabled={false}
                                    pitchEnabled={false}
                                    toolbarEnabled={false}
                                    showsCompass={false}
                                >
                                    {resolvedMapCoordinates.length >= 2 ? (
                                        <Polyline
                                            coordinates={resolvedMapCoordinates}
                                            strokeColor="#2563eb"
                                            strokeWidth={4}
                                        />
                                    ) : null}
                                    {pickupCoordinate ? (
                                        <Marker coordinate={pickupCoordinate} title="Pickup" description={pickupAddress} pinColor="#22c55e" />
                                    ) : null}
                                    {dropoffCoordinate ? (
                                        <Marker coordinate={dropoffCoordinate} title="Dropoff" description={dropoffAddress} pinColor="#fb7185" />
                                    ) : null}
                                </MapView>
                            </StyledShipmentMapVisual>

                            <StyledShipmentAddressStack>
                                <StyledShipmentAddressCard>
                                    <MaterialIcons name="trip-origin" size={16} color="#22c55e" />
                                    <StyledShipmentAddressStack>
                                        <StyledShipmentAddressLabel>Pickup</StyledShipmentAddressLabel>
                                        <StyledShipmentAddressValue>{pickupAddress}</StyledShipmentAddressValue>
                                    </StyledShipmentAddressStack>
                                </StyledShipmentAddressCard>
                                <StyledShipmentAddressCard>
                                    <MaterialIcons name="place" size={16} color="#fb7185" />
                                    <StyledShipmentAddressStack>
                                        <StyledShipmentAddressLabel>Dropoff</StyledShipmentAddressLabel>
                                        <StyledShipmentAddressValue>{dropoffAddress}</StyledShipmentAddressValue>
                                    </StyledShipmentAddressStack>
                                </StyledShipmentAddressCard>
                            </StyledShipmentAddressStack>
                        </StyledShipmentMapCard>

                        <StyledShipmentSummaryCard>
                            <StyledShipmentSummaryHead>
                                <StyledShipmentSummaryTextWrap>
                                    <StyledShipmentSummaryTitle numberOfLines={2}>
                                        {shipment.packageDescription ?? (context === "dispatch" ? "Dispatch assignment" : "Shipment request")}
                                    </StyledShipmentSummaryTitle>
                                    <StyledShipmentSummaryCode>{shipment.trackingCode}</StyledShipmentSummaryCode>
                                </StyledShipmentSummaryTextWrap>
                                {context === "dispatch" && dispatchOffer ? (
                                    <StyledOfferStatusPill status={dispatchOffer.status}>
                                        <StyledOfferStatusText status={dispatchOffer.status}>
                                            {dispatchOffer.status.toLowerCase()}
                                        </StyledOfferStatusText>
                                    </StyledOfferStatusPill>
                                ) : (
                                    <StyledFreightStatusPill status={shipment.status}>
                                        <StyledStatusText status={shipment.status}>
                                            {formatShipmentStatus(shipment.status)}
                                        </StyledStatusText>
                                    </StyledFreightStatusPill>
                                )}
                            </StyledShipmentSummaryHead>

                            <StyledShipmentSummaryDescription>
                                {context === "dispatch"
                                    ? "Review the route preview, shipment profile, and timing before responding to this dispatch assignment."
                                    : "Use the route preview and shipment summary to decide whether this load fits your vehicle, timing, and pricing expectations."}
                            </StyledShipmentSummaryDescription>

                            <StyledShipmentMetaChips>
                                <StyledShipmentMetaChip>
                                    <MaterialIcons name="inventory-2" size={14} color={theme.colors.mutedForeground} />
                                    <StyledShipmentMetaChipText>{formatEnumLabel(shipment.mode)}</StyledShipmentMetaChipText>
                                </StyledShipmentMetaChip>
                                <StyledShipmentMetaChip>
                                    <MaterialIcons name="local-shipping" size={14} color={theme.colors.mutedForeground} />
                                    <StyledShipmentMetaChipText>{formatEnumLabel(shipment.vehicleCategory)}</StyledShipmentMetaChipText>
                                </StyledShipmentMetaChip>
                                <StyledShipmentMetaChip>
                                    <MaterialIcons name="schedule" size={14} color={theme.colors.mutedForeground} />
                                    <StyledShipmentMetaChipText>{formatEnumLabel(shipment.scheduleType)}</StyledShipmentMetaChipText>
                                </StyledShipmentMetaChip>
                            </StyledShipmentMetaChips>

                            <StyledShipmentMetricGrid>
                                <StyledShipmentMetricItem>
                                    <StyledShipmentMetricLabel>Price</StyledShipmentMetricLabel>
                                    <StyledShipmentMetricValue>{primaryMetric}</StyledShipmentMetricValue>
                                </StyledShipmentMetricItem>
                                <StyledShipmentMetricItem>
                                    <StyledShipmentMetricLabel>Distance</StyledShipmentMetricLabel>
                                    <StyledShipmentMetricValue>{resolvedDistanceKm.toFixed(1)} km</StyledShipmentMetricValue>
                                </StyledShipmentMetricItem>
                                <StyledShipmentMetricItem>
                                    <StyledShipmentMetricLabel>ETA</StyledShipmentMetricLabel>
                                    <StyledShipmentMetricValue>
                                        {dispatchOffer?.providerEtaMinutes
                                            ? `${dispatchOffer.providerEtaMinutes} min`
                                            : shipment.scheduledAt
                                                ? formatEnumLabel(shipment.scheduleType)
                                                : "Instant"}
                                    </StyledShipmentMetricValue>
                                </StyledShipmentMetricItem>
                                <StyledShipmentMetricItem>
                                    <StyledShipmentMetricLabel>Status</StyledShipmentMetricLabel>
                                    <StyledShipmentMetricValue>
                                        {context === "dispatch" && dispatchOffer
                                            ? formatEnumLabel(dispatchOffer.status)
                                            : formatShipmentStatus(shipment.status)}
                                    </StyledShipmentMetricValue>
                                </StyledShipmentMetricItem>
                            </StyledShipmentMetricGrid>
                        </StyledShipmentSummaryCard>

                        <StyledShipmentSectionCard>
                            <StyledShipmentSectionHeading>
                                {context === "dispatch"
                                    ? (dispatchOffer?.status === DispatchOfferStatus.Accepted
                                        ? (dispatchActionStage?.title ?? "Dispatch status")
                                        : "Dispatch response")
                                    : existingBid?.status === BidStatus.Accepted
                                        ? (freightActionStage?.title ?? "Freight status")
                                        : "Bid response"}
                            </StyledShipmentSectionHeading>
                            {context === "dispatch" ? (
                                <StyledShipmentSectionText>
                                    {dispatchOffer?.status === DispatchOfferStatus.Accepted
                                        ? (dispatchActionStage?.description ?? "This dispatch offer has already been accepted and is awaiting the next shipment update.")
                                        : "Accept this offer to confirm your availability for the route and unlock the operational dispatch flow directly from this page."}
                                </StyledShipmentSectionText>
                            ) : existingBid?.status === BidStatus.Accepted ? (
                                <>
                                    <StyledDetailActionsWrap>
                                        <StyledBidStatusPill status={existingBid.status}>
                                            <StyledBidStatusText status={existingBid.status}>
                                                {formatEnumLabel(existingBid.status)}
                                            </StyledBidStatusText>
                                        </StyledBidStatusPill>
                                    </StyledDetailActionsWrap>
                                    <StyledShipmentSectionText>
                                        {freightActionStage?.description ?? "This awarded freight shipment is now operational and can be progressed from this page."}
                                    </StyledShipmentSectionText>
                                    <StyledShipmentSectionText>
                                        Awarded amount {formatMinorCurrency(existingBid.amountMinor, existingBid.currency)}
                                        {existingBid.message ? ` . ${existingBid.message}` : ""}
                                    </StyledShipmentSectionText>
                                </>
                            ) : existingBid ? (
                                <>
                                    <StyledDetailActionsWrap>
                                        <StyledBidStatusPill status={existingBid.status}>
                                            <StyledBidStatusText status={existingBid.status}>
                                                {formatEnumLabel(existingBid.status)}
                                            </StyledBidStatusText>
                                        </StyledBidStatusPill>
                                    </StyledDetailActionsWrap>
                                    <StyledShipmentSectionText>
                                        Bid amount {formatMinorCurrency(existingBid.amountMinor, existingBid.currency)}
                                        {existingBid.message ? ` . ${existingBid.message}` : ""}
                                    </StyledShipmentSectionText>
                                </>
                            ) : (
                                <StyledShipmentSectionText>
                                    No bid submitted yet. Use the primary action below to place one.
                                </StyledShipmentSectionText>
                            )}
                        </StyledShipmentSectionCard>

                        <StyledShipmentSectionCard>
                            <StyledShipmentSectionHeading>Shipment contents</StyledShipmentSectionHeading>
                            {shipmentItems.length > 0 ? (
                                <StyledShipmentItemsList>
                                    {shipmentItems.map((item: ShipmentContentItem) => (
                                        <StyledShipmentItemCard key={item.id}>
                                            <StyledShipmentItemHead>
                                                <StyledShipmentItemName>{item.name}</StyledShipmentItemName>
                                                <StyledShipmentItemQuantity>x{item.quantity}</StyledShipmentItemQuantity>
                                            </StyledShipmentItemHead>
                                            <StyledShipmentItemMetaRow>
                                                <StyledShipmentItemMetaChip>
                                                    <StyledShipmentItemMetaText>
                                                        Quantity {item.quantity}
                                                    </StyledShipmentItemMetaText>
                                                </StyledShipmentItemMetaChip>
                                                {item.weightKg != null ? (
                                                    <StyledShipmentItemMetaChip>
                                                        <StyledShipmentItemMetaText>
                                                            Weight {item.weightKg} kg
                                                        </StyledShipmentItemMetaText>
                                                    </StyledShipmentItemMetaChip>
                                                ) : null}
                                            </StyledShipmentItemMetaRow>
                                        </StyledShipmentItemCard>
                                    ))}
                                </StyledShipmentItemsList>
                            ) : (
                                <StyledShipmentSectionText>
                                    {shipment.packageDescription
                                        ? shipment.packageDescription
                                        : "No shipment items have been attached to this load yet."}
                                </StyledShipmentSectionText>
                            )}
                        </StyledShipmentSectionCard>

                        <StyledShipmentSectionCard>
                            <StyledShipmentSectionHeading>
                                {context === "dispatch" ? "Shipment activities" : "Shipment timeline"}
                            </StyledShipmentSectionHeading>
                            {activityRows.length > 0 ? (
                                <StyledShipmentTimelineList>
                                    {activityRows.map((activity) => (
                                        <StyledShipmentTimelineItem key={activity.id}>
                                            <StyledShipmentTimelineIconWrap $tone={activity.tone}>
                                                <MaterialIcons
                                                    name={activity.iconName}
                                                    size={14}
                                                    color={activity.tone === "muted" ? theme.colors.mutedForeground : theme.colors.primaryForeground}
                                                />
                                            </StyledShipmentTimelineIconWrap>
                                            <StyledShipmentTimelineContent>
                                                <StyledShipmentTimelineTitle>
                                                    {activity.title}
                                                </StyledShipmentTimelineTitle>
                                                <StyledShipmentTimelineMeta>
                                                    {activity.meta}
                                                </StyledShipmentTimelineMeta>
                                            </StyledShipmentTimelineContent>
                                        </StyledShipmentTimelineItem>
                                    ))}
                                </StyledShipmentTimelineList>
                            ) : (
                                <StyledShipmentSectionText>
                                    No shipment activity has been recorded yet.
                                </StyledShipmentSectionText>
                            )}
                        </StyledShipmentSectionCard>

                        {shipment.specialInstructions ? (
                            <StyledShipmentSectionCard>
                                <StyledShipmentSectionHeading>Special instructions</StyledShipmentSectionHeading>
                                <StyledShipmentSectionText>{shipment.specialInstructions}</StyledShipmentSectionText>
                            </StyledShipmentSectionCard>
                        ) : null}
                    </>
                )}
            </StyledShipmentDetailsRoot>
        </ScreenShell>
    );
}
