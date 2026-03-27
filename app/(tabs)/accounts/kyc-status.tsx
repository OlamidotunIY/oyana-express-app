import React from "react";
import { useQuery } from "@apollo/client/react";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Card, CardContent, Spinner } from "@/components/ui";
import
    {
        MyKycChecksQuery,
        MyKycChecksQueryVariables,
        MyKycStatusQuery,
        MyKycStatusQueryVariables,
    } from "@/gql/graphql";
import { MY_KYC_CHECKS_QUERY, MY_KYC_STATUS_QUERY } from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { formatEnumLabel } from "@/utils/format";
import
    {
        StyledKycStatusHint,
        StyledKycStatusList,
        StyledKycStatusListRow,
        StyledKycStatusLoadingWrap,
        StyledKycStatusRoot,
        StyledKycStatusSection,
        StyledKycStatusSectionLabel,
        StyledKycStatusTitle,
    } from "@/styles/tabs/accounts";

export default function KycStatusScreen()
{
    const {
        data: statusData,
        loading: statusLoading,
        error: statusError,
    } = useQuery<MyKycStatusQuery, MyKycStatusQueryVariables>(MY_KYC_STATUS_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const {
        data: checksData,
        loading: checksLoading,
        error: checksError,
    } = useQuery<MyKycChecksQuery, MyKycChecksQueryVariables>(MY_KYC_CHECKS_QUERY, {
        variables: {},
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    useBackendErrorToast(statusError ?? checksError, "Unable to load KYC status.", {
        title: "KYC Error",
        dedupeKey: "account-kyc-status-query",
    });

    const status = statusData?.myKycStatus;
    const checks = checksData?.myKycChecks ?? [];

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledKycStatusRoot>
                {(statusLoading || checksLoading) && !statusData && !checksData ? (
                    <Card>
                        <CardContent>
                            <StyledKycStatusLoadingWrap>
                                <Spinner size="small" />
                            </StyledKycStatusLoadingWrap>
                        </CardContent>
                    </Card>
                ) : null}

                <Card>
                    <CardContent>
                        <StyledKycStatusSection>
                            <StyledKycStatusSectionLabel>KYC summary</StyledKycStatusSectionLabel>
                            {!status ? (
                                <StyledKycStatusHint>No KYC profile has been initialized yet.</StyledKycStatusHint>
                            ) : (
                                <StyledKycStatusList>
                                    <StyledKycStatusListRow>
                                        <StyledKycStatusTitle>{formatEnumLabel(status.overallStatus)}</StyledKycStatusTitle>
                                        <StyledKycStatusHint>KYC level: {status.kycLevel}</StyledKycStatusHint>
                                        <StyledKycStatusHint>NIN: {formatEnumLabel(status.ninStatus)}</StyledKycStatusHint>
                                        <StyledKycStatusHint>Face: {formatEnumLabel(status.faceStatus)}</StyledKycStatusHint>
                                        <StyledKycStatusHint>Phone: {formatEnumLabel(status.phoneStatus)}</StyledKycStatusHint>
                                        <StyledKycStatusHint>Plate: {formatEnumLabel(status.vehiclePlateStatus)}</StyledKycStatusHint>
                                        <StyledKycStatusHint>VIN: {formatEnumLabel(status.vehicleVinStatus)}</StyledKycStatusHint>
                                        <StyledKycStatusHint>Masked NIN: {status.maskedNin ?? "-"}</StyledKycStatusHint>
                                        <StyledKycStatusHint>Masked Phone: {status.maskedPhone ?? "-"}</StyledKycStatusHint>
                                        <StyledKycStatusHint>Failure summary: {status.failureSummary ?? "-"}</StyledKycStatusHint>
                                        <StyledKycStatusHint>
                                            Last check: {status.lastCheckAt ? new Date(String(status.lastCheckAt)).toLocaleString() : "-"}
                                        </StyledKycStatusHint>
                                    </StyledKycStatusListRow>
                                </StyledKycStatusList>
                            )}
                        </StyledKycStatusSection>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <StyledKycStatusSection>
                            <StyledKycStatusSectionLabel>Verification history</StyledKycStatusSectionLabel>
                            {checks.length === 0 ? (
                                <StyledKycStatusHint>No verification checks found.</StyledKycStatusHint>
                            ) : (
                                <StyledKycStatusList>
                                    {checks.map((entry) => (
                                        <StyledKycStatusListRow key={entry.id}>
                                            <StyledKycStatusTitle>
                                                {formatEnumLabel(entry.checkType)} - {formatEnumLabel(entry.status)}
                                            </StyledKycStatusTitle>
                                            <StyledKycStatusHint>
                                                Created: {new Date(String(entry.createdAt)).toLocaleString()}
                                            </StyledKycStatusHint>
                                            <StyledKycStatusHint>{entry.message ?? "-"}</StyledKycStatusHint>
                                        </StyledKycStatusListRow>
                                    ))}
                                </StyledKycStatusList>
                            )}
                        </StyledKycStatusSection>
                    </CardContent>
                </Card>
            </StyledKycStatusRoot>
        </ScreenShell>
    );
}
