import type { ExpoConfig } from "expo/config";

const androidPackage = process.env.EXPO_ANDROID_PACKAGE;
const iosBundleIdentifier = process.env.EXPO_IOS_BUNDLE_IDENTIFIER;

const config: ExpoConfig = {
  name: "oyana-express-app",
  slug: "oyana-express-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "oyanaexpressapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    ...(iosBundleIdentifier ? { bundleIdentifier: iosBundleIdentifier } : {}),
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    ...(androidPackage ? { package: androidPackage } : {}),
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
