# Code Architecture & Implementation Guide

## Project Overview

This To-Do app demonstrates best practices in React Native development including functional components, hooks, AsyncStorage integration, and responsive UI design.

---

## Code Structure

### Main Component: TodoScreen (app/(tabs)/index.tsx)

#### State Management
```typescript
const [tasks, setTasks] = useState<Task[]>([]);              // All tasks
const [taskInput, setTaskInput] = useState('');              // Input field
const [darkMode, setDarkMode] = useState(false);             // Theme toggle
const [isLoading, setIsLoading] = useState(true);            // Loading state
const [editingId, setEditingId] = useState<string | null>(); // Edit mode
const [editingText, setEditingText] = useState('');          // Edit text
const [modalVisible, setModalVisible] = useState(false);     // Modal visibility
```

#### Task Data Structure
```typescript
interface Task {
  id: string;           // Unique ID (timestamp)
  title: string;        // Task description
  completed: boolean;   // Completion status
  createdAt: number;    // Creation timestamp
}
```

---

## Core Features Implementation

### 1. Add Task Feature
```typescript
const addTask = () => {
  // Validation
  if (taskInput.trim() === '') {
    Alert.alert('Invalid Input', 'Please enter a task');
    return;
  }
  
  // Create new task
  const newTask: Task = {
    id: Date.now().toString(),
    title: taskInput,
    completed: false,
    createdAt: Date.now(),
  };
  
  // Add to top of list
  const updatedTasks = [newTask, ...tasks];
  setTasks(updatedTasks);
  saveTasks(updatedTasks);
  setTaskInput('');
};
```

**Key Points:**
- Uses timestamp for unique ID
- New tasks appear at the top
- Input validation before adding
- Async save to storage

### 2. Display Task List
```typescript
<FlatList
  data={tasks}
  keyExtractor={item => item.id}
  renderItem={renderTaskItem}
  scrollEnabled={true}
  style={styles.tasksList}
  contentContainerStyle={styles.tasksListContent}
/>
```

**Key Points:**
- FlatList for optimal rendering
- Unique key for each item
- Scrollable for many tasks
- Custom rendering via renderTaskItem

### 3. Mark as Completed
```typescript
const toggleCompleted = (id: string) => {
  const updatedTasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
  saveTasks(updatedTasks);
};
```

**Visual Feedback:**
- Checkbox fills with blue when completed
- Text gets strikethrough
- Opacity reduces to 0.6
- Checkbox animation on tap

### 4. Delete Task
```typescript
const deleteTask = (id: string) => {
  Alert.alert('Delete Task', 'Are you sure?', [
    { text: 'Cancel', onPress: () => {} },
    {
      text: 'Delete',
      onPress: () => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
      },
      style: 'destructive',
    },
  ]);
};
```

**Key Points:**
- Confirmation dialog for safety
- Destructive style for emphasis
- Filters task from array
- Updates state and storage

---

## Bonus Features Implementation

### Edit Task Feature
```typescript
const editTask = (id: string) => {
  const task = tasks.find(t => t.id === id);
  if (task) {
    setEditingId(id);
    setEditingText(task.title);
    setModalVisible(true);  // Open modal
  }
};

const saveEditedTask = () => {
  if (editingText.trim() === '') {
    Alert.alert('Invalid Input', 'Task cannot be empty');
    return;
  }
  
  const updatedTasks = tasks.map(task =>
    task.id === editingId ? { ...task, title: editingText } : task
  );
  setTasks(updatedTasks);
  saveTasks(updatedTasks);
  setModalVisible(false);
  setEditingId(null);
  setEditingText('');
};
```

**UI Element:**
```typescript
<Modal
  animationType="fade"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  {/* Modal content */}
</Modal>
```

### Dark Mode Feature
```typescript
// Colors object dynamically switches
const colors = {
  background: darkMode ? '#1a1a1a' : '#f5f5f5',
  surface: darkMode ? '#2d2d2d' : '#ffffff',
  text: darkMode ? '#ffffff' : '#000000',
  // ... more colors
};

const toggleDarkMode = () => {
  const newDarkMode = !darkMode;
  setDarkMode(newDarkMode);
  saveDarkMode(newDarkMode);
};
```

**All components use colors object:**
```typescript
<View style={[styles.container, { backgroundColor: colors.background }]}>
  {/* Dynamic theming */}
</View>
```

### AsyncStorage Integration
```typescript
// Load on app start
useEffect(() => {
  loadTasks();
}, []);

// Load function
const loadTasks = async () => {
  try {
    setIsLoading(true);
    const savedTasks = await AsyncStorage.getItem('tasks');
    const savedDarkMode = await AsyncStorage.getItem('darkMode');
    
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedDarkMode !== null) setDarkMode(JSON.parse(savedDarkMode));
  } catch (error) {
    Alert.alert('Error', 'Failed to load tasks');
  } finally {
    setIsLoading(false);
  }
};

// Save function
const saveTasks = async (updatedTasks: Task[]) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  } catch (error) {
    Alert.alert('Error', 'Failed to save tasks');
  }
};
```

