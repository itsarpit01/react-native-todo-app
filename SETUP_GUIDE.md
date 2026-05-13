# Setup & Environment Guide

## System Requirements

### Minimum Requirements
- **OS:** Windows 10+, macOS 10.13+, or Linux
- **RAM:** 4GB minimum (8GB recommended)
- **Disk Space:** 5GB free space
- **Node.js:** v14.0.0 or higher
- **npm:** v6.0.0 or higher

### For Android Development
- Java Development Kit (JDK) 11 or higher
- Android SDK with API level 21+
- Android Virtual Device or physical device

### For iOS Development (macOS only)
- Xcode 12 or higher
- CocoaPods
- Ruby 2.6+

---

## Installation Guide

### 1. Install Node.js and npm

**Windows:**
- Download from https://nodejs.org/
- Run installer
- Verify: `node --version` and `npm --version`

**macOS:**
```bash
# Using Homebrew
brew install node
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# Fedora
sudo dnf install nodejs npm
```

### 2. Install Expo CLI

```bash
npm install -g expo-cli
```

Verify installation:
```bash
expo --version
```

### 3. Clone/Download Project

```bash
cd "Desktop/to do list/TodoApp"
```

### 4. Install Project Dependencies

```bash
npm install
```

This installs:
- React Native
- React
- Expo
- AsyncStorage
- Expo Vector Icons
- TypeScript types

---

## Development Setup

### Option A: Using Expo Go (Easiest)

