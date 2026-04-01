import { useMutation, useQuery } from "@apollo/client/react";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import styled, { useTheme } from "styled-components/native";

import { Button, Input, Spinner } from "@/components/ui";
import { ScreenShell } from "@/components/ui/ScreenShell";
import {
  AddDriverComplianceDocumentMutation,
  AddDriverComplianceDocumentMutationVariables,
  AppMode,
  CreateDriverDocumentUploadUrlMutation,
  CreateDriverDocumentUploadUrlMutationVariables,
  DriverComplianceDocumentType,
  DriverOnboardingStatus,
  DriverType,
  MeQuery,
  MeQueryVariables,
  MyDriverProfileQuery,
  MyDriverProfileQueryVariables,
  SaveDriverIdentityInfoMutation,
  SaveDriverIdentityInfoMutationVariables,
  SaveDriverPersonalInfoMutation,
  SaveDriverPersonalInfoMutationVariables,
  SaveDriverVehicleMutation,
  SaveDriverVehicleMutationVariables,
  SubmitDriverOnboardingMutation,
  SubmitDriverOnboardingMutationVariables,
  SwitchAppModeMutation,
  SwitchAppModeMutationVariables,
  VehicleCategory,
} from "@/gql/graphql";
import {
  ADD_DRIVER_COMPLIANCE_DOCUMENT_MUTATION,
  CREATE_DRIVER_DOCUMENT_UPLOAD_URL_MUTATION,
  ME_QUERY,
  MY_DRIVER_PROFILE_QUERY,
  SAVE_DRIVER_IDENTITY_INFO_MUTATION,
  SAVE_DRIVER_PERSONAL_INFO_MUTATION,
  SAVE_DRIVER_VEHICLE_MUTATION,
  SUBMIT_DRIVER_ONBOARDING_MUTATION,
  SWITCH_APP_MODE_MUTATION,
} from "@/graphql";
import { useBackendErrorToast } from "@/hooks/use-backend-error-toast";
import { hasDriverMode, isDriverMode, refetchCurrentUser } from "@/lib/session";
import { showBackendErrorToast, showToast } from "@/lib/toast";
import { useUserStore } from "@/store/userStore";

type PickedAsset = {
  fileName: string;
  fileSize?: number | null;
  mimeType: string;
  uri: string;
};

const DOCUMENT_TYPES = [
  {
    type: DriverComplianceDocumentType.DriverLicense,
    title: "Driver license",
    required: true,
  },
  {
    type: DriverComplianceDocumentType.IdentityDocument,
    title: "Identity document",
    required: true,
  },
  {
    type: DriverComplianceDocumentType.VehicleRegistration,
    title: "Vehicle registration",
    required: true,
  },
  {
    type: DriverComplianceDocumentType.Insurance,
    title: "Insurance",
    required: false,
  },
] as const;

function formatEnum(value?: string | null) {
  if (!value) return "Not set";
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function mapDriverTypeToVehicleCategory(driverType: DriverType) {
  if (driverType === DriverType.Truck) return VehicleCategory.Truck;
  if (driverType === DriverType.Van) return VehicleCategory.Van;
  return VehicleCategory.Bike;
}

async function pickImageAsset(allowsEditing = false): Promise<PickedAsset | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    showToast({
      title: "Driver onboarding",
      message: "Media library permission is required to upload documents.",
      tone: "error",
      dedupeKey: "driver-mode-media-permission",
    });
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing,
    aspect: allowsEditing ? [1, 1] : undefined,
    quality: 0.85,
  });

  if (result.canceled || !result.assets?.length) return null;

  const asset = result.assets[0];
  return {
    uri: asset.uri,
    fileName: asset.fileName ?? `driver-upload-${Date.now()}.jpg`,
    fileSize: asset.fileSize,
    mimeType: asset.mimeType ?? "image/jpeg",
  };
}

async function uploadFileToSignedUrl(uploadUrl: string, asset: PickedAsset) {
  const fileResponse = await fetch(asset.uri);
  const blob = await fileResponse.blob();
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": asset.mimeType },
    body: blob,
  });

  if (!uploadResponse.ok) {
    throw new Error("Document upload failed.");
  }
}

