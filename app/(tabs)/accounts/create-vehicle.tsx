import React from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";

import { ScreenShell } from "@/components/ui/ScreenShell";
import { Button, Card, CardContent, Input } from "@/components/ui";
import
{
    CreateVehicleMutation,
    CreateVehicleMutationVariables,
    VehicleCategory,
} from "@/gql/graphql";
import { CREATE_VEHICLE_MUTATION, GET_PROVIDER_DASHBOARD_QUARY } from "@/graphql";
import { showBackendErrorToast, showErrorToast, showToast } from "@/lib/toast";
import
{
    StyledCreateVehicleCategoryOption,
    StyledCreateVehicleCategoryOptionText,
    StyledCreateVehicleCategoryRow,
    StyledCreateVehicleForm,
    StyledCreateVehicleLabel,
    StyledCreateVehicleRoot,
    StyledCreateVehicleSectionLabel,
} from "@/styles/tabs/accounts";

const VEHICLE_OPTIONS = [
    { label: "Bike", value: VehicleCategory.Bike },
    { label: "Van", value: VehicleCategory.Van },
    { label: "Truck", value: VehicleCategory.Truck },
] as const;

type VehicleCategoryValue = (typeof VEHICLE_OPTIONS)[number]["value"];

export default function CreateVehicleScreen()
{
    const router = useRouter();
    const [category, setCategory] = React.useState<VehicleCategoryValue>(VehicleCategory.Truck);
    const [plateNumber, setPlateNumber] = React.useState("");
    const [vin, setVin] = React.useState("");
    const [make, setMake] = React.useState("");
    const [model, setModel] = React.useState("");
    const [color, setColor] = React.useState("");
    const [capacityKg, setCapacityKg] = React.useState("");
    const [capacityVolumeCm3, setCapacityVolumeCm3] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);

    const [createVehicle] = useMutation<CreateVehicleMutation, CreateVehicleMutationVariables>(
        CREATE_VEHICLE_MUTATION,
    );

    const handleCreateVehicle = async () =>
    {
        const capacityKgValue = capacityKg.trim();
        const capacityVolumeValue = capacityVolumeCm3.trim();

        if (capacityKgValue && !/^\d+$/.test(capacityKgValue))
        {
            showErrorToast("Capacity (kg) must be a positive integer.");
            return;
        }

        if (capacityVolumeValue && !/^\d+$/.test(capacityVolumeValue))
        {
            showErrorToast("Capacity volume must be a positive integer.");
            return;
        }

        setSubmitting(true);

        try
        {
            await createVehicle({
                variables: {
                    input: {
                        category,
                        plateNumber: plateNumber.trim() || undefined,
                        vin: vin.trim() || undefined,
                        make: make.trim() || undefined,
                        model: model.trim() || undefined,
                        color: color.trim() || undefined,
                        capacityKg: capacityKgValue ? Number(capacityKgValue) : undefined,
                        capacityVolumeCm3: capacityVolumeValue || undefined,
                    },
                },
                refetchQueries: [{ query: GET_PROVIDER_DASHBOARD_QUARY }],
                awaitRefetchQueries: true,
            });

            showToast({
                tone: "success",
                title: "Vehicle Saved",
                message: "Your active vehicle record has been updated.",
                dedupeKey: "account-create-vehicle-success",
            });

            router.replace("/accounts/manage-vehicles" as never);
        } catch (error)
        {
            showBackendErrorToast(error, "Unable to save vehicle.", {
                title: "Create Vehicle Error",
                dedupeKey: "account-create-vehicle-mutation",
            });
        } finally
        {
            setSubmitting(false);
        }
    };

    return (
        <ScreenShell contentJustify="flex-start">
            <StyledCreateVehicleRoot>
                <Card>
                    <CardContent>
                        <StyledCreateVehicleForm>
                            <StyledCreateVehicleSectionLabel>Update vehicle</StyledCreateVehicleSectionLabel>

                            <StyledCreateVehicleLabel>Vehicle category</StyledCreateVehicleLabel>
                            <StyledCreateVehicleCategoryRow>
                                {VEHICLE_OPTIONS.map((option) =>
                                {
                                    const isActive = category === option.value;

                                    return (
                                        <StyledCreateVehicleCategoryOption
                                            key={option.value}
                                            $active={isActive}
                                            onPress={() => setCategory(option.value)}
                                        >
                                            <StyledCreateVehicleCategoryOptionText $active={isActive}>
                                                {option.label}
                                            </StyledCreateVehicleCategoryOptionText>
                                        </StyledCreateVehicleCategoryOption>
                                    );
                                })}
                            </StyledCreateVehicleCategoryRow>

                            <StyledCreateVehicleLabel>Plate number</StyledCreateVehicleLabel>
                            <Input
                                placeholder="e.g. KJA-123-AB"
                                autoCapitalize="characters"
                                value={plateNumber}
                                onChangeText={setPlateNumber}
                            />

                            <StyledCreateVehicleLabel>VIN</StyledCreateVehicleLabel>
                            <Input
                                placeholder="VIN (optional)"
                                autoCapitalize="characters"
                                value={vin}
                                onChangeText={setVin}
                            />

                            <StyledCreateVehicleLabel>Make</StyledCreateVehicleLabel>
                            <Input placeholder="e.g. Toyota" value={make} onChangeText={setMake} />

                            <StyledCreateVehicleLabel>Model</StyledCreateVehicleLabel>
                            <Input placeholder="e.g. Hiace" value={model} onChangeText={setModel} />

                            <StyledCreateVehicleLabel>Color</StyledCreateVehicleLabel>
                            <Input placeholder="e.g. White" value={color} onChangeText={setColor} />

                            <StyledCreateVehicleLabel>Capacity (kg)</StyledCreateVehicleLabel>
                            <Input
                                placeholder="e.g. 1500"
                                keyboardType="number-pad"
                                value={capacityKg}
                                onChangeText={setCapacityKg}
                            />

                            <StyledCreateVehicleLabel>Capacity volume (cm3)</StyledCreateVehicleLabel>
                            <Input
                                placeholder="e.g. 500000"
                                keyboardType="number-pad"
                                value={capacityVolumeCm3}
                                onChangeText={setCapacityVolumeCm3}
                            />

                            <Button fullWidth onPress={() => void handleCreateVehicle()} disabled={submitting}>
                                {submitting ? "Saving vehicle..." : "Save vehicle"}
                            </Button>
                        </StyledCreateVehicleForm>
                    </CardContent>
                </Card>
            </StyledCreateVehicleRoot>
        </ScreenShell>
    );
}
