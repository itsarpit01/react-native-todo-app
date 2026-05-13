# Quick Reference Card

## 🚀 Getting Started (2 Minutes)

```bash
# 1. Navigate to project
cd "c:\Users\Arpit Thakur\Desktop\to do list\TodoApp"

# 2. Install dependencies
npm install

# 3. Start development
npm start

# 4. Open Expo Go and scan QR code
```

---

## 📱 Run on Different Platforms

| Platform | Command | Notes |
|----------|---------|-------|
| **Expo Go** | `npm start` | Easiest, instant preview |
| **Android** | `npm run android` | Requires emulator |
| **iOS** | `npm run ios` | macOS only |
| **Web** | `npm run web` | Browser preview |

---

## 🎯 App Features

### Core Features
```
✅ Add Task        - Type and tap + or press Enter
✅ View Tasks      - Scrollable FlatList
✅ Complete Task   - Tap checkbox on left
✅ Edit Task       - Tap pencil icon
✅ Delete Task     - Tap trash icon
✅ Dark Mode       - Tap moon/sun icon
✅ Persistence     - Automatic save
```

### UI Sections
```
Header:     Title + Counter + Dark Mode Toggle
Input:      TextInput + Add Button
Tasks:      Scrollable FlatList
Modal:      Edit dialog with Cancel/Save
Empty:      Message when no tasks
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/(tabs)/index.tsx` | Main app component (650 lines) |
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `app.json` | Expo configuration |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `SETUP_GUIDE.md` | Installation & environment setup |
| `FEATURES.md` | Feature overview & usage |
| `CODE_ARCHITECTURE.md` | Code structure & implementation |
| `APK_BUILD_GUIDE.md` | Building APK for Android |
| `GITHUB_SETUP.md` | Pushing to GitHub |
| `PROJECT_SUMMARY.md` | Completion checklist |

---

## 🔧 Common Commands

```bash
# Development
npm start                    # Start Expo server
npm run android              # Build and run Android
npm run ios                  # Build and run iOS
npm run web                  # Run in browser

# Maintenance
npm install                  # Install dependencies
npm update                   # Update packages
npm run lint                 # Check code style
npm cache clean --force      # Clear npm cache

# Building
npx expo prebuild --clean    # Generate native files
eas build --platform android # Build with EAS

# Git
git init                     # Initialize Git
git add .                    # Stage files
git commit -m "message"      # Commit changes
git push                     # Push to GitHub
```

---

## 💾 Data Persistence

### What's Saved
- ✅ All tasks
- ✅ Dark mode preference
- ✅ Task completion status
- ✅ Task order

### Where It's Saved
- **Android:** `/data/data/com.todoapp/files/RKStorage`
- **iOS:** `NSDocumentDirectory`
- **Web:** LocalStorage

### Load/Save Functions
```typescript
loadTasks()           // Load from storage on app start
saveTasks()           // Save after any change
saveDarkMode()        // Save theme preference
```

---

## 🎨 Colors & Theming

### Light Mode
- Background: #f5f5f5
- Text: #000000
- Primary: #007AFF (blue)
- Accent: #e0e0e0 (gray)

### Dark Mode
- Background: #1a1a1a
- Text: #ffffff
- Primary: #007AFF (blue)
- Accent: #444444 (dark gray)

---

## 🎯 Component Structure

```
TodoScreen (Main)
├── useEffect (Load tasks)
├── useState (8 states)
├── Functions (add, edit, delete, etc.)
├── Header (Title + Counter + Dark Mode)
├── InputSection (TextInput + Button)
├── FlatList (Task Items)
│   └── renderTaskItem
│       ├── Checkbox
│       ├── Task Text
│       ├── Edit Button
│       └── Delete Button
├── EmptyState (No tasks message)
└── Modal (Edit dialog)
```

---

## 🧪 Testing Checklist

```
[ ] Add task with text
[ ] Add task with empty input (should fail)
[ ] Mark task as completed
[ ] Edit task text
[ ] Delete task (with confirmation)
[ ] Toggle dark mode
[ ] Force quit app
[ ] Check tasks still there (persistence)
[ ] Scroll with many tasks (50+)
[ ] Test on actual device
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | `npm install` → `npm start --reset-cache` |
| Emulator won't run | Check Android SDK installation |
| Tasks not saving | Check AsyncStorage permissions |
| Dark mode not working | Force quit app and reopen |
| Build fails | `rm -rf node_modules` → `npm install` |

---

## 📦 Building APK

### Option 1: EAS Build (Easiest)
```bash
npm install -g eas-cli
eas login
eas build --platform android --build-type apk
# Download link provided after build
```

### Option 2: Local Build
```bash
npx expo prebuild --clean
npm run android
# APK in: android/app/build/outputs/apk/release/
```

### Option 3: Android Studio
```bash
npx expo prebuild --clean
open -a "Android Studio" android/
# Build → Build APK(s)
```

---

## 🌐 Deploy & Share

### Share Source Code
```bash
# Via GitHub
git push origin main
# Share: https://github.com/USERNAME/react-native-todo-app

# Via ZIP
zip -r todo-app.zip TodoApp/ -x "TodoApp/node_modules/*"
```

### Share APK
- Email as attachment
- Google Drive link
- GitHub Releases
- Internal app store

---

## 📱 Share with QR Code

```bash
npm start
# Generate QR code for Expo Go
# Anyone with Expo Go can scan and run
```

---

## 💡 Pro Tips

1. **Use Expo Go** for quick testing
2. **Check docs** in project folder
3. **Dark mode** persists automatically
4. **Tasks save** after every action
5. **Search docs** for specific help
6. **Use DevTools** for debugging
7. **Test often** on actual device

---

## 📞 Quick Help

### Documentation
- Setup: Read SETUP_GUIDE.md
- Features: Read FEATURES.md
- Code: Read CODE_ARCHITECTURE.md
- Building: Read APK_BUILD_GUIDE.md
- GitHub: Read GITHUB_SETUP.md

### External Resources
- Expo: https://docs.expo.dev
- React Native: https://reactnative.dev
- React: https://react.dev
- GitHub: https://docs.github.com

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| Main Component Lines | ~650 |
| State Variables | 8 |
| Functions | 9 |
| Styles | 22 |
| Dependencies | 7 |
| Docs Pages | 6 |
| Build Options | 3 |
| Theme Options | 2 |

---

## ✅ Completion Status

### Requirements
- ✅ Add Task
- ✅ Display Task List
- ✅ Mark Completed
- ✅ Delete Task
- ✅ Functional Components
- ✅ React Hooks
- ✅ FlatList
- ✅ Clean UI

### Bonus
- ✅ AsyncStorage
- ✅ Edit Task
- ✅ Dark Mode

### Deliverables
- ✅ Source Code
- ✅ Documentation (6 files)
- ✅ APK Build Guide
- ✅ Screenshots Guide
- ✅ GitHub Setup

---

## 🎉 Ready to Go!

Your app is **complete** and ready for:
- ✅ Development
- ✅ Testing
- ✅ Building APK
- ✅ Deployment
- ✅ Sharing

---

**Start with:** `npm install` → `npm start`

**Learn more:** Check documentation files in project folder

**Need help?** See relevant documentation file

---

Last Updated: May 13, 2026