1. **Install Expo Go App**
   - Download from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [App Store](https://apps.apple.com/us/app/expo-go/id982107779)

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Connect to App**
   - Scan QR code with Expo Go
   - App loads instantly
   - Hot reload enabled

4. **Make Changes**
   - Edit code
   - Save file
   - App updates automatically

### Option B: Native Development

**Android:**
```bash
npm run android
# Requires Android SDK and emulator
```

**iOS (macOS):**
```bash
npm run ios
# Requires Xcode
```

### Option C: Web Development

```bash
npm run web
# Opens in browser
# http://localhost:19006
```

---

## Environment Variables

### Create `.env` file (optional):

```bash
# .env
EXPO_PUBLIC_API_URL=https://api.example.com
EXPO_PUBLIC_APP_NAME=TodoApp
```

### Access in Code:
```typescript
console.log(process.env.EXPO_PUBLIC_APP_NAME);
```

---

## Android Setup

### Install Android SDK

1. Download [Android Studio](https://developer.android.com/studio)

2. During installation, select:
   - Android SDK
   - Android SDK Platform
   - Android Emulator

3. Set ANDROID_HOME:
   ```bash
   # Windows (PowerShell)
   $env:ANDROID_HOME = "C:\Users\[YourUsername]\AppData\Local\Android\Sdk"
   
   # macOS/Linux
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/tools
   ```

4. Verify Setup:
   ```bash
   emulator -list-avds
   ```

### Create Virtual Device

1. Open Android Studio
2. Tools → AVD Manager
3. Click "Create Virtual Device"
4. Select device (Pixel 4)
5. Select API level (at least 21)
6. Click "Finish"

### Run App on Emulator

```bash
# Start emulator
emulator -avd [DeviceName] &

# Or use Android Studio GUI

# Build and run app
npm run android
```

---

## iOS Setup (macOS Only)

### Install Xcode

```bash
# Download from App Store or:
xcode-select --install
```

### Install CocoaPods

```bash
sudo gem install cocoapods
```

### Setup Simulator

```bash
# List available simulators
xcrun simctl list devices

# Erase simulator (optional)
xcrun simctl erase [device_id]
```

### Run App on Simulator

```bash
npm run ios
```

---

## Debugging

### Using Expo Go DevTools

During development:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Press `w` for web browser
- Press `d` to open debugger

### VS Code Debugging

1. Install extension: "React Native Tools"

2. Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Expo",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/expo/bin/expo.js",
      "args": ["start"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

3. Press F5 to start debugging

### React Native Debugger

```bash
# Download and install from:
# https://github.com/jhen0409/react-native-debugger

# Connect debugger when app runs
# Inspect component tree
# View network requests
```

---

## Troubleshooting

### npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Expo won't start

```bash
# Kill existing processes
# macOS/Linux
killall expo

# Windows
taskkill /F /IM node.exe

# Restart
npm start
```

### Can't connect to Emulator

```bash
# Ensure emulator is running
emulator -list-avds

# Restart adb
adb kill-server
adb start-server

# Check devices
adb devices
```

### TypeScript Errors

```bash
# Reinstall TypeScript types
npm install --save-dev typescript
npm install --save-dev @types/react-native
```

### AsyncStorage Not Working

```bash
# Reinstall AsyncStorage
npm uninstall @react-native-async-storage/async-storage
npm install @react-native-async-storage/async-storage
```

---

## VS Code Setup

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets**
   - Author: dsznajder.es7-react-js-snippets

2. **React Native Tools**
   - Author: Microsoft

3. **Prettier - Code formatter**
   - Author: Prettier

4. **ESLint**
   - Author: Microsoft

### Recommended Settings (.vscode/settings.json)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "react-native-tools.showRNNotification": true
}
```

---

## Production Build

### Android Release Build

```bash
# Build APK
npm run android

# Or with EAS
eas build --platform android --build-type apk
```

### iOS Release Build

```bash
# Build IPA
npm run ios

# Or with EAS
eas build --platform ios
```

---

## Performance Tips

### Development

```bash
# Skip loading cache
npm start -- --reset-cache

# Clear watchman
watchman watch-del-all

# Only include necessary platforms
npm start -- --only android
```

### Production

- Minimize bundle size
- Enable ProGuard/R8 for Android
- Use production builds
- Optimize images and assets

---

## Git Setup

### Initialize Repository

```bash
git init
git add .
git commit -m "Initial commit: React Native Todo App"
```

### .gitignore (Already Set)

```
node_modules/
.expo/
.expo-shared/
build/
dist/
npm-debug.log
*.jks
*.p8
```

---

## Common Commands Reference

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run web` | Run in web browser |
| `npm install` | Install dependencies |
| `npm test` | Run tests |
| `npm run build` | Build for production |
| `npm run lint` | Check code style |
| `npm run format` | Format code |

---

## Project Scripts

Edit `package.json` to add custom scripts:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo run:web",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "jest"
  }
}
```

---

## Storage & Permissions

### Android Permissions (Already Set)

No additional permissions required for this app (AsyncStorage is built-in).

### iOS Permissions

No additional permissions required.

### Data Storage

```typescript
// AsyncStorage stores data at:
// Android: /data/data/com.todoapp/files/RKStorage
// iOS: NSDocumentDirectory
```

---

## Deployment Checklist

- [ ] Node.js installed
- [ ] npm installed
- [ ] Project cloned
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Android/iOS SDK installed
- [ ] Emulator/device ready
- [ ] Code runs without errors
- [ ] Tests pass
- [ ] Ready for deployment

---

## Getting Help

### Resources

- Expo Docs: https://docs.expo.dev
- React Native: https://reactnative.dev
- React Docs: https://react.dev
- Node.js: https://nodejs.org/en/docs/
- Stack Overflow: https://stackoverflow.com/questions/tagged/react-native

### Community

- Expo Community: https://forums.expo.dev
- React Native Discord: https://discord.gg/react-native
- GitHub Issues: Create issue in repository

---

## Next Steps

1. ✅ Install Node.js
2. ✅ Clone project
3. ✅ Run `npm install`
4. ✅ Run `npm start`
5. ✅ Test on device/emulator
6. ✅ Make modifications
7. ✅ Build APK/IPA
8. ✅ Deploy

Happy coding! 🚀

