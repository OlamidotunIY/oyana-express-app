import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useRouter } from "expo-router";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Spinner,
} from "@/components/ui";
import {
  CREATE_WALLET_WITHDRAWAL_MUTATION,
  MY_SAVED_WITHDRAWAL_ACCOUNTS_QUERY,
  MY_WALLET_COMPLIANCE_QUERY,
  PAYSTACK_SUPPORTED_BANKS_QUERY,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { showBackendErrorToast, showErrorToast, showToast } from "@/lib/toast";
import {
  StyledWithdrawAccountList,
  StyledWithdrawHint,
  StyledWithdrawLine,
  StyledWithdrawLoadingWrap,
  StyledWithdrawPanel,
  StyledWithdrawRoot,
  StyledWithdrawSaveRow,
  StyledWithdrawSectionLabel,
  StyledWithdrawSelectable,
} from "@/styles";
import { ScreenShell } from "@/components/ui/ScreenShell";
import { CreateWalletWithdrawalMutation, CreateWalletWithdrawalMutationVariables, MySavedWithdrawalAccountsQuery, MySavedWithdrawalAccountsQueryVariables, MyWalletComplianceQuery, MyWalletComplianceQueryVariables, PaystackSupportedBanksQuery, PaystackSupportedBanksQueryVariables } from "@/gql/graphql";
import { NativeSelect, NativeSelectOption } from "@/components/ui/NativeSelect";

function generateIdempotencyKey(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const NEW_ACCOUNT = "__new__";

export default function WalletWithdrawScreen() {
  const router = useRouter();
  const [amountInput, setAmountInput] = React.useState("");
  const [selectedAccountId, setSelectedAccountId] = React.useState<string>(NEW_ACCOUNT);
  const [bankCode, setBankCode] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [saveAccount, setSaveAccount] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const {
    data: complianceData,
    loading: complianceLoading,
    error: complianceError,
  } = useQuery<MyWalletComplianceQuery, MyWalletComplianceQueryVariables>(MY_WALLET_COMPLIANCE_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const {
    data: accountsData,
    loading: accountsLoading,
    error: accountsError,
    refetch: refetchAccounts,
  } = useQuery<MySavedWithdrawalAccountsQuery, MySavedWithdrawalAccountsQueryVariables>(MY_SAVED_WITHDRAWAL_ACCOUNTS_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const {
    data: banksData,
    loading: banksLoading,
    error: banksError,
  } = useQuery<PaystackSupportedBanksQuery, PaystackSupportedBanksQueryVariables>(PAYSTACK_SUPPORTED_BANKS_QUERY, {
    variables: {
      countryCode: "NG",
    },
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const [createWithdrawal] = useMutation<CreateWalletWithdrawalMutation, CreateWalletWithdrawalMutationVariables>(CREATE_WALLET_WITHDRAWAL_MUTATION);

  useBackendErrorToast(complianceError, "Unable to load compliance status.", {
    title: "Wallet Error",
    dedupeKey: "wallet-withdraw-compliance",
  });
  useBackendErrorToast(accountsError, "Unable to load saved bank accounts.", {
    title: "Wallet Error",
    dedupeKey: "wallet-withdraw-accounts",
  });
  useBackendErrorToast(banksError, "Unable to load supported banks.", {
    title: "Wallet Error",
    dedupeKey: "wallet-withdraw-banks",
  });

  const compliance = complianceData?.myWalletCompliance ?? null;
  const savedAccounts = accountsData?.mySavedWithdrawalAccounts ?? [];
  const supportedBanks = banksData?.paystackSupportedBanks ?? [];

  const canWithdraw = Boolean(compliance?.canWithdraw);
  const usingSavedAccount = selectedAccountId !== NEW_ACCOUNT;

  React.useEffect(() => {
    if (savedAccounts.length === 0) {
      setSelectedAccountId(NEW_ACCOUNT);
      return;
    }

    if (
      selectedAccountId !== NEW_ACCOUNT &&
      !savedAccounts.some((account: any) => account.id === selectedAccountId)
    ) {
      setSelectedAccountId(NEW_ACCOUNT);
    }
  }, [savedAccounts, selectedAccountId]);

  React.useEffect(() => {
    if (!bankCode && supportedBanks.length > 0) {
      setBankCode(supportedBanks[0].code);
    }
  }, [bankCode, supportedBanks]);

  const parseAmountMinor = () => {
    const amount = Number(amountInput);
    if (!Number.isFinite(amount) || amount <= 0) {
      return null;
    }

    return String(Math.round(amount * 100));
  };

  const submit = async () => {
    if (!canWithdraw) {
      showErrorToast("Phone verification is required before wallet withdrawal.");
      return;
    }

    const amountMinor = parseAmountMinor();
    if (!amountMinor) {
      showErrorToast("Enter a valid withdrawal amount.");
      return;
    }

    if (!usingSavedAccount) {
      if (!bankCode) {
        showErrorToast("Select a bank.");
        return;
      }

      if (!/^\d{10}$/.test(accountNumber.trim())) {
        showErrorToast("Enter a valid 10-digit account number.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const { data } = await createWithdrawal({
        variables: {
          input: {
            amountMinor,
            currency: "NGN",
            idempotencyKey: generateIdempotencyKey("withdraw"),
            savedBankAccountId: usingSavedAccount ? selectedAccountId : undefined,
            bankCode: usingSavedAccount ? undefined : bankCode,
            accountNumber: usingSavedAccount ? undefined : accountNumber.trim(),
            saveAccount: usingSavedAccount ? undefined : saveAccount,
          },
        },
      });

      const result = data?.createWalletWithdrawal;

      if (!result) {
        showErrorToast("Unable to submit withdrawal.");
        return;
      }

      showToast({
        tone: "success",
        title: "Withdrawal Submitted",
        message:
          String(result.status).toLowerCase() === "succeeded"
            ? "Withdrawal completed successfully."
            : "Withdrawal request is processing.",
        dedupeKey: `wallet-withdraw-success-${result.reference}`,
      });

      await refetchAccounts();
      router.back();
    } catch (error) {
      showBackendErrorToast(error, "Unable to complete wallet withdrawal.", {
        title: "Withdrawal Failed",
        dedupeKey: "wallet-withdraw-mutation",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const loading = complianceLoading || accountsLoading || banksLoading;

  return (
    <ScreenShell
      contentProps={{ style: { justifyContent: "flex-start" } }}
    >
      <StyledWithdrawRoot>
        {loading ? (
          <Card>
            <CardContent>
              <StyledWithdrawLoadingWrap>
                <Spinner size="small" />
              </StyledWithdrawLoadingWrap>
            </CardContent>
          </Card>
        ) : null}

        <Card>
          <CardContent>
            <StyledWithdrawPanel>
              <StyledWithdrawSectionLabel>Amount (NGN)</StyledWithdrawSectionLabel>
              <Input
                keyboardType="decimal-pad"
                placeholder="5000"
                value={amountInput}
                onChangeText={setAmountInput}
              />
            </StyledWithdrawPanel>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <StyledWithdrawPanel>
              <StyledWithdrawSectionLabel>Destination account</StyledWithdrawSectionLabel>

              {savedAccounts.length > 0 ? (
                <StyledWithdrawAccountList>
                  {savedAccounts.map((account: any) => (
                    <StyledWithdrawSelectable
                      key={account.id}
                      selected={selectedAccountId === account.id}
                      onPress={() => setSelectedAccountId(account.id)}
                    >
                      <StyledWithdrawLine>{account.bankName}</StyledWithdrawLine>
                      <StyledWithdrawHint>{account.accountName} · {account.accountNumberMasked}</StyledWithdrawHint>
                    </StyledWithdrawSelectable>
                  ))}
                </StyledWithdrawAccountList>
              ) : null}

              <StyledWithdrawSelectable
                selected={selectedAccountId === NEW_ACCOUNT}
                onPress={() => setSelectedAccountId(NEW_ACCOUNT)}
              >
                <StyledWithdrawLine>Use another bank account</StyledWithdrawLine>
                <StyledWithdrawHint>Enter account number manually</StyledWithdrawHint>
              </StyledWithdrawSelectable>
            </StyledWithdrawPanel>
          </CardContent>
        </Card>

        {selectedAccountId === NEW_ACCOUNT ? (
          <Card>
            <CardContent>
              <StyledWithdrawPanel>
                <StyledWithdrawSectionLabel>Bank details</StyledWithdrawSectionLabel>
                <NativeSelect value={bankCode} onValueChange={(value) => setBankCode(String(value))}>
                  {supportedBanks.map((bank: any) => (
                    <NativeSelectOption key={bank.code} value={bank.code}>
                      {bank.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>

                <Input
                  keyboardType="number-pad"
                  placeholder="Account number"
                  maxLength={10}
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                />

                <StyledWithdrawSaveRow>
                  <Checkbox checked={saveAccount} onCheckedChange={setSaveAccount} />
                  <StyledWithdrawHint>Save this account for next withdrawal</StyledWithdrawHint>
                </StyledWithdrawSaveRow>
              </StyledWithdrawPanel>
            </CardContent>
          </Card>
        ) : null}

        <Button fullWidth onPress={submit} disabled={submitting}>
          {submitting ? "Submitting..." : "Withdraw"}
        </Button>

      </StyledWithdrawRoot>
    </ScreenShell>
  );
}
