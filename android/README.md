# Marvel Battle Auction — Android TWA Wrapper

This directory contains the **Trusted Web Activity (TWA)** wrapper for [Marvel Battle Auction](https://marvel-auction-battles.vercel.app), generated using Google's official **Bubblewrap** standard.

---

## 🏗️ Architecture & Philosophy

```
GitHub (Commit & Push)
       ↓
Vercel (Automatic Build & Deploy)
       ↓
Production Web App (https://marvel-auction-battles.vercel.app)
       ↓
Installable PWA (Service Worker + Web Manifest + Offline fallback)
       ↓
Android TWA (Thin native shell using AndroidX Browser Helper)
       ↓
Google Play Store (.aab) / Direct Android Sideload (.apk)
```

### ⚡ The "Zero-APK-Rebuild" Web Update Rule
The Android app is a **high-performance, fullscreen, trusted window** to the live web application.
- **Normal Game Updates**: Any change to React components, CSS, UI, animations, character rosters, audio synthesizer, auction timer logic, or battle animations are deployed to Vercel via `git push`. When players launch or reload the Android app, they immediately receive the latest web version. **No Play Store release or APK rebuild is needed.**
- **Native Rebuilds**: You only need to rebuild an APK or AAB if you modify **native Android wrapper configurations** (e.g., changing the package ID `com.marvelbattleauction.app`, app permissions, or the Android native launcher icon).

---

## 📋 Prerequisites

1. **Java JDK 17+** (OpenJDK 17 recommended)
2. **Android SDK Command-Line Tools & Build-Tools** (API level 34+)
3. **Node.js 18+**

*Note: If building on the development machine configured with Bubblewrap, the JDK is located at `~/.bubblewrap/jdk/` and Android SDK is at `~/.bubblewrap/android_sdk`.*

---

## 🛠️ Build Commands

### 1. Build Development APK (Instant Testing)
To build a signed debug APK for testing on any connected Android device or emulator:
```cmd
# Using Gradle Wrapper directly:
gradlew.bat assembleRelease

# Or using Bubblewrap CLI (from the android directory):
npx @bubblewrap/cli build --skipPwaValidation
```
The resulting APK will be located at:
`android/app/build/outputs/apk/release/app-release-signed.apk` (or `app-release.apk`)

To install directly to a connected Android phone via ADB:
```cmd
adb install -r app/build/outputs/apk/release/app-release.apk
```

---

### 2. Build Production Android App Bundle (.AAB for Google Play)
To build an Android App Bundle suitable for Google Play Console submission:
```cmd
gradlew.bat bundleRelease
```
The resulting AAB will be located at:
`android/app/build/outputs/bundle/release/app-release.aab`

---

## 🔐 Android Signing & Keystore Guide

### Development Signing (Already Configured)
The repository includes a local `debug.keystore` for testing:
- **Keystore File**: `android/debug.keystore`
- **Keystore Password**: `android`
- **Key Alias**: `androiddebugkey`
- **Key Password**: `android`
- **SHA-256 Fingerprint**:
  `58:C1:C2:26:31:D4:41:8A:5D:65:6B:B3:54:4B:CB:B0:7B:E8:54:F5:C0:16:E4:C0:9B:D9:AC:3D:5D:35:31:B1`

---

### Generating a Production Release Keystore
> ⚠️ **CRITICAL SECURITY NOTE**: Never commit your production `.keystore` or `.jks` file or its passwords to GitHub!

To create your permanent release keystore for the Google Play Store, open your terminal and run:

```bash
keytool -genkeypair -v \
  -keystore release.keystore \
  -alias marvel-battle-auction \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```
Store this keystore in a safe, backed-up location (e.g., password manager or secure vault). **If you lose this key, you will not be able to update your app on the Google Play Store.**

To extract the SHA-256 certificate fingerprint from your new keystore:
```bash
keytool -list -v -keystore release.keystore -alias marvel-battle-auction
```
Look for the line starting with `SHA256:`. Copy the hex string.

---

## 🌐 Digital Asset Links Setup (`assetlinks.json`)

For Android to remove the Chrome URL bar and grant the TWA **fullscreen trusted status**, Android verifies that the website and the Android app share a cryptographically signed relation.

The file is hosted at:
`https://marvel-auction-battles.vercel.app/.well-known/assetlinks.json`

### File Format:
```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.marvelbattleauction.app",
      "sha256_cert_fingerprints": [
        "58:C1:C2:26:31:D4:41:8A:5D:65:6B:B3:54:4B:CB:B0:7B:E8:54:F5:C0:16:E4:C0:9B:D9:AC:3D:5D:35:31:B1"
      ]
    }
  }
]
```

### If Using Google Play App Signing:
When you upload your app to Google Play with Google Play App Signing enabled:
1. Google will sign the final APK delivered to users with Google's own release key.
2. In the Google Play Console, navigate to **Setup → App integrity → App signing**.
3. Copy the **SHA-256 certificate fingerprint** under "App signing key certificate".
4. Add that fingerprint to the `sha256_cert_fingerprints` array in `client/public/.well-known/assetlinks.json`.
5. Deploy to Vercel. Both your local testing key and Google Play's signing key can coexist in the same array!

### Validating Asset Links:
You can verify your live Asset Links using Google's verification API:
```
https://digitalassetlinks.googleapis.com/v1/statements:check?source.web.site=https://marvel-auction-battles.vercel.app&relation=delegate_permission/common.handle_all_urls&target.android_app.package_name=com.marvelbattleauction.app&target.android_app.certificate.sha256_fingerprint=58:C1:C2:26:31:D4:41:8A:5D:65:6B:B3:54:4B:CB:B0:7B:E8:54:F5:C0:16:E4:C0:9B:D9:AC:3D:5D:35:31:B1
```

---

## 📱 Google Play Console Submission Checklist

1. **Create App in Google Play Console**:
   - App Name: `Marvel Battle Auction`
   - Default Language: English (US)
   - App or Game: Game
   - Free or Paid: Free
2. **App Content & Declarations**:
   - Set privacy policy URL (e.g. `https://marvel-auction-battles.vercel.app/privacy.html` or in-game info).
   - Complete Content Rating questionnaire.
   - Target audience (Teens / 13+ recommended).
3. **Store Listing**:
   - Short description: `Real-time superhero auction & tournament battle arena.`
   - Full description: `Draft legendary champions in high-stakes live auctions and lead your squad into tactical superhero tournament battles.`
   - Graphics: Upload 512x512 icon, feature graphic (1024x500), and phone screenshots (1080x1920 or 1080x2400).
4. **Upload Release**:
   - Navigate to **Production** (or **Closed Testing**).
   - Create new release and upload `app-release.aab`.
   - Copy Play App Signing SHA-256 fingerprint into `assetlinks.json` and deploy web app.
   - Review and roll out!
