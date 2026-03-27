import { Button, Spinner } from "@/components/ui";
import
{
    DispatchOfferSentSubscription,
    DispatchOfferStatus,
    GetProviderDispatchTabQuaryQuery,
    RespondToDispatchOfferMutation,
    RespondToDispatchOfferMutationVariables,
} from "@/gql/graphql";
import
{
    DISPATCH_OFFER_SENT_SUBSCRIPTION,
    GET_PROVIDER_DISPATCH_TAB_QUARY,
    RESPOND_TO_DISPATCH_OFFER,
} from "@/graphql";
import { DEV_DISPATCH_DATA } from "@/lib/dev-fixtures";
import { playDispatchAlertAttention } from "@/lib/dispatch-alert";
import { useDispatchOverlayStore } from "@/store/dispatchOverlayStore";
import
{
    StyledIncomingDispatchActionItem,
    StyledIncomingDispatchActions,
    StyledIncomingDispatchBackdrop,
    StyledIncomingDispatchCard,
    StyledIncomingDispatchCardHead,
    StyledIncomingDispatchCardTitle,
    StyledIncomingDispatchDescription,
    StyledIncomingDispatchEyebrow,
    StyledIncomingDispatchHeader,
    StyledIncomingDispatchList,
    StyledIncomingDispatchMetaChip,
    StyledIncomingDispatchMetaRow,
    StyledIncomingDispatchMetaText,
    StyledIncomingDispatchOverlayRoot,
    StyledIncomingDispatchSecondaryActions,
    StyledIncomingDispatchSheet,
    StyledIncomingDispatchTitle,
    StyledOfferStatusPill,
    StyledOfferStatusText,
} from "@/styles/tabs/dispatch";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";

function formatOfferStatus(status: DispatchOfferStatus): string
{
    return status
        .toLowerCase()
        .split("_")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ");
}

function formatTime(dateValue?: string | null): string
{
    if (!dateValue)
    {
        return "Just now";
    }

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime()))
    {
        return "Just now";
    }

    return parsedDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
    });
}

function isPendingOffer(status: DispatchOfferStatus): boolean
{
    return (
        status !== DispatchOfferStatus.Accepted &&
        status !== DispatchOfferStatus.Declined &&
        status !== DispatchOfferStatus.Cancelled &&
        status !== DispatchOfferStatus.Expired
    );
}

const SNOOZE_DURATION_MS = 1000 * 60 * 5;

