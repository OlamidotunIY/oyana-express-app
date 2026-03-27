import { Button, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { MyWalletComplianceQuery, MyWalletComplianceQueryVariables, MyWalletQuery, MyWalletQueryVariables, MyWalletTransactionsQuery, MyWalletTransactionsQueryVariables, TransactionDirection, TransactionStatus } from "@/gql/graphql";
import { MY_WALLET_COMPLIANCE_QUERY, MY_WALLET_QUERY, MY_WALLET_TRANSACTIONS_QUERY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { DEV_WALLET_COMPLIANCE_DATA, DEV_WALLET_DATA, DEV_WALLET_TRANSACTIONS_DATA } from "@/lib/dev-fixtures";
import { StyledBalanceAmount, StyledBalanceHero, StyledCleanTransactionRow, StyledHelperText, StyledHeroChip, StyledHeroHeaderRow, StyledHeroHint, StyledIssueList, StyledIssueRow, StyledIssueText, StyledLoadingRow, StyledNeutralChip, StyledSurfaceCard, StyledTransactionAmount, StyledTransactionIconWrap, StyledTransactionMain, StyledTransactionMeta, StyledTransactionRight, StyledTransactionRowDivider, StyledTransactionStatus, StyledTransactionTitle, StyledWalletActionItem, StyledWalletActionLabel, StyledWalletActionsRow, StyledWalletRoot, StyledWalletSectionHeading, StyledWalletSectionLabel, StyledWalletSurfaceCard } from "@/styles/tabs";
import { formatDateTime, formatEnumLabel, formatMinorCurrency } from "@/utils/format";
import { useQuery } from "@apollo/client/react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTheme } from "styled-components/native";

export default function WalletScreen()
{
    const router = useRouter();
    const theme = useTheme();

    const {
        data: walletData,
        loading: walletLoading,
        error: walletError,
        refetch: refetchWallet,
    } = useQuery<MyWalletQuery, MyWalletQueryVariables>(MY_WALLET_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const {
        data: complianceData,
        loading: complianceLoading,
        error: complianceError,
        refetch: refetchCompliance,
    } = useQuery<MyWalletComplianceQuery, MyWalletComplianceQueryVariables>(
        MY_WALLET_COMPLIANCE_QUERY,
        {
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    const {
        data: transactionsData,
        loading: transactionsLoading,
        error: transactionsError,
        refetch: refetchTransactions,
    } = useQuery<MyWalletTransactionsQuery, MyWalletTransactionsQueryVariables>(
        MY_WALLET_TRANSACTIONS_QUERY,
        {
            variables: {
                input: {
                    take: 5,
                },
            },
            fetchPolicy: "cache-and-network",
            errorPolicy: "all",
        },
    );

    useBackendErrorToast(walletError, "Unable to load wallet balance.", {
        title: "Wallet Error",
        dedupeKey: "wallet-home-wallet",
    });

    useBackendErrorToast(complianceError, "Unable to load wallet compliance.", {
        title: "Wallet Error",
        dedupeKey: "wallet-home-compliance",
    });

    useBackendErrorToast(transactionsError, "Unable to load wallet transactions.", {
        title: "Wallet Error",
        dedupeKey: "wallet-home-transactions",
    });

    const wallet = walletData?.myWallet ?? (__DEV__ ? DEV_WALLET_DATA.myWallet : null);
    const compliance = complianceData?.myWalletCompliance ?? (__DEV__ ? DEV_WALLET_COMPLIANCE_DATA.myWalletCompliance : null);
    const rawItems = transactionsData?.myWalletTransactions?.items;
    const transactions = (rawItems?.length ? rawItems : null) ?? (__DEV__ ? DEV_WALLET_TRANSACTIONS_DATA.myWalletTransactions.items : []);
    const hasMoreTransactions = transactionsData?.myWalletTransactions?.hasMore ?? false;
    const isLoading = walletLoading || complianceLoading || transactionsLoading;

    const retry = async () =>
    {
        await Promise.allSettled([refetchWallet(), refetchCompliance(), refetchTransactions()]);
    };

    const walletCurrency = wallet?.currency ?? "NGN";
    const complianceIssues = compliance?.blockReasons ?? [];

    return (
        <ScreenShell
            contentProps={{ style: { justifyContent: "flex-start" } }}
            stickyTop={
                <StyledBalanceHero>
                    <StyledHeroHeaderRow>
                        <StyledWalletSectionLabel>Available balance</StyledWalletSectionLabel>
                        <StyledHeroChip>{formatEnumLabel(wallet?.status)}</StyledHeroChip>
                    </StyledHeroHeaderRow>

                    <StyledBalanceAmount>
                        {formatMinorCurrency(wallet?.balanceMinor ?? 0, walletCurrency)}
                    </StyledBalanceAmount>

                    <StyledHeroHint>
                        Escrow: {formatMinorCurrency(wallet?.escrowMinor ?? 0, walletCurrency)}
                    </StyledHeroHint>
                </StyledBalanceHero>
            }
        >
            <StyledWalletRoot>
                {/* ── QUICK ACTIONS ───────────────────────────── */}
                <StyledWalletActionsRow>
                    <StyledWalletActionItem onPress={() => router.push("/(tabs)/wallet/wallet-fund")}>
                        <MaterialIcons name="add" size={22} color={theme.colors.primary} />
                        <StyledWalletActionLabel>Fund</StyledWalletActionLabel>
                    </StyledWalletActionItem>
                    <StyledWalletActionItem onPress={() => router.push("/(tabs)/wallet/wallet-withdraw")}>
                        <MaterialIcons name="north-east" size={22} color={theme.colors.primary} />
                        <StyledWalletActionLabel>Withdraw</StyledWalletActionLabel>
                    </StyledWalletActionItem>
                    <StyledWalletActionItem onPress={retry}>
                        <MaterialIcons name="refresh" size={22} color={theme.colors.primary} />
                        <StyledWalletActionLabel>Refresh</StyledWalletActionLabel>
                    </StyledWalletActionItem>
                </StyledWalletActionsRow>

                <StyledWalletSurfaceCard>
                    <StyledWalletSectionHeading>
                        <StyledWalletSectionLabel>Compliance monitor</StyledWalletSectionLabel>
                        <StyledNeutralChip>
                            {complianceIssues.length === 0 ? "Clear" : `${complianceIssues.length} issue(s)`}
                        </StyledNeutralChip>
                    </StyledWalletSectionHeading>

                    {isLoading && !wallet ? (
                        <StyledLoadingRow>
                            <Spinner size="small" />
                        </StyledLoadingRow>
                    ) : null}

                    {complianceIssues.length > 0 ? (
                        <StyledIssueList>
                            {complianceIssues.map((reason, index) => (
                                <StyledIssueRow key={`${reason}-${index}`}>
                                    <MaterialIcons name="warning-amber" color={theme.colors.warning} size={16} />
                                    <StyledIssueText>{reason}</StyledIssueText>
                                </StyledIssueRow>
                            ))}
                        </StyledIssueList>
                    ) : (
                        <StyledHelperText>Wallet funding and withdrawal are enabled.</StyledHelperText>
                    )}

                    {!compliance?.phoneVerified ? (
                        <Button
                            fullWidth
                            variant="secondary"
                            onPress={() => router.push("/")}
                        >
                            Verify phone
                        </Button>
                    ) : null}
                </StyledWalletSurfaceCard>

                <StyledSurfaceCard>
                    <StyledWalletSectionHeading>
                        <StyledWalletSectionLabel>Recent transactions</StyledWalletSectionLabel>
                        <StyledNeutralChip>{transactions.length} items</StyledNeutralChip>
                    </StyledWalletSectionHeading>

                    {transactions.length === 0 ? (
                        <StyledHelperText>No wallet transactions yet.</StyledHelperText>
                    ) : (
                        <React.Fragment>
                            {transactions.map((transaction, index) =>
                            {
                                const isCredit = transaction.direction === TransactionDirection.Credit;
                                const isPending = transaction.status === TransactionStatus.Pending;
                                return (
                                    <React.Fragment key={transaction.id}>
                                        {index > 0 ? <StyledTransactionRowDivider /> : null}
                                        <StyledCleanTransactionRow>
                                            <StyledTransactionIconWrap>
                                                <MaterialIcons
                                                    name={isCredit ? "south-west" : "north-east"}
                                                    color={isCredit ? theme.colors.success : theme.colors.warning}
                                                    size={14}
                                                />
                                            </StyledTransactionIconWrap>
                                            <StyledTransactionMain>
                                                <StyledTransactionTitle>
                                                    {formatEnumLabel(transaction.transactionType)}
                                                </StyledTransactionTitle>
                                                <StyledTransactionMeta>{formatDateTime(transaction.createdAt)}</StyledTransactionMeta>
                                            </StyledTransactionMain>
                                            <StyledTransactionRight>
                                                <StyledTransactionAmount isCredit={isCredit}>
                                                    {isCredit ? "+" : "-"}
                                                    {formatMinorCurrency(transaction.amountMinor, transaction.currency)}
                                                </StyledTransactionAmount>
                                                <StyledTransactionStatus isPending={isPending}>
                                                    {formatEnumLabel(transaction.status)}
                                                </StyledTransactionStatus>
                                            </StyledTransactionRight>
                                        </StyledCleanTransactionRow>
                                    </React.Fragment>
                                );
                            })}
                        </React.Fragment>
                    )}

                    {hasMoreTransactions ? (
                        <StyledHelperText>More transactions available in detailed wallet history.</StyledHelperText>
                    ) : null}
                </StyledSurfaceCard>
            </StyledWalletRoot>
        </ScreenShell>
    );
}
