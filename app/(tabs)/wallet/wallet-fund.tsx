import { Button, Card, CardContent, Input, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { ConfirmWalletFundingMutation, CreateWalletFundingMutation, MySavedFundingCardsQuery, MySavedFundingCardsQueryVariables, MyWalletComplianceQuery, MyWalletComplianceQueryVariables } from "@/gql/graphql";
import
{
    CONFIRM_WALLET_FUNDING_MUTATION,
    CREATE_WALLET_FUNDING_MUTATION,
    MY_SAVED_FUNDING_CARDS_QUERY,
    MY_WALLET_COMPLIANCE_QUERY,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { showBackendErrorToast, showErrorToast, showToast } from "@/lib/toast";
import
{
    StyledFundCardList,
    StyledFundLoadingWrap,
    StyledFundPanel,
    StyledFundRoot,
    StyledFundSectionLabel,
    StyledFundSelectable,
    StyledFundSelectableHint,
    StyledFundSelectableLine,
} from "@/styles";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React from "react";

function generateIdempotencyKey(prefix: string)
{
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function WalletFundScreen()
{
    const router = useRouter();
    const [amountInput, setAmountInput] = React.useState("");
    const [selectedCardId, setSelectedCardId] = React.useState<string>("new");
    const [pendingReference, setPendingReference] = React.useState<string | null>(null);
    const [submitting, setSubmitting] = React.useState(false);
    const [confirming, setConfirming] = React.useState(false);

    const {
        data: complianceData,
        loading: complianceLoading,
        error: complianceError,
    } = useQuery<MyWalletComplianceQuery, MyWalletComplianceQueryVariables>(MY_WALLET_COMPLIANCE_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const {
        data: cardsData,
        loading: cardsLoading,
        error: cardsError,
        refetch: refetchCards,
    } = useQuery<MySavedFundingCardsQuery, MySavedFundingCardsQueryVariables>(MY_SAVED_FUNDING_CARDS_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const [createFunding] = useMutation<CreateWalletFundingMutation>(CREATE_WALLET_FUNDING_MUTATION);
    const [confirmFunding] = useMutation<ConfirmWalletFundingMutation>(CONFIRM_WALLET_FUNDING_MUTATION);

    useBackendErrorToast(complianceError, "Unable to load compliance status.", {
        title: "Wallet Error",
        dedupeKey: "wallet-fund-compliance",
    });

    useBackendErrorToast(cardsError, "Unable to load saved cards.", {
        title: "Wallet Error",
        dedupeKey: "wallet-fund-cards",
    });

    const compliance = complianceData?.myWalletCompliance ?? null;
    const cards = cardsData?.mySavedFundingCards ?? [];
    const canFund = Boolean(compliance?.canFund);

    React.useEffect(() =>
    {
        if (cards.length === 0)
        {
            setSelectedCardId("new");
        }
    }, [cards.length]);

    const parseAmountMinor = () =>
    {
        const amount = Number(amountInput);

        if (!Number.isFinite(amount) || amount <= 0)
        {
            return null;
        }

        return String(Math.round(amount * 100));
    };

    const submitFunding = async () =>
    {
        if (!canFund)
        {
            showErrorToast("Phone verification is required before wallet funding.");
            return;
        }

        const amountMinor = parseAmountMinor();

        if (!amountMinor)
        {
            showErrorToast("Enter a valid funding amount.");
            return;
        }

        setSubmitting(true);

        try
        {
            const { data } = await createFunding({
                variables: {
                    input: {
                        amountMinor,
                        currency: "NGN",
                        idempotencyKey: generateIdempotencyKey("fund"),
                        savedCardMethodId: selectedCardId !== "new" ? selectedCardId : undefined,
                    },
                },
            });

            const result = data?.createWalletFunding;

            if (!result)
            {
                showErrorToast("Unable to start wallet funding.");
                return;
            }

            if (result.authorizationUrl)
            {
                setPendingReference(result.reference);
                await WebBrowser.openBrowserAsync(result.authorizationUrl);
                showToast({
                    tone: "info",
                    title: "Complete Payment",
                    message: "If payment is complete, tap Confirm payment below.",
                    dedupeKey: "wallet-fund-open-checkout",
                });
                return;
            }

            if (String(result.status).toLowerCase() === "succeeded")
            {
                showToast({
                    tone: "success",
                    title: "Wallet Funded",
                    message: "Wallet funding completed successfully.",
                    dedupeKey: `wallet-fund-success-${result.reference}`,
                });
                await refetchCards();
                router.back();
                return;
            }

            if (result.reference)
            {
                setPendingReference(result.reference);
                showToast({
                    tone: "info",
                    title: "Funding Pending",
                    message: "Confirm this payment after completing checkout.",
                    dedupeKey: `wallet-fund-pending-${result.reference}`,
                });
            }
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to fund wallet right now.", {
                title: "Wallet Funding Failed",
                dedupeKey: "wallet-fund-mutation",
            });
        } finally
        {
            setSubmitting(false);
        }
    };

    const confirmPendingFunding = async () =>
    {
        if (!pendingReference)
        {
            return;
        }

        setConfirming(true);

        try
        {
            const { data } = await confirmFunding({
                variables: {
                    input: {
                        reference: pendingReference,
                    },
                },
            });

            const result = data?.confirmWalletFunding;

            if (!result)
            {
                showErrorToast("Unable to confirm wallet funding.");
                return;
            }

            if (String(result.status).toLowerCase() === "succeeded")
            {
                showToast({
                    tone: "success",
                    title: "Wallet Funded",
                    message: "Wallet funding completed successfully.",
                    dedupeKey: `wallet-fund-confirmed-${pendingReference}`,
                });
                setPendingReference(null);
                await refetchCards();
                router.back();
                return;
            }

            showToast({
                tone: "info",
                title: "Funding Pending",
                message: result.message ?? "Payment is still processing.",
                dedupeKey: `wallet-fund-still-pending-${pendingReference}`,
            });
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to confirm wallet funding.", {
                title: "Funding Confirmation Failed",
                dedupeKey: "wallet-fund-confirm-mutation",
            });
        } finally
        {
            setConfirming(false);
        }
    };

    return (
        <ScreenShell
            contentProps={{ style: { justifyContent: "flex-start" } }}
        >
            <StyledFundRoot>
                {complianceLoading || cardsLoading ? (
                    <Card>
                        <CardContent>
                            <StyledFundLoadingWrap>
                                <Spinner size="small" />
                            </StyledFundLoadingWrap>
                        </CardContent>
                    </Card>
                ) : null}

                <Card>
                    <CardContent>
                        <StyledFundPanel>
                            <StyledFundSectionLabel>Amount (NGN)</StyledFundSectionLabel>
                            <Input
                                keyboardType="decimal-pad"
                                placeholder="5000"
                                value={amountInput}
                                onChangeText={setAmountInput}
                            />
                        </StyledFundPanel>
                    </CardContent>
                </Card>

                {cards.length > 0 ? (
                    <Card>
                        <CardContent>
                            <StyledFundPanel>
                                <StyledFundSectionLabel>Payment method</StyledFundSectionLabel>

                                <StyledFundCardList>
                                    {cards.map((card: any) =>
                                    {
                                        const isSelected = selectedCardId === card.id;
                                        return (
                                            <StyledFundSelectable
                                                key={card.id}
                                                selected={isSelected}
                                                onPress={() => setSelectedCardId(card.id)}
                                            >
                                                <StyledFundSelectableLine>
                                                    {card.brand ?? "Card"} •••• {card.last4 ?? "----"}
                                                </StyledFundSelectableLine>
                                                <StyledFundSelectableHint>
                                                    {card.bank ?? ""}{card.expMonth && card.expYear ? ` · ${card.expMonth}/${card.expYear}` : ""}
                                                </StyledFundSelectableHint>
                                            </StyledFundSelectable>
                                        );
                                    })}
                                </StyledFundCardList>

                                <StyledFundSelectable
                                    selected={selectedCardId === "new"}
                                    onPress={() => setSelectedCardId("new")}
                                >
                                    <StyledFundSelectableLine>Use another card</StyledFundSelectableLine>
                                    <StyledFundSelectableHint>Opens Paystack hosted checkout</StyledFundSelectableHint>
                                </StyledFundSelectable>
                            </StyledFundPanel>
                        </CardContent>
                    </Card>
                ) : null}

                <Button fullWidth onPress={submitFunding} disabled={submitting}>
                    {submitting ? "Starting funding..." : "Continue"}
                </Button>

                {pendingReference ? (
                    <Button
                        fullWidth
                        variant="secondary"
                        onPress={confirmPendingFunding}
                        disabled={confirming}
                    >
                        {confirming ? "Confirming..." : "Confirm payment"}
                    </Button>
                ) : null}
            </StyledFundRoot>
        </ScreenShell>
    );
}
