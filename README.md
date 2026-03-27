# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## CI/CD to Firebase

This mobile app now uses two GitHub Actions workflows for Android-first delivery:

1. `.github/workflows/android-build.yml`
   builds the Android debug APK
2. `.github/workflows/android-deploy-firebase.yml`
   deploys the built APK to Firebase App Distribution after the build workflow succeeds

Required GitHub repository secrets:

- `FIREBASE_ANDROID_APP_ID`
- `FIREBASE_SERVICE_ACCOUNT`
- `FIREBASE_APP_DISTRIBUTION_GROUPS`

Required GitHub repository variables or secrets:

- `EXPO_ANDROID_PACKAGE`
- `EXPO_PUBLIC_API_URL`
- `EXPO_PUBLIC_GRAPHQL_WS_URL`

`EXPO_ANDROID_PACKAGE` must exactly match the Android package name registered in Firebase App Distribution. The Android build workflow injects this value into Expo before `expo prebuild`, so the generated APK uses the same package identifier as the Firebase app. The workflow accepts this value from either a repository variable or a repository secret.

`EXPO_PUBLIC_API_URL` and `EXPO_PUBLIC_GRAPHQL_WS_URL` are also injected during the Android build so the generated app points to the deployed backend instead of relying on a local `.env` file. Example values:

- `EXPO_PUBLIC_API_URL=https://oyana-backend-lf75.onrender.com`
- `EXPO_PUBLIC_GRAPHQL_WS_URL=wss://oyana-backend-lf75.onrender.com/graphql`

Current scope:

- Android is configured first
- iOS can be added as a separate build and deploy flow later

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
