import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

// Task interface
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export default function TodoScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // Colors based on dark mode
  const colors = {
    background: darkMode ? '#1a1a1a' : '#f5f5f5',
    surface: darkMode ? '#2d2d2d' : '#ffffff',
    text: darkMode ? '#ffffff' : '#000000',
    subtext: darkMode ? '#b0b0b0' : '#666666',
    primary: '#007AFF',
    accent: darkMode ? '#444444' : '#e0e0e0',
    completed: darkMode ? '#333333' : '#f0f0f0',
    danger: '#FF3B30',
  };

  // Load tasks from AsyncStorage on app start
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const savedTasks = await AsyncStorage.getItem('tasks');
      const savedDarkMode = await AsyncStorage.getItem('darkMode');

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
      if (savedDarkMode !== null) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
      Alert.alert('Error', 'Failed to save tasks');
    }
  };

  // Save dark mode preference
  const saveDarkMode = async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving dark mode:', error);
    }
  };

  // Add new task
  const addTask = () => {
    if (taskInput.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a task');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskInput,
      completed: false,
      createdAt: Date.now(),
    };

    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTaskInput('');
  };

  // Delete task
  const deleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
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

  // Toggle task completion
  const toggleCompleted = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Edit task
  const editTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      setEditingId(id);
      setEditingText(task.title);
      setModalVisible(true);
    }
  };

  // Save edited task
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

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    saveDarkMode(newDarkMode);
  };

  // Get task statistics
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  // Render task item
  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={[styles.taskItem, { backgroundColor: colors.surface }]}>
      <TouchableOpacity
        onPress={() => toggleCompleted(item.id)}
        style={styles.checkboxContainer}
      >
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: item.completed ? colors.primary : colors.accent,
              borderColor: colors.primary,
            },
          ]}
        >
          {item.completed && (
            <MaterialIcons name="check" size={18} color="#ffffff" />
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskText,
            {
              color: colors.text,
              textDecorationLine: item.completed ? 'line-through' : 'none',
              opacity: item.completed ? 0.6 : 1,
            },
          ]}
        >
          {item.title}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => editTask(item.id)}
        style={styles.actionButton}
      >
        <MaterialIcons name="edit" size={20} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => deleteTask(item.id)}
        style={styles.actionButton}
      >
        <MaterialIcons name="delete" size={20} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>My Tasks</Text>
          <Text style={[styles.headerSubtitle, { color: colors.subtext }]}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
        <TouchableOpacity
          onPress={toggleDarkMode}
          style={[styles.darkModeButton, { backgroundColor: colors.accent }]}
        >
          <MaterialIcons
            name={darkMode ? 'light-mode' : 'dark-mode'}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>

      {/* Input Section */}
      <View style={[styles.inputSection, { backgroundColor: colors.surface }]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.accent,
              color: colors.text,
              borderColor: colors.primary,
            },
          ]}
          placeholder="Add a new task..."
          placeholderTextColor={colors.subtext}
          value={taskInput}
          onChangeText={setTaskInput}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity
          onPress={addTask}
          style={[styles.addButton, { backgroundColor: colors.primary }]}
        >
          <MaterialIcons name="add" size={28} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="task-alt" size={64} color={colors.subtext} />
          <Text style={[styles.emptyText, { color: colors.subtext }]}>
            No tasks yet. Add one to get started!
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={renderTaskItem}
          scrollEnabled={true}
          style={styles.tasksList}
          contentContainerStyle={styles.tasksListContent}
        />
      )}

      {/* Edit Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Edit Task
            </Text>
            <TextInput
              style={[
                styles.modalInput,
                {
                  backgroundColor: colors.accent,
                  color: colors.text,
                  borderColor: colors.primary,
                },
              ]}
              placeholder="Enter task text"
              placeholderTextColor={colors.subtext}
              value={editingText}
              onChangeText={setEditingText}
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: colors.accent }]}
              >
                <Text style={[styles.modalButtonText, { color: colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveEditedTask}
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
              >
                <Text style={[styles.modalButtonText, { color: '#ffffff' }]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  darkModeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1.5,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tasksList: {
    flex: 1,
  },
  tasksListContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1.5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
