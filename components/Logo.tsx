import { useColorScheme } from "@/hooks/use-color-scheme";
import { LogoImage } from "@/styles/components/Logo";

const logos = {
    light: require("@/assets/images/logoBlack.png"),
    dark: require("@/assets/images/logoWhite.png"),
};

export default function Logo()
{
    const colorScheme = useColorScheme();

    return (
        <LogoImage
            source={colorScheme === "light" ? logos.dark : logos.light}
            resizeMode="contain"
        />
    );
}
