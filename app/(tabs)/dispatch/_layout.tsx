import
{
    HeaderMenuItem,
    PageHeader,
    TabHeader,
    resolveHeaderTitle,
} from "@/components/NavigationHeader";
import { Stack, useRouter } from "expo-router";

export default function DispatchLayout()
{
    return (
        <Stack
            screenOptions={{
                header: ({ options, route, navigation, back }) => (
                    <PageHeader
                        canGoBack={Boolean(back)}
                        onBackPress={() => navigation.goBack()}
                        title={resolveHeaderTitle(route.name, options.title)}
                    />
                ),
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Shipments",
                    header: ({ options, route }) => (
                        <TabHeader
                            title={resolveHeaderTitle(route.name, options.title)}
                        />
                    ),
                }}
            />
            <Stack.Screen name="offer-history" options={{ title: "Offer History" }} />
            <Stack.Screen name="dispatch-offer-details" options={{ title: "Offer Details" }} />
            <Stack.Screen name="navigate-pickup" options={{ title: "Navigate Pickup" }} />
            <Stack.Screen name="confirm-pickup" options={{ title: "Confirm Pickup" }} />
            <Stack.Screen name="confirm-dropoff" options={{ title: "Confirm Dropoff" }} />
            <Stack.Screen name="shipment-complete" options={{ title: "Shipment Complete" }} />
        </Stack>
    );
}
