import { Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { DispatchOfferStatus, GetProviderDispatchTabQuaryQuery } from "@/gql/graphql";
import { GET_PROVIDER_DISPATCH_TAB_QUARY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import
{
    StyledDispatchEmptyState,
    StyledDispatchEmptyStateText,
    StyledDispatchRoot,
    StyledDispatchSectionLabel,
    StyledDispatchSurfaceCard,
    StyledOfferHead,
    StyledOfferList,
    StyledOfferMain,
    StyledOfferMeta,
    StyledOfferRow,
    StyledOfferStatusPill,
    StyledOfferStatusText,
    StyledOfferTitle,
} from "@/styles/tabs";
import { getTimestamp } from "@/utils/format";
import { useQuery } from "@apollo/client/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

function formatOfferStatus(status: DispatchOfferStatus): string
{
    return status
        .toLowerCase()
        .split("_")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ");
}

function formatDateTime(dateValue?: string | null): string
{
    if (!dateValue) return "-";
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return "-";
    return parsed.toLocaleString();
}

export default function OfferHistoryScreen()
{
    const router = useRouter();
    const theme = useTheme();

    const { data, loading, error } = useQuery<GetProviderDispatchTabQuaryQuery>(
        GET_PROVIDER_DISPATCH_TAB_QUARY,
        { fetchPolicy: "cache-and-network", errorPolicy: "all" },
    );

    useBackendErrorToast(error, "Unable to load offer history.", {
        title: "Dispatch Error",
        dedupeKey: "dispatch-history-query",
    });

    const offers = React.useMemo(
        () =>
            [...(data?.myDispatchOffers ?? [])].sort(
                (left, right) =>
                    getTimestamp((right.sentAt ?? right.createdAt) as string | null) -
                    getTimestamp((left.sentAt ?? left.createdAt) as string | null),
            ),
        [data?.myDispatchOffers],
    );

    return (
        <ScreenShell contentProps={{ style: { justifyContent: "flex-start" } }}>
            <StyledDispatchRoot>
                <StyledDispatchSurfaceCard>
                    <StyledDispatchSectionLabel>All dispatch offers</StyledDispatchSectionLabel>

                    {loading && !data ? <Spinner size="small" /> : null}

                    {offers.length === 0 && !loading ? (
                        <StyledDispatchEmptyState>
                            <MaterialIcons name="history" size={32} color={theme.colors.mutedForeground} />
                            <StyledDispatchEmptyStateText>
                                No dispatch offers in history yet.
                            </StyledDispatchEmptyStateText>
                        </StyledDispatchEmptyState>
                    ) : (
                        <StyledOfferList>
                            {offers.map((offer) => (
                                <StyledOfferRow
                                    key={offer.id}
                                    onPress={() =>
                                        router.push(
                                            `/shipment-details?context=dispatch&offerId=${encodeURIComponent(offer.id)}&shipmentId=${encodeURIComponent(offer.shipmentId)}` as never,
                                        )
                                    }
                                >
                                    <StyledOfferMain>
                                        <StyledOfferHead>
                                            <StyledOfferTitle>{offer.shipmentId}</StyledOfferTitle>
                                            <StyledOfferStatusPill status={offer.status}>
                                                <StyledOfferStatusText status={offer.status}>
                                                    {formatOfferStatus(offer.status)}
                                                </StyledOfferStatusText>
                                            </StyledOfferStatusPill>
                                        </StyledOfferHead>
                                        <StyledOfferMeta>
                                            Sent {formatDateTime((offer.sentAt ?? offer.createdAt) as string | null)}
                                        </StyledOfferMeta>
                                    </StyledOfferMain>
                                    <MaterialIcons
                                        name="arrow-forward-ios"
                                        color={theme.colors.mutedForeground}
                                        size={16}
                                    />
                                </StyledOfferRow>
                            ))}
                        </StyledOfferList>
                    )}
                </StyledDispatchSurfaceCard>
            </StyledDispatchRoot>
        </ScreenShell>
    );
}
