import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '../constants/theme';
import { Event, EventType } from './Event';
import { ThemedText } from './ThemedText';

interface EventFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (event: {
    id?: string;
    title: string;
    description: string;
    type: EventType;
    dueDate: Date;
    completed: boolean;
  }) => void;
  onDelete?: (id: string) => void;
  event?: Event;
}

export function EventForm({ visible, onClose, onSubmit, onDelete, event }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EventType>('job');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setType(event.type);
      setDueDate(new Date(event.dueDate));
    } else {
      setTitle('');
      setDescription('');
      setType('job');
      setDueDate(new Date());
    }
  }, [event]);

  const handleSubmit = () => {
    if (title.trim()) {
      onSubmit({
        id: event?.id,
        title: title.trim(),
        description: description.trim(),
        type,
        dueDate,
        completed: event?.completed || false,
      });
      onClose();
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      if (Platform.OS === 'android' && pickerMode === 'date') {
        setDueDate(selectedDate);
        setPickerMode('time');
        setShowDatePicker(true);
      } else {
        setDueDate(selectedDate);
        if (Platform.OS === 'android') {
          setShowDatePicker(false);
        }
      }
    }
  };

  const showPicker = (mode: 'date' | 'time') => {
    setPickerMode(mode);
    setShowDatePicker(true);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ThemedText type="title" style={styles.title}>
            {event ? 'Edit Event' : 'New Event'}
          </ThemedText>
          
          <TextInput
            style={styles.input}
            placeholder="Event Title"
            placeholderTextColor={COLORS.text.secondary}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description"
            placeholderTextColor={COLORS.text.secondary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <View style={styles.typeContainer}>
            <ThemedText style={styles.label}>Type:</ThemedText>
            <View style={styles.typeButtons}>
              {(['job', 'routine', 'free-time'] as EventType[]).map((eventType) => (
                <TouchableOpacity
                  key={eventType}
                  style={[
                    styles.typeButton,
                    type === eventType && styles.selectedType,
                  ]}
                  onPress={() => setType(eventType)}
                >
                  <ThemedText
                    style={[
                      styles.typeButtonText,
                      type === eventType && styles.selectedTypeText,
                    ]}
                  >
                    {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => showPicker('date')}
            >
              <ThemedText>
                Date: {dueDate.toLocaleDateString()}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => showPicker('time')}
            >
              <ThemedText>
                Time: {dueDate.toLocaleTimeString()}
              </ThemedText>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode={pickerMode}
              is24Hour={true}
              onChange={handleDateChange}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            />
          )}

          <View style={styles.buttonContainer}>
            {event && onDelete && (
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => {
                  onDelete(event.id);
                  onClose();
                }}
              >
                <ThemedText style={[styles.buttonText, styles.deleteButtonText]}>
                  Delete
                </ThemedText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <ThemedText style={styles.buttonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <ThemedText style={[styles.buttonText, styles.submitButtonText]}>
                {event ? 'Save' : 'Add Event'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.lg,
    width: '90%',
    maxWidth: 500,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    color: COLORS.text.primary,
    fontSize: FONT_SIZE.md,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  typeContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.xs,
  },
  typeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    padding: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.xs,
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: COLORS.primary,
  },
  typeButtonText: {
    fontSize: FONT_SIZE.sm,
  },
  selectedTypeText: {
    color: COLORS.background,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  dateButton: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    borderRadius: 8,
    marginHorizontal: SPACING.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: 8,
    marginHorizontal: SPACING.xs,
  },
  cancelButton: {
    backgroundColor: COLORS.background,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.error,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: FONT_SIZE.md,
  },
  submitButtonText: {
    color: COLORS.background,
  },
  deleteButtonText: {
    color: COLORS.background,
  },
}); 