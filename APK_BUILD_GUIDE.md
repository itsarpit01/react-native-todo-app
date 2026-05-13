# APK Build & Deployment Guide

## Option 1: Using EAS Build (Recommended - Easiest)

### Prerequisites
- GitHub account (for code storage)
- Expo account
- EAS CLI installed

### Steps

1. **Sign up for EAS**
   ```bash
   npm install -g eas-cli
   eas login
   ```

2. **Initialize EAS in your project**
   ```bash
   cd TodoApp
   eas build:configure
   ```

3. **Build APK**
   ```bash
   eas build --platform android --build-type apk
   ```

4. **Download APK**
   - After build completes, a download link will be provided
   - Download directly to your device
   - Install: `adb install app.apk`

### Estimated Time: 5-10 minutes
### Cost: Free tier available

---

## Option 2: Local Build with Expo Prebuild

### Prerequisites
- Java Development Kit (JDK) 11+
- Android SDK
- Gradle
- 8GB+ RAM for build

### Steps

1. **Prebuild native code**
   ```bash
   cd TodoApp
   npx expo prebuild --clean
   ```

2. **Build APK using Gradle**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Locate APK**
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

### Estimated Time: 10-20 minutes
### Cost: Free

---

## Option 3: Using Android Studio

### Prerequisites
- Android Studio installed
- JDK 11+
- 15GB+ disk space

### Steps

1. **Prebuild the project**
   ```bash
   npx expo prebuild --clean
   ```

2. **Open in Android Studio**
   ```bash
   open -a "Android Studio" android/
   ```

3. **Build APK**
   - Menu: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Wait for build to complete

4. **Locate APK**
   ```
   android/app/build/outputs/apk/debug/app-debug.apk
   ```

### Estimated Time: 15-25 minutes
### Cost: Free

---

## Option 4: Using Expo Go (Development)

### Quickest Way to Test

```bash
npm start
# Scan QR code with Expo Go app
# No building required
```

---

## Installing Built APK

### On Device
```bash
# Connect Android device via USB
adb install app-release.apk

# Or copy to device and tap to install
```

### On Emulator
```bash
# Ensure emulator is running
emulator -avd YourAVDName

# Install APK
adb install app-release.apk
```

---

## Release Build Configuration

### Creating Signing Key (First Time Only)

```bash
# Generate keystore
keytool -genkey -v -keystore my-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias
```

### Update gradle.properties
```
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=yourpassword
MYAPP_UPLOAD_KEY_PASSWORD=yourpassword
```

---

## Troubleshooting

### Build Fails
```bash
# Clean and rebuild
./gradlew clean
./gradlew assembleRelease
```

### APK won't install
```bash
# Check Android version compatibility
# Minimum SDK version is 21 (Android 5.0)

# If updating, modify app.json
{
  "expo": {
    "android": {
      "minSdkVersion": 21
    }
  }
}
```

### Out of Memory during build
```bash
# Increase JVM heap size
export GRADLE_OPTS="-Xmx4096m -XX:MaxPermSize=512m"
```

---

## Version Management

### Update App Version

In `app.json`:
```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}
```

---

## Upload to Google Play Store

1. **Create Google Play Developer Account** ($25 one-time fee)

2. **Create App on Play Console**
   - https://play.google.com/console

3. **Setup Signing**
   ```bash
   eas build --platform android
   ```

4. **Submit with EAS Submit**
   ```bash
   eas submit --platform android --latest
   ```

---

## Size Optimization

### Current APK Size
- ~50-80 MB (typical for Expo app)

### Optimization Tips
```bash
# Use proguard for code shrinking
# Enable R8 code obfuscation
# Remove unused assets
```

### Update build.gradle
```gradle
android {
  buildTypes {
    release {
      minifyEnabled true
      shrinkResources true
      proguardFiles getDefaultProguardFile(
        'proguard-android-optimize.txt'
      ), 'proguard-rules.pro'
    }
  }
}
```

---

## Testing Before Release

```bash
# Test on multiple devices/Android versions
# Test dark mode on both themes
# Test offline functionality
# Test task persistence
# Verify all animations work smoothly
```

---

## Distribution Channels

1. **Google Play Store** - Official app store
2. **APK Direct Distribution** - Manual distribution
3. **AppStore** - iOS only
4. **Third-party stores** - Samsung Galaxy Store, etc.

---

## Helpful Links

- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Android Studio: https://developer.android.com/studio
- Google Play Console: https://play.google.com/console
- Expo Android Guide: https://docs.expo.dev/build-reference/android/

---

## Support

For detailed troubleshooting:
- Expo Docs: https://docs.expo.dev
- React Native: https://reactnative.dev
- Android Developers: https://developer.android.com
