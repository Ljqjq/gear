import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';
import { ThemedText } from './ThemedText';

export type EventType = 'job' | 'routine' | 'free-time';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  dueDate: Date;
  completed: boolean;
}

interface EventProps {
  event: Event;
  onPress: () => void;
  onToggle: () => void;
}

export function Event({ event, onPress, onToggle }: EventProps) {
  const getTypeColor = (type: EventType) => {
    switch (type) {
      case 'job':
        return COLORS.primary;
      case 'routine':
        return COLORS.secondary;
      case 'free-time':
        return COLORS.warning;
      default:
        return COLORS.text.secondary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: getTypeColor(event.type) }]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <ThemedText type="defaultSemiBold" style={styles.title}>
          {event.title}
        </ThemedText>
        <ThemedText style={styles.description} numberOfLines={2}>
          {event.description}
        </ThemedText>
        <ThemedText style={styles.dueDate}>
          Due: {event.dueDate.toLocaleDateString()} {event.dueDate.toLocaleTimeString()}
        </ThemedText>
      </View>
      <TouchableOpacity
        style={[styles.checkbox, event.completed && styles.checked]}
        onPress={onToggle}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 8,
    marginVertical: SPACING.xs,
    borderLeftWidth: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  dueDate: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.text.secondary,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  checked: {
    backgroundColor: COLORS.primary,
  },
}); 