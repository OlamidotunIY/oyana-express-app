import { Redirect, useLocalSearchParams } from "expo-router";

function getParamValue(value: string | string[] | undefined): string | undefined
{
    if (!value) return undefined;
    return Array.isArray(value) ? value[0] : value;
}

export default function MarketplaceShipmentDetailsScreen()
{
    const params = useLocalSearchParams();
    const shipmentId = getParamValue(params.shipmentId);
    if (!shipmentId)
    {
        return <Redirect href="/freight" />;
    }

    return <Redirect href={`/shipment-details?context=freight&shipmentId=${encodeURIComponent(shipmentId)}`} />;
}
