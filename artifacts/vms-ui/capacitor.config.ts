import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.fairtech.vms",
  appName: "Visitor Management",
  webDir: "dist",
  server: {
    // During development, point to your local Vite dev server
    // Comment this out for production builds
    // url: "http://YOUR_LOCAL_IP:5173",
    // cleartext: true,
  },
  plugins: {
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1e40af",
    },
    Keyboard: {
      resize: "body",
      style: "DARK",
      resizeOnFullScreen: true,
    },
    Camera: {
      // iOS — injected into Info.plist
      iosNSCameraUsageDescription:
        "The Visitor Management app needs camera access to capture visitor photos during check-in.",
      iosNSPhotoLibraryUsageDescription:
        "The Visitor Management app needs photo library access to select visitor photos.",
      iosNSPhotoLibraryAddUsageDescription:
        "The Visitor Management app needs permission to save visitor photos.",
      // Android — injected into AndroidManifest.xml
      androidPermissions: ["android.permission.CAMERA"],
    },
  },
  ios: {
    contentInset: "automatic",
    backgroundColor: "#ddeaf7",
  },
  android: {
    backgroundColor: "#ddeaf7",
    allowMixedContent: false,
  },
};

export default config;
