import React from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Card, CardContent, Input } from "@/components/ui";
import
    {
        CreateKycUploadUrlMutation,
        CreateKycUploadUrlMutationVariables,
        MyKycStatusQuery,
        MyKycStatusQueryVariables,
        StartNinFaceVerificationMutation,
        StartNinFaceVerificationMutationVariables,
        StartPhoneVerificationMutation,
        StartPhoneVerificationMutationVariables,
        StartVehiclePlateVerificationMutation,
        StartVehiclePlateVerificationMutationVariables,
        StartVehicleVinVerificationMutation,
        StartVehicleVinVerificationMutationVariables,
    } from "@/gql/graphql";
import
    {
        CREATE_KYC_UPLOAD_URL_MUTATION,
        MY_KYC_STATUS_QUERY,
        START_NIN_FACE_VERIFICATION_MUTATION,
        START_PHONE_VERIFICATION_MUTATION,
        START_VEHICLE_PLATE_VERIFICATION_MUTATION,
        START_VEHICLE_VIN_VERIFICATION_MUTATION,
    } from "@/graphql";
import { showBackendErrorToast, showErrorToast, showToast } from "@/lib/toast";
import { formatEnumLabel } from "@/utils/format";
import
    {
        StyledKycUploadHint,
        StyledKycUploadRoot,
        StyledKycUploadSection,
        StyledKycUploadSectionLabel,
    } from "@/styles/tabs/accounts";

type SelfieAsset = {
    uri: string;
    fileName: string;
    mimeType: string;
    fileSize?: number;
};

