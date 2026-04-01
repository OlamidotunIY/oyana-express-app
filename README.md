<p align="center">
  <img src="./assets/images/logoBlack.png" alt="Oyana Express" height="80" />
</p>

<h1 align="center">Oyana Express</h1>

<p align="center">
  A cross-platform logistics app for shippers and drivers — built with React Native & Expo.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo_SDK-54-000020?logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/GraphQL-Apollo_v4-E10098?logo=graphql&logoColor=white" />
  <img src="https://img.shields.io/badge/Version-1.0.0-brightgreen" />
</p>

---

## Overview

**Oyana Express** is the mobile client for the Oyana logistics platform. It serves two user types in a single app — **shippers** who need goods moved, and **drivers** who fulfill those jobs. Users can switch between modes seamlessly within the app.

---

## Features

### 📦 Shipment Creation
- Create shipments with pickup and dropoff addresses sourced from address search
- Choose vehicle category (bike, car, van, truck, etc.)
- Select shipment mode: **Dispatch** (direct driver assignment) or **Freight** (open marketplace bidding)
- Schedule shipments for immediate or future pickup
- View all active and completed shipments with real-time status tracking

### 🚚 Dispatch — Driver Workflow
- Provider dashboard showing available and assigned jobs
- Step-by-step dispatch flow:
  - **View offer details** — review shipment info and accept/decline
  - **Navigate to pickup** — live map navigation to the pickup point
  - **Confirm pickup** — mark goods as collected
  - **Confirm dropoff** — mark delivery as complete
  - **Shipment complete** — job summary and earnings
- Offer history for past dispatch jobs

### 🏪 Freight Marketplace
- Browse open shipments available for bidding
- View detailed shipment specs before placing a bid
- **Place bids** with custom price offers
- Track active bids and bid history in **My Bids**
- Filter marketplace listings by status and mode

### 💰 Wallet
- View wallet balance and available funds
- Complete transaction history with timestamps and labels
- **Fund wallet** via Paystack integration
- **Withdraw funds** to a registered bank account
- Compliance status checks (KYC gating) before payouts

### 🔔 Notifications
- In-app notification inbox
- Mark individual notifications or all notifications as read
- Push notifications via Expo Notifications

### 👤 Accounts & Profile
- View and edit personal profile details
- Upload a profile photo
- **Mode switching** — toggle between Shipper and Driver modes
- **Driver onboarding** — guided KYC flow with onboarding status tracking
- Manage saved addresses
- Verify / update phone number
- App settings and preferences
- Legal documents (Terms, Privacy Policy)
- Support contact

### 🔐 Authentication
- Phone number entry with **OTP verification**
- **Google Sign-In** via OAuth (expo-auth-session)
- Secure token storage with Expo SecureStore
- Persistent session management

### 🗺️ Maps & Location
- Google Maps integration for address selection and navigation
- Live driver location sharing during active dispatch
- Location permissions: foreground use (iOS & Android)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.81 + Expo SDK 54 |
| Navigation | Expo Router v6 (file-based) |
| API | Apollo Client v4 + GraphQL |
| Code Generation | GraphQL Codegen |
| State Management | Zustand v5 |
| Styling | Styled Components v6 |
| Maps | React Native Maps + Google Maps SDK |
| Auth | expo-auth-session (Google OAuth), Phone OTP |
| Storage | Expo SecureStore |
| Push Notifications | Expo Notifications |
| Media | Expo Image Picker, Expo AV |
| Payments | Paystack (wallet funding) |
| Build & Deploy | EAS Build (Expo Application Services) |

---

## Project Structure

```
app/
├── (auth)/
│   └── onboarding/
│       ├── index.tsx          # Welcome / splash screen
│       ├── phone.tsx          # Phone number entry
│       └── verify-phone.tsx   # OTP verification
├── (tabs)/
│   ├── index.tsx              # Home — create shipment + dashboard
│   ├── shipments.tsx          # My shipments list
│   ├── notifications.tsx      # Notification inbox
│   ├── dispatch/              # Driver dispatch flow (7 screens)
│   ├── freight/               # Freight marketplace (4 screens)
│   ├── wallet/                # Wallet & transactions (3 screens)
│   └── accounts/              # Profile & settings (9 screens)
└── shipment-details.tsx       # Shipment detail view
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [EAS CLI](https://docs.expo.dev/build/setup/) for builds
- Android Studio or Xcode for local device emulation

### Install

```bash
npm install
```

### Environment Variables

Create a `.env` file at the root with the following:

```env
# GraphQL API
EXPO_PUBLIC_GRAPHQL_HTTP_URL=https://your-api-host/graphql
EXPO_PUBLIC_GRAPHQL_WS_URL=wss://your-api-host/graphql

# Google Maps
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Google OAuth
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_android_client_id
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_ios_client_id

# App bundle IDs (optional — defaults to com.express.oyana)
EXPO_ANDROID_PACKAGE=com.express.oyana
EXPO_IOS_BUNDLE_IDENTIFIER=com.express.oyana
```

### Run

```bash
# Start metro bundler
npm start

# Run on Android (emulator or device)
npm run android

# Run on iOS (macOS only)
npm run ios
```

### Development Build (recommended for native modules)

```bash
npm run start:dev

# Build a dev client
npm run build:android:dev
```

### Generate GraphQL Types

```bash
npm run codegen
```

---

## Build & Distribution

Builds are managed via **EAS Build**.

```bash
# Preview build (APK)
npm run build:android:preview

# Production build
eas build --platform android --profile production
eas build --platform ios --profile production
```

---

## App Info

| | |
|---|---|
| App Name | Oyana Express |
| Bundle ID | `com.express.oyana` |
| URL Scheme | `oyanaexpressapp://` |
| Platforms | Android, iOS, Web |
| Min SDK | Android 5+ / iOS 16+ |
