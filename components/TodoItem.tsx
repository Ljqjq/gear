import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/theme';
import { todoItemStyles } from '../styles/components/todo-item.styles';

interface TodoItemProps {
  title: string;
  completed: boolean;
  dueDate?: Date;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  title,
  completed,
  dueDate,
  onToggle,
  onDelete,
}) => {
  return (
    <View style={todoItemStyles.container}>
      <TouchableOpacity style={todoItemStyles.checkbox} onPress={onToggle}>
        <Ionicons
          name={completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={completed ? COLORS.primary : COLORS.text.secondary}
        />
      </TouchableOpacity>
      
      <View style={todoItemStyles.content}>
        <Text style={[
          todoItemStyles.title,
          completed && todoItemStyles.completedText
        ]}>
          {title}
        </Text>
        {dueDate && (
          <Text style={todoItemStyles.dueDate}>
            {dueDate.toLocaleDateString()}
          </Text>
        )}
      </View>

      <TouchableOpacity style={todoItemStyles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </View>
  );
}; 