import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

function getParamValue(value: string | string[] | undefined): string | undefined
{
    if (!value) return undefined;
    return Array.isArray(value) ? value[0] : value;
}

export default function ConfirmPickupScreen()
{
    const router = useRouter();
    const params = useLocalSearchParams();
    const shipmentId = getParamValue(params.shipmentId);

    React.useEffect(() =>
    {
        if (shipmentId)
        {
            router.replace(`/shipment-details?shipmentId=${encodeURIComponent(shipmentId)}&context=dispatch` as never);
            return;
        }

        router.replace("/dispatch" as never);
    }, [router, shipmentId]);

    return null;
}
