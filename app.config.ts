import type { ExpoConfig } from "expo/config";

const androidPackage = process.env.EXPO_ANDROID_PACKAGE ?? "com.express.oyana";
const iosBundleIdentifier = process.env.EXPO_IOS_BUNDLE_IDENTIFIER;
const googleMapsApiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const config: ExpoConfig = {
  name: "Oyana Express",
  slug: "oyana-express-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "oyanaexpressapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    ...(googleMapsApiKey
      ? {
          config: {
            googleMapsApiKey,
          },
        }
      : {}),
    ...(iosBundleIdentifier ? { bundleIdentifier: iosBundleIdentifier } : {}),
  },
  android: {
    versionCode: 2,
    adaptiveIcon: {
      foregroundImage: "./assets/images/icon.png",
      backgroundColor: "#E6F4FE",
      monochromeImage: "./assets/images/icon.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: androidPackage,
    ...(googleMapsApiKey
      ? {
          config: {
            googleMaps: {
              apiKey: googleMapsApiKey,
            },
          },
        }
      : {}),
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  extra: {
    eas: {
      projectId: "f277e6a4-b0a6-4ca6-a1f6-45397b993fe6",
    },
  },
  plugins: [
    "expo-router",
    [
      "expo-dev-client",
      {
        launchMode: "launcher",
      },
    ],
    "expo-notifications",
    "@react-native-community/datetimepicker",
    "expo-secure-store",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
