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
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.contentContainer, { borderLeftColor: getTypeColor(event.type) }]}
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
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.completionArea, { borderColor: getTypeColor(event.type) }]}
        onPress={onToggle}
      >
        {event.completed && (
          <View style={[styles.completedFill, { backgroundColor: getTypeColor(event.type) }]} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    marginVertical: SPACING.xs,
    overflow: 'hidden',
  },
  completionArea: {
    width: '20%',
    borderLeftWidth: 2,
    position: 'relative',
  },
  completedFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    padding: SPACING.md,
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
}); 