export default function KycUploadScreen()
{
    const router = useRouter();
    const [nin, setNin] = React.useState("");
    const [dateOfBirth, setDateOfBirth] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [plateNumber, setPlateNumber] = React.useState("");
    const [vin, setVin] = React.useState("");
    const [selfie, setSelfie] = React.useState<SelfieAsset | null>(null);
    const [ninLoading, setNinLoading] = React.useState(false);
    const [phoneLoading, setPhoneLoading] = React.useState(false);
    const [plateLoading, setPlateLoading] = React.useState(false);
    const [vinLoading, setVinLoading] = React.useState(false);

    const { data, refetch } = useQuery<MyKycStatusQuery, MyKycStatusQueryVariables>(MY_KYC_STATUS_QUERY, {
        fetchPolicy: "cache-and-network",
        errorPolicy: "all",
    });

    const [createUploadUrl] = useMutation<
        CreateKycUploadUrlMutation,
        CreateKycUploadUrlMutationVariables
    >(CREATE_KYC_UPLOAD_URL_MUTATION);
    const [startNinFaceVerification] = useMutation<
        StartNinFaceVerificationMutation,
        StartNinFaceVerificationMutationVariables
    >(START_NIN_FACE_VERIFICATION_MUTATION);
    const [startPhoneVerification] = useMutation<
        StartPhoneVerificationMutation,
        StartPhoneVerificationMutationVariables
    >(START_PHONE_VERIFICATION_MUTATION);
    const [startVehiclePlateVerification] = useMutation<
        StartVehiclePlateVerificationMutation,
        StartVehiclePlateVerificationMutationVariables
    >(START_VEHICLE_PLATE_VERIFICATION_MUTATION);
    const [startVehicleVinVerification] = useMutation<
        StartVehicleVinVerificationMutation,
        StartVehicleVinVerificationMutationVariables
    >(START_VEHICLE_VIN_VERIFICATION_MUTATION);

    const pickSelfie = async () =>
    {
        try
        {
            const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!mediaPermission.granted)
            {
                showErrorToast("Media library permission is required to select a selfie.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.8,
            });

            if (result.canceled || !result.assets?.length)
            {
                return;
            }

            const asset = result.assets[0];
            setSelfie({
                uri: asset.uri,
                fileName: asset.fileName ?? `selfie-${Date.now()}.jpg`,
                mimeType: asset.mimeType ?? "image/jpeg",
                fileSize: asset.fileSize,
            });

            showToast({
                tone: "success",
                title: "Selfie selected",
                message: "Ready to run NIN + face verification.",
                dedupeKey: "kyc-selfie-selected",
            });
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to select selfie.", {
                title: "Selfie Error",
                dedupeKey: "kyc-selfie-select-error",
            });
        }
    };

    const uploadSelfie = async (uploadUrl: string, asset: SelfieAsset) =>
    {
        const fileResponse = await fetch(asset.uri);
        const blob = await fileResponse.blob();

        const uploadResponse = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": asset.mimeType,
            },
            body: blob,
        });

        if (!uploadResponse.ok)
        {
            throw new Error("Selfie upload failed");
        }
    };

    const handleNinFaceVerification = async () =>
    {
        if (!/^\d{11}$/.test(nin.trim()))
        {
            showErrorToast("NIN must be 11 digits.");
            return;
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth.trim()))
        {
            showErrorToast("Date of birth must be in YYYY-MM-DD format.");
            return;
        }

        if (!selfie)
        {
            showErrorToast("Select a selfie image first.");
            return;
        }

        setNinLoading(true);

        try
        {
            const upload = await createUploadUrl({
                variables: {
                    input: {
                        fileName: selfie.fileName,
                        mimeType: selfie.mimeType,
                        sizeBytes: selfie.fileSize ? String(selfie.fileSize) : undefined,
                    },
                },
            });

            const uploadPayload = upload.data?.createKycUploadUrl;
            if (!uploadPayload?.mediaId || !uploadPayload.uploadUrl)
            {
                throw new Error("Upload URL was not returned");
            }

            await uploadSelfie(uploadPayload.uploadUrl, selfie);

            await startNinFaceVerification({
                variables: {
                    input: {
                        faceMediaId: uploadPayload.mediaId,
                        numberNin: nin.trim(),
                        dateOfBirth: dateOfBirth.trim(),
                    },
                },
            });

            await refetch();

            showToast({
                tone: "success",
                title: "NIN + Face submitted",
                message: "Verification request has been sent to Prembly.",
                dedupeKey: "kyc-nin-face-success",
            });
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to start NIN + face verification.", {
                title: "NIN + Face Error",
                dedupeKey: "kyc-nin-face-error",
            });
        } finally
        {
            setNinLoading(false);
        }
    };

    const handlePhoneVerification = async () =>
    {
        if (!phoneNumber.trim())
        {
            showErrorToast("Phone number is required.");
            return;
        }

        setPhoneLoading(true);
        try
        {
            await startPhoneVerification({
                variables: {
                    input: {
                        phoneNumber: phoneNumber.trim(),
                    },
                },
            });

            await refetch();
            showToast({
                tone: "success",
                title: "Phone verification submitted",
                message: "Phone check has been sent to Prembly.",
                dedupeKey: "kyc-phone-success",
            });
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to start phone verification.", {
                title: "Phone Verification Error",
                dedupeKey: "kyc-phone-error",
            });
        } finally
        {
            setPhoneLoading(false);
        }
    };

    const handlePlateVerification = async () =>
    {
        if (!plateNumber.trim())
        {
            showErrorToast("Plate number is required.");
            return;
        }

        setPlateLoading(true);
        try
        {
            await startVehiclePlateVerification({
                variables: {
                    input: {
                        plateNumber: plateNumber.trim().toUpperCase(),
                    },
                },
            });

            await refetch();
            showToast({
                tone: "success",
                title: "Plate verification submitted",
                message: "Vehicle plate check has been sent to Prembly.",
                dedupeKey: "kyc-plate-success",
            });
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to start plate verification.", {
                title: "Plate Verification Error",
                dedupeKey: "kyc-plate-error",
            });
        } finally
        {
            setPlateLoading(false);
        }
    };

    const handleVinVerification = async () =>
    {
        if (!vin.trim())
        {
            showErrorToast("VIN is required.");
            return;
        }

        setVinLoading(true);
        try
        {
            await startVehicleVinVerification({
                variables: {
                    input: {
                        vin: vin.trim().toUpperCase(),
                    },
                },
            });

            await refetch();
            showToast({
                tone: "success",
                title: "VIN verification submitted",
                message: "Vehicle VIN check has been sent to Prembly.",
                dedupeKey: "kyc-vin-success",
            });
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to start VIN verification.", {
                title: "VIN Verification Error",
                dedupeKey: "kyc-vin-error",
            });
        } finally
        {
            setVinLoading(false);
        }
    };

    const status = data?.myKycStatus;

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledKycUploadRoot>
                <Card>
                    <CardContent>
                        <StyledKycUploadSection>
                            <StyledKycUploadSectionLabel>KYC summary</StyledKycUploadSectionLabel>
                            <StyledKycUploadHint>Overall: {formatEnumLabel(status?.overallStatus)}</StyledKycUploadHint>
                            <StyledKycUploadHint>Level: {status?.kycLevel ?? 0}</StyledKycUploadHint>
                            <StyledKycUploadHint>NIN: {formatEnumLabel(status?.ninStatus)}</StyledKycUploadHint>
                            <StyledKycUploadHint>Face: {formatEnumLabel(status?.faceStatus)}</StyledKycUploadHint>
                            <StyledKycUploadHint>Phone: {formatEnumLabel(status?.phoneStatus)}</StyledKycUploadHint>
                            <StyledKycUploadHint>Plate: {formatEnumLabel(status?.vehiclePlateStatus)}</StyledKycUploadHint>
                            <StyledKycUploadHint>VIN: {formatEnumLabel(status?.vehicleVinStatus)}</StyledKycUploadHint>
                            <StyledKycUploadHint>
                                Last check: {status?.lastCheckAt ? new Date(String(status.lastCheckAt)).toLocaleString() : "-"}
                            </StyledKycUploadHint>
                            <Button
                                fullWidth
                                variant="outline"
                                onPress={() => router.push("/account/kyc-status" as never)}
                            >
                                Open KYC status
                            </Button>
                        </StyledKycUploadSection>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <StyledKycUploadSection>
                            <StyledKycUploadSectionLabel>NIN + Face verification</StyledKycUploadSectionLabel>
                            <Input
                                placeholder="NIN (11 digits)"
                                keyboardType="number-pad"
                                value={nin}
                                onChangeText={setNin}
                            />
                            <Input
                                placeholder="Date of birth (YYYY-MM-DD)"
                                value={dateOfBirth}
                                onChangeText={setDateOfBirth}
                            />
                            <Button fullWidth variant="outline" onPress={() => void pickSelfie()}>
                                {selfie ? `Selfie selected: ${selfie.fileName}` : "Select selfie"}
                            </Button>
                            <Button fullWidth onPress={() => void handleNinFaceVerification()} disabled={ninLoading}>
                                {ninLoading ? "Submitting..." : "Start NIN + Face verification"}
                            </Button>
                        </StyledKycUploadSection>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <StyledKycUploadSection>
                            <StyledKycUploadSectionLabel>Phone verification</StyledKycUploadSectionLabel>
                            <Input
                                placeholder="Phone number (e.g. 08012345678)"
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                            <Button fullWidth onPress={() => void handlePhoneVerification()} disabled={phoneLoading}>
                                {phoneLoading ? "Submitting..." : "Start Phone verification"}
                            </Button>
                        </StyledKycUploadSection>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <StyledKycUploadSection>
                            <StyledKycUploadSectionLabel>Vehicle checks</StyledKycUploadSectionLabel>
                            <Input
                                placeholder="Plate number (e.g. ABC123XY)"
                                autoCapitalize="characters"
                                value={plateNumber}
                                onChangeText={setPlateNumber}
                            />
                            <Button fullWidth onPress={() => void handlePlateVerification()} disabled={plateLoading}>
                                {plateLoading ? "Submitting..." : "Start Plate verification"}
                            </Button>

                            <Input
                                placeholder="VIN"
                                autoCapitalize="characters"
                                value={vin}
                                onChangeText={setVin}
                            />
                            <Button fullWidth variant="outline" onPress={() => void handleVinVerification()} disabled={vinLoading}>
                                {vinLoading ? "Submitting..." : "Start VIN verification"}
                            </Button>
                        </StyledKycUploadSection>
                    </CardContent>
                </Card>
            </StyledKycUploadRoot>
        </ScreenShell>
    );
}