export function IncomingDispatchOffersOverlay()
{
    const router = useRouter();
    const segments = useSegments();
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const previousVisibleOfferIdsRef = React.useRef<string[]>([]);
    const dismissedOfferIds = useDispatchOverlayStore((state) => state.dismissedOfferIds);
    const snoozedUntilByOfferId = useDispatchOverlayStore((state) => state.snoozedUntilByOfferId);
    const dismissOffers = useDispatchOverlayStore((state) => state.dismissOffers);
    const snoozeOffers = useDispatchOverlayStore((state) => state.snoozeOffers);
    const clearExpiredSnoozes = useDispatchOverlayStore((state) => state.clearExpiredSnoozes);
    const isTabsRoute = segments[0] === "(tabs)";

    const { data, loading, refetch } = useQuery<GetProviderDispatchTabQuaryQuery>(
        GET_PROVIDER_DISPATCH_TAB_QUARY,
        {
            skip: !isTabsRoute,
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
            notifyOnNetworkStatusChange: true,
        },
    );

    const { data: subscriptionData } = useSubscription<DispatchOfferSentSubscription>(
        DISPATCH_OFFER_SENT_SUBSCRIPTION,
        {
            skip: !isTabsRoute,
        },
    );

    const [respondToDispatchOffer, { loading: acceptingOfferId }] = useMutation<
        RespondToDispatchOfferMutation,
        RespondToDispatchOfferMutationVariables
    >(RESPOND_TO_DISPATCH_OFFER);
    const latestSubscriptionOffer = subscriptionData?.dispatchOfferSent;
    const isStaticDispatchData = __DEV__ && !data?.myDispatchOffers?.length && !latestSubscriptionOffer;

    const resolvedData = React.useMemo(() =>
    {
        if (isStaticDispatchData)
        {
            return DEV_DISPATCH_DATA;
        }

        return data;
    }, [data, isStaticDispatchData]);

    const resolvedOffers = React.useMemo(() =>
    {
        const offers = resolvedData?.myDispatchOffers ?? [];
        if (!latestSubscriptionOffer)
        {
            return offers;
        }

        if (offers.some((offer) => offer.id === latestSubscriptionOffer.id))
        {
            return offers;
        }

        return [latestSubscriptionOffer, ...offers];
    }, [latestSubscriptionOffer, resolvedData?.myDispatchOffers]);

    React.useEffect(() =>
    {
        clearExpiredSnoozes(Date.now());
    }, [clearExpiredSnoozes, resolvedOffers]);

    const visibleOffers = React.useMemo(
        () =>
        {
            const now = Date.now();

            return (
                resolvedOffers
                    .filter((offer) => isPendingOffer(offer.status))
                    .filter((offer) => !dismissedOfferIds.includes(offer.id))
                    .filter((offer) => (snoozedUntilByOfferId[offer.id] ?? 0) <= now)
            );
        },
        [dismissedOfferIds, resolvedOffers, snoozedUntilByOfferId],
    );

    const overlayIsVisible = visibleOffers.length > 0;

    const handleDismissOverlay = React.useCallback(() =>
    {
        dismissOffers(visibleOffers.map((offer) => offer.id));
    }, [dismissOffers, visibleOffers]);

    const handleViewOffer = React.useCallback(
        (offerId: string, shipmentId: string) =>
        {
            dismissOffers([offerId]);
            router.push(
                `/shipment-details?context=dispatch&offerId=${encodeURIComponent(offerId)}&shipmentId=${encodeURIComponent(shipmentId)}` as never,
            );
        },
        [dismissOffers, router],
    );

    const handleAcceptOffer = React.useCallback(
        async (offerId: string, shipmentId: string) =>
        {
            if (!isStaticDispatchData)
            {
                await respondToDispatchOffer({
                    variables: {
                        input: {
                            offerId,
                            status: DispatchOfferStatus.Accepted,
                            respondedAt: new Date().toISOString(),
                        },
                    },
                });

                await refetch();
            }

            dismissOffers([offerId]);
            router.push(
                `/shipment-details?context=dispatch&offerId=${encodeURIComponent(offerId)}&shipmentId=${encodeURIComponent(shipmentId)}` as never,
            );
        },
        [dismissOffers, isStaticDispatchData, refetch, respondToDispatchOffer, router],
    );

    const handleDeclineOffer = React.useCallback(
        async (offerId: string) =>
        {
            if (!isStaticDispatchData)
            {
                await respondToDispatchOffer({
                    variables: {
                        input: {
                            offerId,
                            status: DispatchOfferStatus.Declined,
                            respondedAt: new Date().toISOString(),
                        },
                    },
                });

                await refetch();
            }

            dismissOffers([offerId]);
        },
        [dismissOffers, isStaticDispatchData, refetch, respondToDispatchOffer],
    );

    const handleSnoozeOffer = React.useCallback(
        (offerId: string) =>
        {
            snoozeOffers([offerId], SNOOZE_DURATION_MS);
        },
        [snoozeOffers],
    );

    React.useEffect(() =>
    {
        const currentVisibleOfferIds = visibleOffers.map((offer) => offer.id);
        const newOfferIds = currentVisibleOfferIds.filter(
            (offerId) => !previousVisibleOfferIdsRef.current.includes(offerId),
        );

        if (newOfferIds.length > 0)
        {
            void playDispatchAlertAttention();
        }

        previousVisibleOfferIdsRef.current = currentVisibleOfferIds;
    }, [visibleOffers]);

    if (!isTabsRoute || !overlayIsVisible)
    {
        return null;
    }

    return (
        <Modal transparent visible animationType="slide" onRequestClose={handleDismissOverlay}>
            <StyledIncomingDispatchOverlayRoot>
                <StyledIncomingDispatchBackdrop onPress={handleDismissOverlay} />
                <StyledIncomingDispatchSheet style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
                    <StyledIncomingDispatchHeader>
                        <StyledIncomingDispatchEyebrow>Incoming dispatch</StyledIncomingDispatchEyebrow>
                        <StyledIncomingDispatchTitle>
                            {visibleOffers.length === 1 ? "New dispatch offer" : `${visibleOffers.length} dispatch offers`}
                        </StyledIncomingDispatchTitle>
                        <StyledIncomingDispatchDescription>
                            Review the incoming assignment, accept immediately, or open it for more detail.
                        </StyledIncomingDispatchDescription>
                    </StyledIncomingDispatchHeader>

                    {loading && visibleOffers.length === 0 ? <Spinner size="small" /> : null}

                    <StyledIncomingDispatchList>
                        {visibleOffers.map((offer) => (
                            <StyledIncomingDispatchCard key={offer.id}>
                                <StyledIncomingDispatchCardHead>
                                    <StyledIncomingDispatchCardTitle>{offer.shipmentId}</StyledIncomingDispatchCardTitle>
                                    <StyledOfferStatusPill status={offer.status}>
                                        <StyledOfferStatusText status={offer.status}>
                                            {formatOfferStatus(offer.status)}
                                        </StyledOfferStatusText>
                                    </StyledOfferStatusPill>
                                </StyledIncomingDispatchCardHead>

                                <StyledIncomingDispatchMetaRow>
                                    <StyledIncomingDispatchMetaChip>
                                        <MaterialIcons name="schedule" size={14} color={theme.colors.mutedForeground} />
                                        <StyledIncomingDispatchMetaText>
                                            {offer.providerEtaMinutes ? `${offer.providerEtaMinutes} min ETA` : "ETA not provided"}
                                        </StyledIncomingDispatchMetaText>
                                    </StyledIncomingDispatchMetaChip>
                                    <StyledIncomingDispatchMetaChip>
                                        <MaterialIcons name="notifications-active" size={14} color={theme.colors.mutedForeground} />
                                        <StyledIncomingDispatchMetaText>
                                            Sent {formatTime((offer.sentAt ?? offer.createdAt) as string | null)}
                                        </StyledIncomingDispatchMetaText>
                                    </StyledIncomingDispatchMetaChip>
                                </StyledIncomingDispatchMetaRow>

                                <StyledIncomingDispatchActions>
                                    <StyledIncomingDispatchActionItem>
                                        <Button
                                            variant="outline"
                                            fullWidth
                                            onPress={() => handleViewOffer(offer.id, offer.shipmentId)}
                                        >
                                            View info
                                        </Button>
                                    </StyledIncomingDispatchActionItem>
                                    <StyledIncomingDispatchActionItem>
                                        <Button
                                            fullWidth
                                            onPress={() => void handleAcceptOffer(offer.id, offer.shipmentId)}
                                            disabled={acceptingOfferId}
                                        >
                                            Accept
                                        </Button>
                                    </StyledIncomingDispatchActionItem>
                                </StyledIncomingDispatchActions>
                                <StyledIncomingDispatchSecondaryActions>
                                    <StyledIncomingDispatchActionItem>
                                        <Button
                                            variant="secondary"
                                            fullWidth
                                            onPress={() => handleSnoozeOffer(offer.id)}
                                            disabled={acceptingOfferId}
                                        >
                                            Snooze 5m
                                        </Button>
                                    </StyledIncomingDispatchActionItem>
                                    <StyledIncomingDispatchActionItem>
                                        <Button
                                            variant="ghost"
                                            fullWidth
                                            onPress={() => void handleDeclineOffer(offer.id)}
                                            disabled={acceptingOfferId}
                                        >
                                            Decline
                                        </Button>
                                    </StyledIncomingDispatchActionItem>
                                </StyledIncomingDispatchSecondaryActions>
                            </StyledIncomingDispatchCard>
                        ))}
                    </StyledIncomingDispatchList>
                </StyledIncomingDispatchSheet>
            </StyledIncomingDispatchOverlayRoot>
        </Modal>
    );
}
