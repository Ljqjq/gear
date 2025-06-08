import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SHADOWS, SPACING } from '../../constants/theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    color: COLORS.text.primary,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.secondary,
  },
  todoList: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    ...SHADOWS.medium,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingHorizontal: SPACING.lg,
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.md,
    marginRight: SPACING.sm,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 