import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useTheme } from "styled-components/native";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Spinner } from "@/components/ui";
import
{
    BidStatus,
    MyBidsQuery,
    WithdrawBidMutation,
    WithdrawBidMutationVariables,
} from "@/gql/graphql";
import { MY_BIDS_QUERY, WITHDRAW_BID } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { showBackendErrorToast } from "@/lib/toast";
import { useFreightHeaderStore } from "@/store/freightHeaderStore";
import
{
    StyledMyBidsActions,
    StyledMyBidsAmount,
    StyledMyBidsCard,
    StyledMyBidsCardAccent,
    StyledMyBidsCardHead,
    StyledMyBidsCardMain,
    StyledMyBidsCardMeta,
    StyledMyBidsCardTitle,
    StyledMyBidsDescription,
    StyledMyBidsEmpty,
    StyledMyBidsList,
    StyledMyBidsLoadingWrap,
    StyledMyBidsMessage,
    StyledMyBidsMetaGrid,
    StyledMyBidsMetaLabel,
    StyledMyBidsMetaTile,
    StyledMyBidsMetaValue,
    StyledMyBidsRoot,
    StyledMyBidsScreen,
    StyledMyBidsStatLabel,
    StyledMyBidsStatRow,
    StyledMyBidsStatTile,
    StyledMyBidsStatValue,
    StyledMyBidsStatusPill,
    StyledMyBidsStatusText,
} from "@/styles/tabs";
import { formatMinorCurrency } from "@/utils/format";

function formatBidStatus(status: BidStatus): string
{
    return status.toLowerCase().replaceAll("_", " ");
}

function formatDateTime(dateValue?: string | null): string
{
    if (!dateValue) return "-";
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return "-";
    return parsed.toLocaleString();
}

