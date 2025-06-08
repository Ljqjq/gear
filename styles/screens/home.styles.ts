import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 16,
    paddingTop: 60,
  },
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: COLORS.background,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 16,
  },
  todoList: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.divider,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color: COLORS.text.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
}); 