import { useColorScheme } from "react-native";
import { LogoImage } from "@/styles/components/Logo";
import { usePreferencesStore } from "@/store/preferencesStore";

const logos = {
    light: require("../assets/images/logoWhite.png"),
    dark: require("../assets/images/logoBlack.png"),
};

export default function Logo()
{
    const themePreference = usePreferencesStore((s) => s.themePreference);
    const systemScheme = useColorScheme();
    const effectiveScheme = themePreference === "system" ? systemScheme : themePreference;

    return (
        <LogoImage
            source={effectiveScheme === "dark" ? logos.dark : logos.light}
            resizeMode="contain"
        />
    );
}
