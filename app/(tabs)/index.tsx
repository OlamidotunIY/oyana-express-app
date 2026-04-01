import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Input, Spinner } from "@/components/ui";
import {
  CreateShipmentMutation,
  CreateShipmentMutationVariables,
  CreateUserAddressMutation,
  CreateUserAddressMutationVariables,
  GetProviderDashboardQuaryQuery,
  MyUserAddressesQuery,
  MyDriverProfileQuery,
  MyDriverProfileQueryVariables,
  SearchAddressesQuery,
  SearchAddressesQueryVariables,
  ShipmentMode,
  ShipmentScheduleType,
  ShipmentStatus,
  VehicleCategory,
} from "@/gql/graphql";
import {
  CREATE_SHIPMENT_MUTATION,
  CREATE_USER_ADDRESS_MUTATION,
  GET_PROVIDER_DASHBOARD_QUARY,
  MY_DRIVER_PROFILE_QUERY,
  MY_USER_ADDRESSES_QUERY,
  SEARCH_ADDRESSES_QUERY,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { useDriverPresence } from "@/hooks/use-driver-presence";
import { canAccessFreight, isDriverMode } from "@/lib/session";
import { showBackendErrorToast, showToast } from "@/lib/toast";
import { useUserStore } from "@/store/userStore";
import
{
  StyledAccountRow,
  StyledAccountRowIcon,
  StyledAccountRowLabel,
  StyledAccountRowLeft,
  StyledAccountRowValue,
  StyledAlertItem,
  StyledAlertItemDescription,
  StyledAlertItemHeader,
  StyledAlertItemIconWrap,
  StyledAlertItemTitle,
  StyledAlertsList,
  StyledDivider,
  StyledEmptyStateText,
  StyledHeroBalance,
  StyledHeroBalanceLabel,
  StyledHeroCard,
  StyledHeroStatBox,
  StyledHeroStatBoxDivider,
  StyledHeroStatBoxIconWrap,
  StyledHeroStatBoxLabel,
  StyledHeroStatBoxRow,
  StyledHeroStatBoxValue,
  StyledHomeRoot,
  StyledKycBadge,
  StyledKycBadgeText,
  StyledSectionChip,
  StyledSectionHeading,
  StyledSectionLabel,
  StyledStatCard,
  StyledStatCardIconWrap,
  StyledStatCardLabel,
  StyledStatCardValue,
  StyledStatGrid,
  StyledSuccessRow,
  StyledSuccessRowText,
  StyledSurfaceCard,
  StyledSurfaceRow,
  StyledSurfaceRowDescription,
  StyledSurfaceRowTextGroup,
  StyledSurfaceRowTitle,
} from "@/styles";
import
{
  formatMinorCurrency,
  formatShipmentStatus,
  getTimestamp,
  isDateToday,
  toMinorNumber,
} from "@/utils/format";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import styled, { useTheme } from "styled-components/native";

const LOW_WALLET_THRESHOLD_MINOR = 300_000;

const COMPLETED_SHIPMENT_STATUSES = new Set<ShipmentStatus>([
  ShipmentStatus.Completed,
  ShipmentStatus.Delivered,
]);

const DEFAULT_MAP_REGION = {
  latitude: 6.5244,
  longitude: 3.3792,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

function ShipperHomeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const user = useUserStore((state) => state.user);
  const [dropoffQuery, setDropoffQuery] = React.useState("");
  const [dropoffAddress, setDropoffAddress] =
    React.useState<MyUserAddressesQuery["myUserAddresses"][number] | null>(null);
  const [packageDescription, setPackageDescription] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [vehicleCategory, setVehicleCategory] = React.useState<VehicleCategory>(
    VehicleCategory.Bike,
  );

  const { data: addressData, loading: addressLoading, refetch: refetchAddresses } =
    useQuery<MyUserAddressesQuery>(MY_USER_ADDRESSES_QUERY, {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    });

  const [searchAddresses, { data: searchData, loading: searchingAddresses }] =
    useLazyQuery<SearchAddressesQuery, SearchAddressesQueryVariables>(
      SEARCH_ADDRESSES_QUERY,
      {
        fetchPolicy: "no-cache",
      },
    );

  const [createUserAddress, { loading: creatingAddress }] = useMutation<
    CreateUserAddressMutation,
    CreateUserAddressMutationVariables
  >(CREATE_USER_ADDRESS_MUTATION);

  const [createShipment, { loading: creatingShipment }] = useMutation<
    CreateShipmentMutation,
    CreateShipmentMutationVariables
  >(CREATE_SHIPMENT_MUTATION);

  const activeAddress = React.useMemo(() => {
    const addresses = addressData?.myUserAddresses ?? [];
    return addresses.find((address) => address.isActive) ?? addresses[0] ?? null;
  }, [addressData?.myUserAddresses]);

  React.useEffect(() => {
    if (dropoffQuery.trim().length < 3) {
      return;
    }

    const timeout = setTimeout(() => {
      void searchAddresses({
        variables: {
          input: {
            query: dropoffQuery.trim(),
          },
        },
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [dropoffQuery, searchAddresses]);

  const pickupCoordinate = activeAddress?.lat != null && activeAddress?.lng != null
    ? {
        latitude: activeAddress.lat,
        longitude: activeAddress.lng,
      }
    : null;

  const dropoffCoordinate = dropoffAddress?.lat != null && dropoffAddress?.lng != null
    ? {
        latitude: dropoffAddress.lat,
        longitude: dropoffAddress.lng,
      }
    : null;

  const mapRegion = React.useMemo(() => {
    if (pickupCoordinate && dropoffCoordinate) {
      return {
        latitude: (pickupCoordinate.latitude + dropoffCoordinate.latitude) / 2,
        longitude: (pickupCoordinate.longitude + dropoffCoordinate.longitude) / 2,
        latitudeDelta: Math.max(
          Math.abs(pickupCoordinate.latitude - dropoffCoordinate.latitude) * 1.8,
          0.08,
        ),
        longitudeDelta: Math.max(
          Math.abs(pickupCoordinate.longitude - dropoffCoordinate.longitude) * 1.8,
          0.08,
        ),
      };
    }

    if (pickupCoordinate) {
      return {
        latitude: pickupCoordinate.latitude,
        longitude: pickupCoordinate.longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      };
    }

    return DEFAULT_MAP_REGION;
  }, [dropoffCoordinate, pickupCoordinate]);

  const routeCoordinates = React.useMemo(() => {
    if (!pickupCoordinate || !dropoffCoordinate) {
      return [];
    }

    return [pickupCoordinate, dropoffCoordinate];
  }, [dropoffCoordinate, pickupCoordinate]);

  const handleSelectDropoff = async (placeId: string) => {
    try {
      const { data } = await createUserAddress({
        variables: {
          input: {
            placeId,
            setAsActive: false,
          },
        },
      });

      const savedAddress = data?.createUserAddress ?? null;
      if (!savedAddress) {
        throw new Error("Dropoff address could not be saved.");
      }

      setDropoffAddress(savedAddress);
      setDropoffQuery(savedAddress.label ?? savedAddress.address);
      await refetchAddresses();
    } catch (error) {
      showBackendErrorToast(error, "Unable to set the dropoff address.", {
        title: "Address Error",
        dedupeKey: "shipper-home-dropoff-address",
      });
    }
  };

  const handleCreateDispatch = async () => {
    if (!user?.id) {
      showToast({
        title: "Dispatch",
        message: "Your account is not ready yet. Please sign in again.",
        tone: "error",
      });
      return;
    }

    if (!activeAddress?.id) {
      showToast({
        title: "Dispatch",
        message: "Choose or save your pickup location first.",
        tone: "error",
      });
      return;
    }

    if (!dropoffAddress?.id) {
      showToast({
        title: "Dispatch",
        message: "Select a dropoff location before sending the request.",
        tone: "error",
      });
      return;
    }

    if (!packageDescription.trim()) {
      showToast({
        title: "Dispatch",
        message: "Add a short package summary so drivers know what to expect.",
        tone: "error",
      });
      return;
    }

    try {
      await createShipment({
        variables: {
          input: {
            customerProfileId: user.id,
            mode: ShipmentMode.Dispatch,
            pickupAddressId: activeAddress.id,
            dropoffAddressId: dropoffAddress.id,
            vehicleCategory,
            scheduleType: ShipmentScheduleType.Instant,
            packageDescription: packageDescription.trim(),
            specialInstructions: notes.trim() || undefined,
            pricingCurrency: user.walletCurrency ?? "NGN",
          },
        },
      });

      showToast({
        title: "Dispatch sent",
        message: "Your quick dispatch request has been broadcasted to nearby eligible drivers.",
        tone: "success",
      });

      setPackageDescription("");
      setNotes("");
      router.push("/(tabs)/shipments" as never);
    } catch (error) {
      showBackendErrorToast(error, "Unable to create the dispatch request.", {
        title: "Dispatch Error",
        dedupeKey: "shipper-home-quick-dispatch",
      });
    }
  };

  const suggestions = searchData?.searchAddresses ?? [];

  return (
    <ScreenShell contentJustify="flex-start">
      <StyledShipperRoot>
        <StyledMapCard>
          <StyledMapHeader>
            <StyledMapEyebrow>Shipper home</StyledMapEyebrow>
            <StyledMapTitle>Quick dispatch</StyledMapTitle>
            <StyledMapBody>
              Pin your pickup point, choose a dropoff, and broadcast a nearby dispatch request in a few taps.
            </StyledMapBody>
          </StyledMapHeader>

          <StyledMapFrame>
            <MapView
              style={{ flex: 1 }}
              region={mapRegion}
              initialRegion={mapRegion}
              scrollEnabled={false}
              rotateEnabled={false}
              pitchEnabled={false}
              toolbarEnabled={false}
            >
              {routeCoordinates.length === 2 ? (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor="#f97316"
                  strokeWidth={4}
                />
              ) : null}
              {pickupCoordinate ? (
                <Marker coordinate={pickupCoordinate} title="Pickup" pinColor="#f97316" />
              ) : null}
              {dropoffCoordinate ? (
                <Marker coordinate={dropoffCoordinate} title="Dropoff" pinColor="#2563eb" />
              ) : null}
            </MapView>
          </StyledMapFrame>
        </StyledMapCard>

        <StyledQuickDispatchCard>
          <StyledFormTitle>Quick dispatch request</StyledFormTitle>
          <StyledFormBody>
            Use your active pickup address and add the destination below to alert nearby drivers.
          </StyledFormBody>

          <StyledFieldLabel>Pickup location</StyledFieldLabel>
          <StyledPickupCard>
            <StyledPickupTextGroup>
              <StyledPickupValue>
                {activeAddress?.label ?? activeAddress?.address ?? "No active pickup address yet"}
              </StyledPickupValue>
              <StyledPickupMeta>
                {activeAddress ? `${activeAddress.city}, ${String(activeAddress.state)}` : "Save an address to pin your shipper location on the map."}
              </StyledPickupMeta>
            </StyledPickupTextGroup>
            <Button variant="outline" onPress={() => router.push("/accounts/manage-addresses" as never)}>
              Manage
            </Button>
          </StyledPickupCard>

          <StyledFieldLabel>Dropoff location</StyledFieldLabel>
          <Input
            value={dropoffQuery}
            onChangeText={(value) => {
              setDropoffQuery(value);
              if (!value.trim()) {
                setDropoffAddress(null);
              }
            }}
            placeholder="Search for a destination"
          />

          {dropoffAddress ? (
            <StyledSelectedAddress>
              <MaterialIcons name="check-circle" size={16} color={theme.colors.success} />
              <StyledSelectedAddressText>
                {dropoffAddress.label ?? dropoffAddress.address}
              </StyledSelectedAddressText>
            </StyledSelectedAddress>
          ) : null}

          {dropoffQuery.trim().length >= 3 && !dropoffAddress ? (
            <StyledSuggestionsList>
              {searchingAddresses && suggestions.length === 0 ? (
                <StyledSuggestionText>Searching destinations...</StyledSuggestionText>
              ) : null}
              {suggestions.map((suggestion) => (
                <StyledSuggestionItem
                  key={suggestion.placeId}
                  onPress={() => void handleSelectDropoff(suggestion.placeId)}
                  disabled={creatingAddress}
                >
                  <MaterialIcons name="place" size={16} color={theme.colors.primary} />
                  <StyledSuggestionContent>
                    <StyledSuggestionTitle>
                      {suggestion.mainText ?? suggestion.description}
                    </StyledSuggestionTitle>
                    {suggestion.secondaryText ? (
                      <StyledSuggestionText>{suggestion.secondaryText}</StyledSuggestionText>
                    ) : null}
                  </StyledSuggestionContent>
                </StyledSuggestionItem>
              ))}
            </StyledSuggestionsList>
          ) : null}

          <StyledFieldLabel>Vehicle needed</StyledFieldLabel>
          <StyledVehicleRow>
            {[VehicleCategory.Bike, VehicleCategory.Van, VehicleCategory.Truck].map((option) => {
              const active = option === vehicleCategory;
              return (
                <StyledVehicleChip
                  key={option}
                  $active={active}
                  onPress={() => setVehicleCategory(option)}
                >
                  <StyledVehicleText $active={active}>
                    {option.replace(/_/g, " ")}
                  </StyledVehicleText>
                </StyledVehicleChip>
              );
            })}
          </StyledVehicleRow>

          <StyledFieldLabel>Package summary</StyledFieldLabel>
          <Input
            value={packageDescription}
            onChangeText={setPackageDescription}
            placeholder="Small parcel, office supplies, boxed electronics"
          />

          <StyledFieldLabel>Notes</StyledFieldLabel>
          <Input
            value={notes}
            onChangeText={setNotes}
            placeholder="Gate code, fragile items, pickup contact"
          />

          <Button
            fullWidth
            onPress={() => void handleCreateDispatch()}
            disabled={creatingShipment || addressLoading}
          >
            {creatingShipment ? "Broadcasting..." : "Broadcast dispatch request"}
          </Button>
        </StyledQuickDispatchCard>
      </StyledShipperRoot>
    </ScreenShell>
  );
}

export default function HomeScreen()
{
  const user = useUserStore((state) => state.user);

  if (!isDriverMode(user)) {
    return <ShipperHomeScreen />;
  }

  const router = useRouter();
  const theme = useTheme();
  const { data, error } = useQuery<GetProviderDashboardQuaryQuery>(
    GET_PROVIDER_DASHBOARD_QUARY,
    {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
  );
  const {
    data: driverProfileData,
    loading: driverProfileLoading,
    error: driverProfileError,
    refetch: refetchDriverProfile,
  } = useQuery<MyDriverProfileQuery, MyDriverProfileQueryVariables>(
    MY_DRIVER_PROFILE_QUERY,
    {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
  );
  const { isUpdatingPresence, setOnlineState } = useDriverPresence({
    successTitle: "Driver presence",
    errorDedupeKey: "home-driver-presence",
    onUpdated: async () => {
      await refetchDriverProfile();
    },
  });

  useBackendErrorToast(error, "Unable to load dashboard data.", {
    title: "Dashboard Error",
    dedupeKey: "home-dashboard-query",
  });
  useBackendErrorToast(driverProfileError, "Unable to load driver presence.", {
    title: "Dashboard Error",
    dedupeKey: "home-driver-profile-query",
  });

  const dashboard = data?.getProviderDashboardQuary;
  const summary = dashboard?.myShipmentDashboard?.summary;
  const recentShipments = dashboard?.myShipmentDashboard?.recentShipments ?? [];
  const activeAssignments = dashboard?.activeAssignments ?? [];
  const completedShipments = dashboard?.completedShipments ?? [];
  const wallet = dashboard?.myWallet ?? null;
  const driverProfile = driverProfileData?.myDriverProfile ?? null;
  const isDriverOnline = driverProfile?.presence?.isOnline === true;
  const driverPresenceUpdatedAt = driverProfile?.presence?.lastHeartbeatAt
    ? new Date(String(driverProfile.presence.lastHeartbeatAt)).toLocaleString()
    : "Not updated";

  const activeAssignment = React.useMemo(() =>
  {
    if (!activeAssignments.length)
    {
      return null;
    }

    return [...activeAssignments].sort((left, right) =>
    {
      const rightDate = right.scheduledAt ?? right.createdAt;
      const leftDate = left.scheduledAt ?? left.createdAt;
      return getTimestamp(rightDate) - getTimestamp(leftDate);
    })[0];
  }, [activeAssignments]);

  const activeAssignmentRoute = React.useMemo(() =>
  {
    if (!activeAssignment)
    {
      return null;
    }

    const dashboardShipment = recentShipments.find(
      (shipment) => shipment.id === activeAssignment.id,
    );

    if (
      dashboardShipment?.pickupAddressSummary &&
      dashboardShipment.dropoffAddressSummary
    )
    {
      return `${dashboardShipment.pickupAddressSummary} -> ${dashboardShipment.dropoffAddressSummary}`;
    }

    return null;
  }, [activeAssignment, recentShipments]);

  const completedTodayShipments = React.useMemo(
    () =>
      completedShipments.filter((shipment) =>
      {
        if (!COMPLETED_SHIPMENT_STATUSES.has(shipment.status))
        {
          return false;
        }

        return isDateToday(shipment.updatedAt ?? shipment.createdAt);
      }),
    [completedShipments],
  );

  const completedTripsToday = completedTodayShipments.length;

  const todayEarningsMinor = React.useMemo(
    () =>
      completedTodayShipments.reduce((sum, shipment) =>
      {
        const shipmentAmount = shipment.finalPriceMinor ?? shipment.quotedPriceMinor;
        return sum + toMinorNumber(shipmentAmount);
      }, 0),
    [completedTodayShipments],
  );

  const earningsCurrency =
    completedTodayShipments[0]?.pricingCurrency ??
    wallet?.currency ??
    summary?.pendingPaymentCurrency ??
    "NGN";

  const pendingPayoutMinor = toMinorNumber(summary?.pendingPaymentAmountMinor);
  const pendingPayoutCurrency = summary?.pendingPaymentCurrency ?? earningsCurrency;

  const hasKycPending = React.useMemo(() =>
  {
    const overallStatus = String(dashboard?.kycStatus?.overallStatus ?? "").toLowerCase();
    return overallStatus !== "verified";
  }, [dashboard?.kycStatus?.overallStatus]);

  const walletBalanceMinor = toMinorNumber(wallet?.balanceMinor);
  const hasLowWalletThreshold =
    Boolean(wallet) && walletBalanceMinor < LOW_WALLET_THRESHOLD_MINOR;
  const hasAlerts = hasKycPending || hasLowWalletThreshold;
  const alertCount = Number(hasKycPending) + Number(hasLowWalletThreshold);
  const activeAssignmentsCount = summary?.activeShipments ?? activeAssignments.length;
  const showFreightLink = canAccessFreight(user);
  const readinessScore = Math.min(
    100,
    32 + activeAssignmentsCount * 18,
  );

  return (
    <ScreenShell
      contentProps={{ style: { justifyContent: "flex-start" } }}
      stickyTop={
        <StyledHeroCard>
          <StyledHeroBalanceLabel>Wallet balance</StyledHeroBalanceLabel>
          <StyledHeroBalance>
            {formatMinorCurrency(walletBalanceMinor, wallet?.currency ?? "NGN")}
          </StyledHeroBalance>

          <StyledHeroStatBoxRow>
            <StyledHeroStatBox>
              <StyledHeroStatBoxIconWrap>
                <MaterialIcons
                  name="work"
                  size={12}
                  color={theme.colors.heroChipForeground}
                />
              </StyledHeroStatBoxIconWrap>
              <StyledHeroStatBoxValue>{activeAssignmentsCount}</StyledHeroStatBoxValue>
              <StyledHeroStatBoxLabel>Active jobs</StyledHeroStatBoxLabel>
            </StyledHeroStatBox>
            <StyledHeroStatBoxDivider />
            <StyledHeroStatBox>
              <StyledHeroStatBoxIconWrap>
                <MaterialIcons
                  name="payments"
                  size={12}
                  color={theme.colors.heroChipForeground}
                />
              </StyledHeroStatBoxIconWrap>
              <StyledHeroStatBoxValue>
                {formatMinorCurrency(todayEarningsMinor, earningsCurrency)}
              </StyledHeroStatBoxValue>
              <StyledHeroStatBoxLabel>Earned today</StyledHeroStatBoxLabel>
            </StyledHeroStatBox>
          </StyledHeroStatBoxRow>
        </StyledHeroCard>
      }
    >
      <StyledHomeRoot>
        <StyledSurfaceCard>
          <StyledSectionHeading>
            <StyledSectionLabel>Driver presence</StyledSectionLabel>
            <StyledSectionChip>{isDriverOnline ? "Online" : "Offline"}</StyledSectionChip>
          </StyledSectionHeading>

          <StyledSurfaceRowTextGroup>
            <StyledSurfaceRowTitle>
              {isDriverOnline ? "Broadcasting live location" : "Not receiving dispatch requests"}
            </StyledSurfaceRowTitle>
            <StyledSurfaceRowDescription>
              Last heartbeat: {driverPresenceUpdatedAt}
            </StyledSurfaceRowDescription>
          </StyledSurfaceRowTextGroup>

          {(driverProfileLoading || isUpdatingPresence) ? (
            <StyledDriverPresenceLoadingRow>
              <Spinner size="small" />
            </StyledDriverPresenceLoadingRow>
          ) : null}

          <StyledHomeQuickLinks>
            <Button
              variant={isDriverOnline ? "secondary" : "default"}
              onPress={() => void setOnlineState(!isDriverOnline)}
              disabled={isUpdatingPresence}
            >
              {isUpdatingPresence
                ? "Updating..."
                : isDriverOnline
                  ? "Go offline"
                  : "Go online"}
            </Button>
            <Button variant="outline" onPress={() => router.push("/(tabs)/dispatch" as never)}>
              Dispatch
            </Button>
            {showFreightLink ? (
              <Button variant="outline" onPress={() => router.push("/(tabs)/freight" as never)}>
                Freight
              </Button>
            ) : null}
            <Button variant="outline" onPress={() => router.push("/(tabs)/wallet" as never)}>
              Wallet
            </Button>
            <Button variant="outline" onPress={() => router.push("/(tabs)/accounts" as never)}>
              Account
            </Button>
          </StyledHomeQuickLinks>
        </StyledSurfaceCard>

        {/* ── SHIPMENTS OVERVIEW ────────────────────────────── */}
        <StyledSurfaceCard>
          <StyledSectionLabel>Shipments</StyledSectionLabel>

          <StyledStatGrid>
            <StyledStatCard>
              <StyledStatCardIconWrap>
                <MaterialIcons name="local-shipping" color={theme.colors.primary} size={16} />
              </StyledStatCardIconWrap>
              <StyledStatCardValue>{completedTripsToday}</StyledStatCardValue>
              <StyledStatCardLabel>Completed today</StyledStatCardLabel>
            </StyledStatCard>

            <StyledStatCard>
              <StyledStatCardIconWrap>
                <MaterialIcons name="calendar-month" color={theme.colors.primary} size={16} />
              </StyledStatCardIconWrap>
              <StyledStatCardValue>{summary?.completedThisMonth ?? 0}</StyledStatCardValue>
              <StyledStatCardLabel>This month</StyledStatCardLabel>
            </StyledStatCard>

            <StyledStatCard>
              <StyledStatCardIconWrap>
                <MaterialIcons name="pending-actions" color={theme.colors.primary} size={16} />
              </StyledStatCardIconWrap>
              <StyledStatCardValue>
                {formatMinorCurrency(pendingPayoutMinor, pendingPayoutCurrency)}
              </StyledStatCardValue>
              <StyledStatCardLabel>Pending payout</StyledStatCardLabel>
            </StyledStatCard>

            <StyledStatCard>
              <StyledStatCardIconWrap>
                <MaterialIcons name="trending-up" color={theme.colors.primary} size={16} />
              </StyledStatCardIconWrap>
              <StyledStatCardValue>{readinessScore}%</StyledStatCardValue>
              <StyledStatCardLabel>Readiness score</StyledStatCardLabel>
            </StyledStatCard>
          </StyledStatGrid>
        </StyledSurfaceCard>

        {/* ── CURRENT ASSIGNMENT ────────────────────────────── */}
        <StyledSurfaceCard>
          <StyledSectionHeading>
            <StyledSectionLabel>Current assignment</StyledSectionLabel>
            <StyledSectionChip>
              {activeAssignment ? formatShipmentStatus(activeAssignment.status) : "Idle"}
            </StyledSectionChip>
          </StyledSectionHeading>

          {activeAssignment ? (
            <StyledSurfaceRow onPress={() => router.push("/")}>
              <StyledSurfaceRowTextGroup>
                <StyledSurfaceRowTitle>{activeAssignment.trackingCode}</StyledSurfaceRowTitle>
                <StyledSurfaceRowDescription>
                  {activeAssignmentRoute ??
                    activeAssignment.packageDescription ??
                    `Status: ${formatShipmentStatus(activeAssignment.status)}`}
                </StyledSurfaceRowDescription>
              </StyledSurfaceRowTextGroup>
              <MaterialIcons
                name="arrow-forward-ios"
                color={theme.colors.mutedForeground}
                size={16}
              />
            </StyledSurfaceRow>
          ) : (
            <StyledEmptyStateText>No active assignment right now.</StyledEmptyStateText>
          )}
        </StyledSurfaceCard>

        {/* ── ACTION REQUIRED ───────────────────────────────── */}
        {hasAlerts ? (
          <StyledSurfaceCard>
            <StyledSectionHeading>
              <StyledSectionLabel>Action required</StyledSectionLabel>
              <StyledSectionChip>{alertCount} open</StyledSectionChip>
            </StyledSectionHeading>

            <StyledAlertsList>
              {hasKycPending ? (
                <StyledAlertItem onPress={() => router.push("/(tabs)/accounts")}>
                  <StyledAlertItemHeader>
                    <StyledAlertItemIconWrap>
                      <MaterialIcons name="verified-user" color={theme.colors.primary} size={16} />
                    </StyledAlertItemIconWrap>
                    <StyledAlertItemTitle>KYC verification pending</StyledAlertItemTitle>
                  </StyledAlertItemHeader>
                  <StyledAlertItemDescription>
                    Complete identity verification to keep payouts and assignments active.
                  </StyledAlertItemDescription>
                </StyledAlertItem>
              ) : null}

              {hasLowWalletThreshold ? (
                <StyledAlertItem onPress={() => router.push("/(tabs)/wallet")}>
                  <StyledAlertItemHeader>
                    <StyledAlertItemIconWrap>
                      <MaterialIcons name="account-balance-wallet" color={theme.colors.primary} size={16} />
                    </StyledAlertItemIconWrap>
                    <StyledAlertItemTitle>Wallet below minimum threshold</StyledAlertItemTitle>
                  </StyledAlertItemHeader>
                  <StyledAlertItemDescription>
                    Balance {formatMinorCurrency(walletBalanceMinor, wallet?.currency ?? "NGN")} is
                    below the {formatMinorCurrency(LOW_WALLET_THRESHOLD_MINOR, wallet?.currency ?? "NGN")} minimum.
                    Top up to keep receiving dispatch offers.
                  </StyledAlertItemDescription>
                </StyledAlertItem>
              ) : null}
            </StyledAlertsList>
          </StyledSurfaceCard>
        ) : (
          <StyledSurfaceCard>
            <StyledSuccessRow>
              <MaterialIcons name="check-circle" color={theme.colors.success} size={18} />
              <StyledSuccessRowText>All systems healthy — no urgent alerts.</StyledSuccessRowText>
            </StyledSuccessRow>
          </StyledSurfaceCard>
        )}

        {/* ── ACCOUNT STATUS ────────────────────────────────── */}
        <StyledSurfaceCard>
          <StyledSectionLabel>Account status</StyledSectionLabel>

          <StyledAccountRow>
            <StyledAccountRowLeft>
              <StyledAccountRowIcon>
                <MaterialIcons name="verified-user" color={theme.colors.mutedForeground} size={16} />
              </StyledAccountRowIcon>
              <StyledAccountRowLabel>KYC status</StyledAccountRowLabel>
            </StyledAccountRowLeft>
            <StyledKycBadge verified={!hasKycPending}>
              <MaterialIcons
                name={hasKycPending ? "hourglass-empty" : "check-circle"}
                color={hasKycPending ? theme.colors.warning : theme.colors.success}
                size={11}
              />
              <StyledKycBadgeText verified={!hasKycPending}>
                {hasKycPending ? "Pending" : "Verified"}
              </StyledKycBadgeText>
            </StyledKycBadge>
          </StyledAccountRow>

          <StyledDivider />

          <StyledAccountRow>
            <StyledAccountRowLeft>
              <StyledAccountRowIcon>
                <MaterialIcons name="account-balance-wallet" color={theme.colors.mutedForeground} size={16} />
              </StyledAccountRowIcon>
              <StyledAccountRowLabel>Wallet balance</StyledAccountRowLabel>
            </StyledAccountRowLeft>
            <StyledAccountRowValue>
              {formatMinorCurrency(walletBalanceMinor, wallet?.currency ?? "NGN")}
            </StyledAccountRowValue>
          </StyledAccountRow>

          <StyledDivider />

          <StyledAccountRow>
            <StyledAccountRowLeft>
              <StyledAccountRowIcon>
                <MaterialIcons name="checklist" color={theme.colors.mutedForeground} size={16} />
              </StyledAccountRowIcon>
              <StyledAccountRowLabel>Completed this month</StyledAccountRowLabel>
            </StyledAccountRowLeft>
            <StyledAccountRowValue>{summary?.completedThisMonth ?? 0} trips</StyledAccountRowValue>
          </StyledAccountRow>
        </StyledSurfaceCard>

      </StyledHomeRoot>
    </ScreenShell>
  );
}

const StyledShipperRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const StyledMapCard = styled.View`
  border-radius: ${({ theme }) => theme.radii.xl + 2}px;
  overflow: hidden;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
`;

const StyledMapHeader = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const StyledMapEyebrow = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

const StyledMapTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.lg}px;
  font-weight: 700;
`;

const StyledMapBody = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

const StyledMapFrame = styled.View`
  height: 320px;
  background-color: ${({ theme }) => theme.colors.muted};
`;

const StyledQuickDispatchCard = styled.View`
  margin-top: -36px;
  border-radius: ${({ theme }) => theme.radii.xl + 4}px;
  background-color: ${({ theme }) => theme.colors.card};
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg}px;
  gap: ${({ theme }) => theme.spacing.sm}px;
  shadow-color: #0f172a;
  shadow-offset: 0px 12px;
  shadow-opacity: 0.08;
  shadow-radius: 16px;
  elevation: 5;
`;

const StyledFormTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

const StyledFormBody = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

const StyledFieldLabel = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: ${({ theme }) => theme.spacing.xs}px;
`;

const StyledPickupCard = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-items: center;
  justify-content: space-between;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const StyledPickupTextGroup = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

const StyledPickupValue = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

const StyledPickupMeta = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  line-height: 18px;
`;

const StyledSelectedAddress = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}px;
  border-radius: ${({ theme }) => theme.radii.full}px;
  background-color: rgba(34, 197, 94, 0.12);
  padding-vertical: 6px;
  padding-horizontal: ${({ theme }) => theme.spacing.sm}px;
  align-self: flex-start;
`;

const StyledSelectedAddressText = styled.Text`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
`;

const StyledSuggestionsList = styled.View`
  border-radius: ${({ theme }) => theme.radii.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

const StyledSuggestionItem = styled.Pressable`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

const StyledSuggestionContent = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xxs}px;
`;

const StyledSuggestionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 700;
`;

const StyledSuggestionText = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.xs}px;
`;

const StyledVehicleRow = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
  flex-wrap: wrap;
`;

const StyledHomeQuickLinks = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StyledDriverPresenceLoadingRow = styled.View`
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  align-items: flex-start;
  justify-content: center;
`;

const StyledVehicleChip = styled.Pressable<{ $active: boolean }>`
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $active, theme }) => ($active ? "rgba(255, 106, 0, 0.12)" : theme.colors.background)};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const StyledVehicleText = styled.Text<{ $active: boolean }>`
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.mutedForeground)};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: capitalize;
`;

