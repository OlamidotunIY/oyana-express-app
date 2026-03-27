import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTheme } from "styled-components/native";

import { ScreenShell } from "@/components/ui/ScreenShell";
import
{
    Button,
    Card,
    CardContent,
    Field,
    FieldContent,
    FieldLabel,
    Input,
    Spinner,
    Textarea,
} from "@/components/ui";
import
{
    CreateShipmentBidMutation,
    CreateShipmentBidMutationVariables,
    ShipmentQuery,
    ShipmentQueryVariables,
} from "@/gql/graphql";
import { CREATE_SHIPMENT_BID, SHIPMENT_QUERY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { showBackendErrorToast, showErrorToast } from "@/lib/toast";
import
{
    StyledPlaceBidActions,
    StyledPlaceBidDescription,
    StyledPlaceBidEyebrow,
    StyledPlaceBidIntro,
    StyledPlaceBidLoadingWrap,
    StyledPlaceBidMissing,
    StyledPlaceBidRoot,
    StyledPlaceBidRouteIconWrap,
    StyledPlaceBidRouteLine,
    StyledPlaceBidRouteRow,
    StyledPlaceBidRouteText,
    StyledPlaceBidScreen,
    StyledPlaceBidSummary,
    StyledPlaceBidTitle,
    StyledPlaceBidValue,
} from "@/styles/tabs";
import { formatMinorCurrency, formatShipmentStatus } from "@/utils/format";

function getParamValue(value?: string | string[]): string | undefined
{
    if (!value) return undefined;
    return Array.isArray(value) ? value[0] : value;
}

function formatAddress(address?: {
    label?: string | null;
    address?: string | null;
} | null, summary?: string | null): string
{
    return address?.label ?? address?.address ?? summary ?? "TBD";
}

export default function PlaceBidScreen()
{
    const theme = useTheme();
    const router = useRouter();
    const params = useLocalSearchParams<{ shipmentId?: string | string[] }>();
    const shipmentId = getParamValue(params.shipmentId);
    const shipmentQueryVariables = React.useMemo<ShipmentQueryVariables>(() => ({
        shipmentId: shipmentId ?? "",
    }), [shipmentId]);
    const [amount, setAmount] = React.useState("");
    const [message, setMessage] = React.useState("");

    const { data, loading, error } = useQuery<ShipmentQuery, ShipmentQueryVariables>(
        SHIPMENT_QUERY,
        {
            skip: !shipmentId,
            variables: shipmentQueryVariables,
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    useBackendErrorToast(error, "Unable to load shipment context.", {
        title: "Place Bid Error",
        dedupeKey: "freight-place-bid-query",
    });

    const [createShipmentBid, { loading: actionLoading }] = useMutation<
        CreateShipmentBidMutation,
        CreateShipmentBidMutationVariables
    >(CREATE_SHIPMENT_BID);

    const shipment = data?.shipment ?? null;
    const shipmentValue = shipment
        ? formatMinorCurrency(
            shipment.finalPriceMinor ?? shipment.quotedPriceMinor ?? 0,
            shipment.pricingCurrency ?? "NGN",
        )
        : "-";

    const runPlaceBid = React.useCallback(async () =>
    {
        if (!shipmentId)
        {
            showErrorToast("Missing shipment id in route params.");
            return;
        }

        const numericAmount = Number(amount);
        if (!Number.isFinite(numericAmount) || numericAmount <= 0)
        {
            showErrorToast("Enter a valid bid amount.");
            return;
        }

        try
        {
            await createShipmentBid({
                variables: {
                    input: {
                        shipmentId,
                        amountMinor: Math.round(numericAmount * 100),
                        currency: shipment?.pricingCurrency,
                        message: message.trim() || undefined,
                    },
                },
            });

            router.replace("/freight/my-bids" as never);
        }
        catch (mutationError)
        {
            showBackendErrorToast(mutationError, "Unable to place bid.", {
                title: "Place Bid Failed",
                dedupeKey: "freight-place-bid-mutation",
            });
        }
    }, [amount, createShipmentBid, message, router, shipment?.pricingCurrency, shipmentId]);

    if (!shipmentId)
    {
        return (
            <StyledPlaceBidScreen>
                <ScreenShell contentJustify="flex-start">
                    <StyledPlaceBidRoot>
                        <Card>
                            <CardContent>
                                <StyledPlaceBidMissing>
                                    <StyledPlaceBidTitle>Missing shipment</StyledPlaceBidTitle>
                                    <StyledPlaceBidDescription>
                                        This route requires a shipment id before a bid can be submitted.
                                    </StyledPlaceBidDescription>
                                    <Button onPress={() => router.replace("/freight" as never)}>
                                        Back to freight
                                    </Button>
                                </StyledPlaceBidMissing>
                            </CardContent>
                        </Card>
                    </StyledPlaceBidRoot>
                </ScreenShell>
            </StyledPlaceBidScreen>
        );
    }

    return (
        <StyledPlaceBidScreen>
            <ScreenShell contentJustify="flex-start">
                <StyledPlaceBidRoot>
                    <StyledPlaceBidIntro>
                        <StyledPlaceBidEyebrow>Freight marketplace</StyledPlaceBidEyebrow>
                        <StyledPlaceBidTitle>Place bid</StyledPlaceBidTitle>
                        <StyledPlaceBidDescription>
                            Send your price and an optional note to compete for this shipment.
                        </StyledPlaceBidDescription>
                    </StyledPlaceBidIntro>

                    {loading && !shipment ? (
                        <Card>
                            <CardContent>
                                <StyledPlaceBidLoadingWrap>
                                    <Spinner size="small" />
                                </StyledPlaceBidLoadingWrap>
                            </CardContent>
                        </Card>
                    ) : null}

                    <Card>
                        <CardContent>
                            <StyledPlaceBidSummary>
                                <StyledPlaceBidTitle>
                                    {shipment?.trackingCode ?? shipmentId}
                                </StyledPlaceBidTitle>
                                <StyledPlaceBidDescription>
                                    {shipment?.packageDescription ?? "No package description provided yet."}
                                </StyledPlaceBidDescription>
                                <StyledPlaceBidValue>
                                    Shipment value: {shipmentValue}
                                </StyledPlaceBidValue>
                                <StyledPlaceBidDescription>
                                    Status: {shipment?.status ? formatShipmentStatus(shipment.status) : "Loading"}
                                </StyledPlaceBidDescription>
                                <StyledPlaceBidRouteRow>
                                    <StyledPlaceBidRouteLine>
                                        <StyledPlaceBidRouteIconWrap>
                                            <MaterialIcons
                                                name="radio-button-on"
                                                size={12}
                                                color={theme.colors.primary}
                                            />
                                        </StyledPlaceBidRouteIconWrap>
                                        <StyledPlaceBidRouteText>
                                            {formatAddress(shipment?.pickupAddress, shipment?.pickupAddressSummary)}
                                        </StyledPlaceBidRouteText>
                                    </StyledPlaceBidRouteLine>
                                    <StyledPlaceBidRouteLine>
                                        <StyledPlaceBidRouteIconWrap>
                                            <MaterialIcons
                                                name="location-on"
                                                size={12}
                                                color={theme.colors.mutedForeground}
                                            />
                                        </StyledPlaceBidRouteIconWrap>
                                        <StyledPlaceBidRouteText>
                                            {formatAddress(shipment?.dropoffAddress, shipment?.dropoffAddressSummary)}
                                        </StyledPlaceBidRouteText>
                                    </StyledPlaceBidRouteLine>
                                </StyledPlaceBidRouteRow>
                            </StyledPlaceBidSummary>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <StyledPlaceBidActions>
                                <Field>
                                    <FieldLabel>Bid amount</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            placeholder="Enter amount"
                                            keyboardType="decimal-pad"
                                            value={amount}
                                            onChangeText={setAmount}
                                        />
                                    </FieldContent>
                                </Field>

                                <Field>
                                    <FieldLabel>Message</FieldLabel>
                                    <FieldContent>
                                        <Textarea
                                            placeholder="Add an optional note for the shipper"
                                            value={message}
                                            onChangeText={setMessage}
                                        />
                                    </FieldContent>
                                </Field>

                                <Button disabled={actionLoading} onPress={() => void runPlaceBid()}>
                                    Submit bid
                                </Button>
                                <Button
                                    variant="outline"
                                    onPress={() =>
                                        router.push(
                                            `/shipment-details?context=freight&shipmentId=${encodeURIComponent(shipmentId)}` as never,
                                        )
                                    }
                                >
                                    Review shipment details
                                </Button>
                            </StyledPlaceBidActions>
                        </CardContent>
                    </Card>
                </StyledPlaceBidRoot>
            </ScreenShell>
        </StyledPlaceBidScreen>
    );
}
