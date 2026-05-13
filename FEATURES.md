# React Native To-Do App

A beautiful, feature-rich To-Do application built with React Native and Expo, featuring a clean UI, dark mode support, and persistent storage.

## Features ✨

### Core Features
- ✅ **Add Task** - Quickly add new tasks with a clean input interface
- ✅ **Display Task List** - View all tasks in a scrollable FlatList
- ✅ **Mark Task as Completed** - Toggle task completion status with visual feedback
- ✅ **Delete Task** - Remove tasks with confirmation dialog

### Bonus Features
- 🌙 **Dark Mode** - Full dark/light theme support with persistent preference
- ✏️ **Edit Task** - Modify task text in a modal dialog
- 💾 **AsyncStorage Integration** - All data persists between sessions

## Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Managed React Native framework
- **TypeScript** - Type-safe development
- **React Hooks** - Modern state management (useState, useEffect)
- **FlatList** - Optimized list rendering
- **AsyncStorage** - Local data persistence
- **Expo Vector Icons** - Beautiful Material Design icons

## Project Structure

```
TodoApp/
├── app/
│   ├── (tabs)/
│   │   └── index.tsx          # Main To-Do app screen
│   └── _layout.tsx             # Navigation setup
├── package.json
├── tsconfig.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (optional but recommended)

### Steps

1. **Navigate to project directory**
   ```bash
   cd TodoApp
   ```

2. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on different platforms**
   
   **Android:**
   ```bash
   npm run android
   ```
   
   **iOS (macOS only):**
   ```bash
   npm run ios
   ```
   
   **Web:**
   ```bash
   npm run web
   ```

## Usage Guide

### Adding a Task
1. Type your task in the input field at the top
2. Press "Enter" or tap the "+" button
3. Your task appears at the top of the list

### Completing a Task
- Tap the checkbox on the left side of any task
- The task will be marked with a strikethrough
- Task count updates automatically

### Editing a Task
1. Tap the pencil (edit) icon on the right side of a task
2. Modify the text in the modal dialog
3. Tap "Save" to confirm or "Cancel" to discard changes

### Deleting a Task
1. Tap the trash (delete) icon on the right side of a task
2. Confirm the deletion in the dialog

### Toggling Dark Mode
- Tap the moon/sun icon in the top-right corner
- Your preference is saved automatically

## Building APK (Android)

### Prerequisites
- Java Development Kit (JDK) 11 or higher
- Android SDK
- Gradle

### Build Steps

1. **Generate Signed APK using EAS Build (Recommended)**
   ```bash
   npm install -g eas-cli
   eas build --platform android --build-type apk
   ```

2. **Local Build (Requires Android SDK)**
   ```bash
   npx expo prebuild --clean
   npm run android
   ```

3. **Using Android Studio**
   ```bash
   # First, prebuild the native code
   npx expo prebuild --clean
   
   # Open in Android Studio
   open -a "Android Studio" android/
   ```

The APK will be generated in the `android/app/build/outputs/apk/` directory.

## Building for iOS (macOS Only)

```bash
npm run ios
# or
eas build --platform ios
```

## Code Highlights

### State Management with Hooks
```typescript
const [tasks, setTasks] = useState<Task[]>([]);
const [darkMode, setDarkMode] = useState(false);
```

### Persistent Storage
```typescript
const saveTasks = async (updatedTasks: Task[]) => {
  await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
};
```

### Dynamic Theming
```typescript
const colors = {
  background: darkMode ? '#1a1a1a' : '#f5f5f5',
  surface: darkMode ? '#2d2d2d' : '#ffffff',
  text: darkMode ? '#ffffff' : '#000000',
};
```

## Key Components

### TaskItem
Renders individual task with:
- Checkbox for completion status
- Task title with strikethrough when completed
- Edit button (pencil icon)
- Delete button (trash icon)
- Dynamic styling based on theme

### EditModal
Modal dialog for editing tasks with:
- Centered layout
- Cancel and Save buttons
- Input validation
- Theme-aware styling

## Performance Optimizations

- **FlatList** - Virtualization for efficient rendering of large task lists
- **useCallback** - Memoized functions to prevent unnecessary re-renders
- **TypeScript** - Type safety and compile-time error checking

## Data Schema

### Task Interface
```typescript
interface Task {
  id: string;              // Unique identifier (timestamp-based)
  title: string;           // Task description
  completed: boolean;      // Completion status
  createdAt: number;       // Timestamp of creation
}
```

## API Reference

### Async Functions

#### `loadTasks()`
Loads saved tasks and dark mode preference from AsyncStorage.

#### `saveTasks(updatedTasks: Task[])`
Persists tasks to AsyncStorage.

#### `saveDarkMode(isDark: boolean)`
Saves dark mode preference.

### Action Functions

#### `addTask()`
Creates and adds a new task to the list.

#### `deleteTask(id: string)`
Removes a task after confirmation.

#### `toggleCompleted(id: string)`
Toggles the completion status of a task.

#### `editTask(id: string)`
Opens the edit modal for a specific task.

#### `saveEditedTask()`
Saves changes to a task.

#### `toggleDarkMode()`
Switches between light and dark themes.

## Screenshots

### Light Mode
- Clean white interface with blue accents
- Task counter shows progress
- Responsive touch targets for easy interaction

### Dark Mode
- Dark background (#1a1a1a) for easy on the eyes
- High contrast text for readability
- Consistent with system dark mode preferences

## Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
```

### AsyncStorage not persisting
- Ensure app has storage permissions
- Check device storage space
- Verify AsyncStorage package is installed

### Compilation errors
```bash
# Clear build cache
npm run web   # or android/ios
# and rebuild
```

## Testing

### Manual Testing Checklist
- [ ] Add a task
- [ ] View task in list
- [ ] Mark task as completed
- [ ] Edit task text
- [ ] Delete task
- [ ] Toggle dark mode
- [ ] Force quit and reopen app (check persistence)
- [ ] Test with many tasks (50+)

## Deployment

### Using Expo Go (Easiest)
```bash
npm start
# Scan QR code with Expo Go app
```

### Using EAS (Production Ready)
```bash
eas build --platform android
eas build --platform ios
eas submit --platform android
eas submit --platform ios
```

## Future Enhancements

- Task categories/tags
- Due dates and reminders
- Task priorities
- Search/filter functionality
- Undo/redo functionality
- Backup and restore
- Cloud sync
- Notifications
- Recurring tasks

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please check:
1. Expo documentation: https://docs.expo.dev
2. React Native docs: https://reactnative.dev
3. AsyncStorage guide: https://react-native-async-storage.github.io/react-native-async-storage/

## Credits

Built with ❤️ using React Native and Expo.

---

**Happy Task Managing! 🎯**
