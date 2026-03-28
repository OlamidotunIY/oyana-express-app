import { TabHeader } from "@/components/NavigationHeader";
import { Button, Input, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import
{
    CreateUserAddressMutation,
    CreateUserAddressMutationVariables,
    GetProviderMarketplaceTabQuaryQuery,
    GetProviderMarketplaceTabQuaryQueryVariables,
    MyUserAddressesQuery,
    SearchAddressesQuery,
    SearchAddressesQueryVariables,
    ShipmentStatus,
} from "@/gql/graphql";
import
{
    CREATE_USER_ADDRESS_MUTATION,
    GET_PROVIDER_MARKETPLACE_TAB_QUARY,
    MY_USER_ADDRESSES_QUERY,
    SEARCH_ADDRESSES_QUERY,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { DEV_FREIGHT_DATA } from "@/lib/dev-fixtures";
import
{
    StyledDateFieldButton,
    StyledDateFieldText,
    StyledFilterGrid,
    StyledFilterMeta,
    StyledFilterErrorText,
    StyledFilterItem,
    StyledFilterLabel,
    StyledFilterModalBackdrop,
    StyledFilterModalCard,
    StyledFilterModalRoot,
    StyledFilterRow,
    StyledFilterSectionCard,
    StyledFilterSectionText,
    StyledFilterSectionTitle,
    StyledFilterSummaryChip,
    StyledFreightAddressBar,
    StyledFreightAddressItem,
    StyledFreightAddressItemIconWrap,
    StyledFreightAddressItemMain,
    StyledFreightAddressItemSub,
    StyledFreightAddressItemTextGroup,
    StyledFreightAddressLine,
    StyledFreightAddressList,
    StyledFreightAddressRow,
    StyledFreightFloatingButton,
    StyledFreightAddressText,
    StyledFreightAddressText2,
    StyledFreightEmptyStateText,
    StyledFreightEmptyStateWrap,
    StyledFreightGrid,
    StyledFreightHeaderCard,
    StyledFreightHeroDescription,
    StyledFreightHeroTitle,
    StyledFreightRoot,
    StyledFreightRouteIconWrap,
    StyledFreightRouteConnector,
    StyledFreightRouteLabel,
    StyledFreightRouteStack,
    StyledFreightScreen,
    StyledFreightSearchWrap,
    StyledFreightSearchNativeInput,
    StyledFreightSectionHeading,
    StyledFreightSectionLabel,
    StyledFreightShipmentCode,
    StyledFreightShipmentCard,
    StyledFreightShipmentCardTop,
    StyledFreightShipmentDescription,
    StyledFreightShipmentFooter,
    StyledFreightShipmentFooterText,
    StyledFreightShipmentIconBadge,
    StyledFreightShipmentOpenText,
    StyledFreightShipmentSubline,
    StyledFreightShipmentTopMain,
    StyledFreightStatusPill,
    StyledFreightFloatingButtonText,
    StyledInlineItem,
    StyledInlineRow,
    StyledLoadMetaLabel,
    StyledLoadMetaRow,
    StyledLoadMetaTile,
    StyledLoadMetaValue,
    StyledPanelHint,
    StyledPanelTitle,
    StyledStatusText
} from "@/styles/tabs";
import { formatMinorCurrency, formatShipmentStatus } from "@/utils/format";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import React from "react";
import { Modal, Platform, Pressable, ScrollView } from "react-native";
import { useTheme } from "styled-components/native";

type SavedAddress = MyUserAddressesQuery["myUserAddresses"][number];
type FreightFilterState = typeof EMPTY_FILTERS;
type MarketplaceShipment = GetProviderMarketplaceTabQuaryQuery["marketplaceShipments"]["items"][number];

type ParsedDateInput = {
    hasValue: boolean;
    isValid: boolean;
    iso?: string;
    timestamp?: number;
};

type FreightFilterValidation = {
    scheduledFrom?: string;
    scheduledTo?: string;
    distanceKmMax?: string;
    dateRange?: string;
    hasErrors: boolean;
    parsedFrom: ParsedDateInput;
    parsedTo: ParsedDateInput;
};

type DateFilterField = "scheduledFrom" | "scheduledTo" | null;

const EMPTY_FILTERS = {
    routeQuery: "",
    cargoQuery: "",
    scheduledFrom: "",
    scheduledTo: "",
    distanceKmMax: "",
};

function formatDateTime(dateValue?: string | null): string
{
    if (!dateValue) return "-";
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return "-";
    return parsed.toLocaleString();
}

function formatDateOnly(dateValue?: string | null): string
{
    if (!dateValue) return "Select date";
    const parsed = new Date(`${dateValue}T00:00:00.000`);
    if (Number.isNaN(parsed.getTime())) return "Select date";
    return parsed.toLocaleDateString();
}

function toDateInputValue(date: Date): string
{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getPickerDate(value: string, fallbackBoundary: "start" | "end"): Date
{
    const parsed = parseDateInput(value, fallbackBoundary);
    if (parsed.iso)
    {
        return new Date(parsed.iso);
    }

    return new Date();
}

function parseDateInput(value: string, boundary: "start" | "end"): ParsedDateInput
{
    const trimmed = value.trim();
    if (!trimmed)
    {
        return {
            hasValue: false,
            isValid: true,
        };
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed))
    {
        return {
            hasValue: true,
            isValid: false,
        };
    }

    const timeSuffix = boundary === "start" ? "T00:00:00.000" : "T23:59:59.999";
    const parsed = new Date(`${trimmed}${timeSuffix}`);

    if (Number.isNaN(parsed.getTime()))
    {
        return {
            hasValue: true,
            isValid: false,
        };
    }

    return {
        hasValue: true,
        isValid: true,
        iso: parsed.toISOString(),
        timestamp: parsed.getTime(),
    };
}

function buildMarketplaceFilterVariables(filters: FreightFilterState):
    GetProviderMarketplaceTabQuaryQueryVariables["filter"]
{
    const parsedFrom = parseDateInput(filters.scheduledFrom, "start");
    const parsedTo = parseDateInput(filters.scheduledTo, "end");
    const distanceValue = Number(filters.distanceKmMax.trim());

    const nextFilter: NonNullable<GetProviderMarketplaceTabQuaryQueryVariables["filter"]> = {};

    if (filters.routeQuery.trim())
    {
        nextFilter.routeQuery = filters.routeQuery.trim();
    }

    if (filters.cargoQuery.trim())
    {
        nextFilter.cargoQuery = filters.cargoQuery.trim();
    }

    if (parsedFrom.iso)
    {
        nextFilter.scheduledFrom = parsedFrom.iso;
    }

    if (parsedTo.iso)
    {
        nextFilter.scheduledTo = parsedTo.iso;
    }

    if (Number.isFinite(distanceValue) && distanceValue > 0)
    {
        nextFilter.distanceKmMax = Math.floor(distanceValue);
    }

    return Object.keys(nextFilter).length > 0 ? nextFilter : undefined;
}

function getFreightFilterValidation(filters: FreightFilterState): FreightFilterValidation
{
    const parsedFrom = parseDateInput(filters.scheduledFrom, "start");
    const parsedTo = parseDateInput(filters.scheduledTo, "end");
    const distanceText = filters.distanceKmMax.trim();
    const distanceValue = Number(distanceText);

    const validation: FreightFilterValidation = {
        hasErrors: false,
        parsedFrom,
        parsedTo,
    };

    if (parsedFrom.hasValue && !parsedFrom.isValid)
    {
        validation.scheduledFrom = "Use YYYY-MM-DD for the start date.";
    }

    if (parsedTo.hasValue && !parsedTo.isValid)
    {
        validation.scheduledTo = "Use YYYY-MM-DD for the end date.";
    }

    if (distanceText && (!Number.isFinite(distanceValue) || distanceValue <= 0))
    {
        validation.distanceKmMax = "Distance must be a number greater than 0.";
    }

    if (
        parsedFrom.isValid &&
        parsedTo.isValid &&
        parsedFrom.timestamp &&
        parsedTo.timestamp &&
        parsedFrom.timestamp > parsedTo.timestamp
    )
    {
        validation.dateRange = "The start date must be before the end date.";
    }

    validation.hasErrors = Boolean(
        validation.scheduledFrom ||
        validation.scheduledTo ||
        validation.distanceKmMax ||
        validation.dateRange,
    );

    return validation;
}

function shipmentMatchesSearch(shipment: MarketplaceShipment, query: string): boolean
{
    if (!query) return true;

    const haystack = [
        shipment.trackingCode,
        shipment.packageDescription,
        shipment.pickupAddressSummary,
        shipment.dropoffAddressSummary,
        formatShipmentStatus(shipment.status as ShipmentStatus),
    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

    return haystack.includes(query);
}

function shipmentMatchesAppliedFilters(
    shipment: MarketplaceShipment,
    filters: FreightFilterState,
    validation: FreightFilterValidation,
): boolean
{
    const routeQuery = filters.routeQuery.trim().toLowerCase();
    const cargoQuery = filters.cargoQuery.trim().toLowerCase();

    if (routeQuery)
    {
        const routeText = `${shipment.pickupAddressSummary ?? ""} ${shipment.dropoffAddressSummary ?? ""}`.toLowerCase();
        if (!routeText.includes(routeQuery))
        {
            return false;
        }
    }

    if (cargoQuery)
    {
        const cargoText = `${shipment.packageDescription ?? ""} ${shipment.trackingCode}`.toLowerCase();
        if (!cargoText.includes(cargoQuery))
        {
            return false;
        }
    }

    if (validation.parsedFrom.iso || validation.parsedTo.iso)
    {
        if (!shipment.scheduledAt)
        {
            return false;
        }

        const shipmentTime = new Date(shipment.scheduledAt).getTime();
        if (Number.isNaN(shipmentTime))
        {
            return false;
        }

        if (validation.parsedFrom.timestamp && shipmentTime < validation.parsedFrom.timestamp)
        {
            return false;
        }

        if (validation.parsedTo.timestamp && shipmentTime > validation.parsedTo.timestamp)
        {
            return false;
        }
    }

    return true;
}

export default function FreightScreen()
{
    const theme = useTheme();
    const router = useRouter();
    const tabBarHeight = useBottomTabBarHeight();

    // ── Address picker ────────────────────────────────────────
    const [activeAddress, setActiveAddress] = React.useState<SavedAddress | null>(null);
    const [addressPickerOpen, setAddressPickerOpen] = React.useState(false);
    const [addressSearchText, setAddressSearchText] = React.useState("");

    // ── Shipment search ───────────────────────────────────────
    const [shipmentSearch, setShipmentSearch] = React.useState("");

    // ── Filters ───────────────────────────────────────────────
    const [filters, setFilters] = React.useState(() => ({ ...EMPTY_FILTERS }));
    const [appliedFilters, setAppliedFilters] = React.useState(() => ({ ...EMPTY_FILTERS }));
    const [filtersOpen, setFiltersOpen] = React.useState(false);
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [activeDateField, setActiveDateField] = React.useState<DateFilterField>(null);

    // ── Filter variables ──────────────────────────────────────
    const filterVariables = React.useMemo<
        GetProviderMarketplaceTabQuaryQueryVariables["filter"]
    >(() => buildMarketplaceFilterVariables(appliedFilters), [appliedFilters]);
    const draftFilterValidation = React.useMemo(
        () => getFreightFilterValidation(filters),
        [filters],
    );
    const appliedFilterValidation = React.useMemo(
        () => getFreightFilterValidation(appliedFilters),
        [appliedFilters],
    );

    // ── Queries ───────────────────────────────────────────────
    const {
        data: boardData,
        loading: boardLoading,
        error: boardError,
        refetch: refetchBoard,
    } = useQuery<GetProviderMarketplaceTabQuaryQuery, GetProviderMarketplaceTabQuaryQueryVariables>(
        GET_PROVIDER_MARKETPLACE_TAB_QUARY,
        {
            variables: filterVariables ? { filter: filterVariables } : undefined,
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
            notifyOnNetworkStatusChange: true,
        },
    );

    const { data: savedAddressesData } = useQuery<MyUserAddressesQuery>(
        MY_USER_ADDRESSES_QUERY,
        { fetchPolicy: "cache-and-network" },
    );

    const [runAddressSearch, { data: addressSearchData, loading: addressSearchLoading }] =
        useLazyQuery<SearchAddressesQuery, SearchAddressesQueryVariables>(SEARCH_ADDRESSES_QUERY);

    // ── Mutations ─────────────────────────────────────────────
    const [createUserAddress, { loading: addressSaving }] = useMutation<
        CreateUserAddressMutation,
        CreateUserAddressMutationVariables
    >(CREATE_USER_ADDRESS_MUTATION);

    useBackendErrorToast(boardError, "Unable to load marketplace board.", {
        title: "Marketplace Error",
        dedupeKey: "freight-board-query",
    });

    // ── Derived ───────────────────────────────────────────────
    const rawShipments = boardData?.marketplaceShipments?.items;
    const allShipments = (__DEV__ && !rawShipments?.length)
        ? DEV_FREIGHT_DATA.marketplaceShipments.items
        : (rawShipments ?? []);
    const activeFiltersCount = Object.values(appliedFilters).filter((v) => v.trim()).length;
    const hasDraftFilters = Object.values(filters).some((value) => value.trim().length > 0);
    const searchQuery = shipmentSearch.toLowerCase().trim();
    const isBoardRefreshing = isRefreshing || (boardLoading && Boolean(boardData));

    const shipments = React.useMemo(() =>
    {
        return allShipments.filter((shipment) =>
            shipmentMatchesSearch(shipment, searchQuery) &&
            shipmentMatchesAppliedFilters(shipment, appliedFilters, appliedFilterValidation)
        );
    }, [allShipments, searchQuery, appliedFilters, appliedFilterValidation]);

    const savedAddresses = savedAddressesData?.myUserAddresses ?? [];
    const addressSuggestions = addressSearchData?.searchAddresses ?? [];
    const showSearchResults = addressSearchText.trim().length > 1;

    // ── Handlers ──────────────────────────────────────────────
    const handleAddressSearch = React.useCallback(
        (text: string) =>
        {
            setAddressSearchText(text);
            if (text.trim().length > 1)
            {
                void runAddressSearch({ variables: { input: { query: text.trim() } } });
            }
        },
        [runAddressSearch],
    );

    const handleSelectSavedAddress = React.useCallback((address: SavedAddress) =>
    {
        setActiveAddress(address);
        setAddressPickerOpen(false);
        setAddressSearchText("");
    }, []);

    const handleSelectSuggestion = React.useCallback(
        async (placeId: string) =>
        {
            try
            {
                const result = await createUserAddress({ variables: { input: { placeId } } });
                const saved = result.data?.createUserAddress;
                if (saved)
                {
                    setActiveAddress(saved as SavedAddress);
                }
            }
            catch { /* handled by Apollo */ }
            setAddressPickerOpen(false);
            setAddressSearchText("");
        },
        [createUserAddress],
    );

    const handleRefreshBoard = React.useCallback(async () =>
    {
        if (isRefreshing) return;

        setIsRefreshing(true);
        try
        {
            await refetchBoard(filterVariables ? { filter: filterVariables } : undefined);
        }
        finally
        {
            setIsRefreshing(false);
        }
    }, [filterVariables, isRefreshing, refetchBoard]);

    const applyFilters = () =>
    {
        if (draftFilterValidation.hasErrors)
        {
            return;
        }

        setActiveDateField(null);
        setAppliedFilters({ ...filters });
        setFiltersOpen(false);
    };

    const clearFilters = async () =>
    {
        const cleared = { ...EMPTY_FILTERS };
        setFilters(cleared);
        setAppliedFilters(cleared);
        setActiveDateField(null);
        setFiltersOpen(false);

        setIsRefreshing(true);
        try
        {
            await refetchBoard({ filter: undefined });
        }
        finally
        {
            setIsRefreshing(false);
        }
    };

    const handleOpenDatePicker = React.useCallback((field: Exclude<DateFilterField, null>) =>
    {
        setActiveDateField(field);
    }, []);

    const handleDateChange = React.useCallback(
        (event: DateTimePickerEvent, selectedDate?: Date) =>
        {
            if (Platform.OS === "android")
            {
                setActiveDateField(null);
            }

            if (event.type !== "set" || !selectedDate || !activeDateField)
            {
                return;
            }

            const nextValue = toDateInputValue(selectedDate);
            setFilters((current) => ({
                ...current,
                [activeDateField]: nextValue,
            }));
        },
        [activeDateField],
    );

    const handleClearDate = React.useCallback((field: Exclude<DateFilterField, null>) =>
    {
        setFilters((current) => ({
            ...current,
            [field]: "",
        }));

        if (activeDateField === field)
        {
            setActiveDateField(null);
        }
    }, [activeDateField]);

    const floatingButtonBottom = Math.max(12, tabBarHeight - 24);

    return (
        <StyledFreightScreen>
            <TabHeader
                title="Freight"
                titleContent={
                    <StyledFreightAddressBar onPress={() => setAddressPickerOpen(true)}>
                        <MaterialIcons name="location-on" size={16} color={theme.colors.heroForeground} />
                        <StyledFreightAddressText numberOfLines={1}>
                            {activeAddress?.address ?? "Select your location"}
                        </StyledFreightAddressText>
                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={18}
                            color={theme.colors.heroMutedForeground}
                        />
                    </StyledFreightAddressBar>
                }
                backgroundColor={theme.colors.heroSurface}
                menuItems={[
                    {
                        id: "filters",
                        label: "Open filters",
                        iconName: "tune" as const,
                        onPress: () => setFiltersOpen(true),
                    },
                    {
                        id: "refresh",
                        label: "Refresh",
                        iconName: "refresh" as const,
                        onPress: () => void handleRefreshBoard(),
                    },
                ]}
            />
            <ScreenShell
                contentJustify="flex-start"
                stickyTop={
                    <StyledFreightHeaderCard>
                        <StyledFreightSectionLabel>Open marketplace loads</StyledFreightSectionLabel>
                        <StyledFreightHeroTitle>Find the next shipment worth taking</StyledFreightHeroTitle>
                        <StyledFreightHeroDescription>
                            Compare route, timing, and payout before you place a bid.
                        </StyledFreightHeroDescription>
                        <Input
                            placeholder="Search by tracking code, route, or cargo"
                            value={shipmentSearch}
                            onChangeText={setShipmentSearch}
                        />
                        <StyledInlineRow>
                            <StyledFilterSummaryChip>
                                {shipments.length} {shipments.length === 1 ? "load" : "loads"}
                            </StyledFilterSummaryChip>
                            {activeFiltersCount > 0 ? (
                                <StyledFilterSummaryChip>
                                    {activeFiltersCount} {activeFiltersCount === 1 ? "filter" : "filters"} active
                                </StyledFilterSummaryChip>
                            ) : null}
                            {searchQuery ? (
                                <StyledFilterSummaryChip>
                                    Search: {shipmentSearch.trim()}
                                </StyledFilterSummaryChip>
                            ) : null}
                            {isBoardRefreshing ? (
                                <StyledFilterSummaryChip>Refreshing loads</StyledFilterSummaryChip>
                            ) : null}
                        </StyledInlineRow>
                    </StyledFreightHeaderCard>
                }
            >
                <StyledFreightRoot>
                    {boardLoading && !boardData ? <Spinner size="small" /> : null}

                    {isBoardRefreshing ? (
                        <StyledFilterMeta>
                            Updating marketplace loads with your latest filters.
                        </StyledFilterMeta>
                    ) : null}

                    {shipments.length === 0 && !boardLoading ? (
                        <StyledFreightEmptyStateWrap>
                            <MaterialIcons
                                name={activeFiltersCount > 0 || searchQuery ? "filter-list-off" : "local-shipping"}
                                size={48}
                                color={theme.colors.mutedForeground}
                            />
                            <StyledFreightEmptyStateText>
                                {activeFiltersCount > 0 || searchQuery
                                    ? "No shipments match your current search or filters."
                                    : "No marketplace shipments available right now."}
                            </StyledFreightEmptyStateText>
                        </StyledFreightEmptyStateWrap>
                    ) : (
                        <StyledFreightGrid>
                            {shipments.map((shipment) =>
                            {
                                const shipmentStatus = shipment.status as ShipmentStatus;
                                const priceMinor = shipment.finalPriceMinor ?? shipment.quotedPriceMinor ?? 0;
                                const currency = shipment.pricingCurrency ?? "NGN";

                                return (
                                    <Pressable
                                        key={shipment.id}
                                        onPress={() =>
                                            router.push(
                                                `/shipment-details?context=freight&shipmentId=${encodeURIComponent(shipment.id)}` as never
                                            )
                                        }
                                    >
                                        <StyledFreightShipmentCard>
                                            <StyledFreightShipmentCardTop>
                                                <StyledFreightShipmentIconBadge>
                                                    <MaterialIcons
                                                        name="local-shipping"
                                                        size={20}
                                                        color={theme.colors.primary}
                                                    />
                                                </StyledFreightShipmentIconBadge>
                                                <StyledFreightShipmentTopMain>
                                                    <StyledFreightShipmentCode numberOfLines={1}>
                                                        {shipment.trackingCode}
                                                    </StyledFreightShipmentCode>
                                                    <StyledFreightShipmentSubline>
                                                        Posted {formatDateTime(shipment.createdAt)}
                                                    </StyledFreightShipmentSubline>
                                                </StyledFreightShipmentTopMain>
                                                <StyledFreightStatusPill status={shipmentStatus}>
                                                    <StyledStatusText status={shipmentStatus}>
                                                        {formatShipmentStatus(shipmentStatus)}
                                                    </StyledStatusText>
                                                </StyledFreightStatusPill>
                                            </StyledFreightShipmentCardTop>

                                            <StyledFreightShipmentDescription numberOfLines={3}>
                                                {shipment.packageDescription ?? "Marketplace shipment"}
                                            </StyledFreightShipmentDescription>

                                            <StyledFreightRouteStack>
                                                <StyledFreightAddressLine>
                                                    <StyledFreightRouteIconWrap>
                                                        <MaterialIcons
                                                            name="radio-button-on"
                                                            size={12}
                                                            color={theme.colors.primary}
                                                        />
                                                    </StyledFreightRouteIconWrap>
                                                    <StyledFreightAddressRow>
                                                        <StyledFreightRouteLabel>Pickup</StyledFreightRouteLabel>
                                                        <StyledFreightAddressText2 numberOfLines={2}>
                                                            {shipment.pickupAddressSummary ?? "Pickup TBD"}
                                                        </StyledFreightAddressText2>
                                                    </StyledFreightAddressRow>
                                                </StyledFreightAddressLine>
                                                <StyledFreightRouteConnector />
                                                <StyledFreightAddressLine>
                                                    <StyledFreightRouteIconWrap>
                                                        <MaterialIcons
                                                            name="location-on"
                                                            size={12}
                                                            color={theme.colors.mutedForeground}
                                                        />
                                                    </StyledFreightRouteIconWrap>
                                                    <StyledFreightAddressRow>
                                                        <StyledFreightRouteLabel>Dropoff</StyledFreightRouteLabel>
                                                        <StyledFreightAddressText2 numberOfLines={2}>
                                                            {shipment.dropoffAddressSummary ?? "Dropoff TBD"}
                                                        </StyledFreightAddressText2>
                                                    </StyledFreightAddressRow>
                                                </StyledFreightAddressLine>
                                            </StyledFreightRouteStack>

                                            <StyledLoadMetaRow>
                                                <StyledLoadMetaTile>
                                                    <MaterialIcons
                                                        name="payments"
                                                        color={theme.colors.mutedForeground}
                                                        size={14}
                                                    />
                                                    <StyledFreightAddressRow>
                                                        <StyledLoadMetaLabel>Bid value</StyledLoadMetaLabel>
                                                        <StyledLoadMetaValue>
                                                            {formatMinorCurrency(priceMinor, currency)}
                                                        </StyledLoadMetaValue>
                                                    </StyledFreightAddressRow>
                                                </StyledLoadMetaTile>
                                                <StyledLoadMetaTile>
                                                    <MaterialIcons
                                                        name="schedule"
                                                        color={theme.colors.mutedForeground}
                                                        size={14}
                                                    />
                                                    <StyledFreightAddressRow>
                                                        <StyledLoadMetaLabel>Pickup time</StyledLoadMetaLabel>
                                                        <StyledLoadMetaValue>
                                                            {shipment.scheduledAt
                                                                ? formatDateTime(shipment.scheduledAt)
                                                                : "Flexible schedule"}
                                                        </StyledLoadMetaValue>
                                                    </StyledFreightAddressRow>
                                                </StyledLoadMetaTile>
                                            </StyledLoadMetaRow>

                                            <StyledFreightShipmentFooter>
                                                <StyledFreightShipmentFooterText>
                                                    Tap to inspect the full shipment and place a bid.
                                                </StyledFreightShipmentFooterText>
                                                <StyledFreightShipmentOpenText>
                                                    Open load
                                                </StyledFreightShipmentOpenText>
                                            </StyledFreightShipmentFooter>
                                        </StyledFreightShipmentCard>
                                    </Pressable>
                                );
                            })}
                        </StyledFreightGrid>
                    )}
                </StyledFreightRoot>

                {/* ── Address Picker Modal ─────────────────────────── */}
                <Modal
                    transparent
                    visible={addressPickerOpen}
                    animationType="fade"
                    onRequestClose={() => setAddressPickerOpen(false)}
                >
                    <StyledFilterModalRoot>
                        <StyledFilterModalBackdrop onPress={() => setAddressPickerOpen(false)} />
                        <StyledFilterModalCard>
                            <StyledFreightSectionHeading>
                                <StyledPanelTitle>Your location</StyledPanelTitle>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onPress={() => setAddressPickerOpen(false)}
                                    accessibilityLabel="Close address picker"
                                >
                                    <MaterialIcons
                                        name="close"
                                        color={theme.colors.mutedForeground}
                                        size={18}
                                    />
                                </Button>
                            </StyledFreightSectionHeading>

                            <StyledPanelHint>
                                Choose a saved address or search for a new one.
                            </StyledPanelHint>

                            <StyledFreightSearchWrap>
                                <MaterialIcons
                                    name="search"
                                    size={18}
                                    color={theme.colors.mutedForeground}
                                />
                                <StyledFreightSearchNativeInput
                                    placeholder="Search address..."
                                    placeholderTextColor={theme.colors.mutedForeground}
                                    value={addressSearchText}
                                    onChangeText={handleAddressSearch}
                                />
                                {addressSearchLoading ? <Spinner size="small" /> : null}
                            </StyledFreightSearchWrap>

                            {showSearchResults ? (
                                addressSuggestions.length > 0 ? (
                                    <StyledFreightAddressList>
                                        <StyledFreightSectionLabel>
                                            Search results
                                        </StyledFreightSectionLabel>
                                        {addressSuggestions.map((suggestion) => (
                                            <StyledFreightAddressItem
                                                key={suggestion.placeId}
                                                onPress={() =>
                                                    void handleSelectSuggestion(suggestion.placeId)
                                                }
                                                disabled={addressSaving}
                                            >
                                                <StyledFreightAddressItemIconWrap>
                                                    <MaterialIcons
                                                        name="place"
                                                        color={theme.colors.primary}
                                                        size={16}
                                                    />
                                                </StyledFreightAddressItemIconWrap>
                                                <StyledFreightAddressItemTextGroup>
                                                    <StyledFreightAddressItemMain>
                                                        {suggestion.mainText ?? suggestion.description}
                                                    </StyledFreightAddressItemMain>
                                                    {suggestion.secondaryText ? (
                                                        <StyledFreightAddressItemSub>
                                                            {suggestion.secondaryText}
                                                        </StyledFreightAddressItemSub>
                                                    ) : null}
                                                </StyledFreightAddressItemTextGroup>
                                                {addressSaving ? <Spinner size="small" /> : null}
                                            </StyledFreightAddressItem>
                                        ))}
                                    </StyledFreightAddressList>
                                ) : (
                                    <StyledFreightEmptyStateText>
                                        No results found.
                                    </StyledFreightEmptyStateText>
                                )
                            ) : savedAddresses.length > 0 ? (
                                <StyledFreightAddressList>
                                    <StyledFreightSectionLabel>Saved addresses</StyledFreightSectionLabel>
                                    {savedAddresses.map((addr) => (
                                        <StyledFreightAddressItem
                                            key={addr.id}
                                            $active={activeAddress?.id === addr.id}
                                            onPress={() => handleSelectSavedAddress(addr)}
                                        >
                                            <StyledFreightAddressItemIconWrap>
                                                <MaterialIcons
                                                    name={
                                                        activeAddress?.id === addr.id
                                                            ? "location-on"
                                                            : "location-city"
                                                    }
                                                    color={theme.colors.primary}
                                                    size={16}
                                                />
                                            </StyledFreightAddressItemIconWrap>
                                            <StyledFreightAddressItemTextGroup>
                                                <StyledFreightAddressItemMain>
                                                    {addr.label ?? addr.address}
                                                </StyledFreightAddressItemMain>
                                                <StyledFreightAddressItemSub>
                                                    {addr.city}, {String(addr.state)}
                                                </StyledFreightAddressItemSub>
                                            </StyledFreightAddressItemTextGroup>
                                            {activeAddress?.id === addr.id ? (
                                                <MaterialIcons
                                                    name="check-circle"
                                                    color={theme.colors.primary}
                                                    size={18}
                                                />
                                            ) : null}
                                        </StyledFreightAddressItem>
                                    ))}
                                </StyledFreightAddressList>
                            ) : (
                                <StyledFreightEmptyStateText>
                                    No saved addresses. Search to add one.
                                </StyledFreightEmptyStateText>
                            )}
                        </StyledFilterModalCard>
                    </StyledFilterModalRoot>
                </Modal>

                {/* ── Filters Modal ────────────────────────────────── */}
                <Modal
                    transparent
                    visible={filtersOpen}
                    animationType="fade"
                    onRequestClose={() => setFiltersOpen(false)}
                >
                    <StyledFilterModalRoot>
                        <StyledFilterModalBackdrop onPress={() => setFiltersOpen(false)} />
                        <StyledFilterModalCard>
                            <StyledFreightSectionHeading>
                                <StyledPanelTitle>Filters</StyledPanelTitle>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    onPress={() => setFiltersOpen(false)}
                                    accessibilityLabel="Close filters"
                                >
                                    <MaterialIcons
                                        name="close"
                                        color={theme.colors.mutedForeground}
                                        size={18}
                                    />
                                </Button>
                            </StyledFreightSectionHeading>
                            <StyledPanelHint>
                                Refine the load board by route, timing, cargo type, or delivery radius.
                            </StyledPanelHint>

                            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                                <StyledFilterRow>
                                    <StyledInlineRow>
                                        <StyledFilterSummaryChip>
                                            {activeFiltersCount} {activeFiltersCount === 1 ? "applied filter" : "applied filters"}
                                        </StyledFilterSummaryChip>
                                        {hasDraftFilters ? (
                                            <StyledFilterSummaryChip>Draft changes ready</StyledFilterSummaryChip>
                                        ) : null}
                                    </StyledInlineRow>

                                    <StyledFilterSectionCard>
                                        <StyledFilterSectionTitle>Route and cargo</StyledFilterSectionTitle>
                                        <StyledFilterSectionText>
                                            Match pickup city, dropoff city, or the cargo description.
                                        </StyledFilterSectionText>
                                        <StyledFilterRow>
                                            <StyledFilterGrid>
                                                <StyledFilterItem>
                                                    <StyledFilterLabel>Route</StyledFilterLabel>
                                                    <Input
                                                        placeholder="Pickup or dropoff city"
                                                        value={filters.routeQuery}
                                                        onChangeText={(value) =>
                                                            setFilters((cur) => ({ ...cur, routeQuery: value }))
                                                        }
                                                    />
                                                </StyledFilterItem>
                                                <StyledFilterItem>
                                                    <StyledFilterLabel>Cargo type</StyledFilterLabel>
                                                    <Input
                                                        placeholder="Furniture, appliances"
                                                        value={filters.cargoQuery}
                                                        onChangeText={(value) =>
                                                            setFilters((cur) => ({ ...cur, cargoQuery: value }))
                                                        }
                                                    />
                                                </StyledFilterItem>
                                            </StyledFilterGrid>
                                        </StyledFilterRow>
                                    </StyledFilterSectionCard>

                                    <StyledFilterSectionCard>
                                        <StyledFilterSectionTitle>Schedule window</StyledFilterSectionTitle>
                                        <StyledFilterSectionText>
                                            Pick the earliest and latest pickup dates from the calendar.
                                        </StyledFilterSectionText>
                                        <StyledFilterRow>
                                            <StyledFilterGrid>
                                                <StyledFilterItem>
                                                    <StyledFilterLabel>From date</StyledFilterLabel>
                                                    <StyledDateFieldButton onPress={() => handleOpenDatePicker("scheduledFrom")}>
                                                        <StyledDateFieldText $hasValue={Boolean(filters.scheduledFrom)}>
                                                            {formatDateOnly(filters.scheduledFrom)}
                                                        </StyledDateFieldText>
                                                        <MaterialIcons
                                                            name="calendar-today"
                                                            size={18}
                                                            color={theme.colors.mutedForeground}
                                                        />
                                                    </StyledDateFieldButton>
                                                    {filters.scheduledFrom ? (
                                                        <Button
                                                            variant="ghost"
                                                            onPress={() => handleClearDate("scheduledFrom")}
                                                        >
                                                            Clear start date
                                                        </Button>
                                                    ) : null}
                                                    {draftFilterValidation.scheduledFrom ? (
                                                        <StyledFilterErrorText>
                                                            {draftFilterValidation.scheduledFrom}
                                                        </StyledFilterErrorText>
                                                    ) : null}
                                                </StyledFilterItem>
                                                <StyledFilterItem>
                                                    <StyledFilterLabel>To date</StyledFilterLabel>
                                                    <StyledDateFieldButton onPress={() => handleOpenDatePicker("scheduledTo")}>
                                                        <StyledDateFieldText $hasValue={Boolean(filters.scheduledTo)}>
                                                            {formatDateOnly(filters.scheduledTo)}
                                                        </StyledDateFieldText>
                                                        <MaterialIcons
                                                            name="event"
                                                            size={18}
                                                            color={theme.colors.mutedForeground}
                                                        />
                                                    </StyledDateFieldButton>
                                                    {filters.scheduledTo ? (
                                                        <Button
                                                            variant="ghost"
                                                            onPress={() => handleClearDate("scheduledTo")}
                                                        >
                                                            Clear end date
                                                        </Button>
                                                    ) : null}
                                                    {draftFilterValidation.scheduledTo ? (
                                                        <StyledFilterErrorText>
                                                            {draftFilterValidation.scheduledTo}
                                                        </StyledFilterErrorText>
                                                    ) : null}
                                                </StyledFilterItem>
                                            </StyledFilterGrid>
                                        </StyledFilterRow>
                                        {draftFilterValidation.dateRange ? (
                                            <StyledFilterErrorText>
                                                {draftFilterValidation.dateRange}
                                            </StyledFilterErrorText>
                                        ) : null}
                                        {activeDateField ? (
                                            <DateTimePicker
                                                value={getPickerDate(
                                                    filters[activeDateField],
                                                    activeDateField === "scheduledFrom" ? "start" : "end",
                                                )}
                                                mode="date"
                                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                                onChange={handleDateChange}
                                            />
                                        ) : null}
                                    </StyledFilterSectionCard>

                                    <StyledFilterSectionCard>
                                        <StyledFilterSectionTitle>Distance</StyledFilterSectionTitle>
                                        <StyledFilterSectionText>
                                            Limit results to loads within a maximum route distance in kilometers.
                                        </StyledFilterSectionText>
                                        <StyledFilterRow>
                                            <StyledFilterGrid>
                                                <StyledFilterItem>
                                                    <StyledFilterLabel>Distance (km)</StyledFilterLabel>
                                                    <Input
                                                        placeholder="Max distance"
                                                        keyboardType="numeric"
                                                        value={filters.distanceKmMax}
                                                        onChangeText={(value) =>
                                                            setFilters((cur) => ({ ...cur, distanceKmMax: value }))
                                                        }
                                                    />
                                                    {draftFilterValidation.distanceKmMax ? (
                                                        <StyledFilterErrorText>
                                                            {draftFilterValidation.distanceKmMax}
                                                        </StyledFilterErrorText>
                                                    ) : null}
                                                </StyledFilterItem>
                                            </StyledFilterGrid>
                                        </StyledFilterRow>
                                    </StyledFilterSectionCard>
                                </StyledFilterRow>
                            </ScrollView>

                            <StyledInlineRow>
                                <StyledInlineItem>
                                    <Button
                                        variant="outline"
                                        fullWidth
                                        onPress={() => void clearFilters()}
                                        disabled={!hasDraftFilters && activeFiltersCount === 0}
                                    >
                                        Clear
                                    </Button>
                                </StyledInlineItem>
                                <StyledInlineItem>
                                    <Button
                                        fullWidth
                                        onPress={applyFilters}
                                        disabled={draftFilterValidation.hasErrors}
                                    >
                                        Apply filters
                                    </Button>
                                </StyledInlineItem>
                            </StyledInlineRow>
                        </StyledFilterModalCard>
                    </StyledFilterModalRoot>
                </Modal>
            </ScreenShell>

            <StyledFreightFloatingButton
                accessibilityLabel="Open my bids"
                onPress={() => router.push("/freight/my-bids" as never)}
                $bottom={floatingButtonBottom}
            >
                <MaterialIcons name="gavel" size={24} color="#F8FAFC" />
                <StyledFreightFloatingButtonText>My bids</StyledFreightFloatingButtonText>
            </StyledFreightFloatingButton>
        </StyledFreightScreen>
    );
}