export default function MyBidsScreen()
{
    const theme = useTheme();
    const router = useRouter();
    const [withdrawingId, setWithdrawingId] = React.useState<string | null>(null);
    const bidsRefreshNonce = useFreightHeaderStore((state) => state.bidsRefreshNonce);

    const { data, loading, error, refetch } = useQuery<MyBidsQuery>(MY_BIDS_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    useBackendErrorToast(error, "Unable to load marketplace bids.", {
        title: "My Bids Error",
        dedupeKey: "freight-my-bids-query",
    });

    const [withdrawBid] = useMutation<WithdrawBidMutation, WithdrawBidMutationVariables>(
        WITHDRAW_BID,
    );

    const bids = data?.myBids ?? [];
    const activeBidsCount = bids.filter((bid) => bid.status === BidStatus.Active).length;
    const awardedBidsCount = bids.filter((bid) => bid.status === BidStatus.Accepted).length;

    const handleWithdraw = React.useCallback(async (bidId: string) =>
    {
        setWithdrawingId(bidId);
        try
        {
            await withdrawBid({ variables: { id: bidId } });
            await refetch();
        }
        catch (mutationError)
        {
            showBackendErrorToast(mutationError, "Unable to withdraw this bid.", {
                title: "Withdraw Bid Failed",
                dedupeKey: "freight-withdraw-bid-mutation",
            });
        }
        finally
        {
            setWithdrawingId(null);
        }
    }, [refetch, withdrawBid]);

    React.useEffect(() =>
    {
        if (bidsRefreshNonce < 1)
        {
            return;
        }

        void refetch();
    }, [bidsRefreshNonce, refetch]);

    return (
        <StyledMyBidsScreen>
            <ScreenShell
                contentJustify="flex-start"
            >
                <StyledMyBidsRoot>
                    {loading && !data ? (
                        <StyledMyBidsLoadingWrap>
                            <Spinner size="small" />
                        </StyledMyBidsLoadingWrap>
                    ) : null}

                    {bids.length === 0 ? (
                        <StyledMyBidsEmpty>
                            <StyledMyBidsDescription>
                                You have not placed any marketplace bids yet.
                            </StyledMyBidsDescription>
                            <Button variant="outline" onPress={() => router.replace("/freight" as never)}>
                                Browse freight loads
                            </Button>
                        </StyledMyBidsEmpty>
                    ) : (
                        <StyledMyBidsList>
                            {bids.map((bid) => (
                                <StyledMyBidsCard key={bid.id}>
                                    <StyledMyBidsCardAccent status={bid.status} />
                                    <StyledMyBidsCardHead>
                                        <StyledMyBidsCardMain>
                                            <StyledMyBidsCardTitle>
                                                Shipment {bid.shipmentId}
                                            </StyledMyBidsCardTitle>
                                            <StyledMyBidsCardMeta>
                                                Submitted {formatDateTime(bid.createdAt)}
                                            </StyledMyBidsCardMeta>
                                        </StyledMyBidsCardMain>
                                        <StyledMyBidsStatusPill status={bid.status}>
                                            <StyledMyBidsStatusText status={bid.status}>
                                                {formatBidStatus(bid.status)}
                                            </StyledMyBidsStatusText>
                                        </StyledMyBidsStatusPill>
                                    </StyledMyBidsCardHead>

                                    <StyledMyBidsAmount>
                                        {formatMinorCurrency(bid.amountMinor, bid.currency)}
                                    </StyledMyBidsAmount>

                                    <StyledMyBidsMetaGrid>
                                        <StyledMyBidsMetaTile>
                                            <StyledMyBidsMetaLabel>Last updated</StyledMyBidsMetaLabel>
                                            <StyledMyBidsMetaValue>
                                                {formatDateTime(bid.updatedAt)}
                                            </StyledMyBidsMetaValue>
                                        </StyledMyBidsMetaTile>
                                        <StyledMyBidsMetaTile>
                                            <StyledMyBidsMetaLabel>Bid note</StyledMyBidsMetaLabel>
                                            <StyledMyBidsMetaValue>
                                                {bid.message ? "Included" : "No note"}
                                            </StyledMyBidsMetaValue>
                                        </StyledMyBidsMetaTile>
                                    </StyledMyBidsMetaGrid>

                                    {bid.message ? (
                                        <StyledMyBidsMessage>{bid.message}</StyledMyBidsMessage>
                                    ) : (
                                        <StyledMyBidsCardMeta>
                                            No note was added to this bid.
                                        </StyledMyBidsCardMeta>
                                    )}

                                    <StyledMyBidsActions>
                                        <Button
                                            variant="outline"
                                            onPress={() =>
                                                router.push(
                                                    `/shipment-details?context=freight&shipmentId=${encodeURIComponent(bid.shipmentId)}` as never,
                                                )
                                            }
                                        >
                                            <MaterialIcons name="description" size={16} color={theme.colors.foreground} />
                                            View shipment
                                        </Button>
                                        {bid.status === BidStatus.Accepted ? (
                                            <Button
                                                onPress={() =>
                                                    router.push(
                                                        `/shipment-details?context=freight&shipmentId=${encodeURIComponent(bid.shipmentId)}` as never,
                                                    )
                                                }
                                            >
                                                <MaterialIcons name="bolt" size={16} color={theme.colors.primaryForeground} />
                                                Open shipment
                                            </Button>
                                        ) : null}
                                        {bid.status === BidStatus.Active ? (
                                            <Button
                                                variant="outline"
                                                disabled={withdrawingId === bid.id}
                                                onPress={() => void handleWithdraw(bid.id)}
                                            >
                                                <MaterialIcons name="close" size={16} color={theme.colors.foreground} />
                                                Withdraw bid
                                            </Button>
                                        ) : null}
                                    </StyledMyBidsActions>
                                </StyledMyBidsCard>
                            ))}
                        </StyledMyBidsList>
                    )}
                </StyledMyBidsRoot>
            </ScreenShell>
        </StyledMyBidsScreen>
    );
}
