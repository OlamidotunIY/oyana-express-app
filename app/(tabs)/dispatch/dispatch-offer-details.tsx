import { Redirect, useLocalSearchParams } from "expo-router";

function getParamValue(value: string | string[] | undefined): string | undefined
{
    if (!value) return undefined;
    return Array.isArray(value) ? value[0] : value;
}

export default function DispatchOfferDetailsScreen()
{
    const params = useLocalSearchParams();
    const offerId = getParamValue(params.offerId);
    const shipmentId = getParamValue(params.shipmentId);

    if (!offerId || !shipmentId)
    {
        return <Redirect href="/dispatch" />;
    }

    return (
        <Redirect
            href={`/shipment-details?context=dispatch&shipmentId=${encodeURIComponent(shipmentId)}&offerId=${encodeURIComponent(offerId)}`}
        />
    );
}