export default function DriverModeScreen() {
  const router = useRouter();
  const theme = useTheme();
  const storedUser = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [driverType, setDriverType] = React.useState<DriverType>(DriverType.Bike);
  const [vehicleCategory, setVehicleCategory] = React.useState<VehicleCategory>(VehicleCategory.Bike);
  const [legalFirstName, setLegalFirstName] = React.useState("");
  const [legalLastName, setLegalLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [selfieAsset, setSelfieAsset] = React.useState<PickedAsset | null>(null);
  const [licenseNumber, setLicenseNumber] = React.useState("");
  const [licenseExpiryAt, setLicenseExpiryAt] = React.useState("");
  const [identityType, setIdentityType] = React.useState("NIN");
  const [identityNumber, setIdentityNumber] = React.useState("");
  const [insurancePolicyNumber, setInsurancePolicyNumber] = React.useState("");
  const [plateNumber, setPlateNumber] = React.useState("");
  const [vehicleMake, setVehicleMake] = React.useState("");
  const [vehicleModel, setVehicleModel] = React.useState("");
  const [vehicleColor, setVehicleColor] = React.useState("");
  const [vin, setVin] = React.useState("");
  const [capacityKg, setCapacityKg] = React.useState("");
  const [capacityVolumeCm3, setCapacityVolumeCm3] = React.useState("");
  const [uploadingSelfie, setUploadingSelfie] = React.useState(false);
  const [uploadingDocumentType, setUploadingDocumentType] =
    React.useState<DriverComplianceDocumentType | null>(null);

  const { data: profileData, error: profileError, refetch: refetchProfile } = useQuery<
    MeQuery,
    MeQueryVariables
  >(ME_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const {
    data: driverProfileData,
    loading: driverProfileLoading,
    error: driverProfileError,
    refetch: refetchDriverProfile,
  } = useQuery<MyDriverProfileQuery, MyDriverProfileQueryVariables>(MY_DRIVER_PROFILE_QUERY, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const [createDriverDocumentUploadUrl] = useMutation<
    CreateDriverDocumentUploadUrlMutation,
    CreateDriverDocumentUploadUrlMutationVariables
  >(CREATE_DRIVER_DOCUMENT_UPLOAD_URL_MUTATION);
  const [saveDriverPersonalInfo, { loading: savingPersonal }] = useMutation<
    SaveDriverPersonalInfoMutation,
    SaveDriverPersonalInfoMutationVariables
  >(SAVE_DRIVER_PERSONAL_INFO_MUTATION);
  const [saveDriverIdentityInfo, { loading: savingIdentity }] = useMutation<
    SaveDriverIdentityInfoMutation,
    SaveDriverIdentityInfoMutationVariables
  >(SAVE_DRIVER_IDENTITY_INFO_MUTATION);
  const [saveDriverVehicle, { loading: savingVehicle }] = useMutation<
    SaveDriverVehicleMutation,
    SaveDriverVehicleMutationVariables
  >(SAVE_DRIVER_VEHICLE_MUTATION);
  const [addDriverComplianceDocument] = useMutation<
    AddDriverComplianceDocumentMutation,
    AddDriverComplianceDocumentMutationVariables
  >(ADD_DRIVER_COMPLIANCE_DOCUMENT_MUTATION);
  const [submitDriverOnboarding, { loading: submitting }] = useMutation<
    SubmitDriverOnboardingMutation,
    SubmitDriverOnboardingMutationVariables
  >(SUBMIT_DRIVER_ONBOARDING_MUTATION);
  const [switchAppMode, { loading: switchingMode }] = useMutation<
    SwitchAppModeMutation,
    SwitchAppModeMutationVariables
  >(SWITCH_APP_MODE_MUTATION);

  useBackendErrorToast(profileError, "Unable to load your account.", {
    title: "Driver Mode Error",
    dedupeKey: "driver-mode-profile-query",
  });
  useBackendErrorToast(driverProfileError, "Unable to load driver onboarding details.", {
    title: "Driver Mode Error",
    dedupeKey: "driver-mode-driver-profile-query",
  });

  const profile = profileData?.me ?? storedUser ?? null;
  const driverProfile = driverProfileData?.myDriverProfile ?? null;

  React.useEffect(() => {
    if (!driverProfile) return;
    const nextDriverType = driverProfile.driverType ?? DriverType.Bike;
    setDriverType(nextDriverType);
    setVehicleCategory(driverProfile.vehicle?.category ?? mapDriverTypeToVehicleCategory(nextDriverType));
    setLegalFirstName(driverProfile.legalFirstName ?? "");
    setLegalLastName(driverProfile.legalLastName ?? "");
    setDateOfBirth(driverProfile.dateOfBirth ? new Date(driverProfile.dateOfBirth).toISOString().slice(0, 10) : "");
    setLicenseNumber(driverProfile.licenseNumber ?? "");
    setLicenseExpiryAt(driverProfile.licenseExpiryAt ? new Date(driverProfile.licenseExpiryAt).toISOString().slice(0, 10) : "");
    setIdentityType(driverProfile.identityType ?? "NIN");
    setIdentityNumber(driverProfile.identityNumber ?? "");
    setInsurancePolicyNumber(driverProfile.insurancePolicyNumber ?? "");
    setPlateNumber(driverProfile.vehicle?.plateNumber ?? "");
    setVehicleMake(driverProfile.vehicle?.make ?? "");
    setVehicleModel(driverProfile.vehicle?.model ?? "");
    setVehicleColor(driverProfile.vehicle?.color ?? "");
    setVin(driverProfile.vehicle?.vin ?? "");
    setCapacityKg(driverProfile.vehicle?.capacityKg != null ? String(driverProfile.vehicle.capacityKg) : "");
    setCapacityVolumeCm3(
      driverProfile.vehicle?.capacityVolumeCm3 != null
        ? String(driverProfile.vehicle.capacityVolumeCm3)
        : "",
    );
  }, [driverProfile]);

  const syncAfterMutation = React.useCallback(async () => {
    const freshProfile = await refetchCurrentUser();
    if (freshProfile) setUser(freshProfile);
    await Promise.all([refetchDriverProfile(), refetchProfile()]);
  }, [refetchDriverProfile, refetchProfile, setUser]);

  const uploadDriverDocument = React.useCallback(
    async (asset: PickedAsset, documentType: DriverComplianceDocumentType) => {
      const uploadResponse = await createDriverDocumentUploadUrl({
        variables: {
          input: {
            documentType,
            fileName: asset.fileName,
            mimeType: asset.mimeType,
            sizeBytes: asset.fileSize != null ? String(asset.fileSize) : undefined,
          },
        },
      });

      const payload = uploadResponse.data?.createDriverDocumentUploadUrl;
      if (!payload?.uploadUrl) throw new Error("Upload URL was not returned.");
      await uploadFileToSignedUrl(payload.uploadUrl, asset);
      return payload;
    },
    [createDriverDocumentUploadUrl],
  );

  const handleSavePersonal = async () => {
    if (!legalFirstName.trim() || !legalLastName.trim() || !dateOfBirth.trim()) {
      showToast({
        title: "Driver onboarding",
        message: "Complete your legal name and date of birth before saving.",
        tone: "error",
        dedupeKey: "driver-mode-personal-required",
      });
      return;
    }

    try {
      setUploadingSelfie(true);
      let selfieStorageBucket = driverProfile?.selfieStorageBucket ?? undefined;
      let selfieStoragePath = driverProfile?.selfieStoragePath ?? undefined;

      if (selfieAsset) {
        const uploadedSelfie = await uploadDriverDocument(selfieAsset, DriverComplianceDocumentType.Selfie);
        selfieStorageBucket = uploadedSelfie.storageBucket;
        selfieStoragePath = uploadedSelfie.storagePath;
        await addDriverComplianceDocument({
          variables: {
            input: {
              documentType: DriverComplianceDocumentType.Selfie,
              storageBucket: uploadedSelfie.storageBucket,
              storagePath: uploadedSelfie.storagePath,
              mimeType: selfieAsset.mimeType,
              notes: "Driver selfie uploaded from mobile onboarding.",
            },
          },
        });
      }

      await saveDriverPersonalInfo({
        variables: {
          input: {
            driverType,
            legalFirstName: legalFirstName.trim(),
            legalLastName: legalLastName.trim(),
            dateOfBirth: dateOfBirth.trim(),
            selfieStorageBucket,
            selfieStoragePath,
          },
        },
      });

      setVehicleCategory(mapDriverTypeToVehicleCategory(driverType));
      setSelfieAsset(null);
      await syncAfterMutation();
      showToast({
        title: "Driver onboarding",
        message: "Personal information saved.",
        tone: "success",
        dedupeKey: "driver-mode-personal-saved",
      });
    } catch (error) {
      showBackendErrorToast(error, "Unable to save driver personal information.", {
        title: "Driver Mode Error",
        dedupeKey: "driver-mode-save-personal",
      });
    } finally {
      setUploadingSelfie(false);
    }
  };

  const handleSaveIdentity = async () => {
    if (!licenseNumber.trim() || !licenseExpiryAt.trim() || !identityType.trim() || !identityNumber.trim()) {
      showToast({
        title: "Driver onboarding",
        message: "Complete your license and identity details before saving.",
        tone: "error",
        dedupeKey: "driver-mode-identity-required",
      });
      return;
    }

    try {
      await saveDriverIdentityInfo({
        variables: {
          input: {
            licenseNumber: licenseNumber.trim(),
            licenseExpiryAt: licenseExpiryAt.trim(),
            identityType: identityType.trim(),
            identityNumber: identityNumber.trim(),
            insurancePolicyNumber: insurancePolicyNumber.trim() || undefined,
          },
        },
      });
      await syncAfterMutation();
      showToast({
        title: "Driver onboarding",
        message: "Identity information saved.",
        tone: "success",
        dedupeKey: "driver-mode-identity-saved",
      });
    } catch (error) {
      showBackendErrorToast(error, "Unable to save identity information.", {
        title: "Driver Mode Error",
        dedupeKey: "driver-mode-save-identity",
      });
    }
  };

  const handleSaveVehicle = async () => {
    const parsedCapacityKg = Number.parseInt(capacityKg.trim(), 10);
    const parsedCapacityVolume = capacityVolumeCm3.trim()
      ? Number.parseInt(capacityVolumeCm3.trim(), 10)
      : undefined;

    if (!plateNumber.trim() || Number.isNaN(parsedCapacityKg) || parsedCapacityKg <= 0) {
      showToast({
        title: "Driver onboarding",
        message: "Add a plate number and a valid carrying capacity before saving.",
        tone: "error",
        dedupeKey: "driver-mode-vehicle-required",
      });
      return;
    }

    try {
      await saveDriverVehicle({
        variables: {
          input: {
            category: vehicleCategory,
            plateNumber: plateNumber.trim().toUpperCase(),
            vin: vin.trim() || undefined,
            make: vehicleMake.trim() || undefined,
            model: vehicleModel.trim() || undefined,
            color: vehicleColor.trim() || undefined,
            capacityKg: parsedCapacityKg,
            capacityVolumeCm3:
              parsedCapacityVolume != null && !Number.isNaN(parsedCapacityVolume)
                ? String(parsedCapacityVolume)
                : undefined,
          },
        },
      });
      await syncAfterMutation();
      showToast({
        title: "Driver onboarding",
        message: "Vehicle information saved.",
        tone: "success",
        dedupeKey: "driver-mode-vehicle-saved",
      });
    } catch (error) {
      showBackendErrorToast(error, "Unable to save vehicle details.", {
        title: "Driver Mode Error",
        dedupeKey: "driver-mode-save-vehicle",
      });
    }
  };

  const handleUploadDocument = async (documentType: DriverComplianceDocumentType) => {
    const asset = await pickImageAsset(false);
    if (!asset) return;

    try {
      setUploadingDocumentType(documentType);
      const uploadedDocument = await uploadDriverDocument(asset, documentType);
      await addDriverComplianceDocument({
        variables: {
          input: {
            documentType,
            storageBucket: uploadedDocument.storageBucket,
            storagePath: uploadedDocument.storagePath,
            mimeType: asset.mimeType,
            notes: "Uploaded from the mobile driver onboarding flow.",
          },
        },
      });
      await syncAfterMutation();
      showToast({
        title: "Driver onboarding",
        message: `${formatEnum(documentType)} uploaded successfully.`,
        tone: "success",
        dedupeKey: `driver-mode-document-${documentType}`,
      });
    } catch (error) {
      showBackendErrorToast(error, "Unable to upload the document.", {
        title: "Driver Mode Error",
        dedupeKey: `driver-mode-upload-${documentType}`,
      });
    } finally {
      setUploadingDocumentType(null);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitDriverOnboarding({
        variables: {
          input: {
            activateDriverMode: true,
          },
        },
      });
      await syncAfterMutation();
      showToast({
        title: "Driver onboarding",
        message:
          "Your onboarding has been submitted for review. Driver mode will unlock after approval.",
        tone: "success",
        dedupeKey: "driver-mode-submit",
      });
    } catch (error) {
      showBackendErrorToast(
        error,
        "Unable to submit driver onboarding. Make sure all required documents are uploaded first.",
        {
          title: "Driver Mode Error",
          dedupeKey: "driver-mode-submit-error",
        },
      );
    }
  };

  const handleSwitchMode = async (mode: AppMode) => {
    try {
      const { data } = await switchAppMode({
        variables: { input: { mode } },
      });

      if (data?.switchAppMode) setUser(data.switchAppMode);
      await syncAfterMutation();
      router.replace("/(tabs)" as never);
    } catch (error) {
      showBackendErrorToast(error, "Unable to switch app mode right now.", {
        title: "Driver Mode Error",
        dedupeKey: `driver-mode-switch-${mode}`,
      });
    }
  };

  const loading = driverProfileLoading && !driverProfile;
  const status = driverProfile?.onboardingStatus ?? DriverOnboardingStatus.NotStarted;
  const uploadedDocumentTypes = new Set(
    driverProfile?.complianceDocuments.map((document) => document.type) ?? [],
  );
  const hasUploadedSelfie =
    Boolean(driverProfile?.selfieStoragePath) ||
    uploadedDocumentTypes.has(DriverComplianceDocumentType.Selfie) ||
    Boolean(selfieAsset);
  const canSwitchToDriver =
    hasDriverMode(profile) &&
    !isDriverMode(profile) &&
    status === DriverOnboardingStatus.Approved;

  return (
    <ScreenShell contentJustify="flex-start">
      <StyledRoot>
        <StyledCard $hero>
          <Text
            style={{
              color: theme.colors.heroChipForeground,
              fontSize: theme.typography.xs,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            Driver mode
          </Text>
          <Text
            style={{
              color: theme.colors.heroForeground,
              fontSize: theme.typography.lg,
              fontWeight: "700",
            }}
          >
            Use one account for shipping and driving
          </Text>
          <Text
            style={{
              color: theme.colors.heroForeground,
              fontSize: theme.typography.sm,
              lineHeight: 20,
            }}
          >
            Your shipper details stay separate from your driver verification
            details. Current onboarding status: {formatEnum(status)}.
          </Text>
        </StyledCard>

        {loading ? (
          <StyledCard>
            <Spinner size="small" />
          </StyledCard>
        ) : null}

        {driverProfile?.rejectionReason ? (
          <StyledCard>
            <StyledTitle>Review notes</StyledTitle>
            <StyledBody>{driverProfile.rejectionReason}</StyledBody>
          </StyledCard>
        ) : null}

        <StyledCard>
          <StyledTitle>1. Personal information</StyledTitle>
          <StyledBody>Choose the driver type and save the legal details used for verification.</StyledBody>
          <StyledChipRow>
            {[
              { label: "Bike", value: DriverType.Bike },
              { label: "Van", value: DriverType.Van },
              { label: "Truck", value: DriverType.Truck },
            ].map((option) => (
              <StyledChip
                key={option.value}
                $active={driverType === option.value}
                onPress={() => {
                  setDriverType(option.value);
                  setVehicleCategory(mapDriverTypeToVehicleCategory(option.value));
                }}
              >
                <StyledChipText $active={driverType === option.value}>
                  {option.label}
                </StyledChipText>
              </StyledChip>
            ))}
          </StyledChipRow>
          <StyledLabel>Legal first name</StyledLabel>
          <Input value={legalFirstName} onChangeText={setLegalFirstName} placeholder="John" />
          <StyledLabel>Legal last name</StyledLabel>
          <Input value={legalLastName} onChangeText={setLegalLastName} placeholder="Doe" />
          <StyledLabel>Date of birth</StyledLabel>
          <Input value={dateOfBirth} onChangeText={setDateOfBirth} placeholder="YYYY-MM-DD" />
          <StyledLabel>Selfie / profile photo</StyledLabel>
          <View style={{ gap: 8 }}>
            <StyledBody>
              {selfieAsset?.fileName ??
                (hasUploadedSelfie ? "Selfie already uploaded." : "Pick a clear front-facing selfie.")}
            </StyledBody>
            <Button variant="outline" onPress={() => void pickImageAsset(true).then((asset) => asset && setSelfieAsset(asset))}>
              Pick image
            </Button>
          </View>
          <Button fullWidth onPress={() => void handleSavePersonal()} disabled={savingPersonal || uploadingSelfie}>
            {savingPersonal || uploadingSelfie ? "Saving..." : "Save personal information"}
          </Button>
        </StyledCard>

        <StyledCard>
          <StyledTitle>2. Identity and license</StyledTitle>
          <StyledBody>These details are used only for your driver verification.</StyledBody>
          <StyledLabel>License number</StyledLabel>
          <Input value={licenseNumber} onChangeText={setLicenseNumber} placeholder="Driver license number" />
          <StyledLabel>License expiry</StyledLabel>
          <Input value={licenseExpiryAt} onChangeText={setLicenseExpiryAt} placeholder="YYYY-MM-DD" />
          <StyledLabel>Identity type</StyledLabel>
          <Input value={identityType} onChangeText={setIdentityType} placeholder="NIN, passport, national ID" />
          <StyledLabel>Identity number</StyledLabel>
          <Input value={identityNumber} onChangeText={setIdentityNumber} placeholder="Identity number" />
          <StyledLabel>Insurance policy number</StyledLabel>
          <Input value={insurancePolicyNumber} onChangeText={setInsurancePolicyNumber} placeholder="Optional" />
          <Button fullWidth onPress={() => void handleSaveIdentity()} disabled={savingIdentity}>
            {savingIdentity ? "Saving..." : "Save identity information"}
          </Button>
        </StyledCard>

        <StyledCard>
          <StyledTitle>3. Vehicle information</StyledTitle>
          <StyledBody>Van and truck drivers can access freight after approval. Bike drivers stay dispatch-only.</StyledBody>
          <StyledChipRow>
            {[VehicleCategory.Bike, VehicleCategory.Van, VehicleCategory.Truck].map((option) => (
              <StyledChip key={option} $active={vehicleCategory === option} onPress={() => setVehicleCategory(option)}>
                <StyledChipText $active={vehicleCategory === option}>
                  {formatEnum(option)}
                </StyledChipText>
              </StyledChip>
            ))}
          </StyledChipRow>
          <StyledLabel>Plate number</StyledLabel>
          <Input value={plateNumber} onChangeText={setPlateNumber} placeholder="ABC-123XY" autoCapitalize="characters" />
          <StyledLabel>Vehicle make</StyledLabel>
          <Input value={vehicleMake} onChangeText={setVehicleMake} placeholder="Toyota" />
          <StyledLabel>Vehicle model</StyledLabel>
          <Input value={vehicleModel} onChangeText={setVehicleModel} placeholder="Hiace" />
          <StyledLabel>Vehicle color</StyledLabel>
          <Input value={vehicleColor} onChangeText={setVehicleColor} placeholder="White" />
          <StyledLabel>VIN</StyledLabel>
          <Input value={vin} onChangeText={setVin} placeholder="Optional VIN" />
          <StyledLabel>Capacity (kg)</StyledLabel>
          <Input value={capacityKg} onChangeText={setCapacityKg} placeholder="100" keyboardType="number-pad" />
          <StyledLabel>Capacity volume (cm3)</StyledLabel>
          <Input value={capacityVolumeCm3} onChangeText={setCapacityVolumeCm3} placeholder="Optional" keyboardType="number-pad" />
          <Button fullWidth onPress={() => void handleSaveVehicle()} disabled={savingVehicle}>
            {savingVehicle ? "Saving..." : "Save vehicle information"}
          </Button>
        </StyledCard>

        <StyledCard>
          <StyledTitle>4. Compliance documents</StyledTitle>
          <StyledBody>Upload the required documents for review.</StyledBody>
          {DOCUMENT_TYPES.map((document) => {
            const uploadedDocument = driverProfile?.complianceDocuments.find((item) => item.type === document.type);
            const isUploading = uploadingDocumentType === document.type;
            return (
              <View key={document.type} style={{ gap: 8, marginTop: 8 }}>
                <Text style={{ color: theme.colors.foreground, fontWeight: "700" }}>{document.title}</Text>
                <Text style={{ color: theme.colors.mutedForeground, fontSize: theme.typography.xs }}>
                  {uploadedDocument ? `Status: ${formatEnum(uploadedDocument.status)}` : document.required ? "Required for submission." : "Optional for now."}
                </Text>
                <Button
                  fullWidth
                  variant="outline"
                  onPress={() => void handleUploadDocument(document.type)}
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : uploadedDocument ? "Replace document" : "Upload document"}
                </Button>
              </View>
            );
          })}
        </StyledCard>

        <StyledCard>
          <StyledTitle>5. Submit and activate</StyledTitle>
          <StyledBody>
            Selfie: {hasUploadedSelfie ? "Ready" : "Missing"}{"\n"}
            Required documents: {DOCUMENT_TYPES.filter((document) => document.required && uploadedDocumentTypes.has(document.type)).length}/3 uploaded
          </StyledBody>
          {status === DriverOnboardingStatus.InReview ? (
            <Button fullWidth disabled>
              Onboarding under review
            </Button>
          ) : canSwitchToDriver ? (
            <Button fullWidth onPress={() => void handleSwitchMode(AppMode.Driver)} disabled={switchingMode}>
              {switchingMode ? "Switching..." : "Switch to driver mode"}
            </Button>
          ) : (
            <Button fullWidth onPress={() => void handleSubmit()} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit for review"}
            </Button>
          )}
          {profile?.currentMode === AppMode.Driver ? (
            <Button fullWidth variant="outline" onPress={() => void handleSwitchMode(AppMode.Shipper)} disabled={switchingMode}>
              {switchingMode ? "Switching..." : "Back to shipper mode"}
            </Button>
          ) : null}
        </StyledCard>
      </StyledRoot>
    </ScreenShell>
  );
}

const StyledRoot = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
`;

const StyledCard = styled.View<{ $hero?: boolean }>`
  gap: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.radii.xl}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ theme, $hero }) => ($hero ? "transparent" : theme.colors.border)};
  background-color: ${({ theme, $hero }) => ($hero ? theme.colors.heroSurface : theme.colors.card)};
  align-items: ${({ $hero }) => ($hero ? "flex-start" : "stretch")};
`;

const StyledTitle = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.md}px;
  font-weight: 700;
`;

const StyledBody = styled.Text`
  color: ${({ theme }) => theme.colors.mutedForeground};
  font-size: ${({ theme }) => theme.typography.sm}px;
  line-height: 20px;
`;

const StyledLabel = styled.Text`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
  text-transform: uppercase;
`;

const StyledChipRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const StyledChip = styled.Pressable<{ $active: boolean }>`
  border-radius: ${({ theme }) => theme.radii.full}px;
  border-width: ${({ theme }) => theme.borderWidths.thin}px;
  border-color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ $active, theme }) => ($active ? "rgba(255, 106, 0, 0.12)" : theme.colors.background)};
  padding-vertical: ${({ theme }) => theme.spacing.xs}px;
  padding-horizontal: ${({ theme }) => theme.spacing.md}px;
`;

const StyledChipText = styled.Text<{ $active: boolean }>`
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.mutedForeground)};
  font-size: ${({ theme }) => theme.typography.xs}px;
  font-weight: 700;
`;
