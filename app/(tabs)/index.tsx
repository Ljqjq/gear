import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { TodoItem } from '../../components/TodoItem';
import { COLORS } from '../../constants/theme';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTodo, deleteTodo, toggleTodo } from '../../store/slices/todoSlice';
import { homeStyles } from '../../styles/screens/home.styles';

export default function HomeScreen() {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({
        title: newTodo.trim(),
        completed: false,
      }));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <KeyboardAvoidingView
      style={homeStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={homeStyles.header}>
        <Text style={homeStyles.title}>My Tasks</Text>
        <Text style={homeStyles.subtitle}>
          {todos.filter((todo) => !todo.completed).length} remaining
        </Text>
      </View>

      <ScrollView style={homeStyles.todoList}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            completed={todo.completed}
            dueDate={todo.dueDate}
            onToggle={() => handleToggleTodo(todo.id)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </ScrollView>

      <View style={homeStyles.inputContainer}>
        <TextInput
          style={homeStyles.input}
          placeholder="Add a new task..."
          placeholderTextColor={COLORS.text.secondary}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity style={homeStyles.addButton} onPress={handleAddTodo}>
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
