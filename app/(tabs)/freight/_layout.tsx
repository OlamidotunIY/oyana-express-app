import
{
    HeaderMenuItem,
    PageHeader,
    resolveHeaderTitle
} from "@/components/NavigationHeader";
import { useFreightHeaderStore } from "@/store/freightHeaderStore";
import { Stack, useRouter } from "expo-router";

export default function FreightLayout()
{
    const router = useRouter();
    const triggerBidsRefresh = useFreightHeaderStore((state) => state.triggerBidsRefresh);
    const freightMenuItems: HeaderMenuItem[] = [
        {
            id: "freight-bids",
            label: "My bids",
            iconName: "gavel",
            onPress: () => router.push("/freight/my-bids" as never),
        },
    ];

    return (
        <Stack
            screenOptions={{
                header: ({ options, route, navigation, back }) => (
                    (() =>
                    {
                        const isMyBidsRoute = route.name === "my-bids";
                        const shouldReturnToFreightRoot = route.name === "place-bid";
                        const menuItems = isMyBidsRoute
                            ? [
                                {
                                    id: "refresh-bids",
                                    label: "Refresh bids",
                                    iconName: "refresh" as const,
                                    onPress: () => triggerBidsRefresh(),
                                },
                            ]
                            : freightMenuItems;

                        return (
                            <PageHeader
                                backgroundColor={isMyBidsRoute ? "#0f2742" : undefined}
                                canGoBack={Boolean(back)}
                                menuItems={menuItems}
                                onBackPress={() =>
                                {
                                    if (shouldReturnToFreightRoot)
                                    {
                                        router.replace("/freight" as never);
                                        return;
                                    }

                                    navigation.goBack();
                                }}
                                title={resolveHeaderTitle(route.name, options.title)}
                            />
                        );
                    })()
                ),
            }}
        >
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="marketplace-shipment-details"
                options={{ title: "Shipment Details" }}
            />
            <Stack.Screen name="place-bid" options={{ title: "Place Bid" }} />
            <Stack.Screen name="my-bids" options={{ title: "My Bids" }} />
        </Stack>
    );
}
