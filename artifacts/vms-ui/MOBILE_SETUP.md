# Mobile Setup — iOS & Android (Capacitor)

This app uses [Capacitor](https://capacitorjs.com/) to run the React/Vite web app natively on iOS and Android.

## Prerequisites

| Tool | Required for |
|------|-------------|
| Node.js 18+ | Build |
| pnpm | Package manager |
| Xcode 14+ | iOS |
| Android Studio (Hedgehog+) | Android |
| CocoaPods (`gem install cocoapods`) | iOS native deps |
| Java 17+ | Android |

---

## First-time Setup

```bash
# 1. Install all dependencies (from workspace root)
pnpm install

# 2. Build the web app
pnpm --filter @workspace/vms-ui run cap:build

# 3. Add native platforms (run once)
cd artifacts/vms-ui
npx cap add ios
npx cap add android

# 4. Sync web assets into native projects
npx cap sync
```

---

## Running on iOS

```bash
# From artifacts/vms-ui/
pnpm run mobile:ios
# This builds → syncs → opens Xcode
```

In Xcode:
- Select your target device or simulator
- Press ▶ Run

### iOS Permissions (already configured in capacitor.config.ts)
The following are added to `Info.plist` automatically by Capacitor:
- `NSCameraUsageDescription` — for visitor photo capture

---

## Running on Android

```bash
# From artifacts/vms-ui/
pnpm run mobile:android
# This builds → syncs → opens Android Studio
```

In Android Studio:
- Wait for Gradle sync to finish
- Select your device/emulator
- Press ▶ Run

### Android Permissions (added to AndroidManifest.xml by Capacitor)
- `CAMERA`
- `INTERNET`

---

## Live Reload During Development

For faster iteration, enable live reload by editing `capacitor.config.ts`:

```ts
server: {
  url: "http://YOUR_LOCAL_IP:5173",  // your machine's LAN IP
  cleartext: true,
},
```

Then run the Vite dev server:
```bash
pnpm --filter @workspace/vms-ui run dev
```

And sync:
```bash
cd artifacts/vms-ui && npx cap sync
```

---

## Project Structure After Setup

```
artifacts/vms-ui/
├── android/          ← Android Studio project (git-ignored)
├── ios/              ← Xcode project (git-ignored)
├── dist/             ← Web build output (synced to native)
├── capacitor.config.ts
└── src/
```

---

## Feature Notes

| Feature | Web | iOS | Android |
|---------|-----|-----|---------|
| All pages & navigation | ✅ | ✅ | ✅ |
| Camera (visitor photo) | ✅ Browser API | ✅ Native Camera | ✅ Native Camera |
| Check-in form | ✅ | ✅ | ✅ |
| Dashboard & charts | ✅ | ✅ | ✅ |
| Admin pages | ✅ | ✅ | ✅ |