**Key Points:**
- JSON serialization for complex data
- Error handling with try-catch
- Loading state during init
- Automatic persistence

---

## Styling System

### Dynamic Styling
```typescript
// Apply colors dynamically
style={[
  styles.container,
  { backgroundColor: colors.background }
]}

// Theme-aware shadows
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 3,
elevation: 3,  // Android equivalent
```

### StyleSheet Organization
- Grouped by component
- Responsive padding/margins
- Consistent spacing (12, 16, 20)
- Flex layout for responsiveness

---

## User Interface Components

### Header
- App title with subtitle
- Task counter (X of Y completed)
- Dark mode toggle button

### Input Section
- TextInput for new tasks
- Add button with plus icon
- Auto-clear after adding

### Task Item (FlatList)
- Checkbox (left)
- Task text (center, flex: 1)
- Edit button (right)
- Delete button (right)

### Empty State
- Large icon
- Helpful message
- Motivational text

### Edit Modal
- Centered on screen
- Dark overlay background
- TextInput for editing
- Cancel and Save buttons

---

## Performance Optimizations

### 1. FlatList Optimization
```typescript
<FlatList
  data={tasks}
  keyExtractor={item => item.id}    // Unique keys
  renderItem={renderTaskItem}         // Component rendered
  removeClippedSubviews={true}       // Remove off-screen items
  maxToRenderPerBatch={10}           // Batch rendering
  windowSize={10}                     // Window of visible items
/>
```

### 2. State Management
```typescript
// Avoid recreating objects
const renderTaskItem = ({ item }) => (
  // Rendered once per item
);

// Inline objects created each render
const colors = { /* ... */ };  // Could be optimized with useMemo
```

### 3. List Rendering
- Only visible items rendered (virtual scrolling)
- Smooth scrolling on large lists
- Efficient updates with unique keys

---

## Error Handling

### Input Validation
```typescript
if (taskInput.trim() === '') {
  Alert.alert('Invalid Input', 'Please enter a task');
  return;
}
```

### AsyncStorage Errors
```typescript
try {
  // AsyncStorage operations
} catch (error) {
  console.error('Error:', error);
  Alert.alert('Error', 'Failed to save tasks');
} finally {
  setIsLoading(false);
}
```

### User Confirmations
```typescript
Alert.alert(
  'Delete Task',
  'Are you sure you want to delete this task?',
  [
    { text: 'Cancel' },
    { text: 'Delete', style: 'destructive' }
  ]
);
```

---

## Testing the App

### Manual Test Cases

1. **Add Task**
   - [ ] Add empty task (should fail)
   - [ ] Add normal task
   - [ ] Add task with special characters
   - [ ] Add multiple tasks

2. **Task List**
   - [ ] List displays correctly
   - [ ] Tasks scroll smoothly
   - [ ] Empty state shows when no tasks

3. **Complete Task**
   - [ ] Checkbox toggles
   - [ ] Text gets strikethrough
   - [ ] Opacity changes
   - [ ] Counter updates

4. **Edit Task**
   - [ ] Modal opens
   - [ ] Text loads correctly
   - [ ] Can save changes
   - [ ] Can cancel without changes

5. **Delete Task**
   - [ ] Confirmation dialog appears
   - [ ] Cancel cancels deletion
   - [ ] Confirm removes task

6. **Dark Mode**
   - [ ] Toggle works smoothly
   - [ ] All colors change
   - [ ] Preference persists
   - [ ] Modal follows theme

7. **Persistence**
   - [ ] Force quit app
   - [ ] All tasks still there
   - [ ] Dark mode preference saved
   - [ ] Task states preserved

---

## Debugging Tips

### Console Logging
```typescript
console.log('Tasks:', tasks);
console.log('Dark Mode:', darkMode);
```

### React Native Debugger
```bash
npm start
# Press 'd' to open debugger
```

### AsyncStorage Inspection
```typescript
// Check what's stored
AsyncStorage.getAllKeys().then(keys => {
  AsyncStorage.multiGet(keys, (err, stores) => {
    console.log('Stored data:', stores);
  });
});
```

### Performance Monitoring
- React DevTools profiler
- Flipper for advanced debugging

---

## Browser DevTools (Web Version)

```bash
npm run web
# Opens browser
# F12 to open DevTools
# React DevTools available as extension
```

---

## Code Quality Checklist

- ✅ TypeScript types defined
- ✅ Error handling in place
- ✅ Input validation
- ✅ Async operations proper
- ✅ Responsive design
- ✅ Accessibility considered
- ✅ Performance optimized
- ✅ Code commented
- ✅ No console errors

---

## Next Steps for Enhancement

1. Add task categories
2. Implement search/filter
3. Add due dates
4. Task priorities
5. Recurring tasks
6. Cloud backup
7. Offline sync
8. Notifications
9. Undo/Redo
10. Export/Import tasks

---

## Resources

- React Hooks: https://react.dev/reference/react
- React Native Docs: https://reactnative.dev/docs/intro
- Expo Documentation: https://docs.expo.dev
- AsyncStorage: https://react-native-async-storage.github.io/react-native-async-storage/
- TypeScript: https://www.typescriptlang.org/docs/

