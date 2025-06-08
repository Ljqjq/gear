import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SHADOWS, SPACING } from '../../constants/theme';

export const todoItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 8,
    marginVertical: SPACING.xs,
    ...SHADOWS.small,
  },
  checkbox: {
    marginRight: SPACING.sm,
  },
  content: {
    flex: 1,
  },
  title: {
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.xs,
  },
  completedText: {
    color: COLORS.text.secondary,
    textDecorationLine: 'line-through',
  },
  dueDate: {
    color: COLORS.text.secondary,
    fontSize: FONT_SIZE.xs,
  },
  deleteButton: {
    padding: SPACING.xs,
  },
}); 